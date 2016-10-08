<?php
/* vim: set expandtab tabstop=4 shiftwidth=4 foldmethod=marker: */
/**
* 파일명: board/makethumb.php
* 작성일: 2004-09-04
* 작성자: 이범민
* 설  명: 썸네일만들기
*****************************************************************
* 
*/
$oid = $_REQUEST['oid'];
$sect = $_REQUEST['sect'];
$filename = $_REQUEST['filename'];
if(!isset($oid) || !isset($sect) || !$filename) exit;
if(!$width = $_REQUEST['width']) $width = 100;

list($ym_dir,$filename) = explode('/',$filename);
$filepath = "hosts/$oid/$sect/$ym_dir/$filename";
if(!is_file($filepath)) exit;
$_filename = explode('.',$filename);
$ext = array_pop($_filename);
$thumb_filename = implode('.',$_filename).'.thumb.'.$ext;
$thumb_filepath = "hosts/$oid/$sect/".$ym_dir.'/'.$thumb_filename;
$tmp_path = "tmp_upload/$thumb_filename";
$THUMB = &WebApp::singleton('Thumbnail',$filepath);
$THUMB->ThumbJPEG($width,$tmp_path);
if(is_file($tmp_path)) {
	$FTP = &WebApp::singleton("FtpClient");
	$ftp_host = WebApp::getConf('account.host');
	$ftp_user = WebApp::getConf('account.user');
	$ftp_pass = WebApp::getConf('account.pass');
	$ftp_root = WebApp::getConf('account.root_dir');
	$FTP->connect($ftp_host,$ftp_user,$ftp_pass);
	$FTP->chdir($ftp_root."/tmp_upload");
	if($FTP->rename($thumb_filename,$ftp_root."/".$thumb_filepath)) echo $thumb_filename;
}
?>