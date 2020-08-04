<?
/**
 * Bechu basic skin for gnuboard4
 *
 * copyright (c) 2008 Choi Jae-Young <www.miwit.com>
 *
 * This program is free software; you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation; either version 2 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program; if not, write to the Free Software
 * Foundation, Inc., 59 Temple Place, Suite 330, Boston, MA  02111-1307  USA
 */

if (!defined("_GNUBOARD_")) exit; // 개별 페이지 접근 불가

include_once("$board_skin_path/mw.lib/mw.ccl.lib.php");

$mw[basic_config_table] = $g4[table_prefix]."mw_basic_config";
$mw[board_member_table] = $g4[table_prefix]."mw_board_member";
$mw[download_log_table] = $g4[table_prefix]."mw_download_log";
$mw[post_history_table] = $g4[table_prefix]."mw_post_history";
$mw[guploader_table]    = $g4[table_prefix]."mw_guploader";

// 스킨 환경정보
$sql = "select * from $mw[basic_config_table] where bo_table = '$bo_table'";
$mw_basic = sql_fetch($sql, false);

// 자동 업그레이드
include_once("$board_skin_path/mw.adm/mw.upgrade.php");

if ($mw_basic[cf_write_notice]) {
    $mw_basic[cf_write_notice] = trim($mw_basic[cf_write_notice]);
    $mw_basic[cf_write_notice] = str_replace("\r", "", $mw_basic[cf_write_notice]);
    $mw_basic[cf_write_notice] = str_replace("\n", "\\n", $mw_basic[cf_write_notice]);
}

if (!$mw_basic[cf_singo_id])
    $mw_basic[cf_singo_id] = "admin,";

if (!$mw_basic[cf_email])
    $mw_basic[cf_email] = "test@test.com\ntest@test.com\n";

if (!$mw_basic[cf_hp])
    $mw_basic[cf_hp] = "010-000-0000\n010-000-0000\n";

// CCL 정보
$view[wr_ccl] = $write[wr_ccl] = mw_get_ccl_info($write[wr_ccl]);

// 1:1 게시판
if ($mw_basic[cf_attribute] == "1:1" && $is_admin != "super" && $wr_id && $w != "u")
{
    if (!strstr($board[bo_notice], "$wr_id") && $is_admin != 'super' && $member[mb_id] != $write[mb_id]) {
        goto_url("board.php?bo_table=$bo_table");
    }

    if (!$board[bo_use_list_view]) {
        if ($sql_search)
            $sql_search = " and " . $sql_search;

        // 윗글을 얻음
        $sql = " select wr_id, wr_subject from $write_table where mb_id = '$member[mb_id]' and wr_is_comment = 0 and wr_num = '$write[wr_num]' and wr_reply < '$write[wr_reply]' $sql_search order by wr_num desc, wr_reply desc limit 1 ";
        $prev = sql_fetch($sql);
        // 위의 쿼리문으로 값을 얻지 못했다면
        if (!$prev[wr_id])     {
            $sql = " select wr_id, wr_subject from $write_table where mb_id = '$member[mb_id]' and wr_is_comment = 0 and wr_num < '$write[wr_num]' $sql_search order by wr_num desc, wr_reply desc limit 1 ";
            $prev = sql_fetch($sql);
        }

        // 아래글을 얻음
        $sql = " select wr_id, wr_subject from $write_table where mb_id = '$member[mb_id]' and wr_is_comment = 0 and wr_num = '$write[wr_num]' and wr_reply > '$write[wr_reply]' $sql_search order by wr_num, wr_reply limit 1 ";
        $next = sql_fetch($sql);
        // 위의 쿼리문으로 값을 얻지 못했다면
        if (!$next[wr_id]) {
            $sql = " select wr_id, wr_subject from $write_table where mb_id = '$member[mb_id]' and wr_is_comment = 0 and wr_num > '$write[wr_num]' $sql_search order by wr_num, wr_reply limit 1 ";
            $next = sql_fetch($sql);
        }
    }

    // 이전글 링크
    $prev_href = "";
    if ($prev[wr_id]) {
        $prev_wr_subject = get_text(cut_str($prev[wr_subject], 255));
        $prev_href = "./board.php?bo_table=$bo_table&wr_id=$prev[wr_id]&page=$page" . $qstr;
    }

    // 다음글 링크
    $next_href = "";
    if ($next[wr_id]) {
        $next_wr_subject = get_text(cut_str($next[wr_subject], 255));
        $next_href = "./board.php?bo_table=$bo_table&wr_id=$next[wr_id]&page=$page" . $qstr;
    }
}

// 썸네일 경로
$file_path = "$g4[path]/data/file/$bo_table";
$thumb_path = "$file_path/thumbnail";
$thumb2_path = "$file_path/thumbnail2";
$thumb3_path = "$file_path/thumbnail3";

mw_mkdir($thumb_path);
mw_mkdir($thumb2_path);
mw_mkdir($thumb3_path);

// 회원 코멘트 이미지 경로
$comment_image_path = "$g4[path]/data/mw.basic.comment.image";

// 디렉토리 생성
function mw_mkdir($path) {
    if (is_dir($path)) return;

    @mkdir($path, 0707);
    @chmod($path, 0707);

    // 디렉토리에 있는 파일의 목록을 보이지 않게 한다.
    $file = $path . "/index.php";
    $f = @fopen($file, "w");
    @fwrite($f, "");
    @fclose($f);
    @chmod($file, 0606);
}

// 관련글 얻기.. 080429, curlychoi
function mw_related($related, $count, $field="wr_id, wr_subject, wr_content")
{
    global $bo_table, $write_table, $g4, $wr_id;

    if (!trim($related)) return;

    $sql_where = "";
    $related = explode(",", $related);
    foreach ($related as $rel) {
        $rel = trim($rel);
        if ($rel) {
            $rel = addslashes($rel);
            if ($sql_where) {
                $sql_where .= " or ";
            }
            $sql_where .= " (instr(wr_subject, '$rel') or instr(wr_content, '$rel')) ";
        }
    }
    $sql_where .= " and wr_id <> '$wr_id' ";
    $sql = "select $field from $write_table where wr_is_comment = 0 and ($sql_where) order by wr_num ";
    $qry = sql_query($sql);

    $list = array();
    $i = 0;
    while ($row = sql_fetch_array($qry)) {
        $list[] = $row;
        if (++$i >= $count) {
            break;
        }
    }
    return $list;
}

function mw_thumbnail_keep($size, $set_width, $set_height) {
    if ($size[0] > $size[1]) {
	$rate = $set_width / $size[0];
	$get_width = $set_width;
	$get_height = (int)($size[1] * $rate);
    } else {
	$rate = $set_width / $size[1];
	$get_height = $set_width;
	$get_width = (int)($size[0] * $rate);
    }
    return array($get_width, $get_height);
}

// 썸네일 생성.. 080408, curlychoi
function mw_make_thumbnail($set_width, $set_height, $source, $thumbnail='', $keep=false)
{
    if (!$thumbnail)
        $source = $thumbnail;

    $size = @getimagesize($source);

    switch ($size[2]) {
        case 1: $source = @imagecreatefromgif($source); break;
        case 2: $source = @imagecreatefromjpeg($source); break;
        case 3: $source = @imagecreatefrompng($source); break;
        default: return false;
    }

    if ($keep)
    {
	$keep_size = mw_thumbnail_keep($size, $set_width, $set_height);
	$set_width = $get_width = $keep_size[0];
	$set_height = $get_height = $keep_size[1];
    }
    else
    {
	$rate = $set_width / $size[0];
	$get_width = $set_width;
	$get_height = (int)($size[1] * $rate);

	if ($get_height < $set_height) {
	    $get_width = $set_width + $set_height - $get_height;
	    $get_height = $set_height;
	}
    }

    $target = @imagecreatetruecolor($set_width, $set_height);
    $white = @imagecolorallocate($target, 255, 255, 255);
    @imagefilledrectangle($target, 0, 0, $set_width, $set_height, $white);
    @imagecopyresampled($source, $source, 0, 0, 0, 0, $get_width, $get_height, $size[0], $size[1]);
    @imagecopy($target, $source, 0, 0, 0, 0, $get_width, $get_height);

    @imagejpeg($target, $thumbnail, 100);
    @chmod($thumbnail, 0606);
}


// 첨부파일의 첫번째 파일을 가져온다.. 080408, curlychoi
// 이미지파일을 가져오는 인수 추가.. 080414, curlychoi
function mw_get_first_file($bo_table, $wr_id, $is_image=false)
{
    global $g4;
    $sql_image = "";
    if ($is_image) $sql_image = " and bf_width > 0 ";
    $sql = "select * from $g4[board_file_table] where bo_table = '$bo_table' and wr_id = '$wr_id' $sql_image order by bf_no limit 1";
    $row = sql_fetch($sql);
    return $row;
}

// 핸드폰번호 형식으로 return
function mw_get_hp($hp, $hyphen=1)
{
    if (!mw_is_hp($hp)) return '';

    if ($hyphen) $preg = "$1-$2-$3"; else $preg = "$1$2$3";

    $hp = str_replace('-', '', trim($hp));
    $hp = preg_replace("/^(01[016789])([0-9]{3,4})([0-9]{4})$/", $preg, $hp);

    return $hp;
}

// 핸드폰번호 여부
function mw_is_hp($hp)
{
    $hp = str_replace('-', '', trim($hp));
    if (preg_match("/^(0[17][016789])([0-9]{3,4})([0-9]{4})$/", $hp))
        return true;
    else
        return false;
}

// 분류 옵션을 얻음
function mw_get_category_option($bo_table='')
{
    global $g4, $board;

    $arr = explode("|", $board[bo_category_list]); // 구분자가 , 로 되어 있음
    $str = "";
    for ($i=0; $i<count($arr); $i++)
        if (trim($arr[$i]))
            $str .= "<option value='".urlencode($arr[$i])."'>$arr[$i]</option>\n";

    return $str;
}

function mw_set_sync_tag($content) {
    global $member;
    preg_match_all("/<([^>]*)</iUs", $content, $matchs);
    if ($member[mb_id] == "miwit") {
    for ($i=0, $max=count($matchs[0]); $i<$max; $i++) {
	$pos = strpos($content, $matchs[0][$i]);
	$len = strlen($matchs[0][$i]);
	$content = substr($content, 0, $pos + $len - 1) . ">" . substr($content, $pos + $len - 1, strlen($content));
    }
    }
 
    $content = mw_get_sync_tag($content, "div");
    $content = mw_get_sync_tag($content, "table");
    $content = mw_get_sync_tag($content, "font");
    return $content;
}

// html 태그 갯수 맞추기
function mw_get_sync_tag($content, $tag) {
    $tag = strtolower($tag);
    $res = strtolower($content);

    $open  = substr_count($res, "<$tag");
    $close = substr_count($res, "</$tag");

    if ($open > $close) {

        $gap = $open - $close;
        for($i=0; $i<$gap; $i++)
            $content .= "</$tag>";

    } else {

        $gap = $close - $open;
        for($i=0; $i<$gap; $i++)
            $content = "<$tag>".$content;
    }

    return $content;
}

// 엄지 짧은링크 얻기
function umz_get_url($url) {
    $url = urlencode($url);
    $fp = fsockopen ("umz.kr", 80, $errno, $errstr, 30);
    if (!$fp) return false;
    fputs($fp, "POST /plugin/shorten/update.php?url=$url HTTP/1.0\r\n");
    fputs($fp, "Host: umz.kr:80\r\n");
    fputs($fp, "\r\n");
    while (trim($buffer = fgets($fp,1024)) != "") $header .= $buffer;
    while (!feof($fp)) $buffer .= fgets($fp,1024);
    fclose($fp);
    return $buffer;
}

?>
