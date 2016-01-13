## once.js

```js
evee.once(el, 'click', function(ev) {
});
```

## bind.js

Most of the time, you can just use `Function.bind` to achieve
what you want. But if that isn't your cup of tea, you can use
the bind plugin.

```js
// data is now available in ev.data
var fn = evee.make(data, function(ev) {
});
evee.on(el, t, fn);
evee.off(el, t, fn);

// Same as
var fn = evee.bind(el, t, data, function(ev) {
});
evee.off(el, t, fn);
```

## delegate.js

```html
<table>
  <tr class='h'>
    <td></td>
    <td></td>
  </tr>
</table>
```

```js
var fn = evee.delegate(table, 'click', '.h', function(ev, node) {
  // `ev.target` is the source node
  // `node` matches '.h'
});
```
