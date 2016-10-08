jQuery(function($){
	$.fn.topmenu = function(options) {
		var opts = $.extend(options);
		var topmenu = $(this);
		var topmenuList = topmenu.find('>ul>li');
		var submenu = topmenu.find('.submenu');
		var submenuList = submenu.find('>ul>li');

		function showMenu() {
			t = $(this).parent('li');
			if (!t.hasClass('active')) {
				topmenuList.removeClass('active');
				t.addClass('active');
				submenu.hide();
				t.find('.submenu').show().css('top', 0).animate( { top: 30, opacity:1 }, 200 );
			}
		}

		function hideMenu() {
			topmenuList.removeClass('active');
			submenu.hide();
			activeMenu();
		}

		function activeMenu() {
			if(opts.d1) {
				t = topmenuList.eq(opts.d1-1); 
				t.addClass('active');
				t.find('.submenu').show().css('top', 0).animate( { top: 30, opacity:1 }, 200 );
				if(opts.d2) {
					t.find('.submenu>ul>li').eq(opts.d2-1).addClass('on');
				}
			}
		}

		return this.each(function() {
			activeMenu();
			topmenuList.find('>a').mouseover(showMenu).focus(showMenu);
			topmenu.mouseleave(hideMenu);
		});
	}
});