<template>
	<div class="img-slide">
		<div class="img-item">
			<img src="" alt="">
		</div>
	</div>
</template>
<script>
	export default{
		name: 'carousel',
		props:{
			data:{
				type: Object,
				default () {
					return {
						id: '',
						label: '轮播图',
						imgUrl: 'about:blank',
						style:{
							opacity: 1,
							dragPosrect: BASE.dragPosrect(),
							br: BASE.br(),
							eleAni: BASE.eleAni()
						}
					}
				}
			},
		},
		computed: {
			formatterStyle () {
				let style = this.data.style;
				style.br = formatter.brFormatter(style.br);
				style.wrect = formatter.dragPosrectFormatter(style.dragPosrect);
				style.eleAni = formatter.eleAniFormatter(style.eleAni);
				return style;
			}
		}
	}
</script>