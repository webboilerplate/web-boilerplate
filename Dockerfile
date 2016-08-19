FROM node:6
# FROM risingstack/alpine:3.4-v6.3.0-3.6.2

MAINTAINER Soenke Kluth <soenke.kluth@gmail.com>

ENV NODE_ENV=development

RUN mkdir /app

WORKDIR /app

RUN mkdir src
RUN mkdir build
RUN mkdir dist

#COPY src /app/src
COPY gulp /app/gulp
COPY lib /app/lib
COPY test /app/test
COPY server /app/server
COPY gulpfile.js /app/gulpfile.js
COPY package.json /app/package.json
COPY .babelrc /app/.babelrc
COPY .jscsrc /app/.jscsrc
COPY .jshintrc /app/.jshintrc
COPY .stylintrc /app/.stylintrc
COPY .sass-lint.yml /app/.sass-lint.yml

RUN npm install
# RUN npm run build

EXPOSE 3000


# CMD ["npm", "run", "dev"]
