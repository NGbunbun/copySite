$(function(){
    // ハンバーガーアニメーション
    $('.menu').on('click', function(){
        $('.is-01, .is-02, .is-03').toggleClass('menu-active');
        $('.is-04, .is-05').toggleClass('menu-activeX');
        $('.hidden-menu').toggleClass('panelactive');
    });

    // スクロールしたら背景変える
    $(window).on('scroll', function(){
        let elemPos      = $('.services').offset().top + 1200;
        let scroll       = $(window).scrollTop();
        let windowHeight = $(window).height();
        if(scroll >= elemPos - windowHeight){
            $('.services').addClass('is-color');
        } else {
            $('.services').removeClass('is-color');
        }
    });

    // テキストアニメーション
    function SmoothTextAnime() {
        $('.smoothTextTrigger').each(function(){
            var elemPos      = $(this).offset().top - 100;
            var scroll       = $(window).scrollTop();
            var windowHeight = $(window).height();
            if (scroll >= elemPos - windowHeight){
                $(this).addClass('smoothTextAppear');
            }
        });	
    }

    // 下からふわっと出現
    function fadeAnime() {
        $('.fadeUpTrigger').each(function(){
            let elemPos      = $(this).offset().top + 100;
            let scroll       = $(window).scrollTop();
            let windowHeight = $(window).height();
            if(scroll >= elemPos - windowHeight){
                $(this).addClass('fadeUp');
            }
        });
    }

    $(window).on('load', function () {
        SmoothTextAnime();
    });
    $(window).on('scroll', function(){
        fadeAnime();
    });

});