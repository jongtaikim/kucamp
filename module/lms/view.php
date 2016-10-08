<?
/* vim: set expandtab tabstop=4 shiftwidth=4 foldmethod=marker: */
/**
* 작성일: 2011-08-19
* 작성자: 김종태
* 설   명: 교육신청 첫페이지
*****************************************************************
* 
*/
$DB = &WebApp::singleton('DB');
$table = "TAB_CAMP";
$table2 = "TAB_LMS_CATE";





$order_code = $_SESSION[USERID]."_".date("YmdHis");
switch ($REQUEST_METHOD) {
	case "GET":
	
	
	if($hold != "y"){
		$DOC_TITLE = "str:신청하기";
	}else{
		$DOC_TITLE = "str:신청하기(대기자)";
	}

	$sql = "select * from TAB_MEMBER where num_oid = '$_OID' and str_id = '".$_SESSION[USERID]."' ";
	$data = $DB -> sqlFetch($sql);
	
	$tel = explode("-",$data[str_phone]);
	$data[tel1] = $tel[0];
	$data[tel2] = $tel[1];
	$data[tel3] = $tel[2];

	$tel = explode("-",$data[str_handphone]);
	$data[tel11] = $tel[0];
	$data[tel22] = $tel[1];
	$data[tel33] = $tel[2];

	$email = explode("@",$data[str_email]);
	$data[email1] = $email[0];
	$data[email2] = $email[1];

	$data[order_code] = $order_code;
	$data[order_code2] = $order_code;

	$data[dt_bank_date] = date("Y-m-d");
	$tpl->assign($data);
	
		

	$sql = "select * from $table where num_oid = '$_OID' and num_ccode = '$ccode' and num_serial = '".$serial."'";
	$data = $DB -> sqlFetch($sql);
	
	$sql = "select str_title from $table2 where num_oid = '$_OID' and num_ccode = '".$data[num_ccode]."' ";
	$data[str_title] = $DB -> sqlFetchOne($sql);
	
	$tpl->assign($data);
	
	
	

	$tpl->setLayout('@sub');
	

	$tpl->define("CONTENT", Display::getTemplate("lms/view_dev.htm"));	

		//$tpl->define("CONTENT", Display::getTemplate("lms/view.htm"));

	
	
	
	 break;
	case "POST":
	


	$datas[num_oid] = _OID;
	foreach( $_POST as $val => $value ){
		if(strstr($val,"num_") || strstr($val,"str_")){
			$datas[$val] = $value;
		}
	}


	if($_POST[numberH] ==1){
		$datas[str_money_number] = $_POST[money_number1]."-".$_POST[money_number2]."-".$_POST[money_number3];
	}

	if($_POST[numberH] ==2){
		$datas[str_money_number] = $_POST[money_number11]."-".$_POST[money_number22];
	}
	if($_POST[numberH] ==3){
		$datas[str_money_number] = $_POST[money_number111]."-".$_POST[money_number222]."-".$_POST[money_number333];
	}

	$datas[str_order_code] = $order_code;
	$datas[str_email] = $email1."@".$email2;;

	$datas[str_phone] = $tel1."-".$tel2."-".$tel3;
	$datas[str_handphone] = $tel11."-".$tel22."-".$tel33;
	$datas[str_st_email] =  $st_email1."@".$st_email2;
	$datas[dt_bank_date] = WebApp::mkday($_POST[dt_bank_date]);
	$datas[dt_date] = mktime();
	$datas[num_ccode] = $ccode;
	$datas[num_serial] = $serial;
	$datas[str_id] = $_SESSION[USERID];
	$datas[str_jumin] = $jumin1."-".$jumin2;

	if($_POST[hold] == 'y'){
		//7은 비결결제 대기닷~ 2013-09-03 종태
		$datas[str_order_st] = 7;
	}

	
	if(date("Ymd") >= 20131112){
		if($str_etc < 6){
				
				if($str_etc == 1) $datas[str_discount] = 80000;
				if($str_etc == 2) $datas[str_discount] = 50000;
				
				if($str_etc == 3) $datas[str_discount] = 80000;
				if($str_etc == 5) $datas[str_discount] = 50000;
		}
	}
	
	//조기할인
	if($_POST[discount]>0){
		 $datas[str_discount] = $_POST[discount];
		 $datas[str_jo] = 'y';
	}else{
	
			//조기할인
		if(date("Ymd") <= 20161031){
			 $datas[str_discount] = 80000;
			 $datas[str_jo] = 'y';
		}

	}
	


	//$sqlV ='y';
	
	
	$phoneno = $datas[str_handphone];
	$email = $$datas[str_email];

	$DB->insertQuery("TAB_ORDER",$datas);
	$DB->commit();
	
	
		?>	
		
		<script>
		  (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
		  (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
		  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
		  })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

		  ga('create', 'UA-78129655-1', 'auto');
		  ga('send', 'pageview');
		


		   <? if(THEME =="TYPE3"){ ?>
		   ga('send', 'event', '진로캠프','무통장입금');
		   <?}else{?>
		    ga('send', 'event', '공학캠프','무통장입금');
		   <?}?>

		</script>
		<!-- 네이버프리미엄로그스크립트 -->
		<script type="text/javascript" src="http://wcs.naver.net/wcslog.js"></script> 
		<script type="text/javascript"> 
		if (!wcs_add) var wcs_add={};
		wcs_add["wa"] = "s_30543923423b";
		if (!_nasa) var _nasa={};
		_nasa["cnv"] = wcs.cnv("4","1"); 
		wcs_do(_nasa);
		</script>

		<?


	echo '<script>alert("신청이 완료되었습니다.\n캠프 안내문을 다운로드 하세요.");</script>';
	echo "<meta http-equiv='Refresh' Content=\"0; URL='/member.mypage'\">";
		 

	
	
	

	 break;
	}

?>