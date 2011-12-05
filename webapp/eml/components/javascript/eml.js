
doResize = function() {
	var wh = $(window).height();
	var cdho = $('#header').height() + $('#footer').height();
	var cdhi = $('#eml-search-information').height() + $('#eml-pagination-container').height() + $('#buffer').height() + $('#eml-tabs').height();
	var cwho = wh - cdho;
	
	var current = $("#eml-carousel .current");
	var cwhi = wh - cdhi - cdho - 56;
	if( current.length > 0 )
	{
		cwhi = cwhi + 22;
	}
	
	$('.autoresize-outer').css( 'height', cwho + 'px' );
	$('.autoresize-inner').css( 'height', cwhi + 'px' );
	
}


$(document).ready(function() {
	$('#eml-carousel').livequery(
			function()
			{
				var carouseldiv = $(this);
				var element = carouseldiv.jScrollPane();
				var api = element.data('jsp');

				$(element).bind('jsp-scroll-x', function(event,inoffset) 
						{
							var per = api.getPercentScrolledX();
							setCookie("carousel",inoffset, 1);
							setCookie("carouselper",per, 1);
						}
					);		
				var current = $("#eml-carousel .current");
				var entirething = $("#eml-carousel ul");
				var total = entirething.width();
				var viewport = carouseldiv.width() + 500; //div does not seem to have correct width added buffer

				
				var entirethingstart = entirething.offset().left;
				var current = $("#eml-carousel .current");
				var positionx = current.offset().left - entirethingstart;
				
				var percentage = positionx  / total;

				if( percentage < .2)
				{
					percentage = 0;
				}
				else if( percentage > .6)
				{
					percentage = 1;
				} 
				//This code took a many hours to get just right. Be careful!
				var windowofpercentage = (viewport/total) / 2;
				var oldpercent = getCookie('carouselper');
				if( oldpercent )
				{
					oldpercent = parseFloat(oldpercent);
				}
				var usenewvalue = false; //Give or take does it fit or not?
				if( percentage >  (oldpercent + windowofpercentage) )
				{
					//too far
					usenewvalue = true
				}
				if( percentage  <   (oldpercent -  windowofpercentage ) )
				{
					//too far
					usenewvalue = true
				}
				if( usenewvalue )
				{
					api.scrollToPercentX(percentage, false);					
				}
				else
				{
					var exact = getCookie('carousel');
					api.scrollToX(exact,false);
				}
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

	$(window).resize(doResize); 
	doResize();

	setTimeout("doResize()",200);


});


function setCookie(name,value,days) {
    if (days) {
        var date = new Date();
        date.setTime(date.getTime()+(days*24*60*60*1000));
        var expires = "; expires="+date.toGMTString();
    }
    else var expires = "";
    document.cookie = name+"="+value+expires+"; path=/";
}

function getCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for(var i=0;i < ca.length;i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
    }
    return null;
}

function deleteCookie(name) {
    setCookie(name,"",-1);
}
