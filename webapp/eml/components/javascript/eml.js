
doResize = function() {
	var wh = $(window).height();
	var cdho = $('#header').height() + $('#footer').height();
	var cdhi = $('#eml-search-information').height() + $('#eml-pagination-container').height() + $('#buffer').height() + $('#eml-tabs').height();
	var cwho = wh - cdho;
	var cwhi = wh - cdhi - cdho - 56;
	
	$('.autoresize-outer').css( 'height', cwho + 'px' );
	$('.autoresize-inner').css( 'height', cwhi + 'px' );
	
}

$(window).resize(doResize); 

$(document).ready(function() {

	doResize();
	
	$('#eml-carousel').livequery(
			function()
			{
				jQuery(this).jScrollPane();
			}
		);
	
	$("#savedquerylist a").click(function(e)
					{
						e.preventDefault();
						var a = jQuery(this);
						var link = a.attr("href");
						
						jQuery.get(link, {}, function(data) 
								{
									var toreplace = jQuery("#searcheditor");
									toreplace.html(data);
									
									var tmp = jQuery("#savedquerylist #newterm");
									tmp.remove();
									var top = a.position().top;
									top = top + a.height() + 40;
									jQuery("#eml-green-dialog").css("top",top);
									
									jQuery("#arrow").show();
									var padleft = a.position().left;
									padleft = padleft + a.width() / 2;
									padleft = padleft  - 42; //arrow width
									jQuery("#arrow").css("left",padleft);
								}
						);
						return false;
					}
			);
	
	$("#addterm").click(function(e)
			{
				e.preventDefault();
				var a = jQuery(this);
				var link = a.attr("href");
				
				jQuery.get(link, {}, function(data) 
						{
							var toreplace = jQuery("#searcheditor");
							toreplace.html(data);
							
							jQuery("#savedquerylist span").append('<span id="newterm">new term</span>');
							var a = jQuery("#savedquerylist #newterm");
							var top = a.position().top;
							top = top + a.height() + 40;
							jQuery("#eml-green-dialog").css("top",top);
							
							jQuery("#arrow").show();
							var padleft = a.position().left;
							padleft = padleft + a.width() / 2;
							padleft = padleft  - 42; //arrow width
							jQuery("#arrow").css("left",padleft);
						}
				);
				return false;
			}
	);

	

});