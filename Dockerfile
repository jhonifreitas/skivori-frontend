FROM node:24-alpine as dependencies
WORKDIR /app
COPY package.json .
RUN yarn install

FROM dependencies as builder
COPY . .
RUN yarn build

FROM node:24-alpine as runner
WORKDIR /app
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/next.config.ts ./next.config.ts
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next

EXPOSE 3000
CMD ["yarn", "start"]