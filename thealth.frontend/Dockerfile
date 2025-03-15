FROM node:alpine as build

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

RUN npm install -g http-server

EXPOSE 80

CMD ["http-server", "build", "-p", "80"]