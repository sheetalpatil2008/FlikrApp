
function mainViewLoad() {
	//load flikr json feed in script tag
	var head_element = document.getElementsByTagName("head")[0];
	var newScript = document.createElement('script');
	newScript.type = 'text/javascript';
	newScript.src = 'http://api.flickr.com/services/feeds/photos_public.gne?tags=potato&format=json';
	newScript.id = 'script_feed';
	head_element.appendChild(newScript);
}

function jsonFlickrFeed(feed) {
	var MainContainer = document.getElementById("feed");
	var row = "";
	var feed_image = "";
	var feed_info = "";
	var feed_header = "";
	var feed_description = "";
	var feed_divEnd = "";
	var public_feed = "";
	// Add div elements
	var container = '<div class=' + '"container">' + '<h1>Public Flikr Feed</h1>' + '<div class = "table">';
	for ( x = 0; x < feed.items.length; x++ ) {
		
		row = '<div class="row">';
		feed_image = '<div class="image">' + '<a href="#"' + 'onclick = "javascript: SecondFame(' + x +')">' + '<img ' + 'src = "' + feed.items[x].media["m"] + '"' + ' alt = "' + feed.items[x].title + '"' + '/>' + '</a>' + '</div>';
		feed_info='<div class = "info" >';
		feed_header='<div class = "header" >' + '<h2 class = "ellipsis" >' + '<a href = "#"' + 'onclick = "javascript: SecondFame(' + x +')">' + feed.items[x].title + '</a>' + '</h2>'+ '</div>';
		
		var author_link = "http://www.flickr.com/" + feed.items[x].author_id;
		feed_description = '<div class = "description" >' + '<p>' + 'Published on: ' + feed.items[x].published + '</p>' + '<p><a href = "'+ author_link +'" target = "_blank">'+'Photo Author'  + '</a>' + '<span class = "margin" >' + '</span>' + '<a href = "'+feed.items[x].link+'" target = "_blank">' + 'View on Flikr' + '</p>' + '</div>';
		feed_divEnd = '</div>' + '</div>';
		public_feed += row + feed_image + feed_info +	 feed_header + feed_description + feed_divEnd;
	}
	var divEnd2 = '</div></div>';
	var final_div = container + public_feed + divEnd2;
	MainContainer.innerHTML = final_div;
}

function SecondFame(x){
	var flickerAPI = "http://api.flickr.com/services/feeds/photos_public.gne?jsoncallback=?";
	//Ajax call for feed
	$.getJSON( flickerAPI, {
		tags: "potato",
		tagmode: "all",
		format: "json"
	})
	.done(function( data ) {
		
		//GET image sizes
		imageB = data.items[x].media.m.replace('_m', '_b');
		imageS = data.items[x].media.m.replace('_m', '_s');
		//console.log(imageB);
		
		//add div elements
		$('.table').css( "display","none" );
		$('.container').append('<input type = "button"' + 'value = "Back" class = "button"' + 'onClick = "document.location.reload(true) ">');
		
		var innerContainer =  '<div class = "innerContainer" >';
		var feed_header = '<h2>' + '<a href = "' + data.items[x].link + '" target = "_blank" >' + data.items[x].title + '</a>' + '</h2>'
		var author_link = "http://www.flickr.com/" + data.items[x].author_id;
		var feed_publish = '<div class = "info">' + '<p> <a href = "' + author_link + '" target = "_blank" >' + 'Photo Author' + '</a></p>' + '<p>|</p>' + '<p> Published on: ' + data.items[x].published + '</p>' + '</div>';
		var feed_image =  '<div class = "image" >' + '<a href = "' + data.items[x].link + '" target = "_blank" >' + '<img ' + 'src = "' +imageB + '"' + ' alt = "' + data.items[x].title + '"' + '/>' + '</a>' + '</div>';
		var feed_description = '<div class = "description">' + data.items[x].description + '</div>';
		
		//Get tags from feed in array
		feed_descriptionArr = new String();
		feed_descriptionArr = data.items[x].tags;
		
		var arrstr = feed_descriptionArr.split(" ");
		var feed_descriptionTag = "";
		var tag = '<ul class = "tags" > tags: <a href = " # " >';
		for ( var i = 0; i < arrstr.length; i++ )
		{
			var feed_descriptionTag = feed_descriptionTag + '<li ><a href = "' + imageB + '" target = "_blank"> ' + arrstr[i]  +  '</a></li>';
		}
				
		var end_tags = '</a></ul>';
		var feed_tag = tag + feed_descriptionTag + end_tags;
		var final_feed = innerContainer + feed_header + feed_publish + feed_image + feed_description + feed_tag;	
		$('#feed').append(final_feed);
	});
}