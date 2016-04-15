$(document).ready(function () {

  //Définition des variables
  ///////////////////////////////////////////////////////////////
  var intro = 0;
  var lvl = 0;
  var nbMove = 2;

  //Masquage des éléments
  $('#martialArtsBubble2').hide();
  $('#martialArtsBubble3').hide();
  $('#martialArtsBubble4').hide();
  $('.martialArtsBtn').hide();


  //detection du clic sur suivant
  $(".martialArtsNextBtn").on('click', introCount);


  //Fonction liée au dialogue
  ///////////////////////////////////////////////////////////////
  function introCount() {
    //Incrémentation de la variable au clic sur le bouton suivant
    intro++;
    //Masquage/affichage de ligne de dialogue en fonction de l'avancement du script
    if (intro === 1) {
      $('#martialArtsBubble1').hide();
      $('#martialArtsBubble2').show();
    }

    if (intro === 2) {
      $('#martialArtsBubble2').hide();
      $('#martialArtsBubble3').show();
    }
    //Dernière ligne de dialogue, dès que suivant on lance une fonction...
    if (intro === 3) {
      //Masquage du sript et du bouton next
      $('#martialArtsBubble3').hide();
      $('.martialArtsNextBtn').hide();
      //Affichage des inputs du jeu
      $('.martialArtsBtn').show();
      $('#martialArtsBubble4').show();
      //...On lance la fonction gérant les katas
      kataGeneration(nbMove, lvl);
    }
  }

});

function kataGeneration(nbMove, lvl){

  var i = 0;//Index pour le kata aléatoire définir le kata
  var tblKata = [];//Premier kata préconfiguré
  var yolo = "true";
  lvl++;
  nbMove++;
  $( "#nbrKata" ).empty();
  $( "#nbrKata" ).append(lvl);

  if (lvl<5 && yolo === "true") {
    yolo = null;
    //Génération du kata aléatoire
    while (i<nbMove) {
      var aleatoireNbr = Math.round(Math.random()*3) + 1;
      if (aleatoireNbr === 1) {
        tblKata[i] = "btnPoing";
        i++;
      } else if (aleatoireNbr === 2) {
        tblKata[i] = "btnPied";
        i++;
      } else if (aleatoireNbr === 3) {
        tblKata[i] = "btnJump";
        i++;
      } else if (aleatoireNbr === 4) {
        tblKata[i] = "btnSpe";
        i++;
      }
    }
    validationKata(tblKata, lvl, nbMove);
    console.log(tblKata);
    i = 0;
    //tblKata = [];
    //lvl++;
    //nbMove++;
  }
};

function validationKata(tblKata, lvl, nbMove){
  var nbrInputKata = 0;
  var tblInputs=[];//Tableau stockant les inputs pour le kata
  var j = 0;//Index pour les inputs aléatoire définir le kata

  //Détéction des inputs
  $('#btnPoing, #btnPied, #btnJump, #btnSpe').click(function () {

    //Nombre d'input saisi
    nbrInputKata++;

    //Injection des valeurs saisies dans un tableau
    tblInputs[j] = this.id;
    j++;
    //console.log(tblInputs);

    //Dès que le bon nombre d'inputs est saisi...
    if (nbrInputKata === nbMove) {
      //On compare nos tableau
      var is_same = tblKata.length == tblInputs.length && tblKata.every(function(element, index) {
        return element === tblInputs[index];
      });
      console.log(is_same);
      if (is_same === true) {
        console.log("Bien joué le kata a été effectué à la perfection");
        kataGeneration(nbMove, lvl);
      } else {
        console.log("Dommage tu as fait une erreur, recommençons");
        validationKata(tblKata, lvl, nbMove);
      }
    }
  });
}
