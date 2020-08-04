<?
/**
 * Bechu-Basic Skin for Gnuboard4
 *
 * Copyright (c) 2008 Choi Jae-Young <www.miwit.com>
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

function mw_get_ccl_info($ccl)
{
    $info = array();

    switch ($ccl)
    {
        case "by":
            $info[by] = "by";
            $info[nc] = "";
            $info[nd] = "";
            $info[kr] = "저작자표시";
            break;
        case "by-nc":
            $info[by] = "by";
            $info[nc] = "nc";
            $info[nd] = "";
            $info[kr] = "저작자표시-비영리";
            break;
        case "by-sa":
            $info[by] = "by";
            $info[nc] = "";
            $info[nd] = "sa";
            $info[kr] = "저작자표시-동일조건변경허락";
            break;
        case "by-nd":
            $info[by] = "by";
            $info[nc] = "";
            $info[nd] = "nd";
            $info[kr] = "저작자표시-변경금지";
            break;
        case "by-nc-nd":
            $info[by] = "by";
            $info[nc] = "nc";
            $info[nd] = "nd";
            $info[kr] = "저작자표시-비영리-변경금지";
            break;
        case "by-nc-sa":
            $info[by] = "by";
            $info[nc] = "nc";
            $info[nd] = "sa";
            $info[kr] = "저작자표시-비영리-동일조건변경허락";
            break;
        default :
            $info[by] = "";
            $info[nc] = "nc";
            $info[nd] = "nd";
            $info[kr] = "";
            break;
    }
    $info[ccl] = $ccl;
    $info[msg] = "크리에이티브 커먼즈 코리아 $info[kr] 2.0 대한민국 라이센스에 따라 이용하실 수 있습니다.";
    $info[link] = "http://creativecommons.org/licenses/{$ccl}/2.0/kr/";
    
    return $info;
}

?>