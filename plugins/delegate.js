(function() {
  var e = Element.prototype;
  var matchesSelector = (
    e.matches
      || e.webkitMatchesSelector
      || e.mozMatchesSelector
      || e.msMatchesSelector
      || e.oMatchesSelector
  );

  var D = function(el) {
    this.store = {};
    this.el = el;
  };

  D.prototype = {
    data: function(type, selector) {
      var r = this.store[type] || (r = this.store[type] = {}, r);
      var a = r[selector]      || (a = r[selector] = []);
      return a;
    },

    bind: function(type, selector, fn, data) {
      var h = function(ev) {
        var target = ev.target;
        while (target && (target !== this.el)) {
          if (matchesSelector.call(target, selector))
            fn.call(target, ev);
          target = target.parentNode;
        };
      };
      this.data(type, selector).push({
        o: fn,
        r: h,
      });
      evee.bind(this.el, type, h, data);
    },

    unbind: function(type, selector, fn) {
      var a = this.data(type, selector);
      for (var i = a.length; i--;)
        if (!fn || a[i].o === fn)
          evee.unbind(this.el, type, a[i].r);
    },

    off: function() {
      for (var type in this.store)
        for (var selector in this.store[type])
          this.unbind(type, selector);
    },
  };

  evee.delegate = D;
})();
