//{
/**
 * @fileOverview This file contains Husky plugin that takes care of the operations related to the tool bar UI
 * @name hp_SE_Toolbar.js
 */
nhn.husky.SE_Toolbar = $Class({
	name : "SE_Toolbar",
	toolbarArea : null,
	toolbarButton : null,
	uiNameTag : "uiName",
	
	sUIClassPrefix : "husky_seditor_ui_",
	htUIList : {
		fontName : null,
		fontSize : null,
		lineHeight : null,
		fontColor : null,
		bgColor : null,
		bold : null,
		underline : null,
		italic : null,
		lineThrough : null,
		superscript : null,
		subscript : null,
		justifyleft : null,
		justifycenter : null,
		justifyright : null,
		justifyfull : null,
		orderedlist : null,
		unorderedlist : null,
		outdent : null,
		indent : null,
		hyperlink : null,
		quote : null,
		table : null,
		sCharacter : null,
		findAndReplace : null
	},

	aUICmdMap : null,

	$init : function(oAppContainer){
		this.aUICmdMap = {};
		this._assignHTMLObjects(oAppContainer);
	},

	_assignHTMLObjects : function(oAppContainer){
		oAppContainer = $(oAppContainer) || document;
		this.toolbarArea = cssquery.getSingle(".tool", oAppContainer);

		this.aAllButtons = cssquery("BUTTON", this.toolbarArea);

		for(var sUIName in this.htUIList){
			if(this.htUIList[sUIName] != null) continue;

			this.htUIList[sUIName] = cssquery.getSingle("LI."+this.sUIClassPrefix+sUIName+">*:first-child", this.toolbarArea);
		}
	},
	
	$ON_MSG_APP_READY : function(){
		this.oApp.exec("ATTACH_HOVER_EVENTS", [this.aAllButtons]);
		this.oApp.exec("ADD_APP_PROPERTY", ["getToolbarButtonByUIName", $Fn(this.getToolbarButtonByUIName, this).bind()]);
	},

	$BEFORE_SHOW_FOLDING_TOOLBAR_LAYER : function(oLayer, sCmd, aArgs, oBtn){
		this.positionLayer(oLayer, oBtn);
	},

	$ON_SHOW_TOOLBAR_ACTIVE_LAYER : function(oLayer, sCmd, aArgs, oBtn){
		this.positionLayer(oLayer, oBtn);
		this.oApp.exec("SHOW_ACTIVE_LAYER", [oLayer, sCmd, aArgs]);
	},

	$ON_ENABLE_UI : function(sUIName){
		var elUI = this.htUIList[sUIName];
		if(!elUI) return;
		$Element(elUI).removeClass("off");
		elUI.disabled = false;

		// enable related commands
		var sCmd = "";
		if(this.aUICmdMap[sUIName]){
			for(var i=0; i<this.aUICmdMap[sUIName].length;i++){
				sCmd = this.aUICmdMap[sUIName][i];
				this.oApp.exec("ENABLE_COMMAND", [sCmd]);
			}
		}
	},

	$ON_DISABLE_UI : function(sUIName){
		var elUI = this.htUIList[sUIName];
		if(!elUI) return;
		$Element(elUI).addClass("off");
		$Element(elUI).removeClass("hover");
		elUI.disabled = true;

		// disable related commands
		var sCmd = "";
		if(this.aUICmdMap[sUIName]){
			for(var i=0; i<this.aUICmdMap[sUIName].length;i++){
				sCmd = this.aUICmdMap[sUIName][i];
				this.oApp.exec("DISABLE_COMMAND", [sCmd]);
			}
		}
	},

	$ON_SELECT_UI : function(sUIName){
		var elUI = this.htUIList[sUIName];
		if(!elUI) return;
		$Element(elUI).addClass("active");
	},

	$ON_DESELECT_UI : function(sUIName){
		var elUI = this.htUIList[sUIName];
		if(!elUI) return;
		$Element(elUI).removeClass("active");
	},

	$ON_ENABLE_ALL_UI : function(){
		var sUIName, className;

		for(var sUIName in this.htUIList){
			if(sUIName) this.oApp.exec("ENABLE_UI", [sUIName]);
		}
		$Element(this.toolbarArea).removeClass("off");
	},

	$ON_DISABLE_ALL_UI : function(){
		var sUIName;

		for(var sUIName in this.htUIList){
			if(sUIName) this.oApp.exec("DISABLE_UI", [sUIName]);
		}
		$Element(this.toolbarArea).addClass("off");
		this.oApp.exec("HIDE_ACTIVE_LAYER",[]);
	},
	
	$ON_MSG_STYLE_CHANGED : function(sAttributeName, attributeValue){
		if(attributeValue == 1)
			this.oApp.exec("SELECT_UI", [sAttributeName]);
		else
			this.oApp.exec("DESELECT_UI", [sAttributeName]);
	},
	
	$ON_REGISTER_UI_EVENT : function(sUIName, sEvent, sCmd, aParams){
		// map cmd & ui
		if(!this.aUICmdMap[sUIName]){this.aUICmdMap[sUIName] = [];}
		this.aUICmdMap[sUIName][this.aUICmdMap[sUIName].length] = sCmd;
		var elUI = this.htUIList[sUIName];
		if(!elUI) return;
		this.oApp.registerBrowserEvent(elUI, sEvent, sCmd, aParams);
	},
	
	getToolbarButtonByUIName : function(sUIName){
		return this.htUIList[sUIName];
	},

	positionLayer : function(oLayer, oBtn){
		oLayer = $(oLayer);
		oBtn = $(oBtn);

		if(!oLayer) return;
		if(!oBtn || !oBtn.tagName || oBtn.tagName != "BUTTON") return;

		oBtn.parentNode.appendChild(oLayer);
	}
});
//}