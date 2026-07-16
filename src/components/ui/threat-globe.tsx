import { useEffect, useRef, useCallback } from 'react'
import createGlobe from 'cobe'

type Severity = 'critical' | 'high' | 'medium'

interface ThreatNode {
  id: string
  location: [number, number]
  label: string
  vector: string
  severity: Severity
}

interface ThreatGlobeProps {
  threats?: ThreatNode[]
  origin?: { id: string; location: [number, number]; label: string }
  className?: string
  speed?: number
}

const defaultThreats: ThreatNode[] = [
  { id: 'fra', location: [50.11, 8.68], label: 'Frankfurt', vector: 'Credential stuffing', severity: 'critical' },
  { id: 'sao', location: [-23.55, -46.63], label: 'São Paulo', vector: 'Botnet C2', severity: 'high' },
  { id: 'sgp', location: [1.35, 103.82], label: 'Singapore', vector: 'Port scan', severity: 'medium' },
  { id: 'ams', location: [52.37, 4.9], label: 'Amsterdam', vector: 'SQL injection', severity: 'high' },
  { id: 'lag', location: [6.52, 3.38], label: 'Lagos', vector: 'Phishing relay', severity: 'medium' },
  { id: 'sea', location: [47.61, -122.33], label: 'Seattle', vector: 'L7 flood', severity: 'critical' },
]

const defaultOrigin = { id: 'hq', location: [60.17, 24.94] as [number, number], label: 'Helsinki' }

const sizeFor = (s: Severity) => (s === 'critical' ? 0.055 : s === 'high' ? 0.042 : 0.03)

export function ThreatGlobe({
  threats = defaultThreats,
  origin = defaultOrigin,
  className = '',
  speed = 0.0042,
}: ThreatGlobeProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const pointerX = useRef<number | null>(null)
  const rotation = useRef(0)

  const onPointerDown = useCallback((e: React.PointerEvent) => {
    pointerX.current = e.clientX
    if (canvasRef.current) canvasRef.current.style.cursor = 'grabbing'
  }, [])

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      if (pointerX.current !== null) {
        rotation.current += (e.clientX - pointerX.current) / 140
        pointerX.current = e.clientX
      }
    }
    const onUp = () => {
      pointerX.current = null
      if (canvasRef.current) canvasRef.current.style.cursor = 'grab'
    }
    window.addEventListener('pointermove', onMove)
    window.addEventListener('pointerup', onUp)
    return () => {
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('pointerup', onUp)
    }
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    let globe: ReturnType<typeof createGlobe> | null = null
    let phi = 0

    const start = () => {
      const width = canvas.offsetWidth
      if (!width || globe) return
      globe = createGlobe(canvas, {
        devicePixelRatio: Math.min(window.devicePixelRatio || 1, 2),
        width,
        height: width,
        phi: 0,
        theta: 0.24,
        dark: 1,
        diffuse: 1.3,
        mapSamples: 22000,
        mapBrightness: 8,
        baseColor: [0.4, 0.44, 0.55],
        markerColor: [0.35, 0.6, 1],
        glowColor: [0.11, 0.16, 0.3],
        markers: [
          { location: origin.location, size: 0.08 },
          ...threats.map((t) => ({ location: t.location, size: sizeFor(t.severity) })),
        ],
        onRender: (state: Record<string, unknown>) => {
          state.phi = phi + rotation.current
          phi += speed
        },
      })
      setTimeout(() => {
        if (canvas) canvas.style.opacity = '1'
      }, 0)
    }

    if (canvas.offsetWidth > 0) {
      start()
    } else {
      const ro = new ResizeObserver(() => {
        if (canvas.offsetWidth > 0) {
          ro.disconnect()
          start()
        }
      })
      ro.observe(canvas)
    }

    return () => {
      if (globe) globe.destroy()
    }
  }, [threats, origin, speed])

  return (
    <div className={`relative aspect-square select-none ${className}`}>
      <canvas
        ref={canvasRef}
        onPointerDown={onPointerDown}
        style={{
          width: '100%',
          height: '100%',
          cursor: 'grab',
          opacity: 0,
          transition: 'opacity 1s ease',
          touchAction: 'none',
        }}
      />
      <p className="sr-only">
        Illustrative globe of common attack origins converging on a defended asset.
      </p>
    </div>
  )
}
