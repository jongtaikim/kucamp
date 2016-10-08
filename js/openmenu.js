function openSubMenu(el,code) {
	td = document.getElementById(el.id + '_SubMenu');
	if(!td.is_open) {
		td.style.display = 'block';
		td.is_open = true;
	} else {
		td.style.display = 'none';
		td.is_open = false;
	}
}

try {
	mcode = URL.getVar('mcode');
	menu_el = document.getElementById('submenu' + mcode);
	if(menu_el) menu_el.className += ' submenu_cur';
	if(mcode.length % 2) {
		pmcode = mcode.substr(0,3);
	} else {
		pmcode = mcode.substr(0,4);
	}
	pmenu_el = document.getElementById('submenu' + pmcode);
	if (pmenu_el.getAttribute("is_sub")) openSubMenu(pmenu_el,pmcode) 
} catch(e) {}