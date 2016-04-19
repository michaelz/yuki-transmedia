$(document).ready(function() {

$('.loginPage').accordion({
    heightStyle: "content"
});

  $("#pseudo").focusout(function () {
    var pseudoValue = $(this).val();
    if ( pseudoValue.length < 3 ){
        $('#pseudoError').empty();
        console.log(pseudoValue);
      $('#pseudoError').append('<p class="error">Votre pseudo doit faire au moins 3 caractères de long.</p>');
    } else {
      $('#pseudoError').empty();
    }
  });

  $('.verif-email').focusout(function(){
    var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
    var emailblockReg = /^([\w-\.]+@(?!hotmail.fr)(?!hotmail.com)([\w-]+\.)+[\w-]{2,4})?$/;
    var emailaddressVal = $(this).val();


    if(emailaddressVal == '') {
      $('#emailError').empty();
      $('#emailError').append('<p class="error">Veuillez saisir le champs email.</p>');
    } else if(!emailReg.test(emailaddressVal)) {
      $('#emailError').empty();
      $('#emailError').append('<p class="error">Votre adresse email n\'est pas valide.</p>');
    } else {
      $('#emailError').empty();
    }
  });

  $("#password").focusout(function () {
    var pwValue = $(this).val();
    if ( pwValue.length < 6 ){
        $('#pwError').empty();
      $('#pwError').append('<p class="error">Votre mot de passe doit faire au moins 6 caractères de long.</p>');
    } else {
      $('#pwError').empty();
    }
  });

  $("#rePassword").focusout(function () {

    var password = $("#password").val();
    var confirmPassword = $("#rePassword").val();

    if (password != confirmPassword) {
      //alert("Passwords do not match.");
      $('#rePwError').empty();
      $('#rePwError').append('<p class="error">Vos mots de passe ne sont pas similaires.</p>');
      return false;
    } else {
      $('#rePwError').empty();
      return true;
    }
  });

})
