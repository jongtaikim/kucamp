var classId = "clsid:DC146926-B3BC-4627-A8CB-637E05665494"
var updateUrl = "http://www.hkedu.co.kr/ezlive_downloads/ExFiles/ExVc.ocx#version=";
var EzliveVer = "1,0,0,11";


function EzliveObj(){//¿ÀºêÁ§Æ® »ðÀÔ

docWrite('<table style="display:none;"><OBJECT	classid="'+classId+'"	codebase="'+updateUrl + EzliveVer + '"  width=1  height=1  ID="VC"></OBJECT></table>');

}


function winOpen(url,w,h,y,name){ //ÆË¾÷
if(!y) y="yes";
var  returnId =  window.open(url,name,"width="+w+",height="+h+",top=100,left=100,scrollbars="+y); 
 returnId.focus();
} 
