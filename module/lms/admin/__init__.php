<?
include_once "module/admin/__init__.php";

$table = "TAB_CAMP";
$table2 = "TAB_LMS_CATE";
$tpl->assign(array('types'=>$_GET[types]));

//echo $act;

if($act !="lms.admin.order_list"){

	if(!$_GET[sch_str_order_st]){

		if($_GET[all] != "y"){
			if($_GET[cancel] == "y"){
				$psqls = " and str_order_st in ('2','8') ";
			}else{
				if($_GET[hold] != "y"){
					$psqls = " and  str_order_st in ('0','3','1','5') ";
				}else{
					$psqls = " and str_order_st in (6,7) ";
				}

			}
		}
	}

}else{


if(!$_GET[sch_str_order_st]){

	if($_GET[all] != "y"){
		if($_GET[cancel] == "y"){
			$psqls = " and a.str_order_st in ('2','8') ";
		}else{
			if($_GET[hold] != "y"){
				$psqls = " and  a.str_order_st in ('0','3','1','5') ";
			}else{
				$psqls = " and a.str_order_st in (6,7) ";
			}

		}
	}
}

}


?>