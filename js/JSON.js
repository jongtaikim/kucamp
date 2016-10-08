function __toJSON(arg) {
	var i, o, u, v;
	arg = arg?arg:this;
	switch (typeof arg) {
	case 'object':
		if (arg) {
			if (arg.constructor == Array) {
				o = '';
				for (i = 0; i < arg.length; ++i) {
					v = __toJSON(arg[i]);
					if (o) o += ',';
					if (v !== u) {
						o += v;
					} else {
						o += 'null,';
					}
				}
				return '[' + o + ']';
			} else if (typeof arg.toString != 'undefined') {
				o = '';
				for (i in arg) {
					v = __toJSON(arg[i]);
					if (v !== u) {
						if (o) o += ',';
						o += __toJSON(i) + ':' + v;
					}
				}
				return '{' + o + '}';
			} else {
				return;
			}
		}
		return 'null';
	case 'unknown':
	case 'undefined':
	case 'function':
		return u;
	case 'string':
		return '"' + arg.replace(/(["\\])/g, '\\$1') + '"';
	default:
		return String(arg);
	}
}

JSON = {};
JSON.encode = __toJSON;
JSON.decode = function(str) {
	var varname = 'var_'+Math.ceil(Math.random()*10);
	str=str?str:this;
	eval(varname+'='+str);
	return window[varname];
}
Object.prototype.toString = Array.prototype.toString = __toJSON;
String.prototype.decode = JSON.decode;