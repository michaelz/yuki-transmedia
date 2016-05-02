/*
 *intro
 */

//Déclare id en tant que variable globale pour qu'elle soit visible dans les 2 fonctions
var id;

$(document).ready(function() {
    //Permet de prendre l'id dans l'url
    var sPageURL = window.location.toString();
    var sURLid = sPageURL.split('/');
    id = sURLid[sURLid.length - 1];



    //Controle si l'id existe pour faire le get pour modifier un niveau
    if (id != 'ajoutMonde') {
        $.get("/api/level/" + id)
            .done(function(data) {
                $("#code").val(data.code);
                $("#date_sortie").val(data.release_date);
                $("#url").val(data.url);
                if (data.is_world) $("#isWorld").prop("checked", true);
                var x = 1;
                $.each( data.keys, function( index, value ) {
                    $("#key" + x).val(value.key);
                    x++;
                });
            })
            .fail(function() {
                console.log("error");
            })
    }
    $.datetimepicker.setLocale('fr');
    $('#date_sortie').datetimepicker({
        format: 'YYYY-MM-DD\THH:mm',
        formatDate: 'YYYY-MM-DD\THH:mm',
        mask: false,
        datepicker: true,
        timepicker: true
    });


});

Date.parseDate = function(input, format) {
    return moment(input, format).toDate();
};
Date.prototype.dateFormat = function(format) {
    return moment(this).format(format);
};

//Function envoyant les données des formulaires (créer un level, modifier un level) pour créer ou modifier un level


function capture() {
    File.prototype.convertToBase64 = function(callback) {
        var FR = new FileReader();
        FR.onload = function(e) {
            callback(e.target.result)
        };
        FR.readAsDataURL(this);
    }

    var level = {};
    level.code = $("#code").val();
    level.release_date = $("#date_sortie").val();
    level.url = $("#url").val();
    level.is_world = $('#isWorld').is(':checked');
    level.keys = [];
    for (var i = 1; i <= 5; i++) {
        if (i ==  $('#correctKey').val()){
            level.keys.push({key: $('#key' + i).val(), is_true: true});
        } else {
            level.keys.push({key: $('#key' + i).val(), is_true: false});
        }
    }


    //Sélectionne la bonne root pour le bon formulaire
    if (id == "ajoutMonde") {
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
                    type: "PUT",
                    url: "/api/level/" + id,
                    data: level
                }).done(function(data) {
                    window.location.replace('/admin');
                }).fail(function(err) {
                    console.log(err);
                });
            })
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
        }
    }
}
