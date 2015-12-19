# evee.js

```sh
$ bower install eugene-eeo/evee.js
```

Tiny, modular, cross-browser, modern event binding micro-library
with support for leakless data-handler binding and triggering
events. Inspired by [arextar/Vine](https://github.com/arextar/Vine).

## Examples:

```js
evee.bind(el, 'click', function(ev) {
});

evee.unbind(el, 'click', handler);

// simulate a cancellable mouse click
evee.trigger(el, 'click');
```

## Plugins

### autobind.js

Magical data binding to help include some contextual data
without having to manage all the functions yourself.

```js
var fn = evee.au.make(data, function(ev) {
});
evee.bind(el, 'click', fn);
```
But wait, there's more!

```js
evee.au.bind(el, 'click', data, function(ev) {
  ev.data === data;
});

evee.au.unbind(el, 'click', fn);
```

### delegate.js

Event delegation support.

```js
var d = new evee.delegate(el);
d.bind('click', 'selector', function(ev) {
});
d.unbind('click', 'selector' [,fn]);
d.off();
```
