<?php
/* vim: set expandtab tabstop=4 shiftwidth=4 foldmethod=marker: */
/**
* 파일명: lib/class.Calendar.php
* 작성일: 2005-03-21
* 작성자: 거친마루
* 설  명: 
*****************************************************************
* 
*/
class Calendar
{
	var $config = array(
		'print_header' => true,
		'no_event_clickable' => false
	);
	var $events;

	var $date;
	var $year;
	var $month;
	var $day;

	var $handler = '%d';

	var $_str;

	function __construct($year=null, $month=null, $day=null) {
		
		$this->year = ($year) ? $year : date('Y') ;
		$this->month = ($month) ? $month : date('m') ;
		$this->day = ($day) ? $day : date('j') ;
		$this->date = date('Y-m-d', mktime(0, 0, 0, $this->month, $this->day, $this->year));
	}

	function Calendar($year=null, $month=null, $day=null) {
		if (phpversion() < 5) $this->__construct($year,$month,$day);
	}

	function setEvent($day, $evt, $is_array = false) {
	
		if (is_array($day)) {
			foreach ($day as $d=>$e) $this->setEvent($d,$e,$is_array);
		} else {
            if($is_array) {
                $this->events[(int)$day][] = $evt;
            } else {
                $this->events[(int)$day] = $evt;
            }
		}
	}

	function setEventHandler($str) {
		$this->handler = $str;
	}

	function onClick($day) {
        $datearr = array($this->year,$this->month,sprintf('%02d',$day));
		$datestr = implode('-',$datearr);
        $datenum = implode('',$datearr);
		return str_replace(
			array('%D','%d','%N'),
			array($datestr,$day,$datenum),
			$this->handler
		);
	}

	function get_header() {
		return '<tr class="calendar">'.
			'<th class="sunday">'._('Sun').'</th>'.
			'<th>'._('Mon').'</th>'.
			'<th>'._('Tue').'</th>'.
			'<th>'._('Wed').'</th>'.
			'<th>'._('Thu').'</th>'.
			'<th>'._('Fri').'</th>'.
			'<th class="sat">'._('Sat').'</th>'.
			'</tr>';
	}

	function get_body() {
		$start_ = date("d",mktime(0,0,0,$this->month,1,$this->year)-1); 
		$start = date("w",mktime(0,0,0,$this->month,1,$this->year)); 
		$last  = date("t",mktime(0,0,0,$this->month,1,$this->year));
	
		$output = '<tr>';
		
		for ($i=0; $i<$start; $i++) $output .= '<td><span class="otherSchedule">'.  ($start_ - $start +($i+1)).'</span></td>';
	
		for ($day=1; $day<=$last; $i++,$day++) {
			if ($i % 7 == 0) $output.= '</tr><tr>';
			switch (date("w",mktime(0,0,0,$this->month,$day,$this->year))) {
				case 0:	// sunday
					$output .= $this->_draw_cell($day,'sun');
					break;
				case 6: // saturday
					$output .= $this->_draw_cell($day,'sat');
					break;
				default:
					$output .= $this->_draw_cell($day);
					break;	// another day
			}
		}
		if ($i % 7) {
			$b = 0;
			while ($b++ < 7 - ($i%7)) $output.= '<td><span class="otherSchedule">'.$b.'</span></td>';
		}
		$output.= '</tr>';
		return $output;
	}

    function get_array() {
        $start = date("w",mktime(0,0,0,$this->month,1,$this->year)); 
		$last  = date("t",mktime(0,0,0,$this->month,1,$this->year));

//echo $this->month;
		
		$ret = array();

		for ($i=0; $i<$start; $i++) $ret[] = array('type'=>'empty');
		for ($day=1; $day<=$last; $i++,$day++) {
            $arr = array('day' => $day);
            if($this->events[$day]) $arr['event'] = $this->events[$day];
			
			
			
			switch (date("w",mktime(0,0,0,$this->month,$day,$this->year))) {
				case 0:	// sunday
                    $arr['type'] = 'sun';
					break;
				
				case 6: // saturday
                    $arr['type'] = 'sat';
					break;
				
				default:
                    $arr['type'] = 'normal';
					break;	// another day



			}
            $ret[] = $arr;
		}
		if ($i % 7) {
			$b = 0;
			while ($b++ < 7 - ($i%7)) $ret[] = array('type'=>'empty');
		}

		return $ret;
    }

	function get_source() {
		$output = '<table class="calendar">';
		if ($this->config['print_header']) $output.= $this->get_header();
		$output.= $this->get_body();
		$output.= '</table>';
		return $output;
	}

	function _draw_cell($day, $css='') {
		if ($css) $css ='class = "'.$css.'"';
		if ($this->day == $day) $css_.= ' today';
		if ($this->events[$day]) {
			$css_ .=" haveSchedule";
			$css2 = ' class=" '.$css_.' "';
			$title = 'title="'.$this->events[$day].'"';
			

			//$content = $this->onClick($day);
			if($day < 10) $day2 = "0".$day; else $day2 = $day; 
			
			$DB = &WebApp::singleton('DB');
			$sql = "SELECT str_title FROM ".TAB_CALENDAR." WHERE num_oid="._OID." AND num_date=".$this->year.$this->month.$day2."";
			$One = $DB -> sqlFetchOne($sql);

			$content =  '<a href="calendar.view?date='.$this->year.$this->month.$day2.'" title="'.$One.'" onclick="window.open(this.href,\'calendar\',\'width=730,height=600,scrollbars=1\'); return false;" onkeypress="window.open(this.href,\'calendar\',\'width=730,height=600,scrollbars=1\'); return false;"><span '.$css2.'>'.$day.'</span></a>';
		} else {
			$content =  '<span '.$css2.'>'.$day.'</span>';
		}

		return '<td '.$css.' '.$title.'>'.$content.'</td>';
	}

	function __toString() {
		return $this->get_source();
	}
}
?>