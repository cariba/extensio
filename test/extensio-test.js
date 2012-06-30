/*global QUnit:false, module:false, test:false, asyncTest:false, expect:false*/
/*global start:false, stop:false ok:false, equal:false, notEqual:false, deepEqual:false*/
/*global notDeepEqual:false, strictEqual:false, notStrictEqual:false, raises:false*/
(function( $ ) {

  /*
    ======== A Handy Little QUnit Reference ========
    http://docs.jquery.com/QUnit

    Test methods:
      expect(numAssertions)
      stop(increment)
      start(decrement)
    Test assertions:
      ok(value, [message])
      equal(actual, expected, [message])
      notEqual(actual, expected, [message])
      deepEqual(actual, expected, [message])
      notDeepEqual(actual, expected, [message])
      strictEqual(actual, expected, [message])
      notStrictEqual(actual, expected, [message])
      raises(block, [expected], [message])
  */

  module('extensio#basic');

  test('exists', function () {
    equal(typeof xio, 'object', 'xio is an object');
  });

  test('logging', function () {
    equal(xio.logging, true, 'xio.logging is on');
    xio.logging = false;
    equal(xio.logging, false, 'xio.logging is off');
  });

  test('environment', function () {
    equal(xio.env, 1, 'xio.env is 1 (chrome detected)');
  });

  test('xio.error', function () {
    equal(typeof xio.error, 'function', 'is a function');
    equal(xio.error('Some error'), 'xio : Some error', 'returns non-fatal errors correctly');
    equal(xio.error({err: 'Some other error'}), 'xio : Some other error', 'returns non-fatal errors correctly');
    try {
      xio.error({
        err: 'Some fatal error',
        fatal: true
      });
    } catch (e) {
      equal(e, 'xio : Some fatal error', 'returns fatal errors correctly');
    }
  });

  module('extensio#dom');

  test('xio.build', function () {
    var elem = $('.test-elem')[0];
    var domarray =
      ['div', { 'class': 'test-elem' },
          ['a', { href: '#', text: 'Hello' }],
          ['strong', { text: 'I am strong!' }],
          'Testing'
      ];
    var newElem = xio.build(domarray);
    equal($(newElem).text(), $(elem).text(), 'correctly builds DOM elements');
  });

  test('xio.css', function () {
    var elem = $('.test-elem');
    var style = xio.css({
      a: {
        color: 'rgb(0, 255, 0)'
      },
      '.test-elem a, strong': {
        color: 'rgb(255, 0, 0)',
        'background-color': 'rgb(0, 0, 0)'
      }
    });
    equal($('.test-link').css('color'), 'rgb(0, 255, 0)', 'correctly styles using keys');
    equal($('a', elem).css('color'), 'rgb(255, 0, 0)', 'correctly styles using string selectors');
    equal($('a', elem).css('background-color'), 'rgb(0, 0, 0)', 'correctly handles multiple rules');
  });

}( jQuery ));