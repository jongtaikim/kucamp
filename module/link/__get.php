<?php
/* vim: set expandtab tabstop=4 shiftwidth=4 foldmethod=marker: */
/**
* ���ϸ�: __get.php
* �ۼ���: 
* �ۼ���: �̹���
* ��  ��: 
*****************************************************************
* 
*/
switch($param['key']) {
	case 'menu':
		$DB = &WebApp::singleton('DB');
		$sql = "SELECT STR_URL,STR_TARGET FROM TAB_CONTENT_URL WHERE NUM_OID="._OID." AND NUM_MCODE=".$param['mcode'];
		list($menu_url,$menu_target) = array_values($DB->sqlFetch($sql));
		return array(
			'menu_name'=>_('URL Link'),
			'menu_url'=>$menu_url,
			'menu_target'=>$menu_target,
			'admin_btn_text'=>'��ũ����',
			'admin_url'=>array('act'=>'link.admin.edit','mcode'=>$param['mcode']),
           
			'admin_desc'=>'NOTE: �ܺ� URL�� <font color="#0000FF">http://</font> �� ������ ��ü �ּҸ� ��� ��������.<br> �ٸ� �޴� �ּҸ� �ٿ��ֱ� �ϽǶ��� <font color="#0000FF">http://�ּ�/</font> �� ������ ������ �κи� �ִ°��� �ӵ��� �����ϴ�<br>
<font color="#0000FF">"mailto:�����ּ�"</font> �� �̿��Ͽ� �̸��Ϻ����� ��ũ�� ����� ���� �ֽ��ϴ�.'
		);
		break;
}
?>
