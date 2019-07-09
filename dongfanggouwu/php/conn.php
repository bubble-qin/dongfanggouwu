<?php

header('content-type:text/html;charset=utf-8');



define('HOST','localhost');
define('USERNAME','root');
define('PASSWORD','');
define('DBNAME','dongfanggouwu');

$conn=@new mysqli(HOST,USERNAME,PASSWORD,DBNAME);//进行容错

if($conn->connect_error){//如果连接数据失败
    die('数据库连接失败：'.$conn->connect_error);
}

$conn->query('SET NAMES UTF8');//设置字符集

//判断该值是否在数据库中存在