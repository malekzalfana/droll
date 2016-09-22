$(window).load(function() {
    
    $('.progress').mouseover(function(){
        $('#progress-table').fadeIn()
    })
    $('.progress').mouseleave(function(){
        $('#progress-table').fadeOut()
    })
    var progress = $('#progress-number').attr('data-progress-number')
    $('head').append('<style>.progress:before{content:" '+Number(progress)+'%"}</style>');
    $('.progress .hide').css({'transform':'rotate('+ (360 / 100) * progress +'deg)'})
    if ( progress > 50){
        $('.progress .active2').css({'transform':'rotate('+ (360 / 100) * (progress - 50) +'deg)'})
        $('.progress .active2').css({'transform-origin':'left center'})
        $('.progress .active2, .progress .active').css({'z-index':'300'})
    }
    $('.not-signed-in .upvote,.not-signed-in .downvote').click(function(){
        if ( $(this).is('.upvote') ) {
            $('.notice-message').text('Sign in to upvote').hide()
            setTimeout(function(){
                $('.notice-message').show()
            },100)
        }
        else {
            $('.notice-message').text('Sign in to downvote').hide()
            setTimeout(function(){
                $('.notice-message').show()
            },100)
        }
    })
    var chosen = 0
    function samir(){
      $('.info-h2').hide()
      $('.info-h2').eq(chosen).fadeIn()
      chosen++
      setTimeout(function(){
        samir()
      }, 2500)
      if ( chosen  == 2){
        chosen = 0;
      }
    }
    samir()
    var reactions = false;
    var commentopen = false
    $(document).on('hover', '.post-comment-options a', function(){
        alert('ss')
    });
    //$(document).on('click', '.eye', function(){
      //    alert('asd')
          //$(this).hide()
    //      $('#cartoon-mouth').addClass('cartoon-smiling').hide()
      //})
      //$(document).on('mouseleave', '.eye', function(){
       //   $('#cartoon-mouth').removeClass('cartoon-smiling')
      //})
    $(document).on('click', '.profile-tabs', function(){
        $('.profile-tabs').removeClass('selected-profile-posts');
        $(this).addClass('selected-profile-posts');
        if ($(this).is('#profile-posts')) {
            $('#right-content-profile').hide();    
            $('#left-content-profile').fadeIn(200);
        }
        else {
            $('#left-content-profile').hide();
            $('#right-content-profile').fadeIn(200);
        }
        
    });
    $(document).on('click', '.comment-button', function(){
        if ( commentopen == false){
            $('.middle-wrapper').show();
            setTimeout(function(){
                $('.wrapper.shown .post-comment-body-2.post-comment-body').eq(0).focus()
            }, 100)
            
            commentopen = true
        }
        else {
            $('.middle-wrapper').hide();
            commentopen = false
        }
    });
      $(document).on('click', '.more-replies-button', function(){
          var commentID = $(this).attr('data-comment-id');
          if ( $(this).hasClass('more-replies-parent') ) {
              var startAt = $('#comment-replies-' + commentID +' > .comment-child:visible:last').index();
              $('#comment-replies-' + commentID + '>  .comment-child').slice(startAt,startAt + 3).addClass('shown-reply')
              if ( $('#comment-replies-' + commentID +'  > .comment-child:last').hasClass('shown-reply') ) {
                  $(this).hide()
              }
          }
          else {
              if ( $('#comment-replies-' + commentID).hasClass('shown-replies') ){
              var startAt = $('#comment-replies-' + commentID +' .comment-child:visible:last').index();
              $('#comment-replies-' + commentID + ' .comment-child').slice(startAt,startAt + 4).addClass('shown-reply')
                  if ( $('#comment-replies-' + commentID +' .comment-child:last').hasClass('shown-reply') ) {
                      $(this).hide()
                      //alert('hhhhhh')
                  }
              }
              else {
                  var startAt = 1
                  $('#comment-replies-' + commentID).addClass('shown-replies');
                  $('#comment-replies-' + commentID + ' .comment-child').slice(startAt,startAt + 2).addClass('shown-reply')
                  startAt += 3;
                  if ( $('#comment-replies-' + commentID +' .comment-child:last').hasClass('shown-reply') ) {
                      $(this).hide()
                      //alert('hhhhhh')
                  }
              }
          }
          
      })
      //////////////////////// LATER ON REMOVE SLICE(-2) !IMPORTANTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTT
    /*$(document).on('mousedown', '.post-comment', function(){
        var imgsNumber = $('#comment-html img').length
        var commentHTML = $('#comment-html').html()
        if (imgsNumber > 0){
            var add = 0;
            for (i=0;i<imgsNumber;i++){
                console.log(i)
                $('#comment-html img').eq(i+add).replaceWith("{{"+$('#comment-html img').eq(i+add).attr('id')+"}}")
                add = -1
                if (i == imgsNumber -1){
                    console.log(1)
                    $('#comment-textarea').val( $('#comment-html').html())
                    $('#comment-html').html( commentHTML )
                }
            }    
        }
    })
    */
    $(document).on('mousedown', '.post-comment', function(){
        var thisCommentBody = $(this).parents('form')
        console.log(thisCommentBody)
        console.log($(thisCommentBody).find('.post-comment-body-2.post-comment-body').html())
        $(thisCommentBody).find('textarea.post-comment-body').val( $(thisCommentBody).find('.post-comment-body-2.post-comment-body').html())
    })
    $(document).on('click', '.post-comment', function(){
        $('.middle-wrapper').hide()
        commentopen = false;
        $('.loading-quarter-circle').addClass('loading-animation')
        setTimeout(function(){
            $('.wrapper:visible .comment-html').html('')
            $('.wrapper:visible .cancel-meme').click()
            //$('.shown .base64-make').attr('value', '')
            //$('.base64-image').remove()
        }, 2000)
    })
    String.prototype.replaceAt=function(index, character) {
        return this.substr(0, index) + character + this.substr(index+character.length);
    }
    function fullComment() {
        var commentNumber = $('.comment-content').length;
        for (i=0;i<=commentNumber;i++){
            var commentBefore = $('.comment-content').eq(i).text();
            var index = commentBefore.search("#")
            //console.log(index + 'index')
                if (index > -1){
                    var eID = $('.comment-content').eq(i).text().substring(index+1, index+4)
                    console.log($('.comment-content').eq(i).text().substring(index+1, index+4))
                    $('.comment-content').eq(i).text($('.comment-content').eq(i).text().replace($('.comment-content').eq(i).text().substring(index, index+4),"<span class='emoji' id='e-"+eID+"'></span>"))
                    $('.comment-content').eq(i).html($($('.comment-content').eq(i).text()))
                    //$($.parseHtml($('.comment-content').eq(i)))
                    $('.comment-content').eq(i).css({'background':'red'})
                }
            
            //$('.comment-content').eq(i).html($($('.comment-content').eq(i).text()))
        }
    }
    fullComment();
      $(document).on('click', '.emoji-img', function(){
          $(".wrapper:visible .comment-html").append($(this).clone());
          //fullComment();
      })
    $(document).on('click', '#notification-icon, #notification-icon-2', function(){
        if ( $('#notif-menu').hasClass('notif-show') ) {
            console.log('not-shown?')
            $('#notif-menu').removeClass('notif-show')
            $('body').removeClass('overflow-hidden')
            $('#overlay-under-notif').hide()
        }
        else {
            console.log('shown?')
           $('#notif-menu').addClass('notif-show')    
           $('body').addClass('overflow-hidden')
           $('#overlay-under-notif').show()
           $('#notif-number').text('')
        }
    })
    $(document).on('mousedown', '#overlay-under-notif', function(){        
        $('#notif-menu').removeClass('notif-show')
        $(this).hide()
        $('body').removeClass('overflow-hidden')
    });
    
    $(window).scroll(function () {
     var sc = $(window).scrollTop()
    if (sc > 85) {
      console.log('asdasd'  )
        $("#profile-photo").addClass("small-profile-photo")
    } else {
        $("#profile-photo").removeClass("small-profile-photo")
    }
});
    $(document).ready(function(){
        $('#notif-menu').simplebar();    
    })
    
    $('#overlay').click(function(){
      $('#notif-menu').removeClass('notif-show')
    })
    //notifsNumberFuction();
    var notifsNumberInitial2;
    function notifsNumberFuction() {
        var notifsNumberInitial = $('.activity').length
        notifsNumberInitial2 = notifsNumberInitial
    }
    for (i=0;i<=$('.notifs-comments').length;i++){
        //console.log( $('.notifs-comments').eq(i).text().length )
        //console.log($('.notifs-comments').eq(i).text().length)
        if($('.notifs-comments').eq(i).text().length > 40){
            $('.notifs-comments').eq(i).text($('.notifs-comments').eq(i).text().substr(0, 40)+'..');
        }
    }
    var ids = [];
    function currentIds() {
        $("#notif-content").children('.activity').each(function(){
            ids.push(this.id);
            //console.log(ids + 'ids' )
        });
        return ids
    }
        //$('#all-notifs').append($('#all-notifs').children().get().reverse());
    
    //currentIds()
  function reloader() {
      var notifNumber = 0;
    //alert($('#notif-content').children().length + 'lent1')
    //$('#notif-content').remove();
        $('#notif-content-wrapper').load(window.location.href + ' #notif-content', function(){
            //alert($('#notif-content').children().length + 'lent')
            for (i=0;i<$('#notif-content').children().length;i++){
                //$('#notif-content').children('.activity').eq(i).css({'background':'red'})
                //console.log($('#notif-content').children('.activity').eq(i))
                //console.log($('#notif-content').children('.activity').eq(i).attr('id'))
                if ( ids.indexOf($('#notif-content').children('.activity').eq(i).attr('id')) === -1 ) {
                    console.log(ids.indexOf($('#notif-content').children('.activity').eq(i).attr('id')))
                    $('.activity').eq(i).addClass('new-notif')
                ids.push( $('#notif-content').children('.activity').eq(i).attr('id') );
                notifNumber++
                if($('.notifs-comments').eq(i).text().length > 40){
                    $('.notifs-comments').eq(i).text($('.notifs-comments').eq(i).text().substr(0, 40)+'..');
                }
                //console.log( $('#notif-content').children('.activity').eq(i).attr('id') )
            }
        }
        if ( notifNumber > 0 && !$('#notif-menu').hasClass('notif-show')){
            $('#notification-icon').addClass('notified')
            if ( notifNumber > 99 ){
                $('#notification-icon #notif-number').css({'font-size':'14px'})
            }
            if ( $('#notif-menu').hasClass('notif-show')){
                $('#notification-icon #notif-number').text('')
                alert('has nmber')
            }
            else {
                if ( $('#notif-number:visible').length  ) {
                      var notifNumber2 = Number($('#notif-number').html());
                      notifNumber = notifNumber + notifNumber2
                  }
                $('#notification-icon #notif-number').text(notifNumber)
            }
            
            
        }
        })
      
  }
$(document).on('click', '#copy', function(){
    notifsNumberFuction();
    currentIds()
    reloader()
})
$(document).on('click', '#notif-number', function(){
    $('#notification-icon').removeClass('notified')
})

notif()
    function notif(){
        setTimeout(function(){
            //if ( !$('#notif-menu').hasClass('notif-show')){
                notifsNumberFuction();
                currentIds()
                reloader()
            //}
            notif()
        }, 500000)
        
    }
})
    /* global $*/
    /* global i*/