

FROM node:latest

WORKDIR /app/client

COPY ./client/build ./build

WORKDIR /app/server

COPY ./server/package*.json ./

RUN npm install

COPY ./server ./

CMD [ "node", "./index.js" ]