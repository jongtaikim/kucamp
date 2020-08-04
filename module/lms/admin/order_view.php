<?
/* vim: set expandtab tabstop=4 shiftwidth=4 foldmethod=marker: */
/**
* 작성일: 2008-01-30
* 작성자: 김종태
* 설  명: 몰라임마~!
*****************************************************************
*
*/
$DB = &WebApp::singleton('DB');

$table = "TAB_ORDER";
$table2 = "TAB_CAMP";
$table3 = "TAB_LMS_CATE";


switch ($REQUEST_METHOD) {
	case "GET":

	if(!$types){
		$types = "1";
	}



	$sql = "select b.str_title as camp_title, a.num_serial, a.num_ccode from ".$table2." a ,".$table3." b  where a.num_ccode = b.num_ccode order by a.num_ccode ,a.num_serial desc ";

	$camp_row = $DB -> sqlFetchAll($sql);

	//print_r($camp_row);

	$tpl->assign(array('camp_LIST'=>$camp_row));


	$sql = "
	select * from ".$table." where num_oid = '$_OID'  and str_order_code = '".$order_code."' ";
	$data = $DB->sqlFetch($sql);





	$sql = "select * from ".$table." where num_oid = '$_OID' and str_pr_name1 = '".$data[str_pr_name1]."' and  str_pr_name2 = '".$data[str_pr_name2]."' and str_addr1 = '".$data[str_addr1]."' and  str_st_name <> '".$data[str_st_name]."' ";
	$brs_data = $DB -> sqlFetchAll($sql);
	for($ii=0; $ii<count($brs_data); $ii++) {
		$sql = "select str_title from TAB_LMS_CATE where num_oid = '$_OID' and num_ccode = '".$brs_data[$ii][num_ccode]."'";
		$brs_data[$ii][ccode_title] = $DB -> sqlFetchOne($sql);
	}

	$tpl->assign(array('brs_LIST'=>$brs_data));

	$tel = explode("-",$data[str_phone]);
	$data[tel1] = $tel[0];
	$data[tel2] = $tel[1];
	$data[tel3] = $tel[2];

	$tel = explode("-",$data[str_handphone]);
	$data[tel11] = $tel[0];
	$data[tel22] = $tel[1];
	$data[tel33] = $tel[2];

	$tel = explode("-",$data[str_stu_handphone]);
	$data[tel111] = $tel[0];
	$data[tel222] = $tel[1];
	$data[tel333] = $tel[2];

	$email = explode("@",$data[str_email]);
	$data[email1] = $email[0];
	$data[email2] = $email[1];

	$email = explode("@",$data[str_email]);
	$data[email1] = $email[0];
	$data[email2] = $email[1];

	$jumin = explode("-",$data[str_jumin]);
	$data[jumin1] = $jumin[0];
	$data[jumin2] = $jumin[1];



	if($data[dt_bank_date]) $data[dt_bank_date] = date("Y-m-d",$data[dt_bank_date]); else $data[dt_bank_date]="";
	$tpl->assign($data);

	$sql = "
	select * from ".$table2." where num_oid = '$_OID'  and num_ccode = '".$data[num_ccode]."' and num_serial = '".$data[num_serial]."' ";
	$data = $DB->sqlFetch($sql);
	$num_ccode = $data[num_ccode];
	$tpl->assign($data);

	$sql = "
	select * from ".$table3." where num_oid = '$_OID'  and num_ccode = '".$data[num_ccode]."' ";
	$data = $DB->sqlFetch($sql);
	$tpl->assign($data);

	$sql = "select str_title as ccode_title   from TAB_LMS_CATE where num_oid = '$_OID' and num_ccode = '".$data[num_ccode]."'";
	$datas = $DB -> sqlFetch($sql);

    $datas['no_code'] = $_GET['order_code']."_to";
	$tpl->assign($datas);




	$tpl->setLayout('no3');
	$tpl->define("CONTENT", Display::getTemplate("lms/admin/order_view.htm"));

	 break;
	case "POST":


		foreach( $_POST as $val => $value )
	{
		if(strstr($val,"num_") || strstr($val,"str_")){
			$datas[$val] = $value;
		}
	}

	if($_POST['price_change']){
		list($datas[num_ccode],$datas[num_serial]) = explode("|",$_POST['select_ccode']);
	}

	$datas[str_jumin] = $jumin1."-".$jumin2;
	$datas[str_email] = $email1."@".$email2;

	$datas[str_phone] = $tel1."-".$tel2."-".$tel3;
	$datas[str_handphone] = $tel11."-".$tel22."-".$tel33;
	$datas[str_stu_handphone] = $tel111."-".$tel222."-".$tel333;
	$datas[dt_bank_date] = strtotime($_POST['dt_bank_date']);

	/*if(date("Ymd") >= 20131112){
		if($str_etc < 4){
			if($str_etc == 1) $datas[str_discount] = 50000;
			if($str_etc == 2) $datas[str_discount] = 50000;

			if($str_etc == 3) $datas[str_discount] = 50000;

		}
	}*/



//	$sqlV = "y";
	$DB->updateQuery($table,$datas," num_oid = '$_OID'  and str_order_code = '".$order_code."'");
	$DB->commit();


	$indata[num_oid] = _OID;
	$indata[num_date] = mktime();
	$indata[str_code] = $order_code;

	if($order_st_hi != $str_order_st){
		if($datas[str_order_st] == "1"){
			$indata[str_text] = "입금확인";
		}else if($datas[str_order_st] == "3"){
			$indata[str_text] = "입금대기";
		}else if($datas[str_order_st] == "0"){
			$indata[str_text] = "입금확인전";
		}else if($datas[str_order_st] == "6" || $datas[str_order_st] == "7"){
			$indata[str_text] = "대기자변경";
		}else{
			$indata[str_text] = "취소";
		}
	$indata[str_text] .= "정보 변경함";
	}

	if($def_ccode_text){
		$indata[str_text] .= "<br><span style=\'color:red\'>".$def_ccode_text."</span>에서 변경";
	}

	if($info_price_text){
		$indata[str_text] .= "<br>금액차이:".$info_price_text;
	}

	if($def_etc != $str_etc){
		if($datas[str_discount] > 0){
			$indata[str_text] .= "<br>".number_format($datas[str_discount])."원 특별할인율 변경합";
		}
	}


	$indata[str_name] = $_SESSION[NAME];
	if($indata[str_text]){
		$DB->insertQuery("TAB_ORDER_DATA_LOG",$indata);
		$DB->commit();
	}

	echo '<script>alert("저장되었습니다.");</script>';
	echo "<meta http-equiv='Refresh' Content=\"0; URL='/lms.admin.order_view?order_code=$order_code'\">";

	 break;
	}

?>
