# FundFlow

A modern, high-end personal finance management application built with next-generation web technologies, designed to provide a digital sanctuary for your capital.

## 🏛 Architecture & Tech Stack

FundFlow is engineered using a robust, scalable architecture based on advanced industry patterns. For a comprehensive deep-dive into the project's structure, component registry, data models, and feature roadmap, please read the [**ARCHITECTURE.md**](./ARCHITECTURE.md) file included in this repository.

### Core Stack
- **Framework**: Next.js 15 (App Router) + React 19
- **Styling**: Tailwind CSS v4, shadcn/ui, Radix UI primitives
- **State Management**: Jotai (Atomic state mapping)
- **Fluid UI**: Motion (Framer), native CSS styling
- **Language**: TypeScript

## ✨ Key Features

- **Dashboard Intelligence**: A deeply intentional, minimalist overview tracking expenses and legacy wealth.
- **Dynamic Context Engines(Cmd+K)**: Utilize a fast, keyboard-first command menu allowing fluid switching between navigation views and instantaneous global thematic swapping.
- **Universal Typographic Switching**: Hot-swap between native developer fonts (`JetBrains Mono`), standard sans (`Inter`), and system-fallbacks on demand organically synced through our Jotai global store.
- **Architectural Scalability**: Strict modular separation separating feature modules into heavily cohesive blocks (ex: budgets, analytics, wallets, UI components). 

## 🚀 Getting Started

Ensure you have Node.js and **pnpm** installed:

```bash
# Clone the repository
git clone https://github.com/your-username/fundflow.git
cd fundflow

# Install dependencies
pnpm install

# Start the development server
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result. You can interact with the Command Palette utilizing `CMD + K` (or `CTRL + K`).

## 📜 License & Copyright
© 2024 FundFlow. All rights reserved.
