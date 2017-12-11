<template>
	<div class="section" :style="[formatterStyle.bg]">
		<slot></slot>
	</div>
</template>
<script>
import BASE from './../../utils/base'
const formatter = BASE.formatter;

	export default {
		name: 'sectionPanel',
		props:{
			data:{
				type: Object,
				default () {
					return {
						id: '',
						label: 'Section',
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