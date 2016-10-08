<?
/* vim: set expandtab tabstop=4 shiftwidth=4 foldmethod=marker: */
/**
* 작성일: 2008-01-30
* 작성자: 김종태
* 설  명: 몰라임마~!
*****************************************************************
* 
*/
$DB = &WebApp::singleton('DB');

$sql = "select num_serial,num_comment from TAB_BOARD where num_oid = $_OID and num_oid=20252 and num_mcode = 11813  ";
$row = $DB -> sqlFetchAll($sql);


for($ii=0; $ii<count($row); $ii++) {

	$sql = "select count(*) from TAB_BOARD_COMMENT where num_oid = $_OID and num_mcode = 11813 and num_main = ".$row[$ii][num_serial]."";
	$count = $DB -> sqlFetchOne($sql);
	
	echo $row[$ii][num_comment]." | ".$count."<br>";
	
	 $sql = "UPDATE ".TAB_BOARD." SET num_comment='".$count."' WHERE num_oid = $_OID and num_mcode = 11813 and num_serial = ".$row[$ii][num_serial]."";
	$DB->query($sql);
	 $DB->commit();
	
	
	
}




?>