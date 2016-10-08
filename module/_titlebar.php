<?php
/* vim: set expandtab tabstop=4 shiftwidth=4 foldmethod=marker: */
/**
* 파일명: module/board/_titlebar.php
* 작성일: 2004-10-16
* 작성자: 거친마루
* 설  명: 타이틀바 붙이기
*****************************************************************
* 
*/
$tpl = &WebApp::singleton('Display');
$DB = &WebApp::singleton('DB');

if($param[cate]){
	$code = $param[cate];
}else{
	$code = $param[mcode];
}



$sql = "select * from ".TAB_MENU." where num_oid = "._OID." and num_cate = '".$code."' ";

$titles =$DB -> sqlFetch($sql);

	
	if(is_file(_DOC_ROOT."/hosts/".HOST."/title/".$param[mcode].".gif")){
		$titles[title_img] = "/hosts/".HOST."/title/".$param[mcode].".gif";
	}else{
		//$titles[title_img] = "./images/titlebar_ngs.gif";
	}
if(!$GLOBALS['DOC_TITLE']) $GLOBALS['DOC_TITLE']  = "str:".$titles[str_title];
if(!$GLOBALS['DOC_TITLE2']) $GLOBALS['DOC_TITLE2']  = "str:".$titles[str_title2];
	
list($title_type,$title_value) = explode(':',$GLOBALS['DOC_TITLE'],2);
list($title_type2,$title_value2) = explode(':',$GLOBALS['DOC_TITLE2'],2);


if(!function_exists('text_array')) {
function text_array($text){

 if(!$text) return;
$text_array =  content_split($text,2);
$len = 0;
$text_a = array();
for($ii=0; $ii<count($text_array); $ii++) {
	if(strlen($text_array[$ii]) == 2 && ord($text_array[$ii]) < 127) {
	$a = content_split($text_array[$ii],1);

	$text_a[$len] = $a[0];
	$len = $len + 1;	
	
	$text_a[$len] = $a[1];
	$len = $len + 1;

	}else{
	$text_a[$len] = $text_array[$ii];
	$len = $len + 1;
	}
}
return $text_a;
}
}
if(!function_exists('content_split')) {
function content_split($str,$len = 2) {
	if(strstr($str,'#')) {
	$str = str_replace("#","",$str);
	}
	
	$ret = array();
	while ($str) {
		$i = $len - 1;
		while(ord($str{$i}) > 127) {$i--;}  // 한글이 아닐때까지 찾는다.
		while($i < ($len - 2)) { $i += 2; } // 최대길이까지 2씩 더한다
		$ret[] = substr($str,0,$i+1);
		$str = substr($str,$i+1);
	}
	return $ret;
}
}

//$titles[str_title] = str_replace(" ","",$titles[str_title]);

$text_array =  text_array($titles[str_title]);	

	for($ii=0; $ii<count($text_array); $ii++) {
		if($text_array[$ii] == " "){
		
		$ww_r[$ii] = 10;

		}else if($text_array[$ii] == "/"){
		
		$ww_r[$ii] = 10;

		}else if(ord($text_array[$ii]) > 127) { //한글
		
		$ww_r[$ii] = 22.8;
		
		}else if(ord($text_array[$ii]) < 57) { //숫자
	
		$ww_r[$ii] = 22;

		}else if(ord($text_array[$ii]) < 45) { //특수
	
		$ww_r[$ii] = 10;
	
		}else{ //영어

		$ww_r[$ii] = 17 ;
		
		}
	
	}

 $text_cate[$param[cate]]['title1'] = array_sum($ww_r);

if($titles[str_title] == "ECO-Design"){
	 $text_cate[$param[cate]]['title1'] = "139";
}

if($titles[str_title] == "ECO-Design"){
	 $text_cate[$param[cate]]['title1'] = "139";
}

if($titles[str_title] == "Alumni게시판"){
	 $text_cate[$param[cate]]['title1'] = "139";
}

if($titles[str_title] == "에코시안Poll"){
	 $text_cate[$param[cate]]['title1'] = "129";
}

if($titles[str_title] == "GMS(녹색경영)"){
	 $text_cate[$param[cate]]['title1'] = "159";
}
if($titles[str_title] == "수료증/자료발급"){
	 $text_cate[$param[cate]]['title1'] = "169";
}




/*
//2011-08-03 젠장 몇몇 글땜시..
$text_cate['111110']['title1'] = "194";
$text_cate['111111']['title1'] = "157";
$text_cate['151110']['title1'] = "100";
$text_cate['151111']['title1'] = "95";
$text_cate['151112']['title1'] = "110";
$text_cate['151113']['title1'] = "220";
$text_cate['1010']['title1'] = "89";
$text_cate['1011']['title1'] = "109";
$text_cate['1012']['title1'] = "119";
$text_cate['1013']['title1'] = "54";
$text_cate['1014']['title1'] = "90";
$text_cate['1015']['title1'] = "90";

$text_cate['1110']['title1'] = "134";
$text_cate['1111']['title1'] = "114";
$text_cate['1112']['title1'] = "89";
$text_cate['1113']['title1'] = "136";
$text_cate['1114']['title1'] = "88";
$text_cate['1115']['title1'] = "68";
$text_cate['1116']['title1'] = "88";
$text_cate['1117']['title1'] = "66";


$text_cate['1212']['title1'] = "112";
$text_cate['1213']['title1'] = "112";
$text_cate['1214']['title1'] = "92";

$text_cate['1310']['title1'] = "156";
$text_cate['1311']['title1'] = "220";
$text_cate['1312']['title1'] = "180";
$text_cate['131210']['title1'] = "174";
$text_cate['131211']['title1'] = "174";

$text_cate['1410']['title1'] = "120";
$text_cate['1411']['title1'] = "178";
$text_cate['1412']['title1'] = "156";
$text_cate['1413']['title1'] = "132";
$text_cate['1414']['title1'] = "220";

$text_cate['1510']['title1'] = "218";
$text_cate['1511']['title1'] = "154";

$text_cate['1711']['title1'] = "134";
$text_cate['1712']['title1'] = "54";
$text_cate['1713']['title1'] = "156";

$text_cate['1716']['title1'] = "142";
$text_cate['1717']['title1'] = "180";

$text_cate['1811']['title1'] = "94";
$text_cate['1814']['title1'] = "114";
$text_cate['1815']['title1'] = "148";

$text_cate['161010']['title1'] = "160";
$text_cate['1610']['title1'] = "88";
$text_cate['1611']['title1'] = "88";
$text_cate['161210']['title1'] = "134";
$text_cate['161211']['title1'] = "164";
$text_cate['161212']['title1'] = "114";
$text_cate['161213']['title1'] = "48";

$text_cate['1710']['title1'] = "88"; //4
$text_cate['1711']['title1'] = "132"; //6
$text_cate['1712']['title1'] = "48"; //q&a

$text_cate['1717']['title1'] = "178"; //q&a
$text_cate['1718']['title1'] = "192"; //q&a

$text_cate['1811']['title1'] = "88"; //q&a
$text_cate['1812']['title1'] = "44"; //q&a
$text_cate['1813']['title1'] = "66"; //q&a

$text_cate['1715']['title1'] = "132"; //q&a
*/




if($text_cate[$param[cate]]['title1']){
	$title_text_len = $text_cate[$param[cate]]['title1'];
}else{
	$title_text_len = WebApp::strlens($title_value);

}

if($text_cate[$param[cate]]['title2']) {
	$title_text2_len = $text_cate[$param[cate]]['title2'];
}else{
	$title_text2_len = WebApp::strlens($title_value2);
}




switch ($title_type) {
	case 'image':
		$tpl->define('#TITLE','<img src="'.$title_value.'">');
		break;
	case 'html': case 'file':
		$tpl->define('!TITLE',WebApp::mapPath($title_value));
		break;
	case 'str':
	
		$tpl->assign(array(
		'title_text'=>$title_value,
		'title_text2'=>$title_value2,
		'title_text_len'=>$title_text_len,
		'title_text2_len'=>$title_text2_len,
		'title_img'=>$titles[title_img],
		));	
		$template = $param['template'];
		$tpl->define('titlebar_W_',$template);
		$content = $tpl->fetch('titlebar_W_');
		echo $content ;
		
		break;
	case 'raw': default:
		$tpl->define('#TITLE',$title_value);
		break;
}
?>
