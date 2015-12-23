evee.delegate = (function() {
  var e = Element.prototype;
  var matchesSelector = (
    e.matches
      || e.webkitMatchesSelector
      || e.mozMatchesSelector
      || e.msMatchesSelector
      || e.oMatchesSelector
  );

  return function(el, type, selector, fn) {
    return evee.on(el, type, function(ev) {
      var target = ev.target;
      while (target && (target !== el)) {
        if (matchesSelector.call(target, selector))
          fn(ev);
        target = target.parentNode;
      }
    });
  };
})();
