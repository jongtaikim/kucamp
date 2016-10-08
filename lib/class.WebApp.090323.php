<?
/**********************************************
* ���ϸ�: class.WebApp.php
* ��  ��: �����ø����̼� ����Ŭ����
* ��  ¥: 2003-04-08
* �ۼ���: ��ģ����
***********************************************
* 2003-10-07 �̱��� �߰�
* 2003-10-15 confirm �޼ҵ� �߰�
* 2004-01-14 getConf�� ��Ƽȣ��Ʈ������ ����,
*            config �� scope�� �����Ͽ� local �Ǵ� �۷ι� ������ �����ü� ����
* 2004-08-03 call(), get() �޼ҵ� �߰�
*            WebApp_Message Ŭ���� �߰�
* 2004-12-11 getTemplate() �޼ҵ带 Display Ŭ������ ����
*/

class WebApp {

	/**
	* WebAp::import()
	* �������� ����� �ε��Ѵ�.
	* 
	* @param string $module : ���� (class.����.php ���� ����κи�)
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
	* �������� ����� �ε� �� �ν��Ͻ��� �����Ѵ�.
	*
	* @param string $module : ���� (class.����.php ���� ����κи�)
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
	* �� ���ø����̼� ������ ���ɴϴ�.
	* ����array�� ���ϰ�� dot �����ڷ� �����Ͽ� ������ �� �ֽ��ϴ� ex) WebApp::getConf('board.rownum');
	* 
	* @param string $key
	* @return mixed
	*/
	function getConf($key="",$scope='merged') {
		global $HOST;

		global $_CONF;
		$_CONF['global'] = @parse_ini_file("conf/global.conf.php",true);
		$_CONF['local'] = @parse_ini_file("hosts/$HOST/conf/global.conf.php",true);

		$_CONF['merged'] = array_merge($_CONF['global'],$_CONF['local']);	// local ������ global ������ ���!
		if (!$key) return $_CONF[$scope];
		if(strpos($key, ".") > -1) {
			$t = explode(".", $key);
			$v = $_CONF[$scope];
			

			for($z=0,$c=count($t); $z<$c; $z++) {
				$v = $v[$t[$z]];
				if (!$v) {
					$_CONF['global'][$t[$z]] = @parse_ini_file('conf/'.$t[$z].'.conf.php',true);
					$_CONF['local'][$t[$z]] = @parse_ini_file("hosts/$HOST/conf/".$t[$z].'.conf.php',true);
					
					if (!$_CONF['local'][$t[$z]]) unset($_CONF['local'][$t[$z]]);	// ����ִ� ��Į������ �۷ι� ������ ���������� ���� ����
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

		$_CONF['merged'] = array_merge($_CONF['global'],$_CONF['local']);	// local ������ global ������ ���!
		if (!$key) return $_CONF[$scope];
		if(strpos($key, ".") > -1) {
			$t = explode(".", $key);
			$v = $_CONF[$scope];
			

			for($z=0,$c=count($t); $z<$c; $z++) {
				$v = $v[$t[$z]];
				if (!$v) {
					$_CONF['global'][$t[$z]] = @parse_ini_file('conf/'.$t[$z].'.conf.php',true);
					$_CONF['local'][$t[$z]] = @parse_ini_file("hosts/$HOST/conf/".$t[$z].'.conf.php',true);
					
					if (!$_CONF['local'][$t[$z]]) unset($_CONF['local'][$t[$z]]);	// ����ִ� ��Į������ �۷ι� ������ ���������� ���� ����
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



	// ������
	function setConf($key,$value='') {
	}

	/**
	* WebApp::mapPath()
	* ��θ� ���� ��� �Ǵ� ����Ʈ ��ο� ���� ������
	* 
	* @param string $path
	* @return string
	* @see asp���� Server.mappath() �޼ҵ�
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
	* ������Ʈ �����
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
	* Ư�� ����� ȣ���Ѵ�
	* 
	* @param string $module  ��⺰��(��Ʈ����)
	* @param dict $param     �Ķ����(key�������� array)
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
	* Ư�� ��⿡�� ���� �޾ƿ´�
	* 
	* @param string $module  ��⺰��(��Ʈ����)
	* @param string $param    ������ ���� �̸�
	*/
	function get($module,$param) {
		$path = 'module/'.str_replace('.','/',$module).'/__get.php';
		return include $path;
	}

	/**
	* WebApp::set()
	* Ư�� ��⿡ ���� �����Ѵ�.
	* 
	* @param string $module  ��⺰��(��Ʈ����)
	* @param string $param   ������ ���� �̸�
	* @param mixed  $data    ������ ���� ����Ÿ
	*/
	function set($module,$param,$data) {
		$path = 'module/'.str_replace('.','/',$module).'/__set.php';
		return include $path;
	}

	//==--------------------------------------------------------------==//
	//==-- ���� �ڵ鷯
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
				//echo "<b>����</b> $errstr $errfile ���� $errline ��° ���ο���<br>";
				break;
			default:
				// skip other errors
		}
	}

	function showErrors() {
	}

	//==--------------------------------------------------------------==//
	//==-- ���â ���, ������ �̵� ����
	//==--------------------------------------------------------------==//

	/**
	* WebApp::alert()
	* �ڹٽ�ũ��Ʈ ���â�� ����Ѵ�.
	* 
	* @param string $msg  ���â���� ����� �޽���
	*/
	function alert($msg) {
		$msg = str_replace(array("\n","'"),array("\\n","\'"),$msg);
		echo '<html><head><meta http-equiv="content-type" content="text/html; charset=euc-kr"></head><body>';
		echo "<script>alert('$msg');</script>";
		echo "</body></html>";
	}

	/**
	* WebApp::confirm()
	* �ڹٽ�ũ��Ʈ ����â�� ����� ������� ������ ���� �ٸ� url�� �����ش�
	* 
	* @param string $msg  �޽���
	* @param string $yes  ����ڰ� 'Ȯ��' ��ư�� �������� �̵��� url
	* @param string $no   ����ڰ� '���' ��ư�� �������� �̵��� url
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
	* �ش� �������� �̵��Ѵ�
	* 
	* @param string $url  �̵��� ������
	* @param string $msg  ���â���� ����� �޽���
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
	* �����丮 �ٷ� �������� �̵��Ѵ�
	* 
	* @param string $msg  ���â���� ����� �޽���
	*/
	function moveBack($msg="") {
		if ($msg) WebApp::alert($msg);
		echo "<script>history.back();</script>";
		exit;
	}

	/**
	* WebApp::halt()
	* ���α׷��� �����Ѵ�.
	* 
	* @param string $msg  ���â���� ����� �޽���
	*/
	function halt($msg='') {
		if ($msg) WebApp::alert($msg);
		exit;
	}

	/**
	* WebApp::closeWin()
	* ���� â�� �ݴ´�
	* 
	* @param boolean $flag �θ�â�� �������� �Ұ��ΰ�
	*/
	function closeWin($flag) {
		if ($flag) echo "<script>opener.location.reload();</script>";
		echo "<script>self.close();</script>";
		exit;
	}


    // ���� �߸��� ( �ѱ��ڸ��Ⱑ ������ �Ǿ� ���� )
    function content_split($str,$len = 2700) {
        $ret = array();
        while ($str) {
            $i = $len - 1;
            while(ord($str{$i}) > 127) {$i--;}  // �ѱ��� �ƴҶ����� ã�´�.
            while($i < ($len - 2)) { $i += 2; } // �ִ���̱��� 2�� ���Ѵ�
            $ret[] = substr($str,0,$i+1);
            $str = substr($str,$i+1);
        }
        return $ret;
    }

    // 2009-01-09 ���� �¶��α�����,������б� �� ��Ÿ mcodeüũ
    function Submcode_chk($mcode, $chkmcode) {
        if(substr($mcode,0,1) == $chkmcode) return "1";
    }


function ImgFindUpload($str_text){ //�ܺ��̹��� �ֱ�
	global $_OID, $sess_id, $DB, $FH,$serial;

	$sect = $FH->sect;
	$code = $FH->code;
		//2008-08-08 ���� �ܺ��̹����� ã�Ƽ� ������ �����Ѵ�..����
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


					//2008-04-17 ���� �̹��� üũ 
		
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


function ImgChaneDe($content, $main="-2"){ // ���ο� ������ �̹��� ������ ó�� ������ �븮
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
			//�����ͻ����̹���ó��
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

			//���ϼ����� ����
			$fdir = $FH->file_dir."/".date("Ym");
			$FTP->check_dir($fdir);
			
			$FTP->rename($fpath,$FH->file_dir.'/'.$rfname);
			
			$FH->thumb_target = $rfname;
			$r_file = $FH->get_real_url($rfname);
			$content = str_replace($tmp_img_list[$ii],$r_file,$content);

			$new_serial++;
		}
	}

	//������ ���� �̹��� ��� �������ش�.
	$content = str_replace($FH->host,'%FILE_HOST%',$content);

	// /board_tmp/ �� �Ϸ簡 ���� ������ ������ ���⼭ ��������~
	if(_OID != "20278") {
	$del_dir = _DOC_ROOT."/data/hosts/".$_OID."/board_tmp/".date("Ymd", mktime(0,0,0,date("m"),date("d")-2,date("Y")))."/";
	if (is_dir($del_dir)) { 
		system("rm -rf $del_dir");
	}
	}
	//2008-11-29 �Ż縮 <wa ��ũ ó��
	$content = str_replace("<WA:APPLET","<wa:applet",$content);
	$content = str_replace("</WA:APPLET>","</wa:applet>",$content);
	$content = WebApp::ImgFindUpload($content);

	return  $content;

}


function ImgChaneDe3($content){ // ���ο� ������ �̹��� ������ ó�� ������ �븮

return  $content;
}








function saveThumbImg($readFilename,$saveFilename,$w=0,$h=0,$quality=100, $sizetype1=1, $sizetype2) {
	//WebApp::saveThumbImg($_FILES[$frmnm]['tmp_name'],_DOC_ROOT.'/hosts/'.HOST.'/files/lunch/'.$str_file."_100",100,50,100, 1, "");
	$image_data=getimagesize($readFilename);
	$image_type=$image_data[2];

	// ���η� �� �̹����� ��� ���� ���� ������ ��ü
	if($sizetype2 == 1) {
		
		if($image_data[1] > $image_data[0]) {
			
			$tmp	 	= $w;
			$w		= $h;
			$h			= $tmp;
		}
	}
	
	if($image_data[0] < $w) $w = $image_data[0];		// �⺻ width �� �� �������� �⺻ width �� ����
	if($image_data[1] < $h) $h = $image_data[1];		// �⺻ height �� �� �������� �⺻ height �� ����
	
	 // �������� ����
	if($sizetype1 == 1) {
		
		if($w != "0") {
			
			$rapporto = @$image_data[0]/$w;	// ���α��� ��Һ��� , case 1
			
			// ���̰� 0�� �ƴ� ��쿡�� 0�� ���� ���α��� ������ ����, ���̰� �ٸ� �̹��� ����
			if($h!="0")
				// ���̸� ��Һ����� �������� ��, ����� ���̺��� Ŭ ��� ��, ����ϰ��� �ϴ� ���̺��� Ŭ ���
				if($image_data[1]/$rapporto>$h) $rapporto=$image_data[1]/$h; // ��Һ����� ���� �������� �����Ѵ�. case 3
		}
		else {
			
			$rapporto=$image_data[1]/$h;	// ���α��� ��Һ��� case 2
		}
			
		$thumb_w =	sprintf("%d", $image_data[0]/$rapporto);
		$thumb_h =	sprintf("%d", $image_data[1]/$rapporto);
	}
	// �������� ����
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
	[:alnum:] - ���ĺ��� ����. [a-zA-Z0-9]
	[:alpha:] - ���ĺ�. [a-zA-Z]
	[:cntrl:] - �����. ASCII ������ 0x00-0x1F�� 0x7F
	[:digit:] - ����. [0-9]
	[:graph:] - ����ڿ� ������ ������ ����. ASCII ������ 0x21-0x7E
	[:lower:] - �ҹ���. [a-z]
	[:print:] - ����ڸ� ������ ����. ASCII ������ 0x20-0x7E
	[:punct:] - [:graph:] �߿� [:alnum:]�� ������ ���� ����. !, @, #, :, , ��
	[:space:] - space, tab, carriage return, new line, vertical tab, formfeed. ASCII ������ 0x09-0x0D�� 0x20
	[:upper:] - �빮��. [A-Z]
	[:xdigit:] - 16������ ����ϴ� ����. [0-9a-fA-F]
	*/

	$patternListLevel1 = array(
                                         chr(161).chr(161),
					 "&nbsp;",
					 "&nbsp");
					 //"\r",
					 //"\n");
					 //"\t");

					 // \r,\n,\r --> [[:cntrl:]] ���� ��� ó����

	// Ư�����ڰ� 2���̻� �ݺ��Ǹ� -> " " �������� ġȯ
	// ���� �����ϴ� ��������� -> �װɷ� �������ּ���.
	$patternListLevel2 = array(

					// ���ǿ� �ִ� ��
					'~','`','!','@','#','$','%','^','&','*','(',')','-','+',
					'_','=','|','}',']','[','{','?',
					// ������
					'��','��','��','��','��','��','��','��','��','��',
					'��','��','��','��','��','��','��','��','��','��',
					 '��','��','��','��','��','��','��','��','��','��',
					'��','��','��','��','��','��','��','��','��','��',
					'��','��','��','��','��','��','��','��','��','��',
					'��','��','��','��','��','��','��','��','��','��',
					'��','��','��','��','��','��','��','��','��',
					// ��ȣ����
					'��','��','��','��','��','��','��','��','��','��',
					'��','��','��','��','��','��','��','��','��','��',
					'��','��','��','��','��','��','��','��','��','��',
					'��','��','��','��','��','��','��','��','��','��',
					'��','��','��','��','��','��','��','��','��','��',
					'��','��','��','��','��','��','��','��','��','��',
					'��','��','��','��','��','��','��','��','��',
					// ������ȣ
					'��','��','��','��','��','��','��','��','��','��','��','��','��','��',
					'��','��','��','��','��','��','��','��','��','��',
					'��','��','��','��','��','��','��','��','��','��',
					'��','��','��','��','��','��','��','��','��','��',
					'��','��','��','��','��','��','��','��','��','��',
					'��','��','��','��','��','��','��','��','��','��',
					'��','��','��','��','��','��','��','��','��','��',
					'��','��','��','��','��','��','��','��','��','��',
					'��','��','��','��','��','��','��','��','��',
					// ÷�ڱ�ȣ
					'��','��','��','��','��','��','��','��','��',
					'��','��','��','��','��','��','��','��','��',
					// �Ϲݱ�ȣ
					'��','��','��','��','��','��','��','��','��','��','��','��','��','��',
					'��','��','��','��','��','��','��','��','��','��','��','��','��','��',
					'��','��','��','��','��','��','��','��','��','��','��','��','��','��',
					'��','��','��','��','��','��','��','��','��','��','��','��','��','��',
					'��','��','��','��','��','��','��','��','��','��','��','��','��','��','��','��',
					//�����ȣ
					'��','��','��','��','��','��','��','��','��','��','��','��','��','��','��',
					'��','��','��','��','��','��','��','��','��','��','��','��','��','��','��','��','��','��','��','��','��','��',
					//�м���ȣ
					'��','��','��','��','��','��','��','��','��','��','��','��','��','��','��','��',
					'��','��','��','��','��','��','��','��','��','��','��','��','��','��','��','��','��',
					'��','��','��','��','��','��','��','��','��','��','��','��','��','��','��');


	$levelTotal = count($patternListLevel1);
	for($z = 0; $z < $levelTotal; $z++) {

		$pattern[] = "/" . preg_quote($patternListLevel1[$z], "/") . "/";
		$replace[] = ""; // ������ ����.
	}

	// ����2�̸� -> Ư�����ڰ� 2���̻� �ݺ��Ǹ� -> " " ��������
	if ($stripLevel == 2) {

                $patternList = "";

		$levelTotal = count($patternListLevel2);

		for($z = 0; $z < $levelTotal; $z++) {

			$patternList .= preg_quote($patternListLevel2[$z], '/') . '|';
		}

		$patternList = substr($patternList, 0, -1);

		// 3���̻� �ݺ��Ǹ�
		$patternList = "/(" . $patternList . "){3,}/";
		$replaceList = " "; // �������� ġȯ "\\1";

		// ���� ����
		$pattern[] = $patternList;
		$replace[] = $replaceList;
	}

	// ���� ����
	$pattern[] = "/(^$)/";
	$replace[] = " ";

	// ����� + Ư������(0~127�߿���  ����,�����ڸ� ������ �� ���͸���)
	//"[[:cntrl:]]", // �����. ASCII ������ 0x00-0x1F�� 0x7F
	$pattern[] = "/[[:cntrl:]]/";
	$replace[] = "";

	 //"[[:punct:]]", // [:graph:] �߿� [:alnum:]�� ������ ���� ����. !, @, #, :, , ��

        // �ΰ� �̻� ������ �ϳ���
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

	// '<' '>' ���� ó��
	$tmp = str_replace(array("&lt;", "&gt;", "&quot;",  "&#39;"), array("<", ">", "\"",  "'"), $tmp);

	// html �±� ����
   // $str = strip_tags($str);      //2006.10.30 <�ѱ�>�� �������� ���� by ahmin001
	$tmp = preg_replace("/(<\/?)(\w+)([^>]*>)/i", "", $tmp);
	
	// ���ʿ��� ���� ����
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

//���� �뷮 ä�� ���� �Լ�
function OIDUploadFileSize(){
	global $_OID, $DB;

	//���ε� ��ũ ���ɿ뷮 üũ, �ִ� ���ε� ������ üũ
	$sql = "select num_disk, num_upload_size from TAB_ORGAN where num_oid = $_OID";

	$row2 = $DB -> sqlFetch($sql);

	$num_disk = $row2['num_disk'];
	$num_upload_size = $row2['num_upload_size'];

 

	//��ġ�� ���°��� 200�Ⱑ�� ���� ���Ѵ�
	if(!$num_disk) $num_disk=1*1024*1024*1024;
	//��ġ�� ���°�� 50mb�� ����
	if(!$num_upload_size) $num_upload_size=10*1024*1024;
	
	//���� ������� ��ũ�뷮üũ
	$sql = "select sum(num_size) from TAB_FILES where num_oid = $_OID";
	$db_num_size = $DB -> sqlFetchOne($sql);
	
	//���� ���� ��ũ�뷮 üũ
	$use_size = $num_disk-$db_num_size;

	if($use_size>1){
		//��ũ �������� ���� ��������.
		if($use_size < $num_upload_size){
			//1. ���������� �ִ���ε� ������� ������ ����������ŭ�� maxsize�� �����.
			$maxfilesize = $use_size;
		}else{
			//2. ���������� �ִ� ���ε� ������� ũ�Ƿ� �ִ���ε��������� ���ε� ����
			$maxfilesize = $num_upload_size;
		}

	}else{
		//��ũ �������� ��ã��. 1����Ʈ�� ����
		$maxfilesize = 1;
	}
	
	//������ ��ũ��뷮, ������ �ִ���ε������, ������ε�ũ��뷮, ������ũ��뷮, ���ε尡�������ϻ�����
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

}//// �⺻ Ŭ���� ��



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
	* ���ڿ��κ��� Mime �޽����� �о�ͼ� �Ľ̰���� ����
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
	* ���Ϸκ��� Mime �޽����� �о�ͼ� �Ľ̰���� ����
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
