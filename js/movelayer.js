function moveLayer(layer, dragEle)
{

	/// ���̾� ///
	this.layer = $(layer);


	/// �������� �̺�Ʈ DIV ///
	this.N = null;

	this.E = null;

	this.W = null;

	this.S = null;

	this.NW = null;

	this.SW = null;

	this.NE = null;

	this.SE = null;


	/// �������� ���� ���� ///
	this.resizeObjN = null;

	this.resizeObjE = null;

	this.resizeObjW = null;

	this.resizeObjS = null;

	this.resizeObjNW = null;

	this.resizeObjSW = null;

	this.resizeObjNE = null;

	this.resizeObjSE = null;


	/// �巡�� �̺�Ʈ DIV ///
	this.dragEle = $(dragEle);

	
	/// �巡�� ���� ���� ///
	this.dragObj = null;

	
	/// ���콺�� Ŭ������ �� ��ġ ///
	this.mouseDownPos = null;

	
	/// ���콺�� �̵��� ��ġ ///
	this.mouseMovePos = null;

	
	/// ���콺 Ŭ������ �� ������Ʈ�� ��ġ ///
	this.moveEleOffset = null;

	
	
	/// z-index ���� ���Ѵ�. ///
	///IE7 ¯��.�Ф� ///
	this.zindex = 0;

	this.getZindex();


	/// �ʱ�ȭ �Լ� ���� ///
	this.init();
}



moveLayer.prototype.getZindex = function()
{
	var child = this.layer.childNodes;

	for(var i=0; i < child.length; i++)
	{
		if(child[i].style)
		{
			if(child[i].style.zIndex)
			{
				this.zindex = (parseInt(child[i].style.zIndex) > this.zindex) ? parseInt(child[i].style.zIndex) : this.zindex;

			} else {
				child[i].style.zIndex = 1;
			}
		}
	}
}



///  �ʱ�ȭ �Լ�  ///
moveLayer.prototype.init = function ()
{
	this.layer.style.position = "absolute";

	this.layer.style.overflow = "hidden";


	/// �������� �̺�Ʈ�� ��Ÿ���� DIV ���� ///
	/// ���� ������ e ������ w �̷����� �۸� ///
	this.createN();

	this.createE();

	this.createW();

	this.createS();

	this.createNW();

	this.createSW();

	this.createNE();

	this.createSE();

	
	/// �巡�� �̺�Ʈ �Լ� ///
	this.dragEvent();

	
	/// �������� �̺�Ʈ �Լ� ///
	this.resizeEvent();


	var oThis = this;

	/// �巡�� ���� ///
	
	document.observe("mouseup", function(evt)
	{
		oThis.dragObj = null;

		oThis.resizeObjN = null;

		oThis.resizeObjE = null;

		oThis.resizeObjW = null;

		oThis.resizeObjS = null;

		oThis.resizeObjNW = null;

		oThis.resizeObjSW = null;

		oThis.resizeObjNE = null;

		oThis.resizeObjSE = null;
	});
	

	/// �巡�� ///
	document.observe("mousemove", function(evt) {
		if(!oThis.dragObj && !oThis.resizeObjN && !oThis.resizeObjE && !oThis.resizeObjW && !oThis.resizeObjS && !oThis.resizeObjNW && !oThis.resizeObjSW && !oThis.resizeObjNE && !oThis.resizeObjSE) return false;
		

		if(oThis.dragObj)
		{
			oThis.mouseMovePos = oThis.mousePositon(evt);

			/// ���콺�� ������ �Ÿ���ŭ ������Ʈ��ġ�� ���� ///
			var left = oThis.moveEleOffset.x + (oThis.mouseMovePos.x - oThis.mouseDownPos.x);
			var top = oThis.moveEleOffset.y + (oThis.mouseMovePos.y - oThis.mouseDownPos.y);

			/// �̵� ���� ���� ///
			left = (left < 0) ? 0 : left;
			top = (top < 0) ? 0 : top;

			/// ���콺�� �̵��� �Ÿ���ŭ �̵� ///
			oThis.layer.style.left = left + "px";
			oThis.layer.style.top = top + "px";

			return false;

		} else if(oThis.resizeObjN) {

			// ���� ��������
			oThis.rN(evt);

		} else if(oThis.resizeObjE) {

			// ���� ��������
			oThis.rE(evt);
		
		} else if(oThis.resizeObjW) {

			// ���� ��������
			oThis.rW(evt);

		} else if(oThis.resizeObjS) {
			
			// ���� ��������
			oThis.rS(evt);

		} else if(oThis.resizeObjNE) {
			
			// �ϵ��� ��������
			oThis.rN(evt);
			
			oThis.rE(evt);

		} else if(oThis.resizeObjSE) {
			
			// ������ ��������
			oThis.rS(evt);

			oThis.rE(evt);

		} else if(oThis.resizeObjNW) {

			// �ϼ��� ��������
			oThis.rN(evt);

			oThis.rW(evt);

		} else if(oThis.resizeObjSW) {

			// ������ ��������
			oThis.rS(evt);

			oThis.rW(evt);

		}
	}); 

}


moveLayer.prototype.rN = function(evt)
{
	oThis = this;

	oThis.mouseMovePos = oThis.mousePositon(evt);

	/// ���콺�� ������ �Ÿ���ŭ �������� ///
	var height = oThis.moveEleOffset.h + (oThis.mouseDownPos.y - oThis.mouseMovePos.y);
			
	/// ���콺�� ������ �Ÿ���ŭ ������Ʈ��ġ�� ���� ///
	var top = oThis.moveEleOffset.y + (oThis.mouseMovePos.y - oThis.mouseDownPos.y)
			
	/// �������� ���� ���� ///
	if(height < 50) return false;

	if(top < 0) return false;

	oThis.layer.style.height = height + "px";
		
	oThis.layer.style.top = top + "px";


	oThis.W.style.height = height - 6 + "px";

	oThis.E.style.height = height - 6 + "px";

	return false;
}



moveLayer.prototype.rE = function(evt)
{
	oThis = this;
	
	oThis.mouseMovePos = oThis.mousePositon(evt);

	/// ���콺�� ������ �Ÿ���ŭ �������� ///
	var width = oThis.moveEleOffset.w + (oThis.mouseMovePos.x - oThis.mouseDownPos.x);
			
	/// �������� ���� ���� ///
	if(width < 50) return false;

		
	oThis.layer.style.width = width + "px";

	
	oThis.S.style.width = width - 6 + "px";

	oThis.N.style.width = width - 6 + "px";

	return false;
}



moveLayer.prototype.rW = function(evt)
{
	oThis = this;
	
	oThis.mouseMovePos = oThis.mousePositon(evt);

	/// ���콺�� ������ �Ÿ���ŭ �������� ///
	var width = oThis.moveEleOffset.w + (oThis.mouseDownPos.x - oThis.mouseMovePos.x);

	/// ���콺�� ������ �Ÿ���ŭ ������Ʈ��ġ�� ���� ///
	var left = oThis.moveEleOffset.x + (oThis.mouseMovePos.x - oThis.mouseDownPos.x);
			
	/// �������� ���� ���� ///
	if(width < 50) return false;

	if(left < 0) return false;

			
	oThis.layer.style.width = width + "px";

	oThis.layer.style.left = left + "px";

	
	oThis.S.style.width = width - 6 + "px";

	oThis.N.style.width = width - 6 + "px";

	return false;
}



moveLayer.prototype.rS = function(evt)
{
	oThis = this;
	
	oThis.mouseMovePos = oThis.mousePositon(evt);

	/// ���콺�� ������ �Ÿ���ŭ �������� ///
	var height = oThis.moveEleOffset.h + (oThis.mouseMovePos.y - oThis.mouseDownPos.y);
						
	/// �������� ���� ���� ///
	if(height < 50) return false;

	oThis.layer.style.height = height + "px";

	
	oThis.W.style.height = height - 6 + "px";

	oThis.E.style.height = height - 6 + "px";
			
	return false;
}



moveLayer.prototype.createEle = function()
{
	var nd = new Element("div");

	this.layer.appendChild(nd);

	nd.style.position = "absolute";

	nd.style.backgroundColor = "#333";

	nd.setOpacity(0)

	nd.style.zIndex = parseInt(this.zindex) + 1;

	return nd;
}



moveLayer.prototype.createN = function()
{
	this.N = this.createEle();

	this.N.style.top = "-17px";

	this.N.style.left = "3px";

	this.N.style.width = this.layer.offsetWidth - 6 + "px";

	this.N.style.height = "20px";
}



moveLayer.prototype.createS = function()
{
	this.S = this.createEle(); 

	this.S.style.bottom = "-17px";

	this.S.style.left = "3px";

	this.S.style.width = this.layer.offsetWidth - 6 + "px";

	this.S.style.height = "20px";
}



moveLayer.prototype.createW = function()
{
	this.W = this.createEle();

	this.W.style.top = "3px";

	this.W.style.left = "0px";

	this.W.style.height = this.layer.offsetHeight - 6 + "px";

	this.W.style.width = "3px";
}



moveLayer.prototype.createE = function()
{
	this.E = this.createEle();

	this.E.style.top = "3px";

	this.E.style.right = "0px";

	this.E.style.height = this.layer.offsetHeight - 6 + "px";

	this.E.style.width = "3px";
}



moveLayer.prototype.createNW = function()
{
	this.NW = this.createEle();

	this.NW.style.top = "-17px";

	this.NW.style.left = "0px";

	this.NW.style.width = "3px";

	this.NW.style.height = "20px";
}



moveLayer.prototype.createSW = function()
{
	this.SW = this.createEle();

	this.SW.style.bottom = "-17px";

	this.SW.style.left = "0px";

	this.SW.style.width = "3px";

	this.SW.style.height = "20px";
}


moveLayer.prototype.createNE = function()
{
	this.NE = this.createEle();

	this.NE.style.top = "-17px";

	this.NE.style.right = "0px";

	this.NE.style.width = "3px";

	this.NE.style.height = "20px";
}



moveLayer.prototype.createSE = function()
{
	this.SE = this.createEle();

	this.SE.style.bottom = "-17px";

	this.SE.style.right = "0px";

	this.SE.style.width = "3px";

	this.SE.style.height = "20px";
}



/// �巡�� �̺�Ʈ �Լ� ///
moveLayer.prototype.dragEvent = function()
{
	/// �̺�Ʈ �޼��� �ȿ��� this�� ����ϸ� �̺�Ʈ�� �߻��ϴ� ��ü�� ����Ű�Ƿ�. ///
	var oThis = this;

	this.dragEle.observe("mouseover", function(evt) 
	{
		oThis.dragEle.style.cursor = "move";
	});

	this.dragEle.observe("mousedown", function(evt) 
	{
		oThis.dragObj = evt.element();
		oThis.mouseDownPos = oThis.mousePositon(evt);
			
		oThis.moveEleOffset = {
			x : oThis.layer.offsetLeft,
			y : oThis.layer.offsetTop			
		}
		
		return false;
	});
}



/// ���콺�� ��ġ �˻� ///
moveLayer.prototype.mousePositon = function(evt)
{	
	var Pos = {
		x : evt.pointerX(),
		y : evt.pointerY()
	}

	return Pos;
}



/// �������� �̺�Ʈ �Լ� ///
moveLayer.prototype.resizeEvent = function()
{
	this.resizeN();

	this.resizeE();

	this.resizeW();

	this.resizeS();

	this.resizeNE();

	this.resizeSE();

	this.resizeNW();

	this.resizeSW();
}



moveLayer.prototype.resizeN = function()
{
	var oThis = this;


	this.N.observe("mouseover", function(evt) 
	{
		oThis.N.style.cursor = "row-resize";
	});



	this.N.observe("mousedown", function(evt) 
	{
		oThis.resizeObjN = evt.element();
		oThis.mouseDownPos = oThis.mousePositon(evt);

		oThis.moveEleOffset = {
			x : oThis.layer.offsetLeft,
			y : oThis.layer.offsetTop,	
			w : oThis.layer.offsetWidth,
			h : oThis.layer.offsetHeight			
		}
			
		return false;
	});
}



moveLayer.prototype.resizeE = function()
{
	var oThis = this;


	this.E.observe("mouseover", function(evt) 
	{
		oThis.E.style.cursor = "col-resize";
	});


	this.E.observe("mousedown", function(evt) 
	{
		oThis.resizeObjE = evt.element();
		oThis.mouseDownPos = oThis.mousePositon(evt);

		oThis.moveEleOffset = {
			x : oThis.layer.offsetLeft,
			y : oThis.layer.offsetTop,	
			w : oThis.layer.offsetWidth,
			h : oThis.layer.offsetHeight			
		}
			
		return false;
	});
}



moveLayer.prototype.resizeW = function()
{
	var oThis = this;


	this.W.observe("mouseover", function(evt) 
	{
		oThis.W.style.cursor = "col-resize";
	});


	this.W.observe("mousedown", function(evt) 
	{
		oThis.resizeObjW = evt.element();
		oThis.mouseDownPos = oThis.mousePositon(evt);

		oThis.moveEleOffset = {
			x : oThis.layer.offsetLeft,
			y : oThis.layer.offsetTop,	
			w : oThis.layer.offsetWidth,
			h : oThis.layer.offsetHeight			
		}
			
		return false;
	});
}


moveLayer.prototype.resizeS = function()
{
	var oThis = this;


	this.S.observe("mouseover", function(evt) 
	{
		oThis.S.style.cursor = "row-resize";
	});


	this.S.observe("mousedown", function(evt)
	{
		oThis.resizeObjS = evt.element();
		oThis.mouseDownPos = oThis.mousePositon(evt);

		oThis.moveEleOffset = {
			x : oThis.layer.offsetLeft,
			y : oThis.layer.offsetTop,	
			w : oThis.layer.offsetWidth,
			h : oThis.layer.offsetHeight			
		}
			
		return false;
	});
}


moveLayer.prototype.resizeNE = function()
{
	var oThis = this;


	this.NE.observe("mouseover", function(evt) 
	{
		oThis.NE.style.cursor = "ne-resize";
	});


	this.NE.observe("mousedown", function(evt)
	{
		oThis.resizeObjNE = evt.element();
		oThis.mouseDownPos = oThis.mousePositon(evt);

		oThis.moveEleOffset = {
			x : oThis.layer.offsetLeft,
			y : oThis.layer.offsetTop,	
			w : oThis.layer.offsetWidth,
			h : oThis.layer.offsetHeight			
		}
			
		return false;
	});
}


moveLayer.prototype.resizeSE = function()
{
	var oThis = this;


	this.SE.observe("mouseover", function(evt) 
	{
		oThis.SE.style.cursor = "nw-resize";
	});


	this.SE.observe("mousedown", function(evt)
	{
		oThis.resizeObjSE = evt.element();
		oThis.mouseDownPos = oThis.mousePositon(evt);

		oThis.moveEleOffset = {
			x : oThis.layer.offsetLeft,
			y : oThis.layer.offsetTop,	
			w : oThis.layer.offsetWidth,
			h : oThis.layer.offsetHeight			
		}
			
		return false;
	});
}



moveLayer.prototype.resizeNW = function()
{
	var oThis = this;


	this.NW.observe("mouseover", function(evt) 
	{
		oThis.NW.style.cursor = "nw-resize";
	});


	this.NW.observe("mousedown", function(evt)
	{
		oThis.resizeObjNW = evt.element();
		oThis.mouseDownPos = oThis.mousePositon(evt);

		oThis.moveEleOffset = {
			x : oThis.layer.offsetLeft,
			y : oThis.layer.offsetTop,	
			w : oThis.layer.offsetWidth,
			h : oThis.layer.offsetHeight			
		}
			
		return false;
	});
}



moveLayer.prototype.resizeSW = function()
{
	var oThis = this;


	this.SW.observe("mouseover", function(evt) 
	{
		oThis.SW.style.cursor = "ne-resize";
	});


	this.SW.observe("mousedown", function(evt)
	{
		oThis.resizeObjSW = evt.element();
		oThis.mouseDownPos = oThis.mousePositon(evt);

		oThis.moveEleOffset = {
			x : oThis.layer.offsetLeft,
			y : oThis.layer.offsetTop,	
			w : oThis.layer.offsetWidth,
			h : oThis.layer.offsetHeight			
		}
			
		return false;
	});
}