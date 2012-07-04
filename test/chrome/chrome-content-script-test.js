$(function () {

  /**
   * extensio Chrome tests. mt.fin is called in the shared tests.
   */
  mt.test('xio#chrome', function () {

    mt.ok(typeof xio === 'object', 'xio is an object.');
    
    mt.ok(xio.env === 1, 'xio detects chrome');

  });

});