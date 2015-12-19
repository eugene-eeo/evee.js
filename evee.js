evee = (function() {
  var mseEvents = /click|mousedown|mouseup|mousemove/;
  var kbdEvents = /keydown|keyup|keypress/;

  return {
    bind: function(el, type, fn) {
      el.addEventListener(type, fn);
    },

    unbind: function(el, type, fn) {
      el.removeEventListener(type, fn);
    },

    trigger: function(el, type) {
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
