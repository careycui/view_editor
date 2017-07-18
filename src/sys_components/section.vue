<template>
	<div class="section outer-html" :style="style" :class="{active: isActive}" v-drag="setPos">
		<slot></slot>
	</div>
</template>
<script>
import { mapState } from 'vuex'
import { common } from './utils'
	export default {
		name: 'setion-panel',
		mixins: [common],
		computed: {
			isActive () {
				return this.formkey == this.currentDom;
			}
		},
		mounted () {
		}
	}
</script>
<style lang="scss" scoped>

</style>