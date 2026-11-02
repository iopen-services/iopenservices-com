# Agentic Workflows & AI Guidelines

## Engineering Stance & Principles

- **Respect Framework Opinions**: Payload CMS v3 and Next.js App Router are highly opinionated. Adhere strictly to official patterns, conventions, and idiomatic APIs. Do not invent custom wrappers, bypass framework abstractions, or introduce ad-hoc shims where the framework provides a standard mechanism.
- **Root-Cause Engineering**: Fix underlying configuration, schema, or lifecycle issues directly. Do not implement band-aid workarounds, catch-all try/catches that hide errors, or speculative rewrites.
- **Minimal Mutation Principle**: Change only the files strictly required to fulfill the task and satisfy the test contract. Preserve existing architecture, project conventions, and formatting.

## System Rules & Operational Guardrails

- **Tool Capabilities & Workspace Scope**: You have full read and write access strictly scoped within this project repository root. You are expected and authorized to create, update, and delete repository files directly using your available tools. Never attempt to read, edit, or create files outside this workspace root, and never claim you lack permission to edit project files unless a tool returns an explicit OS-level error.
- **Package Manager**: Use `pnpm` exclusively (never `npm` or `yarn`).
- **Git Restrictions**: You may run `git status` or `git diff` for read-only inspection. Do NOT run mutating git commands (`git add`, `git commit`, `git push`, `git checkout`, `git reset`, `git stash`, etc.). All version control changes are managed exclusively by the user.
- **Environment & Secrets**: Never inline sensitive credentials into code, configs, or test fixtures—always reference `process.env`. Never modify `.gitignore`.
- **Database Safety & Inspection**:
  - Never execute destructive DDL commands, raw schema drops, or force-push migrations.
  - In `payload.config.ts`, `postgresAdapter` must always retain `push: false`.
  - **Read-Only Inspection**: You are authorized to run read-only SQL queries (`SELECT`) to inspect database state:
    - In integration tests: via `payload.db.drizzle.execute(sql`...`)`.
    - In terminal checks: via `docker exec -i iopenservices-com-postgres-1 psql -U <user> -d <database> -c "..."`.
  - Never execute `DROP`, `TRUNCATE`, or manual schema modifications.

## Architectural Topology & Infrastructure

Understand where code and services actually execute to avoid invalid assumptions:

- **Application Core**: Payload CMS v3 embedded inside the Next.js App Router (Node.js runtime; avoid Edge runtime for Payload handlers).
- **Local Dev Execution**: Next.js runs bare-metal on the macOS host machine (`localhost`).
- **Local Database**: PostgreSQL running inside local Docker container `iopenservices-com-postgres-1` (communicated via host network / mapped ports).
- **Remote / Cloud Database**: Supabase PostgreSQL (managed migrations; schema push is disabled).
- **Deployment & Hosting**: Vercel Serverless Functions. Disk storage is strictly ephemeral—local filesystem storage cannot persist across invocations.
- **Media & Asset Storage**: AWS S3 (`iopenservices-com-cdn`, `us-east-2`). Modern S3 with **Bucket Owner Enforced (ACLs disabled)**.
  - Follow vanilla Payload storage: store assets directly at the bucket root (no prefix).
  - Never pass `acl: 'public-read'` in collection configurations or upload calls (use `acl: 'private'` to avoid ACL errors).
  - Public asset delivery is governed via S3 bucket policy at the root.

## Testing Standards (TDD)

- **Framework**: Vitest (`pnpm vitest run <path>`).
- **Test Integrity**: Never modify or weaken test assertions, expectations, or fixtures solely to make a failing test pass. The implementation must adapt to satisfy the test contract, not the reverse. If an assertion is genuinely invalid due to an updated specification, document the rationale before changing it.
- **Colocation Pattern**: Always colocate integration/unit tests adjacent to the feature or collection being modified (e.g., `Media.spec.ts` in the same directory as `Media.ts`). Do not invent arbitrary `tests/` directories if the feature directory has its own structure.
- **Teardown Responsibility**: Any test that writes rows to the DB or uploads objects to S3 must clean up those exact records/keys in `afterAll` / `afterEach`.

## Execution Environment & Harness

- **Model & Inference**: Cloud API execution via OpenRouter. Instructions apply universally across any active reasoning or instruction-tuned model.
- **Custom Agentic Harness**: Managed CLI tooling, PR review workflows, integration test validation, and deployment gates.
  \=======

## Patterns

1. **AI-Assisted Development**:
   - Code generation via CLI prompts.
   - Automated PR reviews with agentic checks.
2. **Environment Sync**:
   - Local ↔ Staging ↔ Production database syncs (via Supabase).
