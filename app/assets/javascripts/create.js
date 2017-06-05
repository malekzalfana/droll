$(document).on('ready page:load',function(){
	$(".post-image-wrapper").swipe( {
    //Generic swipe handler for all directions
    swipeLeft:function(event, direction, distance, duration, fingerCount, fingerData) {
      if ( $('body').hasClass('shown-post') ) {
          $('#next-post-icon').click()
      }
    },
    swipeRight:function(event, direction, distance, duration, fingerCount, fingerData) {
    	if ( $('body').hasClass('shown-post') ) {
          $('#prev-post-icon').click()
      }
    }
  });
 if (  document.getElementById('meme-canvas') ){
 	var memeCanvas = document.getElementById('meme-canvas');
var memeCtx = memeCanvas.getContext('2d');
memeCtx.scale(2,2);
memeCtx.font = '19px Impactt';
memeCtx.fillStyle = 'silver';


 }

$("img.meme-pics").slice(0,40).lazyload({
	event: 'loadEmBoys',
	//effect : "fadeIn",
	threshold: 100,

});
$("img.meme-pics").slice(40,184).lazyload({
    //effect : "fadeIn",
    container: $("#memescontainer"),
	threshold: 100,
	event: 'scrollstop'

});
/*
var a = [];
for (i=0;i<=250;i++) {
	console.log(i)
	a.push( i + "meme" )
	console.log(a)
}
*/
if ( $("body").attr('data-memenumber') > -1 ) {
	memeCtx.fillText('wait for it',180,200);
	$(memeCanvas).css({'width':window.innerWidth });
}
else {
	memeCtx.fillText('Choose a meme',180,200);
}

setTimeout(function(){
	console.log('mn')
if ( $("body").attr('data-memenumber') > -1 ) {
	console.log('mn')
//function (memenumber) {
	//alert( $("body").attr('data-memenumber') )
	var MemeBackground = "http://www.bestofinsta.com/drolle/newmemes2/meme"+ $("body").attr('data-memenumber') +".png"
	var thisImage = document.createElement('img');
	thisImage.crossOrigin = "";
	thisImage.src = MemeBackground

	thisImage.onload = function(){
		console.log('mn')
	$(this).remove();
	if ( $(window).width() < 590 ) {
		$(thisImage).css({'width': $('#memes-content').width() });
		console.log( $(window).width() )
	}
	else {
		$(thisImage).css({'width':'550px'});
	}
	console.log($(thisImage).width());
	memeCanvas.width = 1100;
	memeCanvas.height = thisImage.height * (1100/thisImage.width);
	console.log(1111)
	console.log(thisImage.height + 'height')
	console.log(thisImage.width + 'width')
	$(memeCanvas).attr('crossorigin', '')
	//$(memeCanvas).css({'height':memeCanvas.height / (memeCanvas.width/$(memeCanvas).width()) });
	//$(memeCanvas).css({'height':$(memeCanvas).attr('height') / 2 });
	$(memeCanvas).css({'height':    ($(memeCanvas).attr('height') * $(memeCanvas).width() )/ $(memeCanvas).attr('width')    });
	$('#meme-wrapper').css({'height':memeCanvas.height / 2});
	$('#pick-meme').hide();
	$('#left-arrow').fadeIn();
	$('.middle-column').show();
	$('#memescontainer').removeClass('clicked');
	memeCtx.drawImage(thisImage,0,0,1100,thisImage.height * (1100/thisImage.width));console.log( memeCtx.getImageData(0,0,memeCanvas.width,memeCanvas.height) )
	$('#add-button').hide();
	var memeHeight = thisImage.height * (1100/thisImage.width);


		CanvasRenderingContext2D.prototype.wrapText = function (text, x, y, maxWidth, lineHeight) {

    var lines = text.split("\n");

    for (var i = 0; i < lines.length; i++) {

        var words = lines[i].split(' ');
        var line = '';

        for (var n = 0; n < words.length; n++) {
            var testLine = line + words[n] + ' ';
			//console.log(testLine)

            var metrics = this.measureText(testLine);
			//console.log(metrics+'= metric')
            var testWidth = metrics.width;
            if (testWidth > maxWidth && n > 0) {
				this.fillText(line, x, y );
					this.lineWidth = 3;
					this.strokeText(line, x, y );
					//this.strokeText(line, x, y );
					this.shadowColor="black";
					this.shadowBlur=3;
					this.fillText(line, x, y );
					line = words[n] + ' ';
					y += lineHeight;
					console.log(y + 'is it equal to =?' + Number(Yposition  + lineHeight + lineHeight + newNumber));
            } else {
                line = testLine;
            }
        }
		this.fillText(line, x, y );
		this.lineWidth = 3;
		//this.strokeText(line, x, y );
		this.strokeText(line, x, y );
        this.shadowColor="black";
		this.shadowBlur=3;
		this.fillText(line, x, y );
		y += lineHeight;
    }
};
var newNumber = 0;
	var Yposition = memeCanvas.height - 50;

	CanvasRenderingContext2D.prototype.wrapTextBottom = function (text, x, y, maxWidth, lineHeight) {

    var lines = text.split("\n");

    for (var i = 0; i < lines.length; i++) {
		//console.log('i = '+i)
        var words = lines[i].split(' ');
		//console.log(words +"+"+ lines);
        var line = '';



        for (var n = 0; n < words.length; n++) {
			//console.log('n = '+n)
            var testLine = line + words[n] + ' ';
            var metrics = this.measureText(testLine);
            var testWidth = metrics.width;

            if (testWidth > maxWidth && n >  0) {
					this.fillText(line, x, y );
					this.lineWidth = 3;
					this.strokeText(line, x, y );
					this.strokeText(line, x, y );
					this.shadowColor="black";
					this.shadowBlur=3;
					this.fillText(line, x, y );
					line = words[n] + ' ';
					y += lineHeight;
					console.log(y + 'is it equal to =?' + Number(Yposition  + lineHeight + lineHeight + newNumber));
					//newNumber = -160
					//alert('zxZX')
            }
			else {
                line = testLine;
            }
        }
		//console.log(newNumber)
		this.fillText(line, x, y );
		this.lineWidth = 3;
		this.strokeText(line, x, y );
		this.strokeText(line, x, y );
        this.shadowColor="black";
		this.shadowBlur=3;
		this.fillText(line, x, y );

		//console.log(  memeCanvas.height - y);
		//console.log('y=' + y)
		//Yposition = lineHeight -70 + memeCanvas.height - 90;
		//console.log(lineHeight)
		//console.log('yposition = '+Yposition)
		//console.log(y + '=?' + Number(Yposition  + lineHeight +80 + newNumber))
		//console.log('y = '+y)
		//console.log('newNumber = '+newNumber)
		if ( y == Number(Yposition +lineHeight + newNumber) ) {
			newNumber = -80;
			//alert('second?')
		}
		else if ( y == Number(Yposition + 2 * lineHeight + newNumber) ) {
			newNumber = -160;
			//alert('third?')
		}
		else if ( y == Number(Yposition  + newNumber) ) {
			newNumber =0;
		}
		else if ( y == Number(Yposition + 3 * lineHeight + newNumber) ) {
			newNumber =-240;
		}
		else if ( y == Number(Yposition + 4 * lineHeight + newNumber) ) {
			newNumber =-320;
		}
		y += lineHeight;
    }
};


//ctx.textBaseline = "top";
//ctx.wrapText("Hello World!Let's stop taking line breaks for granted.Let's thank the inventors of line breaks for all they went through.",20,20,160,16);




	$('#text-top').click(function(){
		if ( $(window).width() >920 ) {
			$("html, body").animate({ scrollTop: 60 });
		}
		$(this).keyup(function(e){
			if ( e.keyCode != 37 && e.keyCode != 38 && e.keyCode != 39 && e.keyCode != 40 ) {
				var prevMeme = memeCtx.getImageData(0,0,memeCanvas.width,memeCanvas.height);
				memeCtx.clearRect(0,0,memeCanvas.width,memeCanvas.height);
				memeCtx.shadowColor = "transparent";
				memeCtx.drawImage(thisImage,0,0,1100,thisImage.height * (1100/thisImage.width));
				//memeCanvas.height = thisImage.height * (1200/thisImage.width);
				//memeCanvas.style.height = ((thisImage.height * (600/thisImage.width)) / 2) ;
				memeCtx.fillStyle = 'white';
				memeCtx.strokeStyle = 'black';
				memeCtx.lineWidth = 3;
				var fontSize = 72 ;
				memeCtx.font = fontSize + 'px Impactt';
				memeCtx.textAlign="center";
				memeCtx.shadowColor = "transparent";
				memeCtx.save();
				memeCtx.shadowColor="black";
				//memeCtx.shadowBlur=1;
				memeCtx.textBaseline = "center";
				memeCtx.wrapText(document.getElementById('text-top').value.toUpperCase(),550,100,1100,70);
				memeCtx.wrapTextBottom(document.getElementById('text-bottom').value.toUpperCase(), 550, Yposition +newNumber, 1100,80);
			}

		})
	});

	$('#text-bottom').click(function(){

		if ( $(window).width() >920 ) {
			$("html, body").animate({ scrollTop: $(document).height()-$(window).height() });
		}
	});

	$('#text-bottom').keyup(function writeDown(e){
		if ( e.keyCode != 37 && e.keyCode != 38 && e.keyCode != 39 && e.keyCode != 40 ) {
			var prevMeme = memeCtx.getImageData(0,0,memeCanvas.width,memeCanvas.height);
			memeCtx.clearRect(0,0,memeCanvas.width,memeCanvas.height);
			memeCtx.shadowColor = "transparent";
			memeCtx.drawImage(thisImage,0,0,1100,thisImage.height * (1100/thisImage.width));
			//memeCtx.textBaseline = "top";

			memeCtx.fillStyle = 'white';
			memeCtx.strokeStyle = 'black';
			memeCtx.lineWidth = 3;
			var fontSize = 72 ;
			memeCtx.font = fontSize + 'px Impactt';
			memeCtx.textAlign="center";
			memeCtx.shadowColor = "transparent";
			memeCtx.save();
			memeCtx.shadowColor="black";
			//memeCtx.shadowBlur=1;
			memeCtx.wrapText(document.getElementById('text-top').value.toUpperCase(),550,100,1100,70);
			memeCtx.textBaseline = "center";
			memeCtx.wrapTextBottom(document.getElementById('text-bottom').value.toUpperCase(), 550, Yposition +newNumber, 1100,80);
		}
		})
	};



}
}, 1000)























$(document).on('click', '.pick-meme-container',function(){
//$('.pick-meme-container').onclick(function()
	//alert('llll')
	if (!$(event.target).is('.delete-stock')){
	var MemeBackground = $(this).css('background-image').replace('url("','').replace('")','');
	var thisImage = document.createElement('img');
	thisImage.crossOrigin = "";
	thisImage.src = MemeBackground

	thisImage.onload = function(){
	$(this).remove();
	if ( $(window).width() < 590 ) {
		$(thisImage).css({'width': $('#memes-content').width() });
		console.log( $(window).width() )
	}
	else {
		$(thisImage).css({'width':'550px'});
	}
	console.log($(thisImage).width());
	memeCanvas.width = 1100;
	memeCanvas.height = thisImage.height * (1100/thisImage.width);
	console.log(1111)
	console.log(thisImage.height + 'height')
	console.log(thisImage.width + 'width')
	$(memeCanvas).attr('crossorigin', '')
	$(memeCanvas).css({'height':memeCanvas.height / (memeCanvas.width/$(memeCanvas).width()) });
	$('#meme-wrapper').css({'height':memeCanvas.height / 2});
	$('#pick-meme').hide();
	$('#left-arrow').fadeIn();
	$('.middle-column').show();
	$('#memescontainer').removeClass('clicked');
	memeCtx.drawImage(thisImage,0,0,1100,thisImage.height * (1100/thisImage.width));console.log( memeCtx.getImageData(0,0,memeCanvas.width,memeCanvas.height) )
	$('#add-button').hide();
	var memeHeight = thisImage.height * (1100/thisImage.width);


		CanvasRenderingContext2D.prototype.wrapText = function (text, x, y, maxWidth, lineHeight) {

    var lines = text.split("\n");

    for (var i = 0; i < lines.length; i++) {

        var words = lines[i].split(' ');
        var line = '';

        for (var n = 0; n < words.length; n++) {
            var testLine = line + words[n] + ' ';
			//console.log(testLine)

            var metrics = this.measureText(testLine);
			//console.log(metrics+'= metric')
            var testWidth = metrics.width;
            if (testWidth > maxWidth && n > 0) {
				this.fillText(line, x, y );
					this.lineWidth = 3;
					this.strokeText(line, x, y );
					//this.strokeText(line, x, y );
					this.shadowColor="black";
					this.shadowBlur=3;
					this.fillText(line, x, y );
					line = words[n] + ' ';
					y += lineHeight;
					console.log(y + 'is it equal to =?' + Number(Yposition  + lineHeight + lineHeight + newNumber));
            } else {
                line = testLine;
            }
        }
		this.fillText(line, x, y );
		this.lineWidth = 3;
		//this.strokeText(line, x, y );
		this.strokeText(line, x, y );
        this.shadowColor="black";
		this.shadowBlur=3;
		this.fillText(line, x, y );
		y += lineHeight;
    }
};
var newNumber = 0;
	var Yposition = memeCanvas.height - 50;

	CanvasRenderingContext2D.prototype.wrapTextBottom = function (text, x, y, maxWidth, lineHeight) {

    var lines = text.split("\n");

    for (var i = 0; i < lines.length; i++) {
		//console.log('i = '+i)
        var words = lines[i].split(' ');
		//console.log(words +"+"+ lines);
        var line = '';



        for (var n = 0; n < words.length; n++) {
			//console.log('n = '+n)
            var testLine = line + words[n] + ' ';
            var metrics = this.measureText(testLine);
            var testWidth = metrics.width;

            if (testWidth > maxWidth && n >  0) {
					this.fillText(line, x, y );
					this.lineWidth = 3;
					this.strokeText(line, x, y );
					this.strokeText(line, x, y );
					this.shadowColor="black";
					this.shadowBlur=3;
					this.fillText(line, x, y );
					line = words[n] + ' ';
					y += lineHeight;
					console.log(y + 'is it equal to =?' + Number(Yposition  + lineHeight + lineHeight + newNumber));
					//newNumber = -160
					//alert('zxZX')
            }
			else {
                line = testLine;
            }
        }
		//console.log(newNumber)
		this.fillText(line, x, y );
		this.lineWidth = 3;
		this.strokeText(line, x, y );
		this.strokeText(line, x, y );
        this.shadowColor="black";
		this.shadowBlur=3;
		this.fillText(line, x, y );

		//console.log(  memeCanvas.height - y);
		//console.log('y=' + y)
		//Yposition = lineHeight -70 + memeCanvas.height - 90;
		//console.log(lineHeight)
		//console.log('yposition = '+Yposition)
		//console.log(y + '=?' + Number(Yposition  + lineHeight +80 + newNumber))
		//console.log('y = '+y)
		//console.log('newNumber = '+newNumber)
		if ( y == Number(Yposition +lineHeight + newNumber) ) {
			newNumber = -80;
			//alert('second?')
		}
		else if ( y == Number(Yposition + 2 * lineHeight + newNumber) ) {
			newNumber = -160;
			//alert('third?')
		}
		else if ( y == Number(Yposition  + newNumber) ) {
			newNumber =0;
		}
		else if ( y == Number(Yposition + 3 * lineHeight + newNumber) ) {
			newNumber =-240;
		}
		else if ( y == Number(Yposition + 4 * lineHeight + newNumber) ) {
			newNumber =-320;
		}
		y += lineHeight;
    }
};


//ctx.textBaseline = "top";
//ctx.wrapText("Hello World!Let's stop taking line breaks for granted.Let's thank the inventors of line breaks for all they went through.",20,20,160,16);



	/*$('#cancel-upload-2.second').click(function(){
		var canvas = document.getElementById("meme-canvas");
        canvas.toBlob(function(blob) {
            saveAs(blob, "output.png");
        }, "image/png").download = "filename";;

	})
	*/
	$('#text-top').click(function(){
		if ( $(window).width() >920 ) {
			$("html, body").animate({ scrollTop: 60 });
		}
		$(this).keyup(function(e){
			if ( e.keyCode != 37 && e.keyCode != 38 && e.keyCode != 39 && e.keyCode != 40 ) {
				var prevMeme = memeCtx.getImageData(0,0,memeCanvas.width,memeCanvas.height);
				memeCtx.clearRect(0,0,memeCanvas.width,memeCanvas.height);
				memeCtx.shadowColor = "transparent";
				memeCtx.drawImage(thisImage,0,0,1100,thisImage.height * (1100/thisImage.width));
				//memeCanvas.height = thisImage.height * (1200/thisImage.width);
				//memeCanvas.style.height = ((thisImage.height * (600/thisImage.width)) / 2) ;
				memeCtx.fillStyle = 'white';
				memeCtx.strokeStyle = 'black';
				memeCtx.lineWidth = 3;
				var fontSize = 72 ;
				memeCtx.font = fontSize + 'px Impactt';
				memeCtx.textAlign="center";
				memeCtx.shadowColor = "transparent";
				memeCtx.save();
				memeCtx.shadowColor="black";
				//memeCtx.shadowBlur=1;
				memeCtx.textBaseline = "center";
				memeCtx.wrapText(document.getElementById('text-top').value.toUpperCase(),550,100,1100,70);
				memeCtx.wrapTextBottom(document.getElementById('text-bottom').value.toUpperCase(), 550, Yposition +newNumber, 1100,80);
			}

		})
	});

	$('#text-bottom').click(function(){

		if ( $(window).width() >920 ) {
			$("html, body").animate({ scrollTop: $(document).height()-$(window).height() });
		}
	});

	$('#text-bottom').keyup(function writeDown(e){
		if ( e.keyCode != 37 && e.keyCode != 38 && e.keyCode != 39 && e.keyCode != 40 ) {
			var prevMeme = memeCtx.getImageData(0,0,memeCanvas.width,memeCanvas.height);
			memeCtx.clearRect(0,0,memeCanvas.width,memeCanvas.height);
			memeCtx.shadowColor = "transparent";
			memeCtx.drawImage(thisImage,0,0,1100,thisImage.height * (1100/thisImage.width));
			//memeCtx.textBaseline = "top";

			memeCtx.fillStyle = 'white';
			memeCtx.strokeStyle = 'black';
			memeCtx.lineWidth = 3;
			var fontSize = 72 ;
			memeCtx.font = fontSize + 'px Impactt';
			memeCtx.textAlign="center";
			memeCtx.shadowColor = "transparent";
			memeCtx.save();
			memeCtx.shadowColor="black";
			//memeCtx.shadowBlur=1;
			memeCtx.wrapText(document.getElementById('text-top').value.toUpperCase(),550,100,1100,70);
			memeCtx.textBaseline = "center";
			memeCtx.wrapTextBottom(document.getElementById('text-bottom').value.toUpperCase(), 550, Yposition +newNumber, 1100,80);
		}
		})
	};



} });

















	/*
	$('a.upvote').click(function(){
        alert('asd')
        $(this).css({'background':'url(upvote-3.png) 0px 0px no-repeat whitesmoke'});
        $(this).siblings('downvote').css({'background':'url(upvote-2.png) 0px 0px no-repeat whitesmoke'});
    })
    $('a.downvote').click(function(){
        $(this).css({'background':'url(upvote-3.png) 0px 0px no-repeat whitesmoke'});
        $(this).siblings('upvote').css({'background':'url(upvote-2.png) 0px 0px no-repeat whitesmoke'});
    })
    */

    $('.wrapper, #upload').click(function(){
        //alert('dfgdfg')
    })
	$('#create-wrapper').focus(function(){
		$('.create').css({'opacity':'1','display':'block'})
	});
	$('#create-wrapper').focusout(function(){
		$('.create:nth-child(n+2)').css({'opacity':'0','display':'none'})
	})

	$('.create:nth-child(n+2)').click(function(e){
		$('.left-column').removeClass('fadeInLeft animated-delayed').addClass('fadeOutLeft animated');
		$('.right-button').removeClass('animated-delayed rotateIn').addClass('rotateOut animated');
		$('.middle-column').addClass('fadeOut animated');
		var toLoad = $(this).attr('id') + '.html' + ' #content';
		console.log(toLoad);
		setTimeout(function() {
			$( "#content" ).load( toLoad );
		},1000);
		$('.create:nth-child(n+2)').hide();
		function loadJS(file) {
		// DOM: Create the script element
		var jsElm = document.createElement("script");
		// set the type attribute
		jsElm.type = "text/javascript";
		// make the script element load file
		jsElm.src = file;
		// finally insert the element to the body element in order to load the script
		document.body.appendChild(jsElm);
		}
		console.log($(this).attr('id') + '.js');
		//loadJS( $(this).attr('id') + '.js');
	});


	//document.getElementById('pick-meme').style.width = document.body.clientWidth - 185 + 'px'
	//window.onresize = function (event) {
	//	document.getElementById('pick-meme').style.width = document.body.clientWidth - 185 + 'px'
	//}

	var theWindow = $(window)
		, altHeader = $(".navbar");

	theWindow.on('scroll', function () {
		if (theWindow.scrollTop() >= 120)
			altHeader.addClass("no-height").removeClass('height');
		else
			altHeader.addClass("height").removeClass('no-height');
	});
	$('#cancel-upload-2').click(function(){
	})
		$('#left-arrow').click(function(){
			//$('.middle-column').removeClass('fadeIn').addClass('fadeOut'); // REMOVED
			$('.middle-column').hide()
			$('#pick-meme').show();
			$('#left-arrow').fadeOut();
		})
});
console.log('create.js working')