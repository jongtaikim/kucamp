


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
	if(w){ $(target_name+"[width]").value = w}
	if(h) {$(target_name+"[height]").value = h}
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
		if($(id+'[layer]').value !="NONE") {
			

		title = $(id+'[title]').value;
		width = $(id+'[width]').value;
		h = $(id+'[height]').value;
		changeWidthDb(id, width,title,h);

		}
		
	}

	function changeWidth() {
		id = tar_lay;
		id = explode("[",id);	
		id = id[0];

		
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
		
		if($('partT['+id+']')) $('partT['+id+']').style.left = parseInt(maxWidth2) - 90;
		if($(id+'[sizev]')) $(id+'[sizev]').style.left = parseInt(maxWidth2)  - 90;
		

		$(id+'[sizev]').innerHTML = parseInt(maxWidth2) * 2 + " x " + parseInt(h2) *2

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
		

		if($('partT['+id+']')) $('partT['+id+']').style.left = parseInt(maxWidth2)  - 95;
		if($(id+'[sizev]')) $(id+'[sizev]').style.left = parseInt(maxWidth2)  - 95;
		
		

		$(id+'[la]').style.width = maxWidth2;
		$('[xxx]'+id).style.left=maxWidth3
		$('[img]'+id).src = '/module/btn/module.php?text=' + title +'&w='+maxWidth2+'&h='+h2;
		$(id+'[sizev]').innerHTML = parseInt(maxWidth2) * 2 + " x " + parseInt(h2) *2
		$(id).style.width = maxWidth2;
		$(id+'[width]').value = maxWidth2;
		$(id).style.display = '';
	
	}



	function changeHeight(ssmu) {
		id = tar_lay;
		id = explode("[",id);	
		id = id[0];
		width = parseInt($(id+'[width]').value)
		

		var s = $('xxxe').value;
		if(!s) {s= 2;}
		if(ssmu =="up") {
		h = parseInt($(id+'[height]').value) + parseInt(s);
		}else{
		h = parseInt($(id+'[height]').value) - parseInt(s);
		}
		

		if($('partT['+id+']')) $('partT['+id+']').style.top = parseInt(h) - 25;
		if($(id+'[sizev]')) $(id+'[sizev]').style.top = parseInt(h) - 14; 
		




		$(id).style.width = width;
		$(id).style.height = h;	
		$(id+'[height]').value = h;
		$(id+'[la]').style.width = width;
		$(id+'[la]').style.height = h;
		$(id+'[width]').value = width;
		
		$('[img]'+id).src = '/module/btn/module.php?text=' + title +'&w='+width+'&h='+h;
		
		$(id+'[sizev]').innerHTML = parseInt(width) * 2 + " x " + parseInt(h) *2
		}


	function changeWidth2(ssmu) {
		
		id = tar_lay;
		id = explode("[",id);	
		id = id[0];
		
	

		var s = $('xxxe').value;
		if(!s) {s= 2;}
		if(ssmu =="up") {
		h = parseInt($(id+'[width]').value) + parseInt(s);
		}else{
		h = parseInt($(id+'[width]').value) - parseInt(s);
		}
		
		height = parseInt($(id+'[height]').value)

		$(id).style.height = height;
		$(id).style.width = h;	

		$('[xxx]'+id).style.left = parseInt(h) - 15;

		if($('partT['+id+']')) $('partT['+id+']').style.left = parseInt(h)-95;
		if($(id+'[sizev]')) $(id+'[sizev]').style.left = parseInt(h) - 95;
	


		
		$(id+'[height]').value = height;
		$(id+'[la]').style.width = h;
		$(id+'[la]').style.height = height;
		$(id+'[width]').value = h;
		
		$('[img]'+id).src = '/module/btn/module.php?text=' + title +'&w='+h+'&h='+height;

		$(id+'[sizev]').innerHTML = parseInt(h) * 2 + " x " + parseInt(height) *2
	
		}


	function addPart() {
		
		var x = (document.body.clientWidth / 2) - (785 / 2 ) - 20 ; 
		
		fenster2('컨텐츠 추가', '컨텐츠 추가','attach.admin.add_part',x,'100','785','630');
	}

	function editPart(name) {
		var x = (document.body.clientWidth / 2) - (785 / 2 ) - 20 ; 
		fenster2('컨텐츠 편집', '컨텐츠 편집','attach.admin.edit_part?name=' + name,x,'30','785','630');
	}

	function deletePart(name) {
		if(!confirm('정말 삭제하시겠습니까?')) {return false;}
		document.frames['hidden_frame'].location.reload('attach.admin.delete_part?name=' + name);
		
		//alert(name+'[part_td]');
		$(name+'[part_td]').style.display='none';

	
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
		if($('partT['+element.id+']')) $('partT['+element.id+']').style.display='none';
		if($(element.id+'[sizev]')) $(element.id+'[sizev]').style.display='none';


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
		if($('partT['+element.id+']')) $('partT['+element.id+']').style.display='';
		if($(element.id+'[sizev]')) $(element.id+'[sizev]').style.display='';

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
		if(removable) { html_layers += '<option value="NONE">NONE</option>';}
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

			if(avail_width.length > 1) {	var wwidth = "Y";}
			if (!h)	 { var h = "80";}
			

		var width2 = parseInt(width)  ;	
		var width22 = parseInt(width)  ;	
		var width3 = parseInt(width) - 15 ;	

		var w_view =  parseInt(width) *2
		var h_view =  parseInt(h) *2

		if(h < 20) h2 = 20; else h2 = h;
		
		var w3 = parseInt(width2) - 95;
		var h3 = parseInt(h2) - 25; 
		var h4 = parseInt(h2) - 14; 


		if(parseInt(h2)>21) {
		var bbr = "<br>"	;
		var bbr2 = ""	;
		var bbr3 = ""	;
		}else{
		var bbr = ""	;
		var bbr2 = "position:absolute;"	;
		var bbr3 = "display:none;"	;
		}
		title = str_replace(" ","",title);

		bgimg = '';


		html = 
		'<div  id="' + name + '[la]" style="width : '+width2+';  height: '+h2+'; style=" text-align:right; " ondblclick="changeWidth(\'' + name + '\',\'\',\''+title+'\',\''+h+'\');"' +
		'onclick = "ToolbarView(\'' + name + '[stool]\')"'+
		' style = "padding:0px"><TABLE  cellpadding="0" cellspacing="0" border=0  width=100% height = 100%  align = center style = ""><TR><TD bgcolor = ""  align = center style = "font-size:11px" ><img src="/module/btn/module.php?text=' + title +'&w='+width22+'&h='+h2+'" id="[img]'+name+'">' +
		'<font style = "font-size:10px;color:#0033FF"><div id='+name+'[sizev] style = "width:120;font-size:7pt;position:absolute;color:#676767;font-align:right;left:'+w3+';;top:'+h4+'">'+ w_view + ' x ' + h_view + '</div></font>' +
				
	(is_part ? '<div style = " width:120;position:absolute;left:'+w3+';top:'+h3+'" id="partT['+name+']"><a href="javascript:editPart(\'' + name + '\');"><img src="/edit.gif" ></a> <a href="javascript:deletePart(\'' + name + '\');"><img src="/del.gif" ></a></div>' : '')  +
		
		'<a href="javascript:moveLayout(\''+name+'\',\'NONE\');" style ="z-index:9999999" ><img id = "[xxx]'+name+'" src=/html/attach/admin/xxx.gif style="top:5px;left:'+width3+';position:absolute;cursor:hand;" '+		
		' align=absmiddle style="padding-bottom:10px"></a>' + 


		'<select style = "font-size:11px;width:80px" name="' + name + '[layer]" id="' + name + '[layer]" onchange="moveLayout(\'' + name + '\',this.value,\''+title+'\',\''+width+'\',\''+removable+'\',\''+is_part+'\',\''+bg+'\',\''+h+'\');" style="display:none">' 
		+ html_layers + 
		'</select>' +

		'<input type = "hidden" name="' + name + '[subject]"  id="' + name + '[subject]" value="'+subject+'" style="width:30">'  +
		'<input type = "hidden" name="' + name + '[title]"  id="' + name + '[title]" value="'+title+'" style="width:30">'  +
		'<input type = "hidden" name="' + name + '[width]"  id="' + name + '[width]" value="'+width+'" >'  +
		'<input type = "hidden" name="' + name + '[height]"  id="' + name + '[height]" value="'+h+'" >' +

		'<input type = "hidden" name="' + name + '[Ptop]"  id="' + name + '[Ptop]" value="'+Ptop+'" >' +
		'<input type = "hidden" name="' + name + '[Pleft]"  id="' + name + '[Pleft]" value="'+Pleft+'" >' +
		'<input type = "hidden" name="' + name + '[Pright]"  id="' + name + '[Pright]" value="'+Pright+'" >' +
		'<input type = "hidden" name="' + name + '[Pbottom]"  id="' + name + '[Pbottom]" value="'+Pbottom+'" >' +


		'<input type="hidden" name="pannels[]" value="' + name + '"></TD></TR>	</TABLE>'+
		


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

