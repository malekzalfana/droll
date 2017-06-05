var followTrend;
var tabs;
var toBase64Field;
var hide;
var trend;
var trendid;
var trendname;
var trendposts;
var trendfollowers;
var type;
tabs = function() {
	$(document).on('click', 'a:not(.settings-logout):not(.vote):not(.report-post):not(.favor-post):not(.not-link)',
		function(e) {
			e.preventDefault();
			console.log("clicked this bitch")
			window.location = $(this).attr("href")
		})
	toBase64Field = function(base64) {
		$('body').addClass('blurred')
		$('#base64').val(base64);
		$('#text-top').val($('#base64').val());
		$('#memegen-img').attr('src', base64);

		app.showWebview();
	}
	hide = function() {

	}

	function stoperror() {
		return true;
	}
	window.onerror = stoperror;
	$(document).on('click', '.inline-make-tags-wrapper p', function() {
		console.log('tag is clicked')
		if ($(this).hasClass('active-make-tag')) {
			$(this).removeClass('active-make-tag')
		} else {
			$(this).addClass('active-make-tag')
		}
	})
	console.log('tabs')
	$(document).on('click', '.not-signed-in .upvote,.not-signed-in .downvote',
		function() {
			if ($(this).is('.upvote')) {
				$('.notice-message').text('Sign in to upvote').hide()
				setTimeout(function() {
					$('.notice-message').show()
				}, 100)
			} else {
				$('.notice-message').text('Sign in to downvote').hide()
				setTimeout(function() {
					$('.notice-message').show()
				}, 100)
			}
		})
	$(document).on('click', '.upvote, .downvote', function() {
		if ($('body').hasClass('signed-in')) {
			//$(this).addClass('voted').siblings('.vote').removeClass('voted')
			var points = $(this).siblings('.post-votes-word.real:not(.footer-interseter)').attr('data-points')
			console.log("ssssssss" + points)
			console.log(points + 'points')
			if ($(this).hasClass('voted')) {
				var userVotes = 0;
				$(this).removeClass('voted').siblings('.vote').removeClass('voted').removeClass(
					'not-voted')
			} else {
				$(this).addClass('voted').siblings('.vote').removeClass(
					'voted downvoted upvoted').addClass('not-voted')
				if ($(this).hasClass('upvote')) {
					var userVotes = 1
				} else if ($(this).hasClass('downvote')) {
					var userVotes = -1
				}
			}
			console.log(userVotes + 'uservotes') //CONTINUE THIS
			if (points + userVotes > 1) {
				var votesWords = 'points'
			} else if (points + userVotes == 1) {
				var votesWords = 'point'
			} else {
				var votesWords = 'points'
			}
			votesWords = ''
			$(this).siblings('.post-votes-word.real').hide().fadeIn(200).text(Number(
				points) + Number(userVotes) + " " + votesWords)
			$(this).siblings('.post-votes-word.real:not(.footer-interseter)').attr('data-user-votes', userVotes)
			if ( $(this).hasClass("upvote") ){
				$(".wrapper").removeClass("to-accept")
				$(this).parents(".wrapper").addClass("to-accept")
			}
		}
	});

		$(document).on('click', '.accept-user-button', function() {
			$(this).parents(".wrapper").children(".add-user").fadeOut(3000)
	$(this).parents(".accept-user").hide()
	})

	$(document).on('click', '.flag-post', function() {
		$(this).addClass("flagged bounce animated")
		/*
		var th = $(this).parents(".wrapper").addClass("rollOut animated")
		setTimeout(function(){
			$(th).remove();
		}, 500)
		*/
	})

	$(document).on('click', '.delete-post-before', function() {
		$(this).siblings(".edit_post").children(".delete-post-submit").click()
	})


	$('.memeb-wrapper form').on('keyup keypress', function(e) {
	  var keyCode = e.keyCode || e.which;
	  if (keyCode === 13) {
	    e.preventDefault();
	    return false;
	  }
	});
	//var $container = $('#left-content-profile');
	//console.log($container)
	/*$container.imagesLoaded(function() {
		$container.masonry({
			itemSelector: '.wrapper',
			gutter: window.innerWidth / 200
		});
		console.log('worked?')
		console.log(window.innerWidth / 200)
			//$('#left-content-profile .wrapper').fadeIn(100)
	});*/
	$(document).on('click', '#submit-feedback, #cancel-feedback', function() {
		if ($(this).is('#submit-feedback')) {
			$('#submit-feedback, #cancel-feedback').hide()
			$('#thanks-feedback').fadeIn()
			setTimeout(function() {
				$('#feedback').fadeOut(100)
			}, 1000)
		} else {
			$('#feedback').fadeOut(100)
		}
	})
	$(document).on('click', '#show-feedback', function() {
		$('#submit-feedback, #cancel-feedback, #feedback').show()
		$('#thanks-feedback').hide()
	})

	$(document).on('click', '.tabs', function() {
		$('.anonymous-image, .make-tags').removeClass('buzz')
		$('.choosen-content').hide();
		$('.tabs').removeClass('active-tab');
		$('.choosen-content').hide();
		$('#images-content-wrapper').hide();
		$(this).addClass('active-tab')
		var createWhat = $(this).attr('id').replace('-tab', '')
		$("#" + createWhat + "-content").show()
		if (createWhat == 'rage-comics') {
			$('#make-logo').css({
				'color': 'white'
			})
			console.log('white?')
		} else if (createWhat == 'images') {
			$('#make-logo').css({
				'color': 'rgba(255, 70, 27, 0.85)'
			})
			$('#images-content-wrapper').show();
		} else {
			$('#make-logo').css({
				'color': 'rgba(255, 70, 27, 0.85)'
			})
		}
	})
	$(document).on('click', '.dropping', function(e) {
		e.preventDefault();
	})
	$(document).on('click', '.make-meme', function() {
		if ($('#remote-make').length) {
			$('#remote-make, #hide-remote-make').show()
			$('body').addClass('overflow-hidden')
		} else {
			$('body').append(
				'<iframe src="http://beta.drolle.co/make2" id="remote-make" class="fadeInUp animated-very-fast"></iframe>'
			)
			$('body').addClass('overflow-hidden')
			$('#hide-remote-make').show()
		}
	})
	$(document).on('click', '#hide-remote-make', function() {
		$('#remote-make').fadeOut(200);
		$(this).hide();
		$('body').removeClass('overflow-hidden')
	})
	var toInput = true;

	function previewUserImage(event, thisFiler, thisPreview) {
		console.log('ssssss')
		if (toInput == true) {
			var files = event.target.files;
			var image = files[0]
			var reader = new FileReader();
			reader.onload = function(file) {
				var img = new Image();
				//console.log(file);
				img.src = file.target.result;
				$('#choose-image-preview').css({
					'background-image': 'url(' + img.src + ')'
				});
				//console.log('vv'+ img.src)
				$('#choose-image').hide()
			}
			reader.readAsDataURL(image);
			$('#reset-user-image').show()
			toInput = false
			/*setTimeout(function(){
      $('body').focus()
    }, 100)*/
		}
		setTimeout(function() {
			toInput = true
		}, 200)
	};

	function previewUserCover(event, thisFiler, thisPreview) {
		var files = event.target.files;
		var image = files[0]
		var reader = new FileReader();
		reader.onload = function(file) {
			var img = new Image();
			console.log(file);
			img.src = file.target.result;
			$('#choose-cover-preview').css({
				'background-image': 'url(' + img.src + ')'
			});
			$('#choose-cover').hide()
		}
		reader.readAsDataURL(image);
		$('#reset-cover').show()
	};

	function previewProfileImage(event, thisFiler, thisPreview) {
		var files = event.target.files;
		var image = files[0]
		var reader = new FileReader();
		reader.onload = function(file) {
			var img = new Image();
			console.log(file);
			img.src = file.target.result;
			$('#profile-photo').css({
				'background-image': 'url(' + img.src + ')'
			});
		}
		reader.readAsDataURL(image);
		console.log('worked')
	};

	function previewProfileCover(event, thisFiler, thisPreview) {
		var files = event.target.files;
		var image = files[0]
		var reader = new FileReader();
		reader.onload = function(file) {
			var img = new Image();
			console.log(file);
			img.src = file.target.result;
			$('#profile-under-overlay').css({
				'background-image': 'url(' + img.src + ')'
			});
		}
		reader.readAsDataURL(image);
	};
	var toDeleteStock = true
	$(document).on('click', '.delete-stock', function(e) {
		if (toDeleteStock == true) {
			toDeleteStock = false;
			$(this).siblings('form').find('input[type="submit"]').click()
			$(this).parent().remove()
			setTimeout(function() {
				toDeleteStock = true
			}, 300)
		}
	})
	var toStock = true;
	$(document).on('click', '#add-stocks-bar-left', function() {
		if (toStock == true) {
			console.log('clicked')
			$('#stock-base64').val($('#add-stocks-bar').val())
			setTimeout(function() {
				$('#submit-stock').click()
			}, 100)
			toStock = false;
			setTimeout(function() {
				$('#stock-base64').val('')
				$('#add-stocks-bar').val('')
			}, 300)
			setTimeout(function() {
				toStock = true;
			}, 1000)
		}

	})
	var touploadmemestock = false
	$('#upload-meme-stock').unbind('click').click(function() {
		$('#upload-meme-stock-field').val($('#upload-meme-stock-input').val())
		$('#upload-meme-stock-submit').click()
		$('#upload-meme-stock-input, #upload-meme-stock-field').val('')
	})
	/*
	var stockBase64;
	function readStock(url) {
    var img = new Image();

    img.setAttribute('crossOrigin', 'anonymous');

	    img.onload = function () {
	        var canvas = document.createElement("canvas");
	        canvas.width =this.width;
	        canvas.height =this.height;

	        var ctx = canvas.getContext("2d");
	        ctx.drawImage(this, 0, 0);

	        var dataURL = canvas.toDataURL("image/png");

	        stockBase64 = dataURL.replace(/^data:image\/(png|jpg);base64,/, "") ;
	    };

	    img.src = url;
	}

	function readStock(event, thisFiler, thisPreview) {
		console.log('ssssss')
			var files = event.target.files;
			var image = files[0]
			var reader = new FileReader();
			reader.onload = function(file) {
				var img = new Image();
				//console.log(file);
				img.src = file.target.result;
				reader.readAsDataURL(image);
				console.log(img.src)
			//getBase64FromImageUrl(img.src)
			//$('#input-stocks-hidden').val()
		}
	};
	$(document).on('click', '#add-stocks', function(){
		$('#input-stocks-hidden').click()
	})

  $(document).on('click', '#menu-button', function(){
    setTimeout(function(){
      $(this).parent().focus()
    },100)
    //$(this).focus()

    //$(this).parent().addClass('shown')
    $('#notification-icon, #nav-icons-wrapper a').fadeIn(100)
  })

  $(document).on('outfocus', '#menu-button', function(){
    $('#notification-icon, #nav-icons-wrapper a').hide()
    //$(this).removeClass('shown')
  })

  $(document).on('mouseover', '#menu-button', function(){
    if (  $(this).parent().hasClass('shown')  ) {
      $(this).parent().removeClass('shown')
      $('#notification-icon, #nav-icons-wrapper a').hide()
      //$('#overlay-under-notif').hide()
    }
    else {
      $(this).parent().addClass('shown')
      $('#notification-icon, #nav-icons-wrapper a').fadeIn(100)
      //$('#overlay-under-notif').fadeIn()
    }
  })
  */
	$(document).on('mouseover', '#menu-button-wrapper', function() {
		$(this).addClass('shown')
		$('#notification-icon, #nav-icons-wrapper a').fadeIn(100)
		if (window.innerWidth < 600) {
			$('#main-page-type').fadeOut(100)
		}
		$('#main-page-')
	})
	$(document).on('click touchStart', '#menu-button-wrapper', function() {
		$(this).addClass('shown')
		$('#notification-icon, #nav-icons-wrapper a').fadeIn(100)
		if (window.innerWidth < 600) {
			$('#main-page-type').fadeOut(100)
		}
	})
	$(document).on('keyup', '#sign-up-username-field', function() {
		$(this).val($(this).val().toLowerCase())
		console.log($(this).val())
	})
	$(document).on('mouseleave', '#nav-icons-wrapper', function() {
		if (window.innerWidth <= 500) {
			$('#menu-button-wrapper').removeClass('shown')
			$('#notification-icon, #nav-icons-wrapper a').hide()

			/*
			if ( window.innerWidth < 600 ) {

				$('#main-page-type').fadeIn(100)
			}*/
		}
	})
	$(document).on('click', '.cancel-share-it', function() {
		$(this).parent().hide()
	})
	$(document).on('click', '#cancel-upload', function(e) {
		e.preventDefault();
		$("#images-content-wrapper").load(window.location.href +
			" #images-content");
	})
	var toClickImage = true;
	/*
  $(document).on('click', '#choose-image, #reset-user-image', function(){
    console.log('clickeddddddddd')
    if ( toClickImage == true  ) {
      $(this).siblings('#choose-image-input').click()
      toClickImage = false
      setTimeout(function(){
        toClickImage = true
      }, 1300)
    }

  })
  */
	//*

	$(document).on('click', '#profile-favors', function() {
		//console.log('sssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss')
		//$(document).ready(function(){
		$('#right-content-profile').masonry({
			itemSelector: '.wrapper',
			gutter: 5
		});
		//})
	})
	$(document).on('click', '#edit-profile-image, #edit-profile-cover', function() {
		$('#' + $(this).attr('id') + '-field').click()
	})
	//*/
	$(document).on('click', '#choose-image, #reset-user-image', function() {
		$(this).siblings('input').click()
	})
	$(document).on('click', '.shown-post #back-clicker',
		function() {
			$('#back-list').click()
		})
	$(document).on('click', '.submit-edit-2', function() {
		$(this).parents('.wrapper').addClass('hidden')
	})
	$(document).on('click', '#done-meme', function() {
		var memeCanvas = document.getElementById('meme-canvas');
		$(memeCanvas).attr('crossorigin', '')
		var dataURL3 = memeCanvas.toDataURL();
		$('#hide-remote-make', parent.document.body).click();
		$(".wrapper:visible .base64-make", parent.document.body).val(dataURL3);
		$(".wrapper:visible .base64-image", parent.document.body).attr("src",
			dataURL3).fadeIn(200)
		$(".wrapper:visible .comment-html, .memes-emojis", parent.document.body).hide();
		$(".wrapper:visible .cancel-meme", parent.document.body).removeClass(
			'hidden-imp');
		console.log('worked?')
	});
	$(document).on('click', 'body:not(#gif) .remote-gif', function() {
		$('#hide-remote-make', parent.document.body).click();
		$(".wrapper:visible .giphy-id-make", parent.document.body).val($(this).attr('data-giphy-id'));
		console.log($(".wrapper:visible .giphy-id-make", parent.document.body))
		$(".wrapper:visible .comment-html, .memes-emojis", parent.document.body).hide();
		$(".wrapper:visible .cancel-meme", parent.document.body).removeClass(
			'hidden-imp');
		$(".wrapper:visible .make-giphy-image", parent.document.body).attr("src",
			$(this).attr('data-src')).fadeIn(200)
	});
	$(document).on('click', 'body:not(#make2) .remote-gif', function() {
		$('#gifs, #searchTerm').hide();
		$('#make-gif-preview img').remove()
		//alert( $(this).attr('data-src') )
		var value = new Image();
		value.src = $(this).attr('data-src')
		$('#make-gif-preview').append(value)
		$('#make-gif-field').attr('value', $(this).attr('data-giphy-id'))
		$('#image-gif-reset').show()
		$('#cancel-upload, #submit-image-button-before').show()
		$('#make-tags-1-wrapper').addClass('inline-block-imp')
		$('.anonymous-checkbox').addClass('shown')
		$('#make-tags-1').addClass('inline-block-imp')
	});
	$(document).on('click', '#image-gif-reset', function() {
		$('#gifs, #searchTerm').show();
		$('#make-gif-field').attr('value', '')
		$('#make-gif-preview img').remove()
		$('#image-gif-reset').hide()
		$('#make-gif-preview img').remove()
		$('#cancel-upload, #submit-image-button-before').hide()
		$('#make-tags-1-wrapper').removeClass('inline-block-imp')
		$('.anonymous-checkbox').removeClass('shown')
		$('#make-tags-1').removeClass('inline-block-imp')
	});

	$(document).on('click',
		'#share-buttons-settings div, #share-buttons-settings span',
		function() {
			$('#share-buttons-settings div, #share-buttons-settings span').removeClass(
				'chosen')
			$(this).addClass('chosen')
		})
	$(document).on('click', '#main-message', function() {
		$(this).hide()
	})
	$(document).on('click', '.cancel-meme', function() {
		$(this).addClass('hidden-imp')
		$(".wrapper:visible .base64-make").val('');
		$(".wrapper:visible .giphy-id-make").val('');
		$('.wrapper:visible .base64-image').hide()
		$(".wrapper:visible .make-giphy-image").hide();
		$(".wrapper:visible .comment-html").show();
		if (window.innerWidth > 600) {
			$('.memes-emojis').show()
		}
		$('.wrapper:visible .base64-make').hide();
		console.log('worked?')
	});
	//////////////////////
	var thisWrapper;
	$(document).on('click', '.skipped-reported .post-image-wrapper', function(e) {
		//e.preventDefault()
		$(this).parents('.wrapper').removeClass('skipped-reported')
	})
	$(document).on('click', '.wrapper:not(.skipped-reported) .post-image-wrapper',
		function(e) {
			//e.preventDefault();
			if (!$(this).parents('.wrapper').hasClass('shown') && e.target.id != "prev-post-icon" && e.target.id != "next-post-icon") {
				//alert('back')
				console.log('clicked')
				thisWrapper = $(this).parents('.wrapper')
				//alert(  $(thisWrapper).attr("id"))
				console.log(thisWrapper)
				$(thisWrapper).css({
					'width': '600px'
				}).addClass('shown')

				$('.wrapper').not($(this).parents('.wrapper')).hide().removeClass('shown')
				if (!$(thisWrapper).children('.right-wrapper').hasClass('shown') && !$(
						thisWrapper).children('.right-wrapper').hasClass('loading-2')) {
					console.log('clickedd')
					$('.shown.wrapper .right-wrapper').addClass('loading-2')
					$(thisWrapper).find('.submit-loadpost').eq(0).click().remove()
					console.log('clickedddddddddddddd')
					console.log($(thisWrapper).find('.submit-loadpost').eq(0))
					if (window.innerWidth > 600) {
						$('.wrapper.shown').find('.post-image-2').lazyload()
					}
				}
				if (window.innerWidth <= 550) {
					console.log($(thisWrapper))
					$(thisWrapper).addClass('fadeInUp animated-very-fast')
					setTimeout(function() {
						$(thisWrapper).removeClass('fadeInUp animated-very-fast')
					}, 300)
				}
				$('body').addClass('shown-post')
				window.scrollTo(0, $('body').offset().top);
			}
			//alert($(thisWrapper).attr('id'))
			//alert(  e.target.id )
			console.log( $(thisWrapper) )
			//alert(  $(thisWrapper).attr("id"))
		})
	$(document).on('click', '#scroll-up', function() {
		$(this).hide();
		window.scrollTo(0, $('body').offset().top);
	})
	$(document).on('click', '#image-for-meme-add', function() {
		$('#image-for-meme').addClass('stopped')
		$('#image-for-meme-img').attr('src', $('#image-for-meme-input').val())
		//$('#image-for-meme-field').attr('value', $('#image-for-meme-img').attr('src'))
		$('#image-for-meme-img').load(function() {
			$('#image-for-meme-field').attr('value', $('#image-for-meme-img').attr('src'))
			//$('#image-for-meme-field').attr('value', $('#image-for-meme-input').val())
			$('#image-for-meme').removeClass('stopped')
			$('#image-for-meme-input').val('')
			$('#image-for-meme').hide()
			$('#image-for-meme-reset').show()
		})
		setTimeout(function() {
			if ($('#image-for-meme-img').height() < 50) {
				console.log('oh shitt')
				$('#image-for-meme-field').attr('value', '')
				$('#image-for-meme-input').val('')
				$('#image-for-meme-img').attr('src', '')
				$('#image-for-meme').removeClass('stopped')
			}
		}, 2000)
	})
	var imageforgifadd = false;
	$(document).on('click', '#image-for-gif-add', function() {
		if (!$('#image-for-gif-input').val() == '' && $('#make-image-preview img').length < 1) {
			imageforgifadd = true
			$('#make-post-preview').addClass('stopped')
			$('#make-image-preview').children('img').remove()
			var image = $('<img src="' + $('#image-for-gif-input').val() + '" >');
			$('#make-image-preview').append(image)
			$('#make-image-preview').css({
				'min-height': $('#make-image-preview img').height()
			});
			$('#image-for-gif-wrapper').hide()
			$('#pictureInput, #preview-image-text, .make-dark-box').hide()
			$(image).load(function() {
				$('#iamge-for-gif-reset').show()
				$('#image-for-gif-field').attr('value', $(image).attr('src'))
				$('#image-for-gif-input').val('')
				$('#image-for-gif-reset').show()
				$('#make-image-preview').removeClass('stopped')
				console.log('image is loaded')

				$('#cancel-upload, #submit-image-button-before, #make-image-preview, #make-gif-preview').show()
				//$('#make-tags-1-wrapper').addClass('inline-block-imp')
				$('.anonymous-checkbox').addClass('shown')
				//$('#make-tags-1').addClass('inline-block-imp')
			})
			setTimeout(function() {
				if ($(image).height() < 50) {
					console.log('oh shitt')
					$('#image-for-gif-field').attr('value', '')
					$('#image-for-gif-input').val('')
					$(image).remove()
					$('#image-for-gif-wrapper').fadeIn()
					$('#pictureInput, #preview-image-text').show()
					imageforgifadd = false
					//$('#cancel-upload, #submit-image-button-before').hide()
					//$('#make-tags-1-wrapper').removeClass('inline-block-imp')
					//$('.anonymous-checkbox').removeClass('shown')
					//$('#make-tags-1').removeClass('inline-block-imp')
					$('#make-image-preview').css({
						'min-height': '100px'
					});
					$('#image-for-gif-reset').hide()
					$('#cancel-upload, #reset-image, #submit-image-button-before,  #make-image-preview, #make-post-title, #make-gif-preview').show()
				}
			}, 2000)
		}

		//$('#pictureInput, #preview-image-text').hide()
		//$('#cancel-upload, #submit-image-button-before').show()
		//$('#make-tags-1-wrapper').addClass('inline-block-imp')
		//$('.anonymous-checkbox').addClass('shown')
		//$('#make-tags-1').addClass('inline-block-imp')
	})

	/*
	$(document).on('click', '.expand-trends', function(){
		if ( $("#nav-menu-wrapper").hasClass('active') ) {
			$("#nav-menu-wrapper.active").removeClass("active")
		}
		else {
			$("#nav-menu-wrapper:not(.active)").addClass("active")
		}
	})
	*/
	$(document).on('click', '#reset-make-settings', function() {
		$(".choosen-content").hide();
		$('#nav-menu-wrapper').removeClass('closed');
	})

	$(document).on('click', '#pick-type p', function() {
		if ( $("body").hasClass("not-signed-in") ) {
			$("#continue-make").addClass("active")
		}
			$('#pick-type p').removeClass('active')
			$(this).addClass('active')
			type = $(this).attr('data-name')
			//alert(type)
			if (type && trend) {
				$("#continue-make").addClass("active")
			}

	})
	$(document).on('click', '.refresh-trends', function() {
		$(".refresh-trends").removeClass("active")
		$(".pick-trends.new-trend").val("")
		$("#pick-trends-wrapper-2, p.pick-tags-title.new").hide();
		$("#continue-make").removeClass("active")
		trend = false;
		$('.pick-trends').removeClass('active').removeClass("less-opacity")
		$(".new-trend, .add-trend").show();
	})
	$(document).on('click', '.pick-trends:not(.new-trend)', function() {
		$('.pick-trends').removeClass('active').addClass("less-opacity")
		$(this).addClass('active').removeClass("less-opacity")
		$(".refresh-trends").addClass("active")
		trend = $(this).attr('data-name')
		trendname = $(this).attr('data-name')
		trendfollowers = $(this).attr('data-followers')
		trendposts = $(this).attr('data-posts')

		trendid = $(this).attr('data-trendid')
		$(".pick-tags-title.new, .new-trend, .add-trend").hide();
		//alert(trend)
		if (type && trend) {
			$("#continue-make").addClass("active")
		}
	})

	$(document).on('click', '.memeb-button.first', function() {
		//alert("CLICKED")
		$(".memeb-wrapper.first").hide();
		//$(".memeb-wrapper.second").fadeIn(250);
		$(".memeb-wrapper.second").addClass("shown");

	})

	var emptyField = false;
	$(document).on('click', '.memeb-submit', function() {
		emptyField = false;
		/*
		if ( $(".memeb-field.f").val() == '' ) {
			console.log(0)
			$(".memeb-field.f").addClass("shake");
			emptyField = true
		}
		if ( $(".memeb-field.s").val() == '' ) {
			console.log(1)
			$(".memeb-field.s").addClass("shake");
			emptyField = true
		}
		if ( $(".memeb-field.t").val() == '' ) {
			console.log(2)
			$(".memeb-field.t").addClass("shake")
			emptyField = true
		}
		*/
		if ( $(".memeb-field.f").val() != '' && $(".memeb-field.s").val() != '' && $(".memeb-field.t").val() != '' && $(".memeb-wrapper.third").hasClass("approved") ) {
			$("#memeb-sign-up-submit").click();
		}
	})

	$(document).on('keyup outfocus', '.memeb-field.f', function() {
		$("#email-check-field").val( $(this).val() );
		$("#email-check-submit").click();
	})

	$(document).on('keyup', '.memeb-field.t', function() {
		if ($(".memeb-field.s").val() != $(".memeb-field.t").val() ){
			$(".memeb-wrapper.third").removeClass("approved").addClass("declined")
		}
		else {
			$(".memeb-wrapper.third").addClass("approved").removeClass("declined")
		}
	})

	$(document).on('click', '.memeb-button.second', function() {
		//alert("CLICKED")
		$(".memeb-wrapper.second").hide();
		$(".memeb-wrapper.third").fadeIn(250);
	})


	$(document).on('click', '.add-image-to-meme', function() {
		$(this).hide();
		$("#image-for-meme-input, #image-for-meme-add").removeClass("hidden-imp");
	})

	$(document).on('click', '#continue-make', function() {
		$(".pick-meme-container").slice(0,15).trigger('loadMemes')
		$(".choosen-content").hide();
		if (type == "images") {
			$("#images-content-wrapper").show();
		} else {
			$("#" + type + "-content").show();
		}

		$('#nav-menu-wrapper').addClass('closed');
		if (type == 'rage-comics') {
			$('#type-word').html("Rage Comic")
		} else if (type == 'memes') {
			$('#type-word').html("Meme")
		} else {
			$('#type-word').html("Gif")
		}
		$('#trend-word, #trend-word-2').html("/" + trend)
		$("#trend-word-details").html(trendfollowers + " Followers - " +trendposts+ " Posts")
		$('.make-trends-field').val(trend)
		$('.make-trends-field.trendname').val(trendname)
		if ( trendid != '' ) {
			$('.make-trends-field.trendid').val(trendid)
			//alert(trendid)
			//alert( $('.make-trends-field.trendid').val() )
		}


	})

	$(document).on('keyup', '.new-trend', function() {
		//if ( $(this).val().length > 5 ) {
		$('.choosen-content:visible .make-trends').removeClass('active')

		var word = $(this).val();
		//console.log( word[0] === word[0].toUpperCase() );
		//$(this).val( $(this).val().replace(' ','') )
		if (word[0] != "/") {
			$(this).val("/" + $(this).val())
		}
		//word.charAt( word.indexOf(" ") + 1 );
		var s;
		//alert( word[ word.length - 1 ] )
		//console.log( word[word.length - 1] )
		if (word[word.length - 1] != " " & word.indexOf(' ') >= 0) {
			s = word.substr(0, word.indexOf(" ")) + word.charAt(word.indexOf(" ") + 1).toUpperCase() + word.substr(word.indexOf(" ") + 2);
			$(this).val(s)
			console.log(word.charAt(word.indexOf(" ") + 1).toUpperCase())
		}
		if (word[word.length - 1] != " " & word.indexOf('  ') >= 0) {
			s = word.substr(0, word.indexOf("  ")) + word.charAt(word.indexOf("  ") + 1).toUpperCase() + word.substr(word.indexOf("  ") + 2);
			$(this).val(s)
			console.log(word.charAt(word.indexOf("  ") + 1).toUpperCase())
		}
		if ($(this).val().length > 2) {
			$('.pick-trends').removeClass('active')
			$(this).addClass('active')
			trend = $(this).val().replace("/", "");
			trendname = $(this).val().replace("/", "");
			if (type && trend) {
				$("#continue-make").addClass("active")
			}
		} else {
			$(this).removeClass('active')
			trend = '';
			$("#continue-make").removeClass("active")
		}

		//}
		//else {
		//$(this).removeClass('active')
		//}

	})
	$(document).on('click', '.add-trend', function() {
		$(".pick-tags-title.pick, .add-trend").hide();
		$('.pick-trends.trend-container, .add-trend').removeClass('active').addClass("less-opacity")
		$('.pick-tags-title.new, #pick-trends-wrapper-2').fadeIn(200)
		$(".refresh-trends").addClass("active")
	})

	var trendClick = 0;
	$(document).on('click', '.follow-trend, .followed-trend', function() {
		//alert( this.className)
		if (trendClick == 0) {
			$(".trend-parent").removeClass("active")
			$(this).parents(".trend-parent").addClass("active")
			console.log (  $(this).parents(".trend-parent")  )
			console.log("samir")
			$(".trend-parent.active .follow-trend-submit").click()
			trendClick = 1;
			setTimeout(function(){
				trendClick = 0;
			}, 3000)

		}



	})

	//followTrend = function(){
	//	$(this).parents('.single-trend-2').toggleClass('active')
	//}

	$(document).on('click', '#image-for-gif-reset', function() {
		console.log('oh shitt')
		var image = $('#make-image-preview img')
		$('#image-for-gif-field').attr('value', '')
		$('#image-for-gif-input').val('')
		$(image).remove()
		$('#image-for-gif-wrapper').fadeIn()
		$('#pictureInput, #preview-image-text, .make-dark-box').show();
		$('#cancel-upload, #submit-image-button-before,#make-image-preview').hide();
		$('#make-tags-1-wrapper').removeClass('inline-block-imp')
		$('.anonymous-checkbox').removeClass('shown')
		$('#make-tags-1').removeClass('inline-block-imp')
		//$('#make-image-preview').css({
		//	'min-height': '100px'
		//});
		$('#image-for-gif-reset, #make-gif-preview, #make-post-title').hide()
		$("#make-post-preview-wrapper #pictureInput").replaceWith($("#make-post-preview-wrapper #pictureInput").val('').clone(true));
	})
	$(document).on('click', '#image-for-gif-reset-2', function() {
		$("#make-gif-preview").hide();
	})
	$(document).on('click', '#image-for-meme-reset', function() {
		$('#image-for-meme-field').attr('value', '')
		$('#image-for-meme-img').attr('src', '')
		$('#image-for-meme').show()
		$('#image-for-meme-reset').hide()
	})

	$(document).on('click', 'body.shown-post #main-page-type a', function(e) {
		e.preventDefault()
		$('#back-list').click()
		setTimeout(function() {
			window.scrollTo(0, $('body').offset().top);
		}, 10)
	})
	$(document).on('click', '#make2 .cancel-meme', function() {
		$('#hide-remote-make').click()
	})

	$(document).on('click', 'body:not(#show) #back-list, .shown-post .post-image-wrapper, #explore .post-image-wrapper', function(e) {
		if (e.target.id != "prev-post-icon" && e.target.id != "next-post-icon" && e.target.className != 'post-trend') {
			if ($('body').is('#show')) {
				console.log('redirected to recent')
				//window.location = '/recent'
				//$('#logo').parent('a').click()
			} else {
				if ($('.wrapper.shown .middle-wrapper').is(':visible')) {
					$('.wrapper.shown .comment-button').click()
				}
				$('.wrapper').show().css({
					'width': '512px'
				}).removeClass('shown')
				$('body').removeClass('shown-post')
				$('.right-wrapper').hide()
				setTimeout(function() {
					window.scrollTo(0, $(thisWrapper).offset().top);
				}, 10)
			}
		}

	})

	$(document).on('click', '#next-post-icon', function() {
		var wrapper = $(this).parents(".wrapper")
		//!$('body').hasClass('loadingPost') &&  REMOVED
		if ($(wrapper).attr("id") != $('.wrapper').last().attr("id") ) { // not last
			///*
			if ($(wrapper).next('.wrapper').length == 0 && $('body').hasClass('loadingPost')) { // next existst + comments are loaing
				alert("first")
				$('.loadingPost-icon').addClass('loading-animation')
				var loadingPostInterval = setInterval(function() {
					if ($(wrapper).next('.wrapper').length == 0) {
						$('.loadingPost-icon').removeClass('loading-animation')
						clearInterval(loadingPostInterval)
						$('#next-post-icon').click()
					}
				}, 400);
			} else if ($(wrapper).next('.wrapper').length > 0) {
				//*/
				//alert("econdt")
				$(wrapper).hide().css({
					'width': '512px'
				}).removeClass('shown')
				$(wrapper).next('.wrapper').show().css({
					'width': '600px'
				}).addClass('shown')
				$('html, body').animate({
					scrollTop: $('body').offset().top
				}, 200);
				var wrapper2 = $(wrapper).next()
				//console.log( $(wrapper2).children(".submit-loadpost") )
				console.log($(".wrapper.shown .submit-loadpost") )
				//console.log("Ssss")
				$(".wrapper.shown .submit-loadpost").click().remove();
				$(".wrapper.shown .right-wrapper:not(.shown)").addClass("loading-2")




			}

		}
		else {
			alert("dd")
		}
		//alert(  $(thisWrapper).attr("id"))
	})

	$(document).on('click', '#prev-post-icon', function() {
		var wrapper = $(this).parents('.wrapper')
		if ( $(wrapper).attr('id') != $('.wrapper').first().attr("id") ) {
			$(wrapper).hide().css({
				'width': '512px'
			}).removeClass('shown')
			var wrapper2 = $(wrapper).prev(".wrapper");
			//thisWrapper = $(this).parents('.wrapper').prev()
			$(wrapper).prev(".wrapper").show().css({
				'width': '600px'
			}).addClass('shown')
			$('html, body').animate({
				scrollTop: $('body').offset().top
			}, 200);

			$(".wrapper.shown .submit-loadpost").click().remove();
				$(".wrapper.shown .right-wrapper:not(.shown)").addClass("loading-2")
/*
			if (!$(wrapper2).children('.right-wrapper').hasClass('shown')) {
				alert("something")
				$(wrapper2).find('#loadPost').children('form').children(
					'input[type="submit"]').eq(0).click()
				$('.shown.wrapper .right-wrapper').addClass('loading-2')
				//console.log($(thisWrapper).children('.left-wrapper'))
			}
*/
		}
		else {
			console.log('backkkkkk')
			$('.wrapper').show().css({
				'width': '512px'
			}).removeClass('shown')
			$('body').removeClass('shown-post')
			$('.right-wrapper').hide()
			setTimeout(function() {
				window.scrollTo(0, $(wrapper2).offset().top);
			}, 10)
		}

		//console.log( $(thisWrapper) )
	})
	//////////////////////
	$(document).on('click', '#choose-cover, #reset-cover', function() {
		$(this).siblings('input').click()
	})
	//$('.tag').removeClass('active')
	/*if ( $('body').is('#recent') || $('body').is('#tag') || tagname != '' ){
		$("#tag-"+ tagname +" div").addClass('active')
	}

	else {
		$('#tag-all div').addClass('active')
	}
    */
	$(document).on('click', '.link', function(e) {
		//e.preventDefault()//
		window.location = $(this).attr('data-url')
	})
	$(document).on('keydown', function(e) {
		if (e.altKey && e.keyCode == 37 && $('body').hasClass('shown-post')) {
			e.preventDefault()
		}
	})
	$(document).on('keydown', function(e) {
		if (e.keyCode == 13 && $('body').is('#make')) {
			e.preventDefault()
			return false
		}
	})
	$(document).on('keyup', '#memeb-username-field', function() {
		console.log("canged")
		$(this).removeClass("approved")
		$(this).addClass("loading")
		console.log("LOADING")
		$("#memeb-username-field").val( $(this).val().toLowerCase().replace("  ", "").replace(" ", "").replace(" ", "").replace("-", '').replace("!", '').replace("@", '').replace("$", '').replace("#", '').replace("&", '').replace("(", '').replace("(", '').replace(")", '') );
		$("#username-check-field").val( $(this).val() );
		//if ( !$(this).hasClass("loading") ) {
			$("#username-check-submit").click();
		//}

	})

	$(document).on('click', '.add-user:not(.followed)', function() {

		$(".wrapper").removeClass("to-accept2")
		$(this).parents(".wrapper").addClass("to-accept2")
		$(this).parents(".wrapper").children(".accept-user").fadeIn(100)
	})
	$(document).on('click', '.follow-user', function() {
		$(this).siblings(".new_relationship").children(".submit").click();
	})

	$(document).on('click', '#memeb-username-submit-before', function() {
		console.log("clicked")
		if ( $("#memeb-username-field").hasClass("approved") ) {
			//alert("clicked")
			$("#memeb-username-submit").click();
			/*
			setTimeout(
				function(){
					window.location = '/make'

				}, 1000)
				*/
		}
	})
	$(document).on('keyup', function(e) {
		if (!$("input,textarea,.post-comment-body-2.post-comment-body").is(
				":focus")) {
			if (e.keyCode == 37) {
				//alert("left")
				alert("c")
				if ($('body').hasClass('shown-post')) {
					alert("cc")
					$('#prev-post-icon').click()
				}
			} else if (e.keyCode == 39) {
				//alert("next")
				if ($('body').hasClass('shown-post')) {
					$('#next-post-icon').click()
				}
			} else if (e.keyCode == 8) {
				//alert("basck")
				if ($('body').hasClass('shown-post')) {
					e.preventDefault()
					console.log('backkkkkk')
				$('.wrapper').show().css({
					'width': '512px'
				}).removeClass('shown')
				$('body').removeClass('shown-post')
				$('.right-wrapper').hide()
				setTimeout(function() {
					window.scrollTo(0, $(thisWrapper).offset().top);
				}, 10)
				}
			}
		}
	})
	var toPost = true;
	var commentopen = false
	$(document).on('mousedown', '.post-comment', function() {
		var thisCommentBody = $(this).parents('form')
		//console.log(thisCommentBody)
		//console.log($(thisCommentBody).find('.post-comment-body-2.post-comment-body').html())
		$(thisCommentBody).find('textarea.post-comment-body').val($(
			thisCommentBody).find('.post-comment-body-2.post-comment-body').html())
	})
	$('.post-reply').unbind('click').click(function() {

	})
	/*
	$('form :submit').click( function () {
	    $(this).prop("disabled", true).closest('form').append($('<input/>', {
	        type: 'hidden',
	        name: this.name,
	        value: this.value
	    })).submit();
	});
	*/

	var toComment = true
	jQuery.fn.preventDoubleSubmission = function() {
		$('form').on('submit', function(e) {
			var $form = $(this);

			if ($form.data('submitted') === true) {
				// Previously submitted - don't submit again
				e.preventDefault();
			} else {
				// Mark it so that the next submit can be ignored
				$form.data('submitted', true);
			}
		});

		// Keep chainability
		return this;
	};
	$('.post-comment').unbind('click').click(function() {
		if (toComment == true) {
			var thisCommentBody = $(this).parents('form')
			if ($(thisCommentBody).find('.post-comment-body-2.post-comment-body').html() ==
				'' && $('.shown.wrapper .base64-make').val() == '' && $('.shown.wrapper .giphy-id-make').val() == '') {
				$(this).parents('.middle-wrapper').removeClass('buzz').hide().show().addClass(
					'buzz')
				$('.wrapper.shown .post-comment-body-2.post-comment-body').eq(0).focus()
			} else {
				$(thisCommentBody).find('textarea.post-comment-body').val($(
					thisCommentBody).find('.post-comment-body-2.post-comment-body').html())
				$('.middle-wrapper').hide()
				commentopen = false;
				$('.loading-quarter-circle').addClass('loading-animation')
				setTimeout(function() {
					$('.wrapper:visible .comment-html').html('')
					$('.wrapper:visible .cancel-meme').click()
				}, 2000)
				$(this).siblings('.post-comment-after').click()
				toComment = false;
			}
			setTimeout(function() {
				toComment = true
			}, 2000)
		} else {
			console.log('sss')
		}

	})

	$(document).on('click', '.memeb-button-3', function() {
		$(".memeb-wrapper-2").hide();
		$(".memeb-wrapper-3").show();

	})
	$(document).on('click', '.make-trends', function() {
		$('.choosen-content:visible .make-trends').removeClass('active')
		$(this).addClass('active')
		$('.choosen-content:visible .make-trends-field').attr('value', $(this).attr('data-trend-name'))
		$('.choosen-content:visible .make-add-trend-input').val('')
		$('.choosen-content:visible .make-add-trend-input').removeClass('active')
		//alert($(this).attr('data-trend-name'))
		//alert( $('.choosen-content:visible .make-trends-field').attr('value') )
	})
	$(document).on('keyup', '.make-add-trend-input', function() {
		if ($(this).val().length > 5) {
			$('.choosen-content:visible .make-trends').removeClass('active')
			$(this).addClass('active')
			$(this).val($(this).val().replace(' ', ''))
			$('.choosen-content:visible .make-trends-field').attr('value', $(this).val())
		} else {
			$(this).removeClass('active')
		}

		//alert($(this).attr('data-trend-name'))
		//alert( $('.choosen-content:visible .make-trends-field').attr('value') )
	})
	$(document).on('click', '.comment-button', function() {
		if ( !$("body").hasClass("shown-post") ){
			$(this).parents(".left-wrapper").children(".post-image-wrapper").click();
			console.log( $(this).parents(".left-wrapper").children(".post-image-wrapper") )
		}
		else {
			$('.middle-wrapper').removeClass('buzz')
		toPost = true;
		if (commentopen == false) {
			$('.middle-wrapper').addClass('inline-block-imp');
			setTimeout(function() {
				$('.wrapper.shown .post-comment-body-2.post-comment-body').eq(0).focus()
			}, 100)
			commentopen = true
		} else {
			$('.middle-wrapper').removeClass('inline-block-imp');
			commentopen = false
		}
		}

	});
	$(document).on('click', '#cancel-meme-2', function(e) {
		$('#pick-meme').show();
		$('#text-top, #created-meme-title, #text-bottom').val('')
		$('#meme-canvas').css({
			'height': '0px'
		})
		$(window).scrollTop(0);
	})
	$(document).on('click', '#cancel-edit-profile', function() {
		$("#setting-button, #posts-number, #upvotes-number").fadeIn(100);
		$('#profile-under-overlay').css({
			'background-image': originalCover
		});
		$('#profile-photo').css({
			'background-image': originalImage
		});
		$('#username-profile').text(originalBio)
		$('#username-profile-big').text(originalUsername)
		$('#edit-profile-image, #edit-profile-cover').hide();
		$("#edit-profile-image-field, #edit-profile-cover-field").val('');
		$('#profile-bio-field').attr('value', originalBio)
		$('#profile-username-field').attr('value', originalUsername)
		$('#username-check-icon').text('check_circle')
		$(this).hide();
		$('#edit-profile').show();
		document.getElementById('username-profile').contentEditable = 'false';
		document.getElementById('username-profile-big').contentEditable = 'false';
		$('#save-profile, #profile #username-check-icon').hide();
	});
	var originalCover;
	var originalImage;
	var originalUsername;
	var originalBio;
	$(document).on('click', '#edit-profile', function() {
		$("#setting-button, #posts-number, #upvotes-number").hide();
		originalCover = $('#profile-under-overlay').css('background-image');
		originalImage = $('#profile-photo').css('background-image');
		originalBio = $('#username-profile').text()
		originalUsername = $('#username-profile-big').text()
		$('#edit-profile-image, #edit-profile-cover').show();
		$(this).hide();
		$('#cancel-edit-profile, .profile-buttons').show()
		//$('#save-profile').show().addClass('left-margined')
		//document.getElementById('username-profile').contentEditable = 'true';
		//document.getElementById('username-profile-big').contentEditable = 'true';
	})
	$(document).on('click', '#sign-up-2', function() {
		console.log('clicked')
		$('#remote-login-wrapper').click()
		$('#sign-up').click()
	})
	var approvedUsername;
	$(document).on('click', '#save-profile', function() {
		console.log(usernameChecked)
		console.log( approvedUsername )
		if (usernameChecked ) { // && approvedUsername REMOVED
			alert("true")
			$('#save-profile-field').click()
			if ($('#username-check-icon').text() == 'cancel') {
				$('#username-check-icon').addClass('flash animated-fast')
				setTimeout(function() {
					$('#username-check-icon').removeClass('flash animated-fast')
				}, 1000)
			}
			if ($('#username-profile').text() != '') {
				$('#cover-photo').removeClass('no-bio')
			} else {
				$(this).hide().removeClass('left-margined')
				$('#edit-profile-image, #edit-profile-cover, #cancel-edit-profile').hide();
				$('#edit-profile').show()
				$('#save-profile-field').click();
				document.getElementById('username-profile').contentEditable = 'false';
				document.getElementById('username-profile-big').contentEditable =
					'false';
			}
		}

	})
	//$(document).on('focus', '#profile-username', function(){
	$(document).on('keyup', '#username-profile', function() {
		$('#profile-bio-field').attr('value', $('#username-profile').text())
		usernameChecked = false;
		$('#username-check-icon').show()
	})
	if ($('body').attr('data-commentid') > '0') {
		$('#comment-' + $('body').attr('data-commentid') + '').addClass('thiscomment')
	}
	$(document).on('click', '#sign-up-submit-before', function() {
		console.log('sign up')
		if (usernameChecked === true) {
			if ($('#username-check-icon').text() == 'cancel') {
				$('#username-check-icon').addClass('flash animated-fast')
				$('html,body').animate({
					scrollTop: $('#username-check-icon').offset().top - 200
				});
				setTimeout(function() {
					$('#username-check-icon').removeClass('flash animated-fast')
				}, 1000)
			} else {
				if (!$('#sign-up-username-field').val() || !$('.passwords').eq(0).children(
						'input').val() || !$('.passwords').eq(1).children('input').val() || !$(
						'#email-field-settings').val()) {
					//$('.notice-message').val('Complete all fields')
					document.getElementById('notice-message').innerHTML =
						'Complete the fields please'
				} else {
					$('#sign-up-submit').click()
				}
			}
		}
	});
	$(document).ready(function() {
		//$('#anonymous-faces img').slice(40, $('#anonymous-faces .rageface').length - 39 ).lazyload()
	})
	var loadMemes;
	$(".pick-meme-container").slice(0,15).lazyload({
	    event: "loadMemes"
	}).addClass("bitches");
	$(".pick-meme-container").slice(15,300).lazyload()

	var backgroundImage = function(){
		$(".invite-underlay").css({'opacity':'0.7'})
	}
	var loadbi;

	$("#invite-page").lazyload({
		event: 'loadbi',
		load: backgroundImage
	})
	$("#invite-page").trigger('loadbi')

	//$(window).bind("load", function() {

	//});
	//$(".pick-meme-container").lazyload();
	$("#box-4-wrapper img").lazyload();

	var $content = $('#box-4-wrapper-inside');
		$content.imagesLoaded(function() {
			$content.masonry({
				itemSelector: '.wrapper-new',
				gutter: 5
			});
			$('#box-4-wrapper').removeClass("opacity");
		});
	$(document).on('click', '#anonymous-image', function() {
		$('#anonymous-faces img').show()
		$("#anonymous-faces img").slice(0, 40).lazyload({
			event: 'loadEmBoys2',
			//effect : "fadeIn",
			threshold: 100,
		});
		$('#anonymous-faces img.rageface').slice(0, 40).trigger("loadEmBoys2");
		//$('#anonymous-faces .rageface').lazyload()
		$("#anonymous-faces img.rageface").slice(40, 185).lazyload({
			//effect : "fadeIn",
			container: $("#anonymous-faces"),
			threshold: 100,
			event: 'scrollstop'
		});
		$('#anonymous-faces').fadeIn();
		$('body').addClass('anonymous')
	})
	$(document).on('click', '#close-anonymous-faces', function() {
		$('#anonymous-faces').hide();
		$('body').removeClass('anonymous')
	})
	$(document).on('click', '.submit-edit', function() {
		$(this).parents('.more-post-options-container').removeClass('active-tab')
		$(this).parents('.anonymous-cheeckbox').empty().hide()
	})
	$(document).on('click', '.close-wrapper', function() {
		$('#remote-invite-wrapper').hide()
		$('#navbar, #content-full2, #profile-account-id-wrapper, #profile-under-overlay, #content-profile, #trends-wrapper').removeClass('blurred')
		$('body').removeClass('overflow-hidden')
	})
	$(document).on('click', '#log-in, #sign-up, .login, #notice-to-sign',
		function(e) {
			$('#not-logged-in').hide()
			//e.preventDefault()
			$(
				'#navbar, #content-full2, #profile-account-id-wrapper, #profile-under-overlay, #content-profile, #nav-menu-wrapper, #trends-wrapper'
			).addClass('blurred')
			if ($(this).is('#log-in') || $(this).is('.login') || $(this).is(
					'#notice-to-sign')) {
				$('#remote-invite-wrapper').fadeIn(200)
				$('body').addClass('overflow-hidden')
			} else {
				$('#remote-signup-wrapper').fadeIn(200)
				$('body').addClass('overflow-hidden')
			}
		})
	$(document).on('click',
		'#remote-login-wrapper #log-in-wrapper, #remote-signup-wrapper #sign-up-wrapper',
		function(e) {
			e.stopPropagation();
		});
	$(document).on('click', '#remote-login-wrapper, #remote-signup-wrapper',
		function(e) {
			$('#not-logged-in').show()
			$(this).hide()
			$(
				'#navbar, #content-full2, #profile-account-id-wrapper, #profile-under-overlay, #content-profile'
			).removeClass('blurred')
			$('body').removeClass('overflow-hidden')
		})

	/*$(document).on('click', '.less-post-options', function(){
    $('#anonymous-image img').removeClass('chosen')
    $('.active-tab .anonymous-image-field').attr('value', '')
    $('.active-tab #anonnmous-image img').remove()
    $(this).parent().siblings('.more-post-options-container').removeClass('active-tab')
  })*/
	$(document).on('click',
		'#memes-content .anonymous-checkbox input[type="checkbox"]',
		function() {
			if ($(this).is(':checked')) {
				$('#created-meme-anonymous-field').prop('checked', true);
				console.log($('#created-meme-anonymous-field'))
			} else {
				$('#created-meme-anonymous-field').prop('checked', false);
			}
		})
	$(document).on('click', '#memes-tab', function() {
		$('.pick-meme-container').slice(0, 18).lazyload()
	})
	$(document).on('click', '#anonymous-faces img', function() {
		var facenumber = $(this).attr('data-facenumber')
		if ($('.choosen-content:visible').is('#meme-content')) {
			$('#created-meme-facenumber-field').attr('value', facenumber)
		}
		var facesrc = $(this).attr('src')
		$('#anonymous-faces img').removeClass('chosen')
		$('body').removeClass('anonymous')
		$('#anonymous-faces').hide()
		$('.choosen-content:visible .anonymous-image').css({
			'background-image': 'url(' + facesrc + ')'
		})
		$(this).clone().prependTo('.choosen-content:visible .anonymous-image')
		$('.choosen-content:visible .anonymous-image-field').addClass('given').attr(
			'value', $(this).attr('data-facenumber'))
		$(this).addClass('chosen')
		console.log($(this).attr('data-facenumber'))
		console.log($('.choosen-content:visible .anonymous-image-field').val())
	})
	$(document).on('keyup', '#make-post-title-2', function() {
		$('#make-post-title-3').val($('#make-post-title-2').val());
	})
	$(document).on('keyup', '.wrapper .post-title', function() {
		console.log($(this).val())
		$(this).parents('.left-wrapper').find('.post-title-field').attr('value', $(this).html())
	})
	$(document).on('keyup', '#sign-up-username-field', function() {
		$('#username-check-field').attr('value', $('#sign-up-username-field').val());
		$('#username-check-submit').click()
		$('#username-check-icon').show()
	})
	var usernameChecked = true;
	var emailChecked = true;
	$(document).on('keyup', '#username-field-settings', function() {
		$('#username-check-field').attr('value', $('#username-field-settings').val())
		$('#username-check-submit').click()
		usernameChecked = false
		$('#username-check-icon').show()
	})
	$(document).on('keyup', '#email-field-settings', function() {
		$('#email-check-field').attr('value', $('#email-field-settings').val())
		$('#email-check-submit').click()
		$('#email-check-icon').show()
		emailChecked = false
	})
	$(document).on('keyup', '#username-profile-big', function() {
		//$(this).text( $(this).text().toLowerCase().replace(/\s/g,'').replace("-", '').replace("!", '').replace("^", '').replace("%", '').replace("@", '').replace("$", '').replace("#", '').replace("&", '').replace("(", '').replace("(", '').replace(")", '') );
		console.log("changed")

		$('#profile-username-field').attr('value', $('#username-profile-big').text().toLowerCase().replace(/\s/g,'').replace("-", '').replace("!", '').replace("^", '').replace("%", '').replace("@", '').replace("$", '').replace("#", '').replace("&", '').replace("(", '').replace("(", '').replace(")", '') )
		$('#username-check-field').val($('#username-profile-big').text().toLowerCase().replace(/\s/g,'').replace("-", '').replace("!", '').replace("^", '').replace("%", '').replace("@", '').replace("$", '').replace("#", '').replace("&", '').replace("(", '').replace("(", '').replace(")", '') )
		$('#username-check-submit').click()
		usernameChecked = false;
		approvedUsername = false;
		$('#username-check-icon').show()


	})
	//})
	$(document).on('click', '#cancel-upload-2:not(.second)', function(e) {
		e.preventDefault();
		$('#pick-meme').show();
		$('#text-top, #created-meme-title, #text-bottom').val('')
		$('#meme-canvas').css({
			'height': '0px'
		})
		$(window).scrollTop(0);
	})
	$(document).on('click', '#reset-image', function() {
		$("#pictureInput").click();
	})
	$(document).on('click', '#more-settings-options-button', function(e) {
		$('#more-settings-options-wrapper').show();
		$('#less-settings-options-button').show()
		$('#more-settings-options-button').hide()
	})
	var tagsArray;
	$(document).on('click',
		'#share-buttons-settings span, #share-buttons-settings div',
		function() {
			$('#share-buttons-field').attr('value', $(this).attr('id'))
		})
	$(document).on('click', '#less-settings-options-button', function() {
		$('#more-settings-options-wrapper').hide()
		$('#less-settings-options-button').hide()
		$('#more-settings-options-button').show()
	})
	$(document).on('click', '#invite-tab-2', function() {
		$('#invite-buttons-wrapper').addClass("active")
		$('.invite-tab').removeClass('active-invite-tab')
		$(this).addClass('active-invite-tab')
		$('#invite-2').fadeIn(100);
		$('#invite-1').hide();
	})
	$(document).on('click', '#invite-tab-1', function() {
		$('#invite-buttons-wrapper').removeClass("active")
		$('.invite-tab').removeClass('active-invite-tab')
		$(this).addClass('active-invite-tab')
		$('#invite-2').hide();
		$('#invite-1').fadeIn(100);
	})
	$(document).on('click', '.post-user-follow, .post-user-unfollow, .follow, .unfollow', function() {
		//$(this).parents('form').attr('id', 'current-follow')
		$(this).attr('id', 'current-follow')
	})

	$(document).on('click', '.more-about-drolle', function() {
		$('p.describe-drolle.hidden').fadeIn()
		$('html, body').animate({
			scrollTop: $("body").height()
		}, 1500);
	})
	var followTagsArray = [];
	$(document).on('click', '#follow-tags-wrapper .tag:not(.unticked)', function() {
		$(this).addClass('unticked')
	})
	$(document).on('click', '#follow-tags-wrapper .tag.unticked', function() {
		$(this).removeClass('unticked')
	})

	$(document).on('click', '#follow-tags-submit', function() {
		for (i = 0; i <= $('#follow-tags-wrapper .tag:not(.unticked)').length; i++) {
			followTagsArray.push($('#follow-tags-wrapper .tag:not(.unticked)').eq(i).children('span').html())
			$('#follow-tags-field').val(followTagsArray)
			console.log(followTagsArray)
			//console.log( $('#follow-tags-field').val() )
		}
		$('#follow-tags-field').val(followTagsArray)
		if (!$('#follow-tags-field').val() == '') {
			$('#follow-tags-submit-field').click()
		}

	})
	$(document).on('click', '.make-tags i', function() {
		$('#make-tags-wrapper').show()
		console.log(tagsArray)
		tagsArray = []
		console.log(tagsArray)
	})
	var tagsArray;
	$(document).on('click', '.make-tag:not(.choosen-tag)', function() {
		if ($('.choosen-tag').length < 2) {
			var tagName = $(this).attr('id').replace('tag-', '')
			$('#done-tags').addClass('done-tags')
			$(this).addClass('choosen-tag')
			tagsArray.push(tagName);
			console.log(tagsArray)
		}
	})
	$(document).on('click', '.new-to-drolle-button', function() {
		$('#invite-tab-2, #notice-to-sign').click()
	})

	$(document).on('click', '.make-tag.choosen-tag', function() {
		var tagName = $(this).attr('id').replace('tag-', '')
		$(this).removeClass('choosen-tag')
		var tagIndex = tagsArray.indexOf(tagName);
		tagsArray.splice(tagIndex, 1)
		console.log(tagsArray)
		if ($('.choosen-tag').length == 0) {
			$('#done-tags').removeClass('done-tags')
		}
	})
	$(document).on('click', '#done-tags', function() {
		$('#make-tags-wrapper').fadeOut(100)
		$('.choosen-content .tag-list-field').val(tagsArray)
	})
	$(document).on('click', '#go-back', function() { $("#new-posts").click() })
	$(document).on('click', '#new-posts', function() {
		$("#content-full2").addClass("transition")
		if ( $(this).hasClass("active") ) {

			$(this).removeClass("active")
			$("#box-5-wrapper").removeClass("active")
			$("#content-full2").removeClass("go-left")
			//$("#box-5-wrapper").removeClass("go-left-2")
			//$("#box-5-wrapper").css({"left":"65px"})
			/*
			$("#box-5-wrapper").animate({
				right: 65,
				left: 'toggle'
			})
			*/
		}
		else {
			$('#box-5-wrapper .wrapper-new-2').addClass("no-opacity no-click")


			$(this).addClass("active")
			$("#box-5-wrapper").addClass("active")
		$("#content-full2").addClass("go-left")
		//$("#box-5-wrapper").addClass("go-left-2")
		//$("#box-5-wrapper").css({"left":"65px"})
		/*
		$("#box-5-wrapper").animate({
			left: 65
		})
		*/
		}
		setTimeout(function(){
				var $content3 = $('.reco-trend');
				$content3.imagesLoaded(function() {
				$content3.masonry({
					itemSelector: '.wrapper-new-2',
					gutter: 20
				});
				});
				$('#box-5-wrapper .wrapper-new-2').removeClass("no-opacity no-click")
			}, 900)


	})
	var loadnew;

	$("#box-5-wrapper img").lazyload({
		event: "loadnew"
	});
	$("#box-5-wrapper img").trigger("loadnew")
	$(document).on('click', '#save-settings-before', function() {
		if (!$('#more-settings-options-wrapper').is(':visible')) {
			$('#new-password-field').val('')
		}
		if (usernameChecked === true) {
			if ($('#username-check-icon').text() == 'cancel') {
				setTimeout(function() {
					$('#username-check-icon').removeClass('flash animated-fast')
				}, 1000)
			} else {
				$('body:not(.app) #save-settings').click()
				if ($('body').hasClass('app')) {
					app.save()
				}
			}
		} else {
			$('#check-username-submit').click()
			setTimeout(function() {
				$('body:not(.app) #save-settings-before').click()
				if ($('body').hasClass('app')) {
					app.save()
				}
			}, 2000)
		}
	})
	var image1 = false;
	var image2 = false;
	$(document).on('click', '.before-submit-edit', function() {
		if ($(this).siblings('#anonymous-image').children('img').length > 0) {
			$(this).siblings('.submit-edit').click()
		} else {
			$(this).siblings('.anonymous-image').removeClass('buzz').hide().show().addClass(
				'buzz')
		}
	})
	$(document).on('click', '#submit-image-button-before', function() {
		console.log('submit is clicked')
		if (image1 == false) {
			if ($('.choosen-content input[type="checkbox"]:checked').length && $('.choosen-content:visible .anonymous-image').children('img').length < 1) {
				$('.choosen-content:visible .anonymous-image').removeClass('buzz').hide()
					.show().addClass('buzz')
			} else if ($('#images-content-wrapper .inline-make-tags-wrapper .active-make-tag').length == 0) {
				$('#images-content-wrapper .inline-make-tags-wrapper').removeClass('buzz').hide()
					.show().addClass('buzz')
			} else {
				var makeTagsArray = [];
				for (i = 0; i < $('#images-content-wrapper .inline-make-tags-wrapper .active-make-tag').length; i++) {
					makeTagsArray.push($('#images-content-wrapper .inline-make-tags-wrapper .active-make-tag').eq(i).attr('id').replace('tag-', ''))
				}
				$('#images-content-wrapper .tag-list-field').val(makeTagsArray)
				//alert(makeTagsArray)
				$('#submit-image-button').click()
				$(this).hide()
				$(this).siblings('button, .anonymous-checkbox').hide()
				$(this).siblings('.loading-icon').addClass('loading-animation')
				image1 = true
			}
		} else {
			//alert('samir')
		}
	})
	$(document).on('click', '.app a', function(e) {
		e.preventDefault();
	})
	$(document).on('click', '#created-image-button-before', function() {
		var memeCanvas = document.getElementById('meme-canvas');
		var dataURL3 = memeCanvas.toDataURL();
		$('#base64').val(dataURL3)
		if (image2 == false) {
			if ($('.choosen-content input[type="checkbox"]:checked').length && $('.choosen-content:visible .anonymous-image').children('img').length < 1) {
				$('.choosen-content:visible .anonymous-image').removeClass('buzz').hide()
					.show().addClass('buzz')
			} else if ($('#memes-content .inline-make-tags-wrapper .active-make-tag').length == 0) {
				$('#memes-content .inline-make-tags-wrapper').removeClass('buzz').hide()
					.show().addClass('buzz')
			} else {
				$('#submit-button-before-wrapper .loading-icon').addClass('loading-animation');
				$('#submit-button-before-wrapper').children().hide()
				setTimeout(function() {
					var makeTagsArray = [];
					for (i = 0; i < $('#memes-content .inline-make-tags-wrapper .active-make-tag').length; i++) {
						makeTagsArray.push($('#memes-content .inline-make-tags-wrapper .active-make-tag').eq(i).attr('id').replace('tag-', ''))
					}
					$('.memetextareas').hide();
					$('#created-meme-title').css({
						'pointer-events': 'none'
					}).attr('placeholder', '');
					$('#memes-content .tag-list-field').val(makeTagsArray)
					console.log(makeTagsArray)
					$("#submit-image-button-2").click();
					image2 = true
				}, 1200)
			}
		} else {
			console.log('a')
		}
	})
	////////////////////////////////////////////
	$(document).on('click', '#memegen-button', function() {
		if ($('#base64').val() == '') {

		}
		var memeCanvas = document.getElementById('meme-canvas');
		if ($('.choosen-content input[type="checkbox"]:checked').length && $('.choosen-content:visible .anonymous-image').children('img').length < 1) {
			$('.choosen-content:visible .anonymous-image').removeClass('buzz').hide()
				.show().addClass('buzz')
		} else if ($('#memes-content .inline-make-tags-wrapper .active-make-tag').length == 0) {
			$('#memes-content .inline-make-tags-wrapper').removeClass('buzz').hide()
				.show().addClass('buzz')
		} else {
			$('#submit-button-before-wrapper .loading-icon').addClass('loading-animation');
			$('#submit-button-before-wrapper').children().hide()
			setTimeout(function() {
				var makeTagsArray = [];
				for (i = 0; i < $('#memes-content .inline-make-tags-wrapper .active-make-tag').length; i++) {
					makeTagsArray.push($('#memes-content .inline-make-tags-wrapper .active-make-tag').eq(i).attr('id').replace('tag-', ''))
				}
				$('.memetextareas, #memegen-button').hide();
				$('#created-meme-title').css({
					'pointer-events': 'none'
				}).attr('placeholder', '');
				$('#memes-content .tag-list-field').val(makeTagsArray)
				console.log(makeTagsArray)
				$("#submit-image-button-2").click();
				image2 = true
			}, 1200)
		}

	})
	console.log('tabs.js working');
	//(function($) {

	/*$(document).ready(function($) {
		var $container = $('#left-content-profile');
		console.log($container)
		//$container.imagesLoaded(function() {
			$container.masonry({
				itemSelector: '.wrapper',
				gutter: 10
			});
			console.log('worked?')
		//});
		var $container2 = $('#right-content-profile');
		//$container2.imagesLoaded(function() {
			$container2.masonry({
				itemSelector: '.wrapper',
				gutter: 10
			});
			console.log('worked?')
		//});
		$('.customer.share').on("click", function(e) {
			$(this).customerPopup(e);
		});
	});*/
	//}(jQuery));
	$("#search-memes").keyup(function() {
		console.log('search-meme working')
		//$(this).addClass('hidden');
		var searchTerm = $("#search-memes").val();
		if (searchTerm != '') {
			var listItem = $('#pick-meme').children(
				'.pick-meme-container .meme-title');
			var searchSplit = searchTerm.replace(/ /g, "'):containsi('")
			//extends :contains to be case insensitive
			$.extend($.expr[':'], {
				'containsi': function(elem, i, match, array) {
					return (elem.textContent || elem.innerText || '').toLowerCase().indexOf(
						(match[3] || "").toLowerCase()) >= 0;
				}
			});
			$("#pick-meme .meme-title").not(":containsi('" + searchSplit + "')").each(
				function(e) {
					$(this).parents('.pick-meme-container').addClass('hidden-meme')
				});
			$("#pick-meme .meme-title:containsi('" + searchSplit + "')").each(
				function(e) {
					$(this).removeClass('hidden-meme')

				});
			//var jobCount = $('#list .in').length;
			//$('.list-count').text(jobCount + ' items');
			//shows empty state text when no jobs found
			/*if(jobCount == '0') {
    $('#list').addClass('empty');
  }
  else {
    $('#list').removeClass('empty');
  }*/
		} else {
			$('.pick-meme-container').removeClass('hidden-meme')
			alert('ss')
		}
	});
	$('.progress').mouseover(function() {
		$('#progress-table').fadeIn()
	})
	$('.progress').mouseleave(function() {
		$('#progress-table').fadeOut()
	})

	$(document).on('click', '.pause-video', function(e) {
		e.stopPropagation();
		e.preventDefault();
		video = $(this).siblings('.post-video')
		$(video).addClass('hidden')
		$(video).prop('muted', true)
		$(video).parents('.post-image-wrapper').removeClass('playing')
		$(video).siblings('.play-video').show()
		$(video).siblings('.video-volume').addClass('hidden-imp')
		$(video)[0].pause()
	})

	$(document).on('click', '.play-video', function(e) {
		e.stopPropagation();
		var video = $(this).siblings('.post-video')
		if ($(video).hasClass('hidden-imp')) {

			if (!$(video).hasClass('played')) {
				$(video)[0].currentTime = 0;
				$(video).addClass('played')
			}
			$(video).removeClass('hidden-imp')
			$(video).siblings('.play-video').fadeOut()
			$(video).siblings('.post-image:not(.video-post)').hide()
			$(video).siblings('.video-volume').fadeIn()
			$(video).parents('.post-image-wrapper').addClass('playing')
			$(video).siblings('.video-volume').removeClass('hidden-imp')
			$(video)[0].play()
		} else {
			$(video).addClass('hidden-imp')
			$(video).parents('.post-image-wrapper').removeClass('playing')
			$(video).siblings('.play-video, .post-image:not(.video-post)').show()
			$(video).siblings('.video-volume').addClass('hidden-imp')
			$(video)[0].pause()
		}
	})

	$(document).on('click', '#notif-menu a', function(e) {
		e.preventDefault();
		app.openActivity($(this).parents('a').attr('href'))
	})
	$(document).on('click', '.app#profile .profile-post', function(e) {
		e.preventDefault();
		console.log($(this).parents('a').attr('href'))
		app.openPost($(this).parents('a').attr('href'))

	})
	$(window).scroll(function(event) {
		if ($(this).scrollTop() > 44) {
			//console.log("sssss")
			$('#nav-menu-wrapper').addClass('fixed-menu')
			$("#go-back").addClass("fixed")
			$("#box-3-wrapper, #box-4-wrapper").addClass("fixed-sides")
		} else {
			//console.log("sssss")
			$("#go-back").removeClass("fixed")
			$('#nav-menu-wrapper').removeClass('fixed-menu')
			$("#box-3-wrapper, #box-4-wrapper").removeClass("fixed-sides")
		}
	})
	/*
	var lastScrollTop2 = 0;
	var appBarStatus = false;
	$(window).scroll(function(event){
	   var st2 = $(this).scrollTop();
	   if (st2 > lastScrollTop2 ){
	       $('body').addClass('blurred')
	       app.toggleTools(false);
	       appBarStatus = false;
	   }
	   else{
	      $('body').removeClass('blurred')
	      app.toggleTools(true);
	      appBarStatus = true;
	   }
	   lastScrollTop2 = st2;
	});
	*/
	/*
	$(window).on('wheel', function(){
	  //whichDirection(event);
	  console.log( event )
	});
	*/
	//(function () {

	/*
    var previousScroll = 0;
	var appBarStatus = false;
    $(window).scroll(function(){
       var currentScroll = $(this).scrollTop();
       if (currentScroll > previousScroll && appBarStatus){
           //alert('down');
           $('body').addClass('blurred')
	       appBarStatus = false;
	       app.toggleTools(false);
       }
       else if ( !(currentScroll > previousScroll)  && appBarStatus ==  false) {
          //alert('up');
          $('body').removeClass('blurred')
          appBarStatus = true;
	      app.toggleTools(true);

       }
       previousScroll = currentScroll;
    });
    */
	setTimeout(function() {
		app.toggleTools(false);
	}, 3000)

	//}()); //run this anonymous function immediately
	$(document).on('click', '.app#recent .post-footer-user-image', function(e) {
		e.preventDefault();
		app.openActivity($(this).parents('a').attr('href'), $(this).parents('a').attr('href'))
	})
	$(document).on('click', '.app#index .post-footer-user-image', function(e) {
		e.preventDefault();
		app.openActivity($(this).parents('a').attr('href'))
	})
	$(document).on('click', '#cancel-upload-3', function(e) {
		$("#clear-button").click();
	})

	/*
	$(document).on('click', '.app#recent .user-link ', function() {
		$(this).hide();
		app.openActivity( $(this).attr('href') )
	})
	*/
	$(document).on('click', '.app .pointered ', function() {
		app.openActivity($(this).attr('data-a'))
	})

	$(document).on('click', '.app .share-buttons a', function() {
		app.sharePost($(this).attr('href'))
	})
	$(document).on('click', '.app.shown-post .post-tags-wrapper a', function() {
		app.openActivity($(this).attr('href'))
	})
	$(document).on('click', '.app a[href="/settings/?app=true"]', function() {
		app.openActivity($(this).attr('href'), "Settings")
	})
	$(document).on('click', '.app .settings-logout', function() {
		app.logout()
	})
	/*
	$(document).on('click', '.app #save-settings-before.settings-save', function(e) {
		e.preventDefault();
		app.save()
	})
	*/
	$('#tags-wrapper a, #trends-wrapper > a').css({
		'pointer-events': 'auto'
	});

	$(document).on('click', '.app #tags-wrapper a,.app #trends-wrapper > a', function(e) {
		e.preventDefault();
		var name = $(this).attr('data-name');
		app.openActivity($(this).attr('href'), name)
	})
	$(document).on('click', '#tags-wrapper-2 a', function(e) {
		e.preventDefault();

		var name = $(this).attr('data-name');
		app.openActivity($(this).attr('href'), name)
	})

	$(document).on('click', '#submit-video-before', function() {
		if ($('#video-base64').attr('value') != '') {
			if ($('#make-tags-wrapper-4 .active-make-tag').length > 0) {
				if ($('.choosen-content input[type="checkbox"]:checked').length && $('.choosen-content:visible .anonymous-image').children('img').length < 1) {
					$('.choosen-content:visible .anonymous-image').removeClass('buzz').hide()
						.show().addClass('buzz')
				} else {
					var makeTagsArray = [];
					for (i = 0; i < $('#video-content .inline-make-tags-wrapper .active-make-tag').length; i++) {
						makeTagsArray.push($('#video-content .inline-make-tags-wrapper .active-make-tag').eq(i).attr('id').replace('tag-', ''))
					}
					$('#video-content .tag-list-field').val(makeTagsArray)
					$('#submit-video').click()
				}
			} else {
				$('#make-tags-wrapper-4').removeClass('buzz').hide().show().addClass('buzz')
			}
		}
	})

	/*$(document).on('load', '.post-video', function(){
	pauseVideo( $(this).attr('data-post-id') )
	})

	$('.post-video').each("loadstart", function () {
		alert('paused')
	}, false);
	*/
	//pauseVideo(86)
	$(document).on('click', '.more-post-options', function() {
		console.log($(this).parents('.post-footer').siblings(
			'.more-post-options-container'))
		console.log($(this).parents('.left-wrapper').find(
			'.more-post-options-container'))
		if ($(this).parents('.left-wrapper').find('.more-post-options-container').hasClass(
				'active-tab')) {
			$(this).parents('.left-wrapper').find('.post-title').attr('contentEditable', 'false')
			$(this).parents('.wrapper').find('.post-title').removeClass('focus')
			$('#anonymous-faces img').removeClass('chosen')
			$('.choosen-content:visible .anonymous-image-field').attr('value', '')
			$('.choosen-content:visible .anonymous-image img').remove()
			$('.choosen-content:visible .anonymous-checkbox input[type="checkbox"]').prop(
				'checked', false);
			$('.more-post-options-container').removeClass(
				'active-tab choosen-content')
			//$(this).parent().siblings('.more-post-options-container').removeClass('active-tab')
		} else {
			$('#anonymous-faces img').removeClass('chosen')
			$('.choosen-content:visible .anonymous-image-field').attr('value', '')
			$('.choosen-content:visible .anonymous-image img').remove()
			$('.choosen-content:visible .anonymous-checkbox input[type="checkbox"]').prop(
				'checked', false);
			$('.more-post-options-container').removeClass(
				'active-tab choosen-content')
			$(this).parents('.post-footer').siblings('.more-post-options-container').addClass(
				'active-tab choosen-content')
			console.log('shown???')
			if (!$(this).hasClass('share-button')) {
				$(this).parents('.left-wrapper').find('.post-title').attr('contentEditable', 'true')
				$(this).parents('.wrapper').find('.post-title').addClass('focus')
			}

		}
	})
	/*setTimeout(function() {
	    var $container = $('#left-content-profile');
	    setTimeout(function(){
	    	$container.masonry({
		itemSelector: '.wrapper',
		gutter: 5
	});
	*/

	$(function() {
		var $content = $('#left-content-profile');
		$content.imagesLoaded(function() {
			$content.masonry({
				itemSelector: '.wrapper',
				gutter: 5
			});
			$('#left-content-profile').removeClass("opacity");
		});
		var $content2 = $('#right-content-profile');
		$content2.imagesLoaded(function() {
			$content2.masonry({
				itemSelector: '.wrapper',
				gutter: 5
			});
			//$('#left-content-profile').removeClass("opacity");
		});

	});

	//$('#left-content-profile').fadeIn();
	//    }, 1000)

	/*setTimeout(function(){
		var $container2 = $('#right-content-profile');
		$container2.masonry({
			itemSelector: '.wrapper',
			gutter: 5
		});
	})
	*/
	//}, 200)

	video64 = function() {
		var file = document.querySelector('#make-video-input').files[0];
		var reader = new FileReader();
		reader.readAsDataURL(file);
		reader.onload = function() {
			$('#make-video-input, #make-video-p').hide()
			$('#make-video-options, #submit-video-before, #make-video-buttons, #cancel-video').addClass('inline-block-imp')
			$('#make-video-preview').removeClass('hidden')
			var theVideo = $('#make-video-preview')
			$('#make-video-preview').attr('src', reader.result)
			//alert( $(theVideo)[0].duration )
			/*$('#make-video-preview').on('loadeddata', function(){
				//$(this)[0].play()
			//alert( $(theVideo)[0].duration )
			if (  $(theVideo)[0].duration > 30  ) {
				alert('more than 30')
			}
			})
			*/

			$('#video-base64').attr('value', reader.result)
		};
		reader.onerror = function(error) {
			console.log('Error: ', error);
		};
		var file = event.target.files[0];
		var fileReader = new FileReader();
		fileReader.onload = function() {
			var blob = new Blob([fileReader.result], {
				type: file.type
			});
			var url = URL.createObjectURL(blob);
			var video = document.createElement('video');
			var timeupdate = function() {
				if (snapImage()) {
					video.removeEventListener('timeupdate', timeupdate);
					video.pause();
				}
			};
			video.addEventListener('loadeddata', function() {
				if (snapImage()) {
					video.removeEventListener('timeupdate', timeupdate);
				}
			});
			var snapImage = function() {
				var canvas = document.createElement('canvas');
				canvas.width = video.videoWidth;
				canvas.height = video.videoHeight;
				canvas.getContext('2d').drawImage(video, 0, 0, canvas.width, canvas.height);
				var image = canvas.toDataURL();
				var success = image.length > 100000;
				if (success) {
					/*var img = document.createElement('img');
					img.src = image;
					document.getElementsByTagName('div')[0].appendChild(img);
					*/
					$('#video-image-base64-field').attr('value', image)
					URL.revokeObjectURL(url);
				}
				return success;
			};
			video.addEventListener('timeupdate', timeupdate);
			video.preload = 'metadata';
			video.src = url;
			// Load video in Safari / IE11
			video.muted = true;
			video.playsInline = true;
			video.play();
		};
		fileReader.readAsArrayBuffer(file);
	}

	//app.openActivity('sssssssssssssssssssssssssssssssssssssssssss')

	var previousScroll = 0;
	var lastScrollTop = 0;
	var toUp = false;
	$(window).scroll(function(event) {
		var st = $(this).scrollTop();
		if (st < lastScrollTop && lastScrollTop > 800) {
			toUp = true
			setTimeout(function() {
				if (toUp == true && lastScrollTop > 800) {
					$('#scroll-up').fadeIn(100)
				}
			}, 800)
		} else {
			toUp = false
			$('#scroll-up').hide()
		}
		lastScrollTop = st;
	});
	//alert('tabs')
	function previewPostImage(event, thisFiler, thisPreview) {
		console.log(thisPreview)
		var files = event.target.files;
		var image = files[0]
		var reader = new FileReader();
		reader.onload = function(file) {
			var img = new Image();
			alert('working')
			console.log(file);
			img.src = file.target.result;
			$('#make-image-preview').children('img').remove()
			$('#make-image-preview').append(img);
			$('#make-image-preview').css({
				'min-height': $('#make-image-preview img').height()
			});
			$('#pictureInput, #preview-image-text').hide()
			$('#image-for-gif-wrapper').hide()
			$('#image-for-gif-reset').show()
		}
		reader.readAsDataURL(image);
		/*$('#make-tags-1-wrapper, #cancel-upload, #reset-image, #submit-image-button-before').show()
		$('.anonymous-checkbox').addClass('shown')
		$('#make-tags-1').addClass('inline-block-imp')*/
	};
};
//tabs();
$(document).on('page:load', tabs);
$(document).ready(tabs)
var video64;

function previewPostImage(event, thisFiler, thisPreview) {
	console.log(thisPreview)
	var files = event.target.files;
	var image = files[0]
	var reader = new FileReader();
	reader.onload = function(file) {
		var img = new Image();
		console.log(file);
		img.src = file.target.result;
		$('#make-image-preview').children('img').remove()
		$('#make-image-preview').append(img);
		$('#make-image-preview').css({
			'min-height': $('#make-image-preview img').height()
		});
		$('#pictureInput, #preview-image-text').hide()
		$('#image-for-gif-wrapper, .make-dark-box').hide()
		$('#image-for-gif-reset').show()
	}
	reader.readAsDataURL(image);
	$('#cancel-upload, #reset-image, #submit-image-button-before,  #make-image-preview, #make-post-title, #make-gif-preview, #make-post-title').show()
	$('#make-tags-1-wrapper').css('inline-imp')
	$('.anonymous-checkbox').addClass('shown')
	$('#make-tags-1').addClass('inline-block-imp')
};