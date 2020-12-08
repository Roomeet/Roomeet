FROM node:10.13.0-alpine

RUN mkdir -p /src/app

WORKDIR /src/app

COPY package.json /src/app/package.json

RUN npm i --silent

EXPOSE 3001

COPY . /src/app
