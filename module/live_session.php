<?
/* vim: set expandtab tabstop=4 shiftwidth=4 foldmethod=marker: */
/**
* 작성일: 2008-01-30
* 작성자: 김종태
* 설   명: 방송세션 만들기
*****************************************************************
* 
*/
$DB = &WebApp::singleton('DB');
if($idx) {
		
		$_SESSION['ROOM_IDX'] = $idx;

		$sql = "select count(*) from TAB_LIVE_TABLE where num_oid = $_OID and num_live_room = '".$_SESSION['ROOM_IDX']."' and str_id = '".$_SESSION['USERID']."'   ";

		$room_inx = $DB -> sqlFetchOne($sql);
		if(!$room_inx) {
		$sql = "
		INSERT INTO ".TAB_LIVE_TABLE." (num_oid,str_ip,str_id,num_live_room) 
		VALUES ($_OID,'".$_SERVER["REMOTE_ADDR"]."','".$_SESSION['USERID']."','".$_SESSION['ROOM_IDX']."') ";

		$DB->query($sql);
		$DB->commit();
		}

}
echo "Y";
?>