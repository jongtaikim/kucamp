
function drScroll() {

	this.version = "0.1";
	this.name = "drScroll";
	this.item = new Array();
	this.itemcount = 0;
	this.itemoffset = 0;	//현재 item 넘버
	this.item_i = new Array();
	this.item_icount = 0;
	this.item_ioffset = 0;
	this.currentspeed = 0;
	this.scrollspeed = 500;
	this.pausedelay = 1000;
	this.pausemouseover = false;
	this.stop = 0;
	//this.height = 100;
	this.heightGap = 0;
	//this.width = 100;
	this.height_i = 100;
	//this.width_i = 100;
	this.stopHeight=0;
	this.count=0;
	this.flag=true;
	this.position="absolute";
	this.item_position="absolute";

	this.add = function () {
		var text = arguments[0];
		this.item[this.itemcount] = text;
		this.itemcount = this.itemcount + 1;
	};
	
	this.start = function () {
		this.display();
		this.currentspeed = this.scrollspeed;
		obj = document.getElementById(this.name+'item0').style;
		obj.display='block';
		this.count++;
		setTimeout(this.name+'.scroll()',this.currentspeed);
	};

	this.ready = function () {
		now = new Date(); ran = now % this.item_icount;
		temp = this.item_i[ran]; this.item_i[ran] = this.item_i[0]; this.item_i[0] = temp;
		this.displayImage();
		obj_i = document.getElementById(this.name+'item_i0').style;
		obj_i.display='block';
	};

	this.display = function () {
		document.write('<div id="'+this.name+'" style="height:'+this.height+';width:'+this.width+';overflow:hidden;" OnMouseOver="'+this.name+'.onmouseover();" OnMouseOut="'+this.name+'.onmouseout();">');
		for(var i = 0; i < this.itemcount; i++) {
				document.write('<div id="'+this.name+'item'+i+'"style="left:0px; width:'+this.width+';display:none; ">');
				document.write(this.item[i]);
				document.write('</div>');
		}
		document.write('</div>');
	};

	this.scroll = function () {
		this.currentspeed = this.scrollspeed;
		if ( !this.stop ) {
			this.imageChange();
		}
		window.setTimeout(this.name+".scroll()",this.currentspeed);
	};

	this.imageChange = function ()
    {
        for (k = 0; k < this.itemcount; k++) {
            obj = document.getElementById(this.name+'item'+k).style;
            if (this.count % this.itemcount == k) {
                obj.display = 'block';
            } else {
                obj.display = 'none';
            }
        }
        this.count++;
    }

	this.onmouseover = function ()
	{
		if ( this.pausemouseover ) {
			this.stop = 1;
		}
	};
  

	this.onmouseout = function ()
	{
		if ( this.pausemouseover ) {
			this.stop = 0;
		}
	};

	this.right = function ()
	{
		var i;
		this.stop++;

		if ( this.itemcount <= this.itemoffset )
			this.itemoffset = this.itemoffset % this.itemcount;

		for (i = 0; i < this.itemcount; i++) {
			obj = document.getElementById(this.name+'item'+i).style;
			if ( obj.display == "block" ) {this.itemoffset = i+1;obj.display="none";}
		}
		if (this.itemoffset < this.itemcount) {
			obj = document.getElementById(this.name+'item'+this.itemoffset).style;
			obj.display = "block";
		} else {
			obj = document.getElementById(this.name+'item0').style;
			obj.display = "block";
		}
		window.setTimeout(this.name + ".stop--;",this.pausedelay);
		//this.stop--;
	}

	this.left = function ()
	{
		var i;
		this.stop++;

		if ( this.itemoffset<=0 )
			this.itemoffset = this.itemcount;

		for (i = 0; i < this.itemcount; i++) {
			obj = document.getElementById(this.name+'item'+i).style;
			if ( obj.display == "block" ) {this.itemoffset = this.itemoffset-1;obj.display="none";}
		}
		if (this.itemoffset >0 ) {
			obj = document.getElementById(this.name+'item'+this.itemoffset).style;
			obj.display = "block";
		} else {
			obj = document.getElementById(this.name+'item0').style;
			obj.display = "block";
		}
		window.setTimeout(this.name + ".stop--;",this.pausedelay);
		//this.stop--;
	}
}

