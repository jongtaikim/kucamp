var TAB_EXP_LIST = new Array("NEWS_COM","NEWS_SCH","CALENDAR","POLL","BOARD_G","BOARD_B");
function OnClickTabBtn(el) {
	if(!el) el = event.srcElement;
	var group = el.getAttribute("group");
	for(var i=0;i<TAB_EXP_LIST.length;i++) {
		var btn = document.getElementById("TAB_EXP_BTN_"+TAB_EXP_LIST[i]);
		if(btn == null) continue;
		if(btn.getAttribute("layer") == 'undefined') continue;
		if(btn.getAttribute("group") == group) {
			var _layer = btn.getAttribute("layer");
			if(_layer == 'undefined') continue;
			if(document.getElementById(_layer) == null) continue;
			document.getElementById(_layer).style.display = "none";
		}
	}
	el.style.display = "block";
	var layer = el.getAttribute("layer");
	if(layer != 'undefined' && document.getElementById(layer) != null) document.getElementById(layer).style.display = "block";
	var more_btn = document.getElementById(group + "_MORE");
	if(more_btn != null) more_btn.setAttribute("href",el.getAttribute("href"));
}
