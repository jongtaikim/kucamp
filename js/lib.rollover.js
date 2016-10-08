/** 
* 파일명: lib.rollover.js 
* 설  명: 롤오버 자동화 라이브러리 
* 작성자: jstoy project 
* 날  짜: 2003-11-01 
* 
* 2002-11-05: 거친마루 
* 2003-10-24: xtac.net 
* 2003-10-29: laintt 
* 2003-10-30: 행복한 고니 
* 2004-04-29: 이범민(fade 효과 추가)
*********************************************** 
*/ 

Roll = function() { 
	this.outMark = "_off"; 
	this.overMark = "_on"; 
	this.selectMark = "_sel"; 
	if (!document.body.getAttribute) return false; 
	this.outSearch= new RegExp(this.outMark + "(\.[^\.]+)$"); 
	this.imgs = document.images; 
	if (document.getElementsByTagName) { 
		for (var i=0, s=document.getElementsByTagName("input").length; i<s; i++) 
			this.imgs[this.imgs.length] = document.getElementsByTagName("input")[i]; 
	} 
	this.init(); 
} 
Roll.prototype.init = function() { 
	var classObj = this; 
	var preload = new Array; 
	for (var i=0, s=this.imgs.length; i<s; i++) { 
		this.imgs[i].setAttribute("orgsrc", this.imgs[i].src); 
		if (this.imgs[i].getAttribute("oversrc") || this.imgs[i].getAttribute("roll") != null) { 
			if (!this.imgs[i].getAttribute("oversrc")) this.imgs[i].setAttribute("oversrc", this.imgs[i].src.replace(this.outSearch, this.overMark+"$1")); 
			if (this.imgs[i].getAttribute("oversrc")==this.imgs[i].src) continue; 
			var preload_next = preload.length; 
			preload[preload_next] = new Image; 
			preload[preload_next].src = this.imgs[i].getAttribute("oversrc"); 
			this.imgs[i].overAction = this.imgs[i].onmouseover; 
			this.imgs[i].outAction  = this.imgs[i].onmouseout; 
			this.imgs[i].style.cursor = "hand";
			var duration = this.imgs[i].getAttribute("fade");
			if(duration != null) {
				if(duration == '') duration = "0.7";
				this.imgs[i].getAttribute("style").filter = "blendTrans(duration=" + duration + ")";
				this.imgs[i].onmouseover= function() {classObj.doFadeIn(this);};
				this.imgs[i].onmouseout = function() {classObj.doFadeOut(this);};
			} else {
				this.imgs[i].onmouseover= function() {classObj.doOver(this);};
				this.imgs[i].onmouseout = function() {classObj.doOut(this);};
			}
		} 
		if (this.imgs[i].getAttribute("group")!=null) { 
			if (!this.imgs[i].getAttribute("selsrc")) this.imgs[i].getAttribute("selsrc", this.imgs[i].src.replace(this.outSearch, this.selectMark+"$1")); 
			var preload_next = preload.length; 
			preload[preload_next] = new Image; 
			preload[preload_next].src = this.imgs[i].getAttribute("selsrc"); 
			if (this.imgs[i].getAttribute("selected") != null) { 
				this.imgs[i].setAttribute("fl_select", 1); 
				this.imgs[i].src = this.imgs[i].getAttribute("selsrc"); 
			} 
			this.imgs[i].clickAction = this.imgs[i].onclick; 
			this.imgs[i].onclick = function() { classObj.doClick(this); }
		}
	} 
} 
Roll.prototype.doOver = function(img) { 
	if(img.getAttribute("fl_select") != 1) img.src = img.getAttribute("oversrc"); 
	if(typeof(img.overAction) != 'undefined') img.overAction(); 
} 
Roll.prototype.doOut = function(img) { 
	if(img.getAttribute("fl_select") != 1) img.src = img.getAttribute("orgsrc"); 
	if(typeof(img.outAction) != 'undefined') img.outAction(); 
} 
Roll.prototype.doClick = function(img) { 
	for (var i=0, s=this.imgs.length; i<s; i++) { 
		if (this.imgs[i].getAttribute("group") == img.getAttribute("group") && this.imgs[i].getAttribute("fl_select") == 1) { 
			this.imgs[i].setAttribute("fl_select", 0); 
			this.imgs[i].src = this.imgs[i].getAttribute("orgsrc"); 
		} 
	} 
	img.setAttribute("fl_select", 1); 
	img.src = img.getAttribute("selsrc"); 
	if(typeof(img.clickAction) != 'undefined') img.clickAction(); 
}

Roll.prototype.doFadeIn = function(img) {
	var filters = img.getAttribute("filters");
	filters.blendTrans.stop();
	filters.blendTrans.Apply();
	this.doOver(img);
	filters.blendTrans.Play();
}

Roll.prototype.doFadeOut = function(img) {
	var filters = img.getAttribute("filters");
	filters.blendTrans.stop();
	filters.blendTrans.Apply();
	this.doOut(img);
	filters.blendTrans.Play();
}