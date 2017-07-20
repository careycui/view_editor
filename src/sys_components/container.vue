<template>
	<div class="container" :style="style">
		<slot></slot>
		<div class="container-bg" v-if="data.style.type.val == 2">
			<img src="https://statics.ys7.com/mall/public/product_imgs/C3S/C3S_4.jpg" class="bg-img">
		</div>
	</div>
</template>
<script>
import { mapState } from 'vuex'
import { common } from './utils'

	export default {
		name: 'container',
		mixins: [common],
		mounted () {
			console.log(this.data);
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