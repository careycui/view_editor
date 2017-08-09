<template>
	<div class="c-color el-input" :class="{'is-disabled': disabled}">
		<input type="text" class="el-input__inner el-input--mini" v-model="colors.hex" @focus="changeActive" :disabled="disabled" @input="inputChange">
		<span class="c-color--view" :style="{ backgroundColor: colors.hex }"></span>
		<div class="c-color--box" :class="{ active: isActive}" :style="pos">
			<sketch v-model="colors"></sketch>
		</div>
	</div>
</template>
<script>
import { Sketch,Chrome} from 'vue-color'

	export default {
		name: 'ColorPicker',
		components: { Sketch },
		props: ['defaults', 'disabled'],
		data () {
			return {
				colors:{
					hex: this.defaults || '#FFFFFF'
				},
				isActive: false,
				pos: {
					left: 0,
					top: 0
				}
			}
		},
		mounted () {
			this.$emit('input', this.colors.hex);
			let rect = this.$el.getBoundingClientRect();
			this.pos.left = (rect.left - 101) + 'px';
			this.pos.top = (rect.top + 20) + 'px';
			
			let that = this;
			document.addEventListener('click', (e)=>{
				if(!that.$el.contains(e.target)){
					that.isActive = false;
				}
			});
		},
		watch : {
			colors (val) {
				this.$emit('input', val.hex);
			}
		},
		methods : {
			changeActive () {
				this.isActive = this.isActive?false:true;
			},
			inputChange () {
				this.$emit('input', this.colors.hex);
			}
		}

	}
</script>
<style lang="scss" scoped>
	.c-color{
		position:relative;
		display: block;
		width: 100%;
		height: 22px;
		line-height: 24px;
		vertical-align: middle;

		& .el-input--mini{
			height: 22px;
			padding-left: 32px;
		}

		& .c-color--view{
			display: inline-block;
			position: absolute;
			left: 4px;
			top: 50%;
			margin-top: -7px;
			width: 24px;
			height: 16px;
			border: 1px solid #ddd;
			border-radius: 2px;
			box-shadow: 0 0 1px rgba(0,0,0,.4);
		}

		& .c-color--box{
			display: inline-block;
			position: fixed;
			visibility: hidden;
			height: 0px;
			padding: 5px;
			overflow:hidden;
			z-index: 100;


			&.active{
				visibility: visible;
				height: 331px;
				-webkit-transition: all .5s;
				-moz-transition: all .5s;
				transition: all .5s;
			}
		}
	}
</style>