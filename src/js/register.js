require(['config'],function(){
	require(['jquery','cookie','load'],function($){
		//动态设置背景宽度
		$(".container").height($(window).height());
		if($('#way1').prop('checked')){
			//用户名失去焦点时验证
			$('#warning').html('');
			$('#username').blur(function(){	
				//获取用户名文本框文本			
				let username = $('#username').val();
					//手机验证正则表达式
				checkPhone(username);
			})
			$('#username').focus(function(){
					$('#warning').html('');	
				})
		}
            
		/*切换手机和邮箱注册选中状态*/
			//手机注册选中
			$('#way1').click(function(){
				console.log('way1'+$('#way1').prop('checked'))
				$('#email').attr({placeholder:'请输入手机号',id:'username'});
				$('#warning').html('');
				$('#username').blur(function(){	
					//获取用户名文本框文本			
					let username = $('#username').val(),
						password = $('#password').val();
						//手机验证正则表达式
					checkPhone(username,password);
				})
				
			})
			$('#way2').click(function(){//邮箱注册选中
				console.log('way2'+$('#way2').prop('checked'))
				$('#username').attr({placeholder:'请输入电子邮箱',id:'email'});
				$('#warning').html('');
				$('#email').blur(function(){	//用户名失去焦点时验证
					//获取用户名文本框文本			
					let email = $('#email').val(),
						password = $('#password').val();
					//邮箱验证正则表达式
					checkEmail(email,password);
				})
				$('#email').focus(function(){
					$('#warning').html('');	
				})
			})
			

		//给所有文本框绑定事件，当文本框的按键触发时当前文本框边框颜色还原
		$("#rgs_form").on('focus','input',function(){
			if(!$(this).val()){
				$(this).css({borderColor:'#dddddd'});
			}
		})
		
		$('#password').blur(function(){
			const reg_password = /^[0-9a-zA-Z_]\w{7,15}$/;
			let password = $('#password').val();
			if(!reg_password.test(password)){
				$('#password').val('');
				$('#password').attr({placeholder:'密码为8-16位的字母数字下划线组成'});
			}
		})

		//提交表单
		$('#btn').click(function(){
			//如果全部都不为空则跳转到登录页面
			if(findEmpty($("#rgs_form>input"))){
				//判断密码两次是否相同
				if($('#password').val() == $('#confirm').val())
				{
					//获得密码
					let password_sub = $('#password').val(),
						//获得用户名						
						username_sub = $('#username').val() || $('#email').val(),
						//获得性别
						sex = $(".sex input[checked='checked']").next('label').html();
					//ajax传送数据到后端保存
					$.post('http://localhost/php/register.php',{'username':username_sub,'password':password_sub,'sex':sex},function(data){
						if(data.res_code == 1){
							alert("注册成功！");
							location = '/html/login.html';
						}else {
							console.log('注册失败'+data.res_message)
						}
					},'json');
					

				}
				else 
					$('#warning').html('密码不一致');
			}
		})

		//找到表单下所有为空的文本框，有空的就返回false，没有为空的就返回true
		function findEmpty(argument) {
			let b = true;
			argument.each(function(index,curr){
				if($(curr).val() == ''){
					$(curr).css({borderColor:'red'});
					b = false;
				}
			})
			return b;
		}

		function checkPhone(username,password){
			const reg_phone = /^[1]\d{10}$/;
			//正则表达式验证通过
			if(reg_phone.test(username)){
				//ajax请求后台数据，找用户名
				$.post('http://localhost/php/login.php',{username:username,password:password},function(data){
					//如果有找到
					// console.log(data)
					if(data.res_code === 1){
						$('#username').val('');   
						$('#warning').html('点击用户名已被注册！');
					}else{//没找到
						$('#warning').html('');						}
				},'json')
			}else{//正则表达式验证未通过
				//用户名文本框清空 
				$('#username').val('');
				$('#username').attr({placeholder:'请输入正确的用户名！'})
				console.log('点击手机')
				//用户名文本框边框颜色设置为红色
				$('#username').css({borderColor:'red'});
			}
			return;
		}

		function checkEmail(email,password){

						console.log(email)
			const reg_email = /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
			//正则表达式验证通过
			if(reg_email.test(email)){
				//ajax请求后台数据，找用户名
				$.post('http://localhost/php/login.php',{username:email,password:password},function(data){
					//如果有找到
					if(data.res_code === 1)
						$('#warning').html('邮箱已被注册');
					else{//没找到
						$('#warning').html('');
					}
				},'json')
			}else{//正则表达式验证未通过
				//用户名文本框清空
				$('#email').val('');
				console.log('点击电子邮箱')
				$('#email').attr({placeholder:'请输入正确的电子邮箱！'})
				//用户名文本框边框颜色设置为红色
				$('#email').css({borderColor:'red'});
			}
			return;
		}
	})
})