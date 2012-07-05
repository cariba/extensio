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
 
  /**
   * Basic extensio functionality
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
    equal(xio.env, 0, 'xio.env is 0 (no environment detected)');
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

  /**
   * DOM Manipulation & CSS
   */

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

  /**
   * Front-end extension
   */
  
  module('extensio#front-end');

  test('xio.insert', function () {
    equal(typeof xio.insert, 'function', 'is a function');

    var count = 0;

    var domarray =
      ['div', { 'class': 'inserted-wrapper' },
        ['i', { 'class': 'inserted-i' }],
        ['a', { 'class': 'inserted-a', 'href': '#', text: 'Hello!', click: function () { count += 1; } }]
      ];

    var inserted = xio.insert({
      id: 'test',
      container: '.test-container',
      build: domarray
    });

    var test = $('.inserted-wrapper');

    equal(inserted !== undefined, true, 'returns something');
    equal(test.length > 0, true, 'inserts elements');
    equal($('.test-container').text(), 'Test.Test2.Hello!', 'appends element');
    equal($('a', test).hasClass('inserted-a'), true, 'inserts children');
    equal($('a', test).text(), 'Hello!', 'inserts text');

    $('a', test).click();
    equal(count, 1, 'attaches even handlers');

    var inserted_after = xio.insert({
      id: 'test',
      container: '.test-container-after',
      after: '.test-inner',
      build: domarray
    });

    equal($('.test-container-after').text(), 'Test.Hello!Test2.', 'appends element after');

    var inserted_before = xio.insert({
      id: 'test',
      container: '.test-container-before',
      before: '.test-inner, .test-inner2',
      build: domarray
    });

    equal($('.test-container-before').text(), 'Hello!Test.Hello!Test2.', 'appends element before');

    var inserted_prepend = xio.insert({
      id: 'test',
      container: '.test-container-prepend',
      prepend: true,
      build: domarray
    });

    equal($('.test-container-prepend').text(), 'Hello!Test.Test2.', 'prepends element');

  });

  /**
   * Ports
   */
  
  module('extensio#script');

  test('xio.script', function () {
    equal(typeof xio.script, 'object', 'is an object');
  });

  test('xio.script.on', function () {
    equal(typeof xio.script.on, 'function', 'is a function');
    var token = xio.script.on( 'test', function () {});
    equal(typeof token, 'string', 'token is a string');
  });

  test('xio.script.subscribers', function () {
    equal(typeof xio.script.subscribers, 'function', 'is a function');
  });

  test('xio.script.publish', function () {
    equal(typeof xio.script.publish, 'function', 'is a function');
  });

}( jQuery ));