	jQuery(function($) {
			   
                $('.mitem').append("<li>" + $('.mitem').find('li').eq(0).html() + "</li>");	
				 rotate = function(){
			     
		     	   $('.mitem').append("<li>" + $('.mitem').find('li').eq(1).html() + "</li>");	
				   $('.mitem').animate({left: -100 +"px" },1000, function(){
                   $('.mitem').css({left: '0px'});
				   $('.mitem').find('li').eq(0).remove();
				});			
					
				}; 
				rotate();

				 rotateSwitch = function(){		
				     
						play = setInterval(function(){ 							
							rotate(); 
							
						}, 5000); 
				};
				
				rotateSwitch(); 

				$('.mitem').find('li').hover(function() {
					clearInterval(play); //Stop the rotation
					}, function() {
						rotateSwitch(); //Resume rotation
					});	
				
			    
			});