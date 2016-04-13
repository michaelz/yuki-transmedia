// Attente du document ready
$(document).ready(function () {

  //Définition des variables
  var intro = 0;
    $('#martialArtsBubble2').hide();
    $('#martialArtsBubble3').hide();
    $('#martialArtsBubble4').hide();

  //detection du clic sur suivant
  $(".martialArtsNextBtn").on('click', introCount);

  //Fonction liée au clic sur suivant
  function introCount() {
    //Incrémentation de la variable au clic sur le bouton suivant
    intro++;

    if (intro === 1) {
      $('#martialArtsBubble1').hide();
      $('#martialArtsBubble2').show();
    }

    if (intro === 2) {
      $('#martialArtsBubble2').hide();
      $('#martialArtsBubble3').show();
    }

    //Dès que l'on a clické assez de fois sur suivant...
    if (intro === 3) {
      $('#martialArtsBubble3').hide();
      $('.martialArtsNextBtn').hide();
      console.log("suivant clicked " + intro + " fois");
      //...On lance la fonction gérant le premier kata
      $(kata1);
    }
  }

});

//Fonction gérant le premier kata
function kata1() {
  $('#martialArtsBubble4').show();
  //Variable propre à la fonction
  var tblKata1 = ['btnPoing', 'btnPied', 'btnPoing'];//Premier kata préconfiguré
  var tblInputs=[];//Tableau stockant les inputs pour le kata
  var nbrInputKata1 = 0;//Nbr d'inputs que le user a entré
  var i = 0;

  //Détéction des inputs
  $('#btnPoing, #btnPied, #btnSpe').click(function () {

    //Nombre d'input saisi
    nbrInputKata1++;

    //Injection des valeurs saisies dans un tableau
    tblInputs[i] = this.id;
    i++;
    console.log(tblInputs);

    //Dès que le bon nombre d'inputs est saisi...
    if (nbrInputKata1 === 3) {
      //On compare nos tableau
      var is_same = tblKata1.length == tblInputs.length && tblKata1.every(function(element, index) {
        return element === tblInputs[index];
      });
      console.log(is_same);
      if (is_same === true) {
        console.log("Bien joué le kata a été effectué à la perfection");
        kata2(tblInputs);
      } else {
        console.log("Dommage tu as fait une erreur, recommençons");
        kata1();
      }
    }
  });
}

//Fonction gérant le second kata
function kata2() {
  console.log("kata2");
}
