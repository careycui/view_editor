<template>
	<div class="pcontainer" :style="[pos, bg, ff]" @dblclick.stop="setActive">
		<slot></slot>
		<div class="pcontainer-bg" v-if="data.style.type.val == 'IL'">
			<img :src="data.style.backgroundImage.val" class="bg-img">
		</div>
	</div>
</template>
<script>
import { mapState } from 'vuex'
import { common } from './utils'

	export default {
		name: 'container',
		mixins: [common]
	}
</script>
<style lang="scss" scoped>

</style>