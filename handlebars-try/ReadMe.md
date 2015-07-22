### Command for Precompiling Handlebars template

```bash
handlebars <input-file-with-path>.handlebars -f <output-file-with-path>.js
eg. handlebars handlebars-template/list-row.handlebars -f handlebars-precompiled-template/list-row.js
```
#####To convert to Require JS format
```bash
handlebars handlebars-template/list-row.handlebars -a -f handlebars-precompiled-template/list-row.js
```

#####For Template files keep the extension as .handlebars
	Once precompilation is done, you can access the compiled template directly (in your JS code), without the 
	handlebars extension as the file name, like this
```bash
<script src="list-row.js"></script> <!-- First include the compiled JS file after loading Handlebars.js -->
var template = Handlebars.templates['list-row']; //access the template reference 
var HTML = template(data); //pass the template reference some data or context
```
	
	
### Questions?
Feel free to contact me on [twitter](https://twitter.com/joseph_rialab) or [create an issue](https://github.com/jsphkhan/ReactNativeExamples/issues/new)

###License
####The MIT License (MIT)
Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
