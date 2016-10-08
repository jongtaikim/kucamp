<?php
/* vim: set expandtab tabstop=4 shiftwidth=4 foldmethod=marker: */
/**
* 작성일: 2010-01-14
* 작성자: 김종태
* 설   명: MYSQL 클래스
*****************************************************************
* 
*/
class DB_2 {
	var $conn;
	var $error;
	var $bindObj;
	var $config = array(
		'array_key_case' => CASE_LOWER 
	);


	function DB_2($dsn='default') {
		$thisObj = &$this;
		$thisObj = (object)DB_2::dsn($dsn);
		$this->bindObj = $thisObj;
	}

	function __call($method,$args) {
		if (is_object($this->bindObj)) {
			$_CLASS = $this->bindObj;
			return call_user_func_array(array(&$_CLASS,$method),$args);
		}
	}

	function __get($varname) {
		switch ($varname) {
			case 'error':
				return $this->bindObj->error;
		}
	}

	function dsn($conf) {
		global $info;
		$ret = &DB_2::singleton($info['dbms'],$info['host'],$info['user'],$info['pass'],$info['db']);
		return $ret;
	}

	function Connection($dsn) {
	 	global $info;
		$info['db'] = substr($info['path'],1);
		$ret = &DB_2::singleton($info['scheme'],$info['host'],$info['user'],$info['pass'],$info['db']);
		return $ret;
	}


	function &singleton($scheme,$host,$user,$pass,$db) {
		static $instance,$info;
		$signature = serialize(array($scheme, $host, $user, $pass, $db));
		
		$class = 'DB_2_'.$scheme;
		
		if (is_object($instance[$signature])) {
			return $instance[$signature];
		} else {
			//require_once $_SERVER["DOCUMENT_ROOT"]."/lib/DB_2/$scheme.php";
			$instance[$signature] = &new $class($host,$user,$pass,$db);
			return $instance[$signature];
		}
	}



	function fetchOne($result=null,$offset=0,$length=1) {
		if ($result == null) $result = &$this->result;
		$data = $this->fetch($result);
		if (is_array($data)) $ret = array_slice($data,$offset,$length);
		else return;
		if (count($ret) < 2) {	// 결과값이 하나일경우 array가 아닌 스칼라값으로..
			$ret = array_values($ret);
			$ret = $ret[0];
		}
		return $ret;
	}

	function fetchAll() {
		$ret = array();
		while ($ret[] = $this->fetch());
		array_pop($ret);
		return $ret;
	}

	//==-- Automate --==//
	/**
	* deprecated
	*/
	function sqlQuery($sql) {

		return $this->query($sql);
	}

	function sqlFetch($sql) {
		if ($this->query($sql)) return $this->fetch();
	}

	/**
	* deprecated
	*/
	function sqlFetchArray($sql) {
		if ($this->query($sql)) return $this->fetch();
	}

	function sqlFetchAll($sql,$mode=DB_2_ASSOC) {
		if ($this->query($sql)) return $this->fetchAll($mode);
	}

	/**
	* deprecated
	*/
	function sqlDataArray($sql,$mode=DB_2_ASSOC) {
		return $this->sqlFetchAll($sql,$mode);
	}

	function sqlFetchOne($sql,$offset=0,$length=1) {
		if ($result = $this->query($sql)) return $this->fetchOne($result,$offset,$length);
	}

	/**
	* deprecated
	*/
	function sqlResult($sql,$offset=0,$length=1) {
		return $this->sqlFetchOne($sql,$offset,$length);
	}
	//==-- --==//
	// {{{ 쿼리 자동화
	function insertQuery($table,$data) {
		if (is_array($data)) {
			foreach ($data as $key=>$val) $item[$key] = $this->quote($val);
		}
		if (count($item)) {
			$columns = implode(', ',array_keys($item));
			$values = implode(', ',array_values($item));
			$query = "INSERT INTO $table ($columns) VALUES ($values)";
			//echo $query."<br>";
			return $this->sqlQuery($query);
		}
	}

	function updateQuery($table,$data,$cond) {
		if (is_array($data)) {
			foreach ($data as $key=>$val) $item[$key] = $this->quote($val);
		}
		if (count($item)) {
			$str = array();
			foreach ($item as $key=>$val) {
				$str[] = $key."=".$item[$key];
			}
			$query = "UPDATE $table SET ".implode(', ',$str)." WHERE $cond";
			return $this->sqlQuery($query);
		}
	}

	function quote($value) {
		return "'".$value."'";
	}


	function sqlsafe($query) {
		$parts = split("[ \t\n]+",strtoupper(trim($query)));
		$cmd = $parts[0];
		if ($cmd == 'UPDATE' || $cmd == 'DELETE') {
			if (!in_array('WHERE',$parts)) {
				echo "SQL경고: WHERE 절이 필요합니다.<br>$query";
				return;
			}
		}
		return true;
	}
	// }}}
}



class DB_2_Mysql extends DB_2 {

	var $dbname;
	var $result;
	var $config = array(
		'array_key_case'	=>	CASE_LOWER,
		'fetch_mode'		=>	MYSQL_ASSOC,
		'character_encoding' => 'euckr'
	);

	function DB_2_Mysql($host='localhost',$user='',$pass='',$db='') {
		
		if ($host && $user && $db) {
			$this->connect($host,$user,$pass);
			$this->_selectDB_2($db);
		}
	}

	function connect($host,$user,$pass) {
		if(!$this->conn = mysql_connect($host,$user,$pass)) {
			$this->error = "DB_2 Connection Error";
			return false;
		} else {
			$this->query("set names {$this->config['character_encoding']}");
			return true;
		}
	}

	function _selectDB_2($dbname='') {
		if ($dbname) $this->dbname = $dbname;
		if(!mysql_select_db($this->dbname, $this->conn))
			return $this->sqlError();
		else 
			return true;
	}

	function query($sql) {
		if ($this->result = mysql_query($sql,$this->conn)) {
			return true;
		} else {
			$this->error = mysql_error();
			return false;
		}
	}

	function fetch($mode=MYSQL_ASSOC) {
		$row = mysql_fetch_array($this->result,$mode);
		return @array_change_key_case($row,$this->config['array_key_case']);
	}


	function sqlFetch($sql) {
		
		$row = mysql_fetch_array(mysql_query($sql));
		return @array_change_key_case($row,$this->config['array_key_case']);
	}


	function close() {
		if(mysql_close($this->conn)) {
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
}

?>
