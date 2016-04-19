/*
 * POP CULTURE
 */
 
$(".menuFonds").hide();

$(".drag").draggable({ 
	containment: "#main", 
	scroll: false});

$(".btnAccessoires").click( function () {
	$(".menuAccessoires").show();
	$(".menuFonds").hide();
})

$(".btnFonds").click( function () {
	$(".menuAccessoires").hide();
	$(".menuFonds").show();
})


$("#fondsImg1").click( function () {
	if ($('#contenu').css("background-image") == 'url("http://' + $(location).attr('host') + '/img/png1.jpg")') {
		$('#contenu').css("background-image", "");
	} else {
		$('#contenu').css("background-image", "url(/img/png1.jpg)");
	}
})

$("#fondsImg2").click( function () {
	if ($('#contenu').css("background-image") == 'url("http://' + $(location).attr('host') + '/img/3.jpg")') {
		$('#contenu').css("background-image", "");
	} else {
		$('#contenu').css("background-image", "url(/img/3.jpg)");
	}
})