<?
//2008-01-04 ����
/**********************************
���ο� �б� ������

���α׷� : ����
������ : ��ȭ
**********************************/


//�б޼��� üũ
$DB = &WebApp::singleton('DB');
//$DB->backup_mysql(date("Ymd"));

/*$sql = "select count(*) from TAB_CLASS_GRADE where num_oid = $_OID ";
$class_row = $DB -> sqlFetchOne($sql);

/*
if(!$class_row && _AOID != _OID && !$class) {
WebApp::confirm('"�б����� �����ϴ�. �б��� ���Ͻðڽ��ϱ�?"','/admin.form.main?PageNum=020200','/admin.main?class=no');

}*/




function byte_convert($bytes){
	$symbol = array('byte', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB');

	$exp = 0;
	$converted_value = 0;
	if( $bytes > 0 ){
		$exp = floor( log($bytes)/log(1024) );
		$converted_value = ( $bytes/pow(1024,floor($exp)) );
	}
	if($bytes) {
		return sprintf( '%.2f'.$symbol[$exp], $converted_value );
	}

	//return sprintf( '%d'.$symbol[$exp], $converted_value );
}





//2008-10-28  ���� ȸ������ �����ڿ� ǥ��
$_member_type = WebApp::getConf('member_type');
$tpl->assign(array('gname'=>$_member_type[$_SESSION['CHR_MTYPE']]));

$sql = "select num_disk,num_upload_size,str_end_date from TAB_ORGAN where num_oid = $_OID ";

//$disk_db = $DB -> sqlFetch($sql);
$disk_db[num_disk] = byte_convert($disk_db[num_disk]);
$disk_db[num_upload_size] = byte_convert($disk_db[num_upload_size]);
$tpl->assign($disk_db);






	$DB = &WebApp::singleton('DB');
	$sql = "select

	   str_organ, str_title, 
	   str_host, str_domain, str_theme, 
	   TO_CHAR(dt_date,'YYYY-MM-DD')  as dt_date

	from TAB_ORGAN where num_oid = $_OID ";
	$data_organ = $DB -> sqlFetch($sql);
	$tpl->assign($data_organ);

	/*$sql = "select count(*) from TAB_MEMBER where num_oid = $_OID ";
	$member_total = $DB -> sqlFetchOne($sql);
	$tpl->assign(array('member_total'=>$member_total));

	$sql = "select count(*) from TAB_MEMBER where num_oid = $_OID and num_auth = 0";
	$member_total_m = $DB -> sqlFetchOne($sql);
	$tpl->assign(array('member_total_m'=>$member_total_m));

	*/





	$tpl->setLayout('admin_main'); // ���̾ƿ��� ����


		$tpl->define("CONTENT", WebApp::getTemplate("admin/main2.htm"));


	$tpl->assign(array(
		'organ'=>$organ,


	));





?>
