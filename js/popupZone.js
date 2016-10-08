function setCookie( name, value, expiredays ) { 
var todayDate = new Date(); 
todayDate.setDate( todayDate.getDate() + expiredays ); 
document.cookie = name + "=" + escape( value ) + "; path=/; expires=" + todayDate.toGMTString() + ";" 
} 


function closeWin(day) { 
if ( $('refusalCheck').checked ){ 
setCookie( "popup_zone", "done" ,day); 
}
$('popupZone').style.display='none';
} 

function win(url,w,h,x,y,name){

winOpen(url,w,h,'no',name,x,y);
}