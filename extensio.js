/*! extensio - v0.0.1 - 2012-06-30
* Copyright (c) 2012 Tom Ashworth; MIT License */

var xio;
window.xio = xio = (function ( $ ) {

  // Check for jQuery
  if( $ === undefined ) {
    return console.log( "xio requires jQuery." );
  }

  return {};

}( jQuery ));