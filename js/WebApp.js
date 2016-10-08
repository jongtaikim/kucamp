/* vim: set expandtab tabstop=4 shiftwidth=4 foldmethod=marker: */
/**
* ���ϸ�: WebApp.js
* �ۼ���: 2004-09-06
* �ۼ���: ��ģ����
* ��  ��: WebApp ���� �ڹٽ�ũ��Ʈ
*****************************************************************/


WebApp = {
	jar: new Array,
	ie: /MSIE/.test(navigator.userAgent),
	moz: navigator.product == "Gecko",
	Import: function(file) {
		for(var i=0; i<WebApp.jar.length; i++) {
			if (WebApp.jar[i] == file) return;
		}
		if (document.readyState == 'complete') {
			var s = document.createElement('SCRIPT');
			s.src = '/js/'+file;
			document.body.appendChild(s);
		} else {
			document.write('<s'+'cript src="/js/'+file+'"></s'+'cript>');
		}
		WebApp.jar[WebApp.jar.length] = file;
	},
	ImportCSS: function(file) {
		for(var i=0; i<WebApp.jar.length; i++) {
			if (WebApp.jar[i] == file) return;
		}
		if (document.readyState == 'complete') {
			var s = document.createElement('LINK');
			s.setAttribute('REL','stylesheet');
			s.setAttribute('TYPE','text/css');
			s.setAttribute('HREF',file);
			document.body.appendChild(s);
		} else {
			document.write('<l'+'ink rel="stylesheet" type="text/css" href="css/'+file+'" />');
		}
//		document.write('<l'+'ink rel="stylesheet" type="text/css" href="css/'+file+'" />');
		WebApp.jar[WebApp.jar.length] = file;
	},
    openwin: function(url, name, features) {
        newwin = window.open(url,'',features);
    },
	dialog: function(url,features) {
		var checkModal = function() {
		   setTimeout("finishChecking()", 50)
		   return true
		}

		function finishChecking() {
		   if (dialogWin.win && !dialogWin.win.closed) {
			  dialogWin.win.focus()
		   }
		}
		var dialogWin = window.open(url,'',features);
		checkModal();
	},
	resizeImage: function(el) {
		var container = el.offsetParent;
		el.width = 1;
		el.width = container.offsetWidth - 20;
	}
}



WebApp.Import('common.js');
WebApp.Import('now_core.js');
WebApp.Import('lib.querystring.js');


var showAreaId = 'div01';
function showArea(id)
{
	document.getElementById(showAreaId).style.display = 'none';
	document.getElementById(id).style.display = 'block';
	showAreaId = id;
}

