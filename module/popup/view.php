<?php
/* vim: set expandtab tabstop=4 shiftwidth=4 foldmethod=marker: */
/**
* : view.php
* : 2005-03-15
* : 
*   : 
*****************************************************************
* 
*/

if(!$id = $_REQUEST['id']) exit;

	$DB = &WebApp::singleton('DB');
	$sql = "SELECT  * FROM ".TAB_POPUP." WHERE NUM_OID='$boid'  AND NUM_SERIAL=$id ";
	//echo $sql;
	if($data = $DB->sqlFetch($sql)) {
		$data['id'] = &$data['num_serial'];
		$skin = $data['str_skin'];


		$FH = &WebApp::singleton('FileHost','main',$code);
		$FH->set_oid(_OID);
		$data['content'] = $FH->set_content($data['str_text']);
		$data['FILE_LIST'] = $FH->get_files_info($id);
		$total_size = array_pop($data['FILE_LIST']);
		$data['pid'] = $pid;
		$tpl = &WebApp::singleton('Display');
		$tpl->setLayout('admin');

		if($data['str_skin']) $str_skin = $data['str_skin'];
		else $str_skin = "basic";

		//$tpl->define("CONTENT",WebApp::getTemplate("popup/skin/default/view.htm"));

		if($skin){
		$tpl->define("CONTENT",WebApp::getTemplate("popup/skin/popup1/view.htm"));
		}else{
		$tpl->define("CONTENT",WebApp::getTemplate("popup/skin/ifr.htm"));
		}

		$tpl->assign($data);
		$tpl->assign(array(
		 'ppid'=>$ppid,
		 'boid'=>$boid,
		 ));
		
		
		$content = $tpl->fetch("CONTENT");


	} else {
		$content = "";
	}

?>

   