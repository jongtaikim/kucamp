QueryString = function(str) {
	var str = str ? str : document.location.href;
	//alert(str);

	this.argv = new Array();
	this.baseName = str.substring(str.indexOf('/',7)).split('?')[0];
	this.queryString = str.replace(/^[^\?]+\?/, '').replace(/#(.*)$/, '');
	if (!this.queryString) this.queryString = '';
	var _argv = this.queryString.split('&');
	

	for(var i=0; i<_argv.length; i++) {
		var _key = _argv[i].substring(0, _argv[i].indexOf('='));
		var _val = _argv[i].substring(_argv[i].indexOf('=')+1);
		if(!_key || _argv[i].indexOf('=') == -1) continue;
		this.argv[_key] = _val;

	}
}

QueryString.prototype.setVar = function(key,val) {
	if (typeof key == 'object') {
		for (var item in key) this.argv[item] = key[item];
	} else {
		this.argv[key] = val;
	}
	return this.getVar();
}

QueryString.prototype.delVar = function(key) {
	this.argv[key] = '';
}

QueryString.prototype.getVar = function(key) {
	if (key) {
		return this.argv[key] ? this.argv[key] : '';
	} else {
		this._act = this.baseName ? this.baseName : this.getVar('act');
		
		if (/^(\.+)/.test(this.argv['act'])) {
			var len = i = RegExp.$1.length;
			var curr = this._act;
			while (i-- > 0) {
				curr = curr.substring(0,curr.lastIndexOf('.'));
			}
			this.argv['act'] = curr+'.'+this.argv['act'].substring(len);
		}
		//==-- treat HUMAN_URI is active --==//
		if (this.argv['act'] != '' && this.argv['act'] != undefined) {
			this.baseName = this.argv['act'];
			this.delVar('act');
		}
		var _item = new Array();
		for (var x in this.argv) {
			if (this.argv[x]) {
				_item[_item.length] = x + '=' + this.argv[x];
				//alert(x);
			}else{
			
			continue;
			}
		}
		return (_item.length > 0) ? this.baseName + '?' + _item.join('&') : this.baseName;
	}
}
URL = new QueryString;
