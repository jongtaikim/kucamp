
if (mtDropDown.isSupported()) {
	var ms = new mtDropDownSet(mtDropDown.direction.down, 0, 0, mtDropDown.reference.bottomLeft);
	var menu1 = ms.addMenu(document.getElementById("menu1"));
		menu1.addItem("����޴�01", "http://www.blueb.co.kr"); 
		menu1.addItem("����޴�02", "http://www.blueb.co.kr"); 
		menu1.addItem("����޴�03", "http://www.blueb.co.kr"); 
		menu1.addItem("����޴�04", "http://www.blueb.co.kr"); 
		menu1.addItem("����޴�05", "http://www.blueb.co.kr"); 
		menu1.addItem("����޴�06", "http://www.blueb.co.kr"); 
			var subMenu0 = menu1.addMenu(menu1.items[0]);
				subMenu0.addItem("����޴�01_01", "http://www.blueb.co.kr");
				subMenu0.addItem("����޴�01_02", "http://www.blueb.co.kr");
				subMenu0.addItem("����޴�01_03", "http://www.blueb.co.kr");
				subMenu0.addItem("����޴�01_04", "http://www.blueb.co.kr");

			var subMenu1 = menu1.addMenu(menu1.items[1]);
				subMenu1.addItem("����޴�02_01", "http://www.blueb.co.kr");
				subMenu1.addItem("����޴�02_02", "http://www.blueb.co.kr");

			var subMenu2 = menu1.addMenu(menu1.items[2]);
				subMenu2.addItem("����޴�03_01", "http://www.blueb.co.kr");

			var subMenu3 = menu1.addMenu(menu1.items[3]);
				subMenu3.addItem("����޴�04_01", "http://www.blueb.co.kr");
				subMenu3.addItem("����޴�04_02", "http://www.blueb.co.kr");

			var subMenu4 = menu1.addMenu(menu1.items[4]);
				subMenu4.addItem("����޴�05_01", "http://www.blueb.co.kr");
				subMenu4.addItem("����޴�05_02", "http://www.blueb.co.kr");
				subMenu4.addItem("����޴�05_03", "http://www.blueb.co.kr");
				subMenu4.addItem("����޴�05_04", "http://www.blueb.co.kr");

			var subMenu5 = menu1.addMenu(menu1.items[5]);
				subMenu5.addItem("����޴�06_01", "http://www.blueb.co.kr");

	

	mtDropDown.renderAll();
}

