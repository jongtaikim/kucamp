    ////////////////////////////////////////////
    // 에듀넷 관련 URL
    ////////////////////////////////////////////
    //에듀넷
    var EDUNET_URL				= "http://www.edunet4u.net";
	//교사 검색
    var EDUNET_TSEARCH_URL		= "http://www.edunet4u.net/tsearch";
    //사용자
    var EDUNET_USER_URL			= "http://www.edunet4u.net/user";
    //메인 채널
    var EDUNET_MAIN_URL			= "http://www.edunet4u.net/main";
    //교사 채널
    // var EDUNET_TEACHER_URL		= "http://www.edunet4u.net/teacher";
    var EDUNET_TEACHER_URL		= "http://www.edunet4u.net/teacher6";
    //학생 채널
    // var EDUNET_STUDENT_URL		= "http://www.edunet4u.net/student";
    var EDUNET_STUDENT_URL		= "http://www.edunet4u.net/student6";
    //커뮤니티 채널
    var EDUNET_COMMUNITY_URL	= "http://community.edunet4u.net";
	//에듀카페 채널
    var EDUNET_EDUCAFE_URL		= "http://educafe.edunet4u.net/cafe_t/front/post/post_view.do";
    //검색
    // var EDUNET_SEARCH_URL		= "http://www.edunet4u.net/ksearch";
    var EDUNET_SEARCH_URL		= "http://www.edunet4u.net/tsearch";
    //꾸러미자료
    var EDUNET_KMS_URL			= "http://www.edunet4u.net/kms";
    //수업컨설팅
    var EDUNET_KNOW_URL			= "http://www.edunet4u.net/know";
    //구에듀넷
    var EDUNET_OLD_URL			= "http://old.edunet4u.net";
    //다운로드
   // var EDUNET_DOWNLOAD_URL		= "http://down.edunet4u.net/servlet/FileDownloadServletV2.0";
	var EDUNET_DOWNLOAD_URL		= "http://down.edunet4u.net/servlet/SRCHFileDownloadServletV2.0";
	//다운로드위치 정보
	var DOWNLOAD_LOCATION		= "group";
	//다운로드 사용자 ID
	var DOWNLOAD_USERID			;


    ////////////////////////////////////////////
    // 외부 페이지 리다리렉트 주소
    ////////////////////////////////////////////
    //에듀넷 매인 채널
    var REDIRECT_CHANNEL_MAIN		= EDUNET_TSEARCH_URL +"/redirect/goChannelMain.jsp";
    //에듀넷 교사 채널
    var REDIRECT_CHANNEL_TEACHER	= EDUNET_TSEARCH_URL +"/redirect/goChannelTeacher.jsp";
    //에듀넷 학생 채널
    var REDIRECT_CHANNEL_STUDENT	= EDUNET_TSEARCH_URL +"/redirect/goChannelStudent.jsp";
    //에듀넷 커뮤니티 채널
    var REDIRECT_CHANNEL_COMMUNITY	= EDUNET_TSEARCH_URL +"/redirect/goChannelCommunity.jsp";
    //에듀넷 꾸러미자료 상세
    var REDIRECT_DETAIL_BUNDLE		= EDUNET_TSEARCH_URL +"/redirect/goDetailBundle.jsp";
    //에듀넷 수업컨설팅 상세
    var REDIRECT_DETAIL_KNOW		= EDUNET_TSEARCH_URL +"/redirect/goDetailKnow.jsp";
    //에듀넷 커뮤니티 상세
    var REDIRECT_DETAIL_COMMUNITY	= EDUNET_TSEARCH_URL +"/redirect/goDetailCommunity.jsp";
    //에듀넷 자료나눔터 상세
    var REDIRECT_DETAIL_BBS			= EDUNET_TSEARCH_URL +"/redirect/goDetailBbs.jsp";
    //에듀넷 질문있어요 상세
    var REDIRECT_DETAIL_QUESTION	= EDUNET_TSEARCH_URL +"/redirect/goDetailQuestion.jsp";
    //에듀넷 논문 상세
    var REDIRECT_DETAIL_RISS		= EDUNET_TSEARCH_URL +"/redirect/goDetailRiss.jsp";
    //한국교육신문의 교육소식
    var REDIRECT_HANGYO_NEWS		= EDUNET_TSEARCH_URL +"/redirect/goHangyoNews.jsp";



	//묻고 답하기
    var REDIRECT_DETAIL_KNOWQNA		= EDUNET_TSEARCH_URL +"/redirect/goDetailKnowQna.jsp";

	//자료 나눔터
    var REDIRECT_DETAIL_KNOWPDS		= EDUNET_TSEARCH_URL +"/redirect/goDetailKnowPds.jsp";

	//현장공감
    var REDIRECT_DETAIL_KNOWFREE	= EDUNET_TSEARCH_URL +"/redirect/goDetailKnowKnowFree.jsp";


	//지식컬럼
    var REDIRECT_DETAIL_KNOWPRO		= "http://www.edunet4u.net/teacher6/community/issue.jsp";

	//오늘의 학습
    var REDIRECT_DETAIL_TODAYLEARN	= EDUNET_TSEARCH_URL +"/redirect/goDetailTodayLearn.jsp";

	//시도 소식
    var REDIRECT_DETAIL_CITYNEWS	= EDUNET_TSEARCH_URL +"/redirect/goDetailCityNews.jsp";

	//교육 행사
    var REDIRECT_DETAIL_EDUEVENT	= EDUNET_TSEARCH_URL +"/redirect/goDetailEduEvent.jsp";

	//해외 교육소식
    var REDIRECT_DETAIL_FOREIGNNEWS	= EDUNET_TSEARCH_URL +"/redirect/goDetailForeignNews.jsp";







    ////////////////////////////////////////////
    // 사용자 인증
    ////////////////////////////////////////////
    var TEACHER_LOGIN_MESSAGE	= EDUNET_URL +"/common/html/alert/popupNotLogin.html";
    var TEACHER_TEACHER_MESSAGE	= EDUNET_URL +"/common/html/alert/popupNotTeacher.html";
    var NOT_EDU_MAIL_MESSAGE    = EDUNET_MAIN_URL +"/mail/notEduMail.jsp";

    //로그인 여부
    function isLoginUser() {
    	//commonBox.jsp에 정의된 함수
        return isAuthorized();
    }

    //교사 여부
    function isTeacherUser() {
    	//commonBox.jsp에 정의된 함수
        return isTeacher();
    }

    //교사자료의 다운로드 여부
    function isDownloadUser() 
	{
        if(!isAuthorized()) 
		{
            var property = "width=286,height=167,left=200,top=200,toolbar=no,scrollbars=no";
            window.open(TEACHER_LOGIN_MESSAGE, "", property);
            return false;
        }

		if(!isTeacherUser()) 
		{
            var property = "width=286,height=167,left=200,top=200,toolbar=no,scrollbars=no";
            window.open(TEACHER_TEACHER_MESSAGE, "", property);
            return false;
        }

        return true;
    }


    ////////////////////////////////////////////
    // 텍스트 박스의 keydown 이벤트
    ////////////////////////////////////////////
    function eventKeyDown(form) {
    	var lform = document.loginForm;
    	var gform = document.globalSearchForm;

        if(event.keyCode == 13) {
            window.event.returnValue = false;
            if(gform && gform.name == form.name) {
            	doGlobalSearch();
            } else if(lform && lform.name == form.name) {
            	doLogin();
            }
        }
    }


    ////////////////////////////////////////////
    // 로그인/로그아웃
    ////////////////////////////////////////////
    //로그인
    function doLogin() {
    	var form = document.loginForm;

        if(isTextEmpty(form.user_id)) {
            alert("[아이디]을(를) 입력하십시오.");
            form.user_id.focus();
            return;
        }

        if(isTextEmpty(form.pwd)) {
            alert("[패스워드]을(를) 입력하십시오.");
            form.pwd.focus();
            return;
        }

        if(form.pwd.value.length < 4) {
            alert('패스워드는 4자 이상이어야 합니다.');
            form.pwd.focus();
            return;
        }

        form.method = "post";
        form.target = "_self";
        form.action = EDUNET_USER_URL +"/action/login/login.do";
    	form.submit();
	}

    //로그아웃
    function doLogout() {
        var pageUrl = EDUNET_SEARCH_URL +"/logout.do";
        var redirectPage = EDUNET_USER_URL +"/action/login/logout.do";
        window.top.location.href = pageUrl +"?redirectPage="+ redirectPage;
    }


    ////////////////////////////////////////////
    // 통합검색
    ////////////////////////////////////////////
    //통합검색 테스트용
    function doGlobalSearchTest(mode) {
    	var form = document.globalSearchForm;
    	form.mode.value = mode;
    	doGlobalSearch();
    }

    //통합검색
    function doGlobalSearch() {
    	var form = document.globalSearchForm;

        if(isTextEmpty(form.searchWord)) {
            alert("검색어를 입력하여 주세요.");
            form.searchWord.focus();
            return;
        }

        if(!isValidSearchWord(form.searchWord)) {
            form.searchWord.focus();
            return;
        }

		if(form.reSchYN!=null){
			if(form.reSchYN.checked){
				form.reSchYN.value="1";
			}else{
				form.reSchYN.value="0";
			}
		}

		if(form.recommand!=null){
			if(form.recommand.checked){
				form.recommand.value="1";
			}else{
				form.recommand.value="0";
			}
		}

		if(form.detailSCH!=null){
			form.detailSCH.value="";
		}
		
		if(form.searcgPlace[0].checked){
	        var searchPage = "globalSearch.do";

	        if(form.groups.value != "") {
	        	searchPage = form.groups.value +"GroupList.do";
	        }
	        //상세검색조건 초기화
			form.lvl1TypeCd.value = "";
			form.lvl2TypeCd.value = "";
			form.lvl3TypeCd.value = "";
			form.lvl1ClasCd.value = "";
			form.lvl2ClasCd.value = "";
			form.lvl3ClasCd.value = "";
			form.lvl4ClasCd.value = "";
			form.lvl5ClasCd.value = "";
			form.lvl6ClasCd.value = "";
			form.lvl7ClasCd.value = "";
			form.lvl8ClasCd.value = "";
			form.rcmdDispYn.value = "";
			form.fileTypeCd.value = "";
			form.fromDate.value   = "";
			form.toDate.value     = "";
			form.blngCityCd.value = "";

	        //ecrm 콘텐츠 코드
	        var contentCode = getContentCode(searchPage);
	        form.org_cd.value = contentCode.ORG_CD;
	        form.data_no.value = contentCode.DATA_NO;
	        form.seq_no.value = contentCode.SEQ_NO;

	        form.action = "/tsearch/"+searchPage;
	        form.target = "_self";
	        form.method = "get";
			form.submit();
		}else if(form.searcgPlace[1].checked){
			var url = "http://www.edunet4u.net/tsearch/redirect/goKnowledge.jsp?search_word="+form.searchWord.value;
			var property = "status=1,resizable=1,scrollbars=1,toolbar=1,directories=0,titlebar=1,maxbutton=1,location=1,menubar=1";
			var win = window.open(url, "win", property);
			win.focus();
			return;
		}else if(form.searcgPlace[2].checked){
			//ecrm 콘텐츠 코드
	        var contentCode = getContentCode("globalSearchList.jsp");
	        form.org_cd.value = contentCode.ORG_CD;
	        form.data_no.value = contentCode.DATA_NO;
	        form.seq_no.value = contentCode.SEQ_NO;

			var url = "/tsearch/jsp/mashup/globalSearchList.jsp";
			form.action = url;
			form.keyword.value= form.searchWord.value;
	        form.target = "_self";
	        form.method = "get";
			form.submit();
		}
    }

    //전체 링크
    function doGlobalSearchLink() {
    	var form = document.globalSearchForm;

        if(isTextEmpty(form.searchWord)) {
            alert("검색어를 입력하여 주세요");
            form.searchWord.focus();
            return;
        }

        if(!isValidSearchWord(form.searchWord)) {
            form.searchWord.focus();
            return;
        }

		if(form.reSchYN!=null){
			if(form.reSchYN.checked){
				form.reSchYN.value="1";
			}else{
				form.reSchYN.value="0";
			}
		}

		if(form.recommand!=null){
			if(form.recommand.checked){
				form.recommand.value="1";
			}else{
				form.recommand.value="0";
			}
		}

	        var searchPage = "globalSearch.do";


	        //ecrm 콘텐츠 코드
	        var contentCode = getContentCode(searchPage);
	        form.org_cd.value = contentCode.ORG_CD;
	        form.data_no.value = contentCode.DATA_NO;
	        form.seq_no.value = contentCode.SEQ_NO;
	        form.groups.value = "";

			if(form.reSchYN.value==0){
				form.reSchYN.value="1";
			}else{
				form.reSchYN.value="0";
			}
	        
	        form.action = searchPage;
	        form.target = "_self";
	        form.method = "get";
			form.submit();
    }

    function doGlobalSearchDetail() {

    	var form = document.detailSearchForm;

        if(isTextEmpty(form.searchWord)) {
            alert("검색어를 입력하여 주세요");
            form.searchWord.focus();
            return;
        }

        if(!isValidSearchWord(form.searchWord)) {
            form.searchWord.focus();
            return;
        }

		if(form.reSchYN!=null){
			if(form.reSchYN.checked){
				form.reSchYN.value="1";
			}else{
				form.reSchYN.value="0";
			}
		}

		if(form.recommand!=null){
			if(form.recommand.checked){
				form.recommand.value="1";
			}else{
				form.recommand.value="0";
			}
		}

//		if(form.searcgPlace[0].checked){
	        var searchPage = "globalSearch.do";
//	        if(form.groups.value != "") {
//	        	searchPage = form.groups.value +"List.do";
//	        }

		//상세검색파라메터
		/*
			form.lvl1TypeCd.value = detailForm.lvl1TypeCd.value;
			form.lvl2TypeCd.value = detailForm.lvl2TypeCd.value;
			form.lvl3TypeCd.value = detailForm.lvl3TypeCd.value;
			form.lvl1ClasCd.value = detailForm.lvl1ClasCd.value;
			form.lvl2ClasCd.value = detailForm.lvl2ClasCd.value;
			form.lvl3ClasCd.value = detailForm.lvl3ClasCd.value;
			form.lvl4ClasCd.value = detailForm.lvl4ClasCd.value;
			form.lvl5ClasCd.value = detailForm.lvl5ClasCd.value;
			form.lvl6ClasCd.value = detailForm.lvl6ClasCd.value;
			form.lvl7ClasCd.value = detailForm.lvl7ClasCd.value;
			form.lvl8ClasCd.value = detailForm.lvl8ClasCd.value;
			form.rcmdDispYn.value = detailForm.rcmdDispYn.value;
			form.fileTypeCd.value = detailForm.fileTypeCd.value;
			form.fromDate.value   = detailForm.fromDate.value;
			form.toDate.value     = detailForm.toDate.value;
			form.blngCityCd.value = detailForm.blngCityCd.value;
			*/
		//상세검색여부
			form.detailSCH.value="1";

	        //ecrm 콘텐츠 코드
	        var contentCode = getContentCode(searchPage);
	        form.org_cd.value = contentCode.ORG_CD;
	        form.data_no.value = contentCode.DATA_NO;
	        form.seq_no.value = contentCode.SEQ_NO;

	        //form.action = searchPage;
	        //form.target = "_blank";
	        //form.method = "get";
			form.submit();

//		}else{
//			var url = "http://kem2.edunet4u.net:8085/ksearch/redirect/goKnowledge.jsp?search_word="+form.searchWord.value;
//			var property = "status=1,resizable=1,scrollbars=1,toolbar=1,directories=0,titlebar=1,maxbutton=1,location=1,menubar=1";
//			var win = window.open(url, "win", property);
//			win.focus();
//			return;
//		}
    }

    function doGlobalSearch2() {
    	var form = document.globalSearchForm;
        if(isTextEmpty(form.searchWord)) {
            alert("검색어를 입력하여 주세요");
            form.searchWord.focus();
            return;
        }

        if(!isValidSearchWord(form.searchWord)) {
            form.searchWord.focus();
            return;
        }

        var searchPage = "globalSearch.do";
        if(form.groups.value != "") {
        	searchPage = form.groups.value +"GroupList.do";
        }

        //form.search_re.value="Y";

        //ecrm 콘텐츠 코드
        var contentCode = getContentCode(searchPage);
        form.org_cd.value = contentCode.ORG_CD;
        form.data_no.value = contentCode.DATA_NO;
        form.seq_no.value = contentCode.SEQ_NO;

        form.action = searchPage;
        form.target = "_self";
        form.method = "get";
		form.submit();
    }


    //그룹 검색 cjk20060222 ins
    function doGroupSearch() {
    	var form = document.groupSearchForm;
    	/*
        if(isTextEmpty(document.globalSearchForm.searchWord))
        {
            alert("검색어를 입력하여 주세요");
            document.globalSearchForm.searchWord.focus();
            return;
        }

        if(!isValidSearchWord(document.globalSearchForm.searchWord))
        {
            document.globalSearchForm.searchWord.focus();
            return;
        }
        */


		var searchPage = "";
		if(form.groupcategory.value=="") 
		{
			searchPage = form.groups.value +"GroupList.do";
		}else
		{
			if("newsList"==form.groupcategory.value)
			{
				searchPage = "newsList.do";
			}
			else if(
					"lessonData"==form.groupcategory.value ||
					"lessonEst"==form.groupcategory.value ||
					"knowExch"==form.groupcategory.value ||
					"ictEdu"==form.groupcategory.value ||
					"researchAct"==form.groupcategory.value ||
					"teacherDev"==form.groupcategory.value ||
					"classMng"==form.groupcategory.value ||
					"eduTrend"==form.groupcategory.value ||
					"etc"==form.groupcategory.value ||
					"inbroad"==form.groupcategory.value ||
					"simfile"==form.groupcategory.value ||
					"educafe"==form.groupcategory.value)
			{
				searchPage = form.groupcategory.value +"GroupList.do";
			}
			else
			{
				searchPage = form.groupcategory.value +"List.do";
			}
		}


		/*
        if(document.globalSearchForm.groups.value != "")
        {
        	searchPage = document.globalSearchForm.groups.value +"List.do";
        }else if(form.groupcategory.value == "detail")
        {
        	searchPage = "detailSearch.do";
        }
		*/

        //ecrm 콘텐츠 코드
        var contentCode = getContentCode(searchPage);
        form.org_cd.value = contentCode.ORG_CD;
        form.data_no.value = contentCode.DATA_NO;
        form.seq_no.value = contentCode.SEQ_NO;

		form.contentType.value = "";
        form.action = searchPage;
		form.target = "_self";
        form.method = "get";
		form.submit();
    }

//결과 더 보기 isFrame값을 넘겨주기 위해 생성(20070919)
	function doGroupSearch_more() {
    	var form = document.groupSearchForm;
		var searchPage = "";
		if(form.groupcategory.value=="") 
		{
			searchPage = form.groups.value +"GroupList.do";
		}else
		{
			if("newsList"==form.groupcategory.value)
			{
				searchPage = "newsList.do";
			}
			else if(
					"lessonData"==form.groupcategory.value ||
					"lessonEst"==form.groupcategory.value ||
					"knowExch"==form.groupcategory.value ||
					"ictEdu"==form.groupcategory.value ||
					"researchAct"==form.groupcategory.value ||
					"teacherDev"==form.groupcategory.value ||
					"classMng"==form.groupcategory.value ||
					"eduTrend"==form.groupcategory.value ||
					"etc"==form.groupcategory.value ||
					"simfile"==form.groupcategory.value ||
					"educafe"==form.groupcategory.value)
			{
				searchPage = form.groupcategory.value +"GroupList.do";
			}
			else
			{
				searchPage = form.groupcategory.value +"List.do";
			}
		}

		//ecrm 콘텐츠 코드
        var contentCode = getContentCode(searchPage);
        form.org_cd.value = contentCode.ORG_CD;
        form.data_no.value = contentCode.DATA_NO;
        form.seq_no.value = contentCode.SEQ_NO;

		form.contentType.value = "";
        form.action = searchPage;
		if (form.isFrame.value == "y"){
			form.target = "_blank";
		}else {
		form.target = "_self";
		}
        form.method = "get";
		form.submit();
    }


    //그룹 검색 cjk20060222 ins
    function doGroupSearchDatil() {
    	var form = document.globalSearchForm;


        if(isTextEmpty(document.globalSearchForm.searchWord))
        {
            alert("검색어를 입력하여 주세요");
            document.globalSearchForm.searchWord.focus();
            return;
        }

        if(!isValidSearchWord(document.globalSearchForm.searchWord))
        {
            document.globalSearchForm.searchWord.focus();
            return;
        }
        var searchPage = "groupSearch.do";
        if(document.globalSearchForm.groupcategory.value != "")
        {
        	searchPage = document.globalSearchForm.groupcategory.value +"List.do";
        }

        //ecrm 콘텐츠 코드
        var contentCode = getContentCode(searchPage);
        form.org_cd.value = contentCode.ORG_CD;
        form.data_no.value = contentCode.DATA_NO;
        form.seq_no.value = contentCode.SEQ_NO;

        form.search_re.value="Y";
        form.action = searchPage;
        form.target = "_self";
        form.method = "get";
		form.submit();
    }



	//더 많은 결과 보기
	function doMoreSearch(groups) {

		var form = document.groupSearchForm;
		form.groups.value = groups;
		form.groupcategory.value = "";
		 doGroupSearch_more();
	}


	//카테고리 링크
	function goCategory(groups) {
		var form = document.groupSearchForm;
		form.groups.value = groups;

		form.groupcategory.value = "";
		if(form.GROUP01!=null) {
			form.GROUP01.value="";
			form.GROUP02.value="";
			form.GROUP03.value="";
			form.GROUP04.value="";
			form.GROUP05.value="";
		}


		 doGroupSearch();
	}

	//서브 카테고리 링크
	function goSubCategory(groups,groupcategory) {
		var form = document.groupSearchForm;

		form.groups.value = groups;
		if(form.GROUP01!=null) {
			form.GROUP01.value="";
			form.GROUP02.value="";
			form.GROUP03.value="";
			form.GROUP04.value="";
			form.GROUP05.value="";
		}


		form.groupcategory.value = groupcategory;
		 doGroupSearch();
	}










	//globalSearch 에서 정렬 순서
	function doSortSpecGlobalSearch(sortSpec) {
		var form = document.globalSearchForm;
		form.sortSpec.value = sortSpec;
		 doGlobalSearch();

	}

	//groupSearch 에서 정렬 순서
	function doSortSpecGroupSearch(sortSpec) {
		var form = document.groupSearchForm;
		form.sortSpec.value = sortSpec;
		 doGroupSearch();
	}






    //검색어를 지정하여 검색
    function doGlobalSearchByKeyword(searchWord) {
    	var form = document.globalSearchForm;
    	form.groups.value = "";
        form.searchWord.value = searchWord;
        doGlobalSearch();
    }

    //카테고리를 지정하여 검색
    function doGlobalSearchByCategory(groups) {
    	var form = document.globalSearchForm;
        form.groups.value = groups;
        form.groupcategory.value = "";
        doGlobalSearch();
    }

	function doGlobalSearchByCategory2(groups) {
    	var form = document.globalSearchForm;
        form.groups.value = groups;
        form.groupcategory.value = "";
        doGlobalSearch2();
    }

    function doCatagorySearchByCategory(groups,category) {
    	var form = document.globalSearchForm;
        form.groups.value = groups;
        form.groupcategory.value = category;
        doGroupSearchDatil();
    }

	// 2006.07.13, SKC&C 김건우
    // 정렬순서 변경
    function changeSortSpecGroup(sortSpec) {
    	var form = document.groupSearchForm;
        form.sortSpec.value = sortSpec;
        form.pageNumber.value = 1;
        doGroupSearch();
    }


    ////////////////////////////////////////////
    // 유사문서 검색 (similaritySearchForm)
    ////////////////////////////////////////////
    //유사문서 검색
    function doSimilaritySearch(vdkVgwKey, title) {
    	var form = document.similaritySearchForm;

        form.vdkVgwKey.value = vdkVgwKey;
        form.title.value = title;

        var searchPage = "similaritySearch.do";

        //ecrm 콘텐츠 코드
        var contentCode = getContentCode(searchPage);
        form.org_cd.value = contentCode.ORG_CD;
        form.data_no.value = contentCode.DATA_NO;
        form.seq_no.value = contentCode.SEQ_NO;

        form.action = searchPage;
        form.target = "_new";
        form.method = "get";
        form.submit();
    }


    ////////////////////////////////////////////
    // 유사문서 검색 (similaritySearchForm)
    ////////////////////////////////////////////
    //상세검색 실행
    function detailSearch() {

        var form = document.detailSearchForm;
        var par_form= opener.globalSearchForm;

        if(isTextEmpty(form.searchWord)) {
            alert("검색어를 입력하여 주세요");
            form.searchWord.focus();
            return;
        }

        if(!isValidSearchWord(form.searchWord)) {
            form.searchWord.focus();
            return;
        }

        var searchPage = "detailSearch.do";
        //var searchPage = "groupSearch.do";
        //ecrm 콘텐츠 코드
        var contentCode = getContentCode(searchPage);
        par_form.org_cd.value = contentCode.ORG_CD;
        par_form.data_no.value = contentCode.DATA_NO;
        par_form.seq_no.value = contentCode.SEQ_NO;
        //파라메터
        par_form.reSchYN.value = "";
        par_form.groupcategory.value="detail";
		par_form.mode.value          = form.mode.value         ;
		par_form.channel.value       = form.channel.value      ;
		par_form.category.value      = form.category.value     ;
		par_form.clasDivType.value   = "3"  ;
		par_form.lvl1TypeCd.value = form.lvl1TypeCd.value;
		par_form.lvl2TypeCd.value = form.lvl2TypeCd.value;
		par_form.lvl3TypeCd.value = form.lvl3TypeCd.value;
		par_form.lvl1ClasCd.value = form.lvl1ClasCd.value;
		par_form.lvl2ClasCd.value = form.lvl2ClasCd.value;
		par_form.lvl3ClasCd.value = form.lvl3ClasCd.value;
		par_form.lvl4ClasCd.value = form.lvl4ClasCd.value;
		par_form.lvl5ClasCd.value = form.lvl5ClasCd.value;
		par_form.lvl6ClasCd.value = form.lvl6ClasCd.value;
		par_form.lvl7ClasCd.value = form.lvl7ClasCd.value;
		par_form.lvl8ClasCd.value = form.lvl8ClasCd.value;
		par_form.rcmdDispYn.value = form.rcmdDispYn.value;
		par_form.fileTypeCd.value = form.fileTypeCd.value;
		par_form.fromDate.value   = form.fromDate.value;
		par_form.toDate.value     = form.toDate.value;
		par_form.blngCityCd.value = form.blngCityCd.value;



        par_form.action = searchPage;
        par_form.target = "_self";
        par_form.method = "get";
        par_form.submit();

    }

    ////////////////////////////////////////////
    // 카테고리 검색 (categorySearchForm)
    ////////////////////////////////////////////
    //카테고리 검색
    function doCategorySearch() {
    	var form = document.groupSearchForm;
        form.contentType.value = "";
		var searchPage = "";
		if(form.groupcategory.value=="") {
			searchPage = form.groups.value +"GroupList.do";
		}
		//community 추가(2007.06.19)
		else if(
				"lessonData"==form.groupcategory.value ||
				"lessonEst"==form.groupcategory.value ||
				"knowExch"==form.groupcategory.value ||
				"ictEdu"==form.groupcategory.value ||
				"researchAct"==form.groupcategory.value ||
				"teacherDev"==form.groupcategory.value ||
				"classMng"==form.groupcategory.value ||
				"eduTrend"==form.groupcategory.value ||
				"community"==form.groupcategory.value ||
				"etc"==form.groupcategory.value ||
				"inbroad"==form.groupcategory.value ||
				"simfile"==form.groupcategory.value ||
				"educafe"==form.groupcategory.value)
		{
			searchPage = form.groupcategory.value +"GroupList.do";
		}
		else{
			searchPage = form.groupcategory.value +"List.do";
		}
        //ecrm 콘텐츠 코드
        var contentCode = getContentCode(searchPage);
        form.org_cd.value = contentCode.ORG_CD;
        form.data_no.value = contentCode.DATA_NO;
        form.seq_no.value = contentCode.SEQ_NO;
        form.action = searchPage;
        form.target = "_self";
        form.method = "get";
        form.submit();
    }


    //파일유형 변경
    function changeFileType() {
    	var form = document.categorySearchForm;
        form.pageNumber.value = 1;
        doCategorySearch();
    }

    //자료유형 변경
    function changeDataType() {
    	var form = document.categorySearchForm;
        form.pageNumber.value = 1;
        doCategorySearch();
    }

    //정렬순서 변경
    function changeSortSpec(sortSpec) {
    	var form = document.categorySearchForm;
        form.sortSpec.value = sortSpec;
        form.pageNumber.value = 1;
        doCategorySearch();
    }

    //페이지 번호 변경
    function changePageNumber(page) {
    	var form = document.groupSearchForm;

    	form.search_re.value="N";
        form.pageNumber.value = page;
        doCategorySearch();
    }

    function detailChangePageNumber(page) {
    	var form = document.groupSearchForm;

    	form.search_re.value="N";
        form.pageNumber.value = page;

        var searchPage = "detailSearch.do";

        form.action = searchPage;
        form.target = "_self";
        form.method = "get";
        form.submit();
    }

    function groupChangePageNumber(page) 
	{
    	var form = document.groupSearchForm;
   		form.search_re.value="N";
       	form.pageNumber.value = page;
        doGroupSearch();
    }

    //페이지 크기 변경
    function changePageSize() {
    	var form = document.groupSearchForm;
        form.pageNumber.value = 1;
        doGroupSearch();
    }

    //분류구분 변경
    function changeGroup(group01, group02, group03, group04, group05) {
    	var form = document.categorySearchForm;
    	if(group01) { form.GROUP01.value = group01; } else { form.GROUP01.value = ""; }
    	if(group02) { form.GROUP02.value = group02; } else { form.GROUP02.value = ""; }
    	if(group03) { form.GROUP03.value = group03; } else { form.GROUP03.value = ""; }
    	if(group04) { form.GROUP04.value = group04; } else { form.GROUP04.value = ""; }
    	if(group05) { form.GROUP05.value = group05; } else { form.GROUP05.value = ""; }
        form.pageNumber.value = 1;
        doCategorySearch();
    }

    //Selector 변경
    function changeSelector(gubun) {

    	var form = document.groupSearchForm;
    		form.selector_level.value=gubun;
    		form.search_re.value="Y";
        form.action = "changeSelector.do";

        form.target = "nobody";
        form.method = "get";
        form.submit();
    }

    //ContentType 변경
    function changeContentType(contentType) {
    	var form = document.groupSearchForm;
        form.contentType.value = contentType;
        form.pageNumber.value = 1;

        var searchPage = "groupSearch.do";
        if(form.groupcategory.value != "")
        {
        	searchPage = form.groupcategory.value +"List.do";
        }else
        {
        	searchPage = form.groups.value + "List.do";
        }

        form.action = searchPage;
        form.target = "nobody";
        form.method = "get";

        if(contentType == "xml") {
			copyClip(rssUrl);
        } else {
        	form.submit();
        }
    }
    //groupContentType 변경
    function groupContentType(contentType) {
    	var form = document.groupSearchForm;


        var searchPage = "groupSearch.do";


        if(form.groupcategory.value != "")
        {
        	if(form.groupcategory.value == "detail")
        	{
        		searchPage = "detailSearch.do";
        	}else
        	{
        		searchPage = form.groupcategory.value +"List.do";
        	}
        }else
        {
        	if(form.groupcategory.value == "detail")
        	{
        		searchPage = "detailSearch.do";
        	}else
        	{
        		searchPage = form.groups.value +"List.do";
        	}
        }

        form.contentType.value = contentType;
        form.pageNumber.value = 1;
        form.action = searchPage;
        form.target = "nobody";
        form.method = "get";

        if(contentType == "xml") {
			copyClip(rssUrl);
        } else {
        	form.submit();
        }
    }


    ////////////////////////////////////////////
    // 파일다운로드
    ////////////////////////////////////////////
    //파일 미리보기
    function doPreview(orgCd, dataNo, seqNo, isTeacherData,keyword,k2dockey) {
        if(keyword != null && k2dockey != null) {
            var img = new Image();
            img.src = "/tsearch/jsp/common/recommendTX.jsp?keyword="+keyword+"&k2dockey="+k2dockey;
        }
        doDownloadProcess(orgCd, dataNo, seqNo, isTeacherData, "preview");
    }

    //파일 다운로드
	/*
    function doDownload(orgCd, dataNo, seqNo, isTeacherData, action,keyword,k2dockey) {
        if(keyword != null && k2dockey != null) {
            var img = new Image();
            img.src = "/tsearch/jsp/common/recommendTX.jsp?keyword="+keyword+"&k2dockey="+k2dockey;
        }
        doDownloadProcess(orgCd, dataNo, seqNo, isTeacherData, action);
    }
	*/
	function doDownload(orgCd, dataNo, seqNo, isTeacherData, action, keyword,k2dockey,user) {

		if (user == '')
		{
			if(confirm("다운로드 서비스는 로그인을 하셔야 합니다!\n로그인 하시겠습니까?"))
			{
				//document.location.href="http://www.edunet4u.net/user/action/login/teachergoLogin.do?returnUrl="+document.location;
				window.document.location.href="http://www.edunet4u.net/user/action/login/goLogin.do?returnUrl="+document.location;
				return;
			}
			else
			{
				return;
			}

		}

        if(keyword != null && k2dockey != null ) {
            var img = new Image();
            img.src = "/tsearch/jsp/common/recommendTX.jsp?keyword="+keyword+"&k2dockey="+k2dockey;
        }
        doDownloadProcess(orgCd, dataNo, seqNo, isTeacherData, action);
    }


    //파일 다운로드 - 저장
    function doDownloadSave(orgCd, dataNo, seqNo, isTeacherData, action,user) {

		if (user == '')
		{
			if(confirm("다운로드 서비스는 로그인을 하셔야 합니다!\n로그인 하시겠습니까?"))
			{
				document.location.href="http://www.edunet4u.net/user/action/login/teachergoLogin.do?returnUrl="+document.location;
				return;
			}
			else
			{
				return;
			}
		}

        if(!action) {
            action = "save";
        }

        doDownloadProcess(orgCd, dataNo, seqNo, isTeacherData, action);
    }

    //파일 다운로드 - 열기
    function doDownloadOpen(orgCd, dataNo, seqNo, isTeacherData, action,user) {

		if (user == '')
		{
			if(confirm("다운로드 서비스는 로그인을 하셔야 합니다!\n로그인 하시겠습니까?"))
			{
				document.location.href="http://www.edunet4u.net/user/action/login/teachergoLogin.do?returnUrl="+document.location;
				return;
			}
			else
			{
				return;
			}
		}

        if(!action) {
            action = "open";
        }

        doDownloadProcess(orgCd, dataNo, seqNo, isTeacherData, action);
    }

    /**
     * 공통모듈 다운로드 호출
     * orgCd          : 기관코드
     * dataNo         : 자료번호
     * seqNo          : 파일 일련번호
     * isTeacherData  : 교사자료여부
     * action         : save(저장), open(열기, 기본 윈도우), preview(열기, 미리보기 윈도우)
     */
    function doDownloadProcess(orgCd, dataNo, seqNo, isTeacherData, action) {
        if(isTeacherData) 
		{
            if(!isDownloadUser()) 
			{
            	/*
                if(window.clientMode && window.clientMode == "RssReader") {
                    var returnUrl = EDUNET_SEARCH_URL +"/jsp/common/sessionCreate.jsp?requestUrl="+ EDUNET_SEARCH_URL +"/metaData.do&requestQry=orgCd="+ orgCd +"&dataNo="+ dataNo;
                    window.location.href = EDUNET_USER_URL +"/action/login/goLogin.do?returnUrl="+ returnUrl;
                    return;
                } else {
                    return;
                }
                */
                return;
            }
        }

        //var downloadPage =  EDUNET_DOWNLOAD_URL +"?orgCd="+ orgCd +"&dataNo="+ dataNo +"&seqNo="+ seqNo;
		var downloadPage =  EDUNET_DOWNLOAD_URL +"?orgCd="+ orgCd +"&dataNo="+ dataNo +"&seqNo="+ seqNo + "&downLoadUserid=" + DOWNLOAD_USERID + "&downLoadLocation=" + DOWNLOAD_LOCATION + "&progId=TSEARCH";
        var windowsProps = "status=0,resizable=0,scrollbars=0,toolbar=0,directories=0,titlebar=0,width=800,height=600,left=100,top=100,maxbutton=0";

        //저장
        if(action == "save") {
            downloadPage += "&command=save";
            location.href = downloadPage;

        //열기, 기본 윈도우 창에서 열기
        } else if(action == "open") {
            downloadPage += "&command=redirect";
            window.open(downloadPage, "", "");

        //열기, 미리보기 윈도우 창에서 열기
        } else if(action == "preview") {
            //downloadPage += "&command=redirect";
            downloadPage += "&command=open&openUrl=/servlet/fileOpen.jsp";
            window.open(downloadPage, "", windowsProps);

        //열기, 특정 페이지에서 열기
        } else {
            downloadPage += "&command=open&openUrl="+ EDUNET_SEARCH_URL +"/common/fileOpen.jsp";
            window.open(downloadPage, "", windowsProps);
        }
    }


    ////////////////////////////////////////////
    // 상세 페이지 이동
    ////////////////////////////////////////////

    //상세보기
   function doPopupMetaData(orgCd, dataNo, categoryName, channel_search,keyword,k2dockey) {
		
		var category = "";
		if(categoryName == "멀티미디어요소자료"){
			category = "curriculum" ;
		}else if(categoryName == "교수용SW"){
			category = "software" ;
		}else if(categoryName == "꾸러미 자료"){
			category = "bundle" ;
		}else if(categoryName == "교수학습 과정안"){
			category = "process" ;
		}else if(categoryName == "전자교과서"){
			category = "etextbook" ;
		}else if(categoryName == "사이버가정학습"){
			category = "cyberStudy" ;
		}else if(categoryName == "수준별 수업자료"){
			category = "levelStudy" ;
		}else if(categoryName == "동영상수업자료"){
			category = "inbroad" ;
		}else if(categoryName == "특별재량활동자료"){
			category = "specialList" ;
		}else if(categoryName == "학습백과사전"){
			category = "britannica" ;
		}else if(categoryName == "교육평가이해"){
			category = "lessonEst" ;
		}else if(categoryName == "묻고 답하기"){
			category = "knowQna" ;
		}else if(categoryName == "자료나눔터"){
			category = "knowPds" ;
		}else if(categoryName == "ICT모형"){
			category = "ictEdu" ;
		}else if(categoryName == "교과교육연구회"){
			category = "researchAct" ;
		}else if(categoryName == "연구대회"){
			category = "researchAct" ;
		}else if(categoryName == "연구학교"){
			category = "researchAct" ;
		}else if(categoryName == "교육정보화연수"){
			category = "teacherDev" ;
		}else if(categoryName == "연수"){
			category = "teacherDev" ;
		}else if(categoryName == "연수원"){
			category = "teacherDev" ;
		}else if(categoryName == "생활지도"){
			category = "classMng" ;
		}else if(categoryName == "오늘의학습"){
			category = "classMng" ;
		}else if(categoryName == "학교운영"){
			category = "classMng" ;
		}else if(categoryName == "해외교육정책"){
			category = "eduTrend" ;
		}else if(categoryName == "KERIS연구보고서"){
			category = "eduTrend" ;
		}else if(categoryName == "시도소식"){
			category = "eduTrend" ;
		}else if(categoryName == "언론보도"){
			category = "eduTrend" ;
		}else if(categoryName == "해외교육소식"){
			category = "eduTrend" ;
		}else if(categoryName == "계간에듀넷"){
			category = "eduTrend" ;
		}else if(categoryName == "교육행사"){
			category = "eduTrend" ;
		}else if(categoryName == "교과연계도서자료"){
			category = "courseBook" ;
		}else if(categoryName == "학습참고자료"){
			category = "etc" ;
		}else if(categoryName == "수업자료" | categoryName == "지역학습자료" ){
			category = "etc" ;
		}else if(categoryName == "장학"){
			category = "etc" ;
		}

        //ecrm 콘텐츠 코드

		var contentQuery = getContentQuery("metaData.do");
	    var url = "metaData.do?orgCd="+orgCd+"&dataNo="+dataNo+"&"+contentQuery+"&category="+category+"&channel_search="+channel_search+"&keyword="+keyword+"&k2dockey="+k2dockey;		
	    var left = (screen.width-550)/2;
	    var top  = (screen.height-600)/2;
	    var property = "toolbar=0,location=no,directories=0,status=0,menubar=0,scrollbars=1,resizable=0,width=537,height=550,left="+left+",top="+top+",maxbutton=0";
	    var metaData = window.open(url, "metaData", property);
        metaData.focus();

	}

    //교육뉴스 더보기
    function doPopupEduNews(orgCd, dataNo) {
        //ecrm 콘텐츠 코드
        var contentQuery = getContentQuery("metaData.do");

	    var url = "metaData.do?orgCd="+orgCd+"&dataNo="+dataNo+"&category=news&"+contentQuery;
	    var left = (screen.width-550)/2;
	    var top  = (screen.height-600)/2;
	    var property = "toolbar=0,location=no,directories=0,status=0,menubar=0,scrollbars=1,resizable=0,width=517,height=517,left="+left+",top="+top+",maxbutton=0";
	    var latestNews = window.open(url, "latestNews", property);
        latestNews.focus();
    }

    //상세보기
	function doMetaData(orgCd, dataNo) {
        //ecrm 콘텐츠 코드
        var contentQuery = getContentQuery("metaData.do");

	    var url = "metaData.do?orgCd="+orgCd+"&dataNo="+dataNo+"&"+contentQuery;
	    var property = "";
	    var metaData = window.open(url, "metaData", property);
        metaData.focus();
	}

    //추천하기
    function doPopupRecommend(orgCd, dataNo, isTeacherData,docAvg) {

			if(isTeacherData) {
            if(!isDownloadUser()) {
                return;
            }
        }

        //ecrm 콘텐츠 코드
        var contentQuery = getContentQuery("recommend.do");

        var url = "recommend.do?orgCd="+orgCd+"&dataNo="+dataNo+"&"+contentQuery+"&docAvg="+docAvg;
        var left = (screen.width - 250)/2;
        var top  = (screen.height - 250)/2;
        var property = "status=0,resizable=0,scrollbars=0,toolbar=0,directories=0,titlebar=0,width=280,height=310,,left="+left+",top="+top+",maxbutton=0";
        var recommend = window.open(url, "recommend", property);
        recommend.focus();
    }

    //꾸러미 상세보기
    function doPopupBundle(pbiNo, orgCd, dataNo, lvl1ClasCd, lvl2ClasCd, lvl3ClasCd, lvl4ClasCd, lvl6ClasCd) {
        if(!isDownloadUser()) {
            return;
        }

        //ecrm 콘텐츠 코드
        var idx = REDIRECT_DETAIL_BUNDLE.lastIndexOf("/");
        var searchPage = REDIRECT_DETAIL_BUNDLE.substring(idx + 1, REDIRECT_DETAIL_BUNDLE.length);
        var contentQuery = getContentQuery(searchPage);

        var url = REDIRECT_DETAIL_BUNDLE +"?p_pbiNo="+ pbiNo +"&p_orgCd="+ orgCd +"&p_dataNo="+ dataNo +"&p_currPage=1&p_startPage=1&"+ "lvl1="+ lvl1ClasCd +"&lvl2="+ lvl2ClasCd +"&lvl3="+ lvl3ClasCd +"&lvl4="+ lvl4ClasCd +"&lvl5="+ lvl6ClasCd +"&p_searchWord=&"+contentQuery;
        var property = "status=1,resizable=1,scrollbars=1,toolbar=1,directories=0,titlebar=1,maxbutton=1,location=1,menubar=1";
        var kms = window.open(url, "kms", property);
        kms.focus();
    }

    //사이버선생님 상세보기
	function doPopupQuestion(tid) {
        //ecrm 콘텐츠 코드
        var idx = REDIRECT_DETAIL_QUESTION.lastIndexOf("/");
        var searchPage = REDIRECT_DETAIL_QUESTION.substring(idx + 1, REDIRECT_DETAIL_QUESTION.length);
        var contentQuery = getContentQuery(searchPage);

        var url = REDIRECT_DETAIL_QUESTION +"?tid="+tid+"&"+contentQuery;
        var property = "status=1,resizable=1,scrollbars=1,toolbar=1,directories=0,titlebar=1,maxbutton=1,location=1,menubar=1";
        var question = window.open(url, "question", property);
        question.focus();
    }

    //수업컨설팅 상세보기
    function doPopupKnow(k2dockey, serviceType, categoryId, msgId) {
        if(!isDownloadUser()) {
            return;
        }

        //ecrm 콘텐츠 코드
        var idx = REDIRECT_DETAIL_KNOW.lastIndexOf("/");
        var searchPage = REDIRECT_DETAIL_KNOW.substring(idx + 1, REDIRECT_DETAIL_KNOW.length);
        var contentQuery = getContentQuery(searchPage);

        var url = REDIRECT_DETAIL_KNOW +"?k2dockey="+ k2dockey +"&serviceType="+ serviceType +"&categoryId="+ categoryId +"&msgId="+ msgId+"&"+contentQuery;
        var property = "status=1,resizable=1,scrollbars=1,toolbar=1,directories=0,titlebar=1,maxbutton=1,location=1,menubar=1";
        var know = window.open(url, "know", property);
        know.focus();
    }

    //커뮤니티 상세보기
    function doPopupCommunity(nickid) {
        //ecrm 콘텐츠 코드
        var idx = REDIRECT_DETAIL_COMMUNITY.lastIndexOf("/");
        var searchPage = REDIRECT_DETAIL_COMMUNITY.substring(idx + 1, REDIRECT_DETAIL_COMMUNITY.length);
        var contentQuery = getContentQuery(searchPage);

        var url = REDIRECT_DETAIL_COMMUNITY +"?nickid="+nickid+"&"+contentQuery;
        var property = "status=1,resizable=1,scrollbars=1,toolbar=1,directories=0,titlebar=1,maxbutton=1,location=1,menubar=1";
        var community = window.open(url, "community", property);
        community.focus();
    }
	
	//  08.03.24 에듀카페 상세보기
    function doPopupEducafe(cafeId,categoryId,postId) {
        
        var url = EDUNET_EDUCAFE_URL+"?cafeId="+cafeId+"&categoryId="+categoryId+"&postId="+postId;
        var property = "status=1,resizable=1,scrollbars=1,toolbar=1,directories=0,titlebar=1,maxbutton=1,location=1,menubar=1";
        //var eduni = window.open(url, "eduni", property);
		var educafe = window.open(url, "educafe", property);
        educafe.focus();  
    } 



/*
 *	소스안에  org_cd 부분을 받아서 바꿔주면 됩니다.
 * var contentQuery = "org_cd=KNWZ001003& ....
 * ################## 여기서 부터 ###########################
 **/



	//묻고 답하기 상세 보기
    function doPopupKnowQna(p_list_category_id,p_msg_id) {
        //묻고 답하기
        var idx = REDIRECT_DETAIL_KNOWQNA.lastIndexOf("/");
        var searchPage = REDIRECT_DETAIL_KNOWQNA.substring(idx + 1, REDIRECT_DETAIL_KNOWQNA.length);

		//var contentQuery = getContentQuery(searchPage);

		var contentQuery = "org_cd=KNWZ001003&data_no="+ p_msg_id +"&seq_no=1";


        var url = REDIRECT_DETAIL_KNOWQNA +"?p_list_category_id="+p_list_category_id+"&p_msg_id=" +p_msg_id + "&"+contentQuery;
        var property = "status=1,resizable=1,scrollbars=1,toolbar=1,directories=0,titlebar=1,maxbutton=1,location=1,menubar=1";
        var knowqna = window.open(url, "knowqna", property);
        knowqna.focus();
    }


	//지식나눔터  상세 보기
    function doPopupKnowPds(boardName,messageNumber) {
        //지식나눔터
        var idx = REDIRECT_DETAIL_KNOWPDS.lastIndexOf("/");
        var searchPage = REDIRECT_DETAIL_KNOWPDS.substring(idx + 1, REDIRECT_DETAIL_KNOWPDS.length);

		//var contentQuery = getContentQuery(searchPage);
		var contentQuery = "org_cd=KNWZ001003&data_no="+ messageNumber +"&seq_no=1";


        var url = REDIRECT_DETAIL_KNOWPDS +"?boardName="+boardName+"&messageNumber=" +messageNumber + "&"+contentQuery;
        var property = "status=1,resizable=1,scrollbars=1,toolbar=1,directories=0,titlebar=1,maxbutton=1,location=1,menubar=1";
        var knowpds = window.open(url, "knowpds", property);
        knowpds.focus();
    }


// 자료나눔터 링크 수정 작업 : 2008.09.24
// Start
    function doPopupKnowFree1(boardName,messageNumber,messageID) {
        //지식나눔터
		var idx = REDIRECT_DETAIL_KNOWPDS.lastIndexOf("/");
		var contentQuery = "org_cd=KNWZ001003&data_no="+ messageNumber +"&seq_no=1";
        var url = "http://www.edunet4u.net/edbbs/board/generic/view.do" +"?boardName="+boardName+"&messageNumber=" +messageNumber + "&messageId=" + messageID + "&"+contentQuery;
        var property = "status=1,resizable=1,scrollbars=1,toolbar=1,directories=0,titlebar=1,maxbutton=1,location=1,menubar=1";
        var knowpds = window.open(url, "knowfree1", property);
        knowpds.focus();
    }

// End 

/*
	//지식컬럼  상세 보기
    function doPopupKnowPro(p_category_id,p_list_category_id,p_msg_id) {
        //지식컬럼
        var idx = REDIRECT_DETAIL_KNOWPRO.lastIndexOf("/");
        var searchPage = REDIRECT_DETAIL_KNOWPRO.substring(idx + 1, REDIRECT_DETAIL_KNOWPRO.length);
        //var contentQuery = getContentQuery(searchPage);
		var contentQuery = "org_cd=KNWZ001003&data_no="+ p_msg_id +"&seq_no=1";


        var url = REDIRECT_DETAIL_KNOWPRO +"?p_category_id="+p_category_id+"&p_list_category_id=" +p_list_category_id + "&p_msg_id=" +p_msg_id +"&" +contentQuery;
        var property = "status=1,resizable=1,scrollbars=1,toolbar=1,directories=0,titlebar=1,maxbutton=1,location=1,menubar=1";
        var knowpro = window.open(url, "knowpds", property);
        knowpro.focus();
    }
*/
	//이슈토론  상세 보기
    function doPopupKnowPro(boardName,messageNumber) 
	{
        //지식컬럼
        var idx = REDIRECT_DETAIL_KNOWPRO.lastIndexOf("/");
        var searchPage = REDIRECT_DETAIL_KNOWPRO.substring(idx + 1, REDIRECT_DETAIL_KNOWPRO.length);
        //var contentQuery = getContentQuery(searchPage);
		var contentQuery = "org_cd=KNWZ001003&data_no="+ messageNumber +"&seq_no=1";


        var url = REDIRECT_DETAIL_KNOWPRO +"?boardName="+boardName+"&messageNumber=" +messageNumber + "&"+contentQuery;
        var property = "status=1,resizable=1,scrollbars=1,toolbar=1,directories=0,titlebar=1,maxbutton=1,location=1,menubar=1";
        var knowpro = window.open(url, "knowpds", property);
        knowpro.focus();
    }

//http://www.edunet4u.net/teacher6/community/issue.jsp?org_cd=SVCZ000001&data_no=20581&seq_no=1
//http://www.edunet4u.net/teacher6/knowExch/knowColumn.jsp?boardName=tknowcolumn01&messageNumber=9&org_cd=KNWZ001003&data_no=9&seq_no=1

	//현장공감  상세 보기
    function doPopupKnowFree(p_category_id,p_list_category_id,p_msg_id) {
        //현장공감
        var idx = REDIRECT_DETAIL_KNOWFREE.lastIndexOf("/");
        var searchPage = REDIRECT_DETAIL_KNOWFREE.substring(idx + 1, REDIRECT_DETAIL_KNOWFREE.length);
        var contentQuery = getContentQuery(searchPage);

        var url = REDIRECT_DETAIL_KNOWFREE +"?p_category_id="+p_category_id+"&p_list_category_id=" +p_list_category_id + "&p_msg_id=" +p_msg_id +"&" +contentQuery;
        var property = "status=1,resizable=1,scrollbars=1,toolbar=1,directories=0,titlebar=1,maxbutton=1,location=1,menubar=1";
        var knowfree = window.open(url, "knowpds", property);
        knowfree.focus();
    }


    //오늘의학습 카테고리에서 링크
    function doTodayLearn(yyyy, mm, dd) {
    	//오늘의학습
    	var idx = REDIRECT_DETAIL_TODAYLEARN.lastIndexOf("/");
        var searchPage = REDIRECT_DETAIL_TODAYLEARN.substring(idx + 1, REDIRECT_DETAIL_TODAYLEARN.length);
        var contentQuery = getContentQuery(searchPage);

        var url = REDIRECT_DETAIL_TODAYLEARN +"?yyyy="+yyyy+"&mm="+mm+"&dd="+dd+"&"+contentQuery;
        var property = "status=1,resizable=1,scrollbars=1,toolbar=1,directories=0,titlebar=1,maxbutton=1,location=1,menubar=1";
        var todayLearn = window.open(url, "todayLearn", property);
        todayLearn.focus();
    }

    //시도소식 카테고리에서 링크
    function doPopupCityNews(boardName, messageNumber) {
    	//시도소식
    	var idx = REDIRECT_DETAIL_CITYNEWS.lastIndexOf("/");
        var searchPage = REDIRECT_DETAIL_CITYNEWS.substring(idx + 1, REDIRECT_DETAIL_CITYNEWS.length);
       // var contentQuery = getContentQuery(searchPage);
		var contentQuery = "org_cd=KNWZ001003&data_no="+ messageNumber +"&seq_no=1";

        var url = REDIRECT_DETAIL_CITYNEWS +"?boardName="+boardName+"&messageNumber="+messageNumber+"&"+contentQuery;
        var property = "status=1,resizable=1,scrollbars=1,toolbar=1,directories=0,titlebar=1,maxbutton=1,location=1,menubar=1";
        var cityNews = window.open(url, "cityNews", property);
        cityNews.focus();
    }

    //교육행사 카테고리에서 링크
    function doPopupEduEvent(boardName, messageNumber) {
    	//교육행사
    	var idx = REDIRECT_DETAIL_EDUEVENT.lastIndexOf("/");
        var searchPage = REDIRECT_DETAIL_EDUEVENT.substring(idx + 1, REDIRECT_DETAIL_EDUEVENT.length);
        //var contentQuery = getContentQuery(searchPage);
		var contentQuery = "org_cd=KNWZ001003&data_no="+ messageNumber +"&seq_no=1";

        var url = REDIRECT_DETAIL_EDUEVENT +"?boardName="+boardName+"&messageNumber="+messageNumber+"&"+contentQuery;
        var property = "status=1,resizable=1,scrollbars=1,toolbar=1,directories=0,titlebar=1,maxbutton=1,location=1,menubar=1";
        var eduEvent = window.open(url, "eduEvent", property);
        eduEvent.focus();
    }

    //해외교육소식 카테고리에서 링크
    function doPopupForeignNews(boardName, messageNumber) {
    	//해외교육소식
    	var idx = REDIRECT_DETAIL_FOREIGNNEWS.lastIndexOf("/");
        var searchPage = REDIRECT_DETAIL_FOREIGNNEWS.substring(idx + 1, REDIRECT_DETAIL_FOREIGNNEWS.length);
       // var contentQuery = getContentQuery(searchPage);
		var contentQuery = "org_cd=KNWZ001003&data_no="+ messageNumber +"&seq_no=1";

        var url = REDIRECT_DETAIL_FOREIGNNEWS +"?boardName="+boardName+"&messageNumber="+messageNumber+"&"+contentQuery;
        var property = "status=1,resizable=1,scrollbars=1,toolbar=1,directories=0,titlebar=1,maxbutton=1,location=1,menubar=1";
        var foreignNews = window.open(url, "foreignNews", property);
        foreignNews.focus();
    }





/*
 *	소스안에  org_cd 부분을 받아서 바꿔주면 됩니다.
 * var contentQuery = "org_cd=KNWZ001003& ....
 * ################## 여기 까지  ###########################
 **/
















    //자료나눔터 상세보기
    function doPopupBbs(parentCategoryKey, categoryKey, boardName, messageNumber) {
    	if(parentCategoryKey == "8") {
            if(!isDownloadUser()) {
                return;
            }
        }

        //ecrm 콘텐츠 코드
        var idx = REDIRECT_DETAIL_BBS.lastIndexOf("/");
        var searchPage = REDIRECT_DETAIL_BBS.substring(idx + 1, REDIRECT_DETAIL_BBS.length);
        var contentQuery = getContentQuery(searchPage);

        var url = REDIRECT_DETAIL_BBS +"?categoryKey="+ categoryKey +"&boardName="+ boardName +"&messageNumber="+ messageNumber+"&"+contentQuery;
        var property = "status=1,resizable=1,scrollbars=1,toolbar=1,directories=0,titlebar=1,maxbutton=1,location=1,menubar=1";
        var bbs = window.open(url, "bbs", property);
        bbs.focus();
    }



    //논문검색 상세보기
    function doPopupRiss(controlNo) {
        if(!isDownloadUser()) {
            return;
        }

        //ecrm 콘텐츠 코드
        var idx = REDIRECT_DETAIL_RISS.lastIndexOf("/");
        var searchPage = REDIRECT_DETAIL_RISS.substring(idx + 1, REDIRECT_DETAIL_RISS.length);
        var contentQuery = getContentQuery(searchPage);

        var url = REDIRECT_DETAIL_RISS +"?controlNo="+ controlNo+"&"+contentQuery;
        var property = "width=715,height=700,scrollbars=yes,resizable=yes,left=0,top=0";
        var riss = window.open(url, "riss", property);
        riss.focus();
    }

    //학습사전 상세보기 (detail, illust)
	function doPopupBritannica(command, key) {
        //ecrm 콘텐츠 코드
        var searchPage;
        if(command == "detail") {
        	searchPage = "britannicaDetail.do";
        } else {
        	searchPage = "britannicaIllust.do";
        }

        var contentQuery = getContentQuery(searchPage);

        var url;
        if(command == "detail") {
        	url = searchPage +"?articleId="+key+"&"+contentQuery;
        } else {
        	url = searchPage +"?medId="+key+"&"+contentQuery;
        }
        var property = "";
        var britannica = window.open(url, "britannica", property);
		britannica.focus();
    }


    ////////////////////////////////////////////
    // 꾸러미자료 다운로드
    ////////////////////////////////////////////

    //꾸러미자료 다운로드
    function doDownloadBundlePBT(pbtNo) {
        doDownloadBundle(pbtNo, "Y");
    }

    //꾸러미자료 다운로드
    function doDownloadBundlePPT(fileType, pptNo, pptFileNm, pptOrgCd, pptDataNo, pptSeqNo) {
        if(fileType == "96") {
            doDownloadSaveByTeacher(pptOrgCd, pptDataNo, pptSeqNo)
        } else if(fileType == "94") {
            window.open("http://"+pptFileNm, "", "");
        } else {
            doDownloadBundle(pptNo, "N");
        }
    }

    /*
    * Key를 이용한 다운로드
    * @param key PBT_NO(학습지) or PPT_NO(수업절차)
    * @param isBasic Y - 학습지/공통자료, N - 수업절차
    */
    function doDownloadBundle(key, isBasic) {
        if(!isDownloadUser()) {
            return;
        }

        if(key == "") {
            alert("파일이 등록되지 않았습니다.");
        } else {
            document.kmsFileForm.key.value = key;
            document.kmsFileForm.isBasic.value = isBasic;
            document.kmsFileForm.action = EDUNET_KMS_URL +"/jsp/fileDownloadByKey.jsp";
            document.kmsFileForm.submit();
        }
    }

    /*
     * 꾸러미 추천하기
     * @orgCd 기관코드
     * @dataNo 데이터번호
     * @pbiNo 꾸러미 PBI_NO
     * @openerReload Y - Reload, N - Nothing
     */

    function doPopupRecommendBundle(pbiNo, orgCd, dataNo, openerReload){
			openerReload = "N";
			var url = EDUNET_KMS_URL +"/jsp/pop_recomm.jsp?orgCd="+orgCd+"&dataNo="+dataNo+"&pbiNo="+pbiNo+"&openerReload="+openerReload;
			var left = (screen.width - 250)/2;
			var top  = (screen.height - 250)/2;
			var property = "status=0,resizable=0,scrollbars=0,toolbar=0,directories=0,titlebar=0,width=250,height=250,left="+left+",top="+top+",maxbutton=0";
			var recommend = window.open(url, "recommend", property);
			recommend.focus();
		}

    ////////////////////////////////////////////
    // 내부 페이지로 이동
    ////////////////////////////////////////////

	//상세검색
	function goDetailSearch() {
    	var form = document.globalSearchForm;

    	var searchPage = "goDetailSearch.do";

        //ecrm 콘텐츠 코드
        var contentCode = getContentCode(searchPage);
        form.org_cd.value = contentCode.ORG_CD;
        form.data_no.value = contentCode.DATA_NO;
        form.seq_no.value = contentCode.SEQ_NO;

        if(form.groups) form.groups.value = "";
        if(form.category) form.category.value = "";
        if(form.groupcategory) form.groupcategory.value = "";
//        if(form.searchWord) form.searchWord.value = "";

        form.action = searchPage;
        form.target = "_self";
        form.method = "get";
        form.submit();

        //window.open("/tsearch/goDetailSearch.do", "", "top=0, left=0, width=652, height=600, toolbar=0, directories=0, status=0, menubar=0, scrollbars=0, resizable=0");

	}



	//검색환경
	function goEnvironment() {
    	var form = document.globalSearchForm;

    	var searchPage = "goEnvironment.do";

        //ecrm 콘텐츠 코드
        var contentCode = getContentCode(searchPage);
        form.org_cd.value = contentCode.ORG_CD;
        form.data_no.value = contentCode.DATA_NO;
        form.seq_no.value = contentCode.SEQ_NO;

		form.action="/tsearch/"+searchPage;
        if(form.groups) form.groups.value = "";
        if(form.category) form.category.value = "";
        if(form.groupcategory) form.groupcategory.value = "";
        if(form.searchWord) form.searchWord.value = "";

        window.open("/tsearch/goEnvironment.do", "", "top=0, left=0, width=470, height=280, toolbar=0, directories=0, status=0, menubar=0, scrollbars=0, resizable=0");
	}

	//검색환경
	function setEnvironment() {
        var form = document.environmentForm;

    	var searchPage = "environmentSet.do";

        //ecrm 콘텐츠 코드
        var contentCode = getContentCode(searchPage);

        form.org_cd.value = contentCode.ORG_CD;
        form.data_no.value = contentCode.DATA_NO;
        form.seq_no.value = contentCode.SEQ_NO;

        form.action = "/tsearch/"+searchPage;
        form.target = "_self";
        form.method = "get";
        form.submit();
	}

	//검색순위
	function goRanking() {
    	var form = document.globalSearchForm;
    	var searchPage = "ranking.do";

        //ecrm 콘텐츠 코드
        var contentCode = getContentCode(searchPage);
        form.org_cd.value = contentCode.ORG_CD;
        form.data_no.value = contentCode.DATA_NO;
        form.seq_no.value = contentCode.SEQ_NO;

        form.action = searchPage;
        form.target = "_self";
        form.method = "get";
        form.submit();
	}


    ////////////////////////////////////////////
    // 외부 페이지로 이동
    ////////////////////////////////////////////
	//채널 초기 페이지로 이동
	function goChannel(channel) {
		var pageUrl = EDUNET_SEARCH_URL;
		if(channel == "main") {
			pageUrl = REDIRECT_CHANNEL_MAIN;
		} else if(channel == "teacher") {
			pageUrl = REDIRECT_CHANNEL_TEACHER;
		} else if(channel == "student") {
			pageUrl = REDIRECT_CHANNEL_STUDENT;
		} else if(channel == "community") {
			pageUrl = REDIRECT_CHANNEL_COMMUNITY;
		}

		window.top.location.href = pageUrl;
	}

    //회원가입 페이지로 이동
    function goMemberJoin() {
        var pageUrl = EDUNET_USER_URL +"/action/user/agreement.do?org_cd=LNKZ000001&data_no=4&seq_no=1";
        window.top.location.href = pageUrl;
    }

    //ID찾기 페이지로 이동
    function goFindID() {
        var pageUrl = EDUNET_USER_URL +"/action/user/find.do?org_cd=LNKZ000001&data_no=7&seq_no=1&cmd=idFind";
        window.top.location.href = pageUrl;
    }

    //개인정보변경 페이지로 이동
    function goUpdateUserInfo() {
        var pageUrl = EDUNET_USER_URL +"/action/user/join.do?org_cd=LNKZ000001&data_no=5&seq_no=1&cmd=chkpwd";
        window.top.location.href = pageUrl;
    }

    //Password찾기 페이지로 이동
    function goFindPW() {
        var pageUrl = EDUNET_USER_URL +"/action/user/find.do?org_cd=LNKZ000001&data_no=8&seq_no=1&cmd=pwdFind";
        window.top.location.href = pageUrl;
    }

    //메일 페이지로 이동
    function goKerisMail() {
    	if(!isMailUser()) {
    		window.open(NOT_EDU_MAIL_MESSAGE, 'notEduMail', 'toolbar=0,menubar=0,directories=0,location=0,scrollbars=no,width=345,height=213,top=100,left=250')
    		return;
    	}
        var pageUrl = EDUNET_MAIN_URL +"/mail.do?org_cd=PDSZ000001&data_no=17&seq_no=1";
        window.top.location.href = pageUrl;
    }

    //가이드 페이지로 이동
	function goGuide() {
		var pageUrl = EDUNET_MAIN_URL +"/share2/useGuide.jsp?org_cd=LNKZ000001&data_no=18&seq_no=1";
		window.top.location = pageUrl;
	}

	//사이트맵 페이지로 이동
	function goSitemap() {
		var pageUrl = EDUNET_MAIN_URL +"/share2/sitemap.jsp?org_cd=LNKZ000001&data_no=19&seq_no=1";
		window.top.location = pageUrl;
	}

	//영문 페이지로 이동
	function goEnglish() {
		var pageUrl = EDUNET_MAIN_URL +"/english/introduction.jsp?org_cd=LNKZ000001&data_no=21&seq_no=1";
		window.top.location = pageUrl;
	}

	//기관소개 페이지로 이동
	function goOrgIntro() {
		var pageUrl = EDUNET_MAIN_URL +"/share2/orgIntroduct.jsp?org_cd=LNKZ000001&data_no=2&seq_no=1";
		window.top.location = pageUrl;
	}

	//개인정보보호정책 페이지로 이동
	function goPrivacy() {
		//var pageUrl = EDUNET_MAIN_URL +"/share2/personProtect.jsp";
		var pageUrl = EDUNET_USER_URL +"/jsps/user/popupPesonPolicy.jsp?org_cd=LNKZ000001&data_no=12&seq_no=1";
	    var left = (screen.width-470)/2;
	    var top  = (screen.height-230)/2;
		var privacy = window.open(pageUrl, "policy", "left="+ left +",top="+ top +",width=470,height=230,menubar=no,scrollbars=no");
		privacy.focus();
	}

	//FAQ 페이지로 이동
	function goFAQ() {
		var pageUrl = EDUNET_MAIN_URL +"/share2/replyQuestion.jsp?org_cd=LNKZ000001&data_no=10&seq_no=1";
		window.top.location = pageUrl;
	}

	//Q&A 페이지로 이동
	function goQNA() {
		var pageUrl = EDUNET_MAIN_URL +"/question.do?pagingId=question&viewType=list&org_cd=PDSZ000001&data_no=1&seq_no=1";
		window.top.location = pageUrl;
	}

	//에듀넷에 바란다 페이지로 이동
	function goWish() {
		var pageUrl = EDUNET_MAIN_URL +"/wish.do?pagingId=question&viewType=list";
		window.top.location = pageUrl;
	}

	//플로그인 설치 페이지로 이동
	function goPlugIn() {
		var pageUrl = EDUNET_MAIN_URL +"/share2/plugIn.jsp?org_cd=LNKZ000001&data_no=14&seq_no=1";
		window.top.location = pageUrl;
	}

	//구에듀넷 초기 페이지로 이동
	function goOldEdunet() {
		var pageUrl = EDUNET_OLD_URL;
		window.top.location = pageUrl;
	}

	//운영자에게
	function goQNAAdmin() {
		var pageUrl = EDUNET_MAIN_URL +"/question.do?pagingId=question&viewType=list&org_cd=PDSZ000001&data_no=1&seq_no=1";
		window.top.location = pageUrl;
	}

    //쪽지 열기
    function openTag() {
    	openwin('http://community.edunet4u.net/msg/pool/listwin.asp','msgwin',560,385,3,false);
    }

    //마이노트 열기
    function openMyNote(kid) {
    	noscrollwin('http://mynote.edunet4u.net/home/mynote_login.asp?userid=' + kid, 'mynote_popup', 761, 534, 3, false);
    }

    //한국교육신문의 교육소식 더보기
    function doMoreHangyoNews() {
		var pageUrl = REDIRECT_HANGYO_NEWS;
		window.top.location = pageUrl;
    }

    function noscrollwin( winurl, winname, winwidth, winheight, adjust, resizable ) {
    	var width  = winwidth;
    	var height = winheight;
    	var left, top;

    	switch( adjust ) {
    		case 1: //top left aligned
    			left = top = 0;
    			break;
    		case 2: //top RIGHT aligned
    			left = window.screen.availWidth - width - 10;
    			top = 0;
    			break;
    		case 3: //centered
    			left = (window.screen.availWidth - width) / 2;
    			top = (window.screen.availHeight - height) / 2;
    			break;
    		case 4: //bottom left aligned
    			left = 0;
    			top = window.screen.availHeight - height - 25 - 10;
    			break;
    		case 5: //bottom RIGHT aligned
    			left = window.screen.availWidth - width - 10;
    			top = window.screen.availHeight - height - 25 - 10;
    			break;
    	}

    	var dynamic = "";
    	if(adjust > 0) {
    		dynamic = "left=" + left + ",top=" + top;
    	}

    	dynamic = dynamic + ",width=" + width + ",height=" + height;

    	if (resizable) {
    		dynamic = dynamic + ",resizable=yes,scrollbars=no,copyhistory=no";
    	} else {
    		dynamic = dynamic + ",resizable=no,scrollbars=no,copyhistory=no";
    	}

    	remotecontrol = window.open( winurl, winname, "toolbar=no," + dynamic + ",directories=no,status=no,menubar=no");
    }

    function openwin(winurl, winname, winwidth, winheight, adjust, resizable ) {
    	var width  = winwidth;
    	var height = winheight;
    	var left, top;

    	switch( adjust ) {
    		case 1: //top left aligned
    		left = top = 0;
    		break;
    	case 2: //top RIGHT aligned
    		left = window.screen.availWidth - width - 10;
    		top = 0;
    		break;
    	case 3: //centered
    		left = (window.screen.availWidth - width) / 2;
    		top = (window.screen.availHeight - height) / 2;
    		break;
    	case 4: //bottom left aligned
    		left = 0;
    		top = window.screen.availHeight - height - 25 - 10;
    		break;
    	case 5: //bottom RIGHT aligned
    		left = window.screen.availWidth - width - 10;
    		top = window.screen.availHeight - height - 25 - 10;
    		break;
    	}

    	var dynamic = "";
    	if (adjust > 0) {
    		dynamic = "left=" + left + ",top=" + top;
    	}

    	dynamic = dynamic + ",width=" + width + ",height=" + height;

    	if (resizable) {
    		dynamic = dynamic + ",resizable=yes,scrollbars=yes";
    	} else {
    		dynamic = dynamic + ",resizable=no,scrollbars=yes";
    	}

    	remotecontrol = window.open( winurl, winname, "toolbar=no," + dynamic + ",directories=no,status=no,menubar=no");
    }



    ////////////////////////////////////////////
    // 이미지 처리
    ////////////////////////////////////////////

    //대상 이미지 객체의 주소 변경
    function changeImage(imgObj, imgSrc) {
        imgObj.src = imgSrc;
    }

    //썸네일 이미지를 기본 이미지로 변경
    function changeThumbnail(imgObj) {
        changeImage(imgObj, "common/imgs/no_image.gif");
    }

    //꾸러미수업자료 - 썸네일 이미지를 기본 이미지로 변경
    function changeThumbnailKms(imgObj) {
        changeImage(imgObj, "common/imgs/kms_noimage.gif");
    }

    //도서자료 - 썸네일 이미지를 기본 이미지로 변경
    function changeThumbnailDLS(imgObj) {
        changeImage(imgObj, "common/imgs/book_noimage.gif");
    }

    //파일포멧 아이콘을 기본 이미지로 변경
    function changeFormatIcon(imgObj) {
        changeImage(imgObj, "common/imgs/imageprimary_etc.gif");
    }

    //멀티미디어자료 기본 이미지 변경
    function changeThumbnailMulti(imgObj, lvl3TypeCd) {
        changeImage(imgObj, "common/imgs/mulitmedia_noimage_"+ lvl3TypeCd +".gif");
    }


    ////////////////////////////////////////////
    // UTIL
    ////////////////////////////////////////////

    //공백 이외의 의미있는 값이 있으면 false
    function isTextEmpty(obj) {
        if(obj.value == null || obj.value.trim() == "") {
            return true;
        }

        return false;
    }

    //검색어의 유효성 체크
    function isValidSearchWord(obj) {
        if(obj.value.trim().toUpperCase() == "AND" || obj.value.trim().toUpperCase() == "OR") {
            alert("검색에 사용할 수 없는 단어 입니다.");
            return false;
        }

        if(hasChars(obj.value, "<>()[];=,!@#$%^&*?")) {
            alert("검색어에 특수문자가 포함되어 있습니다.");
            return false;
        }

        return true;
    }

    function Code(value, text) {
        this.value = value;
        this.text = text;
    }

    function addSelectBox(objTarget, code) {
        objTarget[objTarget.length] = new Option(code.text, code.value);
    }

    function clearSelectBox(objTarget) {
        for(var i = objTarget.length; i >= 0; i--) {
            objTarget[i] = null;
        }
    }

    function getSelectedValue(objTarget) {
        if(objTarget) {
            var idx = objTarget.selectedIndex;
            return objTarget[idx].value;
        }
        return "";
    }

    //문자 앞뒤의 공백제거
    String.prototype.trim = function() {
        return this.replace(/(^\s*)|(\s*$)/g, "");
    }

    //문자 앞뒤의 공백제거
    function trim(str) {
        return str.replace(/(^\s*)|(\s*$)/g, "");
    }

    //특정 문자가 포함되어 있으면 true
    function hasChars(value, chars) {
        for(var i = 0; i < value.length; i++) {
           if (chars.indexOf(value.charAt(i)) != -1) {
               return true;
           }
        }

        return false;
    }

    //HTTP 쿠키 값 가져오기
    function getCookie(name) {
        name += "=";
        startpos = document.cookie.indexOf(name);
        if (startpos >= 0) {
            startpos += name.length;
            endpos = document.cookie.indexOf(";", startpos);
            if (endpos == -1) endpos = document.cookie.length;
            //return unescape(document.cookie.substring(startpos, endpos));
            return document.cookie.substring(startpos, endpos);
        }
    }

    //HTTP 쿠키 값 저장하기
    function setCookie(name, value, path) {
        //document.cookie = name + "=" + escape(value) + "; path="+ path;
        document.cookie = name + "=" + value + "; path="+ path;
    }

    //HTML Tag제거하는 정규식 표현
    var objStrip = new RegExp();
    objStrip = /[<][^>]*[>]|[<][^>]*/gi;
    function printIgnoreHTML(contents, contentLength) {
        var contents = contents.replace(objStrip, " ");
        if(contentLength) {
            var length = Math.min(parseFloat(contentLength), contents.length);
            contents = contents.substring(0, length) + (parseFloat(contentLength) > contents.length ? "" : "...");
        }

        document.write(contents);
    }


    ////////////////////////////////////////////
    // 기타 함수
    ////////////////////////////////////////////
    //레이어 보이기, 숨기기
    var showedObj = "";
    function showLayer(eventObj) {
        if(eventObj == showedObj) {
            eventObj.style.display = "none";
            showedObj = "";
        } else {
            if(showedObj == "") {
                  //showedObj.style.display = "none";
            } else {
                  showedObj.style.display = "none";
            }
            eventObj.style.display = "block";
            showedObj = eventObj;
        }
    }

    //페이지 새로고침 동작시에 현재 페이지의 주소 저장
    function doRefresh() {
        refreshUrl = parent.bodyFrame.location.href;
        refreshUrl = refreshUrl.substring(refreshUrl.lastIndexOf('/') + 1);
        setCookie('search.refresh.url', refreshUrl, '/search');
    }

    //새로운 페이지 열기
    function doOpenWindow(url) {
        return window.open(url, "", "");
    }

    //form의 element요소로 query 생성
    function createQueryString(elements) {
        var query = "";
        for(var i = 0; i < elements.length; i++) {
        	var name = elements[i].name;
        	var value = elements[i].value;
       		query += name +"="+ value + (i != elements.length - 1 ? "&" : "");
        }
        return query;
    }

    //RSS 주소 복사
    function copyClip(meintext) {
        if(window.clipboardData) {
            window.clipboardData.setData("Text", meintext);
        } else if(window.netscape) {
            netscape.security.PrivilegeManager.enablePrivilege('UniversalXPConnect');

            var clip = Components.classes['@mozilla.org/widget/clipboard;1'].createInstance(Components.interfaces.nsIClipboard);
            if(!clip) return;

            var trans = Components.classes['@mozilla.org/widget/transferable;1'].createInstance(Components.interfaces.nsITransferable);
            if(!trans) return;

            trans.addDataFlavor('text/unicode');

            var str = new Object();
            var len = new Object();

            var str = Components.classes["@mozilla.org/supports-string;1"].createInstance(Components.interfaces.nsISupportsString);

            var copytext = meintext;
            str.data = copytext;

            trans.setTransferData("text/unicode",str,copytext.length*2);
            var clipid = Components.interfaces.nsIClipboard;
            if(!clipid) return false;

            clip.setData(trans,null,clipid.kGlobalClipboard);
        }

        alert("RSS 주소가 복사되었습니다.");
        return false;
    }

    var months = new Array("01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12");
    var days = new Array("일", "월", "화", "수", "목", "금", "토");

    //baseDate를 기준으로 7일 전 일자를 리턴
    function getLastWeekDate(baseDate) {
        baseDate.setTime(baseDate.getTime() - 7 * 86400000);
        return baseDate;
    }

    //baseDate를 기준으로 7일 후 일자를 리턴
    function getNextWeekDate(baseDate) {
        baseDate.setTime(baseDate.getTime() + 7 * 86400000);
        return baseDate;
    }

    //baseDate가 속한 주의 시작일자를 리턴
    function getSundayInWeek(baseDate) {
        var sunday = new Date();
        sunday.setTime(baseDate.getTime() - baseDate.getDay() * 86400000);
        return sunday
    }

    //baseDate가 속한 주의 종료일자를 리턴
    function getSaturdayInWeek(baseDate) {
        var saturday = new Date();
        saturday.setTime(baseDate.getTime() + (6 - baseDate.getDay()) * 86400000);
        return saturday;
    }

    //날짜(objDate)를 문자열로 변환하여 리턴
    function toTextDate(objDate, separator) {
        var yyyy = objDate.getFullYear();
        var mm = objDate.getMonth();
        var dd = objDate.getDate();

        if(dd <= 9) {
            dd = "0"+ dd;
        }

        if(!separator) {
        	separator = ". ";
        }

        var value = yyyy + separator + months[mm] + separator + dd;

        return value;
    }

    //날짜(objDate)를 문자열로 변환하여 리턴
    function toTextDay(objDate, separator) {
        var yyyy = objDate.getFullYear();
        var mm = objDate.getMonth();
        var dd = objDate.getDate();

        if(dd <= 9) {
            dd = "0"+ dd;
        }

        if(!separator) {
        	separator = ". ";
        }

        var value = months[mm] + separator + dd;

        return value;
    }

    //날짜(objDate)를 문자열로 변환하여 출력
    function printTextDate(objDate, targetElement) {
        var value = toTextDate(objDate, ". ");
        targetElement.innerHTML = value;
    }

    //차시정보 더보기
    function doMoreUserChasi() {
        //ecrm 콘텐츠 코드
        var contentQuery = getContentQuery("userChasiList.do");

        var url = "userChasiList.do?"+ contentQuery +"&baseDate="+ toTextDate(bannerBaseDate, "-");
        location.href = url;
    }

    //인기콘텐츠 더보기
    function doMoreBestContents() {
        //ecrm 콘텐츠 코드
        var contentQuery = getContentQuery("ranking.do");

        var url = "ranking.do?"+ contentQuery;
        location.href = url;
    }


    ////////////////////////////////////////////
    // 차시정보
    ////////////////////////////////////////////
    //차시정보 신청, 관리
    function doUserChasiManage() {
        //ecrm 콘텐츠 코드
        var contentQuery = getContentQuery("userChasiManage.do");

        openwin("userChasiManage.do?"+ contentQuery, "userChasiManage", 420, 389, 3, false);
    }

    //차시변경
    function doUserChasiList() {
        var form = document.categorySearchForm;

        form.pageNumber.value = 1;

        var searchPage = "userChasiList.do";

        //ecrm 콘텐츠 코드
        var contentCode = getContentCode(searchPage);
        form.org_cd.value = contentCode.ORG_CD;
        form.data_no.value = contentCode.DATA_NO;
        form.seq_no.value = contentCode.SEQ_NO;

        form.action = searchPage;
        form.target = "_self";
        form.method = "get";
        form.submit();
    }

    //차시정보 페이지 이동
    function goChasiPage(page) {
        var form = document.categorySearchForm;

        form.pageNumber.value = page;
        form.contentType.value = '';

        var searchPage = "userChasiList.do";

        //ecrm 콘텐츠 코드
        var contentCode = getContentCode(searchPage);
        form.org_cd.value = contentCode.ORG_CD;
        form.data_no.value = contentCode.DATA_NO;
        form.seq_no.value = contentCode.SEQ_NO;

        form.action = searchPage;
        form.target = "_self";
        form.method = "get";
        form.submit();
    }

    //차시정보 페이지 크기 변경
    function goChasiPageSize() {
        var form = document.categorySearchForm;

        form.pageNumber.value = '1';
        form.contentType.value = '';

        var searchPage = "userChasiList.do";

        //ecrm 콘텐츠 코드
        var contentCode = getContentCode(searchPage);
        form.org_cd.value = contentCode.ORG_CD;
        form.data_no.value = contentCode.DATA_NO;
        form.seq_no.value = contentCode.SEQ_NO;

        form.action = searchPage;
        form.target = "_self";
        form.method = "get";
        form.submit();
    }

    //차시 정보 추가
    function doAddUserChasi() {
        var form = document.addUserChasiForm;

        if(isTextEmpty(form.lvl1ClasCd)) {
            alert("학교급은 필수항목 입니다.");
            return;
        }

        if(isTextEmpty(form.lvl2ClasCd) && isTextEmpty(form.curiCd)) {
            alert("학년 및 교과 중 한 항목은 선택하셔야 합니다.");
            return;
        }

        var searchPage = "userChasiManage.do";

        //ecrm 콘텐츠 코드
        var contentCode = getContentCode(searchPage);
        form.org_cd.value = contentCode.ORG_CD;
        form.data_no.value = contentCode.DATA_NO;
        form.seq_no.value = contentCode.SEQ_NO;

        form.action = searchPage;
        form.method = "get";
        form.submit();
    }

    //차시 정보 삭제
    function doDelUserChasi(seqNo) {
        var form = document.delUserChasiForm;

        form.seqNo.value = seqNo;

        var searchPage = "userChasiManage.do";

        //ecrm 콘텐츠 코드
        var contentCode = getContentCode(searchPage);
        form.org_cd.value = contentCode.ORG_CD;
        form.data_no.value = contentCode.DATA_NO;
        form.seq_no.value = contentCode.SEQ_NO;

        form.action = searchPage;
        form.method = "get";
        form.submit();
    }

    //차시 정보 수정
    function doSetUserChasi() {
        var form = document.setUserChasiForm;

        form.command.value = "del";
        form.seqNo.value = seqNo;

        var searchPage = "userChasiManage.do";

        //ecrm 콘텐츠 코드
        var contentCode = getContentCode(searchPage);
        form.org_cd.value = contentCode.ORG_CD;
        form.data_no.value = contentCode.DATA_NO;
        form.seq_no.value = contentCode.SEQ_NO;

        form.action = searchPage;
        form.method = "get";
        form.submit();
    }




    ////////////////////////////////////////////
    // eCRM의 콘텐츠 코드
    ////////////////////////////////////////////
    function contentCode(path, org_cd, data_no, seq_no) {
    	this.PATH = path;
    	this.ORG_CD = org_cd;
    	this.DATA_NO = data_no;
    	this.SEQ_NO = seq_no;
    }

    function getContentCode(path) {
    	for(var i = 0; i < contentCodes.length; i++) {
    		contentCode = contentCodes[i];
    		if(path == contentCode.PATH) {
				
				return contentCode;
    		}
    	}
    	return new contentCode(path, "", "", "");
    }

    function getContentQuery(path) {
	    contentCode = getContentCode(path);
	    var query = "org_cd="+ contentCode.ORG_CD +"&data_no="+ contentCode.DATA_NO +"&seq_no="+ contentCode.SEQ_NO;
	    return query;
    }



	var contentCodes = new Array();

    contentCodes[0]  = new contentCode("globalSearch.do",         "SVCZ000001", "20047", "1");		//검색 > 통합검색


    //카테고리검색

	contentCodes[1] = new contentCode("lessonDataGroupList.do"   ,"SVCZ000001","20048","1");//검색>그룹검색(수업자료)
    contentCodes[2] = new contentCode("lessonEstGroupList.do"    ,"SVCZ000001","20049","1");//검색>그룹검색>교육평가
    contentCodes[3] = new contentCode("knowExchGroupList.do"     ,"SVCZ000001","20050","1");//검색>그룹검색>지식교류
    contentCodes[4] = new contentCode("ictEduGroupList.do"       ,"SVCZ000001","20051","1");//검색>그룹검색>ICT교육
    contentCodes[5] = new contentCode("researchActGroupList.do"  ,"SVCZ000001","20052","1");//검색>그룹검색>연구활동
    contentCodes[6] = new contentCode("teacherDevGroupList.do"   ,"SVCZ000001","20053","1");//검색>그룹검색>교원연수
    contentCodes[7] = new contentCode("classMngGroupList.do"     ,"SVCZ000001","20054","1");//검색>그룹검색>학급경영
    contentCodes[8] = new contentCode("eduTrendGroupList.do"    ,"SVCZ000001","20055","1");//검색>그룹검색>교육동향
	contentCodes[9] = new contentCode("communityGroupList.do"    ,"SVCZ000001","20056","1");//검색>그룹검색>커뮤니티
	contentCodes[10] = new contentCode("rissGroupList.do"		,"SVCZ000001","20057","1");//검색>그룹검색>학위논문
	contentCodes[11] = new contentCode("etcGroupList.do"		,"SVCZ000001","20058","1");//검색>그룹검색>기타


	// 1.수업자료
	contentCodes[12] = new contentCode("lessonDataGroupList.do"   ,"SVCZ000001","20059","1");//검색>그룹검색(수업자료)
	contentCodes[13] = new contentCode("courseMaterialList.do",       "SVCZ000001", "20060", "1");	//검색 > 수업자료 > 교과자료
	contentCodes[14] = new contentCode("curriculumList.do",       "SVCZ000001", "20061", "1");		//검색 > 수업자료 > 교과자료 > 멀티미디어요소자료
	contentCodes[15] = new contentCode("softwareList.do",       "SVCZ000001", "20062", "1");		//검색 > 수업자료 > 교과자료 > 교수용S/W
	contentCodes[16] = new contentCode("bundleList.do",       "SVCZ000001", "20063", "1");			//검색 > 수업자료 > 교과자료 > 꾸러미자료
	contentCodes[17] = new contentCode("processList.do",       "SVCZ000001", "20064", "1");			//검색 > 수업자료 > 교과자료 > 교수학습과정안
	contentCodes[18] = new contentCode("etextbookList.do",       "SVCZ000001", "20065", "1");		//검색 > 수업자료 > 교과자료 > 전자교과서
	contentCodes[19] = new contentCode("specialListList.do",       "SVCZ000001", "20066", "1");		//검색 > 수업자료 > 특별재량활동자료
	contentCodes[20] = new contentCode("britannicaList.do",       "SVCZ000001", "20067", "1");		//검색 > 수업자료 > 학습백과사전
	contentCodes[21] = new contentCode("courseBookList.do",       "SVCZ000001", "20068", "1");		//검색 > 수업자료 > 교과연계도서자료

	// 2.교육평가
	contentCodes[22] = new contentCode("lessonEstGroupList.do"    ,"SVCZ000001","20069","1");//검색>그룹검색>교육평가
	contentCodes[23] = new contentCode("estimateCompreList.do",       "SVCZ000001", "20070", "1");	//검색 > 교육평가 > 교육평가이해


	// 3.지식교류
	 contentCodes[24] = new contentCode("knowExchGroupList.do"     ,"SVCZ000001","20071","1");//검색>그룹검색>지식교류
	contentCodes[25] = new contentCode("knowQnaList.do",       "SVCZ000001", "20072", "1");			//검색 > 지식교류 > 묻고답하기
	contentCodes[26] = new contentCode("knowPdsList.do",       "SVCZ000001", "20073", "1");			//검색 > 지식교류 > 자료나눔터
	contentCodes[27] = new contentCode("knowProList.do",       "SVCZ000001", "20074", "1");			//검색 > 지식교류 > 지식컬럼

	// 4.ICT교육
	contentCodes[28] = new contentCode("ictEduGroupList.do"       ,"SVCZ000001","20075","1");//검색>그룹검색>ICT교육
	contentCodes[29] = new contentCode("ictManageGuideList.do",       "SVCZ000001", "20076", "1");	//검색 > ICT교육 > ICT운영지침
	contentCodes[30] = new contentCode("ictUseGuideList.do",       "SVCZ000001", "20077", "1");		//검색 > ICT교육 > ICT활용능력지표
	contentCodes[31] = new contentCode("ictLessonModelList.do",       "SVCZ000001", "20078", "1");	//검색 > ICT교육 > ICT수업모형.전략
	contentCodes[32] = new contentCode("ictLessonGuideList.do",       "SVCZ000001", "20079", "1");	//검색 > ICT교육 > ICT온라인수업가이드
	contentCodes[33] = new contentCode("ictEthicList.do",       "SVCZ000001", "20080", "1");		//검색 > ICT교육 > ICT정보통신윤리교육
	contentCodes[34] = new contentCode("ictUseInfoList.do",       "SVCZ000001", "20081", "1");		//검색 > ICT교육 > ICT활용정보

	// 5.연구활동
	contentCodes[35] = new contentCode("researchActGroupList.do"  ,"SVCZ000001","20082","1");//검색>그룹검색>연구활동
	contentCodes[36] = new contentCode("researchNetworkList.do",       "SVCZ000001", "20083", "1");	//검색 > 연구활동 > 교과교육연구회
	contentCodes[37] = new contentCode("schoolNetworkList.do",       "SVCZ000001", "20084", "1");	//검색 > 연구활동 > 연구학교
	contentCodes[38] = new contentCode("contestNetworkList.do",       "SVCZ000001", "20085", "1");	//검색 > 연구활동 > 연구대회

	// 6.교원연수
	contentCodes[39] = new contentCode("teacherDevGroupList.do"   ,"SVCZ000001","20086","1");//검색>그룹검색>교원연수
	contentCodes[40] = new contentCode("eduTrainingList.do",       "SVCZ000001", "20087", "1");		//검색 > 교원연수 > 교육정보화연수
	contentCodes[41] = new contentCode("pdRemoteNetworkList.do",   "SVCZ000001", "20088", "1");		//검색 > 교원연수 > 연수원

	// 7.학급경영
     contentCodes[42] = new contentCode("classMngGroupList.do"   ,"SVCZ000001","20089","1");//검색>그룹검색>교원연수
	contentCodes[43] = new contentCode("todayLearnList.do",       "SVCZ000001", "20090", "1");		//검색 > 학급경영 > 오늘의학습
	contentCodes[44] = new contentCode("lifeGuideList.do",       "SVCZ000001", "20091", "1");		//검색 > 학급경영 > 생활지도
	contentCodes[45] = new contentCode("schoolManageList.do",       "SVCZ000001", "20092", "1");	//검색 > 학급경영 > 학교운영

	// 8.교육동향
	 contentCodes[46] = new contentCode("eduTrendGroupList.do"    ,"SVCZ000001","20093","1");//검색>그룹검색>교육동향
	contentCodes[47] = new contentCode("newsList.do",       "SVCZ000001", "20094", "1");			//검색 > 교육동향 > 교육소식
	contentCodes[48] = new contentCode("foreignEduList.do",       "SVCZ000001", "20095", "1");		//검색 > 교육동향 > 해외교육동향
	contentCodes[49] = new contentCode("kerisReportList.do",       "SVCZ000001", "20096", "1");		//검색 > 교육동향 > KERIS연구보고서
	contentCodes[50] = new contentCode("kerisPublicationList.do",  "SVCZ000001", "20097", "1");		//검색 > 교육동향 > KERIS정기간행물
	
	
	// 9.커뮤니티 
	contentCodes[51] = new contentCode("communityGroupList.do"    ,"SVCZ000001","20098","1");//검색>그룹검색>커뮤니티
	
	// 10.학위논문
	contentCodes[52] = new contentCode("rissGroupList.do"		,"SVCZ000001","20099","1");//검색>그룹검색>학위논문


	// 11.기타
	contentCodes[53] = new contentCode("etcGroupList.do"		,"SVCZ000001","20100","1");//검색>그룹검색>기타
	contentCodes[54] = new contentCode("encourageList.do",  "SVCZ000001", "20101", "1");			//검색 > 기타 > 장학


	//환경설정
	contentCodes[55] = new contentCode("goEnvironment.do",       "SVCZ000001", "20109", "1");		//공통 > 환경설정

	//상세검색
	contentCodes[56] = new contentCode("goDetailSearch.do",       "SVCZ000001", "20102", "1");		//공통 > 상세검색


    contentCodes[57] = new contentCode("britannicaDetail.do",     "SVCZ000001", "20119", "1");		//이동 > 상세보기(학습사전)              
    contentCodes[58] = new contentCode("britannicaIllust.do",     "SVCZ000001", "20120", "1");		//이동 > 상세보기(학습사전_멀티미디어)   
    contentCodes[59] = new contentCode("goDetailCommunity.jsp",   "SVCZ000001", "20121", "1");		//이동 > 상세보기(커뮤니티)              
	contentCodes[60] = new contentCode("goDetailTodayLearn.jsp",       "SVCZ000001", "20122", "1");		//이동 > 상세보기 > 오늘의학습       
	contentCodes[61] = new contentCode("goDetailCityNews.jsp",       "SVCZ000001", "20123", "1");		//이동 > 상세보기 > 시도소식         
	contentCodes[62] = new contentCode("goDetailEduEvent.jsp",       "SVCZ000001", "20124", "1");		//이동 > 상세보기 > 교육행사         
	contentCodes[63] = new contentCode("goDetailForeignNews.jsp",       "SVCZ000001", "20125", "1");		//이동 > 상세보기 > 해외교육소식 
	contentCodes[64] = new contentCode("goDetailKnowQna.jsp",       "SVCZ000001", "20126", "1");		//이동 > 상세보기 > 묻고답하기       
	contentCodes[65] = new contentCode("goDetailKnowPds.jsp",       "SVCZ000001", "20127", "1");		//이동 > 상세보기 > 자료나눔터       
	contentCodes[66] = new contentCode("goDetailKnowFree.jsp",       "SVCZ000001", "20128", "1");		//이동 > 상세보기 > 현장공감         
	contentCodes[67] = new contentCode("goDetailKnowPro.jsp",       "SVCZ000001", "20129", "1");		//이동 > 상세보기 > 지식컬럼         
	contentCodes[68] = new contentCode("goDetailBundle.jsp",      "SVCZ000001", "20130", "1");		//이동 > 상세보기(꾸러미수업자료)        
	contentCodes[69] = new contentCode("goDetailRiss.jsp",        "SVCZ000001", "20131", "1");		//이동 > 상세보기(논문)                  


	// 상세검색
    contentCodes[70] = new contentCode("metaData.do",             "SVCZ000001", "20118", "1");		// 이동 > 상세보기 (KEM)
    contentCodes[71] = new contentCode("recommend.do",             "SVCZ000001", "20116", "1");		// 이동 > 추천하기
    contentCodes[72] = new contentCode("environmentSet.do",       "SVCZ000001", "10937", "1");		// 공통 > 환경설정
    contentCodes[73] = new contentCode("similaritySearch.do",    "SVCZ000001", "20117", "1");		// 유사문서 검색


	contentCodes[74] = new contentCode("lessonEstList.do",       "SVCZ000001", "20103", "1");	//검색 > 교육평가

	// 1-1.수업자료 중 추가된 항목
	contentCodes[75] = new contentCode("cyberStudyList.do",       "SVCZ000001", "20502", "1");		//검색 > 수업자료 > 사이버가정학습
	contentCodes[76] = new contentCode("levelStudyList.do",       "SVCZ000001", "20503", "1");		//검색 > 수업자료 > 수준별 수업자료

	// 추천검색 서비스
	contentCodes[77]  = new contentCode("globalSearchRecommend",         "SVCZ000001", "20949", "1");		//검색 > 통합검색 > 추천검색
	contentCodes[78]  = new contentCode("globalSearchRecommend1",         "SVCZ000001", "20953", "1");		//검색 > 통합검색 > BEST추천문서 
	contentCodes[79]  = new contentCode("globalSearchRecommend2",         "SVCZ000001", "20954", "1");		//검색 > 통합검색 > 더많은추천문서

	// 동영상수업자료 
	contentCodes[80]  = new contentCode("inbroadGroupList.do"    ,"SVCZ000001","20941","1");	//검색>그룹검색>동영상수업자료
	contentCodes[81]  = new contentCode("inbroadScript.do"    ,"SVCZ000001","20941","1");		//검색>그룹검색>동영상수업자료

	//네이버검색 서비스
	contentCodes[82]  = new contentCode("globalSearchList.jsp",         "SVCZ000001", "21085", "1");		//검색 > 통합검색 > 네이버검색
	
	//심파일검색 서비스
	contentCodes[83]  = new contentCode("simfileGroupList.do",         "", "", "");		//검색>그룹검색>공개소프트웨어

	//에듀카페검색 서비스
	contentCodes[84]  = new contentCode("educafeGroupList.do",         "", "", "");		//검색> 에듀카페


	contentCodes[85]  = new contentCode("NaverOpenApiGroupList.do",         "", "", "");		//검색> 에듀카페