//숫자 바로가기용 정리 및 body 이벤트 attach 2009-10-13 종태

	function startScutIn(){
	var textArr = document.getElementsByTagName("input");
		focusThis = false;
		for(i=0;i<textArr.length;i++){
				if(navigator.appName == "Netscape") {
					textArr[i].addEventListener("onfocus",eventOut,true);
					textArr[i].addEventListener("onblur",eventIn,true);
				}else{
					textArr[i].attachEvent("onfocus",eventOut);
					textArr[i].attachEvent("onblur",eventIn);
				}
			}
	
	var textArr = document.getElementsByTagName("select");
		focusThis = false;
		for(i=0;i<textArr.length;i++){
				if(navigator.appName == "Netscape") {
					textArr[i].addEventListener("onfocus",eventOut,true);
					textArr[i].addEventListener("onblur",eventIn,true);
				}else{
					textArr[i].attachEvent("onfocus",eventOut);
					textArr[i].attachEvent("onblur",eventIn);
				}
		}
	
	var textArr = document.getElementsByTagName("textarea");
		focusThis = false;
		for(i=0;i<textArr.length;i++){
				if(navigator.appName == "Netscape") {
					textArr[i].addEventListener("onfocus",eventOut,true);
					textArr[i].addEventListener("onblur",eventIn,true);
				}else{
					textArr[i].attachEvent("onfocus",eventOut);
					textArr[i].attachEvent("onblur",eventIn);
				}
			}
	
	if(navigator.appName == "Netscape") {
			document.body.addEventListener("onkeypress",function(){shortcuts(event.keyCode);,true);
	}else{
			document.body.attachEvent("onkeypress",function(){shortcuts(event.keyCode););
	}
	
	

	}

	}
	
	eventIn();
	}



 
	