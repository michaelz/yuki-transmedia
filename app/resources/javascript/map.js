// TODO Appel aux webservices
$(document).ready(function() {
    $('.round-info-button').hide();

    var levels = [{
        code: 'martialarts',
        url: 'mondes/artsmartiaux',
        solved: true
    }, {
        code: 'calligraphy',
        url: 'mondes/calligraphie',
        solved: false

    }, {
        code: 'popculture',
        url: 'mondes/popculture',
        solved: true

    }, {
        code: 'food',
        url: 'mondes/nourriture',
        solved: true

    }]; // TODO: Replace with data from user (API)

    levels.forEach(function(data) {
        console.log(data.code);
        var item = $('.item-' + data.code);

        item.removeClass('disabled').append("<a href='/" + data
            .url + "'>" + item.val() + "</a>");
        $(".sign-" + data.code).show(); // TODO: Show only once Japan Impact begins
        if (data.solved) {
            $(".indice-" + data.code).show();
        }
    });
    var slideIndex = 1;
    showDivs(slideIndex);

    $(".plus-one").click(function() {
        slideIndex += 1;
        showDivs(slideIndex);
    });

    $(".minus-one").click(function() {
        slideIndex -= 1;
        showDivs(slideIndex);
    });


    function showDivs(n) {
        var i;
        var x = document.getElementsByClassName("mySlides");
        if (n > x.length) {
            slideIndex = 1
        }
        if (n < 1) {
            slideIndex = x.length
        };
        for (i = 0; i < x.length; i++) {
            x[i].style.display = "none";
        }
        x[slideIndex - 1].style.display = "block";
    }

    function validate() {

    }

    var slideIndex = 1;
    showDivs(slideIndex);

    $(".plus-one").click(function() {
        slideIndex += 1;
        showDivs(slideIndex);
    });

    $(".minus-one").click(function() {
        slideIndex -= 1;
        showDivs(slideIndex);
    });


    function showDivs(n) {
        var i;
        var x = document.getElementsByClassName("mySlides");
        if (n > x.length) {
            slideIndex = 1
        }
        if (n < 1) {
            slideIndex = x.length
        };
        for (i = 0; i < x.length; i++) {
            x[i].style.display = "none";
        }
        x[slideIndex - 1].style.display = "block";
    }

    function validate() {

    }

});
