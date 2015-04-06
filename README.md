# Web Boilerplate

Web Boilerplate is a starting point for platform agnostic web development.   

## Tooling / Technologies / Libs *(core only)*

- gulp
- browserify
- browser-sync
- node-sass
- compass
- stylus
- spritesmith
- bower
- rsync

### Install Node.js
we recommend installing node through nvm: *(replace the node version with the one of your choice)*

```bash
curl https://raw.githubusercontent.com/creationix/nvm/master/install.sh | bash
nvm install v0.12.2
nvm alias default v0.12.2
```

Web Boilerplate uses node-sass. for linting sass you need to install [Sass](http://sass-lang.com/install). 

### Install scss-lint

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

[https://github.com/h5bp/server-configs](https://github.com/h5bp/server-configs)


## Roadmap


## Frontend Coding Guidelines

* <http://codeguide.co/>
* <http://cssguidelin.es/>
* <http://sass-guidelin.es/>
* <https://github.com/styleguide/css/>
* <https://github.com/necolas/idiomatic-css/>
* <http://paulrobertlloyd.com/about/styleguide/>
* <https://github.com/airbnb/javascript/>

