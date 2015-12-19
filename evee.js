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
      var cons;
      cons = mseEvents.test(type) ? MouseEvent : Event;
      cons = kbdEvents.test(type) ? KeyboardEvent : cons;
      el.dispatchEvent(new cons(
        type, {
          bubbles: true,
          cancelable: true,
        }));
    },
  };
})();
