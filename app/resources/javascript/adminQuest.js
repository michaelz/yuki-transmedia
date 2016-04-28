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
        


    //Sélectionne la bonne root pour le bon formulaire
/*    if (id == "ajoutMonde") {
        var selectedFile = $('#fileToUpload').prop('files')[0];
        if (selectedFile) {
            selectedFile.convertToBase64(function(base64) {
                var contentType = base64.split(';');
                contentType = contentType[0].split(':');
                contentType = contentType[1];

                var data = base64.split(';');
                data = data[1].replace("base64,", "");
                level.clue = {
                    contentType: contentType,
                    data: data
                };

                $.ajax({
                    type: "POST",
                    url: "/api/level",
                    data: level
                }).done(function(data) {
                    window.location.replace('/admin');
                }).fail(function(err) {
                    console.log(err);
                });
            })
        } else {
            $.ajax({
                type: "POST",
                url: "/api/level",
                data: level
            }).done(function(data) {
                window.location.replace('/admin');
            }).fail(function(err) {
                console.log(err);
            });
        }

    } else {
        $.ajax({
            type: "PUT",
            url: "/api/level/" + id,
            data: level
        }).done(function(data) {
            window.location.replace('/admin');
        }).fail(function(err) {
            console.log(err);
        });
    }*/
}
