// Attente du document ready
$(document).ready(function () {
    //Définition des variables
    var intro = 0;


    $(".martialArtsNextBtn").on('click', introCount);

    function introCount() {
        intro++;
        if (intro === 3) {
            console.log("suivant clicked " + intro + " fois");
            $(kata1);
        }
    }

});

function kata1() {

    //Variable de la fonction
    var tblKata1 = ['Poing', 'Pied', 'Poing'];//Premier kata préconfiguré
    var tblInputs=[];//Tableau stockant les inputs pour le kata
    var nbrInputKata1 = 0;//Nbr d'inputs que le user a entré

    //Détéction des inputs
    $('#btnPoing, #btnPied, #btnSpe').click(function () {

            var i = 0;
            nbrInputKata1++;
            console.log("Vous avez clické sur " + nbrInputKata1 + " inputs");
            tblInputs[i] = this.id;

    });
}
