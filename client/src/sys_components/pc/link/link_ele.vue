<template>
	<div class="link-ele" :style="[formatterStyle.wrect, formatterStyle.bg]">
		<a :href="data.link" :target="data.target" :style="[formatterStyle.ft]">
			{{ data.text }}
		</a>
	</div>
</template>
<script>
import BASE from './../../utils/base'

const formatter = BASE.formatter;

	export default {
		name: 'linkEle',
		props:{
			data:{
				type: Object,
				default () {
					return {
						id: '',
						label: '链接',
						text: '',
						target: '_blank',
						link: '',
						style:{
							bg: BASE.bg(),
							dragPosrect: BASE.dragPosrect(),
							ft: BASE.ft()
						}
					}
				}
			}
		},
		computed: {
			formatterStyle () {
				let style = this.data.style;
				style.wrect = formatter.dragPosrectFormatter(style.dragPosrect);
				style.ft = formatter.ftFormatter(style.ft);
				style.bg = formatter.bgFormatter(style.bg);
				return style;
			}
		}
	}
</script>
<style lang="scss">
	
</style>