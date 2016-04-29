$(document).ready(function() {

    $('.round-audio-button').show();
    $("audio").append(
        '<source class="audioSource" src="/audio/admin/NyanCat.mp3" type="audio/mpeg">'
    );

    $.get("/api/level")
        .done(function(data) {
            $.each(data, function(index, value) {
                $('.tabLevel .levels tbody').append(
                    '<tr><td>' +
                    value.code + '</td><td>' + value.release_date
                    .slice(0, -8).replace("T", " ") +
                    '</td><td>' + value.url +
                    '</td><td><a class="edit" href="/admin/' +
                    value
                    ._id +
                    '"></a>&nbsp;<span title="supprimer" class="buttonDelete" id="' +
                    value._id +
                    '"></span></td></tr>');
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
            console.log("error while loading levels");
        });
    $.get("/api/quiz")
        .done(function(data) {
            //"<td>pos.</td><td>Question</td><td>Réponses</td><td>Rép. Correcte</td>"
            $.each(data, function(index, value) {
                $('.tabLevel .questions tbody').append(
                    "<td>" + value.position +
                    "</td><td>" +
                    value.question +
                    "</td><td class='answers'></td>");

                var answers = $("<ul class='answers'></ul>");
                $.each(value.answers, function(a, answer) {

                    var answerClass =
                        "not-solution";

                    if (answer.is_solution) {
                        answerClass = "is-solution";
                    }
                    answers.append('<li class="' +
                        answerClass + '">' +
                        answer.text +
                        '</li>');
                });
                $('.answers').append(answers);
            });
        }).fail(function() {
            console.log("error while loading quiz");
        });
});
