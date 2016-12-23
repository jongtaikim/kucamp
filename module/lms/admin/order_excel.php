<?
/* vim: set expandtab tabstop=4 shiftwidth=4 foldmethod=marker: */
/**
* 작성일: 2012-06-17
* 작성자: 김종태
* 설   명: 엑셀다운로드
*****************************************************************
* 
*/
	$DB = &WebApp::singleton('DB');
	$table = "TAB_ORDER";

	$excelnm = "신청자목록 ".date("Ymd_H:i:s");
	header( "Content-type: application/vnd.ms-excel" ); 
	header( "Content-Disposition: attachment; filename=".$excelnm.".xls" ); 
	header( "Content-Description: PHP5 Generated Data" );
	
	$add_where = '';
	if($_GET[ins_num_serial]){
		$add_where = " and  c.str_sw = '".$_GET[ins_num_serial]."'  ";
		
	}
	
	if($_GET[sch_num_ccode]){
			$add_where .= " and a.num_ccode ='".$_GET[sch_num_ccode]."' ";
		}

	if($_GET[sch_str_order_st] ==""){

		if($_GET[all] != "y"){
			if($_GET[cancel] == "y"){
				$psqlsw = " and a.str_order_st in ('2','8') ";
			}else{
				if($_GET[hold] != "y"){
					$psqlsw = " and  a.str_order_st in ('0','3','1','5') ";
				}else{
					$psqlsw = " and a.str_order_st in (6,7) ";
				}

			}
		}
	}else{
			$add_where .= " and a.str_order_st ='".$_GET[sch_str_order_st]."' ";
	}
	

	$sql = "
	select * from TAB_ORDER a ,  TAB_CAMP c where a.num_oid = '$_OID' and a.num_ccode = c.num_ccode and a.num_serial = c.num_serial      $add_where $psqlsw order by a.dt_date desc ";
	

	$data = $DB->sqlFetchAll($sql);


	
	for($ii=0; $ii<count($data); $ii++) {
		$sql = "select str_title from TAB_LMS_CATE where num_oid = '$_OID' and num_ccode = '".$data[$ii][num_ccode]."' ";
		$data[$ii][str_ccode_text] = $DB -> sqlFetchOne($sql);
		
		$sql = "select * from TAB_CAMP where num_oid = '$_OID' and  num_ccode = '".$data[$ii][num_ccode]."' and num_serial = '".$data[$ii][num_serial]."'";
		$data[$ii][camp] = $DB -> sqlFetch($sql);
		
		
		$data[$ii][camp][start_date] = substr($data[$ii][camp][num_start_date],0,4)."년 ".substr($data[$ii][camp][num_start_date],4,2)."월 ".substr($data[$ii][camp][num_start_date],6,2)."일";
		$data[$ii][camp][end_date] =  substr($data[$ii][camp][num_end_date],0,4)."년 ".substr($data[$ii][camp][num_end_date],4,2)."월 ".substr($data[$ii][camp][num_end_date],6,2)."일";
		
		$sql = "select count(*) from $table where num_oid = '$_OID' and str_id = '".$data[$ii][str_id]."' and str_order_st = '1' ";
		$data[$ii][num_counter] = $DB -> sqlFetchOne($sql);

		


	}

	$tpl->assign(array('LIST'=>$data));
	
	$tpl->setLayout('none');
	$tpl->define('CONTENT', Display::getTemplate('lms/admin/order_excel.html'));


?>