<template>
	<div class="activity-banner"
	:style="[formatterStyle.h]">
		<slot></slot>
		<img :src="data.bannerImg" v-if="data.bannerImg">
	</div>
</template>
<script>
import BASE from './../../utils/base'

const formatter = BASE.formatter;

	export default {
		name: 'topicBanner',
		props:{
			data:{
				type: Object,
				default () {
					return {
						id: '',
						label: 'Topic Banner',
						bannerImg: 'about:blank',
						style:{
							height: 'auto'
						}
					}
				}
			},
		},
		computed: {
			formatterStyle () {
				let style = this.data.style;
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