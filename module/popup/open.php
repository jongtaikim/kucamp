<?php
/* vim: set expandtab tabstop=4 shiftwidth=4 foldmethod=marker: */
/**
* ÀÛ¼ºÀÏ: 2009-08-12
* ÀÛ¼ºÀÚ: ±èÁ¾ÅÂ
* ¼³   ¸í: ÆË¾÷¿ÀÇÂ
*****************************************************************
* 
*/

include dirname(__FILE__).'/__init__.php';

$http_r = $_SERVER['HTTP_REFERER'];
$popup_file = "/hosts/".HOST."/files/popup/popup.js";
if(!$function_name = $param['function_name']) $function_name = 'openPopup';

$DB = &WebApp::singleton("DB");


switch (_STYPE) {
	case "E":
	$psql = " and str_e = 'Y' ";
	 break;
	case "M":
	$psql = " and str_m = 'Y' ";
	break;
	case "H":
	$psql = " and str_h = 'Y' ";
	break;

	}



//ÆË¾÷Á¸ Ã¼Å©

//ÇÐ±³ ÆË¾÷Á¸ ±â°£ÀÖ´Â°Å
$sql = "select count(*) from ".TAB_POPUP." 
			WHERE num_oid = "._OID." and  dt_start_date<=".mktime(0,0,0,date("m"),date("d"),date("Y"))." and dt_end_date>=".mktime(0,0,0,date("m"),date("d"),date("Y"))." and str_open ='B'  and str_view='Y' 	";
$count1 = $DB -> sqlFetchOne($sql);

//ÇÐ±³ ÆË¾÷Á¸ ±â°£¾ø´Â°Å
$sql = "select count(*) from ".TAB_POPUP." 
			WHERE num_oid = "._OID."  and dt_start_date is null and dt_end_date is null and str_open ='B' and    str_view='Y' 	";
$count2 = $DB -> sqlFetchOne($sql);




$total_popdup = $count1 + $count2 + $count3 + $count4;

if($total_popdup > 0) {
	//echo '<script>alert("'.$count1 .'/'. $count2 .'/'. $count3 .'/'. $count4.'");</script>';

	 //ÆË¾÷Á¸ ³¡
}

//¸®½ºÆ®ÆË¾÷ End


//°³º°ÆË¾÷ Start
$sql = "SELECT * FROM ".TAB_POPUP." 
			WHERE num_oid = "._OID." and DT_START_DATE<=".mktime(0,0,0,date("m"),date("d"),date("Y"))." AND DT_END_DATE>=".mktime(0,0,0,date("m"),date("d"),date("Y"))." 
			and str_open ='A'  and str_view='Y'
			order by num_serial asc";
$data1 = $DB -> sqlFetchAll($sql);




$row =  $data1;

if($row) {
?>



<?}//°³º°ÆË¾÷ End?>



<? for($ii=0; $ii<count($row); $ii++) { //ÆË¾÷º° ÄíÅ°Ã¼Å©?>
<script language="Javascript" type="text/javascript">

if ( getCookie( "<?=$row[$ii][num_oid]?>popup<?=$row[$ii][num_serial]?>" ) != "done" ) { 

	if(navigator.appVer == "Netscape") {
		noticeWindow<?=$row[$ii][num_serial]?> =
		window.open('/popup.view?boid=<?=$row[$ii][num_oid]?>&id=<?=$row[$ii][num_serial]?>','<?=$row[$ii][num_oid]?>popup<?=$ii?>','toolbar=no,location=no,directories=no,status=no,menubar=no,scrollbars=no,resizable=no,width=<?=$row[$ii][num_width]?>,height=<?=$row[$ii][num_height]+25?>,top=<?=$row[$ii][num_top]?>,left=<?=$row[$ii][num_left]?>'); 
	}else{
	if(ScriptEngineMinorVersion() > "6"){
		noticeWindow<?=$row[$ii][num_serial]?> =
		window.open('/popup.view?boid=<?=$row[$ii][num_oid]?>&id=<?=$row[$ii][num_serial]?>','<?=$row[$ii][num_oid]?>popup<?=$ii?>','toolbar=no,location=no,directories=no,status=no,menubar=no,scrollbars=no,resizable=no,width=<?=$row[$ii][num_width]?>,height=<?=$row[$ii][num_height]+35?>,top=<?=$row[$ii][num_top]?>,left=<?=$row[$ii][num_left]?>'); 
	}else{
		noticeWindow<?=$row[$ii][num_serial]?> =
		window.open('/popup.view?boid=<?=$row[$ii][num_oid]?>&id=<?=$row[$ii][num_serial]?>','<?=$row[$ii][num_oid]?>popup<?=$ii?>','toolbar=no,location=no,directories=no,status=no,menubar=no,scrollbars=no,resizable=no,width=<?=$row[$ii][num_width]?>,height=<?=$row[$ii][num_height]+25?>,top=<?=$row[$ii][num_top]?>,left=<?=$row[$ii][num_left]?>'); 
	}
	}
	noticeWindow<?=$row[$ii][num_serial]?>.opener = self; 
}
</script>
<? } ?>