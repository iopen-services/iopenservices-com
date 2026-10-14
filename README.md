# Payload CMS Project

This project was created using the Payload CLI with the following command:

```bash
pnpm create payload-app@latest iopenservices-com -t website --use-pnpm -a claude
```

The switches used in the command are:

- `-t website`: specifies the template to use (in this case, the website template)
- `--use-pnpm`: instructs the CLI to use pnpm as the package manager
- `-a claude`: sets agent style to align with 'claude code'

## Development Pattern

We use a hybrid development environment:

- Next.js frontend runs locally on your machine
- PostgreSQL database runs in a Docker container
- `.env` file is used for local configuration

## Tools

We use:

- [aider](https://github.com/paul-gauthier/aider) for AI-powered code generation
- [custom agentic harness](https://github.com/iopen-services/agentic-tn) for agentic workflows

## Quick Start

To set up the project locally:

1. Copy `.env.example` to `.env` and configure environment variables
2. Start PostgreSQL with Docker: `docker-compose up -d`
3. Install dependencies: `pnpm install`
4. Run development server: `pnpm dev`
5. Open `http://localhost:3000` in your browser

## Environments

| Environment | URL                   | Host   | Admin Route | Database Provider   |
| ----------- | --------------------- | ------ | ----------- | ------------------- |
| Production  | www.iopenservices.com | Vercel | /admin      | Supabase            |
| Staging     | sss.iopenservices.com | Vercel | /admin      | Supabase            |
| Local       | http://localhost:3000 | Local  | /admin      | PostgreSQL (Docker) |

## About iOpen Services LLC

This website promotes iOpen Services LLC, showcasing our services and expertise. The site features:

- Company information and services
- Contact form for inquiries

For more information, visit [www.iopenservices.com](https://www.iopenservices.com).

## Development Notes

- **Pattern**: Next.js runs locally while PostgreSQL runs in Docker
- **Configuration**: `.env` file handles local configuration
- **Tools**:
  - [aider](https://github.com/paul-gauthier/aider) for AI-powered code generation
  - [customer agentic harness](https://github.com/iopen-services/customer-agentic-harness) for agentic workflows
