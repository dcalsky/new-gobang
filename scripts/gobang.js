var room=request("room");
var name=request("name");
var who=request("who");
var ready;
var id;
window.onload=create;
 function load(){
 	var action={action:"box_load",room:room,ready:ready};
	$.post("room.php",action,function(data){
		var temp=JSON.parse(data);
		var boxid=temp["boxid"];
		turn=temp["who"];
		id=temp["id"];
		lastbox=temp["lastbox"];
		if(temp["ready"]=="ready_ok"){
			ready=true;
			if(turn=="black" ){$("#turn").text("轮到：白棋");}else{$("#turn").text("轮到：黑棋");}
		}else{	
			ready=false;
			$("#turn").text("比赛尚未开始...");
		} 
		changebox(boxid);
 	});
  	setTimeout("load()",1000);
}
  function changebox(id){
  	if(id){
  		for (var i=0;i<id.length;i++){  
  			if(id[i][0] !="#"){
		if(id[i][1]=="black"){
			if(i==id.length-1){
              			document.getElementById("gobang"+id[i][0]).className="gobangblack_new";
              		}else{
              			document.getElementById("gobang"+id[i][0]).className="gobangblack";
              		}
              		if(ifwin==0){
              			win(document.getElementById("gobang"+id[i][0]));}
          		}else if(id[i][1]=="white"){ 
          			if(i==id.length-1){
       				document.getElementById("gobang"+id[i][0]).className="gobangwhite_new";
       			}else{
          				document.getElementById("gobang"+id[i][0]).className="gobangwhite";
          			}
          			if(ifwin==0){
          				win(document.getElementById("gobang"+id[i][0]));}
      			}else{
      				return;
      			}
            		}else{
            			$("#gobangbox").find("img").attr("src","image/bg.jpg");
			}
		}
	}
}
function create(){
	/*
$(window).resize(function(){
	var body_height=$(document.body).height();
	var body_width=$(document.body).width();
	if(body_width>body_height){
		$("#gobangbox").height(body_height);
		$("#gobangbox").width($("#gobangbox").height());
	}else{ 
		$("#gobangbox").width(body_width);
		$("#gobangbox").height($("#gobangbox").width()-80);
	}
});
*/
	 ifwin=0;
	$("#gobangbox").find("img").click(chess);
	load();
	$("#restart").click(restart);
}

  function chess(e){
 	if(ifwin==1){alert("已分出胜负，请不要再挣扎了=、=");return;}else{
	me=getActivatedObject(e);
	var h=me.id.substring(6,8);
	var l=me.id.substring(8,10);
	if(ready==true){
		if(turn !=who){
			if(who!="justlook"){
				if(me.className=="gobang"){
					me.className="gobang"+who;
					var data={boxid:h+l,who:who,room:room,action:"box_send",id:parseInt(id)+1};
					$.post("room.php",data,function(data){ 
						if(data=="box_send_ok")
							win(me);
					});
				}else{alert("请不要在已经下过的地方...");return ;}
			}else{alert("你只是一个看客...");}
		}else{alert("还没轮到你下呢...");return ;}
	}else{alert("游戏尚未开始...");return;}
			    
			}
}

function restart(){ 
if(ifwin==1){
	if(who=="black") {
		who="white";
	}else{
	 	who="black";
	 }
	var data={action:"box_restart",who:who,room:room,name:name};
	$.post("room.php",data,function(data){ 
		if(data=="box_restart_ok"){ 
			alert("已重新开始");
			$("#gobangbox").find("img").attr("src","image/bg.jpg");
			ifwin=0;
		}
			});
}else{alert("需分出胜负才能重新开始哦~~~");}
}
function over(who){
	alert(who);
	ifwin=1;
}

 function win(e){
	 	var me=e;
	  	var meid=me.id;
	  	var x=parseInt(meid.substring(6,8));
	  	var y=parseInt(meid.substring(8,10));
	  	左下角(x,y);
	  	左上角(x,y);
	  	左(x,y);
	  	右(x,y);
	  	右上角(x,y);
	  	右下角(x,y);
	  	下(x,y);
	  	上(x,y);
	  	var wins=0;
	}
function 左下角(h,l){
	  	for(var i=0;i<5;i++){//左下角
	  	 	var h=h-1;
	  	 	var l=l+1;
	  	 	if(h<0 ||  l<0 || h>14 || l>14){
	  	 		break;
	  	 	}   
			if(h<10){
				h="0"+h.toString();}else{h=h.toString();
			}
			if(l<10){
				l="0"+l.toString();}else{l=l.toString();
			}
     			if(document.getElementById("gobang"+h+l).className==me.className){
          				wins++;
				h=parseInt(h);
				l=parseInt(l);
				if(wins==4){
				if(me.className=="gobangblack"){
					over("黑棋获胜");
					wins=0;
				}else if (me.className=="gobangwhite"){
					over("白旗获胜");
					wins=0;
				}
			}
			}else{
				wins=0;
      				break;
      			}
		}	  	 
	}
function 左上角(h,l){
 	for(var i=0;i<5;i++){//左上角
	  	  var h=h-1;
	  	 	var l=l-1;
	  	 	if(h<0 ||  l<0 || h>14 || l>14){break;}   
if(h<10){h="0"+h.toString();}else{h=h.toString();}
	if(l<10){l="0"+l.toString();}else{l=l.toString();}   
     if(document.getElementById("gobang"+h+l).className==me.className){
          wins++;
		h=parseInt(h);
		l=parseInt(l);
if(wins==4){
	if(me.className=="gobangblack"){
		over("黑棋获胜");
		wins=0;
	}else if (me.className=="gobangwhite"){
		over("白旗获胜");
		wins=0;
		}
}
	}else{
		wins=0;
      	break;
      }
} 
}
function 右下角(h,l){
for(var i=0;i<5;i++){//右下角
	  	 	var h=h+1;
	  	 	var l=l+1;
	  	 	if(h<0 ||  l<0 || h>14 || l>14){break;}   
if(h<10){h="0"+h.toString();}else{h=h.toString();}
	if(l<10){l="0"+l.toString();}else{l=l.toString();}     
     if(document.getElementById("gobang"+h+l).className==me.className){
          wins++;
		h=parseInt(h);
		l=parseInt(l);
if(wins==4){
	if(me.className=="gobangblack"){
		over("黑棋获胜");
		wins=0;
	}else if (me.className=="gobangwhite"){
		over("白旗获胜");
		wins=0;
		}
}
	}else{
		wins=0;
      	break;
      }
}
}
function 右上角(h,l){
 for(var i=0;i<5;i++){//右上角
	  	 	var h=h+1;
	  	 	var l=l-1;
	  	 	if(h<0 ||  l<0 || h>14 || l>14){break;}   
if(h<10){h="0"+h.toString();}else{h=h.toString();}
	if(l<10){l="0"+l.toString();}else{l=l.toString();}     
     if(document.getElementById("gobang"+h+l).className==me.className){
          wins++;
		h=parseInt(h);
		l=parseInt(l);
if(wins==4){
	if(me.className=="gobangblack"){
		over("黑棋获胜");
		wins=0;
	}else if (me.className=="gobangwhite"){
		over("白旗获胜");
		wins=0;
		}
}
	}else{
		wins=0;
      	break;
      }
}
}
function 下(h,l){
 for(var i=0;i<5;i++){//下
	  	 	var h=h;
	  	 	var l=l+1;
	  	 	if(h<0 ||  l<0 || h>14 || l>14){break;}   
if(h<10){h="0"+h.toString();}else{h=h.toString();}
	if(l<10){l="0"+l.toString();}else{l=l.toString();}     
     if(document.getElementById("gobang"+h+l).className==me.className){
          wins++;
		h=parseInt(h);
		l=parseInt(l);
if(wins==4){
	if(me.className=="gobangblack"){
		over("黑棋获胜");
		wins=0;
	}else if (me.className=="gobangwhite"){
		over("白旗获胜");
		wins=0;
		}
}
	}else{
		wins=0;
      	break;
      }
}
}
function 上(h,l){
 for(var i=0;i<5;i++){//上
	  	 	var h=h;
	  	 	var l=l-1;
	  	 	if(h<0 ||  l<0 || h>14 || l>14){break;}   
if(h<10){h="0"+h.toString();}else{h=h.toString();}
	if(l<10){l="0"+l.toString();}else{l=l.toString();}     
     if(document.getElementById("gobang"+h+l).className==me.className){
          wins++;
		h=parseInt(h);
		l=parseInt(l);
if(wins==4){
	if(me.className=="gobangblack"){
		over("黑棋获胜");
		wins=0;
	}else if (me.className=="gobangwhite"){
		over("白旗获胜");
		wins=0;
		}
}
	}else{
		wins=0;
      	break;
      }
}
}
function 左(h,l){
 for(var i=0;i<5;i++){//左
	  	 	var h=h-1;
	  	 	var l=l;
	  	 	if(h<0 ||  l<0 || h>14 || l>14){break;}   
if(h<10){h="0"+h.toString();}else{h=h.toString();}
	if(l<10){l="0"+l.toString();}else{l=l.toString();}     
     if(document.getElementById("gobang"+h+l).className==me.className){
          wins++;
		h=parseInt(h);
		l=parseInt(l);
if(wins==4){
	if(me.className=="gobangblack"){
		over("黑棋获胜");
		wins=0;
	}else if (me.className=="gobangwhite"){
		over("白旗获胜");
		wins=0;
		}
}
	}else{
		wins=0;
      	break;
      }
}
}
function 右(h,l){
 for(var i=0;i<5;i++){//右
	  	 	var h=h+1;
	  	 	var l=l;
	  	 	if(h<0 ||  l<0 || h>14 || l>14){break;}   	  	 	
if(h<10){h="0"+h.toString();}else{h=h.toString();}
	if(l<10){l="0"+l.toString();}else{l=l.toString();}     

     if(document.getElementById("gobang"+h+l).className==me.className){
          wins++;
		h=parseInt(h);
		l=parseInt(l);
if(wins==4){
	if(me.className=="gobangblack"){
		over("黑棋获胜");
		wins=0;
	}else if (me.className=="gobangwhite"){
		over("白旗获胜");
		wins=0;
		}
}
	}else{
		wins=0;
      	break;
      }
}
}
