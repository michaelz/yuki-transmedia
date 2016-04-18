$.getJSON( "/api/quiz", function( data ) {
    console.log(data[0]);
    $(".question").append(data[0].question);
    $.each(data[0].answers, function(a,answer){
        console.log(answer);
        $(".choices").append("<li class='"+a+"'>"+answer.text+"</li>");

    });
    $( ".choices li" ).click(function() {
        var pos = $(this).attr("class");
        console.log(pos);
    });

});