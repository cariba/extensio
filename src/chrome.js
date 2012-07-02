/**
 * xio_chrome extends Xio, adding methods that cover the Chrome API
 *
 * It is called from the Xio constructor in extensio.js.
 */
window.xio_chrome = (function ( chrome ) {

  return function ( Xio ) {

    /**
     * xio.data returns a fully-qualified URL for a string resource relative to the root extension directory.
     *
     * Example usage:
     *   xio.data('image/kitten.jpg'); // chrome-extension://abcdefghijklmnop/images/kitten.jpg
     *
     * Returns a string URL for the specified resource.
     */
    Xio.prototype.data = function( resource ) {
      if( typeof resource === 'string' ) {
        return chrome.extension.getURL( resource );
      }
    };

  };

}( window.chrome ));