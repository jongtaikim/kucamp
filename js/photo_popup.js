
var puTextColor="#676767"; 
var puBkgdColor="#ffffff"; 
var puHeadColor="#000000"; 
var puButnColor="#ffffff"; 
var puButnText ="#006600";

var puTextSize = "11";
var puTextBold = "normal" ; 
var puTextFace = "" ; 
var isIEpu=document.all;

var puHot=false;
var puStarted=false;
var puColors=new Array( /*theme text bkgd head btn btnTxt*/ "linen","#222222","#d4cfbb","#888877","#c0bba4","#fffff0", "brown","#ffffff","#776644","#999977","#665944","#eeeecc", "brick","#ffeeaa","#993322","#ddbb88","#bb6644","#ffeecc", "gray" ,"#ffffff","#606060","#c0c0c0","#c20000","#ffffff", "black","#e0e0e0","#000000","#999999","#333333","#e0e0e0", "blue" ,"#ffffff","#004090","#ffffff","#c20000","#ffffff", "navy" ,"#ffffff","#333366","#999999","#505080","#dddddd", "pink" ,"#332222","#ffdddd","#a0a0a0","#ddaaaa","#ffffff", "olive","#332222","#999966","#ddddaa","#aaaa88","#ffffff");
	if (puTheme!= ""){ 
		for (var i=0; i<puColors.length; i++){ 
			if (puColors[i]==puTheme){ puTextColor=puColors[i+1]; puBkgdColor=puColors[i+2]; puHeadColor=puColors[i+3]; puButnColor=puColors[i+4]; puButnText =puColors[i+5]; break; 
		}
	}
}
			
function puStartDrag(e){ puPage=isIEpu ? "BODY" : "HTML"; puViewer=document.getElementById("puLayer"); activeItem=isIEpu ? event.srcElement : e.target; while (activeItem.id!="puMoveBar" && activeItem.id!="puPuller" && activeItem.tagName!=puPage){ activeItem=isIEpu ? activeItem.parentElement : activeItem.parentNode; } if (activeItem.id=="puPuller"){ offsetx=isIEpu ? event.clientX : e.clientX; offsety=isIEpu ? event.clientY : e.clientY; nowWid=parseInt(puImg.offsetWidth); nowHt= parseInt(puImg.offsetHeight); puRatio=nowWid/nowHt; puStretchEnabled=true; document.onmousemove=puStretch; } else if (activeItem.id=="puMoveBar"){ offsetx=isIEpu ? event.clientX : e.clientX; offsety=isIEpu ? event.clientY : e.clientY; nowX=parseInt(puViewer.style.left); nowY=parseInt(puViewer.style.top); puDragEnabled=true; document.onmousemove=puDrag; }}
function puDrag(e){ if (!puDragEnabled) return; puViewer.style.left=isIEpu ? nowX+event.clientX-offsetx : nowX+e.clientX-offsetx; puViewer.style.top=isIEpu ? nowY+event.clientY-offsety : nowY+e.clientY-offsety; return false; }
function puStretch(e){ if (!puStretchEnabled) return; /* use only the width to prevent defining the height */ puImg.width=isIEpu ? (nowHt+event.clientY-offsety)*puRatio : (nowHt+e.clientY-offsety)*puRatio; puViewer.style.width=parseInt(puImg.offsetWidth); return false; }

function puResize(){ if (puImg.width>=screen.availWidth-50){puImg.width=screen.availWidth/2}else{puImg.width=screen.availWidth-50} if (puViewer.offsetLeft+puViewer.offsetWidth<50){puViewer.style.left=0} if (puViewer.offsetTop+puViewer.offsetHeight<50){puViewer.style.top=0} }
function puShrink(){ if (puImg.width >10) {puImg.width=puImg.width*.833;}}
function puGrow(){ puImg.width=puImg.width*1.2;}
function puHide(){puViewer.style.visibility="hidden";} 
function puShow(title, url){ document.getElementById('puDescription').innerHTML=title; puImg.src=url; puPosition(); puViewer.style.visibility="visible"; return false;}
function puPosition(){ var X=0; var Y=1; scrollAmt=puGetScrollXY(); scrSize=puGetScreenSize(); baseoffsetX=document.getElementById('puHomebase').offsetLeft; baseoffsetY=document.getElementById('puHomebase').offsetTop; if ((parseInt(puViewer.style.top) +puViewer.offsetHeight+baseoffsetY)< (scrollAmt[Y]+100)){puStarted=false} if ((parseInt(puViewer.style.left)+puViewer.offsetWidth+baseoffsetX) < (scrollAmt[X]+100)){puStarted=false} if ((parseInt(puViewer.style.top) +baseoffsetY)> (scrollAmt[Y]+scrSize[Y]-100)){puStarted=false} if ((parseInt(puViewer.style.left)+baseoffsetX)> (scrollAmt[X]+scrSize[X]-100)){puStarted=false} if (puStarted==false ){ puViewer.style.top = scrollAmt[Y]-baseoffsetY +(scrSize[Y]-puViewer.offsetHeight)/2 ; puViewer.style.left = scrollAmt[X]-baseoffsetX +(scrSize[X]-puViewer.offsetWidth)/2 ; puStarted=true; }}
function puGetScreenSize() { var myWidth = 0, myHeight = 0; if( typeof( window.innerWidth ) == 'number' ) { /*Non-IE*/ myWidth = window.innerWidth; myHeight = window.innerHeight; } else if( document.documentElement && ( document.documentElement.clientWidth || document.documentElement.clientHeight ) ) { /*IE 6+ in 'standards compliant mode'*/ myWidth = document.documentElement.clientWidth; myHeight = document.documentElement.clientHeight; } else if( document.body && ( document.body.clientWidth || document.body.clientHeight ) ) { /*IE 4 compatible*/ myWidth = document.body.clientWidth; myHeight = document.body.clientHeight; } return [ myWidth, myHeight ];}
function puGetScrollXY() { var scrollXamt = 0, scrollYamt = 0; if( typeof( window.pageYOffset ) == 'number' ) { /*Netscape compliant*/ scrollYamt = window.pageYOffset; scrollXamt = window.pageXOffset; } else if( document.body && ( document.body.scrollLeft || document.body.scrollTop ) ) { /*DOM compliant*/ scrollYamt = document.body.scrollTop; scrollXamt = document.body.scrollLeft; } else if( document.documentElement && ( document.documentElement.scrollLeft || document.documentElement.scrollTop ) ) { /*IE6 standards compliant mode*/ scrollYamt = document.documentElement.scrollTop; scrollXamt = document.documentElement.scrollLeft; } return [ scrollXamt, scrollYamt ];}MakePuViewer();

var puImg=document.getElementById('puImage');document.onmousedown=puStartDrag;document.onmouseup=Function("puDragEnabled=false; puStretchEnabled=false;");/*------------*/

function MakePuViewer(){ 
	document.write('<div id=puHomebase style="position:relative; left:0px; top:0px;z-index:99; ">'+ 
		'<style>'+ '.puTbl {font-family:arial; }'+ 
		'td.puTitle {font-weight:bold;font-size:'+puTextSize+'px;border:1px solid #B9B9B9;color:'+puHeadColor+';}'+ 
		'td.puBtn {font-weight:bold;border:1px solid #B6B6B6;background-color:'+puButnColor+';}'+ 
		'a.puBtn {text-decoration:none;font-size:16px;font-weight:bold;cursor:pointer;color:'+puButnText+';}'+ 
		'.puCopy {font-family:tahoma;font-size:10px;color:'+puHeadColor+';}'+ 
		'#puDescription {font-weight:'+puTextBold+';color:'+puTextColor+';font-family:'+puTextFace+';padding:5px;padding-left:5px;border-top:1px white solid;border-bottom:2px black groove;}'+ 
		'#puPuller {border-right:1px solid silver; border-bottom:1px solid gray; width:14px; height:15px; cursor: se-resize; }'+ 
		'#puPuller td.x {width:1px; height:1px; background-color:'+puBkgdColor+'; font-size:1px;}'+ 
		'#puPuller td.o {width:1px; height:1px; background-color:none;font-size:1px;}'+ 
		'#puPuller td.d {width:1px; height:1px; background-color:'+puTextColor+'; font-size:1px;}'+ '</style>'+ 
		' <div id="puLayer" style="position:absolute; '+ ' left:0; top:0; visibility:hidden;">'); 
	
	document.write('<table id="puMoveBar" border="0"  bgcolor="'+puBkgdColor+'" '+ 
		'cellspacing="0" cellpadding="0" style="cursor:move;"'+ 
		'onSelectStart="return false" onMouseover="puHot=true;" onMouseout="puHot=false"> '+ 
		'<tr><td width="100%"> '+ 
		'<table  border="0" width="100%" cellspacing="0" '+ 
		' cellpadding="0" height="36"><tr>'+ 
		'<td class="puBtn" valign="top" align=left width=18 title="reduce"><a class="puBtn" href="#" onClick="puShrink(); return false"> - </a></td>'+ 
		'<td class="puBtn" valign="top" align=left width=18 title="enlarge"><a class="puBtn" href="#" onClick="puGrow(); return false"> + </a></td>'+ 
		'<td class="puTitle" id="titleBar" align=center width=400 onmousedown="return false" '+ 
		' title="drag to move">'+imgpreview+'</td>'+ 
		'<td class="puBtn" valign="top" align=right width=10 title="close">'+ 
		'<a class="puBtn" href="#" onClick="puHide(); return false">&nbsp;x&nbsp;</a></td>'+ 
		'</tr>'+ '<tr><td class="puTitle" colspan="7" align=left>'+ 
		'<div id="puDescription" style="text-align:center">Click +/- Buttons to resize image</div>'+ 
		'<div style="position:relative; left:0px; top:0px;">'+ 
		'<img id=puImage  width = 800 src="" title="Drag to move Image Viewer or pull corner to Resize" '+ 
		' oncontextmenu="return false" galleryimg="no" onmousedown="return false;" '+ 
		' ondblclick="puResize()" ></div>'+ /* important to return-false on the img mousedown event to prevent jerky motion in gecko.*/ 
		'<div style="position:relative; width:100%; height:1px; border:0px solid yellow">'+ 
		'<div style="position:absolute;top:-15px; left:0px; border:0px solid red">'+ 
		'<table id=puPuller class=t align="right" cols=14 rows=15 cellspacing="0" cellpadding="0" border=0 onmousedown="return false;" >'+ 
		' <tr><td class=o></td><td class=o></td><td class=o></td><td class=o></td><td class=o></td><td class=o></td><td class=o></td><td class=o></td><td class=o></td><td class=o></td><td class=o></td><td class=o></td><td class=o></td><td class=o></td>'+ 
		'</tr><tr><td class=o colspan=13></td><td class=x></td>'+ 
		'</tr><tr><td class=o colspan=12></td><td class=x></td><td class=d></td>'+ 
		'</tr><tr><td class=o colspan=11></td><td class=x></td><td class=d></td><td class=o></td>'+ 
		'</tr><tr><td class=o colspan=10></td><td class=x></td><td class=d></td><td class=o colspan=2></td>'+ 
		'</tr><tr><td class=o colspan=9 ></td><td class=x></td><td class=d></td><td class=o colspan=2></td><td class=x></td>'+ 
		'</tr><tr><td class=o colspan=8 ></td><td class=x></td><td class=d></td><td class=o colspan=2></td><td class=x></td><td class=d></td>'+ 
		'</tr><tr><td class=o colspan=7 ></td><td class=x></td><td class=d></td><td class=o colspan=2></td><td class=x></td><td class=d></td><td class=o></td>'+ 
		'</tr><tr><td class=o colspan=6 ></td><td class=x></td><td class=d></td><td class=o colspan=2></td><td class=x></td><td class=d></td><td class=o colspan=2></td>'+ 
		'</tr><tr><td class=o colspan=5 ></td><td class=x></td><td class=d></td><td class=o colspan=2></td><td class=x></td><td class=d></td><td class=o colspan=2></td><td class=x></td>'+ 
		'</tr><tr><td class=o colspan=4 ></td><td class=x></td><td class=d></td><td class=o colspan=2></td><td class=x></td><td class=d></td><td class=o colspan=2></td><td class=x></td><td class=d></td>'+
		'</tr><tr><td class=o colspan=3 ></td><td class=x></td><td class=d></td><td class=o colspan=2></td><td class=x></td><td class=d></td><td class=o colspan=2></td><td class=x></td><td class=d></td><td class=o></td>'+ 
		'</tr><tr><td class=o colspan=2 ></td><td class=x></td><td class=d></td><td class=o colspan=2></td><td class=x></td><td class=d></td><td class=o colspan=2></td><td class=x></td><td class=d></td><td class=o colspan=2></td>'+ 
		'</tr><tr><td class=o></td><td class=x></td><td class=d></td><td class=o colspan=2></td><td class=x></td><td class=d></td><td class=o colspan=2></td><td class=x></td><td class=d></td><td class=o colspan=2></td><td class=x></td>'+ 
		'</tr><tr><td class=x></td><td class=d></td><td class=o colspan=2></td><td class=x></td><td class=d></td><td class=o colspan=2></td><td class=x></td><td class=d></td><td class=o colspan=2></td><td class=x></td><td class=d></td>'+ 
		'</tr></table></div></div>'+ 
		'</td></tr>'); 
	if (puCopyright){
		document.write('<tr><td class=puCopy colspan="7" align=center>'+puCopyright+'</td></tr>')} 
		document.write('</td></tr></table></td></tr></table></div></div>');
	}
