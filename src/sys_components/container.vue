<template>
	<div class="container" :style="style">
		<slot></slot>
	</div>
</template>
<script>
import { mapState } from 'vuex'
import { common } from './utils'

	export default {
		name: 'container',
		mixins: [common],
		mounted () {
			
		},
		methods: {
			show () {
				console.log(this.$store.getters.getForms);
			}
		}
	}
</script>
<style lang="scss" scoped>

</style>