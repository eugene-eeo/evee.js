describe('evee.au', function() {
  var $ = document.createElement.bind(document);

  describe('#make', function() {
    it('invokes the function when invoked', function(done) {
      var d = {};
      var h = evee.au.make(d, function() { done(); });
      h();
    });

    it('binds the data to the event', function() {
      var d = {r: 0};
      var h = evee.au.make(d, function(ev) {
        assert(ev.data === d);
      });
      h();
    });
  });

  describe('#on', function() {
    var elem = $('p');
    var data = {r: 0};
    
    it('binds the event handler', function(done) {
      evee.au.on(elem, 'click', data, function(ev) {
        done();
      });
      evee.fire(elem, 'click');
    });

    it('sets Event.data', function() {
      evee.au.on(elem, 'focus', data, function(ev) {
        assert(ev.data === data);
        assert(ev.target === elem);
      });
      evee.fire(elem, 'focus');
    });
  });

  describe('#off', function() {
    var elem = $('p');
    var data = {r: 0};

    it('unbinds the event handler', function() {
      var fn = function(ev) {
        data.r = 1;
      };
      evee.au.on(elem, 'click', data, fn);
      evee.au.off(elem, 'click', fn);
      evee.fire(elem, 'click');
      assert(data.r === 0);
    });

    it('unbinds unregistered handlers as well', function() {
      var fn = function(ev) {
        data.r = 1;
      };
      evee.on(elem, 'click', fn);
      evee.au.off(elem, 'click', fn);
      evee.fire(elem, 'click');
      assert(data.r === 0);
    });
  });
});
