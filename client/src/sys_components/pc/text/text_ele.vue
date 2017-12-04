<template>
	<div class="text-ele" :style="[formatterStyle.wrect]">
		<p :style="[formatterStyle.ft]">
		   {{ data.text }}
		</p>
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
				style.ft = formatter.ftFormatter(style.ft);
				return style;
			}
		}
	}
</script>
<style lang="scss" scoped>
	.text-ele{
		z-index: 1;
	}
</style>