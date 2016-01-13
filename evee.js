evee = (function() {
  var mseEvents = /^click|mouse(down|up|move)$/;
  var kbdEvents = /^key(down|up|press)$/;

  return {
    on: function(el, type, fn) {
      el.addEventListener(type, fn);
      return fn;
    },

    off: function(el, type, fn) {
      el.removeEventListener(type, fn);
    },

    fire: function(el, type, config) {
      config = config || {
        bubbles: true,
        cancelable: true,
      };
      var cons = mseEvents.test(type)
        ? MouseEvent
        : (kbdEvents.test(type) ? KeyboardEvent : Event);
      el.dispatchEvent(new cons(type, config));
    },
  };
})();
