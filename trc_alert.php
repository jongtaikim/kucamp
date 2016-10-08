<?
exec("ps -ef | grep httpd | wc -l",$aaa);
echo $aaa[0];
?>