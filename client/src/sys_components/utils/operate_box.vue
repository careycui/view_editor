<template>
	<div class="operate-box" :class="{active: isActive, 'enable-drag': enableDrag, 'low-index':currentCom.$$level !== 0}" :style="[style]" v-drag="proxyChangePos">
		<div class="op-line op-line_t">
			<div class="op-circle" v-drag-rect:top="proxyChangeRect"
				v-if="currentCom.style.dragPosrect && currentCom.resize !== 'w'"></div>
		</div>
		<div class="op-line op-line_r">
			<div class="op-circle" v-drag-rect:right="proxyChangeRect"
				v-if="currentCom.style.dragPosrect && currentCom.resize !== 'h'"></div>
		</div>
		<div class="op-line op-line_b">
			<div class="op-circle" v-drag-rect:bottom="proxyChangeRect"
				v-if="currentCom.style.dragPosrect && currentCom.resize !== 'w'"></div>
		</div>
		<div class="op-line op-line_l">
			<div class="op-circle" v-drag-rect:left="proxyChangeRect"
				v-if="currentCom.style.dragPosrect && currentCom.resize !== 'h'"></div>
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
			},
			dragRect:{
				bind (el, binding) {
					const rectEle = el;
					const type = binding.arg;
					rectEle.onmousedown = function(e){
						e.stopPropagation();
						let oX = e.pageX;
						let oY = e.pageY;

						document.onmousemove = function(e){
							let cX = e.pageX;
							let cY = e.pageY;
							let disX = cX - oX;
							let disY = cY - oY;
							oX = cX;
							oY = cY;

							binding.value(type, {disX: disX, disY: disY});
						}

						document.onmouseup = function (e) {
		                    document.onmousemove = null;
		                    document.onmouseup = null;
	                 	};
					}
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
				handler (newVal, o){
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
			},
			_setComRect (type, dis) {
				if(type === 'left' || type === 'right'){
					this.currentCom.style.dragPosrect.width = this.style.width.replace(/px/g, '') * 1;
					if(type === 'left'){
						let posType = this.currentCom.style.dragPosrect.posType;
						if(posType === 'LEFT'){
							this.currentCom.style.dragPosrect.LEFT.left = this.style.left.replace(/px/g, '') * 1;
						}
						if(posType === 'CENTER'){
							let oldl = this.currentCom.style.dragPosrect.CENTER.marginLeft;
							this.currentCom.style.dragPosrect.CENTER.marginLeft = oldl + dis.disX;
						}
					}
				}
				if(type === 'top' || type === "bottom"){
					let hType = this.currentCom.resize;
					if(hType && hType.indexOf('lh') > -1){
						this.currentCom.style.ft.lineHeight = this.style.height.replace(/px/g, '') * 1;
					}else{
						this.currentCom.style.dragPosrect.height = this.style.height.replace(/px/g, '') * 1;
					}
					if(type === 'top'){
						let oldt = this.currentCom.style.dragPosrect.top;
						this.currentCom.style.dragPosrect.top = oldt + dis.disY;
					}
				}
			},
			_topChange (dis) {
				let h = this.style.height.replace(/px/g, '') * 1;
				this.style.height = (h - dis.disY) + 'px';
				let t = this.style.top.replace(/px/g, '') * 1;
				this.style.top = (t + dis.disY) + 'px';

				this._setComRect('top', dis);
			},
			_rightChange (dis) {
				let w = this.style.width.replace(/px/g, '') * 1;
				this.style.width = (w + dis.disX) + 'px';

				this._setComRect('right');
			},
			_bottomChange (dis) {
				let h = this.style.height.replace(/px/g, '') * 1;
				this.style.height = (h + dis.disY) + 'px';

				this._setComRect('bottom');
			},
			_leftChange (dis) {
				let w = this.style.width.replace(/px/g, '') * 1;
				this.style.width = (w - dis.disX) + 'px';
				let l = this.style.left.replace(/px/g, '') * 1;
				this.style.left = (l + dis.disX ) + 'px';

				this._setComRect('left', dis);
			},
			proxyChangeRect (type, dis) {
				this['_' + type + 'Change'](dis);
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
		cursor: crosshair;
		z-index: 1;
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
		&.low-index{
			z-index: 0;
		}
	}
	.op-line{
		position: absolute;

		&.op-line_t{
			width: 100%;
			top: -1px;
			border-top: 1px dashed #20a0ff;

			& .op-circle{
				@extend %circle;
				top: -6px;
				left: 50%;
				margin-left: -6px;
			}
		}
		&.op-line_r{
			height: 100%;
			right: -1px;
			border-left: 1px dashed #20a0ff;

			& .op-circle{
				@extend %circle;
				right: -5px;
				top: 50%;
				margin-top: -6px;
			}
		}
		&.op-line_b{
			width: 100%;
			bottom: -1px;
			border-top: 1px dashed #20a0ff;

			& .op-circle{
				@extend %circle;
				bottom: -5px;
				left: 50%;
				margin-left: -6px;
			}
		}
		&.op-line_l{
			height: 100%;
			left: -1px;
			border-left: 1px dashed #20a0ff;

			& .op-circle{
				@extend %circle;
				left: -6px;
				top: 50%;
				margin-top: -6px;
			}
		}
	}
</style>