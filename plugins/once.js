evee.once = function(el, type, fn) {
  var f;
  evee.bind(el, type, f=function(ev) {
    fn(ev);
    evee.unbind(el, type, f);
  });
};
