<?php

require "conn.php";//连接外部php

$id=$_GET['sid'];


$result=$conn->query("select * from dfgw where id=$id ");

	echo json_encode($result->fetch_assoc());

