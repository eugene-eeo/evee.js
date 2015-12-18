evee = (function() {
  var store = new WeakStore();
  var mouseEvents = /click|mousedown|mouseup|mousemove/;

  return {
    Event: function(ev, data) {
      for (var item in ev)
        this[item] = ev[item];
      this.data = data;
    },

    bind: function(el, type, fn, data) {
      var h = function(ev) {
        return fn.call(el, new evee.Event(ev, data));
      }; 
      var r = store.get(el) || {};
      var o = r[type] || new WeakStore();
      o.has(fn)
        ? o.get(fn).push(h)
        : o.set(fn, [h]);
      r[type] = o;
      store.set(el, r);
      el.addEventListener(type, h);
    },

    unbind: function(el, type, fn) {
      if (store.has(el)) {
        var r = store.get(el) || {};
        var o = r[type];
        if (o && o.has(fn)) {
          fn = o.get(fn).pop();
          o.delete(fn);
        }
      }
      el.removeEventListener(type, fn);
    },

    trigger: function(el, type) {
      var cons = mouseEvents.test(type) ? MouseEvent : Event;
      el.dispatchEvent(new cons(
        type, {
          bubbles: true,
          cancelable: true,
        }));
    },
  };
})();
