# evee.js

Tiny, cross-browser, modern event binding micro-library
with support for leakless data-handler binding and triggering
events. Inspired by [arextar/Vine](https://github.com/arextar/Vine#vinejs).

## API Examples:

```js
evee.bind(elem, 'click', function(ev) {
    assert(this === elem);
    assert(ev.data === data);
    assert(ev.target === elem);
}, data);
```

```js
evee.unbind(elem, 'click', handler);
```

```js
// simulate a cancellable mouse click
evee.trigger(elem, 'click');
```
