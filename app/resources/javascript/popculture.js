/*
 * POP CULTURE
 */
 
$(".menuFonds").hide();

$(".drag").draggable({ containment: "#main", scroll: false });

$(".btnAccessoires").click( function () {
	$(".menuAccessoires").show();
	$(".menuFonds").hide();
})

$(".btnFonds").click( function () {
	$(".menuAccessoires").hide();
	$(".menuFonds").show();
})

$("#fondsImg1").click( function () {
	$('#contenu').css("background-image", "url(/img/png1.jpg)");
})

$("#fondsImg2").click( function () {
	$('#contenu').css("background-image", "url(/img/3.jpg)");
})