# [![IOPA](http://iopa.io/iopa.png)](http://iopa.io)<br> iopa-templates 

[![Build Status](https://api.shippable.com/projects/56e23af39d043da07bb6ff01/badge?branchName=master)](https://app.shippable.com/projects/56e23af39d043da07bb6ff01) 
[![IOPA](https://img.shields.io/badge/iopa-middleware-99cc33.svg?style=flat-square)](http://iopa.io)
[![limerun](https://img.shields.io/badge/limerun-certified-3399cc.svg?style=flat-square)](https://nodei.co/npm/limerun/)

[![NPM](https://nodei.co/npm/iopa-template-handlebars.png?downloads=true)](https://nodei.co/npm/iopa-template-handlebars/)

## About
`iopa-templates` is IOPA middleware for rendering templates using template engine such as handlebars, moustache, dust, razor, etc

## Installation

```js
$ npm install iopa-templates
```

## Goals and Features

* Ability to support layouts

* Ability to support partials

* Ability to support precompiled templates for use on the client

* Ability to use a different template engines

## Installation

Install using npm:

```shell
$ npm install iopa-templates
```

## Basic Usage

```javascript
const iopa = require('iopa'),
      templates = require('iopa-templates'),
      handlebars = require('iopa-handlebars'),
      razor = require('iopa-razor')

var app = new iopa.App();
app.use(templates);
app.engine('.hbs', handlebars.engine({defaultLayout: 'main', views: 'test/views', partials: 'test/views/partials'}));
app.engine('.js.html', razor.engine({defaultLayout: 'index', views: 'test/views'}));

app.use(function(context, next) {
    return context.render('home.hbs', {modelkey: "value"} );
});

http.createServer(app.buildHttp()).listen(3000);
```

## License

Apache 2