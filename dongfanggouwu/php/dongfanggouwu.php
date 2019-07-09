<?php

require "conn.php";//连接外部php

$result=$conn->query("select * from dfgw");//查询数据库数据

$arr=array();//定义空数组
for($i=0;$i<$result->num_rows;$i++){
    $arr[$i]=$result->fetch_assoc();
}


$result1=$conn->query("select * from dfgw limit 6");//查询数据库数据

$arr1=array();//定义空数组
for($i=0;$i<$result1->num_rows;$i++){
    $arr1[$i]=$result1->fetch_assoc();
}



//echo json_encode($arr);

class indexdata{

}

$indexpiclist=new indexdata();
$indexpiclist->piclist1=$arr;
$indexpiclist->piclist2=$arr1;
echo json_encode($indexpiclist);