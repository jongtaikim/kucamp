<?
/**********************************************
* 파일명: class.WebApp.php
* 설  명: 웹어플리케이션 수퍼클래스
* 날  짜: 2003-04-08
* 작성자: 거친마루
***********************************************
* 2003-10-07 싱글톤 추가
* 2003-10-15 confirm 메소드 추가
* 2004-01-14 getConf를 멀티호스트용으로 개선,
*            config 의 scope를 조정하여 local 또는 글로벌 설정을 가져올수 있음
* 2004-08-03 call(), get() 메소드 추가
*            WebApp_Message 클래스 추가
* 2004-12-11 getTemplate() 메소드를 Display 클래스에 위임
*/

class WebApp {

	/**
	* WebAp::import()
	* 동적으로 모듈을 로드한다.
	* 
	* @param string $module : 모듈명 (class.모듈명.php 에서 모듈명부분만)
	* @return true
	*/
	function import($module) {
		if (strpos($module,'/')) {
			$_part = explode('.',$module);
			$module = array_pop($_part);
			$path = implode('/',$_part)."/";
		}
		$file = $path."class.$module.php";
		require_once($file);
		return true;
	}

	/**
	* Webapp::init()
	* 동적으로 모듈을 로드 후 인스턴스를 생성한다.
	*
	* @param string $module : 모듈명 (class.모듈명.php 에서 모듈명부분만)
	* @param [mixed $param[, mixed $param[, mixed $param...]]]
	* @return object
	* @deprecated
	*/
	function init($module) {
		$o = &WebApp::singleton($module);
		return $o;
	}

	/**
	* WebApp::getConf() 
	* 웹 어플리케이션 설정을 얻어옵니다.
	* 다중array의 값일경우 dot 연산자로 구분하여 가져올 수 있습니다 ex) WebApp::getConf('board.rownum');
	* 
	* @param string $key
	* @return mixed
	*/
	function getConf($key="",$scope='merged') {
		global $HOST;

		global $_CONF;
		$_CONF['global'] = @parse_ini_file("conf/global.conf.php",true);
		$_CONF['local'] = @parse_ini_file("hosts/$HOST/conf/global.conf.php",true);

		$_CONF['merged'] = array_merge($_CONF['global'],$_CONF['local']);	// local 설정이 global 설정을 덮어씀!
		if (!$key) return $_CONF[$scope];
		if(strpos($key, ".") > -1) {
			$t = explode(".", $key);
			$v = $_CONF[$scope];
			

			for($z=0,$c=count($t); $z<$c; $z++) {
				$v = $v[$t[$z]];
				if (!$v) {
					$_CONF['global'][$t[$z]] = @parse_ini_file('conf/'.$t[$z].'.conf.php',true);
					$_CONF['local'][$t[$z]] = @parse_ini_file("hosts/$HOST/conf/".$t[$z].'.conf.php',true);
					
					if (!$_CONF['local'][$t[$z]]) unset($_CONF['local'][$t[$z]]);	// 비어있는 로칼설정이 글로벌 설정을 지워버리는 오류 보완
					$_CONF['merged'] = array_merge($_CONF['global'],$_CONF['local']);
					$v = $_CONF[$scope][$t[$z]];
					
				}
				if (!$v) return;
			
		
			}
			return $v;
		} else {
			return $_CONF[$scope][$key];
			
		}
	}


	function getThemeConf($key="",$scope='merged') {
		global $HOST;

		global $_CONF;
		$_CONF['global'] = @parse_ini_file("conf/global.conf.php",true);
		$_CONF['local'] = @parse_ini_file("hosts/$HOST/conf/"._CSS.".conf.php",true);

		$_CONF['merged'] = array_merge($_CONF['global'],$_CONF['local']);	// local 설정이 global 설정을 덮어씀!
		if (!$key) return $_CONF[$scope];
		if(strpos($key, ".") > -1) {
			$t = explode(".", $key);
			$v = $_CONF[$scope];
			

			for($z=0,$c=count($t); $z<$c; $z++) {
				$v = $v[$t[$z]];
				if (!$v) {
					$_CONF['global'][$t[$z]] = @parse_ini_file('conf/'.$t[$z].'.conf.php',true);
					$_CONF['local'][$t[$z]] = @parse_ini_file("hosts/$HOST/conf/".$t[$z].'.conf.php',true);
					
					if (!$_CONF['local'][$t[$z]]) unset($_CONF['local'][$t[$z]]);	// 비어있는 로칼설정이 글로벌 설정을 지워버리는 오류 보완
					$_CONF['merged'] = array_merge($_CONF['global'],$_CONF['local']);
					$v = $_CONF[$scope][$t[$z]];
					
				}
				if (!$v) return;
			
		
			}
			return $v;
		} else {
			return $_CONF[$scope][$key];
			
		}
	}



	// 개발중
	function setConf($key,$value='') {
	}

	/**
	* WebApp::mapPath()
	* 경로를 현재 경로 또는 웹루트 경로와 매핑 시켜줌
	* 
	* @param string $path
	* @return string
	* @see asp에서 Server.mappath() 메소드
	*/
	function mapPath($path) {
		if (!defined('__PATH__')) define(__PATH__,getenv('SCRIPT_FILENAME'));
		if (strtolower(substr($path,0,7)) == 'http://') return $path;
		$aPath = explode('/',($path[0] == '/') ? getenv('DOCUMENT_ROOT') : dirname(__PATH__));
		$newPath = explode('/',$path);
		for ($i=0,$cnt=count($newPath); $i<$cnt; $i++) {
			if ($newPath[$i] == '..') {
				if (count($aPath)>1) array_pop($aPath);
			} elseif ($newPath[$i] == '' || $newPath[$i] == '.') {
				//forget it
			} else {
				$aPath[] = $newPath[$i];
			}
		}
		return implode('/',$aPath);
	}

	/**
	* WebApp::getTemplate()
	* Alias of Display::getTemplate()
	* 
	* @param string $filename
	* @return string
	*/
	function getTemplate($filename) {
		return Display::getTemplate($filename);
	}

	/**
	* WebApp::singleton()
	* 오브젝트 저장소
	* 
	* @param string $name [,extra params..]
	* @return object ref
	*/
	function &singleton($name) {
		static $jar;
		if (!is_array($jar)) $jar = array();
		if (is_object($jar[$name])) {
			return $jar[$name];
		} else {
			WebApp::import($name);
			$argv = func_get_args();
			unset($argv[0]);
			$jar[$name] = new $name;
			if (is_array($argv) && count($argv)) call_user_func_array(array(&$jar[$name], $name), $argv);
			return $jar[$name];
		}
	}

	/**
	* WebApp::call()
	* 특정 모듈을 호출한다
	* 
	* @param string $module  모듈별명(도트구분)
	* @param dict $param     파라미터(key값을가진 array)
	*/
	function call($module,$param) {
		$RUN_MODE = WEBAPP_RUNMODE_FUNCTION;

		$_apppath = explode('.',$module);
		$__PATH = 'module/';
		foreach ($_apppath as $_path) {
			$__PATH.= $_path."/";
			$_init = $__PATH."__init__.php";
			if (is_file($_init)) include $_init;
			/*
			$_conf = $path."page.conf.php";
			if (is_file($_conf)) {
				$_cfg = @parse_ini_file($_conf,true);
				if ($_cfg['layout']) $ch = $_cfg['layout'];
				@extract($_cfg['phpvars']);
			}
			*/
		}

		$path = 'module/'.str_replace('.','/',$module).'.php';
		if (is_file($path)) {
			include $path;
		} else {
			$parts = explode('.',$module);
			$__METHOD = array_pop($parts);
			$path = 'module/'.implode('/',$parts).'/__call.php';
			include $path;
		}
	}

	/**
	* WebApp::get()
	* 특정 모듈에서 값을 받아온다
	* 
	* @param string $module  모듈별명(도트구분)
	* @param string $param    가져올 값의 이름
	*/
	function get($module,$param) {
		$path = 'module/'.str_replace('.','/',$module).'/__get.php';
		return include $path;
	}

	/**
	* WebApp::set()
	* 특정 모듈에 값을 대입한다.
	* 
	* @param string $module  모듈별명(도트구분)
	* @param string $param   대입할 값의 이름
	* @param mixed  $data    대입할 값의 데이타
	*/
	function set($module,$param,$data) {
		$path = 'module/'.str_replace('.','/',$module).'/__set.php';
		return include $path;
	}

	//==--------------------------------------------------------------==//
	//==-- 에러 핸들러
	//==--------------------------------------------------------------==//

	function warning($str) {
		trigger_error($str,E_USER_WARNING);
	}

	function raiseError($errstr, $errtype=E_USER_WARNING) {
		trigger_error($errstr,$errtype);
	}

	function showError($errno, $errstr, $errfile, $errline, $errcontext) {
		global $tpl;
		switch ($errno) {
			case E_USER_WARNING: case E_USER_NOTICE:
				$tpl->setLayout('blank');
				$tpl->define('CONTENT', Display::getTemplate('error.htm'));
				$tpl->assign('TITLE',_('ERROR'));
				$tpl->assign('message', $errstr);
				$tpl->printAll();
				exit;
				//echo "<b>에라</b> $errstr $errfile 파일 $errline 번째 라인에서<br>";
				break;
			default:
				// skip other errors
		}
	}

	function showErrors() {
	}

	//==--------------------------------------------------------------==//
	//==-- 경고창 출력, 페이지 이동 관련
	//==--------------------------------------------------------------==//

	/**
	* WebApp::alert()
	* 자바스크립트 경고창을 출력한다.
	* 
	* @param string $msg  경고창으로 출력할 메시지
	*/
	function alert($msg) {
		$msg = str_replace(array("\n","'"),array("\\n","\'"),$msg);
		echo '<html><head><meta http-equiv="content-type" content="text/html; charset=euc-kr"></head><body>';
		echo "<script>alert('$msg');</script>";
		echo "</body></html>";
	}

	/**
	* WebApp::confirm()
	* 자바스크립트 선택창을 출력후 사용자의 결정에 따라 다른 url로 보내준다
	* 
	* @param string $msg  메시지
	* @param string $yes  사용자가 '확인' 버튼을 눌렀을때 이동할 url
	* @param string $no   사용자가 '취소' 버튼을 눌렀을때 이동할 url
	*/
	function confirm($msg,$yes,$no) {
		$msg = str_replace(array("\n","'"),array("\\n","\""),$msg);
		echo '<html><head><meta http-equiv="content-type" content="text/html; charset=euc-kr"></head><body>';
		echo "<script>navigate(confirm('$msg') ? '$yes' : '$no');</script>";
		echo "</body></html>";
		exit;
	}

	/**
	* WebApp::redirect()
	* 해당 페이지로 이동한다
	* 
	* @param string $url  이동할 페이지
	* @param string $msg  경고창으로 출력할 메시지
	*/
	function redirect($url,$msg="") {
		if ($msg) WebApp::alert($msg);
//		$url = urlencode($url);
		if (headers_sent()) {
			echo "<script>document.location.replace('$url');</script>";
			exit;
		} else {
			echo "<script>document.location.replace('$url');</script>";
			exit;
		}
	}

	/**
	* WebApp::moveBack()
	* 히스토리 바로 이전으로 이동한다
	* 
	* @param string $msg  경고창으로 출력할 메시지
	*/
	function moveBack($msg="") {
		if ($msg) WebApp::alert($msg);
		echo "<script>history.back();</script>";
		exit;
	}

	/**
	* WebApp::halt()
	* 프로그램을 종료한다.
	* 
	* @param string $msg  경고창으로 출력할 메시지
	*/
	function halt($msg='') {
		if ($msg) WebApp::alert($msg);
		exit;
	}

	/**
	* WebApp::closeWin()
	* 현재 창을 닫는다
	* 
	* @param boolean $flag 부모창을 리프레시 할것인가
	*/
	function closeWin($flag) {
		if ($flag) echo "<script>opener.location.reload();</script>";
		echo "<script>self.close();</script>";
		exit;
	}


    // 문자 잘르기 ( 한글자르기가 문제가 되어 수정 )
    function content_split($str,$len = 2700) {
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

    // 2009-01-09 현민 온라인교무실,방과후학교 등 기타 mcode체크
    function Submcode_chk($mcode, $chkmcode) {
        if(substr($mcode,0,1) == $chkmcode) return "1";
    }


function ImgFindUpload($str_text){ //외부이미지 넣기
	global $_OID, $sess_id, $DB, $FH,$serial;

	$sect = $FH->sect;
	$code = $FH->code;
		//2008-08-08 종태 외부이미지를 찾아서 서버에 저장한다..ㅋㅋ
		$FTP = &WebApp::singleton('FtpClient',WebApp::getConf('account'));
		
				
		$ym_dir = date('Ym');
		$FTP->mkdir($FH->file_dir.'/'.$ym_dir);
		$FTP->chmod($FH->file_dir.'/'.$ym_dir,777);

		$FTP->mkdir($FH->file_dir);
		$FTP->chmod($FH->file_dir,777);
		$FTP->mkdir($FH->file_dir."/board_img/");
		$FTP->chmod($FH->file_dir."/board_img/",777);
			
		$s = $str_text; 
		$s = preg_match_all("/<img\s+.*?src=[\"\']([^\"\']+)[\"\'\s][^>]*>/is", $s, $m); 
		$tmp_img_list = $m[1];

		for($ii=0; $ii<count($tmp_img_list); $ii++) {
			
			
			if(!strstr($tmp_img_list[$ii],$_SERVER[HTTP_HOST]) && !strstr($tmp_img_list[$ii],"isch") && !strstr($tmp_img_list[$ii],"FILE_HOST") && strstr($tmp_img_list[$ii],"http://")){
		
			///////////////////////////////////////////
			$ch = curl_init($tmp_img_list[$ii]);
			$mk = mktime();
			$tmp_file[$ii] = $FH->file_dir."/board_img/".$mk.$ii.".gif";

			$fp = fopen($tmp_file[$ii], "w");

			curl_setopt($ch, CURLOPT_FILE, $fp);
			curl_setopt($ch, CURLOPT_HEADER, 0);

			curl_exec($ch);
			curl_close($ch);
			fclose($fp);



		$sql = 'SELECT MAX(NUM_SERIAL) FROM '.TAB_FILES.'
				WHERE '.
					'NUM_OID='.$FH->oid.' AND '.
					'STR_SECT=\''.$FH->sect.'\' AND '.
					'STR_CODE=\''.$FH->code.'\' AND '.
					'NUM_MAIN='.$serial;

				
		$fserial = $DB->sqlFetchOne($sql) + 1;
		$file_name = $mk.$ii.".gif";
			$ext = strtolower(array_pop(explode('.',$file_name)));
		    $refile[$ii] = $ym_dir.'/'.$FH->code.'.'.$serial.'.'.$fserial.'.'.$timestamp.$ii.mktime().'.'.$ext;
			$target_path = $FH->file_dir.'/'.$refile[$ii];
			$filesize = filesize($tmp_file[$ii]);

			
			//$filesize = ftp_size($FTP->conn,$target_path);

					$sql1 = 'INSERT INTO '.TAB_FILES.' ( '.
								'NUM_OID,STR_SECT,STR_CODE,NUM_MAIN,NUM_SERIAL,'.
								'STR_UPFILE,STR_REFILE,STR_FTYPE,NUM_DOWN,NUM_SIZE,DT_DATE'.
							') VALUES ('.
								$FH->oid.',\''.$FH->sect.'\',\''.$FH->code.'\','.$serial.','.$fserial.','.
								'\''.$file_name.'\',\''.$refile[$ii].'\',\''.$ext.'\',0,'.$filesize.',SYSDATE'.
							')';
				
					$DB->query($sql1);
					$DB->commit();


					//2008-04-17 종태 이미지 체크 
		
					$size=GetImageSize($tmp_img_list[$ii]); 
					$FTP->chmod($FH->file_dir."/".date("Ym"),"777");											
					if($size[0] > 800) {

					$FH->GDImageResize($tmp_img_list[$ii] , $target_path , "800", "600");
					
					}else{
					$FH->GDImageResize($tmp_img_list[$ii] , $target_path);
					}

			$FH->thumb_target = $refile[$ii];
			
	
			$_get_thumb_filename  = $refile[$ii];

			
			$r_file = $FH->get_real_url($refile[$ii]);
			$str_text = str_replace($tmp_img_list[$ii],$r_file,$str_text);
			
			$str_text = str_replace($FH->host,'%FILE_HOST%',$str_text);
				
			
			//////////////////////////////////////////////
			}
		}
	
		return $str_text;
}


function ImgChaneDe($content, $main="-2"){ // 새로운 에디터 이미지 쓰레기 처리 이현민 대리
	global $_OID, $sess_id, $DB, $FH, $sess_id;

	$sect = $FH->sect;
	$code = $FH->code;
	$FTP = &WebApp::singleton('FtpClient',WebApp::getConf('account'));

	$s = $content; 
	$s = preg_match_all("/<img\s+.*?src=[\"\']([^\"\']+)[\"\'\s][^>]*>/is", $content, $m); 
	$s = preg_match_all("/<param name=\"movie\"\s+.*?value=[\"\']([^\"\']+)[\"\'\s][^>]*>/is", $content, $m2); 
	$tmp_img_list = array_merge($m[1],$m2[1]);

	$ym_dir = date('Ym');

	$sql_insert1 = "SELECT MAX(NUM_SERIAL) FROM ".TAB_FILES." WHERE NUM_OID=$_OID AND STR_SECT='$sect' AND STR_CODE='$code' AND NUM_MAIN='$main'";
	$new_serial = $DB->sqlFetchOne($sql_insert1) + 1;

	for($ii=0; $ii<count($tmp_img_list); $ii++) {
		if(strstr($tmp_img_list[$ii],"/data/hosts/".$_OID."/board_tmp/") && $sess_id){
			//에디터삽입이미지처리
			$fpath = _DOC_ROOT.str_replace("http://".$_SERVER[HTTP_HOST],"",$tmp_img_list[$ii]);
			$ftype = array_pop(explode(".",$fpath));
			$fname = basename($fpath);
			$fsize = filesize($fpath);

			$rfname = $ym_dir.'/'.$code.'.'.$main.'.'.$new_serial.'.'.mktime().'.'.$ftype;
			$sql1 = "
					INSERT INTO ".TAB_FILES." (
						NUM_OID,STR_SECT,STR_CODE,NUM_MAIN,NUM_SERIAL,STR_UPFILE,STR_REFILE,STR_FTYPE,NUM_SIZE
					) VALUES (
						$_OID,'$sect','$code','$main',$new_serial,'$fname','$rfname','$ftype','$fsize'
					)";

			$DB->query($sql1);
			$DB->commit();

			//파일서버에 저장
			$fdir = $FH->file_dir."/".date("Ym");
			$FTP->check_dir($fdir);
			
			$FTP->rename($fpath,$FH->file_dir.'/'.$rfname);
			
			$FH->thumb_target = $rfname;
			$r_file = $FH->get_real_url($rfname);
			$content = str_replace($tmp_img_list[$ii],$r_file,$content);

			$new_serial++;
		}
	}

	//본문에 사용된 이미지 경로 변경해준다.
	$content = str_replace($FH->host,'%FILE_HOST%',$content);

	// /board_tmp/ 에 하루가 지난 폴더가 있으면 여기서 삭제하자~
	if(_OID != "20278") {
	$del_dir = _DOC_ROOT."/data/hosts/".$_OID."/board_tmp/".date("Ymd", mktime(0,0,0,date("m"),date("d")-2,date("Y")))."/";
	if (is_dir($del_dir)) { 
		system("rm -rf $del_dir");
	}
	}
	//2008-11-29 꼽사리 <wa 테크 처리
	$content = str_replace("<WA:APPLET","<wa:applet",$content);
	$content = str_replace("</WA:APPLET>","</wa:applet>",$content);
	$content = WebApp::ImgFindUpload($content);

	return  $content;

}


function ImgChaneDe3($content){ // 새로운 에디터 이미지 쓰레기 처리 이현민 대리

return  $content;
}








function saveThumbImg($readFilename,$saveFilename,$w=0,$h=0,$quality=100, $sizetype1=1, $sizetype2) {
	//WebApp::saveThumbImg($_FILES[$frmnm]['tmp_name'],_DOC_ROOT.'/hosts/'.HOST.'/files/lunch/'.$str_file."_100",100,50,100, 1, "");
	$image_data=getimagesize($readFilename);
	$image_type=$image_data[2];

	// 세로로 긴 이미지일 경우 가로 세로 사이즈 교체
	if($sizetype2 == 1) {
		
		if($image_data[1] > $image_data[0]) {
			
			$tmp	 	= $w;
			$w		= $h;
			$h			= $tmp;
		}
	}
	
	if($image_data[0] < $w) $w = $image_data[0];		// 기본 width 가 더 작을때는 기본 width 로 변경
	if($image_data[1] < $h) $h = $image_data[1];		// 기본 height 가 더 작을때는 기본 height 로 변경
	
	 // 비율높이 적용
	if($sizetype1 == 1) {
		
		if($w != "0") {
			
			$rapporto = @$image_data[0]/$w;	// 가로기준 축소비율 , case 1
			
			// 높이가 0이 아닐 경우에만 0일 경우는 가로기준 비율로 고정, 높이가 다른 이미지 생성
			if($h!="0")
				// 높이를 축소비율로 나누었을 때, 축소할 높이보다 클 경우 즉, 축소하고자 하는 높이보다 클 경우
				if($image_data[1]/$rapporto>$h) $rapporto=$image_data[1]/$h; // 축소비율을 높이 기준으로 변경한다. case 3
		}
		else {
			
			$rapporto=$image_data[1]/$h;	// 세로기준 축소비율 case 2
		}
			
		$thumb_w =	sprintf("%d", $image_data[0]/$rapporto);
		$thumb_h =	sprintf("%d", $image_data[1]/$rapporto);
	}
	// 고정높이 적용
	else {
		
		$thumb_w =	sprintf("%d", $w);
		$thumb_h =	sprintf("%d", $h);
	}

	if($image_type==1) 		$img_src = @imagecreatefromgif($readFilename);
	elseif($image_type==2) 	$img_src = @imagecreatefromjpeg($readFilename);
	
	$img_thumb 	=	@imagecreatetruecolor($thumb_w,$thumb_h);
	$result 	=	@imagecopyresampled($img_thumb,$img_src,0,0,0,0,$thumb_w,$thumb_h,$image_data[0],$image_data[1]);

	if($image_type==1) 			$result=imagegif($img_thumb,$saveFilename);
	elseif($image_type==2) 	$result=imagejpeg($img_thumb,$saveFilename,$quality);

	return $result;
}

function Makedir($real_dir) {
	$path = explode("/",$real_dir);
	for($i=0;$i<count($path);$i++) {
		for($j=0;$j<=$i;$j++) {
			$path_dir .= $path[$j]."/";
		}
		if (!is_dir($path_dir)) {
			mkdir($path_dir,0707);
			chmod($path_dir, 0777);
		}
		$path_dir=$path_con_dir="";
	}
}

function hGetStripCharList($stripLevel = 1) {
	/*
	[:alnum:] - 알파벳과 숫자. [a-zA-Z0-9]
	[:alpha:] - 알파벳. [a-zA-Z]
	[:cntrl:] - 제어문자. ASCII 값으로 0x00-0x1F와 0x7F
	[:digit:] - 숫자. [0-9]
	[:graph:] - 제어문자와 공백을 제외한 문자. ASCII 값으로 0x21-0x7E
	[:lower:] - 소문자. [a-z]
	[:print:] - 제어문자를 제외한 문자. ASCII 값으로 0x20-0x7E
	[:punct:] - [:graph:] 중에 [:alnum:]에 속하지 않은 문자. !, @, #, :, , 등
	[:space:] - space, tab, carriage return, new line, vertical tab, formfeed. ASCII 값으로 0x09-0x0D와 0x20
	[:upper:] - 대문자. [A-Z]
	[:xdigit:] - 16진수에 사용하는 문자. [0-9a-fA-F]
	*/

	$patternListLevel1 = array(
                                         chr(161).chr(161),
					 "&nbsp;",
					 "&nbsp");
					 //"\r",
					 //"\n");
					 //"\t");

					 // \r,\n,\r --> [[:cntrl:]] 에서 모두 처리됨

	// 특수문자가 2개이상 반복되면 -> " " 공백으로 치환
	// 범위 지정하는 방법있으면 -> 그걸로 변경해주세요.
	$patternListLevel2 = array(

					// 자판에 있는 것
					'~','`','!','@','#','$','%','^','&','*','(',')','-','+',
					'_','=','|','}',']','[','{','?',
					// 원문자
					'㉠','㉡','㉢','㉣','㉤','㉥','㉦','㉧','㉨','㉩',
					'㉪','㉫','㉬','㉭','㉮','㉯','㉰','㉱','㉲','㉳',
					 '㉴','㉵','㉶','㉷','㉸','㉹','㉺','㉻','ⓐ','ⓑ',
					'ⓒ','ⓓ','ⓔ','ⓕ','ⓖ','ⓗ','ⓘ','ⓙ','ⓚ','ⓛ',
					'ⓜ','ⓝ','ⓞ','ⓟ','ⓠ','ⓡ','ⓢ','ⓣ','ⓤ','ⓥ',
					'ⓦ','ⓧ','ⓨ','ⓩ','①','②','③','④','⑤','⑥',
					'⑦','⑧','⑨','⑩','⑪','⑫','⑬','⑭','⑮',
					// 괄호문자
					'㈀','㈁','㈂','㈃','㈄','㈅','㈆','㈇','㈈','㈉',
					'㈊','㈋','㈌','㈍','㈎','㈏','㈐','㈑','㈒','㈓',
					'㈔','㈕','㈖','㈗','㈘','㈙','㈚','㈛','⒜','⒝',
					'⒞','⒟','⒠','⒡','⒢','⒣','⒤','⒥','⒦','⒧',
					'⒨','⒩','⒪','⒫','⒬','⒭','⒮','⒯','⒰','⒱',
					'⒲','⒳','⒴','⒵','⑴','⑵','⑶','⑷','⑸','⑹',
					'⑺','⑻','⑼','⑽','⑾','⑿','⒀','⒁','⒂',
					// 단위기호
					'′','″','℃','Å','￠','￡','￥','¤','℉','‰','＄','％','Ｆ','￦',
					'㎕','㎖','㎗','ℓ','㎘','㏄','㎣','㎤','㎥','㎦',
					'㎙','㎚','㎛','㎜','㎝','㎞','㎟','㎠','㎡','㎢',
					'㏊','㎍','㎎','㎏','㏏','㎈','㎉','㏈','㎧','㎨',
					'㎰','㎱','㎲','㎳','㎴','㎵','㎶','㎷','㎸','㎹',
					'㎀','㎁','㎂','㎃','㎄','㎺','㎻','㎼','㎽','㎾',
					'㎿','㎐','㎑','㎒','㎓','㎔','Ω','㏀','㏁','㎊',
					'㎋','㎌','㏖','㏅','㎭','㎮','㎯','㏛','㎩','㎪',
					'㎫','㎬','㏝','㏐','㏓','㏃','㏉','㏜','㏆',
					// 첨자기호
					'½','⅓','⅔','¼','¾','⅛','⅜','⅝','⅞',
					'¹','²','³','⁴','ⁿ','₁','₂','₃','₄',
					// 일반기호
					'§','※','☆','★','○','●','◎','◇','◆','□','■','△','▽','→',
					'←','↑','↓','↔','〓','◁','◀','▷','▶','♤','♠','♡','♥','♧',
					'♣','⊙','◈','▣','◐','◑','▒','▤','▥','▨','▧','▦','▩','♨',
					'☏','☎','☜','☞','¶','†','‡','↕','↗','↙','↖','↘','♭','♩',
					'♪','♬','㉿','㈜','№','㏇','™','㏂','㏘','℡','＃','＆','＊','＠','ª','º',
					//기술기호
					'、','。','·','‥','…','¨','〃','­','―','∥','＼','∼','´','～','ˇ',
					'˘','˝','˚','˙','¸','˛','¡','¿','ː','！','＇','，','．','／','：','；','？','＾','＿','｀','｜','￣',
					//학술기호
					'±','×','÷','≠','≤','≥','∞','∴','♂','♀','∠','⊥','⌒','∂','∇','≡',
					'≒','≪','≫','√','∽','∝','∵','∫','∬','∈','∋','⊆','⊇','⊂','⊃','∪','∩',
					'∧','∨','￢','⇒','⇔','∀','∃','∮','∑','∏','＋','－','＜','＝','＞');


	$levelTotal = count($patternListLevel1);
	for($z = 0; $z < $levelTotal; $z++) {

		$pattern[] = "/" . preg_quote($patternListLevel1[$z], "/") . "/";
		$replace[] = ""; // 제거해 버림.
	}

	// 레벨2이면 -> 특수문자가 2번이상 반복되면 -> " " 공백으로
	if ($stripLevel == 2) {

                $patternList = "";

		$levelTotal = count($patternListLevel2);

		for($z = 0; $z < $levelTotal; $z++) {

			$patternList .= preg_quote($patternListLevel2[$z], '/') . '|';
		}

		$patternList = substr($patternList, 0, -1);

		// 3번이상 반복되면
		$patternList = "/(" . $patternList . "){3,}/";
		$replaceList = " "; // 공백으로 치환 "\\1";

		// 빈줄 제거
		$pattern[] = $patternList;
		$replace[] = $replaceList;
	}

	// 빈줄 제거
	$pattern[] = "/(^$)/";
	$replace[] = " ";

	// 제어문자 + 특수문자(0~127중에서  숫자,영문자를 제외한 것 필터링됨)
	//"[[:cntrl:]]", // 제어문자. ASCII 값으로 0x00-0x1F와 0x7F
	$pattern[] = "/[[:cntrl:]]/";
	$replace[] = "";

	 //"[[:punct:]]", // [:graph:] 중에 [:alnum:]에 속하지 않은 문자. !, @, #, :, , 등

        // 두개 이상 공백은 하나로
        $pattern[] = "/( +)/";
        $replace[] = " ";

	return array($pattern, $replace);
}




function hStripHtml($str, $pattern, $replace, $isCp949Rep = true) {

	$tmp = stripslashes($str);

	if ($isCp949Rep) {

		$strCp949 = @iconv( "CP949", "CP949//IGNORE", $tmp);
		if ($strCp949 !== false)
			$tmp = $strCp949;
	}

	// '<' '>' 문자 처리
	$tmp = str_replace(array("&lt;", "&gt;", "&quot;",  "&#39;"), array("<", ">", "\"",  "'"), $tmp);

	// html 태그 제거
   // $str = strip_tags($str);      //2006.10.30 <한글>만 허용됨으로 변경 by ahmin001
	$tmp = preg_replace("/(<\/?)(\w+)([^>]*>)/i", "", $tmp);
	
	// 불필요한 문자 제거
	$tmp = preg_replace($pattern, $replace, $tmp);
	
	return trim($tmp);
}

function isSpecialChar($oStr, $tStr) {
	if ($oStr != $tStr) {
		return 'n';
	}else {
		return 'y';
	}
}





function TextPilt($text){


	list($pattern, $replace) = WebApp::hGetStripCharList(2);
	$r_data =  WebApp::isSpecialChar($text, WebApp::hStripHtml($text, $pattern, $replace));
	echo WebApp::hStripHtml($text, $pattern, $replace);
	return $r_data;
}



function Script_out($content) {
if(strstr($content,'<script type="text/javascript">docWrite')) {

	$content = str_replace('<script type="text/javascript">docWrite',"",$content);
	$content = str_replace("</script>","",$content);
	$content = str_replace("('","",$content);
	$content = str_replace("');","",$content);
}
	return $content;
}





function goMcode ($vla){
global $mcode, $_OID;
if(!$mcode) {
	$DB = &WebApp::singleton("DB");
	$sql = "select num_mcode from TAB_MENU where num_oid = $_OID and str_type = '$vla' ";
	$mcode_meta = $DB -> sqlFetchOne($sql);	
	if($mcode_meta) {
		if(strstr($REQUEST_URI,"?")){
			echo "<meta http-equiv='Refresh' Content=\"0; URL='".$REQUEST_URI."&mcode=$mcode_meta'\">";
		}else{
			echo "<meta http-equiv='Refresh' Content=\"0; URL='".$REQUEST_URI."?mcode=$mcode_meta'\">";
		}
		exit;

	}
}

}


function mkday($date){
$a = explode("-",$date);
$mkt = mktime(00, 00, 01, $a[1],  $a[2], $a[0]);
return $mkt;
}

//파일 용량 채근 관련 함수
function OIDUploadFileSize(){
	global $_OID, $DB;

	//업로드 디스크 가능용량 체크, 최대 업로드 사이즈 체크
	$sql = "select num_disk, num_upload_size from TAB_ORGAN where num_oid = $_OID";

	$row2 = $DB -> sqlFetch($sql);

	$num_disk = $row2['num_disk'];
	$num_upload_size = $row2['num_upload_size'];

 

	//수치가 없는경우는 200기가로 세팅 무한대
	if(!$num_disk) $num_disk=1*1024*1024*1024;
	//수치가 없는경우 50mb로 제한
	if(!$num_upload_size) $num_upload_size=10*1024*1024;
	
	//현재 사용중인 디스크용량체크
	$sql = "select sum(num_size) from TAB_FILES where num_oid = $_OID";
	$db_num_size = $DB -> sqlFetchOne($sql);
	
	//현재 남은 디스크용량 체크
	$use_size = $num_disk-$db_num_size;

	if($use_size>1){
		//디스크 사용공간이 아직 남아있음.
		if($use_size < $num_upload_size){
			//1. 남은공간이 최대업로드 사이즈보다 작으면 남은공간만큼만 maxsize로 잡아줌.
			$maxfilesize = $use_size;
		}else{
			//2. 남은공간이 최대 업로드 사이즈보다 크므로 최대업로드사이즈까지 업로드 가능
			$maxfilesize = $num_upload_size;
		}

	}else{
		//디스크 사용공간이 꽉찾음. 1바이트로 세팅
		$maxfilesize = 1;
	}
	
	//설정된 디스크사용량, 설정된 최대업로드사이즈, 사용중인디스크사용량, 남은디스크사용량, 업로드가능한파일사이즈
	return array($num_disk, $num_upload_size, $db_num_size, $use_size, $maxfilesize);
}

function byte_convert($bytes){
	$symbol = array('byte', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB');

	$exp = 0;
	$converted_value = 0;
	if( $bytes > 0 ){
		$exp = floor( log($bytes)/log(1024) );
		$converted_value = ( $bytes/pow(1024,floor($exp)) );
	}

	return sprintf( '%.2f'.$symbol[$exp], $converted_value );
	//return sprintf( '%d'.$symbol[$exp], $converted_value );
}

	function set_content($content) {
		$s_num = DEFAULT_FILE_FTP_NUM;
		$file_ftp_conf_section = 'file'.$s_num.'_account';
		$ftp_conf = @parse_ini_file('conf/ftp.conf.php',true);
		$file_ftp_conf = $ftp_conf[$file_ftp_conf_section];

		return str_replace(
			'http://%FILE_HOST%',
			'http://'.$file_ftp_conf['host'],
			$content
		);
	}

}//// 기본 클래스 끝



/**
* WebApp_Message
* 
* 
*/
class WebApp_Message {
	var $header;
	var $body;

	function WebApp_Message($header=null,$body=null) {
		if ($header != null) $this->header = $header;
		else $this->header = array();

		if ($body != null) $this->body = $body;
	}

	/**
	* static WebApp_Message::fromString(string $str)
	* 문자열로부터 Mime 메시지를 읽어와서 파싱결과를 리턴
	* 
	*/
	function fromString($str) {
		$lines = split("\r?\n",$str);
		while ($line = array_shift($lines)) {
			list($key,$value) = explode(':',$line,2);
			$value = trim($value);
			if (substr($value,0,2) == '=?') {
				$value = WebApp_Message::decode_2047($value);
			}
			$header[$key] = $value;
		}
		$body = implode("\r\n",$lines);
		return new WebApp_Message($header,$body);
	}

	/**
	* static WebApp_Message::fromFile(string $filename)
	* 파일로부터 Mime 메시지를 읽어와서 파싱결과를 리턴
	* 
	*/
	function fromFile($file) {
		$str = file_get_contents($file);
		return WebApp_Message::fromString($str);
	}

	function setHeader($key,$value=null) {
		if (is_array($key) && $value == null) {
			$this->header = $key;
		} else {
			$this->header[$key] = $value;
		}
	}

	function setBody($body) {
		$this->body = $body;
	}

	function __toString() {
		return (string)$this->body;
	}

	function build() {
		foreach ($this->header as $key=>$value) {
			if (preg_match('/[^\x00-\x80]/x',$value)) {
				$value = $this->encode_2047($value);
			}
			$header.= $key.': '.$value."\r\n";
		}
		return $header."\r\n".$this->body;
	}

	function decode_2047($str) {
		if (substr($str,0,2) == '=?') {
			preg_match('/=\?([^\?]+)\?([bq]{1})\?(.*)\?=/i',$str,&$reg);
			/* $reg[1] stands for encoding */
			if ($reg[2] == 'b') $str = base64_decode($reg[3]);
			if ($reg[2] == 'q') $str = urldecode($reg[3]);
		}
		return $str;
	}

	function encode_2047($str,$method='b',$encoding='euc-kr') {
		switch ($method) {
			case 'b': //base64
				$enc = base64_encode($str);
				break;
			case 'q': //urlencode
				$enc = urlencode($str);
				break;
		}
		return '=?'.$encoding.'?'.$method.'?'.$enc.'?=';
	}






}
?>
