"use strict";!function(n){var o=location.search.substring(1).split("=")[1];n.ajax({url:"http://10.31.158.43/dongfanggouwu/dongfanggouwu/php/details.php",data:{sid:o},dataType:"json"}).done(function(i){n("#detailspic").attr("src",i.pic),n("#detailsbpic").attr("src",i.pic),n("#loadtitle").html(i.title),n(".pricedetails").html(i.price),console.log(i);var t=i.spic.split(",");console.log(t);var o="";n.each(t,function(i,t){o+='\n           \n            <li class=" ">\n            <a href="javascript:; " ><img src="'+t+'" ">\n            </a>\n                </li>\n            '}),n(".detail_boxli").html(o)});var e=n(".imgzoom_pad"),a=n(".imgzoom_pup"),i=n(".imgzoom_window"),l=n(".imgzoom_wrapper_image"),c=n(".pv_shop_detail_info");a.width(e.width()*i.width()/l.width()),a.height(e.height()*i.height()/l.height());var s=l.width()/e.width();e.hover(function(){a.show(),i.show(),n(this).on("mousemove",function(i){var t=i.pageX-c.offset().left-a.width()/2,o=i.pageY-c.offset().top-a.height()/2;t<0?t=0:t>=e.width()-a.width()&&(t=e.width()-a.width()),o<0?o=0:o>=e.width()-a.width()&&(o=e.width()-a.width()),a.css("left",t),a.css("top",o),l.css("left",-t*s),l.css("top",-o*s)})},function(){a.hide(),i.hide()}),n(".detail_boxli").on("click","li",function(){var i=n(this).find("img").attr("src");n(this).addClass("on").siblings().removeClass("on"),n("#detailspic").attr("src",i),n("#detailsbpic").attr("src",i)});var t=5;n(".next ").on("click",function(){var i=n(".detail_boxli li");i.length>t&&(t++,n(".detail_boxli").animate({left:-(t-5)*i.eq(0).innerWidth()-6}))}),n(".prev ").on("click",function(){var i=n(".detail_boxli li");5<t&&(t--,n(".detail_boxli").animate({left:-(t-5)*i.eq(0).innerWidth()}))}),n(".bttnright").on("click",function(){var i=n(".bttnnum").val();i++,n(".bttnnum").val(i)}),n(".bttnleft").on("click",function(){var i=n(".bttnnum").val();--i<=1&&(i=1),n(".bttnnum").val(i)});var r=[],d=[];n(".addetails").on("click",function(){var i=o;if(n.cookie("cookiesid")&&n.cookie("cookienum")&&(r=n.cookie("cookiesid").split(","),d=n.cookie("cookienum").split(",")),-1!=n.inArray(i,r)){var t=parseInt(d[n.inArray(i,r)])+parseInt(n(".bttnnum").val());d[n.inArray(i,r)]=t,n.cookie("cookienum",d.toString(),10)}else r.push(i),n.cookie("cookiesid",r.toString(),10),d.push(n(".bttnnum").val()),n.cookie("cookienum",d.toString(),10);alert("添加购物车成功")})}(jQuery);