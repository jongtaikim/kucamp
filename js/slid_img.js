var bVae=(navigator&&navigator.userAgent)?navigator.userAgent.toLowerCase():'';
var bWae=(navigator&&navigator.appVersion)?navigator.appVersion:'';
var bXae=parseInt(bWae,10);
var bYae=bVae.indexOf('opera')!=-1;
var bZae=bYae&&bXae==9;
var BAae=bYae&&bXae>=9;
var BBae=!bYae&&(bVae.indexOf('msie')!=-1);
var BCae=BBae&&(bVae.indexOf('mac')!=-1);
var BDae=bVae.indexOf('safari')!=-1;
var BEae=BDae&&(bVae.indexOf('safari/125.')==-1)&&(bVae.indexOf('safari/85.')==-1);
var BFae=bVae.indexOf('konqueror')!=-1;
var BGae=!BBae&&!bYae&&((bVae.indexOf('netscape')!=-1)||(bVae.indexOf('mozilla')!=-1))&&(bXae>=5);
var BHae=BBae&&(bXae<4);
var BIae=BBae&&(bXae==4)&&(bVae.indexOf("msie 4")!=-1);
var BJae=BBae&&(bXae==4)&&(bVae.indexOf("msie 5.5")!=-1);
var BKae=BBae&&(bXae==4)&&(bVae.indexOf("msie 5")!=-1)&&!BJae;
var BLae=BBae&&!BHae&&!BIae&&!BKae;
var BMae=BLae&&(bVae.indexOf('nt 4')==-1);
var BNae=BBae&&!BHae&&!BIae&&!BKae&&!BJae;
var BOae=BNae;
var BPae=(bVae.indexOf('netscape6')!=-1);
var BQae=!BFae&&!BPae;
var BRae=BLae;
var BSae=!BCae;
var BTae=BSae;
var BUae=BTae&&!bYae&&!BDae;
var BVae=BSae;
var BWae=!BPae&&!BCae;

function BXae(BYae,BZae,baaf,bbaf,bcaf,bdaf,beaf,bfaf,bgaf,bhaf,biaf){
	this.bjaf=bhaf;
	this.bkaf=biaf;
	this.blaf=BYae;
	this.bmaf=BZae;
	if(BGae||BPae||BAae){this.bnaf=baaf-this.bkaf*2;}
	else{this.bnaf=baaf;};
	this.boaf=bbaf;
	this.bpaf=bcaf;
	this.bqaf=bdaf;
	this.braf=beaf;
	this.bsaf='#'+bfaf;
	this.btaf=this.boaf;
	this.buaf=0;
	this.bvaf=null;
	this.bwaf=null;
	if(bgaf!=null){this.bxaf=bgaf;}
	else{this.bxaf=new Array();};
	this.byaf();};

BXae.prototype.byaf=function(){
	var bzaf=document.getElementById(this.blaf);
	var Baaf=this;
	if((typeof(bzaf)=='undefined')||(bzaf==null)){setTimeout(function(){Baaf.byaf();},300);
	return;};
	bzaf.innerHTML=this.Bbaf();
	setTimeout(function(){Baaf.Bcaf();},300);};

BXae.prototype.Bcaf=function(){
	this.bvaf=document.getElementById('Bdaf');
	this.bwaf=document.getElementById('Beaf');
	var Bgaf=document.getElementById('Bfaf');
	var Baaf=this;
	if((typeof(this.bvaf)=='undefined')||(this.bvaf==null)||(typeof(this.bwaf)=='undefined')||(this.bwaf==null)||(typeof(Bgaf)=='undefined')||(Bgaf==null)){setTimeout(function(){Baaf.Bcaf();},300);
	return;};
	
	this.bvaf.innerHTML=this.Bhaf();
	this.bwaf.innerHTML=this.Bhaf();
	this.buaf=Bgaf.offsetWidth;
	this.bwaf.style.left=this.buaf+this.braf+'px';
	document.getElementById(this.blaf).onmouseover=function(){Baaf.btaf=0;};
	document.getElementById(this.blaf).onmouseout=function(){Baaf.btaf=Baaf.boaf;};
	setInterval(function(){Baaf.Biaf();},this.bpaf);};

BXae.prototype.Bbaf=function(){
	var Bjaf=new Array();
	Bjaf[Bjaf.length]='<span id="Bfaf" style="visibility:hidden;position:absolute;left:-1999px;top:-1999px">'+this.Bhaf()+'</span>';
	Bjaf[Bjaf.length]='<table border="0" cellspacing="0" cellpadding="0"><tr><td>';
	Bjaf[Bjaf.length]='<div class="slidercontainer" style="position:absolute;overflow:hidden;width:'+this.bmaf+'px;height:'+this.bnaf+'px;'+'background-color:'+this.bsaf+'">';
	Bjaf[Bjaf.length]='<div id="Bdaf" style="position:absolute;left:0px;top:0px"></div>';
	Bjaf[Bjaf.length]='<div id="Beaf" style="position:absolute;;top:0px"></div>';
	Bjaf[Bjaf.length]='</div>';
	Bjaf[Bjaf.length]='</td></tr></table>';
	return Bjaf.join('');};

BXae.prototype.Bhaf=function(){
	var Bjaf=new Array();
	Bjaf[Bjaf.length]='<nobr>';
	Bjaf[Bjaf.length]='<table border="0" cellspacing="0" cellpadding="0"><tr>';
	for(var Bkaf=0;Bkaf<this.bxaf.length;Bkaf++){Bjaf[Bjaf.length]='<td>';
	Bjaf[Bjaf.length]='<div class="sliderimages">';
	Bjaf[Bjaf.length]='<a href="'+this.bxaf[Bkaf][1]+'" target="'+this.bxaf[Bkaf][2]+'">';
	Bjaf[Bjaf.length]='<img src="'+this.bxaf[Bkaf][0]+'" alt="'+this.bxaf[Bkaf][3]+'" width="'+this.bxaf[Bkaf][4]+'" height="'+this.bxaf[Bkaf][5]+'" border="0" />';
	Bjaf[Bjaf.length]='</a>';
	Bjaf[Bjaf.length]='</div>';
	Bjaf[Bjaf.length]='</td>';
	Bjaf[Bjaf.length]='<td><div style="width:'+this.bqaf+'px;height:1px;border:0 none transparent;"></div></td>';};
	Bjaf[Bjaf.length]='</tr></table>';
	Bjaf[Bjaf.length]='</nobr>';
	return Bjaf.join('');};

BXae.prototype.Biaf=function(){
	if(parseInt(this.bvaf.style.left)>(this.buaf*(-1)+9)){this.bvaf.style.left=parseInt(this.bvaf.style.left)-this.btaf+'px';}
	else{this.bvaf.style.left=parseInt(this.bwaf.style.left)+this.buaf+this.braf+'px';};
			if(parseInt(this.bwaf.style.left)>(this.buaf*(-1)+9)){this.bwaf.style.left=parseInt(this.bwaf.style.left)-this.btaf+'px';}
			else{this.bwaf.style.left=parseInt(this.bvaf.style.left)+this.buaf+this.braf+'px';};};

		var Bmaf=true;
