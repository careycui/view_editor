<template>
	<div class="operate-box" :class="{active: isActive, 'enable-drag': enableDrag}" :style="[style]" v-drag="proxyChangePos">
		<div class="op-line op-line_t">
			<div class="op-circle"></div>
		</div>
		<div class="op-line op-line_r">
			<div class="op-circle"></div>
		</div>
		<div class="op-line op-line_b">
			<div class="op-circle"></div>
		</div>
		<div class="op-line op-line_l">
			<div class="op-circle"></div>
		</div>
	</div>
</template>
<script>
	const _getRelativeDomRect = (dom, parentDom) => {
		let l = dom.offsetLeft;
		let t = dom.offsetTop;
		let offsetParent = dom.offsetParent;
		while(offsetParent !== null && offsetParent !== parentDom){
			l += offsetParent.offsetLeft;
			t += offsetParent.offsetTop;

			offsetParent = offsetParent.offsetParent;
		}
		let rect = dom.getBoundingClientRect();
		return {
				left: l,
				top: t,
				width: rect.width,
				height: rect.height
			};
	}
	export default{
		name: 'operateBox',
		directives:{
			drag:{
				bind (el, binding) {
					const dragEle = el;
					dragEle.onmousedown = function (e) {
						let enableDrag = dragEle.className.indexOf('enable-drag') > -1;
						if(enableDrag){
				            if(dragEle.className.indexOf('active')>-1){
				             	//鼠标按下，计算当前元素距离可视区的距离
				                let disX = e.pageX;
				                let disY = e.pageY;

				                document.onmousemove = function (e) {
				                  //通过事件委托，计算移动的距离 
				                    let l = e.pageX - disX;
				                    let t = e.pageY - disY;
				                    disX = e.pageX;
				                    disY = e.pageY;
				                     //将此时的位置差传出去
				                    binding.value({x:l,y:t})
				                };
				            }
						}
		                document.onmouseup = function (e) {
		                    document.onmousemove = null;
		                    document.onmouseup = null;
		                 };
			        };
				}
			}
		},
		data (){
			return {
				style:{}
			}
		},
		computed:{
			currentCom (){
				let com = this.$store.getters.getCurrentCom;
				return com;
			},
			enableDrag (){
				let enableDrag = this.currentCom.enableDrag;
				return enableDrag;
			},
			isActive (){
				let key = this.$store.getters.getCurrentComKey;
				return (!!key?true:false);
			}
		},
		watch:{
			currentCom:{
				immediate: true,
				handler (newVal){
					this.$nextTick(() => {
						let comKey = newVal.id;
						let comDom = document.getElementById(comKey);
						let parentDom = document.getElementById('preview');
						let rect = _getRelativeDomRect(comDom, parentDom);

						this.style = {
							width: rect.width + 'px',
							height: rect.height + 'px',
							left: rect.left + 'px',
							top: rect.top + 'px'
						};
					});
				},
				deep: true
			}
		},
		methods:{
			proxyChangePos (pointer) {
				let posType = this.currentCom.style.dragPosrect.posType;
				let oldt = this.currentCom.style.dragPosrect.top;
				if(posType === 'LEFT'){
					let oldl = this.currentCom.style.dragPosrect.LEFT.left;
					this.currentCom.style.dragPosrect.LEFT.left = oldl + pointer.x;
				}
				if(posType === 'CENTER'){
					let oldl = this.currentCom.style.dragPosrect.CENTER.marginLeft;
					this.currentCom.style.dragPosrect.CENTER.marginLeft = oldl + pointer.x;
				}
				this.currentCom.style.dragPosrect.top = oldt + pointer.y;
			}
		}
	}
</script>
<style lang="scss">
	%circle{
		width: 12px;
		height: 12px;
		position: absolute;
		background-color: #eef1f6;
		border: 1px solid #20a0ff;
		border-radius: 6px;
		box-sizing: border-box;
	}
	.operate-box{
		display: none;
		position: absolute;
		left: 0;
		top: 0;
		z-index: 80;

		&.active{
			display: block;
		}
	}
	.op-line{
		position: absolute;
		background-color: #20a0ff;

		&.op-line_t{
			width: 100%;
			height: 1px;
			top: -1px;

			& .op-circle{
				@extend %circle;
				top: -5px;
				left: 50%;
				margin-left: -6px;
			}
		}
		&.op-line_r{
			width: 1px;
			height: 100%;
			right: -1px;

			& .op-circle{
				@extend %circle;
				right: -5px;
				top: 50%;
				margin-top: -6px;
			}
		}
		&.op-line_b{
			width: 100%;
			height: 1px;
			bottom: -1px;

			& .op-circle{
				@extend %circle;
				bottom: -5px;
				left: 50%;
				margin-left: -6px;
			}
		}
		&.op-line_l{
			height: 100%;
			width: 1px;
			left: -1px;

			& .op-circle{
				@extend %circle;
				left: -5px;
				top: 50%;
				margin-top: -6px;
			}
		}
	}
</style>