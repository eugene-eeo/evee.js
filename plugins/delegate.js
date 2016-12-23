!function() {
  var e = Element.prototype;
  var matchesSelector = (
    e.matches
      || e.webkitMatchesSelector
      || e.mozMatchesSelector
      || e.msMatchesSelector
      || e.oMatchesSelector
  );

  evee.delegate = function(el, type, selector, fn) {
    return evee.on(el, type, function(ev) {
      for (var node = ev.target; node && node !== el; node = node.parentNode)
        if (node.nodeType === 1 && matchesSelector.call(node, selector))
          return fn(ev, node);
    });
  };
}();
