# evee.js

Modular, modern, and tiny DOM events library.

 - Comes in at 0.3kB minified without any plugins
 - The entire suite (including all plugins) weighs
   in around 0.8kB minified and gzipped
 - Support for event delegation and data binding
 - Works without the DOM
 - Easily extensible

Works great with [salt.js](https://github.com/james2doyle/saltjs)
and [nanojax](https://github.com/yanatan16/nanoajax).

## Usage

```html
<script src='/path/to/evee.js'></script>
```

```js
evee.bind(el, 'click', function(ev) {
});
evee.trigger(el, 'click');
evee.unbind(el, 'click', fn);
```

Evee.js by default does not include the data binding
or event delegation features. If you need those just
head to the [plugins](https://github.com/eugene-eeo/evee.js/tree/master/plugins).

### Installation

```sh
$ bower install eugene-eeo/evee.js
```
