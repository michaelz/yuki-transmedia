$(document).ready(function () {
    $('#buttons').hide();
    $('#map').hide();
});

// create youtube player


    var player;

    function onYouTubePlayerAPIReady(vidId) {
        console.log("inmethod");
        if(!vidId){
            vidId = "b7ZMKRmhIXI";
            console.log(vidId);
        }

        console.log(vidId);
        player = new YT.Player('player1', {
            height: '315',
            width: '560',
            videoId: vidId,
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
            $("#selection").show().empty().append("<h2>Que doit faire Yuki maintenant ? </h2><button class='btn' id ='sol1'>Souffler </button>" +
                "<button class='btn' id ='sol2'>Arroser </button>");
            $('#buttons').show().attr("id","back1");

            $("#back1").on( "click", function(){
                back1();
            });
            console.log("test1");
            //$("#sol1").onclick(blowSolution());

            $("#sol1").on( "click", function(){
                blowSolution();
            });

            $("#sol2").on( "click", function(){
               waterSolution();
            });
        }
    }


function blowSolution(){
    $('#map').hide();
    $("#selection").hide();

    vidId = "5c6C3rHOdf8";
    var player2;


        console.log("inmethod2");
        console.log(vidId);
        player2 = new YT.Player('player2', {
            height: '315',
            width: '560',
            videoId: vidId,
            events: {
                 'onReady': onPlayerReady,
                'onStateChange': endSecondvideo
            }
        });




    console.log("blowsolution");

}

function waterSolution(){
    $('#map').hide();
    $("#selection").hide();

    vidId = "yz399Ua5Dq0";
    var player2;


    console.log("inmethod2");
    console.log(vidId);
    $("#player2").show();
    player2 = new YT.Player('player2', {
        height: '315',
        width: '560',
        videoId: vidId,
        events: {
             'onReady': onPlayerReady,
            'onStateChange': endSecondvideo
        }
    });



    console.log("blowsolution");

}

function back1(){
    $("#player1").show();
    $('#back1').hide();
    $("#selection").hide();


}

function endSecondvideo(event){
    if (event.data === 0) {
        console.log("endsecondvideo");
        //envoyer au back que c'est passé
        $("#player2").hide();
        $('#buttons').hide();
        // afficher bouton retour à la carte
        $('#map').show();

        $.post("/api/level/passLevelUser/origami", function( data ) {
            console.log("post");
        });

    }

}