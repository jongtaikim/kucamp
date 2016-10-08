<?
/**********************************************
* 파일명: class.Display.php
* 설  명: 디스플레이 클래스
* 날  짜: 2003-04-07
* 작성자: 거친마루
* ---------------------------------------------
* 2003-09-16 레이아웃파일이 없을시 blank 로 자동 define
* 2003-09-16 blank 레이아웃 최적화, layout 중복define 오류수정
* 2003-09-30 setLayout 할때 특정 파일을 추가하여 파싱하는 기능 추가
* 2006-07-12 $ch 변수를 이용한 해킹을 방지하기 위해 /school 상위디렉으로의 접근을 차단.
***********************************************/

require_once "class.BearTemplate.php";

class Display_ewut extends BearTemplate {
	var $_dynArea;
	var $conditons;
	var $layout;
	var $layout_conf;

	function Display() {
		global $HOST;
		$this->BearTemplate();
		$this->conditions = array();
		$this->layout = @parse_ini_file("hosts/$HOST/conf/layout.conf.php",true);
		$this->layout['xmloutput'] = array(LAYOUT => 'layout/xmloutput.xml');
		if (func_num_args()) $this->setLayout(func_get_arg());
	}

	function setLayout($conf='blank',$file="") {
		global $HOST;

                if ($_REQUEST['ch'] && $conf != 'blank') {
                        $this->define('_LAYOUT',eregi_replace("\.+/","",$_REQUEST['ch']));
                        return true;
                }

		if ($file) {
			$_layout = @parse_ini_file(WebApp::mapPath($file),true);
			if ($_layout) $this->layout = array_merge($this->layout,$_layout);
		}
		if ($conf == 'blank') {
			$this->define_doc('_LAYOUT','{{CONTENT}}');
		} else {
			$this->layout_conf=$conf;
			$layout = "hosts/$HOST/$layout".$this->layout[$conf]['LAYOUT'];
			if (is_file($layout)) {
				$this->define("_LAYOUT",$layout);
			} else {
				$this->define_doc('_LAYOUT','{{CONTENT}}');
			}

			$this->_dynArea = $this->layout[$conf];
			if (is_array($this->_dynArea)) {
				foreach ($this->_dynArea as $name=>$file) {
					$this->define($name,$file);
					if ($conf=='sub') $this->scan_area($name);
				}
			}
		}
	}

	function setLayout2($conf='blank',$file="") {
		global $HOST;

                if ($_REQUEST['ch'] && $conf != 'blank') {
                        $this->define('_LAYOUT',eregi_replace("\.+/","",$_REQUEST['ch']));
                        return true;
                }

		if ($file) {
			$_layout = @parse_ini_file(WebApp::mapPath($file),true);
			if ($_layout) $this->layout = array_merge($this->layout,$_layout);
		}
		if ($conf == 'blank') {
			$this->define_doc('_LAYOUT','{{CONTENT}}');
		} else {
			$this->layout_conf=$conf;
			$layout = "hosts/$HOST/$layout".$this->layout[$conf]['LAYOUT'];
			if (is_file($layout)) {
				$this->define("_LAYOUT",$layout);
			} else {
				$this->define_doc('_LAYOUT','{{CONTENT}}');
			}

			$this->_dynArea = $this->layout[$conf];
			if (is_array($this->_dynArea)) {
				foreach ($this->_dynArea as $name=>$file) {
					$this->define($name,$file);
					if ($conf=='sub') $this->scan_area($name);
				}
			}
		}
	}

	function setLayoutFile($filename) {
		$this->define('_LAYOUT',WebApp::mapPath($filename));
	}

	function read_file($path) {
		global $HOST;
		if (!preg_match("/^(http|ftp):\/\//i", $path)) $path = WebApp::mapPath(ereg_replace('^@',"hosts/$HOST/",$path));
		if(!preg_match("/^(http|ftp):\/\//i", $path) && !is_file($path))
			return "<!-- Not found: $path 1 -->". is_file($path);
		if($fp = @fopen($path,"r")) {
			while(!feof($fp)) $buffer .= fread($fp, 10000);
			fclose($fp);
			return $buffer;
		} else {
			return "<!-- Open failed: $path -->";
		}
	}

	function setCond($var,$what) {
		$this->conditions[$var] = $what;
	}

	function fetchAll() {
		if (!$this->Src['_LAYOUT']) $this->Src['_LAYOUT'] = '<p align=center><b>레이아웃이 설정되지 않았습니다</b></p>';
		if ($this->layout_conf=="sub") {
			$confs = explode(",",WebApp::getConf('mainExpress') );	
			for( $i=0; $i < sizeof($confs); $i++ ){
				$this->parse( 'SHOW_'.strtoupper($confs[$i]) );
			}
			for( $i=0; $i < sizeof($confs); $i++ ){
				$this->parse( 'SHOW2_'.strtoupper($confs[$i]) );
			}
			$this->assign('current_menu',$this->getCurrentMenu());
			// 로그인 영역 구분을 위해 추가 2009-04-08 정병열
			($_SESSION['USERID']) ?  $this->parse( 'LOGIN' ) : $this->parse( 'LOGOUT' ) ;
			// 메뉴에 소속된 페이지인지 아닌지
			$p = $_REQUEST['p'];
			if (!$mcode) {
				if ($p) {
					list(,$mcode) = explode('.',$p);
					$this->assign('mcode',$mcode);
				}

				// 추가메뉴때미...하이라이트는 안되더라도..나와라~ 2009-05-15.영준
				if ($_REQUEST['code'] < 10 && $_REQUEST['code'] != '') {
					$this->assign('mcode',"99");
				}
				
			}
			if(ereg("^schoolpost",$_REQUEST['act'])) {
				$this->assign('xmlfile',"/html/schoolpost/schoolpost.xml");
				list(,$mcode)=explode(".",$_REQUEST['act']);
				$this->assign('mcode',"sp");
			} elseif ($_REQUEST['code'] < 10 && $_REQUEST['code'] != '') {  // 추가메뉴일때 xml 만든다 이젠 ~_~
				$this->assign('xmlfile',"submenu.xml");
			} else {
				$this->assign('xmlfile',"menu.xml");
			}

			if ($_REQUEST['mcode']||$_REQUEST['code']||$mcode) {
				if (eregi("^club.",$_REQUEST['act'])) { // 동아리 일때 오류나서 임시처리 -ㅁ-..2009-05-18.영준
					$this->parse( 'SHOW_NOXML' );
				} else {
					$this->parse( 'SHOW_XMLMENU' );
				}
			} else {
				$this->parse( 'SHOW_NOXML' );
			}

			//($_REQUEST['mcode']||$_REQUEST['code']||$mcode) ?  $this->parse( 'SHOW_XMLMENU' ) : $this->parse( 'SHOW_NOXML' ) ;

		}
		if (is_array($this->_dynArea)) {
			foreach ($this->_dynArea as $name=>$dummy) {
				$this->parse($name);
			}
		}

		$this->parse("_LAYOUT");
		$str = $this->fetch("_LAYOUT");

		//==-- IF 블록 처리 --==//
		//==-- 대소문자 무관, 공백 갯수 무관 처리 --==// 2007.02 정병열
		//==-- ELSE 블록처리 --==// 2007.02 정병열
		//==-- PHP 구문실행처리 --==// 2007.02 정병열

		ob_start();
		$strArray = preg_split("/<!-- *(IF|\?\{|ENDIF|\}|ELSE|\:|PHP) +(.*?) *-->/i",$str,-1,PREG_SPLIT_DELIM_CAPTURE);
		print $strArray[0];
		$nd=array();$ed=array();
		for ($i=1,$cnt=count($strArray); $i<$cnt; $i+=3) {
			$var_name=$strArray[$i+1];
			$var_name=preg_replace( array("/^(\'|\")/","/(\'|\")$/") ,"" , $var_name);
			$var_act=strtoupper($strArray[$i]);
			if (in_array($var_act , array('IF','?{'))) array_push($nd,$var_name);
			elseif (in_array($var_act , array('}','ENDIF'))) {
				$ed[sizeof($nd)-1]=false;
				array_pop($nd);
			}
			if (in_array($var_act , array('ELSE',':'))) $ed[sizeof($nd)-1]=$nd[sizeof($nd)-1];
			$cd=true;
			for ( $j=0,$cnt2=sizeof($nd) ; $j<$cnt2 ; $j++ ) {
				if ( $ed[$j] == $nd[$j] ) $ct=false;
				else $ct=true;
				if ( array_key_exists($nd[$j], $this->conditions) ) {
					if ( !$this->conditions[ $nd[$j] ] == $ct ) {
						$cd=false;
						break;
					}
				}
			}
			if ($cd) {
				if ($var_act=="PHP" && $var_name) eval($var_name);
				print $strArray[$i+2];
			}
		}
		$str=ob_get_clean();


		//==-- --==//

		//==-- 일부 텍스트를 교체 (exp) --==//
		$gettext = @parse_ini_file("hosts/"._HOST."/conf/gettext.conf.php");
		if ($gettext) {
			foreach ($gettext as $word=>$replace) {
				$words[] = '${'.$word.'}';
				$replaces[] = $replace;
			}
		}
		$str = str_replace($words,$replaces,$str);
		$str = ereg_replace('\${([^}]+)}',"\\1",$str);
		//==-- --==//

		return $str;
	}

	function printAll() {
		print $this->fetchAll();
	}


	// 여기서부터는 추가 메서드
	function getCurrentMenu() {

		$tmp_cont = explode('.', $_REQUEST['act']);

		switch($tmp_cont[0]) {
			case "news":	//공지사항,학교소식,교육소식
				$comm = $_REQUEST['comm'];
				switch($comm) {
					case "com":					
							$current_menu = '공지사항';
						break;
					case "sch":
							$current_menu = (WebApp::getConf('design.series')) ? '학교소식' : '학교소식' ;
						break;
					case "edu":
							$current_menu = '교육소식';
						break;
				}			
				break;
			case "calendar":
				$current_menu = '행사일정';
				break;
			case "calendar_schedule":
					$current_menu = '행사일정';
				break;
			case "honor":
				$current_menu = '명예의전당';

				break;
			case "poll":
				$current_menu = '설문조사';

				break;
			case "knowledge":
				$current_menu = '지식과상식';
				break;
			case "lunch":
				$current_menu = '오늘의식단';
				break;
			case "class":
				$current_menu = '학급홈피';
				break;
			case "club":
				$current_menu = '동아리';
				break;
			case "birthday":
				$current_menu = '생일축하';
				break;
			case "online":
				$current_menu = '온라인신청';
				break;
			case "vote":
				$current_menu = '온라인투표';
				break;
			case "sitemap":
				$current_menu = '사이트맵';
				break;
			case "banner":
				$current_menu = '배너모음';
				break;
			case "doc":
				switch($tmp_cont[1]) {
					case "info":
						$current_menu = "개인정보 보호방침";
						break;
					case "copyright_service":
						$current_menu = "저작권 보호지침";
						break;
				}
				break;
		}

		return $current_menu;

	}
}

?>
