var STATICMENU;
var stmnScrollSpeed = 10;
var stmnTimer;

var check = 0;

function RefreshStaticMenu()
{
	var stmnStartPoint = parseInt(STATICMENU.style.top + 10, 10);
	var stmnEndPoint = parseInt(document.documentElement.scrollTop + 150, 10);
	
	if( check < 10 )
	{
		check++;
	}

	var stmnRefreshTimer = 1;
	
	if ( stmnStartPoint != stmnEndPoint ) {
			stmnScrollAmount = Math.ceil( Math.abs( stmnEndPoint - stmnStartPoint ) / 17 );
			STATICMENU.style.top = parseInt(STATICMENU.style.top, 10) + ( ( stmnEndPoint<stmnStartPoint ) ? -stmnScrollAmount : stmnScrollAmount ) + "px";
			stmnRefreshTimer = stmnScrollSpeed;
	}

	stmnTimer = setTimeout ("RefreshStaticMenu();", stmnRefreshTimer);
}

var check = false;
function InitializeStaticMenu()
{
	STATICMENU = document.getElementById("dvQuickButton");
	STATICMENU.style.top = ( document.documentElement.scrollTop + 50 ) + "px";
	RefreshStaticMenu();
	DivPostSet();
	return;
}

function getObjId(name)
{
	return document.getElementById(name);
}


function DivPostSet()
{
	var bodyObj = document.getElementsByTagName("body").item(0);
	var startpox = bodyObj.offsetWidth/2 + 470;
	
	
	
	return;
}


if (window.addEventListener) { // W3C
	window.addEventListener("load", InitializeStaticMenu, false);
	window.addEventListener("resize", DivPostSet, false);
} 
else if (window.attachEvent) { // IE
	window.attachEvent("onload", InitializeStaticMenu);
	window.attachEvent("onresize", DivPostSet);
} else {
	window.resize = DivPostSet();
}
