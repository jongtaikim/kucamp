<? mb_http_input("euc-kr"); mb_http_output("euc-kr"); ?>
<?

    $mobilechk = '/(iPod|iPhone|Android|BlackBerry|SymbianOS|SCH-M\d+|Opera Mini|Windows CE|Nokia|SonyEricsson|webOS|PalmOS)/i';

    // ����� �������� PC�� �����ߴ��� üũ�մϴ�.
    if(preg_match($mobilechk, $_SERVER['HTTP_USER_AGENT'])) {
        $check_mobile="y";
    } else {

    }

    if($check_mobile){
	//�����
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
			//6�� ���� ����~ 2013-09-03 ����
			$datas[str_order_st] = 6;
		}else{
			$datas[str_order_st] = 5;
		}
		$datas[str_card_text] ="
		�����ڵ� : ".$resultcd."<br>
		�ֹ���ȣ : ".$ordno."<br>
		�ݾ� : ".$amt."<br>
		�ŷ���ȣ : ".$trno."<font color=red>:KSNET���� �ο��� ������ȣ�Դϴ�. </font><br>
		�ŷ����� : ".$trddt."<br>
		ī��� ���ι�ȣ : ".$authno." <font color=red>:ī��翡�� �ο��� ��ȣ�� �����Ѱ��� �ƴմϴ�. </font><br>
		���Ի��ڵ� : ".$aqucd."<br>
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
		
		//��������
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
		_nasa["cnv"] = wcs.cnv("1","<?=$amt?>"); // ��ȯ����, ��ȯ��ġ �����ؾ���. ��ġ�Ŵ��� ����

		// ]]>
		</script>
		<!-- ���� ���� ��ũ��Ʈ , ��� �������� ����ǵ��� ��ġ. �� ��ȯ������ ���������� �׻� �ϴܿ� ��ġ�ؾ��� --> 
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
		   ga('send', 'event', '����ķ��','ī������Ϸ�');
		   <?}else{?>
		    ga('send', 'event', '����ķ��','ī������Ϸ�');
		   <?}?>
		</script>
		<?
		 echo '<script>alert("��û�� �Ϸ�Ǿ����ϴ�.\nķ�� �ȳ����� �ٿ�ε� �ϼ���.");</script>';
		echo "<meta http-equiv='Refresh' Content=\"0; URL='/member.mypage'\">";

	 }else{
	 echo '<script>alert("ī����� �����Դϴ�. �����ڿ��� �������ֽñ� �ٶ��ϴ�.");</script>';
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

	//��ü���� �߰��Ͻ� ���ڰ��� �޴� �κ��Դϴ�
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

			//$ipg->kspay_send_msg("3"); // ����ó���� �Ϸ�Ǿ��� ��� ȣ���մϴ�.(�� ������ ������ �Ͻ������� kspay_send_msg("1")�� ȣ���Ͽ� �ŷ����� ��ȸ�� �����մϴ�.)
		}
	}

		if (empty($result) || 4 != strlen($result))
		{
			//echo("(???)");
		}else
		{
			/*switch (substr($result,0,1))
			{
				case '1' : echo("�ſ�ī��"			); break;
				case 'I' : echo("�ſ�ī��"			); break;
				case '2' : echo("�ǽð�������ü"	); break;
				case '6' : echo("������¹߱�"		); break; 
				case 'M' : echo("�޴�������"		); break; 
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
			//6�� ���� ����~ 2013-09-03 ����
			$datas[str_order_st] = 6;
		}else{
			$datas[str_order_st] = 5;
		}
		$datas[str_card_text] ="
		�����ڵ� : ".$resultcd."<br>
		�ֹ���ȣ : ".$ordno."<br>
		�ݾ� : ".$amt."<br>
		�ŷ���ȣ : ".$trno."<font color=red>:KSNET���� �ο��� ������ȣ�Դϴ�. </font><br>
		�ŷ����� : ".$trddt."<br>
		ī��� ���ι�ȣ : ".$authno." <font color=red>:ī��翡�� �ο��� ��ȣ�� �����Ѱ��� �ƴմϴ�. </font><br>
		���Ի��ڵ� : ".$aqucd."<br>
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
		
		//��������
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
		_nasa["cnv"] = wcs.cnv("1","<?=$amt?>"); // ��ȯ����, ��ȯ��ġ �����ؾ���. ��ġ�Ŵ��� ����

		// ]]>
		</script>
		<!-- ���� ���� ��ũ��Ʈ , ��� �������� ����ǵ��� ��ġ. �� ��ȯ������ ���������� �׻� �ϴܿ� ��ġ�ؾ��� --> 
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
		   ga('send', 'event', '����ķ��','ī������Ϸ�');
		   <?}else{?>
		    ga('send', 'event', '����ķ��','ī������Ϸ�');
		   <?}?>
		</script>
		<?
		 echo '<script>alert("��û�� �Ϸ�Ǿ����ϴ�.\nķ�� �ȳ����� �ٿ�ε� �ϼ���.");</script>';
		echo "<meta http-equiv='Refresh' Content=\"0; URL='/member.mypage'\">";

	 }else{
	 echo '<script>alert("ī����� �����Դϴ�. �����ڿ��� �������ֽñ� �ٶ��ϴ�.");</script>';
	echo "<meta http-equiv='Refresh' Content=\"0; URL='/main'\">";
	 
	 }

    }

   /////////////////////////////////////////////////////////////////////////////////////////////////////

	
?>
          