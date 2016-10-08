<?php
/* vim: set expandtab tabstop=4 shiftwidth=4 foldmethod=marker: */
/**
* 작성일: 2008-06-23
* 작성자: 김종태
* 설  명: 이미지 폰트..ㅋㅋ
*****************************************************************
* 
*/

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


function text_array($text){
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


$tmp_file = "./tmp/".md5($text."|".$font."|".$size2."|".$bg."|".$color).".gif";

//$mk_btn = "Y";
//if(!is_file($tmp_file)) {

if(!$font) $font_file='./font2/윤-윤고딕530.ttf'; else $font_file= "./font2/".$font.'.ttf';

if(!$text) $text = ' ';

$text_array =  text_array($text);

	for($ii=0; $ii<count($text_array); $ii++) {
		if(ord($text_array[$ii]) > 127) { //한글
		
		if($font == "Daum_SemiBold" || $font =="Daum_Regular") {
		$ww_r[$ii] = 40;	
		}else{
		$ww_r[$ii] = 38;
		}
		
		
		$han = "Y";
		if($han_count) $han_count = 0; else $han_count++;
		}else if(ord($text_array[$ii]) < 57) { //숫자
		
		$fontInfo = imagettfbbox(30, 0, $font_file, $text_array[$ii]);
		if($text_array[$ii] == "1") {
			$ww_r[$ii] = abs($fontInfo[2] - $fontInfo[0]) + 9 ;
		}else{
		$ww_r[$ii] = abs($fontInfo[2] - $fontInfo[0]) + 4 ;
		}
		$nun = "Y";
		if($nun_count) $nun_count = 0; else $nun_count++;
		}else{ //영어
		
		$fontInfo = imagettfbbox(30, 0, $font_file, $text_array[$ii]);
		$ww_r[$ii] = abs($fontInfo[2] - $fontInfo[0]) + 5 ;
		$eng = "Y";
		if($eng_count) $eng_count = 0; else $eng_count++;
	
		}
	
	}
	$ww = array_sum($ww_r)  ;
	$hh = 45;

	

$bcolor_array = content_split($bg, 2); 
$bbcolor_array[0] = hexdec("0x{$bcolor_array[0]}");
$bbcolor_array[1] = hexdec("0x{$bcolor_array[1]}");
$bbcolor_array[2] = hexdec("0x{$bcolor_array[2]}");

$fcolor_array = content_split($color, 2); 
$ffcolor_array[0] = hexdec("0x{$fcolor_array[0]}");
$ffcolor_array[1] = hexdec("0x{$fcolor_array[1]}");
$ffcolor_array[2] = hexdec("0x{$fcolor_array[2]}");

$len_width = count($text_array);
if(!$bg) $bg = "FFFFFF";
if(!$color) $color = "E75211";
if(!$size) $size = "30";
if(!$x) $x = "1";
if(!$y) $y = $size+4;
if(!$w) $w = ($size * $len_width)  ;
if(!$h) $h = $hh_r;




$im=imagecreate($ww,$hh);
$back=imagecolorallocate($im,$bbcolor_array[0],$bbcolor_array[1],$bbcolor_array[2]);



$pen_color= imagecolorallocate($im,$ffcolor_array[0],$ffcolor_array[1],$ffcolor_array[2]);

imagettftext($im,$size,0,$x,$y,$pen_color,$font_file, iconv("EUC-KR","UTF-8",$text));





$width = $size2 * strlen($text) - 5;
$height = $size2*2.5;	

if(!$han && $eng && !$nun){
$width =  $width + 4;
}else if($han && $eng && !$nun){
$width =  $width + 2;
} else if(!$han && $eng && $nun){
$width =  $width + 8;
}else if($han && $eng && $nun){
$width =  $width + 3;
}else if($han && !$eng && $nun){
$width =  $width +3;
}


//$height = $height -5;


 

	  $width = imagesx($im) * 0.1 * ($size2 /2) ;
      $height = imagesy($im) * 0.1 * ($size2 /2) + 2;

	  $width = $width +5;
	
if($jp != "") {
	$jp = $jp - 100;
	$width = $width + $jp;
}

	$width = $width * 0.489;
    $height = $height * 0.489;


   $im2 = imagecreatetruecolor($width, $height);

/*imagetruecolortopalette($im2, true, 1024);  // 이걸 해줘야 투명배경이 씌워진다 ? 
$back = imagecolorallocatealpha($im2, 255, 255, 255, 127);  // 투명배경을 씌운다 
imagefilledrectangle($im2, 0, 0, $width, $height, $back); 

$bg_color = imagecolorat($im2,1,1);
imagecolortransparent($im2, $bg_color);
*/
 
//imagecolortransparent($im, $back);

imagecopyresampled($im2, $im, 0, 0, 0, 0, $width, $height, imagesx($im), imagesy($im));

//imagecolortransparent($im2, $back);
   
  

if($mk_btn=="Y") {
imagegif($im2, $tmp_file); //imagejpeg($im);		
}
header('Content-type: image/gif');
imagegif($im2); //imagejpeg($im);
imagedestroy($im2);
imagedestroy($im);
exit;
/*}else{
header('Content-type: image/gif');
echo file_get_contents($tmp_file);
exit;
}*/



?>

