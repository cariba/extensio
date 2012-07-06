$(function () {

  /**
   * extensio Chrome tests. mt.fin is called in the shared tests.
   */
  describe('xio#chrome', function () {

    it('is an object', function () {
      expect(xio).toBeDefined();
      expect(xio).toBeTruthy();
    });
    
    it('detects chrome', function () {
      expect(xio.env).toEqual(1);
      expect(xio.contentScript).toEqual(true);
    });

  });

  /**
   * Data URLs
   */
  describe('xio.data', function () {

    it('is a function', function () {
      expect(xio.data).toBeDefined();
      expect(typeof xio.data).toBe('function');
    });

    var url = xio.data('res/example.txt');
    var pattern = /^chrome-extension:\/{2,}[a-z]+\/res\/example.txt$/g;

    it('retrieves correct data URLs', function () {
      expect(url.match(pattern)).toBeTruthy();
    });

  });

  var port = chrome.extension.connect({name: "test-port"});
  port.postMessage({example: "something 1234"});

});