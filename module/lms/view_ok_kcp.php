<?
    /* ============================================================================== */
    /* =   PAGE : ��� ó�� PAGE                                                    = */
    /* = -------------------------------------------------------------------------- = */
	/* =   pp_ax_hub.php ���Ͽ��� ó���� ������� ����ϴ� �������Դϴ�.            = */
	/* = -------------------------------------------------------------------------- = */
    /* =   ������ ������ �߻��ϴ� ��� �Ʒ��� �ּҷ� �����ϼż� Ȯ���Ͻñ� �ٶ��ϴ�.= */
    /* =   ���� �ּ� : http://kcp.co.kr/technique.requestcode.do			        = */
    /* = -------------------------------------------------------------------------- = */
    /* =   Copyright (c)  2013   KCP Inc.   All Rights Reserverd.                   = */
    /* ============================================================================== */
?>
<?
    /* ============================================================================== */
    /* =   ���� ���                                                                = */
    /* = -------------------------------------------------------------------------- = */
    $site_cd          = $_POST[ "site_cd"        ];      // ����Ʈ�ڵ�
	$req_tx           = $_POST[ "req_tx"         ];      // ��û ����(����/���)
    $use_pay_method   = $_POST[ "use_pay_method" ];      // ��� ���� ����
    $bSucc            = $_POST[ "bSucc"          ];      // ��ü DB ����ó�� �Ϸ� ����
    /* = -------------------------------------------------------------------------- = */
    $res_cd           = $_POST[ "res_cd"         ];      // ����ڵ�
    $res_msg          = $_POST[ "res_msg"        ];      // ����޽���
    $panc_mod_mny     = $_POST[ "panc_mod_mny"   ];      // �κ���� �ݾ�
    $panc_rem_mny     = $_POST[ "panc_rem_mny"   ];      // �κ���� ���� �ݾ�
	$mod_type         = $_POST[ "mod_type"       ];
	$res_msg_bsucc    = "";
    /* = -------------------------------------------------------------------------- = */
    $amount           = $_POST[ "amount"         ];      // �ݾ�
    $ordr_idxx        = $_POST[ "ordr_idxx"      ];      // �ֹ���ȣ
    $tno              = $_POST[ "tno"            ];      // KCP �ŷ���ȣ
    $good_mny         = $_POST[ "good_mny"       ];      // �����ݾ�
    $good_name        = $_POST[ "good_name"      ];      // ��ǰ��
    $buyr_name        = $_POST[ "buyr_name"      ];      // �����ڸ�
    $buyr_tel1        = $_POST[ "buyr_tel1"      ];      // ������ ��ȭ��ȣ
    $buyr_tel2        = $_POST[ "buyr_tel2"      ];      // ������ �޴�����ȣ
    $buyr_mail        = $_POST[ "buyr_mail"      ];      // ������ E-Mail
    /* = -------------------------------------------------------------------------- = */
	// ����
	$pnt_issue        = $_POST[ "pnt_issue"      ];      // ����Ʈ ���񽺻�
	$app_time         = $_POST[ "app_time"       ];      // ���νð� (����)
	/* = -------------------------------------------------------------------------- = */
    // �ſ�ī��
    $card_cd          = $_POST[ "card_cd"        ];      // ī���ڵ�
    $card_name        = $_POST[ "card_name"      ];      // ī���
	$noinf			  = $_POST[ "noinf"          ];      // ������ ����
	$quota            = $_POST[ "quota"          ];      // �Һΰ���
    $app_no           = $_POST[ "app_no"         ];      // ���ι�ȣ
    /* = -------------------------------------------------------------------------- = */
    // ������ü
    $bank_name        = $_POST[ "bank_name"      ];      // �����
	$bank_code        = $_POST[ "bank_code"      ];      // �����ڵ�
    /* = -------------------------------------------------------------------------- = */
    // �������
    $bankname         = $_POST[ "bankname"       ];      // �Ա��� ����
    $depositor        = $_POST[ "depositor"      ];      // �Ա��� ���� ������
    $account          = $_POST[ "account"        ];      // �Ա��� ���� ��ȣ
	$va_date		  = $_POST[ "va_date"        ];      // ������� �Աݸ����ð�
    /* = -------------------------------------------------------------------------- = */
    // ����Ʈ
    $add_pnt          = $_POST[ "add_pnt"        ];      // �߻� ����Ʈ
	$use_pnt          = $_POST[ "use_pnt"        ];      // ��밡�� ����Ʈ
	$rsv_pnt          = $_POST[ "rsv_pnt"        ];      // �� ���� ����Ʈ
	$pnt_app_time     = $_POST[ "pnt_app_time"   ];      // ���νð�
	$pnt_app_no       = $_POST[ "pnt_app_no"     ];      // ���ι�ȣ
	$pnt_amount       = $_POST[ "pnt_amount"     ];      // �����ݾ� or ���ݾ�
	/* = -------------------------------------------------------------------------- = */
	//��ǰ��
	$tk_van_code	  = $_POST[ "tk_van_code"    ];      // �߱޻� �ڵ�
	$tk_app_no		  = $_POST[ "tk_app_no"      ];      // ���� ��ȣ
	/* = -------------------------------------------------------------------------- = */
	//�޴���
	$commid			  = $_POST[ "commid"		 ];      // ��Ż� �ڵ�
	$mobile_no		  = $_POST[ "mobile_no"      ];      // �޴��� ��ȣ
	/* = -------------------------------------------------------------------------- = */
	// ���ݿ�����
	$cash_yn          = $_POST[ "cash_yn"        ];      //���ݿ����� ��� ����
	$cash_authno      = $_POST[ "cash_authno"    ];      //���ݿ����� ���� ��ȣ
	$cash_tr_code     = $_POST[ "cash_tr_code"   ];      //���ݿ����� ���� ����
	$cash_id_info     = $_POST[ "cash_id_info"   ];      //���ݿ����� ��� ��ȣ
	/* = -------------------------------------------------------------------------- = */

    $req_tx_name = "";

    if( $req_tx == "pay" )
    {
        $req_tx_name = "����";
    }
    else if( $req_tx == "mod" )
    {
        $req_tx_name = "����/���";
    }

	/* ============================================================================== */
    /* =   ������ �� DB ó�� ���н� �� ��� �޽��� ����                           = */
    /* = -------------------------------------------------------------------------- = */

	if($req_tx == "pay")
	{
		//��ü DB ó�� ����
		if($bSucc == "false")
		{
			if ($res_cd == "0000")
            {
                $res_msg_bsucc = "������ ���������� �̷�������� ��ü���� ���� ����� ó���ϴ� �� ������ �߻��Ͽ� �ý��ۿ��� �ڵ����� ��� ��û�� �Ͽ����ϴ�. <br> ��ü�� �����Ͽ� Ȯ���Ͻñ� �ٶ��ϴ�.";
            }
            else
            {
                $res_msg_bsucc = "������ ���������� �̷�������� ��ü���� ���� ����� ó���ϴ� �� ������ �߻��Ͽ� �ý��ۿ��� �ڵ����� ��� ��û�� �Ͽ�����, <br> <b>��Ұ� ���� �Ǿ����ϴ�.</b><br> ��ü�� �����Ͽ� Ȯ���Ͻñ� �ٶ��ϴ�.";
            }
		}
	}

	/* = -------------------------------------------------------------------------- = */
    /* =   ������ �� DB ó�� ���н� �� ��� �޽��� ���� ��                        = */
    /* ============================================================================== */

    
	 if($res_cd == "0000" && $app_no){
		
	

		$DB = &WebApp::singleton('DB');

		$datas[num_oid] = _OID;
			foreach( $_POST as $val => $value ){
				if(strstr($val,"num_") || strstr($val,"str_")){
					$datas[$val] = $value;
				}
			}
		if($_POST == 'y'){
			//6�� ���� ����~ 2013-09-03 ����
			$datas[str_order_st] = 6;
		}else{
			$datas[str_order_st] = 5;
		}
		$datas[str_card_text] ="
		�����ڵ� : ".$res_cd."<br>
		�ֹ���ȣ : ".$ordr_idxx."<br>
		�ݾ� : ".$good_mny."<br>
		�ŷ���ȣ : ".$tno."<font color=red>:������ȣ�Դϴ�. </font><br>
		�ŷ����� : ".$trddt."<br>
		ī��� ���ι�ȣ : ".$app_no." <font color=red>:ī��翡�� �ο��� ��ȣ�� �����Ѱ��� �ƴմϴ�. </font><br>
		���Ի��ڵ� : ".$aqucd."<br>
		";
		
		
		$datas[str_order_code] = $ordr_idxx;
		$datas[str_email] = $email1."@".$email2;;

		$datas[str_phone] = $tel1."-".$tel2."-".$tel3;
		$datas[str_handphone] = $tel11."-".$tel22."-".$tel33;
		$datas[str_st_email] =  $st_email1."@".$st_email2;
		
		$datas[dt_date] = mktime();
		$datas[num_ccode] = $ccode;
		$datas[num_serial] = $serial;
		$datas[str_id] = $_SESSION[USERID];
		$datas[str_jumin] = $jumin1."-".$jumin2;


//��������
         if($_POST[discount]>0){
             $datas[str_discount] = $_POST[discount];
             $datas[str_jo] = 'y';
         }else{

             //��������
             if(date("Ymd") <= 20161031){
                 $datas[str_discount] = 80000;
                 $datas[str_jo] = 'y';
             }

         }


         if($_SESSION[USERID]=="now17"){
		//	$sqlV ='y';
			$DB->insertQuery("TAB_ORDER",$datas);	
			//exit;
		}else{
			$DB->insertQuery("TAB_ORDER",$datas);
		}
			
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
?>
          