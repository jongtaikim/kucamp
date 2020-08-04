<?php
/* vim: set expandtab tabstop=4 shiftwidth=4 foldmethod=marker: */
/**
* 파일명: member/admin/view.php
* 작성일: 2008-08-18
* 작성자: 김종태
* 설  명: 회원정보
*****************************************************************
* 
*/


$DB = &WebApp::singleton('DB');
$str_id = $_SESSION['USERID'];
switch($REQUEST_METHOD) {
	case "GET":

		

        $sql = "SELECT * FROM TAB_MEMBER  WHERE num_oid=$_OID AND str_id='$str_id' ";


        if(!$data = $DB->sqlFetch($sql)) {
            WebApp::alert('데이타가 존재하지 않습니다.');
            WebApp::moveBack();
        }

        $data['id'] = $str_id;
        $mem_types = WebApp::get('member',array('key'=>'member_types'));
        $data['mtype'] = $mem_types[$data['chr_mtype']];
        if($data['num_fcode']) {
            $sql = "SELECT str_fname_full FROM ".TAB_CLASS_FORMATION." WHERE num_oid=$_OID AND num_fcode=".$data['num_fcode'];
            $data['fname_full'] = $DB->sqlFetchOne($sql);
        }
        if($data['str_photo']) $data['photo_url'] = 'hosts/'.HOST.'/files/member/'.$data['str_photo'];
		

		$jumin = explode("-",$data[num_jumin]);
		$data[jumin1] = $jumin[0];
		$data[jumin2] = $jumin[1];
		$data[jumin2] = substr($data[jumin2],0,2);
		
		$tel = explode("-",$data[str_handphone]);
		$data[tel1] = $tel[0];
		$data[tel2] = $tel[1];
		$data[tel3] = $tel[2];

		$tel = explode("-",$data[str_phone]);
		$data[tel11] = $tel[0];
		$data[tel22] = $tel[1];
		$data[tel33] = $tel[2];

		$email = explode("@",$data[str_email]);
		$data[email1] = $email[0];
		$data[email2] = $email[1];
		

		if(!$mcode) $DOC_TITLE="str:회원정보수정";

		classList();

		$tpl->setLayout();
        $tpl->define('CONTENT',Display::getTemplate('member/modify.htm'));
        $tpl->assign($data);

	break;
	case "POST":




if($_POST['str_passwd'] && $_POST['str_passwd2']){
    $pwsql = " str_passwd = '".$_POST['str_passwd']."',";
}


$sql = "update TAB_MEMBER set 

$pwsql

str_email = '$str_email',
str_nick = '$str_nick',
num_fcode = '$num_fcode',

chr_zip = '$str_zipcode',
str_addr1 = '$str_addr1',
str_addr2 = '$str_addr2',
str_introduct = '$str_introduct',


str_handphone = '".$_POST['phone']."' ,
str_stu_handphone = '".$_POST['str_stu_handphone']."' ,

str_job = '$job',

str_plus1 = '$str_plus1',
str_plus2 = '$str_plus2',
str_plus3 = '$str_plus3',
str_plus4 = '$str_plus4',
str_plus5 = '$str_plus5'


where 

num_oid = '$_OID' and str_id ='$str_id' ";


$DB->query($sql);
$DB->commit();



echo '<script>alert("저장하였습니다."); top.location.reload();</script>';
 //WebApp::moveBack();
  

	break;
}
?>