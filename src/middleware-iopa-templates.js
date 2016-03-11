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

const iopa = require('iopa'),
    IopaApp = iopa.App,
    constants = iopa.constants,
    IOPA = constants.IOPA,
    SERVER = constants.SERVER
    
const packageVersion = require('../package.json').version;

function IopaTemplates(app) {
    if (app.properties[SERVER.Capabilities][IOPA.CAPABILITIES.Templates])
        throw new Error("IOPA Templates is already installed on this app");
        
     app.properties[SERVER.Capabilities][IOPA.CAPABILITIES.Templates] = {};
     app.properties[SERVER.Capabilities][IOPA.CAPABILITIES.Templates][SERVER.Version] = packageVersion;  
     app.properties[SERVER.Capabilities][IOPA.CAPABILITIES.Templates][SERVER.RenderTemplate] = app.render.bind(app);
}

IopaTemplates.prototype.invoke = function IopaTemplates_invoke(context, next) {
     context.render = iopaTemplates_render.bind(context);
     return next();
}

module.exports = IopaTemplates;

var iopaTemplates_render = function iopaTemplates_render(view, data, callback){
       var context = this;
       var appRender = context[SERVER.Capabilities][IOPA.CAPABILITIES.Templates][SERVER.RenderTemplate];
    
        var done = callback;
        var data = data || {};
        
        if (typeof data === 'function') {
            done = data;
            data = {};
        }
        
        if (callback)
            appRender(view, data, callback);
        else
        {
            return new Promise(function(resolve, reject){
                appRender(view, data, function(err, body){
                    if (err)
                    {
                        context = null;
                        reject(err);   
                    }
                    else {
                        iopaTemplates_send(context, body);
                        context = null;
                        resolve(null);
                    }
                });
                
            })
        }             
};

var iopaTemplates_send = function iopaTemplates_send(context, body){                                      
     var chunk = new Buffer(body, 'utf8');
     var  contentType = 'text/html; charset=utf-8';
     context.response.writeHead(200, { 'Content-Type' : contentType,
                                               'Content-Length': chunk.length + ''}) ;
     context.response[IOPA.Body].end(chunk);     
 };