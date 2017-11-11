<template>
	<div class="coms-tree__node">
		<div class="coms-tree__content"
			:class="{ active: isActive}"
			@click="handleClick(content, isActive)">
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
				this.$emit('handleSelectClick', node);
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
}
</style>