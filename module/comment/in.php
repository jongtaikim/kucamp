<?
/* vim: set expandtab tabstop=4 shiftwidth=4 foldmethod=marker: */
/**
 * 작성일: 2010-01-29
 * 작성자: 김종태
 * 설   명: 덧글 입력
 *****************************************************************
 *
 */
$DB = &WebApp::singleton('DB');


switch ($REQUEST_METHOD) {
    case "POST":

        $sql = " select count(*) from comments where userid = '".$_POST['userid']."' and code = '".$_POST['code']."' ";
        $total = $DB->sqlFetchOne($sql);
        if($total){
            $json['code'] = 502;
            $json['msg'] = "이미 참여하셨습니다.";

            echo json_encode($json);
            exit;
        }

        $sql = "INSERT INTO comments 
        ( code, comment , regdate,userid) 
        VALUES 
        ('".$_POST['code']."' , '".iconv('UTF-8','EUC-KR',$_POST['comment'])."' ,'".date("Y-m-d H:i:s")."','".$_POST['userid']."') ";



        if($DB->query($sql)){
            $DB->commit();

            $json['code'] = 200;
            $json['msg'] = "덧글이 작성되었습니다.";

            echo json_encode($json);
            exit;

        }else{
            $json['code'] = 501;
            $json['msg'] = "덧글작성중 에러가 발생하였습니다.";

            echo json_encode($json);
            exit;
        }



        break;
}

?>
