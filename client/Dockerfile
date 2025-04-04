# FROM node:22.14.0-alpine

# WORKDIR /app

# COPY package*.json ./

# RUN npm install --force

# COPY . .

# EXPOSE 3000

# CMD ["npm", "start"]

FROM  node:22.14.0-alpine AS builder

WORKDIR /app

COPY package.json .

RUN npm install --force

COPY . .

RUN npm run build

FROM nginx:1.25.2-alpine-slim

COPY --from=builder /app/build /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]