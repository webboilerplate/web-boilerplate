# Web Boilerplate

Web Boilerplate is a starting point for HTML5 web development.

It lets you kick off your next web / app front-end project without the timecost of setting up a fresh project with all file structure, building tasks, core files and core contents with SEO and accessibility, dependencies, deployment and so on...
Web Boilperplate enhances! the best parts of [Web Starter Kit](https://developers.google.com/web/starter-kit/), [HTML5 Boilperplate](https://html5boilerplate.com), [Gulp Starter](https://github.com/greypants/gulp-starter) among others and of course some of my own approaches in professional web development.

## Tooling / Technologies / Libs *(core only)*

- [gulp](http://gulpjs.com)
- [browserify](http://browserify.org)
- [webpack](https://webpack.github.io) 
- [ES6](https://people.mozilla.org/~jorendorff/es6-draft.html)
- [browser-sync](http://www.browsersync.io)
- [node-sass](https://github.com/sass/node-sass)
- [stylus](https://learnboost.github.io/stylus)
- [spritesmith](https://github.com/Ensighten/spritesmith)
- [bower](http://bower.io)
- [rsync](https://github.com/jedrichards/rsyncwrapper)
- [npm](https://www.npmjs.com/) 

## Development

You can either use the [web-boilerplate image](https://hub.docker.com/r/soenkekluth/web-boilerplate/) from [docker-hub](https://hub.docker.com/) or create your own images using the included Dockerfile

### Create a docker container from docker-hub and start development
`docker run -p 3000:3000 -p 3001:3001 --name web-boilerplate -v $(pwd)/src:/usr/local/src/src --sig-proxy=false soenkekluth/web-boilerplate npm run dev`

### or build your own Docker Image
`docker build -t web-boilerplate .`

### and run your Docker Container for development
`docker run -p 3000:3000 -p 3001:3001 --name web-boilerplate -v $(pwd)/src:/usr/local/src/src --sig-proxy=false web-boilerplate npm run dev`

## Distribute
`docker run --rm -v $(pwd)/src:/usr/local/src/src -v $(pwd)/dist:/usr/local/src/dist soenkekluth/web-boilerplate npm run dist`



## Server Configs

<https://github.com/h5bp/server-configs/>

if you may need any...


## Roadmap
...

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



