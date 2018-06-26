require(['config'],function(){
	require(['jquery','load'],function($){

		/*轮播图*/
		let lis = $('li'),
			len = lis.length;
		const liWidth = lis[0].offsetWidth;
		let currentIndex = 1,
			nextIndex = 2,
			html= '';
		for(let i = 0; i < len; i++){
			html += `<span ${i===0?"class='current'":''}>${i+1}</span>`;
		}
		$('#pointer').html(html);

		//克隆第一个和最后一个
		let first = lis[0].cloneNode(true),
			last = lis[len-1].cloneNode(true);
		$("#images").append(first);
		$("#images").prepend(last);
		len = len+2;
		$("#images").css({
			left:-liWidth + 'px',
			width:len*liWidth + 'px'
		})
		const pointer = $('span',$('#pointer'));

		//移动
			function move(){
				var _left = -nextIndex*liWidth;
				$("#images").animate({left:_left},200,function(){
					if(nextIndex>=len){
						$("#images").css({left:-liWidth});
						currentIndex = 1;
						nextIndex = 2;
					}else if(nextIndex===1){
						$("#images").css({left:-liWidth*(len-2)});
						currentIndex = len - 2;
						nextIndex = len - 1;
					}
				});
				var index = nextIndex - 1;
				if(index>=len-2){
					index = 0;
				}
				else if(index<0){
					index = 2;
				}				
				for(var i = 0; i <pointer.length; i++){
					pointer[i].className = "";
				}
				
				pointer[index].className = "current";
				currentIndex = nextIndex;
				nextIndex++;
			}
			
		var timer = setInterval(move,4000);
		
		//鼠标移入移出
		$(".banner").mouseenter(function(){
			clearInterval(timer);
		})
		$(".banner").mouseleave(function(){
			timer = setInterval(move,4000);
		})
		
		//小圆点绑定事件
		pointer.each((index,curr)=>{
			$(curr).on("click", ()=>{
				nextIndex = index+1;
				move();
			})
		});


		/*list鼠标移入遮罩*/
		$.each($('dt'),(index,curr)=>{
			$(curr).on('mouseenter',function(){
				$('.bg',$(this)).show();			
			})
		})

		$.each($('dt'),(index,curr)=>{
			$(curr).on('mouseleave',function(){
				$('.bg',$(this)).hide();	
			})
		})

		
		$(window).scroll(function(e){
			let scrollHeight = $(window).scrollTop();
			let showHeight = $('.sign').position();
			const windowWidth = $(window).width();
			console.log($('.bottom',$('#header')).position())
			if(scrollHeight >= showHeight.top){
				$('.bottom',$('#header')).css({
					position:'fixed',
					top:0,
					left:0,
					background:'black',
					zIndex:999,
					width:windowWidth
				});
			}else if(scrollHeight < showHeight.top)
				$('.bottom',$('#header')).css({
					position:'absolute',
					top:131
				});
		})
	});
});