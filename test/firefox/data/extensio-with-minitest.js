/*! extensio - v0.0.2 - 2012-07-06
* Copyright (c) 2012 Tom Ashworth; MIT License */

/**
 * Minitest is a tiny Javascript test library for guerilla testing in the browser.
 *
 * It does not:
 *   - do asynchronous tests
 *   - do non-strict equality
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

    this.done = false;
    this.total = 0;
    this.assertions = 0;
    this.passed = 0;
    this.failed = 0;
    this.start = null;
    this.silent = false;

    this.current = null;
    this.buffer = [];
    
    this.msgs = {
      fail:       'F !',
      failed:     'F :',
      fin:        'D :',
      test:       'T :',
      assertions: 'A :'
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

    this.log(this.msgs.test, id);

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
    if( this.done === true ) {
      return;
    }
    this.done = true;
    var elapsed = ((new Date()).getTime() - this.start);
    this.log( this.msgs.fin, elapsed + 'ms' );
    this.log( this.msgs.test, this.total );
    this.log( this.msgs.assertions, this.assertions );
    this.log( this.msgs.failed, this.failed );
  };

  return new Minitest();

}());
/**
 * extensio
 *
 *
 * TODO:
 *   Add extension side code & tests.
 *     In Firefox this will be a CommonJS module (how to do testing?)
 */

(function ( global, $, undefined ) {

  /**
   * Don't create two xios
   */
  if( global.xio ) {
    console.log( "xio found in global scope." );
    return;
  }

  /**
   * Initialise xio (automatic)
   */
  var Xio = function () {
    /**
     * Information & constants
     */
    this.id = 'xio';
    this.environments = {
      chrome: 1,
      firefox: 2,
      safari: 3
    };

    // Directly log errors?
    this.logging = true;

    // Detect the current environment & extend Xio using the
    // appropriate environment code
    this.env = 0;
    this.envName = '';
    this.contentScript = true;
    // Chrome
    if( window.chrome ) {
      this.env = this.environments.chrome;
      this.envName = 'chrome';
      // Are we in a content script?
      if( window.chrome.permissions ) {
        this.contentScript = false;
      }
    }
    // Safari
    else if( window.safari ) {
      this.env = this.environments.safari;
      this.envName = 'safari';
      // Content script?
      if( window.safari.settings ) {
        this.contentScript = false;
      }
    }
    // Firefox
    else if( window.self && (window.self.port || window.self.id) ) {
      this.env = this.environments.firefox;
      this.envName = 'firefox';
      // Content script
      if( window.self.id ) {
        this.contentScript = false;
      }
    }
    // Other (error!)
    else {
      // Only throw a fatal error if we're in an extension
      if( window.xio_development !== true ) {
        this.error({
          err: "Environment not known.",
          fatal: true
        });
      }
    }

    /**
     * Initialise the script API
     */
    this.createScriptAPI();
  };

  /**
   * isX methods are for determining which evironment we are in.
   *
   * Returns true or false
   */
  Xio.prototype.isChrome = function () {
    return this.env === this.environments.chrome;
  };
  Xio.prototype.isFirefox = function () {
    return this.env === this.environments.firefox;
  };
  Xio.prototype.isSafari = function () {
    return this.env === this.environments.safari;
  };
  Xio.prototype.isContentScript = function () {
    return this.contentScript;
  };
  Xio.prototype.isDOMPresent = function () {
    return typeof global.document !== "undefined";
  };

  /**=============================================================
   Utility
   =============================================================**/

  /**
   * Nicer error handling
   *
   * ob is an object or a string
   *   'Some error'
   *
   *   {
   *     err: 'Some other error', // string or array
   *     fatal: true // Boolean, if true then xio will throw an exception
   *   }
   *
   * Example usage:
   *   xio.error('No milk to make tea.');
   *
   *   xio.error({
   *     err: ['We're out of bacon', 'and biscuits.'],
   *     fatal: true
   *   });
   *
   * Returns a string representation of the error
   */
  Xio.prototype.error = function ( ob ) {
    // Make sure that ob is an object,
    // and that ob.err is an array
    if( typeof ob === 'string' ) { ob = {err: [ob], fatal: false}; }
    if( ! $.isArray( ob.err ) ) { ob.err = [ob.err]; }
    // Build the error array
    var error = [ this.id, ':' ].concat( ob.err );
    // Throw an exception on fatal errors,
    // otherwise log the error and return it
    if( ob.fatal ) { throw error.join( ' ' ); }
    else if ( this.logging ) { console.log.apply( console, error ); }
    return error.join( ' ' );
  };

  /**=============================================================
   DOM & CSS Methods
   =============================================================**/

  /**
   * Quickly build DOM elements without using strings.
   * Relies on jQuery's DOM construction methods
   *
   * ob is an array with the following syntax:
   *   [ element [string], attributes [object], childElement1 [array], ..., childElementN [array] ]
   *
   * Attributes and child elements are optional.
   *
   * You can also pass a string instead of a child element if you'd just like some content to be added.
   *
   * The attributes object may contain any methods jQuery DOM methods (like click, text and css) so you
   * can attach event handlers / call methods on the object at construction.
   *
   * The 'class' must be quoted as it is a Javascript keyword.
   *
   * Example usage:
   *   ['div', { 'class': 'example-elem' },
   *     ['a', { href: '#', text: 'A link' }],
   *     ['strong', { text: 'I am strong!' }]
   *   ]
   *
   * Returns a DOM element.
   */
  Xio.prototype.build = function( ob ) {

    // Don't run anything with using jQuery in a DOMless environment
    if( this.isContentScript() && ! this.isDOMPresent() ) {
      return this.error({
        err: 'xio.build does not work in a non-content-script context.',
        fatal: true
      });
    }

    // Ensure that ob is an array
    if( ! $.isArray( ob ) ) {
      return this.error({
        err: 'ob must be an array for DOM building.',
        fatal: true
      });
    }

    // First element of the array is the tag name
    var tag = ob[0];

    // Ensure that tag is a string
    if( typeof tag !== 'string' ) {
      return this.error({
        err: 'The first element of the DOM array must be a string.',
        fatal: true
      });
    }

    // Second element of the array is an attributes object (optional)
    var attr = ob[1];

    // Ensure that attr is an object
    if( typeof attr === 'undefined' || typeof attr !== 'object' || $.isArray( attr ) ) {
      // Send a (hopefully helpful) error if the user passes in an array
      if( $.isArray( attr ) ) {
        this.error({
          err: 'The second element of the DOM array should be an attribute object, not an array. The child elements should be from the third element onward.'
        });
      }
      // Make attr an object
      attr = {};
    }

    // Form the jQuery element string and then build an element
    var html = ['<', tag, '/>'].join('');
    var temp = $(html, attr);

    // Iterate through the other elements of ob (child elements),
    // generate new elements if neccessary, and append them to temp
    var i = 2,
        length = ob.length,
        children = length - i,
        child;
    if( children > 0 ) {
      for( ; i < length; i++ ) {
        if( typeof ob[i] === 'string' ) {
          // Allow a string to be passed in for text content
          $(temp).html( $(temp).html() + ob[i] );
        } else {
          // If it's an array, build the child element and append it
          $(temp).append( this.build( ob[i] ) );
        }
      }
    }

    // Send it right on back
    return temp[0];

  };

  /**
   * Add CSS to a page using an object syntax.
   *
   * Doesn't require strings or inline styles (:. nice!)
   *
   * ob syntax:
   *   selector: {
   *     attribute: value
   *   }
   *
   * The selector can be a normal key or a valid CSS selector string.
   * The attribute can be any normal CSS attribute string.
   *
   * Example usage:
   *   xio.css({
   *     a: {
   *       color: 'green'
   *     },
   *     '.test-elem a, strong': {
   *       color: 'hotpink'
   *     }
   *   });
   *
   * Returns the <style> element that was added to the <head> of the DOM
   */
  Xio.prototype.css = function( ob ) {

    // Don't run anything with using jQuery in a DOMless environment
    if( this.isContentScript() && ! this.isDOMPresent() ) {
      return this.error({
        err: 'xio.build does not work in a non-content-script context.',
        fatal: true
      });
    }

    // Ensure that ob is an object
    if( typeof ob !== 'object' ) {
      return this.error({
        err: 'ob must be an object for CSS insertion.'
      });
    }

    // Iterate through the keys of ob, building a CSS string
    var css = [],
        rule = [],
        attribute,
        selector;
    for( selector in ob ) {
      if( ob.hasOwnProperty(selector) ) {

        // Make sure that the selector is string
        // (it pretty much always should be)
        if( typeof selector !== 'string' ) {
          this.error({
            err: 'CSS selector must be a string.'
          });
          continue;
        }

        // Add the selector to the CSS
        css = css.concat( [ selector, ' {' ] );

        rule = [];

        // Iterate through each rule, adding to the rule
        for( attribute in ob[selector] ) {
          if( ob[selector].hasOwnProperty( attribute ) ) {

            // Ensure attribute is a string
            // (again, it should be)
            if( typeof attribute !== 'string' ) {
              this.error({
                err: 'CSS attribute must be a string.'
              });
              continue;
            }

            // Ensure value is a string
            if( typeof ob[selector][attribute] !== 'string' ) {
              this.error({
                err: 'CSS value must be a string.'
              });
              continue;
            }

            // Build the rule
            rule = rule.concat( [ attribute, ':', ob[selector][attribute], ';' ] );

          }
        }

        // Add the rule to the css
        css = css.concat( rule );

        // Finish the selector
        css = css.concat( [ '}\n' ] );

      }
    }

    // Now build the style element with the prebuilt CSS as text
    var elem = $('<style/>', {
      text: css.join( '' )
    });

    // Add the style element to the DOM's <head>
    $('head').append( elem );

    // Return a reference to the <style> element
    return elem[0];

  };

  /**=============================================================
   DOM Insertion & 3rd-party UI Hacking
   =============================================================**/

  /**
   * Helper for adding DOM to a page inside a specified container.
   * Useful for hacking on other people's UI!
   *
   * ob syntax:
   *   {
   *     id: 'some identifier', // To help you in the case of errors (optional)
   *     container: '.some-element', // CSS selector for the container of your new elements (default: 'body')
   *     build: ... // xio.build(...) is used on this data and then inserted
   *   }
   *
   * Example usage:
   *   xio.insert({
   *     id: 'my super link!',
   *     container: '.their-container',
   *     build:
   *       ['div', { 'class': 'my-link' },
   *         ['img', { src: '//lorempixum.com/g/10/10' }],
   *         ['a', { href: '#' }]
   *       ]
   *   });
   *
   * Returns the inserted elements.
   */
  Xio.prototype.insert = function ( ob ) {

    // Don't run anything with using jQuery in a DOMless environment
    if( this.isContentScript() && ! this.isDOMPresent() ) {
      return this.error({
        err: 'xio.build does not work in a non-content-script context.',
        fatal: true
      });
    }

    // Ensure that ob is an object
    if( typeof ob !== 'object' ) {
      return this.error({
        err: 'ob must be an object for DOM insertion.'
      });
    }

    // Build the elements to be inserted
    
    // Ensure that container is a string
    if( typeof ob.container !== 'string' ) {
      this.error({
        err: 'It is best to specify a container when using xio.insert.'
      });
      // Assume body
      ob.container = 'body';
    }

    // Ensure that ob is an array
    if( ! $.isArray( ob.build ) ) {
      return this.error({
        err: 'ob.build must be valid input for xio.build.'
      });
    }

    // Run xio.build on it
    var elem = this.build( ob.build );

    // Check for insertion method (append [default], prepend, after or before)
    if( ob.after && typeof ob.after === 'string' ) {
      // Insert after ob.after (within ob.container)
      $(ob.after, ob.container).after( elem );
    } else if( ob.before && typeof ob.before === 'string' ) {
      // Insert before ob.before (within ob.container)
      $(ob.before, ob.container).before( elem );
    } else if( ob.prepend === true ) {
      // Prepend to ob.container
      $(ob.container).prepend( elem );
    } else {
      // Append to ob.container
      $(ob.container).append( elem );
    }

    return elem;

  };

  /**=============================================================
   Extension APIs
   =============================================================**/

  /**
   * xio.data returns a fully-qualified URL for a string resource relative to the root extension directory.
   *
   * Example usage:
   *   xio.data('image/kitten.jpg'); // chrome-extension://abcdefghijklmnop/images/kitten.jpg
   *
   * Returns a string URL for the specified resource.
   */
  Xio.prototype.data = function( resource ) {
    if( typeof resource !== 'string' ) {
      return this.error({
        err: 'Resource must be a string.'
      });
    }
    // Pass the request on to Chrome's method
    if( this.isChrome() ) {
      return chrome.extension.getURL( resource );
    }
    // Firefox does not support this method
    if( this.isFirefox() ) {
      this.error({
        err: 'xio.data is not currently available in Firefox. Support is coming.',
        fatal: true
      });
    }
    // Build a URL for Safari
    if( this.isSafari() ) {
      return (safari.extension.baseURI + resource);
    }
  };

  /**
   * xio.script is a EventEmitter-style API for persistent communication between the
   * background page and the content scripts.
   *
   * There are a few special events.
   *   'connection' is run when there's a connection from a new tab or context.
   *     This event passes the port object on which the connection was made (another EventEmitter).
   *
   * Example usage:
   *   xio.script.on('connection', function ( port ) {
   *     port.on('myEvent', function ( data ) {
   *       // Do something interesting...
   *     });
   *   });
   *
   */
  Xio.prototype.createScriptAPI = function () {

    // Keep a reference to xio
    var xio = this;

    // The root script object
    var script = {};

    // Subscribers
    var subscribe = {};

    /**
     * Generate a token for event subscription.
     *
     * Multiply two large coprime integers (using the time)
     */
    var createToken = function ( event ) {
      return event + Math.floor((new Date()).getTime() % (Math.random() * Math.pow(10, 10)));
    };

    /**
     * script.on subscribes to events from all connected ports.
     *
     * As mentioned above, there are special events that pass in specific
     * data that are designed to make the job of managing ports to many tabs
     * simple and easy.
     */
    script.on = function ( event, cb ) {

      // Ensure event is a string
      if( typeof event !== 'string' ) {
        xio.error({
          err: 'script.on event must be a string.',
          fatal: true
        });
      }

      // Ensure cb is a function
      if( typeof cb !== 'function' ) {
        xio.error({
          err: 'script.on callback must be a function.',
          fatal: true
        });
      }

      // Generate a token for this subscription
      var token = createToken( event );

      // Initialise the script object
      if( ! subscribe[event] ) {
        subscribe[event] = [];
      }

      // Store the subscription
      subscribe[event].push({
        token: token,
        cb: cb
      });

      return token;

    };

    /**
     * xio.script.publish fires the callbacks of all subscribed events.
     *
     * Generally this is an internal method only.
     *
     * Example:
     *   xio.script.publish('myScriptEvent');
     */
    script.publish = function ( event, data ) {

      // Ensure event is a string
      if( typeof event !== 'string' ) {
        xio.error({
          err: 'xio.script.publish event must be a string.',
          fatal: true
        });
      }

      // Don't try and fire non-existent subscribers
      if( typeof subscribe[event] === "undefined" || subscribe[event].length === 0 ) {
        return;
      }

      // Iterate through the subscribers and fire that callback
      var subscribers = subscribe[event];

      var i = 0, length = subscribers.length;
      for( ; i < length; i++ ) {
        subscribers[i].cb( data );
      }

    };

    /**
     * xio.script.subscribers returns an array of all subscribers to a specified event
     *
     * Example:
     *   var listeners = xio.script.subscribers('connection');
     */
    script.subscribers = function ( event ) {

      // Ensure event is a string
      if( typeof event !== 'string' ) {
        xio.error({
          err: 'xio.script.subscribers event must be a string.',
          fatal: true
        });
      }

      return subscribe[event];

    };

    /**
     * API Wrappers
     */
    
    /**
     * PortWrapper presents an EventEmitter API for communicating to and from content scripts.
     */
    var PortWrapper = function ( port ) {
      this.raw = port;
    };

    PortWrapper.fn = PortWrapper.prototype;

    PortWrapper.fn.on = function () {};

    if( this.isChrome() ) {
      // Listen for connection event
      chrome.extension.onConnect.addListener(function ( rawPort ) {
        var xioPort = new PortWrapper( rawPort );
        script.publish( 'connection', { port: xioPort } );
      });
    }

    xio.script = script;

    // Ensure createPort isn't called again
    return function () {};

  };

  /**
   * Kick things off!
   */
  global.xio = new Xio();

}( this, jQuery ));