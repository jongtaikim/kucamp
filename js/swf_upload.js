function getCookie(name) { 
	var Found = false 
	var start, end 
	var i = 0 

	while(i <= document.cookie.length) { 
		start = i 
		end = start + name.length 

		if(document.cookie.substring(start, end) == name) { 
			Found = true 
			break 
		} 
		i++ 
	} 
	 
	if(Found == true) { 
		start = end + 1 
		end = document.cookie.indexOf(";", start) 
		if(end < start) 
		end = document.cookie.length 
		return document.cookie.substring(start, end) 
	} 
	return "" 
}

function makeSwfSingleUpload(){
	if(wmode == '1' ){
		var wmode_str1 = "";
		var wmode_str2 = "";
	}else{
		var wmode_str1 = "<param name='wmode' value='transparent' />";
		var wmode_str2 = "wmode='transparent'";
	}
	var flashvars = "flash_width="+flash_width+"&amp;";
	flashvars += "limit_size="+limit_size+"&amp;";
	flashvars += "file_type_name="+file_type_name+"&amp;";
	flashvars += "allow_filetype="+allow_filetype+"&amp;";
	flashvars += "deny_filetype="+deny_filetype+"&amp;";
	flashvars += "upload_exe="+upload_exe+"&amp;";
	flashvars += "upload_id="+movie_id+"&amp;";
	flashvars += "browser_id="+getCookie("PHPSESSID"); // FF���� upload.php���� ������ PHPSESSID�� �ο��ϹǷ� ������ ������ ��.

	var flashStr = "<object classid='clsid:d27cdb6e-ae6d-11cf-96b8-444553540000'";
	flashStr += "codebase='http://fpdownload.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=8,0,0,0'";
	flashStr += "width='"+flash_width+"' height='50' align='middle' id='"+movie_id+"' method='single_upload'>";
	flashStr += "<param name='allowScriptAccess' value='sameDomain' />";
	flashStr += "<param name='movie' value='single_upload.swf' />";
	flashStr += "<param name='quality' value='high' />";
	flashStr += "<param name='bgcolor' value='#ffffff' />";
	flashStr += "<param name='flashvars' value='"+flashvars+"' />";
	flashStr += wmode_str1;
	flashStr += "<embed src='single_upload.swf' width='"+flash_width+"' height='50' quality='high'";
	flashStr += "bgcolor='#ffffff' name='"+movie_id+"' align='middle' "+wmode_str2+" allowScriptAccess='sameDomain' type='application/x-shockwave-flash'";
	flashStr += "pluginspage='http://www.macromedia.com/go/getflashplayer' flashvars='"+flashvars+"' />";
	flashStr += "</object>";
	document.write(flashStr); 
}

function makeSwfSingleUpload2(){
	if(wmode == '1'){
		var wmode_str1 = "";
		var wmode_str2 = "";
	}else{
		var wmode_str1 = "<param name='wmode' value='transparent' />";
		var wmode_str2 = "wmode='transparent'";
	}
	var flashvars = "flash_width="+flash_width+"&amp;";
	flashvars += "modify_files="+modify_files+"&amp;";
	flashvars += "modify_filesize="+modify_filesize+"&amp;";
	flashvars += "limit_size="+limit_size+"&amp;";
	flashvars += "file_type_name="+file_type_name+"&amp;";
	flashvars += "allow_filetype="+allow_filetype+"&amp;";
	flashvars += "deny_filetype="+deny_filetype+"&amp;";
	flashvars += "upload_exe="+upload_exe+"&amp;";
	flashvars += "upload_id="+movie_id+"&amp;";
	flashvars += "browser_id="+getCookie("PHPSESSID"); // FF���� upload.php���� ������ PHPSESSID�� �ο��ϹǷ� ������ ������ ��. <param name=\"wmode\" value=\"transparent\" 

	var flashStr = "<object classid='clsid:d27cdb6e-ae6d-11cf-96b8-444553540000'";
	flashStr += "codebase='http://fpdownload.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=8,0,0,0'";
	flashStr += "width='"+flash_width+"' height='50' align='middle' id='"+movie_id+"' method='single_upload'>";
	flashStr += "<param name='allowScriptAccess' value='sameDomain' />";
	flashStr += "<param name='movie' value='single_upload2.swf' />";
	flashStr += "<param name='quality' value='high' />";
	flashStr += "<param name='bgcolor' value='#ffffff' />";
	flashStr += "<param name='flashvars' value='"+flashvars+"' />";
	flashStr += wmode_str1;
	flashStr += "<embed src='single_upload2.swf' width='"+flash_width+"' height='50' quality='high'";
	flashStr += "bgcolor='#ffffff' name='"+movie_id+"' align='middle' "+wmode_str2+" allowScriptAccess='sameDomain' type='application/x-shockwave-flash'";
	flashStr += "pluginspage='http://www.macromedia.com/go/getflashplayer' flashvars='"+flashvars+"' />";
	flashStr += "</object>";
	document.write(flashStr); 
}

function makeSwfMultiUpload(){
	if(wmode == '1'){
		var wmode_str1 = "";
		var wmode_str2 = "";
	}else{
		var wmode_str1 = "<param name='wmode' value='transparent' />";
		var wmode_str2 = "wmode='transparent'";
	}
	var flashvars = "flash_width="+flash_width+"&amp;";
	flashvars += "list_rows="+list_rows+"&amp;";
	flashvars += "limit_size="+limit_size+"&amp;";
	flashvars += "limit_total="+limit_total+"&amp;";
	flashvars += "file_type_name="+file_type_name+"&amp;";
	flashvars += "allow_filetype="+allow_filetype+"&amp;";
	flashvars += "deny_filetype="+deny_filetype+"&amp;";
	flashvars += "upload_exe="+upload_exe+"&amp;";
	flashvars += "upload_id="+movie_id+"&amp;";
	flashvars += "browser_id="+getCookie("PHPSESSID"); // FF���� upload.php���� ������ PHPSESSID�� �ο��ϹǷ� ������ ������ ��.

	var flashStr = "<object classid='clsid:d27cdb6e-ae6d-11cf-96b8-444553540000'";
	flashStr += "codebase='http://fpdownload.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=8,0,0,0'";
	flashStr += "width='"+flash_width+"' height='"+parseInt(list_rows*20+25,10)+"' align='middle' id='"+movie_id+"' method='multi_upload'>";
	flashStr += "<param name='allowScriptAccess' value='sameDomain' />";
	flashStr += "<param name='movie' value='multi_upload.swf' />";
	flashStr += "<param name='quality' value='high' />";
	flashStr += "<param name='bgcolor' value='#ffffff' />";
	flashStr += "<param name='flashvars' value='"+flashvars+"' />";
	flashStr += wmode_str1;
	flashStr += "<embed src='multi_upload.swf' width='"+flash_width+"' height='"+parseInt(list_rows*20+25,10)+"' quality='high'";
	flashStr += "bgcolor='#ffffff' name='"+movie_id+"' align='middle' "+wmode_str2+" allowScriptAccess='sameDomain' type='application/x-shockwave-flash'";
	flashStr += "pluginspage='http://www.macromedia.com/go/getflashplayer' flashvars='"+flashvars+"' />";
	flashStr += "</object>";
	document.write(flashStr); 
}

function makeSwfMultiUpload2(){
	if(wmode == '1'){
		var wmode_str1 = "";
		var wmode_str2 = "";
	}else{
		var wmode_str1 = "<param name='wmode' value='transparent' />";
		var wmode_str2 = "wmode='transparent'";
	}
	var flashvars = "flash_width="+flash_width+"&amp;";
	flashvars += "list_rows="+list_rows+"&amp;";
	flashvars += "limit_size="+limit_size+"&amp;";
	flashvars += "limit_total="+limit_total+"&amp;";
	flashvars += "file_type_name="+file_type_name+"&amp;";
	flashvars += "allow_filetype="+allow_filetype+"&amp;";
	flashvars += "deny_filetype="+deny_filetype+"&amp;";
	flashvars += "upload_exe="+upload_exe+"&amp;";
	flashvars += "upload_id="+movie_id+"&amp;";
	flashvars += "browser_id="+getCookie("PHPSESSID"); // FF���� upload.php���� ������ PHPSESSID�� �ο��ϹǷ� ������ ������ ��.

	var flashStr = "<object classid='clsid:d27cdb6e-ae6d-11cf-96b8-444553540000'";
	flashStr += "codebase='http://fpdownload.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=8,0,0,0'";
	flashStr += "width='"+flash_width+"' height='"+parseInt(list_rows*20+25,10)+"' align='middle' id='"+movie_id+"' method='multi_upload'>";
	flashStr += "<param name='allowScriptAccess' value='sameDomain' />";
	flashStr += "<param name='movie' value='multi_upload2.swf' />";
	flashStr += "<param name='quality' value='high' />";
	flashStr += "<param name='bgcolor' value='#ffffff' />";
	flashStr += "<param name='flashvars' value='"+flashvars+"' />";
	flashStr += wmode_str1;
	flashStr += "<embed src='multi_upload2.swf' width='"+flash_width+"' height='"+parseInt(list_rows*20+25,10)+"' quality='high'";
	flashStr += "bgcolor='#ffffff' name='"+movie_id+"' align='middle' "+wmode_str2+" allowScriptAccess='sameDomain' type='application/x-shockwave-flash'";
	flashStr += "pluginspage='http://www.macromedia.com/go/getflashplayer' flashvars='"+flashvars+"' />";
	flashStr += "</object>";
	document.write(flashStr); 
}

function makeSwfMultiUpload3(){
	if(wmode == '1'){
		var wmode_str1 = "";
		var wmode_str2 = "";
	}else{
		var wmode_str1 = "<param name='wmode' value='transparent' />";
		var wmode_str2 = "wmode='transparent'";
	}
	var flashvars = "flash_width="+flash_width+"&amp;";
	flashvars += "list_rows="+list_rows+"&amp;";
	flashvars += "limit_size="+limit_size+"&amp;";
	flashvars += "limit_total="+limit_total+"&amp;";
	flashvars += "order_num="+order_num+"&amp;";
	flashvars += "file_type_name="+file_type_name+"&amp;";
	flashvars += "allow_filetype="+allow_filetype+"&amp;";
	flashvars += "deny_filetype="+deny_filetype+"&amp;";
	flashvars += "modify_files="+modify_files+"&amp;";
	flashvars += "modify_filesize="+modify_filesize+"&amp;";
	flashvars += "modify_fileidx="+modify_fileidx+"&amp;";
	flashvars += "upload_exe="+upload_exe+"&amp;";
	flashvars += "upload_id="+movie_id+"&amp;";
	flashvars += "browser_id="+getCookie("PHPSESSID"); // FF���� upload.php���� ������ PHPSESSID�� �ο��ϹǷ� ������ ������ ��.

	var flashStr = "<object classid='clsid:d27cdb6e-ae6d-11cf-96b8-444553540000'";
	flashStr += "codebase='http://fpdownload.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=8,0,0,0'";
	flashStr += "width='"+flash_width+"' height='"+parseInt(list_rows*20+25,10)+"' align='middle' id='"+movie_id+"' method='multi_upload'>";
	flashStr += "<param name='allowScriptAccess' value='sameDomain' />";
	flashStr += "<param name='movie' value='multi_upload3.swf' />";
	flashStr += "<param name='quality' value='high' />";
	flashStr += "<param name='bgcolor' value='#ffffff' />";
	flashStr += "<param name='flashvars' value='"+flashvars+"' />";
	flashStr += wmode_str1;
	flashStr += "<embed src='multi_upload3.swf' width='"+flash_width+"' height='"+parseInt(list_rows*20+25,10)+"' quality='high'";
	flashStr += "bgcolor='#ffffff' name='"+movie_id+"' align='middle' "+wmode_str2+" allowScriptAccess='sameDomain' type='application/x-shockwave-flash'";
	flashStr += "pluginspage='http://www.macromedia.com/go/getflashplayer' flashvars='"+flashvars+"' />";
	flashStr += "</object>";
	document.write(flashStr); 
}

function callSwfUpload(){ //�÷��� ���� ����Ʈ�� �߰��� ������ ����
	arrMovie = new Array()
	var arr_num = 0;
	var objectTags = document.getElementsByTagName('object');
	var movie;
	for (i = 0; i < objectTags.length; i++ ) {
		if(objectTags[i].getAttribute("method")=="single_upload" || objectTags[i].getAttribute("method")=="multi_upload"){
			if(document.getElementsByName(objectTags[i].getAttribute("id"))[0]) {
				movie = document.getElementsByName(objectTags[i].getAttribute("id"))[0];
			}else{
				movie = document.getElementById(objectTags[i].getAttribute("id"));
			}			
			if(movie.GetVariable("totalSize")>0){				
				arrMovie[arr_num] = movie;
				arr_num++;
			}
		}
	}

	if(arrMovie.length>0){
		if(arrMovie[0].getAttribute("method")=="single_upload" || arrMovie[0].parentNode.getAttribute("method")=="single_upload") arrMovie[0].height = 70;
		if(arrMovie[0].getAttribute("method")=="multi_upload" || arrMovie[0].parentNode.getAttribute("method")=="multi_upload") arrMovie[0].height = parseInt(20*arrMovie[0].GetVariable("listRows")+25+45,10);
		arrMovie[0].SetVariable( "startUpload", "" );
		arr_mov = 0;
	}else{
		document.forms['formName'].submit();
	}	
}



function swfUploadComplete(){	
	arr_mov++;
	if(arrMovie.length>arr_mov){
		if(arrMovie[arr_mov].getAttribute("method")=="single_upload" || arrMovie[arr_mov].parentNode.getAttribute("method")=="single_upload") arrMovie[arr_mov].height = 70;
		if(arrMovie[arr_mov].getAttribute("method")=="multi_upload" || arrMovie[arr_mov].parentNode.getAttribute("method")=="multi_upload") arrMovie[arr_mov].height = parseInt(20*arrMovie[arr_mov].GetVariable("listRows")+25+45,10);
		arrMovie[arr_mov].SetVariable( "startUpload", "" );
	}else{
		document.forms['formName'].submit();
	}	
}

function fileTypeError( notAllowFileType ){ //������� ���� ������ ������ ��� ���� �޽��� ���
	alert("Ȯ���ڰ� " + notAllowFileType + "�� ���ϵ��� ���ε� �� �� �����ϴ�.");
}

function overSize( limitSize ){ //������ �ʰ��� �����޼��� ���
	alert("������ ������ ũ�Ⱑ " + limitSize + "�� �ʰ��߽��ϴ�.");
}

function versionError(){ //�÷��� ������ 8 �̸��� ��� ���� �޽��� ���
	alert("�÷��� ������ ���� �ʽ��ϴ�. �ֽŹ������� ��ġ�� �ּ���.\n�̹� ��ġ�Ͻ� ���� �������� ���� �ݰ� �ٽ� �����ϼ���.");
}

function httpError(){ //http ���� �߻��� ��� �޽���
	alert("��Ʈ��ũ ������ �߻��Ͽ����ϴ�. �����ڿ��� �����ϼ���.");
}

function ioError(){ //���� ����� ���� �߻��� ��� �޽���
	alert("����� ������ �߻��Ͽ����ϴ�.\n �ٸ� ���α׷����� �� ������ ��������� Ȯ���ϼ���.");
}

function onSecurityError(){ //���� ����� ���� �߻��� ��� �޽���
	alert("���� ������ �߻��Ͽ����ϴ�. �����ڿ��� �����ϼ���.");
}

function overTotal( limitTotal ){ //������� ���� ������ ������ ��� ���� �޽��� ���
	alert("������ ������ " + limitTotal + "���� �ʰ��߽��ϴ�.");
}

function make_order(targetId, arg)
{
	document.getElementById(targetId).value = arg;
}

// �÷����� �ö� �����߿� 
function getSwfFileExist(id)
{
	var movie; 
	if(document.getElementsByName(id)) {
		movie = document.getElementsByName(id)[0];
	}else{
		movie = document.getElementById(id);
	}
	if(movie.GetVariable("vitualSize")>0){
		return true;
	}else{
		return false;
	}
}

function getSwfFileExist2(id)
{
	var movie; 
	if(document.getElementsByName(id)) {
		movie = document.getElementsByName(id)[0];
	}else{
		movie = document.getElementById(id);
	}
	document.getElementById("modi_"+id).value = movie.GetVariable("totalSize");

}