/* *****
 * JS only for automatic responsive size
 * *****/
$(document).ready(function() {
    
    
    
  if ($(window).height() > $(window).width()) {
    $('.progress').css("width", "50%");
    $('.progress').css("height", $('.progress').width() + "px");
    $('.progress').css("font-size", ($('.progress').width() / 5) + "px");
    $('.progress').css("line-height", ($('.progress').width() / 100 * 90) + "px");
  } else {
    $('.progress').css("height", "50%");
    $('.progress').css("width", $('.progress').height() + "px");
    $('.progress').css("font-size", ($('.progress').height() / 5) + "px");
    $('.progress').css("line-height", ($('.progress').height() / 100 * 90) + "px");
  }
  $(window).resize(function() {
    if ($(window).height() > $(window).width()) {
      $('.progress').css("width", "50%");
      $('.progress').css("height", $('.progress').width() + "px");
      $('.progress').css("font-size", ($('.progress').width() / 5) + "px");
      $('.progress').css("line-height", ($('.progress').width() / 100 * 90) + "px");
    } else {
      $('.progress').css("height", "50%");
      $('.progress').css("width", $('.progress').height() + "px");
      $('.progress').css("font-size", ($('.progress').height() / 5) + "px");
      $('.progress').css("line-height", ($('.progress').height() / 100 * 90) + "px");
    }
  });
});