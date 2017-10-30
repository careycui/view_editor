<template>
	<div>
		<button class="ys-btn" :class="{'active': curr == item }" @click="handleClick(item)" v-for="item in data">
			<i class="fa fa-align-left" v-if="item == 'L'"></i>
			<i class="fa fa-align-center" v-if="item == 'C'"></i>
			<i class="fa fa-align-right" v-if="item == 'R'"></i>
		</button>
	</div>
</template>
<script>
	export default {
		name: 'YsAlign',
		props: ['data'],
		data () {
			return {
				curr: 'C'
			}
		},
		mounted () {
			this.$emit('handleCallback', this.curr);
		},
		updated () {
			this.$emit('handleCallback', this.curr);
		},
		methods: {
			handleClick (type) {
				this.curr = type;
				this.$emit('input', type);
				this.$emit('handleCallback', type);
			}
		}
	}
</script>
<style>
</style>