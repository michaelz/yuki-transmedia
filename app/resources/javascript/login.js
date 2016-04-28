$(document).ready(function() {

  $('.round-info-button').hide();


  //var regUrl = '/api/auth/register';
  var regUrl = '/session/register';
  //var logUrl = '/api/auth';
  var logUrl = '/session/login';


  $('.loginPage').accordion({
    heightStyle: "content"
  });

  /**
  * Login
  */

  $("#loginBtn").on('click', function() {
    var transmit = {
      identifier: $("#identifier").val(),
      password: $("#pwd").val()
    };

    $.ajax({
      type: "POST",
      url: logUrl,
      data: transmit,
      success: function(data) {
        console.log(data);
        if (data.status == 'success') {
          window.location.replace('/');
        } else {
          $("#loginError").append(
            '<p class="error">Login/Mot de passe non-reconnu</p>'
          );
        }
      }
    });
  });

  /**
  * Register
  */



  // Defining status of each field
  var pseudoStatus = false;
  var emailStatus = false;
  var pwStatus = false;
  var repwStatus = false;

  $("#pseudo").focusout(function() {
    var pseudoValue = $(this).val();
    if (pseudoValue.length < 3) {
      $('#pseudoError').empty();
      $('#pseudoError').append(
        '<p class="error">Votre pseudo doit faire au moins 3 caractères de long.</p>'
      );
      pseudoStatus = false;
    } else {
      $('#pseudoError').empty();
      pseudoStatus = true;

    }
  });

  $('.verif-email').focusout(function() {
    var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
    var emailblockReg =
    /^([\w-\.]+@(?!hotmail.fr)(?!hotmail.com)([\w-]+\.)+[\w-]{2,4})?$/;
    var emailaddressVal = $(this).val();


    if (emailaddressVal.length == 0) {
      $('#emailError').empty();
      $('#emailError').append(
        '<p class="error">Veuillez saisir le champs email.</p>'
      );
      emailStatus = false;
    } else if (!emailReg.test(emailaddressVal)) {
      $('#emailError').empty();
      $('#emailError').append(
        '<p class="error">Votre adresse email n\'est pas valide.</p>'
      );
      emailStatus = false;
    } else {
      $('#emailError').empty();
      emailStatus = true;
    }
  });

  $("#password").focusout(function() {
    var pwValue = $(this).val();
    if (pwValue.length < 6) {
      $('#pwError').empty();
      $('#pwError').append(
        '<p class="error">Votre mot de passe doit faire au moins 6 caractères de long.</p>'
      );
      pwStatus = false;
    } else {
      $('#pwError').empty();
      pwStatus = true;
    }
  });

  $("#rePassword").focusout(function() {

    var password = $("#password").val();
    var confirmPassword = $("#rePassword").val();

    if (password != confirmPassword) {
      //alert("Passwords do not match.");
      $('#rePwError').empty();
      $('#rePwError').append(
        '<p class="error">Vos mots de passe ne sont pas similaires.</p>'
      );
      repwStatus = false;
      return false;
    } else {
      $('#rePwError').empty();
      repwStatus = true;
    }
  });

  /*
  * Check the inputs for the send button
  */
  var fieldsOk = false;
  $(".form-item input").focusout(function() {
    if (pseudoStatus && emailStatus && pwStatus &&
      repwStatus) {
        $('#signUpBtn').addClass('active');
        fieldsOk = true;

      } else {
        $('#signUpBtn').removeClass('active');
        fieldsOk = false;
      }
    });

    /*
    * Send register info on click
    */
    $('#signUpBtn').on('click', function() {
      var transmit = {};
      if (fieldsOk) {
        transmit = {
          username: $('#pseudo').val(),
          email: $('#email').val(),
          password: $('#password').val()
        };
        $.ajax({
          type: "POST",
          url: regUrl,
          data: transmit,
          success: function(data) {
            if (data.status == 'success') {
              window.location.replace(
                '/');
              } else {

                //$("#loginError").append(
                //'<p class="error">Problème</p>'
                //);
              }
            }
          });
        }
      });
    });
