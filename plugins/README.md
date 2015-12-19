## once.js

```js
evee.once(el, 'click', function(ev) {
});
```

## autobind.js

```js
// data is now available in ev.data
var fn = evee.au.make(data, function(ev) {
});
evee.on(el, t, fn);
evee.off(el, t, fn);
```

```js
// things just work automagically (tested)
evee.au.on(el, t, data, fn);
evee.au.off(el, t, fn);
```

How does it work? Autobind's `on` and `off` works by
having a weakmap of all elements to objects that
store event types and weakmaps of original functions
to the bound functions. Essentially,

```
WeakMap(Element -> {
  selector:String -> WeakMap(
    original:Function -> Array(bound:Function)
    )
})
```

So when you `off` a "normal" function autobind will
remember and know which handler you want to remove.
Note that autobind's `off` function gives priority
to functions bound using `on`, that is, to the
elements and functions that it has "seen" before.

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
var d = new evee.delegate(table);
d.on('click', 'td', fn);   // fn responds to click events on tds
d.on('click', '.h', fn);   // css selectors supported as well

d.off('click', 'td', fn);  // unbind a specific handler
d.off('click', 'td');      // off all click handlers of the same selector
d.off('click');            // off all click handlers
d.off();                   // off everything
```
