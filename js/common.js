function postForm(attrs, vars) {
	try {
		form = document.createElement('form');
		form.method = 'post';
		for(key in attrs) {
			form.setAttribute(key,attrs[key]);
		}
		for(key in vars) {
			input = document.createElement('input');
			input.type = 'hidden';
			input.name = key;
			input.value = vars[key];
			form.appendChild(input);
		}
		document.appendChild(form);
		form.submit();
		document.removeChild(form);
		delete input;
		delete form;
		return true;
	} catch(e) {
		return false;
	}
}

function docWrite(html) {
	try {
		document.write(html);
	} catch(e) {}
}

function ipInfoView(ip) {
	if(!ip) return false;
	postForm({'name':'ipinfoView','action':'http://whois.nic.or.kr/result.php','target':'_blank'},{'domain_name':ip});
}

// 세션유지(30분)
function refreshSession() {
	try {
		result = dynamic.loadText('/core.refresh_sess');
		setTimeout('refreshSession()',300000);
		
	} catch(e) {}
}
//setTimeout('refreshSession()',300000);
refreshSession();


// Event Listener 등록, 제거
function addEvent( obj, type, fn )
{
	if (obj.addEventListener)
		obj.addEventListener( type, fn, false );
	else if (obj.attachEvent)
	{
		obj["e"+type+fn] = fn;
		obj[type+fn] = function() { obj["e"+type+fn]( window.event ); }
		obj.attachEvent( "on"+type, obj[type+fn] );
	}
}
function removeEvent( obj, type, fn )
{
	if (obj.removeEventListener)
		obj.removeEventListener( type, fn, false );
	else if (obj.detachEvent)
	{
		obj.detachEvent( "on"+type, obj[type+fn] );
		obj[type+fn] = null;
		obj["e"+type+fn] = null;
	}
}


//2008-06-26 프로토 흉내
function $(id) {
	if(!id) return null;
	return document.getElementById(id);
}

//2008-06-26 프로토 흉내
function $$(id) {
	if(!id) return null;
	return document.getElementById(id);
}

function setPng24(obj) { 
	    obj.width=obj.height=1; 
	    obj.className=obj.className.replace(/\bpng24\b/i,''); 
	    obj.style.filter = 
	    "progid:DXImageTransform.Microsoft.AlphaImageLoader(src='"+ obj.src +"',sizingMethod='image');" 
	    obj.src='images/1pixel.gif';  
	    return ''; 
	} 
	
	
