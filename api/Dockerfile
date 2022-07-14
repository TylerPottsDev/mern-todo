FROM node:16.14.0-alpine3.15 AS base
RUN apk update && apk upgrade && apk add --no-cache git file
RUN mkdir /app
WORKDIR /app
COPY package.json ./
COPY package-lock.json ./
COPY rds-combined-ca-bundle.pem ./

FROM base AS dist
RUN npm ci
COPY . .
RUN npm run build
RUN npm prune --production

FROM base AS release
ENV NODE_ENV production
COPY --from=dist /app/package.json ./package.json
COPY --from=dist /app/build ./
COPY --from=dist /app/node_modules ./node_modules
EXPOSE 3001
CMD ["npm", "run", "start"]
