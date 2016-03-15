!function() {
  var mouseEvents = /^click|mouse(down|up|move)$/;
  var keybdEvents = /^key(down|up|press)$/;

  evee = {
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
      var cons = mouseEvents.test(type)
        ? MouseEvent
        : (keybdEvents.test(type) ? KeyboardEvent : Event);
      el.dispatchEvent(new cons(type, config));
    },
  };
}();
