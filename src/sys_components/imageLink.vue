<template>
	<div class="img-link outer-html" :style="[pos, bg, ff]" :class="{active: isActive}" v-drag="setPos">
		<a :href="data.action.href.val" :target="data.action.target.val">
			<img :src="data.data.img.val" class="bg-img">
		</a>
	</div>
</template>
<script>
import { mapState } from 'vuex'
import { common } from './utils'
	export default {
		name: 'image-link',
		mixins: [common]
	}
</script>
<style lang="scss" scoped>
	.img-link:after{
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