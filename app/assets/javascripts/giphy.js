if ( $('body').is('#make2') || $('body').is('#make.signed-in:not(.app)')  || $('body').is('#newmake:not(.app)') ) {
    var gifArray = ['lol', 'wtf', 'crying', "that's racist", 'laughing', 'mind blown', 'brah', "that's a penis", 'screaming', 'happy', 'hell no', 'damn it', 'me gusta', 'triggered', 'bitch what']


    function debounce(func, wait, immediate) {
	var timeout;
	return function() {
		var context = this, args = arguments;
		var later = function() {
			timeout = null;
			if (!immediate) func.apply(context, args);
		};
		var callNow = immediate && !timeout;
		clearTimeout(timeout);
		timeout = setTimeout(later, wait);
		if (callNow) func.apply(context, args);
	};
};

function displayLoader(value) {
   if(value) {
     loader.style.display = "block";
   } else {
     loader.style.display = "none";
   }
}

function displayMessage(message = "", value = false) {
    if(value) {
     messageOutput.textContent = message;
     messageOutput.style.display = "block";
   } else {
     messageOutput.textContent = message;
     messageOutput.style.display = "none";
   }
}

function encodeInputValue(value) {
  return value.replace(/ /g, "+");
}

function handleErrors(response) {
  if(!response.ok) {
    displayMessage("Request failed: " + response.statusText, true);
  }
  return response;
}

function parseJSON(response) {
  return response.json();
}

function createVideoTag(srcStill,src, id) {
   //var video = document.createElement("img");
   //video.setAttribute("data-giphy-id", id);
   //video.setAttribute("class", "remote-gif");
   //video.src = src;
   var video = document.createElement('div')
   video.setAttribute("data-giphy-id", id);
   video.setAttribute("data-src", src);
   video.setAttribute("class", "gif-container remote-gif");
   video.style.backgroundImage = 'url(' + srcStill + ')'

   var videoS = document.createElement('div')
   videoS.setAttribute("data-giphy-id", id);
   videoS.setAttribute("data-original", src);
   videoS.setAttribute("class", "remote-gif-overlay");
   //videoS.style.backgroundImage = 'url(' + src + ')'
   $('.remote-gif-overlay').lazyload();
   //video.appendChild(videoS)
   //REMOVED

   return video;
}

function insertVideoTag(video) {
  target.appendChild(video);
}

function deleteVideos() {
  target.innerHTML = '';
}

function getGifs(videos) {
  if(videos.data.length == 0) {

    displayMessage("No gifs found", true);
  }
  else {
      $('#gifs').fadeIn(100);
  }
  for(var gif in videos.data) {
      let video = createVideoTag(videos.data[gif].images.fixed_width_still.url ,videos.data[gif].images.fixed_width.url, videos.data[gif].id);

      insertVideoTag(video);
      var ccontainer = $('#gifs');
			/*ccontainer.imagesLoaded(function() {
				ccontainer.masonry({
					itemSelector: 'img'
				});
			});*/
    }
}

function loadGifs(url, type) {
  fetch(url).then(handleErrors).then(parseJSON).then(function(videos) {
    if(type === "search") {
        getGifs(videos);
    } else if(type === "random") {
        getRandomGifs(videos)
    }
    displayLoader(false);
    var ccontainer = $('#gifs');
			/*ccontainer.imagesLoaded(function() {
				ccontainer.masonry({
					itemSelector: 'img'
				});
			});*/
  }).catch(function(error) {
    displayLoader(false);
    displayMessage("Request failed: " + error, true);
  });
}

function initSearch(api_key, value, type) {
  let url;
  deleteVideos();
  displayLoader(true);
  displayMessage(false);
  if(type === "search") {
    url = "https://api.giphy.com/v1/gifs/" + type + "?q=" + encodeInputValue(value) + "&api_key=" + api_key;
    loadGifs(url, type);
  } else if(type === "random") {
    url = "https://api.giphy.com/v1/gifs/" + type + "?tag=" + encodeInputValue(value) + "&api_key=" + api_key;
    loadGifs(url, type);
  }
}



var searchTerm = document.getElementById("searchTerm");
var target = document.getElementById("gifs");
var loader = document.getElementById("loader");
var messageOutput = document.getElementById("unlock-feed");


    searchTerm.addEventListener("input", debounce(function() {
  initSearch("dc6zaTOxFJmzC", searchTerm.value, "search")
}, 500));



var randomGif = gifArray[(Math.floor(Math.random() * 10) + 1)]

  //initSearch("dc6zaTOxFJmzC", randomGif , "search")
  //$('#searchTerm').attr('placeholder', randomGif)


}
