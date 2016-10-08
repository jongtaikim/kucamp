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
	// 대소문자 변환 : 모두 소문자로 변환
	strEmailDomain = strEmailDomain.toLowerCase();

	// 특이형 검사
	if (strEmailDomain.length < 3 || strEmailDomain.indexOf(".") == -1) return false;
	if (strEmailDomain.charAt(0) == "." || strEmailDomain.charAt(strEmailDomain.length-1) == ".") return false;
	if (strEmailDomain.indexOf("..") != -1) return false;
	if (strEmailDomain.indexOf("www.") == 0) {
		alert("@www. 로 시작하는 메일 주소는 없습니다. 다시 입력해 주세요.");
		return false;
	}

	// 허용되는 문자로만 이루어졌는지 검사
	var validChar = ".abcdefghijklmnopqrstuvwxyz0123456789-_";
	for (var i = 0; i < strEmailDomain.length; i++) {
		if (validChar.indexOf(strEmailDomain.charAt(i)) == -1) {
			return false;
		}
	}

	// 메일주소가 없는 도메인이나 자주 틀리는 도메인 검사
	switch (strEmailDomain) {
		case "a.com":
		case "a.net":
		case "asdf.com":
		case "co.com":
		case "co.net":
		case "kr.com":
		case "net.net":
		case "ww.co.kr":
			alert("입력된 메일주소는 없는 주소입니다.\n실제로 사용하는 이메일 주소를 입력해 주세요.");
			return false;
			break;
	}

	/* 한메일 가입 금지
	switch (strEmailDomain) {
		case "hanmail.net":
		case "daum.net":
			alert("한메일 가입자에게는 메일이 전송되지 않습니다. 메일을 변경해 주십시요");
			return false;
			break;
	}
	*/

	// 최상위 도메인 검사 : 적절한 최상위 도메인인지 검사
	var n4LastDotPos = strEmailDomain.lastIndexOf(".");
	var strTopDomain = strEmailDomain.substring(n4LastDotPos + 1);
	if (strTopDomain.length < 2) {
		return false;
	}
	if (strTopDomain != "net" && strTopDomain != "kr" && strTopDomain != "com" && strTopDomain != "org" && strTopDomain != "edu" && strTopDomain != "gov" && strTopDomain != "mil" && strTopDomain != "jp") {
		// 국가별 도메인같은 특수 도메인 처리
		var strValidTopDomainList_special =
			"de|uk|nl|it|ar|br|dk|au|at|ch|cn|za|nz|pl|cz|nu|mx|no|fr|se|ru|cl|hk|hu|il|be|tw|to|sg|ca|es|ms|fi|gr|sk|as|tr|my|ie|ro|pt|ua|lt|id|sj|ac|tc|cx|yu|fm|ve|th|is|lu|lv|uy|hr|ph|li|us|sh|ag|vg|tm|gs|kz|cy|sa|in|eg|tf|py|ws|lb|uz|gg|pa|zw|bm|vu|np|mr|am|nf|ly|mt|ma|bg|ai|gi|ni|tj|gl|pn|pr|jo|cg|rw|tp|na|kg|je|gm|bi|cg|ad|sn|lk|fo|sc|mc|tt|cf|kn|bt|ng|mo|hn|bw|sm|gp|by|ba|bb|an|mw|ci|pf|az|tz|vc|cu|dm|mq|mz|bh|vi|ge|ee|ec|bn|gy|af|gd|kh|gu|lc|bh|gf|mm|ye|sr|qa|gh|sb|om|cm|al|zm|cv|ne|aq|io|bf|aw|bj|dj|ml|ae|ao|ga|pw|vn|td|pe|mv|mn|sl|mk|km|ls|mp|cr|gq|tk|so|sy|ki|nr|jm|gn|va|fj|cc|md";
		if (strValidTopDomainList_special.indexOf(strTopDomain) == -1) {
			return false;
		}
	}

	// 최상위 도메인이 kr인 경우 두번째 도메인 검사
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

		// secondDomain까지만으로 끝나는지 검사
		// korea.kr 일경우 안된다 그러네 ~~ 2009-03-20.
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
	// 특이형 검사
	if (strEmailId.length < 1) return false;
	if (strEmailId.indexOf("..") != -1) return false;

	// 허용되지 않는 문자가 있는지 검사
	var strUnValidChar = " `~!@#$%^&*()+=|\\{}[]:;\"'?/<>,";
	for (var i=0; i < strEmailId.length; i++) {
		if (strUnValidChar.indexOf(strEmailId.charAt(i)) != -1) return false;
	}

	return true;
}

function checkEmailAddress(strEmailAddress) {
	// @ 검사
	if (strEmailAddress.indexOf("@") == -1) return false;


	// 이메일 아이디 검사
	var strEmailId = strEmailAddress.substring(0, strEmailAddress.indexOf("@"));
	if (isValidEmailId(strEmailId) == false) return false;

	// 이메일 도메인 검사
	var strEmailDomain = strEmailAddress.substring(strEmailAddress.indexOf("@")+1);
	if (isValidEmailDomain(strEmailDomain) == false) return false;

	return true;
}


// 주민등록번호 검사
function checkSSN(ssn1, ssn2)
{
	return true;
	var sum = 0, fac = 0, last;
	var temp = ssn1, flag = 1;
	ssn1 = trimAll(ssn1);
	ssn2 = trimAll(ssn2);

	if (!isNumber(ssn1,0) || !isNumber(ssn2,0))
		return 3;			// 숫자가 아님

	else if (ssn1.length != 6 || ssn2.length != 7)
		return 3;			// 길이가 틀림
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
			return 3;		// 규칙에 맞지 않음
		else
			return 0;		// 규칙에 맞음
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
	// str1 검사
	var strDDDs = "|061|050|053|051|032|064|063|042|02|043|033|041|052|055|054|031|062|011|016|017|018|019|010|070|";
	if (!(isDigitString(str1) && strDDDs.indexOf(str1) != -1)) {
		return -1;
	}

	// str2 검사
	if (!(isDigitString(str2) && (str2.length == 3 || str2.length == 4))) {
		return -1;
	}

	// str3 검사
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

	// str2 검사
	if (!(isDigitString(str2) && (str2.length == 3 || str2.length == 4))) {
		return -1;
	}

	// str3 검사
	if (!(isDigitString(str3) && str3.length == 4)) {
		return -1;
	}

	return 0;
}

function isValidId(strId) {
	// 아이디 길이 검사
	if (strId.length < 4 || strId.length > 15) {
		return false;
	}
	// 특수문자 검사
	var validChar = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
	for (var i=0; i<strId.length; i++) {
		if (validChar.indexOf(strId.charAt(i)) == -1) {
			return false;
		}
	}
	return true;
}

function isValidPw(strId) {
	// 패스워드 길이 검사
	if (strId.length < 4 || strId.length > 10) {
		return false;
	}
	// 특수문자 검사
	var validChar = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
	for (var i=0; i<strId.length; i++) {
		if (validChar.indexOf(strId.charAt(i)) == -1) {
			return false;
		}
	}
	return true;
}

function checkName(strName) {
	var str="`~1!2@3#4$5%6^7&8*9(0)-_=+abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ,<.>/?;:'\"[{]}\\|☆☎▷¤水℡≤‡Ω⇒­≠★▒◀↕♨木∈≪♭δ⇔―∞♡▤▶↗☜金∋≫√∞∀∥?♥▥△↙☞土⊆α※ø∃＼◇▣▽↖∴年⊇ßΓ∈´∼◆▨▲↘♪㉿⊂§π〓、‘◈▧▼↑♬㈜⊃∠Σ∽。’♧▦◎↓♂№∪½σ∝·！♣▩⊙→♀㏇∩¼μ∵‥“♤□◐←日™∧¶τ∫…”♠■◑↘月㏂∨†Φ∬¨×☏◁●↔火㏘≥†θ￢〃÷！－９ＥＱ＾ｊｖㄴㅀㅌㅘㅥㅱㅽㆉ＂．：ＦＲ＿ｋｗㄵㅁㅍㅙㅦㅲㅾㆊ＃／；ＧＳ｀ｌｘㄶㅂㅎㅚㅧㅳㅿㆋ＄０＜ＨＴａｍｙㄷㅃㅏㅛㅨㅴㆀㆌ％１＝ＩＵｂｎｚㄸㅄㅐㅜㅩㆁㅵㆍ＆２＞ＪＶｃｏ｛ㄹㅅㅑㅝㅪㅶㆂㆎ＇３？ＫＷｄｐ｜ㄺㅆㅒㅞㅫㅷㆃ（４＠ＬＸｅｑ｝ㄻㅇㅓㅟㅬㅸㆄ）５ＡＭＹｆｒ￣ㄼㅈㅔㅠㅭㅹㆅ＊６ＢＮＺｇｓㄱㄽㅉㅕㅡㅮㅺㆆ＋７ＣＯ［ｈｔㄲㄾㅊㅖㅢㅯㅻㆇ，８ＤＰ］ｉｕㄳㄿㅋㅗㅣㅰㅼㆈ㎕㎛㏏㎶㎽㎋㏝Ŀ¾ŀ⁴㎖㎜㎈㎷㎾㎌㏐Ł⅛łⁿ㎗㎝㎉㎸㎿㏖㏓Ø⅜ø₁ℓ㎞㏈㎹㎐㏅㏃Œ⅝œ₂㎘㎟㎧㎀㎑㎭㏉º⅞ß₃㏄㎠㎨㎁㎒㎮㏜Þæþ₄㎣㎡㎰㎂㎓㎯㏆Ŧđŧ㎤㎢㎱㎃㎔㏛ÆŊðŋ㎥㏊㎲㎄Ω㎩Ð½ħŉ㎦㎍㎳㎺㏀㎪ª⅓ı¹㎙㎎㎴㎻㏁㎫Ħ⅔ĳ²㎚㎏㎵㎼㎊㎬Ĳ¼ĸ³㉠㉬㉸ⓘⓤ⑦㈃㈏㈛⒧⒳⑽㉡㉭㉹ⓙⓥ⑧㈄㈐⒜⒨⒴⑾㉢㉮㉺ⓚⓦ⑨㈅㈑⒝⒩⒵⑿㉣㉯㉻ⓛⓧ⑩㈆㈒⒞⒪⑴⒀㉤㉰ⓐⓜⓨ⑪㈇㈓⒟⒫⑵⒁㉥㉱ⓑⓝⓩ⑫㈈㈔⒠⒬⑶⒂㉦㉲ⓒⓞ①⑬㈉㈕⒡⒭⑷㉧㉳ⓓⓟ②⑭㈊㈖⒢⒮⑸㉨㉴ⓔⓠ③⑮㈋㈗⒣⒯⑹㉩㉵ⓕⓡ④㈀㈌㈘⒤⒰⑺㉪㉶ⓖⓢ⑤㈁㈍㈙⒥⒱⑻㉫㉷ⓗⓣ⑥㈂㈎㈚⒦⒲⑼ぁがしぢねへゃゎウケゼデヒポヨンЖСあきじっのべやわェゲソトビマラヴЗ?ぃぎすつはぺゅゐエコゾドピミリヵИУいくずづばほゆゑォゴタナフムルヶЙФぅぐせてぱぼょをオサダニブメレАКХうけぜでひぽよんカザチヌプモロБЛЧぇげそとびまらァガシヂネヘャヮВМЦえこぞどぴみりアキジッノベヤワГНШぉごたなふむるィギスツハペヰДОЩおさだにぶめれイクズヅバホユヱЕПЪかざちぬぷもろゥグセテパボョヲЁРЫⅰⅢΕΡερ‥“￡÷』ⁿⅱⅣΖΣζσ…”￥。【²ⅲⅤΗΤητ¨×⊥〔】～ⅳⅥΘΥθυ〃÷⌒〕＿ˇⅴⅦΙΦιφ­≠∂〈∼˘ⅵⅧΚΧκχ―∞≒〉¡˝ⅶⅨΛΨλψ∥°℉·¿˚ⅷⅩΜΩμω＼′‰《ː˙ⅸΑΝαν´∼″≡》∮¸ⅹΒΞβξ、‘℃±「∑˛ⅠΓΟγο。’Å∫」∏ⅡΔΠδπ·！￠∬『√─┃┨┖┭╃│┏┷┕┮╄┌┓┿┎┱╅┐┛┝┍┲╆┘┗┰┞┵╇└┣┥┟┶╈├┳┸┡┹╉┬┫╂┢┺╊┤┻┒┦┽┴╋┑┧┾┼┠┚┩╀━┯┙┪╁";
	var flag = true;

	for (var i = 0 ; i < strName.length ; i++){
		if(str.indexOf(strName.charAt(i)) != -1) {
			flag = false;
			break;
		}
	}
	return flag;
}