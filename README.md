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
Copyright (C) 2013  InstaSynch

<Bibbytube - Modified InstaSynch client code>
Copyright (C) 2014  Zod-

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program.  If not, see <http://www.gnu.org/licenses/>.

http://opensource.org/licenses/GPL-3.0
