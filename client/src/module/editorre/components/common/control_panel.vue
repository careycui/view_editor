<template>
	<div class="control-panel" :class="{ active: isActive}" :style="[pos]" v-if="currentCom">
		<div class="control-panel--header active" v-drag="setPos" data-drag-parent="true">
			<h4>
				组件设置
				<span class="control-panel_close" @click="close">
					<i class="el-icon-close"></i>
				</span>
				<span class="control-panel_cntr" @click="cntrl">
					<i class="el-icon-minus" v-if="isActive"></i>
					<i class="el-icon-plus" v-if="!isActive"></i>
				</span>
			</h4>
		</div>
		<div class="control-panel--cnt">
			<component :is="currentCom.$$comKey+'Editor'" :data.sync="currentCom"></component>
		</div>
	</div>
</template>
<script>
	export default {
		name: 'controlPanel',
		data () {
			return {
				pos: {
					left: '200px',
					top: '60px'
				},
				isActive: true
			}
		},
		computed: {
			currentCom : {
				get () {
					return this.$store.getters.getCurrentCom;
				},
				set (newVal) {
					this.$store.dispatch('updateCom',{currentCom: this.currentCom, data: newVal});
				}
			}
		},
		methods : {
			setPos (pos) {
				this.pos.left = pos.x + 'px';
				this.pos.top = pos.y + 'px';
			},
			close (){
				this.$store.dispatch('changeComKey', '');
			},
			cntrl (){
				this.isActive = !this.isActive;
			}
		}
	}
</script>
<style lang="scss">
	.control-panel{
		position: fixed;
		left: 100px;
		top: 60px;

		width: 280px;
		height: 30px;
		background-color: lighten(#1f2d3d, 10%);
		z-index: 1000;

		overflow: hidden;
		color: #e4e4e4;
		font-size: 12px;
		border-radius: 5px;

		-webkit-transition: height .35s cubic-bezier(0.46, 0.83, 0.63, 1),left 0.1s cubic-bezier(0.46, 0.83, 0.63, 1),top 0.1s cubic-bezier(0.46, 0.83, 0.63, 1);
		-moz-transition: height .35s cubic-bezier(0.46, 0.83, 0.63, 1),left 0.1s cubic-bezier(0.46, 0.83, 0.63, 1),top 0.1s cubic-bezier(0.46, 0.83, 0.63, 1);
		-ms-transition: height .35s cubic-bezier(0.46, 0.83, 0.63, 1),left 0.1s cubic-bezier(0.46, 0.83, 0.63, 1),top 0.1s cubic-bezier(0.46, 0.83, 0.63, 1);
		transition: height .35s cubic-bezier(0.46, 0.83, 0.63, 1),left 0.1s cubic-bezier(0.46, 0.83, 0.63, 1),top 0.1s cubic-bezier(0.46, 0.83, 0.63, 1);

		&.active{
			height: 600px;
		}

		& .control-panel--header{
			width: 100%;
			height: 30px;
			background-color: #1F2D3D;

			& h4{
				margin: 0 10px;
				font-size: 14px;
				line-height: 30px;
				vertical-align: middle;
				color: #e4e4e4;
				font-weight: 400;
				cursor: move;
			}

			& .control-panel_close{
				display: inline-block;
				float: right;
				margin-right: -10px;
				width: 30px;
				height: 30px;
				font-size: 12px;
				text-align: center;
				cursor: pointer;
			}

			& .control-panel_cntr{
				display: inline-block;
				float: right;
				margin-right: -10px;
				width: 30px;
				height: 30px;
				font-size: 12px;
				text-align: center;
				cursor: pointer;
			}
		}

		& .control-panel--cnt{
			width: 100%;
			height: 570px;

			overflow: auto;
		}
	}

//editor css
.control-panel--cnt .el-tabs__header{
	background-color: #324057;
}
.el-tabs__nav{
	width: 100%;
}
.control-panel--cnt .el-tabs__item{
  font-size: 12px;
  height: 32px;
  line-height: 32px;
  color: #e4e4e4;
  width: 50%;
  text-align: center;

  &:hover{
    color: #97a8be;
  }
}
.editor-pane{
	padding: 5px 10px;
	color: #475669;
}
.tab-line{
	position: relative;
	height: 1px;
	background-color: #bfcbd9;
	margin: 15px 0;

	& .tab-line--title{
		position: absolute;
		height: 24px;
		padding: 0 10px;
		top: 50%;
		left: 50%;
		transform: translate(-50%,0);
		margin-top: -12px;
		line-height: 24px;
		vertical-align: middle;
		background-color: #D3DCE6;
	}
}
.el-form-item{
	margin-bottom: 10px;
}
.el-form-item__label{
	font-size: 12px;
	padding: 6px 12px 6px 0;
	line-height:1.5;
	text-align: left;
}
.el-form-item__content{
	line-height: 30px;
	// height: 30px;
}
.br2 input{
	border-radius: 2px;
}
.tag-item{
	display: inline-block;
	height: 100%;
	padding: 0 8px;
	cursor: pointer;
	background-color: transparent;
	border-left: 1px solid transparent;
	border-right: 1px solid transparent;

	-webkit-transition: all .25s;
	-moz-transition: all .25s;
	transition: all .25s;

	&.active{
		background-color: #8492A6;
		border-left: 1px solid #E5E9F2;
		border-right: 1px solid #E5E9F2;
	}
}
</style>