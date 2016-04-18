$(document).ready(function () {

$('#signUp-form').validate({
    rules: {
        pseudo: {
            minlength: 2,
            required: true
        },
        email: {
            required: true,
            email: true
        },
        password: {
            minlength: 5,
            required: true
        },

        rePassword: {
            minlength: 5,
            required: true
        }
    },
    highlight: function (element) {
        $(element).closest('.control-group').removeClass('success').addClass('error');
    },
    success: function (element) {
        element.text('OK!').addClass('valid')
            .closest('.control-group').removeClass('error').addClass('success');
    }
});
});
