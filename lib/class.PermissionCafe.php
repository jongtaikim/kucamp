<?php
/* vim: set expandtab tabstop=4 shiftwidth=4 foldmethod=marker: */
/**
* 파일명: lib/class.PermissionCafe.php
* 작성일: 2008-01-05
* 작성자: 이현민
* 설   명: 카페 퍼미션 적용하기
*****************************************************************
* 
*/

class PermissionCafe {
	var $DB;
	var $var = array();

	function PermissionCafe() {
		$this->DB = &WebApp::singleton('DB');
	}

	function check($sect='menu', $code='00', $cond='r', $mtype='x') {
		if(!$mtype) $mtype="x";
		if(!isset($this->var[$sect][$code][$cond])) {
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
			str_group = '".$mtype."' AND
			INSTR(str_right,'$cond') > 0";

			$this->var[$sect][$code][$cond] = $this->DB->sqlFetchOne($sql);	

		}
		return $this->var[$sect][$code][$cond] || $_SESSION['ADMIN'] || $_SESSION[CAFE_ADMIN_sub]|| $_SESSION[CAFE_ADMIN];

	}

	function apply($sect='menu',$code='00',$cond='r', $mtype='x', $mesg=false) {
		if (!$mtype) $mtype="x";
		if (!$mesg) $mesg = '이 페이지를 열람할 수 있는 권한이 아닙니다.'; // _('You have no access permission for this page');
		//echo $sect.",".$code.",".$cond.",".$mtype."<br>";
		if (!$this->check($sect,$code,$cond,$mtype)){
			if(!$_SESSION[USERID]) {
				if($_SERVER[REDIRECT_QUERY_STRING]) {
					$_SESSION['reurl'] =  $_SERVER[REDIRECT_URL]."?".$_SERVER[REDIRECT_QUERY_STRING];	
				}else{
					$_SESSION['reurl'] =  $_SERVER[REDIRECT_URL];
				}
				echo "<meta http-equiv='Refresh' Content=\"0; URL='/member.login'\">";
				exit;	
			}else{
				WebApp::moveBack($mesg);
			}
			exit;
		}
	}
}

?>
