FROM node:22.14.0-alpine

WORKDIR /server

COPY package*.json ./

RUN npm install --force

COPY . .

EXPOSE 3001

CMD ["npm", "start"]
