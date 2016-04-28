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
            $(itemSelector + ' .icon').attr("href", '/' +
                data.url);
            $(itemSelector + ' .sign-indice').show();
            if (data.keys) {
                data.keys.forEach(function(data) {
                    $(itemSelector + " select")
                        .append(
                            '<option>' + data.key +
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
        // TODO: Check all selects and make a post request to check
    });

});
