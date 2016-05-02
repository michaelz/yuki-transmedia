/*
 *intro
 */
$(document).ready(function() {
    $('.lvl-achieved').hide();
    $('.round-audio-button').show();
    $("audio").append(
        '<source class="audioSource" src="/audio/popculture/DemAhFraudulant-Kamilean.mp3" type="audio/mpeg">'
    );

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
        "Bonjour, vous avez l’air perdus. Je peux vous aider?",
        "Bonjour, on voulait rentrer dans le bâtiment derrière mais les portes refusent de s’ouvrir.",
        "Je sais pourquoi, les portes sont équipées d’un programme qui reconnaît les visages et bloque l’accès à certaines personnes. Celui que vous suivez a bloqué l’accès pour vous.",
        "Oh non! Il faut vraiment que nous entrions dans ce bâtiment. Comment faire?",
        "Suivez-moi, j’ai une idée. On va se déguiser afin que le programme ne vous reconnaisse pas."
    ];

    var dialoguepersonnage = [
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

        var fonds = [
            'fond1',
            'fond2',
            'fond3',
            'fond4',
            'fond5',
            'fond6',
            'fond7',
            'fond8',
            'fond9'
        ];

        for (var i = 0; i < fonds.length; i++) {
            console.log(fonds[i]);
            $('.menuFonds').append("<div class=\"bg " + fonds[i] +
                "\" style=\"background-image:url('/img/jeu_popculture/fonds/" +
                fonds[i] + ".png')\"></div>");
        }

        $('.bg').click(function() {
            var bg = $(this).css("background-image");

            if ($('.contenu').css("background-image") == bg) {
                // remove bg
                $('.contenu').css("background-image", "");
            } else {
                $('.contenu').css("background-image", bg);
            }
        })
        $("#fondsImg1").click(function() {

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
    html2canvas($('.contenu'), {
        onrendered: function(canvas) {
            $("#img").val(canvas.toDataURL("image/png"));
            console.log($("#img").val());
            var a = document.createElement('a');
            a.href = canvas.toDataURL("image/jpeg").replace(
                "image/jpeg", "image/octet-stream");
            a.download = 'monYuki.jpg';
            a.click();

            $.ajax({
                type: "POST",
                url: "/api/picture/upload",
                data: $("#img").val(canvas.toDataURL(
                    "image/png"))
            }).done(function(data) {
                console.log("ok");
            }).fail(function(err) {
                console.log(err);
            });
        }
    });
}

function terminerPopculture() {
    $.post("/api/level/passLevelUser/popculture", {
        result: "done"
    }, function(data) {
        $('.lvl-achieved').show();
    });
}
