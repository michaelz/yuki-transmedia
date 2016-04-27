$(document).ready(function() {

    $('.round-audio-button').show();
    $("audio").append(
        '<source class="audioSource" src="/audio/admin/NyanCat.mp3" type="audio/mpeg">'
    );

    $.get("/api/level")
        .done(function(data) {
            $.each(data, function(index, value) {
                $('.tabLevel tbody').append('<tr><td>' +
                    value.code + '</td><td>' + value.release_date
                    .slice(0, -8).replace("T", " ") +
                    '</td><td>' + value.url +
                    '</td><td><a href="/admin/' + value
                    ._id +
                    '">edit</a></td><td><button class="buttonDelete" id="' +
                    value._id +
                    '"> - </button></td></tr>');
            });
            $(".buttonDelete").on("click", function() {
                $.ajax({
                    type: "DELETE",
                    url: "/api/level/" + $(this).attr(
                        'id')
                }).done(function(data) {
                    window.location.replace(
                        '/admin');
                }).fail(function(err) {
                    console.log(err);
                });
            });

        })
        .fail(function() {
            console.log("error");
        });
});
