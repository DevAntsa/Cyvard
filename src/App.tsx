import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'
import { motion, type Variants } from 'framer-motion'
import { ShieldCheck, Mail, Cloud, Bug, ArrowRight, Check, Zap } from 'lucide-react'
import { cn } from '@/lib/utils'
import RotatingEarth, { type GlobeMarker } from '@/components/ui/wireframe-dotted-globe'
import { content, type Lang } from '@/content'

/* ---------- language ---------- */
const LangCtx = createContext<{ lang: Lang; setLang: (l: Lang) => void }>({
  lang: 'en',
  setLang: () => {},
})
const useLang = () => useContext(LangCtx)
const useT = () => content[useLang().lang]

/* ---------- shared motion ---------- */
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
}

function Reveal({ children, className, delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  return (
    <motion.div
      className={className}
      variants={fadeUp}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '-70px' }}
      transition={{ delay }}
    >
      {children}
    </motion.div>
  )
}

function ShieldMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden>
      <path d="M12 2 3 5.5v6c0 5 3.8 8.6 9 10.5 5.2-1.9 9-5.5 9-10.5v-6L12 2Z" fill="#3b82f6" />
      <path d="M8.2 12.2l2.6 2.6 4.8-5.2" fill="none" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function Eyebrow({ children }: { children: ReactNode }) {
  return <span className="font-mono text-[12px] tracking-[0.22em] uppercase text-muted">{children}</span>
}

/* ---------- nav ---------- */
function LangToggle() {
  const { lang, setLang } = useLang()
  return (
    <div className="flex items-center rounded-lg border border-border p-0.5 font-mono text-[11px]">
      {(['en', 'fi'] as Lang[]).map((l) => (
        <button
          key={l}
          onClick={() => setLang(l)}
          className={cn(
            'rounded-md px-2 py-1 uppercase transition-colors',
            lang === l ? 'bg-ink text-white' : 'text-muted hover:text-ink',
          )}
        >
          {l}
        </button>
      ))}
    </div>
  )
}

function Nav() {
  const t = useT()
  const links: [string, string][] = [
    [t.nav.threat, '#threat'],
    [t.nav.services, '#services'],
    [t.nav.pricing, '#pricing'],
  ]
  return (
    <header className="fixed inset-x-0 top-0 z-50 bg-white/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3.5 sm:px-6 sm:py-4">
        <a href="#top" className="flex items-center gap-2.5">
          <ShieldMark className="h-7 w-7" />
          <span className="text-lg font-extrabold tracking-tight">
            Cy<span className="text-primary-light">vard</span>
          </span>
        </a>
        <nav className="hidden items-center gap-8 md:flex">
          {links.map(([label, href]) => (
            <a key={href} href={href} className="text-sm text-muted transition-colors hover:text-ink">
              {label}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-2 sm:gap-3">
          <LangToggle />
          <a href="#contact" className="btn-primary rounded-lg px-3.5 py-2 text-sm font-semibold text-white sm:px-4">
            {t.nav.freeCheck}
          </a>
        </div>
      </div>
      <div className="h-px w-full bg-gradient-to-r from-transparent via-border to-transparent" />
    </header>
  )
}

/* ---------- terminal card (self-dark) ---------- */
function TerminalCard() {
  const lines = [
    { t: '$ cyvard scan --domain yourcompany.fi', c: 'text-slate-100' },
    { t: '[✓] MX        google mail servers', c: 'text-emerald-400' },
    { t: '[✓] SPF       record found', c: 'text-emerald-400' },
    { t: '[✗] DMARC     no policy — p=none', c: 'text-rose-400' },
    { t: '', c: '' },
    { t: '→ anyone can send email as @yourcompany.fi', c: 'text-slate-100' },
  ]
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      className="w-full overflow-hidden rounded-2xl"
      style={{ background: '#0b0f19', border: '1px solid #1e2536', boxShadow: '0 30px 60px -28px rgba(10,14,23,.35)' }}
    >
      <div className="flex items-center gap-2 px-4 py-3" style={{ borderBottom: '1px solid #1e2536' }}>
        <span className="h-3 w-3 rounded-full" style={{ background: '#f43f5e' }} />
        <span className="h-3 w-3 rounded-full" style={{ background: '#f59e0b' }} />
        <span className="h-3 w-3 rounded-full" style={{ background: '#10b981' }} />
        <span className="ml-2 font-mono text-xs text-slate-400">cyvard — exposure check</span>
      </div>
      <div className="space-y-1.5 overflow-x-auto p-5 font-mono text-[12px] leading-relaxed sm:text-[13px]">
        {lines.map((l, i) =>
          l.t === '' ? (
            <div key={i} className="h-2" />
          ) : (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -8 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.15 + i * 0.18 }}
              className={cn('whitespace-pre', l.c)}
            >
              {l.t}
            </motion.div>
          ),
        )}
        <motion.span
          initial={{ opacity: 0 }}
          whileInView={{ opacity: [0, 1, 0] }}
          viewport={{ once: true }}
          transition={{ delay: 1.5, duration: 1, repeat: Infinity }}
          className="inline-block h-4 w-2 translate-y-0.5 bg-slate-300"
        />
      </div>
    </motion.div>
  )
}

/* ---------- hero ---------- */
const FINDING_MARKERS: GlobeMarker[] = [
  { lat: 51.5, lng: -0.12, label: 'Admin panel', sub: 'no login', color: '#ef4444' },
  { lat: 40.71, lng: -74.0, label: 'S3 bucket', sub: 'public', color: '#ef4444' },
  { lat: 50.11, lng: 8.68, label: 'DMARC', sub: 'spoofable', color: '#f59e0b' },
  { lat: 1.35, lng: 103.82, label: 'API', sub: 'broken access', color: '#f59e0b' },
  { lat: 60.17, lng: 24.94, label: '.env', sub: 'secrets exposed', color: '#eab308' },
  { lat: -23.55, lng: -46.63, label: 'Login', sub: 'no rate limit', color: '#eab308' },
]

function Hero() {
  const t = useT()
  return (
    <section id="top" className="relative overflow-hidden pt-28 pb-10 text-center sm:pt-32 lg:pt-36">
      <div className="grid-bg grid-fade absolute inset-0" />
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-[560px]"
        style={{ background: 'radial-gradient(760px circle at 50% -6%, rgba(37,99,235,.08), transparent 62%)' }}
      />
      <div className="relative mx-auto max-w-3xl px-5 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3 py-1.5"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-primary" style={{ animation: 'pulse-dot 1.8s ease-in-out infinite' }} />
          <span className="font-mono text-[11px] tracking-[0.16em] uppercase text-muted">{t.hero.badge}</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.05 }}
          className="mt-6 text-[clamp(2.4rem,7vw,4.6rem)] font-extrabold leading-[1.03] tracking-[-0.03em]"
        >
          {t.hero.title1}
          <br />
          <span className="text-gradient">{t.hero.title2}</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-muted sm:text-lg"
        >
          {t.hero.sub}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.25 }}
          className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4"
        >
          <a href="#contact" className="btn-primary inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3.5 font-semibold text-white">
            {t.hero.cta1} <ArrowRight className="h-4 w-4" />
          </a>
          <a href="#services" className="inline-flex items-center justify-center gap-2 rounded-xl border border-border px-6 py-3.5 font-medium text-ink transition-colors hover:border-ink/25">
            {t.hero.cta2}
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 font-mono text-xs text-muted"
        >
          {t.hero.chips.map((c) => (
            <span key={c} className="inline-flex items-center gap-1.5">
              <Check className="h-3.5 w-3.5 text-muted" /> {c}
            </span>
          ))}
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, delay: 0.3, ease: 'easeOut' }}
        className="relative mx-auto mt-12 flex max-w-[640px] justify-center px-4 sm:mt-14"
      >
        <div className="pointer-events-none absolute inset-0" style={{ background: 'radial-gradient(closest-side, rgba(37,99,235,.06), transparent 72%)' }} />
        <RotatingEarth markers={FINDING_MARKERS} className="w-full" />
      </motion.div>
    </section>
  )
}

/* ---------- spoof demo ---------- */
function SpoofDemo() {
  const t = useT()
  return (
    <section className="border-t border-border py-20 sm:py-24">
      <div className="mx-auto grid max-w-6xl items-center gap-10 px-5 sm:px-6 lg:grid-cols-2 lg:gap-12">
        <Reveal>
          <Eyebrow>{t.spoof.eyebrow}</Eyebrow>
          <h2 className="mt-4 text-[clamp(1.7rem,4.5vw,2.6rem)] font-bold tracking-tight">{t.spoof.title}</h2>
          <p className="mt-5 max-w-lg text-muted">{t.spoof.body}</p>
        </Reveal>
        <Reveal delay={0.1}>
          <TerminalCard />
        </Reveal>
      </div>
    </section>
  )
}

/* ---------- threat ---------- */
function Threat() {
  const t = useT()
  return (
    <section id="threat" className="relative border-y border-border bg-surface/60 py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-5 sm:px-6">
        <Reveal>
          <Eyebrow>{t.threat.eyebrow}</Eyebrow>
          <h2 className="mt-4 max-w-3xl text-[clamp(1.7rem,4.5vw,2.6rem)] font-bold leading-tight tracking-tight">
            {t.threat.pre}
            <span className="text-muted">{t.threat.quote}</span>
            {t.threat.post}
          </h2>
        </Reveal>
        <div className="mt-12 grid gap-5 sm:mt-14 sm:grid-cols-3">
          {t.threat.stats.map(([big, small], i) => (
            <Reveal key={big} delay={i * 0.08}>
              <div className="card card-hover h-full p-7">
                <div className="text-4xl font-extrabold tracking-tight text-ink">{big}</div>
                <p className="mt-3 text-muted">{small}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ---------- video ---------- */
function Video() {
  const t = useT()
  return (
    <section className="py-20 sm:py-24">
      <div className="mx-auto max-w-4xl px-5 sm:px-6">
        <Reveal>
          <div className="text-center">
            <Eyebrow>{t.video.eyebrow}</Eyebrow>
            <h2 className="mx-auto mt-4 max-w-2xl text-[clamp(1.7rem,4.5vw,2.6rem)] font-bold tracking-tight">{t.video.title}</h2>
            <p className="mx-auto mt-4 max-w-xl text-muted">{t.video.body}</p>
          </div>
        </Reveal>
        <Reveal delay={0.1}>
          <div className="card mt-10 overflow-hidden p-1.5">
            <div className="relative aspect-video overflow-hidden rounded-xl bg-black">
              <iframe
                src="https://www.youtube-nocookie.com/embed/-um9zKf1V30"
                title="The Dangerous Evolution of AI Hacking"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                className="absolute inset-0 h-full w-full border-0"
              />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

/* ---------- services ---------- */
const serviceIcons = [Bug, ShieldCheck, Mail, Cloud]
function Services() {
  const t = useT()
  return (
    <section id="services" className="border-t border-border py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-5 sm:px-6">
        <Reveal>
          <Eyebrow>{t.services.eyebrow}</Eyebrow>
          <h2 className="mt-4 text-[clamp(1.7rem,4.5vw,2.6rem)] font-bold tracking-tight">{t.services.title}</h2>
        </Reveal>
        <div className="mt-12 grid gap-5 sm:mt-14 md:grid-cols-2">
          {t.services.items.map(([title, body], i) => {
            const Icon = serviceIcons[i]
            return (
              <Reveal key={title} delay={i * 0.06}>
                <div className="card card-hover flex h-full gap-5 p-6 sm:p-7">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-border bg-surface">
                    <Icon className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold">{title}</h3>
                    <p className="mt-2 text-muted">{body}</p>
                  </div>
                </div>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}

/* ---------- pricing ---------- */
function Pricing() {
  const t = useT()
  return (
    <section id="pricing" className="border-t border-border bg-surface/60 py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-5 sm:px-6">
        <Reveal>
          <div className="text-center">
            <Eyebrow>{t.pricing.eyebrow}</Eyebrow>
            <h2 className="mx-auto mt-4 max-w-2xl text-[clamp(1.7rem,4.5vw,2.6rem)] font-bold tracking-tight">{t.pricing.title}</h2>
            <p className="mx-auto mt-3 max-w-md text-muted">{t.pricing.subtitle}</p>
          </div>
        </Reveal>
        <div className="mt-12 grid gap-5 sm:mt-14 md:grid-cols-2 lg:grid-cols-4 lg:items-stretch">
          {t.pricing.tiers.map((tier, i) => (
            <Reveal key={tier.name} delay={i * 0.05}>
              <div
                className={cn('card flex h-full flex-col p-6', tier.featured ? 'relative border-primary-light/60' : 'card-hover')}
                style={tier.featured ? { boxShadow: '0 0 0 1px rgba(37,99,235,.35), 0 26px 55px -28px rgba(37,99,235,.4)' } : undefined}
              >
                {tier.featured && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-primary px-3 py-1 font-mono text-[10px] tracking-widest uppercase text-white">
                    {t.pricing.badge}
                  </span>
                )}
                <div className="font-mono text-[11px] uppercase tracking-widest text-primary">{tier.name}</div>
                <div className="mt-3 flex items-baseline gap-1">
                  <span className="text-3xl font-extrabold tracking-tight">{tier.price}</span>
                  {tier.unit && <span className="text-sm font-semibold text-muted">{tier.unit}</span>}
                </div>
                <div className="mt-1 font-mono text-[11px] text-muted">{tier.sub}</div>
                <p className="mt-4 text-sm text-muted">{tier.blurb}</p>
                <ul className="mt-5 flex-1 space-y-2.5">
                  {tier.features.map((f) => (
                    <li key={f} className="flex gap-2 text-sm">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                      <span className="text-ink/80">{f}</span>
                    </li>
                  ))}
                </ul>
                <a
                  href="#contact"
                  className={cn(
                    'mt-6 inline-flex items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-sm font-semibold transition-colors',
                    tier.featured ? 'btn-primary text-white' : 'border border-border text-ink hover:border-ink/25',
                  )}
                >
                  {t.pricing.cta}
                </a>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal delay={0.1}>
          <p className="mx-auto mt-8 max-w-3xl text-center font-mono text-xs leading-relaxed text-muted">{t.pricing.note}</p>
        </Reveal>
      </div>
    </section>
  )
}

/* ---------- track record ---------- */
function TrackRecord() {
  const t = useT()
  const [noteLead, ...noteRest] = t.track.note.split('. ')
  return (
    <section className="border-t border-border py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-5 sm:px-6">
        <div className="grid items-center gap-8 md:grid-cols-[1fr_200px] md:gap-12">
          <Reveal>
            <Eyebrow>{t.track.eyebrow}</Eyebrow>
            <h2 className="mt-4 max-w-xl text-[clamp(1.8rem,4.5vw,2.8rem)] font-bold leading-tight tracking-tight">{t.track.title}</h2>
            <p className="mt-5 max-w-xl text-muted">{t.track.intro}</p>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="flex justify-center md:justify-end">
              <div
                role="img"
                aria-label="Anton Luoto, founder of Cyvard"
                className="h-40 w-40 rounded-2xl border border-border sm:h-48 sm:w-48 md:h-[200px] md:w-[200px]"
                style={{ backgroundImage: 'url(/anton.jpg)', backgroundSize: 'cover', backgroundPosition: 'center' }}
              />
            </div>
          </Reveal>
        </div>

        <div className="mt-12 grid gap-5 sm:grid-cols-3">
          {t.track.stats.map(([big, small], i) => (
            <Reveal key={big} delay={i * 0.06}>
              <div className="card card-hover h-full p-7">
                <div className="text-4xl font-extrabold tracking-tight text-primary">{big}</div>
                <p className="mt-3 text-sm text-muted">{small}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <div className="mt-5 grid gap-5 md:grid-cols-2">
          {t.track.findings.map(([big, tag, body], i) => (
            <Reveal key={big + i} delay={i * 0.05}>
              <div className="card card-hover h-full p-7" style={{ borderLeft: '3px solid #2563eb' }}>
                <div className="text-2xl font-extrabold tracking-tight">{big}</div>
                <div className="mt-1 font-mono text-[11px] uppercase tracking-widest text-primary">{tag}</div>
                <p className="mt-3 text-sm text-muted">{body}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.1}>
          <div className="mt-6 rounded-xl border border-border bg-surface p-5">
            <p className="font-mono text-xs leading-relaxed text-muted">
              <span className="font-semibold text-ink">{noteLead}.</span> {noteRest.join('. ')}
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

/* ---------- cta ---------- */
function CTA() {
  const t = useT()
  return (
    <section id="contact" className="relative overflow-hidden border-t border-border py-24 sm:py-28">
      <div className="grid-bg grid-fade absolute inset-0 rotate-180" />
      <div className="pointer-events-none absolute inset-0" style={{ background: 'radial-gradient(600px circle at 50% 120%, rgba(37,99,235,.07), transparent 60%)' }} />
      <div className="relative mx-auto max-w-3xl px-5 text-center sm:px-6">
        <Reveal>
          <Zap className="mx-auto h-8 w-8 text-ink" />
          <h2 className="mt-6 text-[clamp(1.9rem,6vw,3.2rem)] font-extrabold tracking-tight">{t.cta.title}</h2>
          <p className="mx-auto mt-5 max-w-xl text-base text-muted sm:text-lg">{t.cta.body}</p>
          <a href="mailto:anton@cyvard.com" className="btn-primary mt-9 inline-flex items-center gap-2 rounded-xl px-7 py-4 font-semibold text-white">
            {t.cta.button} <ArrowRight className="h-4 w-4" />
          </a>
          <p className="mt-4 font-mono text-xs text-muted">anton@cyvard.com</p>
        </Reveal>
      </div>
    </section>
  )
}

/* ---------- footer ---------- */
const SOCIALS: { label: string; href: string; path: string }[] = [
  {
    label: 'X',
    href: 'https://x.com/CyvardSec',
    path: 'M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z',
  },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/company/cyvard/',
    path: 'M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z',
  },
  {
    label: 'GitHub',
    href: 'https://github.com/DevAntsa/Cyvard',
    path: 'M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12',
  },
]

function Footer() {
  const t = useT()
  return (
    <footer className="border-t border-border py-9">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-4 px-5 text-center sm:flex-row sm:justify-between sm:px-6 sm:text-left">
        <div className="flex items-center gap-2.5">
          <ShieldMark className="h-6 w-6" />
          <span className="font-bold tracking-tight">
            Cy<span className="text-primary-light">vard</span>
          </span>
        </div>
        <span className="font-mono text-xs text-muted">{t.footer.tagline}</span>
        <div className="flex flex-col items-center gap-3.5 sm:items-end">
          <div className="flex items-center gap-4">
            {SOCIALS.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.label}
                className="text-muted transition-colors hover:text-ink"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="h-[18px] w-[18px]">
                  <path d={s.path} />
                </svg>
              </a>
            ))}
          </div>
          <div className="flex items-center gap-5">
            <a href="#privacy" className="font-mono text-xs text-muted transition-colors hover:text-ink">
              {t.nav.privacy}
            </a>
            <span className="font-mono text-xs text-muted">© 2026 Cyvard</span>
          </div>
        </div>
      </div>
    </footer>
  )
}

/* ---------- privacy page ---------- */
function Privacy() {
  const t = useT()
  return (
    <main className="pt-28 pb-24 sm:pt-32">
      <div className="mx-auto max-w-3xl px-5 sm:px-6">
        <a href="#top" className="font-mono text-xs text-muted transition-colors hover:text-ink">
          {t.privacy.back}
        </a>
        <h1 className="mt-6 text-[clamp(2rem,5vw,3rem)] font-extrabold tracking-tight">{t.privacy.title}</h1>
        <p className="mt-2 font-mono text-xs text-muted">{t.privacy.updated}</p>
        <p className="mt-6 leading-relaxed text-muted">{t.privacy.intro}</p>
        <div className="mt-10 space-y-8">
          {t.privacy.sections.map(([h, p]) => (
            <div key={h}>
              <h2 className="text-lg font-semibold">{h}</h2>
              <p className="mt-2 leading-relaxed text-muted">{p}</p>
            </div>
          ))}
        </div>
      </div>
    </main>
  )
}

/* ---------- app ---------- */
export default function App() {
  const [lang, setLang] = useState<Lang>('en')
  const [route, setRoute] = useState(() => (typeof window !== 'undefined' ? window.location.hash : ''))

  useEffect(() => {
    const onHash = () => setRoute(window.location.hash)
    window.addEventListener('hashchange', onHash)
    return () => window.removeEventListener('hashchange', onHash)
  }, [])

  const isPrivacy = route === '#privacy'
  useEffect(() => {
    if (isPrivacy) window.scrollTo(0, 0)
  }, [isPrivacy])

  return (
    <LangCtx.Provider value={{ lang, setLang }}>
      <div className="min-h-screen">
        <Nav />
        {isPrivacy ? (
          <Privacy />
        ) : (
          <main>
            <Hero />
            <SpoofDemo />
            <Threat />
            <Video />
            <Services />
            <Pricing />
            <TrackRecord />
            <CTA />
          </main>
        )}
        <Footer />
      </div>
    </LangCtx.Provider>
  )
}
