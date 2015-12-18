evee = (function() {
  var funcs = new WeakStore();
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
      funcs.set(fn, h);
      el.addEventListener(type, h);
    },

    unbind: function(el, type, fn) {
      var h = funcs.get(fn) || fn;
      el.removeEventListener(type, h);
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
