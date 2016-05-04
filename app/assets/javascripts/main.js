/*global $*/
var postId;
var userImage = $('#profile-photo-small').css('background-image');
    console.log(userImage)
    var newComments = 'nc'
if ( $('.post-title').height() > 50 ) {
  $(this).css({'font-size':'20px'})
}
//$(document).ready(function(){
    $(document).on('click', '.upvote', function () {
      var postId = $(this).attr('data-post-id');
      var votes = $('.post-votes[data-post-id="'+ postId+'"], .right-post-votes[data-post-id="'+ postId+'"]');
      var upvoter = $('.upvote[data-post-id="'+ postId+'"]');
      console.log(upvoter)
      var votesNumber = Number($(votes).data('votes'));
      if ( !$(this).hasClass('upvoted') ) {
        votesNumber++;
        $(votes).text(votesNumber);
        $(upvoter).addClass('upvoted');
        if ( $(upvoter).siblings('.downvote').hasClass('downvoted') ){
          votesNumber ++;
          $(votes).text(votesNumber);
          $(upvoter).siblings('.downvote').removeClass('downvoted');
        }
      }
      else {
        votesNumber--;
        $(votes).text(votesNumber);
        $(upvoter).removeClass('upvoted');
      }
      $(votes).attr('data-votes', votesNumber);
    });
    $(document).on('click', '.downvote', function () {
      var postId = $(this).attr('data-post-id');
      var votes = $('.post-votes[data-post-id="'+ postId+'"], .right-post-votes[data-post-id="'+ postId+'"]');
      var votesNumber = Number($(votes).data('votes'));
      var downvoter = $('.downvote[data-post-id="'+ postId+'"]');
      if ( !$(this).hasClass('downvoted') ) {
        votesNumber--;
        $(votes).text(votesNumber);
        $(downvoter).addClass('downvoted');
        if ( $(this).siblings('.upvote').hasClass('upvoted') ){
          votesNumber--;
          $(votes).text(votesNumber);
          $(downvoter).siblings('.upvote').removeClass('upvoted');
        }
      }
      else {
        votesNumber++;
        $(votes).text(votesNumber);
        $(downvoter).removeClass('downvoted');
      }
      $(votes).attr('data-votes', votesNumber);
    });
    
    var thisWrapper;
    var postIndex;

    $(document).on('click', '.post-image, .comment-button', function () {
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
  
    $(document).on('keydown', 'body', function (e) {
      if ( $('.full-wrapper').is('#content-full') && !$(e.target).is('input, textarea') ){
      if (e.keyCode == 39) {
        if (postIndex != ($('.wrapper').length - 1)) {
          $('.wrapper').fadeOut(200);
          postIndex++;
          thisWrapper = $('.wrapper').get(postIndex);
          $(thisWrapper).fadeIn(200);
          postId = $(thisWrapper).attr('data-post-id')
          //alert(postId)
          $(window).scrollTop(0);
        }
        else {
          //alert('index == length')
        }
      }
      if (e.keyCode == 37) {
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
      }}
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
    $(document).on('click', '.post-comment', function(){
      alert('clicked')
      var thisCommentContent = $(this).siblings('.form-group').children('.post-comment-body').val()
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
      $(thisCommentWrapper).prepend(newComment)
      $(newComment).append(newCommentUser, newCommentUserWrapper, commentP, commentOption, commentCreatedAt, commentHr)
      $(newCommentUserWrapper).append(newCommentUser)
      $(commentOption).append(commentUser, commentCreatedAt, commentP)
      newComments = newComments + '1'
      $(window).scrollTop()
    })
    
    