<template>
	<div class="m-whole" :style="[formatterStyle.bg, formatterStyle.opacity, formatterStyle.padding]">
		<h1 :style="[formatterStyle.ft]">
			{{ data.text}}
		</h1>
	</div>
</template>
<script>
import BASE from './../../utils/base'

const formatter = BASE.formatter;

	export default{
		name: 'mbannerTitle',
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
				style.ft = formatter.m_ftFormatter(style.ft);
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