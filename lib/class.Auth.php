<?
/* vim: set expandtab tabstop=4 shiftwidth=4 foldmethod=marker: */
/**
* ���ϸ�: class.Auth.php
* �ۼ���: 2005-03-25
* �ۼ���: ��ģ����
* ��  ��: ���� Ŭ����
*****************************************************************
* 
*/

class Auth {
	function is_login() {
		return $_SESSION['AUTH'];
	}

	function require_login($path='member') {
		$login_path = "/$path.login";
		if (!Auth::is_login()) {
			$_SESSION['redir'] = getenv('REQUEST_URI');
			WebApp::redirect($login_path);
		}
	}

	function is_auth() {
		return ($_SESSION['AUTH'] || $_SESSION['ADMIN']) ? true : false;
	}

	function require_auth($path='member') {
		$login_path = "/$path.login";
		if (!Auth::is_auth()) {
			$_SESSION['redir'] = getenv('REQUEST_URI');
			WebApp::redirect($login_path);
		}
	}

	function is_admin() {
		return $_SESSION['ADMIN'];
	}

	/* 2009-07-14 ���� �̿��ý��ۿ��� ������ */
	function is_a($memtype) {
		return @in_array($memtype,$_SESSION['MEM_TYPE']) || false;
	}
	function is_a_cafe($memtype, $cafe_id){
		return @in_array($memtype, $_SESSION['CAFE_MEM_TYPE'][$cafe_id]);
	}
	function is_cafe_ope($str_id, $cafe_id){
		if(!$_SESSION['CAFE_OPE_MEM'][$cafe_id])return -1;
		return @strcmp($str_id, $_SESSION['CAFE_OPE_MEM'][$cafe_id]);		
	}
	/* 2009-07-14 ���� �̿��ý��ۿ��� ������ */
}
?>
