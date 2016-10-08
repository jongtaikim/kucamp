/*
	파일명 : lib.fixmenu.js
	작성자 : steelheart(http://dart.new21.net/zboard/zboard.php?id=dartjint&no=19)
	수정자 : 이범민
	용  도 : 따라다니는 배너
	사용법 : 

		<div id="FIXMENU" style="position:absolute;width:170px;height:310px;">
			메뉴내용
		</div>

		<script type="text/javascript" src="lib.fixmenu.js"></script>
		<script type="text/javascript">
			var fixmenu = new FixMenu();
			fixmenu.alignCenter = true;
			fixmenu.bodyWidth = 700;
			fixmenu.speed = 10;
			fixmenu.init('fixmenu','FIXMENU');
		</script>

	주의사항 : 스크립트 호출하기전에 먼저 div 영역이 선언되어 있어야한다(스크립트보다 div 영역이 위에 와야한다)

*/
FixMenu = function () {
	this.instanceName = false;						// 오브젝트 인스턴스명(변수명)
	this.div = false;								// 메뉴영역 레이어의 id 값
	this.clientWidth = document.body.clientWidth;	// 현재 브라우저의 넓이(사이즈 변경 감시용)
	this.alignCenter = false;						// 사이트가 가운데 정렬인가
	this.bodyWidth = 770;							// 사이트가 가운데 정렬인 경우 사이트 Body의 넓이
	this.baseLeft = 700;							// 사이트가 가운데 정렬이 아닐경우 왼쪽으로부터의 거리
	this.baseTop = 150;								// 기본위치(top)
	this.initTop = 100;								// 초기 시작위치(top) : 기본위치 값과 다를경우 약간의 효과를 낼수 있다.
	this.scrollGap = 50;							// 스크롤시 상단과의 거리(top)
	this.frequency = 100;							// 움직임을 감지하는 빈도(숫자가 클수록 둔감해짐)
	this.speed = 10;								// 스크롤 속도 (숫자가 클수록 느려짐)
	this.timer = false;
}

FixMenu.prototype.init = function(insName,div_id) {
	if(!insName || !div_id) return false;
	this.instanceName = insName;
	if(document.getElementById(div_id) != 'undefined') {
		this.div = document.getElementById(div_id);
	} else {
		this.div = false;
	}
	this.div.style.top = document.body.scrollTop + this.initTop;
	this.initPosition();
}

FixMenu.prototype.initPosition = function() {
	if(!this.div) return false;
	this.clientWidth = cWidth = document.body.clientWidth;
	if(cWidth<this.bodyWidth) cWidth = this.bodyWidth;
	if(this.alignCenter) {
		this.div.style.left = Math.ceil((cWidth + this.bodyWidth)/2);
	} else {
		this.div.style.left = this.baseLeft
	}
	this.RefreshStaticMenu();
}

FixMenu.prototype.RefreshStaticMenu = function() {
	if (!this.div) return;
	if (this.clientWidth != document.body.clientWidth) this.initPosition();
	var stmnStartPoint, stmnEndPoint, stmnRefreshTimer;
	stmnStartPoint = parseInt(this.div.style.top, 10);
	stmnEndPoint = document.body.scrollTop + this.scrollGap;
	if (stmnEndPoint < this.baseTop) stmnEndPoint = this.baseTop;
	stmnRefreshTimer = this.frequency;
	if ( stmnStartPoint != stmnEndPoint ) {
		stmnScrollAmount = Math.ceil( Math.abs( stmnEndPoint - stmnStartPoint ) / 15 );
		this.div.style.top = parseInt(this.div.style.top, 10) + ( ( stmnEndPoint<stmnStartPoint ) ? -stmnScrollAmount : stmnScrollAmount );
		stmnRefreshTimer = this.speed;
	}
	this.timer = setTimeout (this.instanceName + ".RefreshStaticMenu();", stmnRefreshTimer);
}