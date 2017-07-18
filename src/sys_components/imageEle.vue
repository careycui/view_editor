<template>
	<div class="image-ele outer-html" :style="style" :class="{active: isActive}" v-drag="setPos">
		Image Element
	</div>
</template>
<script>
import { mapState } from 'vuex'
import { common } from './utils'
	export default {
		name: 'image-ele',
		mixins: [common]
	}
</script>
<style lang="scss" scoped>

</style>