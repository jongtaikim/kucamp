<?
    $rcid       = $_POST["reCommConId"];
    $rctype     = $_POST["reCommType"];
    $rhash      = $_POST["reHash"];
?>
<script type="text/javascript">
// <![CDATA[
<? if($rcid){?>
opener.set_gogo_mobile('<?=$rcid?>','<?=$rctype?>','<?=$rhash?>');
<?}?>
self.close();
// ]]>
</script>