/*
* $File: lib.bitexpress.js $
* ��Ʈ�������� number type�� ���� ������ �����ϰ� html üũ�ڽ��� �����ϱ� ���� ���̺귯��
*/
BitExp = function(sel) {
	this.select = sel?sel:0;

	this.test = function(n) {
		return (n & this.select) ? true : false;
	}
}