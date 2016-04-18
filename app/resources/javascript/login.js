$(document).ready(function() {


  $("#pseudo").focusout(function () {
    var pseudoValue = $(this).val();
    if ( pseudoValue.length < 3 ){
      $('#pseudoError').text('Votre pseudo doit faire au moins 3 caractères de long.');
    } else {
      $('#pseudoError').text('');
    }
  });

  $('.verif-email').focusout(function(){
    var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
    var emailblockReg = /^([\w-\.]+@(?!hotmail.fr)(?!hotmail.com)([\w-]+\.)+[\w-]{2,4})?$/;
    var emailaddressVal = $(this).val();

    if(emailaddressVal == '') {
      $('#emailError').text('Veuillez saisir le champs email.');
    } else if(!emailReg.test(emailaddressVal)) {
      $('#emailError').text('Votre adresse email n\'est pas valide.');
    } else {
      $('#emailError').text('');
    }
  });

  $("#password").focusout(function () {
    var pwValue = $(this).val();
    if ( pwValue.length < 6 ){
      $('#pwError').text('Votre mot de passe doit faire au moins 6 caractères de long.');
    } else {
      $('#pwError').text('');
    }
  });

  $("#rePassword").focusout(function () {

    var password = $("#password").val();
    var confirmPassword = $("#rePassword").val();

    if (password != confirmPassword) {
      //alert("Passwords do not match.");
      $('#rePwError').text('Vos mots de passe ne sont pas similaires.');
      return false;
    } else {
      $('#rePwError').text('');
      return true;
    }
  });

})
