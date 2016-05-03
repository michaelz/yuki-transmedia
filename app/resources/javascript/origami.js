$(document).ready(function() {
    $('#buttons').hide();
    $('#map').hide();
    $('.lvl-achieved').hide();
});

// create youtube player


var player;

function onYouTubePlayerAPIReady(vidId) {

    if (!vidId) {
        vidId = "E2qdFDRK5mo";
        console.log(vidId);
    }

    console.log(vidId);
    player = new YT.Player('player1', {
        height: '315',
        width: '100%',
        videoId: vidId,
        playerVars: {
            rel: 0
        },
        events: {
            /* 'onReady': onPlayerReady,*/
            'onStateChange': onPlayerStateChange
        }
    });
}

// autoplay video
function onPlayerReady(event) {
    event.target.playVideo();
}

// when video ends
function onPlayerStateChange(event) {
    if (event.data === 0) {
        $('#map').hide();
        console.log("video end");
        $("#player1").hide();
        $("#selection").show().empty().append(
            "<h1 class='titre'>Que doit faire Yuki maintenant ?</h1> " +
            " <div class='div' id ='sol1'> <img class='imgorigami' src='/img/yuki_souffle.jpg'></div>" +
            " <div class='div' id ='sol2'> <img class='imgorigami' src='/img/yuki_eau.jpg'></div>"
        );
        $('#buttons').show().attr("id", "back1");

        $("#back1").on("click", function() {
            back1();
        });


        $("#sol1").on("click", function() {
            blowSolution();
        });

        $("#sol2").on("click", function() {
            waterSolution();
        });
    }
}


function blowSolution() {
    $('#map').hide();
    $("#selection").hide();

    vidId = "PbN_OYs4Afw";
    var player2;


    player2 = new YT.Player('player2', {
        height: '315',
        width: '100%',
        videoId: vidId,
        playerVars: {
            rel: 0
        },
        events: {
            'onReady': onPlayerReady,
            'onStateChange': endSecondvideo
        }
    });

    adjustHeight();
}

function waterSolution() {

    $('#map').hide();
    $("#selection").hide();

    vidId = "uPoidI3eUDE";
    var player2;


    console.log("inmethod2");
    console.log(vidId);
    $("#player2").show();

    player2 = new YT.Player('player2', {
        height: '315',
        width: '100%',
        videoId: vidId,
        playerVars: {
            rel: 0
        },
        events: {
            'onReady': onPlayerReady,
            'onStateChange': endSecondvideo
        }
    });
    adjustHeight();
}

function back1() {
    $("#player1").show();
    $('#back1').hide();
    $("#selection").hide();


}

function endSecondvideo(event) {
    if (event.data === 0) {
        console.log("endsecondvideo");
        //envoyer au back que c'est passé
        $("#player2").hide();
        $('#back').hide();
        // afficher bouton retour à la carte
        $('.lvl-achieved').show();

        $.post("/api/level/passLevelUser/origami", function(data) {
            console.log("post");
        });

    }

}

function adjustHeight() {
    var width = $('.outer iframe').width();
    $('.outer iframe').attr('height', width / 1.77777777778 + 'px');
}

// calls adjustHeight on window load
jQuery(window).load(function() {
    adjustHeight();
});

// calls adjustHeight anytime the browser window is resized
jQuery(window).resize(function() {
    adjustHeight();
});
