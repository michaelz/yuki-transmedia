$(document).ready(function() {

    $('.round-info-button').hide();
    $('.img').hide();
    $('.infoBox').hide();
    $('.quiz').hide();

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
      "Hum, ce doit être le monde de la calligraphie...",
      "Hey Grue-chan, peut-tu m'aider à retrouver le morceau de tasse de mon grand-père ?",
      "Ok, mais d'abord résoud ce puzzle."
    ];

    var dialoguepersonnage = [
      "Yuki : ",
      "Yuki : ",
      "Grue-chan : "
    ];

    $( ".dialogue-personnage" ).append(dialoguepersonnage[indexdialoguepersonnage]);
    $( ".dialogue-script" ).append(dialoguescript[indexdialoguescript]);

    $(".dialogue-skip").on('click', script);
    $(".dialogue-skip").on('click', personnage);

    function script(){
      indexdialoguescript++;

      if (indexdialoguescript < dialoguescript.length) {
        $( ".dialogue-script" ).empty();
        $( ".dialogue-script" ).append(dialoguescript[indexdialoguescript]);
      }

      if (indexdialoguescript === dialoguescript.length) {
        $( ".dialogue" ).fadeOut();
        //Lancer votre fonction post dialogue ici...
        $('.round-info-button').fadeIn();
        $('.quiz').fadeIn();
      }
    }

    function personnage(){
      indexdialoguepersonnage++;

      if (indexdialoguescript < dialoguescript.length) {
        $( ".dialogue-personnage" ).empty();
        $( ".dialogue-personnage" ).append(dialoguepersonnage[indexdialoguepersonnage]);
      }
    }

    ///////////////////////////////////////////////////////////////

});




var pos = 0; // define starting question


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
    $('#startQuiz').parent().append('<p>Pas de questions ici, désolé !</p>');
}
});


/*
 * Start the Quiz function
 * data should be the data received from the ajax call
 */
var startQuiz = function(data) {
    $('.q-'+pos).show(); // show first question

    $('.answer').on('click', function() {
        if (data[pos].answers[$(this).attr('data-position')].is_solution) {
            nextQuestion(pos, data.length);
        }
    });
}


/*
 * Next question or finish quiz if question is last
 */
var nextQuestion = function(currentPos, total) {
    if (currentPos == total) {
        $(".q-"+pos).hide();
        $('.quiz').append('ok !');
    } else {
        $(".q-"+pos).hide();
        pos++;
        $(".q-"+pos).show();
    }
}

/**
 * Fonction to build the frontend of the questionBlock
 */
var buildQuestion = function(pos, q) {
  // var length = data.length;
  // Template is hidden by default;
  var qTpl = '<div style="display:none" class="questionBlock q-'+pos+'" data-question="'+pos+'"><ol class="choices"></ol></div>';

  $(".quiz").append(qTpl);
  $(".q-"+pos).prepend('<h3 class="qTitle">'+q.question+'</h3>');

  $.each(q.answers, function(a, answer) {
    $(".q-"+pos+" .choices").append("<li data-position='"+a+"' class='answer'>" + answer.text + "</li>");
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

  }*//*

  } else {
    //message d'erreur
    //bouton recommencer
    $(".button").empty();
    $(".button").append('<button type="button" class="false">Recommencer</button>');

  }
});*/
