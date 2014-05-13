/*! slidereveal - v1.0.0 - 2014-05-13
* https://github.com/nnattawat/slidereveal
* Copyright (c) 2014 Nattawat Nonsung; Licensed MIT */
(function ($) {
  // Define default settings
  var settings = {
    width: 250,
    push: true,
    position: "left",
    speed: 300 //ms
  };

  // Collection method.
  $.fn.slideReveal = function (options) {
    var paddingLeft = this.css('padding-left');
      paddingLeft = +paddingLeft.substring(0, paddingLeft.length -2);

    var paddingRight = this.css('padding-left');
    paddingRight = +paddingRight.substring(0, paddingRight.length -2);

    var sidePosition = (settings.width+paddingLeft+paddingRight)+"px";

    if(options !== undefined && typeof(options) === "string"){

      if(options === "show"){
        this.css(settings.position, "0px");
        $("body").css(settings.position, sidePosition);
      }else if(options === "hide"){
        this.css(settings.position, "-"+sidePosition);
        $("body").css(settings.position, "0px");
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

      if(settings.push){
        $("body").css({
            position: "relative",
            transition: transition
          })
          .css(settings.position, "0px");
      }
    }

    return this;
  };

}(jQuery));
