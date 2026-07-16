<div align="center">

<a href="https://cyvard.com"><img src="public/og-image.png" alt="Cyvard" width="680"></a>

# Cyvard

**Offensive security for Finnish and EU companies.**
Source for [**cyvard.com**](https://cyvard.com) — built as a real React app, not a template.

<a href="https://cyvard.com"><img src="https://img.shields.io/badge/live-cyvard.com-2563EB?style=for-the-badge&logo=cloudflare&logoColor=white" alt="Live site"></a>
<img src="https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black" alt="React 19">
<img src="https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript">
<img src="https://img.shields.io/badge/Vite-7-646CFF?style=for-the-badge&logo=vite&logoColor=white" alt="Vite">
<img src="https://img.shields.io/badge/Tailwind_CSS-v4-38BDF8?style=for-the-badge&logo=tailwindcss&logoColor=white" alt="Tailwind CSS v4">
<img src="https://img.shields.io/badge/Framer_Motion-12-0055FF?style=for-the-badge&logo=framer&logoColor=white" alt="Framer Motion">
<img src="https://img.shields.io/badge/D3.js-globe-F9A03C?style=for-the-badge&logo=d3dotjs&logoColor=white" alt="D3">
<img src="https://img.shields.io/badge/Cloudflare-Workers-F38020?style=for-the-badge&logo=cloudflare&logoColor=white" alt="Cloudflare Workers">

</div>

---

A single-page site with an interactive **d3 orthographic globe** (live "finding" pins reprojected
every frame), an **English / Finnish** toggle, Framer Motion scroll reveals, a privacy-enhanced
video embed, and a privacy policy — served from a **Cloudflare Worker** behind a strict
Content-Security-Policy.

## 🌳 Project structure

```text
cyvard.com/
├── public/
│   ├── anton.jpg
│   ├── favicon.svg
│   ├── icon-192.png
│   ├── icons.svg
│   ├── ne_110m_land.json
│   ├── og-image.png
│   ├── robots.txt
│   └── sitemap.xml
├── src/
│   ├── assets/
│   │   ├── hero.png
│   │   ├── react.svg
│   │   └── vite.svg
│   ├── components/
│   │   └── ui/
│   │       ├── threat-globe.tsx
│   │       └── wireframe-dotted-globe.tsx
│   ├── lib/
│   │   └── utils.ts
│   ├── App.css
│   ├── App.tsx
│   ├── content.ts
│   ├── index.css
│   └── main.tsx
├── .gitignore
├── .oxlintrc.json
├── index.html
├── package-lock.json
├── package.json
├── README.md
├── tsconfig.app.json
├── tsconfig.json
├── tsconfig.node.json
├── vite.config.ts
└── wrangler.toml
```

All site copy lives in **`src/content.ts`**, keyed by language (`en` / `fi`) — the whole site is
translatable from one file.

## 🧱 Stack

| Layer | Tech |
|---|---|
| Framework | **React 19** + **TypeScript** + **Vite** |
| Styling | **Tailwind CSS v4** (`@tailwindcss/vite`, `@theme` design tokens) |
| Motion | **Framer Motion** (scroll reveals, micro-interactions) |
| Globe | **d3** (`geoOrthographic` / `geoPath` / `geoGraticule`) on canvas + HTML pins |
| Icons / utils | lucide-react, clsx, tailwind-merge, class-variance-authority |
| Hosting | **Cloudflare Workers** (static assets via `wrangler`) |

## 🚀 Develop

```bash
npm install
npm run dev      # Vite dev server + HMR
npm run build    # tsc -b && vite build  ->  dist/
npm run preview  # preview the production build
npm run lint     # oxlint
```

## 📄 License

Code is provided as-is for reference. Brand assets, imagery, and copy are © Cyvard.

<div align="center"><sub>Built by <a href="https://cyvard.com">Cyvard</a> · Attackers use AI. So do we.</sub></div>
