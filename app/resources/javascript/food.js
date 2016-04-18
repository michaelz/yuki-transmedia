$.getJSON("/api/quiz", function (data) {
    console.log(data);

    var length = data.length;
    console.log(length);
    $(".question").append(data[0].question);
    $.each(data[0].answers, function (a, answer) {
        $(".choices").append("<li class='" + a + "'>" + answer.text + "</li>");


    });
    $(".choices li").click(function () {
        var pos = $(this).attr("class");

        var selectedAnswer = data[0].answers[pos].is_solution;
        if (selectedAnswer) {
            //ajouter un bouton next
            //envoyer en post la validation a l'API à la fin
            //message de confirmation
            $(".button").empty();
            $(".button").append('<button type="button" class="true"> Send</button>');

        } else {
            //message d'erreur
            //bouton recommencer
            $(".button").empty();
            $(".button").append('<button type="button" class="false"> Start again</button>');
        }
    });


});