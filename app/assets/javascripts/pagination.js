window.onload = function(){
    var leftMasonry = true;
    var nomorefavors = false;
    var nomoreposts = false;
    if ( $('body').hasClass('profile') ){
        var toLoad  = 100
    }
    else {
        var toLoad = 1000
    }
    var wrapperNumber = document.getElementsByClassName('wrapper').length
    $(window).scroll(function (event) {
        if ( $('#menu-button-wrapper').hasClass('shown') ) {
        $('#menu-button').parent().removeClass('shown')
        $('#notification-icon, #nav-icons-wrapper a').hide()
        $('#main-page-type').fadeIn(100)
        }

if ( $('body').is('#recent, #index, #profile') && !$('body').hasClass('shown-post') ) {


        //console.log('this is the main')
    if ( $('#profile-posts').hasClass('selected-profile-posts') ) {
        var url = $('#left-content-profile .pagination a.next_page').attr('href')
    }
    else if ( $('#profile-favors').hasClass('selected-profile-posts') ) {
        var url = $('#right-content-profile .pagination a.next_page').attr('href')
    }
    else {
        var url = $('.pagination a.next_page').attr('href')
    }
        if ( $(window).scrollTop() > $(document).height() - $(window).height() - toLoad && url ){
            //alert('scrolled')
            //if ( toLoad == 100 ) {
                if ( $('#profile-posts').hasClass('selected-profile-posts') ) {
                    url = $('#left-content-profile .pagination a.next_page').attr('href')
                    $('#left-content-profile .pagination').text('more posts are coming')
                    //alert('more pos..')
                    if ( nomoreposts == false ) {
                        $.getScript( url )
                        //alert('dd')
                        console.log( url )
                    }
                }
                else if ( $('#profile-favors').hasClass('selected-profile-posts') ) {
                    //url = $('#right-content-profile .pagination a.next_page').attr('href')
                    $('#right-content-profile .pagination').text('more posts are coming')
                    if ( nomorefavors == false ) {
                        $.getScript( url )
                        console.log( url )
                    }
                }
                else if ( $('#box-5-wrapper').hasClass('active') ) {
                    var urlNEWPOSTS = $('#box-5-wrapper .pagination a.next_page').attr('href')
                    $('#box-5-wrapper .pagination').text('more posts are coming')
                    //if ( nomorefavors == false ) {
                        $.getScript( urlNEWPOSTS )
                        console.log( url )
                    //}
                }
                else {
                    console.log('yes')
                    if ( !$('body').hasClass('shown-post') ){
                        $('.pagination').text('more posts are coming')
                        $.getScript( url )
                        console.log( url )
                        $('body').addClass('loadingPost')
                    }
                }
            //}
        }
}
else if ( $('body').hasClass('shown-post') || $('body').is('#show') ){
    var temp1 = 1
        console.log('this is not the main')
    var commentsURL = window.location.href
        var url2 = $('.wrapper.shown .comment-pagination .pagination a.next_page').attr('href')
        if ( $(window).scrollTop() > $(document ).height() - $(window).height() -100 && url2 ){
            $('.pagination').text('more posts are coming')
            $('.wrapper.shown .right-wrapper').addClass('loading')
            $.getScript( url2 )
        }
}
})
var lastReply = 0
$(document).on('click', '.reply-comment', function(){
    //alert('asd')
    lastReply++;
    $('.comment-replies').removeAttr('id')
    $(this).parents('.new-reply').siblings('.comment-replies').attr('id','last-reply')
})
}