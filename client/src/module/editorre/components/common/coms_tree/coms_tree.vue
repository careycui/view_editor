<template>
	<div class="tree-box">
		<ul class="tree-box__ul" v-for="td in data"
			:key="td.$$key"
			v-dragging="{item: td, list: data, group: '$$key-c'}">
			<tree-node :model="td" :ref="td.$$key"></tree-node>
		</ul>
	</div>
</template>
<script>
import TreeNode from './tree_node'
	export default{
		name: 'tree',
		components:{
			TreeNode
		},
		props:{
			data: {
				type: Array,
				default: []
			},
			strict: {
				type: Boolean,
				default: false
			}
		},
		data (){
			return {
				selected: [],
				currentNode: ''
			}
		},
		methods:{
			clearSelected (){
				this.selected = [];
			},
			addSelected (model){
				if(this.strict){
					this.clearSelected();
				}
				this.selected.push(model);
				this.currentNode = model.$$key;
				this.$emit('nodeSelectedClick', model);
			},
			setSelected (model){
				this.clearSelected();
				if(model){
				this.selected.push(model);
				this.currentNode = model.$$key;
				}else{
					this.currentNode = '';
				}
			}
		},
		created (){
			this.isTree = true;
		}
	}
</script>
<style lang="scss">
	.tree-box{
		background-color: #28394e;
		color: #bfcbd9;
		margin: 10px auto;
		font-size: 12px;
	}
	.tree-box__ul{
		list-style: none;
		padding-left: 0;

		&.dragging{
			margin: 5px 0;
			border-top: 1px solid #fff;
			border-bottom: 1px solid #fff;
		}
		li{
			line-height: 1.5;

			transition: all .3s;
		}
	}
</style>