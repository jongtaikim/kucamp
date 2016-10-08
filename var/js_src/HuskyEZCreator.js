/**
 * @fileOverview This file contains application creation helper function, which would load up an HTML(Skin) file and then execute a specified create function.
 * @name HuskyEZCreator.js
 */
nhn.husky.EZCreator = new ($Class({
	createEditor : function(oEditorRef, elTextarea, sEditorURI, fCreator, fOnAppLoad){
		elTextarea = $(elTextarea);
		welTextarea = $Element(elTextarea);
		fCreator = fCreator || createSEditor;
		var elPlaceHolder = document.createElement("DIV");

		elTextarea.parentNode.insertBefore(elPlaceHolder, elTextarea);
		nEditingAreaHeight = elTextarea.offsetHeight;
		nEditingAreaWidth = welTextarea.css("width");
		elTextarea.style.display = "none";

		elPlaceHolder.style.width = nEditingAreaWidth;
		
		this.loadEditor(oEditorRef, elPlaceHolder, sEditorURI, elTextarea, fCreator, fOnAppLoad, nEditingAreaHeight);
	},
	loadEditor : function(oEditorRef, elPlaceHolder, sEditorURI, elTextarea, fCreator, fOnAppLoad, nEditingAreaHeight){
		elPlaceHolder.innerHTML = 'Loading...';
		var fOnload = $Fn(this._onAjaxResponseReceived, this).bind(oEditorRef, elPlaceHolder, elTextarea, fCreator, fOnAppLoad, nEditingAreaHeight);

		var wajReq = new $Ajax (sEditorURI, {
			onload : fOnload
		});
		wajReq.request();
	},
	_onAjaxResponseReceived : function(oEditorRef, elPlaceHolder, elTextarea, fCreator, fOnAppLoad, nEditingAreaHeight, oResponse){
		var sTemplate = oResponse.text();

		sTemplate.match(/<body>([\s|\S]*)<\/body>/i);

		sTemplate = RegExp.$1;
		elPlaceHolder.innerHTML = sTemplate;

		var oEditor = fCreator(elPlaceHolder, elTextarea, nEditingAreaHeight);
		oEditor.run(fOnAppLoad);
		
		if(oEditorRef instanceof Array) oEditorRef[oEditorRef.length] = oEditor;
	}
}))();