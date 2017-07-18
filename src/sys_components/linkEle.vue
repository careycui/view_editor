<template>
	<div class="link-ele outer-html" :style="style" :class="{active: isActive}" v-drag="setPos">
		Link Element
	</div>
</template>
<script>
import { mapState } from 'vuex'
import { common } from './utils'
	export default {
		name: 'link-ele',
		mixins: [common]
	}
</script>
<style lang="scss" scoped>

</style>