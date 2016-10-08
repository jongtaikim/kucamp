if(typeof window!="undefined"&&typeof window.nhn=="undefined"){window.nhn=new Object;}
function $(sID){var ret=new Array;var el=null;var reg=/^<([a-z]+|h[1-5])>$/i;for(var i=0;i<arguments.length;i++){el=arguments[i];if(typeof el=="string"){if(reg.test(el)){el=document.createElement(RegExp.$1);}else{el=document.getElementById(el);}}
if(el)ret[ret.length]=el;}
return ret.length?((arguments.length>1)?ret:ret[0]):null;}
function $$(sSelector){}
function $Class(oDef){function typeClass(){var t=this;var a=[];while(typeof t.$super!="undefined"){t.$super.$this=this;if(typeof t.$super.$init=="function")a[a.length]=t;t=t.$super;}
for(var i=a.length-1;i>-1;i--)a[i].$super.$init.apply(a[i].$super,arguments);if(typeof this.$init=="function")this.$init.apply(this,arguments);}
if(typeof oDef.$static!="undefined"){var i=0,x;for(x in oDef)x=="$static"||i++;for(x in oDef.$static)typeClass[x]=oDef.$static[x];if(!i)return oDef.$static;delete oDef.$static;}
typeClass.prototype=oDef;typeClass.prototype.constructor=typeClass;typeClass.extend=$Class.extend;return typeClass;}
$Class.extend=function(superClass){this.prototype.$super=new Object;var superFunc=function(m,func){return function(){var r;var f=this.$this[m];var t=this.$this;t[m]=func;r=t[m].apply(t,arguments);t[m]=f;return r;};};for(var x in superClass.prototype){if(typeof this.prototype[x]=="undefined"&&x!="$init")this.prototype[x]=superClass.prototype[x];if(typeof superClass.prototype[x]=="function"){this.prototype.$super[x]=superFunc(x,superClass.prototype[x]);}else{this.prototype.$super[x]=superClass.prototype[x];}}
for(var x in superClass){if(x=="prototype")continue;this[x]=superClass[x];}
return this;};function $A(array){if(typeof array=='undefined')array=new Array;if(array instanceof $A)return array;if(window===this)return new $A(array);if(array instanceof Array){this._array=array;}else{this._array=new Array;for(var i=0;i<array.length;i++){this._array[this._array.length]=array[i];}}}
$A.prototype.length=function(nLen,oElem){if(typeof len=="number"){var l=this._array.length;this._array.length=len;if(typeof elem!="undefined"){for(var i=l;i<len;i++){this._array[i]=elem;}}}else{return this._array.length;}}
$A.prototype.has=function(any){return(this.indexOf(any)>-1);}
$A.prototype.indexOf=function(any){if(typeof this._array.indexOf!='undefined')return this._array.indexOf(any);for(var i=0;i<this._array.length;i++){if(this._array[i]==any)return i;}
return-1;}
$A.prototype.$value=function(){return this._array;}
$A.prototype.push=function(element1){return this._array.push.apply(this._array,$A(arguments).$value());}
$A.prototype.pop=function(){return this._array.pop();}
$A.prototype.shift=function(){return this._array.shift();}
$A.prototype.unshift=function(element1){return this._array.unshift.apply(this._array,$A(arguments).$value());}
$A.prototype.forEach=function(callback,thisObject){if(typeof this._array.forEach=='function')return this._array.forEach.apply(this._array,arguments);for(var i=0;i<this._array.length;i++){try{callback.call(thisObject,this._array[i],i,this._array);}catch(e){if(e instanceof $A.Break)break;if(e instanceof $A.Continue)continue;}}
return this;}
$A.prototype.map=function(callback,thisObject){if(typeof this._array.map=='function')return this._array.map.apply(this._array,arguments);for(var i=0;i<this._array.length;i++){try{this._array[i]=callback.call(thisObject,this._array[i],i,this._array);}catch(e){if(e instanceof $A.Break)break;if(e instanceof $A.Continue)continue;}}
return this;}
$A.prototype.filter=function(callback,thisObject){var ar=new Array;this.forEach(function(v,i,a){if(callback.call(thisObject,v,i,a)===true){ar[ar.length]=v;}});return $A(ar);}
$A.prototype.every=function(callback,thisObject){if(typeof this._array.every!='undefined')return this._array.every(callback,thisObject);var result=true;this.forEach(function(v,i,a){if(callback.call(thisObject,v,i,a)===false){result=false;$A.Break();}});return result;}
$A.prototype.some=function(callback,thisObject){if(typeof this._array.some!='undefined')return this._array.some(callback,thisObject);var result=false;this.forEach(function(v,i,a){if(callback.call(thisObject,v,i,a)===true){result=true;$A.Break();}});return result;}
$A.prototype.refuse=function(value){return this.filter(function(v,i,a){return(v!==value)});}
$A.prototype.slice=function(start,end){var a=this._array.slice.call(this._array,start,end);return $A(a);}
$A.prototype.splice=function(index,howMany){var a=this._array.splice.apply(this._array,arguments);return $A(a);}
$A.Break=function(){if(window===$A)throw new $A.Break;}
$A.Continue=function(){if(window===$A)throw new $A.Continue;}
function $H(hashObject){if(typeof hashObject=="undefined")hashObject=new Object;if(hashObject instanceof $H)hashObject=hashObject.toObject();if(this===window)return new $H(hashObject);this._table=hashObject;}
$H.prototype.$value=function(){return this._table;}
$H.prototype.length=function(){var i=0;for(var k in this._table){if(typeof Object.prototype[k]!='undeifned'&&Object.prototype[k]===this._table[k])continue;i++;}
return i;}
$H.prototype.forEach=function(callback,thisObject){for(var k in this._table){if(typeof Object.prototype[k]!='undeifned'&&Object.prototype[k]===this._table[k])continue;try{callback.call(thisObject,this._table[k],k,this._table);}catch(e){if(e instanceof $H.Break)break;if(e instanceof $H.Continue)continue;}}
return this;}
$H.prototype.filter=function(callback,thisObject){var h=$H();this.forEach(function(v,k,o){if(callback.call(thisObject,v,k,o)===true){h.add(k,v);}});return h;}
$H.prototype.map=function(callback,thisObject){var t=this._table;this.forEach(function(v,k,o){t[k]=callback.call(thisObject,v,k,o);});return this;}
$H.prototype.add=function(key,value){this._table[key]=value;return this._table[key];}
$H.prototype.remove=function(key){if(typeof this._table[key]=="undefined")return null;var val=this._table[key];delete this._table[key];return val;}
$H.prototype.search=function(value){var result=false;this.forEach(function(v,k,o){if(v===value){result=k;$H.Break();}});return result;}
$H.prototype.hasKey=function(key){var result=false;return(typeof this._table[key]!="undefined");}
$H.prototype.hasValue=function(value){return(this.search(value)!==false);}
$H.prototype.sort=function(){var o=new Object;var a=this.values();var k=false;a.sort();for(var i=0;i<a.length;i++){k=this.search(a[i]);o[k]=a[i];delete this._table[k];}
this._table=o;return this;}
$H.prototype.ksort=function(){var o=new Object;var a=this.keys();a.sort();for(var i=0;i<a.length;i++){o[a[i]]=this._table[a[i]];}
this._table=o;return this;}
$H.prototype.keys=function(){var keys=new Array;for(var k in this._table){keys.push(k);}
return keys;}
$H.prototype.values=function(){var values=new Array;for(var k in this._table){values.push(this._table[k]);}
return values;}
$H.Break=function(){if(this===$H)throw new $H.Break;}
$H.Continue=function(){if(this===$H)throw new $H.Continue;}
function $Element(el){if(this===window)return new $Element(el);if(el instanceof $Element)return el;this._element=$(el);this.tag=this._element?this._element.tagName.toLowerCase():'';this._queue=new Array;}
$Element.prototype.$value=function(){return this._element;}
$Element.prototype.visible=function(){return(this.css("display")!="none");}
$Element.prototype.show=function(){var s=this._element.style;var b="block";var c={p:b,div:b,form:b,h1:b,h2:b,h3:b,h4:b,td:"table-cell",th:"table-cell",li:"list-item",table:"table",thead:"table-header-group",tbody:"table-row-group",tfoot:"table-footer-group",tr:"table-row",col:"table-column",colgroup:"table-column-group",caption:"table-caption"};try{if(typeof c[this.tag]=="string"){s.display=c[this.tag];}else{s.display="inline";}}catch(e){s.display="block";}
return this;}
$Element.prototype.hide=function(){this._element.style.display="none";return this;}
$Element.prototype.toggle=function(){if(this.visible())this.hide();else this.show();return this;}
$Element.prototype.opacity=function(value){var v,e=this._element;if(typeof value=="number"){if(value<0)value=0;else if(value>1)value=1;if(typeof e.filters!="undefined"){value*=100;if(typeof e.filters.alpha!="undefined"){e.filters.alpha.opacity=value;}else{e.style.filter=e.style.filter+" alpha(opacity="+value+")";}}else{e.style.opacity=value;}
return value;}
if(typeof e.filters!="undefined"){v=(typeof e.filters.alpha=="undefined")?0:e.filtes.alpha.opacity;v=v/100;}else{v=parseFloat(e.style.opacity);if(isNaN(v))v=0;}
return v;}
$Element.prototype.appear=function(duration,callback){if(this.visible())return this;return this;}
$Element.prototype.disappear=function(duration,callback){if(!this.visible())return this;return this;}
$Element.prototype.css=function(sName,sValue){var e=this._element;if(typeof sName=="string"){var view;if(typeof sValue=="string"||typeof sValue=="number"){var obj=new Object;obj[sName]=sValue;sName=obj;}else{if(e.currentStyle){if(sName=="cssFloat")sName="styleFloat";return e.currentStyle[sName];}else if(window.getComputedStyle){if(sName=="cssFloat")sName="float";return document.defaultView.getComputedStyle(e,null).getPropertyValue(sName.replace(/([A-Z])/g,"-$1").toLowerCase());}
return null;}}
if(typeof $H!="undefined"&&sName instanceof $H){sName=sName.$value();}
if(typeof sName=="object"){var v,type;for(var k in sName){v=sName[k];type=(typeof v);if(type!="string"&&type!="number")continue;if(k=="cssFloat"&&navigator.userAgent.indexOf("MSIE")>-1)k="styleFloat";try{e.style[k]=v;}catch(err){if(k=="cursor"&&v=="pointer"){e.style.cursor="hand";}else if(("#top#left#right#bottom#").indexOf(k+"#")>0&&(type=="number"||!isNaN(parseInt(v)))){e.style[k]=parseInt(v)+"px";}}}}
return this;}
$Element.prototype.attr=function(sName,sValue){var e=this._element;if(typeof sName=="string"){if(typeof sValue!="undefined"){var obj=new Object;obj[sName]=sValue;sName=obj;}else{return e.getAttribute(sName);}}
if(typeof $H!="undefined"&&sName instanceof $H){sName=sName.$value();}
if(typeof sName=="object"){for(var k in sName){e.setAttribute(k,sName[k]);}}
return this;}
$Element.prototype.offset=function(top,left){var e=this._element;var t=0,l=0;if(typeof top=="number"&&typeof left=="number"){return{top:top,left:left};}
while(typeof e!="undefined"&&e!=null){t+=e.offsetTop;l+=e.offsetLeft;e=e.offsetParent;}
return{top:t,left:l};}
$Element.prototype.width=function(width){if(typeof width=="number"){var e=this._element;e.style.width=width+"px";if(e.offsetWidth!=width){e.style.width=(width*2-e.offsetWidth)+"px";}}
return this._element.offsetWidth;}
$Element.prototype.height=function(height){if(typeof height=="number"){var e=this._element;e.style.height=height+"px";if(e.offsetWidth!=height){e.style.height=(height*2-e.offsetWidth)+"px";}}
return this._element.offsetHeight;}
$Element.prototype.hasClass=function(sClass){return(new RegExp("\b"+sClass+"\b")).test(this._element.className);}
$Element.prototype.addClass=function(sClass){var e=this._element;e.className=e.className.replace(new RegExp("\b"+sClass+"(\b)|$")," "+sClass+"$1");return this;}
$Element.prototype.removeClass=function(sClass){var e=this._element;e.className=e.className.replace(new RegExp("\b"+sClass+"\b")," ");return this;}
$Element.prototype.text=function(sText){var prop=(typeof this._element.innerText!="undefined")?"innerText":"textContent";if(typeof sText=="string"){this._element[prop]=sText;}
return this._element[prop];}
$Element.prototype.html=function(sHTML){if(typeof sHTML=="string"){this._element.innerHTML=sHTML;}
return this._element.innerHTML;}
$Element.prototype.outerHTML=function(){var e=this._element;if(typeof e.outerHTML!="undefined")return e.outerHTML;var div=$("<div>");this._element.parentNode.insertBefore(div,this._element);div.appendChild(this._element);var s=div.innerHTML;div.parentNode.insertBefore(this._element,div);div.parentNode.removeChild(div);return s;}
$Element.prototype.append=function(oElement){var o=$Element(oElement).$value();this._element.appendChild(o);return $Element(o);}
$Element.prototype.prepend=function(oElement){var e=this._element;var o=$Element(oElement).$value();if(e.childNodes.length>0){e.insertBefore(o,e.childNodes[0]);}else{e.appendChild(o);}
return $Element(o);}
$Element.prototype.replace=function(oElement){var e=this._element;var o=$Element(oElement).$value();e.parentNode.insertBefore(o,e);e.parentNode.removeChild(e);return $Element(o);}
$Element.prototype.appendTo=function(oElement){var o=$Element(oElement).$value();o.appendChild(this._element);return this;}
$Element.prototype.appendTo=function(oElement){var o=$Element(oElement).$value();if(o.childNodes.length>0){o.insertBefore(this._element,o.childNodes[0]);}else{o.appendChild(this._element);}
return this;}
$Element.prototype.before=function(oElement){var o=$Element(oElement).$value();this._element.parentNode.insertBefore(o,this._element);return $Element(o);}
$Element.prototype.after=function(oElement){var o=this.before(oElement);o.before(this);return o;}
function $Fn(func,thisObject){if(this===window)return new $Fn(func,thisObject);if(typeof func=="function"){this._func=func;this._this=thisObject;}else if(typeof func=="string"&&typeof thisObject=="string"){this._func=new Function(func,thisObject);}}
$Fn.prototype.$value=function(){return this._func;}
$Fn.prototype.bind=function(){var a=$A(arguments).$value();var f=this._func;var t=this._this;var b=function(){var args=a.concat($A(arguments).$value());return f.apply(t,args);};return b;}
$Fn.prototype.bindForEvent=function(){var a=arguments;var f=this._func;var t=this._this;var b=function(e){var args=$A(a);if(typeof e=="undefined")e=window.event;args.unshift($Event(e));return f.apply(t,args.$value());};this.b=b;return b;}
$Fn.prototype.attach=function(oElement,sEvent){var f=this.bindForEvent.apply(this,$A(arguments).splice(2,arguments.length-1).$value());this.fff=f;if(typeof oElement.attachEvent!="undefined"){oElement.attachEvent("on"+sEvent,this.b);}else{if(sEvent.toLowerCase()=="mousewheel")sEvent="DOMMouseScroll";oElement.addEventListener(sEvent,this.b,false);}
$Fn.gc.pool.push({element:oElement,event:sEvent,func:f});}
$Fn.prototype.detach=function(oElement,sEvent){if(typeof oElement.detachEvent!="undefined"){oElement.detachEvent("on"+sEvent,this.b);}else{if(sEvent.toLowerCase()=="mousewheel")sEvent="DOMMouseScroll";oElement.removeEventListener(sEvent,this.b,false);}}
$Fn.gc=function(){var p=$Fn.gc.pool;var l=$Fn.gc.pool.length;for(var i=0;i<l;i++){try{$Fn(p[i].func).detach(p[i].element,p[i].event)}catch(e){};}}
$Fn.gc.pool=new Array;$Fn($Fn.gc).attach(window,"unload");function $Event(e){if(this===window)return new $Event(e);if(typeof e=='undefined')e=window.event;this._event=e;this.type=e.type.toLowerCase();this.element=e.target||e.srcElement;this.relatedElement=e.relatedTarget||(e.type=="mouseover"?e.fromElement:e.toElement);}
$Event.prototype.mouse=function(){var e=this._event;var delta=0;var left=(e.which&&e.button==0)||!!(e.button&1);var mid=(e.which&&e.button==1)||!!(e.button&4);var right=(e.which&&e.button==2)||!!(e.button&2);switch(this.type){case'dommousescroll':delta=-e.detail;break;case'mousewheel':delta=e.wheelDelta/40;break;};return{delta:delta,left:left,middle:mid,right:right};}
$Event.prototype.key=function(){var e=this._event;var k=e.keyCode;var alt=e.altKey;var ctrl=e.ctrlKey;var shift=e.shiftKey;var up=(k==38||k==104);var down=(k==40||k==98);var left=(k==37||k==100);var right=(k==39||k==102);var enter=(k==13);return{keyCode:e.keyCode,alt:alt,ctrl:ctrl,shift:shift,up:up,down:down,left:left,right:right,enter:enter}}
$Event.prototype.pos=function(){var e=this._event;var b=document.body;var pos=[b.scrollLeft||document.documentElement.scrollLeft,b.scrollTop||document.documentElement.scrollTop];return{pageX:e.pageX||e.clientX+pos[0]-b.clientLeft,pageY:e.pageY||e.clientY+pos[1]-b.clientTop,layerX:e.offsetX||e.layerX-1,layerY:e.offsetY||e.layerY-1};}
$Event.prototype.stop=function(){if(typeof this._event.preventDefault!='undefined')this._event.preventDefault();if(typeof this._event.stopPropagation!='undefined')this._event.stopPropagation();this._event.returnValue=false;this._event.cancelBubble=true;}
function $Agent(){if(window!==this)return;var a=new $Agent;window.$Agent=function(){return a;}
return a;}
$Agent.prototype.navigator=function(){var info=new Object;var ver=-1;var u=navigator.userAgent;var v=navigator.vendor;var f=function(s,h){return((h||"").indexOf(s)>-1)};info.opera=(typeof window.opera!="undefined")||f("Opera",u);info.ie=!info.opera&&f("MSIE",u);info.mozilla=f("Gecko",u);info.firefox=f("Firefox",u);info.camino=f("Camino",v);info.netscape=f("Netscape",u);info.safari=f("Apple",v);info.omniweb=f("OmniWeb",u);info.icab=f("iCab",v);info.konqueror=f("KDE",v);try{if(info.ie){ver=u.match(/(?:MSIE) ([0-9.]+)/)[1];}else if(info.firefox||info.opera||info.omniweb){ver=u.match(/(?:Firefox|Opera|OmniWeb)\/([0-9.]+)/)[1];}else if(info.mozilla){ver=u.match(/rv:([0-9.]+)/)[1];}else if(info.safari){ver=parseFloat(u.match(/Safari\/(0-9.]+)/)[1]);if(ver==100)ver=1.1;else ver=[1.0,1.2,-1,1.3,2.0,3.0][Math.floor(ver/100)];}else if(info.icab){ver=u.match(/iCab[ \/]([0-9.]+)/)[1];}
info.version=parseFloat(ver);if(isNaN(info.version))info.version=-1;}catch(e){info.version=-1;}
$Agent.prototype.navigator=function(){return info;}
return info;}
$Agent.prototype.os=function(){var info=new Object;var u=navigator.userAgent;var p=navigator.platform;var f=function(s,h){return(h.indexOf(s)>-1)};info.win=f("Win",p);info.mac=f("Mac",p);info.linux=f("Linux",p);info.win2000=info.win&&(f("NT 5.0",p)||f("2000",p));info.winxp=info.win&&(f("NT 5.1",p)||f("Win32",p));info.xpsp2=info.winxp&&(f("SV1",u)||f("MSIE 7",u));info.vista=f("NT 6.0",p);$Agent.prototype.os=function(){return info;}
return info;}
$Agent.prototype.flash=function(){var info=new Object;var p=navigator.plugins;var m=navigator.mimeTypes;var f=null;info.flash=false;info.version=-1;if(typeof p!="undefined"&&p.length){f=p["Shockwave Flash"];if(f){info.flash=true;if(f.description){info.version=parseFloat(f.description(/[0-9.]+/)[0]);}}
if(p["Shockwave Flash 2.0"]){info.flash=true;info.version=2;}}else if(typeof m!="undefined"&&m.length){f=m["application/x-shockwave-flash"];info.flash=(f&&f.enabledPlugin);}else{for(var i=9;i>1;i--){try{f=new ActiveXObject("ShockwaveFlash.ShockwaveFlash."+i);info.flash=true;info.version=i;break;}catch(e){}}}
$Agent.prototype.info=function(){return info;}
return info;}
function $Ajax(url,option){if(this===window)return new $Ajax(url,option);function _getXHR(){if(window.XMLHttpRequest){return new XMLHttpRequest();}else if(ActiveXObject){try{return new ActiveXObject('MSXML2.XMLHTTP');}
catch(e){return new ActiveXObject('Microsoft.XMLHTTP');}
return null;}};var loc=document.location.toString();var domain=loc.match(/^https?:\/\/([a-z0-9_\-\.]+)/i)[1];this._url=url;this._options=new Object;this._headers=new Object;this._crossdom=/^https?:\/\//i.test(url)&&!(new RegExp("^https?://"+domain+"(:[0-9]+)?(?:/|$)","i").test(url));this.option({type:"post",timeout:0,proxy:"",onload:function(){}});this.option(option);if(this._crossdom){this._request=new $Ajax.CrossRequest(this.option("proxy"));}else{this._request=_getXHR();}}
$Ajax.prototype._onload=function(){if(this._request.readyState==4){this._options.onload($Ajax.Response(this._request));}}
$Ajax.prototype.request=function(oData){var req=this._request;var opt=this._options;var data,v,a=[],data="";if(typeof oData=="undefined"||!oData){data=null;}else{for(var k in oData){v=oData[k];if(typeof v=="function")v=v();a[a.length]=k+"="+encodeURIComponent(v);}
data=a.join("&");}
req.open(opt.type.toUpperCase(),this._url,false);req.setRequestHeader("Content-Type","application/x-www-form-urlencoded; charset=utf-8");req.setRequestHeader("charset","utf-8");for(var x in this._headers){if(typeof this._headers[x]=="function")continue;req.setRequestHeader(x,String(this._headers[x]));}
if(typeof req.onload!="undefined"){req.onload=$Fn(this._onload,this).bind();}else{req.onreadystatechange=$Fn(this._onload,this).bind();}
req.send(data);}
$Ajax.prototype.abort=function(){this._request.abort();}
$Ajax.prototype.option=function(name,value){if(typeof name=="undefined")return"";if(typeof name=="string"){if(typeof value=="undefined")return this._options[name];this._options[name]=value;return this;}
try{for(var x in name)this._options[x]=name[x]}catch(e){};return this;}
$Ajax.prototype.header=function(name,value){if(typeof name=="undefined")return"";if(typeof name=="string"){if(typeof value=="undefined")return this._headers[name];this._headers[name]=value;return this;}
try{for(var x in name)this._headers[x]=name[x]}catch(e){};return this;}
$Ajax.Response=function(req){if(this===$Ajax)return new $Ajax.Response(req);this._response=req;}
$Ajax.Response.prototype.xml=function(){return this._response.responseXML;}
$Ajax.Response.prototype.text=function(){return this._response.responseText;}
$Ajax.Response.prototype.header=function(name){if(typeof name=="string")return this._response.getResponseHeader(name);return this._response.getAllResponseHeaders();}
$Ajax.CrossRequest=function(proxy){this._headers=new Object;this._respHeaders=new Object;this._proxy=proxy;this.onload=function(){};}
$Ajax.CrossRequest.prototype.open=function(type,url){var re=/https?:\/\/([a-z0-9_\-\.]+)/i;var dom=document.location.toString().match(re);this._type=type;this._url=url;this._remote=String(url).match(/(https?:\/\/[a-z0-9_\-\.]+)/i)[1];this._iframe=null;this._domain=(dom!=document.domain)?document.domain:"";if(typeof $Ajax.CrossRequest._callbacks=="undefined"){$Ajax.CrossRequest._callbacks=new Object;}}
$Ajax.CrossRequest.prototype._callback=function(id,data,header){var t=this;this.readyState=4;this.responseText=data;this._respHeaderString=header;header.replace(/^([\w\-]+)\s*:\s*(.+)$/m,function($0,$1,$2){t._respHeaders[$1]=$2;});this.onload(this);setTimeout(function(){t.abort()},10);}
$Ajax.CrossRequest.prototype.abort=function(){try{this._iframe.parentNode.removeChild(this._iframe);}catch(e){}}
$Ajax.CrossRequest.prototype.send=function(data){this.responseXML="";this.responseText="";var re=/https?:\/\/([a-z0-9_\-\.]+)/i;var id=String(Math.floor(Math.random()*10000));var url=this._remote+"/ajax_remote_callback.html?type="+this._type;var header=new Array;$Ajax.CrossRequest._callbacks[id]=$Fn(this._callback,this).bind();for(var x in this._headers){header[header.length]="'"+x+"':'"+this._headers[x]+"'";}
header="{"+header.join(",")+"}";url+="&id="+id;url+="&header="+encodeURIComponent(header);url+="&proxy="+encodeURIComponent(this._proxy);url+="&domain="+this._domain;url+="&url="+encodeURIComponent(this._url.replace(re,""));url+="#"+encodeURIComponent(data);var fr=this._iframe=$("<iframe>");fr.style.position="absolute";fr.style.visibility="hidden";fr.style.width="1px";fr.style.height="1px";var body=document.body||document.documentElement;if(body.firstChild)body.insertBefore(fr,body.firstChild);else body.appendChild(fr);fr.src=url;}
$Ajax.CrossRequest.prototype.setRequestHeader=function(sName,sValue){this._headers[sName]=sValue;}
$Ajax.CrossRequest.prototype.getResponseHeader=function(sName){return this._respHeaders[sName];}
$Ajax.CrossRequest.prototype.getAllResponseHeaders=function(){return this._respHeaderString;}
function $Json(sObject){if(window===this)return new $Json(sObject);if(typeof sObject=="string"){try{sObject=eval("("+sObject+")");}catch(e){sObject=new Object;}}
this._object=sObject;}
$Json.fromXML=function(sXML){var o=new Object;var re=/\s*<(\/?[\w:\-]+)((?:\s+[\w:\-]+\s*=\s*"[^"]*")*)\s*>\s*|\s*<!\[CDATA\[([\w\W]*?)\]\]>\s*|\s*([^<]*)\s*/ig;var re2=/^[0-9]+(?:\.[0-9]+)?$/;var ec={"&amp;":"&","&nbsp;":" ","&quot;":"\"","&lt;":"<","&gt;":">"};var fg={tags:["/"],stack:[o]};var es=function(s){return s.replace(/&[a-z]+;/g,function(m){return(typeof ec[m]=="string")?ec[m]:m;})};var at=function(s,c){s.replace(/([\w\:\-]+)\s*=\s*"([^"]*)"/g,function($0,$1,$2){c[$1]=es($2)})};var cb=function($0,$1,$2,$3,$4){var cur,cdata="";var idx=fg.stack.length-1;if(typeof $1=="string"&&$1){if($1.substr(0,1)!="/"){cur=fg.stack[idx];if(typeof cur[$1]=="undefined"){cur[$1]=new Object;cur=fg.stack[idx+1]=cur[$1];}else if(cur[$1]instanceof Array){var len=cur[$1].length;cur[$1][len]=new Object;cur=fg.stack[idx+1]=cur[$1][len];}else{cur[$1]=[cur[$1],new Object];cur=fg.stack[idx+1]=cur[$1][1];}
if(typeof $2=="string"&&$2)at($2,cur);fg.tags[idx+1]=$1;}else{fg.tags.length--;fg.stack.length--;}}else if(typeof $3=="string"&&$3){cdata=$3;}else if(typeof $4=="string"&&$4){cdata=es($4);}
if(cdata.length>0){var par=fg.stack[idx-1];var tag=fg.tags[idx];if(re2.test(cdata))cdata=parseFloat(cdata);else if(cdata=="true"||cdata=="false")cdata=new Boolean(cdata);if(par[tag]instanceof Array){par[tag][par[tag].length-1]=cdata;}else{par[tag]=cdata;}}}
sXML=sXML.replace(/<(\?|\!-)[^>]*>/g,"");sXML.replace(re,cb);return $Json(o);}
$Json.prototype.get=function(sPath){var o=this._object;var p=sPath.split("/");var re=/^([\w:\-]+)\[([0-9]+)\]$/;var stack=[[o]],cur=stack[0];var len=p.length,c_len,idx,buf,j,e;for(var i=0;i<len;i++){if(p[i]=="."||p[i]=="")continue
if(p[i]==".."){stack.length--;}else{buf=new Array;idx=-1;c_len=cur.length;if(re.test(p[i]))idx=parseInt(RegExp.$2);if(c_len==0)return new Array;for(j=0;j<c_len;j++){e=cur[j][p[i]];if(typeof e!="undefined"){if(e instanceof Array)buf=buf.concat(e);buf[buf.length]=e;}}
stack[stack.length]=buf;}
cur=stack[stack.length-1];}
return cur;}
$Json.prototype.toString=function(){var func={$:function($){if(typeof $=="undefined")return'""';if(typeof $=="boolean")return $?"true":"false";if(typeof $=="string")return this.s($);if(typeof $=="number")return $;if($ instanceof Array)return this.a($);if($ instanceof Object)return this.o($);},s:function(s){var e={'"':'\\"',"\\":"\\\\","\n":"\\n","\r":"\\r","\t":"\\t"};var c=function(m){return(typeof e[m]!="undefined")?e[m]:m};return'"'+s.replace(/[\\"'\n\r\t]/g,c)+'"';},a:function(a){var s="[",c="",n=a.length;for(var i=0;i<n;i++){if(typeof a[i]=="function")continue;s+=c+this.$(a[i]);if(!c)c=",";}
return s+"]";},o:function(o){var s="{",c="";for(var x in o){if(typeof o[x]=="function")continue;s+=c+this.s(x)+":"+this.$(o[x]);if(!c)c=",";}
return s+"}";}}
return func.$(this._object);}
$Json.prototype.toXML=function(){var f=function($,tag){var t=function(s){return"<"+tag+">"+s+"</"+tag+">"};switch(typeof $){case"undefined":case"null":return t("");case"number":return t($);case"string":if($.indexOf("<")<0)return t($.replace(/&/g,"&amp;"));else return t("<![CDATA["+$+"]]>");case"boolean":return t(String($));case"object":var ret="";if($ instanceof Array){var len=$.length;for(var i=0;i<len;i++){ret+=f($[i],tag);};}else{for(var x in $){ret+=f($[x],x);};if(tag)ret=t(ret);}
return ret;}}
return f(this._object,"");};$Json.prototype.toObject=function(){return this._object;}
$Json.prototype.$value=$Json.prototype.toObject;function $Selection(){}
$Selection.prototype.range=function(oRange){}
function $Range(){}
$Range.prototype.getHTML=function(){}
$Range.prototype.setHTML=function(){}
function $ElementList(els){var cl=arguments.callee;if(els instanceof cl)return els;if(!(this instanceof cl))return new cl(els);if(els instanceof Array||($A&&els instanceof $A)){els=$A(els)}else if(typeof els=="string"&&cssquery){els=$A(cssquery(els))}else{els=$A()}
this._elements=els.map(function(v,i,a){return $Element(v)})}
$ElementList.prototype.get=function(idx){return this._elements[idx]};$ElementList.prototype.getFirst=function(){return this.get(0)};$ElementList.prototype.getLast=function(){return this.get(Math.Max(this._elements.length-1,0))};(function(proto){var setters='show,hide,toggle,addClass,removeClass,toggleClass,fireEvent,leave,';setters+='empty,appear,disappear,className,width,height,text,html,css,attr';$A(setters.split(',')).forEach(function(name){proto[name]=function(){var args=$A(arguments).$value();this._elements.forEach(function(el){el[name].apply(el,args)});return this}});$A(['appear','disapeear']).forEach(function(name){proto[name]=function(duration,callback){var len=this._elements.length;var self=this;this._elements.forEach(function(el,idx){if(idx==len-1)el[name](duration,function(){callback(self)});else el[name](duration)})}})})($ElementList.prototype);function $Template(str){var obj=null;var cl=arguments.callee;if(str instanceof cl)return str;if(!(this instanceof cl))return new cl(str);if(typeof str=="undefined")str="";else if((obj=$(str))&&obj.tagName.toUpperCase()=="TEXTAREA"){str=obj.value.replace(/^\s+|\s+$/g,"")}
this._str=str+""}
$Template.splitter=/(?!\\)[\{\}]/g;$Template.pattern=/^(?:if (.+)|elseif (.+)|for (?:(.+)\:)?(.+) in (.+)|(else)|\/(if|for)|=(.+))$/;$Template.prototype.process=function(data){var tpl=this._str.split($Template.splitter),i=tpl.length;var map={'"':'\\"','\\':'\\\\','\n':'\\n','\r':'\\r','\t':'\\t','\f':'\\f'};var reg=[/([a-zA-Z_][\w\.]*)/g,/[\n\r\t\f"\\]/g,/^\s+/,/\s+$/];var cb=["d.$1",function(m){return map[m]||m},"",""];var stm=[];if(i<2)return tpl;while(i--){if(i%2){tpl[i]=tpl[i].replace($Template.pattern,function(){var m=arguments;if(m[8])return's[s.length]=d.'+m[8]+';';if(m[1]){return'if('+m[1].replace(reg[0],cb[0])+'){'}
if(m[2])return'}else if('+m[2].replace(reg[0],cb[0])+'){';if(m[5]){return'n=0;t=d.'+m[5]+';p=(t instanceof Array);for(var x in t){if((p&&isNaN(parseInt(x)))||(!p&&!t.propertyIsEnumerable(x)))continue;d.'+m[4]+'=t[x];'+(m[3]?'d.'+m[3]+'=x;':'')+'n++;'}
if(m[6])return'}else{';if(m[7]){return'};'}
return m[0]})}else if(tpl[i]){tpl[i]='s[s.length]="'+tpl[i].replace(reg[1],cb[1])+'";'}}
tpl=(new Function("d",'var s=[];'+tpl.join('')+'return s.join("")'))(data);return tpl};function getByteLength(s)
{var len=s.length;if(document.all)
{var temp=escape(s);var offset=temp.indexOf('%u');while(-1!=offset)
{++len;temp=temp.substring(offset+2);offset=temp.indexOf('%u');}}
return len;}
function escapeUnicode(s)
{var escaped="";var len=s.length;var code;for(i=0;i!=len;++i)
{code=s.charCodeAt(i);if(code<256)
{escaped+=escape(s.charAt(i));}
else
{escaped+=s.charAt(i);}}
return escaped;}
function trimString(source)
{var filteredString=trimFront(source);return trimBack(filteredString);}
function trimFront(str)
{var indexFront,indexMover,len;indexFront=0;indexMover=0;len=str.length;while(true)
{indexMover=str.indexOf(" ");if(indexMover==-1)
break;if(indexMover==0)
{str=str.substring(1,len);}
else
{break;}}
return str;}
function trimBack(str)
{var indexMover;while(true)
{indexMover=str.lastIndexOf(" ");if(indexMover==-1)
{break;}
if(indexMover==str.length-1)
{str=str.substring(0,indexMover);}
else
{break;}}
return str;}
var whitespace=" \t\n";function isEmpty(s)
{return((s==null)||(s.length==0))}
function isWhitespace(s)
{var i;if(isEmpty(s))return true;for(i=0;i<s.length;i++)
{var c=s.charAt(i);if(whitespace.indexOf(c)==-1)return false;}
return true;}
function removeZeroString(str)
{while(true)
{var index=str.indexOf("0");if(index==0)
{str=str.substring(1);}
else
{break;}}
return str;}
function replaceBackSlash(str)
{return str.replace(/\\/g,"\\");}
function checkURLString(str)
{var searchStr="http://";if(str.indexOf(searchStr)==-1)
{str=searchStr.concat(str);}
return str;}
function getSelectedValue(sel)
{var tempValue="";var len=sel.options.length;for(i=len-1;i>=0;i--)
{if(sel.options[i].selected)
{tempValue=sel.options[i].value;break;}}
return tempValue}
function getTowNumberStr(str)
{if(parseInt(str)>=1&&parseInt(str)<=9)
{return str="0"+str;}
return str;}
function String_format()
{var buffer="";var values=String_format.arguments;var fmt=values[0];var start=0;var offset=-1;var i;for(i=1;i<values.length;i++)
{offset=fmt.indexOf("%s",start);if(-1!=offset)
{buffer+=fmt.substring(start,offset);buffer+=values[i];start=offset+2;offset=-1;}}
buffer+=fmt.substring(start);return buffer;}
String.prototype.format=String_format;function fc_chk2()
{if(event.keyCode==13)
event.returnValue=false;}
function checkDate(formName,selName,hiddenName)
{sel=eval(formName+"."+selName);len=sel.options.length;for(i=len-1;i>=0;i--)
{if(sel.options[i].selected)
{var temp=eval(formName+"."+hiddenName);temp.value=sel.options[i].value;if(parseInt(temp.value)>0&&parseInt(temp.value)<10)
{temp.value="0"+temp.value;}
break;}}}
function isLetter(c)
{return(((c>="a")&&(c<="z"))||((c>="A")&&(c<="Z")));}
function withHangul(str)
{for(i=0;i<str.length;i++)
{var code=str.charCodeAt(i);var ch=(str.substr(i,1)).toUpperCase();iCode=parseInt(code);if((ch<"0"||ch>"9")&&(ch<"A"||ch>"Z")&&((iCode>255)||(iCode<0)))
{return true;}}
return false;}
function removeSpecialCharacters(str)
{var tempStr="";tempStr=str;tempStr=tempStr.replace(/"/g,"");tempStr=tempStr.replace(/'/g,"");return tempStr;}
function removeSpecialCharactersQuot(str)
{var tempStr="";tempStr=str;tempStr=tempStr.replace(/"/g,"");return tempStr;}
var fc_isIE=(navigator.appVersion.indexOf("MSIE")!=-1)?true:false;var fc_isWin=(navigator.appVersion.toLowerCase().indexOf("win")!=-1)?true:false;var fc_isOpera=(navigator.userAgent.indexOf("Opera")!=-1)?true:false;function checkFlashPlayerVersion(){var _version;var _e;try{var _axo=new ActiveXObject("ShockwaveFlash.ShockwaveFlash.5");_version=_axo.GetVariable("$version");}catch(_e){_version=-1;}
return _version;}
function showFlash(_swfURL_,_flashID_,_width_,_height_,_wmode_,_flashVars_,_bgColor_){_wmode_=(_wmode_==undefined)?"transparent":_wmode_;_bgColor_=(_bgColor_==undefined)?"#000000":_bgColor_;if(fc_isIE&&fc_isWin&&!fc_isOpera){_object_='<object classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" codebase="http://fpdownload.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=7,0,0,0" width="'+_width_+'" height="'+_height_+'" id="'+_flashID_+'" align="middle">';_object_+='<param name="allowScriptAccess" value="always" />';_object_+='<param name="quality" value="high" />';_object_+='<param name="movie" value="'+_swfURL_+'" />';_object_+='<param name="wmode" value="'+_wmode_+'" />';_object_+='<param name="bgcolor" value="'+_bgColor_+'" />';_object_+='<param name="flashvars" value="'+_flashVars_+'">';_object_+='</object>';}else{_object_='<embed src="'+_swfURL_+'" quality="high" wmode="'+_wmode_+'" flashvars="'+_flashVars_+'" bgcolor="'+_bgColor_+'" width="'+_width_+'" height="'+_height_+'" name="'+_flashID_+'" align="middle" allowScriptAccess="always" type="application/x-shockwave-flash" pluginspage="http://www.macromedia.com/go/getflashplayer" />';}
document.write(_object_);}
function findFlashObj(_flashID_){var tarObj=fc_isIE?document.all[_flashID_]:document[_flashID_];return tarObj;}
var SearchBar=$Class({$init:function(greeting)
{this._greeting=greeting;this._eventBind();this._addGreeting();},_focusSearchBar:function()
{if($("search_bar_keyword"))
{if($("search_bar_keyword").value==this._greeting)
{$("search_bar_keyword").value="";}}},_blurSearchBar:function()
{if($("search_bar_keyword"))
{if($("search_bar_keyword").value=="")
{$("search_bar_keyword").value=this._greeting;}}},_addGreeting:function()
{if($("search_bar_keyword")){if($("search_bar_keyword").value=="")
$("search_bar_keyword").value=this._greeting;}},_validateSearchBarClick:function(e){if($("search_bar_button")){if($("search_bar_keyword").value==this._greeting||""==trimString($("search_bar_keyword").value)){alert("검색어를 입력하세요.");e.stop();return false;}}
$("searchMenuForm").submit();},_eventBind:function()
{var element=$Element("search");if(element)
{$Fn(this._focusSearchBar,this).attach($("search_bar_keyword"),"focus");$Fn(this._blurSearchBar,this).attach($("search_bar_keyword"),"blur");$Fn(this._validateSearchBarClick,this).attach($("search_bar_button"),"click");}}});var ExtraRemover=$Class({$init:function(){this._eventBind();},_doNothing:function(e){e.stop();},_keydownEvent:function(e){if(e.key().shift){e.stop();return false;}},_mouseDownEvent:function(e){if(e.mouse().right){e.stop();return false;}
if((e.key().alt||e.key().ctrl||e.key().shift)&&(e.mouse().left)){e.stop();return false;}},_eventBind:function(){$Fn(this._keydownEvent,this).attach(document,"keydown");$Fn(this._doNothing,this).attach(document,"dblclick");$Fn(this._mouseDownEvent,this).attach(document,"mousedown");document.oncontextmenu=new Function("return false");document.ondragstart=new Function("return false");document.ondragend=new Function("return false");document.onselectstart=new Function("return false");}});var RecommandRankLayer=$Class({$init:function()
{this._eventBind();},_choiceRecommandGenreCorrect:function(e)
{$("recommandGenreCorrectTab").className="choice";$("recommandGenreManaTab").className="";$Element("recommandGenreCorrectTabPanel").css({"display":"block"});$Element("recommandGenreManaTabPanel").css({"display":"none"});e.stop();return false;},_choiceRecommandGenreMana:function(e)
{$("recommandGenreCorrectTab").className="";$("recommandGenreManaTab").className="choice";$Element("recommandGenreManaTabPanel").css({"display":"block"});$Element("recommandGenreCorrectTabPanel").css({"display":"none"});e.stop();return false;},_eventBind:function()
{if($("recommandGenreManaTabTrigger"))
$Fn(this._choiceRecommandGenreMana,this).attach($("recommandGenreManaTabTrigger"),"click");if($("recommandGenreCorrectTabTrigger"))
$Fn(this._choiceRecommandGenreCorrect,this).attach($("recommandGenreCorrectTabTrigger"),"click");}});function resizePopup(id){var offsetWidth=0;var offsetHeight=0;if($Agent().navigator().ie){offsetWidth=0;offsetHeight=85;}
else{offsetWidth=window.outerWidth-window.innerWidth;offsetHeight=window.outerHeight-window.innerHeight+15;}
var targetId="page_content";if(id)targetId=id;var e=document.getElementById(targetId);var width=e.offsetWidth;var height=e.offsetHeight;try{window.resizeTo(width+offsetWidth,height+offsetHeight);}catch(e){setTimeout(resizePopup,10);}}
function wopen_newtarget(url,width,height){window.open(url,"_blank","directories=yes, location=yes, menubar=yes, resizable=yes, scrollbars=yes, status=yes, titlebar=yes, toolbar=yes,left=0, top=0, outerWidth ="+width+", outerHeight ="+height);}
function wopen_newpopup(url,width,height){window.open(url,"_blank","directories=yes, location=yes, menubar=yes, resizable=yes, scrollbars=yes, status=yes, titlebar=yes, toolbar=yes,left=0, top=0, width ="+width+", height ="+height);}
function wopen(url,width,height){window.open(url,"","status=no, toolbar=no, width="+width+", height="+height);}
function wnopen(url,name,width,height){window.open(url,name,"status=yes width="+width+" height="+height);}
function wnopen_nostat(url,name,width,height){window.open(url,name,"status=no, left=0, top=0, resizable=no, scrollbars=no,toolbar=no, directories=no, width="+width+" height="+height);}
function wnopen_o(url,name,width,height,option){window.open(url,name,"status=yes"+option+" width="+width+" height="+height);}
function wopen_sy(url,width,height){window.open(url,"","status=yes, toolbar=no,directories=no width="+width+" height="+height);}
function page_resize(page_content){try{if(this.window.name!='')
{page_content=(page_content==null)?'page_content':page_content;var dataobj=document.getElementById(page_content);dataobj.style.top=0;dataobj.style.left=0;var iframe_main;if(iframe_main=parent.document.getElementById(this.window.name)){iframe_main.height=dataobj.offsetHeight;}}}
catch(e){}}
function fitPopupSize(arg1,arg2,arg3){var toWidth=null;var toHeight=null;var objOut=null;var positionRequired=true;var typeArg1=typeof(arg1);var typeArg2=typeof(arg2);var typeArg3=typeof(arg3);if(typeArg1=="undefined"||typeArg1=="boolean"){objOut=document.getElementById("page_content");if(typeArg1=="boolean"){positionRequired=arg1;}}
if(typeArg1=="string"){objOut=document.getElementById(arg1);if(objOut==null){return;}
if(typeArg2=="boolean"){positionRequired=arg2;}}
if(typeArg1=="object"){objOut=arg1;if(typeArg2=="boolean"){positionRequired=arg2;}}
if(objOut!=null){toWidth=objOut.clientWidth;toHeight=objOut.clientHeight;}
if(typeArg1=="number"&&typeof(arg2)=="number"){toWidth=arg1;toHeight=arg2;if(typeArg3=="boolean"){positionRequired=arg3;}}
if(toWidth==null&&toHeight==null){return;}
if(positionRequired){fitPopupSize_adjustPosition(toWidth,toHeight);}
fitPopupSize_resize(toWidth,toHeight);}
function fitPopupSize_adjustPosition(toWidth,toHeight){var posLeft=(window.screenLeft)?window.screenLeft:window.screenX;var posTop=(window.screenTop)?window.screenTop:window.screenY;var adjustLeft=0;var marginWidth=50;var adjustTop=0;var marginHeight=50;var movingRequired=false;if(posTop+toHeight+marginHeight>screen.availHeight){adjustTop=-(posTop+toHeight+marginHeight-screen.availHeight);movingRequired=true;}
if(posLeft+toWidth+marginWidth>screen.availWidth){adjustLeft=-(posLeft+toWidth+marginWidth-screen.availWidth);movingRequired=true;}
if(adjustTop<0)adjustTop=0;if(movingRequired){window.moveBy(adjustLeft,adjustTop);}}
function fitPopupSize_resize(toWidth,toHeight){var oBody=document.body;if(oBody==null){return;}
if(typeof(window.innerHeight)!="undefined"&&typeof(window.innerWidth)!="undefined"&&!isOpera&&!isSafari){window.innerHeight=toHeight;window.innerWidth=toWidth;}else{var diffX=toWidth-oBody.clientWidth;var diffY=toHeight-oBody.clientHeight;window.resizeBy(diffX,diffY);}}
function fitPopupSizeEx(){var oBody=document.body;if(oBody==null){return;}
var idPrefix="page_content";var objId="";var chkResult=false;var objChk=null;for(var i=65;i<=90;i++){objId=idPrefix+String.fromCharCode(i);objChk=document.getElementById(objId);if(objChk==null){break;}}
if(objChk!=null){return;}
var objOut=window.document.createElement("<div id='"+objId+"' style='position:absolute;left:0;top:0;'>");var existNodeList=window.document.body.childNodes;while(existNodeList.length>0){objOut.appendChild(existNodeList[0]);}
document.body.appendChild(objOut);var toWidth=objOut.clientWidth;var toHeight=objOut.clientHeight;if(toWidth==null&&toHeight==null){return;}
fitPopupSize_adjustPosition(toWidth,toHeight);fitPopupSize_resize(toWidth,toHeight);}
function setClientSize(w,h)
{if(navigator.userAgent.indexOf("MSIE")!=-1)
{var divEl=document.createElement("div");divEl.style.position="absolute";divEl.style.left="0px";divEl.style.top="0px";divEl.style.width="100%";divEl.style.height="100%";document.body.appendChild(divEl);window.resizeBy(w-divEl.offsetWidth,h-divEl.offsetHeight);document.body.removeChild(divEl);}
else
{window.resizeBy(w-window.innerWidth,-(document.body.clientHeight-document.body.offsetHeight));}}
function resizeClient()
{winW=document.body.scrollWidth;winH=document.body.scrollHeight;setClientSize(winW,winH);}
function resizepopup2(wid)
{var winW=wid,winH=200;winH=document.body.scrollHeight;if(winH>550)
winH=550;window.resizeTo(winW,winH+40);}
var LoginUtil=new Object();LoginUtil.Login=function()
{}
LoginUtil.Login.prototype={goLogin:function(nextUrl)
{var currentUrl=nextUrl;if(!currentUrl)currentUrl=location.href;location.href="http://nid.naver.com/nidlogin.login?mode=form&url="+encodeURIComponent(currentUrl);},alertAndLogin:function(message,nextUrl,enabled)
{if(enabled==false&&enabled!=undefined)
return;alert(message);this.goLogin(nextUrl);},confirmAndLogin:function(message,nextUrl,enabled)
{if(enabled==false&&enabled!=undefined)
return true;if(confirm(message))
{this.goLogin(nextUrl);}
else
return false;}}
var ViewerUtil=new Object();ViewerUtil.Viewer=function()
{}
ViewerUtil.Viewer.prototype={viewFlash:function(url,width,height)
{var currentWidth=Math.min(width,622);var currentHeight=height;if(width==0)currentWidth=622;if(height==0)currentHeight=269;var _url_=url;var _object_="";_object_='<object classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" codebase="http://fpdownload.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=6,0,0,0" width="'+currentWidth+'" height="'+currentHeight+'" id="icomic" align="middle"> ';_object_+='<param name="movie" value="'+_url_+'" /> ';_object_+='<param name="quality" value="high" /> ';_object_+='<param name="wmode" value="transparent"/> ';_object_+='<embed src="'+_url_+'" quality="high" width="'+currentWidth+'" height="'+currentHeight+'" name="icomic" allowScriptAccess="sameDomain" type="application/x-shockwave-flash" pluginspage="http://www.macromedia.com/go/getflashplayer" /> ';_object_+='</object> ';document.write(_object_);}}
var RealtimeRankLayer=$Class({$init:function()
{this._eventBind();},_choiceFavoriteRealtimeRank:function(e)
{$("realTimeRankChoiceTabFavorite").className="choice";$("realTimeRankChoiceTabUpdate").className="";$Element("realTimeRankFavorite").css({"display":"block"});$Element("realTimeRankUpdate").css({"display":"none"});e.stop();return false;},_choiceUpdateRealtimeRank:function(e)
{$("realTimeRankChoiceTabFavorite").className="";$("realTimeRankChoiceTabUpdate").className="choice";$Element("realTimeRankUpdate").css({"display":"block"});$Element("realTimeRankFavorite").css({"display":"none"});e.stop();return false;},_eventBind:function()
{if($("realTimeRankChoiceTabFavoriteClick"))
$Fn(this._choiceFavoriteRealtimeRank,this).attach($("realTimeRankChoiceTabFavoriteClick"),"click");if($("realTimeRankChoiceTabUpdate"))
$Fn(this._choiceUpdateRealtimeRank,this).attach($("realTimeRankChoiceTabUpdate"),"click");}});var debugwindow;function popup(){debugwindow=window.open("debug.html","debug","width=800,height=650");}
function debug(){var msg=[];for(var i=0;arguments.length>i;i++){msg.push(arguments[i]);}
debugwindow.document.getElementById("debug").value=debugwindow.document.getElementById("debug").value+"\n"+msg.join(",");}
function isIE6HighOrOtherBrowser(){return(!$Agent().navigator().ie)||($Agent().navigator().ie&&$Agent().navigator().version>=7);}
function returnPosition(){return(!$Agent().navigator().ie)||($Agent().navigator().ie&&$Agent().navigator().version>=7)?"fixed":"relative";}
function extend(a,b){for(var i in b){a[i]=b[i];}
return a;}
function insertAfter(newElement,targetElement){var parent=targetElement.parentNode;if(parent.lastChild==targetElement){parent.appendChild(newElement);}else{parent.insertBefore(newElement,targetElement.nextSibling);}}
if($Agent().navigator().firefox){var _emptyTags={"IMG":true,"BR":true,"INPUT":true,"META":true,"LINK":true,"PARAM":true,"HR":true};HTMLElement.prototype.__defineGetter__("outerHTML",function(){var attrs=this.attributes;var str="<"+this.tagName.toLowerCase();for(var i=0;i<attrs.length;i++)
str+=" "+attrs[i].name+"=\""+attrs[i].value+"\"";if(_emptyTags[this.tagName])
return str+">";return str+">"+this.innerHTML+"</"+this.tagName.toLowerCase()+">";});HTMLElement.prototype.__defineSetter__("outerHTML",function(sHTML){var r=this.ownerDocument.createRange();r.setStartBefore(this);var df=r.createContextualFragment(sHTML);this.parentNode.replaceChild(df,this);});}
function createCookie(name,value,days){if(days){var date=new Date();date.setTime(date.getTime()+(days*24*60*60*1000));var expires="; expires="+date.toGMTString();}
else var expires="";document.cookie=name+"="+value+expires+"; path=/";}
function readCookie(name){var nameEQ=name+"=";var ca=document.cookie.split(';');for(var i=0;i<ca.length;i++){var c=ca[i];while(c.charAt(0)==' ')c=c.substring(1,c.length);if(c.indexOf(nameEQ)==0)return c.substring(nameEQ.length,c.length);}
return null;}
function eraseCookie(name){createCookie(name,"",-1);}
var JsMock=$Class({$init:function(finish){this.finish=finish;},_initData:function(){return{"leftend":false,"rightend":false,"list":[]};},getMockObject:function(num,type){var returnVal=this._initData();if(type=="right"){returnVal.rightend=this._isEnd(num);returnVal.list=this._getRightObject(num);}else{returnVal.leftend=this._isfirst(num);returnVal.list=this._getLeftObject(num);}
return returnVal;},_isfirst:function(num){return(num<=2)?true:false;},_isEnd:function(num){return((this.finish-num)<=2)?true:false;},_getLeftObject:function(num){var list=[];if(num>2){for(var i=0;2>i;i++){list.push({"link":"#","thumbnail":(num-1)+".jpg","chapter":(num-1)+"화","title":(num-1)+"화다","id":(num-1)});num--;}
list.reverse();}else if(num==2){list.push({"link":"#","thumbnail":1+".jpg","chapter":1+"화","title":1+"화다","id":1});}
return list;},_getRightObject:function(num){var list=[];if(this.finish-num>=2){for(var i=0;2>i;i++){list.push({"link":"#","thumbnail":(num+1)+".jpg","chapter":(num+1)+"화","title":(num+1)+"화다","id":(num+1)});num++;}}else if(this.finish-num==1){list.push({"link":"#","thumbnail":this.finish+".jpg","chapter":this.finish+"화","title":this.finish+"화다","id":this.finish});}
return list;}});var RemoconComic=$Class({$init:function(id,cutLineTop){this._visibleRemcon=false;var visibleRemocon=readCookie("visibleRemocon");if(visibleRemocon==null||visibleRemocon=="true")
this._visibleRemcon=true;if(visibleRemocon=="false")
this._visibleRemcon=false;if(this._visibleRemcon==false)
return;this.remoconbody=$(id);if(readCookie("top")){this.cutLineTop=readCookie("top");this._setTop();}else{this.cutLineTop=cutLineTop;}
this._eventBind();},_currentRemoconPosition:function(){var documentScrollTop=document.documentElement.scrollTop;var elementOffset=$Element(this.remoconbody).offset();return[elementOffset["top"],documentScrollTop];},_scrollMove:function(){var position=this._currentRemoconPosition();if((position[0]-position[1])<=this.cutLineTop&&position[0]>this.cutLineTop){$Element(this.remoconbody).css({"position":returnPosition(),"top":this.cutLineTop+"px"});}},_getCssRemoconTop:function(){return parseInt($Element(this.remoconbody).css("top").replace("px",""));},_hideButton:function(){$Element("comicRemocon").hide();createCookie("visibleRemocon","false");this._visibleRemcon=false;},_setTop:function(){$Element(this.remoconbody).css({"position":returnPosition(),"top":readCookie("top")+"px","left":readCookie("left")+"px"});},setCutLineTop:function(top,left){createCookie("top",top);createCookie("left",left);this.cutLineTop=top;},_eventBind:function(){$Fn(this._scrollMove,this).attach(window,"scroll");$Fn(this._hideButton,this).attach($("butt"),"click");}});var LowIE6RemoconComic=$Class({$init:function(id,cutLineTop){this._visibleRemcon=false;var visibleRemocon=readCookie("visibleRemocon");if(visibleRemocon==null||visibleRemocon=="true")
this._visibleRemcon=true;if(visibleRemocon=="false")
this._visibleRemcon=false;if(this._visibleRemcon==false)
return;this.remoconbody=$(id);if(readCookie("top")){this.cutLineTop=readCookie("top");this._setTop();this.firstTop=readCookie("top");}else{this.cutLineTop=cutLineTop;this.firstTop=$Element(this.remoconbody).offset()["top"];}
this.firstTop=$Element(this.remoconbody).offset()["top"];this.moved=false;this._eventBind();},_currentRemoconPosition:function(){var documentScrollTop=[document.documentElement.scrollTop,document.documentElement.scrollLeft];var elementOffset=$Element(this.remoconbody).offset();return[elementOffset,documentScrollTop];},_scrollMove:function(){var position=this._currentRemoconPosition();var currentTop=this._getCssRemoconTop();var gap=(position[0]["top"]-position[1][0])-this.cutLineTop;if(gap<=0&&position[0]["top"]>=this.cutLineTop){$Element(this.remoconbody).css({"position":returnPosition(),"top":(currentTop-gap)+"px"});this.moved=true;}
if((gap>0||this.moved)&&(position[0]["top"]>this.firstTop||this.moved)){$Element(this.remoconbody).css({"position":returnPosition(),"top":(currentTop-gap)+"px"});}},_getCssRemoconTop:function(){var top=$Element(this.remoconbody).css("top").replace("px","");return parseInt(top=="auto"?"0":top);},_hideButton:function(){createCookie("visibleRemocon","false");this._visibleRemcon=false;$Element("comicRemocon").hide();},_setTop:function(){var position=this._currentRemoconPosition();$Element(this.remoconbody).css({"position":returnPosition(),"top":((parseInt(readCookie("top"))+parseInt(position[1][0])-parseInt(position[0]["top"]))+"px"),"left":((parseInt(readCookie("left"))+parseInt(position[1][1]))-parseInt(position[0]["left"])+"px")});},setCutLineTop:function(top,left){var position=this._currentRemoconPosition();createCookie("top",position[0]["top"]-position[1][0]);createCookie("left",position[0]["left"]-position[1][1]);this.cutLineTop=position[0]["top"]-position[1][0];},_eventBind:function(){$Fn(this._scrollMove,this).attach(window,"scroll");$Fn(this._hideButton,this).attach($("butt"),"click");}});var currentActiveDrag;var Drag=$Class({$init:function(id,dragObject,initLeft,initTop){this.element=$(id);this.richElement=$Element(this.element);this.navigator=$Agent().navigator();this.dragObject=dragObject;this.initLeft=initLeft;this.initTop=initTop;this.initBodyW=document.body.clientWidth;this.initBodyH=document.body.clientHeight;var defaultWidthLimit=this.element.offsetWidth;var defaultHeightLimit=this.element.offsetHeight;this.firstLeft=this._deletePx(this.richElement.css("left"))-this.richElement.offset().left;this.firstTop=this.element.offsetTop;var z_index=this.richElement.css('zIndex');this.options={isStop:false,dummy:function(){return false;},realZindex:parseInt(z_index=="auto"?0:z_index)};this.richElement.css({cursor:"move"});this.functions={"mouseup":$Fn(this.onUp,this),"mousemove":$Fn(this.onMove,this),"keypress":$Fn(this.options.dummy,this),"dragstart":$Fn(this.options.dummy,this),"selectstart":$Fn(this.options.dummy,this)};this.mouseCheck={"mouseout":$Fn(this.__out,this)};$Fn(this.onDown,this).attach($(arguments[0]),"mousedown");$Fn(this.__out,this).attach(document,"mouseout");if(this.navigator.ie&&this.navigator.version==6){$Fn(this.__scroll,this).attach(window,"scroll");}},setStartPoint:function(){if((this.navigator.ie&&this.navigator.version<7)){var ele=this.richElement;var left=ele.css("left");var top=ele.css("top");return[left=="auto"?0:this._deletePx(left),top=="auto"?0:this._deletePx(top)];}else{var ele=this.richElement.$value();return[ele.offsetLeft,ele.offsetTop];}},getRectangle:function(element){return[element.offsetWidth,element.offsetHeight];},_deletePx:function(size){size=size=="auto"?"0px":size+"";return parseInt(size.replace("px"));},menageCurrentActiveDrag:function(){currentActiveDrag=currentActiveDrag?"":this.element;},setPosition:function(element,x,y){var minWidth=0;var minHeight=0;if(this.navigator.ie&&this.navigator.version==6){var clientH=document.documentElement.offsetHeight;var clientW=document.documentElement.offsetWidth;minWidth=this.initBodyW-this.element.offsetWidth;minHeight=this.initBodyH-this.element.offsetHeight;if(this.element.offsetLeft<=0&&this.firstLeft>x){x=this.firstLeft;}else if(minWidth<=this.element.offsetLeft&&this._deletePx(this.element.style.left)<x){x=minWidth-this.initLeft;}
if(this.element.offsetTop<=0&&this._deletePx(this.element.style.top)>y){y=-this.initTop;}else if(minHeight<=this.element.offsetTop&&this._deletePx(this.element.style.top)<y){y=minHeight-this.initTop;}}else{minWidth=document.documentElement.clientWidth-this.element.offsetWidth;minHeight=document.documentElement.clientHeight-this.element.offsetHeight;if(x<0){x=0;}else if(x>minWidth){x=minWidth;}
if(y<0){y=0;}else if(y>minHeight){y=minHeight;}}
this.richElement.css({"left":x+"px","top":y+"px"});},menageCurrentActiveDrag:function(){currentActiveDrag=currentActiveDrag?"":this.element;},__out:function(e){try{if(e.relatedElement.tagName=="HTML"){}}catch(eee){try{this.onUp();}catch(eeee){}}},__scroll:function(){if(this.element.offsetLeft>=(this.initBodyW-this.element.offsetWidth)){this.richElement.css({"left":(this.initBodyW-this.element.offsetWidth)+"px"});}
if(this.element.offsetTop>=(this.initBodyH-this.element.offsetHeight)){this.richElement.css({"top":(this.initBodyH-this.element.offsetHeight-this.initTop)+"px"});}},onMove:function(){var ev=arguments[0].pos();var xPosition=this.startEdgePosition[0]+ev.pageX-this.eventStartPos[0];var yPosition=this.startEdgePosition[1]+ev.pageY-this.eventStartPos[1];this.setPosition(this.element,(this.startEdgePosition[0]+ev.pageX-this.eventStartPos[0]),(this.startEdgePosition[1]+ev.pageY-this.eventStartPos[1]));},onUp:function(e){this.richElement.css({"zIndex":this.options.realZindex});this.eventManage("detach");this.menageCurrentActiveDrag();this.dragObject.setCutLineTop(this.richElement.css("top").replace("px",""),this.richElement.css("left").replace("px",""));},onDown:function(){var e=arguments[0];var targetElem=$Element(e.element);if(targetElem.hasClass('up')||targetElem.hasClass('down')){e.stop();return;}
if((this.navigator.ie&&this.navigator.version==6&&this.richElement.css("top")=="auto")){this.richElement.css({top:"0px",position:returnPosition()});}else{if(this.richElement.css("top")=="auto"){this.richElement.css({position:returnPosition(),top:(this.richElement.offset().top-document.documentElement.scrollTop)+"px"});}else{this.richElement.css({position:returnPosition()});}}
var buttonKey=this.navigator.ie?e._event.button-1:e._event.button;if(buttonKey==0){var ev=e.pos();this.__onUpComplete=false;this.richElement.css({"zIndex":"1000"});this.startEdgePosition=this.setStartPoint();this.eventStartPos=[ev.pageX,ev.pageY];this.eventManage("attach");e.stop();}},eventManage:function(eventType){for(var event in this.functions){this.functions[event][eventType](document,event);}}});var NavigationBar=$Class({$init:function(_initData,url){this._setTemplate();this._defalutSetting();this.positionLeft=-3;this.positionRight=529;this.width=133;this.contentLength=5;this.isEnd=navi_init.rightend;this.currentData=_initData;this.sendFirstNum=this._getNum(this.currentData.list[0].chapter);this.sendLastNum=this._getNum(_initData.list[_initData.list.length-1].chapter);this.hasLeftElement=this.sendFirstNum==1?(_initData.list.length-this.contentLength):0;this.hasRightElement=this.isEnd?(_initData.list.length-this.contentLength):0;this.speed=$Agent().navigator().ie?20:30;this.isFinishMove=true;this.ajaxURL=url;this.lastnum=this._getNum(this.currentData.list[this.currentData.list.length-1].chapter);this.firstnum=this.sendFirstNum==1?this.sendFirstNum-this.contentLength+this.currentData.list.length:this.sendFirstNum;this.mustHideLeftButtonNum=1;this.mustHideRightButtonNum=this.isEnd?this.lastnum:100000;this.lastGap=this.isEnd?(this.contentLength-_initData.list.length):0;},_getNum:function(returnVal){return parseInt(returnVal.replace("E­",""));},_defalutSetting:function(){this._buttonSet();this._eventBind();},_buttonSet:function(){this.beforeButton=$("comic_before");this.afterButton=$("comic_after");this.comicNavigation=$("comic_move");},_setTemplate:function(){this.template="<div class=\"viewNavi\" style=\"position:absolute; left:{left}px;\"><a href=\"{link}\"><img src=\"{thumbnail}\" alt=\"{chapter}화\" width=\"70\" height=\"42\"><br><strong>{chapter}</strong><br>{title}</a></div>";},_generateDiv:function(data,type){if(type=="right"){this.positionRight=this.positionRight+this.width;data["left"]=this.positionRight;}else{this.positionLeft=this.positionLeft-this.width;data["left"]=this.positionLeft;}
return this.template.replace(/{([^{}]*)}/g,function(a,b){var r=data[b];return r;});},_click:function(){if(this.isFinishMove){var rightVal=this._addNode(arguments[1]);this.isFinishMove=false;this._setNumber(arguments[1],rightVal);this._buttonToggle();this._animate(arguments[1],rightVal);}},_setNumber:function(type,rightVal){if(type=="right"){this.firstnum+=rightVal;this.lastnum+=rightVal;}else{this.firstnum-=rightVal;this.lastnum-=(rightVal-this.lastGap);this.lastGap=0;}},_realLeft:function(){var move=$Element($("comic_move"));var left=move.css("left").replace("px","");left=left=="auto"?0:left;return left;},_animate:function(type,val){var left=this._realLeft();if(type=="right"){left=parseInt(left)-(this.width*val);this._mover=window.setInterval($Fn(this._move,this).bind(left,"right"),1);}else{val=this.firstnum==0?1:val;left=parseInt(left)+(this.width*val);this._mover=window.setInterval($Fn(this._move,this).bind(left,"left"),1);}},_move:function(left,type){var move=$Element($("comic_move"));var currentLeft=parseInt(this._realLeft());var isContinueMove=type=="right"?(left>=currentLeft):(left<=currentLeft);if(isContinueMove){move.css({"left":left+"px"});this.isFinishMove=true;window.clearInterval(this._mover);}else{move.css({"left":(currentLeft-(type=="right"?this.speed:-this.speed))+"px"});}},_addNode:function(type){var returnVal=0;var hasFreeElement=type=="right"?this.hasRightElement:this.hasLeftElement;if(hasFreeElement>0){returnVal=this._cacheOrAddElement(type,hasFreeElement);}else{returnVal=this._notCacheElement(type,hasFreeElement);}
return returnVal;},_cacheOrAddElement:function(type,hasFreeElement){var returnVal=0;if(hasFreeElement==1){if(type=="left"&&!(this.firstnum<=1)&&(this.firstnum-hasFreeElement>1)){returnVal=this._addElement(type);}else if(type=="right"&&!(this.isEnd)){returnVal=this._addElement(type);}else{returnVal=this._howMoveElement(type);}}else{returnVal=this._howMoveElement(type);}
return returnVal;},_notCacheElement:function(type,hasFreeElement){var returnVal=0;if(type=="left"&&!(this.firstnum<=0)&&(this.firstnum-hasFreeElement>1)){returnVal=this._addElement(type);}else if(type=="right"&&!(this.isEnd)){returnVal=this._addElement(type);}
return returnVal},_howMoveElement:function(type){var returnVal=this[type=="right"?"hasRightElement":"hasLeftElement"]>=2?2:this[type=="right"?"hasRightElement":"hasLeftElement"];this[type=="right"?"hasRightElement":"hasLeftElement"]-=returnVal;this[type=="left"?"hasRightElement":"hasLeftElement"]+=returnVal;return returnVal;},_addElement:function(type){this._getData(type);var list=this.currentData.list;var newNodeString=[];if(type=="left"){list.reverse();}
for(var i=0;list.length>i;i++){newNodeString.push(this._generateDiv(list[i],type));}
var replacehtml=this._returnReg(type,this.comicNavigation.innerHTML,newNodeString);this.comicNavigation.innerHTML=replacehtml;this[type=="right"?"hasLeftElement":"hasRightElement"]+=list.length;if(type=="right"){this.sendLastNum+=list.length;this.isEnd=this.isEnd||this.currentData.rightend;if(this.isEnd){this.mustHideRightButtonNum=this._getNum(this.currentData.list[this.currentData.list.length-1].chapter);}}else{this.sendFirstNum-=list.length;}
return list.length;},_getData:function(type){var _this=this;var no=this[type=="right"?"sendLastNum":"sendFirstNum"];$Ajax(this.ajaxURL,{onload:function(response){_this.currentData=eval("("+response.text()+")");}}).request({"type":type,"id":no});},_returnReg:function(type,currentHTML,newNodeString){if(type=="right"){return currentHTML.replace(/<div[^>]*>((?!<\/div>).)*<\/div>[^<]*$/i,function(a,b){return a+newNodeString.join("");});}else{return currentHTML.replace(/(<div[^>]*>)/i,function(a,b){return newNodeString.join("")+a;});}},_buttonToggle:function(){$Element(this.beforeButton).css({"visibility":(this.firstnum<=this.mustHideLeftButtonNum)?"hidden":"visible"});if(this.isEnd){$Element(this.afterButton).css({"visibility":(this.lastnum>=this.mustHideRightButtonNum)?"hidden":"visible"});}else{$Element(this.afterButton).css({"visibility":"visible"});}},_eventBind:function(){$Fn(this._click,this).attach(this.beforeButton,"click","left");$Fn(this._click,this).attach(this.afterButton,"click","right");}});FreeComicEventDispatcher=$Class({$init:function(titleId,no,sequence,type,painterId,painterType,articleCount,genreName,typeName,isLogin)
{this.titleId=titleId;this.no=no;this.seq=sequence;this.type=type;this.typeName=typeName;this.articleCount=articleCount;this.painterId=painterId;this.genreName=genreName;this.painterType=painterType;this._isLogin=isLogin;this._eventBind();},_matchTitleByPainterIdClick:function(e)
{location.href="/paintersTitle.nhn?painterId="+encodeURIComponent(this.painterId);e.stop();},_addFavoritePainterClick:function(e)
{var loginUtil=new LoginUtil.Login();if(loginUtil.confirmAndLogin('로그인 해야 이용할 수 있습니다. 로그인 하겠습니까?',location.href,!this._isLogin))
location.href='/mypage/favoritePainter.nhn?m=insert&painterId='+encodeURIComponent(this.painterId)+'&titleId='+this.titleId+'&nextUrl='+encodeURIComponent(location.href);e.stop();},_deleteArticleButtonClick:function(e){var loginUtil=new LoginUtil.Login();if(loginUtil.confirmAndLogin('로그인 해야 이용할 수 있습니다. 로그인 하겠습니까?',location.href,!this._isLogin)){if(this.articleCount==1){if(confirm("타이틀을 삭제하겠습니까?")){if(this.typeName!='webtoon')location.href="/upload/delete.nhn?titleId="+this.titleId+"&no="+this.no+"&type=title&nextUrl="+encodeURIComponent("/genre/"+this.typeName+".nhn?m="+this.genreName);else location.href="/upload/delete.nhn?titleId="+this.titleId+"&no="+this.no+"&type=title&nextUrl="+encodeURIComponent("/weekday/"+this.typeName+".nhn");}}
else{if(confirm(this.seq+"회를 삭제하겠습니까? ")){location.href="/upload/delete.nhn?titleId="+this.titleId+"&no="+this.no+"&nextUrl="+encodeURIComponent("/"+this.typeName+"/list.nhn?titleId="+this.titleId);}}}
else{}
e.stop();},_indictmentButtonClick:function(e)
{wnopen_nostat('/indictment.nhn?m=article&titleId='+this.titleId+'&no='+this.no+'&type='+this.type,'indict_inst',606,491);e.stop();},_eventBind:function()
{if($("matchTitleByPainterId"))
$Fn(this._matchTitleByPainterIdClick,this).attach($("matchTitleByPainterId"),"click");if($("matchTitleByPainterIdBottom"))
$Fn(this._matchTitleByPainterIdClick,this).attach($("matchTitleByPainterIdBottom"),"click");if($("addFavoritePainterBottom"))
$Fn(this._addFavoritePainterClick,this).attach($("addFavoritePainterBottom"),"click");if($("addFavoritePainterTop"))
$Fn(this._addFavoritePainterClick,this).attach($("addFavoritePainterTop"),"click");if($("insertIndictment"))
$Fn(this._indictmentButtonClick,this).attach($("insertIndictment"),"click");if($("deleteArticleButton"))
$Fn(this._deleteArticleButtonClick,this).attach($("deleteArticleButton"),"click");if($("deleteArticleButtonBottom"))
$Fn(this._deleteArticleButtonClick,this).attach($("deleteArticleButtonBottom"),"click");}});FreeComicShowHideEventHandler=$Class({$init:function(eventObject)
{this._eventObject=eventObject;this._eventBind();},_showEvent:function(e)
{if($Element(this._eventObject["target"]).css("display")=="block")
{var notPassAction=true;if(this._eventObject["hideHandler"]!=undefined&&this._eventObject["hideHandler"]!=null)
{notPassAction=this._eventObject["hideHandler"]();}
if(notPassAction!=false)
$Element(this._eventObject["target"]).css("display","none");}
else
{var notPassAction=true;if(this._eventObject["showHandler"]!=undefined&&this._eventObject["showHandler"]!=null)
{notPassAction=this._eventObject["showHandler"]();}
if(notPassAction!=false)
$Element(this._eventObject["target"]).css("display","block");}
e.stop();return false;},_hideEvent:function(e)
{var cssDisplayValue=$Element(this._eventObject["target"]).css("display");$Element(this._eventObject["target"]).css("display","none");$Element(this._eventObject["target"]).css("display","none");if(this._eventObject["hideHandler"]!=undefined&&this._eventObject["hideHandler"]!=null)
this._eventObject["hideHandler"]();},_eventBind:function()
{if($(this._eventObject["button"])){$Fn(this._showEvent,this).attach($(this._eventObject["button"]),"click");$Fn(this._hideEvent,this).attach(document,"click");}}});FreeComicShowHideEventRegister=$Class({$init:function(eventObject)
{this._eventObject=eventObject;this._eventBind();},_eventBind:function()
{for(i=0;i<this._eventObject.length;i++)
{var current=this._eventObject[i];new FreeComicShowHideEventHandler(current);}}});StarScoreItem=$Class({$init:function(id,point)
{this.id=id;this.point=point;this._eventBind();},changeStarScore:function(point)
{$Element("topTargetMask").css({"width":point+"%"});$Element("bottomTargetMask").css({"width":point+"%"});$Element("pointSelectOption").css({"display":"none"});$Element("pointSelectOption_2").css({"display":"none"});$("formStarScore").value=point/10;},_vote:function(e)
{this.changeStarScore(this.point);e.stop();return false;},_eventBind:function()
{if($(this.id))$Fn(this._vote,this).attach($(this.id),"click");}});StarScorePoll=$Class({$init:function(isLogin)
{this._isLogin=isLogin;this._eventBind();},_vote:function(e)
{e.stop();var url=$("starscoreForm").action+"?m=vote&titleId="+$("starscoreTitleIdInput").value+"&no="+$("starscoreNoInput").value+"&score="+$("formStarScore").value
+"&type="+$("starscoreType").value+"&nextUrl="+encodeURIComponent(location.href);if(!this._isLogin){if(confirm('로그인 해야 이용할 수 있습니다. 로그인 하겠습니까?')){location.href=url;return;}
else{return false;}}
$("starscoreForm").submit();},changeStarScore:function(point)
{$Element("topTargetMask").css({"width":point+"%"});$Element("bottomTargetMask").css({"width":point+"%"});$("formStarScore").value=point/10;$Element("pointSelectOption").css({"display":"none"});$Element("pointSelectOption_2").css({"display":"none"});return false;},_bgmStop:function(e){trailer.Stop();},_bgmPause:function(e){trailer.Pause();},_bgmPlay:function(e){trailer.Play();},_eventBind:function(){if($("topStarScoreSubmitButton"))$Fn(this._vote,this).attach($("topStarScoreSubmitButton"),"click");if($("bottomStarScoreSubmitButton"))$Fn(this._vote,this).attach($("bottomStarScoreSubmitButton"),"click");if($("bgmStop"))$Fn(this._bgmStop,this).attach($("bgmStop"),"click");if($("bgmPause"))$Fn(this._bgmPause,this).attach($("bgmPause"),"click");if($("bgmPlay"))$Fn(this._bgmPlay,this).attach($("bgmPlay"),"click");for(i=1;i<=10;i++){new StarScoreItem("topStar"+i+"Select",i*10);new StarScoreItem("bottomStar"+i+"Select",i*10);}}});function checkUploadCertain(e){e.stop();if("Y"!=loggedIn){if(!confirm('로그인 해야 이용할 수 있습니다. 로그인 하겠습니까?'))return false;else{var currentUrl=location.href;location.href="http://nid.naver.com/nidlogin.login?mode=form&url="+encodeURIComponent("http://"+location.host+"/upload/upload.nhn");return;}}
if("Y"==authenticate){location.href="/upload/upload.nhn";return true;}
if(confirm("실명 인증한 사용자만 이용할 수 있습니다. 실명인증 하겠습니까?")){location.href="/realNameCertain.nhn?rurl="+encodeURIComponent(location.href)+"&surl="+encodeURIComponent("http://"+location.host+"/upload/upload.nhn");}
return false;}