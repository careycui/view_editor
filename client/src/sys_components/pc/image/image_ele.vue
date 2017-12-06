<template>
	<div class="image-ele" :style="[formatterStyle.wrect]" style="z-index:1;">
		<div class="ani-stage">
			<img class="reset-img" 
				:class="{'ani': !!formatterStyle.eleAni.animation}"
				:src="data.imgUrl" 
				:data-animation="formatterStyle.eleAni.animation" 
				:style="[formatterStyle.br, {animation: (formatterStyle.eleAni.isPlayed?formatterStyle.eleAni.animation: '')}]"/>
		</div>
	</div>
</template>
<script>
import BASE from './../../utils/base'

const formatter = BASE.formatter;

	export default {
		name: 'imageEle',
		props:{
			data:{
				type: Object,
				default () {
					return {
						id: '',
						label: '图片元素',
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
<style lang="scss" scoped>
	.image-ele{
		// overflow: hidden;

		& .reset-img {
			display: inline-block;
			width: 100%;
			min-height: 100%;
		}
	}
</style>