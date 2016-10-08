<?php
if(!defined("__MODULE_PHP__"))
{
	define(__MODULE_PHP__, "__MODULE_PHP__" );

	$dates = date("Y-m-d");

	function writeCookie($variable_name,$variable_value,$set_time="0")
	{
		SetCookie( $variable_name, $variable_value, time()+$set_time, "/", _USER_DOMAIN );
	}

	function ErrorExpress($str)
	{
			 echo "<script>alert('$str');history.back(-1);</script>";
	}//End Function ErrorExpress

	function ErrorClose($str)
	{
			 echo "<script>alert('$str');window.close();</script>";
			 exit;
	}//End Function ErrorExpress

	function ReturnUrl($url=_URL_ROOT)
	{
		echo "<script language='javascript'>document.location.replace('$url');</script>";
	}

	function decodeVARS( $vars = NULL )
	{
		global $HTTP_POST_VARS, $HTTP_GET_VARS;
		
		
		if( !$HTTP_POST_VARS && !$HTTP_GET_VARS )
		{
			foreach( $_REQUEST as $val => $value )
			{
			//echo "$val => $value <br>";
			} 
			//ErrorExpress("페이지를 찾을 수 없습니다");
			//exit;
		}
		if( $HTTP_GET_VARS )
		{
			if( $vars )
			{
				$_original = base64_decode($vars);
				$_original = explode("&",$_original);
				for( $i=0; $i < sizeof( $_original ); $i++ )
				{
					list( $_key, $_value ) = explode("=",$_original[$i]);
					$_VARS[$_key] = $_value;
				}
			}else{
				while( list($k, $v) = each( $HTTP_GET_VARS ) )
				{
					$_VARS[$k] = $v;
				}
			}
		}
		if( $HTTP_POST_VARS )
		{
			while( list($k, $v) = each( $HTTP_POST_VARS ) )
			{
				$_VARS[$k] = $v;
			}
		}
		return $_VARS;
	}
	## 경로 검사
	function routeEfficacy( $reffer )
	{
		global $_SERVER;
		
		$errMsg = 0;
		if( strcmp( $_SERVER["HTTP_REFERER"], $reffer ))
		{
			$errMsg = "잘못된 경로로 부터의 접근입니다. 해킹은 법률상 저촉되는 행위입니다.";
		}
		if( strcmp(current(explode('/',str_replace("http://","",$_SERVER["HTTP_REFERER"]))),$_SERVER["HTTP_HOST"]) )
		{
			$errMsg = "다이렉트 접근은 허용되지 않습니다. 해킹은 법률상 저촉되는 행위입니다.";
		}
		return $errMsg;
	}

	function postReturnURL($URL=_URL_ROOT,$key_name="",$value_name="",$etc="")
	{
		//etc 는 값일 넙길 것이 더 있을경우 string으로 적어주면.. 
		echo "
			<FORM name=postForm action='$URL' method='post'>
			<input type=hidden name=$key_name value=$value_name>
			$etc
			</FORM>
			<script>document.postForm.submit();</script>
		";
	}

	function CutStrHan($tmp,$cut) 
	{
		$tmp = substr($tmp,0,$cut-2);
		$temp=0;
		if(ord(substr($tmp,$cut-3,1)) > 127) 
		{
			for($i=0; $i<$cut-2; $i++) 
			{
			if(ord(substr($tmp,$i,1))<127) 
				{
				$temp++;
				}
			}
			if(($cut % 2)!=($temp % 2)) 
			{
				$tmp=substr($tmp,0,$cut-3);
				$tmp .= "";
			}
			else 
			{ 
				$tmp .= ""; 
			}
		}
		else 
		{ 
			$tmp .= ""; 
		}
		return $tmp;
	}

	function writeConfig($var, $target,  $newStr )
	{
			$means=" = ";
			$newline = chr(10);

			$pos = strpos ( $var, $target );
			if ($pos === false)
			{
					$sumStr=';<?/*'.$newline.$target.$means.$newStr.$newline;
					$target = ";<?/*";
					$result = str_replace( ';<?/*','',$var );
					$result = $sumStr.$result;
					return $result;

			}else{
					$begPos = strpos($var, $target.$means) + strlen($target.$means);
					$endPos = strpos($var, $newline, $begPos);
					$result = substr($var, 0, $begPos);
					$result .= $newStr;
					$result .= substr($var, $endPos);
					return $result;
			}
	}
	
	function mailto($Fromname,$FromEmail,$ToEmail,$Subject,$contents,$type=NULL)
	{
		$add_header  = "From: $Fromname<${FromEmail}>\n";
		$add_header .= "Reply-To: $FromEmail\n";
		$add_header .= "Content-Type: text/html;charset=EUC-KR";

		switch($type)
		{
			case"html":
				$contents = stripslashes($contents);
				break;
			default:
				$contents = nl2br(stripslashes($contents));
		}

		mail($ToEmail,$Subject,$contents,$add_header);	
	}

	function readMailForm($HtmlFile)
	{

			Global $PushVar1,$PushVar2;

			$fp = fopen("$HtmlFile","r");

			if(!$fp) {
					echo(" Failed to open the file($HtmlFile) !! ");
				exit;
			}

			$i=0;
			while(!feof($fp)) {
					$HtmlLine[$i] = fgets($fp,10000);
				$i++;
			}

			$j=$i;


			while($j) {
			$k=0;
					while($PushVar1[$k]){
							$HtmlLine[$j] = str_replace("$PushVar1[$k]", "$PushVar2[$k]", $HtmlLine[$j]);
							$k++;
					}
					$j--;
			}
			for($j=0;$j<$i;$j++) {  $mailForm.=$HtmlLine[$j]; }
			
			return $mailForm;

			fclose($fp);

	}
	function DirectoryURL( $code )
	{
		global $_GETMENU;
		print "<font color='#OOOOOO'>▷ 메인</font>";
		for( $i=2; $i <= strlen( $code ); $i+=2 )
		{
			$looks = substr( $code, 0, $i );
			print " > ";
			if( strcmp( $i, strlen($code) ) ) print "<a href=\"javascript:iSubpage( ".$looks.", 'main1' );\">";
			print $_GETMENU[$looks][NAME];
			if( strcmp( $i, strlen($code) ) ) print "</a>";
		}
	}
}
?>
