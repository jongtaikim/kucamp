<?
/* vim: set expandtab tabstop=4 shiftwidth=4 foldmethod=marker: */
/**
* 작성일: 2009-10-22
* 작성자: 김종태
* 설   명: Curl 클래스
*****************************************************************
* 
*/

class Curl 
{
	var $cookie;
	var $url;
	var $post;
	var $referer;
	var $headers;
	var $curl_error;
	function curl_login($url1,$tmp_file,$ref_url)
	{
		$ch = curl_init();
		//echo $this-> cookie."<br>";
		

		if($url1){
		
		curl_setopt($ch, CURLOPT_URL, $url1);
		curl_setopt($ch, CURLOPT_COOKIEJAR, $this->cookie);
		curl_setopt($ch, CURLOPT_COOKIEFILE, $this->cookie);
	
		curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
		//curl_setopt($ch, CURLOPT_FOLLOWLOCATION, 1);	
		curl_setopt($ch, CURLOPT_REFERER, $this->referer);
		curl_setopt($ch, CURLOPT_POST, 1);
		curl_setopt($ch, CURLOPT_POSTFIELDS, $this->post);
	
		ob_start();      // prevent any output
		curl_exec ($ch); // execute the curl command
		ob_end_clean();
		
		}


		
		
		if($tmp_file){
		
			if($ref_url){
				curl_setopt($ch, CURLOPT_URL, $ref_url);
				curl_setopt($ch, CURLOPT_COOKIEJAR, $this->cookie);
				curl_setopt($ch, CURLOPT_COOKIEFILE, $this->cookie);
			
				curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
				curl_setopt($ch, CURLOPT_REFERER, $this->referer);
			
				ob_start();      // prevent any output
				curl_exec ($ch); // execute the curl command
				ob_end_clean();			
			}

		
		$fp = fopen($tmp_file, "w");
		curl_setopt($ch, CURLOPT_URL, $this->url);
		curl_setopt($ch, CURLOPT_REFERER, $this->referer);
		curl_setopt($ch, CURLOPT_COOKIEJAR, $this->cookie);
		curl_setopt($ch, CURLOPT_COOKIEFILE, $this->cookie);
		curl_setopt($ch, CURLOPT_FILE, $fp);
		ob_start(); 
		curl_exec ($ch); // execute the curl command
		ob_end_clean();  // stop preventing output
		curl_close($ch);
		fclose($fp);
		flush();
	
		
		}else{


		curl_setopt($ch, CURLOPT_URL, $this->url);
		curl_setopt($ch, CURLOPT_COOKIEJAR, $this->cookie);
		curl_setopt($ch, CURLOPT_COOKIEFILE, $this->cookie);
		curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
		curl_setopt($ch, CURLOPT_FOLLOWLOCATION, 1);	
		if( !empty( $this->referer ) ) {
			curl_setopt($ch, CURLOPT_REFERER, $this->referer);
		}
		curl_setopt($ch, CURLOPT_POST, 1);
		curl_setopt($ch, CURLOPT_POSTFIELDS, $this->post);


		ob_start();      // prevent any output
		$res = curl_exec ($ch); // execute the curl command
		if (!$res) { 
			$this->curl_error = curl_error($ch); 
		}
		ob_end_clean();  // stop preventing output
		curl_close($ch);
		$this->post = '';
		return $res;
		
		
		}
	}

function curl_login_02()
	{
		$ch = curl_init();
		curl_setopt($ch, CURLOPT_URL, $this->url);
		curl_setopt($ch, CURLOPT_COOKIEJAR, $this->cookie);
		curl_setopt($ch, CURLOPT_COOKIEFILE, $this->cookie);
		curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
		curl_setopt($ch, CURLOPT_FOLLOWLOCATION, 1);	
		curl_setopt($ch, CURLOPT_REFERER, $this->referer);

		curl_setopt($ch, CURLOPT_POST, 1);
		curl_setopt($ch, CURLOPT_POSTFIELDS, $this->post);


		ob_start();      // prevent any output
		$res = curl_exec ($ch); // execute the curl command
		if (!$res) { 
			$this->curl_error = curl_error($ch); 
		}
		ob_end_clean();  // stop preventing output
		curl_close($ch);
		$this->post = '';
		return $res;
		
		
		
	}

function myculr_login() {
		$ch = curl_init();
		curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, TRUE);
		curl_setopt($ch, CURLOPT_TIMEOUT, 10);
		curl_setopt ($ch, CURLOPT_HEADER, 0);
		curl_setopt($ch, CURLOPT_POST,true);
		curl_setopt($ch, CURLOPT_POSTFIELDS, $this->post);
		curl_setopt($ch, CURLOPT_FOLLOWLOCATION, 1);
		curl_setopt($ch, CURLOPT_URL,$this->url);
		curl_setopt($ch, CURLOPT_RETURNTRANSFER, TRUE);
		curl_setopt($ch, CURLOPT_COOKIEJAR, $this-> cookie); 
		curl_setopt($ch, CURLOPT_COOKIEFILE, $this-> cookie); 

		$res = curl_exec ($ch); // execute the curl command
		if (!$res) { 
			$this->curl_error = curl_error($ch); 
		}
		ob_end_clean();  // stop preventing output
		curl_close($ch);
		$this->post = '';
		return $res;
}

	function curl_run2()
	{
		$ch = curl_init();

		curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, TRUE);
		curl_setopt($ch, CURLOPT_TIMEOUT, 10);
		curl_setopt ($ch, CURLOPT_HEADER, 0);

		curl_setopt($ch, CURLOPT_RETURNTRANSFER,1);
		curl_setopt($ch, CURLOPT_COOKIEFILE, $this->cookie);
	
		curl_setopt($ch, CURLOPT_COOKIEJAR, $this->cookie);
		curl_setopt($ch, CURLOPT_COOKIEFILE, $this->cookie);
		curl_setopt($ch, CURLOPT_URL, $this->url);
		curl_setopt($ch, CURLOPT_POST, 1);
		curl_setopt($ch, CURLOPT_TIMEOUT, 90);
		curl_setopt($ch, CURLOPT_POSTFIELDS, $this->post);
		ob_start();
		$log = curl_exec ($ch);
		ob_end_clean();
		curl_close ($ch);
		return $log;
	}

	
	function curl_run()
	{
		$ch = curl_init();
		curl_setopt($ch, CURLOPT_RETURNTRANSFER,1);
		curl_setopt($ch, CURLOPT_COOKIEFILE, $this->cookie);
		curl_setopt($ch, CURLOPT_URL, $this->url);
		curl_setopt($ch, CURLOPT_POST, 1);
		curl_setopt($ch, CURLOPT_TIMEOUT, 90);
		curl_setopt($ch, CURLOPT_POSTFIELDS, $this->post);
		ob_start();
		$log = curl_exec ($ch);
		ob_end_clean();
		curl_close ($ch);
		return $log;
	}

	function curl_loc()
	{
		$ch = curl_init();
		if( !empty( $this->headers ) ) {
			curl_setopt($ch, CURLOPT_CUSTOMREQUEST, $this->headers );
		}
		curl_setopt($ch, CURLOPT_RETURNTRANSFER,1);
		curl_setopt($ch, CURLOPT_FOLLOWLOCATION, 1);
		curl_setopt($ch, CURLOPT_COOKIEFILE, $this->cookie);
		curl_setopt($ch, CURLOPT_URL, $this->url);
		curl_setopt($ch, CURLOPT_REFERER, $this->referer);
		curl_setopt($ch, CURLOPT_POST, 1);
		curl_setopt($ch, CURLOPT_POSTFIELDS, $this->post );
		ob_start();
		$log = curl_exec ($ch);
		ob_end_clean();
		curl_close ($ch);
		return $log;
	}


function curl_loc2()
	{
		$ch = curl_init();
		if( !empty( $this->headers ) ) {
			curl_setopt($ch, CURLOPT_CUSTOMREQUEST, $this->headers );
		}
		curl_setopt($ch, CURLOPT_RETURNTRANSFER,2);
		curl_setopt($ch, CURLOPT_FOLLOWLOCATION, 2);
		curl_setopt($ch, CURLOPT_COOKIEFILE, $this->cookie);
		curl_setopt($ch, CURLOPT_URL, $this->url);
		curl_setopt($ch, CURLOPT_REFERER, $this->referer);
		curl_setopt($ch, CURLOPT_POST, 1);
		curl_setopt($ch, CURLOPT_POSTFIELDS, $this->post );
		ob_start();
		$log = curl_exec ($ch);
		ob_end_clean();
		curl_close ($ch);
		return $log;
	}



	function curl_agent()
	{
		$ch = curl_init();
		if( !empty( $this->headers ) ) {
			curl_setopt($ch, CURLOPT_CUSTOMREQUEST, $this->headers );
		}
		curl_setopt ($ch, CURLOPT_USERAGENT, "Mozilla/4.0 (compatible; MSIE 6.0; Windows NT 5.1; SV1; .NET CLR 1.1.4322)");
		curl_setopt($ch, CURLOPT_RETURNTRANSFER,1);
		curl_setopt($ch, CURLOPT_FOLLOWLOCATION, 1);
		curl_setopt($ch, CURLOPT_COOKIEFILE, $this->cookie);
		curl_setopt($ch, CURLOPT_URL, $this->url);
		curl_setopt($ch, CURLOPT_REFERER, $this->referer);
		curl_setopt($ch, CURLOPT_POST, 1);
		curl_setopt($ch, CURLOPT_POSTFIELDS, $this->post );
		ob_start();
		$log = curl_exec ($ch);
		ob_end_clean();
		curl_close ($ch);
		return $log;
	}



function curl_login_ok()
	
	{
		$ch = curl_init();
		curl_setopt($ch, CURLOPT_COOKIEJAR, $this-> cookie);
		curl_setopt($ch, CURLOPT_URL, $this->url);
		curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
		curl_setopt($ch, CURLOPT_FOLLOWLOCATION, 1);		
		curl_setopt($ch, CURLOPT_POST, 1);
		curl_setopt($ch, CURLOPT_POSTFIELDS, $this->post);
		ob_start();      // prevent any output
		$res = curl_exec ($ch); // execute the curl command
		ob_end_clean();  // stop preventing output
		curl_close($ch);
		$this->post = '';
		return $res;
	}

	function curl_run_ok()
	{
		$ch = curl_init();
		curl_setopt($ch, CURLOPT_RETURNTRANSFER,1);
		curl_setopt($ch, CURLOPT_COOKIEFILE, $this->cookie);
		curl_setopt($ch, CURLOPT_URL, $this->url);
		curl_setopt($ch, CURLOPT_POST, 1);
		curl_setopt($ch, CURLOPT_POSTFIELDS, $this->post);
		ob_start();
		$log = curl_exec ($ch);
		ob_end_clean();
		curl_close ($ch);
		return $log;
	}


function cut2($a,$b,$res,$array="1"){
	
	if($array =="0") $array ="1";

	$res =  str_replace("'","",$res);
	$res =  str_replace('"',"",$res);
	$res =  str_replace('	',"",$res);

	$a =  str_replace("'","",$a);
	$a =  str_replace('"',"",$a);
	$b =  str_replace("'","",$b);
	$b =  str_replace('"',"",$b);



	$tmp = explode($a,$res);
	$tmp = explode($b,$tmp[$array]);
	$tmp = $tmp[0];
	return $tmp;
}


function cut3($a,$b,$res,$array="1"){
	
	if($array =="0") $array ="1";

	
	$tmp = explode($a,$res);
	$tmp = explode($b,$tmp[$array]);
	$tmp = $tmp[0];
	return $tmp;
}


function delHTML($text){
	$text = strip_tags($text);
	$text = str_replace("&nbsp;","",$text);
	return $text;
}

}
?>