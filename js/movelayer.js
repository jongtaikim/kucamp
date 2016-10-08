function moveLayer(layer, dragEle)
{

	/// 레이어 ///
	this.layer = $(layer);


	/// 리사이즈 이벤트 DIV ///
	this.N = null;

	this.E = null;

	this.W = null;

	this.S = null;

	this.NW = null;

	this.SW = null;

	this.NE = null;

	this.SE = null;


	/// 리사이즈 가능 유무 ///
	this.resizeObjN = null;

	this.resizeObjE = null;

	this.resizeObjW = null;

	this.resizeObjS = null;

	this.resizeObjNW = null;

	this.resizeObjSW = null;

	this.resizeObjNE = null;

	this.resizeObjSE = null;


	/// 드래그 이벤트 DIV ///
	this.dragEle = $(dragEle);

	
	/// 드래그 가능 유무 ///
	this.dragObj = null;

	
	/// 마우스를 클릭했을 때 위치 ///
	this.mouseDownPos = null;

	
	/// 마우스가 이동한 위치 ///
	this.mouseMovePos = null;

	
	/// 마우스 클릭했을 때 엘레먼트의 위치 ///
	this.moveEleOffset = null;

	
	
	/// z-index 값을 구한다. ///
	///IE7 짱나.ㅠㅠ ///
	this.zindex = 0;

	this.getZindex();


	/// 초기화 함수 실행 ///
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



///  초기화 함수  ///
moveLayer.prototype.init = function ()
{
	this.layer.style.position = "absolute";

	this.layer.style.overflow = "hidden";


	/// 리사이즈 이벤트가 나타나는 DIV 생성 ///
	/// 쉽게 동쪽은 e 서쪽은 w 이런식을 작명 ///
	this.createN();

	this.createE();

	this.createW();

	this.createS();

	this.createNW();

	this.createSW();

	this.createNE();

	this.createSE();

	
	/// 드래그 이벤트 함수 ///
	this.dragEvent();

	
	/// 리사이즈 이벤트 함수 ///
	this.resizeEvent();


	var oThis = this;

	/// 드래그 종료 ///
	
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
	

	/// 드래그 ///
	document.observe("mousemove", function(evt) {
		if(!oThis.dragObj && !oThis.resizeObjN && !oThis.resizeObjE && !oThis.resizeObjW && !oThis.resizeObjS && !oThis.resizeObjNW && !oThis.resizeObjSW && !oThis.resizeObjNE && !oThis.resizeObjSE) return false;
		

		if(oThis.dragObj)
		{
			oThis.mouseMovePos = oThis.mousePositon(evt);

			/// 마우스가 움직인 거리만큼 엘레먼트위치도 수정 ///
			var left = oThis.moveEleOffset.x + (oThis.mouseMovePos.x - oThis.mouseDownPos.x);
			var top = oThis.moveEleOffset.y + (oThis.mouseMovePos.y - oThis.mouseDownPos.y);

			/// 이동 제한 설정 ///
			left = (left < 0) ? 0 : left;
			top = (top < 0) ? 0 : top;

			/// 마우스가 이동한 거리만큼 이동 ///
			oThis.layer.style.left = left + "px";
			oThis.layer.style.top = top + "px";

			return false;

		} else if(oThis.resizeObjN) {

			// 북쪽 리사이즈
			oThis.rN(evt);

		} else if(oThis.resizeObjE) {

			// 동쪽 리사이즈
			oThis.rE(evt);
		
		} else if(oThis.resizeObjW) {

			// 서쪽 리사이즈
			oThis.rW(evt);

		} else if(oThis.resizeObjS) {
			
			// 남쪽 리사이즈
			oThis.rS(evt);

		} else if(oThis.resizeObjNE) {
			
			// 북동쪽 리사이즈
			oThis.rN(evt);
			
			oThis.rE(evt);

		} else if(oThis.resizeObjSE) {
			
			// 남동쪽 리사이즈
			oThis.rS(evt);

			oThis.rE(evt);

		} else if(oThis.resizeObjNW) {

			// 북서쪽 리사이즈
			oThis.rN(evt);

			oThis.rW(evt);

		} else if(oThis.resizeObjSW) {

			// 남서쪽 리사이즈
			oThis.rS(evt);

			oThis.rW(evt);

		}
	}); 

}


moveLayer.prototype.rN = function(evt)
{
	oThis = this;

	oThis.mouseMovePos = oThis.mousePositon(evt);

	/// 마우스가 움직인 거리만큼 리사이즈 ///
	var height = oThis.moveEleOffset.h + (oThis.mouseDownPos.y - oThis.mouseMovePos.y);
			
	/// 마우스가 움직인 거리만큼 엘레먼트위치도 수정 ///
	var top = oThis.moveEleOffset.y + (oThis.mouseMovePos.y - oThis.mouseDownPos.y)
			
	/// 리사이즈 제한 설정 ///
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

	/// 마우스가 움직인 거리만큼 리사이즈 ///
	var width = oThis.moveEleOffset.w + (oThis.mouseMovePos.x - oThis.mouseDownPos.x);
			
	/// 리사이즈 제한 설정 ///
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

	/// 마우스가 움직인 거리만큼 리사이즈 ///
	var width = oThis.moveEleOffset.w + (oThis.mouseDownPos.x - oThis.mouseMovePos.x);

	/// 마우스가 움직인 거리만큼 엘레먼트위치도 수정 ///
	var left = oThis.moveEleOffset.x + (oThis.mouseMovePos.x - oThis.mouseDownPos.x);
			
	/// 리사이즈 제한 설정 ///
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

	/// 마우스가 움직인 거리만큼 리사이즈 ///
	var height = oThis.moveEleOffset.h + (oThis.mouseMovePos.y - oThis.mouseDownPos.y);
						
	/// 리사이즈 제한 설정 ///
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



/// 드래그 이벤트 함수 ///
moveLayer.prototype.dragEvent = function()
{
	/// 이벤트 메서드 안에서 this를 사용하면 이벤트가 발생하는 객체를 가르키므로. ///
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



/// 마우스의 위치 검색 ///
moveLayer.prototype.mousePositon = function(evt)
{	
	var Pos = {
		x : evt.pointerX(),
		y : evt.pointerY()
	}

	return Pos;
}



/// 리사이즈 이벤트 함수 ///
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