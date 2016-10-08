/**
* ���ϸ�: lib.textSlider.js
* ��  ��: ���� Ticker ���̺귯��
* �ۼ���: lainTT[�豺��] - jstoy project
* ��  ¥: 2004-03-25
*
*   2004-04-12 : ���콺������ pause��� �߰�
*   2004-05-24 : ������ �ϳ��� size�� ���̳� ����(width || height)���� ���� �� �߻��ϴ� ���� �ذ�
*	2005-01-05 : �������� �ذ�
***********************************************
*/

TextSlider = function(className) {
    document.write("<div id='TextSliderPLayer_"+ className +"'><div id='TextSliderLayer_"+ className +"'></div></div>");

    this.item = [];
    this.width = this.height = this.speed = this.pixel = this.interval =
        this.size = this.moveCount = this.X = this.Y = 0;
    this.direction = "";
    this.pLayer = document.getElementById("TextSliderPLayer_"+ className);
    this.layer = document.getElementById("TextSliderLayer_"+ className);
    this.align = "left";
	this.valign = "top";
    this.intervalId = null;
    this.className = className;
    this.isPause = false;
	this.length = 0;
	this.repeat = 0;
}
TextSlider.prototype.init = function() {
	this.length = this.item.length;
	if(this.direction == "up" || this.direction == "down") var tsize = this.height;
	else var tsize = this.width;
	this.repeat = Math.ceil(tsize / (this.size*this.length)) + 2;
    with (this.pLayer.style) {
        width = this.width+"px";
        height = this.height+"px";
        overflow = "hidden";
		position = "relative";
    }
    with (this.layer.style) {
        width = this.direction=='up' || this.direction=='down' ? this.width+"px" : this.size*(this.item.length+1)+"px";
        height = this.direction=='up' || this.direction=='down' ? this.size*(this.item.length+1)+"px" : this.height+"px";
        top = 0;
        left = 0;
        position = "relative";
    }
	for(var j=0; j<this.repeat-1; j++) {
		for (var i=0; i<this.length; i++) this.item[this.item.length] = this.item[i];
	}
    switch (this.direction) {
        case "up": this.X = this.Y = 0; break;
        case "down": this.X = 0; this.layer.style.top = this.Y = this.height-this.size+this.length+(this.repeat-1); break;
        case "left": this.X = this.Y = 0; break;
        case "right": this.Y = 0; this.layer.style.left = this.X = this.width-this.size*this.length*(this.repeat-1); break;
    }
    var __html = "<div onmouseover='"+this.className+".pause()' onmouseout='"+this.className+".unpause()'>";
    if (this.direction=='up' || this.direction=='down') {
        __html += "<table width='"+ this.layer.style.width +"' cellspacing='0' cellpadding='0' border='0'>";
        for (var i in this.item)
            __html += "<tr><td height='"+this.size+"' style='overflow:hidden' align='"+this.align+"' valign='"+this.valign+"'>"+this.item[i]+"</td></tr>";
        __html += "</table>";
    } else {
        __html += "<table width='"+(this.size*this.repeat*this.length)+"' cellspacing='0' cellpadding='0' border='0' style='table-layout:fixed;'><tr>";
        for (var i in this.item)
            __html += "<td width='"+this.size+"' height='"+ this.layer.style.height +"' align='"+this.align+"' \
                valign='"+this.valign+"' style='overflow:hidden;'>"+this.item[i]+"</td>";
        __html += "</tr></table>";
    }
    __html += "</div>";
    this.layer.innerHTML = __html;
    this.start();
}
TextSlider.prototype.start = function() {
    this.intervalId = setInterval(this.className+".move()", this.speed);
}
TextSlider.prototype.move = function() {
    if (this.isPause) return;
    switch (this.direction) {
        case "up": this.Y -= this.pixel; break;
        case "down": this.Y += this.pixel; break;
        case "left": this.X -= this.pixel; break;
        case "right": this.X += this.pixel; break;
    }
    if (this.direction=='up' || this.direction=='down') {
		if(this.direction == "up") {
			if (this.Y <= -(this.length*this.size*(this.repeat-1))) {
				this.Y = 0;
			}
			if (this.Y <= -(this.repeat*this.length*this.size-this.height)) {
				this.Y += this.size*this.length;
			}
		}
		if(this.direction == "down") {
			if (this.Y >= this.height-(this.length*this.size)) {
				this.Y = this.layer.style.top = this.height-this.size*this.length*(this.repeat-1);
			}
			if (this.Y >= 0) {
				this.Y -= this.size*this.length;
			}
		}
        if (Math.abs(this.Y)%this.size==0) this.stop();
        this.layer.style.top = this.Y;
    } else {
		if(this.direction == "left") {
			if (this.X <= -(this.length*this.size*(this.repeat-1))) {
				this.X = 0;
			}
			if (this.X <= -(this.repeat*this.length*this.size-this.width)) {
				this.X += this.size*this.length;
			}
		}
		if(this.direction == "right") {
			if (this.X >= this.width-(this.length*this.size)) {
				this.X = this.layer.style.left = this.width-this.size*this.length*(this.repeat-1);
			}
			if (this.X >= 0) {
				this.X -= this.size*this.length;
			}
		}
        if (Math.abs(this.X)%this.size==0) this.stop();
        this.layer.style.left = this.X;
    }
}
TextSlider.prototype.stop = function() {
    clearInterval(this.intervalId);
    setTimeout(this.className+".start()", this.interval);
}
TextSlider.prototype.pause = function() {this.isPause = true;}
TextSlider.prototype.unpause = function() {this.isPause = false;}
