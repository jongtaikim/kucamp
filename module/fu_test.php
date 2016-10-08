<?
/* vim: set expandtab tabstop=4 shiftwidth=4 foldmethod=marker: */
/**
* 작성일: 2008-10-06
* 작성자: 김종태
* 설  명: 실시간 방송 강의실
*****************************************************************
* 
*/

switch ($REQUEST_METHOD) {
	case "GET":
	
//http://web1.fnup.com/Service/StockStory/Live/LiveStart_sub_2.asp?UserId={_SESSION.USERID}&UserNick={_SESSION.NICKNAME}&UserLevel={_SESSION.CHR_MTYPE}




/*
$sql = "select num_cunpone from TAB_HANDPHONE_IDX where num_oid = '$_OID' and str_id = '".$_SESSION[USERID]."' ";

$c_codunr = $DB -> sqlFetchOne($sql);
$c_codun_c = 3-($c_codunr+1);
if($c_codunr < 3) {

	echo '<script>alert("방송 입장 쿠폰이 '.$c_codun_c.'개 남았습니다.");</script>';

}
*/






	$tpl->setLayout('admin');

	$tpl->define("CONTENT", Display::getTemplate("lms/view2_fu_test1.htm"));	



		
	

	
	 break;
	case "POST":
	$tpl->assign(array(
		'UserId'=>$UserId,
		'UserNick'=>$UserNick,
		'UserLevel'=>$UserLevel,	
	));
	
		if(!$UserId || !$Userpass || !$UserNick){
			echo '<script>alert("정보가 정확하지 않습니다.");history.back();</script>';
		}else{
			$tpl->setLayout('admin');
			$tpl->define("CONTENT", Display::getTemplate("lms/view2_fu_test.htm"));	
		}

	 break;
	}



?>