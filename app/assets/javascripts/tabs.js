$(document).on('click','.tabs',function(){
  $('.choosen-content').hide();
  $('.tabs').removeClass('active-tab');
  $('.choosen-content').hide();
  $('#images-content-wrapper').hide();
  $(this).addClass('active-tab')
  var createWhat = $(this).attr('id').replace('-tab','')
  $("#"+createWhat+"-content").show()
  
  if ( createWhat == 'rage-comics' ) {
      $('#make-logo').css({'color':'white'})
    console.log('white?')
  }
  else if ( createWhat == 'images'  ) {
    $('#make-logo').css({'color':'rgba(255, 70, 27, 0.85)'})
    $('#images-content-wrapper').show();
  }
  else {
    $('#make-logo').css({'color':'rgba(255, 70, 27, 0.85)'})
  }
})
$(document).on('click', '.dropping', function(e){
  e.preventDefault();
})
$(document).on('click', '.make-meme', function(){
  if ( $('#remote-make').length  ) {
    $('#remote-make, #hide-remote-make').show()
    $('body').addClass('overflow-hidden')
  }
  else {
    $('body').append('<iframe src="https://droll-cloned-2-malekzalfana.c9users.io/make2" id="remote-make" class="fadeInUp animated-very-fast"></iframe>')
    $('body').addClass('overflow-hidden')
    $('#hide-remote-make').show()
  }
})
$(document).on('click', '#hide-remote-make', function(){
  $('#remote-make').fadeOut(200);
  $(this).hide();
  $('body').removeClass('overflow-hidden')
})
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
      $('#make-image-preview').css({'min-height':$('#make-image-preview img').height()});
      $('#pictureInput, #preview-image-text').hide()
    }
    reader.readAsDataURL(image);
      $('#cancel-upload, #reset-image, #submit-image-button').show()
      $('.anonymous-checkbox').addClass('shown')
  };
  function previewUserImage(event, thisFiler, thisPreview) {
    var files = event.target.files;
    var image = files[0]
    var reader = new FileReader();
    reader.onload = function(file) {
      var img = new Image();
      console.log(file);
      img.src = file.target.result;
      $('#choose-image-preview').css({'background-image':'url('+img.src +')'});
      console.log('vv'+ img.src)
      $('#choose-image').hide()
    }
    reader.readAsDataURL(image);
      $('#reset-user-image').show()
  };
  function previewUserCover(event, thisFiler, thisPreview) {
    var files = event.target.files;
    var image = files[0]
    var reader = new FileReader();
    reader.onload = function(file) {
      var img = new Image();
      console.log(file);
      img.src = file.target.result;
      $('#choose-cover-preview').css({'background-image':'url('+img.src +')'});
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
      $('#profile-photo').css({'background-image':'url('+img.src +')'});
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
      $('#profile-under-overlay').css({'background-image':'url('+img.src +')'});
    }
    reader.readAsDataURL(image);
  };
  $(document).on('click', '#menu-button', function(){
    if (  $(this).parent().hasClass('shown')  ) {
      $(this).parent().removeClass('shown')
      $('#notification-icon, #nav-icons-wrapper a').hide()
    }
    else {
      $(this).parent().addClass('shown')
      $('#notification-icon, #nav-icons-wrapper a').fadeIn(100)
    }
  })
  $(document).on('click', '#cancel-upload', function(e){
    e.preventDefault();
    $("#images-content-wrapper").load(window.location.href + " #images-content");
  })
  $(document).on('click', '#choose-image, #reset-user-image', function(){
    $(this).siblings('input').click()
  })
  $(document).on('click', '#edit-profile-image, #edit-profile-cover', function(){
    $('#'+ $(this).attr('id')+ '-field' ).click()
  })
  $(document).on('click', '#choose-image, #reset-user-image', function(){
    $(this).siblings('input').click()
  })
  $(document).on('click', '#done-meme', function(){
    var memeCanvas = document.getElementById('meme-canvas');
    var dataURL3 = memeCanvas.toDataURL();
    $('#hide-remote-make', parent.document.body).click();
    $("#base64-make", parent.document.body).val(dataURL3);
    $("#base64-image", parent.document.body).attr("src", dataURL3).fadeIn(200)
    $("#comment-html, .memes-emojis", parent.document.body).hide();
    $("#cancel-meme", parent.document.body).removeClass('hidden-imp');
    console.log('worked?')
  });
  
  $(document).on('click', '#cancel-meme', function(){
    $(this).addClass('hidden-imp')
    $("#base64-make").val('');
    $('#base64-image').hide()
    $("#comment-html").show();
    if ( window.width > 600 ) {
      $('.memes-emojis').show()
    }
    $('#base64-make').hide();
    console.log('worked?')
  });
  //////////////////////
  var thisWrapper;
  $(document).on('click', '.post-image-wrapper a', function(e){
    e.preventDefault();
    if ( !$(this).parents('.wrapper').hasClass('shown') ) {
      thisWrapper = $(this).parents('.wrapper')
      $(thisWrapper).css({'width':'600px'}).addClass('shown')
      $('.wrapper').not($(this).parents('.wrapper')).hide().removeClass('shown')
      if ( !$(thisWrapper).children('.right-wrapper').hasClass('shown')  ) {
        $('.shown.wrapper .right-wrapper').addClass('loading-2')
        $(thisWrapper).find('#loadPost').children('form').children('input[type="submit"]').eq(0).click()
      }
      $('body').addClass('shown-post')
      window.scrollTo(0, $('body').offset().top);
    }
  })
  
  
  $(document).on('click', 'body.shown-post #main-page-type a', function(e){
    e.preventDefault()
    $('#back-list').click()
  })
  $(document).on('click', '#make2 #cancel-meme' , function(){
    $('#hide-remote-make').click()
  })
  $(document).on('click', '#back-list', function(){
    if ( $('body').is('#show')  ) {
      window.location = '/recent'
    }
    else {
      $('.wrapper').show().css({'width':'550px'}).removeClass('shown')
      $('body').removeClass('shown-post')
      $('.right-wrapper').hide()
      setTimeout(function(){
        window.scrollTo(0, $(thisWrapper).offset().top);
      }, 10)
      
    }
  })
  var loadingNew = false
  $(document).on('click', '#next-post-icon', function(){
    if ( $(thisWrapper).is( $('.wrapper').last() ) && loadingNew ===  true ) {
      alert('loading is true')
      setTimeout(function(){
        $('#next-post-icon').click()
      }, 1500)
    }
    else {
      $(thisWrapper).hide().css({'width':'550px'}).removeClass('shown')
      thisWrapper = $(thisWrapper).next().show().css({'width':'600px'}).addClass('shown')
      $('html, body').animate({
          scrollTop: $('body').offset().top
      }, 200);
      if ( !$(thisWrapper).children('.right-wrapper').hasClass('shown')  ) {
        $(thisWrapper).find('#loadPost').children('form').children('input[type="submit"]').eq(0).click()
        $('.shown.wrapper .right-wrapper').addClass('loading-2')
      }
      if (  $(thisWrapper).is(':nth-child(9n-1)') || $(thisWrapper).is(':nth-child(10n-1)')  ) {
        var theurl = $('.pagination a.next_page').attr('href')
        $.getScript(theurl)
      }
      console.log('the post has been loaded right?')
    }
  })
  $(document).on('click', '#prev-post-icon', function(){
    if ( !$('.wrapper').eq(0).hasClass('shown') ) {
      $(thisWrapper).hide().css({'width':'550px'}).removeClass('shown')
    thisWrapper = $(thisWrapper).prev().show().css({'width':'600px'}).addClass('shown')
    $('html, body').animate({
        scrollTop: $('body').offset().top
    }, 200);
    if ( !$(thisWrapper).children('.right-wrapper').hasClass('shown')  ) {
      $(thisWrapper).find('#loadPost').children('form').children('input[type="submit"]').eq(0).click()
      $('.shown.wrapper .right-wrapper').addClass('loading-2')
      console.log($(thisWrapper).children('.left-wrapper'))
    }
    }
    else {
      $('#back-list').click()
    }
  })
  //////////////////////
  $(document).on('click', '#choose-cover, #reset-cover', function(){
    $(this).siblings('input').click()
  })
  $(document).on('click', '.link', function(e){
    //e.preventDefault()//
    window.location = $(this).attr('data-url')
  })
  $(document).on('keyup', function(e){
    if (!$("input,textarea,.post-comment-body-2.post-comment-body").is(":focus") ) {
        if (  e.keyCode == 37) {
          if ( $('body').hasClass('shown-post')  ) {
            $('#prev-post-icon').click()
          }
        }
        else if (  e.keyCode == 39) {
          if ( $('body').hasClass('shown-post')  ) {
          $('#next-post-icon').click()
          }
        }
        else if ( e.keyCode == 8 ) {
          if ( $('body').hasClass('shown-post')  ) {
          e.preventDefault()
          $('#back-list').click()
          }
        }
    }
  })
  $(document).on('mousedown', '.post-comment', function(e){
    if ( $('#comment-html').is(':empty') ) {
      e.stopPropagation()
    }
  })
  $(document).on('click', '#cancel-edit-profile', function(){
    $('#profile-under-overlay').css({'background-image': originalCover});
    $('#profile-photo').css({'background-image': originalImage});
    $('#username-profile').text(originalBio)
    $('#username-profile-big').text(originalUsername)
    $('#edit-profile-image, #edit-profile-cover').hide();
    $("#edit-profile-image-field, #edit-profile-cover-field").val('');
    $('#profile-bio-field').attr('value', originalBio )
    $('#profile-username-field').attr('value', originalUsername )
    $('#username-check-icon').text('check_circle')
    $(this).hide();
    $('#edit-profile').show();
    document.getElementById('username-profile').contentEditable='false';
    document.getElementById('username-profile-big').contentEditable='false';
    $('#save-profile, #profile #username-check-icon').hide();
  });
  var originalCover;
  var originalImage;
  var originalUsername;
  var originalBio;
  $(document).on('click', '#edit-profile', function(){
    originalCover = $('#profile-under-overlay').css('background-image');
    originalImage = $('#profile-photo').css('background-image');
    originalBio = $('#username-profile').text()
    originalUsername = $('#username-profile-big').text()
    $('#edit-profile-image, #edit-profile-cover').show();
    $(this).hide();
    $('#cancel-edit-profile, #profile #username-check-icon').show()
    $('#save-profile').show().addClass('left-margined')
    document.getElementById('username-profile').contentEditable='true';
    document.getElementById('username-profile-big').contentEditable='true';
  })
  
  $(document).on('click', '#save-profile', function(){
    if ( usernameChecked === true) {
      if ($('#username-check-icon').text() == 'cancel'  ) {
        $('#username-check-icon').addClass('flash animated-fast')
        setTimeout(function(){
          $('#username-check-icon').removeClass('flash animated-fast')
        }, 1000)
      }
      else {
        $(this).hide().removeClass('left-margined')
        $('#edit-profile-image, #edit-profile-cover, #cancel-edit-profile').hide();
        $('#edit-profile').show()
        $('#save-profile-field').click();
        document.getElementById('username-profile').contentEditable='false';
        document.getElementById('username-profile-big').contentEditable='false';
      }
    }
  })
  //$(document).on('focus', '#profile-username', function(){
  $(document).on('keyup', '#username-profile', function(){
    $('#profile-bio-field').attr('value', $('#username-profile').text() )
    usernameChecked = true;
    $('#username-check-icon').show()
  })
  $(document).on('click', '#sign-up-submit-before', function(){
    if ( usernameChecked === true) {
      if ($('#username-check-icon').text() == 'cancel'  ) {
        $('#username-check-icon').addClass('flash animated-fast')
        $('html,body').animate({
           scrollTop: $('#username-check-icon').offset().top - 200
        });
        setTimeout(function(){
          $('#username-check-icon').removeClass('flash animated-fast')
        }, 1000)
      }
      else {
        $('#sign-up-submit').click()
      }
    }
  });
  $(document).on('keyup', '#sign-up-username-field', function(){
    $('#username-check-field').attr('value', $('#sign-up-username-field').val() );
    $('#username-check-submit').click()
    $('#username-check-icon').show()
  })
  var usernameChecked = true;
  var emailChecked = true;
  $(document).on('keyup', '#username-field-settings', function(){
    $('#username-check-field').attr('value', $('#username-field-settings').val() )
    $('#username-check-submit').click()
    usernameChecked = false
    $('#username-check-icon').show()
  })
  $(document).on('keyup', '#email-field-settings', function(){
    $('#email-check-field').attr('value', $('#email-field-settings').val() )
    $('#email-check-submit').click()
    $('#email-check-icon').show()
    emailChecked = false
  })
  
  $(document).on('keyup', '#username-profile-big', function(){
    $('#profile-username-field').attr('value', $('#username-profile-big').text() )
    $('#username-check-field').val( $('#username-profile-big').text() )
    $('#username-check-submit').click()
    usernameChecked = false
    $('#username-check-icon').show()
  })
    
  //})
  
  $(document).on('click', '#cancel-upload-2', function(e){
    e.preventDefault();
    $('#pick-meme').show();
    $('#text-3, #created-meme-title, #text-4').val('')
    $('#meme-canvas').css({'height':'0px'})
    $(window).scrollTop(0);
  })
  $(document).on('click', '#reset-image', function(){
    $("#pictureInput").click();
  })
  
  $(document).on('click', '#more-settings-options-button', function(e){
    $('#more-settings-options-wrapper').show();
    $('#less-settings-options-button').show()
    $('#more-settings-options-button').hide()
  })
  
  $(document).on('click', '#less-settings-options-button', function(){
    $('#more-settings-options-wrapper').hide()
    $('#less-settings-options-button').hide()
    $('#more-settings-options-button').show()
  })
  $(document).on('click', '#save-settings-before', function(){
    if (  !$('#more-settings-options-wrapper').is(':visible')) {
      $('#new-password-field').val('')
    }
    if ( usernameChecked === true) {
      if ($('#username-check-icon').text() == 'cancel'  ) {
        setTimeout(function(){
          $('#username-check-icon').removeClass('flash animated-fast')
        }, 1000)
      }
      else {
        $('#save-settings').click()
      }
    }
    else {
      $('#check-username-submit').click()
      setTimeout(function(){
        $('#save-settings-before').click()
      },2000)
    }
  })
  
  $(document).on('click', '#created-image-button-before', function(){
    var memeCanvas = document.getElementById('meme-canvas');
    var dataURL3 = memeCanvas.toDataURL();
    $('#base64').val(dataURL3)
    setTimeout(function(){
      $("#submit-image-button-2").click();
    }, 2000)
  })
  
  $(document).on('click', '#created-image-button-before-2', function(){
    /*var memeCanvas = document.getElementById('meme-canvas');
    var dataURL3 = memeCanvas.toDataURL();
    $('#base64').val(dataURL3)
    setTimeout(function(){
      $("#submit-image-button-2").click();
    }, 2000)*/
  })
  console.log('tabs.js working')