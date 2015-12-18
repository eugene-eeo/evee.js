suite('evee', function() {
  var $ = document.getElementById.bind(document);
  var data = {r: 0};
  var elem = $('test');

  var handler = function(ev) {
    data.r += 1;
    assert(this === elem);
    assert(ev.data === data);
    assert(ev.target === elem);
  };

  test('evee#trigger works for normal events', function() {
    evee.bind(elem, 'focus', handler, data);
    evee.trigger(elem, 'focus');
    assert(data.r === 1);
  });

  test('evee#trigger works properly for mouse events', function() {
    evee.bind(elem, 'click', handler, data);

    evee.trigger(elem, 'click');
    assert(data.r === 2);
  });

  test('evee#unbind can unbind handlers', function() {
    evee.unbind(elem, 'click', handler);
    evee.trigger(elem, 'click');
    assert(data.r === 2);
  });

  test('evee#trigger triggers external handlers as well', function() {
    elem.addEventListener('click', function() {
      data.e = 1;
    });
    evee.trigger(elem, 'click');
    assert(data.e === 1);
  });
});
