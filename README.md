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

# Supabase Database Connection Patterns

## Environment Matrix

| Environment                 | Host                                 | Port   | Network | Username Format             | Use Case                        |
| :-------------------------- | :----------------------------------- | :----- | :------ | :-------------------------- | :------------------------------ |
| **Prod / Staging (Vercel)** | `db.[REF].supabase.co`               | `5432` | IPv6    | `postgres.[REF]`            | Runtime App / Serverless Edge   |
| **Local CLI / Migrations**  | `aws-0-[REGION].pooler.supabase.com` | `6543` | IPv4    | `postgres` + Tenant Options | `psql` / `pnpm payload migrate` |

---

## Working Connection Syntax

To avoid PgBouncer routing errors (`ENOIDENTIFIER` / `EAUTHQUERY`) on IPv4 connections, append the tenant reference option and truncate the username to `postgres`.

### 1. Interactive `psql` Shell

```bash
psql "host=aws-0-[REGION].pooler.supabase.com port=6543 dbname=postgres user=postgres options='reference=[REF]'" -W
```

### 2. Migration Connection String (`DATABASE_URI`)

```bash
DATABASE_URI="postgresql://postgres:[PASSWORD]@aws-0-[REGION].pooler.supabase.com:6543/postgres?options=reference%3D[REF]"
```

---

## Quick Reference Parameters

- **Project Ref:** `qihrxttlpnnruldoogwy`
- **AWS Region:** `us-east-2` (Ohio)
- **Pooler Endpoint:** `aws-0-us-east-2.pooler.supabase.com`
