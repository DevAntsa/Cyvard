import { useEffect, useRef } from 'react'
import * as d3 from 'd3'

export interface GlobeMarker {
  lat: number
  lng: number
  label: string
  sub: string
  color: string
}

interface RotatingEarthProps {
  width?: number
  height?: number
  className?: string
  markers?: GlobeMarker[]
}

const NO_MARKERS: GlobeMarker[] = []

export default function RotatingEarth({
  width = 640,
  height = 640,
  className = '',
  markers = NO_MARKERS,
}: RotatingEarthProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const pinRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const context = canvas.getContext('2d')
    if (!context) return

    const size = Math.max(240, Math.min(Math.min(width, window.innerWidth - 32), height))
    const radius = size / 2.1
    const dpr = window.devicePixelRatio || 1
    canvas.width = size * dpr
    canvas.height = size * dpr
    canvas.style.width = '100%'
    canvas.style.height = 'auto'
    context.scale(dpr, dpr)

    const projection = d3.geoOrthographic().scale(radius).translate([size / 2, size / 2]).clipAngle(90)
    const path = d3.geoPath().projection(projection).context(context)

    const pointInPolygon = (point: [number, number], polygon: number[][]): boolean => {
      const [x, y] = point
      let inside = false
      for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
        const [xi, yi] = polygon[i]
        const [xj, yj] = polygon[j]
        if (yi > y !== yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi) inside = !inside
      }
      return inside
    }
    const pointInFeature = (point: [number, number], feature: any): boolean => {
      const g = feature.geometry
      if (g.type === 'Polygon') {
        if (!pointInPolygon(point, g.coordinates[0])) return false
        for (let i = 1; i < g.coordinates.length; i++) if (pointInPolygon(point, g.coordinates[i])) return false
        return true
      } else if (g.type === 'MultiPolygon') {
        for (const poly of g.coordinates) {
          if (pointInPolygon(point, poly[0])) {
            let hole = false
            for (let i = 1; i < poly.length; i++) if (pointInPolygon(point, poly[i])) { hole = true; break }
            if (!hole) return true
          }
        }
      }
      return false
    }
    const generateDots = (feature: any) => {
      const dots: [number, number][] = []
      const [[minLng, minLat], [maxLng, maxLat]] = d3.geoBounds(feature)
      const step = 16 * 0.08
      for (let lng = minLng; lng <= maxLng; lng += step)
        for (let lat = minLat; lat <= maxLat; lat += step) {
          const p: [number, number] = [lng, lat]
          if (pointInFeature(p, feature)) dots.push(p)
        }
      return dots
    }

    const allDots: { lng: number; lat: number }[] = []
    let landFeatures: any
    const rotation: [number, number] = [0, 0]

    const updatePins = () => {
      if (!markers.length) return
      const center: [number, number] = [-rotation[0], -rotation[1]]
      markers.forEach((m, i) => {
        const el = pinRefs.current[i]
        if (!el) return
        const p = projection([m.lng, m.lat])
        const dist = d3.geoDistance([m.lng, m.lat], center)
        if (p && dist < Math.PI / 2) {
          el.style.left = `${(p[0] / size) * 100}%`
          el.style.top = `${(p[1] / size) * 100}%`
          el.style.opacity = String(Math.min(1, (Math.PI / 2 - dist) / 0.32))
        } else {
          el.style.opacity = '0'
        }
      })
    }

    const render = () => {
      context.clearRect(0, 0, size, size)
      const currentScale = projection.scale()
      const sf = currentScale / radius

      context.beginPath()
      context.arc(size / 2, size / 2, currentScale, 0, 2 * Math.PI)
      context.fillStyle = '#ffffff'
      context.fill()
      context.strokeStyle = 'rgba(10,14,23,0.14)'
      context.lineWidth = 1.4 * sf
      context.stroke()

      if (landFeatures) {
        const graticule = d3.geoGraticule()
        context.beginPath()
        path(graticule())
        context.strokeStyle = '#0a0e17'
        context.lineWidth = 1 * sf
        context.globalAlpha = 0.05
        context.stroke()
        context.globalAlpha = 1

        context.beginPath()
        landFeatures.features.forEach((f: any) => path(f))
        context.strokeStyle = 'rgba(10,14,23,0.28)'
        context.lineWidth = 1 * sf
        context.stroke()

        allDots.forEach((d) => {
          const pr = projection([d.lng, d.lat])
          if (pr && pr[0] >= 0 && pr[0] <= size && pr[1] >= 0 && pr[1] <= size) {
            context.beginPath()
            context.arc(pr[0], pr[1], 1.15 * sf, 0, 2 * Math.PI)
            context.fillStyle = '#334155'
            context.fill()
          }
        })
      }
      updatePins()
    }

    const load = async () => {
      try {
        const res = await fetch('/ne_110m_land.json')
        if (!res.ok) return
        landFeatures = await res.json()
        landFeatures.features.forEach((f: any) => generateDots(f).forEach(([lng, lat]) => allDots.push({ lng, lat })))
        render()
      } catch {
        /* offline — sphere still renders */
      }
    }

    let auto = true
    const speed = 0.32
    const timer = d3.timer(() => {
      if (auto) {
        rotation[0] += speed
        projection.rotate(rotation)
        render()
      }
    })

    let startX: number | null = null
    let start0 = 0
    const down = (e: MouseEvent) => { auto = false; startX = e.clientX; start0 = rotation[0]; canvas.style.cursor = 'grabbing' }
    const move = (e: MouseEvent) => {
      if (startX !== null) { rotation[0] = start0 + (e.clientX - startX) * 0.5; projection.rotate(rotation); render() }
    }
    const up = () => { startX = null; canvas.style.cursor = 'grab'; setTimeout(() => (auto = true), 400) }
    canvas.addEventListener('mousedown', down)
    document.addEventListener('mousemove', move)
    document.addEventListener('mouseup', up)

    load()

    return () => {
      timer.stop()
      canvas.removeEventListener('mousedown', down)
      document.removeEventListener('mousemove', move)
      document.removeEventListener('mouseup', up)
    }
  }, [width, height, markers])

  return (
    <div className={`relative ${className}`}>
      <canvas ref={canvasRef} className="h-auto w-full cursor-grab active:cursor-grabbing" style={{ maxWidth: '100%' }} />
      <div className="pointer-events-none absolute inset-0">
        {markers.map((m, i) => (
          <div
            key={m.label + i}
            ref={(el) => { pinRefs.current[i] = el }}
            className="absolute"
            style={{ opacity: 0, transition: 'opacity 0.4s ease', willChange: 'opacity' }}
          >
            <span
              style={{ position: 'absolute', left: 0, top: 0, width: 8, height: 8, marginLeft: -4, marginTop: -4, borderRadius: '50%', background: m.color, boxShadow: `0 0 8px ${m.color}` }}
            />
            <div style={{ position: 'absolute', left: 0, bottom: 10, transform: 'translateX(-50%)', whiteSpace: 'nowrap' }}>
              <div
                className="flex items-center gap-1.5 rounded-md border px-2 py-1"
                style={{ background: 'linear-gradient(135deg,#0e1116,#1b2029)', borderColor: `${m.color}55`, boxShadow: '0 6px 16px rgba(10,14,23,0.35)' }}
              >
                <span style={{ width: 6, height: 6, borderRadius: '50%', background: m.color, animation: 'pulse-dot 1.2s ease-in-out infinite' }} />
                <span className="font-mono text-[11px] font-semibold" style={{ color: m.color }}>{m.label}</span>
                <span className="font-mono text-[11px]" style={{ color: 'rgba(255,255,255,0.72)' }}>· {m.sub}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
