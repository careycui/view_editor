<template>
	<div class="section" :style="style">
		Section
		<slot></slot>
	</div>
</template>
<script>
import { mapState } from 'vuex'
import { common } from './utils'
	export default {
		name: 'setion-panel',
		mixins: [common],
		mounted () {
			console.log('section : ', this.formkey);
		}
	}
</script>
<style lang="scss" scoped>

</style>