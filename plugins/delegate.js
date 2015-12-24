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
      for (var node = ev.target; node !== el; node = node.parentNode)
        if (matchesSelector.call(node, selector))
          return fn(ev, node);
    });
  };
})();
