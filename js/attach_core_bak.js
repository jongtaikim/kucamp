function OnLayerChange (element) {
		
			if(element.hasChildNodes) {
				layer = element.id;
				len = element.childNodes.length;
				for(j = 1; j<len; j++) {
					el = element.childNodes[j];
					//alert(layer);
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
	$(target_name+"["+target+"]").value = el.value
	
	if(target == "type" ) {
	if(w) $(target_name+"[width]").value = w
	if(h) $(target_name+"[height]").value = h
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
		$(id+'[chkbox]').checked = true;
		}else{
		document.getElementById('NONE').appendChild(document.getElementById(id));
		$(id+'[layer]').value = 'NONE';
		$(id+'[chkbox]').checked = false;
		}

		title = $(id+'[title]').value;
		width = $(id+'[width]').value;
		h = $(id+'[height]').value;

		changeWidthDb(id, width,title,h);
		
	}

	function changeWidth(id, width,title,h) {
		
		h2 = parseInt($(id+'[height]').value)
		target_i = $(id+'[layer]').value;
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
		 maxWidth3 = parseInt(maxWidth)-15 ;

		$(id+'[la]').style.width = maxWidth2;
		
		$('[xxx]'+id).style.left=maxWidth3
		$('[img]'+id).src = '/module/btn/module.php?text=' + title +'&w='+maxWidth2+'&h='+h2;
		
		$(id).style.width = maxWidth2;
		$(id+'[width]').value = maxWidth2;
		}




	function changeWidthDb(id, width,title,h) {
		$(id).style.display = 'none';
		h2 = parseInt($(id+'[height]').value)
		target_i = $(id+'[layer]').value;
		r_width1 = (parseInt($(target_i).style.width)) ;
        r_width1 = parseInt(r_width1);
		maxWidth2 = parseInt(r_width1) - 3 ;
		maxWidth3 = parseInt(r_width1) - 22 ;
		
		$(id+'[la]').style.width = maxWidth2;
		$('[xxx]'+id).style.left=maxWidth3
		$('[img]'+id).src = '/module/btn/module.php?text=' + title +'&w='+maxWidth2+'&h='+h2;
		$(id).style.width = maxWidth2;
		$(id+'[width]').value = maxWidth2;
		$(id).style.display = '';
	
	}


	function changeHeight(id, width,title,h,ssmu,s) {

		var s = $(id+'[xxxe]').value;
		if(!s) s= 2;
		if(ssmu =="up") {
		h = parseInt($(id+'[height]').value) + parseInt(s);
		}else{
		h = parseInt($(id+'[height]').value) - parseInt(s);
		}
		
		width = parseInt($(id+'[width]').value)

		$(id).style.width = width;
		$(id).style.height = h;	
		$(id+'[height]').value = h;
		$(id+'[la]').style.width = width;
		$(id+'[la]').style.height = h;
		$(id+'[width]').value = width;
		
		$('[img]'+id).src = '/module/btn/module.php?text=' + title +'&w='+width+'&h='+h;
	
		}


	function changeWidth2(id, width,title,h,ssmu,s) {
		
		var s = $(id+'[xxxe]').value;
		if(!s) s= 2;
		if(ssmu =="up") {
		h = parseInt($(id+'[width]').value) + parseInt(s);
		}else{
		h = parseInt($(id+'[width]').value) - parseInt(s);
		}
		
		height = parseInt($(id+'[height]').value)

		$(id).style.height = height;
		$(id).style.width = h;	

		$('[xxx]'+id).style.left = parseInt(h) - 15;
		
		$(id+'[height]').value = height;
		$(id+'[la]').style.width = h;
		$(id+'[la]').style.height = height;
		$(id+'[width]').value = h;
		
		$('[img]'+id).src = '/module/btn/module.php?text=' + title +'&w='+h+'&h='+height;
	
		}


	function addPart() {
		
		var x = (document.body.clientWidth / 2) - (785 / 2 ) - 20 ; 
		
		fenster2('컨텐츠 추가', '컨텐츠 추가','attach.admin.add_part',x,'30','785','630');
	}

	function editPart(name) {
		var x = (document.body.clientWidth / 2) - (785 / 2 ) - 20 ; 
		fenster2('컨텐츠 편집', '컨텐츠 편집','attach.admin.edit_part?name=' + name,x,'30','785','630');
	}

	function deletePart(name) {
		if(!confirm('정말 삭제하시겠습니까?')) return false;
		document.frames['hidden_frame'].location.reload('attach.admin.delete_part?name=' + name);
		
		//alert(name+'[part_td]');
		$(name+'[part_td]').style.display='none';

	
	}



	function appendPart(serial, title) { // 2008-06-11 종태 추가 컨텐츠 작성시 추가 모듈배치
	
	location.reload();

	}


	function appendPartBoard(name, title) { // 2008-06-11 종태 추가 컨텐츠 작성시 추가 모듈배치
	location.reload();
	}




	function removePart(name) { //2008-06-11 모듈 지우기 종태
		el = $(name);
		layer = el.parentNode;
		layer.removeChild(el);
	}


	function selectHerf(val) {
	location.href="/attach.admin.manage?layout=" + val;
	}


	function OnDragEffect(element,idx) { // 2008-06-11 시작시 약간의 투명도를 지정함
		if(!idx) {
		
		element._opacity = Element.getOpacity(element); 
		new Effect.Opacity(element, {duration:-1, from:element._opacity, to:0.8});	
		}else{
		element._opacity = Element.getOpacity(element); 
		new Effect.Opacity(element, {duration:-1, from:element._opacity, to:1});	
		
		}
		
		}
	
	function OnDragStartEffect(element) { // 2008-06-11 드래그 이벤트시 투명한 이팩트
		ToolbarView(element.id+ '[stool]');
		
		ta_layout = $(element.id+'[layer]').value;
		ta_width = element.style.width;

		$('[xxx]'+element.id).style.display='none';

		$(element).style.width = '100%';
		$(element.id+'[la]').style.width = '100%';
					
		$(element.id+'[la]').style.border='1px dotted #ffffff'
		
		$(element.id+'[la]').style.backgroundColor = '#9A9A9A';
		
		$('[img]'+element.id).style.display="none";
		
		$(element.id+'[la]').style.backgroundImage = '';
		//Element.classNames(element).each(function(layer) { /$(layer).style.border = '1px solid B1B4C0';  });
	}



function OnRevertEffect(element,top_offset, left_offset) { // 2008-06-11 드래그 이벤트시 투명한 이팩트
		ToolbarView(element.id+ '[stool]');

		title = $(element.id+'[title]').value;
		width = $(element.id+'[width]').value;
		h = $(element.id+'[height]').value;

		$('[xxx]'+element.id).style.display='';
		
		$(element.id+'[la]').style.width = ta_width;
		$(element).style.width = ta_width;
		
		$('[img]'+element.id).style.display="";
		
		$(element.id+'[la]').style.backgroundImage = '';

		 var dur = Math.sqrt(Math.abs(top_offset^2)+Math.abs(left_offset^2))*0.02;
        element._revert = new Effect.Move(element, { x: -left_offset, y: -top_offset, duration: dur});
		//Element.classNames(element).each(function(layer) { /$(layer).style.border = '1px solid B1B4C0';  });
	}


 


	function OnDragEndEffect(element) { // 2008-06-11 마우스를 놓는순간 이팩트
		
		title = $(element.id+'[title]').value;
		width = $(element.id+'[width]').value;
		h = $(element.id+'[height]').value;

		$('[xxx]'+element.id).style.display='';

		$(element.id+'[la]').style.border='0px dotted #ffffff';
		
		if(ta_layout != $(element.id+'[layer]').value){
		changeWidthDb(element.id, width,title,h);
		}else{
		$(element.id+'[la]').style.width = ta_width;
		$(element).style.width = ta_width;
		}
		
		
		
		$('[img]'+element.id).style.display="";
		
	}


		function getBounds(tag,tag2) 
		{ 
			var ret = new Object(); 
				var rect = tag.getBoundingClientRect(); 
				ret.left = rect.left ; 
				ret.top = rect.top; 
			return ret; 
		} 


	function appendPanel(layer, name, title, width, avail_layer, avail_width, removable, is_part, bg, h,type,line,max,len,line_c,subject,img_w,img_h,idx,Ptop,Pleft,Pright,Pbottom) { //배치될 모듈생산 2008-06-11 종태
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
			

		var width2 = parseInt(width)  ;	
		var width3 = parseInt(width) - 15 ;	

	
		if(h > 50) bbr2 = "<br>"; else bbr2 = ""; 
			
		title = str_replace(" ","",title);

		bgimg = '/module/btn/module.php?text=' + title +'&w='+width2+'&h='+h;


		html = 
		'<div  id="' + name + '[la]" style="width : '+width2+';  height: '+h+'; ><div class="t_handle" style=" text-align:right; " ondblclick="changeWidth(\'' + name + '\',\'\',\''+title+'\',\''+h+'\');"' +
		'onclick = "ToolbarView(\'' + name + '[stool]\')"'+
		'><TABLE  cellpadding="0" cellspacing="0" border=0 class="tableNo2" ><TR><TD valign = top ><img id="[img]'+name+'" src='+bgimg+'>' +
		
		'<a href="javascript:moveLayout(\''+name+'\',\'NONE\');" style ="z-index:9999999" ><img id = "[xxx]'+name+'" src=/html/attach/admin/xxx.gif style="top:5px;left:'+width3+';position:absolute;cursor:hand;" '+		
		' align=absmiddle style="padding-bottom:10px"></a>' + 


		'<select style = "font-size:11px;width:80px" name="' + name + '[layer]" id="' + name + '[layer]" onchange="moveLayout(\'' + name + '\',this.value,\''+title+'\',\''+width+'\',\''+removable+'\',\''+is_part+'\',\''+bg+'\',\''+h+'\');" style="display:none">' 
		+ html_layers + 
		'</select>' +

		'<input type = "hidden" name="' + name + '[type]"  id="' + name + '[type]" value="'+type+'" style="width:30">'  +
		'<input type = "hidden" name="' + name + '[line]"  id="' + name + '[line]" value="'+line+'" style="width:30">'  +
		'<input type = "hidden" name="' + name + '[max]"  id="' + name + '[max]" value="'+max+'" style="width:30">'  +
		'<input type = "hidden" name="' + name + '[len]"  id="' + name + '[len]" value="'+len+'" style="width:30">'  +
		'<input type = "hidden" name="' + name + '[line_c]"  id="' + name + '[line_c]" value="'+line_c+'" style="width:30">'  +
		'<input type = "hidden" name="' + name + '[subject]"  id="' + name + '[subject]" value="'+subject+'" style="width:30">'  +
		'<input type = "hidden" name="' + name + '[img_w]"  id="' + name + '[img_w]" value="'+img_w+'" style="width:30">'  +
		'<input type = "hidden" name="' + name + '[img_h]"  id="' + name + '[img_h]" value="'+img_h+'" style="width:30">'  +
		'<input type = "hidden" name="' + name + '[title]"  id="' + name + '[title]" value="'+title+'" style="width:30">'  +
		'<input type = "hidden" name="' + name + '[width]"  id="' + name + '[width]" value="'+width+'" >'  +
		'<input type = "hidden" name="' + name + '[height]"  id="' + name + '[height]" value="'+h+'" >' +

		'<input type = "hidden" name="' + name + '[Ptop]"  id="' + name + '[Ptop]" value="'+Ptop+'" >' +
		'<input type = "hidden" name="' + name + '[Pleft]"  id="' + name + '[Pleft]" value="'+Pleft+'" >' +
		'<input type = "hidden" name="' + name + '[Pright]"  id="' + name + '[Pright]" value="'+Pright+'" >' +
		'<input type = "hidden" name="' + name + '[Pbottom]"  id="' + name + '[Pbottom]" value="'+Pbottom+'" >' +


		
		'<input type="hidden" name="pannels[]" value="' + name + '"></TD></TR>	</TABLE>' +

		'</div>'+
		'</div>' +'';
		
		
		html_fixed = '';

  
		el = document.createElement('DIV');
		el.id = name;
		el.className = avail_layer.join(' ') + (removable ? ' NONE' : '');
		el.style.styleFloat = 'left';
		el.style.width = width;

		el.style.padding = '0';
		//el.style.paddingTop = '0';
		
		if(layer =="NONE") {
		el.style.display = 'none';
		}
		
		el.innerHTML = html;
		$(layer).appendChild(el);

		el.style.zIndex = -1;

		OnDragEffect(el) 
		
		

		}///
	
		function def_css(id, uu, bg_no,reSize) {
		if(id =="NONE") {
		$(id).style.display="none";
		}else{
		$(id).style.padding='0';

		$(id + '_width').value = parseInt(document.getElementById(id).currentStyle.width) / parseInt(uu) ;

		if(reSize =="Y") {
		$(id).resizedistance = "7";
		$(id).resizemaxwidth = parseInt(document.getElementById('main_layout').currentStyle.width);
		$(id).resizemaxheight = 600;

		$(id).resizable = "false";
		$(id).resizable_a = true;
		$(id).resizedefaultcursor = "move"

		
		}else{
		if(bg_no) $(id).style.backgroundImage='url()';
		}
		
		//$(id).style.align='buttom';
		$(id).style.width = parseInt(document.getElementById(id).currentStyle.width)  / parseInt(uu) ;


		$(id + '_height').value = parseInt(document.getElementById(id).currentStyle.height) / parseInt(uu) ;
		$(id).style.height = parseInt(document.getElementById(id).currentStyle.height)  / parseInt(uu) ;


		}
		}



		function gaid(id) {

		$(id).style.padding='0';

		$(id).resizedistance = "30";
		$(id).resizemaxwidth ='750';
		$(id).resizemaxheight = 673;

		$(id).resizable = "true";
		$(id).resizable_a = false;
		
		if(ReadCookie(id+"[gw]")) {
		$(id).style.width = ReadCookie(id+"[gw]");
		}

		if(ReadCookie(id+"[gh]")) {
		$(id).style.height = ReadCookie(id+"[gh]");
		}
		
		if(strstr(id,"gaid_w")) {
		$(id).innerHTML='<img src="/b.gif" height=1 width=175>';		
		}else{
		$(id).innerHTML='<img src="/b.gif" height=10 width=1>';
		}
		}

