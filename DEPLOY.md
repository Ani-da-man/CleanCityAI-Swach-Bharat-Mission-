# Public reviewer deployment

The hackathon brief requires a live browser link that opens without an access request. This project is packaged as a Docker web service for that purpose.

## Render (recommended)

1. Put this folder in a public GitHub repository. Do not commit `.env.local` or any API key.
2. In Render, choose **New + → Blueprint** and select the repository.
3. Render detects `render.yaml`, builds the Docker image, and gives you a public `onrender.com` URL.
4. Open the URL in an incognito window and verify the citizen flow: Report Issue → upload image → Scan → view detection/report.
5. Leave `DEMO_MODE=true` for a key-free reviewer demo, or add provider variables in Render Environment for live AI. If a key is added, set `DEMO_MODE=false` to use the configured model.

The demo mode uses synthetic data and a clearly labelled synthetic detection so the journey remains reviewable without exposing a secret or depending on a private local service.

## Local Docker check

```bash
docker compose up --build
```

Then open `http://localhost:3000`.

## Submission checklist

- Public URL opens without login or access approval.
- No real IDs, passwords, OTPs, payment data, or government-system credentials are used.
- Demo mode and remaining mocked dependencies are disclosed.
- Record a maximum two-minute video: first minute as a citizen, second minute explaining the build and choices.
