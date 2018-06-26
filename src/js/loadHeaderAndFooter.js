//加载头部尾部
define(['jquery'],function($){
	$('#header').load('/html/include/header.html',function(){
		
		$('.s_cloth').on('click',function(){
			$('.s_designer').css({background:'black',color:'white'});
			$('.s_cloth').css({background:'white',color:'#444444'});
			$('.txt').val('搜美衣');
			$('.l_cloth').hide();
			$('.l_designer').hide();
		});
		$('.s_designer').on('click',function(){
			$('.s_designer').css({background:'white',color:'#444444'});
			$('.s_cloth').css({background:'black',color:'white'})
			$('.txt').val('搜设计师');
			$('.l_cloth').hide();
			$('.l_designer').show();
		});
		$('.women').on('click',function(){
			$('.women').css({color:'#ffd27e'});
			$('.men').css({color:'white'});
			$('.women_nav').show();
			$('.men_nav').hide();
		})
		$('.men').on('click',function(){
			$('.women').css({color:'white'});
			$('.men').css({color:'#ffd27e'});
			$('.women_nav').hide();
			$('.men_nav').show();
		})

		$.each($('a',$('.h_nav>li')),(index,curr)=>{
			$(curr).on('mouseenter',function(){
				$.each($('i',$('.h_nav>li')),(index,curr)=>{	
					$(curr).css({display:'none'});
				});			
				$(this).next().css({display:'inline-block'});

			})
		})

	});
	$('#footer').load('/html/include/footer.html');
});