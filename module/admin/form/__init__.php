<?php
/* vim: set expandtab tabstop=4 shiftwidth=4 foldmethod=marker: */
/**
* 파일명: __init__.php
* 작성일: 2004-10-16
* 작성자: 이범민
* 설  명: 
*****************************************************************
* 
*/

// 2개의 홈페이지를 운영하는경우 회원정보 공유를 위해 oid 변경(2004-10-16)
if($member_alias_oid = WebApp::getConf("member_alias_oid")) {
	$oid = $member_alias_oid;
}

$oid = _OID;

// 2008.02.04 - 2008.02.27 임시 정지
/*
$ipbase = substr($REMOTE_ADDR,0,strrpos($REMOTE_ADDR,'.'));
$iptail = array_pop(explode('.',$REMOTE_ADDR));
if ($ipbase != '203.109.24' || ($iptail < '124' || $iptail > '255')) {
	if($act=="admin.form.main" || $act=="admin.form.prof") {
		if($REQUEST_METHOD!="GET"){
			WebApp::moveBack('2월 27일까지 사용이 불가능합니다.');
		}
	}else{
		WebApp::moveBack('2월 27일까지 사용이 불가능합니다.');
	}	
}	
*/

?>