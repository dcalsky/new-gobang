/*
function judge(str){ 
		var patrn=/[!#$%^&*]+/g;
		if(!patrn.test(str)){ 
			if(str.indexOf(" ") <0){
			return "ok"; 
			}else{return "请勿输入任何空格.";}
		}else{return "请勿输入!#$%^&*一类的字符";}
}
*/
function getActivatedObject(e) {
  var obj;
  if (!e) {
    // early version of IE
    obj = window.event.srcElement;
  } else if (e.srcElement) {
    // IE 7 or later
    obj = e.srcElement;
  } else {
    // DOM Level 2 browser
    obj = e.target;
  }
  return obj;
}
function request(paras){ 
var url = location.href;  
var paraString = url.substring(url.indexOf("?")+1,url.length).split("&");  
var paraObj = {}  
for (i=0; j=paraString[i]; i++){  
paraObj[j.substring(0,j.indexOf("=")).toLowerCase()] = j.substring(j.indexOf("=")+1,j.length);  
}  
var returnValue = paraObj[paras.toLowerCase()];  
if(typeof(returnValue)=="undefined"){  
return "";  
}else{  
return returnValue;  
}  
}

function isArray(arg) {
  if (typeof arg == 'object') {
    var criteria = arg.constructor.toString().match(/array/i);
    return (criteria != null);
  }
  return false;
}


function addEventHandler(obj, eventName, handler) {
  if (document.attachEvent) {
    obj.attachEvent("on" + eventName, handler);
  } else if (document.addEventListener) {
    obj.addEventListener(eventName, handler, false);
  }
}
