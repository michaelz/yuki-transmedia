/*
 *intro
 */
$(document).ready(function() {

    //Définition des variables
    ///////////////////////////////////////////////////////////////
    var intro = 0;
    var lvl = 0;
    var nbMove = 2;
    $(".lvl-achieved").hide();


    //Gestion des dialogue/////////////////////////////////////////
    var indexdialoguepersonnage = 0;
    var indexdialoguescript = 0;
    var dialoguescript = [
        "Regade! Il est entré ici! Mince, nous ne pouvons pas entrer, la porte est bloquée.",
        "Bonjour, que se passe-t-il? Je peux vous aider?",
        "On doit rentrer dans ce bâtiment mais les portes refusent de s’ouvrir.",
        "Je sais pourquoi, les portes sont équipées d’un programme qui reconnaît les visages et bloque l’accès à certaines personnes. Celui que vous suivez a bloqué l’accès pour vous.",
        "Oh non! Il faut vraiment que nous entrions dans ce bâtiment. Comment faire?",
        "Suivez-moi, j’ai une idée. On va se déguiser afin que le programme ne vous reconnaisse pas."
    ];

    var dialoguepersonnage = [
        "Yuki : ",
        "Hatsune : ",
        "Yuki : ",
        "Hatsune : ",
        "Yuki : ",
        "Hatsune : "
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
            yukiCustomisation(nbMove, lvl);
            adjustHeight();
            $('.square').addClass('game');
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


    //Masquage des éléments
    $('#main').hide();
    $('.infoBox').hide();

    $('.round-info-button').on('click', showInfos);



    /*
     * POP CULTURE Game
     */

    function yukiCustomisation() {
        $('.round-info-button').fadeOut();
        $('#main').fadeIn();
        for (var i = 1; i < 18; i++) {
            $(".menuAccessoires").append('<div class="drag" id="img' +
                i +
                '"><img src="/img/jeu_popculture/accessoires/item' +
                i +
                '.png" class="accessoire" ></div>');
        }

        //$(".menuFonds").hide();

        $(".drag").draggable({
            containment: "#main"
        });

        $("#droppableContenu").droppable({
            drop: function(event, ui) {
                var position = $("#" + ui.draggable[0].id).position();
                $("#droppableContenu").append(ui.draggable[
                    0]);
                $("#" + ui.draggable[0].id).css({
                    'position': 'absolute',
                    'left': position.left + 'px',
                    'top': position.top + 'px'
                });
            }
        });

        $("#droppableMenu").droppable({
            drop: function(event, ui) {
                $("#droppableMenu").append(ui.draggable[0]);
                $("#" + ui.draggable[0].id).css({
                    'position': 'relative',
                    'left': '',
                    'top': ''
                });
            }
        });

        /*$(".btnAccessoires").click(function() {
            $(".btnAccessoires").css("color", "#3498db");
            $(".btnAccessoires").css("background", "white");

            $(".btnFonds").css("color", "white");
            $(".btnFonds").css("background", "#3498db");

            $(".btnFonds").css("border-top-width", "6px");
            $(".btnFonds").css("border-bottom-width", "0px");

            $(".menuAccessoires").show();
            $(".menuFonds").hide();
        })*/

        /*$(".btnFonds").click(function() {
            $(".btnFonds").css("color", "#3498db");
            $(".btnFonds").css("background", "white");

            $(".btnFonds").css("border-top-width", "0px");
            $(".btnFonds").css("border-bottom-width", "6px");

            $(".btnAccessoires").css("color", "white");
            $(".btnAccessoires").css("background", "#3498db");

            $(".menuFonds").show();
            $(".menuAccessoires").hide();
        })*/


        $("#fondsImg1").click(function() {
            if ($('.contenu').css("background-image") ==
                'url("http://' + $(
                    location).attr('host') +
                '/img/jeu_popculture/fonds/arts-martiaux.png")'
            ) {
                $('.contenu').css("background-image", "");
            } else {
                $('.contenu').css("background-image",
                    "url(/img/jeu_popculture/fonds/arts-martiaux.png)"
                );
            }
        })

        $("#fondsImg2").click(function() {
            if ($('.contenu').css("background-image") ==
                'url("http://' + $(
                    location).attr('host') +
                '/img/jeu_popculture/fonds/calligraphie.png")') {
                $('.contenu').css("background-image", "");
            } else {
                $('.contenu').css("background-image",
                    "url(/img/jeu_popculture/fonds/calligraphie.png)"
                );
            }
        })
    };



    function adjustHeight() {
        var width = $('.square-element').width();
        $('.square-element').css('height', width + 'px');
        $('#purikura').css('height', width + 'px');
        //$('#menu').css('height', width + 'px');

    }

    // calls adjustHeight on window load
    jQuery(window).load(function() {
        adjustHeight();
    });

    // calls adjustHeight anytime the browser window is resized
    jQuery(window).resize(function() {
        adjustHeight();
    });

    function showInfos() {
        $('.infoBox').show();
        $('.round-info-button').hide();
        $('.round-info-button-close').on('click', hideInfos);
    }

    function hideInfos() {
        $('.round-info-button').show();
        $('.infoBox').hide();

    }
});

function capture() {
    $("#photoBouton").hide();
    html2canvas($('.contenu'), {
        onrendered: function(canvas) {
            $("#img").val(canvas.toDataURL("image/png"));
            var a = document.createElement('a');
            a.href = canvas.toDataURL("image/jpeg").replace(
                "image/jpeg", "image/octet-stream");
            a.download = 'monYuki.jpg';
            a.click();
            $("#photoBouton").show();
            document.getElementById("myForm").submit();
        }
    });
}
