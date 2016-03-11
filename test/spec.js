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

 global.Promise = require('bluebird');

const templates = require('../index.js'),
    iopa = require('iopa'),
    stubServer = require('iopa-test').stubServer,
    should = require('should');

    describe('#IOPA Templates()', function() {

    it('should format template', function(done) {
        var app = new iopa.App();
        
        app.use(templates);
        
        app.engine('.hbs', function(view, options, callback) {
            callback(null, '<!doctype html><html><head></head><body><h1>Hello World</h1></body></html>');
        });
                
                
        app.use(function(context, next) {
            return context.render('home.hbs');
        });

        var server = stubServer.createServer(app.build())

        var context = server.receive();
        context.response["iopa.Body"].on('finish', function() {
            var responseBody = context.response["iopa.Body"].toString();
            responseBody.should.containEql('<h1>Hello World</h1>');
            done();
        });
    });
});
