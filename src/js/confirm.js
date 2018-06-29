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
	})
}) 