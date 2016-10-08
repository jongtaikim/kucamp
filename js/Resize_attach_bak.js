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


		


	
	this.addEvent(this.Body,"onmousemove",function (event) {
		var element = event.target || event.srcElement;
		var x = document.documentElement.scrollLeft + document.body.scrollLeft + event.clientX - element.offsetLeft -65 ;
		var y = document.documentElement.scrollTop + document.body.scrollTop + event.clientY - element.offsetTop -76;

		if (element.getAttribute(This.Name) == "true" && This.resizeMode == false && element.resizable_a == false) {
			
			var distance = element.getAttribute(This.distance);
		
		//$('asas').innerHTML = x + " / " + y;
			
				if(strstr("gaid_w",element.id)) {

			if (x >= element.offsetWidth - distance) {
				This.direction = 4;
				element.style.cursor = "e-resize";
			} else {
				This.direction = 0;
				element.style.cursor = (element.getAttribute(This.defaultCursor)) ? element.getAttribute(This.defaultCursor) : "default";
				
			}



				}else if(strstr("gaid_h",element.id)) {

			 if (y >= element.offsetHeight - distance) {
				This.direction = 6;
				element.style.cursor = "s-resize";
			} else {
				This.direction = 0;
				element.style.cursor = (element.getAttribute(This.defaultCursor)) ? element.getAttribute(This.defaultCursor) : "default";
				
			}


				}else{


			if (x >= element.offsetWidth - distance && y >= element.offsetHeight - distance) {
				This.direction = 5;
				element.style.cursor = "se-resize";
			} else if (x >= element.offsetWidth - distance) {
				This.direction = 4;
				element.style.cursor = "e-resize";
			} else if (y >= element.offsetHeight - distance) {
				This.direction = 6;
				element.style.cursor = "s-resize";
			}  else {
				This.direction = 0;
				element.style.cursor = (element.getAttribute(This.defaultCursor)) ? element.getAttribute(This.defaultCursor) : "default";
				
			}
				}
		}
		if (This.resizeMode == true && (This.direction >= 1 && This.direction <= 8)) {
			var X = document.documentElement.scrollLeft + document.body.scrollLeft + event.clientX -65 ;
			var Y = document.documentElement.scrollTop + document.body.scrollTop + event.clientY -76;
			
			//$('asas2').innerHTML = X + " / " + Y;

			var widthFromLeft = ((This.saveLeft - X) + This.saveWidth);
			var widthFromRight = (X - This.element.offsetLeft);
			var heightFromUp = ((This.saveTop - Y) + This.saveHeight);
			var heightFromDown = (Y - This.element.offsetTop);
			var maxWidth = (This.element.getAttribute(This.maxWidth)) ? Number(This.element.getAttribute(This.maxWidth)) : 0;
			var maxHeight = (This.element.getAttribute(This.maxHeight)) ? Number(This.element.getAttribute(This.maxHeight)) : 0;
			var positioning = true;

			if (widthFromLeft > maxWidth ) { X = This.saveLeft + (This.saveWidth - maxWidth); widthFromLeft = maxWidth; }
			widthFromRight = (widthFromRight > maxWidth) ? maxWidth : widthFromRight;
			
			if (heightFromUp > maxHeight) { Y = This.saveTop + (This.saveHeight - maxHeight); heightFromUp = maxHeight; }
			heightFromDown = (heightFromDown > maxHeight) ? maxHeight : heightFromDown;
			
				if(strstr(This.element.id,"gaid_w")) {
				

			switch (This.direction) {
			
				case 4:
					This.element.style.width = widthFromRight + "px";
					SaveCookie(This.element.id + "[gw]", widthFromRight + "px", 100);
				
					break;
				
				default :;
			}


				}else if(strstr(This.element.id,"gaid_h")) {
				

			switch (This.direction) {
			
				case 6:
					if(heightFromDown > 10) This.element.style.height = heightFromDown + "px";
				SaveCookie(This.element.id + "[gh]", heightFromDown + "px", 100);
					break;
				
				default :;
			}


				}{

			switch (This.direction) {
			
				case 4:
					if(widthFromRight > 10) This.element.style.width = widthFromRight + "px";
					if($(This.element.id+'_width') && widthFromRight > 10) document.getElementById(This.element.id+'_width').value =  widthFromRight + "px";

					break;
				case 5:
					if(widthFromRight > 10) This.element.style.width = widthFromRight + "px";
					if(heightFromDown > 10) This.element.style.height = heightFromDown + "px";
					if($(This.element.id+'_width') && widthFromRight > 10) document.getElementById(This.element.id+'_width').value =  widthFromRight + "px";
					if($(This.element.id+'_height') && heightFromDown > 10) document.getElementById(This.element.id+'_height').value =  heightFromDown + "px";
					break;
				case 6:
					if(heightFromDown > 10) This.element.style.height = heightFromDown + "px";
					if($(This.element.id+'_height') && heightFromDown > 10) document.getElementById(This.element.id+'_height').value =  heightFromDown + "px";
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