/*
 * POP CULTURE
 */
 
$(".menuFonds").hide();

$(".drag").draggable({ 
	containment: "#main"});

$("#droppableContenu").droppable({
	drop: function(event, ui) {
        var position = $("#" + ui.draggable[0].id).position();
        console.log($("#droppableContenu").height());
        $("#droppableContenu").append(ui.draggable[0]);
        console.log(position);
        console.log($("#droppableContenu").height());
        console.log($("#" + ui.draggable[0].id).height() * 0.5);
        console.log();
        $("#" + ui.draggable[0].id).css({'position':'absolute', 'left': position.left + 'px', 'top': position.top + 'px' });       
	}
});

$("#droppableMenu").droppable({
	drop: function(event, ui) {
        $("#droppableMenu").append(ui.draggable[0]);
    }
});

$(".btnAccessoires").click( function () {
	$(".menuAccessoires").show();
	$(".menuFonds").hide();
})

$(".btnFonds").click( function () {
	$(".menuAccessoires").hide();
	$(".menuFonds").show();
})


$("#fondsImg1").click( function () {
	if ($('.contenu').css("background-image") == 'url("http://' + $(location).attr('host') + '/img/png1.jpg")') {
		$('.contenu').css("background-image", "");
	} else {
		$('.contenu').css("background-image", "url(/img/png1.jpg)");
	}
})

$("#fondsImg2").click( function () {
	if ($('.contenu').css("background-image") == 'url("http://' + $(location).attr('host') + '/img/3.jpg")') {
		$('.contenu').css("background-image", "");
	} else {
		$('.contenu').css("background-image", "url(/img/3.jpg)");
	}
})

$("#boutton").click( function () {
	html2canvas( $('.contenu'), {
	        onrendered: function(canvas) {
	 		var a = document.createElement('a');
	        // toDataURL defaults to png, so we need to request a jpeg, then convert for file download.
	        a.href = canvas.toDataURL("image/jpeg").replace("image/jpeg", "image/octet-stream");
	        a.download = 'somefilename.jpg';
	        a.click();
	}});
})