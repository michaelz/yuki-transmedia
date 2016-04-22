// TODO Appel aux webservices
$(document).ready(function() {
    $('.round-info-button').hide();
  
    var levels = [{
        code: 'martialarts'
    }, {
        code: 'calligraphy'
    }, {
        code: 'popculture'
    }, {
        code: 'food'
    }]; // TODO: Replace with data from user (API)

    levels.forEach(function(data) {
        console.log(data.code);
        var item = $('.item-' + data.code);

        item.removeClass('disabled').append("<a href='/" + data
            .code + "'>" + item.val() + "</a>");
    });

    $(".element:not(.item-intro)").append("<p>Hello</p>")
});
