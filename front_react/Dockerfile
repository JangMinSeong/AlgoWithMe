FROM node:21-alpine AS base

FROM base AS deps
RUN apk add --no-cache libc6-compat

FROM deps AS build
WORKDIR /app

COPY package.json  package-lock.json .npmrc .env.local ./

RUN npm ci

COPY . .

RUN npm run build

FROM nginx:alpine

COPY --from=build /app/dist /usr/share/nginx/html
COPY .nginx/nginx.conf /etc/nginx/conf.d/nginx.conf
RUN rm /etc/nginx/conf.d/default.conf

CMD ["nginx", "-g", "daemon off;"]
