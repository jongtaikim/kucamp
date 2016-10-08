<?
############################################################
## Author : �ϱ�ȣ (hopegiver@hotmail.com)                ##
## Algorithm : ������ (daddy@withsky.net)                 ##
## Date : 2002-05-30                                      ##
## Last Update : 2004-07-17                               ##
## Version : 2.6.4                                        ##
############################################################

/** ��������
 * BearTemplate : �⺻��θ� "." => "" �� ����
 * read_file() : ���� ���� ���⸦ ������
 * tpl_include() : preg_match_all ���
 * _parse() : ������ ġȯ�ϴ� �Լ�
 * php_include() : �ܺ� ���������� include
 * execute() : �ܺ� ���α׷� �����Լ�
 * make_array() : �迭ȭ �Լ� ����
 * parse_single() : ���Ͽ����� �Ľ��ϴ� �Լ�, execute() �Լ��� ���Ե�
 * parse_loop() : ���������� �Ľ��ϴ� �Լ�
 * parse() : �޸� ������ ���� parse_single, parse_loop �� �и�
 * tprint() : tpl_include, execute ����� ������
 * fetch() : �����б� ����� ������
 * close() : ���� ���̳��Ϳ����� �ִ� ��� ���ȣ��
 */

class BearTemplate {

    var $Src;            //���ø� ���� ����
    var $Arr;            //���ø��� �Ľ̵� ���
    var $Var;            //ġȯ�� �������� ����
    var $Sub;            //���� ���̳��� ������ ���� ����
	var $Exe;			 //�ܺν��� ������
    var $Top;            //������ �Ľ̵� ���� Ű ����
    var $Root;           //���ø� ���丮 ���
    var $separator;
	var $isLoop;

    # ���ø� �ʱ�ȭ �Լ�
    function BearTemplate($path="") {
        $this->Src = array();
        $this->Arr = array();
        $this->Var = &$GLOBALS;        //ġȯ������ �۷ι� ������ �ʱ�ȭ��.
        $this->Sub = array();
        $this->Top = "";
        $this->Root = preg_replace("/[\/]*$/", "", $path);    //���ø� ���丮 �ʱ��� ����
        $this->separator = array("{{", "}}");
		$this->isLoop = array();
    }

	# �����б�
	function read_file($path) {
		if(!preg_match("/^(http|ftp):\/\//i", $path) && !is_file($path))
			return "$path is not found!";
		if($fp = @fopen($path,"r")) {
			while(!feof($fp)) $buffer .= fread($fp, 10000);
			fclose($fp);
			return $buffer;
		} else {
			return "$path is not opened!";
		}
	}

    # ÷�������� ���� ���
    function tpl_include($buffer) {
		preg_match_all("/<!-- (REQUIRE|INCLUDE) FILE '([^>]+)' -->/", $buffer, $matches, PREG_SET_ORDER);
		for($i=0, $max=count($matches); $i<$max; $i++) {
            $path = $this->_parse($matches[$i][2]);     // ������ �������� ���
			$buffer = str_replace($matches[$i][0], $this->read_file($path), $buffer);
		}
		return $buffer;
	}

    # ������ �о� ���ø��� �����ϴ� �Լ�
    function define_file($variable, $filename) {
		if($this->Root) $path = $this->Root."/".$filename;
		else $path = $filename;
		$this->Src[$variable] = $this->tpl_include($this->read_file($path));		
    }

	# ÷�������� ���� ���(by WHITE) - DYNAMIC ARAE ���� INCLUDEA ���� 
    function tpl_include_dynamic($buffer) {
		preg_match_all("/<!-- (REQUIRE|INCLUDEA) FILE '([^>]+)' -->/", $buffer, $matches, PREG_SET_ORDER);
		for($i=0, $max=count($matches); $i<$max; $i++) {
            $path = $this->_parse($matches[$i][2]);     // ������ �������� ���
			$buffer = str_replace($matches[$i][0], $this->read_file($path), $buffer);
		}
		return $buffer;
	}

	# ���� ���̳��� ������ �����ϴ� �Լ�
    function define_area($variable, $parent) {
        $buffer = $this->Src[$parent];
        $buff = explode("<!-- DYNAMIC AREA '".$variable."' -->", $buffer);
/*
		if(count($buff) == 3) {
		    $this->Src[$variable] = $buff[1];
		    $this->Src[$parent] = $buff[0].$this->separator[0].$variable.$this->separator[1].$buff[2];
		    $this->Sub[$parent][] = $variable;
				$this->isLoop[] = $variable;
		}
*/
		if(count($buff)%2==1 and count($buff)>1) {
			$this->Sub[$parent][] = $variable;
			$this->isLoop[] = $variable;
			$this->Src[$parent]="";
			for ($i=0;$i<count($buff) ; $i++) {
				if($i%2==1) {
					$this->Src[$parent] .= $this->separator[0].$variable.$this->separator[1];
					$this->Src[$variable] = $buff[$i];
				}
				else {
					$this->Src[$parent] .= $buff[$i];					
				}
			}
		}		
    }

    # ���������� �о� ���ø��� �����ϴ� �Լ�
    function define_doc($variable, $document="") {
        if(is_array($variable)) {
            foreach($variable as $key => $buffer) $this->Src[$key] = $buffer;
        } else {
            $this->Src[$variable] = $document;
        }
    }

    # ���ø� ������ �����ϴ� �Լ�
    function define($variable, $parent="") {
		if(!is_array($variable)) $arr[$variable] = $parent;
        else $arr = &$variable;
        foreach($arr as $key => $value) {
            if(!preg_match("/^[a-z0-9_-]+$/i", $value)) {
				$this->define_file($key, $value);
			}else $this->define_area($key, $value);
        }
    }

	# ���� ���̳��� ������ �˻��ϴ� ��� �Լ�
	function scan_area($parent) {
		$start_pos = array();
		$buffer = &$this->Src[$parent];
		$pos_offset = 0;
		
		while(is_long($pos = strpos($buffer, "<!-- DYNAMIC AREA '", $pos_offset))) { 
			$pos += 19;
			$endpos = strpos($buffer, "' -->", $pos); 
			$var_name = substr($buffer, $pos, $endpos-$pos);
			if($start_pos[$var_name]) {
				$area_len = strlen($var_name) + 24;
				$area_start = $start_pos[$var_name];
				$area_end = $pos - 19;
				$this->Src[$var_name] = substr($buffer, $area_start, $area_end - $area_start);
				$buffer = substr($buffer, 0, $area_start - $area_len)
						.$this->separator[0].$var_name.$this->separator[1]
						.substr($buffer, $area_end + $area_len);
				$pos_offset = $start_pos[$var_name] - 24;
				unset($start_pos[$var_name]);
			} else {
				$pos_offset = $start_pos[$var_name] = $endpos + 5;
			}
		}
		//echo "aa=".$buffer."///////";
	}	

    # ��� ���� �Լ�
    function tpl_path($variable, $path="", $org="\./|images/|img/") {
        if(!$path) $path = $this->Root;
        $buffer = &$this->Src[$variable];
        $org = str_replace("/", "\/", $org);
        $buffer = preg_replace("/([='\"])($org)/i", "\\1$path/\\2", $buffer);
    }

    # �ڸ�Ʈ ó���ϴ� �Լ�
    # ���Ŀ��� ������ ������.(�ǵ��� ������� ����)
    function comment($key, $variable) {
        if(!isset($key)) return false;
        $buffer = $this->Src[$variable];
        if(is_array($key)) $count = count($key);
        else { $count = 1; $key = array($key); }
        for($i=0; $i<$count; $i++) {
            $buffer = str_replace("<!-- ".$key[$i]." START -->","<!--",$buffer);
            $buffer = str_replace("<!-- ".$key[$i]." END -->","-->",$buffer);
        }
        $this->Src[$variable] = $buffer;
    }

    # ������ �Ҵ��ϴ� �Լ�
    function assign($key, $value="") {
        if(is_array($key)) {
            foreach($key as $k =>$val) $this->Var[$k] = $val; // �迭�� Assign �� ���
        } else {
            $this->Var[$key] = $value; // key, value �� Assign �� ���
        }
    }

	# ������ ġȯ
	function _parse($buffer) {
		$buff1 = explode($this->separator[0], $buffer);
		$buffer = $buff1[0];
		for($i=1; $i<count($buff1); $i++) {
			$buff2 = explode($this->separator[1], $buff1[$i]);
			if(count($buff2) == 2 && preg_match("/^[a-z0-9_-]+$/i", $buff2[0])) {
				$buffer .= $this->Var[$buff2[0]] . $buff2[1];
			} else {
				$buffer .= $buff1[$i];
			}
		}
		return $buffer;
	}

	# ���� PHP �������� include �Լ�
	function php_include($path) {
        $var_arr = explode("?", $this->_parse($path));     // ������ �������� ���
        if($var_arr[1]) parse_str($var_arr[1]);							// ������ �Ľ��ؼ� �Ѱ���.
        $filename = $var_arr[0];
		if(!is_file($filename)) return "$filename is not found!";	
		
		ob_start();
		@include($filename);
		$str = ob_get_contents();
		ob_end_clean();

		return $str;
	}

    # ÷�������� ���� ���
    function execute($buffer, $variable="") {
		preg_match_all("/<!-- EXECUTE FILE '([^>]+)' -->/", $buffer, $matches, PREG_SET_ORDER);
		for($i=0, $max=count($matches); $i<$max; $i++) {
			if($variable) {
				$key = uniqid("EX_");
				$this->Exe[$variable][$key] = $matches[$i][1];
				$str = $this->separator[0].$key.$this->separator[1];
			} else {
				$str = $this->php_include($matches[$i][1]);
			}
			$buffer = str_replace($matches[$i][0], $str, $buffer);
		}
		return $buffer;
	}

	# ���� �迭ȭ
	function make_array($variable, $buffer) {
		$buffer = $this->execute($buffer, $variable); // EXECUTE ��ɱ���
		$buff1 = explode($this->separator[0], $buffer);
		$arr[] = $buff1[0];
		for($i=1; $i<count($buff1); $i++) {
			$buff2 = explode($this->separator[1], $buff1[$i]);
			if(count($buff2) == 2 && preg_match("/^[a-z0-9_-]+$/i", $buff2[0])) {
				$arr[] = $buff2[0]; $arr[] = $buff2[1];
			} else {
				$arr[] = ""; $arr[] = $buff1[$i];
			}
		}
		$this->Arr[$variable] = $arr;
		$this->Src[$variable] = "";
		return $arr;
	}

	# �̱ۿ��� �Ľ�
	function parse_single($variable, $loop="noloop") {
		if(!$buffer = $this->Src[$variable]) return false;
		$buffer = $this->execute(&$buffer); // EXECUTE ��ɱ���
		if(is_array($loop)) $this->assign($loop);
		$this->Var[$variable] = $this->_parse($buffer);			
	}

	# �̱ۿ��� �Ľ�(by WHITE)
	# DYNAMIC AREA ���� INCLUDE ���� �ѹ��� �Ľ�(���ø� �ڵ� ġȯ)
	function parse_single_include($variable, $loop="noloop") {
		if(!$buffer = $this->Var[$variable]) return false;
		$buffer = $this->execute(&$buffer); // EXECUTE ��ɱ���
	
		if(is_array($loop)) $this->assign($loop);
		$this->Var[$variable] = $this->_parse($buffer);
	}	
	
	# �������� �Ľ�
	function parse_loop($variable, $loop="noloop") {
		if(!$loop) return false;
        // �ѹ��� �Ľ̵� ���� ���� ��� -> �迭ȭ
        if(!$arr = $this->Arr[$variable]) { 
			if(!$buffer = &$this->Src[$variable]) return false;
			$arr = $this->make_array($variable, $buffer);			
        }

		if($loop == "noloop") {
			if($this->Exe[$variable]) {
				foreach ($this->Exe[$variable] as $key => $path) {
					$this->Var[$key] = $this->php_include($path);
				}
			}
			$str = $arr[0];
			for($j=1, $max=count($arr); $j<$max; $j+=2) {
				$str .= $this->Var[$arr[$j]] . $arr[$j+1];
			}
			$this->Var[$variable] .= $str;

		} elseif(is_array($loop)) {
            # 2���� �迭�� �ƴ� ��� 2���� �迭�� ����
            if(!is_array($loop[0])) $loops[0] = $loop;
			else $loops = &$loop;

			// $loop �Ľ�
			$lmax = count($loops);
			$amax=count($arr);
			for($i=0; $i<$lmax; $i++) {
				if($this->Exe[$variable]) {
					foreach ($this->Exe[$variable] as $key => $path) {
						$loops[$i][$key] = $this->php_include($path);
					}
				}
				$str = $arr[0];
				for($j=1; $j<$amax; $j+=2) {
					if(isset($loops[$i][$arr[$j]])) $str .= $loops[$i][$arr[$j]] . $arr[$j+1];
					else $str .= $this->Var[$arr[$j]] . $arr[$j+1];
				}
				$this->Var[$variable] .= $str;
			}
			//echo "main = ".$variable.$this->Var[$variable]."<BR>";
			//INCLUDEA parsing
			$this->Var[$variable] = $this->tpl_include_dynamic($this->Var[$variable]);
			//echo "after2 = ".$this->Var[$variable]."<BR>";
			
			//DYNAMIC AREA �ȿ� DYNAMIC AREA ����
			$this->scan_area_main($variable);
			//echo "after2 = ".$this->Var[$variable]."<BR>";

			//���ø� ���� ġȯ(�Ľ��� �ѹ� �� �ϴ°Ŷ� �ð��� �� ���� �ɸ��� ������??)
			$this->parse_single_include($variable);			
			
        } else return false;
	}	

	# ���� ���̳��� ������ �˻��ϴ� ��� �Լ�(by WHITE)
	function scan_area_main($parent) {
		$start_pos = array();
		$buffer = &$this->Var[$parent];
		$pos_offset = 0;
		global $confs;
				
		while(is_long($pos = strpos($buffer, "<!-- DYNAMIC AREA '", $pos_offset))) { 
			$pos += 19;
			$endpos = strpos($buffer, "' -->", $pos); 
			$var_name = substr($buffer, $pos, $endpos-$pos);
			if($start_pos[$var_name]) {
				$area_len = strlen($var_name) + 24;
				$area_start = $start_pos[$var_name];
				$area_end = $pos - 19;
				$this->Var[$var_name] = substr($buffer, $area_start, $area_end - $area_start);
				$buffer = substr($buffer, 0, $area_start - $area_len)
						.$this->separator[0].$var_name.$this->separator[1]
						.substr($buffer, $area_end + $area_len);
				$flag=1;
				for( $i=0; $i < sizeof($confs); $i++ ){
					if($var_name == 'SHOW_'.strtoupper($confs[$i])) {
						$flag=0;
						$i = sizeof($confs);
					}else $flag=1;
				}
				if($flag) $this->Var[$var_name]='';
				$pos_offset = $start_pos[$var_name] - 24;
				unset($start_pos[$var_name]);
			} else {
				$pos_offset = $start_pos[$var_name] = $endpos + 5;
			}
		}		
	}	

	# �Ľ� �Լ�(by WHITE)
    function parse_main($variable, $loop="noloop") {
		if(in_array($variable, $this->isLoop) || $loop != 'noloop') {
			$this->parse_loop($variable, $loop);			
		} else {
			$this->parse_single_include($variable, $loop);
			$this->isLoop[] = $variable;
		}
        // �����ȿ� ������ ������ ���
        for($i=0; $i<count($this->Sub[$variable]); $i++) {
            $subname = $this->Sub[$variable][$i];
            $this->Var[$subname] = "";
        }
        $this->Top = $variable;        //�������� �Ľ̵� ���ø� ������ �����Ѵ�.
	}

    # �Ľ� �Լ�
    function parse($variable, $loop="noloop") {
		if(in_array($variable, $this->isLoop) || $loop != 'noloop') {
			$this->parse_loop($variable, $loop);
		} else {
			$this->parse_single($variable, $loop);
			$this->isLoop[] = $variable;
		}
        // �����ȿ� ������ ������ ���
        for($i=0; $i<count($this->Sub[$variable]); $i++) {
            $subname = $this->Sub[$variable][$i];
            $this->Var[$subname] = "";
        }
        $this->Top = $variable;        //�������� �Ľ̵� ���ø� ������ �����Ѵ�.
	}

    # ��� �Լ�
    function tprint($variable="") {
        if(!$variable) $variable = $this->Top;
        print($this->Var[$variable]);
    }

    # ���� ��ȯ�ϴ� �Լ�
    function fetch($variable="") {
        if(!$variable) $variable = $this->Top;
		return $this->Var[$variable];
    }

    # ��������
    function close($variable="") {
        $keys = array();
        if(is_array($variable)) $keys = $variable;
        elseif($variable != "") $keys[0] = $variable; 
        else $keys = array_keys($this->Src);
        foreach($keys as $key) {
            unset($this->Var[$key]);
            unset($this->Src[$key]);
            unset($this->Arr[$key]);
            if($this->Sub[$key]) $this->close($this->Sub[$key]);
        }
    }
}

?>