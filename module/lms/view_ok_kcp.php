<?
    /* ============================================================================== */
    /* =   PAGE : 결과 처리 PAGE                                                    = */
    /* = -------------------------------------------------------------------------- = */
	/* =   pp_ax_hub.php 파일에서 처리된 결과값을 출력하는 페이지입니다.            = */
	/* = -------------------------------------------------------------------------- = */
    /* =   연동시 오류가 발생하는 경우 아래의 주소로 접속하셔서 확인하시기 바랍니다.= */
    /* =   접속 주소 : http://kcp.co.kr/technique.requestcode.do			        = */
    /* = -------------------------------------------------------------------------- = */
    /* =   Copyright (c)  2013   KCP Inc.   All Rights Reserverd.                   = */
    /* ============================================================================== */
?>
<?
    /* ============================================================================== */
    /* =   지불 결과                                                                = */
    /* = -------------------------------------------------------------------------- = */
    $site_cd          = $_POST[ "site_cd"        ];      // 사이트코드
	$req_tx           = $_POST[ "req_tx"         ];      // 요청 구분(승인/취소)
    $use_pay_method   = $_POST[ "use_pay_method" ];      // 사용 결제 수단
    $bSucc            = $_POST[ "bSucc"          ];      // 업체 DB 정상처리 완료 여부
    /* = -------------------------------------------------------------------------- = */
    $res_cd           = $_POST[ "res_cd"         ];      // 결과코드
    $res_msg          = $_POST[ "res_msg"        ];      // 결과메시지
    $panc_mod_mny     = $_POST[ "panc_mod_mny"   ];      // 부분취소 금액
    $panc_rem_mny     = $_POST[ "panc_rem_mny"   ];      // 부분취소 가능 금액
	$mod_type         = $_POST[ "mod_type"       ];
	$res_msg_bsucc    = "";
    /* = -------------------------------------------------------------------------- = */
    $amount           = $_POST[ "amount"         ];      // 금액
    $ordr_idxx        = $_POST[ "ordr_idxx"      ];      // 주문번호
    $tno              = $_POST[ "tno"            ];      // KCP 거래번호
    $good_mny         = $_POST[ "good_mny"       ];      // 결제금액
    $good_name        = $_POST[ "good_name"      ];      // 상품명
    $buyr_name        = $_POST[ "buyr_name"      ];      // 구매자명
    $buyr_tel1        = $_POST[ "buyr_tel1"      ];      // 구매자 전화번호
    $buyr_tel2        = $_POST[ "buyr_tel2"      ];      // 구매자 휴대폰번호
    $buyr_mail        = $_POST[ "buyr_mail"      ];      // 구매자 E-Mail
    /* = -------------------------------------------------------------------------- = */
	// 공통
	$pnt_issue        = $_POST[ "pnt_issue"      ];      // 포인트 서비스사
	$app_time         = $_POST[ "app_time"       ];      // 승인시간 (공통)
	/* = -------------------------------------------------------------------------- = */
    // 신용카드
    $card_cd          = $_POST[ "card_cd"        ];      // 카드코드
    $card_name        = $_POST[ "card_name"      ];      // 카드명
	$noinf			  = $_POST[ "noinf"          ];      // 무이자 여부
	$quota            = $_POST[ "quota"          ];      // 할부개월
    $app_no           = $_POST[ "app_no"         ];      // 승인번호
    /* = -------------------------------------------------------------------------- = */
    // 계좌이체
    $bank_name        = $_POST[ "bank_name"      ];      // 은행명
	$bank_code        = $_POST[ "bank_code"      ];      // 은행코드
    /* = -------------------------------------------------------------------------- = */
    // 가상계좌
    $bankname         = $_POST[ "bankname"       ];      // 입금할 은행
    $depositor        = $_POST[ "depositor"      ];      // 입금할 계좌 예금주
    $account          = $_POST[ "account"        ];      // 입금할 계좌 번호
	$va_date		  = $_POST[ "va_date"        ];      // 가상계좌 입금마감시간
    /* = -------------------------------------------------------------------------- = */
    // 포인트
    $add_pnt          = $_POST[ "add_pnt"        ];      // 발생 포인트
	$use_pnt          = $_POST[ "use_pnt"        ];      // 사용가능 포인트
	$rsv_pnt          = $_POST[ "rsv_pnt"        ];      // 총 누적 포인트
	$pnt_app_time     = $_POST[ "pnt_app_time"   ];      // 승인시간
	$pnt_app_no       = $_POST[ "pnt_app_no"     ];      // 승인번호
	$pnt_amount       = $_POST[ "pnt_amount"     ];      // 적립금액 or 사용금액
	/* = -------------------------------------------------------------------------- = */
	//상품권
	$tk_van_code	  = $_POST[ "tk_van_code"    ];      // 발급사 코드
	$tk_app_no		  = $_POST[ "tk_app_no"      ];      // 승인 번호
	/* = -------------------------------------------------------------------------- = */
	//휴대폰
	$commid			  = $_POST[ "commid"		 ];      // 통신사 코드
	$mobile_no		  = $_POST[ "mobile_no"      ];      // 휴대폰 번호
	/* = -------------------------------------------------------------------------- = */
	// 현금영수증
	$cash_yn          = $_POST[ "cash_yn"        ];      //현금영수증 등록 여부
	$cash_authno      = $_POST[ "cash_authno"    ];      //현금영수증 승인 번호
	$cash_tr_code     = $_POST[ "cash_tr_code"   ];      //현금영수증 발행 구분
	$cash_id_info     = $_POST[ "cash_id_info"   ];      //현금영수증 등록 번호
	/* = -------------------------------------------------------------------------- = */

    $req_tx_name = "";

    if( $req_tx == "pay" )
    {
        $req_tx_name = "지불";
    }
    else if( $req_tx == "mod" )
    {
        $req_tx_name = "매입/취소";
    }

	/* ============================================================================== */
    /* =   가맹점 측 DB 처리 실패시 상세 결과 메시지 설정                           = */
    /* = -------------------------------------------------------------------------- = */

	if($req_tx == "pay")
	{
		//업체 DB 처리 실패
		if($bSucc == "false")
		{
			if ($res_cd == "0000")
            {
                $res_msg_bsucc = "결제는 정상적으로 이루어졌지만 업체에서 결제 결과를 처리하는 중 오류가 발생하여 시스템에서 자동으로 취소 요청을 하였습니다. <br> 업체로 문의하여 확인하시기 바랍니다.";
            }
            else
            {
                $res_msg_bsucc = "결제는 정상적으로 이루어졌지만 업체에서 결제 결과를 처리하는 중 오류가 발생하여 시스템에서 자동으로 취소 요청을 하였으나, <br> <b>취소가 실패 되었습니다.</b><br> 업체로 문의하여 확인하시기 바랍니다.";
            }
		}
	}

	/* = -------------------------------------------------------------------------- = */
    /* =   가맹점 측 DB 처리 실패시 상세 결과 메시지 설정 끝                        = */
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
			//6은 결제 대기닷~ 2013-09-03 종태
			$datas[str_order_st] = 6;
		}else{
			$datas[str_order_st] = 5;
		}
		$datas[str_card_text] ="
		응답코드 : ".$res_cd."<br>
		주문번호 : ".$ordr_idxx."<br>
		금액 : ".$good_mny."<br>
		거래번호 : ".$tno."<font color=red>:고유번호입니다. </font><br>
		거래일자 : ".$trddt."<br>
		카드사 승인번호 : ".$app_no." <font color=red>:카드사에서 부여한 번호로 고유한값은 아닙니다. </font><br>
		매입사코드 : ".$aqucd."<br>
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
?>
          