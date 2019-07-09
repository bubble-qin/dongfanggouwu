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
        console.log(data);
        $('#detailspic').attr('src', data.pic);
        $('#detailsbpic').attr('src', data.pic);
        $('#loadtitle').html(data.title);
        $('.pricedetails').html(data.price);



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

}(jQuery)