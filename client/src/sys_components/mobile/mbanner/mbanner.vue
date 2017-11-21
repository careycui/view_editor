<template>
	<div class="m-whole" :style="[formatterStyle.bg, formatterStyle.opacity]">
		<img :src="data.bannerImg">
		<slot></slot>
	</div>
</template>
<script>
import BASE from './../../utils/base'

const formatter = BASE.formatter;

	export default{
		name: 'mBanner',
		props:{
			data:{
				type: Object,
				default () {
					return {
						id: '',
						label: 'Banner',
						bannerImg: 'about:blank',
						style:{
							opacity: 1,
							bg: BASE.bg()
						}
					}
				}
			},
		},
		computed: {
			formatterStyle () {
				let style = this.data.style;
				style.bg = formatter.bgFormatter(style.bg);
				style.opacity = {
					opacity: style.opacity
				};
				return style;
			}
		}
	}
</script>
<style>
	
</style>