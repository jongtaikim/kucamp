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
	}

}
WebApp.Import('now_core.js');
WebApp.Import('Floating.js');
WebApp.Import('common.js');
