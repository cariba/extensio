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
$(function () {

  /**
   * DOM element building
   */
  describe('xio.build', function () {

    xio.logging = false;

    // Test sensible data
    var domarray =
      ['div', { 'class': 'test-elem' },
        ['a', { href: '#', text: 'Hello' }],
        ['strong', { text: 'I am strong!' }],
        'Testing'
      ];
    var newElem = xio.build(domarray);
    it('correctly builds DOM elements', function () {
      expect($(newElem).text()).toEqual('HelloI am strong!Testing');
    });
    
    // Try some nonsense
    var crap =
      ['fish', { 'class': 'test-elem' },
        ['a',  'test'],
        ['strong', [ 'text', 'I am strong!' ] ]
      ];
    var crapElem = xio.build(crap);

    it('does not blow up with reasonable crap', function () {
      expect($(crapElem).text()).toEqual('');
    });

    // Try some nonsense
    var result;
    crap =
      [{a:'b'}, 123,
        ['a',  'test'],
        ['strong', [ 'text', 'I am strong!' ] ]
      ];

    it('does blows up with unreasonable crap', function () {
      expect(function() {
        xio.build(crap);
      }).toThrow();
    });
    
    xio.logging = true;

  });

  /**
   * CSS insertion
   */
  describe('xio.css', function () {
    var elem = $('.test-elem');
    var style = xio.css({
      a: {
        color: 'rgb(0, 255, 0)'
      },
      '.test-elem a, strong': {
        color: 'rgb(255, 0, 0)',
        'background-color': 'rgb(0, 0, 0)'
      }
    });
    it('inserts CSS correctly', function () {
      expect($('.test-link').css('color')).toEqual('rgb(0, 255, 0)');
      expect($('a', elem).css('color')).toEqual('rgb(255, 0, 0)');
      expect($('a', elem).css('background-color')).toEqual('rgb(0, 0, 0)');
    });
  });

  /**
   * DOM insertion
   */
  describe('xio.insert', function () {
    it('is a function', function () {
      expect(typeof xio.insert).toEqual('function');
    });

    var count = 0;

    var domarray =
      ['div', { 'class': 'inserted-wrapper' },
        ['i', { 'class': 'inserted-i' }],
        ['a', { 'class': 'inserted-a', 'href': '#', text: 'Hello!', click: function () { count += 1; } }]
      ];

    var inserted = xio.insert({
      id: 'test',
      container: '.test-container',
      build: domarray
    });

    var test = $('.inserted-wrapper');

    // Was is inserted, and was it inserted correctly?
    it('inserts elements correctly', function () {
      expect(inserted !== undefined).toEqual(true);
      expect(test.length > 0).toEqual(true);
      expect($('.test-container').text()).toEqual('Test.Test2.Hello!');
      expect($('a', test).hasClass('inserted-a')).toEqual(true);
      expect($('a', test).text()).toEqual('Hello!');
    });

    // Test for event handler registration
    $('a', test).click();
    it('attaches event handlers', function () {
      expect(count).toEqual(1);
    });

    // Test different kinds of insertion (after, before, prepend)
    var inserted_after = xio.insert({
      id: 'test',
      container: '.test-container-after',
      after: '.test-inner',
      build: domarray
    });

    it('adds elements `after` correctly', function () {
      expect($('.test-container-after').text()).toEqual('Test.Hello!Test2.');
    });

    var inserted_before = xio.insert({
      id: 'test',
      container: '.test-container-before',
      before: '.test-inner, .test-inner2',
      build: domarray
    });

    it('adds elements `before` correctly', function () {
      expect($('.test-container-before').text()).toEqual('Hello!Test.Hello!Test2.');
    });

    var inserted_prepend = xio.insert({
      id: 'test',
      container: '.test-container-prepend',
      prepend: true,
      build: domarray
    });

    it('prepends elements correctly', function () {
      expect($('.test-container-prepend').text()).toEqual('Hello!Test.Test2.');
    });

  });

  // Get moving
  jasmine.getEnv().addReporter(new jasmine.ConsoleReporter(function () {
    console.log.apply( console, arguments );
  }));
  jasmine.getEnv().execute();

});