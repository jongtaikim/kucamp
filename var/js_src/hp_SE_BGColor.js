//{
/**
 * @fileOverview This file contains Husky plugin that takes care of changing the background color
 * @name hp_SE_BGColor.js
 */
nhn.husky.SE_BGColor = $Class({
	name : "SE_BGColor",
	rxColorPattern : /^#?[0-9a-fA-F]{6}$|^rgb\(\d+, ?\d+, ?\d+\)$/i,
	
	$init : function(elAppContainer){
		this._assignHTMLObjects(elAppContainer);
	},
	
	_assignHTMLObjects : function(elAppContainer){
		this.elDropdownLayer = cssquery.getSingle("DIV.husky_seditor_bgcolor_layer", elAppContainer);
	},
	
	$ON_MSG_APP_READY : function(){
		this.oApp.exec("REGISTER_UI_EVENT", ["bgColor", "click", "SHOW_BGCOLOR_LAYER"]);

		this.oApp.registerBrowserEvent(this.elDropdownLayer, "click", "EVENT_APPLY_BGCOLOR", []);
	},
	
	$ON_SHOW_BGCOLOR_LAYER : function(){
		this.oApp.exec("SHOW_COLOR_PALETTE", ["APPLY_BGCOLOR", this.elDropdownLayer]);
		this.oApp.exec("SHOW_TOOLBAR_ACTIVE_LAYER", [this.elDropdownLayer]);
		this.oSelection = this.oApp.getSelection();
	},

	$ON_EVENT_APPLY_BGCOLOR : function(weEvent){
		var elButton = weEvent.element;

		// Safari/Chrome/Opera may capture the event on Span
		if(elButton.tagName == "SPAN") elButton = elButton.parentNode;
		if(elButton.tagName != "BUTTON") return;

		var sBGColor, sFontColor;

		sBGColor = elButton.style.backgroundColor;
		sFontColor = elButton.style.color;

		this.oApp.exec("APPLY_BGCOLOR", [sBGColor, sFontColor]);
	},

	$ON_APPLY_BGCOLOR : function(sBGColor, sFontColor){
		if(!this.rxColorPattern.test(sBGColor)){
			alert(this.oApp.$MSG("SE_BGColor.invalidColorCode"));
			return;
		}
		
		this.oSelection.select();
		
		var oStyle = {"backgroundColor": sBGColor}
		if(sFontColor) oStyle.color = sFontColor;
		
		this.oApp.exec("SET_WYSIWYG_STYLE", [oStyle]);
		
		this.oApp.exec("HIDE_ACTIVE_LAYER");
	}
});
//}