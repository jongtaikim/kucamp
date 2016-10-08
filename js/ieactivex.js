/* @Author: Hooriza (http://hooriza.com) */
/*@cc_on @if (@_win32) 
var EMBED =
{
	timer : null,
	objectsList : null,

	hasParentObject : function(obj)
	{
		while(1)
		{
			if (!(obj = obj.parentNode)) break;
			if (obj.tagName == "OBJECT" || obj.tagName == "EMBED") return true;
		}
		
		return false;
	},

	addObjectsList : function(tagname)
	{
		var objects = document.getElementsByTagName(tagname);

		for (var i = 0; i < objects.length; i++)
		{
			if (!EMBED.hasParentObject(objects[i]) && !objects[i].done)
			{
				EMBED.objectsList.push(objects[i]);
				objects[i].done = true;
			}
		}
	},

	activateAllObjects : function()
	{
		EMBED.objectsList = new Array();

		EMBED.addObjectsList("OBJECT");
		EMBED.addObjectsList("EMBED");

		for (var i = 0; i < EMBED.objectsList.length; i++)
			EMBED.activateObject(EMBED.objectsList[i]);

		delete EMBED.objectsList;
	},

	activateObject : function(obj)
	{
		var clone = document.createElement("SPAN");
		var code = obj.outerHTML;

		obj.parentNode.insertBefore(clone, obj);

		obj.runtimeStyle.display = "none"; // 15일 후에는 이것만 넣고 removeChild 안해도 될듯...
		obj.parentNode.removeChild(obj);

		clone.innerHTML = code;
	}
}

EMBED.timer = setInterval(EMBED.activateAllObjects, 200);
window.attachEvent("onload", function() { clearInterval(EMBED.timer); EMBED.timer = null; EMBED.activateAllObjects(); });
@end@*/ 