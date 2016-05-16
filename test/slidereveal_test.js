(function($) {
  /*
    ======== A Handy Little QUnit Reference ========
    http://api.qunitjs.com/

    Test methods:
      module(name, {[setup][ ,teardown]})
      test(name, callback)
      expect(numberOfAssertions)
      stop(increment)
      start(decrement)
    Test assertions:
      ok(value, [message])
      equal(actual, expected, [message])
      notEqual(actual, expected, [message])
      deepEqual(actual, expected, [message])
      notDeepEqual(actual, expected, [message])
      strictEqual(actual, expected, [message])
      notStrictEqual(actual, expected, [message])
      throws(block, [expected], [message])
  */

  module('jQuery#slideReveal', {
    // This will run before each test in this module.
    setup: function() {
      this.elems = $('#qunit-fixture');
    }
  });

  test('is chainable', function() {
    strictEqual(this.elems.slideReveal(), this.elems, 'should be chainable');
  });

  test('attachs model to data attribute', function() {
    var slideReveal = this.elems.slideReveal().data('slide-reveal-model');
    strictEqual(slideReveal.element.prop("id"), this.elems.prop("id"));
  });

  test('all settings are overridden correctly', function() {
    var setting = {
      width: 300,
      push: false,
      position: "right",
      speed: 400, //ms
      trigger: $('<div id="dummy">'),
      autoEscape: false,
      show: function() {
        return true;
      },
      shown: function() {
        return true;
      },
      hidden: function() {
        return true;
      },
      hide: function() {
        return true;
      },
      top: 20,
      overlay: true,
      "zIndex": 2000,
      overlayColor: 'rgba(255,0,0,0.5)'
    };
    var slideReveal = this.elems.slideReveal(setting).data('slide-reveal-model');
    strictEqual(slideReveal.setting.width, setting.width);
    strictEqual(slideReveal.setting.push, setting.push);
    strictEqual(slideReveal.setting.position, setting.position);
    strictEqual(slideReveal.setting.speed, setting.speed);
    strictEqual(slideReveal.setting.trigger.prop('id'), 'dummy');
    strictEqual(slideReveal.setting.autoEscape, setting.autoEscape);
    strictEqual(slideReveal.setting.show(), true);
    strictEqual(slideReveal.setting.shown(), true);
    strictEqual(slideReveal.setting.hidden(), true);
    strictEqual(slideReveal.setting.hide(), true);
    strictEqual(slideReveal.setting.top, setting.top);
    strictEqual(slideReveal.setting.overlay, setting.overlay);
    strictEqual(slideReveal.setting.zIndex, setting.zIndex);
    strictEqual(slideReveal.setting.overlayColor, setting.overlayColor);
  });

  test('attach overlayElement to model when overlay is set to true', function() {
    var slideReveal = this.elems.slideReveal({
      overlay: true
    }).data('slide-reveal-model');

    strictEqual(slideReveal.overlayElement.hasClass('slide-reveal-overlay'), true);
  });

  test('nothing attached overlayElement to model when overlay is set to false', function() {
    var slideReveal = this.elems.slideReveal({
      overlay: false
    }).data('slide-reveal-model');

    strictEqual(slideReveal.overlayElement, undefined);
  });

}(jQuery));
