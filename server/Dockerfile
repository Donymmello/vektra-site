FROM node:20-alpine AS build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM node:20-alpine AS runtime
WORKDIR /app
ENV NODE_ENV=production
COPY package.json package-lock.json ./
RUN npm ci --omit=dev
COPY --from=build /app/dist ./dist

# SQLite file lives here — mount a volume on this path to persist leads
# across container restarts/redeploys (see docker-compose.yml).
VOLUME /app/data

EXPOSE 3001
CMD ["node", "dist/index.js"]
