<?php
/* vim: set expandtab tabstop=4 shiftwidth=4 foldmethod=marker syntax=php: */
/**
* 파일명: thumb(php)
* 작성일: 2005-03-29
* 작성자: 이범민
* 설  명: 썸네일(원본파일명으로 요청)
*****************************************************************
* 
*/
// PATH_INFO = thumb/{oid}/{sect}/{ym}/{filename}
$path_info = getenv('PATH_INFO');
$path_infos = explode('/',$path_info);
array_shift($path_infos);
list($oid,$sect,$width,$ym_dir,$filename) = $path_infos;
if(!$oid || !$sect || !$ym_dir || !$filename) exit;
if(!$width) $width = 100;
$_filename = explode('.',$filename);
$ext = array_pop($_filename);
if(!eregi('(jpe?g|gif|png)',$ext)) exit;
$thumb_name = implode('.',$_filename).'.thumb'.$width.'.jpg';
$thumbpath = 'hosts/'.$oid.'/'.$sect.'/'.$ym_dir.'/'.$thumb_name;


if(!is_file($thumbpath)) {
	$filepath = 'hosts/'.$oid.'/'.$sect.'/'.$ym_dir.'/'.$filename;
	if(!is_file($filepath)) exit;
	require_once 'lib/class.WebApp.php';
	$tmp_path = 'tmp_upload/'.$thumb_name;
	$THUMB = &WebApp::singleton('Thumbnail',$filepath);
	$THUMB->ThumbJPEG($width,$tmp_path);
	if(!is_file($tmp_path)) exit;
	chmod($tmp_path,0666);
	$FTP = &WebApp::singleton('FtpClient');
	$account = WebApp::getConf('account');
	$ftp_root = $account['root_dir'];
	$FTP->connect($account['host'],$account['user'],$account['pass']);
	$FTP->chdir($ftp_root.'/tmp_upload');
	if(!$FTP->rename($thumb_name,$ftp_root.'/'.$thumbpath)) exit;
	$FTP->close();
}

$filesize = filesize($thumbpath);
if($filesize <= 0) exit;
header('Content-type: image/jpeg');
header('Content-Length: '.$filesize);
$fp = fopen($thumbpath,'r');
fpassthru($fp);
fclose($fp);
?>