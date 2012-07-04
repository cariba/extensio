$(function () {

  /**
   * extensio Chrome tests. mt.fin is called in the shared tests.
   */
  mt.test('xio#firefox', function () {

    mt.ok(typeof xio === 'object', 'xio is an object.');
    
    mt.ok(xio.env === 2, 'xio detects firefox');

  });

  /**
   * Data URLs
   */
  mt.test('xio.data', function () {

    mt.ok(typeof xio.data === 'function', 'xio.data is a function.');
    
    // chrome-extension://abcdefghijklmnop/images/kitten.jpg
    var url = xio.data('res/kitten.jpg');

    console.log(url);

    var pattern = /^chrome-extension:\/{2,}[a-z]+\/res\/kitten.jpg$/g;

    //mt.ok(url.match(pattern), 'returned url matches pattern');

  });

});