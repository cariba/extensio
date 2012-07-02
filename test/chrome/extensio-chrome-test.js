/*global QUnit:false, module:false, test:false, asyncTest:false, expect:false*/
/*global start:false, stop:false ok:false, equal:false, notEqual:false, deepEqual:false*/
/*global notDeepEqual:false, strictEqual:false, notStrictEqual:false, raises:false*/
(function( $ ) {

  // Log out failed tests { result, actual, expected, message }
  QUnit.log = function ( ob ) {

    if( ob.result !== true ) {
      console.log("- F -");
      console.log("Expected: ", ob.expected);
      console.log("Actual: ", ob.actual);
      console.log("Message: ", ob.message);
    }

  };

  // Log out a summary { failed, passed, total, runtime }
  QUnit.done = function ( ob ) {

    console.log("- D -", ob.runtime + "ms");
    if( ob.passed === ob.total ) {
      console.log("- OK -", ob.passed, " of ", ob.total);
    } else {
      console.log("- FAIL -", ob.failed);
    }

  };

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
   * Extensio Chrome
   */

  module('extensio#chrome-basic');

  test('exists', function () {
    equal(typeof xio, 'object', 'xio is an object');
  });

  test('xio.env', function () {
    equal(xio.env, 1, 'detects Chrome');
  });

  module('extensio#chrome-inject');

  test('xio.data', function () {
    equal(typeof xio.data, 'function', 'xio.data is a function');
  });

}( jQuery ));