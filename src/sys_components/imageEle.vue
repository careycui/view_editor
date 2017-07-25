<template>
	<div class="image-ele outer-html" :style="[pos, border]" :class="{active: isActive}" v-drag="setPos">
		<img :src="data.data.img.val" class="img">
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
	.image-ele:after{
		content: ' ';
		display: block;
		position: absolute;
		left: 0;
		top: 0;
		right: 0;
		bottom: 0;
		cursor: crosshair;
	}
</style>