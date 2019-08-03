FROM node:10.16.1-alpine

WORKDIR /app

COPY . /app

RUN npm run build

CMD npm run start
