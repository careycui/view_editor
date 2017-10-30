$(function(){
	$.aniView({
		viewPercent: 0.3,
		aniClass: '.ani-ele',
		animateCallback: function(eleObj){
			var ele = $(eleObj.ele);
			var ani = ele.data('animation');
			ele.css({
				webkitAnimation: ani,
				animation: ani,
			});
		},
		resetCallback: function(eleObj){
			var ele = $(eleObj.ele);
			ele.css({
				animation: '',
				webkitAnimation: ''
			});
		}
	});
})