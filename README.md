# Swachh Bharat Urban — Public-service sanitation POC

An independent hackathon prototype that makes sanitation issue reporting clearer for Indian citizens: upload a photo, receive a visual issue scan, submit a location-aware report, and ask the assistant for sanitation guidance.

## Run locally

### Browser / Node

```bash
node portal-host.cjs
```

Open the printed local URL. If no AI provider key is configured, the app automatically uses its labelled synthetic demo mode.

### Docker

```bash
docker compose up --build
```

## Public deployment

See [DEPLOY.md](DEPLOY.md). The recommended reviewer build is a public Render Node web service generated from `render.yaml`; it avoids Docker cache/build issues.

This is an independent prototype, not an official government service. It uses synthetic dashboard data and does not connect to live government systems.

For Render, upload this folder's contents—not the ZIP itself—as the repository contents. The server bundle is in `dist/` at the repository root.
