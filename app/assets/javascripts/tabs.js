var tabs;
tabs = function() {
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
			var points = $(this).siblings('.post-votes-word').attr('data-points')
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
			$(this).siblings('.post-votes-word').hide().fadeIn(200).text(Number(
				points) + Number(userVotes) + " " + votesWords)
			$(this).siblings('.post-votes-word').attr('data-user-votes', userVotes)
		}
	});
	var $container = $('#left-content-profile');
	console.log($container)
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
	$(document).on('click', '.inline-make-tags-wrapper p', function() {
		//alert('clicked')
		if ($(this).hasClass('active-make-tag') ) {
			$(this).removeClass('active-make-tag')
		}
		else {
			$(this).addClass('active-make-tag')
		}
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
	$(document).on('click', '.delete-stock', function(e){
		if ( toDeleteStock == true ) {
			toDeleteStock = false;
			$(this).siblings('form').find('input[type="submit"]').click()
			$(this).parent().remove()
			setTimeout(function(){
				toDeleteStock = true
			}, 300)	
		}
	})
	var toStock = true;
	$(document).on('click', '#add-stocks-bar-left', function(){
		if ( toStock == true ) {
			console.log('clicked')
			$('#stock-base64').val($('#add-stocks-bar').val())
			setTimeout(function(){
				$('#submit-stock').click()
			}, 100)
			toStock = false;
			setTimeout(function(){
				$('#stock-base64').val('')	
				$('#add-stocks-bar').val('')
			}, 300)	
			setTimeout(function(){
				toStock = true;
			}, 1000)
		}
	    
	})
	var touploadmemestock = false
	$('#upload-meme-stock').click(function(){
		if ( touploadmemestock == false ) {
			alert('clicked')
			touploadmemestock = true
			$('#upload-meme-stock-field').val( $('#upload-meme-stock-input').val()  )
			$('#upload-meme-stock-submit').click()
			$('#upload-meme-stock-input, #upload-meme-stock-field').val('')
		}
		setTimeout(function(){
			touploadmemestock = false
		}, 400)
		
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
	})
	$(document).on('click', '#menu-button-wrapper', function() {
		$(this).addClass('shown')
		$('#notification-icon, #nav-icons-wrapper a').fadeIn(100)
	})
	$(document).on('keyup', '#sign-up-username-field', function() {
		$(this).val($(this).val().toLowerCase())
		console.log($(this).val())
	})
	$(document).on('mouseleave', '#nav-icons-wrapper', function() {
		if (window.innerWidth <= 850) {
			$('#menu-button-wrapper').removeClass('shown')
			$('#notification-icon, #nav-icons-wrapper a').hide()
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
		console.log('sssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss')
		$(document).ready(function(){
			$('#right-content-profile').masonry({
	  			itemSelector: '.wrapper',
	  			gutter: 5
	  		});
		})
		
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
		console.log( $(".wrapper:visible .giphy-id-make", parent.document.body) )
		$(".wrapper:visible .comment-html, .memes-emojis", parent.document.body).hide();
		$(".wrapper:visible .cancel-meme", parent.document.body).removeClass(
			'hidden-imp');
		$(".wrapper:visible .make-giphy-image", parent.document.body).attr("src",
		$(this).attr('data-src')  ).fadeIn(200)
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
		'#share-buttons-settings div, #share-buttons-settings span', function() {
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
			if (!$(this).parents('.wrapper').hasClass('shown')) {
				console.log('clicked')
				thisWrapper = $(this).parents('.wrapper')
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
				$('body').addClass('shown-post')
				window.scrollTo(0, $('body').offset().top);
			}
		})
	$(document).on('click', '#scroll-up', function() {
		$(this).hide();
		window.scrollTo(0, $('body').offset().top);
	})
	$(document).on('click', '#image-for-meme-add', function() {
		$('#image-for-meme').addClass('stopped')
		$('#image-for-meme-img').attr('src', $('#image-for-meme-input').val())
		//$('#image-for-meme-field').attr('value', $('#image-for-meme-img').attr('src'))
		$('#image-for-meme-img').load(function(){
			$('#image-for-meme-field').attr('value', $('#image-for-meme-img').attr('src'))
		//$('#image-for-meme-field').attr('value', $('#image-for-meme-input').val())
		$('#image-for-meme').removeClass('stopped')
		$('#image-for-meme-input').val('')
		$('#image-for-meme').hide()
		$('#image-for-meme-reset').show()
		})
		setTimeout(function(){
			if ( $('#image-for-meme-img').height() < 50 ){
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
		if ( !$('#image-for-gif-input').val() == '' && $('#make-image-preview img').length < 1) {
			imageforgifadd = true
			$('#make-post-preview').addClass('stopped')
			$('#make-image-preview').children('img').remove()
			var image = $('<img src="'+ $('#image-for-gif-input').val() +'" >');
			$('#make-image-preview').append(image)
			$('#make-image-preview').css({
				'min-height': $('#make-image-preview img').height()
			});
			$('#image-for-gif-wrapper').hide()
			$('#pictureInput, #preview-image-text').hide()
			$(image).load(function(){
			$('#iamge-for-gif-reset').show()
			$('#image-for-gif-field').attr('value', $(image).attr('src'))
			$('#image-for-gif-input').val('')
			$('#image-for-gif-reset').show()
			$('#make-image-preview').removeClass('stopped')
			console.log('image is loaded')
			
			//$('#cancel-upload, #submit-image-button-before').show()
			//$('#make-tags-1-wrapper').addClass('inline-block-imp')
			//$('.anonymous-checkbox').addClass('shown')
			//$('#make-tags-1').addClass('inline-block-imp')
		})
		setTimeout(function(){
			if ( $(image).height() < 50 ){
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
			}
		}, 2000)
		}
		
		
		//$('#pictureInput, #preview-image-text').hide()
		//$('#cancel-upload, #submit-image-button-before').show()
		//$('#make-tags-1-wrapper').addClass('inline-block-imp')
		//$('.anonymous-checkbox').addClass('shown')
		//$('#make-tags-1').addClass('inline-block-imp')
	})
	$(document).on('click', '#image-for-gif-reset', function(){
		console.log('oh shitt')
		var image  = $('#make-image-preview img')
		$('#image-for-gif-field').attr('value', '')
		$('#image-for-gif-input').val('')
		$(image).remove()
		$('#image-for-gif-wrapper').fadeIn()
		$('#pictureInput, #preview-image-text').show()
		$('#cancel-upload, #submit-image-button-before').hide()
		$('#make-tags-1-wrapper').removeClass('inline-block-imp')
		$('.anonymous-checkbox').removeClass('shown')
		$('#make-tags-1').removeClass('inline-block-imp')
		$('#make-image-preview').css({
			'min-height': '100px'
		});
		$('#image-for-gif-reset').hide()
		$("#make-post-preview-wrapper #pictureInput").replaceWith($("#make-post-preview-wrapper #pictureInput").val('').clone(true));
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
	$(document).on('click', 'body:not(#show) #back-list', function() {
		if ($('body').is('#show')) {
			console.log('redirected to recent')
			//window.location = '/recent'
			//$('#logo').parent('a').click()
		} else {
			if ($('.wrapper.shown .middle-wrapper').is(':visible')) {
				$('.wrapper.shown .comment-button').click()
			}
			$('.wrapper').show().css({
				'width': '550px'
			}).removeClass('shown')
			$('body').removeClass('shown-post')
			$('.right-wrapper').hide()
			setTimeout(function() {
				window.scrollTo(0, $(thisWrapper).offset().top);
			}, 10)
		}
	})
	$(document).on('click', '#next-post-icon', function() {
		if (!$('body').hasClass('loadingPost') && !$(thisWrapper).is($('.wrapper')
			.last())) {
			if ($(thisWrapper).next('.wrapper').length == 0 && $('body').hasClass(
				'loadingPost')) {
				$('.loadingPost-icon').addClass('loading-animation')
				var loadingPostInterval = setInterval(function() {
					if ($(thisWrapper).next('.wrapper').length == 0) {
						$('.loadingPost-icon').removeClass('loading-animation')
						clearInterval(loadingPostInterval)
						$('#next-post-icon').click()
					}
				}, 400);
			} else if ($(thisWrapper).next('.wrapper').length == 0 && !$('body').hasClass(
				'loadingPost')) {
				if ($('.pagination').length > 0) {
					$('body').addClass('loadingPost')
					var theurll = $('.pagination a.next_page').attr('href')
					$.getScript(theurll)
					$('.loadingPost-icon').addClass('loading-animation')
					var loadingPostInterval = setInterval(function() {
						console.log('next')
						if ($(thisWrapper).next('.wrapper').length > 0) {
							$('.loadingPost-icon').removeClass('loading-animation')
							clearInterval(loadingPostInterval)
							$('#next-post-icon').click()
						}
					}, 400);
				}
			} else if ($(thisWrapper).next('.wrapper').length > 0) {
				console.log('post loaded successfully')
				$('.loadingPost-icon').removeClass('loading-animation')
				$(thisWrapper).hide().css({
					'width': '550px'
				}).removeClass('shown')
				thisWrapper = $(thisWrapper).next('.wrapper').show().css({
					'width': '600px'
				}).addClass('shown')
				$('html, body').animate({
					scrollTop: $('body').offset().top
				}, 200);
				if (!$(thisWrapper).children('.right-wrapper').hasClass('shown')) {
					$(thisWrapper).find('#loadPost').children('form').children(
						'input[type="submit"]:not(.removed)').eq(0).click().addClass(
						'removed')
					$('.shown.wrapper .right-wrapper').addClass('loading-2')
				}
				if ($('.wrapper').eq($('.wrapper').length - 3)) {
					if (!$('body').hasClass('loadingPost') && $('.pagination').length > 0) {
						//$('.loadingPost-icon').removeClass('loading-animation')
						var theurlll = $('.pagination a.next_page').attr('href')
						$.getScript(theurlll)
					}
				}
				console.log('the post has been loaded right?')
			}
		} else {
			$('#back-list').click()
		}
	})
	$(document).on('click', '#prev-post-icon', function() {
			if (!$('.wrapper').eq(0).hasClass('shown')) {
				$(thisWrapper).hide().css({
					'width': '550px'
				}).removeClass('shown')
				thisWrapper = $(thisWrapper).prev('.wrapper').show().css({
					'width': '600px'
				}).addClass('shown')
				$('html, body').animate({
					scrollTop: $('body').offset().top
				}, 200);
				if (!$(thisWrapper).children('.right-wrapper').hasClass('shown')) {
					$(thisWrapper).find('#loadPost').children('form').children(
						'input[type="submit"]').eq(0).click()
					$('.shown.wrapper .right-wrapper').addClass('loading-2')
					console.log($(thisWrapper).children('.left-wrapper'))
				}
			} else {
				$('#back-list').click()
			}
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
		if ( e.keyCode == 13 && $('body').is('#make') ) {
			e.preventDefault()
			return false
		}
	})
	$(document).on('keyup', function(e) {
		if (!$("input,textarea,.post-comment-body-2.post-comment-body").is(
			":focus")) {
			if (e.keyCode == 37) {
				if ($('body').hasClass('shown-post')) {
					$('#prev-post-icon').click()
				}
			} else if (e.keyCode == 39) {
				if ($('body').hasClass('shown-post')) {
					$('#next-post-icon').click()
				}
			} else if (e.keyCode == 8) {
				if ($('body').hasClass('shown-post')) {
					e.preventDefault()
					$('#back-list').click()
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
	var toComment = true
	$(document).on('click', '.post-comment', function() {
		if ( toComment == true ){
			var thisCommentBody = $(this).parents('form')
			if ($(thisCommentBody).find('.post-comment-body-2.post-comment-body').html() ==
				'' && $('.shown.wrapper .base64-make').val() == '' &&  $('.shown.wrapper .giphy-id-make').val() == '' ) {
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
		}
		else {
			console.log('sss')
		}
		
	})
	$(document).on('click', '.comment-button', function() {
		$('.middle-wrapper').removeClass('buzz')
		toPost = true;
		if (commentopen == false) {
			$('.middle-wrapper').show();
			setTimeout(function() {
				$('.wrapper.shown .post-comment-body-2.post-comment-body').eq(0).focus()
			}, 100)
			commentopen = true
		} else {
			$('.middle-wrapper').hide();
			commentopen = false
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
		originalCover = $('#profile-under-overlay').css('background-image');
		originalImage = $('#profile-photo').css('background-image');
		originalBio = $('#username-profile').text()
		originalUsername = $('#username-profile-big').text()
		$('#edit-profile-image, #edit-profile-cover').show();
		$(this).hide();
		$('#cancel-edit-profile, #profile #username-check-icon').show()
		$('#save-profile').show().addClass('left-margined')
		document.getElementById('username-profile').contentEditable = 'true';
		document.getElementById('username-profile-big').contentEditable = 'true';
	})
	$(document).on('click', '#sign-up-2', function() {
		console.log('clicked')
		$('#remote-login-wrapper').click()
		$('#sign-up').click()
	})
	$(document).on('click', '#save-profile', function() {
			if (usernameChecked === true) {
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
		usernameChecked = true;
		$('#username-check-icon').show()
	})
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
	$(".pick-meme-container").lazyload();
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
		$('#navbar, #content-full2, #profile-account-id-wrapper, #profile-under-overlay, #content-profile').removeClass('blurred')
			$('body').removeClass('overflow-hidden')
	})
	$(document).on('click', '#log-in, #sign-up, .login, #notice-to-sign',
		function(e) {
			$('#not-logged-in').hide()
			//e.preventDefault()
			$(
				'#navbar, #content-full2, #profile-account-id-wrapper, #profile-under-overlay, #content-profile'
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
		'#memes-content .anonymous-checkbox input[type="checkbox"]', function() {
			if ($(this).is(':checked')) {
				$('#created-meme-anonymous-field').prop('checked', true);
				console.log($('#created-meme-anonymous-field'))
			} else {
				$('#created-meme-anonymous-field').prop('checked', false);
			}
		})
		$(document).on('click', '#memes-tab', function() {
			$('.pick-meme-container').slice(0,18).lazyload()
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
		$(this).parents('.left-wrapper').find('.post-title-field').attr('value',  $(this).html() )
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
			$('#profile-username-field').attr('value', $('#username-profile-big').text())
			$('#username-check-field').val($('#username-profile-big').text())
			$('#username-check-submit').click()
			usernameChecked = false
			$('#username-check-icon').show()
		})
		//})
	$(document).on('click', '#cancel-upload-2', function(e) {
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
		'#share-buttons-settings span, #share-buttons-settings div', function() {
			$('#share-buttons-field').attr('value', $(this).attr('id'))
		})
	$(document).on('click', '#less-settings-options-button', function() {
		$('#more-settings-options-wrapper').hide()
		$('#less-settings-options-button').hide()
		$('#more-settings-options-button').show()
	})
	$(document).on('click', '#invite-tab-2', function() {
		$('.invite-tab').removeClass('active-invite-tab')
		$(this).addClass('active-invite-tab')
		$('#invite-2').fadeIn(100);
		$('#invite-1').hide();
	})
	$(document).on('click', '#invite-tab-1', function() {
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
		for (i=0;i<=$('#follow-tags-wrapper .tag:not(.unticked)').length;i++ ) {
			followTagsArray.push($('#follow-tags-wrapper .tag:not(.unticked)').eq(i).children('span').html())
			$('#follow-tags-field').val(followTagsArray)
			console.log(followTagsArray)
			//console.log( $('#follow-tags-field').val() )
		}
		$('#follow-tags-field').val(followTagsArray)
		if ( !$('#follow-tags-field').val() == '' ) {
			$('#follow-tags-submit-field').click()
		}
		
	})
	$(document).on('click', '.make-tags i', function() {
		$('#make-tags-wrapper').show()
		console.log( tagsArray )
		tagsArray = []
		console.log( tagsArray )
	})
	var tagsArray;
	$(document).on('click', '.make-tag:not(.choosen-tag)', function() {
		if ( $('.choosen-tag').length < 2 ) {
			var tagName = $(this).attr('id').replace('tag-','')
			$('#done-tags').addClass('done-tags')
			$(this).addClass('choosen-tag')
			tagsArray.push( tagName );
			console.log( tagsArray )
		}
	})
	$(document).on('click', '.make-tag.choosen-tag', function() {
		var tagName = $(this).attr('id').replace('tag-','')
		$(this).removeClass('choosen-tag')
		var tagIndex = tagsArray.indexOf(tagName);
		tagsArray.splice(tagIndex, 1)
		console.log( tagsArray )
		if ( $('.choosen-tag').length == 0 ) {
			$('#done-tags').removeClass('done-tags')
		}
	})
	$(document).on('click', '#done-tags', function() {
		$('#make-tags-wrapper').fadeOut(100)
		$('.choosen-content .tag-list-field').val( tagsArray )
		console.log(tagsArray)
		console.log( $('.choosen-content .tag-list-field').val() )
	})
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
				$('#save-settings').click()
			}
		} else {
			$('#check-username-submit').click()
			setTimeout(function() {
				$('#save-settings-before').click()
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
			if ( $('.choosen-content input[type="checkbox"]:checked').length && $('.choosen-content:visible .anonymous-image').children('img').length  < 1 ) {
					$('.choosen-content:visible .anonymous-image').removeClass('buzz').hide()
						.show().addClass('buzz')
				}
			
			else if ( $('#images-content-wrapper .inline-make-tags-wrapper .active-make-tag').length == 0  ) {
				$('#images-content-wrapper .inline-make-tags-wrapper').removeClass('buzz').hide()
						.show().addClass('buzz')
			}
			else {
				var makeTagsArray = [];
				for ( i=0;i < $('#images-content-wrapper .inline-make-tags-wrapper .active-make-tag').length ; i++ ) {
					makeTagsArray.push( $('#images-content-wrapper .inline-make-tags-wrapper .active-make-tag').eq(i).attr('id').replace('tag-', '') )
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
	$(document).on('click', '#created-image-button-before', function() {
		var memeCanvas = document.getElementById('meme-canvas');
		var dataURL3 = memeCanvas.toDataURL();
		$('#base64').val(dataURL3)
		if (image2 == false) {
			if ($('.choosen-content input[type="checkbox"]:checked').length) {
				if ($('.choosen-content:visible .anonymous-image').children('img').length < 1) {
					$('.choosen-content:visible .anonymous-image').removeClass('buzz').hide()
						.show().addClass('buzz')
				}
			}
			else if ( $('#memes-content .inline-make-tags-wrapper .active-make-tag').length == 0  ) {
				$('#memes-content .inline-make-tags-wrapper').removeClass('buzz').hide()
						.show().addClass('buzz')
			}
			else {
				$('#submit-button-before-wrapper .loading-icon').addClass(
						'loading-animation');
				$('#submit-button-before-wrapper').children().hide()
				setTimeout(function() {
					var makeTagsArray = [];
					for ( i=0;i < $('#memes-content .inline-make-tags-wrapper .active-make-tag').length ; i++ ) {
						makeTagsArray.push( $('#memes-content .inline-make-tags-wrapper .active-make-tag').eq(i).attr('id').replace('tag-', '') )
					}
					$('#images-content .tag-list-field').val(makeTagsArray)
					console.log(makeTagsArray)
					$("#submit-image-button-2").click();
					image2 = true
				}, 1200)
			}
		} else {
			console.log('a')
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
		}
	});
	$('.progress').mouseover(function() {
		$('#progress-table').fadeIn()
	})
	$('.progress').mouseleave(function() {
		$('#progress-table').fadeOut()
	})
	$(document).on('click', '.more-post-options', function() {
			console.log($(this).parents('.post-footer').siblings(
				'.more-post-options-container'))
			console.log($(this).parents('.left-wrapper').find(
				'.more-post-options-container'))
			if ($(this).parents('.left-wrapper').find('.more-post-options-container').hasClass(
				'active-tab')) {
				$(this).parents('.left-wrapper').find('.post-title').attr('contentEditable','false')
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
				$(this).parents('.left-wrapper').find('.post-title').attr('contentEditable','true')
				$(this).parents('.wrapper').find('.post-title').addClass('focus')
			}
		})
	var $container = $('#left-content-profile');
	$container.masonry({
		itemSelector: '.wrapper',
		gutter: 5
	});
	var $container2 = $('#right-content-profile');
	$container2.masonry({
		itemSelector: '.wrapper',
		gutter: 5
	});
	var previousScroll = 0;
    var lastScrollTop = 0;
	var toUp = false;
	$(window).scroll(function(event){
	   var st = $(this).scrollTop();
	   if (st < lastScrollTop &&  lastScrollTop > 800  ){
	   	toUp = true
	   	setTimeout(function(){
	   		if ( toUp == true && lastScrollTop > 800 ){
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

