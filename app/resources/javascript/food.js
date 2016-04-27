$(document).ready(function() {

    $("#restartQuiz").on( "click", function() {
      $(".lvl-achieved").fadeOut();
      startQuiz();
    });

    $('.round-audio-button').show();
    $("audio").append('<source class="audioSource" src="/audio/nourriture/HotSprings-DerekAndBrandonFiechter.mp3" type="audio/mpeg">');

    $('.round-info-button').hide();
    $('.img').hide();
    $('.infoBox').hide();
    $('.quiz').hide();
    $('.lvl-achieved').hide();

    $('.round-info-button').on('click', showInfos);

    function showInfos() {
        $('.infoBox').show();
        $('.round-info-button').hide();
        $('.round-info-button-close').on('click', hideInfos);
    }

    function hideInfos() {
        $('.round-info-button').show();
        $('.infoBox').hide();
    }

    //Gestion des dialogue/////////////////////////////////////////
    var indexdialoguepersonnage = 0;
    var indexdialoguescript = 0;
    var dialoguescript = [
        "Bonjour. Je m’appelle Yuki et voici mon ami Guro. Hum, nous recherchons un morceau d’une tasse. Est-ce que ceci vous dit quelque chose?",
        "Bonjour Yuki. Oui, il y a quelque temps, un esprit malicieux est venu mélanger mes recettes et il avait des morceaux de tasse avec lui.",
        "Vous savez où je peux le trouver?",
        "Il a laissé derrière lui ces deux baguettes. Elle peuvent vous mener à lui. Je vous les donne si vous m’aidez à remettre de l’ordre dans mes recettes de cuisine.",
        "Oui d’accord, je vais vous aider."
    ];

    var dialoguepersonnage = [
        "Yuki : ",
        "Hiramatsu : ",
        "Yuki : ",
        "Hiramatsu : ",
        "Yuki : "
    ];

    $(".dialogue-personnage").append(dialoguepersonnage[
        indexdialoguepersonnage]);
    $(".dialogue-script").append(dialoguescript[indexdialoguescript]);

    $(".dialogue-skip").on('click', script);
    $(".dialogue-skip").on('click', personnage);

    function script() {
        indexdialoguescript++;

        if (indexdialoguescript < dialoguescript.length) {
            $(".dialogue-script").empty();
            $(".dialogue-script").append(dialoguescript[
                indexdialoguescript]);
        }

        if (indexdialoguescript === dialoguescript.length) {
            $(".dialogue").fadeOut();
            //Lancer votre fonction post dialogue ici...
            $('.round-info-button').fadeIn();
            $('.quiz').fadeIn();
        }
    }

    function personnage() {
        indexdialoguepersonnage++;

        if (indexdialoguescript < dialoguescript.length) {
            $(".dialogue-personnage").empty();
            $(".dialogue-personnage").append(correctAnswer);
        }
    }

    ///////////////////////////////////////////////////////////////

});



var pos = 0; // define starting question
var correctAnswer; // number of questions answered right


/**
 *
 */
$.getJSON("/api/quiz", function(data) {
    if (data.length > 0) {
        // Build questions
        $.each(data, function(q, question) {
            buildQuestion(q, question);
        });
        $('#startQuiz').on('click', function() {
            console.log('click');
            $(this).parent().hide(); // hide the startQuiz button
            startQuiz(data);
        });
    } else {
        $('#startQuiz').parent().append(
            '<p>Pas de questions ici, désolé!</p>');
    }
});


/*
 * Start the Quiz function
 * data should be the data received from the ajax call
 */
var startQuiz = function(data) {
    correctAnswer = 0;
    $('.q-' + pos).show(); // show first question
    $('.answer').on('click', function() {
        if (data[pos].answers[$(this).attr('data-position')].is_solution) {
            correctAnswer += 1;
        }
        nextQuestion(pos, data.length);
    });
}


/*
 * Next question or finish quiz if question is last
 */
var nextQuestion = function(currentPos, total) {
    if (currentPos == total - 1) {
        $(".q-" + pos).hide();
        //To do div pour mettre le score du petit nenfant
        $(".quiz").append();
        pos = 0;
        $("#quizTXT").empty();
        if (correctAnswer >= 1) {
          // Envoi des infos à la bd
          $.post("/api/level/passLevelUser/food",{ result: correctAnswer}, function( data ) {
            $("#quizTXT").append("Bravo");
            $("#restartQuiz").hide();
            $("#mondes").show();
            $("#msg").empty();
            $("#msg").append("Tu as réussi le défi. Maître Hiramatsu est fière de toi et comme convenu, il te transmet l'indice te permettant de retrouver le morceau de tasse à la Japan Impact.");
            $(".yukiImage").removeAttr("src");
            $(".yukiImage").attr("src", "/img/yuki_content.png");
          });
        } else {
            $("#quizTXT").append("Dommage");
            $("#mondes").hide();
            $("#msg").empty();
            $("#msg").append("Tu as loupé les révisions. Maître Hiramatsu n'a pas réussi à apprendre correctement son examen. Il te demande gentiment de l'aider une nouvelle fois. Merci de réessayer pour aider Hiramatsu");
            $("#restartQuiz").show();
            $(".yukImage").removeAttr("src");
            $(".yukImage").attr("src", "/img/sprites/yuki_tombe.png");


        }

        $('.round-info-button').show();
        $("#quizResult").empty();
        $("#quizResult").append(correctAnswer + "/" + total);
        $('.lvl-achieved').fadeIn();

    } else {
        $(".q-" + pos).hide();
        pos++;
        $(".q-" + pos).show();
    }
}

/**
 * Fonction to build the frontend of the questionBlock
 */
var buildQuestion = function(pos, q) {
    // var length = data.length;
    // Template is hidden by default;
    var qTpl = '<div style="display:none" class="questionBlock q-' + pos +
        '" data-question="' + pos + '"><ol class="choices"></ol></div>';

    $(".quiz").append(qTpl);
    $(".q-" + pos).prepend('<h3 class="qTitle">' + q.question + '</h3>');

    $.each(q.answers, function(a, answer) {
        $(".q-" + pos + " .choices").append("<li data-position='" +
            a + "' class='answer'>" + answer.text + "</li>");
    });
}


/*$(".choices li").click(function() {
  var pos = $(this).attr("data-position");

  var selectedAnswer = q.answers[pos].is_solution;
  if (selectedAnswer) {
    //ajouter un bouton next
    //envoyer en post la validation a l'API à la fin
    //message de confirmation
    $(".button").empty();

/*
    if (positionUser == length) {

      $(".button").append('<button type="button" class="true"> <a href="">Terminer</a></button>');

    } else {
      $(".button").append('<button type="button" class="true"> <a href="#">Suivant</a></button>');
      positionUser++;

      $(".true").click(function() {
        console.log("position User: " + positionUser);
      });

  }*/
/*

  } else {
    //message d'erreur
    //bouton recommencer
    $(".button").empty();
    $(".button").append('<button type="button" class="false">Recommencer</button>');

  }
});*/
