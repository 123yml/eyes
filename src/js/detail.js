require(['config'],function(){
	require(['jquery','template','cookie','fly','load','zoom'],function($,template){
			//获取当前网址
			const url = location.href;
			//找到网址传过来的id			
			const id = findId(url);
			$.cookie.json = true;
			//定义当前产品
			let curr_product = {};
			let count = 0;
			$.cookie("products")
			const prod = $.cookie("products") || [];
			console.log(prod)
			//如果当前cookie没有保存有产品
			if(prod.length == 0) {
				count = 0;
			}  else{//如果有产品
				//遍历获取到的cookie值
				for(let i in prod){
					count += prod[i].amount;
				}
				// prod.each(function(index,curr){
				// 	//计算购物车产品数量
				// 	count += curr.amount;
				// });
			} 
			//把数量放到页面上
			$('#prod_counts').html(count);
			//获取detail的json值			
			$.getJSON('/mock/detail.json',function(data){
				//遍历当前获取的json假数据
				$.each(data.res_body.list,function(index,curr){
					//如果当前id和网址传过来的id相等
					if(index == id){
						//保存当前产品信息
						curr_product = {
							id:curr.id,
							img:curr.img[0],
							title:curr.desc,
							price:curr.price.slice(1),
							amount:1
						}
						//用当前产品信息渲染详情页面模版
						const html = template('detail_template',{list:curr});
						//添加到指定的html页面位置	
						$('.context').html(html);
					}
				})
				//放大镜
				$('.zoom_img',$('.context')).elevateZoom({
					gallery:'gallery',
					cursor : 'pointer',
					galleryActiveClass : 'active'
				}); 
				//点击添加到购物车
				$('#addTocart').click(function(e){
					//获取抛物线终点位置
					const end = $('#cart').offset();
					//获取运动图片路径
					const src = $('.zoom_img').attr('src');
					//设置抛物线运动图片
					let flyer = $(`<img src='${src}' style='width:40px;'>`);
					//抛物线运动
					flyer.fly({
						start:{
							top:e.clientY,
							left:e.clientX
						},
						end:{
							top:end.top - $(window).scrollTop(),
							left:end.left - $(window).scrollLeft()
						},
						onEnd:function(){
							this.destroy();
						}
					});
					$.cookie.json = true;
					//获取cookie中的产品信息
					const products = $.cookie("products") || [];
					//如果有产品
					if(products){
						//找到当前产品id是否在cookie中有保存过	
						const index = exist(curr_product.id, products);
						//如果没有保存过
						if(index === -1){
							//把当前产品添加到数组中
							products.push(curr_product);												
						}else{//如果有保存过
							//当前产品的数量+1
							products[index].amount++;						
						}
					}else{//如果cookie中没有产品
						//直接添加到数组中
						products.push(curr_product);	
					}
					
						//保存cookie				
					$.cookie('products',products,{expires:10,path:'/'});
				})
				//获取第二个楼层导航坐标
				let upNav_position = $('.up_nav',$('.context')).position(),
				//获取第二个楼层导航宽
					upNav_width = $('.up_nav',$('.context')).width();
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
			});


			});
			
			//从url上找id
			function findId(url){
				let startId = url.indexOf("?"),
					id = 0;
				url = url.slice(startId+1).split("=");
				return url[1];
			}
			
			// 判断某 id 商品在数组中是否存在，
			// 存在则返回其在数组中的下标，-1表示不存在
			function exist(id, array) {
				for (let i = 0, len = array.length; i < len; i++) {
					if (array[i].id == id)
						return i;
				}
				return -1;
			}
		});
	

