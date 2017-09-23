<template>
	<div class="link-ele outer-html ani-stage" :style="[pos]" :class="{active: isActive}" v-drag="setPos" @dblclick.stop="setActive">
		<div class="ani-outer active" :class="[anicn, (anicn?'ani':'')]" :style="anis" :data-view-animation="anicn">
			<a :href="data.action.href.val" :target="data.action.target.val" :style="[bg, ff, border]">
				{{data.data.txt.val}}
			</a>
		</div>
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