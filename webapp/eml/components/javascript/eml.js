
doResize = function() {
	var wh = $(window).height();
	var cdho = $('#header').height() + $('#footer').height();
	var cdhi = $('#eml-search-information').height() + $('#eml-pagination-container').height();
	var cwho = wh - cdho;
	var cwhi = wh - cdhi - cdho - 56;
	
	$('.autoresize-outer').css( 'height', cwho + 'px' );
	$('.autoresize-inner').css( 'height', cwhi + 'px' );
	
}

$(window).resize(doResize); 

$(document).ready(function() {

	doResize();

});