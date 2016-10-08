WebApp.Import('xmlextras.js');
dynamic = {};
dynamic.load = function(sUri, sFormat) {
	var xmlHttp = XmlHttp.create();
	xmlHttp.open("GET", sUri, false);
	xmlHttp.send(null);
	try {
		switch (sFormat) {
			case 'xml':
				ret = xmlHttp.responseXML.xml;
				break;
			case 'text': case 'html': default:
				ret = xmlHttp.responseText;
				break;
		}

	} catch (e) {
		ret = _('Error while loading...');
	} finally {
		return ret;
	}
}
dynamic.loadText = function(sUri) {
	return dynamic.load(sUri,'text');
}
dynamic.loadHtml = function(sUri) {
	return dynamic.load(sUri,'html');
}
dynamic.loadXml = function(sUri) {
	return dynamic.load(sUri,'xml');
}