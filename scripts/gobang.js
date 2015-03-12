
var name=request("name");

var room=request("room");
var who=request("who");
if(who=="black" ){
				$("#turn").html("<h2>"+name+"，您是黑棋</h2>");
			}else{
				$("#turn").html("<h2>"+name+"，您是白棋</h2>");
			} 
var ready=false;
var id;
var me;
var turn;
window.onload=create;
 function load(){
 	var action={action:"box_load",room:room,ready:ready};
	$.post("room.php",action,function(data){
		var temp=JSON.parse(data);
		var boxid=temp["boxid"];
		var game_over;
		var game_new;
		turn=boxid[boxid.length-1][2];
		id=boxid[boxid.length-1][1];
		/*
		turn=temp["who"];
		id=temp["id"];
		var ready_txt =temp["ready"];
		game_new=temp["game_new"];
		game_over=temp["game_over"];
		*/
		for (var i=0;i<boxid.length;i++){
		 if(boxid[i][0]=="#")
		 	game_new=boxid[i][1];

		 if(boxid[i][0]=="@")
		 	game_over=boxid[i][1];
		}
		if(boxid[game_new][3]=="2")
			ready=true;
		else {ready=false;$("#lose").attr({"disabled":"disabled"});}
		if(!game_over || game_over<=game_new)
			game_over=boxid.length;
		
		//alert("new"+(game_new+1)+"i"+boxid[2][0]+"over"+game_over);
		for(var i=parseInt(game_new)+1;i<game_over;i++){ 
			if(i==boxid[boxid.length-1][1] && boxid[i][0]!="#" && boxid[i][0]!="@"){
				switch (boxid[i][2])
				{
				case "black":
				document.getElementById("gobang"+boxid[i][0]).className="col-xs-1 gobangblack_new";
  				$("#gobang"+boxid[i][0]).attr("src","image/gobangblack_new.png");
  				break;
  				case "white":
				document.getElementById("gobang"+boxid[i][0]).className="col-xs-1 gobangwhite_new";
  				$("#gobang"+boxid[i][0]).attr("src","image/gobangwhite_new.png");
  				break;
  				}
			}else if(boxid[i][2]=="black"){
				document.getElementById("gobang"+boxid[i][0]).className="col-xs-1 gobangblack";
  				$("#gobang"+boxid[i][0]).attr("src","image/gobangblack.png");
  			}else if(boxid[i][2]=="white"){	
  				document.getElementById("gobang"+boxid[i][0]).className="col-xs-1 gobangwhite";
  				$("#gobang"+boxid[i][0]).attr("src","image/gobangwhite.png");
  			}

		}
		if(boxid[boxid.length-1][0]=="@"){ 
		ifwin=1;
		$("#lose").attr({"disabled":"disabled"});
		ready=false;
		if (boxid[boxid.length-1][2]=="black")
			$("#turn").html("<h2>黑棋获胜</h2>");
		if (boxid[boxid.length-1][2]=="white")
			$("#turn").html("<h2>白棋获胜</h2>");
		}
	

 	});	
  	setTimeout("load()",1500);
}
			
			
	
function changebox(id,game_new){
  	if(id){
  		var i=0;
  		if(game_new){
  			i=parseInt(game_new);
  				for (;i<=id[id.length-1][2];i++){
  					if(id[i][1]=="black"){
  						if(i==id.length-1){
  							document.getElementById("gobang"+id[i][0]).className="col-xs-1 gobangblack_new";
  							$("#gobang"+id[i][0]).attr("src","image/gobangblack_new.png");
  						}else{
  						
  							document.getElementById("gobang"+id[i][0]).className="col-xs-1 gobangblack";
  							$("#gobang"+id[i][0]).attr("src","image/gobangblack.png");
  						}if(ifwin==0){
  							win(document.getElementById("gobang"+id[i][0]));}
  					}else if(id[i][1]=="white"){ 
  						if(i==id.length-1){
  							document.getElementById("gobang"+id[i][0]).className="col-xs-1 gobangwhite_new";
  							$("#gobang"+id[i][0]).attr("src","image/gobangwhite_new.png");
  						}else{
  							document.getElementById("gobang"+id[i][0]).className="col-xs-1 gobangwhite";
  							$("#gobang"+id[i][0]).attr("src","image/gobangwhite.png");
  						}
  						if(ifwin==0){
  							win(document.getElementById("gobang"+id[i][0]));}
  						}else{
  							return;
  						}
  				
				}
  			
  		}
	}
}
function create(){

	 ifwin=0;

	$("#gobangbox").find("img").click(chess);
	$("#gobangbox").find("img").addClass("gobang");
	load();
	$("#restart").click(restart);
	$("#lose").click(lose);
}

  function chess(e){
 	if(ifwin==1){alert("已分出胜负，请不要再挣扎了=、=");return;}else{
 	me=getActivatedObject(e);
	var h=me.id.substring(6,8);
	var l=me.id.substring(8,10);
	if(ready==true){
		if(turn !=who){
			if(who!="justlook"){
				if(me.className!="gobang"){
					me.className="col-xs-1 gobang"+who;
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

function lose(){ 
	if(who=="black") {
			who="white";
		}else{
		 	who="black";
		 }
	$("#lose").attr({"disabled":"disabled"});
	var data={who:who,room:room,name:name,action:"game_over",id:parseInt(id)+1};
	$.post("room.php",data,function(data){ 
		if(data=="game_over_ok"){ 
			ifwin=1;
			ready=false;
			alert("你输了。");
		}
	});

}

function restart(){ 
	if(ifwin==1){
		if(who=="black") {
			who="white";
		}else{
		 	who="black";
		 }
		var data={action:"box_restart",who:who,room:room,name:name,id:parseInt(id)+1};
		$.post("room.php",data,function(data){ 
			if(data=="box_restart_ok"){ 
				alert("已重新开始");
				ready=true;
				var url="room="+room+"&who="+who+"&name="+name;
    				window.location.href="box.html?"+url;
					}
				});
	}else{
		alert("需分出胜负才能重新开始哦~~~");
	}
}
function over(who){
	alert(who);
	ifwin=1;
}

 function win(e){
	 	me=e;
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
				if(me.className=="col-xs-1 gobangblack" || me.className=="col-xs-1 gobangblack_new"){
					over("黑棋获胜");
					wins=0;
				}else if (me.className=="col-xs-1 gobangwhite" || me.className=="col-xs-1 gobangwhite_new"){
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
	if(me.className=="col-xs-1 gobangblack" || me.className=="col-xs-1 gobangblack_new"){
		over("黑棋获胜");
		wins=0;
	}else if (me.className=="col-xs-1 gobangwhite" || me.className=="col-xs-1 gobangwhite_new"){
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
	if(me.className=="col-xs-1 gobangblack" || me.className=="col-xs-1 gobangblack_new"){
		over("黑棋获胜");
		wins=0;
	}else if (me.className=="col-xs-1 gobangwhite" || me.className=="col-xs-1 gobangwhite_new"){
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
	if(me.className=="col-xs-1 gobangblack" || me.className=="col-xs-1 gobangblack_new"){
		over("黑棋获胜");
		wins=0;
	}else if (me.className=="col-xs-1 gobangwhite" || me.className=="col-xs-1 gobangwhite_new"){
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
	if(me.className=="col-xs-1 gobangblack" || me.className=="col-xs-1 gobangblack_new"){
		over("黑棋获胜");
		wins=0;
	}else if (me.className=="col-xs-1 gobangwhite" || me.className=="col-xs-1 gobangwhite_new"){
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
	if(me.className=="col-xs-1 gobangblack" || me.className=="col-xs-1 gobangblack_new"){
		over("黑棋获胜");
		wins=0;
	}else if (me.className=="col-xs-1 gobangwhite" || me.className=="col-xs-1 gobangwhite_new"){
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
	if(me.className=="col-xs-1 gobangblack" || me.className=="col-xs-1 gobangblack_new"){
		over("黑棋获胜");
		wins=0;
	}else if (me.className=="col-xs-1 gobangwhite" || me.className=="col-xs-1 gobangwhite_new"){
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
	if(me.className=="col-xs-1 gobangblack" || me.className=="col-xs-1 gobangblack_new"){
		over("黑棋获胜");
		wins=0;
	}else if (me.className=="col-xs-1 gobangwhite" || me.className=="col-xs-1 gobangwhite_new"){
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
