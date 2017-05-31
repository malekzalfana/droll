$(document).on('click', '#next-post-icon', function() {
		//thisWrapper = $(this).parents('.wrapper')
		//console.log('start')
		//console.log($(thisWrapper))
		//console.log($('.wrapper').last())
		if (!$('body').hasClass('loadingPost') && $(thisWrapper).attr("id") != $('.wrapper').last().attr("id") ) {
			//alert('d')
			if ($(thisWrapper).next('.wrapper').length == 0 && $('body').hasClass('loadingPost')) {
				alert("first")
				$('.loadingPost-icon').addClass('loading-animation')
				var loadingPostInterval = setInterval(function() {
					if ($(thisWrapper).next('.wrapper').length == 0) {
						$('.loadingPost-icon').removeClass('loading-animation')
						clearInterval(loadingPostInterval)
						$('#next-post-icon').click()
					}
				}, 400);
			} else if ($(thisWrapper).next('.wrapper').length > 0) {
				//alert("econdt")
				$(thisWrapper).hide().css({
					'width': '550px'
				}).removeClass('shown')
				thisWrapper = $(thisWrapper).next('.wrapper')
				$(thisWrapper).show().css({
					'width': '600px'
				}).addClass('shown')
				$('html, body').animate({
					scrollTop: $('body').offset().top
				}, 200);
				//$(thisWrapper).next('.wrapper')
				//console.log( $(thisWrapper) )
				/*
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
				*/
			}
			/*
			else if ($(thisWrapper).next('.wrapper').length ==  0) {
				alert("3")
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

			else {
				//alert('ddd')

				console.log('backkkkkk')
				$('.wrapper').show().css({
					'width': '550px'
				}).removeClass('shown')
				$('body').removeClass('shown-post')
				$('.right-wrapper').hide()
				setTimeout(function() {
					window.scrollTo(0, $(thisWrapper).offset().top);
				}, 10)

			}*/
		}
		alert(  $(thisWrapper).attr("id"))
	})

	$(document).on('click', '#prev-post-icon', function() {
		//thisWrapper = $(this).parents('.wrapper')
		//alert($(thisWrapper).attr("id"))
		//console.log(thisWrapper.id)
		//console.log( $('.wrapper').first().attr('id') )
		if ( $(this).parents('.wrapper').attr('id') != $('.wrapper').first().attr("id") ) {
			//console.log('prevvv')
			//console.log( $(this).parents('.wrapper') )
			//console.log( $(this).parents('.wrapper').prev('.wrapper') )
			$(this).parents('.wrapper').hide().css({
				'width': '550px'
			}).removeClass('shown')
			thisWrapper = $(this).parents('.wrapper').prev()
			$(thisWrapper).show().css({
				'width': '600px'
			}).addClass('shown')
			$('html, body').animate({
				scrollTop: $('body').offset().top
			}, 200);

			if (!$(thisWrapper).children('.right-wrapper').hasClass('shown')) {
				$(thisWrapper).find('#loadPost').children('form').children(
					'input[type="submit"]').eq(0).click()
				$('.shown.wrapper .right-wrapper').addClass('loading-2')
				//console.log($(thisWrapper).children('.left-wrapper'))
			}

		} else {
			console.log('backkkkkk')
			$('.wrapper').show().css({
				'width': '550px'
			}).removeClass('shown')
			$('body').removeClass('shown-post')
			$('.right-wrapper').hide()
			setTimeout(function() {
				window.scrollTo(0, $(thisWrapper).offset().top);
			}, 10)
		}
		console.log( $(thisWrapper) )
	})