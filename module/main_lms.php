<?
/* vim: set expandtab tabstop=4 shiftwidth=4 foldmethod=marker: */
/**
* 파일명: main_lms.php
* 작성일: 2009-03-09
* 작성자: 이현민
* 설   명: 강좌리스트 wa
*****************************************************************
*
*/

$tpl = &WebApp::singleton('Display');
$DB = &WebApp::singleton('DB');
$URL = &WebApp::singleton('WebAppURL');

$mcode = $param['code'];
$opt = $param['opt'];

if($param['listnum']) $listnum = $param['listnum'];
else $listnum = 5;

if($param['titlelen']) $titlelen = $param['titlelen'];
else $titlelen = 30;

$mainv = array("best"=>"N","new"=>"N","opt1"=>"N","opt2"=>"N");
$mainv[$opt] = "Y";
$str_main_view = str_replace("N","_",implode("",$mainv));

$sql = "
select a.* from (
	 select ROWNUM as RNUM, b.* from (
		select num_ccode, num_mcode, str_title, str_tach_code from TAB_MEDIA_CONFIG where num_oid="._OID." and num_mcode like '".$mcode."%' and str_main_view like '$str_main_view' order by num_ccode desc
	)b)a
where a.RNUM >=  0 and a.RNUM <= $listnum ";
$data = $DB->sqlFetchAll($sql);
for($a=0 ; $a<sizeof($data) ; $a++){
	$data[$a]['title'] = Display::text_cut($data[$a]['str_title'],$titlelen,"..");

	$sql = "select str_name from TAB_TACH where num_oid = "._OID." and str_tach_code = ".$data[$a][str_tach_code]."";
	$data[$a]['str_tach_name'] = $DB -> sqlFetchOne($sql);

	$sql = "select count(*) from TAB_MEDIA where num_oid = "._OID." and num_ccode = ".$data[$a]['num_ccode']."";
	$data[$a]['num_media_cnt'] = $DB -> sqlFetchOne($sql);
}
$tpl->assign(array(
'LIST'=>$data,
));
 
$template = $param['template'];
$tpl->define('MainLmsWA_'.$mcode,$template);
$content = $tpl->fetch("MainLmsWA_".$mcode);

echo $content;

//==-- Functions --==//

//<wa:applet module="lms.main_lms" code="2110" listnum="5" titlelen="20"></wa:applet>
?>
