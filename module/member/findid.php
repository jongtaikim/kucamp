<?php
/* vim: set expandtab tabstop=4 shiftwidth=4 foldmethod=marker: */
/**
* ���ϸ�: module/member/findid.php
* �ۼ���: 2005-11-29
* �ۼ���: �̹���
* ��  ��: id, ��й�ȣã��
*****************************************************************
* 
*/
switch($REQUEST_METHOD) {
	case "GET":
		
		if(!$mcode) $DOC_TITLE = "str:ID/��й�ȣ ã��";
		$tpl->setLayout();
		$tpl->define('CONTENT',Display::getTemplate('member/findid.htm'));
	break;

	case "POST":
		

switch($mode) {
	case "id":


	    if($_POST['iconv'] == 'utf8'){
            $str_name	= iconv('utf-8','euc-kr',trim($_POST['str_name']));
            $str_email	=  iconv('utf-8','euc-kr',trim($_POST['str_email']));
        }else{
            $str_name	= trim($_POST['str_name']);
            $str_email	= trim($_POST['str_email']);
        }


		$DB = &WebApp::singleton('DB');
		$sql = "SELECT * FROM ".TAB_MEMBER." WHERE num_oid=$_OID AND str_name='$str_name' AND str_email='$str_email'";
		$data = $DB->sqlFetch($sql);
		$tpl->assign($data);

        if($_POST['iconv'] == 'utf8'){
            if($data) {
                $json['code'] = 200;
                $json['str_id'] = $data['str_id'];
                $json['msg'] = iconv('euc-kr','utf-8','��ġ�ϴ� ���̵� ã�ҽ��ϴ�.');
            }else{
                $json['code'] = 401;
                $json['str_id'] = '';
                $json['msg'] = iconv('euc-kr','utf-8','��ġ�ϴ� ���̵� �����ϴ�.');
            }

            echo json_encode($json);
            exit;

        }else{
            if(!$mcode) $DOC_TITLE = "str:ID/��й�ȣ ã��";
            $tpl->setLayout();
            $tpl->define('CONTENT',Display::getTemplate('member/findid_ok.htm'));
        }
		


	break;

	case "pw":



        if($_POST['iconv'] == 'utf8'){
            $str_name	= iconv('utf-8','euc-kr',trim($_POST['str_name']));
            $str_email	=  iconv('utf-8','euc-kr',trim($_POST['str_email']));
        }else{
            $str_name	= trim($_POST['str_name']);
            $str_email	= trim($_POST['str_email']);
        }
		

		$DB = &WebApp::singleton('DB');
		$sql = "SELECT * FROM ".TAB_MEMBER." WHERE num_oid=$_OID and str_id = '".$_POST['str_id']."' AND str_email='$str_email'";
		$data = $DB->sqlFetch($sql);
	
		

		if($data = $DB->sqlFetch($sql)) {



		$title= _ONAME." ��й�ȣ ����";

		$email = $data['str_email'];
		$rmail = "Accounts-noreply@".DOMAIN_;
		$name=$_ONAME;

		$mail_header = "From: $name <$rmail>\n";
		$mail_header .= "Reply-to: $rmail\n";
		$mail_header .= "MIME-Version: 1.0\n";
		$mail_header .= "Content-Type: text/html; charset=euc-kr\n";
		$mail_header .= "X-Mailer: INNOMEDISYS Mailer\n";

		$cont=_ONAME."�� �̿����ּż� �����մϴ�.
	 

	�����Ͻ� ����� ������ ������ ������ �����ϴ�.
	- ���̵� :  ".$data['str_id']."
	- ��й�ȣ : ".$data['str_passwd']."
	 

	��û���� �ʾҴµ�, �� ������ ���ŵǾ��ٸ� ��й�ȣ�� �缳���Ϸ��� �ٸ� ����ڰ� �Ǽ��� �� �̸��� �ּҸ� �Է����� �� �ֽ��ϴ�. ��й�ȣ �缳�� ��û�� ���� �ʾ����� �ƹ��� ��ġ�� �ʿ����� ������ �� ������ �����Ͻø� �˴ϴ�.
	 

	�� �� ������ �߽� ���� �����̹Ƿ� ȸ���ص� �亯 ���� �� �����ϴ�.
	�� �߰� ���� ������ "._ONAME." ����ڿ��� �����Ͻñ� �ٶ��ϴ�.";
			
		$cont= nl2br($cont);

		mail($email,$title,$cont,$mail_header);


            if($_POST['iconv'] == 'utf8'){
                if($data) {
                    $json['code'] = 200;
                    $json['msg'] = iconv('euc-kr','utf-8','ȸ�����Խ� �Է��ߴ� �̸��� ��й�ȣ�� ������Ƚ��ϴ�. <br>���������� ���� Ȯ�����ֽñ� �ٶ��ϴ�.');
                }else{
                    $json['code'] = 401;
                    $json['str_id'] = '';
                    $json['msg'] = iconv('euc-kr','utf-8','��ġ�ϴ� ������ �����ϴ�.');
                }

                echo json_encode($json);
                exit;

            }else {
                echo '<script>alert("ȸ�����Խ� �Է��ߴ� e-mail�� ��й�ȣ�� ������Ƚ��ϴ�. \n���������� ���� Ȯ�����ֽñ� �ٶ��ϴ�.");</script>';
                echo "<meta http-equiv='Refresh' Content=\"0; URL='member.login'\">";
            }



		} else {

            if($_POST['iconv'] == 'utf8') {

                    $json['code'] = 401;
                    $json['str_id'] = '';
                    $json['msg'] = iconv('euc-kr', 'utf-8', '��ġ�ϴ� ������ �����ϴ�.');

                echo json_encode($json);
                exit;

            }else {
                WebApp::moveBack("�Է��Ͻ� �̸��� �̸����� ��ġ�ϴ� ȸ���� ã�� ���Ͽ����ϴ�.\n ��Ȯ�� ������ �Է��Ͽ� �ֽʽÿ�.");
            }
		}

	break;
	}	

	break;
}
?>