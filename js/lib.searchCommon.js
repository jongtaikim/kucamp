    ////////////////////////////////////////////
    // ����� ���� URL
    ////////////////////////////////////////////
    //�����
    var EDUNET_URL				= "http://www.edunet4u.net";
	//���� �˻�
    var EDUNET_TSEARCH_URL		= "http://www.edunet4u.net/tsearch";
    //�����
    var EDUNET_USER_URL			= "http://www.edunet4u.net/user";
    //���� ä��
    var EDUNET_MAIN_URL			= "http://www.edunet4u.net/main";
    //���� ä��
    // var EDUNET_TEACHER_URL		= "http://www.edunet4u.net/teacher";
    var EDUNET_TEACHER_URL		= "http://www.edunet4u.net/teacher6";
    //�л� ä��
    // var EDUNET_STUDENT_URL		= "http://www.edunet4u.net/student";
    var EDUNET_STUDENT_URL		= "http://www.edunet4u.net/student6";
    //Ŀ�´�Ƽ ä��
    var EDUNET_COMMUNITY_URL	= "http://community.edunet4u.net";
	//����ī�� ä��
    var EDUNET_EDUCAFE_URL		= "http://educafe.edunet4u.net/cafe_t/front/post/post_view.do";
    //�˻�
    // var EDUNET_SEARCH_URL		= "http://www.edunet4u.net/ksearch";
    var EDUNET_SEARCH_URL		= "http://www.edunet4u.net/tsearch";
    //�ٷ����ڷ�
    var EDUNET_KMS_URL			= "http://www.edunet4u.net/kms";
    //����������
    var EDUNET_KNOW_URL			= "http://www.edunet4u.net/know";
    //�������
    var EDUNET_OLD_URL			= "http://old.edunet4u.net";
    //�ٿ�ε�
   // var EDUNET_DOWNLOAD_URL		= "http://down.edunet4u.net/servlet/FileDownloadServletV2.0";
	var EDUNET_DOWNLOAD_URL		= "http://down.edunet4u.net/servlet/SRCHFileDownloadServletV2.0";
	//�ٿ�ε���ġ ����
	var DOWNLOAD_LOCATION		= "group";
	//�ٿ�ε� ����� ID
	var DOWNLOAD_USERID			;


    ////////////////////////////////////////////
    // �ܺ� ������ ���ٸ���Ʈ �ּ�
    ////////////////////////////////////////////
    //����� ���� ä��
    var REDIRECT_CHANNEL_MAIN		= EDUNET_TSEARCH_URL +"/redirect/goChannelMain.jsp";
    //����� ���� ä��
    var REDIRECT_CHANNEL_TEACHER	= EDUNET_TSEARCH_URL +"/redirect/goChannelTeacher.jsp";
    //����� �л� ä��
    var REDIRECT_CHANNEL_STUDENT	= EDUNET_TSEARCH_URL +"/redirect/goChannelStudent.jsp";
    //����� Ŀ�´�Ƽ ä��
    var REDIRECT_CHANNEL_COMMUNITY	= EDUNET_TSEARCH_URL +"/redirect/goChannelCommunity.jsp";
    //����� �ٷ����ڷ� ��
    var REDIRECT_DETAIL_BUNDLE		= EDUNET_TSEARCH_URL +"/redirect/goDetailBundle.jsp";
    //����� ���������� ��
    var REDIRECT_DETAIL_KNOW		= EDUNET_TSEARCH_URL +"/redirect/goDetailKnow.jsp";
    //����� Ŀ�´�Ƽ ��
    var REDIRECT_DETAIL_COMMUNITY	= EDUNET_TSEARCH_URL +"/redirect/goDetailCommunity.jsp";
    //����� �ڷᳪ���� ��
    var REDIRECT_DETAIL_BBS			= EDUNET_TSEARCH_URL +"/redirect/goDetailBbs.jsp";
    //����� �����־�� ��
    var REDIRECT_DETAIL_QUESTION	= EDUNET_TSEARCH_URL +"/redirect/goDetailQuestion.jsp";
    //����� �� ��
    var REDIRECT_DETAIL_RISS		= EDUNET_TSEARCH_URL +"/redirect/goDetailRiss.jsp";
    //�ѱ������Ź��� �����ҽ�
    var REDIRECT_HANGYO_NEWS		= EDUNET_TSEARCH_URL +"/redirect/goHangyoNews.jsp";



	//���� ���ϱ�
    var REDIRECT_DETAIL_KNOWQNA		= EDUNET_TSEARCH_URL +"/redirect/goDetailKnowQna.jsp";

	//�ڷ� ������
    var REDIRECT_DETAIL_KNOWPDS		= EDUNET_TSEARCH_URL +"/redirect/goDetailKnowPds.jsp";

	//�������
    var REDIRECT_DETAIL_KNOWFREE	= EDUNET_TSEARCH_URL +"/redirect/goDetailKnowKnowFree.jsp";


	//�����÷�
    var REDIRECT_DETAIL_KNOWPRO		= "http://www.edunet4u.net/teacher6/community/issue.jsp";

	//������ �н�
    var REDIRECT_DETAIL_TODAYLEARN	= EDUNET_TSEARCH_URL +"/redirect/goDetailTodayLearn.jsp";

	//�õ� �ҽ�
    var REDIRECT_DETAIL_CITYNEWS	= EDUNET_TSEARCH_URL +"/redirect/goDetailCityNews.jsp";

	//���� ���
    var REDIRECT_DETAIL_EDUEVENT	= EDUNET_TSEARCH_URL +"/redirect/goDetailEduEvent.jsp";

	//�ؿ� �����ҽ�
    var REDIRECT_DETAIL_FOREIGNNEWS	= EDUNET_TSEARCH_URL +"/redirect/goDetailForeignNews.jsp";







    ////////////////////////////////////////////
    // ����� ����
    ////////////////////////////////////////////
    var TEACHER_LOGIN_MESSAGE	= EDUNET_URL +"/common/html/alert/popupNotLogin.html";
    var TEACHER_TEACHER_MESSAGE	= EDUNET_URL +"/common/html/alert/popupNotTeacher.html";
    var NOT_EDU_MAIL_MESSAGE    = EDUNET_MAIN_URL +"/mail/notEduMail.jsp";

    //�α��� ����
    function isLoginUser() {
    	//commonBox.jsp�� ���ǵ� �Լ�
        return isAuthorized();
    }

    //���� ����
    function isTeacherUser() {
    	//commonBox.jsp�� ���ǵ� �Լ�
        return isTeacher();
    }

    //�����ڷ��� �ٿ�ε� ����
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
    // �ؽ�Ʈ �ڽ��� keydown �̺�Ʈ
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
    // �α���/�α׾ƿ�
    ////////////////////////////////////////////
    //�α���
    function doLogin() {
    	var form = document.loginForm;

        if(isTextEmpty(form.user_id)) {
            alert("[���̵�]��(��) �Է��Ͻʽÿ�.");
            form.user_id.focus();
            return;
        }

        if(isTextEmpty(form.pwd)) {
            alert("[�н�����]��(��) �Է��Ͻʽÿ�.");
            form.pwd.focus();
            return;
        }

        if(form.pwd.value.length < 4) {
            alert('�н������ 4�� �̻��̾�� �մϴ�.');
            form.pwd.focus();
            return;
        }

        form.method = "post";
        form.target = "_self";
        form.action = EDUNET_USER_URL +"/action/login/login.do";
    	form.submit();
	}

    //�α׾ƿ�
    function doLogout() {
        var pageUrl = EDUNET_SEARCH_URL +"/logout.do";
        var redirectPage = EDUNET_USER_URL +"/action/login/logout.do";
        window.top.location.href = pageUrl +"?redirectPage="+ redirectPage;
    }


    ////////////////////////////////////////////
    // ���հ˻�
    ////////////////////////////////////////////
    //���հ˻� �׽�Ʈ��
    function doGlobalSearchTest(mode) {
    	var form = document.globalSearchForm;
    	form.mode.value = mode;
    	doGlobalSearch();
    }

    //���հ˻�
    function doGlobalSearch() {
    	var form = document.globalSearchForm;

        if(isTextEmpty(form.searchWord)) {
            alert("�˻�� �Է��Ͽ� �ּ���.");
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
	        //�󼼰˻����� �ʱ�ȭ
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

	        //ecrm ������ �ڵ�
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
			//ecrm ������ �ڵ�
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

    //��ü ��ũ
    function doGlobalSearchLink() {
    	var form = document.globalSearchForm;

        if(isTextEmpty(form.searchWord)) {
            alert("�˻�� �Է��Ͽ� �ּ���");
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


	        //ecrm ������ �ڵ�
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
            alert("�˻�� �Է��Ͽ� �ּ���");
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

		//�󼼰˻��Ķ����
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
		//�󼼰˻�����
			form.detailSCH.value="1";

	        //ecrm ������ �ڵ�
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
            alert("�˻�� �Է��Ͽ� �ּ���");
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

        //ecrm ������ �ڵ�
        var contentCode = getContentCode(searchPage);
        form.org_cd.value = contentCode.ORG_CD;
        form.data_no.value = contentCode.DATA_NO;
        form.seq_no.value = contentCode.SEQ_NO;

        form.action = searchPage;
        form.target = "_self";
        form.method = "get";
		form.submit();
    }


    //�׷� �˻� cjk20060222 ins
    function doGroupSearch() {
    	var form = document.groupSearchForm;
    	/*
        if(isTextEmpty(document.globalSearchForm.searchWord))
        {
            alert("�˻�� �Է��Ͽ� �ּ���");
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

        //ecrm ������ �ڵ�
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

//��� �� ���� isFrame���� �Ѱ��ֱ� ���� ����(20070919)
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

		//ecrm ������ �ڵ�
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


    //�׷� �˻� cjk20060222 ins
    function doGroupSearchDatil() {
    	var form = document.globalSearchForm;


        if(isTextEmpty(document.globalSearchForm.searchWord))
        {
            alert("�˻�� �Է��Ͽ� �ּ���");
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

        //ecrm ������ �ڵ�
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



	//�� ���� ��� ����
	function doMoreSearch(groups) {

		var form = document.groupSearchForm;
		form.groups.value = groups;
		form.groupcategory.value = "";
		 doGroupSearch_more();
	}


	//ī�װ� ��ũ
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

	//���� ī�װ� ��ũ
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










	//globalSearch ���� ���� ����
	function doSortSpecGlobalSearch(sortSpec) {
		var form = document.globalSearchForm;
		form.sortSpec.value = sortSpec;
		 doGlobalSearch();

	}

	//groupSearch ���� ���� ����
	function doSortSpecGroupSearch(sortSpec) {
		var form = document.groupSearchForm;
		form.sortSpec.value = sortSpec;
		 doGroupSearch();
	}






    //�˻�� �����Ͽ� �˻�
    function doGlobalSearchByKeyword(searchWord) {
    	var form = document.globalSearchForm;
    	form.groups.value = "";
        form.searchWord.value = searchWord;
        doGlobalSearch();
    }

    //ī�װ��� �����Ͽ� �˻�
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

	// 2006.07.13, SKC&C ��ǿ�
    // ���ļ��� ����
    function changeSortSpecGroup(sortSpec) {
    	var form = document.groupSearchForm;
        form.sortSpec.value = sortSpec;
        form.pageNumber.value = 1;
        doGroupSearch();
    }


    ////////////////////////////////////////////
    // ���繮�� �˻� (similaritySearchForm)
    ////////////////////////////////////////////
    //���繮�� �˻�
    function doSimilaritySearch(vdkVgwKey, title) {
    	var form = document.similaritySearchForm;

        form.vdkVgwKey.value = vdkVgwKey;
        form.title.value = title;

        var searchPage = "similaritySearch.do";

        //ecrm ������ �ڵ�
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
    // ���繮�� �˻� (similaritySearchForm)
    ////////////////////////////////////////////
    //�󼼰˻� ����
    function detailSearch() {

        var form = document.detailSearchForm;
        var par_form= opener.globalSearchForm;

        if(isTextEmpty(form.searchWord)) {
            alert("�˻�� �Է��Ͽ� �ּ���");
            form.searchWord.focus();
            return;
        }

        if(!isValidSearchWord(form.searchWord)) {
            form.searchWord.focus();
            return;
        }

        var searchPage = "detailSearch.do";
        //var searchPage = "groupSearch.do";
        //ecrm ������ �ڵ�
        var contentCode = getContentCode(searchPage);
        par_form.org_cd.value = contentCode.ORG_CD;
        par_form.data_no.value = contentCode.DATA_NO;
        par_form.seq_no.value = contentCode.SEQ_NO;
        //�Ķ����
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
    // ī�װ� �˻� (categorySearchForm)
    ////////////////////////////////////////////
    //ī�װ� �˻�
    function doCategorySearch() {
    	var form = document.groupSearchForm;
        form.contentType.value = "";
		var searchPage = "";
		if(form.groupcategory.value=="") {
			searchPage = form.groups.value +"GroupList.do";
		}
		//community �߰�(2007.06.19)
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
        //ecrm ������ �ڵ�
        var contentCode = getContentCode(searchPage);
        form.org_cd.value = contentCode.ORG_CD;
        form.data_no.value = contentCode.DATA_NO;
        form.seq_no.value = contentCode.SEQ_NO;
        form.action = searchPage;
        form.target = "_self";
        form.method = "get";
        form.submit();
    }


    //�������� ����
    function changeFileType() {
    	var form = document.categorySearchForm;
        form.pageNumber.value = 1;
        doCategorySearch();
    }

    //�ڷ����� ����
    function changeDataType() {
    	var form = document.categorySearchForm;
        form.pageNumber.value = 1;
        doCategorySearch();
    }

    //���ļ��� ����
    function changeSortSpec(sortSpec) {
    	var form = document.categorySearchForm;
        form.sortSpec.value = sortSpec;
        form.pageNumber.value = 1;
        doCategorySearch();
    }

    //������ ��ȣ ����
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

    //������ ũ�� ����
    function changePageSize() {
    	var form = document.groupSearchForm;
        form.pageNumber.value = 1;
        doGroupSearch();
    }

    //�з����� ����
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

    //Selector ����
    function changeSelector(gubun) {

    	var form = document.groupSearchForm;
    		form.selector_level.value=gubun;
    		form.search_re.value="Y";
        form.action = "changeSelector.do";

        form.target = "nobody";
        form.method = "get";
        form.submit();
    }

    //ContentType ����
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
    //groupContentType ����
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
    // ���ϴٿ�ε�
    ////////////////////////////////////////////
    //���� �̸�����
    function doPreview(orgCd, dataNo, seqNo, isTeacherData,keyword,k2dockey) {
        if(keyword != null && k2dockey != null) {
            var img = new Image();
            img.src = "/tsearch/jsp/common/recommendTX.jsp?keyword="+keyword+"&k2dockey="+k2dockey;
        }
        doDownloadProcess(orgCd, dataNo, seqNo, isTeacherData, "preview");
    }

    //���� �ٿ�ε�
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
			if(confirm("�ٿ�ε� ���񽺴� �α����� �ϼž� �մϴ�!\n�α��� �Ͻðڽ��ϱ�?"))
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


    //���� �ٿ�ε� - ����
    function doDownloadSave(orgCd, dataNo, seqNo, isTeacherData, action,user) {

		if (user == '')
		{
			if(confirm("�ٿ�ε� ���񽺴� �α����� �ϼž� �մϴ�!\n�α��� �Ͻðڽ��ϱ�?"))
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

    //���� �ٿ�ε� - ����
    function doDownloadOpen(orgCd, dataNo, seqNo, isTeacherData, action,user) {

		if (user == '')
		{
			if(confirm("�ٿ�ε� ���񽺴� �α����� �ϼž� �մϴ�!\n�α��� �Ͻðڽ��ϱ�?"))
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
     * ������ �ٿ�ε� ȣ��
     * orgCd          : ����ڵ�
     * dataNo         : �ڷ��ȣ
     * seqNo          : ���� �Ϸù�ȣ
     * isTeacherData  : �����ڷῩ��
     * action         : save(����), open(����, �⺻ ������), preview(����, �̸����� ������)
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

        //����
        if(action == "save") {
            downloadPage += "&command=save";
            location.href = downloadPage;

        //����, �⺻ ������ â���� ����
        } else if(action == "open") {
            downloadPage += "&command=redirect";
            window.open(downloadPage, "", "");

        //����, �̸����� ������ â���� ����
        } else if(action == "preview") {
            //downloadPage += "&command=redirect";
            downloadPage += "&command=open&openUrl=/servlet/fileOpen.jsp";
            window.open(downloadPage, "", windowsProps);

        //����, Ư�� ���������� ����
        } else {
            downloadPage += "&command=open&openUrl="+ EDUNET_SEARCH_URL +"/common/fileOpen.jsp";
            window.open(downloadPage, "", windowsProps);
        }
    }


    ////////////////////////////////////////////
    // �� ������ �̵�
    ////////////////////////////////////////////

    //�󼼺���
   function doPopupMetaData(orgCd, dataNo, categoryName, channel_search,keyword,k2dockey) {
		
		var category = "";
		if(categoryName == "��Ƽ�̵�����ڷ�"){
			category = "curriculum" ;
		}else if(categoryName == "������SW"){
			category = "software" ;
		}else if(categoryName == "�ٷ��� �ڷ�"){
			category = "bundle" ;
		}else if(categoryName == "�����н� ������"){
			category = "process" ;
		}else if(categoryName == "���ڱ�����"){
			category = "etextbook" ;
		}else if(categoryName == "���̹������н�"){
			category = "cyberStudy" ;
		}else if(categoryName == "���غ� �����ڷ�"){
			category = "levelStudy" ;
		}else if(categoryName == "����������ڷ�"){
			category = "inbroad" ;
		}else if(categoryName == "Ư���緮Ȱ���ڷ�"){
			category = "specialList" ;
		}else if(categoryName == "�н��������"){
			category = "britannica" ;
		}else if(categoryName == "����������"){
			category = "lessonEst" ;
		}else if(categoryName == "���� ���ϱ�"){
			category = "knowQna" ;
		}else if(categoryName == "�ڷᳪ����"){
			category = "knowPds" ;
		}else if(categoryName == "ICT����"){
			category = "ictEdu" ;
		}else if(categoryName == "������������ȸ"){
			category = "researchAct" ;
		}else if(categoryName == "������ȸ"){
			category = "researchAct" ;
		}else if(categoryName == "�����б�"){
			category = "researchAct" ;
		}else if(categoryName == "��������ȭ����"){
			category = "teacherDev" ;
		}else if(categoryName == "����"){
			category = "teacherDev" ;
		}else if(categoryName == "������"){
			category = "teacherDev" ;
		}else if(categoryName == "��Ȱ����"){
			category = "classMng" ;
		}else if(categoryName == "�������н�"){
			category = "classMng" ;
		}else if(categoryName == "�б��"){
			category = "classMng" ;
		}else if(categoryName == "�ؿܱ�����å"){
			category = "eduTrend" ;
		}else if(categoryName == "KERIS��������"){
			category = "eduTrend" ;
		}else if(categoryName == "�õ��ҽ�"){
			category = "eduTrend" ;
		}else if(categoryName == "��к���"){
			category = "eduTrend" ;
		}else if(categoryName == "�ؿܱ����ҽ�"){
			category = "eduTrend" ;
		}else if(categoryName == "�谣�����"){
			category = "eduTrend" ;
		}else if(categoryName == "�������"){
			category = "eduTrend" ;
		}else if(categoryName == "�������赵���ڷ�"){
			category = "courseBook" ;
		}else if(categoryName == "�н������ڷ�"){
			category = "etc" ;
		}else if(categoryName == "�����ڷ�" | categoryName == "�����н��ڷ�" ){
			category = "etc" ;
		}else if(categoryName == "����"){
			category = "etc" ;
		}

        //ecrm ������ �ڵ�

		var contentQuery = getContentQuery("metaData.do");
	    var url = "metaData.do?orgCd="+orgCd+"&dataNo="+dataNo+"&"+contentQuery+"&category="+category+"&channel_search="+channel_search+"&keyword="+keyword+"&k2dockey="+k2dockey;		
	    var left = (screen.width-550)/2;
	    var top  = (screen.height-600)/2;
	    var property = "toolbar=0,location=no,directories=0,status=0,menubar=0,scrollbars=1,resizable=0,width=537,height=550,left="+left+",top="+top+",maxbutton=0";
	    var metaData = window.open(url, "metaData", property);
        metaData.focus();

	}

    //�������� ������
    function doPopupEduNews(orgCd, dataNo) {
        //ecrm ������ �ڵ�
        var contentQuery = getContentQuery("metaData.do");

	    var url = "metaData.do?orgCd="+orgCd+"&dataNo="+dataNo+"&category=news&"+contentQuery;
	    var left = (screen.width-550)/2;
	    var top  = (screen.height-600)/2;
	    var property = "toolbar=0,location=no,directories=0,status=0,menubar=0,scrollbars=1,resizable=0,width=517,height=517,left="+left+",top="+top+",maxbutton=0";
	    var latestNews = window.open(url, "latestNews", property);
        latestNews.focus();
    }

    //�󼼺���
	function doMetaData(orgCd, dataNo) {
        //ecrm ������ �ڵ�
        var contentQuery = getContentQuery("metaData.do");

	    var url = "metaData.do?orgCd="+orgCd+"&dataNo="+dataNo+"&"+contentQuery;
	    var property = "";
	    var metaData = window.open(url, "metaData", property);
        metaData.focus();
	}

    //��õ�ϱ�
    function doPopupRecommend(orgCd, dataNo, isTeacherData,docAvg) {

			if(isTeacherData) {
            if(!isDownloadUser()) {
                return;
            }
        }

        //ecrm ������ �ڵ�
        var contentQuery = getContentQuery("recommend.do");

        var url = "recommend.do?orgCd="+orgCd+"&dataNo="+dataNo+"&"+contentQuery+"&docAvg="+docAvg;
        var left = (screen.width - 250)/2;
        var top  = (screen.height - 250)/2;
        var property = "status=0,resizable=0,scrollbars=0,toolbar=0,directories=0,titlebar=0,width=280,height=310,,left="+left+",top="+top+",maxbutton=0";
        var recommend = window.open(url, "recommend", property);
        recommend.focus();
    }

    //�ٷ��� �󼼺���
    function doPopupBundle(pbiNo, orgCd, dataNo, lvl1ClasCd, lvl2ClasCd, lvl3ClasCd, lvl4ClasCd, lvl6ClasCd) {
        if(!isDownloadUser()) {
            return;
        }

        //ecrm ������ �ڵ�
        var idx = REDIRECT_DETAIL_BUNDLE.lastIndexOf("/");
        var searchPage = REDIRECT_DETAIL_BUNDLE.substring(idx + 1, REDIRECT_DETAIL_BUNDLE.length);
        var contentQuery = getContentQuery(searchPage);

        var url = REDIRECT_DETAIL_BUNDLE +"?p_pbiNo="+ pbiNo +"&p_orgCd="+ orgCd +"&p_dataNo="+ dataNo +"&p_currPage=1&p_startPage=1&"+ "lvl1="+ lvl1ClasCd +"&lvl2="+ lvl2ClasCd +"&lvl3="+ lvl3ClasCd +"&lvl4="+ lvl4ClasCd +"&lvl5="+ lvl6ClasCd +"&p_searchWord=&"+contentQuery;
        var property = "status=1,resizable=1,scrollbars=1,toolbar=1,directories=0,titlebar=1,maxbutton=1,location=1,menubar=1";
        var kms = window.open(url, "kms", property);
        kms.focus();
    }

    //���̹������� �󼼺���
	function doPopupQuestion(tid) {
        //ecrm ������ �ڵ�
        var idx = REDIRECT_DETAIL_QUESTION.lastIndexOf("/");
        var searchPage = REDIRECT_DETAIL_QUESTION.substring(idx + 1, REDIRECT_DETAIL_QUESTION.length);
        var contentQuery = getContentQuery(searchPage);

        var url = REDIRECT_DETAIL_QUESTION +"?tid="+tid+"&"+contentQuery;
        var property = "status=1,resizable=1,scrollbars=1,toolbar=1,directories=0,titlebar=1,maxbutton=1,location=1,menubar=1";
        var question = window.open(url, "question", property);
        question.focus();
    }

    //���������� �󼼺���
    function doPopupKnow(k2dockey, serviceType, categoryId, msgId) {
        if(!isDownloadUser()) {
            return;
        }

        //ecrm ������ �ڵ�
        var idx = REDIRECT_DETAIL_KNOW.lastIndexOf("/");
        var searchPage = REDIRECT_DETAIL_KNOW.substring(idx + 1, REDIRECT_DETAIL_KNOW.length);
        var contentQuery = getContentQuery(searchPage);

        var url = REDIRECT_DETAIL_KNOW +"?k2dockey="+ k2dockey +"&serviceType="+ serviceType +"&categoryId="+ categoryId +"&msgId="+ msgId+"&"+contentQuery;
        var property = "status=1,resizable=1,scrollbars=1,toolbar=1,directories=0,titlebar=1,maxbutton=1,location=1,menubar=1";
        var know = window.open(url, "know", property);
        know.focus();
    }

    //Ŀ�´�Ƽ �󼼺���
    function doPopupCommunity(nickid) {
        //ecrm ������ �ڵ�
        var idx = REDIRECT_DETAIL_COMMUNITY.lastIndexOf("/");
        var searchPage = REDIRECT_DETAIL_COMMUNITY.substring(idx + 1, REDIRECT_DETAIL_COMMUNITY.length);
        var contentQuery = getContentQuery(searchPage);

        var url = REDIRECT_DETAIL_COMMUNITY +"?nickid="+nickid+"&"+contentQuery;
        var property = "status=1,resizable=1,scrollbars=1,toolbar=1,directories=0,titlebar=1,maxbutton=1,location=1,menubar=1";
        var community = window.open(url, "community", property);
        community.focus();
    }
	
	//  08.03.24 ����ī�� �󼼺���
    function doPopupEducafe(cafeId,categoryId,postId) {
        
        var url = EDUNET_EDUCAFE_URL+"?cafeId="+cafeId+"&categoryId="+categoryId+"&postId="+postId;
        var property = "status=1,resizable=1,scrollbars=1,toolbar=1,directories=0,titlebar=1,maxbutton=1,location=1,menubar=1";
        //var eduni = window.open(url, "eduni", property);
		var educafe = window.open(url, "educafe", property);
        educafe.focus();  
    } 



/*
 *	�ҽ��ȿ�  org_cd �κ��� �޾Ƽ� �ٲ��ָ� �˴ϴ�.
 * var contentQuery = "org_cd=KNWZ001003& ....
 * ################## ���⼭ ���� ###########################
 **/



	//���� ���ϱ� �� ����
    function doPopupKnowQna(p_list_category_id,p_msg_id) {
        //���� ���ϱ�
        var idx = REDIRECT_DETAIL_KNOWQNA.lastIndexOf("/");
        var searchPage = REDIRECT_DETAIL_KNOWQNA.substring(idx + 1, REDIRECT_DETAIL_KNOWQNA.length);

		//var contentQuery = getContentQuery(searchPage);

		var contentQuery = "org_cd=KNWZ001003&data_no="+ p_msg_id +"&seq_no=1";


        var url = REDIRECT_DETAIL_KNOWQNA +"?p_list_category_id="+p_list_category_id+"&p_msg_id=" +p_msg_id + "&"+contentQuery;
        var property = "status=1,resizable=1,scrollbars=1,toolbar=1,directories=0,titlebar=1,maxbutton=1,location=1,menubar=1";
        var knowqna = window.open(url, "knowqna", property);
        knowqna.focus();
    }


	//���ĳ�����  �� ����
    function doPopupKnowPds(boardName,messageNumber) {
        //���ĳ�����
        var idx = REDIRECT_DETAIL_KNOWPDS.lastIndexOf("/");
        var searchPage = REDIRECT_DETAIL_KNOWPDS.substring(idx + 1, REDIRECT_DETAIL_KNOWPDS.length);

		//var contentQuery = getContentQuery(searchPage);
		var contentQuery = "org_cd=KNWZ001003&data_no="+ messageNumber +"&seq_no=1";


        var url = REDIRECT_DETAIL_KNOWPDS +"?boardName="+boardName+"&messageNumber=" +messageNumber + "&"+contentQuery;
        var property = "status=1,resizable=1,scrollbars=1,toolbar=1,directories=0,titlebar=1,maxbutton=1,location=1,menubar=1";
        var knowpds = window.open(url, "knowpds", property);
        knowpds.focus();
    }


// �ڷᳪ���� ��ũ ���� �۾� : 2008.09.24
// Start
    function doPopupKnowFree1(boardName,messageNumber,messageID) {
        //���ĳ�����
		var idx = REDIRECT_DETAIL_KNOWPDS.lastIndexOf("/");
		var contentQuery = "org_cd=KNWZ001003&data_no="+ messageNumber +"&seq_no=1";
        var url = "http://www.edunet4u.net/edbbs/board/generic/view.do" +"?boardName="+boardName+"&messageNumber=" +messageNumber + "&messageId=" + messageID + "&"+contentQuery;
        var property = "status=1,resizable=1,scrollbars=1,toolbar=1,directories=0,titlebar=1,maxbutton=1,location=1,menubar=1";
        var knowpds = window.open(url, "knowfree1", property);
        knowpds.focus();
    }

// End 

/*
	//�����÷�  �� ����
    function doPopupKnowPro(p_category_id,p_list_category_id,p_msg_id) {
        //�����÷�
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
	//�̽����  �� ����
    function doPopupKnowPro(boardName,messageNumber) 
	{
        //�����÷�
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

	//�������  �� ����
    function doPopupKnowFree(p_category_id,p_list_category_id,p_msg_id) {
        //�������
        var idx = REDIRECT_DETAIL_KNOWFREE.lastIndexOf("/");
        var searchPage = REDIRECT_DETAIL_KNOWFREE.substring(idx + 1, REDIRECT_DETAIL_KNOWFREE.length);
        var contentQuery = getContentQuery(searchPage);

        var url = REDIRECT_DETAIL_KNOWFREE +"?p_category_id="+p_category_id+"&p_list_category_id=" +p_list_category_id + "&p_msg_id=" +p_msg_id +"&" +contentQuery;
        var property = "status=1,resizable=1,scrollbars=1,toolbar=1,directories=0,titlebar=1,maxbutton=1,location=1,menubar=1";
        var knowfree = window.open(url, "knowpds", property);
        knowfree.focus();
    }


    //�������н� ī�װ����� ��ũ
    function doTodayLearn(yyyy, mm, dd) {
    	//�������н�
    	var idx = REDIRECT_DETAIL_TODAYLEARN.lastIndexOf("/");
        var searchPage = REDIRECT_DETAIL_TODAYLEARN.substring(idx + 1, REDIRECT_DETAIL_TODAYLEARN.length);
        var contentQuery = getContentQuery(searchPage);

        var url = REDIRECT_DETAIL_TODAYLEARN +"?yyyy="+yyyy+"&mm="+mm+"&dd="+dd+"&"+contentQuery;
        var property = "status=1,resizable=1,scrollbars=1,toolbar=1,directories=0,titlebar=1,maxbutton=1,location=1,menubar=1";
        var todayLearn = window.open(url, "todayLearn", property);
        todayLearn.focus();
    }

    //�õ��ҽ� ī�װ����� ��ũ
    function doPopupCityNews(boardName, messageNumber) {
    	//�õ��ҽ�
    	var idx = REDIRECT_DETAIL_CITYNEWS.lastIndexOf("/");
        var searchPage = REDIRECT_DETAIL_CITYNEWS.substring(idx + 1, REDIRECT_DETAIL_CITYNEWS.length);
       // var contentQuery = getContentQuery(searchPage);
		var contentQuery = "org_cd=KNWZ001003&data_no="+ messageNumber +"&seq_no=1";

        var url = REDIRECT_DETAIL_CITYNEWS +"?boardName="+boardName+"&messageNumber="+messageNumber+"&"+contentQuery;
        var property = "status=1,resizable=1,scrollbars=1,toolbar=1,directories=0,titlebar=1,maxbutton=1,location=1,menubar=1";
        var cityNews = window.open(url, "cityNews", property);
        cityNews.focus();
    }

    //������� ī�װ����� ��ũ
    function doPopupEduEvent(boardName, messageNumber) {
    	//�������
    	var idx = REDIRECT_DETAIL_EDUEVENT.lastIndexOf("/");
        var searchPage = REDIRECT_DETAIL_EDUEVENT.substring(idx + 1, REDIRECT_DETAIL_EDUEVENT.length);
        //var contentQuery = getContentQuery(searchPage);
		var contentQuery = "org_cd=KNWZ001003&data_no="+ messageNumber +"&seq_no=1";

        var url = REDIRECT_DETAIL_EDUEVENT +"?boardName="+boardName+"&messageNumber="+messageNumber+"&"+contentQuery;
        var property = "status=1,resizable=1,scrollbars=1,toolbar=1,directories=0,titlebar=1,maxbutton=1,location=1,menubar=1";
        var eduEvent = window.open(url, "eduEvent", property);
        eduEvent.focus();
    }

    //�ؿܱ����ҽ� ī�װ����� ��ũ
    function doPopupForeignNews(boardName, messageNumber) {
    	//�ؿܱ����ҽ�
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
 *	�ҽ��ȿ�  org_cd �κ��� �޾Ƽ� �ٲ��ָ� �˴ϴ�.
 * var contentQuery = "org_cd=KNWZ001003& ....
 * ################## ���� ����  ###########################
 **/
















    //�ڷᳪ���� �󼼺���
    function doPopupBbs(parentCategoryKey, categoryKey, boardName, messageNumber) {
    	if(parentCategoryKey == "8") {
            if(!isDownloadUser()) {
                return;
            }
        }

        //ecrm ������ �ڵ�
        var idx = REDIRECT_DETAIL_BBS.lastIndexOf("/");
        var searchPage = REDIRECT_DETAIL_BBS.substring(idx + 1, REDIRECT_DETAIL_BBS.length);
        var contentQuery = getContentQuery(searchPage);

        var url = REDIRECT_DETAIL_BBS +"?categoryKey="+ categoryKey +"&boardName="+ boardName +"&messageNumber="+ messageNumber+"&"+contentQuery;
        var property = "status=1,resizable=1,scrollbars=1,toolbar=1,directories=0,titlebar=1,maxbutton=1,location=1,menubar=1";
        var bbs = window.open(url, "bbs", property);
        bbs.focus();
    }



    //���˻� �󼼺���
    function doPopupRiss(controlNo) {
        if(!isDownloadUser()) {
            return;
        }

        //ecrm ������ �ڵ�
        var idx = REDIRECT_DETAIL_RISS.lastIndexOf("/");
        var searchPage = REDIRECT_DETAIL_RISS.substring(idx + 1, REDIRECT_DETAIL_RISS.length);
        var contentQuery = getContentQuery(searchPage);

        var url = REDIRECT_DETAIL_RISS +"?controlNo="+ controlNo+"&"+contentQuery;
        var property = "width=715,height=700,scrollbars=yes,resizable=yes,left=0,top=0";
        var riss = window.open(url, "riss", property);
        riss.focus();
    }

    //�н����� �󼼺��� (detail, illust)
	function doPopupBritannica(command, key) {
        //ecrm ������ �ڵ�
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
    // �ٷ����ڷ� �ٿ�ε�
    ////////////////////////////////////////////

    //�ٷ����ڷ� �ٿ�ε�
    function doDownloadBundlePBT(pbtNo) {
        doDownloadBundle(pbtNo, "Y");
    }

    //�ٷ����ڷ� �ٿ�ε�
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
    * Key�� �̿��� �ٿ�ε�
    * @param key PBT_NO(�н���) or PPT_NO(��������)
    * @param isBasic Y - �н���/�����ڷ�, N - ��������
    */
    function doDownloadBundle(key, isBasic) {
        if(!isDownloadUser()) {
            return;
        }

        if(key == "") {
            alert("������ ��ϵ��� �ʾҽ��ϴ�.");
        } else {
            document.kmsFileForm.key.value = key;
            document.kmsFileForm.isBasic.value = isBasic;
            document.kmsFileForm.action = EDUNET_KMS_URL +"/jsp/fileDownloadByKey.jsp";
            document.kmsFileForm.submit();
        }
    }

    /*
     * �ٷ��� ��õ�ϱ�
     * @orgCd ����ڵ�
     * @dataNo �����͹�ȣ
     * @pbiNo �ٷ��� PBI_NO
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
    // ���� �������� �̵�
    ////////////////////////////////////////////

	//�󼼰˻�
	function goDetailSearch() {
    	var form = document.globalSearchForm;

    	var searchPage = "goDetailSearch.do";

        //ecrm ������ �ڵ�
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



	//�˻�ȯ��
	function goEnvironment() {
    	var form = document.globalSearchForm;

    	var searchPage = "goEnvironment.do";

        //ecrm ������ �ڵ�
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

	//�˻�ȯ��
	function setEnvironment() {
        var form = document.environmentForm;

    	var searchPage = "environmentSet.do";

        //ecrm ������ �ڵ�
        var contentCode = getContentCode(searchPage);

        form.org_cd.value = contentCode.ORG_CD;
        form.data_no.value = contentCode.DATA_NO;
        form.seq_no.value = contentCode.SEQ_NO;

        form.action = "/tsearch/"+searchPage;
        form.target = "_self";
        form.method = "get";
        form.submit();
	}

	//�˻�����
	function goRanking() {
    	var form = document.globalSearchForm;
    	var searchPage = "ranking.do";

        //ecrm ������ �ڵ�
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
    // �ܺ� �������� �̵�
    ////////////////////////////////////////////
	//ä�� �ʱ� �������� �̵�
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

    //ȸ������ �������� �̵�
    function goMemberJoin() {
        var pageUrl = EDUNET_USER_URL +"/action/user/agreement.do?org_cd=LNKZ000001&data_no=4&seq_no=1";
        window.top.location.href = pageUrl;
    }

    //IDã�� �������� �̵�
    function goFindID() {
        var pageUrl = EDUNET_USER_URL +"/action/user/find.do?org_cd=LNKZ000001&data_no=7&seq_no=1&cmd=idFind";
        window.top.location.href = pageUrl;
    }

    //������������ �������� �̵�
    function goUpdateUserInfo() {
        var pageUrl = EDUNET_USER_URL +"/action/user/join.do?org_cd=LNKZ000001&data_no=5&seq_no=1&cmd=chkpwd";
        window.top.location.href = pageUrl;
    }

    //Passwordã�� �������� �̵�
    function goFindPW() {
        var pageUrl = EDUNET_USER_URL +"/action/user/find.do?org_cd=LNKZ000001&data_no=8&seq_no=1&cmd=pwdFind";
        window.top.location.href = pageUrl;
    }

    //���� �������� �̵�
    function goKerisMail() {
    	if(!isMailUser()) {
    		window.open(NOT_EDU_MAIL_MESSAGE, 'notEduMail', 'toolbar=0,menubar=0,directories=0,location=0,scrollbars=no,width=345,height=213,top=100,left=250')
    		return;
    	}
        var pageUrl = EDUNET_MAIN_URL +"/mail.do?org_cd=PDSZ000001&data_no=17&seq_no=1";
        window.top.location.href = pageUrl;
    }

    //���̵� �������� �̵�
	function goGuide() {
		var pageUrl = EDUNET_MAIN_URL +"/share2/useGuide.jsp?org_cd=LNKZ000001&data_no=18&seq_no=1";
		window.top.location = pageUrl;
	}

	//����Ʈ�� �������� �̵�
	function goSitemap() {
		var pageUrl = EDUNET_MAIN_URL +"/share2/sitemap.jsp?org_cd=LNKZ000001&data_no=19&seq_no=1";
		window.top.location = pageUrl;
	}

	//���� �������� �̵�
	function goEnglish() {
		var pageUrl = EDUNET_MAIN_URL +"/english/introduction.jsp?org_cd=LNKZ000001&data_no=21&seq_no=1";
		window.top.location = pageUrl;
	}

	//����Ұ� �������� �̵�
	function goOrgIntro() {
		var pageUrl = EDUNET_MAIN_URL +"/share2/orgIntroduct.jsp?org_cd=LNKZ000001&data_no=2&seq_no=1";
		window.top.location = pageUrl;
	}

	//����������ȣ��å �������� �̵�
	function goPrivacy() {
		//var pageUrl = EDUNET_MAIN_URL +"/share2/personProtect.jsp";
		var pageUrl = EDUNET_USER_URL +"/jsps/user/popupPesonPolicy.jsp?org_cd=LNKZ000001&data_no=12&seq_no=1";
	    var left = (screen.width-470)/2;
	    var top  = (screen.height-230)/2;
		var privacy = window.open(pageUrl, "policy", "left="+ left +",top="+ top +",width=470,height=230,menubar=no,scrollbars=no");
		privacy.focus();
	}

	//FAQ �������� �̵�
	function goFAQ() {
		var pageUrl = EDUNET_MAIN_URL +"/share2/replyQuestion.jsp?org_cd=LNKZ000001&data_no=10&seq_no=1";
		window.top.location = pageUrl;
	}

	//Q&A �������� �̵�
	function goQNA() {
		var pageUrl = EDUNET_MAIN_URL +"/question.do?pagingId=question&viewType=list&org_cd=PDSZ000001&data_no=1&seq_no=1";
		window.top.location = pageUrl;
	}

	//����ݿ� �ٶ��� �������� �̵�
	function goWish() {
		var pageUrl = EDUNET_MAIN_URL +"/wish.do?pagingId=question&viewType=list";
		window.top.location = pageUrl;
	}

	//�÷α��� ��ġ �������� �̵�
	function goPlugIn() {
		var pageUrl = EDUNET_MAIN_URL +"/share2/plugIn.jsp?org_cd=LNKZ000001&data_no=14&seq_no=1";
		window.top.location = pageUrl;
	}

	//������� �ʱ� �������� �̵�
	function goOldEdunet() {
		var pageUrl = EDUNET_OLD_URL;
		window.top.location = pageUrl;
	}

	//��ڿ���
	function goQNAAdmin() {
		var pageUrl = EDUNET_MAIN_URL +"/question.do?pagingId=question&viewType=list&org_cd=PDSZ000001&data_no=1&seq_no=1";
		window.top.location = pageUrl;
	}

    //���� ����
    function openTag() {
    	openwin('http://community.edunet4u.net/msg/pool/listwin.asp','msgwin',560,385,3,false);
    }

    //���̳�Ʈ ����
    function openMyNote(kid) {
    	noscrollwin('http://mynote.edunet4u.net/home/mynote_login.asp?userid=' + kid, 'mynote_popup', 761, 534, 3, false);
    }

    //�ѱ������Ź��� �����ҽ� ������
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
    // �̹��� ó��
    ////////////////////////////////////////////

    //��� �̹��� ��ü�� �ּ� ����
    function changeImage(imgObj, imgSrc) {
        imgObj.src = imgSrc;
    }

    //����� �̹����� �⺻ �̹����� ����
    function changeThumbnail(imgObj) {
        changeImage(imgObj, "common/imgs/no_image.gif");
    }

    //�ٷ��̼����ڷ� - ����� �̹����� �⺻ �̹����� ����
    function changeThumbnailKms(imgObj) {
        changeImage(imgObj, "common/imgs/kms_noimage.gif");
    }

    //�����ڷ� - ����� �̹����� �⺻ �̹����� ����
    function changeThumbnailDLS(imgObj) {
        changeImage(imgObj, "common/imgs/book_noimage.gif");
    }

    //�������� �������� �⺻ �̹����� ����
    function changeFormatIcon(imgObj) {
        changeImage(imgObj, "common/imgs/imageprimary_etc.gif");
    }

    //��Ƽ�̵���ڷ� �⺻ �̹��� ����
    function changeThumbnailMulti(imgObj, lvl3TypeCd) {
        changeImage(imgObj, "common/imgs/mulitmedia_noimage_"+ lvl3TypeCd +".gif");
    }


    ////////////////////////////////////////////
    // UTIL
    ////////////////////////////////////////////

    //���� �̿��� �ǹ��ִ� ���� ������ false
    function isTextEmpty(obj) {
        if(obj.value == null || obj.value.trim() == "") {
            return true;
        }

        return false;
    }

    //�˻����� ��ȿ�� üũ
    function isValidSearchWord(obj) {
        if(obj.value.trim().toUpperCase() == "AND" || obj.value.trim().toUpperCase() == "OR") {
            alert("�˻��� ����� �� ���� �ܾ� �Դϴ�.");
            return false;
        }

        if(hasChars(obj.value, "<>()[];=,!@#$%^&*?")) {
            alert("�˻�� Ư�����ڰ� ���ԵǾ� �ֽ��ϴ�.");
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

    //���� �յ��� ��������
    String.prototype.trim = function() {
        return this.replace(/(^\s*)|(\s*$)/g, "");
    }

    //���� �յ��� ��������
    function trim(str) {
        return str.replace(/(^\s*)|(\s*$)/g, "");
    }

    //Ư�� ���ڰ� ���ԵǾ� ������ true
    function hasChars(value, chars) {
        for(var i = 0; i < value.length; i++) {
           if (chars.indexOf(value.charAt(i)) != -1) {
               return true;
           }
        }

        return false;
    }

    //HTTP ��Ű �� ��������
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

    //HTTP ��Ű �� �����ϱ�
    function setCookie(name, value, path) {
        //document.cookie = name + "=" + escape(value) + "; path="+ path;
        document.cookie = name + "=" + value + "; path="+ path;
    }

    //HTML Tag�����ϴ� ���Խ� ǥ��
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
    // ��Ÿ �Լ�
    ////////////////////////////////////////////
    //���̾� ���̱�, �����
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

    //������ ���ΰ�ħ ���۽ÿ� ���� �������� �ּ� ����
    function doRefresh() {
        refreshUrl = parent.bodyFrame.location.href;
        refreshUrl = refreshUrl.substring(refreshUrl.lastIndexOf('/') + 1);
        setCookie('search.refresh.url', refreshUrl, '/search');
    }

    //���ο� ������ ����
    function doOpenWindow(url) {
        return window.open(url, "", "");
    }

    //form�� element��ҷ� query ����
    function createQueryString(elements) {
        var query = "";
        for(var i = 0; i < elements.length; i++) {
        	var name = elements[i].name;
        	var value = elements[i].value;
       		query += name +"="+ value + (i != elements.length - 1 ? "&" : "");
        }
        return query;
    }

    //RSS �ּ� ����
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

        alert("RSS �ּҰ� ����Ǿ����ϴ�.");
        return false;
    }

    var months = new Array("01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12");
    var days = new Array("��", "��", "ȭ", "��", "��", "��", "��");

    //baseDate�� �������� 7�� �� ���ڸ� ����
    function getLastWeekDate(baseDate) {
        baseDate.setTime(baseDate.getTime() - 7 * 86400000);
        return baseDate;
    }

    //baseDate�� �������� 7�� �� ���ڸ� ����
    function getNextWeekDate(baseDate) {
        baseDate.setTime(baseDate.getTime() + 7 * 86400000);
        return baseDate;
    }

    //baseDate�� ���� ���� �������ڸ� ����
    function getSundayInWeek(baseDate) {
        var sunday = new Date();
        sunday.setTime(baseDate.getTime() - baseDate.getDay() * 86400000);
        return sunday
    }

    //baseDate�� ���� ���� �������ڸ� ����
    function getSaturdayInWeek(baseDate) {
        var saturday = new Date();
        saturday.setTime(baseDate.getTime() + (6 - baseDate.getDay()) * 86400000);
        return saturday;
    }

    //��¥(objDate)�� ���ڿ��� ��ȯ�Ͽ� ����
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

    //��¥(objDate)�� ���ڿ��� ��ȯ�Ͽ� ����
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

    //��¥(objDate)�� ���ڿ��� ��ȯ�Ͽ� ���
    function printTextDate(objDate, targetElement) {
        var value = toTextDate(objDate, ". ");
        targetElement.innerHTML = value;
    }

    //�������� ������
    function doMoreUserChasi() {
        //ecrm ������ �ڵ�
        var contentQuery = getContentQuery("userChasiList.do");

        var url = "userChasiList.do?"+ contentQuery +"&baseDate="+ toTextDate(bannerBaseDate, "-");
        location.href = url;
    }

    //�α������� ������
    function doMoreBestContents() {
        //ecrm ������ �ڵ�
        var contentQuery = getContentQuery("ranking.do");

        var url = "ranking.do?"+ contentQuery;
        location.href = url;
    }


    ////////////////////////////////////////////
    // ��������
    ////////////////////////////////////////////
    //�������� ��û, ����
    function doUserChasiManage() {
        //ecrm ������ �ڵ�
        var contentQuery = getContentQuery("userChasiManage.do");

        openwin("userChasiManage.do?"+ contentQuery, "userChasiManage", 420, 389, 3, false);
    }

    //���ú���
    function doUserChasiList() {
        var form = document.categorySearchForm;

        form.pageNumber.value = 1;

        var searchPage = "userChasiList.do";

        //ecrm ������ �ڵ�
        var contentCode = getContentCode(searchPage);
        form.org_cd.value = contentCode.ORG_CD;
        form.data_no.value = contentCode.DATA_NO;
        form.seq_no.value = contentCode.SEQ_NO;

        form.action = searchPage;
        form.target = "_self";
        form.method = "get";
        form.submit();
    }

    //�������� ������ �̵�
    function goChasiPage(page) {
        var form = document.categorySearchForm;

        form.pageNumber.value = page;
        form.contentType.value = '';

        var searchPage = "userChasiList.do";

        //ecrm ������ �ڵ�
        var contentCode = getContentCode(searchPage);
        form.org_cd.value = contentCode.ORG_CD;
        form.data_no.value = contentCode.DATA_NO;
        form.seq_no.value = contentCode.SEQ_NO;

        form.action = searchPage;
        form.target = "_self";
        form.method = "get";
        form.submit();
    }

    //�������� ������ ũ�� ����
    function goChasiPageSize() {
        var form = document.categorySearchForm;

        form.pageNumber.value = '1';
        form.contentType.value = '';

        var searchPage = "userChasiList.do";

        //ecrm ������ �ڵ�
        var contentCode = getContentCode(searchPage);
        form.org_cd.value = contentCode.ORG_CD;
        form.data_no.value = contentCode.DATA_NO;
        form.seq_no.value = contentCode.SEQ_NO;

        form.action = searchPage;
        form.target = "_self";
        form.method = "get";
        form.submit();
    }

    //���� ���� �߰�
    function doAddUserChasi() {
        var form = document.addUserChasiForm;

        if(isTextEmpty(form.lvl1ClasCd)) {
            alert("�б����� �ʼ��׸� �Դϴ�.");
            return;
        }

        if(isTextEmpty(form.lvl2ClasCd) && isTextEmpty(form.curiCd)) {
            alert("�г� �� ���� �� �� �׸��� �����ϼž� �մϴ�.");
            return;
        }

        var searchPage = "userChasiManage.do";

        //ecrm ������ �ڵ�
        var contentCode = getContentCode(searchPage);
        form.org_cd.value = contentCode.ORG_CD;
        form.data_no.value = contentCode.DATA_NO;
        form.seq_no.value = contentCode.SEQ_NO;

        form.action = searchPage;
        form.method = "get";
        form.submit();
    }

    //���� ���� ����
    function doDelUserChasi(seqNo) {
        var form = document.delUserChasiForm;

        form.seqNo.value = seqNo;

        var searchPage = "userChasiManage.do";

        //ecrm ������ �ڵ�
        var contentCode = getContentCode(searchPage);
        form.org_cd.value = contentCode.ORG_CD;
        form.data_no.value = contentCode.DATA_NO;
        form.seq_no.value = contentCode.SEQ_NO;

        form.action = searchPage;
        form.method = "get";
        form.submit();
    }

    //���� ���� ����
    function doSetUserChasi() {
        var form = document.setUserChasiForm;

        form.command.value = "del";
        form.seqNo.value = seqNo;

        var searchPage = "userChasiManage.do";

        //ecrm ������ �ڵ�
        var contentCode = getContentCode(searchPage);
        form.org_cd.value = contentCode.ORG_CD;
        form.data_no.value = contentCode.DATA_NO;
        form.seq_no.value = contentCode.SEQ_NO;

        form.action = searchPage;
        form.method = "get";
        form.submit();
    }




    ////////////////////////////////////////////
    // eCRM�� ������ �ڵ�
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

    contentCodes[0]  = new contentCode("globalSearch.do",         "SVCZ000001", "20047", "1");		//�˻� > ���հ˻�


    //ī�װ��˻�

	contentCodes[1] = new contentCode("lessonDataGroupList.do"   ,"SVCZ000001","20048","1");//�˻�>�׷�˻�(�����ڷ�)
    contentCodes[2] = new contentCode("lessonEstGroupList.do"    ,"SVCZ000001","20049","1");//�˻�>�׷�˻�>������
    contentCodes[3] = new contentCode("knowExchGroupList.do"     ,"SVCZ000001","20050","1");//�˻�>�׷�˻�>���ı���
    contentCodes[4] = new contentCode("ictEduGroupList.do"       ,"SVCZ000001","20051","1");//�˻�>�׷�˻�>ICT����
    contentCodes[5] = new contentCode("researchActGroupList.do"  ,"SVCZ000001","20052","1");//�˻�>�׷�˻�>����Ȱ��
    contentCodes[6] = new contentCode("teacherDevGroupList.do"   ,"SVCZ000001","20053","1");//�˻�>�׷�˻�>��������
    contentCodes[7] = new contentCode("classMngGroupList.do"     ,"SVCZ000001","20054","1");//�˻�>�׷�˻�>�бް濵
    contentCodes[8] = new contentCode("eduTrendGroupList.do"    ,"SVCZ000001","20055","1");//�˻�>�׷�˻�>��������
	contentCodes[9] = new contentCode("communityGroupList.do"    ,"SVCZ000001","20056","1");//�˻�>�׷�˻�>Ŀ�´�Ƽ
	contentCodes[10] = new contentCode("rissGroupList.do"		,"SVCZ000001","20057","1");//�˻�>�׷�˻�>������
	contentCodes[11] = new contentCode("etcGroupList.do"		,"SVCZ000001","20058","1");//�˻�>�׷�˻�>��Ÿ


	// 1.�����ڷ�
	contentCodes[12] = new contentCode("lessonDataGroupList.do"   ,"SVCZ000001","20059","1");//�˻�>�׷�˻�(�����ڷ�)
	contentCodes[13] = new contentCode("courseMaterialList.do",       "SVCZ000001", "20060", "1");	//�˻� > �����ڷ� > �����ڷ�
	contentCodes[14] = new contentCode("curriculumList.do",       "SVCZ000001", "20061", "1");		//�˻� > �����ڷ� > �����ڷ� > ��Ƽ�̵�����ڷ�
	contentCodes[15] = new contentCode("softwareList.do",       "SVCZ000001", "20062", "1");		//�˻� > �����ڷ� > �����ڷ� > ������S/W
	contentCodes[16] = new contentCode("bundleList.do",       "SVCZ000001", "20063", "1");			//�˻� > �����ڷ� > �����ڷ� > �ٷ����ڷ�
	contentCodes[17] = new contentCode("processList.do",       "SVCZ000001", "20064", "1");			//�˻� > �����ڷ� > �����ڷ� > �����н�������
	contentCodes[18] = new contentCode("etextbookList.do",       "SVCZ000001", "20065", "1");		//�˻� > �����ڷ� > �����ڷ� > ���ڱ�����
	contentCodes[19] = new contentCode("specialListList.do",       "SVCZ000001", "20066", "1");		//�˻� > �����ڷ� > Ư���緮Ȱ���ڷ�
	contentCodes[20] = new contentCode("britannicaList.do",       "SVCZ000001", "20067", "1");		//�˻� > �����ڷ� > �н��������
	contentCodes[21] = new contentCode("courseBookList.do",       "SVCZ000001", "20068", "1");		//�˻� > �����ڷ� > �������赵���ڷ�

	// 2.������
	contentCodes[22] = new contentCode("lessonEstGroupList.do"    ,"SVCZ000001","20069","1");//�˻�>�׷�˻�>������
	contentCodes[23] = new contentCode("estimateCompreList.do",       "SVCZ000001", "20070", "1");	//�˻� > ������ > ����������


	// 3.���ı���
	 contentCodes[24] = new contentCode("knowExchGroupList.do"     ,"SVCZ000001","20071","1");//�˻�>�׷�˻�>���ı���
	contentCodes[25] = new contentCode("knowQnaList.do",       "SVCZ000001", "20072", "1");			//�˻� > ���ı��� > ������ϱ�
	contentCodes[26] = new contentCode("knowPdsList.do",       "SVCZ000001", "20073", "1");			//�˻� > ���ı��� > �ڷᳪ����
	contentCodes[27] = new contentCode("knowProList.do",       "SVCZ000001", "20074", "1");			//�˻� > ���ı��� > �����÷�

	// 4.ICT����
	contentCodes[28] = new contentCode("ictEduGroupList.do"       ,"SVCZ000001","20075","1");//�˻�>�׷�˻�>ICT����
	contentCodes[29] = new contentCode("ictManageGuideList.do",       "SVCZ000001", "20076", "1");	//�˻� > ICT���� > ICT���ħ
	contentCodes[30] = new contentCode("ictUseGuideList.do",       "SVCZ000001", "20077", "1");		//�˻� > ICT���� > ICTȰ��ɷ���ǥ
	contentCodes[31] = new contentCode("ictLessonModelList.do",       "SVCZ000001", "20078", "1");	//�˻� > ICT���� > ICT��������.����
	contentCodes[32] = new contentCode("ictLessonGuideList.do",       "SVCZ000001", "20079", "1");	//�˻� > ICT���� > ICT�¶��μ������̵�
	contentCodes[33] = new contentCode("ictEthicList.do",       "SVCZ000001", "20080", "1");		//�˻� > ICT���� > ICT���������������
	contentCodes[34] = new contentCode("ictUseInfoList.do",       "SVCZ000001", "20081", "1");		//�˻� > ICT���� > ICTȰ������

	// 5.����Ȱ��
	contentCodes[35] = new contentCode("researchActGroupList.do"  ,"SVCZ000001","20082","1");//�˻�>�׷�˻�>����Ȱ��
	contentCodes[36] = new contentCode("researchNetworkList.do",       "SVCZ000001", "20083", "1");	//�˻� > ����Ȱ�� > ������������ȸ
	contentCodes[37] = new contentCode("schoolNetworkList.do",       "SVCZ000001", "20084", "1");	//�˻� > ����Ȱ�� > �����б�
	contentCodes[38] = new contentCode("contestNetworkList.do",       "SVCZ000001", "20085", "1");	//�˻� > ����Ȱ�� > ������ȸ

	// 6.��������
	contentCodes[39] = new contentCode("teacherDevGroupList.do"   ,"SVCZ000001","20086","1");//�˻�>�׷�˻�>��������
	contentCodes[40] = new contentCode("eduTrainingList.do",       "SVCZ000001", "20087", "1");		//�˻� > �������� > ��������ȭ����
	contentCodes[41] = new contentCode("pdRemoteNetworkList.do",   "SVCZ000001", "20088", "1");		//�˻� > �������� > ������

	// 7.�бް濵
     contentCodes[42] = new contentCode("classMngGroupList.do"   ,"SVCZ000001","20089","1");//�˻�>�׷�˻�>��������
	contentCodes[43] = new contentCode("todayLearnList.do",       "SVCZ000001", "20090", "1");		//�˻� > �бް濵 > �������н�
	contentCodes[44] = new contentCode("lifeGuideList.do",       "SVCZ000001", "20091", "1");		//�˻� > �бް濵 > ��Ȱ����
	contentCodes[45] = new contentCode("schoolManageList.do",       "SVCZ000001", "20092", "1");	//�˻� > �бް濵 > �б��

	// 8.��������
	 contentCodes[46] = new contentCode("eduTrendGroupList.do"    ,"SVCZ000001","20093","1");//�˻�>�׷�˻�>��������
	contentCodes[47] = new contentCode("newsList.do",       "SVCZ000001", "20094", "1");			//�˻� > �������� > �����ҽ�
	contentCodes[48] = new contentCode("foreignEduList.do",       "SVCZ000001", "20095", "1");		//�˻� > �������� > �ؿܱ�������
	contentCodes[49] = new contentCode("kerisReportList.do",       "SVCZ000001", "20096", "1");		//�˻� > �������� > KERIS��������
	contentCodes[50] = new contentCode("kerisPublicationList.do",  "SVCZ000001", "20097", "1");		//�˻� > �������� > KERIS���Ⱓ�๰
	
	
	// 9.Ŀ�´�Ƽ 
	contentCodes[51] = new contentCode("communityGroupList.do"    ,"SVCZ000001","20098","1");//�˻�>�׷�˻�>Ŀ�´�Ƽ
	
	// 10.������
	contentCodes[52] = new contentCode("rissGroupList.do"		,"SVCZ000001","20099","1");//�˻�>�׷�˻�>������


	// 11.��Ÿ
	contentCodes[53] = new contentCode("etcGroupList.do"		,"SVCZ000001","20100","1");//�˻�>�׷�˻�>��Ÿ
	contentCodes[54] = new contentCode("encourageList.do",  "SVCZ000001", "20101", "1");			//�˻� > ��Ÿ > ����


	//ȯ�漳��
	contentCodes[55] = new contentCode("goEnvironment.do",       "SVCZ000001", "20109", "1");		//���� > ȯ�漳��

	//�󼼰˻�
	contentCodes[56] = new contentCode("goDetailSearch.do",       "SVCZ000001", "20102", "1");		//���� > �󼼰˻�


    contentCodes[57] = new contentCode("britannicaDetail.do",     "SVCZ000001", "20119", "1");		//�̵� > �󼼺���(�н�����)              
    contentCodes[58] = new contentCode("britannicaIllust.do",     "SVCZ000001", "20120", "1");		//�̵� > �󼼺���(�н�����_��Ƽ�̵��)   
    contentCodes[59] = new contentCode("goDetailCommunity.jsp",   "SVCZ000001", "20121", "1");		//�̵� > �󼼺���(Ŀ�´�Ƽ)              
	contentCodes[60] = new contentCode("goDetailTodayLearn.jsp",       "SVCZ000001", "20122", "1");		//�̵� > �󼼺��� > �������н�       
	contentCodes[61] = new contentCode("goDetailCityNews.jsp",       "SVCZ000001", "20123", "1");		//�̵� > �󼼺��� > �õ��ҽ�         
	contentCodes[62] = new contentCode("goDetailEduEvent.jsp",       "SVCZ000001", "20124", "1");		//�̵� > �󼼺��� > �������         
	contentCodes[63] = new contentCode("goDetailForeignNews.jsp",       "SVCZ000001", "20125", "1");		//�̵� > �󼼺��� > �ؿܱ����ҽ� 
	contentCodes[64] = new contentCode("goDetailKnowQna.jsp",       "SVCZ000001", "20126", "1");		//�̵� > �󼼺��� > ������ϱ�       
	contentCodes[65] = new contentCode("goDetailKnowPds.jsp",       "SVCZ000001", "20127", "1");		//�̵� > �󼼺��� > �ڷᳪ����       
	contentCodes[66] = new contentCode("goDetailKnowFree.jsp",       "SVCZ000001", "20128", "1");		//�̵� > �󼼺��� > �������         
	contentCodes[67] = new contentCode("goDetailKnowPro.jsp",       "SVCZ000001", "20129", "1");		//�̵� > �󼼺��� > �����÷�         
	contentCodes[68] = new contentCode("goDetailBundle.jsp",      "SVCZ000001", "20130", "1");		//�̵� > �󼼺���(�ٷ��̼����ڷ�)        
	contentCodes[69] = new contentCode("goDetailRiss.jsp",        "SVCZ000001", "20131", "1");		//�̵� > �󼼺���(��)                  


	// �󼼰˻�
    contentCodes[70] = new contentCode("metaData.do",             "SVCZ000001", "20118", "1");		// �̵� > �󼼺��� (KEM)
    contentCodes[71] = new contentCode("recommend.do",             "SVCZ000001", "20116", "1");		// �̵� > ��õ�ϱ�
    contentCodes[72] = new contentCode("environmentSet.do",       "SVCZ000001", "10937", "1");		// ���� > ȯ�漳��
    contentCodes[73] = new contentCode("similaritySearch.do",    "SVCZ000001", "20117", "1");		// ���繮�� �˻�


	contentCodes[74] = new contentCode("lessonEstList.do",       "SVCZ000001", "20103", "1");	//�˻� > ������

	// 1-1.�����ڷ� �� �߰��� �׸�
	contentCodes[75] = new contentCode("cyberStudyList.do",       "SVCZ000001", "20502", "1");		//�˻� > �����ڷ� > ���̹������н�
	contentCodes[76] = new contentCode("levelStudyList.do",       "SVCZ000001", "20503", "1");		//�˻� > �����ڷ� > ���غ� �����ڷ�

	// ��õ�˻� ����
	contentCodes[77]  = new contentCode("globalSearchRecommend",         "SVCZ000001", "20949", "1");		//�˻� > ���հ˻� > ��õ�˻�
	contentCodes[78]  = new contentCode("globalSearchRecommend1",         "SVCZ000001", "20953", "1");		//�˻� > ���հ˻� > BEST��õ���� 
	contentCodes[79]  = new contentCode("globalSearchRecommend2",         "SVCZ000001", "20954", "1");		//�˻� > ���հ˻� > ��������õ����

	// ����������ڷ� 
	contentCodes[80]  = new contentCode("inbroadGroupList.do"    ,"SVCZ000001","20941","1");	//�˻�>�׷�˻�>����������ڷ�
	contentCodes[81]  = new contentCode("inbroadScript.do"    ,"SVCZ000001","20941","1");		//�˻�>�׷�˻�>����������ڷ�

	//���̹��˻� ����
	contentCodes[82]  = new contentCode("globalSearchList.jsp",         "SVCZ000001", "21085", "1");		//�˻� > ���հ˻� > ���̹��˻�
	
	//�����ϰ˻� ����
	contentCodes[83]  = new contentCode("simfileGroupList.do",         "", "", "");		//�˻�>�׷�˻�>��������Ʈ����

	//����ī��˻� ����
	contentCodes[84]  = new contentCode("educafeGroupList.do",         "", "", "");		//�˻�> ����ī��


	contentCodes[85]  = new contentCode("NaverOpenApiGroupList.do",         "", "", "");		//�˻�> ����ī��