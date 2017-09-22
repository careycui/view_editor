<template>
	<div class="img-link outer-html ani-stage" :style="[pos, bg, ff]" :class="{active: isActive}" v-drag="setPos" @dblclick.stop="setActive">
		<div class="ani-outer" :class="[anicn, (anicn?'ani':'')]" :style="anis" :data-view-animation="anicn">
			<a :href="data.action.href.val" :target="data.action.target.val">
				<img :src="data.data.img.val" class="bg-img">
			</a>
		</div>
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