evee.once = function(el, type, fn) {
  var f;
  evee.on(el, type, f=function(ev) {
    fn(ev);
    evee.off(el, type, f);
  });
};
