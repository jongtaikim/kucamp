function MM_findObj(n, d) { //v4.01
  var p,i,x;  if(!d) d=document; if((p=n.indexOf("?"))>0&&parent.frames.length) {
    d=parent.frames[n.substring(p+1)].document; n=n.substring(0,p);}
  if(!(x=d[n])&&d.all) x=d.all[n]; for (i=0;!x&&i<d.forms.length;i++) x=d.forms[i][n];
  for(i=0;!x&&d.layers&&i<d.layers.length;i++) x=MM_findObj(n,d.layers[i].document);
  if(!x && d.getElementById) x=d.getElementById(n); return x;
}

function MM_showHideLayers() { //v6.0
  var i,p,v,obj,args=MM_showHideLayers.arguments;
  for (i=0; i<(args.length-2); i+=3) if ((obj=MM_findObj(args[i]))!=null) { v=args[i+2];
    if (obj.style) { obj=obj.style; v=(v=='show')?'visible':(v=='hide')?'hidden':v; }
    obj.visibility=v; }
}

function MM_swapImage() { //v3.0
  var i,j=0,x,a=MM_swapImage.arguments; document.MM_sr=new Array; for(i=0;i<(a.length-2);i+=3)
   if ((x=MM_findObj(a[i]))!=null){document.MM_sr[j++]=x; if(!x.oSrc) x.oSrc=x.src; x.src=a[i+2];}
}

function MM_swapImgRestore() { //v3.0
  var i,x,a=document.MM_sr; for(i=0;a&&i<a.length&&(x=a[i])&&x.oSrc;i++) x.src=x.oSrc;
}

function MM_preloadImages() { //v3.0
 var d=document; if(d.images){ if(!d.MM_p) d.MM_p=new Array();
   var i,j=d.MM_p.length,a=MM_preloadImages.arguments; for(i=0; i<a.length; i++)
   if (a[i].indexOf("#")!=0){ d.MM_p[j]=new Image; d.MM_p[j++].src=a[i];}}
}

function MM_jumpMenu(targ,selObj,restore){ //v3.0
  eval(targ+".location='"+selObj.options[selObj.selectedIndex].value+"'");
  if (restore) selObj.selectedIndex=0;
}

function view_info(html,frameName,x,y,z)
{
	if(!x)  x=500;
	if(!y)  y=400;
	var window_left = (screen.width/2)-(x/2);
	var window_top = (screen.height/2)-(y/2);
	if(window_left < 0) window_left = 0;
	if(window_top < 0) window_top = 0;

	// 연희중학교 요청사항 (팝업창을 좌측 상단으로) - by 거친마루 at 2004-3-15
	window_left = 0;
	window_top = 0;

	// 아이디 패스워드 찾기는 스크롤바를 없앤다.
	if (html.indexOf("id_pass")>-1) z=0;

	var SHOWWin=window.open(html,frameName,"top="+window_top+",left="+window_left+",toolbar=0,location=0,directories=0,status=0,menubar=0,scrollbars="+z+",resizable="+z+",width="+x+",height="+y);
	SHOWWin.focus();
}

//오픈창의 위치지정추가
function view_info2(html,frameName,x,y,z,locw,loch)
{
	if(!x)  x=500;
	if(!y)  y=400;
	//var window_left = (screen.width/2)-(x/2);
	//var window_top = (screen.height/2)-(y/2);
	window_left = locw;
	window_top = loch;
	
	if(window_left < 0) window_left = 0;
	if(window_top < 0) window_top = 0;

	// 연희중학교 요청사항 (팝업창을 좌측 상단으로) - by 거친마루 at 2004-3-15
	//window_left = 0;
	//window_top = 0;

	var SHOWWin=window.open(html,frameName,"top="+window_top+",left="+window_left+",toolbar=0,location=0,directories=0,status=0,menubar=0,scrollbars="+z+",resizable="+z+",width="+x+",height="+y);
	SHOWWin.focus();
}

function getCookie( name )
{
		var nameOfCookie = name + "=";
		var x = 0;
		while ( x <= document.cookie.length )
		{
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

function ErrorMsg(intiger,locate)
{
	var str="";
	if(locate!="")locate = "『"+locate+"』";
	switch(intiger)
	{
		case 1:
			str = "401 : 회원 서비스 입니다. 로그인을 해 주세요";
			break;
		case 2:
			str = "402 : 해당 사항에 대한 권한이 없습니다 "+locate;
			break;
		case 3:
			str = "403 : 형식에 맞지 않거나 일치하지 않습니다 "+locate;
			break;
		case 4:
			str = "404 : 빈 항목이 없도록 작성해 주십시요 "+locate;
			break;
		default:
			str = "500 : 알 수 없는 에러가 발생하였습니다. 관리자에게 문의 바랍니다"+locate;
	}
	alert(str);
}

function NextFocus(arg,len,nextname)
{  
    if (arg.value.length==len)
	{
        nextname.focus() ;
        return;
     }
}

function go( strForm, strUrl, strTarget, strEncoding ) {
	var f = eval( "document."+strForm);
	f.action = strUrl;
	f.target = (strTarget) ? strTarget : "";
	if (strEncoding) {
		f.encoding = strEncoding;
	}
	f.submit();
	return false;
}

function printCalendar(which, wait)
{
	var date = new Date();
	var year = date.getYear();
	var month = date.getMonth()+1;
	var day = date.getDate();
	var time = 0;
	
	var start, limit, impot, chose ='';
	
	switch(which)
	{
		case"year":
			start = 2000;
			limit = year+3;
			impot = year;
			break;

		case"month":
			start = 1;
			limit = 12;
			impot = month;
			break;

		case"day":
			start = 1;
			limit = 31;
			impot = day;
			break;

		case"time":
			start = 1;
			limit = 24;
			impot = time;
			break;			

		case"halftime":
			start = 0;
			limit = 11;
			impot = time;
			break;			
			
	}

	for( var i=start; i <= limit; i++ )
	{
		chose = ( wait ) ? ( wait==i) ? "selected" : ""  : ( impot==i ) ? "selected" : ""  ;
		document.write("<option value='"+i+"' "+chose+">"+i+"</option>");
	}
}

function slideShow( str )
{
	var photoimg = event.srcElement.value;
	if(photoimg.indexOf("'") != -1) {
	alert("파일의 이름에 \" ' \" 문자를 사용할 수 없습니다.");
	return;
	}
	document.images[str].src = photoimg;
}	

function cal_byte(aquery,len) 
{
	var tmpStr, smsStr;
	var temp=0;
	var onechar;
	var tcount;
	var result = true;
	tcount = 0;

	tmpStr = new String(eval("document.all."+aquery).value);
	temp = tmpStr.length;

	for (k=0;k<temp;k++)
	{
		onechar = tmpStr.charAt(k);
		if (escape(onechar) =='%0D')
		{
			
		}
		else if (escape(onechar).length > 4) {
			tcount += 2;
		}
		else {
			tcount++;
		}

		if( tcount > len ) 
		{
			var nomsg  = len+"바이트 이하로 입력이 제한되어있습니다 !!";
			alert( nomsg ); 
			smsStr = tmpStr.substring(0,k);
			eval("document.all."+aquery).value = smsStr;
			result = false;
			break;
		}
	}
	return result;
}

//==-- 바이트 세기, 입력 제한하기 - by 거친마루 at 2004-02-05 --==//
String.prototype.bytes = function(str) {
	str = this != window ? this : str;
	var len = 0;
	for(j=0; j<str.length; j++) {
		var chr = str.charAt(j);
		len += (chr.charCodeAt() > 128) ? 2 : 1
	}
	return len;
}

function limit_byte(n) {
	var el = event.srcElement;
	if (el.value.bytes() > n) {
		var name = (hname = el.getAttribute('HNAME')) ? hname : el.name;
		alert(n + '바이트 이하로 입력이 제한되어있습니다 !!');
		el.value = el.value.substring(0,n--);
		return false;
	}
}

function calendar(obj)
{
	//if(obj)document.location.href='/?act=calendar.view&month='+obj;

	if(obj)view_info('/?act=calendar.detail&month='+obj,'calendar',500,400,1)
}

//2007-01-18 => 2007.01.08 로 변경
function date_replace(str) {
	return str.replace(/-/g,".");
}

//아이디 저장
function save_id() {
	var tmp_id = getCookie('SAVE_ID');
	if(tmp_id) {
		document.getElementById('userid').style.backgroundImage='url(none)';
		document.getElementById('userid').value = tmp_id;
		document.loginform.save_id.checked = true;
	}
}

// 서울지역..교육감선거땜시..추가...
function new_popup(){ 
	window.open('http://slemcc.cafe24.com/home/doc/pop_080703_1.html','slemcc_pop','top=10,left=400,width=530,height=717'); 
	self.close(); 
}
