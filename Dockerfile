FROM node:24-alpine AS dependencies
WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

FROM dependencies AS builder
COPY . .
ENV NODE_ENV=production
RUN yarn build

FROM node:24-alpine AS runner
WORKDIR /app
RUN mkdir .next
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

EXPOSE 3000
CMD ["node", "server.js"]