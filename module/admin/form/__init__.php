<?php
/* vim: set expandtab tabstop=4 shiftwidth=4 foldmethod=marker: */
/**
* ���ϸ�: __init__.php
* �ۼ���: 2004-10-16
* �ۼ���: �̹���
* ��  ��: 
*****************************************************************
* 
*/

// 2���� Ȩ�������� ��ϴ°�� ȸ������ ������ ���� oid ����(2004-10-16)
if($member_alias_oid = WebApp::getConf("member_alias_oid")) {
	$oid = $member_alias_oid;
}

$oid = _OID;

// 2008.02.04 - 2008.02.27 �ӽ� ����
/*
$ipbase = substr($REMOTE_ADDR,0,strrpos($REMOTE_ADDR,'.'));
$iptail = array_pop(explode('.',$REMOTE_ADDR));
if ($ipbase != '203.109.24' || ($iptail < '124' || $iptail > '255')) {
	if($act=="admin.form.main" || $act=="admin.form.prof") {
		if($REQUEST_METHOD!="GET"){
			WebApp::moveBack('2�� 27�ϱ��� ����� �Ұ����մϴ�.');
		}
	}else{
		WebApp::moveBack('2�� 27�ϱ��� ����� �Ұ����մϴ�.');
	}	
}	
*/

?>