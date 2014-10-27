InstaSynchP-CSSLoader
=====================

Plugin to load and unload CSS urls

Framework
---------
The `cssLoader` object can be used to add and load styles. There can be several styles sharing a `<link>` so they can replace each other.
The id of the styles have to be the same for that.

#### `cssLoader.add`
```javascript
cssLoader.add({
    'id': 'id' /*id of the <link> element, name will be used if not set*/
    'name': 'styleName',
    'url': 'url',
    'autoload': true/false
});
```
#### `cssLoader.load`
```javascript
cssLoader.load('styleName');
```
Events
------
To avoid loading issues events will be fired once a style has been loaded with the `<link> onLoad` event
```javascript
'CSSLoad[id]': []
```

Public Variables
---------
* `cssLoader.styles` object containing all the styles

License
-----------
<InstaSynch - Watch Videos with friends.>
The MIT License (MIT)

Copyright (c) 2014 InstaSynch

<Bibbytube - Modified InstaSynch client code>
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
