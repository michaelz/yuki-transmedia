// TODO Appel aux webservices
$(document).ready(function() {
    $.get("api/user/finished", function(data) {
        if (data.length != 0) {
            $("#keyBtn").empty();
            $("#keyBtn").append(
                '<button><i class="fa fa-key" aria-hidden="true"></i></button>'
            );
            var keys = data.toString();
            $("#combinaison").append(keys);
        }
    });
    if (!Cookies.get("japanimpact")) Cookies.set("japanimpact", 0);
    $('.round-info-button').hide();
    $('.round-audio-button').show();
    $(".lvl-achieved").hide();
    $("audio").append(
        '<source class="audioSource" src="/audio/carte/65SecNatureSoundsEnchantedForest-TheHonestGuys.mp3" type="audio/mpeg">'
    );

    /**
     * Work with active levels (depending on dates)
     */
    $.get('/api/level/active').done(function(levels) {
        levels.forEach(function(data) {
            var itemSelector = '.item-' + data.code;
            var popupSelector = '.popup-' + data.code;

            $(itemSelector).removeClass('disabled');

            $(itemSelector).on('click', function() {
                openPopup(data.code);
            });

            $(popupSelector + ' .enter').attr("href",
                '/' + data.url);
            $(popupSelector + ' .sign-indice').show();
            if (data.keys) {
                data.keys.forEach(function(data) {
                    $(popupSelector + " select")
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
            var itemSelector = '.item-' + data.code;
            var popupSelector = '.popup-' + data.code;
            $(itemSelector).addClass("solved");
            $(popupSelector).addClass("solved");
            $(popupSelector + " .text").html('Indice');
            $(popupSelector + " .indice").css(
                "background", 'url("' + data.picture +
                '") no-repeat center center / 68% auto'
            );
        });

    }).fail(function(err) {
        console.log(err);
    });

    /**
     * Show div for JapanImpact RDV
     */
    $.get('/api/level/passed').done(function(levelsPassed) {
        $.get('/api/level/listGames').done(function(levels) {
            if (levelsPassed.length == levels.length &&
                Cookies.get("japanimpact") == 0) {
                Cookies.set("japanimpact", 1);
                $(".lvl-achieved").show();
            }
        }).fail(function(err) {
            console.log(err);
        });
    }).fail(function(err) {
        console.log(err);
    });

    /**
     * Get the japanImpact date to show the clues
     */
    $.get('/api/level/japanimpact').done(function(happening) {
        if (happening) {
            $('.signs').show();
        } else {
            console.log('no japanimpact');
        }
    }).fail(function(err) {

    });

    $('#mondes').click(function() {
        $(".lvl-achieved").hide();
    })

    $('.popup .signs select').on('change', function() {

        var calli = $('.sign-calligraphy option:selected').val();
        var food = $('.sign-food option:selected').val();
        var arts = $('.sign-martialarts option:selected').val();
        var pop = $('.sign-popculture option:selected').val();
        var origamis = $('.sign-origami option:selected').val();

        /*
                var keytosave = {
                    code: $(this).attr('class').split("-")[1],
                    key: $(this).val()
                }

                $.ajax({
                    type: "PUT",
                    url: "/api/user/keytosave",
                    contentType: "application/json",
                    data: {
                        "selectedKeys": keytosave
                    }
                });
                */


        // Check all selects and make a post request to check
        if (arts != 0 && calli != 0 && food != 0 && pop != 0 &&
            origamis != 0) {
            $.post("/api/user/keys/check", {
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
                    if (data === "true") {
                        $(".popup-martialarts").fadeOut();
                        $(".popup-calligraphy").fadeOut();
                        $(".popup-origami").fadeOut();
                        $(".popup-food").fadeOut();
                        $(".popup-popculture").fadeOut();
                        $('.combinaisonBox').fadeIn();
                        /*$(arts + " " + calli + " " +
                            origamis + " " + food + " " +
                            pop).appendTo($(
                            "#combinaison"));*/
                        $("#combinaison").empty();
                        $("#combinaison").append(arts + " " +
                            calli + " " + origamis +
                            " " + food + " " + pop);
                        $("#keyBtn").append(
                            '<button><i class="fa fa-key" aria-hidden="true"></i></button>'
                        );
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
    $(".modal-bg").fadeIn();
    $(".popup-" + world).fadeIn();
    loadWorldinPopup(world);
}

function closePopup() {
    $(".modal-bg").fadeOut();
    $(".popup").fadeOut();
}


$("#keyBtn").on('click', function() {
    console.log("Key clicked");
    $('.combinaisonBox').fadeIn();
});
