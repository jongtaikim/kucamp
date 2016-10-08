/* vim: set expandtab tabstop=4 shiftwidth=4 foldmethod=marker: */
/**
* 파일명: lib.forms.js
* 작성일: 2003-06-16
* 작성자: 거친마루
* 설  명: 폼값 다루는 자바스크립트
*****************************************************************
* 
*/

/**
* mixed getValue(string name)
*    °   
* 
* @param string name  
* @return mixed value
*/
function getValue(name) {
	var arr = ["select","input","textarea"];
	for (k=0; k<arr.length; k++) {
//		var el = document.getElementsByTagName(arr[k]);
		var el = document.all.tags(arr[k]);
		for (i = 0; i < el.length; i++) {
			if (el[i].name == name) {
				if (el[i].tagName == "SELECT") return el[i].options[el[i].selectedIndex].value;
				if (el[i].type == "radio" || el[i].type == "checkbox") {
					if (el[i].checked) return el[i].value;
				}
			}
		}
	}
	return null;
}

/**
* void setValue(string name, string value)
*    °   
*
* @param string name  
* @param mixed value  
*/
function setValue(name, value) {
	var scanElements = ['input','select','textarea'];
	for (var e in scanElements) {
//		var el = document.getElementsByTagName(scanElements[e]);
		var el = document.all.tags(scanElements[e]);
		for (i = 0 ; i < el.length; i++) {
			if (el[i].type == "radio" || el[i].type == "checkbox") {
				if (el[i].name == name) {
					if (typeof(value) == 'object') {
						for (var v=0; v<value.length; v++) {
							if (el[i].value == value[v]) {
								el[i].checked = 'true';
								break;
							}
						}
					} else if (el[i].value == value) {
						el[i].checked = true;
					}
				}
			} else if (el[i].tagName == "SELECT") {
				if (el[i].name == name) {
					for (j = 0; j < el[i].options.length; j++ ) {
						if (el[i].options[j].value == value) el[i].selectedIndex = j;
					}
				}
			} else if (el[i].type == "text" || el[i].tagName == "textarea") {
				if (el[i].name == name) {
					if (typeof(value) == 'object') {
						for(var v=0,vc=value.length; v<vc; v++) {
							if (el[i].name == name) el[i+v].value = value[v];
						}
						i+=vc;
					} else {
						el[i].value = value;
					}
				}
			}
		}
	}
}

/**
* void formValue(string formname, object values)
*        
*
* @param string name  
* @param object value  
*/
function formValue(formname,values) {
	var form = document.forms[formname];
	for (var e = 0; e < form.elements.length; e++) {
		var el = form.elements[e];
		if (el.tagName == "FIELDSET") continue;
		var key = el.name.replace(/\[\]$/,'');
		var value = values[key];
		if (value) {
			switch (el.type) {
				case "radio":					//      
					if (el.value == value) {
						el.checked = true;
					}
					break;
				case "checkbox":				//      
					if (typeof(value) == 'object') {
						for (var i = 0; i < value.length; i++) {
							if (el.value == value[i]) el.checked = true;
						}
					} else {
						if (el.value == value) el.checked = true;
					}
					break;
				default:
					switch (el.tagName) {
						case "SELECT":			//      
							if (typeof(value) == 'object') value = value.pop();
							for (var idx = 0; idx < el.options.length; idx++) {
								if (el.options[idx].value == value) el.selectedIndex = idx;
							}
							break;
						default:				//   ,(comma) join 
							el.value = value;
					}
			}
		}
	}
}

/**
* void setDisable(string name, boolean how)
*    °        .
* 
* @param string name  
* @param boolean how {default: true}
*/
function setDisable(name,how) {
	if (!how) how = true;
	var scanElements = ['input','select','textarea'];
	for (var e in scanElements) {
		var el = document.all.tags(scanElements[e]);
		for (i = 0 ; i < el.length; i++) {
			if (el[i].name == name) {
				el[i].disabled = how;
			}
		}
	}
}

/**
* void disableValue(string name, mixed value)
*       .
* <!> :           .
* 
* @param string name  
* @param mixed value    
*/
function disableValue(name,value) {
	var css = document.createElement("LINK");
	css.rel = "stylesheet";
	css.href = "/css/forms.css";
	document.all.tags("HEAD")[0].insertAdjacentElement("beforeEnd", css);

	var scanElements = ['input','select'];
	for (var e in scanElements) {
		var el = document.getElementsByTagName(scanElements[e]);
		for (var i = 0; i < el.length; i++) {
			switch (el[i].tagName) {
				case "SELECT":
					if (el[i].name == name) {
						el[i].attachEvent("onchange",_isDisabledOption);
						for (var j=0; j<el[i].options.length; j++) {
							if (el[i].options[j].value == value) {
								el[i].options[j].style.color = '#c0c0c0';
								el[i].options[j].style.textDecoration = 'line-through';
								el[i].options[j].setAttribute('STATUS','disabled');
							}
						}
					}
				break;
				case "INPUT":
					if (el[i].name == name && el[i].value == value) {
						alert(el[i].value);
						el[i].attachEvent("onclick",_isDisabledElement);
						el[i].className = "disabled";
						alert(el[i].nextSibling.outerText);
//						.className = "disabled";
					}
				break;
			}
		}
	}
}

function _isDisabledElement() {
	return false;
}

function _isDisabledOption() {
	var el = event.srcElement;
	var notice = el.getAttribute("NOSEL");
	if (el.options[el.selectedIndex].getAttribute('STATUS') == 'disabled') {
		if (notice != null) alert(notice);
		return false;  // XXX:   
		for (var i=el.selectedIndex; i>=0; i--) {
			if (el.options[i].getAttribute('STATUS') != "disabled") {
				el.options[i].selected = true;
				return;
			}
		}
		for (oc=el.options.length; i<oc; i++) {
			if (el.options[i].getAttribute('STATUS') != "disabled") {
				alert(i);
				el.options[i].selected = true;
				return;
			}
		}	
	}
}
