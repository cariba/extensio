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
  mt.test('xio.build', function () {

    xio.logging = false;

    // Test sensible data
    var domarray =
      ['div', { 'class': 'test-elem' },
        ['a', { href: '#', text: 'Hello' }],
        ['strong', { text: 'I am strong!' }],
        'Testing'
      ];
    //var newElem = xio.build(domarray);
    //mt.equal($(newElem).text(), 'HelloI am strong!Testing', 'correctly builds DOM elements');
    
    // Try some nonsense
    var crap =
      ['fish', { 'class': 'test-elem' },
        ['a',  'test'],
        ['strong', [ 'text', 'I am strong!' ] ]
      ];
    var crapElem = xio.build(crap);
    mt.equal($(crapElem).text(), '', 'reasonable crap still works');


    // Try some nonsense
    var result;
    crap =
      [{a:'b'}, 123,
        ['a',  'test'],
        ['strong', [ 'text', 'I am strong!' ] ]
      ];
    try {
      result = xio.build(crap);
    } catch (e) {
      mt.equal(e, 'xio : The first element of the DOM array must be a string.', 'absolute crap throws error.');
    }
    
    xio.logging = true;

  });

  /**
   * CSS insertion
   */
  mt.test('xio.css', function () {
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
    mt.equal($('.test-link').css('color'), 'rgb(0, 255, 0)', 'correctly styles using keys');
    mt.equal($('a', elem).css('color'), 'rgb(255, 0, 0)', 'correctly styles using string selectors');
    mt.equal($('a', elem).css('background-color'), 'rgb(0, 0, 0)', 'correctly handles multiple rules');
  });

  /**
   * DOM insertion
   */
  mt.test('xio.insert', function () {
    mt.equal(typeof xio.insert, 'function', 'is a function');

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
    mt.equal(inserted !== undefined, true, 'returns something');
    mt.equal(test.length > 0, true, 'inserts elements');
    mt.equal($('.test-container').text(), 'Test.Test2.Hello!', 'appends element');
    mt.equal($('a', test).hasClass('inserted-a'), true, 'inserts children');
    mt.equal($('a', test).text(), 'Hello!', 'inserts text');

    // Test for event handler registration
    $('a', test).click();
    mt.equal(count, 1, 'attaches even handlers');

    // Test different kinds of insertion (after, before, prepend)
    var inserted_after = xio.insert({
      id: 'test',
      container: '.test-container-after',
      after: '.test-inner',
      build: domarray
    });

    mt.equal($('.test-container-after').text(), 'Test.Hello!Test2.', 'appends element after');

    var inserted_before = xio.insert({
      id: 'test',
      container: '.test-container-before',
      before: '.test-inner, .test-inner2',
      build: domarray
    });

    mt.equal($('.test-container-before').text(), 'Hello!Test.Hello!Test2.', 'appends element before');

    var inserted_prepend = xio.insert({
      id: 'test',
      container: '.test-container-prepend',
      prepend: true,
      build: domarray
    });

    mt.equal($('.test-container-prepend').text(), 'Hello!Test.Test2.', 'prepends element');

  });

  mt.fin();

});