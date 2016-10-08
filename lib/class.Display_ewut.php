<?
/**********************************************
* ���ϸ�: class.Display.php
* ��  ��: ���÷��� Ŭ����
* ��  ¥: 2003-04-07
* �ۼ���: ��ģ����
* ---------------------------------------------
* 2003-09-16 ���̾ƿ������� ������ blank �� �ڵ� define
* 2003-09-16 blank ���̾ƿ� ����ȭ, layout �ߺ�define ��������
* 2003-09-30 setLayout �Ҷ� Ư�� ������ �߰��Ͽ� �Ľ��ϴ� ��� �߰�
* 2006-07-12 $ch ������ �̿��� ��ŷ�� �����ϱ� ���� /school ������������ ������ ����.
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
		if (!$this->Src['_LAYOUT']) $this->Src['_LAYOUT'] = '<p align=center><b>���̾ƿ��� �������� �ʾҽ��ϴ�</b></p>';
		if ($this->layout_conf=="sub") {
			$confs = explode(",",WebApp::getConf('mainExpress') );	
			for( $i=0; $i < sizeof($confs); $i++ ){
				$this->parse( 'SHOW_'.strtoupper($confs[$i]) );
			}
			for( $i=0; $i < sizeof($confs); $i++ ){
				$this->parse( 'SHOW2_'.strtoupper($confs[$i]) );
			}
			$this->assign('current_menu',$this->getCurrentMenu());
			// �α��� ���� ������ ���� �߰� 2009-04-08 ������
			($_SESSION['USERID']) ?  $this->parse( 'LOGIN' ) : $this->parse( 'LOGOUT' ) ;
			// �޴��� �Ҽӵ� ���������� �ƴ���
			$p = $_REQUEST['p'];
			if (!$mcode) {
				if ($p) {
					list(,$mcode) = explode('.',$p);
					$this->assign('mcode',$mcode);
				}

				// �߰��޴�����...���̶���Ʈ�� �ȵǴ���..���Ͷ�~ 2009-05-15.����
				if ($_REQUEST['code'] < 10 && $_REQUEST['code'] != '') {
					$this->assign('mcode',"99");
				}
				
			}
			if(ereg("^schoolpost",$_REQUEST['act'])) {
				$this->assign('xmlfile',"/html/schoolpost/schoolpost.xml");
				list(,$mcode)=explode(".",$_REQUEST['act']);
				$this->assign('mcode',"sp");
			} elseif ($_REQUEST['code'] < 10 && $_REQUEST['code'] != '') {  // �߰��޴��϶� xml ����� ���� ~_~
				$this->assign('xmlfile',"submenu.xml");
			} else {
				$this->assign('xmlfile',"menu.xml");
			}

			if ($_REQUEST['mcode']||$_REQUEST['code']||$mcode) {
				if (eregi("^club.",$_REQUEST['act'])) { // ���Ƹ� �϶� �������� �ӽ�ó�� -��-..2009-05-18.����
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

		//==-- IF ��� ó�� --==//
		//==-- ��ҹ��� ����, ���� ���� ���� ó�� --==// 2007.02 ������
		//==-- ELSE ���ó�� --==// 2007.02 ������
		//==-- PHP ��������ó�� --==// 2007.02 ������

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

		//==-- �Ϻ� �ؽ�Ʈ�� ��ü (exp) --==//
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


	// ���⼭���ʹ� �߰� �޼���
	function getCurrentMenu() {

		$tmp_cont = explode('.', $_REQUEST['act']);

		switch($tmp_cont[0]) {
			case "news":	//��������,�б��ҽ�,�����ҽ�
				$comm = $_REQUEST['comm'];
				switch($comm) {
					case "com":					
							$current_menu = '��������';
						break;
					case "sch":
							$current_menu = (WebApp::getConf('design.series')) ? '�б��ҽ�' : '�б��ҽ�' ;
						break;
					case "edu":
							$current_menu = '�����ҽ�';
						break;
				}			
				break;
			case "calendar":
				$current_menu = '�������';
				break;
			case "calendar_schedule":
					$current_menu = '�������';
				break;
			case "honor":
				$current_menu = '��������';

				break;
			case "poll":
				$current_menu = '��������';

				break;
			case "knowledge":
				$current_menu = '���İ����';
				break;
			case "lunch":
				$current_menu = '�����ǽĴ�';
				break;
			case "class":
				$current_menu = '�б�Ȩ��';
				break;
			case "club":
				$current_menu = '���Ƹ�';
				break;
			case "birthday":
				$current_menu = '��������';
				break;
			case "online":
				$current_menu = '�¶��ν�û';
				break;
			case "vote":
				$current_menu = '�¶�����ǥ';
				break;
			case "sitemap":
				$current_menu = '����Ʈ��';
				break;
			case "banner":
				$current_menu = '��ʸ���';
				break;
			case "doc":
				switch($tmp_cont[1]) {
					case "info":
						$current_menu = "�������� ��ȣ��ħ";
						break;
					case "copyright_service":
						$current_menu = "���۱� ��ȣ��ħ";
						break;
				}
				break;
		}

		return $current_menu;

	}
}

?>
