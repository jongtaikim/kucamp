var delay = 1.5;            // 메뉴 스피드(낮을수록 빠름) 
var m_length = 40;    // 메뉴 간격 
var sel_l_length = 50;    // 선택한 메뉴와 이전 메뉴 간격 
var sel_r_length = 80;    // 선택한 메뉴와 다음 메뉴 간격 


var m_sel = 0;            // 메뉴 선택 상태 
var m_max = 0;        // 메인메뉴 갯수 
var sm_alpha = 0;    // 서브메뉴 투명도 
var id = new Array();    // 메인메뉴 ID 
var sid = new Array();    // 서브메뉴 ID 
var m_top = 0;                // 메인메뉴 y 위치 
function on_menuload(){ 
    while(document.getElementById("menu"+(m_max+1)) != null){ 
        m_max++; 
        id[m_max] = document.getElementById("menu"+m_max); 
        sid[m_max] = document.getElementById("smenu"+m_max); 
    }; 
    m_top = id[1].offsetTop; 
    m_act(); 
} 
function m_over(m){ 
    m_sel = m; 
    for(i=1;i<=m_max;i++){ 
        if(sid[i] != null){ 
            if(m_sel == i){ 
                id[i].style.fontWeight = 'bold'; 
                sid[i].style.display = ""; 
                sm_alpha = 0; 
                if ((navigator.appName.indexOf('Microsoft')+1)) { 
                    sid[i].filters.alpha.opacity = sm_alpha; 
                }else{ 
                    sid[i].style.opacity = (sm_alpha/100); 
                } 
                sid[i].style.top = id[i].offsetTop + id[i].offsetHeight + 40; 
            }else{ 
                id[i].style.fontWeight = ''; 
                sid[i].style.display = "none"; 
            } 
        } 
    } 
} 


function m_act(){ 
    var goy = 0; 
    for(i=1;i<=m_max;i++){ 

        // 메인메뉴 좌우 이동 
        if(i>1) 
            temp = id[i-1].offsetWidth + id[i-1].offsetLeft; 
        if(i==1){ 
            gox=id[i].offsetLeft; 
        }else if(m_sel == i){ 
            gox =  temp + sel_l_length; 
        }else if(m_sel+1 == i){ 
            gox =temp + sel_r_length; 
        }else{ 
            gox = temp + m_length; 
        } 
        id[i].style.left = Math.ceil(id[i].offsetLeft - (id[i].offsetLeft - (gox))/delay)+"px"; 

        // 메인메뉴 상하 이동 
       

        // 서브메뉴 
        if(m_sel == i && sid[i] != null){ 
            // 서브메뉴 투명도 
            if(sm_alpha < 100){ 
                sm_alpha += 5; 
                if ((navigator.appName.indexOf('Microsoft')+1)) { 
                    sid[i].filters.alpha.opacity = sm_alpha; 
                }else{ 
                    sid[i].style.opacity = (sm_alpha/100); 
                } 
            } 
            // 서브메뉴 아래서부터 위로 나타남 
            goy = id[i].offsetTop + id[i].offsetHeight; 
            sid[i].style.top = (sid[i].offsetTop - (sid[i].offsetTop - goy)/delay)+"px"; 
        } 
    } 
    setTimeout('m_act()',20); 
} 