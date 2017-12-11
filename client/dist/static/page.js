$(function(){
	$.aniView({
		viewPercent: 0.3,
		aniClass: '.ani',
		loop: true,
		viewPercent: 0.1,
		animateCallback: function(eleObj){
			var ele = $(eleObj.ele);
			var ani = ele.data('animation');
			ele.css({
				webkitAnimation: ani + ' both running',
				animation: ani + ' both running',
			});
		},
		resetCallback: function(eleObj){
			var ele = $(eleObj.ele);
			var ani = ele.data('animation');
			ele.css({
				animation: '',
				webkitAnimation: ''
			});
		}
	});
})