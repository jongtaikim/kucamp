function OnLayerChange (element) {
		
			if(element.hasChildNodes) {
				layer = element.id;
				len = element.childNodes.length;
				for(j = 1; j<len; j++) {
					el = element.childNodes[j];
					var sel = $(el.id + '[layer]');
					if(sel.options[sel.selectedIndex].value == layer) {  					
					continue;
					}
					
					if(sel.options.length) {
						for(i = 0; i<sel.options.length; i++) {
							if(sel.options[i].value == layer) {
								sel.options[i].selected = true;
								
								break;
							}
						}
					}
				}
			}
		
	}


	function twinInput(el,h,w){

	target = explode("(",el.name);
	target_name = target[0];
	target = explode(")",target[1]);

	target = target[0];
	$(target_name+"["+target+"]").value = el.value;
	
	if(target == "type" ) {
	if(w) $(target_name+"[width]").value = w;
	if(h) $(target_name+"[height]").value = h;
	}
	}
	
	function defImgSize(name){

	$(name+'(img_w)').value = '81';
	$(name+'(img_h)').value = '59';
	
	$(name+'[img_w]').value = '81';
	$(name+'[img_h]').value = '59';
	

	}

	function viewPriv(src){

	if($('popup_box2').style.display !='none') {
		$('mmenu').src	 = src;
	}
	}

	function moveLayout (id,target) {
		
		if($(id+'[layer]').value =="NONE") {
		document.getElementById(target).appendChild(document.getElementById(id));
		$(id+'[layer]').value = target;

		}else{
		document.getElementById('NONE').appendChild(document.getElementById(id));
		$(id+'[layer]').value = 'NONE';

		}

		title = $(id+'[title]').value;
		width = $(id+'[width]').value;
		h = $(id+'[height]').value;

		changeWidthDb(id, width,title,h);
		
	}
function changeWidth() {
		id = tar_lay;
		id = explode("[",id);	
		id = id[0];

		
		h2 = parseInt($(id+'[height]').value);
		target_i = $(id+'[layer]').value;
		if(target_i  !="NONE") {
			
		
		r_width1 = (parseInt($(target_i).style.width)) / 4  ;
		r_width1 = parseInt(r_width1);
		
		if($(id+'[width]').value == r_width1  ) {
		maxWidth = r_width1 * 2 -6;
		}else if($(id+'[width]').value == (r_width1 * 2 )-6 ){
		maxWidth = r_width1 * 3 -5 ;
		}else if($(id+'[width]').value == (r_width1 * 3 -5) ){
		maxWidth = r_width1 * 4  - 1;
		}else if($(id+'[width]').value == (r_width1 * 4 ) -1 ){
		maxWidth = r_width1  ;
		}else{
		maxWidth = r_width1 ;
		}
		 maxWidth = parseInt(maxWidth);
		 maxWidth2 = parseInt(maxWidth) ;
		 maxWidth3 = parseInt(maxWidth)-18 ;

		$(id+'[la]').style.width = maxWidth2 - 3;
		
		$('[xxx]'+id).style.left=maxWidth3;
		
		$('conWidth').value = parseInt(maxWidth) *2;
		
		if($('partT['+id+']')) $('partT['+id+']').style.left = parseInt(maxWidth2) - 52;
		if($(id+'[sizev]')) $(id+'[sizev]').style.left = parseInt(maxWidth2)  - 52;
		

		$(id+'[sizev]').innerHTML = parseInt(maxWidth2) * 2 + " x " + parseInt(h2) *2;

		$(id).style.width = maxWidth2;
		$(id+'[width]').value = maxWidth2;
		}else{
		alert('먼저 배치해주시기 바랍니다.');
		}
		}




	function changeWidthDb(id, width,title,h) {
		$(id).style.display = 'none';
		h2 = parseInt($(id+'[height]').value);
		target_i = $(id+'[layer]').value;
		
		if(target_i=='NONE') {
		$(id+'[sizev]').style.display='none';
		$(id).style.width = '100%'; 
		$(id+'[la]').style.width = '100%';
		$(id).style.height = 10;
		$(id+'[la]').style.height = 10;

		}else{
		$(id+'[sizev]').style.display='';
		
		r_width1 = (parseInt($(target_i).style.width)) ;
        r_width1 = parseInt(r_width1);
		maxWidth2 = parseInt(r_width1) - 5 ;
		maxWidth3 = parseInt(r_width1) - 20 ;
		

		if($('partT['+id+']')) $('partT['+id+']').style.left = parseInt(maxWidth2)  - 52;
		if($(id+'[sizev]')) $(id+'[sizev]').style.left = parseInt(maxWidth2)  - 52;
		
		

		
		$('[xxx]'+id).style.left=maxWidth3;
	
		$(id+'[sizev]').innerHTML = parseInt(maxWidth2) * 2 + " x " + parseInt(h2) *2;
		$(id).style.width = maxWidth2;
		$(id+'[la]').style.width = maxWidth2;
		$(id).style.height = h2;
		$(id+'[la]').style.height = h2;
		
		$(id+'[width]').value = maxWidth2;
		}
		$(id).style.display = '';

		conTable(id);
		
	}



	function changeHeight(ssmu) {
		id = tar_lay;
		id = explode("[",id);	
		id = id[0];
		width = parseInt($(id+'[width]').value);
		
		if($(id+'[layer]').value  !="NONE") {
		var s = $('xxxe').value;
		if(!s) {s= 2;}
		if(ssmu =="up") {
		h = parseInt($(id+'[height]').value) + parseInt(s);
		}else{
		h = parseInt($(id+'[height]').value) - parseInt(s);
		}
		

		if($('partT['+id+']')) $('partT['+id+']').style.top = parseInt(h) - 52;
		if($(id+'[sizev]')) $(id+'[sizev]').style.top = parseInt(h) - 18; 
		




		$(id).style.width = width;
		$(id).style.height = h;	
		$(id+'[height]').value = h;
		$(id+'[la]').style.width = width - 3;
		$(id+'[la]').style.height = h;
		$(id+'[width]').value = width;
		

		
		$(id+'[sizev]').innerHTML = parseInt(width) * 2 + " x " + parseInt(h) *2;
		}else{
		alert('먼저 배치해주시기 바랍니다..')
		}
		}


	function changeWidth2(ssmu) {
		
		id = tar_lay;
		id = explode("[",id);	
		id = id[0];
		
		if($(id+'[layer]').value  !="NONE") {

		var s = $('xxxe').value;
		if(!s) {s= 2;}
		if(ssmu =="up") {
		h = parseInt($(id+'[width]').value) + parseInt(s);
		}else{
		h = parseInt($(id+'[width]').value) - parseInt(s);
		}
		
		height = parseInt($(id+'[height]').value)

		$(id).style.height = height;
		$(id).style.width = h ;	

		$('[xxx]'+id).style.left = parseInt(h) - 18;

		if($('partT['+id+']')) $('partT['+id+']').style.left = parseInt(h)-52;
		if($(id+'[sizev]')) $(id+'[sizev]').style.left = parseInt(h) - 52;
	
		$(id+'[height]').value = height;
		$(id+'[la]').style.width = h - 3;
		$(id+'[la]').style.height = height;
		$(id+'[width]').value = h;
		
		
		$(id+'[sizev]').innerHTML = parseInt(h) * 2 + " x " + parseInt(height) *2;
		}else{
		alert('먼저 배치해주시기 바랍니다..');
		}
		}




	function changeHeightInput(idx) {
		id = tar_lay;
		id = explode("[",id);	
		id = id[0];
		var width = parseInt($(id+'[width]').value);
		var height = parseInt($(id+'[height]').value);
		
		if($(id+'[layer]').value  !="NONE") {

		var tmpNum = parseInt(idx)/2;
		
		$(id+'[height]').value = tmpNum;
		$(id).style.height = tmpNum;	
		$(id+'[la]').style.height = tmpNum;

		$(id+'[height]').value = tmpNum;
		$(id+'[sizev]').innerHTML = parseInt(width) * 2 + " x " + parseInt(tmpNum) *2
		

		}else{	alert('먼저 배치해주시기 바랍니다..');}

		}


	function changeWidthInput(idx) {
		id = tar_lay;
		id = explode("[",id);	
		id = id[0];
		var width = parseInt($(id+'[width]').value);
		var height = parseInt($(id+'[height]').value);
		
		if($(id+'[layer]').value  !="NONE") {


		var tmpNum = parseInt(idx) / 2;
		
		$(id+'[width]').value = tmpNum;
		
		$('[xxx]'+id).style.left = parseInt(tmpNum) - 18;
		
		$(id).style.width = tmpNum;
		$(id+'[la]').style.width = tmpNum -3;

		$(id+'[width]').value = tmpNum;
				
		$(id+'[sizev]').innerHTML = parseInt(tmpNum) * 2 + " x " + parseInt(height) *2;
		

		}else{	alert('먼저 배치해주시기 바랍니다..');}

		}

	function changeWidth2(ssmu) {
		
		id = tar_lay;
		id = explode("[",id);	
		id = id[0];
		
		if($(id+'[layer]').value  !="NONE") {

		var s = $('xxxe').value;
		if(!s) {s= 2;}
		if(ssmu =="up") {
		h = parseInt($(id+'[width]').value) + parseInt(s);
		}else{
		h = parseInt($(id+'[width]').value) - parseInt(s);
		}
		
		height = parseInt($(id+'[height]').value);

		$(id).style.height = height;
		$(id).style.width = h ;	

		$('[xxx]'+id).style.left = parseInt(h) - 18;

		if($('partT['+id+']')) $('partT['+id+']').style.left = parseInt(h)-52;
		if($(id+'[sizev]')) $(id+'[sizev]').style.left = parseInt(h) - 52;
	
		$(id+'[height]').value = height;
		$(id+'[la]').style.width = h - 3;
		$(id+'[la]').style.height = height;
		$(id+'[width]').value = h;
		
		
		$(id+'[sizev]').innerHTML = parseInt(h) * 2 + " x " + parseInt(height) *2;
		}else{
		alert('먼저 배치해주시기 바랍니다..');
		}
		}




	function addPart() {
		
		var x = (document.body.clientWidth / 2) - (785 / 2 ) - 20 ; 
		
		fenster2('컨텐츠 추가', '컨텐츠 추가','attach.admin.add_part',x,'130','785','630');
	}

	function editPart(name) {
		var x = (document.body.clientWidth / 2) - (785 / 2 ) - 20 ; 
		fenster2('컨텐츠 편집', '컨텐츠 편집','attach.admin.edit_part?name=' + name,x,'130','785','630');
	}

	function deletePart(name) {
		if(!confirm('정말 삭제하시겠습니까?')) return false;
		document.frames['hidden_frame'].location.reload('attach.admin.delete_part?name=' + name);
		
		$(name+'[part_td]').style.display='none';

	
	}


	function removePart(name) { 
		el = $(name);
		layer = el.parentNode;
		layer.removeChild(el);
	}


	function selectHerf(val) {
	location.href="/attach.admin.manage?layout=" + val;
	}


	function OnDragEffect(element,idx) { 
		if(!idx) {
		
		element._opacity = Element.getOpacity(element); 
		new Effect.Opacity(element, {duration:-1, from:element._opacity, to:0.8});	
		}else{
		element._opacity = Element.getOpacity(element); 
		new Effect.Opacity(element, {duration:-1, from:element._opacity, to:1});	
		
		}
		
		}
	
	function OnDragStartEffect(element) { 
	/*	element._opacity = Element.getOpacity(element); 
	new Effect.Opacity(element, {duration:-1, from:element._opacity, to:0.4});	*/
		ToolbarView(element.id+ '[stool]');
		
		ta_layout = $(element.id+'[layer]').value;
		ta_width = element.style.width;

		$('[xxx]'+element.id).style.display='none';

		$('conWidth').value = parseInt($(element.id+'[width]').value) *2;
		$('conHeight').value = parseInt($(element.id+'[height]').value)*2;

		//$(element).style.width = '99%';
		//$(element.id+'[la]').style.width = '99%';
		
	
	}



	function OnReverteffect(element, top_offset, left_offset) { 
	

	element._revert = new Effect.Move(element, { x: -left_offset, y: -top_offset, duration: "0.01"});
	
		$('test_a').innerHTML = left_offset + ' / ' + top_offset;
	
	}




	function OnDragEndEffect(element) {
		
		title = $(element.id+'[title]').value;
		width = $(element.id+'[width]').value;
		h = $(element.id+'[height]').value;

		$('[xxx]'+element.id).style.display='';

		
		
		if(ta_layout !='NONE'){
		if(ta_layout != $(element.id+'[layer]').value){
		changeWidthDb(element.id, width,title,h);
		}else{
		$(element.id+'[la]').style.width = parseInt(ta_width) -3;
		$(element).style.width = ta_width;
		}
		}else{
		changeWidthDb(element.id, width,title,h);
		}	

		/*element._opacity = Element.getOpacity(element); 
		new Effect.Opacity(element, {duration:-1, from:element._opacity, to:0.8});	*/
	}


		function getBounds(tag,tag2) 
		{ 
			var ret = new Object(); 
				var rect = tag.getBoundingClientRect(); 
				ret.left = rect.left ; 
				ret.top = rect.top; 
			return ret; 
		} 





function conTable (name,ne){

var title = $(name+'[title]').value;
var is_part  = $(name+'[is_part]').value;
var w_view =  parseInt($(name+'[width]').value) *2;
var h_view =  parseInt($(name+'[height]').value) *2;
var h =  parseInt($(name+'[height]').value) ;
var layer  = $(name+'[layer]').value;
var width3 = parseInt($(name+'[width]').value) - 18 ;	

if(ne) {
var ne_img=" <img src='/image/iicon/ico_new2.gif'>";
}else{
var ne_img = '';
}	

if(layer != "NONE") {
if(!strstr(name , "bbs") ){
var icon = '[일반] ';
}else {
var icon = '[게시판] ';
}

if(is_part >0){
var icon = '[HTML] ';
}



if(strstr(name , "bbs") ){
var htxml =	'<TABLE  cellpadding="0" cellspacing="0" border=0  align = center width=100% height=100%  '+
'" onclick = "ToolbarView(\'' + name + '[stool]\')"	'+
'style=""><TR><TD valign = top style = "padding:2" ><table cellpadding="0" cellspacing="0" border="0" width="100%" height="100%" align = center ><tr height="1"><td width="1"  ><img src="/images/attach2/t_left.gif"width=8 height=8 ></td><td width="100" bgcolor="F9FCDD" ></td>		<td width="1" align="right" ><img src="/images/attach2/t_right.gif"width=8 height=8 ></td></tr><tr valign="top" ><td width="8" bgcolor="F9FCDD"></td><td bgcolor="F9FCDD" valign="top" width=99%>'+	
	
'<table cellpadding="0" cellspacing="0" border="0" style="table-layout:fixed;position:absolute;" height=100%><tr>'+
'<td style="font-size:11px"  ><img src="/f.php?text='+icon+title+'&font=yg330&size2=4&bg=F9FCDD&color=#5B5B5B&mk_btn=Y" >'+ne_img+'</td>'+
'</tr>'+
'<tr><td valign = bottom>'+
'<font style = "font-size:10px;color:#0033FF"><div id='+name+'[sizev] style = "font-size:10px;color:#676767;">'+ w_view + ' x ' + h_view + '</div></font>' +
'</td></tr>'+

'<tr><td align = center><div style = "font-size:11px" id="'+name+'(bbs_ee)"></div>'+
'<div style = "display:none" id="'+name+'(bbs_eee)">sad</div></td></tr>'+

'<tr height=80%><td align=center valign=bottom ><img src="/html/attach/image/btn_bbs.gif" onclick="ta_layout = $(\''+name+'[layer]\').value;loadbbs();return overlay2(this, \'bbsSetup\', \'leftbottom\');" style="cursor:hand;"></a></td></tr>'+

'</table>'+

'</td><td width="8" bgcolor="F9FCDD" ></td></tr><tr height="1"><td width="1" ><img src="/images/attach2/b_left.gif"width=8 height=8 ></td><td  bgcolor="F9FCDD"></td>	<td width="1" ><img src="/images/attach2/b_right.gif"width=8 height=8 ></td></tr></table></TD></TR></TABLE>'+

'<a href="javascript:moveLayout(\''+name+'\',\'NONE\');" style ="z-index:9999999" ><img id = "[xxx]'+name+'" src=/html/attach/admin/xxx.gif style="top:5px;left:'+width3+';position:absolute;cursor:hand;" '+		
' align=absmiddle style="padding-bottom:10px"></a>';




}else {


var htxml =	'<TABLE  cellpadding="0" cellspacing="0" border=0  align = center width=100% height=100%  '+
'" onclick = "ToolbarView(\'' + name + '[stool]\')"	'+
'style=""><TR><TD valign = top style = "padding:2" ><table cellpadding="0" cellspacing="0" border="0" width="100%" height="100%" align = center ><tr height="1"><td width="1"   ><img src="/images/attach/t_left.gif"width=8 height=8 ></td><td width="100" bgcolor="f6f6f6" ></td>		<td width="1" align="right" ><img src="/images/attach/t_right.gif"width=8 height=8 ></td></tr><tr valign="top" ><td width="8" bgcolor="f6f6f6"></td><td bgcolor="f6f6f6" valign="top" width=100%>'+	
	
'<table cellpadding="0" cellspacing="0" border="0" style="table-layout:fixed;position:absolute;"><tr>'+
'<td style="font-size:11px"  ><img src="/f.php?text='+icon+title+'&font=yg330&size2=4&bg=f6f6f6&color=#5B5B5B&mk_btn=Y" >'+ne_img+'</td>'+
'</tr>'+
'<tr><td valign = bottom>'+
'<font style = "font-size:10px;color:#0033FF;padding:0px"><div id='+name+'[sizev] style = "font-size:10px;color:#676767;">'+ w_view + ' x ' + h_view + '</div></font>' +
(is_part > 0 ? '<div  id="partT['+name+']"><a href="javascript:editPart(\'' + name + '\');"><img src="/edit.gif" ></a> <a href="javascript:deletePart(\'' + name + '\');"><img src="/del.gif" ></a></div>' : '')  +
'</td></tr>'+
'</table>'+

'</td><td width="8" bgcolor="f6f6f6" ></td></tr><tr height="1"><td width="1"><img src="/images/attach/b_left.gif"width=8 height=8></td><td  bgcolor="f6f6f6" ></td>	<td width="1" ><img src="/images/attach/b_right.gif"width=8 height=8></td></tr></table></TD></TR></TABLE>'+

'<a href="javascript:moveLayout(\''+name+'\',\'NONE\');" style ="z-index:9999999" ><img id = "[xxx]'+name+'" src=/html/attach/admin/xxx.gif style="top:5px;left:'+width3+';position:absolute;cursor:hand;" '+		
' align=absmiddle style="padding-bottom:10px"></a>';

}

if(is_part >0){
var htxml =	'<TABLE  cellpadding="0" cellspacing="0" border=0  align = center width=100% height=100%  '+
'" onclick = "ToolbarView(\'' + name + '[stool]\')"	'+
'style=""><TR><TD valign = top style = "padding:2px" ><table cellpadding="0" cellspacing="0" border="0" width="100%" height="100%" align = center ><tr height="1"><td width="1"  ><img src="/images/attach3/t_left.gif"width=8 height=8 ></td><td width="100" bgcolor="F1EFFA"></td>		<td width="1" align="right" ><img src="/images/attach3/t_right.gif"width=8 height=8 ></td></tr><tr valign="top" ><td width="8" bgcolor="F1EFFA"></td><td bgcolor="F1EFFA" valign="top" width=100%>'+
	
'<table cellpadding="0" cellspacing="0" border="0" style="table-layout:fixed;position:absolute;"><tr>'+
'<td style="font-size:11px"  ><img src="/f.php?text='+icon+title+'&font=yg330&size2=4&bg=F1EFFA&color=#5B5B5B&mk_btn=Y" >'+ne_img+'</td>'+
'</tr>'+
'<tr><td valign = bottom>'+
'<font style = "font-size:10px;color:#0033FF"><div id='+name+'[sizev] style = "font-size:11px;color:#676767;">'+ w_view + ' x ' + h_view + '</div></font>' +
(is_part > 0 ? '<div  id="partT['+name+']"><a href="javascript:editPart(\'' + name + '\');"><img src="/edit.gif" ></a> <a href="javascript:deletePart(\'' + name + '\');"><img src="/del.gif" ></a></div>' : '')  +
'</td></tr>'+


'</table>'+

'</td><td width="8" bgcolor="F1EFFA" ></td></tr><tr height="1"><td width="1" ><img src="/images/attach3/b_left.gif"width=8 height=8 ></td><td  bgcolor="F1EFFA"></td>	<td width="1" ><img src="/images/attach3/b_right.gif"width=8 height=8 ></td></tr></table></TD></TR></TABLE>'+

'<a href="javascript:moveLayout(\''+name+'\',\'NONE\');" style ="z-index:9999999" ><img id = "[xxx]'+name+'" src=/html/attach/admin/xxx.gif style="top:5px;left:'+width3+';position:absolute;cursor:hand;" '+		
' align=absmiddle style="padding-bottom:10px"></a>';
}



}else{

if(!strstr(name , "bbs") ){
var icon = '<img src=/image/basic_icon.gif align = absmiddle>';
var type = 'basic';
var tip = 'basic';
}else {
var icon = '<img src=/image/bbs_icon.gif align = absmiddle>';
var type = 'bbs';
}

if(is_part >0){
var icon = '<img src=/image/html_icon.gif align = absmiddle>';
var type = 'html';
}




var htxml =	'<table cellpadding="0" cellspacing="0" border="0" width=100% bgcolor=#FFFFFF ><tr>'+
'<td style="font-size:11px;border-left:1px solid #E3E3E3;;border-right:1px solid #E3E3E3;border-bottom:1px solid #E3E3E3;padding:4px"  ><div style = "float:left;font-size:11px;" id="">'+icon+' '+title+ ne_img+
'&nbsp;</div><font style = "font-size:10px;color:#0033FF;"><div id='+name+'[sizev] style = "font-size:7pt;color:#676767;float:left;display:none">'+ w_view + ' x ' + h_view + '</div></font>' +
(is_part > 0 ? '<div  id="partT['+name+']" style="float:left;"> <a href="javascript:editPart(\'' + name + '\');"><img src="/edit.gif" ></a> <a href="javascript:deletePart(\'' + name + '\');"><img src="/del.gif" ></a></div>' : '')  +
'</td></tr>'+
'</table>'+
'<div style = "font-size:11px;;display:none" id="'+name+'(bbs_ee)"></div>'+
'<div style = "display:none" id="'+name+'(bbs_eee)">sad</div>'+
'<a href="javascript:moveLayout(\''+name+'\',\'NONE\');" style ="z-index:9999999;display:none" ><img id = "[xxx]'+name+'" src=/html/attach/admin/xxx.gif style="top:5px;left:'+width3+';position:absolute;cursor:hand;" '+		
' align=absmiddle style="padding-bottom:10px"></a>';


$(name+'[la]').style.width='100%';
$(name+'[la]').style.height='10';
}

$(name+'[la]').innerHTML = htxml;

if(strstr(name , "bbs") ){
var bbs_title = $(name+'[bbs_title]').value;
var type = $(name+'[type]').value;
def_bbs(name,type,bbs_title);
}
}



	function appendPanel(layer, name, title, width, avail_layer, avail_width, removable, is_part, bg, h,type,line,max,len,line_c,subject,img_w,img_h,idx,Ptop,Pleft,Pright,Pbottom,bbs_title,bbs_code) {
		html_layers = '';
		html_layers2 = '';
		if(removable) html_layers += '<option value="NONE">NONE</option>';
		for(i=0, cnt = avail_layer.length; i<cnt; i++) {
			
		html_layers += '<option value="' + avail_layer[i] + '"' + 
							(layer == avail_layer[i] ? ' selected' : '') +
							'>' + avail_layer[i] + '</option>';
			
			html_layers2 = avail_layer[0]; 
		}


		html_widths = '';
		html_widths2 = '';
		for(i=0, cnt = avail_width.length; i<cnt; i++) {
			html_widths += '<option value="' + avail_width[i] + '"' + 
							(width == avail_width[i] ? ' selected' : '') +
							'>' + avail_width[i] + '</option>';
			}

			if(avail_width.length > 1) 	var wwidth = "Y";
			if (!h)	var h = "80";
			
		if(layer == 'NONE') width = '100%'
		var width2 = parseInt(width) - 3  ;	
		

		
		if(h < 20) h2 = 20; else h2 = h;
		
	
		title = str_replace(" ","",title);

		if(layer =="NONE") var is_None = "y"; else var is_None = null;

		html = 
		'<div  id="' + name + '[la]" style="width : '+width2+';  height: '+h+'"></div>' +


		'<select style = "font-size:11px;width:80px" name="' + name + '[layer]" id="' + name + '[layer]"  style="display:none">' 
		+ html_layers + 
		'</select>' +

		'<input type = "hidden" name="' + name + '[subject]"  id="' + name + '[subject]" value="'+subject+'" style="width:30">'  +
		'<input type = "hidden" name="' + name + '[title]"  id="' + name + '[title]" value="'+title+'" style="width:30">'  +
		'<input type = "hidden" name="' + name + '[width]"  id="' + name + '[width]" value="'+width+'" >'  +
		'<input type = "hidden" name="' + name + '[height]"  id="' + name + '[height]" value="'+h+'" >' +
		'<input type = "hidden" name="' + name + '[is_part]"  id="' + name + '[is_part]" value="'+is_part+'" >' +

		'<input type = "hidden" name="' + name + '[Ptop]"  id="' + name + '[Ptop]" value="'+Ptop+'" >' +
		'<input type = "hidden" name="' + name + '[Pleft]"  id="' + name + '[Pleft]" value="'+Pleft+'" >' +
		'<input type = "hidden" name="' + name + '[Pright]"  id="' + name + '[Pright]" value="'+Pright+'" >' +
		'<input type = "hidden" name="' + name + '[Pbottom]"  id="' + name + '[Pbottom]" value="'+Pbottom+'" >' +

		'<input type = "hidden" name="' + name + '[type]"  id="' + name + '[type]" value="'+type+'" >' +
		'<input type = "hidden" name="' + name + '[bbs_code]"  id="' + name + '[bbs_code]" value="'+bbs_code+'" >' +
		'<input type = "hidden" name="' + name + '[bbs_title]"  id="' + name + '[bbs_title]" value="'+bbs_title+'" >' +
		
		'<input type="hidden" name="pannels[]" value="' + name + '">';


		el = document.createElement('DIV');
		el.id = name;
		el.className = avail_layer.join(' ') + (removable ? ' NONE' : '');
		el.style.styleFloat = 'left';
		el.style.width = width;
		el.style.padding = '0';
		
		el.innerHTML = html;
		$(layer).appendChild(el);
		new Draggable(name, {
			revert:true,
			handle:'t_handle',
			ghosting:false,
			onUpdate:OnLayerChange,starteffect:OnDragStartEffect,endeffect:OnDragEndEffect,reverteffect:OnReverteffect
		
				
			});

		
		
		//OnDragEffect(el);

		}
	
		function def_css(id, uu, bg_no,reSize) {
		if(id =="NONE") {
		}else{
		$(id).style.padding='0';

		$(id + '_width').value = parseInt(document.getElementById(id).currentStyle.width) / parseInt(uu) ;

		if(reSize =="Y") {
		$(id).resizedistance = "7";
		$(id).resizemaxwidth = parseInt(document.getElementById('main_layout').currentStyle.width);
		$(id).resizemaxheight = 600;

		$(id).resizable = "false";
		$(id).resizable_a = true;
		$(id).resizedefaultcursor = "move";



		switch (id) {
			case "LEFT":
			var layno = "1"			
			 break;
			case "MAIN":
			var layno = "6"; 
			break;

			case "RIGHT":
			var layno = "5"; 
			break;

			case "LOGO_TOP":
			var layno = "2"; 
			break;

			case "TOP":
			var layno = "4"; 
			break;

			case "FOOT":
			var layno = "7"; 
			break;

			case "TOP_BUTTON":
			var layno = "3"; 
			break;

		
			}
		if(id != "main_layout"){
		$(id).style.backgroundImage='url(/f.php?text='+layno+'&font=yg330&size2=8&bg=82848D&color=FFFF00)';
		$(id).style.backgroundRepeat='no-repeat';
		$(id).style.backgroundPosition='50% 50%';
		}
		}else{
		if(bg_no) $(id).style.backgroundImage='url()';
		}
	

		$(id).style.width = parseInt(document.getElementById(id).currentStyle.width)  / parseInt(uu) ;


		$(id + '_height').value = parseInt(document.getElementById(id).currentStyle.height) / parseInt(uu) ;
		$(id).style.height = parseInt(document.getElementById(id).currentStyle.height)  / parseInt(uu) ;


		}
		}






			function setLayer (){

			if($('LEFT').currentStyle.display != "none")  $('LEFT_chk_layer').checked = true;
			if($('LOGO_TOP').currentStyle.display != "none")  $('LOGO_TOP_chk_layer').checked = true;
			if($('TOP_BUTTON').currentStyle.display != "none")  $('TOP_BUTTON_chk_layer').checked = true;
			if($('TOP').currentStyle.display != "none")  $('TOP_chk_layer').checked = true;
			if($('RIGHT').currentStyle.display != "none")  $('RIGHT_chk_layer').checked = true;
			if($('MAIN').currentStyle.display != "none")  $('MAIN_chk_layer').checked = true;
			if($('FOOT').currentStyle.display != "none")  $('FOOT_chk_layer').checked = true;

			}

			function setLayerset (idx){

			if($(idx.code).currentStyle.display == "none") {

			modify_style('#'+idx.code,'display','');


			}else{ 
			modify_style('#'+idx.code,'display','none');
			}
			}


			function ToolbarView(id) {
			
			if(id) { tar_lay = id; id = explode("[",id);	id = id[0];  
			$('conWidth').value= parseInt($(id+'[width]').value) * 2;	$('conHeight').value= parseInt($(id+'[height]').value) *2;
			title = $(id+'[title]').value; $('size_title').innerHTML = "<b>"+title+"</b>"; $('style_size').style.display=''; $('def_stool').style.display='none'; }else{ $('style_size').style.display='none'; $('def_stool').style.display='';  }	} 

	function resizeing(id,setup){ var LOGO_TOP = $('LOGO_TOP');var TOP_BUTTON = $('TOP_BUTTON');var TOP = $('TOP');var LEFT =		$('LEFT');var MAIN = $('MAIN');var RIGHT = $('RIGHT');var FOOT = $('FOOT');if(!setup) {setup = "Y";}if(setup =="Y") {
		$('help').innerHTML = '<img src = "/f.php?text=마우스로 컨텐츠를 원하는 위치에 드래그 하십시요.&font=yg330&size2=5&bg=898B93&color=FFF82C&mk_btn=Y"><br><img src = "/f.php?text=레이아웃영역을 마우스로 드래그하면 영역 사이즈를 변경할 수 있습니다.&font=yg330&size2=5&bg=898B93&color=FFFFFF&mk_btn=Y">';


	LOGO_TOP.resizable_a = false;LOGO_TOP.resizable = "true";LOGO_TOP.style.textAlign="center";TOP_BUTTON.resizable_a = false;TOP_BUTTON.resizable = "true";TOP_BUTTON.style.textAlign="center";TOP.resizable_a = false;TOP.resizable = "true";TOP.style.textAlign="center";LEFT.resizable_a = false;LEFT.resizable = "true";LEFT.style.textAlign="center";MAIN.resizable_a = false;MAIN.resizable = "true";MAIN.style.textAlign="center";RIGHT.resizable_a = false;RIGHT.resizable = "true";RIGHT.style.textAlign="center";FOOT.resizable_a = false;FOOT.resizable = "true";FOOT.style.textAlign="center";

	Sortable.destroy(id);
	Sortable.create("LOGO_TOP", {dropOnEmpty:true,treeTag:'div',tag:'div',containment:["LEFT","MAIN","RIGHT","LOGO_TOP","TOP","FOOT","TOP_BUTTON","NONE","MAIN_TOP","MAIN_FOOT"],accept:["LOGO_TOP"],constraint:false,handle:'t_handle',onUpdate:OnLayerChange,starteffect:OnDragStartEffect,endeffect:OnDragEndEffect,reverteffect:OnReverteffect});Sortable.create("TOP_BUTTON", {dropOnEmpty:true,treeTag:'div',tag:'div',containment:["LEFT","MAIN","RIGHT","LOGO_TOP","TOP","FOOT","TOP_BUTTON","NONE","MAIN_TOP","MAIN_FOOT"],accept:["TOP_BUTTON"],constraint:false,handle:'t_handle',onUpdate:OnLayerChange,starteffect:OnDragStartEffect,endeffect:OnDragEndEffect,reverteffect:OnReverteffect});Sortable.create("TOP", {dropOnEmpty:true,treeTag:'div',tag:'div',containment:["LEFT","MAIN","RIGHT","LOGO_TOP","TOP","FOOT","TOP_BUTTON","NONE","MAIN_TOP","MAIN_FOOT"],accept:["TOP"],constraint:false,handle:'t_handle',onUpdate:OnLayerChange,starteffect:OnDragStartEffect,endeffect:OnDragEndEffect,reverteffect:OnReverteffect});Sortable.create("LEFT", {dropOnEmpty:true,treeTag:'div',tag:'div',containment:["LEFT","MAIN","RIGHT","LOGO_TOP","TOP","FOOT","TOP_BUTTON","NONE","MAIN_TOP","MAIN_FOOT"],accept:["LEFT"],constraint:false,handle:'t_handle',onUpdate:OnLayerChange,starteffect:OnDragStartEffect,endeffect:OnDragEndEffect,reverteffect:OnReverteffect});Sortable.create("MAIN", {dropOnEmpty:true,treeTag:'div',tag:'div',containment:["LEFT","MAIN","RIGHT","LOGO_TOP","TOP","FOOT","TOP_BUTTON","NONE","MAIN_TOP","MAIN_FOOT"],accept:["MAIN"],constraint:false,handle:'t_handle',onUpdate:OnLayerChange,starteffect:OnDragStartEffect,endeffect:OnDragEndEffect,reverteffect:OnReverteffect});Sortable.create("RIGHT", {dropOnEmpty:true,treeTag:'div',tag:'div',containment:["LEFT","MAIN","RIGHT","LOGO_TOP","TOP","FOOT","TOP_BUTTON","NONE","MAIN_TOP","MAIN_FOOT"],accept:["RIGHT"],constraint:false,handle:'t_handle',onUpdate:OnLayerChange,starteffect:OnDragStartEffect,endeffect:OnDragEndEffect,reverteffect:OnReverteffect});Sortable.create("FOOT", {dropOnEmpty:true,treeTag:'div',tag:'div',containment:["LEFT","MAIN","RIGHT","LOGO_TOP","TOP","FOOT","TOP_BUTTON","NONE","MAIN_TOP","MAIN_FOOT"],accept:["FOOT"],constraint:false,handle:'t_handle',onUpdate:OnLayerChange,starteffect:OnDragStartEffect,endeffect:OnDragEndEffect,reverteffect:OnReverteffect});Sortable.create("NONE", {dropOnEmpty:true,treeTag:'div',tag:'div',containment:["LEFT","MAIN","RIGHT","LOGO_TOP","TOP","FOOT","TOP_BUTTON","NONE","MAIN_TOP","MAIN_FOOT"],accept:["NONE"],handle:'t_handle',onUpdate:OnLayerChange,starteffect:OnDragStartEffect,endeffect:OnDragEndEffect,reverteffect:OnReverteffect});Sortable.create("MAIN_TOP", {dropOnEmpty:true,treeTag:'div',tag:'div',containment:["LEFT","MAIN","RIGHT","LOGO_TOP","TOP","FOOT","TOP_BUTTON","MAIN_TOP","MAIN_FOOT","NONE"],accept:["MAIN_TOP"],constraint:false,handle:'t_handle',onUpdate:OnLayerChange,starteffect:OnDragStartEffect,endeffect:OnDragEndEffect,reverteffect:OnReverteffect});Sortable.create("MAIN_FOOT", {dropOnEmpty:true,treeTag:'div',tag:'div',containment:["LEFT","MAIN","RIGHT","LOGO_TOP","TOP","FOOT","TOP_BUTTON","MAIN_TOP","MAIN_FOOT","NONE"],accept:["MAIN_FOOT"],constraint:false,handle:'t_handle',onUpdate:OnLayerChange,starteffect:OnDragStartEffect,endeffect:OnDragEndEffect,reverteffect:OnReverteffect});




}else{  
			
	$('help').innerHTML = '<img src = "/f.php?text=마우스로 레이아웃 영역을 배치합니다.&font=yg330&size2=5&bg=898B93&color=FFF82C&mk_btn=Y"><br><img src = "/f.php?text=원하시는 위치로 각각의 레이아웃을 이동하세요.&font=yg330&size2=5&bg=898B93&color=FFFFFF&mk_btn=Y">';

	Sortable.destroy('LOGO_TOP');LOGO_TOP.resizable_a = true;LOGO_TOP.resizable = "false";LOGO_TOP.style.border = '1px solid B1B4C0';LOGO_TOP.style.textAlign="center";Sortable.destroy('TOP_BUTTON');TOP_BUTTON.resizable_a = true;TOP_BUTTON.resizable = "false";TOP_BUTTON.style.border = '1px solid B1B4C0';TOP_BUTTON.style.textAlign="center";Sortable.destroy('TOP');TOP.resizable_a = true;TOP.resizable = "false";TOP.style.border = '1px solid B1B4C0';TOP.style.textAlign="center";Sortable.destroy('LEFT');LEFT.resizable_a = true;LEFT.resizable = "false";LEFT.style.border = '1px solid B1B4C0';LEFT.style.textAlign="center";Sortable.destroy('MAIN');MAIN.resizable_a = true;MAIN.resizable = "false";MAIN.style.border = '1px solid B1B4C0';MAIN.style.textAlign="center";Sortable.destroy('RIGHT');RIGHT.resizable_a = true;RIGHT.resizable = "false";RIGHT.style.border = '1px solid B1B4C0';RIGHT.style.textAlign="center";Sortable.destroy('FOOT');FOOT.resizable_a = true;FOOT.resizable = "false";FOOT.style.border = '1px solid B1B4C0';FOOT.style.textAlign="center";Sortable.destroy('NONE');$('NONE').resizable_a = true;$('NONE').resizable = "false";$('NONE').style.textAlign="center";Sortable.destroy('LOGO_TOP');Sortable.destroy('TOP_BUTTON');Sortable.destroy('TOP');Sortable.destroy('LEFT');Sortable.destroy('MAIN');Sortable.destroy('RIGHT');Sortable.destroy('FOOT');Sortable.destroy('NONE');Sortable.create(id, {treeTag:'div',tag:'div',constraint:false});}}



	function appendPart(serial, title) { // 2008-06-11 종태 추가 컨텐츠 작성시 추가 컨텐츠배치

	$('popup_box2').style.display = 'none'; 
	var name = 'part_' + serial; 
	
	appendPanel('NONE', name, title, '91', ["LEFT","MAIN","RIGHT","LOGO_TOP","TOP","FOOT","TOP_BUTTON","NONE","MAIN_TOP","MAIN_FOOT"], ['100%'],1,1, '', '100','','','','','','Y','','','0','0','0','0','0');
	resizeing('main_layout','Y');	
	conTable(name,'Y');
	}





function def_bbs(id,type,title_r){
title = explode(",",title_r);
title = title[0] + " 외"+'5개';
switch (type) {
										case "board":
					var img = title+"<br><img src='/html/attach/image/ico_list03.gif'><br>";
					 break;

 					case "gall":
					var img = title+"<br><img src='/html/attach/image/ico_list02.gif'><br>";
					 break;

 					case "webnews":
					var img = title +"<br><img src='/html/attach/image/ico_list01.gif'><br>";
					 break;

 					case "potal":
					var img = title +"<br><img src='/html/attach/image/ico_list04.gif'><br>";
					 break;
					}
				if(!img) var img = "게시판을 설정하세요.";
				
				$(id+'(bbs_ee)').innerHTML = img;

}


	function loadbbs() {
		var id = tar_lay;
		id = explode("[",id);	
		id = id[0];
		var bbs_code = $(id+'[bbs_code]').value;
		var bbs_title = $(id+'[bbs_title]').value;
		var type = $(id+'[type]').value;

		
		if(type) {
		$(type).checked = true;
		$('selectTypeTmp').value= type;
		}else{
		$('board').checked = false;
		$('gall').checked = false;
		$('webnews').checked = false;
		$('potal').checked = false;
		$('selectTypeTmp').value= '';
		}
	
		if(bbs_code) {
				
		bbs_code_c = explode(",",bbs_code);
		bbs_code_n = explode(",",bbs_title);
		for(i=1; i<6; i++) {
		
		$('bbs_list'+i).value= bbs_code_c[i-1]+'|'+bbs_code_n[i-1];	
		}
			

		}else{
		for(i=1; i<6; i++) {
		$('bbs_list'+i).value= '';
		}
		}
	}


function upBbsTrick(){
	var id = tar_lay;
	id = explode("[",id);	
	id = id[0];
	
	for(i=1; i<6; i++) {
	var a = $('bbs_list'+i).value;
	a = explode("|",a);
		
	var bbs_code = a[0];
	var bbs_title = a[1];
	
	if($('bbs_list'+i).value){
	if(!bbs_code_c) var bbs_code_c = bbs_code+','; else  bbs_code_c = bbs_code_c + bbs_code+',';
	if(!bbs_title_n) var bbs_title_n = bbs_title+','; else  bbs_title_n = bbs_title_n + bbs_title+',';
	}
	//var bbs_title_n = bbs_title_n + bbs_title+',';
	}
	
	
	var type = $('selectTypeTmp').value;

	def_bbs(id,type,bbs_title_n);
	$(id+'[type]').value=type;
	$(id+'[bbs_code]').value=bbs_code_c;
	$(id+'[bbs_title]').value=bbs_title_n;
}