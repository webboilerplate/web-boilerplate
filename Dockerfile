FROM node:6

ENV NODE_ENV=development

WORKDIR /usr/local/src

RUN mkdir build
RUN mkdir dist

COPY src /usr/local/src/src
COPY gulp /usr/local/src/gulp
COPY lib /usr/local/src/lib
COPY server /usr/local/src/server
COPY package.json /usr/local/src/package.json
COPY .babelrc /usr/local/src/.babelrc
COPY gulpfile.js /usr/local/src/gulpfile.js

RUN npm install
RUN npm run build

EXPOSE 3000


CMD ["npm", "run", "dev"]
