## once.js

```js
evee.once(el, 'click', function(ev) {
});
```

## autobind.js

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
var fn = evee.delegate(table, 'click', 'i', function(ev) {
});
```
