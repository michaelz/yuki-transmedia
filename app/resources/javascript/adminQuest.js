/*
 *intro
 */
 function saveQuestion() {

    var question = {};
    question.position = $('#pos').val();
    question.question = $('#question').val();
    question.answers = [];
    if ($('#reponse').val() > 0 && $('#reponse').val() < 5) {
        for (var i = 1; i <= 4; i++) {
            if (i ==  $('#reponse').val()){
                question.answers.push({text: $('#quest' + i).val(), is_solution: true});
            } else {
                question.answers.push({text: $('#quest' + i).val(), is_solution: false});
            }
        }
        $.ajax({
            type: "POST",
            url: "/api/quiz",
            data: question
        }).done(function(data) {
            alert('Question ajoutée');
            console.log(data);
        }).fail(function(err) {
            console.log(err);
        });
    }
}
