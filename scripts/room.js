// 用#表示重新开始，用@表示说话
$(document).ready(function(){ 
$("#create").click(createroom);
$("#enter").click(enterroom);
});
function createroom(){ 
	var cname=$("#name").val();
	var croom=$("#room").val();
	if (/[\u4E00-\u9FA5]/i.test(croom)) {
    		alert('约定的不输入汉子呢...');
    		return;
	}else{
	   	var data={croom:croom,action:"room_create",cname:cname};
		$.post("http://4.tjzzz.sinaapp.com/room.php",data,function(data){ 
		switch(data)
		{
		case "create_ok":
			var url="room="+croom+"&who=black"+"&name="+cname;
	    		window.location.href="box.html?"+url;
	    	break;
	    	case "create_worry":
	    		alert("该房间已被占用 Or 空格或数字导致房间创建失败.");
	    	break;
	    	default:
	    		//其他问题处理
		}
	});
}
}

function enterroom(){
	var ename=$("#name").val();
	var eroom=$("#room").val();
   	var data={eroom:eroom,action:"room_enter",ename:ename};
	$.post("http://4.tjzzz.sinaapp.com/room.php",data,function(data){ 
		switch(data)
	{
	case "enter_ok_white":
		var url="room="+eroom+"&who=white"+"&name="+ename;
    		window.location.href="box.html?"+url;
    	break;
    		case "enter_ok_black":
		var url="room="+eroom+"&who=black"+"&name="+ename;
    		window.location.href="box.html?"+url;
    	break;
    	case "white":
		var url="room="+eroom+"&who=white"+"&name="+ename;
    		window.location.href="box.html?"+url;
    	break;
    	case "black":
		var url="room="+eroom+"&who=black"+"&name="+ename;
    		window.location.href="box.html?"+url;

    	break;
	case "justlook":
		var url="room="+eroom+"&who=justlook"+"&name="+ename;
    		window.location.href="box.html?"+url;
    	break;
    	default:
    	alert("进入失败，请检查房间名...");
    		//其他问题处理
	}
});
}