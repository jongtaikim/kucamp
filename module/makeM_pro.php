<?
/* vim: set expandtab tabstop=4 shiftwidth=4 foldmethod=marker: */
/**
* �ۼ���: 2009-01-15
* �ۼ���: ������
* ��   ��: ��⸸��� ������
*****************************************************************
* 
*/


$DB = &WebApp::singleton('DB');
$FTP = &WebApp::singleton('FtpClient',WebApp::getConf('account'));


//2009-01-15 ���� �⺻ ���� ���ø� ����
if(!is_dir(_DOC_ROOT."/module/".$pname."/")) {


		//�⺻���Ϻ���
		exec("cp -R "._DOC_ROOT."/module/mbasic/ "._DOC_ROOT."/module/".$pname."/");

		echo _DOC_ROOT."/module/".$pname."/  ����<br>";

		exec("cp -R "._DOC_ROOT."/module/basic.php "._DOC_ROOT."/module/".$pname."/".$fname.".php");
		exec("chmod -R 707 "._DOC_ROOT."/module/".$pname."/");
		
		echo _DOC_ROOT."/module/".$pname."/".$fname.".php  ����<br>";


		exec("cp -R "._DOC_ROOT."/module/mbasic/ "._DOC_ROOT."/html/".$pname."/");
		exec("chmod -R 707 "._DOC_ROOT."/html/".$pname."/");
		echo _DOC_ROOT."/html/".$pname."/".$fname.".htm  ����<br>";
		

		$FTP->put_string($name,_DOC_ROOT."/html/".$pname."/".$fname.".htm");



	//exec("cp -R "._DOC_ROOT."/theme_lib/basic/ "._DOC_ROOT."/theme_lib/".$name."/");


	WebApp::moveBack('�����Ǿ����ϴ�.');
	
	}else{
	



	if(!is_file(_DOC_ROOT."/module/".$pname."/".$fname.".php")) {
		
	exec("cp -R "._DOC_ROOT."/module/basic.php "._DOC_ROOT."/module/".$pname."/".$fname.".php");
	exec("chmod -R 707 "._DOC_ROOT."/module/".$pname."/");
	echo _DOC_ROOT."/module/".$pname."/".$fname.".php  ����<br>";
	
	exec("chmod -R 707 "._DOC_ROOT."/html/".$pname."/");
	$FTP->put_string($name,_DOC_ROOT."/html/".$pname."/".$fname.".htm");
	echo _DOC_ROOT."/html/".$pname."/".$fname.".htm  ����<br>";

	
	}else{
	WebApp::moveBack('��������');
	
	
	
	}	
	}

?>