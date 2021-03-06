<?php
/* vim: set expandtab tabstop=4 shiftwidth=4 foldmethod=marker: */
/**
* 파일명: module/member/join.php
* 작성일: 2008-01-21
* 작성자: 김종태
* 설  명: 회원가입
*****************************************************************
*
*/
$DB = &WebApp::singleton('DB');

$school_year = WebApp::getConf('formation.school_year');

switch (REQUEST_METHOD) {
	case 'GET':




		$mem_types = WebApp::get('member',array('key'=>'member_types'));



		$tpl->assign(array(
		 'num_birthday'=>$num_birthday,
		 'chr_mtype'=>$_GET[chr_mtype],
		 'chr_mtype_'=>$_GET[chr_mtype],
		 'chr_mtype_name'=>$mem_types[$chr_mtype],
		 'str_name'=>$str_name,
		 'chr_birthday'=>$chr_birthday,
		 'str_sex'=>$str_sex,

		));



		//비회원, 관리자들은 가입목록에서 제외
		unset($mem_types['z'],$mem_types['n'],$mem_types['c'],$mem_types['d'],$mem_types['x']);

		//print_r($mem_types);

		if($homeData[str_hometype] =="CAFE") { //2009-01-16 종태 카페일경우는 학생을 안받는다
		unset($mem_types['v'],$mem_types['u']);
		}

		for( $i=0; list($k,$v) = each( $mem_types ); $i++){
			$row[$i]['call'] = $k;
			$row[$i]['name'] = $v;
		}


		if(!$mcode) $DOC_TITLE="str:회원가입";

		$tpl->setLayout();
		$tpl->define('CONTENT',Display::getTemplate('member/join.htm'));

		$tpl->assign($_MEMBER);

		$tpl->assign(array(
			'LIST' => $row,
			'FMT' => $fmt,

		));
		break;
	case 'POST':



		switch($_POST['mode']) {

			// 가입
			case 'join':

			    if($_POST['email']){
                    $str_email = $_POST['email'];
                }else{
                    $str_email = $email1."@".$email2;
                }

				$sql ="select count(*) from TAB_MEMBER where num_oid = ".$_OID." and str_email = '$str_email'";
				if($DB->sqlFetchOne($sql)>0){
					echo '<script>alert("이미 가입된 이메일주소가 있습니다.");   history.go(-1); </script>';
					exit;
				}

				$str_id			= $_POST['str_id'];
				$str_passwd		= $_POST['str_passwd'];
				$sql ="select count(*) from TAB_MEMBER where num_oid = ".$_OID." and str_id = '$str_id'";
				if($DB->sqlFetchOne($sql)>0){
					echo '<script>alert("이미 가입된 아이디가 있습니다.");   history.go(-1); </script>';
					exit;
				}

				if($tel1 && $tel2 && $tel3) $str_tel = $tel1."-".$tel2."-".$tel3;
				if($tel11 && $tel22 && $tel33) $str_tel2 = $tel11."-".$tel22."-".$tel33;

                if($_POST['phone']){
                    $str_handphone = $_POST['phone'];
                }else{
                    $str_handphone			= $str_tel2;
                }

                if($_POST['str_stu_handphone']){
                    $str_stu_handphone = $_POST['str_stu_handphone'];
                }




				if($num_jumin1 && $num_jumin2) $str_jumin = $num_jumin1."-".$num_jumin2;

				$str_name		= $_POST['str_name'];
				$mtype		= $_POST['mtype'];
				$num_fcode		= $_POST['num_fcode'] ? $_POST['num_fcode'] : "''";
				$str_zipcode	= $_POST['str_zipcode'];
				$str_addr1		= $_POST['str_addr1'];
				$str_addr2		= $_POST['str_addr2'];

				$str_job		= $_POST['job'];

				$str_intro		= ($_POST['str_introduct']) ? $_POST['str_introduct'] : "" ;
				$user_ip		= getenv("REMOTE_ADDR");

				$num_birth = str_replace('-','',$num_birthday);

				if(!$str_group) {
					$str_group = $str_group2;
				}

				if($mtype == 'm'){ //맨토는 관리자 인증 받아야함
					$inj = 0;
				}else{
					$inj = 1;
				}




				$mtype = $uselecr;

				//회원가입폼에서 선택
				//$mtype = $_MEMBER[mtype];
				if( $mtype =="z") {
				 WebApp::moveBack('post값 변경시도입니다.');
				exit;
				}
				if(!$chr_birthday)  $chr_birthday = 's';

				if(!$mtype)  $mtype  = 'g';

		/*		$FH = &WebApp::singleton('FileHost');

				$FTP = &WebApp::singleton('FtpClient',WebApp::getConf('account'));

				$FTP->mkdir(_DOC_ROOT."/hosts/".HOST."/files/member/");
				$FTP->chmod(_DOC_ROOT."/hosts/".HOST."/files/member/",777);

				if($upfile1) {
				$file = new FileUpload("upfile1"); // datafile은 form에서의 이름
				$file->Path = _DOC_ROOT."/hosts/".HOST."/files/member/";  // 마지막에 /꼭 붙여야함

				//$file->file_mkdir();
				if(!$file->Ext("gif,jpg,png"))  {
				echo '<script>alert("이미지 파일만 가능합니다.");   history.go(-1); </script>';
				exit;
				 }
				$mk = mktime();

				$file->file_rename($str_id);
				if(!$file->upload()){
				//echo '<script>alert("업로드에 실패 했습니다.");   history.go(-1); </script>';
				//exit;
				}
				$file->upload();
				GDImageResize(_DOC_ROOT."/hosts/".HOST."/files/member/".$file->SaveName , _DOC_ROOT."/hosts/".HOST."/files/member/".$file->SaveName."_100" , 80, 60);
				}*/

				if($_POST['new_mode']){
				    $str_name = iconv('UTF-8','EUC-KR',$str_name);
				    $str_addr1 = iconv('UTF-8','EUC-KR',$str_addr1);
				    $str_plus1 = iconv('UTF-8','EUC-KR',$str_plus1);
				    $str_plus2 = iconv('UTF-8','EUC-KR',$str_plus2);
                    $str_intro = iconv('UTF-8','EUC-KR',$str_intro);
                    $str_school = iconv('UTF-8','EUC-KR', $str_school);
                    $str_class = iconv('UTF-8','EUC-KR', $str_class);
                }



				$sql =	"
				INSERT INTO TAB_MEMBER 

				(num_oid, str_name, str_id, str_passwd, chr_mtype, num_fcode, str_email, 
				chr_zip, str_addr1, str_addr2, num_birthday, chr_birthday, str_introduct, str_ip, str_phone, str_handphone,
				num_jumin, str_job,str_voll, num_auth,str_plus1,str_plus2,str_plus3,str_plus4,str_plus5,
				str_nick,str_mailring,str_sms,num_point_total,str_sex,str_school,str_class,dt_date,str_eng_name,str_stu_handphone)

				VALUES 
				($_OID,'$str_name','$str_id','$str_passwd','$mtype',$num_fcode,'$str_email',
				'$str_zipcode','$str_addr1','$str_addr2','','$chr__birthday','$str_intro','$user_ip','$str_phone', '$str_handphone',
				'$str_jumin','$str_job','$str_voll','$inj','$str_plus1','$str_plus2','$str_plus3','$str_plus4','$str_plus5',
				'$str_nick','$str_mailring','$str_sms','".$_MEMBER[num_join_point]."', '$str_sex' , '$str_school' , '$str_class','".mktime()."','$str_eng_name','$str_stu_handphone')
				";

				if(!$DB->query($sql)) joinErr($sql);
				$DB->commit();


				if($inj){
					//$_SESSION['AUTH'] = true;
				}

				if($_SESSION[baseurl_])  $baseurl="http://".$_SESSION[baseurl_];



?>
<!-- 네이버프리미엄로그스크립트 -->
<script type="text/javascript" src="http://wcs.naver.net/wcslog.js"></script>
<script type="text/javascript">
if (!wcs_add) var wcs_add={};
wcs_add["wa"] = "s_30543923423b";
if (!_nasa) var _nasa={};
_nasa["cnv"] = wcs.cnv("2","1");
wcs_do(_nasa);
</script>
<script type="text/javascript" charset="UTF-8" src="//t1.daumcdn.net/adfit/static/kp.js"></script>
<script type="text/javascript">
    kakaoPixel('4813678621039050624').pageView();
    kakaoPixel('4813678621039050624').completeRegistration();
</script>

                <!-- WIDERPLANET  SCRIPT START 2019.10.15 -->
                <span style="display: none;" name="wp_detection" tag="i">회원가입</span>
                <span style="display: none;" name="wp_detection" tag="t">회원가입</span>
                <span style="display: none;" name="wp_detection" tag="q">1</span>
                <span style="display: none;" name="wp_detection" tag="p">1</span>
                <script type='text/javascript'>var wp_page_type = 'Join';</script>
                <!-- // WIDERPLANET  SCRIPT END 2019.10.15 -->

                <script type="text/javascript">
                    //<![CDATA[
                    var DaumConversionDctSv="type=M,orderID=,amount=";
                    var DaumConversionAccountID="kxux-fOYUoFoBT4ofm5hvw00";
                    if(typeof DaumConversionScriptLoaded=="undefined"&&location.protocol!="file:"){
                        var DaumConversionScriptLoaded=true;
                        document.write(unescape("%3Cscript%20type%3D%22text/javas"+"cript%22%20src%3D%22"+(location.protocol=="https:"?"https":"http")+"%3A//t1.daumcdn.net/cssjs/common/cts/vr200/dcts.js%22%3E%3C/script%3E"));
                    }
                    //]]>
                </script>
                <?
				echo '<script>alert("회원가입이 완료되었습니다.");</script>';


				echo "<meta http-equiv='Refresh' Content=\"0; URL='/main'\">";



				break;
		}
break;
}////

function joinErr($sql) {
	echo $sql;
	exit;
//WebApp::moveBack('가입처리중 오류가 발생했습니다. 관리자에게 문의해주시기 바랍니다.');

}


?>
