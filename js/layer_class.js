/*
Copyright (C) 2003-2007, x-wiz.com.
xwzGadgetry : Javascript UI Library for the gadget(or the widget)

This library is free software; you can redistribute it and/or
modify it under the terms of the GNU Lesser General Public
License as published by the Free Software Foundation; either
version 2.1 of the License, or (at your option) any later version.

This library is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU
Lesser General Public License for more details.
- http://www.gnu.org/licenses/lgpl.html
*/

 /**
 * xwzGadgetry : Javascript UI Library for the gadget(or the widget) <http://www.x-wiz.com/>
 * ���̾��� ��ġ ���� �Ǵ� ���� ����� ����ڰ� ���ϴ� ��ġ �Ǵ� ������ �迭�ϵ��� �ϴ� �Լ�.
 * ���θ����� ��ǰ ��ġ��, �����ΰ������� ������ ���̾� ��ġ �̵��� ���� �迭,
 * ���� ��� ��ġ��, �Է����� ������� ������ ȭ�鿡�� ��� ���� ������ ���� ����
 *
 * Idea of "drag&drop swap" is from "google ig<http://www.google.co.kr/ig/>" - see dragDepart()
 * Idea of "toggle swap" is from "yahoo.com<http://kr.yahoo.com/>"- see prevToggle()
 * Idea of "the distance" is from "daum.net<http://www.daum.net/>" - see _swapAviate()
 * Idea of "bindAsObject, bindAsEvent" is from "Prototype JavaScript Framework <http://www.prototypejs.org/>"
 *
 *@copyright    x-wiz.com
 *@license        The LGPL License
 *@author        N.Thu Lee
 *@version       1.0 Alpha
 *@release       2006.11.07
 *@updated     2007.05.28
 *@changelog
 *2006.11.22
 *- ���̾ƿ� �̵� ���� ���� ����(����.�� ����)
 *
 *2006.12.04
 *- �巡�׾ص�� ��� �߰�
 *
 *2007.05.02
 *- xwzGadgetry�� ���̺귯�� ��Ī Ȯ��
 *- �̺�Ʈ �ڵ鷯 �߰� �� ���� �Լ��� ���̺귯�� �ܺ� �Լ��� �и�
 *- 2�� �̻��� ���̺귯�� ��� ��ü�� ���ؼ� �巡�׾ص���� ���̾� ��ġ ���� ����
 *- bindAsObject, bindAsEvent �ܺ� �Լ� �߰�
 *
 *2007.05.05
 *- expand ��� �߰�. ������ document ������ ���� �ּ�ȭ, �ִ�ȭ ��� �߰�
 *
 *2007.05.28
 *-resize ��� �߰�
 *
 *2007.06.04
 *-resize �̺�Ʈ �߻� �� ũ�� ǥ�� WidthxHeight�κ��� ������� ���� ���� ����
 *
 *+-------------------------------------+
 *plan
 *+-------------------------------------+
 * - ���̾��� �� �������� ���� �׸����� ���� Ʋ�� ���Ѿ��� ��� �����ϵ��� �߰�
 * - 2�� �̻��� ������ ������ �̵������ϵ��� �߰�
 * - �� Ư���� �и� �۾� -���ȭ(?). drag & drop, toggle swapping, resize, ... 
 * - ������ �˰����̳� �ҽ��� ���� ����ȭ �ʿ� ��....
 *
 *@example
 *-( new xwzGadgetry(������ ��ü ID, [[Toggle Tag Name],[Columns : ���� ����],[Margin : ����]]) ).load();
 *
 *+-------------------------------------+
 *method 
 *+-------------------------------------+
 *-loadSequel() : ���� ��ġ���� ��Ű �������� �������� �Լ�
 *-saveSequel()	: ���� ��ġ�� ��Ű�� ������ �� onArrival �Լ��� ȣ��
 *-onArrival(function object)		: ���� ��ġ ����Ǿ� �Ϸ�Ǿ��� �� ȣ���ϴ� ����ڿ� �Լ� 
 *-getIndex(object[or int, string])	: ���� �ε����� ���ؼ� �ش� ������ �迭���� ��ġ�� ã�� �Լ�
 *-searchGadget(object[or int, string])	: �ε��� �Ǵ� ��ü��, ID, Name�� ���ؼ� ���� �ν��Ͻ��� ã��
 *-columns(int, bool)	: ������ ���� ���� ���� �Ǵ� �� �� ��ȯ �Լ� (Bool:�� ���� �� ������ ��ġ�� ã�ư� �� ȿ�� ���� �̵��� ������ ����)
 *-strata(int)	: ������ �ش� ��ġ�� ã�� �� ��, _swapAviate �Լ��� ��� ȣ���� ������ ���� �Ǵ� ��ȯ(���� ��ġ �̵� �ӵ��� ������)
 *-opacity(int)	: ������ �̵��� �� ���� ���� �� �� ��ȯ �Լ�(0~100)
 *-motion(Bool)	: ���� �̵� �� �̵� ȿ�� ���� �ٷ� ������ �� ����/��ȯ �Լ�
 *-reset(Bool)	: ���� ��ġ �ʱ�ȭ ���� �Լ�
 *-compose()	: �� ���� �迭 �ε����� ���� ��ġ�� �ʱ�ȭ �ϴ� �Լ�
 *dragDepart(event object, target int)	: ���콺�ٿ� �̺�Ʈ�� �߻��Ͽ��� �� drag&drop �̺�Ʈ �߻�
 *-resetToggle(object, bool)	: ��ġ �ʱ�ȭ (Object:�̺�Ʈ �߻� ��ü, Bool:��� ȿ�� ����)
 *-prevToggle(object �̺�Ʈ �߻� ��ü,int[or object, string])	: Ŭ�� �̺�Ʈ �߻� ��� ������ ���� ������ �̵��ϴ� ��ư(�̹���) ����
 *-nextToggle(source object, target int[or object string])	: Ŭ�� �̺�Ʈ �߻� �� ��� ������ ���� ������ �̵�
 *-firstToggle(source object, target int[or object string])		: Ŭ�� �̺�Ʈ �߻� �� ��� ������ ó�� ������ �̵�
 *-lastToggle(source object, target int[or object string])		: Ŭ�� �̺�Ʈ �߻� �� ��� ������ ������ ������ �̵�
 *-upToggle(source object, target int[or object string])	: Ŭ�� �̺�Ʈ �߻� �� ��� ������ ���� �̵�
 *-downToggle(source object, target int[or object string])	: Ŭ�� �̺�Ʈ �߻� �� ��� ������ �Ʒ��� �̵�
 *-leftToggle(source object, target int[or object string])	: Ŭ�� �̺�Ʈ �߻� �� ��� ������ �������� �̵�
 *-rightToggle(source object, target int[or object string])	: Ŭ�� �̺�Ʈ �߻� �� ��� ������ ���������� �̵�
 *-expose(target int[or object string])	 : ���� expand ��� ����
 *-expandAttrib(target int[or object], name string, value string [or function,string], function bind object) : expand �ɼ� ���� �Լ�. 
 *  name [strata,min,max,animate], �Լ� ȣ�� bind object ���� ����
 *
 *+-------------------------------------+
 * memberof variable
 *+-------------------------------------+
 *-AvailableCookie : ��Ű ������
 *-noResize : �������� ���� ���� ���� Ȯ��
 *-borderColor : ���� clone ��ü �׵θ� ����
 *-grip : �������� grip ��ü �Ӽ� ����(color:����,size:ũ��,minWidth:�ʺ��ּ�����,minHeight:�����ּ�����,maxWidth:�ʺ��ִ�����,maxHeight:�����ִ�����)
 *          grip={color:'red',size:8,minWidth:null,minHeight:null,maxWidth:null,maxHeight:null};
 *
 *3.Toggle List (Toggle TagName���� ������ Tag�� ���� �־�� ��.<span toggle="��� �ɼ� ����" 
 *-reset:�ʱ�ȭ
 *-up, down, left, right:��, �Ʒ�, ����, ���������� �̵�
 *-first, last:ó��, ������ �̵�
 *-next, prev:����, ���� ������ �̵�
 *-drag: �巡�� �� ��� ����
 *-expand: document ������ ���� 
 *-gadget: expand, resize ����
 *
 *+-------------------------------------+
 *expand option (<span toggle="expand" attr:�ɼ�="��" ...>
 *+-------------------------------------+
 *- gadget toggle�� �ݵ�� �����Ͽ��� ��.
 *-'attr:strata'		: Int �ӵ�
 *-'attr:state'		: [max, min] ���°�
 *-'attr:min'			: �ּ�ȭ�Ǿ��� �� ������ �Լ� �Ǵ� JS code
 *-'attr:max'			: �ִ�ȭ�Ǿ��� �� ������ �Լ� �Ǵ� JS code
 *-'attr:animate'  : [Blind, Slide, [None or null]] : �� ���°� ���� �� ȿ�� 
 *
 *+-------------------------------------+
 *onArrival return value
 *+-------------------------------------+
 *-index: ���� ��
 *-top: style.top
 *-left: style.left
 *-width: style.width
 *-height: style.height
 *-expanded: expand �Ӽ�[Bool]
 */
 
/**
 +---------------------------------------------------------------------------+
 | ���� �Լ� ����
 + --------------------------------------------------------------------------+
 */
/*
 * �ش� �޼ҵ带 ������ü(Owner object)�� �ν��Ͻ��� �̸� ��� ��ȯ�ϴ� �Լ�, ������ü�� ������ ���ڰ��� ���´�.
 *@param {Object, [Number, String, Object, ...], ...} �Լ�(�޼ҵ�)�� �����ϰ� �ִ� ��ü, ���� ����, ...
 *@author N.Thu Lee
 *@copyright x-wiz.com
 *@version 0.1
 *@release 2007.01.12
 */
Function.prototype.bindAsObject=function(){var _$=this,args=[],object=null;for(var i=0,len=arguments.length;i<len;i++)args[i]=arguments[i];object=args.shift();return function(){return _$.apply(object,args);}};
/*
 * �ش� �޼ҵ带 ������ü(Owner object)�� �ν��Ͻ��� �̸� ��� ��ȯ�ϴ� �Լ�, �̺�Ʈ ��ü�� ���޹�����, ������ü�� ������ ���ڰ��� ���´�.
 *@param {Object, [Number, String, Object, ...], ...} �Լ�(�޼ҵ�)�� �����ϰ� �ִ� ��ü, ���� ����, ...
 *@author N.Thu Lee
 *@copyright x-wiz.com
 *@version 0.1
 *@release 2007.01.12
 */
Function.prototype.bindAsEvent=function(){ 	var _$=this,args=[],object=null; 	for(var i=0,len=arguments.length;i<len;i++)args[i]=arguments[i];object=args.shift(); 	return function(e){ 		var body=document.body||document.documentElement,hEvent=(e||window.event),_o=hEvent['element']=hEvent.target||hEvent.srcElement; 		/*��ü�� body������ Top,Left ��ġ*/ 		hEvent['offsetTop']=hEvent['offsetLeft']=0; 		while(_o.offsetParent){ 			hEvent['offsetLeft']+=_o.offsetLeft; 			hEvent['offsetTop']+=_o.offsetTop; 			_o=_o.offsetParent; 		}; 		/*�̺�Ʈ ��ü�� �Ӽ��� ��ȯ*/ 		hEvent['_x']=hEvent.pageX||(hEvent.clientX+(body.scrollLeft-body.clientLeft)); 		hEvent['_y']=hEvent.pageY||hEvent.clientY+body.scrollTop-body.clientTop; 		hEvent['_left']=(hEvent.which&&e.button==0)||!!(hEvent.button&1); 		hEvent['_middle']=(hEvent.which&&e.button==1)||!!(hEvent.button&4); 		hEvent['_right']=(hEvent.which&&e.button==2)||!!(hEvent.button&2); 		hEvent['_key']=(hEvent.keyCode||hEvent.which); 		return _$.apply(object,[hEvent].concat(args)); 	}; };
/*
 * Ư�� ��ü�� �̺�Ʈ �ڵ鷯 �߰� �Լ�
 *@param {Object, String, Function, Bool} ��� ��ü, �̺�Ʈ ��, �Լ�, capture
 *@author N.Thu Lee
 *@copyright x-wiz.com
 *@version 0.1
 *@release 2007.01.12
 */
addEventObserve=function(element,name,fpnotify,useCapture){if(element.addEventListener)element.addEventListener(name,fpnotify,useCapture||false);else if(element.attachEvent)element.attachEvent('on'+name,fpnotify);};
/*
 * Ư�� ��ü�� �̺�Ʈ �ڵ鷯 ���� �Լ�
 *@param {Object, String, Function, Bool} ��� ��ü, �̺�Ʈ ��, �Լ�, capture
 *@author N.Thu Lee
 *@copyright x-wiz.com
 *@version 0.1
 *@release 2007.01.12
 */
freeEventObserve=function(element,name,fpnotify,useCapture){	if(element.removeEventListener)element.removeEventListener(name,fpnotify,useCapture||false);else if(element.detachEvent)element.detachEvent('on'+name,fpnotify);};/**
 * Opacity style Apply
 *@param {Object}		element-style ��Ҹ� ���� ��ü
 *@param {Number}	nValue-����
 *@author N.Thu Lee
 *@copyright x-wiz.com
 *@version 0.1
 *@release 2007.01.12
 */
notifyOpacity=function(element, nValue){ 	try{ 		if(element.style.filter!=null){/*IE*/ 			element.style.filter=nValue==null?'':'alpha(opacity='+nValue+')'; 			if(!element.currentStyle||!element.currentStyle.hasLayout){element.style.zoom=1;} 		}else if(element.style.opacity!=null){/**/ 			element.style.opacity=nValue==null?null:nValue/100; 		}else if(element.style['-moz-opacity']!=null){/* Moz's*/ 			element.style['-moz-opacity']=nValue==null?null:nValue/100; 		}else if(element.style.MozOpacity!=null){/*FF*/ 			element.style.MozOpacity=nValue==null?null:nValue/100; 		}else if(element.style['-khtml-opacity']!=null){/*KDE*/ 			element.style['-khtml-opacity']=nValue==null?null:nValue/100; 		}else{ 		} 	}catch(e){}; };

/**
 +---------------------------------------------------------------------------+
 | xwzGadgetry 
 + --------------------------------------------------------------------------+
 */
/**
 * xwzGadgetry ����.
 *@param {String}	byID �ش� ��ü�� �����ϰ��ִ� ��ü
 *@param {Number}	nColumns �� Row�� ��Ȱ�� Column����
 *@param {Number}	Distance �� ��� ��ü ���� ����
 *@return {Object}	Returns a new xwzGadgetry.
 *@access public
 *@constructor
 */
var xwzGadgetry=function(byID,tagName,Columns,Distance){ 	this.version='1.0alpha'; 	this.sName='__xwzSRW_'+byID; 	this.Gadgetry=document.getElementById(byID); 	if(this.Gadgetry==null)return null; 	this.initialize=false;/*�ʱ�ȭ ����*/ 	this.tagName=tagName||'SPAN'; 	this.nDistance=Distance||10;/*��ü�鰣�� ����*/ 	this.nCells=Columns||1;/*Column ����*/ 	this.nOpacity=86;/*�̵����� ��������*/ 	this.nStrata=5;/*���̾� �̵� �ܰ� ����*/ 	this.isMotion=true; 	this.zIndex=0;/*deep index*/ 	this.Nodes=[];/*��ü �迭����*/ 	this.Atlas=[];/*�� ��ǥ�� �迭����*/ 	this.Queue=[];/*�̵���� �迭����*/ 	this.resTime=null;/*�ð�*/ 	this.Observers=[]; 		this.keelblocks=null;/**/ 	this.talebearing=''; 		/*�巡�� �� ���,Resize ���� ����*/ 	this._trace	={dX:0,dY:0,nTarget:null,nSource:null};/*���콺 �̺�Ʈ ����*/ 	this.grips		={lt:null,lm:null,lb:null,ct:null,cb:null,rt:null,rm:null,rb:null}; 	this.sizeinfo	=null; };
/**
 * ���̾� ��ġ�� ����Ǿ� �Ϸ�Ǿ��� �� ������ �Լ��� ȣ��
 *@method onArrival
 *@see #saveSequel()
 */
xwzGadgetry.prototype.onArrival=null;
/**
 *@memberof xwzGadgetry
 *@access public
 */
/*resize option*/ xwzGadgetry.prototype.noResize=false;
/*bordercolor*/ xwzGadgetry.prototype.borderColor='#808080';
/*resize grip*/ xwzGadgetry.prototype.grip={color:'red',size:8,minWidth:null,minHeight:null,maxWidth:null,maxHeight:null};
/*��Ű������*/ xwzGadgetry.prototype.AvailableCookie=7;
/**
 * �� ��ü���� ������ ��Ű���� �������� �Լ�
 *@method loadSequel
 *@return {String} Return ��Ű��.
 *@access public
 */
xwzGadgetry.prototype.loadSequel=function(){ 	var offsetMin=0,offsetMax=0; 	if(document.cookie.length>0){/*��Ű�� �����ϴ� üũ*/ 		offsetMin=document.cookie.indexOf(this.sName+'=');/*�ش��� �̸��� ���� ��Ű ���� ���� ��ġ*/ 		if(offsetMin!==-1){ 			offsetMin+=this.sName.length+1;offsetMax=document.cookie.indexOf(';',offsetMin); 			if(offsetMax===-1){offsetMax=document.cookie.length;}; 			return (unescape(document.cookie.substring(offsetMin,offsetMax))).toString().split(','); 		} 	} 	return false; }
/**
 * �� ���̾���� ������ ��Ű�� �����ϴ� �Լ�, �ܺ�ȣ���Լ��� ���� ��� �ش� �Լ� ȣ��
 *@method saveSequel
 *@see #onArrival()
 *@access public
 */
xwzGadgetry.prototype.saveSequel=function(){ 	var dtExpire=null,sExpire='',S=[],domain=window.document.domain||window.location.hostname; 	for(var i=0,len=this.Nodes.length;i<len;i++){S[i]=this.Nodes[i].getAttribute('_GadgetIndex');} 	if(this.AvailableCookie*24>0){dtExpire=new Date((new Date()).getTime()+(this.AvailableCookie*24)*3600000);sExpire='; expires='+dtExpire.toGMTString();} 	document.cookie=(this.sName)+'='+escape(S.toString())+sExpire+'; path=/;'+(typeof(domain)=='string'&&domain!=''?'domain='+domain:'')+';'; 	var $A=[],nIndex; 	/** 	 * ���̾� ��ġ�� ����Ǿ� �Ϸ�Ǿ��� �� ������ �Լ��� ȣ�� 	 *@method onArrival 	 *@see #saveSequel() 	 */ 	if(typeof this.onArrival=='function'&&this.initialize==true){ 		for(var i=0,len=this.Nodes.length;i<len;i++){ 			nIndex=this.Nodes[i].getAttribute('_GadgetIndex'); 			$A[nIndex]={index:i, 				top:parseInt(this.Nodes[i].style.top),left:parseInt(this.Nodes[i].style.left),width:parseInt(this.Nodes[i].style.width),height:parseInt(this.Nodes[i].style.height), 				expanded:this.Nodes[i].gadget!=null?(this.Nodes[i].gadget.state=='collapse'?false:true):true 			}; 		} 		this.onArrival($A); 	} };
/**
 * �� ��ü���� ���� �ε����� ���ؼ� �ش� ��ü�� �迭������ ��ġ�� ã�� �Լ�
 *@method getIndex
 *@param {Number} _index ��ü�� �ε�����
 *@return {Number} ��� �ε����� ���� Nodes �迭 �ε���
 *@access public
 */
xwzGadgetry.prototype.getIndex=function(_index){for(var i in this.Nodes){if(this.Nodes[i].getAttribute('_GadgetIndex')==_index)return(i*1);}};
/**
 * �ε��� �Ǵ� ��ü���� ���� �ش� ��ü�� �迭 ��ġ�� ã�� �Լ�
 *@method searchGadget
 *@param {Object,Number,String} mixValue Ư�� ��ü�� �ε�����, �Ǵ� �ν��Ͻ� �Ǵ� ID, Name �Ӽ� ��
 *@return {Number} ��� ��ü�� �迭 Nodes �ε���
 *@access public
 *@changelog 2007.05.04 �Ķ���Ϳ� id, name�Ӽ����� ���ؼ��� ó���� �� �ֵ��� getElementById, getElementByName �߰�
 */
xwzGadgetry.prototype.searchGadget=function(mixValue){var o=null;if(typeof mixValue=='object'){for(var i in this.Nodes)if(this.Nodes[i]==mixValue)return(i*1);}else if(typeof mixValue=='number'){for(var i in this.Nodes)if(i==mixValue)return(i*1);}else if(typeof mixValue=='string'){o=document.getElementById(mixValue)||document.getElementsByName(mixValue)[0]||null;for(var i in this.Nodes)if(this.Nodes[i]==mixValue)return(i*1);};return false};
/**
 * Column ���� ���� �Լ� �Ǵ� Column���� ��ȯ �Լ�
 *@method columns
 *@param {Number} nValue column ����
 *@param {Bool} isDirectly ���� �� �ﰢ �ݿ�����(true : �ﰢ �ݿ����� ����, false : �ﰢ �ݿ�)
 *@return {Number} Column ����
 *@access public
 */
xwzGadgetry.prototype.columns=function(nValue,isDirectly){this.nCells=(typeof nValue=="number"||typeof nValue=="string")?nValue*1:this.nCells;this._swapDepart(isDirectly);return this.nCells;};
/**
 * ���̾� �̵� �ܰ� ���� ���� �� ��ȯ �Լ�
 *@method strata
 *@param {Number} nValue �����Ϸ��� ��
 *@return {Number} ���̾� �̵� �ܰ� ���� ����Ŭ
 *@access public
 */
xwzGadgetry.prototype.strata=function(nValue){return this.nStrata=(typeof nValue=="number"||typeof nValue=="string")?nValue*1:this.nStrata;};
/**
 * �̵��� ���� �����Լ�
 *@method opacity
 *@param {Number} nValue �����Ϸ��� ��
 *@return {Number} ���� ��
 *@access public
 */
xwzGadgetry.prototype.opacity=function(nValue){return this.nOpacity=(typeof nValue=="number"||typeof nValue=="string")?nValue*1:this.nOpacity;};
/**
 * �̵��� �ٷ� ������ �� ����
 *@method motion
 *@param {Bool} bValue �����Ϸ��� ��
 *@return {Bool} true, false
 *@access public
 */
xwzGadgetry.prototype.motion=function(bValue){return this.isMotion=bValue;};
/**
 * �� ���̾���� ������ �ʱ�ȭ �ϴ� �Լ�
 *@method resetToggle
 *@see #reset()
 *@see addEventObserve()
 *@param {Object} �̺�Ʈ �߻� ��ü
 *@param {Bool} isDirectly �ﰢ �ݿ�����
 *@access public
 */
xwzGadgetry.prototype.resetToggle=function(objSrc,isDirectly){addEventObserve(objSrc,'click',this.reset.bindAsObject(this,isDirectly))};
/**
 * ���� ���̾�� ��ġ ����
 *@method prevToggle
 *@see #searchGadget()
 *@see #_stack()
 *@param {Object} �̺�Ʈ �߻� ��ü
 *@param {Object,Number,String} mixValue Ư�� ��ü�� �ε�����, �Ǵ� �ν��Ͻ� �Ǵ� ID, Name �Ӽ� ��
 *@access public
 */
xwzGadgetry.prototype.prevToggle=function(objSrc,mixValue){var _index=this.searchGadget(mixValue);if(_index!==false)addEventObserve(objSrc,'click',this._stack.bindAsObject(this,_index,-1));};
/**
 * ���� ���̾�� ��ġ ����
 *@method nextToggle
 *@see #searchGadget()
 *@see #_stack()
 *@param {Object} �̺�Ʈ �߻� ��ü
 *@param {Object,Number,String} [mixValue] Ư�� ��ü�� �ε�����, �Ǵ� �ν��Ͻ� �Ǵ� ID, Name �Ӽ� ��
 *@access public
 */
xwzGadgetry.prototype.nextToggle=function(objSrc,mixValue){var _index=this.searchGadget(mixValue);if(_index!==false)addEventObserve(objSrc,'click',this._stack.bindAsObject(this,_index,1));};
/**
 * ó�� ��ġ�� �̵�
 *@method firstToggle
 *@see #searchGadget()
 *@see #_above()
 *@param {Object} �̺�Ʈ �߻� ��ü
 *@param {Object,Number,String} [mixValue] Ư�� ��ü�� �ε�����, �Ǵ� �ν��Ͻ� �Ǵ� ID, Name �Ӽ� ��
 *@access public
 */
xwzGadgetry.prototype.firstToggle=function(objSrc,mixValue){var _index=this.searchGadget(mixValue);if(_index!==false)addEventObserve(objSrc,'click',this._above.bindAsObject(this,_index));};
/**
 * ������ ��ġ�� �̵�
 *@method lastToggle
 *@see #searchGadget()
 *@see #_below()
 *@param {Object} �̺�Ʈ �߻� ��ü
 *@param {Object,Number,String} [mixValue] Ư�� ��ü�� �ε�����, �Ǵ� �ν��Ͻ� �Ǵ� ID, Name �Ӽ� ��
 *@access public
 */
xwzGadgetry.prototype.lastToggle=function(objSrc,mixValue){var _index=this.searchGadget(mixValue);if(_index!==false)addEventObserve(objSrc,'click',this._below.bindAsObject(this,_index));};
/**
 * y ��ǥ ��ü�� �ڸ� ����(column �� ��ŭ �ε��� ����)
 *@method upToggle
 *@see #searchGadget()
 *@see #_cross()
 *@param {Object} �̺�Ʈ �߻� ��ü
 *@param {Object,Number,String} [mixValue] Ư�� ��ü�� �ε�����, �Ǵ� �ν��Ͻ� �Ǵ� ID, Name �Ӽ� ��
 *@access public
 */
xwzGadgetry.prototype.upToggle=function(objSrc,mixValue){var _index=this.searchGadget(mixValue);if(_index!==false)addEventObserve(objSrc,'click',this._cross.bindAsObject(this,_index,'up'));};
/**
 * y ��ǥ ��ü�� �ڸ� ����(column �� ��ŭ �ε��� ����)
 *@method downToggle
 *@see #searchGadget()
 *@see #_cross()
 *@param {Object} �̺�Ʈ �߻� ��ü
 *@param {Object,Number,String} [mixValue] Ư�� ��ü��  �ε�����, �Ǵ� �ν��Ͻ� �Ǵ� ID, Name �Ӽ� ��
 *@access public
 */
xwzGadgetry.prototype.downToggle=function(objSrc,mixValue){var _index=this.searchGadget(mixValue);if(_index!==false)addEventObserve(objSrc,'click',this._cross.bindAsObject(this,_index,'down'));};
/**
 * x ��ǥ ��ü�� �ڸ� ����(�ش� ���� �ٿ��� ù��°�� �̵�)
 *@method leftToggle
 *@see #searchGadget()
 *@see #_cross()
 *@param {Object} �̺�Ʈ �߻� ��ü
 *@param {Object,Number,String} [mixValue] Ư�� ��ü��  �ε�����, �Ǵ� �ν��Ͻ� �Ǵ� ID, Name �Ӽ� ��
 *@access public
 */
xwzGadgetry.prototype.leftToggle=function(objSrc,mixValue){var _index=this.searchGadget(mixValue);if(_index!==false)addEventObserve(objSrc,'click',this._cross.bindAsObject(this,_index,'left'));};
/**
 * x ��ǥ ��ü�� �ڸ� ����(�ش� ���� �ٿ��� ���������� �̵�)
 *@method rightToggle
 *@see #searchGadget()
 *@see #_cross()
 *@param {Object} �̺�Ʈ �߻� ��ü
 *@param {Object,Number,String} [mixValue] Ư�� ��ü��  �ε�����, �Ǵ� �ν��Ͻ� �Ǵ� ID, Name �Ӽ� ��
 *@access public
 */
xwzGadgetry.prototype.rightToggle=function(objSrc,mixValue){var _index=this.searchGadget(mixValue);if(_index!==false)addEventObserve(objSrc,'click',this._cross.bindAsObject(this,_index,'right'));};
/**
 * ȯ�氪�� ���� �ʱ�ȭ �ϴ� �Լ�
 *@method load
 *@access public
 */
xwzGadgetry.prototype.load=function(){ 	if(this.initialize==true) return ; 	var nX=0,nY=0,v=[],h=[],nNodeIndex=0; 	var oNode=null,List=[],_t=[],_f=this.loadSequel(),a={},t=null; 	for(var i=0,iLen=this.Gadgetry.childNodes.length;i<iLen;i++){ 		oNode=this.Gadgetry.childNodes[i]; 		/*�ڽ� ��ü�� �ּ�,���ڿ� �Ǵ� object�� �ƴ� ��� */ 		if(oNode.nodeName.toLowerCase()=='#text'||oNode.nodeName.toLowerCase()=='#comment'||typeof(oNode)!='object')continue; 		oNode['gadget']={}; 		/*�ڽ� ��ü���� ��� ����� ���� SPAN �±׸� ã�´�*/ 		oList=oNode.getElementsByTagName(this.tagName); 		for(var j=0,jLen=oList.length;j<jLen;j++){ 			if(oList[j].getAttribute('toggle')==null)continue; 			oList[j].style.cursor='pointer'; 			switch(oList[j].getAttribute('toggle').toLowerCase()){ 				case 'gadget': 					/*slide ȿ���� �ֱ����� DIV ����*/ 					t=document.createElement('DIV'); 					t.style.marginTop='-1px'; 					t.style.marginLeft='0px'; 					t.style.width=(parseInt(oList[j].style.width)||oList[j].offsetWidth)+'px'; 					t.style.height='1px'; 					t.style.overflow='hidden';/*IE Margin Bug -_-;;*/ 					oList[j].insertBefore(t,oList[j].childNodes[0]); 					oNode['gadget'].topgap=t.style.marginTop; 					/*���� ����*/ 					oList[j].style.display='block'; 					oList[j].style.width=(parseInt(oList[j].style.width)||oList[j].offsetWidth)+'px'; 					oList[j].style.height=((parseInt(oList[j].style.height)||oList[j].offsetHeight)+1)+'px'; 					oList[j].style.overflow='hidden'; 					oList[j].style.visibility='visible'; 					oNode['gadget'].style=oList[j].style; 					oNode['gadget'].width=parseInt(oList[j].style.width); 					oNode['gadget'].height=parseInt(oList[j].style.height); 					break; 				case 'expand': 					oNode['gadget'].onMinimized=new Function(oList[j].getAttribute('attr:min')).bindAsObject(oList[j]);/*�ּ�ȭ�϶� ����� ���� �Լ� ����*/ 					oNode['gadget'].onMaximized=new Function(oList[j].getAttribute('attr:max')).bindAsObject(oList[j]);/*�ִ�ȭ�϶� ����� ���� �Լ� ����*/ 					oNode['gadget'].strata=oList[j].getAttribute('attr:strata')||this.nStrata; 					oNode['gadget'].state=oList[j].getAttribute('attr:state')||'expand'; 					oNode['gadget'].animate=(oList[j].getAttribute('attr:animate')||'none').toLowerCase(); 					addEventObserve(oList[j],'click',this.expose.bindAsObject(this,nNodeIndex)); 					break; 				case 'reset':	addEventObserve(oList[j],'click',this.reset.bindAsObject(this));										break; 				case 'up':		addEventObserve(oList[j],'click',this._cross.bindAsObject(this,nNodeIndex,'up'));			break; 				case 'down':	addEventObserve(oList[j],'click',this._cross.bindAsObject(this,nNodeIndex,'down'));		break; 				case 'left':	addEventObserve(oList[j],'click',this._cross.bindAsObject(this,nNodeIndex,'left'));			break; 				case 'right':	addEventObserve(oList[j],'click',this._cross.bindAsObject(this,nNodeIndex,'right'));		break; 				case 'drag':						addEventObserve(oList[j],'mousedown',this.dragDepart.bindAsEvent(this,nNodeIndex)); 					oList[j].style.cursor='move'; 					break; 				case 'first':	addEventObserve(oList[j],'click',this._above.bindAsObject(this,nNodeIndex));				break; 				case 'last':	addEventObserve(oList[j],'click',this._below.bindAsObject(this,nNodeIndex));				break; 				case 'next':	addEventObserve(oList[j],'click',this._stack.bindAsObject(this,nNodeIndex,1));				break; 				case 'prev':	addEventObserve(oList[j],'click',this._stack.bindAsObject(this,nNodeIndex,-1)); 				default:break; 			}; 		}; 		/*Resize*/ 		addEventObserve(oNode,'mousedown',this.resize.bindAsEvent(this,nNodeIndex)); 		/*���� ��ü�� �ʺ�,����*/ 		nX=oNode.offsetWidth>parseInt(oNode.style.width||0)?oNode.offsetWidth:parseInt(oNode.style.width);/*Node Width*/ 		nY=oNode.offsetHeight>parseInt(oNode.style.height||0)?oNode.offsetHeight:parseInt(oNode.style.height);/*Node Height*/ 		/*�� ������ü�� Index�� ����*/ 		oNode.setAttribute('_GadgetIndex',nNodeIndex); 		/*�� ������ü�� ��ġ�� ���� ���� ����*/ 		this.Atlas[nNodeIndex]={X:0,Y:0,cX:nX,cY:nY,dX:0,dY:0}; 		this.Nodes[nNodeIndex]=oNode; 		/*���� ��ü�� ��Ÿ�� �Ӽ� ����*/ 		oNode.style.position='absolute'; 		oNode.style.width=nX+'px';oNode.style.height=nY+'px'; 		oNode.style.margin='0px 0px 0px 0px'; 		oNode.style.display='block'; 		this.zIndex=this.zIndex+(this.Nodes.length*1000); 		nNodeIndex++; 	}; 	/*���ü�� position�� ����*/ 	this.Gadgetry.style.position='relative'; 	if(_f!=false){/*sort*/ 		oList=this.Nodes;this.Nodes=[]; 		for(var i=0,len=oList.length;i<len;i++){if(oList[_f[i]]==null)continue;_t[_t.length]=_f[i];}; 		for(var i=0,len=_t.length;i<len;i++){j=_t[i]==null?i:_t[i];this.Nodes[i]=oList[j]}; 		oList=null;_f=null;_t=null; 	}; 	/*�巡�׾ص��,������� ���� �̵���ü�� ���纻(ũ�⸸ ����)*/ 	this.keelblocks=document.createElement('DIV'); 	with(this.keelblocks.style){border=this.borderColor+' 2px dashed';position='absolute';display='none';cursor='move';}; 	this.Gadgetry.appendChild(this.keelblocks); 	/*��������*/ 	var cursors={lt:'se-resize',lm:'e-resize',lb:'ne-resize',ct:'s-resize',cb:'n-resize',rt:'sw-resize',rm:'w-resize',rb:'nw-resize'}; 	for(var nm in this.grips){ 		this.grips[nm]=document.createElement('DIV'); 		this.grips[nm].nm=nm; 		this.grips[nm].style.left ='0px';this.grips[nm].style.top='0px'; 		this.grips[nm].style.width=parseInt(this.grip.size)+'px';this.grips[nm].style.height=parseInt(this.grip.size)+'px'; 		this.grips[nm].style.margin='0px';this.grips[nm].style.padding='0px';this.grips[nm].style.border='none'; 		this.grips[nm].style.position='absolute'; 		this.grips[nm].style.display='block'; 		this.grips[nm].style.overflow='hidden'; 		this.grips[nm].style.visibility='hidden'; 		this.grips[nm].style.cursor=cursors[nm] ; 		this.grips[nm].style.zIndex=this.zIndex+100; 		this.grips[nm].style.backgroundColor=this.grip.color; 		addEventObserve(this.grips[nm],'mousedown',this._resizeDepart.bindAsEvent(this)); 		this.grips[nm].innerHTML="<img width='"+parseInt(this.grip.size)+"' height='"+parseInt(this.grip.size)+"' style='visibility:hidden;'>"; 		this.Gadgetry.appendChild(this.grips[nm]); 	} 	this.sizeinfo=document.createElement('DIV'); 	this.sizeinfo.style.fontSize='11px'; 	this.sizeinfo.style.fontFamily='Tahoma'; 	this.sizeinfo.style.color=this.grip.color; 	this.sizeinfo.style.position='absolute'; 	this.sizeinfo.style.visibility='hidden'; 	this.sizeinfo.style.cursor='default'; 	this.sizeinfo.style.left ='0px';this.sizeinfo.style.top='0px'; 	this.sizeinfo.style.margin='0px';this.sizeinfo.style.padding='0px'; 	this.sizeinfo.style.border='none';this.sizeinfo.style.zIndex=this.zIndex+1000; 	this.Gadgetry.appendChild(this.sizeinfo); 	this.compose(); 	this.initialize=true; };
/**
 * ���̾� ������ �ʱ�ȭ �ϴ� �Լ�
 *@method reset
 *@param {Bool} isDirectly ��� �ݿ� ����
 *@access public
 */
xwzGadgetry.prototype.reset=function(isDirectly){ 	var S=[],nIndex=0; 	for(var i=0,len=this.Nodes.length;i<len;i++){ 		nIndex=this.Nodes[i].getAttribute('_GadgetIndex')*1; 		S[nIndex]=this.Nodes[i]; 	}; 	this.Nodes=S; 	this._swapDepart(isDirectly); };
/**
 * Nodes �迭 �ε��� ���� ���� ���̾� ��ġ�� �ʱ�ȭ�ϴ� �Լ�
 *@method compose
 *@see #_mapping()
 *@see #_molding()
 *@acess public
 */
xwzGadgetry.prototype.compose=function(){ 	var Rect=this._mapping(this.Nodes,this.nCells,this.nDistance); 	for(var i=0,len=this.Nodes.length;i<len;i++){ 		this.Atlas[i].X=Rect[i].X;this.Atlas[i].Y=Rect[i].Y; 		this.Atlas[i].cX=Rect[i].cX;this.Atlas[i].cY=Rect[i].cY; 		this.Nodes[i].style.left=Rect[i].X+'px';this.Nodes[i].style.top=Rect[i].Y+'px'; 		this.Nodes[i].style.zIndex=this.zIndex+i; 	}; 	this._molding(); };
/**
 * ���콺�ٿ� �̺�Ʈ�� �߻��Ͽ��� �� drag&drop �̺�Ʈ �߻�
 *@method _dragDepart
 *@param {Object} event �̺�Ʈ �ڵ鷯
 *@param {Number} _index ��� ��ü�� �ε���
 *@acess public
 */
xwzGadgetry.prototype.dragDepart=function(event,_index){ 	window.focus(); 	if(event._left!==true){this._dragArrival();return false;} 	/*Resize�϶�*/ 	if(this.talebearing=='resize')this._showGrips(); 	/*�̺�Ʈ ���°�*/ 	this.talebearing='drag'; 	var s=this.getIndex(_index),z=0,node=this.Nodes[s];/*�巡�׾ص�� ��� ��ü*/ 	this.Queue=[]; 	/*�̵� ��ü�� ������ ��*/ 	notifyOpacity(node,60); 	/*�ε��� ����*/ 	this._trace.nTarget=this._trace.nSource=s; 	/*z-index save*/ 	z=node.style.zIndex; 	this.keelblocks.style.zIndex=node.style.zIndex; 	node.style.zIndex=this.zIndex+(this.Nodes.length*500); 	/*���̾ �̵��� ���� ���̾ ��ġ�� �ڸ��� ��� ��ġ�� ��ü �̵�*/ 	this.keelblocks.style.left=node.style.left; 	this.keelblocks.style.top=node.style.top; 	this.keelblocks.style.width=node.style.width; 	this.keelblocks.style.height=node.style.height; 	/*���� ����Ʈ ���*/ 	this._trace.dX=event._x;this._trace.dY=event._y; 	/*�̺�Ʈ ��� */ 	this.Observers['mousemove']=this._dragAviate.bindAsEvent(this,node); 	this.Observers['mouseup']=this._dragArrival.bindAsObject(this,node); 	addEventObserve(window.document,'mouseup',this.Observers['mouseup']); 	addEventObserve(window.document,'mousemove',this.Observers['mousemove']); 	window.document.onselectstart=new Function('return false'); 	window.document.ondragstart = new Function ("return false"); 	this.Queue=this.Nodes; };
/**
 * ������ ���� ��ħ �Ǵ� ���� �Լ�
 *@method expose
 *@acess Public
 */ 
xwzGadgetry.prototype.expose=function(_index){ 	/*�̺�Ʈ ���°�*/ 	this.talebearing='expose'; 	var s=this.getIndex(_index),node=this.Nodes[s]; 	var dest=0; 	if(node.pixWidth==null)node.pixWidth=parseInt(node.style.width); 	if(node.pixHeight==null)node.pixHeight=parseInt(node.style.height); 	/*�Ϲ����� ���� �Ǵ� ��ħ */ 	if(node.gadget.animate=='none'){this._expanded(node);return;} 	if(node.gadget.state=='collapse'){/*������ �Ӽ� ��*/ 		dest=node.gadget.animate=='slide'?-1:node.gadget.height; 		node.gadget.style.visibility='visible'; 	}else{/*������ �Ӽ� ��*/ 		dest=node.gadget.animate=='slide'?(node.gadget.height+1)*-1:1; 	} 	this._expanding(node,dest,0); };
/**
 * expand ������ ���� �Լ�
 *@method expandAttrib
 *@param {object,number} _gadget �ε��� �Ǵ� ��ü�ν��Ͻ�
 *@param {string} _name ������ �Ӽ��̸�
 *@param {function,string,number} _value �Ӽ� ��
 *@param {object} _srcObj �ּ�, �ִ�ȭ �Լ��� ���� ��ü
 *@acess Public
 */
xwzGadgetry.prototype.expandAttrib=function(_gadget,_name,_value,_srcObj){ 	var node=this.searchGadget(_gadget); 	if(node==null)return false; 	switch(_name){ 		/*�ּ�ȭ�Ϸ��Ľ������Լ�*/	case 'min':node.gadget.onMinimized=typeof _srcObj!='object'?new Function(_value||''):new Function(_value).bindAsObject(_srcObj);break; 		/*�ִ�ȭ�Ϸ��Ľ������Լ�*/case 'max':node.gadget.onMaximized=typeof _srcObj!='object'?new Function(_value||''):new Function(_value).bindAsObject(_srcObj);	break; 		/*strata*/case 'strata':node.gadget.strata=parseInt(_value||node.gadget.strata);break; 		/*ȿ��*/case 'animate':node.gadget.animate=parseInt(_value||node.gadget.animate);break; 	} 	return true; }
/**
 * �������� �Լ�
 *@method resizeTo
 *@acess public
 */
xwzGadgetry.prototype.resize=function(event,_index){ 	if(this.noResize==true||event._left==false){return false;} 	var s=this.getIndex(_index); 	/*resize�϶� �ߴ�*/ 	if((this.talebearing=='resize'&&s==this._trace.nSource)||(this.talebearing!='' &&this.talebearing!='resize')){ 		this.talebearing=this.talebearing!='resize'?this.talebearing:'';this._showGrips();return true; 	} 	this.talebearing='resize';/*�̺�Ʈ ���°� ����*/ 	this._trace.nSource=s; 	this._resizeArrange(this.Nodes[s]); 	this._showGrips(true); };
/**
 * ���õ� ���̾ ù��° �迭��ҷ� �̵�
 *@method _above
 *@param {Number}	_index ���̾� �ε��� ��ȣ
 *@param {Bool} isDirectly ��� �ݿ� ����
 *@access private
 */
xwzGadgetry.prototype._above=function(_index){ 	var oList=[],s=this.getIndex(_index);if(s==0)return; 	oList[0]=this.Nodes[s]; 	for(var i=0,len=this.Nodes.length;i<len;i++){if(i!=s)oList[oList.length]=this.Nodes[i];}; 	this.Nodes=oList;this._swapDepart(); };
/**
 * ���õ� ���̾ ��������° �迭��ҷ� �̵�
 *@method _below
 *@param {Number} _index ���̾� �ε��� ��ȣ
 *@access private
 */
xwzGadgetry.prototype._below=function(_index){ 	var oList=[],s=this.getIndex(_index);if(s==this.Nodes.length-1)return; 	for(var i=0,len=this.Nodes.length;i<len;i++){if(i!=s)oList[oList.length]=this.Nodes[i];}; 	oList[oList.length]=this.Nodes[s];this.Nodes=oList;this._swapDepart(); };
/**
 * ���õ� ���̾ ������ step��ŭ �̵���Ű�� �Լ�
 *@method _stack
 *@param {Number}_index ���̾� �ε��� ��ȣ
 *@param {Number} _step[:=decrease,increase]+1,-1,...
 *@access private
 */
xwzGadgetry.prototype._stack=function(_index,_step){ 	var s=this.getIndex(_index),d=s+_step,dist=0,oNodtmp=this.Nodes[s]; 	d=d<0?this.Nodes.length-1:d>this.Nodes.length-1?0:d; 	if(d==this.Nodes.length-1&&s==0){/*prev*/ 		oNodtmp=this.Nodes.shift();this.Nodes.push(oNodtmp); 	}else if(d==0&&s==this.Nodes.length-1){/*next*/ 		oNodtmp=this.Nodes.pop();this.Nodes.unshift(oNodtmp); 	}else{ 		this.Nodes[s]=this.Nodes[d];this.Nodes[d]=oNodtmp; 	}; 	this._swapDepart(); };
/**
 * ���õ� ���̾ ������ Y,X ������ step��ŭ �̵���Ű�� �Լ�
 *@method _cross
 *@param {Number}	_index ���̾� �ε��� ��ȣ
 *@param {String} _arrow[:=left,right,up,down]  �̵� ����
 *@access private
 */
xwzGadgetry.prototype._cross=function(_index,_arrow){ 	_arrow=(_arrow).toString().toLowerCase()||(this.nCells>0?'up':'left'); 	var s=this.getIndex(_index),d=s; 	var iX=Math.floor(s%this.nCells),iY=Math.floor(s/this.nCells),mX=Math.floor(this.Nodes.length-1%this.nCells),mY=Math.floor(this.Nodes.length-1/this.nCells); 	if(_arrow=='up')iY=iY>0?iY-1:iY; 	else if(_arrow=='down')iY=iY<mY?iY+1:iY; 	else if(_arrow=='left')iX=iX>0?iX-1:iX; 	else if(_arrow=='right')iX=iX<mX?iX+1:iX; 	d=(iY*this.nCells)+iX; 	if(d==s||d<0||d>this.Nodes.length-1)return false; 	var oNodtmp=this.Nodes[s]; 	this.Nodes[s]=this.Nodes[d]; 	this.Nodes[d]=oNodtmp; 	this._swapDepart(); };
/**
 * Frame ��ü�� �ʺ�� ���� ���� �Լ�
 *@method _molding
 *@see #_grid()
 *@acess private
 */
xwzGadgetry.prototype._molding=function(){ 	this.talebearing=''; 	var d=this._grid(this.Nodes,this.nCells),nX=Math.floor(this.nDistance/2),nY=Math.floor(this.nDistance/2); 	for(var i=0,len=d.horizontal.length;i<len;i++){nX+=d.horizontal[i]+this.nDistance;}; 	for(var i=0,len=d.vertical.length;i<len;i++){nY+=d.vertical[i]+this.nDistance;} 	this.Gadgetry.style.width=nX+'px';	this.Gadgetry.style.height=nY+'px'; 	this._showGrips();this.saveSequel(); };
/**
 * �� ���̾��� �ʺ�� ���̰��� �迭ȭ
 *@method _grid
 *@param {Object} Nodes ���̾� �迭
 *@param {Number} nColumns column ��
 *@return {Object}
 *@acess private
 */
xwzGadgetry.prototype._grid=function(Nodes,nColumns){ 	var iX=0,iY=0,nX=0,nY=0,h=[],v=[]; 	for(var i=0,len=Nodes.length;i<len;i++){ 		nX=parseInt(Nodes[i].style.width); 		nY=parseInt(Nodes[i].style.height); 		iX=Math.floor(i%nColumns);iY=Math.floor(i/nColumns); 		v[iY]=(v[iY]||0)>nY?v[iY]:nY;h[iX]=(h[iX]||0)>nX?h[iX]:nX; 	}; 	return{vertical:v,horizontal:h}; };
/**
 * ���̾�鿡 ���� x,y, width, height �� �迭ȭ �Լ�
 *@method _mapping
 *@see #_grid()
 *@param {Object} Nodes ���̾� �迭
 *@param {Number} nColumns column ��
 *@return {Array} Array(x, y, width, height )
 *@acess private
 */
xwzGadgetry.prototype._mapping=function(Nodes,nColumns,Distance){ 	/*grid->_mapping->_molding*/ 	var iX=0,iY=0,nX=Math.abs(Distance/2),nY=Math.abs(Distance/2),Map=[],d=this._grid(Nodes,nColumns); 	for(var i=0,len=Nodes.length;i<len;i++){ 		iX=Math.floor(i%nColumns);iY=Math.floor(i/nColumns); 		if(iX==0){	nX=Math.abs(Distance/2);if(iY>0)nY+=(d.vertical[iY-1]+Distance);}; 		Map[i]={X:nX,Y:nY,cX:parseInt(Nodes[i].style.width),cY:parseInt(Nodes[i].style.height)}; 		nX+=(d.horizontal[iX]+Distance); 	}; 	return Map; };
/**
 *����� �迭�� �ε����� ���� �� ���̾ �̵��� ��ġ ���
 *@method _swapDepart
 *@see #_swapAviate()
 *@acess private
 */
xwzGadgetry.prototype._swapDepart=function(isDirectly){ 	/*�̺�Ʈ ���°�*/ 	this.talebearing='position'; 	this.Queue=[]; 	var d=0,dX=0,dY=0,Rect=this._mapping(this.Nodes,this.nCells,this.nDistance); 	for(var i=0,len=this.Nodes.length;i<len;i++){ 		/*���̾� ���� ��ġ�� �̵��� ��ġ ���� ���*/ 		dX=Rect[i].X-parseInt(this.Nodes[i].style.left),dY=Rect[i].Y-parseInt(this.Nodes[i].style.top); 		d=len-1-i; 		this.Nodes[d].style.zIndex=(this.zIndex+len)-i; 		if(dX==0&&dY==0)continue; 		this.Atlas[i]=Rect[i]; 		/*�� �Ӽ��� �迭ȭ*/ 		this.Queue[this.Queue.length]={ 				style:this.Nodes[i].style, 				distX:dX,distY:dY, 				posX:parseInt(this.Nodes[i].style.left),posY:parseInt(this.Nodes[i].style.top), 				mvX:Rect[i].X,mvY:Rect[i].Y, 				scX:dX!=0?0:this.nStrata,scY:dY!=0?0:this.nStrata 			}; 		/*���� ����*/ 		notifyOpacity(this.Nodes[i],this.nOpacity); 	}; 	(this.isMotion==true||isDirectly==true)?this._swapAviate():this.compose(); };
/**
 * ���̾ �̵��� ��ġ�� ���� �̵���Ű�� �Լ�
 *@method _swapAviate
 *@acess private �Ÿ����
 */
xwzGadgetry.prototype._swapAviate=function(){ 	clearTimeout(this.resTime);this.resTime=null; 	var o=null,Q=[]; 	var dY=0,dX=0; 	for(var i=0,len=this.Queue.length;i<len;i++){ 		o=this.Queue[i];/*�̵� ��ü*/ 		if(o.scX<this.nStrata){/*x�� �̵�*/ 			dX=Math.round(Math.sin(o.scX/this.nStrata*Math.PI/2)*o.distX); 			o.style.left=(o.posX+dX)+'px'; 			o.scX++; 		} 		if(o.scY<this.nStrata){/*y�� �̵�*/ 			dY=Math.round(Math.sin(o.scY/this.nStrata*Math.PI/2)*o.distY); 			o.style.top=(o.posY+dY)+'px'; 			o.scY++; 		} 		/*�̵��Ϸ�*/ 		if(o.scX>=this.nStrata&&o.scY>=this.nStrata){ 			notifyOpacity(o);o.style.left=(o.mvX)+'px';o.style.top=(o.mvY)+'px'; 		}else{/*�� �迭ȭ*/ 			Q[Q.length]=o; 		} 	}; 	if(Q.length==0){ 		this.Queue=[];this._molding(); 		return false; 	} 	this.Queue=Q; 	this.resTime=setTimeout(this._swapAviate.bindAsObject(this),0); };
/**
 * ���콺�� ��ġ�� ������ ��� �Էµ� ��ü�� ��ġ�� ���콺 �����Ͱ� ��ġ�� �ڸ��� �̵���Ŵ
 *@method _dragArrange
 *@see #__dragAviate()
 *@see #__dragArrival()
 *@param {Object} element ��� ��ü
 *@return {Object} �̵� ��ü�� �� �ε����� ���� ���̾� ��ġ ��
 *@acess private
 */
xwzGadgetry.prototype._dragArrange=function(element){ 	var Queue=[],Rect=[]; 	/*���콺 �̵� ��ü�� �����ϰ� ��迭ȭ*/ 	for(var i=0,len=this.Queue.length;i<len;i++){ 		if(i!=this._trace.nSource)Queue[Queue.length]=this.Queue[i]; 	}; 	/*���ü�� ��ü�� �̵��� ��ġ�� �ִ� ��ü�� �ε����� �ٲ�ġ��*/ 	Queue[Queue.length]=null; 	for(var i=Queue.length-1;i>this._trace.nTarget;i--)Queue[i]=Queue[i-1]; 	Queue[this._trace.nTarget]=this.Queue[this._trace.nSource]; 	/*���̾�鿡 ���� x,y,width,height �� �迭ȭ*/ 	Rect=this._mapping(Queue,this.nCells,this.nDistance); 	for(var i=0,len=this.Queue.length;i<len;i++){ 		if(i!=this._trace.nTarget){ 			Queue[i].style.left=Rect[i].X+'px';Queue[i].style.top=Rect[i].Y+'px';Queue[i].style.zIndex=this.zIndex+i; 		}else if(element!=null){/*���ü ��ġ �̵�*/ 			element.style.left=Rect[i].X;element.style.top=Rect[i].Y;element.style.zIndex=this.zIndex+i; 		} 	}; 	return{Nodes:Queue,Rect:Rect}; };
/**
 * drag&drop(���콺 �̵�)�� ���� ó���Լ�
 *@method _dragAviate
 *@param {Object} event �̺�Ʈ �ڵ鷯
 *@acess private
 */
xwzGadgetry.prototype._dragAviate=function(event,node){ 	/*�巡�׾ص�� ����� ���ų�,���� ���콺��ư�� ������ �ʰ� �ִ� ��� �ߴ�*/ 	if(node==null||event._left!==true){this._dragArrival(node);return false;} 	if(this.keelblocks.style.display!='block')this.keelblocks.style.display='block'; 	/*���콺 ����Ʈ �̵� �� ����*/ 	var dX=event._x-this._trace.dX,dY=event._y-this._trace.dY; 	/*���콺�� �̵��� ��ŭ ��ġ �̵�*/ 	var x=parseInt(node.style.left)+dX,y=parseInt(node.style.top)+dY; 	node.style.left=x+'px';node.style.top=y+'px'; 	/*���� ���콺 �����Ϳ� ���� ��ü �������� ��ġ ���*/ 	var iY=Math.floor(this._trace.nSource/this.nCells),cY=Math.abs(this.Atlas[this._trace.nSource].Y-y); 	var iX=Math.floor(this._trace.nSource%this.nCells),cX=Math.abs(this.Atlas[this._trace.nSource].X-x); 	for(var i=0,len=this.Atlas.length;i<len;i+=this.nCells){if(cY>Math.abs(this.Atlas[i].Y-y)){cY=Math.abs(this.Atlas[i].Y-y);iY=Math.floor(i/this.nCells);}}; 	for(var i=0;i<this.nCells;i++){if(cX>Math.abs(this.Atlas[i].X-x)){cX=Math.abs(this.Atlas[i].X-x);iX=Math.floor(i%this.nCells);}}; 	this._trace.nTarget=(iY*this.nCells)+iX; 	this._trace.nTarget=(this._trace.nTarget>this.Queue.length-1)?this.Queue.length-1:this._trace.nTarget; 	/*Ŭ�� ���̾� �̵�*/ 	this._dragArrange(this.keelblocks); 	/*���� ����Ʈ ���*/ 	this._trace.dX=event._x;this._trace.dY=event._y; };
/**
 * drag&drop �Ϸῡ ���� ó���Լ�
 *@method _dragArrival
 *@acess private
 */
xwzGadgetry.prototype._dragArrival=function(node){ 	/*�̺�Ʈ ����*/ 	if(this.Observers['mouseup']!=null)freeEventObserve(window.document,'mouseup',this.Observers['mouseup']); 	if(this.Observers['mousemove']!=null)freeEventObserve(window.document,'mousemove',this.Observers['mousemove']); 	this.Observers['mouseup']=null;this.Observers['mousemove']=null; 	window.document.onselectstart=null;window.document.ondragstart = null; 	var oReturn=null,dX=dY=0; 	/**/ 	if(node!=null){ 		oReturn=this._dragArrange(); 		dX=this.Atlas[this._trace.nTarget].X-parseInt(node.style.left); 		dY=this.Atlas[this._trace.nTarget].Y-parseInt(node.style.top); 		this.Queue=[{style:node.style,distX:dX,distY:dY,posX:parseInt(node.style.left),posY:parseInt(node.style.top),mvX:this.Atlas[this._trace.nTarget].X,mvY:this.Atlas[this._trace.nTarget].Y,scX:0,scY:0}]; 		notifyOpacity(node,this.nOpacity); 		this.isMotion==true?this._swapAviate():this.compose(); 		this.Nodes=oReturn.Nodes; 		this.Atlas=oReturn.Rect; 		node.style.zIndex=this.keelblocks.style.zIndex; 	} 	this.keelblocks.style.zIndex=-1;this.keelblocks.style.display='none'; 	this._trace.dX=0;this._trace.dY=0;this._trace.nTarget=null;this._trace.nSource=null; 	this.Observers=[]; };
/**
 * Slide, Bind ������ ��ħ �Ǵ� ���� ��� �Լ�
 *@method _expanding
 *@param {Object} gadget ��� ������ ���ΰ� �ִ� ��ü
 *@param {Number} n Count
 *@acess private
 */
xwzGadgetry.prototype._expanding=function(node,dest,n){ 	var curr=parseInt(node.gadget.animate=='slide'?node.gadget.topgap:node.gadget.style.height);/*���� �Ӽ�*/ 	/*Time �ν��Ͻ� ����*/ 	clearTimeout(this.resTime);this.resTime=null; 	if(dest-curr==0||n>node.gadget.strata){/*Count �Ϸ�*/ 		if(node.gadget.animate=='slide')node.gadget.topgap=dest+'px'; 		else node.gadget.style.height=dest+'px'; 		this._expanded(node); 	}else{/*ing*/ 		curr+=Math.round(Math.sin(n/node.gadget.strata*Math.PI/2)*(dest-curr)); 		if(node.gadget.animate=='slide'){/*slide�� ��� marginTop �Ӽ��� ����,height���� ������ ������ ����*/ 			node.gadget.topgap=curr+'px'; 			node.gadget.style.height=(node.gadget.height+curr<=0?1:node.gadget.height+curr)+'px'; 		}else{/*slide�� �ƴ� ��� blind �� ó���ϰ� ���̸� ������*/ 			node.gadget.style.height=(curr<=0?1:curr)+'px'; 		} 		/*��� ������ ���� �� ����*/ 		node.style.height=(node.pixHeight-node.gadget.height)+parseInt(node.gadget.style.height)+'px'; 		this.resTime=setTimeout(this._expanding.bindAsObject(this,node,dest,++n),1); 	} };
/**
 * ��ħ �Ǵ� ���� �Ϸ� �Լ�
 *@method _expanded
 *@acess private
 */
xwzGadgetry.prototype._expanded=function(node){ 	if(node.gadget.state=='expand'){/*��ħ ���¿��� �Ϸ�� ���*/ 		node.gadget.style.visibility='hidden';/*������ ����*/ 		node.gadget.state='collapse';/*���°� ����*/ 		node.gadget.style.height='1px'; 		node.style.height=(node.pixHeight-node.gadget.height)+'px'; 		node.gadget.onMinimized(); 	}else if(node.gadget.state=='collapse'){/*�������¿��� �Ϸ�� ���*/ 		node.gadget.style.visibility='visible';/*���� ����*/ 		node.gadget.state='expand';/*���°� ����*/ 		node.gadget.style.height=node.gadget.height+'px'; 		node.style.height=node.pixHeight+'px'; 		node.gadget.onMaximized(); 	} 	/*���� ���濡 ���� �迭 ��ġ �� frame ���� �� ����*/ 	this._swapDepart(); };

/**
 * resize grip view ���� ���� �Լ�
 *@method _showGrips
 *@param {bool} bValue [true, false]
 *@acess private
 */
xwzGadgetry.prototype._showGrips=function(bValue){for(var nm in this.grips)this.grips[nm].style.visibility=bValue==true?'visible':'hidden'; this.sizeinfo.style.visibility=bValue==true?'visible':'hidden';};
/**
 * resize grip/ border div ��ġ ���� �Լ�
 *@method _showGrips
 *@param {int} x x��ǥ��
 *@param {int} y y��ǥ��
 *@param {int} w �ʺ�
 *@param {int} h ����
 *@acess private
 */
xwzGadgetry.prototype._resizeArrange=function(src){ 	var g=parseInt(this.grip.size); 	var x=parseInt(src.offsetLeft||src.style.left)+1,y=parseInt(src.offsetTop||src.style.top)+1; 	var w=parseInt(src.offsetWidth||src.style.width)-1,h=parseInt(src.offsetHeight||src.style.height)-1; 	/*�� grip ��ġ ����*/ 	for(var nm in this.grips){ 		if(nm.charAt(0)=='l')				this.grips[nm].style.left=x+'px'; 		else if(nm.charAt(0)=='c')		this.grips[nm].style.left=(x+(w/2-g/2))+'px'; 		else if(nm.charAt(0)=='r')		this.grips[nm].style.left=((x+w)-g)+'px'; 		if(nm.charAt(1)=='t')				this.grips[nm].style.top=y+'px'; 		else if(nm.charAt(1)=='m')	this.grips[nm].style.top=(y+(h/2-g/2))+'px'; 		else if(nm.charAt(1)=='b')	this.grips[nm].style.top=((y+h)-g)+'px'; 		this.grips[nm].style.visibility='visible'; 	}; };
/**
 * resize grip view ���� ���� �Լ�
 *@method _resizeDepart
 *@param {event object} event ���콺 �̺�Ʈ
 *@acess private
 */
xwzGadgetry.prototype._resizeDepart=function(event,node){ 	window.focus(); 	var node=this.Nodes[this._trace.nSource]; 	if(node==null||event._left!==true){this._resizeArrival();return false;} 	this.keelblocks.style.display='block'; 	/*���̾ �̵��� ���� ���̾ ��ġ�� �ڸ��� ��� ��ġ�� ��ü �̵�*/ 	this.keelblocks.style.left=node.style.left; 	this.keelblocks.style.top=node.style.top; 	this.keelblocks.style.width=node.style.width; 	this.keelblocks.style.height=node.style.height; 	/*z-index save*/ 	var z=node.style.zIndex; 	this.keelblocks.style.zIndex=this.zIndex+(this.Nodes.length*500); 	this._trace.dX=event._x;this._trace.dY=event._y; 	/*�̺�Ʈ ��� */ 	this.Observers['mousemove']=this._resizeAviate.bindAsEvent(this,node,event.element.nm); 	this.Observers['mouseup']=this._resizeArrival.bindAsObject(this,node,event.element.nm); 	addEventObserve(window.document,'mouseup',this.Observers['mouseup']); 	addEventObserve(window.document,'mousemove',this.Observers['mousemove']); 	window.document.onselectstart=new Function('return false'); 	window.document.ondragstart = new Function ("return false"); 	this.keelblocks.style.cursor=event.element.style.cursor; };
/**
 * resizing �Լ�
 *@method _resizeAviate
 *@param {event object} event ���콺 �̺�Ʈ
 *@acess private
 */
xwzGadgetry.prototype._resizeAviate=function(event,node,nm){ 	/*�巡�׾ص�� ����� ���ų�,���� ���콺��ư�� ������ �ʰ� �ִ� ��� �ߴ�*/ 	if(node==null||event._left!==true){this._dragArrival(node);return false;} 	/*���콺 ����Ʈ �̵� �� ����*/ 	var dx =event._x-this._trace.dX,dy=event._y-this._trace.dY,m1=0,m2=0,d=0,g=0; 	var fX=nm.charAt(0),fY=nm.charAt(1); 	var l=parseInt(this.keelblocks.style.left),t=parseInt(this.keelblocks.style.top),w=parseInt(this.keelblocks.style.width),h=parseInt(this.keelblocks.style.height); 	/*left, width ����*/ 	if(fX!='c'){ 		m1=parseInt(this.grip.minWidth||this.grip.size*3);m2=parseInt(this.grip.maxWidth||w*2); 		d=w+(fX=='l'?(dx*-1):dx);/*left �̵��� ó��*/ 		if(d>m1&&d<m2){if(l+dx>0&&fX=='l'){this.keelblocks.style.left=(l+dx)+'px';w=d;}else if(fX!='l'){w=d;}} 		this.keelblocks.style.width=w+'px'; 	} 	/*top, height ����*/ 	if(fY!='m'){ 		m1=parseInt(this.grip.minHeight||this.grip.size*3);m2=parseInt(this.grip.maxHeight||h*2); 		d=h+(fY=='t'?(dy*-1):dy);/*top �̵��� ó��*/ 		if(d>m1&&d<m2){if(t+dy>0&&fY=='t'){this.keelblocks.style.top=(t+dy)+'px';h=d;}else if(fY!='t'){h=d;}} 		this.keelblocks.style.height=h+'px'; 	} 	/*�� grip ��ġ ����*/ 	this._resizeArrange(this.keelblocks); 	this.sizeinfo.innerText=parseInt(this.keelblocks.style.width)+'x'+parseInt(this.keelblocks.style.height);	this.sizeinfo.style.left=(parseInt(this.grips.rb.style.left)-(this.sizeinfo.offsetWidth)+2)+'px';this.sizeinfo.style.top=(parseInt(this.grips.rb.style.top)-(this.sizeinfo.offsetHeight)+2)+'px'; 	/*���� ����Ʈ ���*/ 	this._trace.dX=event._x;this._trace.dY=event._y; };
/**
 * resize �Ϸ��Լ�
 *@method _resizeArrival
 *@param {event object} event ���콺 �̺�Ʈ
 *@acess private
 */
xwzGadgetry.prototype._resizeArrival=function(node){ 	/*�̺�Ʈ ����*/ 	if(this.Observers['mouseup']!=null)freeEventObserve(window.document,'mouseup',this.Observers['mouseup']); 	if(this.Observers['mousemove']!=null)freeEventObserve(window.document,'mousemove',this.Observers['mousemove']); 	this.Observers['mouseup']=null;this.Observers['mousemove']=null; 	window.document.onselectstart=null;window.document.ondragstart = null; 	this._showGrips(); 	/*ũ�� �� ����*/ 	if(node!=null){	node.style.width=this.keelblocks.style.width;node.style.height=this.keelblocks.style.height;this._swapDepart();} 	this.keelblocks.style.cursor='auto';this.keelblocks.style.display='none'; 	this.sizeinfo.innerText=''; 	if(node.pixWidth!=null)node.pixWidth=parseInt(node.style.width);if(node.pixHeight!=null)node.pixHeight=parseInt(node.style.height);};
