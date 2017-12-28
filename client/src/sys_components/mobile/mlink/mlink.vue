<template>
	<div class="mlink" :style="[formatterStyle.wrect]">
		<a :href="data.link"
			:target="data.target"
			:style="[formatterStyle.ft]">
			{{ data.text }}
		</a>
	</div>
</template>
<script>
import BASE from './../../utils/base'

const formatter = BASE.formatter;

	export default {
		name: 'mlink',
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
							left: 0,
							width: 100,
							height: 100,
							top: 0,
							ft: BASE.ft()
						}
					}
				}
			}
		},
		computed: {
			formatterStyle () {
				let style = this.data.style;
				style.wrect = {left: style.left + '%', top: style.top + '%', width: style.width + '%', height: style.height + '%'};
				style.ft = formatter.ftFormatter(style.ft);
				return style;
			}
		}
	}
</script>
<style lang="scss">
	.link-ele:after{
		content: ' ';
		position: absolute;
		left: 0;
		top: 0;
		right: 0;
		bottom: 0;
		background: transparent;
	}
</style>