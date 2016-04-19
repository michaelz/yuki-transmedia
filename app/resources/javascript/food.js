$.getJSON("/api/quiz", function (data) {
    console.log(data);

    var length = data.length;
    var positionUser = 0;
    console.log(length);



    $(".question").append(data[positionUser].question);
    $.each(data[positionUser].answers, function (a, answer) {
        $(".choices").append("<li class='" + a + "'>" + answer.text + "</li>");


    });
    $(".choices li").click(function () {
        var pos = $(this).attr("class");

        var selectedAnswer = data[positionUser].answers[pos].is_solution;
        if (selectedAnswer) {
            //ajouter un bouton next
            //envoyer en post la validation a l'API à la fin
            //message de confirmation
            $(".button").empty();


            if(positionUser == length){

                $(".button").append('<button type="button" class="true"> <a href="">Terminer</a></button>');

            } else{
                $(".button").append('<button type="button" class="true"> <a href="#">Suivant</a></button>');
                positionUser++;

                $(".true").click(function(){
                    console.log("position User: " + positionUser);
                });

            }

        } else {
            //message d'erreur
            //bouton recommencer
            $(".button").empty();
            $(".button").append('<button type="button" class="false">Recommencer</button>');

        }
    });


});