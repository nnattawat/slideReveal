(function ($) {
  // Private attributes and method
  var settings = [];
  var clickSource;

  var getPadding = function($el, side) {
    var padding = $el.css('padding-' + side);
    return padding ? +padding.substring(0, padding.length - 2) : 0;
  };

  var sidePosition = function($el) {
    var paddingLeft = getPadding($el, 'left');
    var paddingRight = getPadding($el, 'right');
    return ($el.width() + paddingLeft + paddingRight) + "px";
  };

  var show = function($el, setting, triggerEvents) {
    // trigger show() method
    if (triggerEvents === undefined || triggerEvents) { setting.show($el, clickSource); }

    // show overlay
    if (setting.overlay) {
      $(".slide-reveal-overlay").show();
    }

    // slide the panel
    $el.css(setting.position, "0px");
    if (setting.push) {
      if (setting.position === "left") {
        $("body").css("left", sidePosition($el));
      } else {
        $("body").css("left", "-" + sidePosition($el));
      }
    }
    $el.data("slide-reveal", true);

    // trigger shown() method
    if (triggerEvents === undefined || triggerEvents) {
      setTimeout(function() {
        setting.shown($el, clickSource);
      }, setting.speed);
    }
  };

  var hide = function($el, setting, triggerEvents) {
    // trigger hide() method
    if (triggerEvents === undefined || triggerEvents) { setting.hide($el, clickSource); }

    // hide the panel
    if (setting.push) {
      $("body").css("left", "0px");
    }
    $el.css(setting.position, "-" + sidePosition($el));
    $el.data("slide-reveal", false);

    // trigger hidden() method
    if (triggerEvents === undefined || triggerEvents) {
      setTimeout(function(){
        // hide overlay
        if (setting.overlay) {
          $(".slide-reveal-overlay").hide();
        }

        setting.hidden($el, clickSource);
      }, setting.speed);
    }
  };

  // Collection method.
  $.fn.slideReveal = function (options, triggerEvents) {
    var self = this;
    var setting;

    if (options !== undefined && typeof(options) === "string") {
      var settingIndex = self.data("setting-index");
      setting = settings[settingIndex];


      if (options === "show") {
        show(self, setting, triggerEvents);
      } else if (options === "hide") {
        hide(self, setting, triggerEvents);
      } else if (options === 'toggle') {
        if (self.data('slide-reveal')) {
          hide(self, setting, triggerEvents);
        } else {
          show(self, setting, triggerEvents);
        }

      }
    } else {
      // Define default setting
      setting = {
        width: 250,
        push: true,
        position: "left",
        speed: 300, //ms
        trigger: undefined,
        autoEscape: true,
        show: function(){},
        shown: function(){},
        hidden: function(){},
        hide: function(){},
        top: 0,
        overlay: false,
        "zIndex": 1049,
        overlayColor: 'rgba(0,0,0,0.5)'
      };

      setting = $.extend(setting, options);

      // Keep this setting to array so that it won't be overwritten if slideReveal() is called again.
      settings.push(setting);
      self.data("setting-index", settings.length - 1);

      var transition = "all ease " + setting.speed + "ms";
      self.css({
        position: "fixed",
        width: setting.width,
        transition: transition,
        height: "100%",
        top: setting.top
      })
      .css(setting.position, "-" + sidePosition(self));

      if (setting.overlay) {
        self.css('z-index', setting.zIndex);
        $("body").prepend("<div class='slide-reveal-overlay'></div>");
        $(".slide-reveal-overlay")
        .hide()
        .css({
          position: 'fixed',
          top: 0,
          left: 0,
          height: '100%',
          width: '100%',
          'z-index': setting.zIndex - 1,
          'background-color': setting.overlayColor,
        }).click(function() {
          self.slideReveal("hide");
        });
      }

      // Add close stage
      self.data("slide-reveal", false);

      if (setting.push){
        $("body").css({
          position: "relative",
          "overflow-x": "hidden",
          transition: transition,
          left: "0px"
        });
      }

      // Attach trigger using click event
      if (setting.trigger && setting.trigger.length > 0) {
        setting.trigger.click( function() {
          clickSource = $(self);
          if (!self.data("slide-reveal")) { // Show
            self.slideReveal("show");
          } else { // Hide
            self.slideReveal("hide");
          }
        });
      }

      // Bind hide event to ESC
      if (setting.autoEscape) {
        $(document).keydown( function(e) {
          if ($('input:focus, textarea:focus').length === 0) {
            if (e.keyCode === 27 && self.data("slide-reveal")) { //ESC
              self.slideReveal("hide");
            }
          }
        });
      }
    }

    return self;
  };

}(jQuery));
