<template>
	<div class="pcontainer" :style="[formatterStyle.posRect, formatterStyle.bg]">
		<slot></slot>
	</div>
</template>
<script>
import BASE from './../../utils/base'
const formatter = BASE.formatter;

	export default {
		name: 'container',
		props:{
			data:{
				type: Object,
				default () {
					return {
						id: '',
						label: 'Container',
						style:{
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
				return style;
			}
		}
	}
</script>
<style lang="scss" scoped>
	.pcontainer{
		position: relative;
	}
</style>