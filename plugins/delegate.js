(function() {
  var f = document.createElement('i');
  var matchesSelector = (
    f.matches
      || f.webkitMatchesSelector
      || f.mozMatchesSelector
      || f.msMatchesSelector
      || f.oMatchesSelector
  );

  var D = function(el) {
    if (!(this instanceof D))
      return new D(el);
    this.store = {};
    this.el = el;
  };

  D.prototype = {
    data: function(type, selector, handler) {
      var r = this.store[type] || (r = this.store[type] = {}, r);
      var a = r[selector]      || (a = r[selector] = []);
      return a;
    },

    bind: function(type, selector, fn, data) {
      var h = function(ev) {
        var target = ev.target;
        while (target !== this.el) {
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
          this.unbind(selector, type);
    },
  };

  evee.delegate = D;
})();
