<?
if(!$param[comment_title]) $param[comment_title] = "����";
	if(!$param[len]) $param[len] = "4000";
	if(!$param[nologin]) $param[nologin] = "n";
	

	$oid = _OID;
	$code = $param[sect];
	
	$sql = "select 
	*
	from TAB_COMMENT where  num_code = '".$code."' order by       num_group asc ,    num_step asc";	
	
	$row = $DB -> sqlFetchAll($sql);

	for($ii=0; $ii<count($row); $ii++) {
		
		//if(!$_SESSION[ADMIN]) $row[$ii]['str_ip']= substr(md5($row[$ii]['str_ip']),0,8);
		// �׳� ���̳� �����غ���...����...�̷� �밡�ڸ��� ���� ������ ������...2010-02-01.juni
		$tmpIp = explode('.', $row[$ii]['str_ip']);
		for ($jj=0;sizeof($tmpIp)-1>$jj ;$jj++ ) {
			$ExpTmpIp.= $tmpIp[$jj].".";
		}
		if(!$_SESSION[ADMIN]) $row[$ii]['str_ip']= $ExpTmpIp."*";
		$ExpTmpIp = '';

	}

	$tpl->assign(array(
	'comment_LIST'=>$row,
	'code_url'=>$code,
	));

$param['template'] = 'application/controllers/src/tpl/comment.htm';

$tpl->assign($param);
?>