function mainViewLoad() {
	//load flikr json feed in script tag
	var head_element = document.getElementsByTagName("head")[0];
	var newScript = document.createElement('script');
	newScript.type = 'text/javascript';
	newScript.src = 'http://api.flickr.com/services/feeds/photos_public.gne?tags=potato&format=json';
	head_element.appendChild(newScript);
}	

function jsonFlickrFeed (feed) {
	var feed_div = document.getElementById("feed");
	var feed_mainDiv = "";
	var feed_image = "";
	var feed_info = "";
	var feed_header = "";
	var feed_description = "";
	var feed_endDiv = "";
	var public_feed = "";
	var feed_socialMedia = "";
	for ( x = 0; x < feed.items.length; x++ ) {
		//GET image sizes
		imageB = feed.items[x].media.m.replace('_m', '_b');
		imageS = feed.items[x].media.m.replace('_m', '_s');
	
		// Add div elements
		feed_mainDiv = '<div class = "cell" >';
		feed_image = '<div class = "image" >' + '<a href="' + imageB + '">' + '<img ' + 'src = "' + feed.items[x].media["m"] + '"' + ' alt = "' + feed.items[x].title + '"' + '/>' + '</a>' + '</div>';
		feed_info = '<div class = "info" >';
		feed_header='<div class = "header" >' + '<h2 class = "ellipsis" >' + '<a href = "' + imageB + '">' + feed.items[x].title + '</a>' + '</h2>' + '</div>';
		var author_link = "http://www.flickr.com/" + feed.items[x].author_id;
		feed_description = '<div class = "description" >' + '<p><a href = "' + author_link + '" target = "_blank" >' + ' Photo Author ' + '</a></p>' + '<p> Published on: ' + feed.items[x].published + '</p><p><a href = "' + feed.items[x].link + '" target = "_blank" >' + 'View on Flikr' + '</p></a>' + '</div>';
		feed_socialMedia = '<div class = "socialMedia" ><div class="g-plusone" data-annotation="inline" data-width="300"></div>' + '</div>';
		
		//'<g:plusone size = "tall"></g:plusone>' + '<div class = "fb-share-button" data-href = "' + feed.items[x].link + '" data-type = "button_count" ></div></div>';		
		feed_endDiv = '</div>' + '</div>';
		public_feed += feed_mainDiv + feed_image + feed_info + feed_header + feed_description + feed_socialMedia + feed_endDiv;
	}
	feed_div.innerHTML = public_feed;
}

$(document).ready(function(){
	$('.image a').fancybox();
	$('.header a').fancybox();
})

	//google + plus button
(function() {
	var po = document.createElement('script'); po.type = 'text/javascript'; po.async = true;
	po.src = 'https://apis.google.com/js/platform.js';
	var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(po, s);
})();
