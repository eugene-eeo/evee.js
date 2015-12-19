# evee.js

```sh
$ bower install eugene-eeo/evee.js
```

Modular, modern, and tiny DOM events library. Comes in
at 0.3kB minified without including plugins. The entire
suite (including all plugins) weighs in around 1.7kB
minified. Works great with [salt.js](https://github.com/james2doyle/saltjs)
and [nanojax](https://github.com/yanatan16/nanoajax).

```js
evee.bind(el, 'click', function(ev) {
});
evee.trigger(el, 'click');
evee.unbind(el, 'click', fn);
```
