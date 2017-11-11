<template>
	<div class="coms-panel">
		<el-row>
			<el-col :span="24" class="page-tree_btns">
				<el-button type="primary" size="mini" icon="plus" class="reset-br" @click="addPage"></el-button>
				<el-button type="warning" size="mini" icon="delete" class="reset-br" @click="deleteCom"></el-button>
			</el-col>
			<el-col :span="24" class="page-tree_section">
				<el-tree class="c-tree"
	              :data="treeData"
	              node-key="$$key"
	              ref="tree"
	              show-checkbox
	              :check-strictly="true"
	              :props="treeProps"
	              :auto-expand-parent="true"
	              :default-expand-all="true"
	              :default-checked-keys="defaultChecks"
	              @check-change="handleChange"
	              highlight-current>
	            </el-tree>
			</el-col>
		</el-row>
		<el-row style="margin-top:10px;">
			<el-col :span="24">
				<el-tabs v-model="activeTabName">
					<el-tab-pane 
					:label="sc.label" 
					:name="key" 
					v-for="(sc, key) in sysComs" 
					:key="key"
					v-if=" key!=='LEVEL_2'">
						<ul class="list-inline com-list">
				            <li class="com-list--item" @click="add(cs)" 
				            	v-for="cs in sc.coms" :key="cs.$$key">
				              	<i class="fa fa-lg" :class="cs.desc.icon"></i><br>
				              	{{ cs.desc.label }}
				            </li>
			          	</ul>
					</el-tab-pane>
				</el-tabs>
			</el-col>
		</el-row>
	</div>
</template>
<script>
import { Message } from 'element-ui'
	export default{
		name: 'comsCtrl',
		data () {
		    return {
		      	treeProps:{
		        	label: 'label',
		        	children: 'content'
		      	},
		      	activeTabName: 'LEVEL_1'
		    }
	  	},
	    computed:{
		    baseData () {
		      return this.$store.getters.getBaseData;
		    },
		    treeData () {
		      return this.$store.getters.getPageData;
		    },
		    currentComKey () {
		      return this.$store.getters.getCurrentComKey;
		    },
		    defaultChecks () {
		      return new Array(this.currentComKey);
		    },
		    sysComs () {
		      return this.$sys_coms;
		    }
		},
		mounted () {
	    	if(this.treeData.length<1){
		    	this.addPage();
			}
		},
		watch:{
			currentComKey (newVal) {
				this.setTreeCheck(newVal);
			}
		},
		methods: {
			setTreeCheck (key) {
	        	this.$refs.tree.setCheckedKeys(new Array(key));
		    },
		    add (com) {
		    	let data = com.data();
		    	data.$$comKey = com.comKey;
		    	data.$$level = com.desc.level;
		    	this.$store.dispatch('addCom', {com: data}).then((obj) => {
		    		this.setTreeCheck(obj.$$key);
		    	});
		    },
		    addPage (){
		      	let containers = this.$sys_coms.LEVEL_2;
		      	let pageContainer;
		      	let t_type = this.$store.getters.getComType;
		      	containers.coms.forEach((c,i) => {
		        	if(c.comKey == 'container'){
		          		pageContainer = c;
		        	}
		      	});
		      	let data = pageContainer.data();
		      	data.$$comKey = pageContainer.comKey;
		      	data.$$level = pageContainer.desc.level;
		      	this.$store.dispatch('addContainer', {page: data}).then((obj) => {
		    		this.setTreeCheck(obj.$$key);
		    	});
		    },
		    deleteCom (){
		    	if(!this.currentComKey){
		    		Message({
			          	showClose:true,
			          	message: '未选中组件',
			          	type: 'error'
			        });
		    		return false;
		    	}
		    	this.$store.dispatch('deleteCom').then((obj) => {
		    		Message({
			          	showClose:true,
			          	message: '已删除当前组件',
			          	type: 'warning'
			        });
		    	});;
		    },
		    handleChange (data, checked, haveChecked) {
		      	if(checked){
		        	this.$store.dispatch('changeComKey', data.$$key);
		      	}
		    }
		}
	}
</script>
<style lang="scss" scoped>
	.coms-panel{
		width: 250px;
		position: fixed;
		top: 0;
		bottom: 0;
		left: 0;
		padding: 50px 10px;

		background-color: #1f2d3d;
		z-index: 90;
		box-shadow: -4px 0 5px rgba(0,0,0, .2);
		color: #bfcbd9;
	}
	.page-tree_btns{
		margin: 10px auto;
		padding: 5px 10px;
		background-color: #324157;
	}
	.page-tree_section{
		max-height: 250px;
		overflow: auto;
	}
	.c-tree{
		background-color: #324157;
		border: none;

		& .el-tree-node__content:hover{
			background-color: lighten(#324157, 5%);
		}
	}
	.com-list{
		margin-left: 0;
	    word-spacing: -6px;

    	& .com-list--item{
		    padding: 10px  20px;
		    text-align: center;
		    word-spacing: 0;
		    vertical-align: top;
		    font-size: 12px;
		    cursor: pointer;
		    border-radius: 5px;

	      	&:hover, &:focus, &.active{
	      		color: #20a0ff;
	        	background-color: lighten(#324157, 5%);
	      	}
	    }
  	}
	.reset-br{
		border-radius: 2px;
	}
	.el-tree-node__content{
		overflow: hidden;
	}
</style>