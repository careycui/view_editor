<template>
	<div class="c-input-number" :class="[size]">
		<div class="c-input__ctrl">
			<div class="c-input__ctrl-inc" v-long-click="increase">
				<div class="triangle"></div>
			</div>
			<div class="c-input__ctrl-dec" v-long-click="decrease">
				<div class="triangle"></div>
			</div>
		</div>
		<div class="c-input__inner">
			<input ref="input" type="text" class="c-input__inner-input"
			@keydown.up.prevent="increase"
			@keydown.down.prevent="decrease"
			@input="handleInputValid"
			:value="currentValue">
		</div>
	</div>
</template>
<script>
	import debounce from 'throttle-debounce/debounce';
	export default{
		name: 'cInputNumber',
		directives:{
			longClick:{
				bind(el, binding, vnode){
					let startTime;
					let interval;
					let handler = binding.value;

					let upHandler = () => {
						document.removeEventListener('mouseup', upHandler);

						if(new Date() - 200 < startTime){
							handler();
						}
						clearInterval(interval);
						interval = void 0;
					};
					el.addEventListener('mousedown', () => {
						startTime = new Date();

						document.addEventListener('mouseup', upHandler, false);
						clearInterval(interval);
						interval = setInterval(handler, 200);

					}, false);
				}
			}
		},
		props: {
			value: {
				type: Number,
				default: 0
			},
			step: {
				type: Number,
				default: 1
			},
			max: {
				type: Number,
				default: Infinity
			},
			min: {
				type: Number,
				default: -Infinity
			},
			formatter:Function,
			size: String,
		    delay: {
		    	type: Number,
		        default: 600
		    }
		},
		data () {
			return {
				currentValue: 0
			}
		},
		watch: {
	      	value: {
	        	immediate: true,
	        	handler(value) {
		          	let newVal = Number(value);
		          	if (isNaN(newVal)) return;
		          	if (newVal >= this.max) newVal = this.max;
		          	if (newVal <= this.min) newVal = this.min;
		          	this.currentValue = newVal;
		          	this.$emit('input', newVal);
	        	}
	      }
	    },
		computed: {
			maxDisabled () {
				return ((this.currentValue+this.step) > this.max?true:false);
			},
			minDisabled () {
				return ((this.currentValue-this.step) < this.min?true:false);
			}
		},
		methods:{
			handlerDown (){
				let startTime = new Date();
				setInterval(function(){

				},160);
			},
			//解决精度损失问题
			_getPrecision(value){
				let valStr = value.toString();
				let dotIndex = valStr.indexOf('.');
				let precision = 0;
				if(dotIndex !== -1){
					precision = valStr.length - dotIndex - 1;
				}
				return precision;
			},
			_increase (val, step) {
				let precision = this._getPrecision(val);
				let precisionVal = Math.pow(10, precision);

				return (val*precisionVal + step*precisionVal)/precisionVal;
			},
			_decrease (val, step) {
				let precision = this._getPrecision(val);
				let precisionVal = Math.pow(10, precision);

				return (val*precisionVal - step*precisionVal)/precisionVal;
			},
			increase () {
				if(this.maxDisabled){
					return;
				}
				let val = this._increase(this.currentValue, this.step);
				this.setCurrentValue(val);
			},
			decrease () {
				if(this.minDisabled){
					return;
				}
				let val = this._decrease(this.currentValue, this.step);
				this.setCurrentValue(val);
			},
			validValue (target) {
				const value = target.value;
				if(value === ''){
					return;
				}
				const newVal = Number(value);
				const oldVal = this.currentValue;
				if(!isNaN(newVal)){
					this.setCurrentValue(newVal);
				}else{
					target.value = oldVal;
				}
			},
			setCurrentValue (newVal) {
				let oldVal = this.currentValue;
				this.currentValue = Math.floor(newVal);

				this.$emit('change', newVal, oldVal);
				this.$emit('input', newVal);
			}
		},
		created () {
			this.handleInputValid = debounce(this.delay, event => {
				this.validValue(event.target);
			});
		}
	}
</script>
<style lang="scss">
	.c-input-number{
		position:relative;
	}
	.c-input__inner-input{
		-webkit-appearance: none;
	    -moz-appearance: none;
	    appearance: none;
	    background-color: #fff;
	    border-radius: 2px;
	    border: 1px solid #bfcbd9;
	    color: #1f2d3d;
	    font-size: inherit;
	    height: 36px;
	    line-height: 1;
	    outline: 0;
	    padding: 3px 10px;
	    box-sizing: border-box;
    	background-image: none;
	    transition: border-color .2s cubic-bezier(.645,.045,.355,1);
	}
	.c-input__ctrl{
		position: absolute;
		top: 1px;
		bottom: 1px;
		right: 2px;
		color: #8492A6;
		width: 14px;
		z-index: 100;
		opacity: 0;
		visibility: hidden;

		-webkit-transition: all .25s;
		-moz-transition: all .25s;
		-ms-transition: all .25s;
		transition: all .25s;

		& .c-input__ctrl-inc, & .c-input__ctrl-dec{
			position: relative;
			height: 50%;

			-webkit-transition: all .25s;
			-moz-transition: all .25s;
			-ms-transition: all .25s;
			transition: all .25s;

			&:hover{
				background-color: #E5E9F2;
			}
		}
	}
	.c-input-number:hover{
		.c-input__ctrl{
			opacity: 1;
			visibility: visible;
		}
	}
	.c-input__inner{
		.c-input__inner-input{
			display: inline-block;
			width: 100%;
		}
	}
	.c-input-number.small{
		& .c-input__inner-input{
			height: 30px;
		}
	}
	.triangle{
		position:absolute;
		width: 0;
		height: 0;
		top: 50%;
		right: 50%;
		margin-right: -3px;
		border: 3px solid transparent;
		margin-top: -4px;
	}
	.c-input__ctrl-inc .triangle{
		border-bottom: 4px solid #8492A6;

	}
	.c-input__ctrl-dec .triangle{
		border-top: 4px solid #8492A6;
	}
</style>