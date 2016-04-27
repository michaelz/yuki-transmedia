// TODO Appel aux webservices
$(document).ready(function() {
    $('.round-info-button').hide();
    $('.round-audio-button').show();
    $("audio").append(
        '<source class="audioSource" src="/audio/carte/65SecNatureSoundsEnchantedForest-TheHonestGuys.mp3" type="audio/mpeg">'
    );


    // Get activated levels
    $.get('/api/level/active').done(function(levels) {
        levels.forEach(function(data) {
            var itemSelector = '.item-' + data.code;
            $(itemSelector).removeClass('disabled');
            $(itemSelector + ' .icon').attr("href", '/' +
                data.url);
        });
    }).fail(function(err) {

    });


    // Get passed levels
    $.get('/api/user/me').done(function(data) {
        /*
        var levels = [{
            code: 'martialarts',
            url: 'mondes/artsmartiaux',
            solved: true
        }, {
            code: 'calligraphy',
            url: 'mondes/calligraphie',
            solved: false
        }, {
            code: 'popculture',
            url: 'mondes/popculture',
            solved: true

        },  {
            code: 'origami',
            url: 'mondes/origamis',
            solved: true

        },{
            code: 'food',
            url: 'mondes/nourriture',
            solved: true

        }]; */
        var levels = data.data.passed_levels;

        levels.forEach(function(data) {
            var itemSelector = '.item-' + data.code;
            $(itemSelector + ' .sign-indice').show();
        });
    }).fail(function(err) {
        console.log(err);
    });
});
