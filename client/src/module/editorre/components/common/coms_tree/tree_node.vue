<template>
	<li>
		<div class="tree-text" :class="{active: active}" @click.stop="nodeClick(model)">
			<span class="tree-text__cntrl"> <i class="fa" :class="[isFolder?'fa-cubes':'fa-cube']"></i> </span>
		    <span>{{ model.label }}</span>
		</div>
	    <ul class="pl20 tree-box__ul" v-for="td in model.content"
	    	v-show="isFolder"
	    	v-if="model.content.length > 0" :key="td.key">
	        <tree-node :model="td">
	        </tree-node>
	    </ul>
	</li>
</template>
<script>
	export default{
		name: 'treeNode',
		props:['model'],
		computed:{
			isFolder (){
				return (this.model.content && this.model.content.length > 0);
			},
			active (){
				return (this.tree.currentNode === this.model.$$key);
			}
		},
		methods:{
			toggle (e){
				if(this.isFolder){
					this.open = !this.open;
				}
			},
			nodeClick (model){
				if(this.active){
					return;
				}
				this.tree.addSelected(model);
			}
		},
		created(){
			const parent = this.$parent;
			if(parent.isTree){
				this.tree = parent;
			}else{
				this.tree = parent.tree;
			}
		}
	}
</script>
<style lang="scss">
	.tree-text{
		.tree-text__cntrl{
			display: inline-block;
			width: 20px;
			text-align: center;
			cursor: pointer;
		}

		&:hover{
			background-color: #1f2d3d;
			cursor: pointer;

			& .tree-text__cntrl{
				color: #20a0ff;
			}
		}

		&.active{
			background-color: #1f2d3d;

			& .tree-text__cntrl{
				color: #20a0ff;
			}
		}
	}
	.collapse-enter, .collapse-leave{
		opacity: 0;
		transform: translate(-5%,0);
	}
	.collapse-enter-active, .collapse-leave-active{
		transition: all .3s;
		transform-origin: center top;
	}
	.pl20{
		padding-left: 20px;
	}
</style>