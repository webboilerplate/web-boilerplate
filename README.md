# Web Boilerplate

Web Boilerplate is a starting point for platform agnostic HTML5 web development.

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
- [compass](http://compass-style.org)
- [spritesmith](https://github.com/Ensighten/spritesmith)
- [bower](http://bower.io)
- [rsync](https://github.com/jedrichards/rsyncwrapper)
- [npm](https://www.npmjs.com/) 

### Install Node.js
we recommend installing node through nvm: *(replace the node version with the one of your choice)*

```bash
curl https://raw.githubusercontent.com/creationix/nvm/master/install.sh | bash
nvm install v0.12.2
nvm alias default v0.12.2
```

### Install scss-lint
Web Boilerplate uses node-sass. for linting sass you need to install [sass](http://sass-lang.com/install). 

```bash
gem update --system && gem install scss-lint
```

*Windows user* have to install ruby first. then:

```bash
gem install windows-pr 
```
we also recommend to use cmder as the default console on Windows 
<http://gooseberrycreative.com/cmder/>




### recommended sublime-project file contents:
```
{
  "folders":
  [
    {
      "follow_symlinks": true,
      "path": ".",
      "folder_exclude_patterns": ["dist", "build", "material", "node_modules", "bower_components" ]
    }
  ],

  "ternjs": {
    "exclude": ["dist/**", "test/**", "build/**", "material/**", "node_modules/**", "bower_components/**" ],
    "libs": [ "browser", "underscore", "jquery", "ecma5" ]
  }
}

```

##start development:
Web Boilerplate will always check if your package.json has changed and will automatically install all new dependencies if there are any. If you work on a project in a team this might help you a lot ;)

```bash
npm start
```

if you get an error like "Package cairo was not found in the pkg-config search path." just can just ignore it. its an optional dependency used to generate sprites with spritesmith using canvassmith. if you like you can install it with `brew install cairo --without-x11`.

##restart development:
```bash
npm restart
```
the restart command will not preprocess / compile / transpile your code before it starts watching your files an run the dev server. if you work in a team we recommand to use start as your default command to start development

## distribute:
```bash
npm run dist
```
## deploy:
```bash
npm run deploy
```

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

