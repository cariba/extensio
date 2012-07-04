$(function () {

  /**
   * extensio Chrome tests. mt.fin is called in the shared tests.
   */
  mt.test('xio#safari', function () {

    mt.ok(typeof xio === 'object', 'xio is an object.');
    
    mt.ok(xio.env === 3, 'xio detects safari');

  });

  /**
   * Data URLs
   */
  mt.test('xio.data', function () {

    mt.ok(typeof xio.data === 'function', 'xio.data is a function.');
    
    var url = xio.data('res/example.txt');

    //safari-extension://com.extensio.safari-9G9SEE48D7/62e3b2af/res/example.txt

    var pattern = /^safari-extension:\/{2,}[a-zA-Z0-9\.-]+\/[a-z0-9]+\/res\/example.txt$/g;

    mt.ok(url.match(pattern), 'returned url matches pattern');

  });

});