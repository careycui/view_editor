<template>
	<div class="text-ele" :style="[formatterStyle.wrect]">
		<div class="ani-stage">
			<p :class="{'ani': !!formatterStyle.eleAni.animation}"
			   :data-animation="formatterStyle.eleAni.animation" 
			   :style="[formatterStyle.ft, {animation: (formatterStyle.eleAni.isPlayed?formatterStyle.eleAni.animation: '')}]">
			   {{ data.text }}
			</p>
		</div>
	</div>
</template>
<script>
import BASE from './../../utils/base'

const formatter = BASE.formatter;

	export default {
		name: 'textEle',
		props:{
			data:{
				type: Object,
				default () {
					return {
						id: '',
						label: '文本',
						text: '基本文本',
						style:{
							dragPosrect: BASE.dragPosrect(),
							eleAni: BASE.eleAni(),
							ft: BASE.ft()
						}
					}
				}
			},
		},
		computed: {
			formatterStyle () {
				let style = this.data.style;
				style.wrect = formatter.dragPosrectFormatter(style.dragPosrect);
				style.eleAni = formatter.eleAniFormatter(style.eleAni);
				style.ft = formatter.ftFormatter(style.ft);
				return style;
			}
		}
	}
</script>
<style lang="scss" scoped>
	
</style>