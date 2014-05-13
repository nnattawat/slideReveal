/*
 * slideReveal
 * 
 *
 * Copyright (c) 2014 Nattawat Nonsung
 * Licensed under the MIT license.
 */

(function ($) {
  // Define default settings
  var settings = {
    width: 250,
    push: true,
    position: "left",
    speed: 300, //ms
    trigger: undefined,
    autoEscape: true,
    shown: function(){},
    hidden: function(){}
  };

  // Collection method.
  $.fn.slideReveal = function (options) {
    var self = this;
    var paddingLeft = this.css('padding-left');
      paddingLeft = +paddingLeft.substring(0, paddingLeft.length -2);

    var paddingRight = this.css('padding-left');
    paddingRight = +paddingRight.substring(0, paddingRight.length -2);

    var sidePosition = (settings.width+paddingLeft+paddingRight)+"px";

    if(options !== undefined && typeof(options) === "string"){

      if(options === "show"){
        this.css(settings.position, "0px");
        $("body").css(settings.position, sidePosition);
        this.data("slide-reveal", true);

        setTimeout(function(){
          settings.shown(self);
        }, settings.speed);
      }else if(options === "hide"){
        this.css(settings.position, "-"+sidePosition);
        $("body").css(settings.position, "0px");
        this.data("slide-reveal", false);
        setTimeout(function(){
          settings.hidden(self);
        }, settings.speed);
      }
    }else{
      settings = $.extend(settings, options);
      var transition = settings.position+" ease "+settings.speed+"ms";
      this.css({
          position: "fixed",
          width: settings.width,
          transition: transition,
          height: "100%"
        })
        .css(settings.position, "-"+sidePosition);

      // Add close stage
      this.data("slide-reveal", false);

      if(settings.push){
        $("body").css({
            position: "relative",
            "overflow-x": "hidden",
            transition: transition
          })
          .css(settings.position, "0px");
      }

      // Attach trigger using click event
      if(settings.trigger && settings.trigger.length > 0){
        settings.trigger.click(function(){
          if(!self.data("slide-reveal")){ // Show
            self.slideReveal("show");
          }else{ // Hide
            self.slideReveal("hide");
          }
        });
      }

      // Bind hide event to ESC
      if(settings.autoEscape){
        $(document).keydown(function(e){
          if($('input:focus, textarea:focus').length === 0){
            if(e.keyCode === 27 && self.data("slide-reveal")){ //ESC
              self.slideReveal("hide");
            }
          }
        });
      }
    }

    return this;
  };

}(jQuery));
