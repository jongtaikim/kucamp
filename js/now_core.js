/*************************************************************************************
// 2008-06-26 통합 제작
// 개발자 : 김종태 (now17@nate.com)
// 추가사항 : php.js, 
*************************************************************************************/


function URLEncode (clearString) {
  var output = '';
  var x = 0;
  clearString = clearString.toString();
  var regex = /(^[a-zA-Z0-9_.]*)/;
  while (x < clearString.length) {
    var match = regex.exec(clearString.substr(x));
    if (match != null && match.length > 1 && match[1] != '') {
    output += match[1];
      x += match[1].length;
    } else {
      if (clearString[x] == ' ')
        output += '+';
      else {
        var charCode = clearString.charCodeAt(x);
        var hexVal = charCode.toString(16);
        output += '%' + hexVal.toUpperCase();
      }
      x++;
    }
  }
  return output;
}




function loadList(url,mcode,cate){ // ajax 페이지 이동
if($('main')) $('main').innerHTML = ajaxLoad(url+'&nolayout=yes');
if($('submenuObj')) $('submenuObj').innerHTML = ajaxLoad('/submenuObj.main?code='+mcode+'&mcode='+mcode+'&cate='+cate+'&ajax=y');
location.href="#";
}


function imgText(file,font,size,bg,color,text){ //이미지폰트1
var str = "<img src='/"+file+".php/"+font+"/"+size+"/"+bg+"/"+color+"/?text="+encodeURIComponent(text)+"' alt='"+encodeURIComponent(text)+"'>";
document.write(str);
}
 
function getBounds(tag) 
{ 
    var ret = new Object(); 
    if(tag.getBoundingClientRect) { 
        var rect = tag.getBoundingClientRect(); 
        ret.left = 
            rect.left + (document.documentElement.scrollLeft || document.body.scrollLeft); 
        ret.top = 
            rect.top + (document.documentElement.scrollTop || document.body.scrollTop); 
        ret.width = rect.right - rect.left; 
        ret.height = rect.bottom - rect.top; 
    } else { 
        var box = document.getBoxObjectFor(tag); 
        ret.left = box.x; 
        ret.top = box.y; 
        ret.width = box.width; 
        ret.height = box.height; 
    } 
    return ret; 
}  


function setCookie( name, value, expiredays ) { 
var todayDate = new Date(); 
todayDate.setDate( todayDate.getDate() + expiredays ); 
document.cookie = name + "=" + escape( value ) + "; path=/; expires=" + todayDate.toGMTString() + ";" 
} 

function getCookie( name ) { 
var nameOfCookie = name + "="; 
var x = 0; 
while ( x <= document.cookie.length ) { 
var y = (x+nameOfCookie.length); 
if ( document.cookie.substring( x, y ) == nameOfCookie ) { 
if ( (endOfCookie=document.cookie.indexOf( ";", y )) == -1 ) 
endOfCookie = document.cookie.length; 
return unescape( document.cookie.substring( y, endOfCookie ) ); 
} 
x = document.cookie.indexOf( " ", x ) + 1; 
if ( x == 0 ) 
break; 
} 
return ""; 
} 
	

function ajaxLoad( url ) {
    var req = null;
    try { req = new ActiveXObject("Msxml2.XMLHTTP"); } catch (e) {
        try { req = new ActiveXObject("Microsoft.XMLHTTP"); } catch (e) {
            try { req = new XMLHttpRequest(); } catch(e) {}
        }
    }
    if (req == null) throw new Error('XMLHttpRequest not supported');

    req.open("GET", url, false);
    req.send(null);

    return req.responseText;
}





function imgE(Limit){ 
    if(!Limit) Limit = 600; //가로 제한 사이즈
    var IMG = document.getElementsByTagName('IMG');
    for(i=0,cnt=IMG.length;i<cnt;i++){
        if(IMG[i].offsetWidth > Limit) {
            
			IMG[i].style.width = Limit; 
        }    
    } 
}



// 이웃닷컴 아이디 쿠키 저장
//  작성 김종태
function gookieId(){
if($('saveId').checked == true) {
var result = confirm("컴퓨터에 ID을 저장하겠습니까?\n공공기관, PC방에선 개인정보가 노출될 위험이 있습니다.");
 if (result){
id = $('idInput').value;
SaveCookie("GuserId", id, 500);

}
}else{
deleteCookie("GuserId");
}
}

if(navigator.appName == "Netscape") {
 var nm= "ff";
}




 function deleteCookie( cookieName ){
  document.cookie = cookieName+"=; expires=Fri, 31 Dec 1999 23:59:59 GMT;";
 }

// 쿠키 읽기
function ReadCookie(name)
{
    var label = name + "=";
    var labelLen = label.length;
    var cLen = document.cookie.length;
    var i = 0;

    while (i < cLen) {
        var j = i + labelLen;

        if (document.cookie.substring(i, j) == label) {
            var cEnd = document.cookie.indexOf(";", j);
            if (cEnd == -1) cEnd = document.cookie.length;

            return unescape(document.cookie.substring(j, cEnd));
        }

        i++;
    }

    return "";
}





//스마트 에디터 서브밋 체크 2009-03-04 종태
function chkSE(form){
if(oEditors){
_onSubmit(form);
}
}




function winOpen(url,w,h,y,name,xx,yy)
{
if(!y) y="yes";
 now = new Date()
  //현재 시간 구하기
   hh=now.getHours() //시 구하기
   nn=now.getMinutes()//분 구하기
   ss=now.getSeconds()//초 구하기
  // 시간 문자열 완성
   nowTime=hh+"시"+nn+"분"+ss+"초"
if(!name) name = nowTime;
if(!xx) xx = 100;
if(!yy) yy = 100;

var  returnId =  window.open(url,name,"width="+w+",height="+h+",top="+xx+",left="+yy+",scrollbars="+y); 

 returnId.focus();
} 

function winOpen2(url,w,h,y,name)
{
if(!y) y="yes";
 now = new Date()
  //현재 시간 구하기
   hh=now.getHours() //시 구하기
   nn=now.getMinutes()//분 구하기
   ss=now.getSeconds()//초 구하기
  // 시간 문자열 완성
   nowTime=hh+"시"+nn+"분"+ss+"초"
if(!name) name = nowTime;

var  returnId =  window.open(url,name,"width="+w+",height="+h+",top=355,left=100,scrollbars="+y); 

 returnId.focus();
} 






function MemoOpen(id)
{
if(id) {
winOpen('/memo.send?str_to_id='+id,650,600,'no','popmemo');	
}else{
winOpen('/memo.to_list',650,600,'no','popmemo');	
}

} 



// 쿠키 저장
function SaveCookie(name, value, expire)
{
    var eDate = new Date();
    eDate.setDate(eDate.getDate() + expire);
    document.cookie = name + "=" + value + "; expires=" +  eDate.toGMTString()+ "; path=/";
}




	function SmsSend(tel1,tel2,msg) {
	var val = "&str_mobile="+tel1 + "&str_se_phone="+tel2+"&str_msg="+encodeURIComponent(msg);
	sendRequest("/sms.send_s", val, FromServerSms, "POST");
	}

	function FromServerSms() {
		if (httpRequest.readyState == 4) {
			if (httpRequest.status == 200) {
				var str_text = httpRequest.responseText;
				//alert(str_text);
				if(str_text =="Y") {
				alert('발송되었습니다.');
				}else{
				alert('발송 실패 입니다.');
				}
			
			}
		}
	}





function modify_style(selector,property,value) { 
    var styleSheet = document.styleSheets; 
    var changed = false; 

    if(!styleSheet.length) { 
        var newStyle = document.createElement("style"); 
        newStyle.type = "text/css"; 
        document.getElementsByTagName("head")[0].appendChild(newStyle); 
    } 

    if(!property) 
        property = "cssText"; 

    for(var i=0, style_len=styleSheet.length ; i<style_len ; i++) { 
        var rule = styleSheet[i].cssRules?styleSheet[i].cssRules:styleSheet[i].rules; 
        for(var j=0, rule_len=rule.length ; j<rule_len ; j++) { 
            if(rule[j].selectorText.toLowerCase() == selector.toLowerCase()) { 
                rule[j].style[property] = value; 
                changed = true; 
            } 
        } 
    } 

    if(!changed) { 
        var style = document.styleSheets[0]; 
        if(property == "cssText") 
            var cssText = value; 
        else 
            var cssText = property + ":" + value; 

        if(style.insertRule) 
            style.insertRule(selector+"{"+cssText+"}",style.cssRules.length); 
        else if(style.addRule) 
            style.addRule(selector,cssText); 
        else return false; 
    } 
} 





///////////////////////////////////////////////////////

//2008-05-09 종태 클릭시 바로 마우스 아래 작은 아이프래임 뛰어주기
function getposOffset2(overlay2, offsettype){
    var totaloffset=(offsettype=="left")? overlay2.offsetLeft : overlay2.offsetTop;
    var parentEl=overlay2.offsetParent;
    while (parentEl!=null){
        totaloffset=(offsettype=="left")? totaloffset+parentEl.offsetLeft : totaloffset+parentEl.offsetTop;
        parentEl=parentEl.offsetParent;
    }
    return totaloffset;
}

function overlay2(curobj, subobjstr, opt_position, title,url,w,h){
	if(title)   $('nname2').innerHTML  = '<font color = #009966>' + title + '</b>';	
	if(url)    $('mmenu').src  = url;
	if(w)     $('mmenu').style.width  = w;
	if(h) $('mmenu').style.height  = h;


	if (document.getElementById){
    var subobj=$(subobjstr)
        subobj.style.display=(subobj.style.display!="block")? "block" : "none"
    var xpos=getposOffset2(curobj, "left")+((typeof opt_position!="undefined" && opt_position.indexOf("right")!=-1)? -(subobj.offsetWidth-curobj.offsetWidth) : 0) 
    var ypos=getposOffset2(curobj, "top")+((typeof opt_position!="undefined" && opt_position.indexOf("bottom")!=-1)? curobj.offsetHeight : 0)
        subobj.style.left=xpos+"px"
        subobj.style.top=ypos+"px"

	
	return false
    }
    else
return true
}




//2008-05-09 종태 클릭시 바로 마우스 아래 작은 아이프래임 뛰어주기

function fenster2(id, title, url,  x, y, w, h,obj)
{
if($('tmpPop')) closewPop('2');
//$('mw_temp').style.display = 'block';
fensterPop('2',title, url,x,y,w,h,'Y',obj);

}

function fensterT(id, title, url,  x, y, w, h,scr)
{

//alert('mmenu'+id);
    $('mmenu'+id).style.width  = w;
    $('mmenu'+id).style.height  = h;
	$('mmenu'+id).src  = url;
    $('nname'+id).innerHTML  = '<font color = #009966>' + title + '</b>';

    $('mmenu'+id).style.display = ''
    $('popup_box'+id).style.display = '';
	$('popup_box'+id).style.left = x;
	$('popup_box'+id).style.top = y;

}




function closew2(){
	$('popup_box2').style.display = 'none';

}

function closewT(id){
	//alert('popup_box'+id);
	$('popup_box'+id).style.display = 'none';

}


function xClientWidth() {
	var v=0,d=document,w=window;
	if((!d.compatMode||d.compatMode=='CSS1Compat')&&!w.opera&&d.documentElement&&d.documentElement.clientWidth){
		v=d.documentElement.clientWidth;
		}else if(d.body&&d.body.clientWidth){
			v=d.body.clientWidth;
			}else if(xDef(w.innerWidth,w.innerHeight,d.height)){
				v=w.innerWidth;
				if(d.height>w.innerHeight)v-=16;
				}
				
				return v;
		}


function fenster(idx, title, url,  x, y, w, h,scr)
{
	var r_left = $('STATICMENU').style.left;
    var leeft = xClientWidth();

    if(((parseInt(r_left) + 140) + parseInt(w) ) >  leeft){
        $('STATICMENU').style.left =  parseInt(leeft) -  (parseInt(w) + 140)+'px';
    }

var tmp = '<div class="m_body" id="m_body'+idx+'" style="width:400px">'+
				'<div class="title">'+
				'<div id = "nname" class="nname">&nbsp;&nbsp;<b>'+title+'</b></div>'+
				'<div  class="xbtn"><img src = "/image/xf_close_icon.gif" onclick="closew(\''+idx+'\');" style="cursor: hand"> &nbsp;&nbsp;</div>'+
				'</div>'+
				'<div class="window" id="m_body"><iframe src="'+url+'" scrolling="no" frameborder =  "0"   id = "d_main" name = "d_main"></iframe></div>'+
				'</div>';

if(!$("tmpLayerArana")){

el = document.createElement('DIV');
el.innerHTML = tmp;
el.id = "tmpLayerArana";
$('scriool').appendChild(el)
}else{
$("tmpLayerArana").innerHTML = tmp;
}
roundDiv("m_body"+idx,'#BCBCBC','#ffffff');

//new Draggable("m_body"+idx);

}


function closew(){

$('tmpLayerArana').innerHTML = '';
}


function closewPop(idx){

$('tmpPop').innerHTML = '';
}

function fensterPop(idx, title, url,  x, y, w, h,scr,curobj){

var tmp =  '<div class="m_body" id="mm_body'+idx+'" style="width:'+w+';border: 2px solid #777777;background-color:#E7E7E7;padding:0px;cursor: move">'+

				'<div id = "nname" class="nname" style="width:150px;float:left;padding:5px">&nbsp;&nbsp;<b>'+title+'</b></div>'+
				'<div  class="xbtn" style="float:right;padding:5px"><img src = "/image/xf_close_icon.gif"  onclick="closewPop(\''+idx+'\');" style="cursor: hand">&nbsp;</div>'+

				'<div class="window" id="m_body" style="background-color:#ffffff;margin-top:5px;padding-top:5px;clear:both;"><iframe src="'+url+'" scrolling="auto" frameborder =  "0"   id = "d_main" name = "d_main" width="100%" style="height:'+h+';width:100%"></iframe></div>'+
				'</div>';

if(!$("tmpPop")){
	el = document.createElement('DIV');
	el.id = "tmpPop";
	el.style.position = 'absolute';

	el.style.top = '50px';
	el.style.left = '0px';
	//el.style.border = '1px solid #FFCC33';
	document.body.appendChild(el);
}

var scrollLeft = Math.max(document.documentElement.scrollLeft,document.body.scrollLeft) + 130;
var scrollTop = Math.max(document.documentElement.scrollTop,document.body.scrollTop) + 50;

tmpBody = document.createElement('DIV');
tmpBody.style.position = 'absolute';
tmpBody.style.top = scrollTop;
tmpBody.style.left = scrollLeft;
//tmpBody.style.border = '1px solid #FFCC33';
tmpBody.innerHTML = tmp;
el.appendChild(tmpBody);


//roundDiv("mm_body"+idx,'#BCBCBC','#ffffff');
//$("mm_body"+idx).style.filter = "progid:DXImageTransform.Microsoft.Shadow(color=#DBDBDB,direction=135,strength=4)";
new Draggable("mm_body"+idx);	

var xx = document.documentElement.scrollLeft;
var yy = document.documentElement.scrollTop;

//new Effect.Move("mm_body"+idx, { x: xx, y: yy }); 

return false;
}




function layerPopup(url,  x, y, w, h){
var idx = 100;

var tmp =  '<iframe src="'+url+'" scrolling="auto" frameborder =  "0"   id = "d_main'+idx+'" name = "d_main" style="height:'+h+';width:'+w+'"></iframe>';

if(!$("tmpPop")){
	el = document.createElement('DIV');
	el.id = "tmpPop";
	el.style.position = 'absolute';

	el.style.top = '50px';
	el.style.left = '0px';
	el.style.border = '1px solid #FFCC33';
	document.body.appendChild(el);
}

var scrollLeft = Math.max(document.documentElement.scrollLeft,document.body.scrollLeft) + 100;
var scrollTop = Math.max(document.documentElement.scrollTop,document.body.scrollTop) + 100;

tmpBody = document.createElement('DIV');
tmpBody.style.position = 'absolute';
tmpBody.style.top = scrollTop;
tmpBody.style.left = scrollLeft;
tmpBody.style.border = '2px solid #A9B5B8';
tmpBody.innerHTML = tmp;
el.appendChild(tmpBody);


//roundDiv("mm_body"+idx,'#BCBCBC','#ffffff');
//$("mm_body"+idx).style.filter = "progid:DXImageTransform.Microsoft.Shadow(color=#DBDBDB,direction=135,strength=4)";
//new Draggable("mm_body"+idx);	

var xx = document.documentElement.scrollLeft;
var yy = document.documentElement.scrollTop;

new Effect.Move("d_main"+idx, { x: xx, y: yy }); 

return 
}

function closew3(){
$('sub_popup_menu').style.display = 'none';
    $('d_main2').src  = '';
}









/*////////////////////////////////////////////////////////////////////////////////////////////////////////////
PHP 코어 시작.
(자바에서 php명령어로 실행)
*/////////////////////////////////////////////////////////////////////////////////////////////////////////////
function array(){return Array.prototype.slice.call(arguments)}function count(mixed_var,mode){var key,cnt=0;if(mode=='COUNT_RECURSIVE')mode=1;if(mode!=1)mode=0;for(key in mixed_var){cnt++;if(mode==1&&mixed_var[key]&&(mixed_var[key].constructor===Array||mixed_var[key].constructor===Object)){cnt+=count(mixed_var[key],1)}}return cnt}function date(format,timestamp){var a,jsdate=((timestamp)?new Date(timestamp*1000):new Date());var pad=function(n,c){if((n=n+"").length<c){return new Array(++c-n.length).join("0")+n}else{return n}};var txt_weekdays=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];var txt_ordin={1:"st",2:"nd",3:"rd",21:"st",22:"nd",23:"rd",31:"st"};var txt_months=["","January","February","March","April","May","June","July","August","September","October","November","December"];var f={d:function(){return pad(f.j(),2)},D:function(){t=f.l();return t.substr(0,3)},j:function(){return jsdate.getDate()},l:function(){return txt_weekdays[f.w()]},N:function(){return f.w()+1},S:function(){return txt_ordin[f.j()]?txt_ordin[f.j()]:'th'},w:function(){return jsdate.getDay()},z:function(){return(jsdate-new Date(jsdate.getFullYear()+"/1/1"))/864e5>>0},W:function(){var a=f.z(),b=364+f.L()-a;var nd2,nd=(new Date(jsdate.getFullYear()+"/1/1").getDay()||7)-1;if(b<=2&&((jsdate.getDay()||7)-1)<=2-b){return 1}else{if(a<=2&&nd>=4&&a>=(6-nd)){nd2=new Date(jsdate.getFullYear()-1+"/12/31");return date("W",Math.round(nd2.getTime()/1000))}else{return(1+(nd<=3?((a+nd)/7):(a-(7-nd))/7)>>0)}}},F:function(){return txt_months[f.n()]},m:function(){return pad(f.n(),2)},M:function(){t=f.F();return t.substr(0,3)},n:function(){return jsdate.getMonth()+1},t:function(){var n;if((n=jsdate.getMonth()+1)==2){return 28+f.L()}else{if(n&1&&n<8||!(n&1)&&n>7){return 31}else{return 30}}},L:function(){var y=f.Y();return(!(y&3)&&(y%1e2||!(y%4e2)))?1:0},Y:function(){return jsdate.getFullYear()},y:function(){return(jsdate.getFullYear()+"").slice(2)},a:function(){return jsdate.getHours()>11?"pm":"am"},A:function(){return f.a().toUpperCase()},B:function(){var off=(jsdate.getTimezoneOffset()+60)*60;var theSeconds=(jsdate.getHours()*3600)+(jsdate.getMinutes()*60)+jsdate.getSeconds()+off;var beat=Math.floor(theSeconds/86.4);if(beat>1000)beat-=1000;if(beat<0)beat+=1000;if((String(beat)).length==1)beat="00"+beat;if((String(beat)).length==2)beat="0"+beat;return beat},g:function(){return jsdate.getHours()%12||12},G:function(){return jsdate.getHours()},h:function(){return pad(f.g(),2)},H:function(){return pad(jsdate.getHours(),2)},i:function(){return pad(jsdate.getMinutes(),2)},s:function(){return pad(jsdate.getSeconds(),2)},O:function(){var t=pad(Math.abs(jsdate.getTimezoneOffset()/60*100),4);if(jsdate.getTimezoneOffset()>0)t="-"+t;else t="+"+t;return t},P:function(){var O=f.O();return(O.substr(0,3)+":"+O.substr(3,2))},c:function(){return f.Y()+"-"+f.m()+"-"+f.d()+"T"+f.h()+":"+f.i()+":"+f.s()+f.P()},U:function(){return Math.round(jsdate.getTime()/1000)}};return format.replace(/[\\]?([a-zA-Z])/g,function(t,s){if(t!=s){ret=s}else if(f[s]){ret=f[s]()}else{ret=s}return ret})}function mktime(){var no,ma=0,mb=0,i=0,d=new Date(),argv=arguments,argc=argv.length;d.setHours(0,0,0);d.setDate(1);d.setMonth(1);d.setYear(1972);var dateManip={0:function(tt){return d.setHours(tt)},1:function(tt){return d.setMinutes(tt)},2:function(tt){set=d.setSeconds(tt);mb=d.getDate()-1;return set},3:function(tt){set=d.setMonth(parseInt(tt)-1);ma=d.getFullYear()-1972;return set},4:function(tt){return d.setDate(tt+mb)},5:function(tt){return d.setYear(tt+ma)}};for(i=0;i<argc;i++){no=parseInt(argv[i]*1);if(no&&isNaN(no)){return false}else if(no){if(!dateManip[i](no)){return false}}}return Math.floor(d.getTime()/1000)}function explode(delimiter,string,limit){var emptyArray={0:''};if(arguments.length<2||typeof arguments[0]=='undefined'||typeof arguments[1]=='undefined'){return null}if(delimiter===''||delimiter===false||delimiter===null){return false}if(typeof delimiter=='function'||typeof delimiter=='object'||typeof string=='function'||typeof string=='object'){return emptyArray}if(delimiter===true){delimiter='1'}if(!limit){return string.toString().split(delimiter.toString())}else{var splitted=string.toString().split(delimiter.toString());var partA=splitted.splice(0,limit-1);var partB=splitted.join(delimiter.toString());partA.push(partB);return partA}}function nl2br(str){return str.replace(/([^>])\n/g,'$1<br />\n')}function number_format(number,decimals,dec_point,thousands_sep){var n=number,c=isNaN(decimals=Math.abs(decimals))?2:decimals;var d=dec_point==undefined?".":dec_point;var t=thousands_sep==undefined?",":thousands_sep,s=n<0?"-":"";var i=parseInt(n=Math.abs(+n||0).toFixed(c))+"",j=(j=i.length)>3?j%3:0;return s+(j?i.substr(0,j)+t:"")+i.substr(j).replace(/(\d{3})(?=\d)/g,"$1"+t)+(c?d+Math.abs(n-i).toFixed(c).slice(2):"")}function str_replace(search,replace,subject){var f=search,r=replace,s=subject;var ra=is_array(r),sa=is_array(s),f=[].concat(f),r=[].concat(r),i=(s=[].concat(s)).length;while(j=0,i--){while(s[i]=s[i].split(f[j]).join(ra?r[j]||"":r[0]),++j in f){}};return sa?s:s[0]}function strlen(string){return(""+string).length}function strstr(haystack,needle,bool){var pos=0;pos=haystack.indexOf(needle);if(pos==-1){return false}else{if(bool){return haystack.substr(0,pos)}else{return haystack.slice(pos)}}}function substr(f_string,f_start,f_length){if(f_start<0){f_start+=f_string.length}if(f_length==undefined){f_length=f_string.length}else if(f_length<0){f_length+=f_string.length}else{f_length+=f_start}if(f_length<f_start){f_length=f_start}return f_string.substring(f_start,f_length)}function is_array(mixed_var){return(mixed_var instanceof Array)}function is_null(mixed_var){return(mixed_var===null)}function is_numeric(mixed_var){return!isNaN(mixed_var)}function is_string(mixed_var){return(typeof(mixed_var)=='string')}
/*////////////////////////////////////////////////////////////////////////////////
PHP 코어 끝

*/////////////////////////////////////////////////////////////////////////////////