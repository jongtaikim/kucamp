<SCRIPT language="javascript">
<!--
var oldPos = 0;            //클릭시 마우스좌표
var oldPixel = 0;        //클릭시 슬라이더 좌표
var bDrag = false;            //움직임
var bPlay = false;                //플레이중

/********************************************************************
재생 관련
********************************************************************/
var progressBar_StartPixel =0;        //플레이바 시작위치
var progressBar_Size = 280;        //플레이바 크기
function progressBar_onmousedown() {
    if (!bPlay)
        return ;
        
    if (MediaPlayer.CurrentPosition == -1 )        //Player.FileName이 설정되어 있지 않으면 걍 리턴해 버린다.
        return false;

    oldPos = event.clientX;
    bDrag  = true;
    TrackBar = event.srcElement.parentElement;
    oldPixel = progressBar.style.pixelLeft; 
    document.onmousemove = PlayMoveSlider;
    if(document.all)
    {
        document.onmouseup = PlayStopSlider;
    }
}

function PlayMoveSlider() {
    if (bDrag) {
        var XPos = oldPixel + (event.clientX - oldPos);    //최초 마우스다운일때 좌표에서 mousemove한 좌표값
        if((progressBar_StartPixel <= XPos  )
            && (XPos <= progressBar_StartPixel + (progressBar_Size  ) ) )    
        {
        
            //프로그래스바 이동
            document.all.progressBar.style.pixelLeft = XPos;
                
        }//if((XPos >= startVolPos) &&....
        return false;
    }
    
}


function PlayStopSlider() {

    bDrag = false;
        
    MediaPlayer.currentPosition  = Pixel2Pos(progressBar.style.pixelLeft - progressBar_StartPixel)
    if (MediaPlayer.PlayState == 1)    //일시 중지 일때, 즉 스라이더 움직임에 의해 중단되었을 때만, 다시 실행
        MediaPlayer.Play();        
        
    document.onmousemove = null;
    if(document.all);
        document.onmouseup = null;
}    

function Pixel2Pos(nPixel)
{
        return parseInt((nPixel) * MediaPlayer.Duration / progressBar_Size);
}


/*********************************************************************
volume관련
**********************************************************************/
var imgpath = "http://www.blueb.co.kr/SRC/javascript/image5/naver_movie";
var volumeMin = -3000;        
var volumeMax = 0;
var volumeValue = 0;
var oldVolume = 0;
var VolumeBar_StartPixel = 0;
var VolumeBar_Size = 34;    //볼륨바 크기

function VolumeBar_onmousedown() {
    if (!bPlay)
        return ;
        
    oldPos = event.clientX;                            //최초 마우스다운일때 좌표
    oldPixel = VolumeBar.style.pixelLeft;                //최초 마우스다운 일때 슬라이더좌표
    oldVolume = MediaPlayer.Volume
    bDrag = true;
    document.onmousemove = VolumeMoveSlider;            //onmousemove캡쳐
    if (document.all)
        document.onmouseup=VolumeStopSlider;        //onmousemove 해제
}

function VolumeMoveSlider() {
    if (bDrag) {
        var XPos = oldPixel + event.clientX - oldPos;    //최초 마우스다운일때 좌표에서 mousemove한 좌표값
        
        if((VolumeBar_StartPixel <= XPos  )
            && (XPos <= VolumeBar_StartPixel + VolumeBar_Size ) )    
        {
            
            VolumeBar.style.pixelLeft = XPos;    //마우스 이동한 만큼 슬라이더 이동
            vol_position_bg.style.width = VolumeBar.style.pixelLeft - VolumeBar_StartPixel;
            var mouseMove = XPos - oldPixel;    //마우스이동값
            var currentVolumeValue = oldVolume - parseInt(mouseMove * volumeMin / VolumeBar_Size );
            
            if( currentVolumeValue <= -4929) 
                MediaPlayer.Volume = volumeMin;
            else if (currentVolumeValue >= volumeMax)
                MediaPlayer.Volume = volumeMax;
            else 
                MediaPlayer.Volume = currentVolumeValue;    
    

        }
        return false;
    }//if (bDrag)
}

function VolumeStopSlider() {
    bDrag = false;
}

function VolumeInit() {

    //볼륨초기화
    VolumeBar.style.pixelLeft = VolumeBar_StartPixel + VolumeBar_Size /2  ;
    vol_position_bg.style.width = VolumeBar.style.pixelLeft - VolumeBar_StartPixel;
    MediaPlayer.Volume =  volumeMin / 2;
}

//음소거  ---------------------------------------------------------------------------------------
function setMute() {

    if (!bPlay)
        return ;
        
    if(MediaPlayer.mute==false)
    {
        player_mute.src = imgpath+"btn_ctl_soundoff.gif";
        MediaPlayer.mute = true;
    }
    else
    {
        player_mute.src = imgpath+"btn_ctl_soundon.gif";
        MediaPlayer.mute = false;
    }
}


function playerControl(action)
{
    try {
        if (action == "play")
        {    
            MediaPlayer.Play();
            play_botton.style.visibility = "hidden";
            pause_botton.style.visibility = "visible";
            stop_botton.style.visibility = "visible";        
            
        }
        else if (action == "pause")
        {        
            if (MediaPlayer.PlayState ==2)
                MediaPlayer.Pause();
            play_botton.style.visibility = "visible";
            pause_botton.style.visibility = "hidden";
            stop_botton.style.visibility = "visible";        
            
        }
        else if (action == "open")
        {
            try{
                MediaPlayer.open('<?=$url?>');  //동영상 경로 설정
                                
                play_botton.style.visibility = "hidden";
                pause_botton.style.visibility = "visible";
                stop_botton.style.visibility = "visible";        
                ScreenPlay.src = "http://www.blueb.co.kr/SRC/javascript/image5/naver_movie/title_replay.gif";
                
            }catch(e){}
            
            //볼륨셋팅    
            VolumeInit();
        }
        
        else if (action == "stop")
        {    
            play_botton.style.visibility = "hidden";
            pause_botton.style.visibility = "hidden";
            stop_botton.style.visibility = "hidden";        
            MediaPlayer.Stop();
            //볼륨셋팅    
            VolumeInit();
        }
    }catch(e){
        alert("재생되지 않는 동영상 파일이거나\nMicrosoft Widows Media Player6.4 이상이 설치되어 있지않습니다.");
    }
}



//플레이 트랙바 자동이동-----------------------------------------------------------------------------------
function ScrollBarState() {

    CurrentPosition.innerHTML = TimeFormat(MediaPlayer.CurrentPosition);
    Duration.innerHTML = TimeFormat(MediaPlayer.duration);
    
    if(bDrag == false)
    {
        progressBar.style.pixelLeft = progressBar_StartPixel + parseInt(MediaPlayer.CurrentPosition*progressBar_Size/MediaPlayer.duration);
    }
        position_bg.width =parseInt(MediaPlayer.CurrentPosition*progressBar_Size/MediaPlayer.duration);
    
}


function TimeFormat(totalsecond)
{
    
    var second = parseInt(totalsecond) % 60;
    var minute = parseInt(totalsecond / 60);    
    return ((minute < 10)?"0":"")+minute+":" + ((second < 10)?"0":"")+second;
}

function progressBuffering(bPlay)
{
    if(bPlay)
    {
        var BufferingProgress = MediaPlayer.BufferingProgress;
        var disBuffer="";
        
        //for(var i=0; i < BufferingProgress; i=i+20)
        disBuffer +="<img src=http://www.blueb.co.kr/SRC/javascript/image5/naver_movie/img_bufferings.gif width=30 height=5>";
        
        PlayStateTable.style.visibility = "visible";        
        PlayState.style.visibility = "visible";    
        PlayState.innerHTML = disBuffer;
    }
    else
    {
        PlayStateTable.style.visibility = "hidden";    
        PlayState.style.visibility = "hidden";    
    }
        
}
function onFullScreen()
{
    MediaPlayer.DisplaySize = 3;
}
function onView(width,height)
{
    document.all["MediaPlayer"].style.width = width;
    document.all["MediaPlayer"].style.height = height;

}
//-->
</SCRIPT>
<SCRIPT language="javascript" event="PlayStateChange(OldState,NewState)" for="MediaPlayer">
    switch (NewState){
    
        case 0:        
            play_botton.style.visibility = "visible";
            pause_botton.style.visibility = "hidden";
            try{clearTimeout(MediaTimer);    }catch(e){return;}
            bPlay = true;
            progressBuffering(false);
            break;
        case 1:        
            play_botton.style.visibility = "visible";
            pause_botton.style.visibility = "hidden";
            try{clearTimeout(MediaTimer);    }catch(e){return;}
            bPlay = true;
            break;
        case 2:        //플레이중            
            play_botton.style.visibility = "hidden";
            pause_botton.style.visibility = "visible";
            stop_botton.style.visibility = "visible";
            MediaTimer=window.setInterval("ScrollBarState()",500);            
            bPlay = true;
            progressBuffering(false);
            break;
        case 3:        //버퍼링중..
            progressBuffering(true);
            break;
        case 6:        //버퍼링중..        
            progressBuffering(true);
            break;
        default:
    
    }
</SCRIPT>
<SCRIPT language="javascript" event="Buffering(bStart)" for="MediaPlayer">
    if (bStart) 
    {    
        idI = window.setInterval("progressBuffering()",100);
    }else{
        clearTimeout(idI);    
    }
</script>
<script language="javascript">


function MM_swapImgRestore() { //v3.0
  var i,x,a=document.MM_sr; for(i=0;a&&i<a.length&&(x=a[i])&&x.oSrc;i++) x.src=x.oSrc;
}

function MM_preloadImages() { //v3.0
  var d=document; if(d.images){ if(!d.MM_p) d.MM_p=new Array();
    var i,j=d.MM_p.length,a=MM_preloadImages.arguments; for(i=0; i<a.length; i++)
    if (a[i].indexOf("#")!=0){ d.MM_p[j]=new Image; d.MM_p[j++].src=a[i];}}
}

function MM_findObj(n, d) { //v4.01
  var p,i,x;  if(!d) d=document; if((p=n.indexOf("?"))>0&&parent.frames.length) {
    d=parent.frames[n.substring(p+1)].document; n=n.substring(0,p);}
  if(!(x=d[n])&&d.all) x=d.all[n]; for (i=0;!x&&i<d.forms.length;i++) x=d.forms[i][n];
  for(i=0;!x&&d.layers&&i<d.layers.length;i++) x=MM_findObj(n,d.layers[i].document);
  if(!x && d.getElementById) x=d.getElementById(n); return x;
}

function MM_swapImage() { //v3.0
  var i,j=0,x,a=MM_swapImage.arguments; document.MM_sr=new Array; for(i=0;i<(a.length-2);i+=3)
   if ((x=MM_findObj(a[i]))!=null){document.MM_sr[j++]=x; if(!x.oSrc) x.oSrc=x.src; x.src=a[i+2];}
}
//-->
</SCRIPT>

