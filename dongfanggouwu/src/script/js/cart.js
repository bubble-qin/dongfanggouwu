! function($) {
    function goodslist(id, count) {
        $.ajax({
            url: 'http://10.31.158.43/dongfanggouwu/dongfanggouwu/php/dongfanggouwu.php',
            dataType: 'json'
        }).done(function(data) {
            //console.log(data)
            var $listpiclist1 = data.piclist1;
            console.log($listpiclist1)
            $.each($listpiclist1, function(index, value) {
                if (id == value.id) { //判断传参过来的id是否和收到后端的id相同

                    var $clonebox = $('.listcart:hidden').clone(true, true);

                    $clonebox.find('.pic').find('img').attr('src', value.pic);
                    $clonebox.find('.detail').find('a').html(value.title);
                    $clonebox.find('#price_1').html(value.price);
                    $clonebox.find('.pic').find('img').attr('sid', value.id);
                    $clonebox.find('.buy_num').val(count);
                    $clonebox.find('#total_1').html((value.price * count).toFixed(2));

                    $clonebox.css('display', 'block');
                    $('.left_block_list').append($clonebox);


                }
            });
        })
    }


    //2.获取cookie,

    if ($.cookie('cookiesid') && $.cookie('cookienum')) {
        var s = $.cookie('cookiesid').split(','); //id
        var n = $.cookie('cookienum').split(',') //数量
        $.each(s, function(i, value) {
            goodslist(s[i], n[i]);
        });
    }

    //3.判断购物车是否有东西
    kong()

    function kong() {
        if ($.cookie('cookiesid') && $.cookie('cookienum')) {

            $('.pv_cart_empty').hide();
            $('pv_cart_balance').show();
        } else {
            $('.pv_cart_empty').show();
            $('.pv_cart_balance').hide();
        }
    }

    //4计算总价和商品件数
    function priceall() {
        var $sum = 0; //商品件数
        var $count = 0; //总价
        $('.listcart:visible').each(function(index, element) {
            if ($(element).find('.input_normal').prop('checked')) {
                $sum += parseInt($(element).find('.buy_num').val()); //获取到购物车上面的数量
                $count += parseFloat($(element).find('#total_1').html()); //获取到购物车每件商品的单价

            }

        });
        $('#itemsCount').html($sum);
        $('.shangpin').find('em').eq(1).html($count.toFixed(2));

    };
    //5全选

    $('.checkqx').on('change', function() {
        $('.listcart:visible').find(':checkbox').prop('checked', $(this).prop('checked'));
        $('.checkqx').prop('checked', $(this).prop('checked'));
        priceall(); //取消重新算和。
    })

    var $inputs = $('.listcart:visible').find(':checkbox');
    $('.left_block_list').on('change', $inputs, function() { //事件委托this指向被委托的元素
        if ($('.listcart:visible').find('input:checkbox').length == $('.listcart:visible').find('input:checked').size()) {
            $('.checkqx').prop('checked', true);

        } else {
            $('.checkqx').prop('checked', false);
        }
        priceall();

    });

    //6.数量的改变

    //加
    $('.pluss').on('click', function() {
        var $count = $(this).parents('.listcart').find('.buy_num').val();
        $count++;
        if ($count >= 999) {
            $count = 999;
        }
        $(this).parents('.listcart').find('.buy_num').val($count); //赋值回去
        $(this).parents('.listcart').find('#total_1').html(singlegoodsprice($(this)))
        priceall();
        setcookie($(this));
    })

    //减

    $('.cuts').on('click', function() {
            var $count = $(this).parents('.listcart').find('.buy_num').val();
            $count--;
            if ($count <= 1) {
                $count = 1;
            }
            $(this).parents('.listcart').find('.buy_num').val($count); //赋值回去
            $(this).parents('.listcart').find('#total_1').html(singlegoodsprice($(this))); //改变后的价格
            priceall();
            setcookie($(this));
        })
        //input输入改变数量
    $('.buy_num').on('input', function() {
        var $reg = /^\d+$/g; //正则判断是一个数字
        var $value = parseInt($(this).val()); //当前的值
        if ($reg.test($value)) { //判断当前的值是否是数字
            if ($value >= 999) {
                $(this).val(999);
            } else if ($value <= 0) {
                $(this).val(1);
            } else {
                $(this).val($value)
            }
        } else {
            $(this).val(1);
        }
        $(this).parents('.listcart').find('#total_1').html(singlegoodsprice($(this)));
        priceall();
        setcookie($(this));
    })


    //7.计算数量改变后每个商品的价格

    function singlegoodsprice(obj) { //obj当前的元素
        var $dj = parseFloat(obj.parents('.listcart').find('#price_1').html());

        var $cnum = parseInt(obj.parents('.listcart').find('.buy_num').val());

        return ($dj * $cnum).toFixed(2);
    }

    //8.将改变后的数量存放到cookie

    var arrsid = [];
    var arrnum = []

    function cookietoarray() {
        if ($.cookie('cookiesid') && $.cookie('cookienum')) { //如果存在
            arrsid = $.cookie('cookiesid').split(',');
            arrnum = $.cookie('cookienum').split(',');

        }
    }

    function setcookie(obj) { //当前操作的元素
        cookietoarray(); //得到上面函数的数组
        var $index = obj.parents('.listcart').find('img').attr('sid'); //
        arrnum[$.inArray($index, arrsid)] = obj.parents('.listcart').find('.buy_num').val();
        $.cookie('cookienum', arrnum.toString(), 7);
    }


    //9删除
    function delgoodslist(sid, arrsid) {
        var $index = -1;
        $.each(arrsid, function(index, value) {
            if (sid == value) {
                $index = index;
            }
        });
        arrsid.splice($index, 1);
        arrnum.splice($index, 1);
        $.cookie('cookiesid', arrsid.toString(), 7);
        $.cookie('cookienum', arrnum.toString(), 7);

    }

    //删除单个
    $('.left_block_list').on('click', '.removedel', function(ev) {

        cookietoarray();
        if (confirm('您确定要删除嘛？')) {
            $(this).first().parents('.listcart').remove();
        }
        delgoodslist($(this).first().parents('.listcart').find('img').attr('sid'), arrsid);
        priceall();
    });

    //删除多个
    $('.removecart').on('click', function() {
        cookietoarray();
        if (confirm('您确定要全部删除嘛？')) {
            $('.listcart:visible').each(function() {
                if ($(this).find('input:checkbox').is(':checked')) {
                    $(this).remove();
                    delgoodslist($(this).find('img').attr('sid'), arrsid);
                }
            })
            priceall();
        }
    })
}(jQuery)