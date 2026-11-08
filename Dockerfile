# Use lightweight Node 20 LTS base image
FROM node:20-alpine AS builder

WORKDIR /app

# Copy root & server package manifests
COPY package.json ./
COPY server/package.json ./server/

# Install dependencies
WORKDIR /app/server
RUN npm install

# Copy server source code and tsconfig
COPY server/ ./

# Build TypeScript to production JavaScript (dist/)
RUN npm run build

# Production Runner stage
FROM node:20-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV PORT=10000

# Copy node_modules and built dist folder
COPY --from=builder /app/server/node_modules ./node_modules
COPY --from=builder /app/server/dist ./dist
COPY --from=builder /app/server/package.json ./package.json

# Copy persistent initial data
COPY server/data ./data
COPY server/uploads ./uploads

EXPOSE 10000

# Start production server
CMD ["node", "dist/app.js"]

