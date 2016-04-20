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
  $('#martialArtsBubble5').hide();
  $('.martialArtsBtn').hide();
  //$("#progressBar").hide();

  //Masquage des sprites
  $('#yuki_profil').hide();
  $('#yuki_poing').hide();
  $('#yuki_pied').hide();
  $('#yuki_saut').hide();
  $('#yuki_poingDeFeu').hide();
  $('#yuki_tombe').hide();



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

      $('#yuki_face').hide();
      $('#yuki_profil').show();

      kataGeneration(nbMove, lvl);

    }
  }

});



function kataGeneration(nbMove, lvl){

  var i = 0;//Index pour le kata aléatoire définir le kata
  var tblKata = [];//Premier kata préconfiguré
  var kataValidated = "true";
  lvl++;
  nbMove++;
  $( "#nbrKata" ).empty();
  $( "#retry" ).empty();
  $( "#nbrKata" ).append(lvl);

  //$( ".martialArtsBtn" ).addClass( "desactivatedBtn" );
  $(".martialArtsBtn").addClass("desactivatedBtn");
  //$(".desactivatedBtn").css("background", "grey");


  if (lvl!=5 && kataValidated === "true") {
    kataValidated = null;
    //Génération du kata aléatoire
    while (i<nbMove) {
      var aleatoireNbr = Math.round(Math.random()*3) + 1;
      if (aleatoireNbr === 1) {
        tblKata[i] = "btnPoing";
        i++;


        $('<div>').attr({
          class: 'kataASaisir kataASaisirPoing'
        }).appendTo("#kataASaisir");

        $('<img>').attr({
          src: 'img/punch.png'
        }).appendTo(".kataASaisirPoing");

      } else if (aleatoireNbr === 2) {
        tblKata[i] = "btnPied";
        i++;

        $('<div>').attr({
          class: 'kataASaisir kataASaisirPied'
        }).appendTo("#kataASaisir");

        $('<img>').attr({
          src: 'img/kick.png'
        }).appendTo(".kataASaisirPied");

      } else if (aleatoireNbr === 3) {
        tblKata[i] = "btnJump";
        i++;

        $('<div>').attr({
          class: 'kataASaisir kataASaisirJump'
        }).appendTo("#kataASaisir");

        $('<img>').attr({
          src: 'img/jump.png'
        }).appendTo(".kataASaisirJump");

      } else if (aleatoireNbr === 4) {
        tblKata[i] = "btnSpe";
        i++;

        $('<div>').attr({
          class: 'kataASaisir kataASaisirSpe'
        }).appendTo("#kataASaisir");

        $('<img>').attr({
          src: 'img/special.png'
        }).appendTo(".kataASaisirSpe");

      }
    }
    $("#progressBar").show();
    $(".kataASaisir").show().delay(4000).fadeOut();
    $("#martialArtsDialogue").show().delay(4000).fadeOut();
    $("#progressBar .progress").addClass("started");


    setTimeout(
      function()
      {
        //$("#progressBar").hide();
        validationKata(tblKata, lvl, nbMove);
        //do something special
      }, 4000);


      console.log(tblKata);
      i = 0;
      //tblKata = [];
      //lvl++;
      //nbMove++;
    }
  }

  function validationKata(tblKata, lvl, nbMove){
    var nbrInputKata = 0;
    var tblInputs=[];//Tableau stockant les inputs pour le kata
    var j = 0;//Index pour les inputs aléatoire définir le kata


    //$("#progressBar").hide();
    $("#progressBar .progress").removeClass("started").addClass("stopped");


    $(".martialArtsBtn").removeClass("desactivatedBtn");

    $( ".martialArtsBtn" ).removeClass( "desactivatedBtn" );


    //Détéction des inputs
    $('#btnPoing, #btnPied, #btnJump, #btnSpe').click(function () {

      var sprite = this.id;





      //Nombre d'input saisi
      nbrInputKata++;

      if (nbrInputKata < nbMove) {
        spriteAnimation(sprite);
      }


      //Injection des valeurs saisies dans un tableau
      tblInputs[j] = this.id;
      j++;

      //Dès que le bon nombre d'inputs est saisi...
      if (nbrInputKata === nbMove) {
        //On compare nos tableau
        var is_same = tblKata.length == tblInputs.length && tblKata.every(function(element, index) {
          return element === tblInputs[index];
        });
        console.log(is_same);
        if (is_same === true) {
          console.log("Bien joué le kata a été effectué à la perfection");
          $( ".kataASaisir" ).remove();
          spriteAnimation(sprite);

          if (lvl===4) {
            $('.discussionContainer').hide();
            alert("Bravo vous avez fini le mini jeu des arts martiaux.");
          } else if (lvl<4) {
            kataGeneration(nbMove, lvl);
          }


        } else {

          $('#yuki_profil').hide();
          $('#yuki_tombe').show();
          setTimeout(
            function()
            {
              //do something special
              $('#yuki_profil').show();
              $('#yuki_tombe').hide();
            }, 600);


            $("#progressBar .progress").removeClass("stopped").addClass("started");
            $("#progressBar").show();
            $( "#retry" ).empty("");
            $( "#retry" ).append("Dommage tu as fait une erreur. ");
            $( ".martialArtsBtn" ).addClass( "desactivatedBtn" );
            $(".kataASaisir").show().delay(4000).fadeOut();
            $("#martialArtsDialogue").show().delay(4000).fadeOut();
            $("#progressBar .progress").removeClass("stopped").addClass("started");
            setTimeout(
              function()
              {

                validationKata(tblKata, lvl, nbMove);
                $('#yuki_profil').show();
                //do something special
              }, 4000);
            }
          }
        });
      }

      function spriteAnimation(sprite) {


        if (sprite === "btnPoing") {
          //console.log(sprite);
          $('#yuki_profil').hide();
          $('#yuki_poing').show();
          setTimeout(
            function()
            {
              //do something special
              $('#yuki_profil').show();
              $('#yuki_poing').hide();
            }, 300);


          } else if (sprite === "btnPied") {
            $('#yuki_profil').hide();
            $('#yuki_pied').show();
            setTimeout(
              function()
              {
                //do something special
                $('#yuki_profil').show();
                $('#yuki_pied').hide();

              }, 300);

            } else if (sprite === "btnJump") {
              $('#yuki_profil').hide();
              $('#yuki_saut').show();
              setTimeout(
                function()
                {
                  //do something special
                  $('#yuki_profil').show();
                  $('#yuki_saut').hide();
                }, 300);

              } else if (sprite === "btnSpe") {
                $('#yuki_profil').hide();
                $('#yuki_poingDeFeu').show();
                setTimeout(
                  function()
                  {
                    //do something special
                    $('#yuki_profil').show();
                    $('#yuki_poingDeFeu').hide();
                  }, 600);

                }
              }
