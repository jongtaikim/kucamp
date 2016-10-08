<?php
/**********************************************
* ���ϸ�: DB/mysql.php
* ��  ��: MySQL DB Ŭ����, WebApp ��
* ��  ¥: 2010-01-14
* �ۼ���: ��ģ���� (comfuture@maniacamp.com) 
* ������: ������

***********************************************/

require_once dirname(__FILE__)."/../class.DB.php";

class DB_Mysql extends DB {

	var $dbname;
	var $result;

	
	var $user_d;
	var $pass_d;
	var $db_d;
	
	var $config = array(
		'array_key_case'	=>	CASE_LOWER,
		'fetch_mode'		=>	MYSQL_ASSOC,
		'character_encoding' => 'euckr'
	);

	function DB_Mysql($host='localhost',$user='',$pass='',$db='') {
		if ($host && $user && $db) {
			$this->user_d = $user;
			$this->pass_d = $pass;
			$this->db_d = $db;

			$this->connect($host,$user,$pass);
			$this->_selectDB($db);
		}
	}

	function connect($host,$user,$pass) {
		if(!$this->conn = mysql_connect($host,$user,$pass)) {
			$this->error = "DB Connection Error";
			return false;
		} else {
			$this->query("set names {$this->config['character_encoding']}");
			return true;
		}
	}

	function _selectDB($dbname='') {
		if ($dbname) $this->dbname = $dbname;
		if(!@mysql_select_db($this->dbname, $this->conn))
			return $this->sqlError();
		else 
			return true;
	}

	function query($sql) {
		if ($this->result = @mysql_query($sql,$this->conn)) {
			return true;
		} else {
			$this->error = @mysql_error();
			return false;
		}
	}

	function fetch($mode=MYSQL_ASSOC) {
		$row = @mysql_fetch_array($this->result,$mode);
		return @array_change_key_case($row,$this->config['array_key_case']);
	}


	function sqlFetch($sql) {
		
		$row = mysql_fetch_array(mysql_query($sql));
		return array_change_key_case($row,$this->config['array_key_case']);
	}


	function close() {
		if(@mysql_close($this->conn)) {
			return;
		}	else {
			return $this->sqlError();
		}
	}

	function sqlError() {
		$this->error = mysql_error();
		return false;
	}

		function commit() {
		// $this->close();


		}

	function backup_mysql($date){
	if(!$date) $date = date("Ymd");
	if(!is_file(_DOC_ROOT."/db_backup/".$this->db_d.".".$date.".sql")){
	 echo "mysqldump -u".$this->user_d ." -p".$this->pass_d ." ".$this->db_d." >"._DOC_ROOT."/db_backup/".$this->db_d.".".$date.".sql";
		if(!exec("mysqldump -u".$this->user_d ." -p".$this->pass_d ." ".$this->db_d." >"._DOC_ROOT."/db_backup/".$this->db_d.".".$date.".sql")){
			echo '<script>alert("��� ����");</script>';
			
		}
	}

	}

}

?>
