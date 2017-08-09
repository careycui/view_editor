<template>
	<div class="link-ele outer-html" :style="[pos]" :class="{active: isActive}" v-drag="setPos" @dblclick.stop="setActive">
		<a :href="data.action.href.val" :target="data.action.target.val" :style="[bg, ff, border]">
			{{data.data.txt.val}}
		</a>
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
	.link-ele:after{
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