evee.make = (function() {
  var Event = function(ev, data) {
    this.data = data;
    for (var i in ev)
      this[i] = ev[i];
  };

  return function(data, fn) {
    return function(ev) {
      fn(new Event(ev, data));
    };
  };
})();

evee.bind = function(el, type, data, fn) {
  if (!fn) {
    fn = data;
    data = {};
  }
  return evee.on(el, type, evee.make(data, fn));
};
