/**
* ���ϸ�: lib.paging.js
* ��  ��: �������� ����ϱ�
* �ۼ���: ��ģ����
* ��  ¥: 2004-02-04
*
***********************************************
* 2004-02-05 ��ó��, �Ǹ����� ������ ��ũ �߰��ϰ�, ������ �Ⱥ����� �Ӽ��� ������ �� �ֵ��� ���� - by ��ģ����
* 2004-02-05 QueryString ������Ʈ ���� - by lainTT
* 2004-03-?? ������ �ѹ��� ��Ÿ���� ������ �� �ֵ��� ����, (��������ȣ= %n) - by ��ģ����
* 2004-03-?? ������ �����ڸ� page �ƴ� �ٸ������� ����� �� �ֵ��� Ȯ�� - by ��ģ����
* 2004-03-19 QueryString�� baseName ������Ƽ �߰� - by ��ģ����
* 2005-03-11 QueryString Ŭ������ lib.querystring.js�� ���� �и��ϰ� �⺻������ �ε�
*/

Paging = function(total) {
	this.config = {
		pageVariable: 'page',
		numberFormat: '[%n]',
		showFirstLast: true,	// ��ó��, �� ���������� ���� ��ũ�� ������ΰ�.
		thisPageStyle: 'font-weight: bold;',
		otherPageStyle: 'font-size: 9pt',
		itemPerPage: 10,	// ����Ʈ ��ϼ�
		pagePerView: 10,	// �������� �׺���̼� �׸��
		prevIcon: null,	// ���������� ������
		nextIcon: null,	// ���������� ������
		firstIcon: null,	// ù�������� ������
		lastIcon: null	// ������������ ������
	}

	this.totalItem = total;
	this.qs = new QueryString;

	this.calculate = function() {
		this.totalPage = Math.ceil(this.totalItem / this.config.itemPerPage);
		if (!this.totalPage) this.totalPage = 1;
		this.currentPage = this.qs.getVar(this.config.pageVariable);
		if (!this.currentPage) this.currentPage = 1;
		if (this.currentPage > this.totalPage) this.currentPage = this.totalPage;
		this.lastPageItems = this.totalPage % this.config.itemPerPage;

		this.prevPage = this.currentPage-1;
		this.nextPage = this.currentPage+1;
		this.seek = this.prevPage * this.config.itemPerPage;
		this.currentScale = parseInt(this.currentPage / this.config.pagePerView);
		if (this.currentPage % this.config.pagePerView < 1) this.currentScale--;
		this.totalScale = parseInt(this.totalPage / this.config.pagePerView);
		this.lastScalePages = this.totalPage % this.config.pagePerView;
		if (this.lastScalePages == 0) this.totalScale--;
		this.prevPage = this.currentScale * this.config.pagePerView;
		this.nextPage = this.prevPage + this.config.pagePerView + 1;
	}

	this.toString = function() {
		var ss, se;
		var firstBtn = '';
		var lastBtn = '';
		var prevBtn = '';
		var nextBtn = '';

		this.calculate();

		if (this.config.showFirstLast) {
			if (this.config.firstIcon) firstBtn = '<img src="'+this.config.firstIcon+'" border="0" align="absmiddle" alt="ó��" />';
			else firstBtn = '[ó��]'; //'��';
			firstBtn = firstBtn.link(this.qs.setVar(this.config.pageVariable,1));

			if (this.config.lastIcon) lastBtn = '<img src="'+this.config.lastIcon+'" border="0" align="absmiddle" alt="������" />';
			else lastBtn = '[������]'; //'��';
			lastBtn = lastBtn.link(this.qs.setVar(this.config.pageVariable,this.totalPage));
		} else {
			firstBtn = lastBtn = '';
		}

		if (this.config.prevIcon) prevBtn ='<img src="'+this.config.prevIcon+'" border="0" align="absmiddle"  alt="���� 10������" />';
		else prevBtn = '��';
		if (this.currentPage > this.config.pagePerView) {
			prevBtn = prevBtn.link(this.qs.setVar(this.config.pageVariable,this.prevPage));
		}

		ss = this.prevPage + 1;
		if ((this.currentScale >= this.totalScale) && (this.lastScalePages != 0)) se = ss + this.lastScalePages;
		else if (this.currentScale <= -1) se = ss;
		else se = ss + this.config.pagePerView;

		var navBtn = '';
		for(var i = ss; i<se; i++) {
			var pageText = this.config.numberFormat.replace(/%n/g,i);
			if (i == this.currentPage) {
				_btn = '<span style="'+this.config.thisPageStyle+'">'+pageText+'</span>';
			} else {
				_btn = '<a href="'+this.qs.setVar(this.config.pageVariable,i)+'" style="'+this.config.otherPageStyle+'">'+pageText+'</a>'
			}

			navBtn+=_btn;
		}

		if (this.config.prevIcon) nextBtn ='<img src="'+this.config.nextIcon+'" border="0" align="absmiddle"  alt="���� 10������">';
		else nextBtn = '��';
		if (this.totalPage > this.nextPage) {
			nextBtn = nextBtn.link(this.qs.setVar(this.config.pageVariable,this.nextPage));
		}
		return firstBtn+' '+prevBtn+navBtn+nextBtn+' '+lastBtn;
	}
}