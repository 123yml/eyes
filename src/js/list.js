require(['config'],function(){
	require(['jquery','template','cookie','load'],function($,template){

		$.getJSON('/mock/list.json',function(data){
			const html = template("list_template",{list:data.res_body.list});
			$('.images').html(html);
		});

 
		$(window).scroll(function(e){
			//获取滚动高度
			let scrollHeight = $(window).scrollTop();
			//获取楼层导航的出现的位置
			let showHeight = $('.upstare').position();
			//获取窗口宽度
			const windowWidth = $(window).width();
			//判断楼层导航出现	
			if(scrollHeight >= showHeight.top){
				//固定楼层导航位置 
				$('.bottom',$('#header')).css({
					position:'fixed',
					top:0,
					left:0,
					background:'black',
					zIndex:999,
					width:windowWidth
				});
			}else if(scrollHeight < showHeight.top)//判断楼层导航还原位置
				//还原楼层导航位置
				$('.bottom',$('#header')).css({
					position:'absolute',
					top:131
				});
		});
	});
})