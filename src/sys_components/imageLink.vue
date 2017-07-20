<template>
	<div class="img-link outer-html" :style="style" :class="{active: isActive}" v-drag="setPos">
		Image Link
	</div>
</template>
<script>
import { mapState } from 'vuex'
import { common } from './utils'
	export default {
		name: 'image-link',
		mixins: [common],
		mounted () {
			console.log(this.data);
		},
	}
</script>
<style lang="scss" scoped>

</style>