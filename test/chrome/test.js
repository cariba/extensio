$(function () {

  /**
   * extensio Chrome tests
   */
  mt.test('xio#basic', function () {

    mt.ok(typeof xio === 'object', 'xio is an object.');
    
    mt.ok(xio.env === 1, 'xio detects chrome');

  });

  mt.test('xio#data', function () {

    mt.ok(typeof xio.data === 'function', 'xio.data is a function.');
    
    // chrome-extension://abcdefghijklmnop/images/kitten.jpg
    var url = xio.data('res/kitten.jpg');

    var pattern = /^chrome-extension:\/{2,}[a-z]+\/res\/kitten.jpg$/g;

    mt.ok(url.match(pattern), 'returned url matches pattern');

  });

  mt.fin();

});