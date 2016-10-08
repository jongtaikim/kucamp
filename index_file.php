<?
/**********************************************
* 파일명: index.php
* 설  명: WebApp ASP복합형 for 신규학교시스템
* 날  짜: 2004-10-28
* 작성자: 거친마루
* 수정자: 이범민
* 수정사항 : 파일서버에 맞게 소스 최소화
***********************************************/

$act = $_REQUEST['act'];
$p = $_REQUEST['p'];
$REQUEST_URI = getenv("REQUEST_URI");
$REQUEST_METHOD = getenv("REQUEST_METHOD");
$HOST = ereg_replace('^www\.','',strtolower(getenv('HTTP_HOST')));

if ($act) {
	$_path = explode('.',$act);
	$APPFILE = array_pop($_path).".php";
	$APPPATH = "module/".implode('/',$_path);
}

ini_alter("include_path",_DIR_MAIN.":$APPPATH:$APPPATH/lib:./lib:".ini_get("include_path"));
require_once "class.WebApp.php";
$CONF = @parse_ini_file("conf/global.conf.php",true);

define("TAB_FILES",$CONF['file_table']);

if (is_file('__init__.php')) include '__init__.php';
$pathinfo = explode('/',$APPPATH);
foreach ($pathinfo as $_path) {
	$path.= $_path."/";
	$_conf = $path."page.conf.php";
	$_common = $path."__init__.php";
	if (is_file($_conf)) {
		$_cfg = @parse_ini_file($_conf,true);
		if ($_cfg['layout']) $ch = $_cfg['layout'];
		@extract($_cfg['phpvars']);
	}
	if ($_REQUEST['ch']) $ch = $_REQUEST['ch'];
	if (is_file($_common)) include $_common;
}
if ($act) {
	$module = $APPPATH.'/'.$APPFILE;
	if (is_file($module)) include $module;
}
?>
