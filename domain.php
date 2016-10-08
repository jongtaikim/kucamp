#!/usr/local/php/bin/php
<?php
/* vim: set expandtab tabstop=4 shiftwidth=4 foldmethod=marker bg=dark: */
/**
* 파일명: domain.php
* 작성일: 2006-07-06
* 작성자: 이범민
* 설  명: 콘솔용
*****************************************************************
* 
*/
$USER = getenv('USER');
//if($USER != 'root') die('root user 권한이 필요합니다.');

// {{{ config
$PROMPT = "> ";
$COMMANDS = array(	// value must method of EwutAdmin class
    '?' => 'help',
	'help' => 'help',
    'domain' => 'domain',
    'sole_add' => 'sole_add',
    'close' => 'close',
    'exit' => 'close'
);

define(INPUT_MUST,true);
set_time_limit(0);
// }}}

// {{{ init
require_once ('lib/class.WebApp.php');
$_DOC_ROOT = WebApp::getConf('system.document_root');
define('_DOC_ROOT',$_DOC_ROOT);
WebApp::import('Display');
help();
// }}}

// {{{ Command Listening LOOP
echo $PROMPT;
while ($str = fgets(STDIN, 1024)) {
	list($cmd, $param) = explode(' ',trim($str),2);
    if (!$cmd) {
        echo "\n".$PROMPT;
        continue;
    }
	if (array_key_exists($cmd,$COMMANDS)) {
		call_user_func_array(array('Commands',$COMMANDS[$cmd]), explode(' ',trim($param)));
	} else {
		help();
	}
    echo "\r\n".$PROMPT;
    usleep(50);
}
// }}}

// {{{ functions
function stdin() {
    return trim(fgets(STDIN, 1024));
}

function help() {
		echo "
명령어
    domain : 도메인추가
    sole_add : 총판홈페이지 추가에 따른 아파치 conf 도메인처리
    close : 종료
";
}

function print_file($filename) {
    $fp = @fopen($filename,'r');
    echo str_replace("\n","\r\n",@fread($fp,filesize($filename)));
    @fclose($fp);
}

function print_line($line) {
    echo $line."\r\n";
    return;
}

function input($msg,&$var,$must=0) {
    echo $msg;
    $var = trim(stdin());
    if (!$var && $must) input($msg,&$var,$must);
    return $var;
}

function savefile($filename,$content,$mode = 'w') {
    $fp = fopen($filename,$mode);
    fwrite($fp,$content);
    fclose($fp);
}

function warning($str) {
    fwrite(STDERR,$str);
}

function decimal_size($size) {
	$unit = array("Byte","KB","MB","GB");
	$cnt = count($unit);
	for($i=0;$i<$cnt;$i++) {
		if($pos = strpos($size,$unit[$i])) {
			return pow(1024,$i) * intval(substr($size,0,$pos));
		}
	}
}

function cp($wf, $wto) {
    if (!file_exists($wto)) mkdir($wto,0777);
    $arr=ls_a($wf);
    foreach ($arr as $fn) {
        if ($fn) {
            $fl = "$wf/$fn";
            $flto = "$wto/$fn";
            if (is_dir($fl)) cp($fl,$flto);
            else copy($fl,$flto);
        }
    }
}

class Commands {
	function help() {
        help();
    }

    function domain() {
        $Sites = array(
            1 => array(
                'name' => '북마트',
                'dir' => '/www/bookmart',
                'file' => 'bookmart.conf',
                'slink' => 'hosts',
                'domain' => '.bookmart.net',
                'DB' => array(
                    'dsn' => 'oracle://bookmart:bookmart0673@211.214.160.241/ewut',
                    'table' => 'TAB_ORGAN',
                    'field' => 'str_extra_url')),
            2 => array(
                'name' => '박학천 논술교실',
                'dir' => '/www/hak1000',
                'file' => 'hak1000.conf',
                'slink' => 'domains',
                'domain' => '.ezgrape.com',
                'DB' => array(
                    'dsn' => 'oracle://hak1000:hak10000673@211.214.160.241/ewut',
                    'table' => 'TAB_ORGAN',
                    'field' => 'str_domain')),
            3 => array(
                'name' => '한국교육개발',
                'dir' => '/www/isch',
                'file' => 'isch.conf',
                'slink' => 'domains',
                'domain' => '.hkedu.co.kr',
                'DB' => array(
                    'dsn' => 'oracle://sys:cis9505@211.214.160.99:1521/ewut',
                    'table' => 'TAB_ORGAN',
                    'field' => 'str_domain')),
            4 => array(
                'name' => '총판홈페이지',
                'dir' => '/www/sole',
                'file' => 'sole.conf',
                'slink' => 'domains',
                'domain' => '.kangsa.net',
                'DB' => array(
                    'dsn' => 'oracle://sole:sole0673@211.214.160.241/ewut',
                    'table' => 'TAB_ORGAN',
                    'field' => 'str_domain')),
            5 => array(
                'name' => '강사홈페이지',
                'dir' => '/www/tweb',
                'file' => 'tweb.conf',
                'slink' => 'domains',
                'domain' => '.kangsa.net',
                'DB' => array(
                    'dsn' => 'oracle://teacher:teacher0673@211.214.160.241/ewut',
                    'table' => 'TAB_MASTER_MEMBER',
                    'field' => 'str_domain'))
        );

        $named_dir = '/var/named/chroot/etc/';
        $zone_dir = '/var/named/chroot/var/named/';
        $httpd_dir = '/usr/local/apache/conf/';
            

        print_line('1단계) 도메인을 입력하여 주십시오.');
        input('도메인(http 나 www 제외) : ',$domain);
        if(!$domain) {
            print_line('종료');
            return;
        } elseif(is_file($zone_dir.$domain.'.zone')) {
            print_line('zone 파일이 존재합니다. 이미 등록된 도메인입니다.');
            return;
        }
        
        $flag = false;
        do {
            print_line('2단계) 연결할 시스템을 선택하여 주십시오.');
            foreach($Sites as $key => $arr) {
                print_line('    '.$key.') '.$arr['name']);
            }

            input('번호를 입력하여 주십시오 : ',$site);
            if(!$site) {
                print_line('종료');
                return;
            }
            if(!array_key_exists($site,$Sites)) {
                print_line('해당하는 번호가 없습니다.');
                continue;
            } else {
                $flag = true;
            }
        } while(!$flag);

        input('3단계) 해당 기관의 OID를 입력하여 주십시오. : ',$oid);
        if(!$oid) {
            print_line('종료');
            return;
        }

        input('4단계) 해당 기관의 HOST를 입력하여 주십시오.(ex : XXXX.'.$Sites[$site]['domain'].') : ',$host);
        if(!$host) {
            print_line('종료');
            return;
        }
        
        input('5단계) '.$domain.' 을 '.$Sites[$site]['name'].'(OID : '.$oid.')에 연결하시겠습니까?(y/n)',$confirm);
        if(strtolower($confirm) != 'y') {
            print_line('종료');
            return;
        }
        
        $named_file = $named_dir.$Sites[$site]['file'];
        $zone_file = $zone_dir.$domain.'.zone';
        $httpd_file = $httpd_dir.$Sites[$site]['file'];

        $named_conf = "\r\n".'zone "'.$domain.'" IN {
        type master;
        file "'.$domain.'.zone";
};
';
        $zone_conf = '$TTL 86400
@       IN      SOA     ns.hkedu.co.kr. ('.date('Ymd').'00 3H 15M 1W 1D);
        IN      NS      ns.hkedu.co.kr.
        IN      A        58.230.162.142
www     IN      A     58.230.162.142';
        $httpd_conf = "\r\n".'<VirtualHost 58.230.162.142>
    ServerName '.$domain.'
    ServerAlias www.'.$domain.'
    DocumentRoot '.$Sites[$site]['dir'].'
</VirtualHost>
';
        savefile($named_file,$named_conf,'a');
        savefile($zone_file,$zone_conf);
        savefile($httpd_file,$httpd_conf,'a');

        switch($Sites[$site]['slink']) {
            case 'hosts':
                $link = $Sites[$site]['dir'].'/hosts/'.$domain;
                symlink($host, $link);
                break;
            case 'domains':
                $link = $Sites[$site]['dir'].'/domains/'.$domain;
                symlink('../hosts/'.$host, $link);
                break;
        }

        if($DB_conf = $Sites[$site]['DB']) {
            WebApp::import('DB');
            $DB = DB::Connection($DB_conf['dsn']);
            $table = $DB_conf['table'];
            $sql = 'SELECT '.$DB_conf['field'].' FROM '.$DB_conf['table'].' WHERE num_oid='.$oid;
            if($DB->sqlFetchOne($sql)) {
                print_line('기관테이블의 도메인 필드에 이미 값이 들어 있습니다. 별도로 처리하십시오.');
            } else {
                $sql = 'UPDATE '.$DB_conf['table'].' SET '.$DB_conf['field'].' = \''.$domain.'\' WHERE num_oid='.$oid;
                if(!$DB->query($sql)) {
                    print_line('DB처리 실패하였습니다. 별도로 처리하십시오.');
                    echo $DB->error['message'];
                }
                $DB->commit();
            }
        }
                        
        print_line('완료되었습니다. named 와 아파치서버를 restart 해주시기 바랍니다.');
        return;
    }

    function close() {
        exit;
    }

	function error($str='') {
		echo "Error! ".$str."\r\n";
	}


}
// }}}
?>
