# evee.js

Modular, modern, and tiny DOM events library.

 - Comes in at 0.3kB minified without any plugins
 - The entire suite (including all plugins) weighs
   in around 0.8kB minified and gzipped
 - Support for event delegation and data binding
 - No mucking around with prototypes
 - Extensible with [plugins](https://github.com/eugene-eeo/evee.js/tree/master/plugins)

Works great with [salt.js](https://github.com/james2doyle/saltjs)
and [nanojax](https://github.com/yanatan16/nanoajax).

## Usage

```html
<script src='/path/to/evee.js'></script>
```

```js
evee.on(el, 'click', function(ev) {
});
evee.fire(el, 'click');
evee.off(el, 'click', fn);
```

### Installation

```sh
$ bower install eugene-eeo/evee.js
```
