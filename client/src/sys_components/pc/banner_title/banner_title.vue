<template>
	<div class="short-title" :style="[formatterStyle.opacity, formatterStyle.padding]">
		<p :style="[formatterStyle.ft]">
			{{ data.text }}
		</p>
	</div>
</template>
<script>
import BASE from './../../utils/base'

const formatter = BASE.formatter;

	export default{
		name: 'bannerTitle',
		props:{
			data:{
				type: Object,
				default () {
					return {
						id: '',
						label: '通栏标题',
						text: '',
						style:{
							opacity: 1,
							paddingTop: 0,
							paddingBottom: 0,
							ft: BASE.ft()
						}
					}
				}
			},
		},
		computed: {
			formatterStyle () {
				let style = this.data.style;
				style.ft = formatter.ftFormatter(style.ft);
				style.opacity = {
					opacity: style.opacity
				};
				style.padding = {
					paddingTop: style.paddingTop?style.paddingTop + 'px':'',
					paddingBottom: style.paddingBottom?style.paddingBottom + 'px':''
				};
				return style;
			}
		}
	}
</script>