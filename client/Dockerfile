FROM node:18-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm i
COPY . .
RUN npm run build

FROM node:18-alpine

COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/.next ./.next

CMD ["npm", "start"]