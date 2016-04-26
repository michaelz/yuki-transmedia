$(document).ready(function() {
  $("audio").trigger('play');
  $(".round-audio-button").on('click', audio);

  function audio() {
    $(".round-icon").toggleClass("icon-loud icon-mute");

    if ($('.round-icon').hasClass('icon-loud')) {
      $("audio").trigger('pause');
    } else {
      $("audio").trigger('play');
    }
}

})
