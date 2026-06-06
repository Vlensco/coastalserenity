# 🌊 Coastal Serenity

> *A Cinematic Journey through Light, Water, & Silence.*

Coastal Serenity is a premium, immersive single-page web application. Designed around the aesthetics of **Coastal Minimalism** and **Cinematic Luxury**, it combines full-bleed parallax scrolling, ambient animation, and a custom soundtrack, resulting in a relaxing and serene digital escape.

---

## ✨ Features

- 🎭 **GSAP Snap-Scrolling**: A smooth, breath-like GSAP scroll transition system that snaps perfectly across 6 distinct pages.
- 🌅 **Cinematic Parallax**: Dynamic background imagery that responds to viewport scrolling, creating a three-dimensional depth effect.
- 🎵 **Grand Escape Soundtrack**: Ambient background music from Radwimps' *Grand Escape* that fades in/out dynamically using GSAP volume tweens.
- 💫 **Zen Floating Particles**: Light-reflecting floating amber particles drifting up slowly in the cove of each section.
- 📐 **Concentric Wave Logo**: A custom-designed SVG symbol representing waves rippling outward in a golden hour sun.
- 📱 **Liquid Responsiveness**: Adaptive layouts and typography scaling fluidly from mobile displays to 4K desktop screens.
- 📨 **Flickstudio Integration**: A custom poetic footer containing an interactive contact reveal card with glassmorphism effects.

---

## 🛠️ Technology Stack

- **Core**: React 19 + TypeScript
- **Styling**: Tailwind CSS v4 + Vanilla CSS Custom Overrides
- **Animation**: GSAP (GreenSock Animation Platform) + GSAP Observer + GSAP ScrollTrigger
- **Routing**: Wouter (Lightweight React Router)
- **Compiler**: Vite + @tailwindcss/vite (Native compiler)

---

## 📁 Project Structure

```text
coastal-serenity/
├── public/                 # Static Assets
│   ├── beach_assets/       # 4K Scenic Background Images
│   ├── favicon.svg         # Custom concentric wave favicon
│   └── grand_escape.mp3    # High-quality AMV soundtrack
├── src/
│   ├── components/         # Core UI Elements
│   │   ├── ui/
│   │   │   ├── sonner.tsx  # Shadcn/ui stubs
│   │   │   └── tooltip.tsx # Tooltip stubs
│   │   └── ErrorBoundary.tsx
│   ├── contexts/
│   │   └── ThemeContext.tsx # Dynamic dark/light theme state
│   ├── pages/
│   │   ├── Home.tsx        # Main homepage containing GSAP triggers
│   │   └── NotFound.tsx    # 404 page stub
│   ├── App.tsx             # App router & layout container
│   ├── index.css           # Global stylesheets & Tailwind v4 layers
│   └── main.tsx            # Application entry point
├── package.json            # Scripts & dependencies
├── vite.config.ts          # Vite aliases & bundler plugins
└── tsconfig.json           # TypeScript configuration
```

---

## 🚀 Getting Started

To run this project locally, make sure you have **Node.js** installed, then follow these steps:

### 1. Install Dependencies
```bash
npm install
```

### 2. Launch Development Server
```bash
npm run dev
```
Open `http://localhost:5173/` in your browser.

### 3. Build for Production
```bash
npm run build
```
Generates optimized static assets in the `dist/` directory.

---

> [!NOTE]  
> Dedicated to capturing stillness and the endless dialogue between the shore and the sky. Built for **Flickstudio**.
