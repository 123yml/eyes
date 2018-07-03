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

		//加载省份
		function loadProvince() {
			const url1 = "http://route.showapi.com/1149-1?showapi_appid=29550&showapi_sign=1b9802a551774e3480cb844e18f0ceef&level=1&page=1",
				url2 = "http://route.showapi.com/1149-1?showapi_appid=29550&showapi_sign=1b9802a551774e3480cb844e18f0ceef&level=1&page=2";
			// 读取两页省份数据
			$.when($.ajax(url1,{dataType:"json"}), $.ajax(url2, {dataType:"json"}))
			  .then(function(data1, data2){
			  	// html 字符串
			  	let html = "<option value='-1'>请选择省份</option>";
			  	// 将省份数组遍历，每个省份信息添加到下拉列表项中
				data1[0].showapi_res_body.data
					.concat(data2[0].showapi_res_body.data)
					.forEach(function(curr){
						html += `<option value="${curr.id}">${curr.areaName}</option>`;
					});	
				// 显示省份信息
				$("#province").html(html);
			});
		}

		// 加载城市
		function loadCity() { 
			// 获取所选中的省份id
			const prov_id = $("#province").val();
			// 根据省份id查询城市信息
			const url = `http://route.showapi.com/1149-2?showapi_appid=29550&showapi_sign=1b9802a551774e3480cb844e18f0ceef&parentId=${prov_id}`;
			$.getJSON(url, function(data){
				let html = "<option value='-1'>请选择城市</option>";
				data.showapi_res_body.data.forEach(function(curr){
					html += `<option value="${curr.id}">${curr.areaName}</option>`;
				});
				$("#city").html(html);
			});
		}

		// 加载区县
		function loadDistrict() {
			// 获取所选中的城市id
			const city_id = $("#city").val();
			// 根据城市id查询区县信息
			const url = `http://route.showapi.com/1149-2?showapi_appid=29550&showapi_sign=1b9802a551774e3480cb844e18f0ceef&parentId=${city_id}`;
			$.getJSON(url, function(data){
				let html = "<option value='-1'>请选择区县</option>";
				data.showapi_res_body.data.forEach(function(curr){
					html += `<option value="${curr.id}">${curr.areaName}</option>`;
				});
				$("#area").html(html);
			});
		}

		loadProvince();
		// 省份选择发生改变，则加载城市
		$("#province").on("change", loadCity);
		// 城市选择发生改变，加载区县
		$("#city").on("change", loadDistrict);		
			
	});

}) 