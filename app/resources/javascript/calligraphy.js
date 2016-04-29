var settings = {
    rows: 3, // number of rows [3 ... 9]
    cols: 3, // number of columns [3 ... 9]
    hole: 9, // initial hole position [1 ... rows*columns]
    shuffle: true, // initially show shuffled pieces [true|false]
    numbers: true, // initially show numbers on pieces [true|false]
    language: 'fr', // language for gui elements [language code]

    // display additional gui controls
    control: {
        shufflePieces: false, // display 'Shuffle' button [true|false]
        confirmShuffle: false, // ask before shuffling [true|false]
        toggleOriginal: true, // display 'Original' button [true|false]
        toggleNumbers: false, // display 'Numbers' button [true|false]
        counter: true, // display moves counter [true|false]
        timer: true, // display timer (seconds) [true|false]
        pauseTimer: true // pause timer if 'Original' button is activated
            // [true|false]
    },

    // perform actions when the puzzle is solved sucessfully
    success: {
        //fadeOriginal: false,    // cross-fade original image [true|false]
        callback: function(results) {
               /* alert('Resolu en ' + results.moves + ' coups et en ' +
                    +results.seconds + ' secondes.');*/

            $.post("/api/level/passLevelUser/calligraphy", { result: results.seconds}, function( data ) {
                console.log("post");
            });
            $(".lvl-achieved").show();

            } //,    // callback a user-defined function [function]
            // the function is passed an object as its argument
            // which includes the fields 'moves' and 'seconds'
            //callbackTimeout: 300    // time in ms after which the callback is called


    },

    // animation speeds and settings
    animation: {
        shuffleRounds: 3, // number of shuffle rounds [1 ... ]
        shuffleSpeed: 800, // time in ms to perform a shuffle round
        slidingSpeed: 200, // time in ms for a single move
        fadeOriginalSpeed: 600 // time in ms to cross-fade original image
    },

    // additional style information not specified via css
    style: {
        gridSize: 2, // space between two pieces in px
        overlap: true, // if true, adjacent piece borders will overlap
        // applies only if gridSize is set to 0
        backgroundOpacity: 0.1 // opacity of the original image behind the pieces
            // [0 ... 1] (0 means no display)
    }
}

var texts = {
    shuffleLabel: 'Mélanger',
    toggleOriginalLabel: 'Original',
    toggleNumbersLabel: 'Numbers',
    confirmShuffleMessage: 'Do you really want to shuffle?',
    movesLabel: 'moves',
    secondsLabel: 'seconds'
}

$(document).ready(function() {

    $(".lvl-achieved").hide();
    $('.round-audio-button').show();
    $("audio").append('<source class="audioSource" src="/audio/calligraphie/CherryBlossoms-DerekFiechter.mp3" type="audio/mpeg">');

    $('.round-info-button').show();
    $('.img').hide();
    $('.infoBox').hide();

    $('.round-info-button').on('click', showInfos);

    function showInfos() {
        $('.infoBox').show();
        $('.round-info-button').hide();
        $('.round-info-button-close').on('click', hideInfos);
    }

    function hideInfos() {
        $('.round-info-button').show();
        $('.infoBox').hide();
    }

    //Gestion des dialogue/////////////////////////////////////////
    var indexdialoguepersonnage = 0;
    var indexdialoguescript = 0;
    var dialoguescript = [

        "Oh regarde Guro, quel beau paysage. C’est magnifique..",
        "Mais quels sont ces cris? Bonjour, que se passe-t-il?",
        "Un esprit malveillant a mélangé les parties composant ma toile. C’était ma plus belle!",
        "Je vais t’aider à remettre le tout dans l’ordre.",
        "Merci beaucoup! Si tu y parviens, pour te remercier, je te donnerai un indice menant à ce fauteur de trouble."
    ];

    var dialoguepersonnage = [
        "Yuki : ",
        "Yuki : ",
        "Akimi : ",
        "Yuki :",
        "Akimi :"
    ];

    $(".dialogue-personnage").append(dialoguepersonnage[
        indexdialoguepersonnage]);
    $(".dialogue-script").append(dialoguescript[indexdialoguescript]);

    $(".dialogue-skip").on('click', script);
    $(".dialogue-skip").on('click', personnage);

    function script() {
        indexdialoguescript++;

        if (indexdialoguescript < dialoguescript.length) {
            $(".dialogue-script").empty();
            $(".dialogue-script").append(dialoguescript[
                indexdialoguescript]);
        }

        if (indexdialoguescript === dialoguescript.length) {
            $(".dialogue").fadeOut();
            //Lancer votre fonction post dialogue ici...
            $('img.jqPuzzle').jqPuzzle(settings, texts); // apply to all images
            $('.round-info-button').fadeOut();

            $('.img').fadeIn(3000);


        }
    }

    function personnage() {
        indexdialoguepersonnage++;

        if (indexdialoguescript < dialoguescript.length) {
            $(".dialogue-personnage").empty();
            $(".dialogue-personnage").append(dialoguepersonnage[
                indexdialoguepersonnage]);
        }
    }

    ///////////////////////////////////////////////////////////////



    $('img.jqPuzzle').jqPuzzle(settings, texts); // apply to all images

});
