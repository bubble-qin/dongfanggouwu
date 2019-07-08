;
! function($) {
    //banner数据
    $.ajax({
        url: 'php/banner.php',
        dataType: 'json'
    }).done(function(bannerdata) {
        $.each(bannerdata, function(index, value) {
            var $bannerstr = '<ul>';

        });
    });

    //lunbo数据
    // $.ajax({
    //     url: 'php/banner.php',
    //     dataType: 'json'
    // }).done(function(bannerdata) {
    //     $.each(bannerdata, function(index, value) {
    //         var $bannerstr = '<ul>';

    //     });
    // });



    //tab切换数据
    $.ajax({
        url: 'php/banner.php',
        dataType: 'json'
    }).done(function(bannerdata) {
        $.each(bannerdata, function(index, value) {
            var $bannerstr = '<ul>';

        });
    });
}(jQuery);

! function() {
    //banner效果

}(jQuery);

! function($) {
    //lunbo效果


    $('.silderNav').eq(0).lunbo({
        btns: '	ul li ',
        pics: '.hindexbannerBoxShowContentImg',
        activeclass: 'bttn-color',
        showclass: 'slick-show',
        etype: 'mouseover',
        effict: 'opacity',
        arrow: 'true',
        autoplay: true


    })

}(jQuery);

! function($) {
    //菜单
    const $indexLeftNavBoxs = $('.indexLeftNavBox');
    const $hIndexLeftNavShowContentModule = $('.hIndexLeftNavShowContentModule');
    const $indexLeftNavBoxMask = $('.indexLeftNavBoxMask')
    let $num = 0;

    $indexLeftNavBoxs.hover(function() {
        $num = $(this).index()
        $hIndexLeftNavShowContentModule.eq($num).show();
        $indexLeftNavBoxMask.eq($num).show();
    }, function() {
        $num = $(this).index()
        $hIndexLeftNavShowContentModule.eq($num).hide();
        $indexLeftNavBoxMask.eq($num).hide();
    })

    //楼梯

    const $rightFixNavButtonLink = $('.rightFixNavButton .rightFixNavButtonLink') //获取楼梯
    const $gotop = $('.g-go-top') //获取返回顶部元素
    const $louceng = $('.louceng') //楼层
    $(window).on('scroll', function() {
        let $scrolltop = $(window).scrollTop();

        $louceng.each(function(index, element) {
            //获取每一层的top值
            let $loucengtop = $louceng.eq(index).offset().top + $(element).height() / 2;


            if ($loucengtop >= $scrolltop) {
                $rightFixNavButtonLink.removeClass('flightname');
                $rightFixNavButtonLink.eq(index).addClass('flightname');
                return false;
            }
        })

    });
    $rightFixNavButtonLink.on('click', function() {
        $(this).addClass('flightname').siblings().removeClass('flightname');
        let $loucengtop = $louceng.eq($(this).index()).offset().top;
        $('html,body').animate({
            scrollTop: $loucengtop
        }, 10)
    })

    $gotop.on('click', function() {
        $('html,body').animate({
            scrollTop: 0
        }, 10)
    })


    //tab  

    $('.hindexhuiyuanConentShowNavtabBarButton ').on('click', function() {
        $(this).addClass('hfroce').siblings().removeClass('hfroce');
        $('.hindexhuiyuanConentShowNavtabShowContentList').eq($(this).index()).addClass('displaytab').siblings().removeClass('displaytab');

    })




}(jQuery);