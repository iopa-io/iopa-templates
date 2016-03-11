/*
 * Copyright (c) 2016 Internet of Protocols Alliance (IOPA)
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

global.Promise = global.Promise || require('bluebird');

const templates = require('./index.js'),
    iopa = require('iopa'),
    http = require('http'),
    iopaConnect = require('iopa-connect')

var app = new iopa.App();
app.use(templates);
app.engine('.hbs', function(view, options, callback) {
    callback(null, '<!doctype html><html><head></head><body><H1>Hello World</H1></body></html>');
});

app.use(function(context, next) {
    return context.render('home.hbs');
});

var port = process.env.PORT || 3000;
http.createServer(app.buildHttp()).listen(port);
console.log('listening at:', port);