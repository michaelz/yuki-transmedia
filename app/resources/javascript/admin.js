$(document).ready(function() {
    $.get( "/api/level")
        .done(function(data) {
            $('.tabLevel').append('<a href="/admin/ajoutMonde">Ajouter un niveau</a>');
            $('.tabLevel').append('<table style="width:100%">');
            $('.tabLevel').append('<tr><td>Num</td><td>Nom</td><td>Code</td><td>Date sortie</td><td>info add</td><td>Desc</td><td>Url</td><td></td></tr>');
            $.each(data, function( index, value ) {
                $('.tabLevel').append('<tr><td>' + value.number + '</td><td>' + value.name + '</td><td>' + value.code + '</td><td>' + value.release_date + '</td><td>' + value.additional_info + '</td><td>' + value.description + '</td><td>' + value.url + '</td><td><a href="/admin/' + value._id + '">edit</a></td></tr>');
            });

            $('.tabLevel').append('</table>');
        })
        .fail(function() {
            console.log( "error" );
    })
});