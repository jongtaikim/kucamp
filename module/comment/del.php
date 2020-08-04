<?
/* vim: set expandtab tabstop=4 shiftwidth=4 foldmethod=marker: */
/**
 * 작성일: 2010-01-29
 * 작성자: 김종태
 * 설   명: url 위젯 덧글 삭제
 *****************************************************************
 *
 */
$DB = &WebApp::singleton('DB');

$serial = $_POST['serial'];
$code_url = $_POST['code'];

if($serial && $code_url){

    if(!$_SESSION['ADMIN']) {
        $sql = "delete from comments where code = '" . $code_url . "' and no = " . $serial . " and userid = '".$_SESSION['USERID']."' ";
    }else{
        $sql = "delete from comments where code = '" . $code_url . "' and no = " . $serial . "  ";
    }
     if($DB->query($sql)){


             $json['code'] = 200;
             $json['msg'] = "삭제하였습니다.";

             echo json_encode($json);
             exit;

        exit;
    }else{
        echo "sql 에러 : ".$sql;
        exit;
    }
}else{

    $json['code'] = 200;
    $json['msg'] = "값이 부족합니다.";

    echo json_encode($json);
    exit;
}


?>