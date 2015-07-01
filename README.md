WebApp Template
===================

Basic web app template / skeleton as a starter for new projects. Can be used to build SPAs.

Includes AngularJS, SASS, jQuery and gives you a basic folder structure to start with.

Inspired to follow <a href="https://github.com/johnpapa/angular-styleguide">John Papa's Angular Style Guide</a>

## Installation
 - install nodejs (in order to get npm)
 - run the following
```
npm install -g bower
npm install -g gulp
```
 - load all node_modules via:
```
npm install
```
 - load all bower_components via:
```
bower install
```
 - build and set up everything by running:
```
gulp
```

## Execution

When python is installed open a terminal in the root directory of the project. Run the following command to start a simple HTTP server:

```
python -m SimpleHTTPServer
```
or with python3:
```
python -m http.server
```

After that you can access the web app template on ```localhost:8000/app```

## Developing

You can enable the watcher to monitor your scss files and compile them automatically into css by running:

```
gulp watch
```