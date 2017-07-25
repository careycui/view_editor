<template>
	<div class="banner outer-html" :style="[pos, bg, ff]" :class="{active: isActive}" v-drag="setPos">
		<div class="container-bg" v-if="data.style.type.val == 'IL'">
			<img :src="data.style.backgroundImage.val" class="bg-img">
		</div>
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
		}
	}
</script>
<style lang="scss" scoped>

</style>