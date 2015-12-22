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

    on: function(type, selector, fn) {
      var h = function(ev) {
        var target = ev.target;
        while (target && (target !== this.el)) {
          if (matchesSelector.call(target, selector))
            fn(ev);
          target = target.parentNode;
        }
      };
      evee.on(this.el, type, h);
      this.data(type, selector).push({
        o: fn,
        r: h,
      });
    },

    off: function(type, selector, fn) {
      if (!type) {
        for (type in this.store)
          this.off(type);
        return;
      }
      if (!selector) {
        for (selector in this.store[type])
          this.off(type, selector);
        return;
      }
      var a = this.data(type, selector);
      for (var i = a.length; i--;)
        if (!fn || a[i].o === fn) {
          evee.off(this.el, type, a[i].r);
          a.splice(i, 1);
        }
    },
  };

  evee.delegate = D;
})();
