// TODO Appel aux webservices
$(document).ready(function() {
    $('.round-info-button').hide();
    $('.round-audio-button').show();
    $("audio").append(
        '<source class="audioSource" src="/audio/carte/65SecNatureSoundsEnchantedForest-TheHonestGuys.mp3" type="audio/mpeg">'
    );

    /**
     * Work with active levels (depending on dates)
     */
    $.get('/api/level/active').done(function(levels) {
        levels.forEach(function(data) {
            var itemSelector = '.item-' + data.code;
            $(itemSelector).removeClass('disabled');
            $(itemSelector).on('click', function() {
                openPopup(data.code);
            });
            //$(itemSelector + ' .icon').attr("href", '/' +data.url);
            $(itemSelector + ' .sign-indice').show();
            if (data.keys) {
                data.keys.forEach(function(data) {
                    $(itemSelector + " select")
                        .append(
                            '<option value="' +
                            data.key + '">' +
                            data.key +
                            '</option>');
                });
            }
        });
    }).fail(function(err) {


    });
    /**
     * Work with passed levels to show indices
     */
    $.get('/api/level/passed').done(function(levels) {
        levels.forEach(function(data) {
            var popup = $('<div class="popup popup-' +
                level + '"></div>');
            popup.append(
                '<div class="popup-close popupClose"></div><div class="popup-header"></div><div class="popup-content"><div class="indice"><p>Indice:</p></div><div class="keys">Sélectionner la clé</div><div class="go"></div></div>'
            );
            var itemSelector = '.item-' + data.code;
            $(itemSelector).addClass("solved");
            $(itemSelector + " .indice").css(
                "background", 'url("' + data.picture +
                '") no-repeat center center / contain'
            );
        });

    }).fail(function(err) {
        console.log(err);
    });


    /**
     * Get the japanImpact date to show the clues
     */
    $.get('/api/level/japanimpact').done(function(happening) {
        if (happening) {
            $('.element .signs').show();
        } else {
            console.log('no japanimpact');
        }
    }).fail(function(err) {

    });

    $('.element .signs select').on('change', function() {
        console.log('selected a new one');
        //console.log($(this).val());

        var calli = $('.sign-calligraphy option:selected').val();
        var food = $('.sign-food option:selected').val();
        var arts = $('.sign-martialarts option:selected').val();
        var pop = $('.sign-popculture option:selected').val();
        var origamis = $('.sign-origami option:selected').val();


        // TODO: Check all selects and make a post request to check
        if (arts != 0 && calli != 0 && food != 0 && pop != 0 &&
            origamis != 0) {
            //console.log(arts+" "+calli+" "+origamis+" "+food+" "+pop);
            $('.combinaisonBox').fadeIn();
            //$(arts+" "+calli+" "+origamis+" "+food+" "+pop).appendTo($("#combinaison"));
            $("#combinaison").append(arts + " " + calli + " " +
                origamis + " " + food + " " + pop);
            $.post("/keys/check", {
                    "content": [{
                        "levelCode": " martialarts",
                        "key": arts
                    }, {
                        "levelCode": " calligraphy",
                        "key": calli
                    }, {
                        "levelCode": " origami",
                        "key": origamis
                    }, {
                        "levelCode": " food",
                        "key": food
                    }, {
                        "levelCode": " popculture",
                        "key": pop
                    }]
                },
                function(data) {
                    if (data) {
                        $('.combinaisonBox').fadeIn();
                        $(arts + " " + calli + " " +
                            origamis + " " + food + " " +
                            pop).appendTo($(
                            "#combinaison"));
                    } else {

                    }
                });
        }
    });
});


$(".modal-bg").on('click', function() {
    closePopup();
});

$(".popupClose").on('click', function() {
    closePopup();



});



function openPopup(world) {
    $(".popup").addClass("popup-" + world);
    $(".modal-bg").show();
    $(".popup-" + world).show();
    loadWorldinPopup(world);
}

function closePopup() {
    $(".modal-bg").hide();
    $(".popup").hide();
    $(".popup").removeClass(function(index, css) {
        return (css.match(/(^|\s)popup-\S+/g) || []).join(' ');
    });
}


function loadWorldinPopup(world) {

}
