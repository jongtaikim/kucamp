<?
/* vim: set expandtab tabstop=4 shiftwidth=4 foldmethod=marker: */
/**
* �ۼ���: 2008-10-06
* �ۼ���: ������
* ��  ��: �ǽð� ��� ���ǽ�
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

	echo '<script>alert("��� ���� ������ '.$c_codun_c.'�� ���ҽ��ϴ�.");</script>';

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
			echo '<script>alert("������ ��Ȯ���� �ʽ��ϴ�.");history.back();</script>';
		}else{
			$tpl->setLayout('admin');
			$tpl->define("CONTENT", Display::getTemplate("lms/view2_fu_test.htm"));	
		}

	 break;
	}



?>