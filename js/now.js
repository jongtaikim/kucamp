			new Resize("resizable","resizedistance","resizemaxwidth","resizemaxheight","resizedefaultcursor"); 
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

		
			function lineSelect (idx) {
			if(idx) {
				{@ CSS_ALIGN_manage}
				$('{.layout}').style.border = '1px solid #FFCC33';

				{/}
			}else{
				{@ CSS_ALIGN_manage}
				$('{.layout}').style.border = '1px dotted #898b93';

				{/}
			}

			}

	
	function vise(el ,layer,name,title,width,removable,is_part,avail_bg,avail_height,re_layer){
						
	if($(name+"[chkbox]").checked) {
	MAIN_to_width = $(re_layer).style.width ;
	MAIN_to_width = parseInt(MAIN_to_width)-10;												
	moveLayout(name,re_layer,title,MAIN_to_width,1, parseInt(is_part) ,avail_bg,avail_height);						
							
	}else{

	moveLayout(name,'NONE',title,width,1, 0 ,avail_bg,avail_height);				
	$(name+"[chkbox]").checked = false;
	}
	}

	function vise2(el ,layer,name,title,width,removable,is_part,avail_bg,avail_height,re_layer){
	moveLayout(name,'NONE',title,width,1, 0 ,avail_bg,avail_height);				
	$(name+"[chkbox]").checked = false;
	}
	
	function twinInput(el){

	target = explode("(",el.name);
	target_name = target[0];
	target = explode(")",target[1]);
	target = target[0];
	$(target_name+"["+target+"]").value = el.value
	}
	
	function defImgSize(name){

	$(name+'(img_w)').value = '65';
	$(name+'(img_h)').value = '50';
	
	$(name+'[img_w]').value = '65';
	$(name+'[img_h]').value = '50';
	

	}

	function viewPriv(src){

	if($('popup_box2').style.display !='none') {
		$('mmenu').src	 = src;
	}
	}

	function moveLayout (id, layer,title, width,  removable, is_part, bg, h) {
		
		
		type = $(id+'[type]').value;
		line = $(id+'[line]').value;
		max = $(id+'[max]').value;
		len = $(id+'[len]').value;
		line_c = $(id+'[line_c]').value;
		img_w = $(id+'[img_w]').value;
		img_h = $(id+'[img_h]').value;

		//alert(id+'[type]');
		removePart(id);

		appendPanel(layer, id, title, width, [{@ CSS_ALIGN_manage}'{.layout}',{/}], [width], '1', 	parseInt(is_part), '', h,type,line,max,len,line_c,img_w,img_h);	
		new Draggable(id, {revert:true,handle:'t_handle',starteffect:OnDragStartEffect,endeffect:OnDragEndEffect});
		
	}

	function changeWidth(id, width,title,h) {
		
		h2 = parseInt($(id+'[height]').value)
		target_i = $(id+'[layer]').value;
		r_width1 = (parseInt($(target_i).style.width)) / 4  ;
		r_width1 = parseInt(r_width1);
		
		if($(id+'[width]').value == r_width1  ) {
		maxWidth = r_width1 * 2 -6;
		}else if($(id+'[width]').value == (r_width1 * 2 )-6 ){
		maxWidth = r_width1 * 3 -13 ;
		}else if($(id+'[width]').value == (r_width1 * 3 -13) ){
		maxWidth = r_width1 * 4 -8 ;
		}else if($(id+'[width]').value == (r_width1 * 4 ) -8 ){
		maxWidth = r_width1  ;
		}else{
		maxWidth = r_width1 ;
		}
		 maxWidth = parseInt(maxWidth);
		 maxWidth2 = parseInt(maxWidth) ;
	
		$(id+'[la]').style.width = maxWidth2;
		$(id+'[la]').style.backgroundImage = 'url(/module/btn/module.php?text=' + title +'&w='+maxWidth2+'&h='+h2+')';
		$(id).style.width = maxWidth2;
		$(id+'[width]').value = maxWidth2;
		}




	function changeWidthDb(id, width,title,h) {
		
		h2 = parseInt($(id+'[height]').value)
		target_i = $(id+'[layer]').value;
		r_width1 = (parseInt($(target_i).style.width)) ;
        r_width1 = parseInt(r_width1);
		maxWidth2 = parseInt(r_width1) - 10 ;
		
		$(id+'[la]').style.width = maxWidth2;
		$(id+'[la]').style.backgroundImage = 'url(/module/btn/module.php?text=' + title +'&w='+maxWidth2+'&h='+h2+')';
		$(id).style.width = maxWidth2;
		$(id+'[width]').value = maxWidth2;
	
	}


	function changeHeight(id, width,title,h,ssmu,s) {

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
		
		setTimeout(function(){	$(id+'[la]').style.backgroundImage = 'url(/module/btn/module.php?text=' + title +'&w='+width+'&h='+h+')';}, 300);
	
		}

	function addPart() {
		fenster2('컨텐츠 추가', '컨텐츠 추가','attach.admin.add_part','10','100','785','630');
	}

	function editPart(name) {

		fenster2('컨텐츠 편집', '컨텐츠 편집','attach.admin.edit_part?name=' + name,'10','100','785','630');
	}

	function deletePart(name) {
		if(!confirm('정말 삭제하시겠습니까?')) return false;
		document.frames['hidden_frame'].location.reload('attach.admin.delete_part?name=' + name);
		
		//alert(name+'[part_td]');
		$(name+'[part_td]').style.display='none';

	
	}




	function addRow(id,name,serial,MAIN_to_width,title){ 
			var tbody = document.getElementById 
			(id).getElementsByTagName("TBODY")[0]; 
			var row = document.createElement("TR") 
			var td1 = document.createElement("TD") 

			tbody.appendChild(row); 			
			row.appendChild(td1); 

			mk = mktime();

			td1.style.width='76%';
			td1.id = name+mk;
			
			row.id = name+"[part_td]"


			{? layout =="sub"}

			$(td1.id).innerHTML = "<INPUT TYPE=checkbox checked  onclick =\"vise(this,'LEFT_sub','"+name+"','"+title+"','"+MAIN_to_width+"','1','1','','80','LEFT_sub','RIGHT_sub','TOP_sub','LOGO_TOP_sub','FOOT','TOP_BUTTON_sub');\" id="+name+"[chkbox] > <img src = /image/cube_molecule_add.png align = absmiddle> "+title+" &nbsp;&nbsp;<img src=/edit.gif style=cursor:hand; onclick=editPart('"+name+"');> <img src=/del.gif  style=cursor:hand; onclick=deletePart('"+name+"');>";

			{:}

			$(td1.id).innerHTML = "<INPUT TYPE=checkbox checked  onclick =\"vise(this,'MAIN','"+name+"','"+title+"','"+MAIN_to_width+"','1','1','','80','MAIN','LEFT','RIGHT','TOP','LOGO_TOP','FOOT','TOP_BUTTON');\" id="+name+"[chkbox] > <img src = /image/cube_molecule_add.png align = absmiddle> "+title+" &nbsp;&nbsp;<img src=/edit.gif style=cursor:hand; onclick=editPart('"+name+"');> <img src=/del.gif  style=cursor:hand; onclick=deletePart('"+name+"');>";

			{/}
			
			
			//td1.appendChild(document.createTextNode("column 1")) 
	  } 


	function appendPart(serial, title) { // 2008-06-11 종태 추가 컨텐츠 작성시 추가 모듈배치
	//document.layoutForm.submit();

		name = 'part_' + serial;
		
		
		{? layout =="sub"}

		MAIN_to_width = $('LEFT_sub').style.width ;	
		MAIN_to_width = parseInt(MAIN_to_width)-10;

		appendPanel('LEFT_sub', name, title, MAIN_to_width, [{@ CSS_ALIGN_manage}'{.layout}',{/}], [MAIN_to_width], 1, 1 , '', '80');
		
		{:}

		MAIN_to_width = $('MAIN').style.width ;	
		MAIN_to_width = parseInt(MAIN_to_width)-10;

		appendPanel('MAIN', name, title, MAIN_to_width, [{@ CSS_ALIGN_manage}'{.layout}',{/}], [MAIN_to_width], 1, 1 , '', '80');

		{/}

		new Draggable(name, {revert:true,handle:'t_handle',starteffect:OnDragStartEffect,endeffect:OnDragEndEffect});
		
		addRow('plusTable',name,serial,MAIN_to_width,title);


	}


function appendPartBoard(name, title) { // 2008-06-11 종태 추가 컨텐츠 작성시 추가 모듈배치
	location.reload();
	}




	function removePart(name) { //2008-06-11 모듈 지우기 종태
		el = $(name);
		layer = el.parentNode;
		layer.removeChild(el);
	}


	function OnDragEffect(element,idx) { // 2008-06-11 시작시 약간의 투명도를 지정함
		if(!idx) {
		
		element._opacity = Element.getOpacity(element); 
		new Effect.Opacity(element, {duration:0.1, from:element._opacity, to:0.8});	
		}else{
		element._opacity = Element.getOpacity(element); 
		new Effect.Opacity(element, {duration:0.1, from:element._opacity, to:1});	
		
		}
		
		}
	
	function OnDragStartEffect(element) { // 2008-06-11 드래그 이벤트시 투명한 이팩트
	
		element.style.width='100%';
		$(element.id+'[la]').style.border='1px dotted #ffffff'
		$(element.id+'[la]').style.width='100%';
		$(element.id+'[la]').style.backgroundColor = '#9A9A9A';
		$(element.id+'[la]').style.backgroundImage = '';
		Element.classNames(element).each(function(layer) { $(layer).style.border = '1px dashed #FF99FF';  });
	}

	function OnDragEndEffect(element) { // 2008-06-11 마우스를 놓는순간 이팩트
		
		title = $(element.id+'[title]').value;
		width = $(element.id+'[width]').value;
		h = $(element.id+'[height]').value;
		
		$(element.id+'[la]').style.border='0px dotted #ffffff';
		changeWidthDb(element.id, width,title,h);
		Element.classNames(element).each(function(layer) { $(layer).style.border = '1px dotted #898b93'; });
	}


		function getBounds(tag,tag2) 
		{ 
			var ret = new Object(); 
				var rect = tag.getBoundingClientRect(); 
				ret.left = rect.left ; 
				ret.top = rect.top; 
			return ret; 
		} 



		function ToolbarView(id) 
		{ 
		if(	document.layoutForm.elements['resizeing_btn'][1].checked == true) {

		{@ LIST2}
		$('{.name}[stool]').style.display='none';
		$('{.name}[la]').style.border='0px';
		OnDragEffect($('{.name}'));
		{/}
				
		if(id) {
		$(id).style.display='';
		id2 = explode("[",id);
		$(id2[0]+'[la]').style.border='1px dashed #0033FF';	
		OnDragEffect($(id2[0]),'Y');
		SaveCookie("setup_id", id, 1);
		$('def_stool').style.display = 'none';
		
		viewPriv('attach.view?name='+id2[0]);
		
		}else{
		SaveCookie("setup_id", "");
		$('def_stool').style.display = '';
		}
		}

		} 




	function appendPanel(layer, name, title, width, avail_layer, avail_width, removable, is_part, bg, h,type,line,max,len,line_c,subject,img_w,img_h) { //배치될 모듈생산 2008-06-11 종태
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
			if (h == "")	var h = "80";

		var width2 = parseInt(width)  ;	

		if (layer =="NONE")	{
			html = 
				
				'<div style="display:none;width:230;border-bottom:1 dashed #E1E1E1" id="' + name + '[la]">&nbsp;'+title +
				
		
				
				'&nbsp;<select name="' + name + '[layer]" id="' + name + '[layer]" onchange="moveLayout(\'' + name + '\',this.value,\''+title+'\',\''+width+'\',\''+removable+'\',\''+is_part+'\',\''+bg+'\',\''+h+'\');"  style="text-size:10;width:68">' 
				+ html_layers + 
				'</select> ' +

				'<input type = "text" name="' + name + '[title]"  id="' + name + '[title]" value="'+title+'" style="width:30">'  +
				'<input type = "text" name="' + name + '[width]"  id="' + name + '[width]" value="'+width+'" style="width:30">'  +
				'<input type = "text" name="' + name + '[height]"  id="' + name + '[height]" value="'+h+'" style="width:30">'  +
				'<input type = "text" name="' + name + '[type]"  id="' + name + '[type]" value="'+type+'" style="width:30">'  +
				'<input type = "text" name="' + name + '[line]"  id="' + name + '[line]" value="'+line+'" style="width:30">'  +
				'<input type = "text" name="' + name + '[max]"  id="' + name + '[max]" value="'+max+'" style="width:30">'  +
				'<input type = "text" name="' + name + '[len]"  id="' + name + '[len]" value="'+len+'" style="width:30">'  +
				'<input type = "text" name="' + name + '[line_c]"  id="' + name + '[line_c]" value="'+line_c+'" style="width:30">'  +
				'<input type = "text" name="' + name + '[subject]"  id="' + name + '[subject]" value="'+subject+'" style="width:30">'  +
				'<input type = "text" name="' + name + '[img_w]"  id="' + name + '[img_w]" value="'+img_w+'" style="width:30">'  +
				'<input type = "text" name="' + name + '[img_h]"  id="' + name + '[img_h]" value="'+img_h+'" style="width:30">'  +
				'<input type="hidden" name="pannels[]" value="' + name + '">' +
			
				'</div>';

		}else{

		if(h > 50) bbr2 = "<br>"; else bbr2 = ""; 
		if(width< 120 ) bbr = "<br>"; else bbr = "&nbsp;"; 
		
		html = 
		'<div  id="' + name + '[la]" style="width : '+width2+';  height: '+h+'; background-repeat:no-repeat;z-index:1;background-image:url(/module/btn/module.php?text=' + title +'&w='+width2+'&h='+h+');  ><div class="t_handle" style=" text-align:right; padding:10 5 0 0" ondblclick="changeWidthDb(\'' + name + '\',\'\',\''+title+'\',\''+h+'\');"' +
		'onclick = "ToolbarView(\'' + name + '[stool]\')"'+
		'>' +

		'<select style = "font-size:11px;width:80px" name="' + name + '[layer]" id="' + name + '[layer]" onchange="moveLayout(\'' + name + '\',this.value,\''+title+'\',\''+width+'\',\''+removable+'\',\''+is_part+'\',\''+bg+'\',\''+h+'\');" style="display:none">' 
		+ html_layers + 
		'</select> ' +

		'<img src=/html/attach/admin/xxx.gif style="cursor:hand;" '+		
		'onclick = "vise2(this,\''+layer+'\',\''+name+'\',\''+title+'\',\''+width+'\',\''+removable+'\',\''+is_part+'\',\''+bg+'\',\''+h+'\',\''+html_layers2+'\');" align=absmiddle style="padding-bottom:10px"><br>' +
	
		'<a href= "javascript:changeWidth(\'' + name + '\',\'\',\''+title+'\',\''+h+'\');"><img src=/html/attach/admin/view_b5.gif style="cursor:hand;" onclick=""  align=absmiddle alt="가로길이 조절"></a>' + bbr2 +
		
		
		'<a href= "javascript:changeHeight(\'' + name + '\',\''+width+'\',\''+title+'\',this.value,\'up\',\'5\');"><img src="/html/attach/admin/view_b1.gif"  align=absmiddle onclick="" style="cursor:hand;" alt="높이 + "></a><a href= "javascript:changeHeight(\'' + name + '\',\''+width+'\',\''+title+'\',this.value,\'down\',\'5\');"><img src="/html/attach/admin/view_b2.gif"  align=absmiddle onclick="" style="cursor:hand;" alt="높이 - "></a>'  +	 bbr2 +


		'<input type = "hidden" name="' + name + '[type]"  id="' + name + '[type]" value="'+type+'" style="width:30">'  +
		'<input type = "hidden" name="' + name + '[line]"  id="' + name + '[line]" value="'+line+'" style="width:30">'  +
		'<input type = "hidden" name="' + name + '[max]"  id="' + name + '[max]" value="'+max+'" style="width:30">'  +
		'<input type = "hidden" name="' + name + '[len]"  id="' + name + '[len]" value="'+len+'" style="width:30">'  +
		'<input type = "hidden" name="' + name + '[line_c]"  id="' + name + '[line_c]" value="'+line_c+'" style="width:30">'  +
		'<input type = "hidden" name="' + name + '[subject]"  id="' + name + '[subject]" value="'+subject+'" style="width:30">'  +
		'<input type = "hidden" name="' + name + '[img_w]"  id="' + name + '[img_w]" value="'+img_w+'" style="width:30">'  +
		'<input type = "hidden" name="' + name + '[img_h]"  id="' + name + '[img_h]" value="'+img_h+'" style="width:30">'  +
		'<input type = "hidden" name="' + name + '[title]"  id="' + name + '[title]" value="'+title+'" style="width:30">'  +
		'<input type = "hidden" name="' + name + '[width]"  id="' + name + '[width]" value="'+width+'" style="width:23;height:16px;font-size:10px" onChange="changeHeight(\'' + name + '\',this.value,\''+title+'\',\''+h+'\');">'  +
		'<input type = "hidden" name="' + name + '[height]"  id="' + name + '[height]" value="'+h+'" style="width:23;font-size:10px;height:16px;" onChange="changeHeight(\'' + name + '\',\''+width+'\',\''+title+'\',this.value);">'  +  bbr +




		(is_part ? '<img src="/edit.gif" style="cursor:hand;" onclick="editPart(\'' + name + '\');"> <img src="/del.gif"  style="cursor:hand;" onclick="deletePart(\'' + name + '\');">' : '') +
		
		'<input type="hidden" name="pannels[]" value="' + name + '">' +

		'</div>'+
		'</div>' +'';
		
		}
		html_fixed = '';

  
		el = document.createElement('DIV');
		el.id = name;
		el.className = avail_layer.join(' ') + (removable ? ' NONE' : '');
		el.style.styleFloat = 'left';
		el.style.width = width;

		el.style.paddingLeft = '4';
		el.style.paddingTop = '4';


		el.innerHTML = html;
		$(layer).appendChild(el);

		el.style.zIndex = -1;

		OnDragEffect(el) 
		
		

		}///
	
		function def_css(id, uu, bg_no,reSize) {

		$(id).style.padding='0';

		$(id + '_width').value = parseInt(document.getElementById(id).currentStyle.width) / parseInt(uu) ;

		if(reSize =="Y") {
		$(id).resizedistance = "7";
		$(id).resizemaxwidth = parseInt(document.getElementById('main_layout').currentStyle.width);
		$(id).resizemaxheight = 600;

		$(id).resizable = "false";
		$(id).resizable_a = true;
		$(id).resizedefaultcursor = "move"

		$(id).style.backgroundImage="url(/module/btn/module2.php?text=" + id +" 영역&h=12)";
		$(id).style.backgroundRepeat="no-repeat";
		$(id).style.backgroundPosition="50% 50%";

		}else{
		if(bg_no) $(id).style.backgroundImage='url()';
		}

		$(id).style.width = parseInt(document.getElementById(id).currentStyle.width)  / parseInt(uu) ;


		$(id + '_height').value = parseInt(document.getElementById(id).currentStyle.height) / parseInt(uu) ;
		$(id).style.height = parseInt(document.getElementById(id).currentStyle.height)  / parseInt(uu) ;



		}

		function resizeing(id,setup){ // 레이아웃을 리사이징 한다 2008-06-11 종태
		if(!setup) setup = "Y";
		if(setup =="Y") {

		Sortable.destroy(id);
		
		{@ CSS_ALIGN_manage}
		$('{.layout}').resizable = "true";
		{? layout =="sub"}
		
		Sortable.create("{.layout}", {dropOnEmpty:true,treeTag:'div',tag:'div',containment:["LEFT_sub","RIGHT_sub","LOGO_TOP_sub","TOP_sub","FOOT","TOP_BUTTON_sub","NONE"],accept:["{.layout}"],handle:'t_handle',onUpdate:OnLayerChange});
		{:}
		Sortable.create("{.layout}", {dropOnEmpty:true,treeTag:'div',tag:'div',containment:["LEFT","MAIN","RIGHT","LOGO_TOP","TOP","FOOT","TOP_BUTTON","NONE"],accept:["{.layout}"],handle:'t_handle',onUpdate:OnLayerChange});
		{/}
		{/}

		
		{? layout =="sub"}
		Sortable.create("NONE", {dropOnEmpty:true,treeTag:'div',tag:'div',containment:["LEFT_sub","RIGHT_sub","LOGO_TOP_sub","TOP_sub","FOOT","TOP_BUTTON_sub","NONE"],accept:["NONE"],onUpdate:OnLayerChange});

		{:}
		Sortable.create("NONE", {dropOnEmpty:true,treeTag:'div',tag:'div',containment:["LEFT","MAIN","RIGHT","LOGO_TOP","TOP","FOOT","TOP_BUTTON","NONE"],accept:["NONE"],onUpdate:OnLayerChange});
		{/}			

		}else{

		Sortable.create(id, {treeTag:'div',tag:'div'});	
		
		}
		}

		function resizeing2(id,setup){ // 레이아웃을 리사이징 한다 2008-06-11 종태
		if(!setup) setup = "Y";

		if(setup =="Y") {
		Sortable.destroy(id);
		{@ CSS_ALIGN_manage}
		$('{.layout}').style.border = "1px dashed #FFFF66";
		$('{.layout}').resizable_a = false;
		$('{.layout}').resizable = "true";
		{/}

		{@ LIST}
		$({.name}).style.display = "none"
		{/}

		$('stools').style.display = 'none';
		$('module_tool1').style.display = '';
		$('module_tool2').style.display = 'none';
		$('module_tool3').style.display = 'none';
		$('module_tool4').style.display = 'none';

		}else if(setup =="N"){
		Sortable.create(id, {treeTag:'div',tag:'div'});	
		{@ CSS_ALIGN_manage}
		$('{.layout}').resizable = "false";
		$('{.layout}').style.border = "1px solid #FFFFFF";
		{/}

		{@ LIST}
		$('{.name}').style.display = "none"
		{/}

		$('stools').style.display = 'none';
		$('module_tool1').style.display = '';
		$('module_tool2').style.display = 'none';
		$('module_tool3').style.display = 'none';
		$('module_tool4').style.display = 'none';


		
		}else if(setup =="T"){
		Sortable.create(id, {treeTag:'div',tag:'div'});	
		$('stools').style.display = 'none';
		$('module_tool1').style.display = 'none';
		$('module_tool2').style.display = '';
		$('module_tool3').style.display = '';
		$('module_tool4').style.display = '';

		{@ CSS_ALIGN_manage}
		$('{.layout}').resizable = "false";
		{? layout =="sub"}

		Sortable.create("{.layout}", {dropOnEmpty:true,treeTag:'div',tag:'div',containment:["LEFT_sub","RIGHT_sub","LOGO_TOP_sub","TOP_sub","FOOT","TOP_BUTTON_sub","NONE"],accept:["{.layout}"],handle:'t_handle',onUpdate:OnLayerChange,starteffect:OnDragStartEffect,endeffect:OnDragEndEffect});
		{:}
		Sortable.create("{.layout}", {dropOnEmpty:true,treeTag:'div',tag:'div',containment:["LEFT","MAIN","RIGHT","LOGO_TOP","TOP","FOOT","TOP_BUTTON","NONE"],accept:["{.layout}"],handle:'t_handle',onUpdate:OnLayerChange,starteffect:OnDragStartEffect,endeffect:OnDragEndEffect});
		{/}
		$('{.layout}').style.border = "1px dotted #898b93";
		{/}




		{? layout =="sub"}
		Sortable.create("NONE", {dropOnEmpty:true,treeTag:'div',tag:'div',containment:["LEFT_sub","RIGHT_sub","LOGO_TOP_sub","TOP_sub","FOOT","TOP_BUTTON_sub","NONE"],accept:["NONE"],onUpdate:OnLayerChange,starteffect:OnDragStartEffect,endeffect:OnDragEndEffect});
		{:}
		Sortable.create("NONE", {dropOnEmpty:true,treeTag:'div',tag:'div',containment:["LEFT","MAIN","RIGHT","LOGO_TOP","TOP","FOOT","TOP_BUTTON","NONE"],accept:["NONE"],onUpdate:OnLayerChange,starteffect:OnDragStartEffect,endeffect:OnDragEndEffect});
		{/}	
		

		{@ LIST}
		title = $('{.name}[title]').value;
		h = $('{.name}[height]').value;
		w = $('{.name}[width]').value;
		$('{.name}[la]').style.backgroundImage = 'url(/module/btn/module.php?text=' + title +'&w='+w+'&h='+h+')';

		$('{.name}').style.display = ""
		$('{.name}[la]').style.border = "0px";

		{/}

		
		}else{
	
		Sortable.destroy(id);
	
		{@ CSS_ALIGN_manage}
		$('{.layout}').resizable = "false";
		$('{.layout}').style.border = "0px solid #FFFFFF";
		Sortable.destroy('{.layout}');
		{/}

		{@ LIST}
		$({.name}).style.display = ""
		$({.name}).style.cursor = ""
		
		Sortable.destroy('{.name}');
		{/}
		

		$('stools').style.display = '';
		$('module_tool1').style.display = 'none';
		$('module_tool2').style.display = 'none';
		$('module_tool3').style.display = 'none';
		$('module_tool4').style.display = 'none';

		
		ToolbarView(ReadCookie("setup_id"))
		}
		
		SaveCookie("layout_setup", setup, 1);
		}
		