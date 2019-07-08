;
(function($) {
    $.fn.lunbo = function(options) { //options调用时候传过来的对象
        let settings = {
                //默认参数  
                btns: 'ol li',
                pics: 'ul li',
                activeclass: 'active', //当前点击的元素激活的类名
                showclass: 'showpic', //显示图片的类
                etype: 'click', //默认的事件
                effict: 'display', //图片切换的形式  display/opacity
                arrow: 'true', //是否带箭头 true/false
                autoplay: true //是否轮播  true  /false
            }
            //配置参数覆盖默认的参数
        $.extend(true, settings, options); //用一个或多个其他对象来扩展一个对象，返回被扩展的对象。

        $(this).each(function(index, element) { //遍历   index为当前元素索引   element为当前的元素
            let $num = 0; //定义一个变量接收索引

            let $btns = $(element).find(settings.btns); //获取到默认参数里面的按钮
            //判断客户传来的etype是click还是mouseover
            if (settings.etype === 'click' || settings.etype !== 'mouseover') {
                $btns.on('click', function() {
                    $num = $(this).index(); //将当前的元素的索引给num
                    tabswitch();

                });
            } else {
                $btns.on(settings.etype, function() {
                    $num = $(this).index(); //将当前的元素的索引给num
                    tabswitch();
                });
            }

            //是否显示左右箭头
            if (settings.arrow) {
                $(this).hover(function() {
                    $(element).find('.slick-next').show();
                    $(element).find('.slick-prev').show();
                }, function() {
                    $(element).find('.slick-next').hide();
                    $(element).find('.slick-prev').hide();
                })
            }

            if (settings.autoplay) { //
                $(this).hover(function() {
                    clearInterval(timer);
                }, function() {
                    timer = setInterval(function() {
                        $(element).find('.slick-next').click();
                    }, $.type(settings.autoplay) === 'number' ? settings.autoplay : 3000);

                });
            }


            $(element).find('.slick-next').on('click', function() {
                $num++;
                if ($num > $btns.length - 1) {
                    $num = 0;
                }
                tabswitch();
            });

            $(element).find('.slick-prev').on('click', function() {
                $num--;
                if ($num < 0) {
                    $num = $btns.length - 1;
                }
                tabswitch();
            });

            if (settings.autoplay === 'true' || settings.autoplay === true || ($.type(settings.autoplay) === 'number' && settings.autoplay >= 3000)) {
                //判断是否轮播   
                timer = setInterval(function() {
                    $(element).find('.slick-next').click();

                }, $.type(settings.autoplay) === 'number' ? settings.autoplay : 3000)
            }


            function tabswitch() {
                // 将当前的按钮添加actve类名  但是其他的同辈元素取消该类名
                $btns.eq($num).addClass(settings.activeclass).siblings().removeClass(settings.activeclass);
                if (settings.effict === 'display' || settings.effict !== 'opacity') {
                    $(element).find(settings.pics).eq($num).addClass(settings.showclass).siblings().removeClass(settings.showclass);
                } else {
                    $(element).find(settings.pics).css('transition', 'all 0.5s');
                    $(element).find(settings.pics).eq($num).addClass(settings.showclass).siblings().removeClass(settings.showclass);
                }

            }


        });


    }

})(jQuery)