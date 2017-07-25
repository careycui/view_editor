<template>
	<div class="btn-ele outer-html" :style="[pos]" :class="{active: isActive}" v-drag="setPos">
		<button type="button" class="ys-btn" :style="[ff,border,bg]">
			{{ data.data.txt.val }}
		</button>
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
	.btn-ele:after{
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