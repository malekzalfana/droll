/*global $*/
/*$('.pick-meme-container').css({
        'height': ($('.pick-meme-container').eq(0).width() )*1.3
      })*/
$(document).on('click', '.show-reply-icon', function(){
  $('.new-reply').hide()
  var commentID = $(this).attr('id').replace('show-','')
  console.log(  $('#'+commentID) )
  $('#showed-'+commentID).fadeIn();
  $('#showed-'+commentID).children('.reply-form').children('.reply-body').focus();
})
$(document).on('click', '.hide-reply, .reply-comment', function(e){
  setTimeout(function(){
    $('.reply-body').val('');
  }, 1000)
  $('.new-reply').hide()
})

//var theComment = $('.comment-content').text()
//alert(  theComment  )
//console.log($('.comment-content'))
var postId;
var userImage = $('#profile-photo-small').css('background-image');
    var newComments = 'nc'
if ( $('.post-title').height() > 50 ) {
  $(this).css({'font-size':'20px'})
}
//if ($('.wrapper').length == 1){
 
 //alert('sdsdf')
//}
//$(document).ready(function(){
var postOptions;
$(document).on('click', '.post-options', function () {
  if ( $(this).hasClass('black-color') ) {
    $(this).removeClass('black-color')
    $(this).parents('.left-wrapper').children('.post-image-wrapper').children('.post-more-options').fadeOut(200);
    $(this).parents('.left-wrapper').children('.post-image-wrapper').children('a').children('.post-image').removeClass('blurred-post-image')
  }
  else {
    $(this).addClass('black-color')
    $(this).parents('.left-wrapper').children('.post-image-wrapper').children('.post-more-options').fadeIn(200);
    $(this).parents('.left-wrapper').children('.post-image-wrapper').children('a').children('.post-image').addClass('blurred-post-image')
  }
})
$(document).on('click', '.favor-post', function () {
  $(this).parents('.post-more-button').toggleClass('favorited')
})
$(document).on('click', '.report-post', function () {
  $(this).parents('.post-more-button').toggleClass('reported')
})
$(document).on('click', '.expand-post', function (e) {
  e.stopPropagation();
  $(this).fadeOut(200);
  $(this).parents('.post-image-wrapper').addClass('expanded-post')
})

/*
$(document).on('click', '.favor-post', function () {
  $('.post-status').addClass('favored-post').text('favored').fadeIn()
  $(this).parents('.post-more-options').hide()
  $(this).parents('.post-more-options').siblings('a').children('.post-image').removeClass('blurred-post-image')
})
$(document).on('click', '.report-post', function () {
  $('.post-status').addClass('reported-post').text('report').fadeIn()
  $(this).parents('.post-more-options').hide()
  $(this).parents('.post-more-options').siblings('a').children('.post-image').removeClass('blurred-post-image')
})
*/
$(document).on('click', '.delete-comment-button', function () {
  $(this).parent('.comment-options').parent('.comment-body').delay(200).fadeOut(200)
})

$(document).on('click', '.report-post', function () {
  if ($(this).hasClass('submitted')) {
    $(this).children('.options-text').text('Report')
    $(this).removeClass('submitted')
    $(this).children('.report-icon').removeClass('reported-icon')
  }
  else {
    $(this).children('.options-text').text('Reported')
    $(this).children('.report-icon').addClass('reported-icon')
    $(this).addClass('submitted')
  }
  $('.overlay-full, .left-wrapper-overlay').hide()
  $(postOptions).delay(300).fadeOut(100)
})
$(document).on('click', '.favor-post', function () {
  if ($(this).hasClass('submitted')) {
    $(this).children('.options-text').text('Add to favorites')
    $(this).removeClass('submitted')
    $(this).children('.favor-icon').removeClass('favored-icon')
  }
  else {
    $(this).children('.options-text').text('Favoured')
    $(this).children('.favor-icon').addClass('favored-icon')
    $(this).addClass('submitted')
  }
  $('.overlay-full, .left-wrapper-overlay').hide()
  $(postOptions).delay(300).fadeOut(100)
})

  
    
    
    var thisWrapper;
    var postIndex;

    $(document).on('click', '.post-image1, .comment-button1', function () {   // REMOVED
      $('.wrapper').hide();
    var thisDiv = $(this);
    $(window).scrollTop(0);
      $('#content').removeAttr('id').attr('id', 'content-full');
      //console.log(thisDiv)
      postIndex = $(this).parents('.wrapper').index();
      postId = $(this).parents('.wrapper').attr('data-post-id');
      //var postIndex = $('#content-full').index($(this).parent('.wrapper'))
      //console.log( $(thisDiv).parents('.wrapper') )
      //$('.wrapper:nth-child('+postIndex+')').fadeIn(200)
      //alert(postIndex)
      //alert('asdas'+postId)
      thisWrapper = $('.wrapper[data-post-id="'+ postId+'"]') /////////////////////////////////
      //thisWrapper = $('.wrapper').get(postIndex); /////////////////////////////
      //alert($(thisWrapper).index())
      $(thisWrapper).fadeIn(200);
      $('#left-arrow').fadeIn();
      $('.post-image-wrapper').attr("data-simplebar-direction","vertical")
      $('.post-image-wrapper').simplebar();
      cPost = $('this').parents('.wrapper')
  });
  $(document).on('click', '#content-full .post-image', function () {
      $(this).clone().appendTo('body').addClass('image-view');
      $('.content-overlay').fadeIn();
      $('#content-full, .content-overlay').css({'position':'fixed'});
      $('#left-arrow').hide();
      $('.content-overlay').click(function(){
        $('.image-view').remove();
        $('.content-overlay').hide();
        $('#content-full, .content-overlay').css({'position':'initial'})
        $('#left-arrow').show();
      })
      
  });    
  $(document).on('click', '#left-arrow', function () {
    $('.post-image-wrapper').removeAttr("data-simplebar-direction","vertical")
    $('#content-full').removeAttr('id').attr('id', 'content');
    $('#left-arrow').hide();
    var thisOne = $('.wrapper[data-post-id="'+ postId+'"]');
    //var thisOne = $('.wrapper').get(postIndex)
    $('.wrapper[data-post-id="'+ postId+'"]').scrollTop();
    console.log(thisOne)
    $('html, body').animate({ scrollTop: $(thisOne).offset().top - 50}, '100');
    //thisOne.scrollIntoView();
    //$(thisOne).scrollTop(220);
  });
  
    $(document).on('keydown', 'body1', function (e) {
      //if ( $('.full-wrapper').is('#content-full') && !$(e.target).is('input, textarea') ){
      if (e.keyCode == 39) {
        window.location.href = $('.next-post-a').attr('href');
        if (postIndex != ($('.wrapper').length - 1)) {
          /* $('.wrapper').fadeOut(200);
          postIndex++;
          thisWrapper = $('.wrapper').get(postIndex);
          $(thisWrapper).fadeIn(200);
          postId = $(thisWrapper).attr('data-post-id')
          //alert(postId)
          $(window).scrollTop(0); */
          
        }
        else {
          //alert('index == length')
        }
      }
      if (e.keyCode == 37) {
        //alert('back')
        window.location.href = $('.prev-post-a').attr('href');
        //alert($('.prev-post-a').attr('href'))
        if (postIndex != 0) {
          $('.wrapper').fadeOut(200);
          postIndex--;
          thisWrapper = $('.wrapper').get(postIndex);
          $(thisWrapper).fadeIn(200);
          postId = $(thisWrapper).attr('data-post-id')
          //alert(postId)
          $(window).scrollTop(0);
        }
        else {
          //alert('postIndex == 0')
        }
      }
      if (e.keyCode == 8){
        e.preventDefault();
        $('.post-image-wrapper').removeAttr("data-simplebar-direction","vertical")
        $('#content-full').removeAttr('id').attr('id', 'content');
        $('#left-arrow').hide();
        var thisOne = $('.wrapper[data-post-id="'+ postId+'"]');
        //var thisOne = $('.wrapper').get(postIndex)
        $('.wrapper[data-post-id="'+ postId+'"]').scrollTop();
        console.log(thisOne)
        $('html, body').animate({ scrollTop: $(thisOne).offset().top - 48}, '100');
        //thisOne.scrollIntoView();
        //$(thisOne).scrollTop(220);
      }//}
    });
    var hiddenCommentHeight;
    $(document).on('keyup', '.new_comment textarea', function(){
      var commentText = $(this).val();
      var commentHidden = $(this).siblings('.hidden-div')
      $(commentHidden).text(commentText);
      if ( $(commentHidden).height() != hiddenCommentHeight) {
        $(this).height($(commentHidden).height());
        hiddenCommentHeight = $(commentHidden).height()
      }
      else {
        hiddenCommentHeight = $(commentHidden).height()
      }
      
    });
    /*$(document).ready(function(){
      var userName = $('#username').val();
    console.log(userName)
    var userImage = $('#profile-photo-small').attr('background-image');
    console.log(userImage)
    var newComments = 'nc'
    $(document).on('click', '.post-comment', function(){
      var thisCommentContent = $(this).closest('textarea').val();
      var thisCommentWrapper = $(this).parents('.comments-wrapper')
      $('.comment-body').first().clone().removeAttr('id').prependTo(thisCommentWrapper).attr('id', newComments).addClass('fadeInUp animated-fast').siblings('.replies').remove();;
      var clonedComment ='#'+newComments
      $(clonedComment+'.created-at').text('less than a minute ago');
      $(clonedComment+'p').val( thisCommentContent).fadeOut().fadeIn(4000);
      console.log(thisCommentContent)
      console.log( $(this).closest('textarea').val() )
      $(clonedComment+'.comment-user').val(userName);
      $(clonedComment+'.comment-user-image').css({'background-image':userImage})
      
      console.log($(clonedComment))
      alert('done?');
      //$(this).closest('textarea').val($(cloningComment.innerHTML));
      newComments = newComments + '1'
    })*/
    // NEW
    /*$(document).on('click', '.post-comment', function(){
      var thisCommentContent = $(this).siblings('.post-comment-body').val()
      console.log(thisCommentContent)
      var thisCommentWrapper = $(this).parents('.comments-wrapper')
      var newComment = document.createElement('blockquote')
      newComment.className = 'comment-body'
      var newCommentUserWrapper = document.createElement('div')
      newCommentUserWrapper.className = 'comment-user-image-wrapper'
      var newCommentUser = document.createElement('span')
      console.log(userImage)
      newCommentUser.style.backgroundImage = $('#profile-photo-small').css('background-image')
      newCommentUser.className = 'comment-user-image'
      var commentOption = document.createElement('div')
      commentOption.className = 'comment-options'
      var commentCreatedAt = document.createElement('span')
      commentCreatedAt.className = 'created-at'
      commentCreatedAt.innerHTML = 'less than a minute ago'
      var commentUser = document.createElement('span')
      commentUser.className = 'comment-user'
      commentUser.innerHTML = document.getElementById('username').innerHTML
      var commentP = document.createElement('p')
      commentP.innerHTML = thisCommentContent
      var commentHr = document.createElement('hr')
      commentHr.className = 'comment-separater'
      $(thisCommentWrapper).prepend(newComment).addClass('fadeInUp animated-fast')
      $(newComment).append(newCommentUser, newCommentUserWrapper, commentP, commentOption, commentCreatedAt, commentHr)
      $(newCommentUserWrapper).append(newCommentUser)
      $(commentOption).append(commentUser, commentCreatedAt, commentP)
      newComments = newComments + '1'
      setTimeout(function() {
        $(this).siblings('.form-group').children('.post-comment-body').val('')
      }, 500);
      
      $(window).scrollTop()
    })*/
    console.log('ad')
    