# --- Build stage -------------------------------------------------------
FROM node:20-alpine AS build
WORKDIR /app

# Baked into the built JS by Vite at compile time (see src/lib/consent.ts).
# Empty by default: GA stays disabled, the cookie banner still works fine.
ARG VITE_GA_MEASUREMENT_ID
ENV VITE_GA_MEASUREMENT_ID=$VITE_GA_MEASUREMENT_ID

COPY package.json package-lock.json ./
RUN npm ci

COPY . .
RUN npm run build

# --- Runtime stage -------------------------------------------------------
# Small, well-understood static file server. The public edge (TLS, routing
# to other services on the VPS) is handled separately by Caddy: see
# docker-compose.yml and DEPLOY.md.
FROM nginx:1.27-alpine AS runtime

COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80

HEALTHCHECK --interval=30s --timeout=3s --start-period=5s \
  CMD wget -qO- http://localhost/healthz || exit 1
