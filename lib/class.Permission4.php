<?php
/* vim: set expandtab tabstop=4 shiftwidth=4 foldmethod=marker: */
/**
* 파일명: lib/class.Permission.php
* 작성일: 2006-03-25
* 작성자: 이범민
* 설  명: 퍼미션 적용하기
*****************************************************************
* 
*/

class Permission4 {
	var $DB;
    var $var = array();

	function Permission4() {
		$this->DB = &WebApp::singleton('DB');
	}

	function check4($sect='menu',$code='00',$cond='r' , $mode = '') {

		if(!isset($this->var[$sect][$code][$cond])) {
            if(!is_array($_SESSION['MEM_TYPE'])) $_SESSION['MEM_TYPE'] = array('x');
            $cond = $cond{0};
            $sql = "
                SELECT
                    COUNT(*)
                FROM
                    ".TAB_MENU_RIGHT."
                WHERE
                    num_oid="._OID." AND 
                    str_sect='".$sect."' AND 
                    str_code='".$code."' AND 
                    str_group IN ('".implode("','",$_SESSION['MEM_TYPE'])."') AND
                    INSTR(str_right,'$cond') > 0";

			if($mode !="ok") {
			$this->var[$sect][$code][$cond] = $this->DB->sqlFetchOne($sql);	
			}else{

			
		 if($cond == "r") {
			$this->var[$sect][$code][$cond] = 1;
		  }
		  if($cond == "l" ) {
			$this->var[$sect][$code][$cond] = 1;
		  }


			}
		
					
        }
		return $this->var[$sect][$code][$cond] || $_SESSION['ADMIN'];
	}



	function apply4($sect='menu',$code='00',$cond='r',$mesg=false) {
		if (!$mesg) $mesg = '이 페이지를 열람할 수 있는 권한이 아닙니다.'; // _('You have no access permission for this page');

		if (!$this->check4($sect,$code,$cond)){
			echo "<meta http-equiv='Refresh' Content=\"0; URL='/alert.alert_page?mcode=$code'\">";
			exit;
		}

		//WebApp::moveBack($mesg);
	}
}

?>
