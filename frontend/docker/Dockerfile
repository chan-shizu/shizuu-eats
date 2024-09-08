FROM node:18

ENV APP_ROOT /frontend
RUN mkdir $APP_ROOT

COPY package.json $APP_ROOT/
COPY package-lock.json $APP_ROOT/

WORKDIR $APP_ROOT