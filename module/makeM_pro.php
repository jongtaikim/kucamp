<?
/* vim: set expandtab tabstop=4 shiftwidth=4 foldmethod=marker: */
/**
* 작성일: 2009-01-15
* 작성자: 김종태
* 설   명: 모듈만들기 마법사
*****************************************************************
* 
*/


$DB = &WebApp::singleton('DB');
$FTP = &WebApp::singleton('FtpClient',WebApp::getConf('account'));


//2009-01-15 종태 기본 위젯 템플릿 복사
if(!is_dir(_DOC_ROOT."/module/".$pname."/")) {


		//기본파일복사
		exec("cp -R "._DOC_ROOT."/module/mbasic/ "._DOC_ROOT."/module/".$pname."/");

		echo _DOC_ROOT."/module/".$pname."/  생성<br>";

		exec("cp -R "._DOC_ROOT."/module/basic.php "._DOC_ROOT."/module/".$pname."/".$fname.".php");
		exec("chmod -R 707 "._DOC_ROOT."/module/".$pname."/");
		
		echo _DOC_ROOT."/module/".$pname."/".$fname.".php  생성<br>";


		exec("cp -R "._DOC_ROOT."/module/mbasic/ "._DOC_ROOT."/html/".$pname."/");
		exec("chmod -R 707 "._DOC_ROOT."/html/".$pname."/");
		echo _DOC_ROOT."/html/".$pname."/".$fname.".htm  생성<br>";
		

		$FTP->put_string($name,_DOC_ROOT."/html/".$pname."/".$fname.".htm");



	//exec("cp -R "._DOC_ROOT."/theme_lib/basic/ "._DOC_ROOT."/theme_lib/".$name."/");


	WebApp::moveBack('생성되었습니다.');
	
	}else{
	



	if(!is_file(_DOC_ROOT."/module/".$pname."/".$fname.".php")) {
		
	exec("cp -R "._DOC_ROOT."/module/basic.php "._DOC_ROOT."/module/".$pname."/".$fname.".php");
	exec("chmod -R 707 "._DOC_ROOT."/module/".$pname."/");
	echo _DOC_ROOT."/module/".$pname."/".$fname.".php  생성<br>";
	
	exec("chmod -R 707 "._DOC_ROOT."/html/".$pname."/");
	$FTP->put_string($name,_DOC_ROOT."/html/".$pname."/".$fname.".htm");
	echo _DOC_ROOT."/html/".$pname."/".$fname.".htm  생성<br>";

	
	}else{
	WebApp::moveBack('파일있음');
	
	
	
	}	
	}

?>