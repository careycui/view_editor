<template>
	<div class="banner" 
	:style="[formatterStyle.posRect, formatterStyle.bg, formatterStyle.opacity]">
		<slot></slot>
		<div class="pcontainer-bg">
			<img :src="data.bannerImg" class="bg-img">
		</div>
	</div>
</template>
<script>
import BASE from './../utils/base'

const formatter = BASE.formatter;

	export default {
		name: 'banner',
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
							bg: BASE.bg(),
							posRect: BASE.posRect()
						}
					}
				}
			},
		},
		computed: {
			formatterStyle () {
				let style = this.data.style;
				style.bg = formatter.bgFormatter(style.bg);
				style.posRect = formatter.posRectFormatter(style.posRect);
				style.opacity = {
					opacity: style.opacity
				};
				return style;
			}
		}
	}
</script>
<style lang="scss" scoped>

</style>