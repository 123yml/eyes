require(['config'],function(){
	require(['jquery','template','cookie','load'],function($,template){
		$.cookie.json = true;
		// 读取购物车保存的 cookie
		let products = $.cookie("products") || [];
		// 判断是否有选购过商品
		if (products.length === 0) { // 未选购商品
			$(".cart_empty").removeClass("hide");
			return; // 结束执行
		}

		// 已有选购商品
		$(".cart_not_empty").removeClass("hide");
		// 渲染购物车模板
		const html = template("cart_temp", {products});
		// 显示
		$(".cart_not_empty table tbody").html(html);
		//定义总价格
		let total = 0;
		//遍历所有商品总价
		$('.sub_total').each(function(index,curr){
			//计算总价格
			total += parseInt($(curr).text());
		});
		//显示
		$('.tatal').text(total.toFixed(2));

		//获取省份
		function promiseAjax(url) {
			return new Promise(function(resolve, reject){
				$.ajax({
					type : "get",
					url : url,
					dataType : "json",
					success : function(data){
						resolve(data);
					},
					error : function(err){
						reject(err);
					}
				});
			});
		}
		//渲染页面
		function loadProvince() {
		var _url1 = "http://route.showapi.com/1149-1?showapi_appid=29550&showapi_sign=1b9802a551774e3480cb844e18f0ceef&level=1",
			_url2 = "http://route.showapi.com/1149-1?showapi_appid=29550&showapi_sign=1b9802a551774e3480cb844e18f0ceef&level=1&page=2";
		Promise.all([promiseAjax(_url1), promiseAjax(_url2)])
			 .then(function(array){
			 	var html = '<option>--请选择省份--</option>'; // 存放HTML字符串
			 	// 第一页省份数据与第二页省份数据串联后遍历
			 	array[0].showapi_res_body.data
			 		.concat(array[1].showapi_res_body.data)
			 		.forEach(function(province){
			 			// 连接下拉列表中的列表项标签
						html += `<option id=${province.id}>${province.areaName}</option>`;
					});
			 	// 显示所有省份
			 	$("#province").html(html);
			 });

		}
		//自动加载省份
		loadProvince();

		//加载城市
		function loadCity(id) {
			let url_arr = [],
				ajax_arr = [],
				arr = [];
			for(let i = 0; i < 19; i++){
				let url = "http://route.showapi.com/1149-1?showapi_appid=29550&showapi_sign=1b9802a551774e3480cb844e18f0ceef&level=2";
				url += '&page=' + i;
				url_arr.push(url);
			}
			for(let i = 0; i < 19; i++){
				ajax_arr.push(promiseAjax(url_arr[i]));
			}
			Promise.all(ajax_arr)
				.then(function(array){
				 	var html = ''; // 存放HTML字符串
				 	// 第一页省份数据与第二页省份数据串联后遍历
				 	
				 	for(let i = 0; i < 19; i++){
				 		arr = arr.concat(array[i].showapi_res_body.data)
				 	}
				 	$.each(arr,function(index,city){
			 			// 连接下拉列表中的列表项标签		 			 
			 			if(city.provinceId == id){
							html += `<option id=${city.id}>${city.areaName}</option>`;
						}
					});
					$("#city").html(html);
			})
		}

		//加载区县
		function loadArea(id) {
			let url_arr = [],
				ajax_arr = [],
				arr_area = [];
			for(let i = 0; i < 177; i++){
				let url = "http://route.showapi.com/1149-1?showapi_appid=29550&showapi_sign=1b9802a551774e3480cb844e18f0ceef&level=3";
				url += '&page=' + i;
				url_arr.push(url);
			}
			for(let i = 0; i < 177; i++){
				ajax_arr.push(promiseAjax(url_arr[i]));
			}
			Promise.all(ajax_arr)
				.then(function(array){
				 	var html = ''; // 存放HTML字符串
				 	// 第一页省份数据与第二页省份数据串联后遍历				 	
				 	for(let i = 0; i < 177; i++){
				 		arr_area = arr_area.concat(array[i].showapi_res_body.data)
				 	}
				 	$.each(arr_area,function(index,area){
			 			// 连接下拉列表中的列表项标签		 			 
			 			if(area.cityId == id){
							html += `<option id=${area.id}>${area.areaName}</option>`;
						}
					});
					$("#area").html(html);
			
			});
		}

		//选择省份之后加载城市
		$("#province").on('change',function(){
			$('#province>option').each((index,curr)=>{
				if($("#province").val() === $(curr).val()){
					loadCity($(curr).attr('id'));
					
				}
			})
		})
		//选择城市之后加载区县
		$("#city").on('change',function(){
			$('#city>option').each((index,curr)=>{
				if($("#city").val() === $(curr).val()){
					
					loadArea($(curr).attr('id'));
				}
			})
		})
		
	});

}) 