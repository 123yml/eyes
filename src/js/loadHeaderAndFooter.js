//加载头部尾部
define(['jquery'],function($){
	$('#header').load('/html/include/header.html',function(){
		$('.search_txt .txt').on('keyup',function(){
			let html = "";
			let txt = $(this).val();
			$.getJSON(`https://suggest.taobao.com/sug?code=utf-8&q=${txt}&callback=?`,function(data){
				data.result.forEach(function(curr){
					html += `<div>${curr[0]}</div>`
				})
				$(".suggest").show().html(html);
			})
		})
		$(".suggest").delegate("div","click",function(){
			const txt = $(this).text();
			$(".search_txt .txt").val(txt);
			$(".suggest").hide();
		})

		$('.s_cloth').on('click',function(){
			$('.s_designer').css({background:'black',color:'white'});
			$('.s_cloth').css({background:'white',color:'#444444'});
			$('.txt').attr({placeholder:'搜美衣'});
			$('.l_cloth').hide();
			$('.l_designer').hide();
			$('.txt').val('');
		});
		$('.s_designer').on('click',function(){
			$('.s_designer').css({background:'white',color:'#444444'});
			$('.s_cloth').css({background:'black',color:'white'})
			$('.txt').attr({placeholder:'搜设计师'});
			$('.l_cloth').hide();
			$('.l_designer').show();
			$('.txt').val('');
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
			
		//定义当前产品
		$.cookie.json = true;
			let curr_product = {};
			let count = 0;
			$.cookie("products")
			const prod = $.cookie("products") || [];
			//如果当前cookie没有保存有产品
			if(prod.length == 0) {
				count = 0;
			}  else{//如果有产品
				//遍历获取到的cookie值
				for(let i = 0; i < prod.length; i++){
					count += prod[i].amount;
				}
			} 
			//把数量放到页面上
			
			$('#prod_counts').text(count);
			//从url上找username
			function findUsername(url){
			let startId = url.indexOf("?");

			url = url.slice(startId+1).split("=");
			if(url[0] === 'username')
				return url[1];
			else
				return false;
		}

		//读取username
		let username = $.cookie('username');
		if(username){
			$('.loginAndRegister>a').eq(0).html(username);
		    $('.loginAndRegister>a').eq(0).attr({src:'#'});
		    $('.loginAndRegister>a').eq(1).html('退出');
		    $('.loginAndRegister>a').eq(1).attr({src:'/html/login.html'});
		}else{
			$('.loginAndRegister>a').eq(0).html('注册');
			$('.loginAndRegister>a').eq(0).attr({src:'/html/register.html'});
			$('.loginAndRegister>a').eq(1).html('登录');
		    $('.loginAndRegister>a').eq(1).attr({src:'/html/login.html'});
		}

		$('.loginAndRegister>a').eq(1).on('click',function(){
			if($(this).html() === '退出'){
				$.cookie('username',null);				
			}
			location = '/html/login.html';

		})
	});
	$('#footer').load('/html/include/footer.html');
});