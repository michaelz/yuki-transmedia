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
