;
! function($) {
    //banner数据


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
    // $.ajax({
    //     url: 'php/banner.php',
    //     dataType: 'json'
    // }).done(function(bannerdata) {
    //     $.each(bannerdata, function(index, value) {
    //         var $bannerstr = '<ul>';

    //     });
    // });


    $.ajax({
        url: 'http://10.31.158.43/dongfanggouwu/dongfanggouwu/php/dongfanggouwu.php',
        dataType: 'json'
    }).done(function(data) {
        var $html = '';
        var $html1 = '';
        console.log(data)
        var $listpiclist1 = data.piclist1;
        var $listpiclist2 = data.piclist2;
        console.log($listpiclist1);
        console.log($listpiclist2);
        $.each($listpiclist2, function(index, value) {
            $html1 += `           
<div class="indexTvrebosliderBoxFloatItem mg20 ">
<div class="hCommonItem ">
    <div class="hItemShowImg ">
        <a href="details.html?sid=${value.id} " target="_blank "><img src="${value.pic}" data-kitten="${value.pic} "></a>
    </div>
    <div class="hItemShowTitle "><a href="${value.id} " target="_blank ">${value.title}</a></div>
    <div class="hItemShowMoney "><span>￥</span>${value.price}<del>${value.price}</del>
        <div class="hyouhuiicon "></div>
    </div>
</div>
</div>
            
            `
        });
        $('.listdata1').html($html1);

        $.each($listpiclist1, function(index, value) {
            $html += `
            <div class="hindexProjectListBoxrightItemList ">
            <div class="hCommonItem ">
                <div class="hItemShowImg ">
                    <a href="details.html?sid=${value.id} " target="_blank "><img data-kitten="${value.pic}" title="${value.title}" src="${value.pic}" class="lazyloadnew "></a>
                </div>
                <div class="hItemShowTitle"><a href="details.html?sid=${value.id}" target="_blank ">${value.title}</a></div>
                <div class="hItemShowMoney"><span>￥</span>${value.price}<del>${value.price}</del>
                    <div class="hyouhuiicon"></div>
                </div>
            </div>
        </div>
            `;
        });

        $('.listdata').html($html);


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
    const $indexrow = $('.index-row-1') //获取到最大的盒子
    const $indexLeftNavBoxs = $(''); //导航栏元素
    const $hIndexLeftNavShowContentModule = $('.hIndexLeftNavShowContentModule'); //菜单栏元素
    const $indexLeftNavBoxMask = $('.indexLeftNavBoxMask') //导航栏标记元素
    let $num = 0;

    // $indexrow.hover(function(ev) {
    //         if (ev.target.nodeName == 'DIV') {
    //             console.log(ev.target);
    //             //console.log(ev.target.index());
    //             let $thistarget = ev.target;



    //             //$hIndexLeftNavShowContentModule.eq($thistarget.index()).show();


    //         }
    //     },

    //     function(ev) {

    //     })


    // $indexLeftNavBoxs.hover(function() {
    //     $num = $(this).index()
    //     $hIndexLeftNavShowContentModule.eq($num).show();
    //     $indexLeftNavBoxMask.eq($num).show();
    // }, function() {
    //     $num = $(this).index()
    //     $hIndexLeftNavShowContentModule.eq($num).hide();
    //     $indexLeftNavBoxMask.eq($num).hide();
    // })



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


    //数据渲染





}(jQuery);