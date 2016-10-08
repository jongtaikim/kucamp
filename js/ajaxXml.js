var xmlhttp;
var xmlDom = new ActiveXObject("Microsoft.XMLDOM");
var jsXmlDom;

function load_AJAX_XMLHttp() 
{
 	
    try 
    {
      xmlhttp = new ActiveXObject("Msxml2.XMLHTTP");
//      	xmlhttp = new ActiveXObject("Msxml2.XMLHTTP.3.0");
    }
    catch (e)
    {
      try 
      {
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
      } 
      catch (E) 
      {
        xmlhttp = false;
      }
    }
    
   if(!xmlhttp && typeof XMLHttpRequest != 'undefined') 
   {
		try 
		{
		  xmlhttp = new XMLHttpRequest();
		} 
		catch (e) 
		{
		  xmlhttp = false;
		}
  }
  
  return xmlhttp;
}


function AJAX_Request(method,url,params,async,rpfunc)
{
	xmlhttp =  load_AJAX_XMLHttp();
	xmlhttp.open(method, url+"?"+params, async);
    xmlhttp.onreadystatechange = eval(rpfunc);
    xmlhttp.send("");
}
