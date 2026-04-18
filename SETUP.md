# GreenPump Care Website — Setup Guide

## Project Structure

```
GreenPump Care Website/
├── DESIGN.md          # Design documentation/specs
├── .claude/           # Claude Code settings for the project root
└── client/            # Next.js 16 frontend app
    ├── src/           # Source code
    ├── public/        # Static assets
    ├── package.json
    └── ...
```

## Getting Started (Fresh Machine)

### Prerequisites
- Node.js 18+ (check with `node -v`)
- npm (comes with Node)

### Steps

1. **Navigate to the client directory:**
   ```bash
   cd "GreenPump Care Website/client"
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```

4. **Open in browser:**
   Visit [http://localhost:3000](http://localhost:3000)

### No `.env` file needed
This project has no environment variables — it's a frontend-only Next.js site with no backend API calls requiring secrets.

## Key Dependencies
- **Next.js 16.2.4** — React framework
- **React 19** — UI library
- **Tailwind CSS 4** — Styling
- **Motion** — Animations (Framer Motion successor)
- **Lucide React** — Icons
- **clsx / class-variance-authority** — Utility class helpers

## Other Commands
```bash
npm run build    # Production build
npm run start    # Run production build locally
npm run lint     # Run ESLint
```
