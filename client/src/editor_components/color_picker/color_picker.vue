<template>
	<div class="color-picker__outer" :style="{height: height}">
		<div class="color-picker" :class="[size?'color-picker--'+size:'']">
			<div class="color-picker__picker" @click="handleColorPanel">
				<span class="color-picker__picker-inner" :style="{backgroundColor:preColor}"></span>
				<i class="el-input__icon el-icon-caret-bottom"></i>
			</div>
			<div class="color-picker__base">
				<span class="color-picker__base-item"
					:style="{backgroundColor:base}"
					v-for="base in baseColors" @click="pickBase(base)">
				</span>
				<span class="color-picker__base-item"
					style="margin-left: -3px;"
					:style="{backgroundColor: 'transparent'}"
					@click="setTransparent"></span>
			</div>
		</div>
		<chrome 
		v-model="currentValue" 
		:fieldsIndex="fieldsIndex" 
		ref="chrome" 
		style="position:absolute;z-index:1000;" 
		:style="{left:pos.x+'px', top:pos.y+'px'}">
		</chrome>
	</div>
</template>
<script>
import Chrome from './Chrome'
import tinycolor from 'tinycolor2'
	const presetColors = [
	  '#D0021B', '#F5A623', '#F8E71C', '#8B572A', '#7ED321',
	  '#417505', '#BD10E0', '#9013FE', '#4A90E2', '#50E3C2',
	  '#B8E986', '#000000', '#4A4A4A', '#9B9B9B', '#FFFFFF'
	];
	const _getOffsetParent = function (element) {
		let offsetParent = element.offsetParent;
        return offsetParent === window.document.body || !offsetParent ? window.document.documentElement : offsetParent;
	};
	const _getPosition = function (element) {
		let left = element.offsetLeft;
		let top = element.offsetTop;
		let sleft = element.scrollLeft;
		let stop = element.scrollTop;
		let parent = element.offsetParent;
		while(parent !== null){
			left += parent.offsetLeft;
			top += parent.offsetTop;
			sleft += parent.scrollLeft;
			stop += parent.scrollTop;
			parent = parent.offsetParent;
		}
		return {x: left-sleft, y: top-stop};
	};
	export default {
		name: 'colorPicker',
		props:{
			source: {
				type: String,
				default: 'hex'
			},
			value: {
				type: String,
				default: 'transparent'
			},
			size: String,
			baseColors: {
				type: Array,
				default () {
					return presetColors;
				}
			}
		},
		data () {
			return {
				currentValue: {
					hex: '',
					rgba: '',
					rgbas: ''
				},
				showColorPanel: false,
				pos:{},
				height: '30px'
			}
		},
		components:{
			Chrome
		},
		computed:{
			preColor () {
				let c = this.currentValue.hex;
				if(this.source === 'rgba'){
					c = this.currentValue.rgbas;
				}
				return c;
			},
			fieldsIndex () {
				return (this.source === 'hex'?0:1);
			}
		},
		watch:{
			value (newVal) {
				if(newVal === 'transparent'){
					this.currentValue = {
						hex: 'transparent',
						rgba:{
							r: 0,
							g: 0,
							b: 0,
							a: 0
						},
						rgbas: 'rgb(0, 0, 0, 0)'
					};
					return;
				}
				let color = tinycolor(newVal);
				this.currentValue = {
					hex: color.toHexString().toUpperCase(),
    				rgba: color.toRgb(),
    				rgbas: color.toRgbString()
				};
				this.$emit('input', newVal);
			},
			currentValue (newVal, oldVal) {
				this._colorChange(newVal);
			}
		},
		methods: {
			_colorChange (c) {
				let value = c.hex;
				if(this.source === 'rgba'){
					value = c.rgbas;
				}
				this.$emit('input', value);
			},
			setCurrentValue (c) {
				this.currentValue = c;
				this._colorChange(c);
			},
			pickBase (c) {
				let color = tinycolor(c);
				this.setCurrentValue({
					hex: color.toHexString().toUpperCase(),
    				rgba: color.toRgb(),
    				rgbas: color.toRgbString()
				});
			},
			setTransparent () {
				this.setCurrentValue({
					hex: 'transparent',
					rgba:{
						r: 0,
						g: 0,
						b: 0,
						a: 0
					},
					rgbas: 'rgb(0, 0, 0)'
				});
			},
			handleColorPanel () {
				this.showColorPanel = !this.showColorPanel;
				if(this.showColorPanel){
					this.height = "280px";
				}else{
					this.height = "30px";
				}
			}
		},
		beforeMount () {
			if(this.value === 'transparent'){
				this.setTransparent();
			}else{
				let color = tinycolor(this.value);
				this.currentValue = {
					hex: color.toHexString().toUpperCase(),
					rgba: color.toRgb(),
					rgbas: color.toRgbString()
				};
			}
		}
	}
</script>
<style lang="scss">
	.color-picker__outer{
		-webkit-transition: all .5s;
		-moz-transition: all .5s;
		-ms-transition: all .5s;
		transition: all .5s;
	}
	.color-picker{
		height: 36px;
		width: 100%;

		&.color-picker--small{
			height: 30px;
		}
	}
	.color-picker__picker{
		position: relative;
		float: left;
		height: 100%;
		width: 56px;
		padding: 7px 2px;
		border: 1px solid #8391a5;
		border-radius: 2px;

		box-shadow: 0 2px 6px transparent;
		-webkit-transition: all .3s;
		-moz-transition: all .3s;
		-ms-transition: all .3s;
		transition: all .3s;

		&:hover{
			box-shadow: 0 2px 6px rgba(0,0,0, .2);
		}
		& .color-picker__picker-inner{
			display: block;
			margin-right: 20px;
			height: 20px;
			background-color: #fff;

		}
		& .el-input__icon{
			width: 20px;
		}
	}
	.color-picker__base{
		margin-left: 58px;
		line-height: 1;
		cursor: pointer;
		& .color-picker__base-item{
			display: inline-block;
			width: 13px;
			height: 13px;
			border-radius: 2px;
			background-color: #f0f;
			vertical-align: top;
			margin: 1px;
			border: 1px solid #8391a5;

			box-shadow: 0 0px 4px transparent;
			-webkit-transform: scale(1,1);
			-ms-transform: scale(1,1);
			-moz-transform: scale(1,1);
			transform: scale(1,1);
			-webkit-transition: all .2s;
			-moz-transition: all .2s;
			-ms-transition: all .2s;
			transition: all .2s;

			&:hover{
				box-shadow:0 0 4px rgba(0,0,0, .4);
				z-index: 10;
				-webkit-transform: scale(1.1,1.1);
				-ms-transform: scale(1.1,1.1);
				-moz-transform: scale(1.1,1.1);
				transform: scale(1.1,1.1);
			}
		}
	}
	.color-picker--small{
		.color-picker__picker{
			padding: 4px 2px;
			width: 50px;
		}
		.color-picker__base{
			margin-left: 52px;
		}
	}
</style>