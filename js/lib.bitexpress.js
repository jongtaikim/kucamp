/*
* $File: lib.bitexpress.js $
* 비트연산으로 number type에 많은 정보를 저장하고 html 체크박스와 연동하기 위한 라이브러리
*/
BitExp = function(sel) {
	this.select = sel?sel:0;

	this.test = function(n) {
		return (n & this.select) ? true : false;
	}
}