<?
/***************************************************************/
/**
* �ۼ���: 2019-05-27
* �ۼ���: ������
* ��   ��: �Խù� �ϰ� ����
*****************************************************************
*
*/

switch ($_SERVER['REQUEST_METHOD']) {
    case "GET":
    break;
    case "POST":

        $DB = &WebApp::singleton("DB");



        if($_SESSION['ADMIN']) {


            $mcode = $_POST['mcode'];
            $ids = $_POST['ids'];

            if ($mcode && $ids) {

                for($ii=0; $ii<count($ids); $ii++) {
                    $sql = "delete from TAB_BOARD where NUM_MCODE = ".$mcode." and NUM_SERIAL = ".$ids[$ii];


                    $DB->query($sql);

                }


            }

        }


        echo "<meta http-equiv='Refresh' Content=\"0; URL='/board.list?mcode=".$mcode."&page=".$_POST['page_no']."'\">";



    break;
}


?>
