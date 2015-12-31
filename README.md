# evee.js

Modular, modern, and tiny DOM events library.

 - Comes in at 0.3kB minified without any plugins
 - The entire suite (including all plugins) weighs
   in around 0.9kB minified
 - Support for event delegation and Event data
 - No mucking around with prototypes
 - Extensible with [plugins](https://github.com/eugene-eeo/evee.js/tree/master/plugins)

Works great with [salt.js](https://github.com/james2doyle/saltjs)
and [nanojax](https://github.com/yanatan16/nanoajax).

## Usage

```html
<script src='/path/to/evee.js'></script>
```

```js
var fn = evee.on(el, 'click', function(ev) {
});
evee.fire(el, 'click');
evee.fire(el, 'click', override);
evee.off(el, 'click', fn);
```

### Installation

```sh
$ bower install eugene-eeo/evee.js
```
