//allow customized modules to override repo modules
//caller must require() this before other (customized) modules

'use strict';

//CAUTION: various places warn against using require.extensions, 
// but other places say it's locked and won't go away

//background info:
//http://thenodeway.io/posts/dangerous-module-design-patterns/
//https://stackoverflow.com/questions/28884377/better-way-to-require-extensions-with-node-js
//https://medium.freecodecamp.org/requiring-modules-in-node-js-everything-you-need-to-know-e7fbd119be8
//https://stackoverflow.com/questions/27948300/override-the-require-function

//dummy definition in case module not available:
const Module = require('module') || {};
if (!Module._extensions) Module._extensions = [];

//examples:
//Module._extensions[extension] = function (module, filename)
//{
//    module._compile(ret, filename);
//}
//require.extensions[".js"] = function(content,filename)
//{
//    sourcecode += "//Ending of "+filename;
//    return sourcecode;
//    return transpile_function(content);
//}
//require.extensions['coffee'] = function coffeescriptLoader(module, filename)
//{
//  var fileContent = fs.readFileSync(filename, 'utf8');
//  var jsContent = coffeescript.compile(fileContent);
//  module._compile(jsContent, filename);
//};


//bonus function:
//set top folder in global variable
const findParentDir = require('find-parent-dir');
//try { 
const top = findParentDir.sync(__dirname, "node_modules"); //my package container
//} catch(err) { console.error('error', err); 
//console.log("TOP", top);
global.top = top; //tell caller where top level folder is


//substitute customized module in place of repo module:
const fs = require('fs');
const path = require('path');
const glob = require('glob');

require.extensions['.js'] = 
//Module._extensions['.js'] =
function(module, filename)
{
//console.log("REQ", /*module,*/ filename);
//no workly; use sym link instead!    filename = filename.replace(/^top\//i, global.top); //allow caller to find parent easier
    var parsed = path.parse(require.resolve(filename));
//    if (parsed.base.match(/^my[^a-z0-9]/i)
    parsed.base = "my[!a-z]" + parsed.base; //TODO: escape base name?
    var found = glob.sync(path.format(parsed));
//console.log("looking for '%s', found? %d", filename, found && found.length, parsed);
    if (!found || !found.length) found = [filename]; //just use original file
//    else console.log("CUSTOMIZED: '%s' => '%s'", filename, found[0]);
    var content = fs.readFileSync(found[0], 'utf8');
    module._compile(content, found[0]);
};


//eof
