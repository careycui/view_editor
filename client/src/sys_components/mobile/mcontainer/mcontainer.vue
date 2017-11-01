<template>
	<div class="m-container" :style="[formatterStyle.bg]">
		<slot></slot>
	</div>
</template>
<script>
import BASE from './../../utils/base'
const formatter = BASE.formatter;

	export default {
		name: 'mContainer',
		props:{
			data:{
				type: Object,
				default () {
					return {
						id: '',
						label: 'Container',
						style:{
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
				return style;
			}
		}
	}
</script>
<style>
	.m-container{
		min-height: 200px;
	}
</style>