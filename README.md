# Presentation Studio

Enterprise workspace for AI-generated presentations, flows, charts, and visual assets.

## Frontend

The React 19, TypeScript, Vite, and Tailwind CSS v4 application lives in `frontend/`.
Use pnpm for installation and scripts:

```sh
cd frontend
pnpm install
pnpm dev
pnpm typecheck
pnpm lint
pnpm test --run
pnpm build
```

Set `VITE_AZURE_TENANT_ID`, `VITE_AZURE_CLIENT_ID`, `VITE_AZURE_API_SCOPE`, and
`VITE_API_BASE_URL` for the Entra ID application and backend. For local UI work,
`VITE_AUTH_DISABLED=true` enables a mock administrator; do not enable it in
production. `VITE_PROMPT_BLOCKLIST` accepts additional comma-separated terms.

The Docker image injects the Azure and API settings at startup, so the same
frontend build can be promoted between environments.