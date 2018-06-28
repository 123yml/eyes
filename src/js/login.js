require(['config'],function(){
	require(['jquery','load'],function($){
		$(".container").height($(window).height());

		//点击提交
		$("#btn").click(function(){
			//输入的获取用户名密码
			let username = $('#username').val(),
				password = $('#password').val();

			//连接后端获得数据
			$.post("http://localhost/php/login.php",$("#login_form").serialize(), function(data){
				if (data.res_code === 1){					
					if(data.res_body.password == password)
						location = '/html/cart.html';
				}					
				else
					console.log("用户登录失败：" + data.res_message);
			}, "json");
		});
	})
})