<?
############################################################
## Author : 하근호 (hopegiver@hotmail.com)                ##
## Algorithm : 서재한 (daddy@withsky.net)                 ##
## Date : 2002-05-30                                      ##
## Last Update : 2004-07-17                               ##
## Version : 2.6.4                                        ##
############################################################

/** 수정사항
 * BearTemplate : 기본경로를 "." => "" 로 변경
 * read_file() : 원격 파일 열기를 지원함
 * tpl_include() : preg_match_all 사용
 * _parse() : 변수를 치환하는 함수
 * php_include() : 외부 실행파일을 include
 * execute() : 외부 프로그램 실행함수
 * make_array() : 배열화 함수 포함
 * parse_single() : 단일영역을 파싱하는 함수, execute() 함수가 포함됨
 * parse_loop() : 루프영역을 파싱하는 함수
 * parse() : 메모리 절약을 위해 parse_single, parse_loop 로 분리
 * tprint() : tpl_include, execute 기능이 삭제됨
 * fetch() : 버퍼읽기 기능이 삭제됨
 * close() : 내부 다이나믹영역이 있는 경우 재귀호출
 */

class BearTemplate {

    var $Src;            //템플릿 원본 내용
    var $Arr;            //템플릿이 파싱된 결과
    var $Var;            //치환될 변수들이 저장
    var $Sub;            //서브 다이나믹 영역에 대한 정보
	var $Exe;			 //외부실행 변수들
    var $Top;            //마지막 파싱된 원본 키 저장
    var $Root;           //템플릿 디렉토리 경로
    var $separator;
	var $isLoop;

    # 템플릿 초기화 함수
    function BearTemplate($path="") {
        $this->Src = array();
        $this->Arr = array();
        $this->Var = &$GLOBALS;        //치환변수를 글로벌 변수로 초기화함.
        $this->Sub = array();
        $this->Top = "";
        $this->Root = preg_replace("/[\/]*$/", "", $path);    //템플릿 디렉토리 초기경로 보정
        $this->separator = array("{{", "}}");
		$this->isLoop = array();
    }

	# 파일읽기
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

    # 첨부파일이 있을 경우
    function tpl_include($buffer) {
		preg_match_all("/<!-- (REQUIRE|INCLUDE) FILE '([^>]+)' -->/", $buffer, $matches, PREG_SET_ORDER);
		for($i=0, $max=count($matches); $i<$max; $i++) {
            $path = $this->_parse($matches[$i][2]);     // 변수를 지정했을 경우
			$buffer = str_replace($matches[$i][0], $this->read_file($path), $buffer);
		}
		return $buffer;
	}

    # 파일을 읽어 템플릿을 정의하는 함수
    function define_file($variable, $filename) {
		if($this->Root) $path = $this->Root."/".$filename;
		else $path = $filename;
		$this->Src[$variable] = $this->tpl_include($this->read_file($path));		
    }

	# 첨부파일이 있을 경우(by WHITE) - DYNAMIC ARAE 내의 INCLUDEA 파일 
    function tpl_include_dynamic($buffer) {
		preg_match_all("/<!-- (REQUIRE|INCLUDEA) FILE '([^>]+)' -->/", $buffer, $matches, PREG_SET_ORDER);
		for($i=0, $max=count($matches); $i<$max; $i++) {
            $path = $this->_parse($matches[$i][2]);     // 변수를 지정했을 경우
			$buffer = str_replace($matches[$i][0], $this->read_file($path), $buffer);
		}
		return $buffer;
	}

	# 내부 다이나믹 영역을 정의하는 함수
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

    # 문서내용을 읽어 템플릿을 정의하는 함수
    function define_doc($variable, $document="") {
        if(is_array($variable)) {
            foreach($variable as $key => $buffer) $this->Src[$key] = $buffer;
        } else {
            $this->Src[$variable] = $document;
        }
    }

    # 템플릿 영역을 정의하는 함수
    function define($variable, $parent="") {
		if(!is_array($variable)) $arr[$variable] = $parent;
        else $arr = &$variable;
        foreach($arr as $key => $value) {
            if(!preg_match("/^[a-z0-9_-]+$/i", $value)) {
				$this->define_file($key, $value);
			}else $this->define_area($key, $value);
        }
    }

	# 내부 다이나믹 영역을 검색하는 재귀 함수
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

    # 경로 보정 함수
    function tpl_path($variable, $path="", $org="\./|images/|img/") {
        if(!$path) $path = $this->Root;
        $buffer = &$this->Src[$variable];
        $org = str_replace("/", "\/", $org);
        $buffer = preg_replace("/([='\"])($org)/i", "\\1$path/\\2", $buffer);
    }

    # 코멘트 처리하는 함수
    # 이후에는 삭제될 예정임.(되도록 사용하지 말것)
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

    # 변수를 할당하는 함수
    function assign($key, $value="") {
        if(is_array($key)) {
            foreach($key as $k =>$val) $this->Var[$k] = $val; // 배열로 Assign 한 경우
        } else {
            $this->Var[$key] = $value; // key, value 로 Assign 한 경우
        }
    }

	# 변수를 치환
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

	# 내부 PHP 실행파일 include 함수
	function php_include($path) {
        $var_arr = explode("?", $this->_parse($path));     // 변수를 지정했을 경우
        if($var_arr[1]) parse_str($var_arr[1]);							// 변수를 파싱해서 넘겨줌.
        $filename = $var_arr[0];
		if(!is_file($filename)) return "$filename is not found!";	
		
		ob_start();
		@include($filename);
		$str = ob_get_contents();
		ob_end_clean();

		return $str;
	}

    # 첨부파일이 있을 경우
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

	# 본문 배열화
	function make_array($variable, $buffer) {
		$buffer = $this->execute($buffer, $variable); // EXECUTE 기능구현
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

	# 싱글영역 파싱
	function parse_single($variable, $loop="noloop") {
		if(!$buffer = $this->Src[$variable]) return false;
		$buffer = $this->execute(&$buffer); // EXECUTE 기능구현
		if(is_array($loop)) $this->assign($loop);
		$this->Var[$variable] = $this->_parse($buffer);			
	}

	# 싱글영역 파싱(by WHITE)
	# DYNAMIC AREA 내의 INCLUDE 파일 한번더 파싱(템플릿 코드 치환)
	function parse_single_include($variable, $loop="noloop") {
		if(!$buffer = $this->Var[$variable]) return false;
		$buffer = $this->execute(&$buffer); // EXECUTE 기능구현
	
		if(is_array($loop)) $this->assign($loop);
		$this->Var[$variable] = $this->_parse($buffer);
	}	
	
	# 루프영역 파싱
	function parse_loop($variable, $loop="noloop") {
		if(!$loop) return false;
        // 한번도 파싱된 적이 없는 경우 -> 배열화
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
            # 2차원 배열이 아닌 경우 2차원 배열로 만듦
            if(!is_array($loop[0])) $loops[0] = $loop;
			else $loops = &$loop;

			// $loop 파싱
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
			
			//DYNAMIC AREA 안에 DYNAMIC AREA 선언
			$this->scan_area_main($variable);
			//echo "after2 = ".$this->Var[$variable]."<BR>";

			//템플릿 변수 치환(파싱을 한번 더 하는거라 시간이 더 오래 걸리지 않을까??)
			$this->parse_single_include($variable);			
			
        } else return false;
	}	

	# 내부 다이나믹 영역을 검색하는 재귀 함수(by WHITE)
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

	# 파싱 함수(by WHITE)
    function parse_main($variable, $loop="noloop") {
		if(in_array($variable, $this->isLoop) || $loop != 'noloop') {
			$this->parse_loop($variable, $loop);			
		} else {
			$this->parse_single_include($variable, $loop);
			$this->isLoop[] = $variable;
		}
        // 루프안에 루프가 존재할 경우
        for($i=0; $i<count($this->Sub[$variable]); $i++) {
            $subname = $this->Sub[$variable][$i];
            $this->Var[$subname] = "";
        }
        $this->Top = $variable;        //마지막에 파싱된 템플릿 변수를 저장한다.
	}

    # 파싱 함수
    function parse($variable, $loop="noloop") {
		if(in_array($variable, $this->isLoop) || $loop != 'noloop') {
			$this->parse_loop($variable, $loop);
		} else {
			$this->parse_single($variable, $loop);
			$this->isLoop[] = $variable;
		}
        // 루프안에 루프가 존재할 경우
        for($i=0; $i<count($this->Sub[$variable]); $i++) {
            $subname = $this->Sub[$variable][$i];
            $this->Var[$subname] = "";
        }
        $this->Top = $variable;        //마지막에 파싱된 템플릿 변수를 저장한다.
	}

    # 출력 함수
    function tprint($variable="") {
        if(!$variable) $variable = $this->Top;
        print($this->Var[$variable]);
    }

    # 값을 반환하는 함수
    function fetch($variable="") {
        if(!$variable) $variable = $this->Top;
		return $this->Var[$variable];
    }

    # 변수삭제
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