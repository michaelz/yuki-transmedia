var player;

function onYouTubePlayerAPIReady(vidId) {

    if (!vidId) {
        vidId = "vXxJTi7xJl0";
    }
    player = new YT.Player('player', {
        height: '315',
        width: '100%',
        videoId: vidId,
        playerVars: {
            rel: 0
        }
    });
}

// calls adjustHeight on window load
jQuery(window).load(function() {
    adjustVideoHeight();
});

// calls adjustHeight anytime the browser window is resized
jQuery(window).resize(function() {
    adjustVideoHeight();
});
