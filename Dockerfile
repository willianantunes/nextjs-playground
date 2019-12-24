FROM node:12.14.0-alpine

WORKDIR /app

COPY . /app

RUN npm run build

CMD npm run start
