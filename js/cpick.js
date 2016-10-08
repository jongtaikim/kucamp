/* 
Author: Eric Simmons
Contact: info@jswitch.com
Website: http://www.jswitch.com
Version: 2.0 12/2004       
Browser TARGET: Mozilla 7+/FireFox Netscape 7+, IE 5.0+
Purpose : Its time for a badly needed update.

DISCLAIMER
THIS SOFTWARE IS PROVIDED "AS IS" AND WITHOUT 
ANY EXPRESS OR IMPLIED WARRANTIES, JSWITCH.COM 
IS NOT RESPONSIBLE FOR ANY ADVERSE AFFECTS TO 
YOUR COMPUTER OR SYSTEM RUNNING THESE SCRIPTS.

v 1.0
Initial implementation of the color tool.
Basic RGB hex color picker.

v2.0
new features: 
Displayable <DIV> layer acts as a popup dailog.
Only requires 2 graphics files.
Can retian up to 8 personal colors.

fixes:
Cleaner JS for more clarity.
Code optimized for speed.


*/

//Changable variables
var STR_CAPTION = "JSwitch Color Picker"
/*This is the function that you can add your code to, or overide and access the color
in the SEL_COLOR variable. The SEL_COLOR variable is a hex value of the currently 
selected color. It is set everytime a user clicks on the ok button. 
After setting the SEL_COLOR var the BtnOk() function calls the "BtnOkClicked()";
function  BtnOkClicked()
{}
*/


var mouseX =0; //current horizontal position of the mouse
var mouseY =0; //current veritcal position of the mouse
var boxX =0;
var boxY =0;
var cpaneX = 0;
var cpaneY = 0;  
var cmapX = 0;
var cmapY = 0;
var cPaneT = 0;
var cPaneL = 0;
var cmapRegSel = 1;
var cmapReg = 0;
var cmapSel = 0;
var InCPane = false;
var InCMap = false;
var U_COL_NUM = 8;
var usrColor = new Array("NA","NA","NA","NA","NA","NA","NA","NA");
var SEL_COLOR;
var IMG_PATH = "/js/";
var TARGET;


//CSS STYLES
var STYLE_BTN = 'text-align:center;cursor:pointer;font-family:\"TAHOMA\";font-size:11pt;font-weight:bold;width:60px;height:20px;background-color:ThreeDHighlight;position:absolute;';
var STYLE_BTN_OVER ='position:absolute;border:1px solid black;text-align:center;cursor:pointer;font-family:"TAHOMA";font-size:11pt;font-weight:bold;background-color:ThreeDHighlight';
var STYLE_BTN_DOWN ='border-bottom:1px solid ButtonHighlight;border-right:1px solid ButtonHighlight;border-top:1px solid ButtonShadow;border-left:1px solid ButtonShadow;';
var STYLE_BORD =    'position:absolute;border:1px solid black;';
var STYLE_CMAP =    'position:absolute;border:1px solid black;background-image:url(\''+IMG_PATH+'cmap.jpg\'); background-repeat:no-repeat;';
//var STYLE_MASK_MZ = 'position:absolute;border:1px solid black;cursor:crosshair;width:257px;height:258px;left:5px;top:30px;';
var STYLE_MASK_MS = 'position:absolute;border:1px solid black;cursor:crosshair;width:257px;height:258px;left:5px;top:30px;';
var STYLE_USER =    'position:absolute;border:1px solid black;width:20px;height:20px;top:295px;cursor:pointer;';
var STYLE_TAG =     'position:absolute;border:1px solid black;color:white;text-align:center;width:40px;height:20px';
var STYLE_TEXT =    'width:30px;height:20px;position:absolute;';
var STYLE_COMP =    'position:absolute;border:1px solid black;width:60px;height:20px;';

document.onmousemove = getXY; //get new cords when mouse is moved  
if (navigator.appName == "Microsoft Internet Explorer")
{
    cPaneT = 34;
    cPaneL = 9;
} else
{
    cPaneT = 32;
    cPaneL = 6;
    document.captureEvents(Event.MOUSEMOVE);
}

GetCookieArray();

function ShowLayer(target)
{

TARGET = target;
    var mainDiv = document.getElementById("main");
        boxY = mouseY;
        boxX = mouseX;
        mainDiv.style.top = boxY
        mainDiv.style.left = boxX;
        mainDiv.style.display = 'inline';
//        IMG_PATH = mainDiv.getAttribute("imgLoc");
        mainDiv.innerHTML= MakeDivLayer();

        if(navigator.appName == "Microsoft Internet Explorer")
            document.getElementById("cPaneMask").style.filter = "progid:DXImageTransform.Microsoft.AlphaImageLoader(src='"+IMG_PATH+"cmask.png', sizingMethod='scale')" ;
        else
            document.getElementById("cPaneMask").style.backgroundImage = 'url('+IMG_PATH+'cmask.png)';
        UpdateUserColor();
}

function SetUserColor()
{
    curCol = document.getElementById("cComp1").style.backgroundColor;
    for (i=U_COL_NUM-1;i>0;i--)
    {
        usrColor[i] = usrColor[i-1];
    }
    if(curCol.substr(0,1) == "r")
        curCol = rgb2hex(curCol);
    usrColor[0] = curCol;
    UpdateUserColor();
    UpdateUserCookie();
}

function UpdateUserColor()
{   
    divName = "cUser";
    for (i=0;i<U_COL_NUM;i++)
    {
        tempName =divName + i;
        if (usrColor[i] != "NA")
            document.getElementById(tempName).style.backgroundColor = usrColor[i];
    }
}

function UpdateUserCookie()
{
    date = new Date();
    date.setTime(date.getTime() + (1000 * 60 * 60 * 24 * 30)); 
    document.cookie = "cUser" + "=" + escape(usrColor.toString()) + "; expires=" + date.toGMTString();  
}

function GetCookieArray()
{      
   tmpColor = GetUserCookie("cUser").split(",");
   for(i=0;i<tmpColor.length;i++)
   {
       if(tmpColor[i] != "")
       {    
           usrColor[i] = tmpColor[i];
       }
               
   }
}

function SetRetainColor(userObj)
{
    newColor =  userObj.style.backgroundColor;
    document.getElementById("cComp1").style.backgroundColor = newColor;

    if(newColor.substr(0,1) == "r")
        document.getElementById("thex").value = rgb2hex(newColor);
    else
        document.getElementById("thex").value = newColor;
}

function GetUserCookie(crumbName)
{
    colCookie = document.cookie.split("; ");
    
    for (a=0; a < colCookie.length; a++)
    {
        colCrumb = colCookie[a].split("=");                    
        if(colCrumb[0] == crumbName)
            return unescape(colCrumb[1]);
    }

    return "";

}

function getXY(e)
{
    if (!e)
    {
        mouseX = event.x;
        mouseY = event.y;
    } else
    {
        mouseX = e.pageX; 
        mouseY = e.pageY; 
    }     
    
    if (InCPane)
    {
        cpaneX = mouseX - boxX-cPaneL;
        cpaneY = mouseY - boxY-cPaneT;
        if (cpaneX < 0) cpaneX = 0;
        if (cpaneX > 255) cpaneX = 255;
        if (cpaneY < 0) cpaneY = 0;
        if (cpaneY > 255) cpaneY = 255;
        FindColor();
    }

    if (InCMap)
    {
        cmapX =  mouseX - boxX-272;
        cmapY =  mouseY - boxY-32;
        if (cmapX < 1) cmapX = 1;
        if (cmapX > 60) cmapX = 60;
        if (cmapY < 0) cmapY = 0;
        if (cmapY > 255) cmapY = 255;
        cmapReg =  Math.ceil(cmapX/10);
        
        
        document.getElementById("red").value = String(cmapX);   
        document.getElementById("grn").value = String(cmapY);
        document.getElementById("blu").value = String(cmapReg);
    }

}

function GetMapColor()
{
    var rtnColor
    
    cmapSel = cmapY;
    document.getElementById("cmapCur").style.top  =cmapY-1;
    document.getElementById("cmapCur").style.left  = ((cmapReg-1)*10);
    cmapRegSel = cmapReg;
    switch (cmapReg)
    {
    case 1:
        rtnColor = '#' + dec2hex(255) + dec2hex(0) + dec2hex(cmapSel);
        break;
    case 2:
        rtnColor = '#' + dec2hex(cmapSel) + dec2hex(0) + dec2hex(255);
        break;
    case 3:
        rtnColor = '#' + dec2hex(0) + dec2hex(cmapSel) + dec2hex(255);
        break;
    case 4:
        rtnColor = '#' + dec2hex(0) + dec2hex(255) + dec2hex(cmapSel);
        break;
    case 5:
        rtnColor = '#' + dec2hex(cmapSel) + dec2hex(255) + dec2hex(0);
        break;
    case 6:
        rtnColor = '#' + dec2hex(255) + dec2hex(cmapSel) + dec2hex(0);
        break;  
    }  
    return rtnColor;
}

function GetNewColor()
{
    newColor = FindColor();
    document.getElementById("cComp1").style.backgroundColor = newColor;
    document.getElementById("thex").value = newColor;
}

function FindColor()
{
    var X;
    var Y;
    var Z;
    var R;
    var G;
    var B;
    
    X = cpaneX;
    Y = Math.round (cpaneY * (X/255));
    Z = (cpaneY * ((255-cmapSel)/255)) + cmapSel;
    Z = Math.round( Z * (cpaneX/255));
    
    switch (cmapRegSel)
    {
    case 1:
        R = X;G = Y;B = Z;
        break;
    case 2:
        R = Z;G = Y;B = X;
        break;
    case 3:
        R = Y;G = Z;B = X;
        break;
    case 4:
        R = Y;G = X;B = Z;
        break;
    case 5:
        R = Z;G = X;B = Y;
        break;
    case 6:
        R = X;G = Z;B = Y;
        break;  
    }

    bgRed   = '#' + dec2hex(R) + dec2hex(0) + dec2hex(0);
    bgGrn   = '#' + dec2hex(0) + dec2hex(G) + dec2hex(0);
    bgBlu   = '#' + dec2hex(0) + dec2hex(0) + dec2hex(B);
    rtnColor = '#' + dec2hex(R) + dec2hex(G) + dec2hex(B);
    
    document.getElementById("red").value = String(R);   
    document.getElementById("grn").value = String(G);
    document.getElementById("blu").value = String(B);
    document.getElementById("red").style.backgroundColor = bgRed;   
    document.getElementById("grn").style.backgroundColor = bgGrn; 
    document.getElementById("blu").style.backgroundColor = bgBlu; 
    document.getElementById("cComp2").style.backgroundColor = rtnColor;
    return rtnColor;
}

function ChangePaneColor(nColor)
{
    document.getElementById("cPane").style.backgroundColor = nColor;
}

function rgb2hex(rgb)
{
    rExp = new RegExp("RGB", "i"); 
    rgb = rgb.replace(rExp,"");
    rgb = rgb.substring(1,rgb.length-1);
    rgbAry = rgb.split(", ");
    rtnStr = "#" + dec2hex(parseInt(rgbAry[0])) + dec2hex(parseInt(rgbAry[1])) + dec2hex(parseInt(rgbAry[2]))
    return rtnStr;
}
function dec2hex(n) 
{ 
    s=(n.toString(16));
    s=s.toUpperCase();
    if (s.length == 1)
        s = '0' + s
    return(s); 
} 

function BtnCancel()
{
    document.getElementById("main").style.display = "none";
}


function BtnOk()
{
    SEL_COLOR = document.getElementById("thex").value
    BtnCancel();
    BtnOkClicked(TARGET);
} 

function MakeDivLayer()
{
    var newDivLayer;
    newDivLayer = '<div id="title" style="width:337px;height:22px;border-bottom:1px solid black;font-weight:bold;color:white;text-align:center;background-color:#0C58C2;">' + STR_CAPTION + '</div>';
    newDivLayer += '<div id="cPane" style="border-left:1px solid black;position:absolute;width:257px;height:258px;left:5px;top:30px;background-color:red;"></div>';
    newDivLayer += '<div style="'+STYLE_MASK_MS+'" id="cPaneMask" onmouseout="InCPane=false;" onMouseMove="InCPane=true;" onclick="GetNewColor();"></div>';
    newDivLayer += '<div style="cursor:crosshair;width:60px;height:258px;left:270px;top:30px;'+STYLE_CMAP+'" id="cMap" onclick="ChangePaneColor(GetMapColor());" onmouseout="InCMap=false;" onMouseMove="InCMap=true;">';
    newDivLayer += '<div id="cmapCur" style="position:absolute;left:0px;top:0px;width:10px;height:1px;border-bottom:1px solid black"><!-- --></div>';
    newDivLayer += '</div>';
    newDivLayer +='<div  style="left:270px;top:295px;'+STYLE_COMP+'" id="cComp1"></div>';
    newDivLayer += '<div style="left:270px;top:320px;'+STYLE_COMP+'" id="cComp2"></div>';
    newDivLayer += '<div style="width:40px;left:5px;top:295px;'+STYLE_BTN_OVER+'" id="btnUser" onclick="SetUserColor();">>></div>';
    newDivLayer += '<div style="left:65px;'+STYLE_USER+'"  id="cUser0" onclick="SetRetainColor(this);"></div>';
    newDivLayer += '<div style="left:90px;'+STYLE_USER+'"  id="cUser1" onclick="SetRetainColor(this);"></div>';
    newDivLayer += '<div style="left:115px;'+STYLE_USER+'" id="cUser2" onclick="SetRetainColor(this);"></div>';
    newDivLayer += '<div style="left:140px;'+STYLE_USER+'" id="cUser3" onclick="SetRetainColor(this);"></div>';
    newDivLayer += '<div style="left:165px;'+STYLE_USER+'" id="cUser4" onclick="SetRetainColor(this);"></div>';
    newDivLayer += '<div style="left:190px;'+STYLE_USER+'" id="cUser5" onclick="SetRetainColor(this);"></div>';
    newDivLayer += '<div style="left:215px;'+STYLE_USER+'" id="cUser6" onclick="SetRetainColor(this);"></div>';
    newDivLayer += '<div style="left:240px;'+STYLE_USER+'" id="cUser7" onclick="SetRetainColor(this);"></div>';
    newDivLayer += '<div style="width:60px;left:200px;top:345px;'+STYLE_BTN_OVER+'"  id="btnOK"  onclick="BtnOk();" >ok</div>';
    newDivLayer += '<div style="width:60px;left:270px;top:345px;'+STYLE_BTN_OVER+'"  id="btnCan" onclick="BtnCancel();">close</div>';
    newDivLayer += '<div style="'+STYLE_TEXT+';width:90px;left:5px;top:345px;">Triple Hex:</div>';
    newDivLayer += '<div style="left:5px;top:320px;'+STYLE_TEXT+'"  >RED:</div>'; 
    newDivLayer += '<div style="left:94px;top:320px;'+STYLE_TEXT+'"  >GRN:</div>';
    newDivLayer += '<div style="left:185px;top:320px;'+STYLE_TEXT+'" >BLU:</div>';
    newDivLayer += '<input style="text-align:center;width:70px;height:20px;left:85px;top:345px;'+STYLE_BORD+'" type="text" ID="thex">';
    newDivLayer += '<input type="text" style="left:40px;top:320px;'+STYLE_TAG+'"  id="red">'; 
    newDivLayer += '<input type="text" style="left:130px;top:320px;'+STYLE_TAG+'" id="grn">';
    newDivLayer += '<input type="text" style="left:220px;top:320px;'+STYLE_TAG+'" id="blu">';
    return newDivLayer;
}















