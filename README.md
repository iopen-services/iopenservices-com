# Company website for iOpen Services LLC at www.iopenservices.com

This is a Next.js + Payload CMS website deployed on Vercel, with Supabase for production/staging databases and AWS S3 for media storage.

## Quick Start

### Local Development

1. **Start Orbstack**: `orb start`
2. **Configure Environment**:
   ```bash
   cp .env.example .env  # Configure variables
   docker-compose up -d  # Start PostgreSQL (local)
   pnpm install          # Install dependencies
   pnpm dev             # Run dev server
   ```
3. Open `http://localhost:3000` in your browser.

### Tech Stack

- **Frontend**: Next.js (App Router), React, PostCSS
- **Backend**: Payload CMS v3.x (TypeScript)
  - **APIs**: GraphQL + REST (`/api/...`)
  - **Database**:
    - **Local**: PostgreSQL (Docker)
    - **Staging/Production**: Supabase
  - **Media Storage**: AWS S3 (US-East-2)
- **Infrastructure**:
  - **Hosting**: Vercel (frontend + serverless)
  - **AWS**: S3 bucket for media (US-East-2)
- **Testing**: Playwright (e2e), Vitest (unit)
- **Tooling**: pnpm, Docker, Design Tokens (`packages/tokens`)

## Environments

| Environment | URL                     | Host   | Database   | Media Storage      |
| ----------- | ----------------------- | ------ | ---------- | ------------------ |
| Production  | www.iopenservices.com   | Vercel | Supabase   | AWS S3 (US-East-2) |
| Staging     | staging.iopenservice... | Vercel | Supabase   | AWS S3 (US-East-2) |
| Local       | http://localhost:3000   | Local  | PostgreSQL | Local filesystem   |

## Development Notes

- **AI Tools**:
  - OpenCode
  - OpenRouter
  - DeepSeek V3 for coding
  - DeepSeek R1 for architecture and code design
- **Pattern**: Hybrid local/Docker dev (Next.js + PostgreSQL).
