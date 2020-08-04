<?
/* vim: set expandtab tabstop=4 shiftwidth=4 foldmethod=marker: */
/**
 * 작성일: 2010-01-29
 * 작성자: 김종태
 * 설   명: URL 덧글 위젯용 리스트 이젠 URL에 덧글을 달자
 *****************************************************************
 *
 */

$DB = &WebApp::singleton('DB');

global $mcode,$id,$module;

$template = "/html/comment/skin/".$comment_skin."/list.html";
$tpl->define($mou_name.'_W_',$template);

if(!$param[code]){
    echo "wa:applet 값에 code 값이 누락되었습니다.";
    exit;
}

if(!$param[idx]){
    echo "wa:applet 값에 idx 값이 누락되었습니다.";
    exit;
}


$code = $param[code].".".$param[idx];
$code = str_replace("&","|",$code);



if(!$listnum) $listnum = 50;

$sql = "select count(*) from comments where code = '".$code."'";
$total = $DB->sqlFetchOne($sql);
if(!$total) $total = 0;

$page = $_REQUEST['page'];
if (!$page) $page = 1;

$seek = $listnum * ($page - 1);
$offset = $seek + $listnum;

// 소스 입력부분
$sql = "select * from comments where code = '".$code."' order by   no desc limit  $seek,   $listnum";
$row = $DB -> sqlFetchAll($sql);

for($ii=0; $ii<count($row); $ii++) {
    $a = explode("-",$row[$ii]['dt_date']);

    $row[$ii]['dt_date1']= $a[0];

    $row[$ii]['dt_date2']= $a[1];
    $row[$ii]['dt_date3']= $a[2];

}



$tpl->assign(array(
    'comment_LIST'=>$row,
    'code_url'=>$code,
    'listnum'=>$listnum,
    'total'=>$total,

));


// 소스 입력부분


$content = $tpl->fetch($mou_name.'_W_');
echo $content;
?>