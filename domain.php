#!/usr/local/php/bin/php
<?php
/* vim: set expandtab tabstop=4 shiftwidth=4 foldmethod=marker bg=dark: */
/**
* ���ϸ�: domain.php
* �ۼ���: 2006-07-06
* �ۼ���: �̹���
* ��  ��: �ֿܼ�
*****************************************************************
* 
*/
$USER = getenv('USER');
//if($USER != 'root') die('root user ������ �ʿ��մϴ�.');

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
��ɾ�
    domain : �������߰�
    sole_add : ����Ȩ������ �߰��� ���� ����ġ conf ������ó��
    close : ����
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
                'name' => '�ϸ�Ʈ',
                'dir' => '/www/bookmart',
                'file' => 'bookmart.conf',
                'slink' => 'hosts',
                'domain' => '.bookmart.net',
                'DB' => array(
                    'dsn' => 'oracle://bookmart:bookmart0673@211.214.160.241/ewut',
                    'table' => 'TAB_ORGAN',
                    'field' => 'str_extra_url')),
            2 => array(
                'name' => '����õ �������',
                'dir' => '/www/hak1000',
                'file' => 'hak1000.conf',
                'slink' => 'domains',
                'domain' => '.ezgrape.com',
                'DB' => array(
                    'dsn' => 'oracle://hak1000:hak10000673@211.214.160.241/ewut',
                    'table' => 'TAB_ORGAN',
                    'field' => 'str_domain')),
            3 => array(
                'name' => '�ѱ���������',
                'dir' => '/www/isch',
                'file' => 'isch.conf',
                'slink' => 'domains',
                'domain' => '.hkedu.co.kr',
                'DB' => array(
                    'dsn' => 'oracle://sys:cis9505@211.214.160.99:1521/ewut',
                    'table' => 'TAB_ORGAN',
                    'field' => 'str_domain')),
            4 => array(
                'name' => '����Ȩ������',
                'dir' => '/www/sole',
                'file' => 'sole.conf',
                'slink' => 'domains',
                'domain' => '.kangsa.net',
                'DB' => array(
                    'dsn' => 'oracle://sole:sole0673@211.214.160.241/ewut',
                    'table' => 'TAB_ORGAN',
                    'field' => 'str_domain')),
            5 => array(
                'name' => '����Ȩ������',
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
            

        print_line('1�ܰ�) �������� �Է��Ͽ� �ֽʽÿ�.');
        input('������(http �� www ����) : ',$domain);
        if(!$domain) {
            print_line('����');
            return;
        } elseif(is_file($zone_dir.$domain.'.zone')) {
            print_line('zone ������ �����մϴ�. �̹� ��ϵ� �������Դϴ�.');
            return;
        }
        
        $flag = false;
        do {
            print_line('2�ܰ�) ������ �ý����� �����Ͽ� �ֽʽÿ�.');
            foreach($Sites as $key => $arr) {
                print_line('    '.$key.') '.$arr['name']);
            }

            input('��ȣ�� �Է��Ͽ� �ֽʽÿ� : ',$site);
            if(!$site) {
                print_line('����');
                return;
            }
            if(!array_key_exists($site,$Sites)) {
                print_line('�ش��ϴ� ��ȣ�� �����ϴ�.');
                continue;
            } else {
                $flag = true;
            }
        } while(!$flag);

        input('3�ܰ�) �ش� ����� OID�� �Է��Ͽ� �ֽʽÿ�. : ',$oid);
        if(!$oid) {
            print_line('����');
            return;
        }

        input('4�ܰ�) �ش� ����� HOST�� �Է��Ͽ� �ֽʽÿ�.(ex : XXXX.'.$Sites[$site]['domain'].') : ',$host);
        if(!$host) {
            print_line('����');
            return;
        }
        
        input('5�ܰ�) '.$domain.' �� '.$Sites[$site]['name'].'(OID : '.$oid.')�� �����Ͻðڽ��ϱ�?(y/n)',$confirm);
        if(strtolower($confirm) != 'y') {
            print_line('����');
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
                print_line('������̺��� ������ �ʵ忡 �̹� ���� ��� �ֽ��ϴ�. ������ ó���Ͻʽÿ�.');
            } else {
                $sql = 'UPDATE '.$DB_conf['table'].' SET '.$DB_conf['field'].' = \''.$domain.'\' WHERE num_oid='.$oid;
                if(!$DB->query($sql)) {
                    print_line('DBó�� �����Ͽ����ϴ�. ������ ó���Ͻʽÿ�.');
                    echo $DB->error['message'];
                }
                $DB->commit();
            }
        }
                        
        print_line('�Ϸ�Ǿ����ϴ�. named �� ����ġ������ restart ���ֽñ� �ٶ��ϴ�.');
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
