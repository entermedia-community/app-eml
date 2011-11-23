
doResize = function() {
	var wh = $(window).height();
	var cwh = wh - 79;
	
	$('#up').css( 'height', cwh + 'px' );
}

$(window).resize(doResize); 

$(document).ready(function() {

	doResize();

});