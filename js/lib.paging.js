/**
* 파일명: lib.paging.js
* 설  명: 페이지바 출력하기
* 작성자: 거친마루
* 날  짜: 2004-02-04
*
***********************************************
* 2004-02-05 맨처음, 맨마지막 페이지 링크 추가하고, 보여줌 안보여줌 속성을 선택할 수 있도록 수정 - by 거친마루
* 2004-02-05 QueryString 오브젝트 개선 - by lainTT
* 2004-03-?? 페이지 넘버링 스타일을 설정할 수 있도록 수정, (페이지번호= %n) - by 거친마루
* 2004-03-?? 페이지 지시자를 page 아닌 다른것으로 사용할 수 있도록 확장 - by 거친마루
* 2004-03-19 QueryString에 baseName 프로퍼티 추가 - by 거친마루
* 2005-03-11 QueryString 클래스를 lib.querystring.js로 따로 분리하고 기본적으로 로드
*/

Paging = function(total) {
	this.config = {
		pageVariable: 'page',
		numberFormat: '[%n]',
		showFirstLast: true,	// 맨처음, 맨 마지막으로 가는 링크를 만들것인가.
		thisPageStyle: 'font-weight: bold;',
		otherPageStyle: 'font-size: 9pt',
		itemPerPage: 10,	// 리스트 목록수
		pagePerView: 10,	// 페이지당 네비게이션 항목수
		prevIcon: null,	// 이전페이지 아이콘
		nextIcon: null,	// 다음페이지 아이콘
		firstIcon: null,	// 첫페이지로 아이콘
		lastIcon: null	// 마지막페이지 아이콘
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
			if (this.config.firstIcon) firstBtn = '<img src="'+this.config.firstIcon+'" border="0" align="absmiddle" alt="처음" />';
			else firstBtn = '[처음]'; //'☜';
			firstBtn = firstBtn.link(this.qs.setVar(this.config.pageVariable,1));

			if (this.config.lastIcon) lastBtn = '<img src="'+this.config.lastIcon+'" border="0" align="absmiddle" alt="마지막" />';
			else lastBtn = '[마지막]'; //'☞';
			lastBtn = lastBtn.link(this.qs.setVar(this.config.pageVariable,this.totalPage));
		} else {
			firstBtn = lastBtn = '';
		}

		if (this.config.prevIcon) prevBtn ='<img src="'+this.config.prevIcon+'" border="0" align="absmiddle"  alt="이전 10페이지" />';
		else prevBtn = '◀';
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

		if (this.config.prevIcon) nextBtn ='<img src="'+this.config.nextIcon+'" border="0" align="absmiddle"  alt="다음 10페이지">';
		else nextBtn = '▶';
		if (this.totalPage > this.nextPage) {
			nextBtn = nextBtn.link(this.qs.setVar(this.config.pageVariable,this.nextPage));
		}
		return firstBtn+' '+prevBtn+navBtn+nextBtn+' '+lastBtn;
	}
}