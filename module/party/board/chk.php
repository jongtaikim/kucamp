<?
$DB = &WebApp::singleton('DB');
header('Content-Type: text/html; charset=EUC-KR');
$sql = "select str_pass from $ARTICLE_TABLE where num_oid=$_OID AND num_pcode=$pcode and num_mcode='$mcode' and num_serial = '$id' ";

$row = $DB -> sqlFetchOne($sql);
usleep(40000);

if($row == $pass) {
	echo "Y"; 
	$_SESSION['bbs_pass'] = $row;
}else{
	echo "N"; 
}
?>