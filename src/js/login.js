require(['config'],function(){
	require(['jquery','cookie','load'],function($){
		$(".container").height($(window).height());

		//点击提交
		$("#btn").click(function(){
			//输入的获取用户名密码
			let username = $('#username').val(),
				password = $('#password').val();
			
			if(username && password){
			//连接后端获得数据
				$.post("http://localhost/php/login.php",$("#login_form").serialize(), function(data){
					if (data.res_code === 1){					
						if(data.res_body.password == password)
							// $.cookie('username',username,{expires:10,path:'/'})
							location = '/html/cart.html?username=' + username;
					}					
					else
						$('.warning').html('用户名或者密码错误！')
				}, "json");
			}
			else
				$('.warning').html('用户名或者密码不能为空！')
		});
	})
}) 