<?php
require_once(dirname(dirname(__FILE__)) . '/config.inc.php');
?>
/**
 * Functions for the image listing, used by images.php only	
 * @author $Author: Wei Zhuo $
 * @version $Id: images.js 26 2004-03-31 02:35:21Z Wei Zhuo $
 * @package ImageManager
 */


	function changeDir(newDir) 
	{
		showMessage('<?php _e("Loading","ImageManager"); ?>');
		location.href = "images.php?dir="+newDir;
	}


	function newFolder(dir, newDir) 
	{
		location.href = "images.php?dir="+dir+"&newDir="+newDir;
	}

	//update the dir list in the parent window.
	function updateDir(newDir)
	{
		var selection = window.top.document.getElementById('dirPath');
		if(selection)
		{
			for(var i = 0; i < selection.length; i++)
			{
				var thisDir = selection.options[i].text;
				if(thisDir == newDir)
				{
					selection.selectedIndex = i;
					showMessage('<?php _e("Loading","ImageManager"); ?>');
					break;
				}
			}		
		}
	}

	function selectImage(filename, alt, width, height) 
	{
		var topDoc = window.top.document;
		
		var obj = topDoc.getElementById('f_file');  obj.value = filename;
		var obj = topDoc.getElementById('f_url');  obj.value = filename;
		var obj = topDoc.getElementById('f_width');  obj.value = width;
		var obj = topDoc.getElementById('f_width'); obj.value = width;
		var obj = topDoc.getElementById('f_height'); obj.value = height;
		var obj = topDoc.getElementById('f_alt'); obj.value = alt;
		var obj = topDoc.getElementById('orginal_width'); obj.value = width;
		var obj = topDoc.getElementById('orginal_height'); obj.value = height;		
		var obj = topDoc.getElementById('f_insert'); obj.value = <?php echo $IMConfig['insertas'];?>;		
		var obj = topDoc.getElementById('f_thumb_url'); obj.value = filename;		
	}

	function showMessage(newMessage) 
	{
		var topDoc = window.top.document;

		var message = topDoc.getElementById('message');
		var messages = topDoc.getElementById('messages');
		if(message && messages)
		{
			if(message.firstChild)
				message.removeChild(message.firstChild);

			message.appendChild(topDoc.createTextNode(newMessage));
			
			messages.style.display = "block";
		}
	}

	function addEvent(obj, evType, fn)
	{ 
		if (obj.addEventListener) { obj.addEventListener(evType, fn, true); return true; } 
		else if (obj.attachEvent) {  var r = obj.attachEvent("on"+evType, fn);  return r;  } 
		else {  return false; } 
	} 

	function confirmDeleteFile(file) 
	{
		if(confirm('<?php _e("Delete file?","ImageManager"); ?>'))
			return true;
	
		return false;		
	}

	function confirmDeleteDir(dir, count) 
	{
		if(count > 0)
		{
			alert('<?php _e("Please delete all files/folders inside the folder you wish to delete first.","ImageManager"); ?>');
			return;
		}

		if(confirm('<?php _e("Delete folder?","ImageManager"); ?>')) 
			return true;

		return false;
	}

	addEvent(window, 'load', init);