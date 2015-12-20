evee.once = function(el, type, fn) {
  evee.on(el, type, function f(ev) {
    fn(ev);
    evee.off(el, type, f);
  });
};
