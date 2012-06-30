/*! extensio - v0.0.1 - 2012-06-30
* Copyright (c) 2012 Tom Ashworth; MIT License */

var xio;
window.xio = xio = (function ( $ ) {

  /**
   * Check for jQuery
   */
  if( $ === undefined ) {
    return console.log( "xio requires jQuery." );
  }

  /**
   * Information & constants
   */
  var global = {
    identifier: 'xio',
    env: {
      chrome: 1,
      firefox: 2,
      safari: 3
    }
  };

  /**
   * Initialise xio (automatic)
   */
  var Xio = function () {
    // Detect the current environment
    this.env = 0;
    if( chrome ) { this.env = global.env.chrome; }
    else if( safari ) { this.env = global.env.safari; }
    else if( self && self.extension ) { this.env = global.env.firefox; }
    else {
      this.error({
        err: "Environment not known.",
        fatal: true
      });
    }
  };

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
   */
  Xio.prototype.error = function ( ob ) {
    // Make sure that ob is an object,
    // and that ob.err is an array
    if( typeof ob === 'string' ) { ob = {err: [ob], fatal: false}; }
    if( ! $.isArray( ob.err ) ) { ob.err = [ob.err]; }
    // Build the error array
    var error = [ global.identifier, ':' ].concat( ob.err );
    // Throw an exception on fatal errors,
    // otherwise log the error and return it
    if( ob.fatal ) { throw error.join( ' ' ); }
    else { console.log.apply( console, error ); }
    return error.join( ' ' );
  };

  /**
   * Kick things off!
   */
  return new Xio();

}( jQuery ));


