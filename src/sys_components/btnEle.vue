<template>
	<div class="btn-ele outer-html" :style="style" :class="{active: isActive}" v-drag="setPos">
		Button Element
	</div>
</template>
<script>
import { mapState } from 'vuex'
import { common } from './utils'
	export default {
		name: 'btn-ele',
		mixins: [common]
	}
</script>
<style lang="scss" scoped>

</style>