#Stage 1
FROM node:10-alpine as builder
RUN mkdir -p /application_root
WORKDIR /application_root
COPY . .
RUN npm install
RUN npm run docker-build & ls dist/app

#Stage 2
FROM nginx:1.17.1-alpine as final
WORKDIR /usr/share/nginx/html
COPY --from=builder /application_root/dist/app .
COPY nginx.conf /etc/nginx/conf.d/default.conf
