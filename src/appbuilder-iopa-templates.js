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
      path = require('path'),
      constants = iopa.constants,
      IOPA = constants.IOPA,
      SERVER = constants.SERVER
    
  /***
    * Method to add engine to IOPA App object)
    *
    * @param extname the extension to register for the engine e.g., ".hbs"
    * @param engine the function(view, options, callback) for the engine
    * @return {function(context)} IOPA application 
    * @public
    */
IopaApp.prototype.engine = IopaApp.prototype.engine || function ( extName, engine ) {
	 this[IOPA.CAPABILITIES.Templates] = this[IOPA.CAPABILITIES.Templates] || {};
     this[IOPA.CAPABILITIES.Templates][extName] = engine;
     return this;
 };

IopaApp.prototype.render = IopaApp.prototype.render || function ( view, options, callback ) {
    var extname = path.extname(view);
    var engines = this[IOPA.CAPABILITIES.Templates];
    if (extname == "")
    {
        var count = 0;
        var lastkey;
        for (var k in engines) { lastkey = k;  ++count };
        if (count == 1)
        {
            engines[lastkey](view + lastkey, options, callback);
            return;
        } else {
            callback(300);
            return;
        }
    }
    if (extname in engines) {
         engines[extname](view, options, callback);
         return;
    };
    
    callback(404);
 };
 
exports.default = "IOPA-TEMPLATES SUCCESSFULLY REGISTERED";