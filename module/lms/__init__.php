<?
if(!$no_euc) {
    header("Content-Type: text/html; charset=EUC-KR");
}
//2011-11-22 상점 아이디 및 비번 kspay.co.kr 기준
$strs_id = "2001105126";
$strs_pw = "54456";

//조기등록 날짜
$sa_date ="20200630";


$tpl->assign(array(
	'strs_id'=>$strs_id,
	'strs_pw'=>$strs_pw,
	'sa_date'=>$sa_date,
	));




?>

