//{
/**
 * @fileOverview This file contains Husky plugin that takes care of the operations related to inserting special characters
 * @name hp_SE_SCharacter.js
 */
nhn.husky.SE_SCharacter = $Class({
	name : "SE_SCharacter",
	requiredPlugin : ["HuskyRangeManager"],

	$init : function(oAppContainer){
		this.bIE = $Agent().navigator().ie;

		this._assignHTMLObjects(oAppContainer);
	},
	
	_assignHTMLObjects : function(oAppContainer){
		oAppContainer = $(oAppContainer) || document;

		this.elDropdownLayer = cssquery.getSingle("DIV.husky_seditor_sCharacter_layer", oAppContainer);

		this.oTextField = cssquery.getSingle("INPUT", this.elDropdownLayer);
		this.oInsertButton = cssquery.getSingle("+ BUTTON", this.oTextField);
		this.aCloseButton = cssquery("BUTTON.close", this.elDropdownLayer);
		this.aSCharList = cssquery(".list", this.elDropdownLayer);
		var oLabelUL = cssquery.getSingle(">UL", this.elDropdownLayer);
		this.aLabelA = cssquery("A", oLabelUL);
	},
	
	$ON_MSG_APP_READY : function(){
		var funcInsert = $Fn(this.oApp.exec, this.oApp).bind("INSERT_SCHARACTERS", [this.oTextField.value]);
		$Fn(funcInsert, this).attach(this.oInsertButton, "click");

		for(var i=0; i<this.aLabelA.length; i++){
			var func = $Fn(this.oApp.exec, this.oApp).bind("CHANGE_SCHARACTER_SET", [i]);
			$Fn(func, this).attach(this.aLabelA[i], "mousedown");
		}

		for(var i=0; i<this.aCloseButton.length; i++){
			this.oApp.registerBrowserEvent(this.aCloseButton[i], "click", "HIDE_ACTIVE_LAYER", []);
		}
		
		this.oApp.registerBrowserEvent(this.elDropdownLayer, "click", "EVENT_SCHARACTER_CLICKED", []);

		this.oApp.exec("ATTACH_HOVER_EVENTS", [cssquery("LI>BUTTON", this.elDropdownLayer)]);

		this.oApp.exec("REGISTER_UI_EVENT", ["sCharacter", "click", "SHOW_SCHARACTER_LAYER"]);
	},
	
	$ON_SHOW_SCHARACTER_LAYER : function(){
		this.oTextField.value = "";
		this.oSelection = this.oApp.getSelection();

		this.oApp.exec("SHOW_TOOLBAR_ACTIVE_LAYER", [this.elDropdownLayer]);
	},

	$ON_EVENT_SCHARACTER_CLICKED : function(weEvent){
		var elButton = weEvent.element;
		if(elButton.tagName != "BUTTON") return;
		if(elButton.parentNode.tagName != "LI") return;
		
		var sChar = elButton.firstChild.innerHTML;

		this.oApp.exec("SELECT_SCHARACTER", [sChar]);
	},
	
	$ON_SELECT_SCHARACTER : function(schar){
		this.oTextField.value += schar;

		// move the cursor to the end of the last character
		if(this.oTextField.createTextRange){
			var oTextRange = this.oTextField.createTextRange();
			oTextRange.collapse(false);
			oTextRange.select();
		}else{
			if(this.oTextField.selectionEnd){
				this.oTextField.selectionEnd = this.oTextField.value.length;
				this.oTextField.focus();
			}
		}
	},
	
	$ON_INSERT_SCHARACTERS : function(){
		this.oSelection.pasteHTML(this.oTextField.value);
		this.oApp.exec("HIDE_ACTIVE_LAYER", []);
	},

	$ON_CHANGE_SCHARACTER_SET : function(nSCharSet){
		for(var i=0; i<this.aSCharList.length; i++){
			if(this.aSCharList[i].style.display == "block"){
				if(i == nSCharSet) return;
				
				$Element(this.aLabelA[i]).removeClass("on");
				this.aSCharList[i].style.display = "none";
			}
		}
		
		$Element(this.aLabelA[nSCharSet]).addClass("on");
		this.aSCharList[nSCharSet].style.display = "block";
	}
});
//}