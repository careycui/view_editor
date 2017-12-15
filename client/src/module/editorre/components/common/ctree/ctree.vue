<template>
	<div class="tree-box">
		<c-tree-node
			:key="item.$$key"
			v-for="item in root.children"
			:node="item">
		</c-tree-node>
	</div>
</template>
<script>
import CTreeNode from './ctree_node'
import { Tree } from './tree'
	export default{
		name: 'cTree',
		components:{
			CTreeNode
		},
		props:{
			data:{
				type: Array,
				default: []
			},
			lineHeight:{
				type: Number,
				default: 20
			},
			accordion: {
				type: Boolean,
				default: false
			}
		},
		data () {
			return {
				tree: null,
				root: null,
				currentNode: null
			}
		},
		methods:{
			setSelected (node){
				if(node === this.currentNode){
					return;
				}
				this.currentNode = node;
				this.tree.setActiveNode(node);
			}
		},
		watch: {
			data (newVal){
				this.tree.setNodesData(newVal);

			}
		},
		created (){
			this.isTree = true;
			this.tree = new Tree({
				lineHeight: this.lineHeight,
				nodesData: this.data,
				accordion: this.accordion
			});
			this.root = this.tree.root;
		}
	}
</script>
<style lang="scss">
.tree-box{
	padding: 0 10px;
}
</style>