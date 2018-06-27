require(['config'],function(){
	require(['jquery','template','load','zoom'],function($,template){
			const url = location.href;
			const id = findId(url);
			$.getJSON('/mock/detail.json',function(data){
				$.each(data.res_body.list,function(index,curr){
					if(index == id){
						const html = template('detail_template',{list:curr});
						$('.context').html(html);
					}
				})
			})
			$(function(){
				//放大镜
				$('.zoom_img',$('.context')).elevateZoom({
					gallery:'gallery',
					cursor : 'pointer',
					galleryActiveClass : 'active'
				});
				//获取第二个楼层导航坐标
				let upNav_position = $('.up_nav',$('.context')).position(),
				//获取第二个楼层导航宽
					upNav_width = $('.up_nav',$('.context')).width();
				console.log($('.up_nav',$('.context'))+"+"+upNav_position+"+"+upNav_width)
				/*触发滚动事件*/
				$(window).scroll(function(e){
					//获取滚动高度
					let scrollHeight = $(window).scrollTop();
					//获取第一个楼层导航的出现的位置
					let showHeight = $('.prod').position();
					//获取窗口宽度
					const windowWidth = $(window).width(),
						//获取第二个楼层导航出现的位置
						up_showHeight = $('.buy_know').position();
					//判断第一个楼层导航出现	
					if(scrollHeight >= showHeight.top){
						//固定第一个楼层导航位置
						$('.bottom',$('#header')).css({
							position:'fixed',
							top:0,
							left:0,
							background:'black',
							zIndex:999,
							width:windowWidth
						});
					}else if(scrollHeight < showHeight.top){//判断第一个楼层导航还原位置
						//还原第一个楼层导航位置
						$('.bottom',$('#header')).css({
							position:'absolute',
							top:131				
						});					
					}
					//判断第二个楼层导航出现
					if(scrollHeight >= up_showHeight.top){
						//固定第二个楼层导航位置
						$('.up_nav').css({
							position:'fixed',
							top:0,
							left:0,
							background:'white',
							zIndex:999,
						});
						//还原第一个楼层导航位置
						$('.bottom',$('#header')).css({
							position:'absolute',
							top:131				
						});

					}else if(scrollHeight < up_showHeight.top){//判断第二个楼层导航还原
						//还原第二个楼层导航位置
						$('.up_nav').css({
							position:'absolute',
							top:upNav_position.top,	
						})
					}
				})
			})
			
			//从url上找id
			function findId(url){
				let startId = url.indexOf("?"),
					id = 0;
				url = url.slice(startId+1).split("=");
				return url[1];
			}
			
		});
	})

