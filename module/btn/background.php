<?

/***************************************
  GD 라이브러이 이용 버튼 클래스
  김종태 2007-12-14
 ***************************************/

 class EZBtn { 
    //변환할 원본 파일 
    var $Files = null; 
    //이미지 정보 
    var $Imgs = array(); 
    //변환할 이미지 정보 
    var $Config = array(); 
    var $IsSave = false; 
    var $UseUTF8 = false; 

    //저장 이미지 경로 
    var $Path = "Img"; 
    //변환 종류 
    var $Mode = "4C";        //4C, 2W, 2H 
    //적용 폰트 
    var $UseFont = "/fonts/yg330.ttf"; 

    //원본에서 잘라 사용할 사이즈 (픽셀) 
    var $CutSize = 8; 

    //이미지 정보를 담습니다. 
    function SetImg($Files) { 
        $this->Files = $Files; 

		$this->Imgs = array(); 
        if(is_array($Files)) foreach($Files as $No=>$Name) $this->Imgs[$No] = $this->GetImgInfo($Name); 
        else $this->Imgs = $this->GetImgInfo($Files); 
    } 
    //이미지 정보를 구합니다. 
    function GetImgInfo($FileName) { 
        $ImgInfo['Name'] = $FileName; 
        $ImgInfo['File'] = $this->GetNameExt($FileName); 
      
	
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
    //버턴을 생성합니다. 
    function MakeBtnImg($Files, $Text='') { 
        $this->SetImg($Files); 
       
	$_func = sprintf("CreateButton_%s", $this->Mode);

        if(method_exists($this, $_func)) { 
         
			if(is_array($this->Files)) { 
            
				foreach($this->Imgs as $Img) { 
                    $Im = $this->GetImg($Img); 
                    if($Im) { 
                        if($this->IsSave) $this->SaveImg($Img, $this->$_func($Img, $Im), 'result'); 
                        else $this->ImgView($Img, $this->$_func($Img, $Im)); 
                    } 
                } 
            } 
            else { 
               
				$Im = $this->GetImg($this->Imgs); 
//////
                if($Im) { 
                    $SaveIm = $this->$_func($this->Imgs, $Im); 
                    if($Text) $SaveIm = $this->SetText($SaveIm, $Text); 
                    if($this->IsSave) $this->SaveImg($this->Imgs, $SaveIm, 'result'); 
                    else $this->ImgView($this->Imgs, $SaveIm); 
                } 
            } 
        } 
    } 
    //16진수 color를 RGB형태로 변환한다. 
    function HEX2RGB($Color) { 
        $String = str_replace("#","",$Color); 
        $RGB[] = hexdec(substr($String,0,2));        //red 
        $RGB[] = hexdec(substr($String,2,2));        //green 
        $RGB[] = hexdec(substr($String,4,2));        //blue 
        return $RGB; 
    } 
    //버턴위에 글자를 입힙니다. 
    function SetText($Im, $Text) { 
        if($this->UseUTF8) $Text = iconv("EUC-KR", "UTF-8", $Text); 
        $size = ($this->Config['FontSize'])?$this->Config['FontSize']:16; 
        $top = ($this->Config['FontTop'])?$this->Config['FontTop']:25; 
        $left = ($this->Config['FontLeft'])?$this->Config['FontLeft']:10; 
        //기울기 각도 
        $angle = ($this->Config['FontAngle'])?$this->Config['FontAngle']:0; 
        $color = ($this->Config['FontColor'])?$this->HEX2RGB($this->Config['FontColor']):array(60, 60, 60); 
        $TextColor = imagecolorallocate($Im, $color[0], $color[1], $color[2]); 
        imagettftext($Im, $size, $angle, $left, $top, $TextColor, $this->UseFont, $Text); 
        return $Im; 
    } 
    //버턴으로 만들 이미지를 생성합니다. 
    function GetImg($Img) { 
//print_r($Img);
		if($Img['Type']<1 && $Img['Type'] > 3) 	return false; 
	
        if($Img['Type']==1){ 
			
		$Im = imagecreatefromgif($Img['Name']); 
		
		}else if($Img['Type']==2){ 
		 $Im = imagecreatefromjpeg($Img['Name']); 
        
		}elseif($Img['Type']==3){ 
			 $Im = imagecreatefrompng($Img['Name']); 
        }
		return $Im; 
    } 
    //원본 이미지 4개의 귀퉁이를 잘라 버턴으로 만듭니다. 
    function CreateButton_4C($Img, $Im) { 
        $Width = ($this->Config['BtnWidth'])?$this->Config['BtnWidth']:$Img['Width']; 
        $Height = ($this->Config['BtnHeight'])?$this->Config['BtnHeight']:$Img['Height']; 
        $SaveIm = imagecreatetruecolor($Width, $Height); 

        $PosWidth = $Img['Width']-$this->CutSize; 
        $PosHeight = $Img['Height']-$this->CutSize; 
        $PosWidth2 = $Img['Width']-$this->CutSize*2; 
        $PosHeight2 = $Img['Height']-$this->CutSize*2; 

        $RePosWidth = $Width-$this->CutSize; 
        $RePosHeight = $Height-$this->CutSize; 
        $RePosWidth2 = $Width-$this->CutSize*2; 
        $RePosHeight2 = $Height-$this->CutSize*2; 

        //1 
        imagecopy($SaveIm, $Im, 0, 0, 0, 0, $this->CutSize, $this->CutSize); 
        //2 
        imagecopy($SaveIm, $Im, $RePosWidth, 0, $PosWidth, 0, $this->CutSize, $this->CutSize); 
        //3 
        imagecopy($SaveIm, $Im, 0, $RePosHeight, 0, $PosHeight, $this->CutSize, $this->CutSize); 
        //4 
        imagecopy($SaveIm, $Im, $RePosWidth, $RePosHeight, $PosWidth, $PosHeight, $this->CutSize, $this->CutSize); 
        //상단가운데 
        imagecopyresampled($SaveIm, $Im, $this->CutSize, 0, $this->CutSize, 0, $RePosWidth2, $this->CutSize, $this->CutSize, $this->CutSize); 
        //하단가운데 
        imagecopyresampled($SaveIm, $Im, $this->CutSize, $RePosHeight, $this->CutSize, $PosHeight, $RePosWidth2, $this->CutSize, $this->CutSize, $this->CutSize); 
        //왼쪽가운데 
        imagecopyresampled($SaveIm, $Im, 0, $this->CutSize, 0, $this->CutSize, $this->CutSize, $RePosHeight2, $this->CutSize, $this->CutSize); 
        //오른쪽가운데 
        imagecopyresampled($SaveIm, $Im, $RePosWidth, $this->CutSize, $PosWidth, $this->CutSize, $this->CutSize, $RePosHeight2, $this->CutSize, $this->CutSize); 
        //가운데 
        imagecopyresampled($SaveIm, $Im, $this->CutSize, $this->CutSize, $this->CutSize, $this->CutSize, $RePosWidth2, $RePosHeight2, $this->CutSize, $this->CutSize); 
        imagedestroy($Im); 
        return $SaveIm ; 
    } 
    //원본 이미지 좌우양쪽을 잘라 버턴으로 만듭니다. 
    function CreateButton_2W($Img, $Im) { 
        $Width = ($this->Config['BtnWidth'])?$this->Config['BtnWidth']:$Img['Width']; 
        $Height = $Img['Height']; 
        $SaveIm = imagecreatetruecolor($Width, $Height); 

        $PosWidth = $Img['Width']-$this->CutSize; 
        $PosHeight = $Img['Height']-$this->CutSize; 
        $PosWidth2 = $Img['Width']-$this->CutSize*2; 
        $PosHeight2 = $Img['Height']-$this->CutSize*2; 

        $RePosWidth = $Width-$this->CutSize; 
        $RePosHeight = $Height-$this->CutSize; 
        $RePosWidth2 = $Width-$this->CutSize*2; 
        $RePosHeight2 = $Height-$this->CutSize*2; 

        //왼쪽 
        imagecopy($SaveIm, $Im, 0, 0, 0, 0, $this->CutSize, $Img['Height']); 
        //오른쪽 
        imagecopy($SaveIm, $Im, $RePosWidth, 0, $PosWidth, 0, $this->CutSize, $Img['Height']); 
        //가운데 
        imagecopyresampled($SaveIm, $Im, $this->CutSize, 0, $this->CutSize, 0, $RePosWidth2, $Img['Height'], $this->CutSize, $Img['Height']); 
        imagedestroy($Im); 
        return $SaveIm ; 
    } 
    //원본 이미지 상하양쪽을 잘라 버턴으로 만듭니다. 
    function CreateButton_2H($Img, $Im) { 
        $Width = $Img['Width']; 
        $Height = ($this->Config['BtnHeight'])?$this->Config['BtnHeight']:$Img['Height']; 
        $SaveIm = imagecreatetruecolor($Width, $Height); 

        $PosWidth = $Img['Width']-$this->CutSize; 
        $PosHeight = $Img['Height']-$this->CutSize; 
        $PosWidth2 = $Img['Width']-$this->CutSize*2; 
        $PosHeight2 = $Img['Height']-$this->CutSize*2; 

        $RePosWidth = $Width-$this->CutSize; 
        $RePosHeight = $Height-$this->CutSize; 
        $RePosWidth2 = $Width-$this->CutSize*2; 
        $RePosHeight2 = $Height-$this->CutSize*2; 

        //상단 
        imagecopy($SaveIm, $Im, 0, 0, 0, 0, $Img['Width'], $this->CutSize); 
        //하단 
        imagecopy($SaveIm, $Im, 0, $RePosHeight, 0, $PosHeight, $Img['Width'], $this->CutSize); 
        //가운데 
        imagecopyresampled($SaveIm, $Im, 0, $this->CutSize, 0, $this->CutSize, $Img['Width'], $RePosHeight2, $Img['Width'], $this->CutSize); 
        imagedestroy($Im); 
        return $SaveIm; 
    } 
    //만든 이미지를 저장합니다. 
    function SaveImg($Img, $SaveIm, $Status) { 
        $SaveFileName = sprintf("%s/%s_%s.%s", $this->Path, $Img['File']['name'], $Status, $Img['File']['ext']); 
      	if($Img['Type']==1) imagegif($SaveIm, $SaveFileName); 
        else if($Img['Type']==2) imagejpeg($SaveIm, $SaveFileName, 100); 
        else if($Img['Type']==3) imagepng($SaveIm, $SaveFileName); 
        // 메모리에 있는 그림 삭제 
        imagedestroy($SaveIm); 
    } 
    //resource 에 담긴 이미지를 봅니다. 
    function ImgView($Img, $SaveIm) { 
        if($Img['Type']==1) imagegif($SaveIm); 
        else if($Img['Type']==2) imagejpeg($SaveIm, 100); 
        else if($Img['Type']==3) imagepng($SaveIm); 
        // 메모리에 있는 그림 삭제 
        imagedestroy($SaveIm); 
    } 
    //저장된 이미지를 봅니다. 
    function SaveImgView($FileName) { 
        
		$NameExt = $this->GetNameExt($FileName); 
        $FileSize = filesize($FileName); 
        if(eregi("(MSIE 5.5|MSIE 6.0|MSIE 7.0)", $_SERVER['HTTP_USER_AGENT'])) { // 브라우져 구분 
            Header("Content-Transfer-Encoding: binary"); 
        } else { 
            Header("Content-Description: PHP3 Generated Data"); 
        } 
        Header(sprintf("Content-Type: %s", $NameExt['ext'])); 
        Header(sprintf("Content-Disposition: attachment; filename=%s", $FileName)); 
        Header(sprintf("Content-Length: %s", $FileSize)); 
        Header("Pragma: no-cache"); 
        Header("Expires: 0"); 
        $fp = fopen($FileName, "r"); 
        if(!fpassthru($fp)) fclose($fp); 
    } 
} 



//이건 정말 쓰잘데이 없는 기능이다.
//간단한 버턴이 필요하실때 디자이너에게 부탁하지 말고 바로 만들어 쓰자^^

//이미지 정보를 배열로 구현한건 여러 파일을 한꺼번에 변환 하려고 했으나
//여러파일을 적용할경우 귀차니즘으로 동작이 어떻게 될지 모름
//대략 낭패

//make mibany 2007 12 08


$_CEZBtn = new EZBtn();


//form 값으로 넘어온 한글인경우 깨지기때문에 true 설정한다
$_CEZBtn->UseUTF8 = true;

//저장옵션 사용할때 (이 옵션을 사용하면 "현재경로/Img/이름_result.확장자")
//단, [주의] Img 폴더를 미리 생성하고 777 권한을 줘야한다.
//$_CEZBtn->IsSave = true;
//저장경로를 변경할때 사용( 반드시 해당 폴더가 있고 777 권한을 줘야한다.)
//$_CEZBtn->Path = "./Img/";

//변환모드를 변경할때 사용
	// '4C' (이미지 4개의 모퉁이를 잘라 버턴을 새로 생성)
	// '2W' (좌우 양쪽을 잘라 버턴을 새로 생성)
	// '2H' (상하 양쪽을 잘라 버턴을 새로 생성)
$_CEZBtn->Mode = "4C";

//기본 폰트를 변경할때 사용 ttf 폰트를 서버에 업로드 하고 해당경로를 연결하면
//해당 폰트를 사용해 글자를 입힐수 있다.
$_CEZBtn->UseFont = "../../fonts/yg330.ttf";

//자를 이미지 크기를 지정한다.(4모서리 또는 양쪽, 상하를 자를 픽셀크기)
$_CEZBtn->CutSize = 8;

if(!$top) $top = 17;
//글자를 입력할때 크기및 버턴 이미지 위에 입혀질 위치 지정 (angle 은 기울기 각도)
$_CEZBtn->Config = array(
	'BtnWidth'=>$w,		//버턴 가로픽셀
	'BtnHeight'=>$h,		//버턴 세로픽셀
	'FontSize'=>$size,		//폰트 사이즈
	'FontTop'=>$top,			//폰트 상단여백
	'FontLeft'=>$left,		//폰트 왼쪽여백
	'FontAngle'=>0,		//폰트 기울기
	'FontColor'=>$color,		//폰트 색
);

$_CEZBtn->MakeBtnImg($img,$text);	


if($_CEZBtn->IsSave) {
	$_CEZBtn->SaveImgView('./Img/btn_result.gif');
}



?>