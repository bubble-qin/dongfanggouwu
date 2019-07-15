! function($) {

    //获取id
    var picid = location.search.substring(1).split('=')[1];

    $.ajax({
        url: 'http://10.31.158.43/dongfanggouwu/dongfanggouwu/php/details.php',
        data: {
            sid: picid
        },
        dataType: 'json'
    }).done(function(data) {


        $('#detailspic').attr('src', data.pic); //小图
        $('#detailsbpic').attr('src', data.pic); //大图
        $('#loadtitle').html(data.title); //title
        $('.pricedetails').html(data.price); //价格
        console.log(data)
        var arr = data.spic.split(','); //将缩略图转换成逗号隔开的数组
        console.log(arr);
        var str = '';
        $.each(arr, function(index, value) {
            str += `
           
            <li class=" ">
            <a href="javascript:; " ><img src="${value}" ">
            </a>
                </li>
            `
        });

        $('.detail_boxli').html(str);



    });

    const $spic = $('.imgzoom_pad'); //小图
    const $sf = $('.imgzoom_pup'); //小放
    const $bf = $('.imgzoom_window'); //大放
    const $bpic = $('.imgzoom_wrapper_image'); //大图
    const $details = $('.pv_shop_detail_info');



    $sf.width($spic.width() * $bf.width() / $bpic.width());

    $sf.height($spic.height() * $bf.height() / $bpic.height());
    var bili = $bpic.width() / $spic.width();
    $spic.hover(function() {
        $sf.show();
        $bf.show();
        $(this).on('mousemove', function(ev) {
            var $left = ev.pageX - $details.offset().left - $sf.width() / 2;
            var $top = ev.pageY - $details.offset().top - $sf.height() / 2;
            if ($left < 0) {
                $left = 0;
            } else if ($left >= $spic.width() - $sf.width()) {
                $left = $spic.width() - $sf.width();
            }
            if ($top < 0) {
                $top = 0;
            } else if ($top >= $spic.width() - $sf.width()) {
                $top = $spic.width() - $sf.width();
            }

            $sf.css('left', $left);
            $sf.css('top', $top);
            $bpic.css('left', -$left * bili);
            $bpic.css('top', -$top * bili);
        })
    }, function() {
        $sf.hide();
        $bf.hide();
    })

    //点击小图
    $('.detail_boxli').on('click', 'li', function() {
        var $imgurl = $(this).find('img').attr('src');
        $(this).addClass('on').siblings().removeClass('on');

        $('#detailspic').attr('src', $imgurl); //小图
        $('#detailsbpic').attr('src', $imgurl); //大图
    })

    var $num = 5;

    $('.next ').on('click', function() { //右箭头添加点击

        var $list = $('.detail_boxli li');
        if ($list.length > $num) {
            $num++;
            $('.detail_boxli').animate({
                left: -($num - 5) * $list.eq(0).innerWidth() - 6
            })
        }
    })

    $('.prev ').on('click', function() { //右箭头添加点击

        var $list = $('.detail_boxli li');
        if ($num > 5) {
            $num--;
            $('.detail_boxli').animate({
                left: -($num - 5) * $list.eq(0).innerWidth()
            })
        }
    })


    $('.bttnright').on('click', function() {

        var $num = $('.bttnnum').val();
        $num++;
        $('.bttnnum').val($num)

    })
    $('.bttnleft').on('click', function() {
        var $num = $('.bttnnum').val();
        $num--;
        if ($num <= 1) {
            $num = 1
        }
        $('.bttnnum').val($num)
    })




    var arrsid = [];
    var arrnum = [];

    function cookietoarray() {
        if ($.cookie('cookiesid') && $.cookie('cookienum')) {
            arrsid = $.cookie('cookiesid').split(',');
            arrnum = $.cookie('cookienum').split(',');
        }
    }

    $('.addetails').on('click', function() {

        var $sid = picid;
        cookietoarray();

        if ($.inArray($sid, arrsid) != -1) { //表示商品存在
            var num = parseInt(arrnum[$.inArray($sid, arrsid)]) + parseInt($('.bttnnum').val());
            arrnum[$.inArray($sid, arrsid)] = num;
            $.cookie('cookienum', arrnum.toString(), 10);

        } else {
            arrsid.push($sid);
            $.cookie('cookiesid', arrsid.toString(), 10);
            arrnum.push($('.bttnnum').val());
            $.cookie('cookienum', arrnum.toString(), 10);
        }

        alert('添加购物车成功');

    });




}(jQuery)