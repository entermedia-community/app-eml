
doResize = function() {
	var wh = $(window).height();
	var cdho = $('#header').height() + $('#footer').height();
	var cdhi = $('#eml-search-information').height() + $('#eml-pagination-container').height() + $('#buffer').height() + $('#eml-tabs').height();
	var cwho = wh - cdho;
	//alert( cdhi);
	var current = $("#eml-carousel");
	var cwhi = wh - cdhi - cdho - 56;
	if( current.length > 0 )
	{
		cwhi = cwhi + 22;
	}
	
	$('.autoresize-outer').css( 'height', cwho + 'px' );
	$('.autoresize-inner').css( 'height', cwhi + 'px' );
	
}


$(document).ready(function() 
{
	
	emlcomponents();

	$(window).resize(doResize); 

	doResize();

	setTimeout("doResize()",200);

	//setTimeout("doResize()",1000);
	

});

emlcomponents = function()
{
	$('#eml-carousel.autoscroll').livequery(
		function()
		{
			var carouseldiv = $(this);

//			var count = carouseldiv.attr("total");
//			count = parseInt(count);
			//var totalw = count * ( $("#eml-carousel ul li" ).width()  + 38 );
			//totalw = totalw + count*38;

			var entirething = $("#eml-carousel #eml-viewport");
//			if( totalw < carouseldiv.width() ) //we will have a scroll bar
//			{
//
//				entirething.css("height","98px");
//				carouseldiv.css("height","98px");
//				doResize();
//				return;
//				
//			}

//			entirething.css("height","120px");
//			carouseldiv.css("height","120px");

			//$("#eml-carousel ul").css("width",totalw + "px");
			
			var element = entirething.jScrollPane();
			var api = element.data('jsp');

			$(element).bind('jsp-scroll-x', function(event,inoffset) 
					{
						var per = api.getPercentScrolledX();
						setCookie("carousel",inoffset, 1);
						setCookie("carouselper",per, 1);
					}
				);		

			
			var current = $("#eml-carousel .current");
			if( current.length > 0)
			{
				
				var total = entirething.width();
				var viewport = carouseldiv.width() + 500; //div does not seem to have correct width added buffer
	
				
				var entirethingstart = entirething.offset().left;
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

}

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
