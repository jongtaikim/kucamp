function rTrim(word) {
	var wordLeng = word.length;
	var i;
	var pos, first, last;

	for(i = wordLeng-1; i >= 0; i--) {
		if(word.charAt(i) != " ") break;
	}
	pos = i;
	first = 0;
	last = pos + 1;
	word = word.substring(first,last);
	return word;
}

function lTrim(word) {
	var wordLeng = word.length;
	var i;
	var pos, first, last;

	for(i = 0; i < wordLeng; i++) {
		if(word.charAt(i) != " ") break;
	}
	pos = i;
	first = pos;
	last = wordLeng;
	word = word.substring(first,last);
	return word;
}

function trim(word) {
	word = lTrim(word);
	word = rTrim(word);
	return word;
}

function trimAll(word) {
	var wordLeng = word.length;
	var i;

	for(i=0; i<wordLeng; i++) {
		word = word.replace(' ','');
	}
	return word;
}

function isNumber(s, isInt)
{
	if (s == "")
		return 0;
		
	if (isInt) {
		if (s == parseInt(s,10) + "")
			return 1;
		else
			return 0;
	}
	else {
		var s2 = trim(s);
		while ( s2.charAt(0) == '0' )
			s2 = s2.substring(1,s2.length);
		if (s2 == "")
			return 1;
		else
			return isNumber(s2, 1);
	}
}

function isValidEmailDomain(strEmailDomain) {
	// ��ҹ��� ��ȯ : ��� �ҹ��ڷ� ��ȯ
	strEmailDomain = strEmailDomain.toLowerCase();

	// Ư���� �˻�
	if (strEmailDomain.length < 3 || strEmailDomain.indexOf(".") == -1) return false;
	if (strEmailDomain.charAt(0) == "." || strEmailDomain.charAt(strEmailDomain.length-1) == ".") return false;
	if (strEmailDomain.indexOf("..") != -1) return false;
	if (strEmailDomain.indexOf("www.") == 0) {
		alert("@www. �� �����ϴ� ���� �ּҴ� �����ϴ�. �ٽ� �Է��� �ּ���.");
		return false;
	}

	// ���Ǵ� ���ڷθ� �̷�������� �˻�
	var validChar = ".abcdefghijklmnopqrstuvwxyz0123456789-_";
	for (var i = 0; i < strEmailDomain.length; i++) {
		if (validChar.indexOf(strEmailDomain.charAt(i)) == -1) {
			return false;
		}
	}

	// �����ּҰ� ���� �������̳� ���� Ʋ���� ������ �˻�
	switch (strEmailDomain) {
		case "a.com":
		case "a.net":
		case "asdf.com":
		case "co.com":
		case "co.net":
		case "kr.com":
		case "net.net":
		case "ww.co.kr":
			alert("�Էµ� �����ּҴ� ���� �ּ��Դϴ�.\n������ ����ϴ� �̸��� �ּҸ� �Է��� �ּ���.");
			return false;
			break;
	}

	/* �Ѹ��� ���� ����
	switch (strEmailDomain) {
		case "hanmail.net":
		case "daum.net":
			alert("�Ѹ��� �����ڿ��Դ� ������ ���۵��� �ʽ��ϴ�. ������ ������ �ֽʽÿ�");
			return false;
			break;
	}
	*/

	// �ֻ��� ������ �˻� : ������ �ֻ��� ���������� �˻�
	var n4LastDotPos = strEmailDomain.lastIndexOf(".");
	var strTopDomain = strEmailDomain.substring(n4LastDotPos + 1);
	if (strTopDomain.length < 2) {
		return false;
	}
	if (strTopDomain != "net" && strTopDomain != "kr" && strTopDomain != "com" && strTopDomain != "org" && strTopDomain != "edu" && strTopDomain != "gov" && strTopDomain != "mil" && strTopDomain != "jp") {
		// ������ �����ΰ��� Ư�� ������ ó��
		var strValidTopDomainList_special =
			"de|uk|nl|it|ar|br|dk|au|at|ch|cn|za|nz|pl|cz|nu|mx|no|fr|se|ru|cl|hk|hu|il|be|tw|to|sg|ca|es|ms|fi|gr|sk|as|tr|my|ie|ro|pt|ua|lt|id|sj|ac|tc|cx|yu|fm|ve|th|is|lu|lv|uy|hr|ph|li|us|sh|ag|vg|tm|gs|kz|cy|sa|in|eg|tf|py|ws|lb|uz|gg|pa|zw|bm|vu|np|mr|am|nf|ly|mt|ma|bg|ai|gi|ni|tj|gl|pn|pr|jo|cg|rw|tp|na|kg|je|gm|bi|cg|ad|sn|lk|fo|sc|mc|tt|cf|kn|bt|ng|mo|hn|bw|sm|gp|by|ba|bb|an|mw|ci|pf|az|tz|vc|cu|dm|mq|mz|bh|vi|ge|ee|ec|bn|gy|af|gd|kh|gu|lc|bh|gf|mm|ye|sr|qa|gh|sb|om|cm|al|zm|cv|ne|aq|io|bf|aw|bj|dj|ml|ae|ao|ga|pw|vn|td|pe|mv|mn|sl|mk|km|ls|mp|cr|gq|tk|so|sy|ki|nr|jm|gn|va|fj|cc|md";
		if (strValidTopDomainList_special.indexOf(strTopDomain) == -1) {
			return false;
		}
	}

	// �ֻ��� �������� kr�� ��� �ι�° ������ �˻�
	if (strTopDomain == "kr") {
		var n4LastSecondDotPos = strEmailDomain.lastIndexOf(".", n4LastDotPos-1);
		var strSecondDomain = strEmailDomain.substring(n4LastSecondDotPos+1, n4LastDotPos);
		switch (strSecondDomain) {
			case "ac":
			case "sc":
			case "co":
			case "or":
			case "go":
			case "ne":
			case "re":
			case "nm":
			case "pe":
			case "hs":
			case "ms":
			case "seoul":
			case "pusan":
			case "taegu":
			case "incheon":
			case "kwangju":
			case "taejon":
			case "ulsan":
			case "kyonggi":
			case "kangwon":
			case "chungbuk":
			case "chungnam":
			case "jeonbuk":
			case "jeonnam":
			case "kyongbuk":
			case "kyongnam":
			case "cheju":
			case "korea":
				break;

			default:
				return false;
		}

		// secondDomain���������� �������� �˻�
		// korea.kr �ϰ�� �ȵȴ� �׷��� ~~ 2009-03-20.
		if (strSecondDomain!='korea')
		{
			if (strEmailDomain == strSecondDomain + "." + strTopDomain) {
				return false;
			}
		}
	}

	return true;
}

function isValidEmailId(strEmailId) {
	// Ư���� �˻�
	if (strEmailId.length < 1) return false;
	if (strEmailId.indexOf("..") != -1) return false;

	// ������ �ʴ� ���ڰ� �ִ��� �˻�
	var strUnValidChar = " `~!@#$%^&*()+=|\\{}[]:;\"'?/<>,";
	for (var i=0; i < strEmailId.length; i++) {
		if (strUnValidChar.indexOf(strEmailId.charAt(i)) != -1) return false;
	}

	return true;
}

function checkEmailAddress(strEmailAddress) {
	// @ �˻�
	if (strEmailAddress.indexOf("@") == -1) return false;


	// �̸��� ���̵� �˻�
	var strEmailId = strEmailAddress.substring(0, strEmailAddress.indexOf("@"));
	if (isValidEmailId(strEmailId) == false) return false;

	// �̸��� ������ �˻�
	var strEmailDomain = strEmailAddress.substring(strEmailAddress.indexOf("@")+1);
	if (isValidEmailDomain(strEmailDomain) == false) return false;

	return true;
}


// �ֹε�Ϲ�ȣ �˻�
function checkSSN(ssn1, ssn2)
{
	return true;
	var sum = 0, fac = 0, last;
	var temp = ssn1, flag = 1;
	ssn1 = trimAll(ssn1);
	ssn2 = trimAll(ssn2);

	if (!isNumber(ssn1,0) || !isNumber(ssn2,0))
		return 3;			// ���ڰ� �ƴ�

	else if (ssn1.length != 6 || ssn2.length != 7)
		return 3;			// ���̰� Ʋ��
	else {
		while(1) {
			for (i=0; i<6; i++) {
				sum += parseInt(temp.substring(i, i+1),10) * (fac % 8 + 2);
				fac++;
			}
			if (flag) {
				temp = ssn2;
				flag = 0;
			}
			else
				break;
		}
		last = parseInt(ssn2.substring(6,7),10);
		temp = 9 - (sum % 11 + 8) % 10;
		if (last != temp)
			return 3;		// ��Ģ�� ���� ����
		else
			return 0;		// ��Ģ�� ����
	}
}

function isDigitString(str) {
	var validChar = "0123456789";
	for (var i=0; i < str.length; i++) {
		if (validChar.indexOf(str.charAt(i)) == -1) return false;
	}

	return true;
}

function checkPhoneNumber(str1, str2, str3) {
	// str1 �˻�
	var strDDDs = "|061|050|053|051|032|064|063|042|02|043|033|041|052|055|054|031|062|011|016|017|018|019|010|070|";
	if (!(isDigitString(str1) && strDDDs.indexOf(str1) != -1)) {
		return -1;
	}

	// str2 �˻�
	if (!(isDigitString(str2) && (str2.length == 3 || str2.length == 4))) {
		return -1;
	}

	// str3 �˻�
	if (!(isDigitString(str3) && str3.length == 4)) {
		return -1;
	}

	return 0;
}

function isMobilePhoneNumber(str1, str2, str3) {
	var strDDDs = "|011|016|017|018|019|010|";

	if (strDDDs.indexOf(str1) == -1) {
		return -1;
	}

	// str2 �˻�
	if (!(isDigitString(str2) && (str2.length == 3 || str2.length == 4))) {
		return -1;
	}

	// str3 �˻�
	if (!(isDigitString(str3) && str3.length == 4)) {
		return -1;
	}

	return 0;
}

function isValidId(strId) {
	// ���̵� ���� �˻�
	if (strId.length < 4 || strId.length > 15) {
		return false;
	}
	// Ư������ �˻�
	var validChar = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
	for (var i=0; i<strId.length; i++) {
		if (validChar.indexOf(strId.charAt(i)) == -1) {
			return false;
		}
	}
	return true;
}

function isValidPw(strId) {
	// �н����� ���� �˻�
	if (strId.length < 4 || strId.length > 10) {
		return false;
	}
	// Ư������ �˻�
	var validChar = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
	for (var i=0; i<strId.length; i++) {
		if (validChar.indexOf(strId.charAt(i)) == -1) {
			return false;
		}
	}
	return true;
}

function checkName(strName) {
	var str="`~1!2@3#4$5%6^7&8*9(0)-_=+abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ,<.>/?;:'\"[{]}\\|�٢Ϣ���⩢�¢ԧ٢������ڢƢ��բ��ʡ���ڥ䢢���Ģ��Ǣ��֢��ݡ����Ģ���?���ȡ�ע��ϡ���ة������ޢá�ء�Ҵ�����á������ߢɡ�٢ܢޡ��ץ�롢���¢ʡ��ݢߡ��Хҡ�����ˡݡ�΢������𡤣����̢���Ϣ������񡥡�����ġ������ҥ�򡦡�����Ţ��Ţ���ӥա󡧡��΢��ܡ�����âӥ�������������ţѣޣ���������Ȥդ����������ƣңߣ���������ɤ֤����������ǣӣ����������ʤפ����������ȣԣ����������ˤؤ����������ɣգ����������̤٤����������ʣ֣����������ͤڤ����������ˣף��������¤Τۤ�󣨣����̣أ��������äϤܤ���������ͣ٣��������ĤФݤ�������£Σڣ�󤡤����ŤѤޤ�������ãϣۣ���������ƤҤߤ�������ģУݣ���������ǤӤ����������ŧѧݧ騨�������������Ƨҧާꨩ�������������ǧӧߧ먪�������������ȧԧ�쨫�������������ɧէ���������������ʧ֧��������������˧ק�郞�����������̧ا䨡�������������ͧ٧娢�����������§Χڧ樣�����������çϧۧ稤�����������ħЧܧ訦�����������ɨը�����̩ة�𨲨��ʨ֨����ͩ٩�񨳨��˨ר�勇�©Ωک�򨴨��̨ب�𩷩éϩ۩�󨵨��ͨ٨�񩸩ĩЩܩ�����¨Ψڨ�򩹩ũѩݩ�����èϨۨ�󩺩Ʃҩީ꨸�ĨШܨ�����ǩөߩ먹�ŨѨݨ�����ȩԩ�쨺�ƨҨިꩱ���ɩթ���ǨӨߨ멲���ʩ֩��ȨԨ�쩳���˩ש�瑱�����ªͪت������ǫҫݫ�󬨬��������êΪ٪�﫧�����ȫӫޫ����?�������ĪϪڪ�𫨫����ɫԫ߫�������������ŪЪ۪�񫩫����ʫի��������������ƪѪܪ�򫪫����˫֫�쬡�����������ǪҪݪ�󫫫����̫׫�������������ȪӪު髡�����«ͫث������������ɪԪߪꫢ�����ëΫ٫�ﬤ�����������ʪժ�뫣�����īϫګ𬥬����������˪֪�쫤�����ūЫ۫�񬦬����������̪ת�������ƫѫܫ�򬧬��������ťѥ�񡥡��̡����������ƥҥ�򡦡��͡����������ǥӥ�󡧡��ѡ����������ȥԥ�������ҡ��ߢ������ɥե�������ӡ����������ʥ֥�����ġ֡����������˥ץ�����Ƣ������������̥إ�����Ǣ������������ͥ�����ȡա��������¥Υ����ɡ����������åϥ����ʡ򡹢����ĥХ�𡤣��ˡ󡺡�����ŦѦݦ������ƦҦަ������ǦӦߦ������ȦԦথ�����ɦզᦦ�����ʦ֦⦧�����˦צ㦨�����̦ئ䦩�����ͦ٦����¦Φڦ����æϦۦ����ĦЦ�";
	var flag = true;

	for (var i = 0 ; i < strName.length ; i++){
		if(str.indexOf(strName.charAt(i)) != -1) {
			flag = false;
			break;
		}
	}
	return flag;
}