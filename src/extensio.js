/**
 * extensio
 */

var xio;
window.xio = xio = (function ( $ ) {

  // Check for jQuery
  if( $ === undefined ) {
    return console.log( "xio requires jQuery." );
  }

  return {};

}( jQuery ));