<?php
/* vim: set expandtab tabstop=4 shiftwidth=4 foldmethod=marker: */
/**
* ���ϸ�: lib/class.Permission.php
* �ۼ���: 2006-03-25
* �ۼ���: �̹���
* ��  ��: �۹̼� �����ϱ�
*****************************************************************
* 
*/
 //�츮 ȸ���ϰ�� 2008-11-04 ����
/*if($_SERVER["REMOTE_ADDR"]  == "123.142.148.135" ) {*/
	


class Permission {
	var $DB;
    var $var = array();

	function Permission() {
		$this->DB = &WebApp::singleton('DB');
	}

	function check($sect='menu',$code='00',$cond='r' , $mode = '') {
	
		if(!isset($this->var[$sect][$code][$cond])) {
            if(!is_array($_SESSION['MEM_TYPE'])) {
			
				 $_SESSION['MEM_TYPE'] = array('n');
			
			}
           
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

				/*if(_OID ==3){
				echo $sql;
				exit;
				}*/

			$this->var[$sect][$code][$cond] = $this->DB->sqlFetchOne($sql);	
			
		
//gjsrokmc
//72006564

		
        }
		return $this->var[$sect][$code][$cond] || $_SESSION['ADMIN'];
	
	}

	function apply($sect='menu',$code='00',$cond='r',$mesg=false) {
		if (!$mesg) $mesg = '�� �������� ������ �� �ִ� ������ �ƴմϴ�.'; // _('You have no access permission for this page');

		if (!$this->check($sect,$code,$cond)){
			
			
			
			
			if(_OID == _AOID) {
			WebApp::moveBack($mesg);
			}else{

			if(!$_SESSION[USERID]) {

				if($_SERVER[REDIRECT_URL] !="/member.login"){
					if($_SERVER[REDIRECT_QUERY_STRING]) {
						$_SESSION['reurl'] =  $_SERVER[REDIRECT_URL]."?".$_SERVER[REDIRECT_QUERY_STRING];	
						$_reurl = $_SERVER[REDIRECT_URL]."?".$_SERVER[REDIRECT_QUERY_STRING];
					}else{
						$_SESSION['reurl'] =  $_SERVER[REDIRECT_URL];
						$_reurl = $_SERVER[REDIRECT_URL];
					}
			
				}	

					
					echo "<meta http-equiv='Refresh' Content=\"0; URL='/member.login?reurl=".urlencode($_reurl)."'\">";
					exit;	
				}else{
					WebApp::moveBack($mesg);
					//echo "<meta http-equiv='Refresh' Content=\"0; URL='/alert.alert_page?mcode=$code'\">";
				}
			}



			//echo "<meta http-equiv='Refresh' Content=\"0; URL='/alert.alert_page?mcode=$code'\">";
			exit;
		}

		//WebApp::moveBack($mesg);
	}
}



?>
