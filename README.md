InstaSynchP-CSSLoader [![Build Status](https://travis-ci.org/Zod-/InstaSynchP-CSSLoader.svg?branch=master)](https://travis-ci.org/Zod-/InstaSynchP-CSSLoader)
=====================

Framework plugin to load and unload CSS urls

Framework
---------
The `cssLoader` plugin can be used to add and load styles. There can be several styles sharing a `<style>` so they can replace each other.
The id of the styles have to be the same for that. By default the name of the style will be used as the id.

The CSS content will be stored in a hidden setting to reduce loading times.

Plugins can put their styles in a array at `plugin.styles` where they will be grabbed by the core and added to the `cssLoader`.

#### `plugins.cssLoader.addStyle`
```javascript
plugins.cssLoader.addStyle({
    'id': 'id'
    'name': 'styleName',
    'url': 'url',
    'autoload': true/false
});
```
#### `cssLoader.loadStyle`
```javascript
plugins.cssLoader.loadStyle('styleName');
```
Events
------
```javascript
'CSSLoad[id]': []
```

Public Variables
---------
* `cssLoader.styles` object containing all the styles with their name as keys

License
-----------
The MIT License (MIT)<br>

&lt;InstaSynch - Watch Videos with friends.&gt;<br>
Copyright (c) 2014 InstaSynch

&lt;Bibbytube - Modified InstaSynch client code&gt;<br>
Copyright (C) 2014  Zod-

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
