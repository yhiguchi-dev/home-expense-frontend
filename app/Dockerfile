FROM node:20 AS deps

WORKDIR /app

RUN npm i -g pnpm

COPY package.json ./
COPY pnpm-lock.yaml ./

RUN pnpm i

FROM deps AS builder

COPY . .
RUN pnpm build

FROM gcr.io/distroless/nodejs20-debian11:nonroot AS runner

WORKDIR /app

ENV NODE_ENV production

#COPY --chown=nonroot:nonroot --from=builder /app/public ./public
COPY --chown=nonroot:nonroot --from=builder /app/.next/standalone ./
COPY --chown=nonroot:nonroot --from=builder /app/.next/static ./.next/static

EXPOSE 3000
USER nonroot

ENV PORT 3000

CMD [ "server.js" ]