<?php 
header("Content-Type: text/html; charset=utf-8");
$con = mysql_connect(SAE_MYSQL_HOST_M.':'.SAE_MYSQL_PORT,SAE_MYSQL_USER,SAE_MYSQL_PASS); 
if (!$con)
  {
  die('Could not connect: ' . mysql_error());
  }else{
  	mysql_select_db("app_tjzzz", $con); 
  	mysql_query('SET NAMES UTF8');
  	if($_REQUEST['action']=="room_create"){
  		$croom=$_REQUEST['croom'];
		$cname=$_REQUEST['cname'];
		$sql = "CREATE TABLE $croom
			(
			boxid varchar(4),
			id int,
			who varchar(5),
			rs int,
			name varchar(15)
			)";

	  	if(mysql_query($sql)){
	  		mysql_select_db("$croom", $con); 
	  		$sql="INSERT INTO $croom VALUES ('#', '0','black','1','$cname')";
	  		mysql_query($sql);
	  		echo "create_ok";
	  	}else{echo "create_worry";
	  }
}


  	if($_REQUEST['action']=="room_enter"){
  		$eroom=$_REQUEST['eroom'];
		$ename=$_REQUEST['ename'];
		mysql_select_db("$eroom", $con);
		$name1=mysql_result(mysql_query("select name from $eroom where boxid='#' or boxid='@' order by id DESC", $con),0);
		$name2=mysql_result(mysql_query("select name from $eroom where boxid='#' or boxid='@' order by id DESC", $con),1);
		if($name1==$ename){
		 	$name1who=mysql_result(mysql_query("select who from $eroom where boxid='#' or boxid='@' order by id DESC"),0);
		  	echo $name1who;
		}else if($name2==$ename){
		 	$name2who=mysql_result(mysql_query("select who from $eroom where boxid='#' or boxid='@' order by id DESC"),1);
			echo $name2who;
		}else if(mysql_result(mysql_query("select boxid from $eroom order by id DESC"),0) =='@'){
		  	$maxid=mysql_result(mysql_query("select max(id) from $eroom"),0)+1;
		  	$sql="INSERT INTO $eroom VALUES ('#', '$maxid','black','1','$ename')" ;
		  		if(mysql_query($sql))
		  			echo "enter_ok_black";
		  		else echo "enter_worry";
		  }else if(mysql_result(mysql_query("select rs from $eroom where boxid='#' order by id DESC"),0) =='2'){
		  	echo "justlook";
		  }else{ 
		  	$maxid=mysql_result(mysql_query("select max(id) from $eroom"),0)+1;
		  	$sql="INSERT INTO $eroom VALUES ('#', '$maxid','white','2','$ename')" ;
		  		if(mysql_query($sql))
		  			echo "enter_ok_white";
		  		else echo "enter_worry";
		  }
	}

  	if($_REQUEST['action']=="box_send"){
  		$boxid=$_REQUEST['boxid'];
		$id=$_REQUEST['id'];
		$who=$_REQUEST['who'];
		$room=$_REQUEST['room'];
		mysql_select_db("$room", $con); 
		if(mysql_query("INSERT INTO $room VALUES ('$boxid', '$id','$who','','')")){
			echo "box_send_ok";
		}
		}  
	if($_REQUEST['action']=="game_over"){
		$id=$_REQUEST['id'];
		$who=$_REQUEST['who'];
		$room=$_REQUEST['room'];
		$name=$_REQUEST['name'];
		mysql_select_db("$room", $con); 
		if(mysql_query("INSERT INTO $room VALUES ('@', '$id','$who','','$name')")){
			echo "game_over_ok";
		}
		}  
	if($_REQUEST['action']=="box_restart"){
  		$boxid=$_REQUEST['boxid'];
		$id=$_REQUEST['id'];
		$who=$_REQUEST['who'];
		$room=$_REQUEST['room'];
		$name=$_REQUEST['name'];
		mysql_select_db("$room", $con);
		if(mysql_result(mysql_query("select rs from $room where boxid='#' order by id DESC", $con),0)=='1'){ 
			if(mysql_query("INSERT INTO $room VALUES ('#', '$id','$who','2','$name')")){
			echo "box_restart_ok";
		}
		}
		if(mysql_query("INSERT INTO $room VALUES ('#', '$id','$who','1','$name')")){
			echo "box_restart_ok";
		}
		}  
  	if($_REQUEST['action']=="box_load"){
		$room=$_REQUEST['room'];
		mysql_select_db("$room", $con); 
		$sql=mysql_query("select boxid,id,who,rs,name from $room  order by id", $con);
		$return = array();
		while($row=mysql_fetch_array($sql)){
    			$return[] = $row;
		}
		/*
  		$who=mysql_result(mysql_query("select who from $room order by id DESC", $con),0);
  		$rs=mysql_result(mysql_query("select rs from $room where boxid='#' order by id DESC", $con),0);
  		$id=mysql_result(mysql_query("select id from $room order by id DESC", $con),0);
  		$game_new=mysql_result(mysql_query("select id from $room where boxid='#' order by id DESC", $con),0);
  		$game_over=mysql_result(mysql_query("select id from $room where boxid='@' order by id DESC", $con),0);
  		$game_over_who=mysql_result(mysql_query("select who from $room where boxid='@' order by id DESC", $con),0);
  		if($rs=='2') {$ready='ready_ok';} 
  		else {$ready='ready_worry';}
  		*/
		$mes = array(
			'boxid' =>$return
			/*
			'who'=>$who,
			'ready'=>$ready,
			'id'=>$id,
			'game_over'=>$game_over,
			'game_new'=>$game_new,
			'game_over_who'=>$game_over_who
			*/
		);
		print(json_encode($mes));
		}  		
	mysql_close($con); 
}