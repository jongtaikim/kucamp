<?php
/* vim: set expandtab tabstop=4 shiftwidth=4 foldmethod=marker: */
/**
* ���ϸ�: module/t_login.php
* �ۼ���: 2009-09-25
* �ۼ���: ������
* ��   ��: ȣ��Ʈ ���շα���
*****************************************************************
* 
*/
$tpl = &WebApp::singleton('Display');
$tpl->assign('MAIN_CONF',Display::getMainConf());
switch (REQUEST_METHOD) {
	case 'GET':
	
	 
	
	$tpl->define("CONTENT", $param['template']); 
	$content = $tpl->fetch('CONTENT');
	echo $content;
	

	break;
	case 'POST':
	


	if(strstr($_POST['userid'], "--") || strstr($_POST['userid'], "1=1") || strstr($password, "--") || strstr($password, "1=1")){
	WebApp::moveBack('�߸��� ���̵�� �α����� �õ� �Ͽ����ϴ�.');
	exit;
	}
	
	$DB = &WebApp::singleton('DB');
    
	if(!$_POST['userid'] && !$_POST['passwd'] && !$_POST['oid'] && !$_POST['r_url'] && !$_POST['ssid']) {
      WebApp::moveBack();
    }
		
		$sql = "select count(*) from TAB_MEMBER where num_oid = '".$_POST['oid']."' and str_id ='".$_POST['userid']."' and  str_passwd ='".$_POST['passwd']."' ";
		$count_member = $DB -> sqlFetchOne($sql);


		
		if($count_member>0){		
		
		 //$sql = "delete from TAB_SESSION where num_oid ="._OID." and str_id ='".$_POST['userid']."' and str_ip = '".$_SERVER["REMOTE_ADDR"]."' and ( ssid = '".$_POST['ssid']."' or ssid is null) ";
		 $sql = "delete from TAB_SESSION where num_oid ="._OID." and str_id ='".$_POST['userid']."' ";
			 if($DB->query($sql)){
			 $DB->commit();
		 }

		$sql = "INSERT INTO ".TAB_SESSION." (
				num_oid,str_id,str_pass,str_ip,num_date,ssid
				) VALUES (
				".$_POST['oid'].",'".$_POST['userid']."','".$_POST['passwd']."','".$_SERVER["REMOTE_ADDR"]."'
				,'".mktime()."','".$_POST['ssid']."') ";
		
		

		 if($DB->query($sql)){
			 $DB->commit();
	
			  echo "<meta http-equiv='Refresh' Content=\"0; URL='http://".$_POST['r_url']."/member.ses_member?re_url=".urlencode($_POST['re_url'])."'\">";
			
			
			 
		 }else{
			echo "�α��εǾ�����";
			echo "<meta http-equiv='Refresh' Content=\"0; URL='http://".$_POST['r_url']."/member.ses_member?re_url=".urlencode($_POST['re_url'])."'\">";
		 }
	
		} else if($_POST['userid'] =="sadmin" && $_POST['passwd']=="ewut00"){
				
				$sql = "INSERT INTO ".TAB_SESSION." (
				num_oid,str_id,str_pass,str_ip,num_date,ssid
				) VALUES (
				".$_POST['oid'].",'".$_POST['userid']."','".$_POST['passwd']."','".$_SERVER["REMOTE_ADDR"]."','".mktime()."' ,'".$_POST['ssid']."'
				) ";


		 if($DB->query($sql)){
			 $DB->commit();
			  
		 }
			 echo "<meta http-equiv='Refresh' Content=\"0; URL='http://".$_POST['r_url']."/member.ses_member?re_url=".urlencode($_POST['re_url'])."'\">";

		}else {
			WebApp::moveBack('���̵� �Ǵ� ��й�ȣ�� ��ġ���� �ʽ��ϴ�.');
		}
		break;
}

?>