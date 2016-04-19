// TODO Appel aux webservices
$(document).ready(function() {
    var levels = [{
        code: 'martialarts'
    },{
        code: 'calligraphy'
    }]; // TODO: Replace with data from user (API)

    levels.forEach(function(data) {
        console.log(data.code);
        var item = $('.item-'+data.code);
        
        item.removeClass('disabled').append("<a href='/"+data.code+"'>"+item.val()+"</a>");
    });
});
