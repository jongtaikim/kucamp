function stripChar(str, chr) {
	var ret = new String();
	var i=0;
	for (i=0; i < str.length; i++) {
			if (str.charAt(i)==chr) {
					ret += " ";
					continue;
			}
			ret +=  str.charAt(i);
	}
	return ret;
}


function stripChars(str, chrs) {
	var i=0;
	var ret = new String(str);
	for (i=0; i < chrs.length; i++) {
			ret = stripChar(ret, chrs.charAt(i));
	}
	return ret;
}

function myStrip(str) {
	var ret = stripChars(str, "<>[]{}(),");
	return ret;
}

function LTrim(instr) {
	i =0;
	len = instr.length;
	if (len==0) {
		return instr;
	}
	while (1) {
		if (instr.substr(i,1)==" ") {
			i++;
			continue;
		}
		else {
			b = instr.substring(i, len);
			return b;
			break;
		}
	}
}
function RTrim(instr) {
	i = instr.length-1;
	if (i==0) {
		return instr;
	}
	
	while (instr.substr(i,1)==' ' || instr.substr(i,1)=='\t') {
		i--;
		continue;
	}
	b = instr.substring(0, i+1);
	return b;
}
function convertForAndSearch(sword) {
  i=0;
  len = sword.length;
  var b='';

  if (len==0) {
    return sword;
  }

  while (i < len ) {
    if (sword.substr(i,1)==' ') {
      i++;
      while(sword.substr(i,1)==' ') {
        i++;
        continue;

      }

      b = b + "<AND>" + sword.substr(i,1);
      i++;

    } else {

      b += sword.substr(i,1);
      i++;

    }
  }
  return b;

}
// search97 
var chkEach = "false";
function check(field) //체크가 되어있는지 검사한다.
{
	chkEach="false";
	for (i = 0; i < field.length; i++) 
	{
		if(field[i].checked)
			chkEach= "true";
	}
}
function search_str()
{

  var temptext=myStrip(document.forms['edusearchForm'].query.value);
  var temptext2=LTrim(temptext);
  temptext2=RTrim(temptext2);

  var querytext=convertForAndSearch(temptext2);
	var school_code=""
	var semiquery="" 
	var collection_code=""
	var city_code=""

////////2002-11-06  '사용중'인 자료의 유형이 없으면 검색 불가.//////////////
	if(document.forms['edusearchForm'].cnt.value == 0)
	{
		alert("검색 가능한 자료유형이 없으므로 검색을 할 수 없습니다.");
		return false;
	}
////////////////////////////////////////////////////////////////////////////	
	document.forms['edusearchForm'].query.value = temptext;
	if (document.forms['edusearchForm'].query.value == "") {
		alert("검색할 키워드를 입력해 주세요...");
		document.forms['edusearchForm'].query.focus();
		return false;
	}
	
	if(document.forms['edusearchForm'].school_code.value=="1"){
		school_code="초등학교<IN>z_school_name";
	}

	if(document.forms['edusearchForm'].school_code.value=="2"){
		school_code="중학교<IN>z_school_name";
	}

	if(document.forms['edusearchForm'].school_code.value=="3"){
		school_code="고등학교<IN>z_school_name";
	}

	
	if (document.forms['edusearchForm'].search_city.value=="18") {
		city_code="city";
	}
	check(document.forms['edusearchForm'].list);
	if(chkEach == "false")//체크가 되어있는지 검사한다.
	{
		alert("자료유형을 체크해 주세요");
		return false;
	}

	if (document.forms['edusearchForm'].list[0].checked==true){
		collection_code="small";
	}

	if (document.forms['edusearchForm'].list[1].checked==true){
		if (collection_code!=""){
			collection_code="("+collection_code+"<OR>middle)";
		}else
		    collection_code="middle";
	}

	if (document.forms['edusearchForm'].list[2].checked==true){ 
		if(collection_code != "") {
			collection_code="("+collection_code+"<OR>high)";
		}else
			collection_code="high";
	}

	if (document.forms['edusearchForm'].list[3].checked==true){ 
		if(collection_code != "") {
			collection_code="("+collection_code+"<OR>shigh)";
		}else
			collection_code="shigh";
	}

	if (document.forms['edusearchForm'].list[0].checked==true&&document.forms['edusearchForm'].list[1].checked==true&&document.forms['edusearchForm'].list[2].checked==true&&document.forms['edusearchForm'].list[3].checked==true){
		   collection_code="";
	}

	if (school_code !=""){
		if (city_code !=""){
			city_code="("+school_code+")<AND>("+city_code+")";
		}else
			city_code=school_code;
	}else
		city_code=city_code;
	
	
	if (city_code != ""){
		if (collection_code != ""){
			semiquery=city_code+"<AND>"+collection_code;
		}else
			semiquery=city_code;
	}else	{
		if (collection_code != ""){
			semiquery=collection_code;
		}else
			semiquery=semiquery;
	}

	if (document.forms['edusearchForm'].search_region.value=="all"){
		if (semiquery != ""){
			querytext=querytext+"<AND>"+semiquery;
		} else
			querytext=querytext;
	}
	document.forms['edusearchForm'].querytext.value=querytext;
}