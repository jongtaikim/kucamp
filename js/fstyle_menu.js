var delay = 1.5;            // �޴� ���ǵ�(�������� ����) 
var m_length = 40;    // �޴� ���� 
var sel_l_length = 50;    // ������ �޴��� ���� �޴� ���� 
var sel_r_length = 80;    // ������ �޴��� ���� �޴� ���� 


var m_sel = 0;            // �޴� ���� ���� 
var m_max = 0;        // ���θ޴� ���� 
var sm_alpha = 0;    // ����޴� ���� 
var id = new Array();    // ���θ޴� ID 
var sid = new Array();    // ����޴� ID 
var m_top = 0;                // ���θ޴� y ��ġ 
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

        // ���θ޴� �¿� �̵� 
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

        // ���θ޴� ���� �̵� 
       

        // ����޴� 
        if(m_sel == i && sid[i] != null){ 
            // ����޴� ���� 
            if(sm_alpha < 100){ 
                sm_alpha += 5; 
                if ((navigator.appName.indexOf('Microsoft')+1)) { 
                    sid[i].filters.alpha.opacity = sm_alpha; 
                }else{ 
                    sid[i].style.opacity = (sm_alpha/100); 
                } 
            } 
            // ����޴� �Ʒ������� ���� ��Ÿ�� 
            goy = id[i].offsetTop + id[i].offsetHeight; 
            sid[i].style.top = (sid[i].offsetTop - (sid[i].offsetTop - goy)/delay)+"px"; 
        } 
    } 
    setTimeout('m_act()',20); 
} 