<template>
	<div class="pwhole"
	:style="[formatterStyle.opacity, formatterStyle.h]">
		<slot></slot>
		<img :src="data.bannerImg" v-if="data.bannerImg">
	</div>
</template>
<script>
import BASE from './../../utils/base'

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
							height: 'auto'
						}
					}
				}
			},
		},
		computed: {
			formatterStyle () {
				let style = this.data.style;
				style.opacity = {
					opacity: style.opacity
				};
				style.h = {
					height: style.height === 'auto'?'auto':style.height + 'px'
				}
				return style;
			}
		}
	}
</script>
<style lang="scss" scoped>

</style>