$(document).ready(function() {
  if (!Cookies.get("son")) Cookies.set("son", 1);
  
  if (Cookies.get("son") == 1) {	
  	$("audio").trigger('play');
  } else {
  	$(".round-icon").toggleClass("icon-loud icon-mute");
  	$("audio").trigger('pause');
  }

  $(".round-audio-button").on('click', audio);

  function audio() {
    $(".round-icon").toggleClass("icon-loud icon-mute");

    if ($('.round-icon').hasClass('icon-loud')) {
      $("audio").trigger('pause');
      Cookies.set("son", 0);
    } else {
      $("audio").trigger('play');
      Cookies.set("son", 1);
    }
}

})
