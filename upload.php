<?

switch ($REQUEST_METHOD) {
	case "GET":
?>




<script src="http://mfu.innorix.com/mfu.js"></script>


<form method=post  onSubmit="return MFUSubmit(this)" enctype="multipart/form-data">



<table border="0" cellspacing="0" cellpadding="0">

<tr>
  <td width="500" height="300" style="border: 1px solid #000000;">
  <script language="JavaScript">
<!--
MFUInit(51200, 10240, 20, "98%", "100%");
document.MFU.TargetUrl = "<?=$_SERVER[HTTP_HOST]?>";
//document.MFU.ActionFilePath = "/upload3.php";
document.MFU.ShowFullPath = "FALSE";
//-->
</script>
</td>
</tr>
</table>



<input type="submit" name="" value="asdasd" class="" >
</form>




<?
	
	 break;
	case "POST":

		foreach( $_REQUEST as $val => $value )
		{
		echo "$val => $value <br>";
		} exit();
		
		
		
	 break;
	}

?>
