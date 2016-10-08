//{
/**
 * @fileOverview This file contains Husky plugin that takes care of the layers that should disappear when the focus is lost
 * @name hp_ActiveLayerManager.js
 */
nhn.husky.ActiveLayerManager = $Class({
	name : "ActiveLayerManager",
	oCurrentLayer : null,

	$ON_SHOW_ACTIVE_LAYER : function(oLayer, sOnCloseCmd, aOnCloseParam){
		oLayer = $(oLayer);
		this.sOnCloseCmd = sOnCloseCmd;
		this.aOnCloseParam = aOnCloseParam;

		var oPrevLayer = this.oCurrentLayer;

		this.oApp.exec("HIDE_ACTIVE_LAYER", []);

		if(oLayer == oPrevLayer) return;

		oLayer.style.display = "block";
		this.oCurrentLayer = oLayer;
	},

	$ON_HIDE_ACTIVE_LAYER : function(){
		var oLayer = this.oCurrentLayer;
		if(!oLayer) return;
		oLayer.style.display = "none";
		this.oCurrentLayer = null;

		if(this.sOnCloseCmd)
			this.oApp.exec(this.sOnCloseCmd, this.aOnCloseParam);
	},

	// for backward compatibility issues only.
	// use HIDE_ACTIVE_LAYER instead!
	$ON_HIDE_CURRENT_ACTIVE_LAYER : function(){
		this.oApp.exec("HIDE_ACTIVE_LAYER", []);
	},

	$ON_EVENT_EDITING_AREA_KEYDOWN : function(){
		this.oApp.exec("HIDE_ACTIVE_LAYER", []);
	},

	$ON_EVENT_EDITING_AREA_MOUSEDOWN : function(){
		this.oApp.exec("HIDE_ACTIVE_LAYER", []);
	}
});
//}