evee = (function() {
  var mseEvents = /click|mousedown|mouseup|mousemove/;
  var kbdEvents = /keydown|keyup|keypress/;

  return {
    on: function(el, type, fn) {
      el.addEventListener(type, fn);
    },

    off: function(el, type, fn) {
      el.removeEventListener(type, fn);
    },

    fire: function(el, type) {
      var cons = mseEvents.test(type)
        ? MouseEvent
        : (kbdEvents.test(type) ? KeyboardEvent : Event);
      el.dispatchEvent(new cons(
        type, {
          bubbles: true,
          cancelable: true,
        }));
    },
  };
})();
