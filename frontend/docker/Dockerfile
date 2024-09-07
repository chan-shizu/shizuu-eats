FROM node:18

ENV APP_ROOT /frontend
RUN mkdir $APP_ROOT

COPY package.json $APP_ROOT/
COPY pnpm-lock.yml $APP_ROOT/

RUN npm install -g pnpm

WORKDIR $APP_ROOT