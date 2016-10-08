<?php
/* vim: set expandtab tabstop=4 shiftwidth=4 foldmethod=marker: */
/**
* 작성일: 2008-06-23
* 작성자: 김종태
* 설  명: 이미지 폰트..ㅋㅋ
*****************************************************************
* 
*/
$path_info = getenv("PATH_INFO");

if(mb_detect_encoding($path_info) != "UTF-8"){
//	$path_info = iconv("EUC-KR","UTF-8",$path_info);
}
$path_infos = explode("/",$path_info);
array_shift($path_infos);
list($font,$size2,$color,$px,$padding_) = $path_infos;

$text = $_GET[text];
$imga = $_GET[imga];


$img = $imga;

$type = explode("Tab",$img);
$type = $type[0];



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


$tmp_file = "./tmp/".md5($text."|".$font."|".$size2."|".$img."|".$bold1."|".$bold2."|".$color."|".$color2).".gif";

$mk_btn = "Y";
//if(!is_file($tmp_file)) {




if(!$font) $font_file='./font2/ygo530.ttf'; else $font_file= "./font2/".$font.'.ttf';
if(!$text) $text = ' ';

if($trim) $text = str_replace(" ","",$text);

if(mb_detect_encoding($text) =="UTF-8" &&  iconv("EUC-KR","UTF-8",$text)){
	$text = iconv("EUC-KR","UTF-8",$text);
}


if(mb_detect_encoding($font) =="UTF-8"){
$font = iconv("UTF-8","EUC-KR",$font);
$font_file = iconv("UTF-8","EUC-KR",$font_file);
}

if(!iconv("EUC-KR","UTF-8",$text)) {
$text_array =  text_array(iconv("UTF-8","EUC-KR",$text));	
}else{
$text_array =  text_array($text);	
}

if(!mb_detect_encoding($text)) $text = iconv("EUC-KR","UTF-8",$text);


//echo mb_detect_encoding($path_info) ;
//exit;



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
		$ww_r[$ii] = abs($fontInfo[2] - $fontInfo[0]) +2 ;
		$eng = "Y";
		if($eng_count) $eng_count = 0; else $eng_count++;
	
		}
	
	}
	$ww = array_sum($ww_r) +4  ;
	$hh = 45;

	function GDImageLoad($filename){
       global $IsTrueColor, $Extension;

      $image_type = getimagesize($filename);

       switch( $image_type[2] ) {
              case 2: // JPEG일경우
                     $im = imagecreatefromjpeg($filename);
                     $Extension = "jpg";
                     break;
              case 1: // GIF일 경우
                     $im = imagecreatefromgif($filename);
                     $Extension = "gif";
                     break;
              case 3: // png일 경우
                     $im = imagecreatefrompng($filename);
                     $Extension = "png";
                     break;
              default:
                     break;
       }

       $IsTrueColor = imageistruecolor($im);

       return $im;
}


if(!$bg) $bg = "FFFFFF";
if(!$bg2) $bg = "FFFFFF";
if(!$color) $color = "E75211";
if(!$color2) $color2 = "9D9D9D";
if(!$size) $size = "30";
if(!$x) $x = "1";
if(!$y) $y = $size+4;
if(!$w) $w = ($size * $len_width)  ;
if(!$h) $h = $hh_r;


$bcolor_array = content_split($bg, 2); 
$bbcolor_array[0] = hexdec("0x{$bcolor_array[0]}");
$bbcolor_array[1] = hexdec("0x{$bcolor_array[1]}");
$bbcolor_array[2] = hexdec("0x{$bcolor_array[2]}");

$bcolor2_array = content_split($bg2, 2); 
$bbcolor2_array[0] = hexdec("0x{$bcolor2_array[0]}");
$bbcolor2_array[1] = hexdec("0x{$bcolor2_array[1]}");
$bbcolor2_array[2] = hexdec("0x{$bcolor2_array[2]}");


$fcolor_array = content_split($color, 2); 
$ffcolor_array[0] = hexdec("0x{$fcolor_array[0]}");
$ffcolor_array[1] = hexdec("0x{$fcolor_array[1]}");
$ffcolor_array[2] = hexdec("0x{$fcolor_array[2]}");


$fcolor2_array = content_split($color2, 2); 
$ffcolor2_array[0] = hexdec("0x{$fcolor2_array[0]}");
$ffcolor2_array[1] = hexdec("0x{$fcolor2_array[1]}");
$ffcolor2_array[2] = hexdec("0x{$fcolor2_array[2]}");


$len_width = count($text_array);


    //원본 이미지 좌우양쪽을 잘라 버턴으로 만듭니다. 
    function CreateButton_2W($Img, $Im, $Im_,$width ,$height ,$px,$plus) { 
		$Width =$width + $plus; 
        $Height = $Img[Height]; 
        $SaveIm =imagecreatetruecolor($Width,$Img[Height]);
		$tmp=imagecreatefromgif($Img[Name]); 
		

        $PosWidth = $Img['Width']-$px; 
        $PosHeight = $Img['Height']-$px; 
       

        $RePosWidth = $Width-$px; 
        $RePosHeight = $Height-$px; 

        $RePosWidth2 = $Width-$px*2; 
        $RePosHeight2 = $Height-$px; 
		

		//2009-06-26 종태 가운데 포지션을 잡아보자
		$padding = ($Width - $width) / 2;
		$padding_top = (($Height - $height) / 2) ;
	

        //왼쪽 
        imagecopy($SaveIm, $tmp,0, 0, 0, 0, $px, $Img['Height']); 
        //오른쪽 
        imagecopy($SaveIm, $tmp, $RePosWidth, 0, $PosWidth, 0, $px, $Img['Height']); 
        //가운데 
        imagecopyresampled($SaveIm, $tmp, $px, 0, $px, 0, $RePosWidth2, $Img['Height'], $px, $Img['Height']); 
        imagecopyresampled($SaveIm,$Im,  $padding, $padding_top, 0, 0, $width ,$height, $width ,$height); 
		//imagecopyresampled($SaveIm,$Im_,  $padding, $padding_top_, 0, 0, $width ,$height, $width ,$height); 
		
		//imagecopymerge($SaveIm,$Im_,$padding, $padding_top_, 0, 0, $Width,$Height,0); // 원본과 워터마크를 찍은 이미지를 적당한 투명도로 겹치기 
		
		imagedestroy($Im); 
        return $SaveIm ; 
    } 
   

       function CreateButton_3W($Img, $Im, $Im_,$width ,$height ,$px) { 
		$Width =$width + 38; 
        $Height = $Img[Height]; 
        $SaveIm =imagecreatetruecolor($Width,$Img[Height]);
		$tmp=imagecreatefromgif($Img[Name]); 
	
        $PosWidth = $Img['Width']-$px; 
        $PosHeight = $Img['Height']-$px; 
        $PosWidth2 = $Img['Width']-$px*2; 
        $PosHeight2 = $Img['Height']-$px*2; 

        $RePosWidth = $Width-$px; 
        $RePosHeight = $Height-$px; 
        $RePosWidth2 = $Width-$px*2; 
        $RePosHeight2 = $Height-$px*2; 
		

		//2009-06-26 종태 가운데 포지션을 잡아보자
		$padding = ($Width - $width) / 1.9 +2;
		$padding_top = (($Height - $height) / 2) / 2.1 -1;
		$padding_top_ = $Img[Height] / 1.61 ;

        //왼쪽 
        imagecopy($SaveIm, $tmp,0, 0, 0, 0, $px, $Img['Height']); 
        //오른쪽 
        imagecopy($SaveIm, $tmp, $RePosWidth, 0, $PosWidth, 0, $px, $Img['Height']); 
        //가운데 
        imagecopyresampled($SaveIm, $tmp, $px, 0,$px, 0, $RePosWidth2, $Img['Height'], $px, $Img['Height']); 
        imagecopyresampled($SaveIm,$Im,  $padding, $padding_top, 0, 0, $width ,$height, $width ,$height); 
		imagecopyresampled($SaveIm,$Im_,  $padding, $padding_top_, 0, 0, $width ,$height, $width ,$height); 
		
		//imagecopymerge($SaveIm,$Im_,$padding, $padding_top_, 0, 0, $Width,$Height,0); // 원본과 워터마크를 찍은 이미지를 적당한 투명도로 겹치기 
		
		imagedestroy($Im); 
        return $SaveIm ; 
    } 


    //원본 이미지 좌우양쪽을 잘라 버턴으로 만듭니다. 
    function CreateButtonBg($Img, $Im, $Im_,$width ,$height ,$px) { 
		$Width =$width + 30; 
        $Height = $height; 
        $SaveIm =imagecreatetruecolor($Width,$Img[Height]);
		$tmp=imagecreatefromgif($Img[Name]); 
	
        $PosWidth = $Img['Width']-$px; 
        $PosHeight = $Img['Height']-$px; 
        $PosWidth2 = $Img['Width']-$px; 
        $PosHeight2 = $Img['Height']-$px; 

        $RePosWidth = $Width-$px; 
        $RePosHeight = $Height-$px; 
        $RePosWidth2 = $Width-$px*2; 
        $RePosHeight2 = $Height-$px*2; 
		

		//2009-06-26 종태 가운데 포지션을 잡아보자
		$padding = ($Width - $width) / 1.9;
		$padding_top = (($Height - $height) / 2) / 2.1 -1;
		$padding_top_ = $Img[Height] / 1.61 ;

        
        //가운데 
        imagecopyresampled($SaveIm, $tmp, 0, 0, 1, 0, $RePosWidth2, $Img['Height'], 10, $Img['Height']); 
        
		//imagecopymerge($SaveIm,$Im_,$padding, $padding_top_, 0, 0, $Width,$Height,0); // 원본과 워터마크를 찍은 이미지를 적당한 투명도로 겹치기 
		
		//imagedestroy($Im); 
        return $SaveIm ; 
    } 
   


	
	//이미지 정보를 구합니다. 
    function GetImgInfo($FileName) { 
        $ImgInfo['Name'] = $FileName; 
        $ImgInfo['File'] = GetNameExt($FileName); 
      
	
	  	list($ImgInfo['Width'], $ImgInfo['Height'], $ImgInfo['Type'], $ImgInfo['Attr']) = getimagesize($FileName); 
       
		return $ImgInfo; 
    } 
    //파일명와 확장자를 분리합니다. 
    function GetNameExt($FileName) { 
        preg_match('/(.*)\.([^\.]+)$/', $FileName, $Match); 
        $File['name'] = $Match[1]; 
        $File['ext'] = strtolower($Match[2]); 
        return $File; 
    } 

//$img1 = GDImageLoad("./noticeTab.gif");




if(!$img) $img = "./noticeTab.gif"; else $img = $_SERVER[DOCUMENT_ROOT]."/".$img;

$tmp_img = GetImgInfo($img);





//$im=imagecreate($ww,$hh);

$im = imagecreatetruecolor($ww, $hh);
imagesavealpha($im, true);
$trans_colour = imagecolorallocatealpha($im, 0, 0, 0, 127);
imagefill($im, 0, 0, $trans_colour);


$back=imagecolorallocate($im,$bbcolor_array[0],$bbcolor_array[1],$bbcolor_array[2]);

$pen_color= imagecolorallocate($im,$ffcolor_array[0],$ffcolor_array[1],$ffcolor_array[2]);



imagefttext($im,$size,0,$x,$y,$pen_color,$font_file,$text);
if($bold1){
	imagefttext($im,$size,0,$x,$y+0.8,$pen_color,$font_file, $text);
	imagefttext($im,$size,0,$x,$y-0.8,$pen_color,$font_file, $text);
	imagefttext($im,$size,0,$x+0.8,$y,$pen_color,$font_file, $text);
	imagefttext($im,$size,0,$x-0.8,$y,$pen_color,$font_file, $text);
	}








$width = $size2 * strlen($text) - 5;
$height = $size2;	

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


//$im2 = imagecreatetruecolor($width, $height);

$im2 = imagecreatetruecolor($width, $height);
imagesavealpha($im2, true);
$trans_colour = imagecolorallocatealpha($im2, 0, 0, 0, 127);
imagefill($im2, 0, 0, $trans_colour);
imagecopyresampled($im2, $im, 0, 0, 0, 0, $width, $height, imagesx($im), imagesy($im));

//$im2_ = imagecreatetruecolor($width, $height);




		if(!$px) $px = "5";
		if(!$padding_) $padding_ = "15";

		$im2 =   CreateButton_2W($tmp_img ,$im2 ,$im2_ ,$width ,$height,$px,$padding_);



header('Content-type: image/gif');
if($mk_btn=="Y") {
imagepng($im2, $tmp_file); //imagejpeg($im);		
}
imagepng($im2); //imagejpeg($im);
imagedestroy($im2);
imagedestroy($im);


exit;
/*}else{
header('Content-type: image/gif');
echo file_get_contents($tmp_file);
exit;
}*/



?>

