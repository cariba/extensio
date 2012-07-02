/**
 * xio_chrome extends Xio, adding methods that cover the Chrome API
 *
 * It is called from the Xio constructor in extensio.js.
 */
window.xio_chrome = (function ( chrome ) {

  return function ( Xio ) {

    Xio.prototype.data = function( ob ) {

    };

  };

}( window.chrome ));