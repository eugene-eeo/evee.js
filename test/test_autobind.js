describe('evee.au', function() {
  var $ = document.querySelector.bind(document);

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

  describe('#bind', function() {
    var elem = $('#test');
    var data = {r: 0};
    
    it('binds the event handler', function(done) {
      evee.au.bind(elem, 'click', data, function(ev) {
        done();
      });
      evee.trigger(elem, 'click');
    });

    it('sets Event.data', function() {
      evee.au.bind(elem, 'click', data, function(ev) {
        assert(ev.data === data);
      });
      evee.trigger(elem, 'click');
    });
  });

  describe('#unbind', function() {
    var elem = $('#test');
    var data = {r: 0};

    it('unbinds the event handler', function() {
      var fn = function(ev) {
        data.r = 1;
      };
      evee.au.bind(elem, 'click', data, fn);
      evee.au.unbind(elem, 'click', fn);
      evee.trigger(elem, 'click');
      assert(data.r === 0);
    });

    it('unbinds unregistered handlers as well', function() {
      var fn = function(ev) {
        data.r = 1;
      };
      evee.bind(elem, 'click', fn);
      evee.au.unbind(elem, 'click', fn);
      evee.trigger(elem, 'click');
      assert(data.r === 0);
    });
  });
});
