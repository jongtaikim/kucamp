
<script type="text/javascript" src="/js/ajax.js"></script>
<script type="text/javascript">
	function update() {
		
		var params = '&mode=w';  

		//alert(params);
		sendRequest("/trc_alert.php", params, FromServer, "POST");
		setTimeout('update()',10000);
	}
	function FromServer() {
		if (httpRequest.readyState == 4) {
			if (httpRequest.status == 200) {
				var str_text = httpRequest.responseText;
				if(str_text > 200){
				//alert('200�� �Ѿ����ϴ�.');
				document.getElementById('vvvv').innerHTML = "��� 200�� �Ѿ���";
			
				}else{
				document.getElementById('vvvv').innerHTML = "��������";
				}

			document.getElementById('view').innerHTML = str_text;
				
			}
		}
	}
</script>

<font style="font-size:11px">�׽�Ʈ����</font>
<div style = "float:left;border:1px solid #000;width:80px;height:20;" id="view"></div>

<div style = "float:left;border:1px solid #000;color:red" id="vvvv"></div>
<script language="Javascript">
update()
</script>