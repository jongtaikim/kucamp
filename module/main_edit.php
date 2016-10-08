<?php
/* vim: set expandtab tabstop=4 shiftwidth=4 foldmethod=marker: */
/**
* 파일명: main.php
* 작성일: 2008-05-22
* 작성자: 김종태
* 설  명: 사이트 메인
*****************************************************************
* 
*/
$tpl->setLayout('@main');
$tpl->define('CONTENT', Display::getTemplate('main.htm'));
$tpl->assign('MAIN_CONF',Display::getMainConf());
?>
