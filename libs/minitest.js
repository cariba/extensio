/**
 * Minitest is a tiny Javascript test library for guerilla testing in the browser.
 *
 * It does not:
 *   - do asynchronous tests
 *   - non-strict equality
 *   - give you nicely styled output
 *   - tell you you're good looking
 *
 * You MUST run mt.fin() when you're done testing. You'd be an idiot not to.
 *
 * Another thing by phuu.
 * This code shall be used only for Good.
 * Do no Evil with this code.
 */
window.mt = (function () {

  /**
   * Initialises Minitest
   */
  var Minitest = function () {

    this.total = 0;
    this.assertions = 0;
    this.passed = 0;
    this.failed = 0;
    this.start = null;
    this.silent = false;

    this.current = null;
    this.buffer = [];
    
    this.msgs = {
      fail: '- F -',
      failed: '- F :',
      fin: '- D :',
      total: '- T :',
      assertions: '- A :'
    };
  };

  Minitest.fn = Minitest.prototype;

  /**
   * Wrap console.log so that Minitest can be run in quiet mode
   */
  Minitest.fn.log = function () {
    if( ! this.silent ) {
      console.log.apply( console, arguments );
    }
  };

  /**
   * Begins a new test
   *
   * Example usage:
   *
   *   mt.test('example', function () {
   *     mt.ok(false, 'This test will fail.');
   *     mt.ok(2 + 2 === 4, 'Hmm.');
   *   });
   *
   * Returns whether the test passed.
   */
  Minitest.fn.test = function ( id, cb ) {

    // If we're not already timing, get to it
    if( ! this.start ) {
      this.start = (new Date()).getTime();
    }

    // Keep track of how many tests have been run
    this.total += 1;
    // And which one we're currently running
    this.current = id;

    // Be nice, assume it works
    var pass = true;

    // Store how many failures we'd had before for reference
    var prev = this.failed;

    try {
      cb();
    } catch(e) {
      // Uhoh, we threw something
      pass = false;
      this.fail({
        id: this.current,
        err: e
      });
    }

    // Did any other things fail?
    if( this.failed > prev ) {
      pass = false;
    }

    if( pass ) {
      // If we passed, good to go, move on
      this.passed += 1;
    } else {
      // Otherwise show details about the failures
      this.flush();
    }

    this.current = null;

    return pass;

  };

  /**
   * The kernel of a test.
   *
   * Handles keeping track of everything so new test functionality is simple to write.
   *
   * Takes a test callback that should return true or false
   *
   * Example usage:
   *
   *  this.run(function ( some, arguments ) { ... });
   *
   * Returns whether the assertion passed.
   */
  Minitest.fn.run = function ( cb ) {

    // Don't run it if we're not in a test
    if( this.current === null ) {
      this.fail({
        id: 'mt',
        err: 'Please initiate a test before using ok( ... ).'
      });
      return false;
    }

    // Keep track of assertions
    this.assertions += 1;

    // Assume passed
    var pass = true, msg, test;

    try {

      // Run the test
      test = cb();

      // If it didn't pass, gather the data
      if( test.result !== true ) {
        pass = false;
        msg = {
          id: this.current,
          err: test.err
        };
      }

    } catch(e) {
      // Oop, something got thrown
      pass = false;
      msg = {
        id: this.current,
        err: e
      };
    }

    // Add it to the fail buffer
    if( ! pass ) {
      this.fail( msg );
    }

    return pass;

  };

  /**
   * A truth test.
   *
   * You are only shown the err if it fails.
   *
   * Example usage:
   *
   *  mt.ok(false, 'This test will fail.');
   *
   * Returns whether the assertion passed.
   */
  Minitest.fn.ok = function ( ob, err ) {

    return this.run(function () {

      // Truthify that ob
      ob = !! ob;
      
      // Oh noes, not truthy
      if( ! ob ) {
        return {
          result: false,
          err: err
        };
      } else {
        return {
          result: true
        };
      }

    });

  };

  /**
   * A strict equality test.
   *
   * You are only shown the err if it fails.
   *
   * Example usage:
   *
   *  mt.equal(false, true, 'This test will fail.');
   *
   * Returns whether the assertion passed.
   */
  Minitest.fn.equal = function ( actual, expected, err ) {

    return this.run(function () {

      if( actual !== expected ) {
        return {
          result: false,
          actual: actual,
          expected: expected,
          err: err
        };
      } else {
        return {
          result: true
        };
      }

    });

  };

  /**
   * Run if shit goes wrong.
   *
   * msg is an object:
   *
   *   {
   *     id: string, // where it broke
   *     err: string // what happened
   *   }
   *
   * Returns nada.
   */
  Minitest.fn.fail = function ( msg ) {
    this.failed += 1;
    this.buffer.push( [msg.id, ':', msg.err] );
  };

  /**
   * Make Minitest silent. Useful for unit testing Minitest.
   *
   * Returns nada.
   */
  Minitest.fn.silence = function ( yayornay ) {
    if( typeof yayornay === 'undefined' ) {
      yayornay = true;
    }
    this.silent = yayornay;
  };

  /**
   * Flush outputs the fail.
   *
   * Returns nada.
   */
  Minitest.fn.flush = function ( ) {
    var i = 0, length = this.buffer.length;
    for( ; i < length; i++ ) {
      this.log( this.msgs.fail );
      this.log.apply( this, this.buffer[i] );
    }

    this.buffer = [];
  };

  /**
   * MUST be run after all tests.
   *
   * Outputs a summary of things.
   *
   * Returns nada.
   */
  Minitest.fn.fin = function () {
    var elapsed = ((new Date()).getTime() - this.start);
    this.log( this.msgs.fin, elapsed + 'ms' );
    this.log( this.msgs.total, this.total );
    this.log( this.msgs.assertions, this.assertions );
    this.log( this.msgs.failed, this.failed );
  };

  return new Minitest();

}());