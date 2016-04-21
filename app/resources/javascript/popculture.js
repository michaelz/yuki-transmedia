/*
 * POP CULTURE
 */

$( document ).ready(function() {
	for (var i = 1; i < 18; i++) {
		$(".menuAccessoires").append('<div class="drag" id="' + i + '"><img src="img/jeu_popculture/accessoires/item' + i +'.png" class="accessoire" /></div>');
	}

	$(".menuFonds").hide();

	$(".drag").draggable({ 
		containment: "#main"});

	$("#droppableContenu").droppable({
		drop: function(event, ui) {
	        var position = $("#" + ui.draggable[0].id).position();
	        $("#droppableContenu").append(ui.draggable[0]);
	        $("#" + ui.draggable[0].id).css({'position':'absolute', 'left': position.left + 'px', 'top': position.top + 'px' });       
		}
	});

	$("#droppableMenu").droppable({
		drop: function(event, ui) {
	        $("#droppableMenu").append(ui.draggable[0]);
	        $("#" + ui.draggable[0].id).css({'position':'relative', 'left': '', 'top':'' }); 
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
		if ($('.contenu').css("background-image") == 'url("http://' + $(location).attr('host') + '/img/jeu_popculture/fonds/arts-martiaux.png")') {
			$('.contenu').css("background-image", "");
		} else {
			$('.contenu').css("background-image", "url(/img/jeu_popculture/fonds/arts-martiaux.png)");
		}
	})

	$("#fondsImg2").click( function () {
		if ($('.contenu').css("background-image") == 'url("http://' + $(location).attr('host') + '/img/jeu_popculture/fonds/calligraphie.png")') {
			$('.contenu').css("background-image", "");
		} else {
			$('.contenu').css("background-image", "url(/img/jeu_popculture/fonds/calligraphie.png)");
		}
	})
	
});

function capture() {
	$("#photoBouton").hide();
	html2canvas($('.contenu'), {
	        onrendered: function(canvas) {
		 		$("#img").val(canvas.toDataURL("image/png"));
		 		var a = document.createElement('a');
		 		a.href = canvas.toDataURL("image/jpeg").replace("image/jpeg", "image/octet-stream");
		        a.download = 'somefilename.jpg';
		        a.click();
		        $("#photoBouton").show();
		 		document.getElementById("myForm").submit();
	}});
}