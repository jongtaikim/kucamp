<?php
/* vim: set expandtab tabstop=4 shiftwidth=4 foldmethod=marker: */
/**
* ���ϸ�: main.php
* �ۼ���: 2008-05-22
* �ۼ���: ������
* ��  ��: ����Ʈ ����
*****************************************************************
* 
*/
$tpl->setLayout('@main');
$tpl->define('CONTENT', Display::getTemplate('main.htm'));
$tpl->assign('MAIN_CONF',Display::getMainConf());
?>
