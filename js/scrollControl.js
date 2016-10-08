/** 
* Author	: MC �ɻ� (ganer9r@naver.com) 
* Make Date : 2008-07-15
* comment	: 1�� �ؽ�Ʈ �Ѹ� ��ũ��Ʈ
**/
var ScrollControl	= function(objId,options){
	this.init(objId,options);
}
ScrollControl.prototype	= {
	stage : {},
	options : {},
	isover : false,
	freeze : false,
	course : 'top',
	itimes : 0,
	top : 0,

	init : function(objId,options){
		this.setOptions(options);
		this.setStage(objId);
		this.setTrueData();

		this.move();
	},
	setOptions : function(options){
		options.inteval	= options.inteval	|| 50;
		options.freeze	= options.freeze	|| 1000;
		options.height	= parseInt(options.height, 10)	|| 20;
		options.style	= options.style || 'scroll';
		options.line	= options.line || 1;
		options.stopline	= options.stopline || options.line;
		options.reverse	= options.reverse || '';
		options.debug	= options.debug || false;

		options.blockHeight	= options.height * options.line;
		options.stopHeight	= options.height * (options.stopline || options.line);


//		options.cMarginTop	= options.cMarginTop	|| (options.height/2) * 0.3;
		options.cMarginTop	= 0;
		options.cHeight		= options.height - options.cMarginTop;
		options.freeze		= (options.style == 'no-freeze') ? options.inteval : options.freeze;

		switch(options.style){
			case 'jump' :		options.style = options.style;	break;
			default :			options.style = 'scroll';	break;
		}


		this.course		= options.start || 'top';
		this.options	= options;
	},
	setTrueData : function(){
		var cObjs		= this.stage.childNodes;
		var cObjLen		= cObjs.length;
		var removes		= [];

		for(var i=0;i<cObjs.length;i++){
			if(!cObjs[i].tagName){
				removes.push(cObjs[i]);	//�ٷ� ���� �� ������ ���̴µ� �Ͽ� �ϴ� ŵ��.
			}else{
				cObjs[i].style.margin		= "0";

				cObjs[i].style.marginTop	= this.options.cMarginTop;
				cObjs[i].style.height		= this.options.cHeight;
			}
		}

		// ã�� �����͸� ������.(FF�� ��� text ��尡 ÷�ε�.)
		for(var i=0;i<removes.length;i++){
			this.stage.removeChild(removes[i]);
		}

		if(!this.options.debug && cObjLen <= this.options.line ){
			var attachLen	= parseInt(this.options.line/cObjLen, 10);

			for(var i=0; i<attachLen; i++){
				for(var j=0; j<cObjLen; j++){
					this.stage.appendChild( cObjs[j].cloneNode(true) );
				}
			}
		}

	},
	setStage : function(objId){
		var This	= this;
		this.stage		= document.getElementById(objId);

		this.stage.style.height		= this.options.blockHeight;
//		this.stage.style.padding	= "0px";
//		this.stage.style.margin		= "0px";

		if(!this.options.debug)
			this.stage.style.overflow	= "hidden";


		this.stage.onmouseover	= function(){This.isover=true;} 
		this.stage.onmouseout	= function(){This.isover=false;} 

		this.stage.scrollTop		= 0;	//�������� �������� ����
	},
	setCourse : function(course){
		if(this.course != 'down' && course == 'down' && this.stage.scrollTop <= 0){
			this.changeChild();
			this.stage.scrollTop = this.options.height;
		}else if(course == 'top' && this.stage.scrollTop >= this.options.height){
			if(this.options.reverse != 'all'){
				this.changeChild(this.options.line);
				this.stage.scrollTop = this.stage.scrollTop - this.options.stopHeight;
			}
		}

		this.course	= course;
		if(this.itimes > 0){
			window.clearTimeout(this.itimes);
			this.move();
		}
	},
	changeChild : function(count){
		if(count == undefined){	count	= this.stage.childNodes.length - 1;}

		for(var i=0; i<count;i++ ){
			this.stage.appendChild( this.stage.childNodes[0] );	// �׻� ù��°���� �ڷ� �̵�
		}
	},
	actionTop : function(){
		if(this.options.style == 'jump'){
			this.changeChild(this.options.stopline);
			this.stage.scrollTop = 0;
			this.freeze			= true;
		}else{
			this.top++;
			this.stage.scrollTop++;

			if( this.stage.scrollTop >= this.options.height ){
				this.changeChild(1);
				this.stage.scrollTop = this.stage.scrollTop - this.options.height;

				//if�� �ȿ� �ִ°� ȿ��
				if( this.top >= this.options.stopHeight ){
					this.top			= 0;
					this.freeze			= true;
					if(this.options.reverse == 'top' || this.options.reverse == 'all')	this.setCourse("down");
				}
			}
		}
	},
	actionDown : function(){
		if(this.options.style == 'jump'){
			this.freeze				= true;
			for(var i=0; i<this.options.stopline;i++){
				this.changeChild();
			}
		}else{
			this.top--;
			this.stage.scrollTop--;

			if( this.stage.scrollTop <= 0 ){
				this.changeChild();
				this.stage.scrollTop = this.stage.scrollTop + this.options.height;

				//Math.abs �� ���� �� ������, Math�Լ��� ���ſ� ����� ���� ó����.(if�� �ȿ� �ִ°� ȿ��)
				if( -(this.top) >= this.options.stopHeight ){
					for(var i=1; i<this.options.stopline;i++){
						this.changeChild();
					}

					this.top			= this.top + this.options.stopHeight;
					this.freeze			= true;
				}
			}
		}

		if(this.freeze){
			this.stage.scrollTop	= this.options.stopHeight;
			if(this.options.reverse == 'down' || this.options.reverse == 'all')	this.setCourse("top");
		}

	},
	move : function(){
		this.itimes	= 0;
		if(!this.isover){
			if(this.course == 'top')	this.actionTop();
			else						this.actionDown();
		}

		var This	= this;
		if(this.freeze){	this.itimes	=		window.setTimeout(function(){This.move()}, this.options.freeze); }
		else{				window.setTimeout(function(){This.move()}, this.options.inteval); }
		this.freeze	= false;
	}

}


/* ���� Start*/
//	var scroll	= new ScrollControl('html element id',options);
//
//	options �׸�
//	inteval : ���ȣ�� �ð� ���� 1/1000��(�⺻�� 50)
//	freeze : ��� ���� �ִ� �ð� ���� 1/1000 ��(�⺻�� 1000)
//	height : ��ü ����(�⺻�� 20)
//	cMarginTop : �ڵ����� �����ֳ�, ���� ũ��� ��ü ���� ������ ����, �ǵ��� ���̰� ������ ���� �� �ֱ� ������ ����ڰ� ���� �Է���.
//	line : ��ũ�� line�� ����.(�ش� ��ü�� ���̴� line * height)�� ��.
//	stopline : �⺻��(line�� ����), stopline ������ ���� line�ʹ� ���������� ��ũ���� freeze ��Ŵ.
//	start : �⺻�� 'top', top,down �� ���� ����.
//	reverse : [ | all | top | down ]
//			none	- none�� �ƴ�, ���� ���ٴ� ����. ������ string ''��
//			all		- ��, �Ʒ��� ��� reverse�� ��Ŵ. �� ������ �ϴ� ��� ���Ʒ��� �Դٰ��� ��.
//			top		- course�� top�� ���, setCourse('down')�� ȣ����
//			down	- course�� down�� ���, setCourse('top')�� ȣ����
//	style : [ scroll | jump | s-jump | jump-s ]
//			scroll	- �⺻ ��ũ�� �� setCourse ȣ�� �ÿ��� ��ũ�� �̵�. [�⺻��]
//			jump	- �⺻���� ���� �׸����� ���� �� setCourse ȣ�� �ÿ��� ���� �̵�.
//	
/* ���� End */