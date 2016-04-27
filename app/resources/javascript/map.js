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
        });
    }).fail(function(err) {

    });


    /**
     * Work with passed levels to show indices
     */
    $.get('/api/user/me').done(function(data) {
        var levels = data.data.passed_levels;
        console.log(levels);
        levels.forEach(function(data) {
            var itemSelector = '.item-' + data.code;
            $(itemSelector).addClass("solved");
        });
    }).fail(function(err) {
        console.log(err);
    });
});
