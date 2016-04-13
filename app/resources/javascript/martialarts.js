// Attente du document ready
$(document).ready(function () {
    //Définition des variables
    var intro = 0;


    $(".martialArtsNextBtn").on('click', introCount);

    function introCount() {
        intro++;
        if (intro === 3) {
            //console.log("suivant clicked " + intro + " fois");
            $(kata1);
        }
    }

});

function kata1() {
    console.log("fonction kata");

    $('#btnPoing, #btnPied, #btnSpe').click(function () {
        if (this.id === 'btnPoing') {
            console.log("Vous avez clické sur le bon bouton (poing)");

        } else {
            console.log('Vous avez clické sur le mauvais');
        }
    });
}
