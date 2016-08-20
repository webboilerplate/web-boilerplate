# Web Boilerplate

Web Boilerplate is a starting point for HTML5 web development.

You can kick off your next web / app front-end project without the timecost of setting up a fresh project with its file structure, building tasks, core files and core contents, SEO specific meta tags and accessibility, dependencies, deployment and so on...

## Tooling / Technologies / Libs *(core only)*

- [docker](http://docker.com)
- [node](http://nodejs.com)
- [npm](https://www.npmjs.com/) 
- [gulp](http://gulpjs.com)
- [browserify](http://browserify.org)
- [webpack](https://webpack.github.io) 
- [babel](https://babeljs.io)
- [browser-sync](http://www.browsersync.io)
- [node-sass](https://github.com/sass/node-sass)
- [stylus](https://learnboost.github.io/stylus)
- [image sprites via spritesmith](https://github.com/Ensighten/spritesmith)
- [svg sprites](https://github.com/Ensighten/spritesmith)
- [bower](http://bower.io)
- [rsync](https://github.com/jedrichards/rsyncwrapper)

## Setup

### Install Docker

- [docker for mac](https://docs.docker.com/docker-for-mac)
- [docker for windows](https://docs.docker.com/docker-for-windows)
- [docker for linux](https://docs.docker.com/engine/installation/linux)

## Development

You can either use the [web-boilerplate image](https://hub.docker.com/r/soenkekluth/web-boilerplate/) from [docker-hub](https://hub.docker.com/) or create your own images using the included Dockerfile

### Docker Compose
simply run:
`docker-compose up`

### Pull the [web-boilerplate](https://hub.docker.com/r/soenkekluth/web-boilerplate/) docker image from docker-hub and start development
`docker run -p 3000:3000 -p 3001:3001 --name web-boilerplate -v $(pwd)/src:/app/src --sig-proxy=false soenkekluth/web-boilerplate npm run dev`

if needed you can mount more than just the src folder. for example:

`docker run -p 3000:3000 -p 3001:3001 --name web-boilerplate -v $(pwd)/src:/app/src -v $(pwd)/gulp:/app/gulp -v $(pwd)/server:/app/server -v $(pwd)/lib:/app/lib -v $(pwd)/test:/app/test -v $(pwd)/package.json:/app/package.json -v $(pwd)/.babelrc:/app/.babelrc --sig-proxy=false soenkekluth/web-boilerplate npm run dev`

### Or build your own Docker Image
`docker build -t web-boilerplate .`

`docker run -p 3000:3000 -p 3001:3001 --name web-boilerplate -v $(pwd)/src:/app/src --sig-proxy=false web-boilerplate npm run dev`

## Distribute
`docker run --rm -v $(pwd)/src:/app/src -v $(pwd)/dist:/app/dist soenkekluth/web-boilerplate npm run dist`

## sass vs stylus
sass (scss) is used as the default preprocessor to generate your css files. if you want to use stylus instead just run :
`docker run .... web-boilerplate PREPROCESSOR=stylus npm run dev`


## Server Configs

if you may need any...
<https://github.com/h5bp/server-configs/>


## Frontend Coding Guidelines

* <http://codeguide.co/>
* <http://cssguidelin.es/>
* <http://sass-guidelin.es/>
* <https://github.com/styleguide/css/>
* <https://github.com/necolas/idiomatic-css/>
* <http://paulrobertlloyd.com/about/styleguide/>
* <https://github.com/airbnb/javascript/>
* <https://github.com/felixge/node-style-guide>
* <https://github.com/yandex/codestyle/blob/master/javascript.md>



