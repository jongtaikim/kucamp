//----------------------------------------------
//Resize v1.0 Source By Bermann
//dobermann75@gmail.com
//----------------------------------------------

//new Resize(ResizableNodeAttributeName , ResizableZoneDistance , ResizableMaxWidth , ResizableMaxHeight , eachResizableNodeDefaultCursorAttributeName);

function Resize(Name,distance,maxWidth,maxHeight,defaultCursor)
{
	this.Name = Name;
	this.distance = distance;
	this.maxWidth = maxWidth;
	this.maxHeight = maxHeight;
	this.defaultCursor = defaultCursor;
	this.resizeMode = false;
	this.element = null;
	this.direction = 0;
	this.saveLeft = 0;
	this.saveTop = 0;
	this.saveWidth = 0;
	this.saveHeight = 0;
	this.Body = document.documentElement;
	if (window.attachEvent) {
		this.addEvent = function (Element,Handle,Action) { return Element.attachEvent(Handle,Action); }
	} else if (window.addEventListener) {
		this.addEvent = function (Element,Handle,Action) { return Element.addEventListener(Handle.replace(/^on/i,""),Action,false); }
	}
	var This = this;

	this.addEvent(this.Body,"onmousedown",function (event) {
		This.element = event.target || event.srcElement;
		if (This.element.getAttribute(This.Name) == "true" && (event.button == 0 || event.button == 1)) {
			if(This.element.resizable_a == false) {
				
			This.resizeMode = true;
			This.saveLeft = This.element.offsetLeft;
			This.saveTop = This.element.offsetTop;
			This.saveWidth = This.element.offsetWidth;
			This.saveHeight = This.element.offsetHeight;
			}
		}
	});


		
function positionedOffset(element) {
    var valueT = 0, valueL = 0;
    do {
      valueT += element.offsetTop  || 0;
      valueL += element.offsetLeft || 0;
      element = element.offsetParent;
      if (element) {
        if(element.tagName=='BODY') break;
      //  var p = Element.getStyle(element, 'position');
      //  if (p == 'relative' || p == 'absolute') break;
      }
    } while (element);
    return [valueL, valueT];
}



	
	this.addEvent(this.Body,"onmousemove",function (event) {
		var element = event.target || event.srcElement;
		
		var xx = document.documentElement.scrollLeft + document.body.scrollLeft + event.clientX - element.offsetLeft  ;
		var yy = document.documentElement.scrollTop + document.body.scrollTop + event.clientY - element.offsetTop ;

		if (element.getAttribute(This.Name) == "true" && This.resizeMode == false && element.resizable_a == false) {
			
		var distance = element.getAttribute(This.distance);
		

	
//		$('asas6').innerHTML = document.documentElement.scrollLeft  + " / " + document.documentElement.scrollTop;
//		$('asas3').innerHTML = document.body.scrollLeft  + " / " + document.body.scrollTop;
//		$('asas4').innerHTML =  event.clientX + " / " + event.clientY;
	

//		$('asas2').innerHTML = xx + " / " + yy;

		//$('asas7').innerHTML = element.style.width + " / " + element.style.height;
			
				if(strstr("main_layout",element.id)) {
			x = xx ;
			y = yy ;
			/*if (xx >= element.offsetWidth - distance && yy >= element.offsetHeight - distance) {
				This.direction = 5;
				element.style.cursor = "se-resize";
			} else*/
			if (xx >= element.offsetWidth - distance) {
				This.direction = 4;
				element.style.cursor = "e-resize";
			} /*else if (yy >= element.offsetHeight - distance) {
				This.direction = 6;
				element.style.cursor = "s-resize";
			}  */ else {
				This.direction = 0;
				element.style.cursor = (element.getAttribute(This.defaultCursor)) ? element.getAttribute(This.defaultCursor) : "default";
				
			}

				}else if(strstr("gaid_h",element.id)) {

			 if (yy >= element.offsetHeight - distance) {
				This.direction = 6;
				element.style.cursor = "s-resize";
			} else {
				This.direction = 0;
				element.style.cursor = (element.getAttribute(This.defaultCursor)) ? element.getAttribute(This.defaultCursor) : "default";
				
			}


				}else{


			/*if (xx >= element.offsetWidth - distance && yy >= element.offsetHeight - distance) {
				This.direction = 5;
				element.style.cursor = "se-resize";
			} else*/
				
			if (xx >= element.offsetWidth - distance) {
				This.direction = 4;
				element.style.cursor = "e-resize";
			}/* else if (yy >= element.offsetHeight - distance) {
				This.direction = 6;
				element.style.cursor = "s-resize";
			} */
			
			else {
				This.direction = 0;
				element.style.cursor = (element.getAttribute(This.defaultCursor)) ? element.getAttribute(This.defaultCursor) : "default";
				
			}
				}
		}
		if (This.resizeMode == true && (This.direction >= 1 && This.direction <= 8)) {
			var XX = document.documentElement.scrollLeft + document.body.scrollLeft + event.clientX  ;
			var YY = document.documentElement.scrollTop + document.body.scrollTop + event.clientY ;
			
			//$('asas2').innerHTML = X + " / " + Y;
			
			if(strstr(This.element.id,"main_layout")) {
			X = XX ;
			Y = YY ;
			}

			var widthFromLeft = ((This.saveLeft - XX) + This.saveWidth);
			var widthFromRight = (XX - This.element.offsetLeft);
			var heightFromUp = ((This.saveTop - YY) + This.saveHeight);
			var heightFromDown = (YY - This.element.offsetTop);
			var maxWidth = (This.element.getAttribute(This.maxWidth)) ? Number(This.element.getAttribute(This.maxWidth)) : 0;
			var maxHeight = (This.element.getAttribute(This.maxHeight)) ? Number(This.element.getAttribute(This.maxHeight)) : 0;
			var positioning = true;

			if (widthFromLeft > maxWidth ) { XX = This.saveLeft + (This.saveWidth - maxWidth); widthFromLeft = maxWidth; }
			widthFromRight = (widthFromRight > maxWidth) ? maxWidth : widthFromRight;
			
			if (heightFromUp > maxHeight) { YY = This.saveTop + (This.saveHeight - maxHeight); heightFromUp = maxHeight; }
			heightFromDown = (heightFromDown > maxHeight) ? maxHeight : heightFromDown;
			
				if(strstr(This.element.id,"main_layout")) {
				

			switch (This.direction) {
			
						case 4:
					if(widthFromRight > 10) This.element.style.width =  1 ;
					if($(This.element.id+'_width') && widthFromRight > 10) document.getElementById(This.element.id+'_width').value =  widthFromRight;

					break;
				/*case 5:
					if(widthFromRight > 10) This.element.style.width = parseInt(widthFromRight) -250; 
					if(heightFromDown > 10) This.element.style.height = parseInt(heightFromDown) -250;
					if($(This.element.id+'_width') && widthFromRight > 10) document.getElementById(This.element.id+'_width').value =  widthFromRight -250;
					if($(This.element.id+'_height') && heightFromDown > 10) document.getElementById(This.element.id+'_height').value =  heightFromDown -250;
					break;
				case 6:
					if(heightFromDown > 10) This.element.style.height = parseInt(heightFromDown);
					if($(This.element.id+'_height') && heightFromDown > 10) document.getElementById(This.element.id+'_height').value =  heightFromDown -250;
					break;*/
				

				
				
				default :;
			}


				}else if(strstr(This.element.id,"gaid_h")) {
				

			switch (This.direction) {
			
				case 6:
					if(heightFromDown > 10) This.element.style.height = heightFromDown;
				SaveCookie(This.element.id + "[gh]", heightFromDown, 100);
					break;
				
				default :;
			}


				}else{

			switch (This.direction) {
			
				case 4:
					if(widthFromRight > 10) This.element.style.width = widthFromRight;
					if($(This.element.id+'_width') && widthFromRight > 10) document.getElementById(This.element.id+'_width').value =  widthFromRight;
					$('asas5').innerHTML =  This.element.style.width + " / " + This.element.style.height;
					break;
				case 5:
					if(widthFromRight > 10) This.element.style.width = widthFromRight;
					if(heightFromDown > 10) This.element.style.height = heightFromDown;
					if($(This.element.id+'_width') && widthFromRight > 10) document.getElementById(This.element.id+'_width').value =  widthFromRight;
					if($(This.element.id+'_height') && heightFromDown > 10) document.getElementById(This.element.id+'_height').value =  heightFromDown; 
					$('asas5').innerHTML =  This.element.style.width + " / " + This.element.style.height;
					break;
				case 6:
					if(heightFromDown > 10) This.element.style.height = heightFromDown;
					if($(This.element.id+'_height') && heightFromDown > 10) document.getElementById(This.element.id+'_height').value =  heightFromDown;
					$('asas5').innerHTML =  This.element.style.width + " / " + This.element.style.height;
					break;
				
				
				
				default :;
			}

				}

		}else{
		
		}
	});
	this.addEvent(this.Body,"onmouseup",function () {


		
		This.direction = 0;
		This.saveLeft = 0;
		This.saveTop = 0;
		This.saveWidth = 0;
		This.saveHeight = 0;
		This.resizeMode = false;
	});
}