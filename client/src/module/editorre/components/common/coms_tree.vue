<template>
	<div class="coms-tree__node">
		<div class="coms-tree__content"
			:class="{ active: isActive}"
			@click.stop="handleClick(content, isActive)">
			<span class="coms-tree__tag">
				<i class="el-icon-setting"></i>
			</span>
			&nbsp;
			{{ content.label }}
		</div>
		<div class="coms-tree__children" v-if="childNodes.length>0">
			<coms-tree
				:label="cnt.label"
				:key="cnt.$$key"
				:content="cnt"
				:currComKey="currComKey"
				@handleSelectClick="handleClick"
				v-for="cnt in childNodes">
			</coms-tree>
		</div>
	</div>
</template>
<script>
	export default{
		name: 'comsTree',
		props:{
			label: String,
			content: {
				type: Object,
				default () {
					return {};
				}
			},
			currComKey: String,
			handleSelectClick: Function
		},
		computed: {
			isActive () {
				let active = (this.content.$$key === this.currComKey);
				return active;
			},
			childNodes () {
				let nodes;
				let content = this.content;
				if(content && content.content && content.content.length > 0){
					nodes = content.content;
				}else{
					nodes = [];
				}
				return nodes;
			}
		},
		methods: {
			handleClick (node, isActive) {
				if(isActive){
					return;
				}
				this.tree.setCurrKey(node);
			}
		},
		created () {
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
.coms-tree__node{
	position: relative;
	font-size: 12px;
	line-height: 24px;
	padding-left: 20px;
	vertical-align: middle;
	cursor: pointer;

	-webkit-transition: all .25s;
	-moz-transition: all .25s;
	-ms-transition: all .25s;
	transition: all .25s;

	& .coms-tree__content{
		padding-left: 5px;
		background-color: lighten(#1f2d3d, 5%);

		&:hover{
			background-color: #1f2d3d;

		}
		&.active{
			background-color: #1f2d3d;

			& .coms-tree__tag{
				color: #20a0ff;
			}
		}

	}

	& .coms-tree__tag{
		position: absolute;
		width: 20px;
		left: 0;
		text-align: center;
		background-color: #1f2d3d;
	}

	&.dragging{
		margin: 5px 0;
		border-top: 1px solid #fff;
		border-bottom: 1px solid #fff;
	}
}
</style>