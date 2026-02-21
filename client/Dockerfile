# Stage 1
FROM node:24-alpine AS builder
RUN mkdir -p /application_root
WORKDIR /application_root
COPY . .
RUN npm ci
RUN npm run docker-build

# Stage 2
FROM nginx:1.27-alpine AS final
WORKDIR /usr/share/nginx/html
COPY --from=builder /application_root/dist/app/browser .
COPY nginx.conf /etc/nginx/conf.d/default.conf
