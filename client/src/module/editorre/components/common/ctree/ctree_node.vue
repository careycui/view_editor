<template>
	<div class="tree-node">
		<div class="tree-node__cnt"
			@click.stop="nodeClick"
			:class="{ active: tree.tree.currentNode === node }"
			:style="{ lineHeight: tree.tree.getLineHeight(), paddingLeft: ((node.level-1) * 25) + 'px'}"
			draggable="true"
			:data-key="node.key"
			:drag-block="true"
			@dragstart="dragStart($event)"
			@dragenter="dragEnter($event)"
			@dragend="dragEnd"
			@dragover="dragover($event)"
			@drop="dropEnd($event)">
			<span class="tree-node__cnt-folder"
				:class="{'open': node.isOpen}"
				v-if="node.isFolder">
				<i class="el-icon-caret-right"></i>
			</span>
			<span class="tree-node__cnt-label">{{ node.data.label }}</span>
		</div>
		<div class="tree-node__children"
			:style="{height: node.isOpen?'auto':0}"
			v-if="isFolder">
			<c-tree-node
				:key="item.$$key"
				v-for="item in node.children"
				:node="item">
			</c-tree-node>
		</div>
	</div>
</template>
<script>
	export default{
		name: 'cTreeNode',
		props:{
			node:{
				type: Object,
				default: {}
			}
		},
		data (){
			return {
				tree: null,
				openHeight: 0
			}
		},
		computed:{
			isFolder (){
				return (this.node.children && this.node.children.length > 0);
			}
		},
		methods:{
			toggleChildren (){
				if(this.node.isOpen){
					this.node.collapseNode();
				}else{
					this.node.expandNode();
				}
			},
			nodeClick (){
				this.tree.tree.setCurrentNode(this.node);
				this.tree.currentNode = this.node.data;
				if(this.node.isFolder){
					this.toggleChildren();
				}
				this.tree.$emit('nodeClick', this.node.data);
			},
			dragStart (e){
				this.tree.tree.dragModel.handleDragStart(e);
			},
			dragover (e){
				e.preventDefault();
				this.tree.tree.dragModel.handleDragOver(e);
				return false;
			},
			dragEnter (e){
				this.tree.tree.dragModel.handleDragEnter(e);
			},
			dragEnd (){
				this.tree.tree.dragModel.handleDragEnd();
			},
			dropEnd (e){
				e.preventDefault();
				e.stopPropagation();
				const DDD = this.tree.tree.dragModel.handleDrop();
				this.tree.$emit('sortHandle', DDD);
			}
		},
		mounted (){
			if(this.node.children){
				let h = this.node.children.length * this.tree.tree.lineHeight || 0;
				this.openHeight = h + 'px';

				// const $c = this.$el.querySelector('.tree-node__children');
				// $c && ($c.addEventListener('transitionend', function(e){
				// 	console.log(e.target.style.height);
				// },false))
			}
		},
		updated (){
			if(this.node.children){
				let h = this.node.children.length * this.tree.tree.lineHeight || 0;
				this.openHeight = h + 'px';
			}
		},
		created (){
			const parent = this.$parent;
			if(parent.isTree){
				this.tree = parent;
			}else{
				this.tree = parent.tree;
			}
			if(this.node.children){
				this.$watch('node.data.content', (n, o) => {
					this.node.updateChildren();
				});
			}
		}
	}
</script>
<style lang="scss">
.tree-node__cnt{
	word-spacing: -4px;
	vertical-align: top;
	cursor: pointer;
	padding: 0 5px;

	&.active{
		background-color: #1f2d3d;
	}
	&.drag-hoving{
		border: 1px solid lighten(#1f2d3d, 20%);
	}
	&.dragging{
		opacity: .5;
	}
	&.drag-insert{
		border-top: 1px solid lighten(#1f2d3d, 20%);
	}
}
.tree-node__cnt-folder{
	display: inline-block;
	width: 20px;
	height: 100%;
	text-align: center;
	font-size: 12px;
	word-spacing: 0;

	& .el-icon-caret-right{
		transform: rotate(0);
		transform-origin: center center;
		transition: all .35s .1s;
	}
	&.open{
		& .el-icon-caret-right{
			transform: rotate(90deg);
		}
	}
}
.tree-node__cnt-label{
	display: inline-block;
	word-spacing: 0;
}
.tree-node__children{
	height: 0;
	transition: all .35s .1s;
	overflow: hidden;
}
</style>