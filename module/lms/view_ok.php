<? mb_http_input("euc-kr"); mb_http_output("euc-kr"); ?>
<?

    $mobilechk = '/(iPod|iPhone|Android|BlackBerry|SymbianOS|SCH-M\d+|Opera Mini|Windows CE|Nokia|SonyEricsson|webOS|PalmOS)/i';

    // 모바일 접속인지 PC로 접속했는지 체크합니다.
    if(preg_match($mobilechk, $_SERVER['HTTP_USER_AGENT'])) {
        $check_mobile="y";
    } else {

    }

    if($check_mobile){
	//모바일
     include _DOC_ROOT."/PG/KSPayWebHost_mobile.inc"; 
	 
	
    $rcid       = $_POST["reCommConId"];
    $rctype     = $_POST["reCommType"];
    $rhash      = $_POST["reHash"];
	
	
	$ipg = new KSPayWebHost($rcid, null);

	$authyn		= "";
	$trno		= "";
	$trddt		= "";
	$trdtm		= "";
	$amt		= "";
	$authno		= "";
	$msg1		= "";
	$msg2		= "";
	$ordno		= "";
	$isscd		= "";
	$aqucd		= "";
	$temp_v		= "";
	$result		= "";

	$resultcd =  "";

	if ($ipg->send_msg("1"))
	{
		$authyn	 = $ipg->getValue("authyn");
		$trno	 = $ipg->getValue("trno"  );
		$trddt	 = $ipg->getValue("trddt" );
		$trdtm	 = $ipg->getValue("trdtm" );
		$amt	 = $ipg->getValue("amt"   );
		$authno	 = $ipg->getValue("authno");
		$msg1	 = $ipg->getValue("msg1"  );
		$msg2	 = $ipg->getValue("msg2"  );
		$ordno	 = $ipg->getValue("ordno" );
		$isscd	 = $ipg->getValue("isscd" );
		$aqucd	 = $ipg->getValue("aqucd" );
		//$temp_v	 = $ipg->getValue("temp_v");
		$result	 = $ipg->getValue("result");

		if (!empty($authyn) && 1 == strlen($authyn))
		{
			if ($authyn == "O")
			{
				$resultcd = "0000";
			}else
			{
				$resultcd = trim($authno);
			}

			$ipg->send_msg("3");
		}
	}

	
	 if(!empty($authyn) && "O" == $authyn){
		
		$DB = &WebApp::singleton('DB');

		$datas[num_oid] = _OID;
			foreach( $_POST as $val => $value ){
				if(strstr($val,"num_") || strstr($val,"str_")){
					$datas[$val] = $value;
				}
			}
		
		if($_POST[hold] == 'y'){
			//6은 결제 대기닷~ 2013-09-03 종태
			$datas[str_order_st] = 6;
		}else{
			$datas[str_order_st] = 5;
		}
		$datas[str_card_text] ="
		응답코드 : ".$resultcd."<br>
		주문번호 : ".$ordno."<br>
		금액 : ".$amt."<br>
		거래번호 : ".$trno."<font color=red>:KSNET에서 부여한 고유번호입니다. </font><br>
		거래일자 : ".$trddt."<br>
		카드사 승인번호 : ".$authno." <font color=red>:카드사에서 부여한 번호로 고유한값은 아닙니다. </font><br>
		매입사코드 : ".$aqucd."<br>
		";
		

		$datas[str_order_code] = $ordno;
		$datas[str_email] = $email1."@".$email2;;

		$datas[str_phone] = $tel1."-".$tel2."-".$tel3;
		$datas[str_handphone] = $tel11."-".$tel22."-".$tel33;
		$datas[str_st_email] =  $st_email1."@".$st_email2;
		
		$datas[dt_date] = mktime();
		$datas[num_ccode] = $ccode;
		$datas[num_serial] = $serial;
		$datas[str_id] = $_SESSION[USERID];
		$datas[str_jumin] = $jumin1."-".$jumin2;
		

		if(date("Ymd") >= 20121101){
			if($str_etc < 6){
				if($str_etc == 1) $datas[str_discount] = 80000;
				if($str_etc == 2) $datas[str_discount] = 50000;
				
				if($str_etc == 3) $datas[str_discount] = 80000;
				if($str_etc == 5) $datas[str_discount] = 50000;
			}
		}
		
		//조기할인
		if(date("Ymd") <= 20170430){
			 $datas[str_discount] = 80000;
			 $datas[str_jo] = 'y';
		}
		
		//$sqlV ='y';
		
		$DB->insertQuery("TAB_ORDER",$datas);
		$DB->commit();
			
		?>
		<script type="text/javascript">
		// <![CDATA[
		var _nasa={};
		_nasa["cnv"] = wcs.cnv("1","<?=$amt?>"); // 전환유형, 전환가치 설정해야함. 설치매뉴얼 참고

		// ]]>
		</script>
		<!-- 공통 적용 스크립트 , 모든 페이지에 노출되도록 설치. 단 전환페이지 설정값보다 항상 하단에 위치해야함 --> 
		<script type="text/javascript" src="http://wcs.naver.net/wcslog.js"> </script> 
		<script type="text/javascript"> 
		if (!wcs_add) var wcs_add={};
		wcs_add["wa"] = "s_30543923423b";
		if (!_nasa) var _nasa={};
		wcs.inflow();
		wcs_do(_nasa);
		</script>

		<script>
		  (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
		  (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
		  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
		  })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

		  ga('create', 'UA-78129655-1', 'auto');
		  ga('send', 'pageview');
		   
		   <? if(THEME =="TYPE3"){ ?>
		   ga('send', 'event', '진로캠프','카드결제완료');
		   <?}else{?>
		    ga('send', 'event', '공학캠프','카드결제완료');
		   <?}?>
		</script>
		<?
		 echo '<script>alert("신청이 완료되었습니다.\n캠프 안내문을 다운로드 하세요.");</script>';
		echo "<meta http-equiv='Refresh' Content=\"0; URL='/member.mypage'\">";

	 }else{
	 echo '<script>alert("카드승인 오류입니다. 관리자에게 문의해주시기 바랍니다.");</script>';
	echo "<meta http-equiv='Refresh' Content=\"0; URL='/main'\">";
	 
	 }


////////////////

    }else{
	
	include _DOC_ROOT."/PG/KSPayWebHost.inc"; 

	 $rcid       = $_POST["reWHCid"];
    $rctype     = $_POST["reWHCtype"];
    $rhash      = $_POST["reWHHash"];

	$ipg = new KSPayWebHost($rcid, null);

	$authyn		= "";
	$trno		= "";
	$trddt		= "";
	$trdtm		= "";
	$amt		= "";
	$authno		= "";
	$msg1		= "";
	$msg2		= "";
	$ordno		= "";
	$isscd		= "";
	$aqucd		= "";
	$temp_v		= "";
	$result		= "";

	$resultcd =  "";

	//업체에서 추가하신 인자값을 받는 부분입니다
	$a =  $_POST["a"]; 
	$b =  $_POST["b"]; 
	$c =  $_POST["c"]; 
	$d =  $_POST["d"];

	if ($ipg->kspay_send_msg("1"))
	{
		$authyn	 = $ipg->kspay_get_value("authyn");
		$trno	 = $ipg->kspay_get_value("trno"  );
		$trddt	 = $ipg->kspay_get_value("trddt" );
		$trdtm	 = $ipg->kspay_get_value("trdtm" );
		$amt	 = $ipg->kspay_get_value("amt"   );
		$authno	 = $ipg->kspay_get_value("authno");
		$msg1	 = $ipg->kspay_get_value("msg1"  );
		$msg2	 = $ipg->kspay_get_value("msg2"  );
		$ordno	 = $ipg->kspay_get_value("ordno" );
		$isscd	 = $ipg->kspay_get_value("isscd" );
		$aqucd	 = $ipg->kspay_get_value("aqucd" );
		$temp_v	 = "";
		$result	 = $ipg->kspay_get_value("result");

		if (!empty($authyn) && 1 == strlen($authyn))
		{
			if ($authyn == "O")
			{
				$resultcd = "0000";
			}else
			{
				$resultcd = trim($authno);
			}

			//$ipg->kspay_send_msg("3"); // 정상처리가 완료되었을 경우 호출합니다.(이 과정이 없으면 일시적으로 kspay_send_msg("1")을 호출하여 거래내역 조회가 가능합니다.)
		}
	}

		if (empty($result) || 4 != strlen($result))
		{
			//echo("(???)");
		}else
		{
			/*switch (substr($result,0,1))
			{
				case '1' : echo("신용카드"			); break;
				case 'I' : echo("신용카드"			); break;
				case '2' : echo("실시간계좌이체"	); break;
				case '6' : echo("가상계좌발급"		); break; 
				case 'M' : echo("휴대폰결제"		); break; 
				default  : echo("(????)"			); break; 
			}*/
		}



		 if(!empty($authyn) && "O" == $authyn){
		
		$DB = &WebApp::singleton('DB');

		$datas[num_oid] = _OID;
			foreach( $_POST as $val => $value ){
				if(strstr($val,"num_") || strstr($val,"str_")){
					$datas[$val] = $value;
				}
			}
		
		if($_POST[hold] == 'y'){
			//6은 결제 대기닷~ 2013-09-03 종태
			$datas[str_order_st] = 6;
		}else{
			$datas[str_order_st] = 5;
		}
		$datas[str_card_text] ="
		응답코드 : ".$resultcd."<br>
		주문번호 : ".$ordno."<br>
		금액 : ".$amt."<br>
		거래번호 : ".$trno."<font color=red>:KSNET에서 부여한 고유번호입니다. </font><br>
		거래일자 : ".$trddt."<br>
		카드사 승인번호 : ".$authno." <font color=red>:카드사에서 부여한 번호로 고유한값은 아닙니다. </font><br>
		매입사코드 : ".$aqucd."<br>
		";
		

		$datas[str_order_code] = $ordno;
		$datas[str_email] = $email1."@".$email2;;

		$datas[str_phone] = $tel1."-".$tel2."-".$tel3;
		$datas[str_handphone] = $tel11."-".$tel22."-".$tel33;
		$datas[str_st_email] =  $st_email1."@".$st_email2;
		
		$datas[dt_date] = mktime();
		$datas[num_ccode] = $ccode;
		$datas[num_serial] = $serial;
		$datas[str_id] = $_SESSION[USERID];
		$datas[str_jumin] = $jumin1."-".$jumin2;
		

		if(date("Ymd") >= 20121101){
			if($str_etc < 6){
				if($str_etc == 1) $datas[str_discount] = 80000;
				if($str_etc == 2) $datas[str_discount] = 50000;
				
				if($str_etc == 3) $datas[str_discount] = 80000;
				if($str_etc == 5) $datas[str_discount] = 50000;
			}
		}
		
		//조기할인
		if(date("Ymd") <= 20170430){
			 $datas[str_discount] = 80000;
			 $datas[str_jo] = 'y';
		}
		
		//$sqlV ='y';
		
		$DB->insertQuery("TAB_ORDER",$datas);
		$DB->commit();
			
		?>
		<script type="text/javascript">
		// <![CDATA[
		var _nasa={};
		_nasa["cnv"] = wcs.cnv("1","<?=$amt?>"); // 전환유형, 전환가치 설정해야함. 설치매뉴얼 참고

		// ]]>
		</script>
		<!-- 공통 적용 스크립트 , 모든 페이지에 노출되도록 설치. 단 전환페이지 설정값보다 항상 하단에 위치해야함 --> 
		<script type="text/javascript" src="http://wcs.naver.net/wcslog.js"> </script> 
		<script type="text/javascript"> 
		if (!wcs_add) var wcs_add={};
		wcs_add["wa"] = "s_30543923423b";
		if (!_nasa) var _nasa={};
		wcs.inflow();
		wcs_do(_nasa);
		</script>

		<script>
		  (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
		  (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
		  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
		  })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

		  ga('create', 'UA-78129655-1', 'auto');
		  ga('send', 'pageview');
		   
		   <? if(THEME =="TYPE3"){ ?>
		   ga('send', 'event', '진로캠프','카드결제완료');
		   <?}else{?>
		    ga('send', 'event', '공학캠프','카드결제완료');
		   <?}?>
		</script>
		<?
		 echo '<script>alert("신청이 완료되었습니다.\n캠프 안내문을 다운로드 하세요.");</script>';
		echo "<meta http-equiv='Refresh' Content=\"0; URL='/member.mypage'\">";

	 }else{
	 echo '<script>alert("카드승인 오류입니다. 관리자에게 문의해주시기 바랍니다.");</script>';
	echo "<meta http-equiv='Refresh' Content=\"0; URL='/main'\">";
	 
	 }

    }

   /////////////////////////////////////////////////////////////////////////////////////////////////////

	
?>
          