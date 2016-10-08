
if(navigator.appName == "Netscape") {
 var nm= "ff";
}



function OnLayerChange (element) {
		
			if(element.hasChildNodes) {
				layer = element.id;
				len = element.childNodes.length;
				if (!layer_be){
				var layer_be = layer;
				}
				
				
				for(j = 1; j<len; j++) {
					el = element.childNodes[j];
					var sel = $(el.id + '[layer]');
					if(sel.options[sel.selectedIndex].value == layer) {  					
					continue;
					}
					
					if(sel.options.length) {
						for(i = 0; i<sel.options.length; i++) {
							
							if(sel.options[i].value == layer) {
								
							//alert(sel.options[i].value + ' + ' + layer);	
								var h = $(el.id+'[height]').value;
								
								$(el.id+'[width]').value = parseInt(element.style.width);
								$('conWidth').value = parseInt($(el.id+'[width]').value) *2;
								
								
								
								$(el).style.width = '99%';
								$(el.id+'[la]').style.width = '99%';
								sel.options[i].selected = true;
								changeWidthDb2(el.id, element.style.width, title,h);

								
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
		
		if($(id+'[layer]').value =="none") {
		document.getElementById(target).appendChild(document.getElementById(id));
		$(id+'[layer]').value = target;

		}else{
		document.getElementById('none').appendChild(document.getElementById(id));
		$(id+'[layer]').value = 'none';

		}

		title = $(id+'[title]').value;
		width = $(id+'[width]').value;
		h = $(id+'[height]').value;

		changeWidthDb(id, width,title,h);
		
	}
function changeWidth() {
		var lock = "";	
		if(lock =="y") {
			alert('레이아웃이 잠겨있습니다.\n울트라웹 본사에 문의하세요.');
			return
		}
		id = tar_lay;
		id = explode("[",id);	
		id = id[0];

		
		h2 = parseInt($(id+'[height]').value);
		target_i = $(id+'[layer]').value;
		if(target_i  !="none") {
			
		
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

		$(id+'[la]').style.width = maxWidth2 ;
		
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
		var lock = "";	
		if(lock =="y") {
			alert('레이아웃이 잠겨있습니다.\n울트라웹 본사에 문의하세요.');
			return
		}
		$(id).style.display = 'none';
		h2 = parseInt($(id+'[height]').value);
		target_i = $(id+'[layer]').value;
		
		if(target_i=='none') {
		$(id+'[sizev]').style.display='none';
		$(id).style.width = '100%'; 
		$(id+'[la]').style.width = '100%';


		}else{
		$(id+'[sizev]').style.display='';
		
		r_width1 = (parseInt($(target_i).style.width)) ;
        r_width1 = parseInt(r_width1);
		maxWidth2 = parseInt(r_width1)  ;
		maxWidth3 = parseInt(r_width1) - 20 ;
	

		if($('partT['+id+']')) $('partT['+id+']').style.left = parseInt(maxWidth2)  - 52;
		if($(id+'[sizev]')) $(id+'[sizev]').style.left = parseInt(maxWidth2)  - 52;
		
		

		
		$('[xxx]'+id).style.left=maxWidth3;
	
		$(id+'[sizev]').innerHTML = parseInt(maxWidth2) * 2 + " x " + parseInt(h2) *2;
		$(id).style.width = maxWidth2 - 4;
		$(id+'[la]').style.width = maxWidth2;
		$(id).style.height = h2;
		$(id+'[la]').style.height = h2;
		
		$(id+'[width]').value = maxWidth2;
		}
		$(id).style.display = '';

		conTable(id);
		
	}



	function changeWidthDb2(id, width,title,h) {
		var lock = "";	
		
		$(id).style.display = 'none';
		h2 = parseInt($(id+'[height]').value);
		target_i = $(id+'[layer]').value;


		if(target_i=='none') {
		$(id+'[sizev]').style.display='none';
		$(id).style.width = '100%'; 
		$(id+'[la]').style.width = '100%';


		}else{
		$(id+'[sizev]').style.display='';
		
		r_width1 = ($(id+'[width]').value) ;
        r_width1 = parseInt(r_width1);
		maxWidth2 = parseInt(r_width1)  ;
		maxWidth3 = parseInt(r_width1) - 20 ;
		

		if($('partT['+id+']')) $('partT['+id+']').style.left = parseInt(maxWidth2)  - 52;
		if($(id+'[sizev]')) $(id+'[sizev]').style.left = parseInt(maxWidth2)  - 52;
		
		$('[xxx]'+id).style.left=maxWidth3;
	
		$(id+'[sizev]').innerHTML = parseInt(maxWidth2) * 2 + " x " + parseInt(h2) *2;
		$(id).style.width = maxWidth2;
		$(id+'[la]').style.width = maxWidth2;
		$(id).style.height = h2;
		$(id+'[la]').style.height = h2;
		
		//$(id+'[width]').value = maxWidth2;
		}

		$(id).style.display = '';
		
		conTable(id);
		
	}


	function changeHeight(ssmu) {
		var lock = "";	
		if(lock =="y") {
			alert('레이아웃이 잠겨있습니다.\n울트라웹 본사에 문의하세요.');
			return
		}
		id = tar_lay;
		id = explode("[",id);	
		id = id[0];
		width = parseInt($(id+'[width]').value);
		
		if($(id+'[layer]').value  !="none") {
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
		var lock = "";	
		if(lock =="y") {
			alert('레이아웃이 잠겨있습니다.\n울트라웹 본사에 문의하세요.');
			return
		}
		id = tar_lay;
		id = explode("[",id);	
		id = id[0];
		
		if($(id+'[layer]').value  !="none") {

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
		var lock = "";	
		if(lock =="y") {
			alert('레이아웃이 잠겨있습니다.\n울트라웹 본사에 문의하세요.');
			return
		}
		id = tar_lay;
		id = explode("[",id);	
		id = id[0];
		var width = parseInt($(id+'[width]').value);
		var height = parseInt($(id+'[height]').value);
		
		if($(id+'[layer]').value  !="none") {

		var tmpNum = parseInt(idx)/2;
		
		$(id+'[height]').value = tmpNum;
		$(id).style.height = tmpNum;	
		$(id+'[la]').style.height = tmpNum;

		$(id+'[height]').value = tmpNum;
		$(id+'[sizev]').innerHTML = parseInt(width) * 2 + " x " + parseInt(tmpNum) *2
		

		}else{	alert('먼저 배치해주시기 바랍니다..');}

		}


	function changeWidthInput(idx) {
		var lock = "";	
		if(lock =="y") {
			alert('레이아웃이 잠겨있습니다.\n울트라웹 본사에 문의하세요.');
			return
		}
		id = tar_lay;
		id = explode("[",id);	
		id = id[0];
		var width = parseInt($(id+'[width]').value);
		var height = parseInt($(id+'[height]').value);
		
		if($(id+'[layer]').value  !="none") {


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
		
		var lock = "";	
		if(lock =="y") {
			alert('레이아웃이 잠겨있습니다.\n울트라웹 본사에 문의하세요.');
			return
		}
		id = tar_lay;
		id = explode("[",id);	
		id = id[0];
		
		if($(id+'[layer]').value  !="none") {

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
		
	fenster2('컨텐츠 편집', '컨텐츠 편집', 'attach.admin.add_part' + name,  '10%', '10%', '800px', '500px');
	}





	function editPart(name) {
	
		fenster2('컨텐츠 편집', '컨텐츠 편집', 'attach.admin.edit_part?name=' + name,  '10%', '10%', '800px', '500px');
	
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

		element._opacity = Element.getOpacity(element); 
	new Effect.Opacity(element, {duration:-1, from:element._opacity, to:0.4});	
		ToolbarView(element.id+ '[stool]');
		
		ta_layout = $(element.id+'[layer]').value;
		ta_width = element.style.width;

		$('[xxx]'+element.id).style.display='none';

		$('conWidth').value = parseInt($(element.id+'[width]').value) *2;
		$('conHeight').value = parseInt($(element.id+'[height]').value)*2;

		//if($(element).style.width >200 || ta_layout =="NONE") {
		$(element).style.width = '100%';
		$(element.id+'[la]').style.width = '100%';
			
		//}
		

	}



	function OnReverteffect(element, top_offset, left_offset) { 
	element._revert = new Effect.Move(element, { x: -left_offset, y: -top_offset, duration: "0.01"});

		
	
	}


 




	function OnDragEndEffect(element) {
		
		title = $(element.id+'[title]').value;
		width = $(element.id+'[width]').value;
		h = $(element.id+'[height]').value;

		$('[xxx]'+element.id).style.display='';



		if(ta_layout !='none'){
		if(ta_layout != $(element.id+'[layer]').value){
		//changeWidthDb2(element.id, width,title,h);
		}else{
		$(element.id+'[la]').style.width = parseInt(ta_width);
		$(element).style.width = ta_width;
		}
		}else{
		changeWidthDb2(element.id, width,title,h);
		}	

		element._opacity = Element.getOpacity(element); 
		new Effect.Opacity(element, {duration:-1, from:element._opacity, to:0.8});	

		/*if($(element.id+'(str_lock)')){
		var str_lock = $(element.id+'[str_lock]').value;	
		if(str_lock == "Y" ){
		
		$(element.id+'(str_lock)').checked = true; 
		}else {
		$(element.id+'(str_lock)').checked = true;
		}
		}*/
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
		var str_lock = $(name+'[str_lock]').value;	


		var lock = "";	


		if(ne) {
		var ne_img=" <img src='/image/iicon/ico_new2.gif'>";
		}else{
		var ne_img = '';
		}	

		if(layer != "none") {
		if(!strstr(name , "bbs") ){
		var icon = '[일반] ';
		}else {
		var icon = '[게시판] ';
		}

		if(is_part >0){
		var icon = '[HTML] ';
		}


		if(str_lock == "Y" ){
		var chk = ' checked ';
		}else {
		var chk = ' checked';
		}

		//2009-02-12 종태 주석품
		/*if(lock == "y" ){
		var chk = ' disabled  ';
		}*/

		if(strstr(name , "bbs") ){
		var htxml =	'<TABLE  cellpadding="0" cellspacing="0" border=0  align = center width="100%" height="100%"  '+
		'" onclick = "ToolbarView(\'' + name + '[stool]\' , \''+lock+'\')"	'+
		'style="" ><TR><TD valign = top style = "padding:2px" ><table cellpadding="0" cellspacing="0" border="0" width="100%" height="100%" align = center ><tr height="1px"><td width="1px"  ><img src="/images/attach2/t_left.gif"width="8px"px height=8px ></td><td width="100px" bgcolor="F9FCDD" ></td>		<td width="1px" align="right" ><img src="/images/attach2/t_right.gif"width="8px"px height=8px ></td></tr><tr valign="top" ><td width="8px" bgcolor="F9FCDD"></td><td bgcolor="F9FCDD" valign="top" width=99% >'+	
			
		'<table cellpadding="0" cellspacing="0" border="0" style="table-layout:fixed;position:absolute;" height="100%" width="85%"><tr>'+
		'<td style="font-size:11px"  ><img src="/f.php?text='+icon+title+'&font=yg330&size2=4&bg=F9FCDD&color=#5B5B5B&mk_btn=Y"  align=absmiddle >'+ne_img+'<input type="checkbox" name="'+name+'(str_lock)" onfocus="this.blur()" style="cursor: hand;width:10px;height:10px"  align=absmiddle '+chk+' onclick="chkLayer(this,\''+name+'\')" ></td>'+
		'</tr>'+
		'<tr><td valign = bottom>'+
		'<font style = "font-size:10px;color:#0033FF"><div id='+name+'[sizev] style = "font-size:10px;color:#676767;">'+ w_view + ' x ' + h_view + '</div></font>' +
		'</td></tr>'+

		'<tr><td align = center><div style = "font-size:11px" id="'+name+'(bbs_ee)"></div>'+
		'<div style = "display:none" id="'+name+'(bbs_eee)">sad</div></td></tr>'+

		'<tr height=80%><td align=center valign=bottom >&nbsp;</td></tr>'+

		'</table>'+

		'</td><td width="8px" bgcolor="F9FCDD" ></td></tr><tr height="1px"><td width="1px" ><img src="/images/attach2/b_left.gif"width="8px"px height=8px ></td><td  bgcolor="F9FCDD"></td>	<td width="1px" ><img src="/images/attach2/b_right.gif"width="8px"px height=8px ></td></tr>'+




		'</TABLE>'+



		'<a href="javascript:moveLayout(\''+name+'\',\'none\');" style ="z-index:9999999" ><img id = "[xxx]'+name+'" src=/html/attach/admin/xxx.gif style="top:5px;left:'+width3+';position:absolute;cursor:hand;" '+		
		' align=absmiddle style="padding-bottom:10px"></a>';




		}else {


		var htxml =	'<TABLE  cellpadding="0" cellspacing="0" border=0  align = center width="100%" height="100%"  '+
		'" onclick = "ToolbarView(\'' + name + '[stool]\' , \''+lock+'\')" 	'+
		'style=""><TR><TD valign = top style = "padding:2" ><table cellpadding="0" cellspacing="0" border="0" width="100%" height="100%" align = center ><tr height="1px"><td width="1px"   ><img src="/images/attach/t_left.gif" width="8px" height=8 ></td><td width="100px" bgcolor="f6f6f6" ></td>		<td width="1px" align="right" ><img src="/images/attach/t_right.gif"width="8px" height=8 ></td></tr><tr valign="top" ><td width="8" bgcolor="f6f6f6"></td><td bgcolor="f6f6f6" valign="top" width="100%">'+	
			
		'<table cellpadding="0" cellspacing="0" border="0" style="table-layout:fixed;position:absolute;" ><tr>'+
		'<td style="font-size:11px"  ><img src="/f.php?text='+icon+title+'&font=yg330&size2=4&bg=f6f6f6&color=#5B5B5B&mk_btn=Y" align=absmiddle>'+ne_img+'<input type="checkbox" name="'+name+'(str_lock)" onfocus="this.blur()"  style="cursor: hand;z-index:100000;width:10px;height:10px" align=absmiddle '+chk+' onclick="chkLayer(this,\''+name+'\')"></td>'+
		'</tr>'+
		'<tr><td valign = bottom>'+
		'<font style = "font-size:10px;color:#0033FF;padding:0px"><div id='+name+'[sizev] style = "font-size:10px;color:#676767;">'+ w_view + ' x ' + h_view + '</div></font>' +
		(is_part > 0 ? '<div  id="partT['+name+']"><a href="javascript:editPart(\'' + name + '\');"><img src="/edit.gif" ></a> <a href="javascript:deletePart(\'' + name + '\');"><img src="/del.gif" ></a></div>' : '')  +
		'</td></tr>'+
		'<tr> <td height = ></td></tr>'+
		'</table>'+

		'</td><td width="8" bgcolor="f6f6f6" ></td></tr><tr height="1px"><td width="1px"><img src="/images/attach/b_left.gif"width="8px" height=8></td><td  bgcolor="f6f6f6" ></td>	<td width="1px" ><img src="/images/attach/b_right.gif"width="8px" height=8></td></tr></table></TD></TR></TABLE>'+

		'<a href="javascript:moveLayout(\''+name+'\',\'none\');" style ="z-index:9999999" ><img id = "[xxx]'+name+'" src=/html/attach/admin/xxx.gif style="top:5px;left:'+width3+';position:absolute;cursor:hand;" '+		
		' align=absmiddle style="padding-bottom:10px"></a>';

		}

		if(is_part >0){
		var htxml =	'<TABLE  cellpadding="0" cellspacing="0" border=0  align = center width="100%" height="100%"  '+
		'" onclick = "ToolbarView(\'' + name + '[stool]\' , \''+lock+'\')" ondblclick="editPart(\'' + name + '\');"	'+
		'style=""><TR><TD valign = top style = "padding:2px" ><table cellpadding="0" cellspacing="0" border="0" width="100%" height="100%" align = center ><tr height="1px"><td width="1px"  ><img src="/images/attach3/t_left.gif"width="8px" height=8 ></td><td width="100" bgcolor="F1EFFA"></td>		<td width="1px" align="right" ><img src="/images/attach3/t_right.gif"width="8px" height=8 ></td></tr><tr valign="top" ><td width="8" bgcolor="F1EFFA"></td><td bgcolor="F1EFFA" valign="top" width="100%" style="overflow:hidden">'+
			
		'<table cellpadding="0" cellspacing="0" border="0" style="table-layout:fixed;position:absolute;"><tr>'+
		'<td style="font-size:11px"  ><img src="/f.php?text='+icon+title+'&font=yg330&size2=4&bg=F1EFFA&color=#5B5B5B&mk_btn=Y"  align=absmiddle>'+ne_img+'<input type="checkbox" name="'+name+'(str_lock)" onfocus="this.blur()" style="cursor: hand;z-index:1;width:10px;height:10px" align=absmiddle '+chk+' onclick="chkLayer(this,\''+name+'\')" ></td>'+
		'</tr>'+
		'<tr><td valign = bottom>'+
		'<font style = "font-size:10px;color:#0033FF"><div id='+name+'[sizev] style = "font-size:11px;color:#676767;float:left">'+ w_view + ' x ' + h_view + '</div></font>' +
		
		(is_part > 0 ? '<div  id="partT['+name+']" style=";float:left">&nbsp;&nbsp;<img src="/edit.gif" onclick="editPart(\'' + name + '\');" style="cursor: hand"> <img src="/del.gif" onclick="deletePart(\'' + name + '\');" style="cursor: hand"></div>' : '')  +
		'</td></tr>'+


		'</table>'+

		'</td><td width="8" bgcolor="F1EFFA" ></td></tr><tr height="1px"><td width="1px" ><img src="/images/attach3/b_left.gif"width="8px" height=8 ></td><td  bgcolor="F1EFFA"></td>	<td width="1px" ><img src="/images/attach3/b_right.gif"width="8px" height=8 ></td></tr></table></TD></TR></TABLE>'+

		'<a href="javascript:moveLayout(\''+name+'\',\'none\');" style ="z-index:9999999" ><img id = "[xxx]'+name+'" src=/html/attach/admin/xxx.gif style="top:5px;left:'+width3+';position:absolute;cursor:hand;" '+		
		' align=absmiddle style="padding-bottom:10px"></a>';
		}



		}else{

		$(name+'[str_lock]').value = "Y";

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




		var htxml ='<div style = "float:left;font-size:11px;;width:100%;border:1px solid #D9D9D9;padding:3px" id="">'+icon+' '+title+ ne_img+
		'&nbsp;<font style = "font-size:10px;color:#0033FF;"><div id='+name+'[sizev] style = "font-size:7pt;color:#676767;float:left;display:none">'+ w_view + ' x ' + h_view + '</div></font>' +

		(is_part > 0 ? '<div  id="partT['+name+']" style="float:right;"> <img src="/edit.gif" style="cursor: hand" onclick="editPart(\'' + name + '\');"> <img src="/del.gif" style="cursor: hand" onclick="deletePart(\'' + name + '\');"></div>' : '')  +



		'<div style = "font-size:11px;;display:none" id="'+name+'(bbs_ee)"></div>'+
		'<div style = "display:none" id="'+name+'(bbs_eee)">sad</div>'+
		'<a href="javascript:moveLayout(\''+name+'\',\'none\');" style ="z-index:9999999;display:none" ><img id = "[xxx]'+name+'" src=/html/attach/admin/xxx.gif style="top:5px;left:'+width3+';position:absolute;cursor:hand;" '+		
		' align=absmiddle style="padding-bottom:10px"></a></div>';


		$(name+'[la]').style.width='100%';
		$(name+'[la]').style.height='20px';

		$(name).style.width='100%';
		$(name).style.height='20px';
		}

		$(name+'[la]').innerHTML = htxml;

		if(strstr(name , "bbs") ){
		var bbs_title = $(name+'[bbs_title]').value;
		var type = $(name+'[type]').value;
		def_bbs(name,type,bbs_title);
		}
		}

		function chkLayer(el,id){
		if(el.checked == true) {
		$(id+"[str_lock]").value = "Y";
		//$(id).disabled = "";

		}else{
		$(id+"[str_lock]").value = "N";
		//$(id).disabled = "true";

		}
		}

	function appendPanel(layer, name, title, width, avail_layer, avail_width, removable, is_part, bg, h,type,line,max,len,line_c,subject,img_w,img_h,idx,Ptop,Pleft,Pright,Pbottom,bbs_title,bbs_code,str_lock) {
		html_layers = '';
		html_layers2 = '';
		if(removable) html_layers += '<option value="none">none</option>';
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
			if (!h)	var h = "80px";
			
		if(layer == 'none') width = '100%'
		var width2 = parseInt(width) -4  ;	
		

		
		if(h < 20) h2 = 20; else h2 = h+'px';
		
	
		title = str_replace(" ","",title);

		if(layer =="none") var is_None = "y"; else var is_None = null;

		html = 
		'<div  id="' + name + '[la]" style="width : '+width2+'px;  height: '+h+'px"></div>' +


		'<div style="display:none"><select style = "font-size:11px;width:80px" name="' + name + '[layer]" id="' + name + '[layer]"  style="display:none;width:0px;height:0px">' 
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
		'<input type = "hidden" name="' + name + '[str_lock]"  id="' + name + '[str_lock]" value="'+str_lock+'" >' +

		'<input type = "hidden" name="' + name + '[type]"  id="' + name + '[type]" value="'+type+'" >' +
		'<input type = "hidden" name="' + name + '[bbs_code]"  id="' + name + '[bbs_code]" value="'+bbs_code+'" >' +
		'<input type = "hidden" name="' + name + '[bbs_title]"  id="' + name + '[bbs_title]" value="'+bbs_title+'" >' +
		
		'<input type="hidden" name="pannels[]" value="' + name + '"></div>';


		el = document.createElement('DIV');
		el.id = name;
		el.className = avail_layer.join(' ') + (removable ? ' none' : '');

		if(!nm)  	el.style.styleFloat = 'left'; else  	el.style.cssFloat = 'left';

		el.style.width = width2+'px';
		el.style.padding = '0';
		el.style.border = '0px';
		
		el.innerHTML = html;
		
		$(layer).appendChild(el);
		OnDragEffect(el);
		

		try { 
        return el; 

      } finally { 
        el = null; 
      } 


		
		}
	
		function def_css(id, uu, bg_no,reSize,title) {
		if(id =="none") {
		}else{
		$(id).style.padding='0';
		
		if(id != "main_layout"){
			if(!title) $(id).style.display = 'none';
		}

		if(reSize =="Y") {
		$(id).resizedistance = "7";
		$(id).resizemaxwidth = 430;
		$(id).resizemaxheight = 600;
		$(id).style.position="static";
		$(id).resizable = "true";
		$(id).resizable_a = false;
		$(id).resizedefaultcursor = "move";


		/*
		if(!nm){
		$(id).resizemaxwidth = parseInt(document.getElementById('main_layout').currentStyle.width) - 50;
		}else{
		$(id).resizemaxwidth = parseInt(document.defaultView.getComputedStyle(document.getElementById('main_layout'),null).width) - 50;
		}
		*/

		$(id).resizemaxwidth = 430;


		}else{
		if(bg_no) $(id).style.backgroundImage='url()';
		}

		
		
		if(id != "main_layout"){

		if(title){ 
			$(id).style.backgroundImage='url("/f.php?text='+title+'&font=yg330&size2=6&bg=616d77&color=FFFF00")';
		}else{
			$(id).style.backgroundImage='url("/f.php?text='+id+'&font=yg330&size2=6&bg=616d77&color=FFFF00")';
		}
		$(id).style.backgroundRepeat='no-repeat';
		$(id).style.backgroundPosition='50% 50%';
		}

		
		if(!nm){
		$(id).style.width = parseInt(document.getElementById(id).currentStyle.width)  / parseInt(uu) ;
		var HHeight = parseInt(document.getElementById(id).currentStyle.height) + "px";
		if(HHeight >0) {
		$(id).style.height = parseInt(document.getElementById(id).currentStyle.height)  / parseInt(uu) ;
		}else{
		$(id).style.height = '30px'
		}
		
		
		}else{
		
		$(id).style.width = parseInt(document.defaultView.getComputedStyle(document.getElementById(id),null).width)  / parseInt(uu);
		
		var HHeight = parseInt(document.defaultView.getComputedStyle(document.getElementById(id),null).height);
		
		if(HHeight >0 && id != "main_layout") {
		$(id).style.height = parseInt(document.defaultView.getComputedStyle(document.getElementById(id),null).height)  / parseInt(uu);
		}else{
		//$(id).style.height = '30px'
		}

		
		
		}
		
		

		}

		
		}



			function setLayer (){
/*
			if($('left').currentStyle.display != "none")  $('left_chk_layer').checked = true;
			if($('top').currentStyle.display != "none")  $('top_chk_layer').checked = true;
			if($('right').currentStyle.display != "none")  $('right_chk_layer').checked = true;
			if($('main').currentStyle.display != "none")  $('main_chk_layer').checked = true;
			if($('bottom').currentStyle.display != "none")  $('bottom_chk_layer').checked = true;
			if($('foot').currentStyle.display != "none")  $('foot_chk_layer').checked = true;
*/
			}

			function setLayerset (idx){

			if($(idx.code).currentStyle.display == "none") {

			modify_style('#'+idx.code,'display','');


			}else{ 
			modify_style('#'+idx.code,'display','none');
			}
			}


			function ToolbarView(id) {
			
			if(id) { 
			tar_lay = id; 
			id = explode("[",id);	
			id = id[0];  
			
			

			$('conWidth').value= parseInt($(id+'[width]').value) * 2;	
			$('conHeight').value= parseInt($(id+'[height]').value) *2;
			title = $(id+'[title]').value; $('size_title').innerHTML = "<b>"+title+"</b>"; $('style_size').style.display=''; $('def_stool').style.display='none'; 
			
			}else{ 
				
			$('style_size').style.display='none'; 
			$('def_stool').style.display='';  
			
			}	
			} 




			function appendPart(serial, title) { // 2008-06-11 종태 추가 컨텐츠 작성시 추가 컨텐츠배치

			//$('popup_box2').style.display = 'none'; 
			var name = 'part_' + serial; 
			
			appendPanel('none', name, title, '91', ["cont1","cont2","cont3","cont4","cont5","cont6","none","cont7","cont8"], ['100%'],1,1, '', '100','','','','','','Y','','','0','0','0','0','0');
			resizeing('main_layout','Y');	
			conTable(name,'Y');
			}





					function def_bbs(id,type,title_r){
					title = explode(",",title_r);
					
					

					title = title[0]+"..";
															
					var img = title+"<br><img src='/html/attach/image/ico_list03.gif'><br>";

				if(!img) var img = "게시판을 설정하세요.";
				
				$(id+'(bbs_ee)').innerHTML = img;

}


	function loadbbs() {

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