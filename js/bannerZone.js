/* vim: set expandtab tabstop=4 shiftwidth=4 foldmethod=marker: */
/**
* 작성일: 2009-07-08
* 작성자: 김종태
* 설   명: 배너부분은 특별히 분리함
*****************************************************************
* 
*/

var bannerLayerObj, bannerListObj;
var totalHeight, listHeight;
var waitTF = true;													// 한줄마다 쉬기위한 체크변수
var waitForce = false; // 강제정지
var bannerWaitingTime = 8000;//10000;								// 한줄마다 쉬는 시간
var waitingTime = 10;//60; 											// 위로 올라가는 속도
var b_num = 0;
var direction = -1;
 
function bannerRoll(){	
	if(	waitTF==true){		
		if(direction == 1){
			bannerDown();
		}else{
			bannerUp();
		} 
			
			setTimeout("bannerRestartTimer()", bannerWaitingTime);
		}
	
} 




function bannerUp(idx){ 
	if(bannerListObj==null) startBanner();
	// 1.멈춤
	waitForce = false;
	// 2.이동방향 변경
	direction = -1;
	
	// 4.이동끝인 경우, 시작점 재세팅
	if((b_num-listHeight) <= (totalHeight*(-1))){
		b_num = 0;
		bannerListObj.style.top = b_num+"px";
	}else{
		// 3.강제이동방향계산
		//alert(b_num);
		//alert(listHeight);
		//alert(parseInt((b_num-1) / listHeight));
		var move_y = listHeight * (Math.round(((b_num-1) / listHeight)-0.5));
		//alert((Math.round(((b_num-1) / listHeight))));
		//alert(move_y);
		b_num = move_y;
		bannerListObj.style.top = b_num+"px";
	}
	
	if(!idx){
		setTimeout("bannerUp()", bannerWaitingTime);
		
	}
	waitForce = true;
}

function bannerDown(idx){
	if(bannerListObj==null) startBanner();
	// 1.멈춤
	waitForce = false;
	// 2.이동방향 변경
	direction = 1;
	
	// 4.이동끝인 경우, 시작점 재세팅
	if(b_num >= 0){
		b_num = (-1*(totalHeight))+listHeight;
		bannerListObj.style.top = b_num +"px";
	}else{
		// 3.강제이동방향계산
		var move_y = listHeight * (parseInt((b_num+1) / listHeight));
		b_num = move_y;
		bannerListObj.style.top = b_num+"px";
	}
	if(!idx){
		
		setTimeout("bannerDown()", bannerWaitingTime);
	}
	waitForce = true;
}




function bannerMouseOver(){ 
	//waitForce = true;
}

function bannerMouseOut(){ 
	//waitForce = false;
	//setInterval("waitTF=0", bannerWaitingTime);
} 

function startBanner(){
	bannerLayerObj = $("bannerLayer");	// 배너 레이어
	bannerListObj = $("bannerList");		// 배너 리스트
				// 배너리스트 전체 높이
	
	
	// 배너리스트 한줄 리스트


	if( navigator.appVersion.indexOf("MSIE 6") != -1 ){
		totalHeight = $("bannerLayer").scrollHeight;	
		listHeight = $("bannerLayer").clientHeight+6;					// 배너리스트 한줄 리스트
	}else if(navigator.appVersion.indexOf("MSIE 7") != -1){
		totalHeight = $("bannerLayer").scrollHeight;	
		listHeight = $("bannerList").clientHeight+6;					// 배너리스트 한줄 리스트	
	}else if(navigator.appVersion.indexOf("MSIE 8") != -1){
		totalHeight = $("bannerLayer").scrollHeight+2;	
		listHeight = $("bannerList").clientHeight+2;					// 배너리스트 한줄 리스트	
	}else{
		totalHeight = $("bannerLayer").scrollHeight;	
		listHeight = $("bannerLayer").clientHeight+6;					// 배너리스트 한줄 리스트
	}
	setInterval("bannerStartTimer();", waitingTime);
}

function bannerStartTimer(){

	if(waitForce == false){
		bannerRoll();

	}

}
function bannerRestartTimer(){
	waitTF = true;

}

function bannerStop(){
	waitForce = true;
}

function bannerStart(){
	waitForce = false;
	startBanner();
}



function bannerContent(id,ctl){
var bannerObj = $(id).childNodes;
var bannerItemF = "<li id="+$(id).firstChild.id+">"+$($(id).firstChild.id).innerHTML+"</li>";
var bannerItemE = "<li id="+$(id).lastChild.id+">"+$($(id).lastChild.id).innerHTML+"</li>";
var bannerBody ="";


	for(i=1;i<(bannerObj.length-1);i++){ 
		bannerBody += "<li id="+bannerObj[i].id+">"+$(bannerObj[i].id).innerHTML+"</li>";		
	}

	//alert(bannerBody);

	if(ctl =="up") {
	bannerBody = bannerBody + bannerItemE +bannerItemF;
	}else{
	bannerBody = bannerItemE + bannerItemF +  bannerBody ;
	}


$(id).innerHTML = bannerBody;
}


//2009-07-09 종태 스크롤 텍스트

var SCROLL_TXT = new Array ();
var SCROLL_LIST = new Array;
var area_width = 0;
var scrolling_id = 0;
var clock = null;
 
var delay1 = 2000;
var delay2 = 20;
var move_width = 1;
var G_s = "START";
var G_s2 = "START";
 
var G_t=0;
var ad=0;
 
function scroll_txt_init () {
if(!SCROLL_TXT[i]){
	var textObj = $('aniTextContent').childNodes;
	for(i=0;i<textObj.length;i++){ 
		if($(textObj[i].id)) SCROLL_TXT[i] = $(textObj[i].id).innerHTML;
	}

 $('aniTextContent').innerHTML ='';
}

 //area_width = document.getElementById("scroll_text_area").offsetWidth;
 area_width = $('space').style.width;
 
	 for (var i = 0; i < SCROLL_TXT.length; i++) {
			  var div = document.createElement("div");
			 
			  div.className = 'style2';
			  div.id = 'txt' + i;
			  div.style.visibility = "visible";
			  div.style.left = '0px';
			  div.innerHTML = '<span>'+SCROLL_TXT[i]+'</span>';
			  document.getElementById('scroll_text_area').appendChild(div);
			 
			 
			  if (i == 0) {
			   document.getElementById("txt" + i).style.left = 0;
			 
			  } else if (document.getElementById("txt" + parseInt(i - 1)) && document.getElementById("txt" + parseInt(i - 1)).offsetLeft > 0 && document.getElementById("txt" + parseInt(i - 1)).offsetLeft + document.getElementById("txt" + parseInt(i - 1)).offsetWidth < area_width) {

			   document.getElementById("txt" + i).style.left = document.getElementById("txt" + parseInt(i - 1)).offsetLeft + document.getElementById("txt" + parseInt(i - 1)).offsetWidth +'px';
			   scrolling_id = i;

			  } else {
			   document.getElementById("txt" + i).style.left = -1000+'px';
			  }
			  //$('stuse').innerHTML =  $('stuse').innerHTML + document.getElementById("txt" + i).style.left;
	 }
 
 clock = setTimeout("scroll_txt(1)", delay1);
 
}
 
function scroll_txt (_num) {
 var ing = false;
 var delay = delay2;


 
 for (var i = 0; i < SCROLL_TXT.length; i++) {
  if (_num != 1 && document.getElementById("txt" + i).offsetLeft >= 0 && document.getElementById("txt" + i).offsetLeft < move_width) {
   delay = delay1;
	 
  }
 
  if (document.getElementById("txt" + i).offsetLeft + document.getElementById("txt" + i).offsetWidth >= 0) {

   document.getElementById("txt" + i).style.left = document.getElementById("txt" + i).offsetLeft - move_width +'px';
   ing = true;
   //$('stuse').innerHTML = "2:" + document.getElementById("txt" + i).style.left;
  }
 }
 
 if (!ing) {
  document.getElementById("txt0").style.left = area_width - move_width;

 }
 
 if (document.getElementById("txt" + scrolling_id).offsetLeft + document.getElementById("txt" + scrolling_id).offsetWidth < area_width) {
  if (SCROLL_TXT[scrolling_id + 1]) {
   scrolling_id ++;
   document.getElementById("txt" + scrolling_id).style.left = area_width;
  } else if (scrolling_id != 0) {
   scrolling_id = 0;
   document.getElementById("txt" + scrolling_id).style.left = area_width;
  }
 }
 clock = setTimeout("scroll_txt()", delay);
}
 
function scroll_stop () {
  clearTimeout(clock);  
} 
 
function scroll_start () {
 if(G_s2=="START"){
  clock = setTimeout("scroll_txt()", delay2);
 }
} 
 