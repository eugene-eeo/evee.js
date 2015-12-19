evee = (function() {
  var store = new WeakStore();
  var mouseEvents = /click|mousedown|mouseup|mousemove/;

  var dataOf = function(el, type, fn) {
    var r = store.get(el) || (store.set(el, r={}), r);
    var o = r[type]       || (o = r[type] = new WeakStore(), o);
    var a = o.get(fn)     || (o.set(fn, a=[]), a);
    return a;
  };

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
      dataOf(el, type, fn).push(h);
      el.addEventListener(type, h);
    },

    unbind: function(el, type, fn) {
      fn = dataOf(el, type, fn).pop() || fn;
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
