<template>
	<div class="banner outer-html" :style="style" :class="{active: isActive}" v-drag="setPos">
		
	</div>
</template>
<script>
import { mapState } from 'vuex'
import { common } from './utils'
	export default {
		name: 'banner',
		mixins: [common],
		computed: {
			isActive () {
				return this.formkey == this.currentDom;
			}
		},
		mounted () {
			console.log('banner : ', this.formkey);
		}
	}
</script>
<style lang="scss" scoped>

</style>