evee = (function() {
  var datas = new WeakStore();
  var funcs = new WeakStore();
  var mouseEvents = /click|mousedown|mouseup|mousemove/;

  return {
    Event: function(ev, data) {
      for (var item in ev)
        this[item] = ev[item];
      this.data = data;
      if (!this.target)
        this.target = ev.srcElement;
    },

    bind: function(el, event, fn, data) {
      var h = function(ev) {
        return fn.call(el, new evee.Event(ev, data));
      };
      funcs.set(fn, h);
      datas.set(fn, data);
      el.addEventListener(event, h);
    },

    unbind: function(el, event, fn) {
      var h = funcs.get(fn) || fn;
      el.removeEventListener(event, h);
      funcs.delete(fn);
      datas.delete(fn);
    },

    trigger: function(el, event) {
      var opts = {
        bubbles: true,
        cancelable: true,
      };
      var isMouseType = mouseEvents.test(event);
      var ev = isMouseType
        ? new MouseEvent(event, opts)
        : new Event(event, opts);
      el.dispatchEvent(ev);
      return ev;
    },
  };
})();
