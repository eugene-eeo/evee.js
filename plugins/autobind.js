evee.au = (function() {
  var store = new WeakStore();
  var dataOf = function(el, type, fn) {
    var r = store.get(el) || (store.set(el, r={}), r);
    var o = r[type]       || (o = r[type] = new WeakStore(), o);
    var a = o.get(fn)     || (o.set(fn, a=[]), a);
    return a;
  };

  var Event = function(ev, data) {
    for (var i in ev)
      this[i] = ev[i];
    this.data = data;
  };

  var make = function(data, fn) {
    return function(ev) {
      fn(new Event(ev, data));
    };
  };

  return {
    make: make,
    on: function(el, type, data, fn) {
      var h = make(data, fn);
      dataOf(el, type, fn).push(h);
      evee.on(el, type, h);
    },
    off: function(el, type, fn) {
      evee.off(el, type, (dataOf(el, type, fn).pop() || fn));
    }
  };
})();
