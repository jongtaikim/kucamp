/**
 * @fileOverview This file contains Smart Editor Basic creation function
 * @name SEditor.js
 */
function createSEditor(elAppContainer, elIRField, nHeight){
	elAppContainer = $(elAppContainer);
	elIRField = $(elIRField);
	var oWYSIWYGIFrame = cssquery.getSingle(".input_area IFRAME.input_wysiwyg", elAppContainer);
	var oHTMLSrcTextarea = cssquery.getSingle(".input_area TEXTAREA.input_syntax", elAppContainer);
	var oIRTextarea = elIRField?elIRField:cssquery.getSingle(".input_area TEXTAREA.blind", elAppContainer);
	
	var oEditor = new nhn.husky.HuskyCore();


	oEditor.registerPlugin(new nhn.husky.StringConverterManager());
	oEditor.registerPlugin(new nhn.husky.SE_EditingAreaManager("WYSIWYG", oIRTextarea, {nHeight:nHeight}, null, elAppContainer));
	oEditor.registerPlugin(new nhn.husky.SE_EditingArea_WYSIWYG(oWYSIWYGIFrame));
	oEditor.registerPlugin(new nhn.husky.SE_EditingArea_HTMLSrc(oHTMLSrcTextarea));

	oEditor.registerPlugin(new nhn.husky.Utils());
	oEditor.registerPlugin(new nhn.husky.DialogLayerManager());
	oEditor.registerPlugin(new nhn.husky.ActiveLayerManager());
	oEditor.registerPlugin(new nhn.husky.HuskyRangeManager(oWYSIWYGIFrame));

	oEditor.registerPlugin(new nhn.husky.Hotkey());

	oEditor.registerPlugin(new nhn.husky.SE_WYSIWYGStyler());
	oEditor.registerPlugin(new nhn.husky.SE_WYSIWYGStyleGetter());
	oEditor.registerPlugin(new nhn.husky.SE_Toolbar(elAppContainer));

	oEditor.registerPlugin(new nhn.husky.SE_ExecCommand(oWYSIWYGIFrame));

	oEditor.registerPlugin(new nhn.husky.SE_WYSIWYGEnterKey(oWYSIWYGIFrame));

	oEditor.registerPlugin(new nhn.husky.SE_ColorPalette(elAppContainer));
	oEditor.registerPlugin(new nhn.husky.SE_FontColor(elAppContainer));
	oEditor.registerPlugin(new nhn.husky.SE_BGColor(elAppContainer));
	
	oEditor.registerPlugin(new nhn.husky.SE_Quote(elAppContainer));
	
	oEditor.registerPlugin(new nhn.husky.SE_FontNameWithSelectUI(elAppContainer));
	oEditor.registerPlugin(new nhn.husky.SE_FontSizeWithSelectUI(elAppContainer));
	oEditor.registerPlugin(new nhn.husky.SE_LineHeightWithSelectUI(elAppContainer));

	oEditor.registerPlugin(new nhn.husky.SE_UndoRedo());

	oEditor.registerPlugin(new nhn.husky.SE_Table(elAppContainer));
	
	oEditor.registerPlugin(new nhn.husky.SE_Hyperlink(elAppContainer));
	
	oEditor.registerPlugin(new nhn.husky.SE_EditingModeToggler(elAppContainer));

	oEditor.registerPlugin(new nhn.husky.MessageManager(oMessageMap));
	oEditor.registerPlugin(new nhn.husky.SE_SCharacter(elAppContainer));

	oEditor.registerPlugin(new nhn.husky.SE_FindReplacePlugin(elAppContainer));

	oEditor.registerPlugin(new nhn.husky.SE_EditingAreaVerticalResizer(elAppContainer, 100));

	return oEditor;
}