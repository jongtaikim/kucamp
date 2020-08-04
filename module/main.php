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

if(THEME == 'NEW'){
    $tpl->setLayout('@main');
    if(!$_GET['m']){
        $cont = 'main.html';
    }else{
        $cont = $_GET['m'].'.html';
    }


    $no_euc = true;
    include 'module/lms/__init__.php';



    $tpl->define('CONTENT', Display::getTemplate($cont));
    $tpl->assign('MAIN_CONF',Display::getMainConf());



}else {

}

?>
