/*
 * slideReveal
 * 
 *
 * Copyright (c) 2014 Nattawat Nonsung
 * Licensed under the MIT license.
 */

(function ($) {

  // Collection method.
  $.fn.slideReveal = function (options) {
    var paddingLeft = this.css('padding-left');
      paddingLeft = +paddingLeft.substring(0, paddingLeft.length -2);

    var paddingRight = this.css('padding-left');
    paddingRight = +paddingRight.substring(0, paddingRight.length -2);

    if(options !== undefined && typeof(options) == "string"){
      var sidePosition = (this.width()+paddingLeft+paddingRight)+"px";

      if(options == "show"){
        this.css({
         left: "0px"
        });

        $("body").css({
          left: sidePosition
        });
      }else if(options == "hide"){
        this.css({
         left: "-"+sidePosition
        });

        $("body").css({
          left: "0px"
        });
      }
    }else{
      // Define default settings
      var settings = $.extend({
        width: 250,
        push: true
      }, options );

      var sidePosition = "-"+(settings.width+paddingLeft+paddingRight)+"px";

      this.css({
        left: sidePosition,
        height: "100%",
        position: "fixed",
        width: settings.width,
        transition: "left 300ms ease"
      });

      if(settings.push){
        $("body").css({
          position: "relative",
          transition: "all 300ms ease",
          left: "0px"
        });
      }
    }

    return this;
  };

}(jQuery));
