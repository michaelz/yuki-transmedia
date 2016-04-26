$(document).ready(function() {
    $.get( "/api/level")
        .done(function(data) {
            $.each(data, function( index, value ) {
                $('.tabLevel tbody').append('<tr><td>' + value.code + '</td><td>' + value.release_date + '</td><td>' + value.url + '</td><td><a href="/admin/' + value._id + '">edit</a></td></tr>');
            });

        })
        .fail(function() {
            console.log( "error" );
    })
});