evee.au = (function() {
  var store = new WeakStore();
  var dataOf = function(el, type, handler) {
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

  var make = function(fn, data) {
    return function(ev) {
      return fn.call(this, new Event(fn, data));
    };
  };

  return {
    make: make,
    bind: function(el, type, fn, data) {
      var h = make(fn);
      dataOf(el, type, fn).push(h);
      evee.bind(el, type, h);
    },
    unbind: function(el, type, fn) {
      evee.unbind(el, type, (dataOf(el, type, fn).pop() || fn));
    }
  };
})();
