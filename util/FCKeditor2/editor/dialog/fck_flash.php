<?
$qs = $_GET;
$qs['timestamp'] = date('U');
foreach($qs as $key => $value) {
	if($key != 'act_attach') {
		$articleinfo[] = $key.'|'.$value;
	} else {
		$articleinfo[] = 'act|'.$value;
	}
}
$articleinfo = implode(',',$articleinfo);

unset($qs['act']);
foreach($qs as $key => $value) {
	if($key != 'act_getimage') {
		$getimage_qs[] = $key.'='.$value;
	} else {
		$_act = $value;
	}
}
$getimage_qs = '/'.$_act.'?'.implode('&',$getimage_qs);
if(!$_GET['disable_upload']) {
?><!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.0 Transitional//EN">
<html>
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
	<meta name="vs_targetSchema" content="http://schemas.microsoft.com/intellisense/ie5">
	<meta name="robots" content="noindex, nofollow">
	<script src="common/fck_dialog_common.js" type="text/javacript"></script>
	<link href="common/fck_dialog_common.css" rel="stylesheet" type="text/css" />
</head>
<body bottommargin="0" leftmargin="0" topmargin="0" rightmargin="0" bgcolor="#f7f7f7">
<table cellspacing="0" cellpadding="0" width="100%" height="100%" border="0">
	<tr>
		<script language=JavaScript id="getDynScript" src=""></script>
		<script language=JavaScript>
		<!--
		function sel_toggle() {
			document.getElementById('xEditFileCtrl').ToggleCheck();
		}
		function sel_all() {
			document.getElementById('xEditFileCtrl').CheckAll(1);
			document.getElementById('xEditFileCtrl').focus();
		}
		function unsel_all() {
			document.getElementById('xEditFileCtrl').CheckAll(0);
		}
		function do_download() {
			document.getElementById('xEditFileCtrl').DownLoad();
		}
		function remove_file() {
			document.getElementById('xEditFileCtrl').BtnRemoveFile();
		}

		var f_add_file;
		function add_file() {
			if(f_add_file) {
				sel_all();
				remove_file();
			}
			document.getElementById('xEditFileCtrl').BtnAddFile();
			sel_all();
			f_add_file = true;
		}

		function uploadFile() {
			document.getElementById('xEditFileCtrl').UpLoad();
		}
		// -->
		</script> 
		<script language="javascript" event="UploadCompleted(filelist)" for="xEditFileCtrl">
		<!--
		document.getElementById('getDynScript').src = '<?=$getimage_qs?>';
		//-->
		</script>
		<form id="frmUpload2" enctype="multipart/form-data" method="post" target="UploadWindow">
		<td><!-- <span fckLang="DlgImgUpload">¾÷·Îµå</span><br> -->
			<table cellpadding="0" cellspacing="0" border="0" width="100%" height="100%" ID="Table5-2"><tr>
				<td>
					<table cellpadding="0" cellspacing="0" border="0" style="border:2px inset;">
					<tr>	
						<td>
							<object
							type="application/x-oleobject"
							codebase="/util/xEditFile/xEditFile.cab#version=1,0,0,6"
							id="xEditFileCtrl"
							classid="CLSID:F6D408E8-B0D0-4E39-938D-6E5D9FFDE932"
							width="180" height="16" style="background-color:#FFFFFF;">
							<param name="AlignVertical" value="FALSE">
							<param name="AllowedFileType" value="swf,flv">
							<param name="ArticleInfo" value="<?=$articleinfo?>">
							<param name="BackgroundColor" value="#FFFFFF">
							<param name="BufferSize" value="40960">
							<param name="DeniedFileType" value="">
							<param name="FnWidth" value="180">
							<param name="FsHeight" value="16">
							<param name="HideScrollbar" value="FALSE">
							<param name="ListStyle" value="1">
							<param name="MaxFileNum" value="1">
							<param name="MaxFileSize" value="5242880">
							<param name="ServerAddr" value="<?=$_GET['FILE_HOST']?>">
							<param name="ServerPort" value="80">
							<param name="ServerScript" value="/index.php">
							<param name="ShowBorder" value="FALSE">
							<param name="ShowGrid" value="TRUE">
							<param name="TextColor" value="black">
							<param name="UploadMode" value="TRUE">
							</object></td>
					</tr>
					</table>
				</td>
				<td>&nbsp;
					<input id="btnUpload" type="button" fckLang="DlgImgFind" value="Find" style="font-family: 'Microsoft Sans Serif' , Tahoma, Arial, Verdana, Sans-Serif;font-size:9pt;width:70px;height:22px;" onclick="add_file();" NAME="btnUpload">
					<input id="btnUpload2" type="button" fckLang="DlgImgBtnUpload" value="Upload" style="font-family: 'Microsoft Sans Serif' , Tahoma, Arial, Verdana, Sans-Serif;font-size:9pt;width:70px;height:22px;" onclick="uploadFile();" NAME="btnUpload2">
				</td>
			</tr>
			</table>
		</td>
		</form>
	</tr>
</table>
</body>
<script>
	var oEditor		= parent.oEditor ;
	oEditor.FCKLanguageManager.TranslatePage(document) ;
</script>
</html>
<?
} else {
?><!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.0 Transitional//EN">
<html>
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
	<meta name="vs_targetSchema" content="http://schemas.microsoft.com/intellisense/ie5">
	<meta name="robots" content="noindex, nofollow">
	<script src="common/fck_dialog_common.js" type="text/javascript"></script>
	<link href="common/fck_dialog_common.css" rel="stylesheet" type="text/css" />
</head>
<body bottommargin="0" leftmargin="0" topmargin="0" rightmargin="0" bgcolor="#F1F1E3">
	<table width="100%" height="100%">
	<tr>
		<td style="font-size:9pt;" align="center"><span fckLang="DlgFlashDisableUpload">Upload Disabled</span></td>
	</tr>
	</table>
</body>
<script>
	var oEditor		= parent.oEditor ;
	oEditor.FCKLanguageManager.TranslatePage(document) ;
</script>
</html>
<?
}
?>