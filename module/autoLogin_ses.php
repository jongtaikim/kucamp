<?
// 관리자 타고 오면 자동로그인
if($ses_oid == 20271) {
	
		$DB = &WebApp::singleton('DB');
		$sql = "select str_host,str_organ from TAB_ORGAN where num_oid = $ses_oid ";
        $organdb = $DB -> sqlFetch($sql);

		$sql = "select str_id,
		str_name,
		str_passwd, 
		str_email,

		chr_mtype,
		str_nick,
		num_fcode,
		num_auth,
		str_setup


		FROM TAB_MEMBER 
		
		WHERE 
		num_oid=$ses_oid AND 
		str_id='admin'
		 ";
       $data = $DB->sqlFetch($sql);

		
		$_SESSION['SES_ORGAN'] = $organdb['str_organ'];
		$_SESSION['SES_HOST'] = $organdb['str_host'];
		$_SESSION['SES_ORGAN_OID'] = $ses_oid;
        
        
		//2008-12-04 종태 학교선생님,학교관리자는 권한 지정함
		if($data[chr_mtype] == "a") {
		$mem_type = array("a");
		$_SESSION['MEM_TYPE'] = $mem_type;
		$USER_TYPE = $_SESSION['CHR_MTYPE'];	
		$_SESSION['CHR_MTYPE'] = "a";
		$_SESSION['ADMIN'] = true;
		}
		
		$_SESSION['C_OID'] = $oid;

        $_SESSION['AUTH'] = true;
        $_SESSION['REMOTE_ADDR'] = getenv('REMOTE_ADDR');
       
		
        $_SESSION['USERID'] = $data['str_id'];
        $_SESSION['NAME'] = $data['str_name'];
		$_SESSION['NICKNAME'] = $data['str_nick'];
		$_SESSION['SETUP'] = $data['str_setup'];
		$_SESSION['PASSWORD'] = $data['str_passwd'];
		$_SESSION['E_MAIL'] = $data['str_email'];
        
if($t == "admin") {
echo "<meta http-equiv='Refresh' Content=\"0; URL='/admin.main'\">";	
}else{
echo "<meta http-equiv='Refresh' Content=\"0; URL='/'\">";
}


}

?>