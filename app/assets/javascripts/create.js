$(document).ready(function(){
	$(document).ready(function(){
	   $('.pick-meme-container').css({
        'height': ($('.pick-meme-container').eq(4).width() )*($('#memes-content').width()/100)
        
      })
      console.log(1111111111111111111111111)
      console.log( ($('.pick-meme-container').eq(4).width() )*($(window).width()/100) )
      //console.log( $('.pick-meme-container').eq(4).css('width') )
      console.log( $('.pick-meme-container').eq(4).width() )
      //console.log( $('.pick-meme-container').eq(4).style.width )
	})
	
var memeCanvas = document.getElementById('meme-canvas');
var memeCtx = memeCanvas.getContext('2d');
memeCtx.scale(2,2);
memeCtx.font = '19px open sans';
memeCtx.fillStyle = 'silver';
memeCtx.fillText('Choose a meme',180,200);

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
$('.pick-meme-container').click(function(){
	
	//memeCtx.scale(1,1);
	var thisMeme = $(this);
	var thisImage = document.createElement('img');
	//var thisImage = $(thisMeme).clone().css({'width':'500px'});
	var MemeBackground = $(this).css('background-image').replace('url("','').replace('")','');
	$(thisImage).attr('src', MemeBackground);
	thisImage.crossOrigin = "Anonymous";
	if ( $(window).width() < 590 ) {
		$(thisImage).css({'width': $('#memes-content').width() });
		alert( $(window).width() )
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
	//memeCanvas.height = thisImage.height * (1200/thisImage.width);
	//memeCanvas.style.height = memeCanvas.height / 2 ;
	$(memeCanvas).css({'height':memeCanvas.height / (memeCanvas.width/$(memeCanvas).width()) });
	$('#meme-wrapper').css({'height':memeCanvas.height / 2});
	//$('#meme-wrapper').css({'height':(memeCanvas.height * $('#memes-content').width() )/1100 });
	$('#pick-meme').hide();
	$('#left-arrow').fadeIn();
	//$('.middle-column').addClass('animated-slightly-delayed fadeIn').removeClass('fadeOut');  // REMOVED
	$('.middle-column').show();
	$('#memescontainer').removeClass('clicked');
	memeCtx.drawImage(thisImage,0,0,1100,thisImage.height * (1100/thisImage.width));
	$('#add-button').hide();
	//document.getElementById('add-button').innerHTML = 'add';
	//$('#add-button').fadeIn();
	//memeCtx.scale(2,2);
	//$('#meme-wrapper textarea').show();
	var memeHeight = thisImage.height * (1100/thisImage.width);
	
	//console.log('clicked the meme')
	//console.log( memeCanvas.toDataURL() )
	
	
		
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
 
 
	
	
	$('#text-3').click(function(){
		if ( $(window).width() >590 ) {
			$("html, body").animate({ scrollTop: 60 });
		}
		$(this).keyup(function(){
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
			memeCtx.font = fontSize + 'px Impact'; 
			memeCtx.textAlign="center"; 
			memeCtx.shadowColor = "transparent";
			memeCtx.save();
			memeCtx.shadowColor="black";
			//memeCtx.shadowBlur=1;
			memeCtx.textBaseline = "center";
			memeCtx.wrapText(document.getElementById('text-3').value.toUpperCase(),550,100,1100,70);
			memeCtx.wrapTextBottom(document.getElementById('text-4').value.toUpperCase(), 550, Yposition +newNumber, 1100,80);
		})
	});
		
	$('#text-4').click(function(){
		
		if ( $(window).width() >590 ) {
			$("html, body").animate({ scrollTop: $(document).height()-$(window).height() });
		}
		$(this).keyup(function writeDown(e){
			
			var prevMeme = memeCtx.getImageData(0,0,memeCanvas.width,memeCanvas.height);
			memeCtx.clearRect(0,0,memeCanvas.width,memeCanvas.height);			
			memeCtx.shadowColor = "transparent";
			memeCtx.drawImage(thisImage,0,0,1100,thisImage.height * (1100/thisImage.width));
			//memeCtx.textBaseline = "top";
			
			memeCtx.fillStyle = 'white';
			memeCtx.strokeStyle = 'black';
			memeCtx.lineWidth = 3; 
			var fontSize = 72 ; 
			memeCtx.font = fontSize + 'px Impact'; 
			memeCtx.textAlign="center"; 
			memeCtx.shadowColor = "transparent";
			memeCtx.save();
			memeCtx.shadowColor="black";
			//memeCtx.shadowBlur=1;
			memeCtx.wrapText(document.getElementById('text-3').value.toUpperCase(),550,100,1100,70);
			memeCtx.textBaseline = "bottom";
			memeCtx.wrapTextBottom(document.getElementById('text-4').value.toUpperCase(), 550, Yposition +newNumber, 1100,80);
		})
	});
		
		
});	
 $('a.upvote').click(function(){
        alert('asd')
        $(this).css({'background':'url(upvote-3.png) 0px 0px no-repeat whitesmoke'});
        $(this).siblings('downvote').css({'background':'url(upvote-2.png) 0px 0px no-repeat whitesmoke'});
    })
    $('a.downvote').click(function(){
        $(this).css({'background':'url(upvote-3.png) 0px 0px no-repeat whitesmoke'});
        $(this).siblings('upvote').css({'background':'url(upvote-2.png) 0px 0px no-repeat whitesmoke'});
    })
    $('.wrapper, #upload').click(function(){
        alert('dfgdfg')
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
	//for (i = 1; i < 215; i++) {
	//	document.getElementById('meme-title-' + i).parentElement.style.height = document.getElementById('meme-title-' + 2).parentElement.clientWidth * 1.05 + 'px';
	//}
	//$('.pick-meme-container').css({'height':$('#meme-title-1').parent().height()+'!important'})
	$('#cancel-upload-2').click(function(){
	})
	/*$('#addMemes').click(function () {
			$('#memescontainer').fadeToggle(200);
			$('#memescontainer').toggleClass('clicked');
			//$('#add-button').hide();
			if ($('#memescontainer').hasClass('clicked')) {
				document.getElementById('add-button').innerHTML = 'remove';
				$('#add-button').fadeIn(200);
				//$('.rageface').fadeIn(400);
				//alert('clicked')
			} else {
				document.getElementById('add-button').innerHTML = 'add';
				$('#add-button').fadeIn(200);
				//$('.rageface').hide();
				//$('.rageface').fadeOut(400);
				//alert('d clicked');
			}	$('.meme-pics').slice(0,40).trigger("loadEmBoys");

		});*/
		$('#left-arrow').click(function(){
			//$('.middle-column').removeClass('fadeIn').addClass('fadeOut'); // REMOVED
			$('.middle-column').hide()
			$('#pick-meme').show();
			$('#left-arrow').fadeOut();
		})
});
console.log('create.js working')