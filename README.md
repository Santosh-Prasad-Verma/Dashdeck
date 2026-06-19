<p align="center">
  <img src="media/Dashdeck-logo.svg" alt="Dashdeck" width="80" />
</p>

<h1 align="center">Dashdeck</h1>

<p align="center">
  A premium, open-source admin dashboard built with modern web technologies.
</p>

<p align="center">
  <a href="https://github.com/Santosh-Prasad-Verma/Dashdeck/blob/main/LICENSE">
    <img src="https://img.shields.io/github/license/Santosh-Prasad-Verma/Dashdeck?style=flat-square&color=A78BFA" alt="License" />
  </a>
  <a href="https://github.com/Santosh-Prasad-Verma/Dashdeck/stars">
    <img src="https://img.shields.io/github/stars/Santosh-Prasad-Verma/Dashdeck?style=flat-square&color=818CF8" alt="Stars" />
  </a>
  <a href="https://github.com/Santosh-Prasad-Verma/Dashdeck/network/members">
    <img src="https://img.shields.io/github/forks/Santosh-Prasad-Verma/Dashdeck?style=flat-square&color=C4B5FD" alt="Forks" />
  </a>
</p>

---

## Preview

<p align="center">
  <img src="public/Preview-img1.png" alt="Dashboard Preview" width="100%" />
</p>

<p align="center">
  <img src="public/Preview-img2.png" alt="Analytics Preview" width="100%" />
</p>

<p align="center">
  <img src="public/Preview-img3.png" alt="Components Preview" width="100%" />
</p>

## Features

- **37+ Dashboard Pages** — CRM, Finance, DevOps, AI, E-commerce, Healthcare, and more
- **Theme System** — Light & Dark modes with 4 design presets
- **Interactive Charts** — Custom SVG charts with animations
- **Kanban Board** — Drag-and-drop task management
- **Email & Chat** — Full messaging workspace
- **User Management** — CRUD operations with roles & permissions
- **Invoice Creator** — Live calculations and PDF export
- **i18n Support** — English, Spanish, and Hindi

## Tech Stack

| Technology | Purpose |
|---|---|
| Next.js 16 | React framework with Turbopack |
| React 19 | UI library |
| TypeScript | Type safety |
| Tailwind CSS v4 | Styling |
| shadcn/ui | Components |
| Zustand | State management |
| Recharts | Charts |
| Biome | Linting & formatting |
| Vitest | Testing |

## Getting Started

### Prerequisites

- Node.js 22+
- npm or yarn

### Install & Run

```bash
# Clone
git clone https://github.com/Santosh-Prasad-Verma/Dashdeck.git

# Install
cd Dashdeck
npm install

# Run
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

### Tests

```bash
npm test
```

## Project Structure

```
src/
├── app/
│   ├── (external)/       # Landing page
│   └── (main)/
│       ├── auth/         # Login & register
│       └── dashboard/    # 37+ dashboard modules
├── components/           # Reusable UI components
├── stores/               # Zustand state stores
└── styles/               # Tailwind configs
```

## Contributing

Contributions welcome! See [CONTRIBUTING.md](CONTRIBUTING.md).

## License

MIT — see [LICENSE](LICENSE)

---

<p align="center">
  Built with Next.js, React, and Tailwind CSS
</p>
