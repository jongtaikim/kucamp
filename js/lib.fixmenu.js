/*
	���ϸ� : lib.fixmenu.js
	�ۼ��� : steelheart(http://dart.new21.net/zboard/zboard.php?id=dartjint&no=19)
	������ : �̹���
	��  �� : ����ٴϴ� ���
	���� : 

		<div id="FIXMENU" style="position:absolute;width:170px;height:310px;">
			�޴�����
		</div>

		<script type="text/javascript" src="lib.fixmenu.js"></script>
		<script type="text/javascript">
			var fixmenu = new FixMenu();
			fixmenu.alignCenter = true;
			fixmenu.bodyWidth = 700;
			fixmenu.speed = 10;
			fixmenu.init('fixmenu','FIXMENU');
		</script>

	���ǻ��� : ��ũ��Ʈ ȣ���ϱ����� ���� div ������ ����Ǿ� �־���Ѵ�(��ũ��Ʈ���� div ������ ���� �;��Ѵ�)

*/
FixMenu = function () {
	this.instanceName = false;						// ������Ʈ �ν��Ͻ���(������)
	this.div = false;								// �޴����� ���̾��� id ��
	this.clientWidth = document.body.clientWidth;	// ���� �������� ����(������ ���� ���ÿ�)
	this.alignCenter = false;						// ����Ʈ�� ��� �����ΰ�
	this.bodyWidth = 770;							// ����Ʈ�� ��� ������ ��� ����Ʈ Body�� ����
	this.baseLeft = 700;							// ����Ʈ�� ��� ������ �ƴҰ�� �������κ����� �Ÿ�
	this.baseTop = 150;								// �⺻��ġ(top)
	this.initTop = 100;								// �ʱ� ������ġ(top) : �⺻��ġ ���� �ٸ���� �ణ�� ȿ���� ���� �ִ�.
	this.scrollGap = 50;							// ��ũ�ѽ� ��ܰ��� �Ÿ�(top)
	this.frequency = 100;							// �������� �����ϴ� ��(���ڰ� Ŭ���� �а�����)
	this.speed = 10;								// ��ũ�� �ӵ� (���ڰ� Ŭ���� ������)
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