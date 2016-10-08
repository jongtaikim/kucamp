<?php
/* vim: set expandtab tabstop=4 shiftwidth=4 foldmethod=marker: */
/**
* 파일명: download(php)
* 작성일: 2004-07-07
* 작성자: 이범민
* 설  명: .htaccess 파일을 이용하여 Request Catch
*****************************************************************
* 
*/
require_once "lib/class.WebApp.php";
$CONF = @parse_ini_file("conf/global.conf.php",true);
$DB = &WebApp::singleton('DB');

define('TAB_FILES',$CONF['file_table']);

$HTTP_HOST = $_SERVER[HTTP_HOST];
$HTTP_HOST_ = explode(".",$HTTP_HOST);
$HOST = $HTTP_HOST_[0];

// PATH_INFO = download/{oid}/{sect}/{code}/{main}/{id}/{ym}/{filename}
$path_info = getenv("PATH_INFO");
$path_infos = explode("/",$path_info);
array_shift($path_infos);
list($oid,$sect,$code,$main,$id,$ym_dir,$filename) = $path_infos;
$sql = "SELECT STR_UPFILE,STR_REFILE,STR_FTYPE FROM TAB_FILES
		WHERE
			NUM_OID=$oid AND
			STR_SECT='$sect' AND
			STR_CODE='$code' AND
			NUM_MAIN=$main AND
			NUM_SERIAL=$id";


if($data = $DB->sqlFetch($sql)) {
	$str_upfile = $data['str_upfile'];
	$str_refile = $data['str_refile'];
	$ftype = $data['str_ftype'];
	//2009-07-01 종태 수정
	$filepath = "hosts/".$HOST ."/$sect/$str_refile";
	if(!$_REQUEST['nocount']) {
		$DB = &WebApp::singleton("DB");
		$sql = "UPDATE TAB_FILES SET NUM_DOWN = NUM_DOWN + 1
				WHERE
					NUM_OID=$oid AND
					STR_SECT='$sect' AND
					STR_CODE='$code' AND
					NUM_MAIN=$main AND
					NUM_SERIAL=$id";
		$DB->query($sql);
		$DB->commit();
		$DB->disconnect();
	}
}


if($filepath && is_file($filepath)) {
	$filesize = filesize($filepath);
	$_MIME_TYPE = get_header_type($ftype);
	$filename=urlencode($filename);

	header("Content-type: $_MIME_TYPE");
	header("Content-Length: $filesize");
	header("Content-Disposition: ".($nocount ? "inline" : "attachment")."; filename=$filename");
	$fp = fopen($filepath,'r');
	fpassthru($fp);
	fclose($fp);
} else {
	echo "<script>alert('파일이 존재하지 않습니다.');history.go(-1);</script>";
}

function get_header_type($extension) {
	#	이미지관련
	if( !strcasecmp($extension,"jpeg") || !strcasecmp($extension,"jpg") || !strcasecmp($extension,"jpe") )$_MIME_TYPE = "image/jpeg";
	if( !strcasecmp($extension,"gif") )$_MIME_TYPE = "image/gif";
	if( !strcasecmp($extension,"png") )$_MIME_TYPE = "image/png";		
	if( !strcasecmp($extension,"bmp") )$_MIME_TYPE = "image/bmp";
	#	오피스 관련
	if( !strcasecmp($extension,"doc") )$_MIME_TYPE = "application/msword";	
	if( !strcasecmp($extension,"xls") )$_MIME_TYPE = "application/vnd.ms-excel";
	if( !strcasecmp($extension,"ppt") )$_MIME_TYPE = "application/vnd.ms-powerpoint";
	#	오디오 관련
	if( !strcasecmp($extension,"mid") || !strcasecmp($extension,"midi") || !strcasecmp($extension,"kar") )$_MIME_TYPE = "audio/midi";
	if( !strcasecmp($extension,"mpga") || !strcasecmp($extension,"mp2") || !strcasecmp($extension,"mp3") )$_MIME_TYPE = "audio/mpeg";
	if( !strcasecmp($extension,"wav") )$_MIME_TYPE = "audio/x-wav";
	#	압축 관련			
	if( !strcasecmp($extension,"zip") )$_MIME_TYPE = "application/zip";			
	#	기타 파일
	if( $_MIME_TYPE=="" )$_MIME_TYPE = "application/octet-stream";
	return $_MIME_TYPE;
}
?>