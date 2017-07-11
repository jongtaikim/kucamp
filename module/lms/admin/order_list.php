<?
/* vim: set expandtab tabstop=4 shiftwidth=4 foldmethod=marker: */
/**
* 작성일: 2008-01-30
* 작성자: 김종태
* 설  명: 몰라임마~!
*****************************************************************
* 
*/

//echo mktime(23,59,59,9,26,2015);
$DB = &WebApp::singleton('DB');

$table = "TAB_ORDER";
$add_where = "";
foreach( $_REQUEST as $val => $value )
{




	if(strstr($val,"sch_")){
		if($value !="") {
            if($val == 'sch_str_order_st' && $value=="all"){
                $add_where .= " and str_order_st in (0,3,1,5,2,8,7,6) "; //
            }else {
                $add_where .= " and " . str_replace("sch_", "a.", $val) . " = '$value' ";
            }
        }
        
        
	}

	if(strstr($val,"like_")){
		if($value !="") $add_where .=  " and ".str_replace("like_","a.",$val)." like '%$value%' ";
	}

	if(strstr($val,"in_")){
		if($value !="") $add_where .=  " and ".str_replace("in_","a.",$val)." in ($value) ";
	}
}


switch ($REQUEST_METHOD) {
	case "GET":
	
	//echo $add_where;
	
	$sql = "select str_sw , count(*) as cu from TAB_CAMP where num_oid = '$_OID' group by str_sw ";
	$row = $DB -> sqlFetchAll($sql);
	$tpl->assign(array('camp_LIST'=>$row));

	$sql = "select * from ".$table2." where num_oid = '$_OID'  order by num_step asc ";
	$row = $DB -> sqlFetchAll($sql);
	$tpl->assign(array('cate_LIST'=>$row));
	
	if($ccode){
		$where .= " and a.num_ccode = '".$ccode."' ";
	}
	
	if($_GET[ins_num_serial]){
		$add_where .= " and c.str_sw = '".$_GET[ins_num_serial]."' ";
	}


       // &str_order_st=0,3,1,5,7,6




	  $search_key = $_REQUEST['search_key'];
        $search_value = $_REQUEST['search_value'];
        if($search_key && $search_value) {
            if(substr($search_key,0,3) != "num") {
                $where .= "AND a.".$search_key." LIKE '%$search_value%' ";
            } else {
                $where .= "AND a.".$search_key." = $search_value ";
            }
        }

	$code = $_REQUEST['code'];
	if(!$page = $_REQUEST['page']) $page = 1;

	if(!$listnum)$listnum = 15;
	$sql = "select count(*) from ".$table." a, TAB_LMS_CATE b , TAB_CAMP c where 
	a.num_oid = '$_OID' and  
	a.num_oid = b.num_oid and 
	a.num_oid = c.num_oid and
	a.num_ccode = c.num_ccode and 
	a.num_serial = c.num_serial and 
	a.num_ccode = b.num_ccode
	$psqls   $add_where  ";
	$total = $DB->sqlFetchOne($sql);



	if(!$total) $total = 0;


	$page = $_REQUEST['page'];
	if (!$page) $page = 1;

	$seek = $listnum * ($page - 1);
	$offset = $seek + $listnum;

	$sql = "
	select *, c.num_price as o_price from ".$table." a, TAB_LMS_CATE b , TAB_CAMP c  where 
	a.num_oid = '$_OID' and 
	a.num_oid = b.num_oid and 
	a.num_oid = c.num_oid and
	a.num_ccode = b.num_ccode and
	a.num_ccode = c.num_ccode and 
	a.num_serial = c.num_serial  
	
	$add_where $psqls    order by a.dt_date desc LIMIT $seek , $listnum   ";





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
	

	$tpl->assign(array(
	'title'=>$title,
	'LIST'=>$data,
	'page'=>$page,
	'total'=>$total,
	'listnum'=>$listnum,
	'excel_url'=>"/lms.admin.order_excel?".$_SERVER["QUERY_STRING"],
	));
	
	

	$tpl->setLayout('no4');
	$tpl->define("CONTENT", Display::getTemplate("lms/admin/order_list.htm"));
	
	 break;
	case "POST":

		switch ($mode) {
		case "delete":
		
			
		for($ii=0; $ii<count($ids); $ii++) {
			$DB->deleteQuery("TAB_ORDER"," num_oid = '"._OID."' and str_order_code = '".$ids[$ii]."' ");
			$DB->commit();

			/*$DB->deleteQuery("TAB_LMS_HUMAN"," num_oid = '"._OID."' and str_order_code = '".$ids[$ii]."' ");
			$DB->commit();*/
			//unlink(_DOC_ROOT."/hosts/".HOST."/lms/".$types."-".$ids[$ii].".*");
		}
			
			
		WebApp::moveBack('삭제되었습니다.');
		
		 break;
		 case "price_in":
		
			
		for($ii=0; $ii<count($ids); $ii++) {
			$datas[str_order_st] = 1;
			$DB->updateQuery("TAB_ORDER",$datas," num_oid = '"._OID."' and str_order_code = '".$ids[$ii]."' ");
			$DB->commit();
			
			$indata[num_oid] = _OID;
			$indata[num_date] = mktime();
			$indata[str_code] = $ids[$ii];
	
			$indata[str_text] = "입금확인";
			
			$indata[str_name] = $_SESSION[NAME];
			$DB->insertQuery("TAB_ORDER_DATA_LOG",$indata);
			$DB->commit();

			
			//unlink(_DOC_ROOT."/hosts/".HOST."/lms/".$types."-".$ids[$ii].".*");
		}
			
			
		WebApp::moveBack('입금확인 처리되었습니다..');
		
		 break;
            
            case "price_w":
		
			
		for($ii=0; $ii<count($ids); $ii++) {
			$datas[str_order_st] = 3;
			$DB->updateQuery("TAB_ORDER",$datas," num_oid = '"._OID."' and str_order_code = '".$ids[$ii]."' ");
			$DB->commit();
			
			$indata[num_oid] = _OID;
			$indata[num_date] = mktime();
			$indata[str_code] = $ids[$ii];
	
			$indata[str_text] = "입금대기";
			
			$indata[str_name] = $_SESSION[NAME];
			$DB->insertQuery("TAB_ORDER_DATA_LOG",$indata);
			$DB->commit();

			
			//unlink(_DOC_ROOT."/hosts/".HOST."/lms/".$types."-".$ids[$ii].".*");
		}
			
			
		WebApp::moveBack('입금대기 처리되었습니다..');
		
		 break;
		  case "price_out":
		
			
		for($ii=0; $ii<count($ids); $ii++) {
			$datas[str_order_st] = 0;
			$DB->updateQuery("TAB_ORDER",$datas," num_oid = '"._OID."' and str_order_code = '".$ids[$ii]."' ");
			$DB->commit();

			
			$indata[num_oid] = _OID;
			$indata[num_date] = mktime();
			$indata[str_code] = $ids[$ii];
	
			$indata[str_text] = "미입금으로 상태 변경";
			
			$indata[str_name] = $_SESSION[NAME];
			$DB->insertQuery("TAB_ORDER_DATA_LOG",$indata);
			$DB->commit();

			//unlink(_DOC_ROOT."/hosts/".HOST."/lms/".$types."-".$ids[$ii].".*");
		}
			
			
		WebApp::moveBack('미입금확인 처리되었습니다..');
		
		 break;
		  case "price_can":
		
		for($ii=0; $ii<count($ids); $ii++) {
			$datas[str_order_st] = 2;
			$DB->updateQuery("TAB_ORDER",$datas," num_oid = '"._OID."' and str_order_code = '".$ids[$ii]."' ");
			$DB->commit();
			
			$indata[num_oid] = _OID;
			$indata[num_date] = mktime();
			$indata[str_code] = $ids[$ii];
	
			$indata[str_text] = "주문취소 변경";
			
			$indata[str_name] = $_SESSION[NAME];
			$DB->insertQuery("TAB_ORDER_DATA_LOG",$indata);
			$DB->commit();
			
			//unlink(_DOC_ROOT."/hosts/".HOST."/lms/".$types."-".$ids[$ii].".*");
		}
			
		WebApp::moveBack('취소 처리되었습니다..');
		
		 break;
		}
	 break;
	}

?>