FROM node:22-bookworm-slim

WORKDIR /app
ENV NODE_ENV=production

# The server bundle is self-contained; the Windows Electron binary and
# provider secrets are intentionally excluded from the web image.
COPY ["portal-host.cjs", "./"]
COPY ["dist", "./dist"]

EXPOSE 3000
CMD ["node", "portal-host.cjs"]
