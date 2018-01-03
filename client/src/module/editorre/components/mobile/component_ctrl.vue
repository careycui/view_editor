<template>
	<div class="component-panel" :class="{ active: cntActive }">
		<div class="coms-panel__cnt">
			<div class="coms-panel__cnt-page"
				id="page-data"
				:class="{ active: true }">
				<div class="page-tree_btns">
					<el-button type="primary" size="mini" icon="plus" class="reset-br" @click="addPage"></el-button>
					<el-button type="primary" size="mini" icon="upload" class="reset-br" @click="openUploadDialog"></el-button>
					<el-button type="primary" size="mini" class="reset-br" @click="copyContainer">
						<i class="fa fa-copy"></i>
					</el-button>
					<el-button type="warning" size="mini" icon="delete" class="reset-br" @click="deleteContainerCom"></el-button>
					<el-button type="info" size="mini" class="reset-br" @click="toggleComsPanel">
						<i class="fa fa-toggle-off" v-show="!comsPanelActive"></i>
						<i class="fa fa-toggle-on" v-show="comsPanelActive"></i>
					</el-button>
				</div>
				<div class="page-box"
					:class="{active: ct.$$key === curContainerKey}"
					v-for=" (ct, index) in treeData"
					@click="changeContainerKey(ct.$$key)"
					v-dragging="{item: ct, list: treeData, group: '$$key'}"
					:key="ct.$$key">
					<p>
						{{ ct.label }}
					</p>
					<div class="page-num">
						<span class="num">
							{{ index+1 }}
						</span>
					</div>
				</div>
			</div>
		</div>
		<div class="coms-panel__bar">
			<div class="coms-item coms-item__cntrl" @click="handleCntrl">
				<i class="fa fa-navicon fa-2x nav-icon" :class="{ active: cntActive }"></i>
			</div>
			<div class="coms-item coms-item__forever"
				key="page-data"
				:class="{ active: true}">
				<i class="fa fa-cubes"></i>
				<p class="coms-item__title">
					结构
				</p>
			</div>
			<div class="coms-item"
				:key="key"
				:class="{ active: key === activePanel }"
				v-for="(sc, key) in sysComs"
				v-if="key!=='LEVEL_2'" @click="handleTabClick(key)">
				<i class="fa" :class="sc.icon"></i>
				<p class="coms-item__title">
					{{ sc.label }}
				</p>
				<transition name="fade">
					<div class="coms-panel__cnt-item"
						:class="{ active: key === activePanel }" v-show="key === activePanel">
							<ul class="list-inline com-list" v-show="sc.coms.length>0">
					            <li class="com-list--item" @click.stop="add(cs)" 
					            	v-for="cs in sc.coms" :key="cs.$$key">
					              	<i class="fa fa-lg" :class="cs.desc.icon"></i><br>
					              	{{ cs.desc.label }}
					            </li>
				          	</ul>
				          	<ul class="list-inline com-list" v-show="sc.coms.length<1">
				          		<li class="com-list--item">
				          			空
				          		</li>
				          	</ul>
					</div>
				</transition>
			</div>
		</div>
		<transition name="fade-right">
			<div class="children-panel" v-show="comsPanelActive">
				<div class="children-panel__header">
					<el-button type="primary" size="mini" @click="copyCom">
						<i class="fa fa-copy"></i>
					</el-button>
					<el-button type="primary" size="mini" @click="copyToClipboard" title="复制到粘贴板">
						<i class="fa" :class="{'fa-clipboard': !!!copy_com, 'fa-check': !!copy_com}"></i>
					</el-button>
					<el-button type="primary" size="mini" @click="insertTo" :disabled="!!!copy_com" title="插入复制内容">
						<i class="fa fa-indent"></i>
					</el-button>
					<el-button type="warning" icon="delete" size="mini" @click="deleteCom"></el-button>
					<span class="children-panel__close" @click="toggleComsPanel">
						<i class="el-icon-close"></i>
					</span>
				</div>
				<div class="tree" v-if="currentChildComs && currentChildComs.content.length>0">
					<!-- <tree @nodeSelectedClick="nodeSelectedClick"
					  	:data="currentChildComs.content"
					  	:strict="true"
					  	ref="tree">
			  	  	</tree> -->
			  	  	<c-tree
			  	  		:data="currentChildComs.content"
			  	  		:lineHeight="25"
			  	  		:accordion="true"
			  	  		@nodeClick="nodeSelectedClick"
			  	  		@sortHandle="handleSort"
			  	  		ref="tree">
		  	  		</c-tree>
				</div>
				<div class="tree-box tree-box__empty" v-if="currentChildComs && currentChildComs.content.length<1">
					<p>
						还未添加子组件
					</p>
				</div>
				<div class="tree-box tree-box__empty" v-if="!currentChildComs">
					<p>
						未选择容器
					</p>
				</div>
			</div>
		</transition>
	</div>
</template>
<script>
import { Message } from 'element-ui'
import UploadDialog from './../common/upload_base/index'
import Tree from './../common/coms_tree/coms_tree'
import CTree from './../common/ctree/ctree'
let _copy = (obj) => {
	let type = Object.prototype.toString.call(obj)
	if( type === '[object Object]' || type === '[object Array]'){
		let copyObj = JSON.parse(JSON.stringify(obj));
		return copyObj;
	}else{
		return obj;
	}
};
let _changeCopyChild = (content) => {
	let _innerLoop = (arr) => {
		if(arr && arr.length > 0){
			arr.forEach((com, i) => {
				let unique = com.$$key + i;
				com.$$key = unique;
				com.id = unique;
				_innerLoop(com.content);
			});
		}
	};
	_innerLoop(content);
	return content;
};
	export default{
		name: 'componentCtrl',
		components:{
			Tree, CTree
		},
		data () {
			return {
				cntActive: true,
				activePanel: 'page-data',
				treeProps:{
		        	label: 'label',
		        	children: 'content'
		      	},
		      	curContainerKey: '',
		      	comsPanelActive: false,
		      	copy_com: ''
			}
		},
		created () {
			this.isTree = true;
		},
		mounted () {
	    	if(this.treeData.length<1){
		    	this.addPage();
			}
			this.$dragging.$on('dragend', (value) => {
				let dragEle = value.draged;
				let dropEle = value.to;
				let group = value.group;
				let _getIndex = (data,key) => {
					let index;
					data.some((item, i) => {
			    		if(item.$$key === key){
			    			index = i;
			    			return true;
			    		}
			    		return false;
			    	});
			    	return index;
				}
				let container = group === '$$key'? this.treeData : this.currentChildComs.content;
				let dragIndex = _getIndex(container, dragEle.$$key);
				let dropIndex = _getIndex(container, dropEle.$$key);
				this.$store.dispatch('sort', {dragIndex:dragIndex, dropIndex:dropIndex, dragEle: dragEle});
			});
		},
		computed: {
			baseData () {
		      return this.$store.getters.getBaseData;
		    },
		    treeData () {
		      return this.$store.getters.getPageData;
		    },
		    currentChildComs () {
		    	let com;
		    	let pageData = this.$store.getters.getPageData;
		    	pageData.some((item, i) => {
		    		if(item.$$key === this.curContainerKey){
		    			com = item;
		    			return true;
		    		}
		    		return false;
		    	});
		    	return com;
		    },
		    currentComKey () {
		      return this.$store.getters.getCurrentComKey;
		    },
		    defaultChecks () {
		      return new Array(this.currentComKey);
		    },
		    sysComs () {
		      return this.$sys_m_coms;
		    }
		},
		watch:{
			currentComKey (n, o){
				if(n !== o && this.$refs.tree){
					let com = this.$store.getters.getCurrentCom;
					this.$nextTick(() => {
						this.$refs.tree.setSelected(com);
					});
				}
			}
		},
		methods:{
			handleCntrl () {
				this.cntActive = !this.cntActive;
				if(!this.cntActive){
					this.activePanel = '';
				}else{
					this.activePanel = 'page-data'
				}
			},
			handleTabClick (key) {
				if(key === this.activePanel){
					this.activePanel = '';
				}else{
					this.activePanel = key;
				}
			},
			add (com) {
		    	let data = com.data();
		    	let container = this._getContainer();
		    	data.$$comKey = com.comKey;
		    	data.$$level = com.desc.level;
		    	this.$store.dispatch('addCom', {com: data, container: container}).then((obj) => {
		    		if(!container){
		    			this.curContainerKey = obj.curCon.$$key;
		    		}
		    	});
		    },
			addPage (){
		      	let containers = this.$sys_m_coms.LEVEL_2;
		      	let pageContainer;
		      	let t_type = this.$store.getters.getComType;
		      	containers.coms.forEach((c,i) => {
		        	if(c.comKey == 'mContainer'){
		          		pageContainer = c;
		        	}
		      	});
		      	let data = pageContainer.data();
		      	data.$$comKey = pageContainer.comKey;
		      	data.$$level = pageContainer.desc.level;
		      	this.$store.dispatch('addContainer', {page: data}).then((obj) => {
		      		this.curContainerKey = obj.$$key;
		    	});
		    },
		    copyContainer () {
		    	let container = this._getContainer();
		    	if(!container){
		    		Message({
		    			showClose:true,
			          	message: '未选中容器',
			          	type: 'warning'
		    		});
		    		return false;
		    	}
		    	let copyContainer = _copy(container);
		    	let content = copyContainer.content;
		    	_changeCopyChild(content);
		    	this.$store.dispatch('addContainer', {page: copyContainer}).then((obj) => {
		    		this.curContainerKey = obj.$$key;
		    	});
		    },
		    copyCom () {
		    	let comKey = this.currentComKey;
		    	if(!comKey || comKey === this.curContainerKey){
		    		Message({
		    			showClose:true,
			          	message: '未选中组件',
			          	type: 'warning'
		    		});
		    		return false;
		    	}
		    	let com = this.$store.getters.getCurrentCom;
		    	let copyCom = _copy(com);
		    	let content = copyCom.content;
		    	let container = this._getContainer();
		    	_changeCopyChild(content);
		    	this.$store.dispatch('addCom', {com: copyCom, container: container});
		    },
		    copyToClipboard () {
		    	if(this.copy_com){
		    		this.copy_com = null;
		    		return;
		    	}
		    	let comKey = this.currentComKey;
		    	if(!comKey || comKey === this.curContainerKey){
		    		Message({
		    			showClose:true,
			          	message: '未选中组件',
			          	type: 'warning'
		    		});
		    		return false;
		    	}
		    	let com = this.$store.getters.getCurrentCom;
		    	let copyCom = _copy(com);
		    	copyCom.$$key = new Date().getTime();
		    	let content = copyCom.content;
		    	_changeCopyChild(content);

		    	this.copy_com = copyCom;
		    },
		    insertTo (){
		    	if(!!!this.copy_com){
		    		return;
		    	}
		    	let comKey = this.currentComKey;
		    	if(!comKey || comKey === this.curContainerKey || this.copy_com.$$key === comKey){
		    		Message({
		    			showClose:true,
			          	message: '未选中组件容器',
			          	type: 'warning'
		    		});
		    		return false;
		    	}
		    	let container = this._getContainer();
		    	let copyCom = _copy(this.copy_com);
		    	this.$store.dispatch('addCom', {com: copyCom, container: container}).then((obj) => {
		    	});
		    },
		    _getContainer (){
		    	let key = this.curContainerKey;
		    	let container;
		    	this.treeData.some((c, i) => {
		    		if(c.$$key === key){
		    			container = c;
		    			return true;
		    		}
		    		return false;
		    	});
		    	return container;
		    },
		    deleteContainerCom (){
		    	if(!this.curContainerKey){
		    		Message({
			          	showClose:true,
			          	message: '未选中容器',
			          	type: 'error'
			        });
		    		return false;
		    	}
		    	if(this.curContainerKey === this.currentComKey){
			    	this.$store.dispatch('deleteCom').then((obj) => {
			    		Message({
				          	showClose:true,
				          	message: '已删除当前容器',
				          	type: 'warning'
				        });
				        this.curContainerKey = '';
			    	});
		    	}else{
		    		let cons = this._getContainer();
		    		if(cons){
		    			Message({
				          	showClose:true,
				          	message: '未选中容器',
				          	type: 'error'
				        });
			    		return false;
		    		}
		    		this.$store.dispatch('deleteCom', { cons: cons })
		    			.then((obj) => {
				    		Message({
					          	showClose:true,
					          	message: '已删除当前容器',
					          	type: 'warning'
					        });
					        this.curContainerKey = '';
				    	});
		    	}
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
		    	});
		    },
		    changeContainerKey (key){
		    	this.curContainerKey = key;
		    	this.$store.dispatch('changeComKey', key);
		    },
		    toggleComsPanel (){
		    	this.comsPanelActive = !this.comsPanelActive;
		    },
		    openUploadDialog (){
		    	if(!this.curContainerKey){
		    		Message({
		    			showClose:true,
			          	message: '未选中组件',
		    			type:'error'
		    		});
		    		return false;
		    	}
		    	let coms = this.sysComs.LEVEL_1.coms;
		    	let _this = this;
		    	let com;
		    	coms.some((c, i) => {
		    		if(c.comKey === 'mBanner'){
		    			com = c;
		    			return true;
		    		}
		    		return false;
		    	});
		    	let container = this._getContainer();
		    	UploadDialog({
		    		onClose:function(data){
		    			data.forEach((img, i) => {
		    				let data = com.data();
					    	data.$$comKey = com.comKey;
					    	data.$$level = com.desc.level;
					    	data.bannerImg = img;

					    	let imgObj = new Image();
					    	imgObj.onload = () => {
					    		imgObj.onload = null;
					    		let w = imgObj.width;
					    		let h = imgObj.height;
						    	if(data.style.posRect){
							    	data.style.posRect.width && (data.style.posRect.width = w);
							    	data.style.posRect.height && (data.style.posRect.height = h);
					    		}
					    	};
					    	imgObj.src = img;
					    	_this.$store.dispatch('addCom', {com: data, container: container}).then((obj) => {
					    		if(!container){
					    			_this.curContainerKey = obj.curCon.$$key;
					    		}
					    	});
		    			});
		    		}
		    	});

		    },
		    nodeSelectedClick (model){
		     	if(this.currComKey === model.$$key){
		    		return;
		    	}
		    	this.$store.dispatch('changeComKey', model.$$key);
		    },
		    handleSort (result){
		    	if(result.type === 'insert'){
		    		this.$store.dispatch('insertSort', {
		    			dragIndex: result.dragIndex,
		    			dragParent: result.dragParent,
		    			drag: result.drag,
		    			toIndex: result.toIndex,
		    			toParent: result.toParent,
		    			to: result.to
		    		});
		    	}else{
		    		this.$store.dispatch('embedSort', {
		    			dragIndex: result.dragIndex,
		    			dragParent: result.dragParent,
		    			drag: result.drag,
		    			toIndex: result.toIndex,
		    			toParent: result.toParent,
		    		});
		    	}
		    }
		}
	}
</script>
<style lang="scss" scoped>
	.component-panel{
		width: 50px;
		position: fixed;
		top: 0;
		bottom: 0;
		right: 0;

		background-color: lighten(#1f2d3d, 10%);
		z-index: 90;
		box-shadow: -4px 0 5px rgba(0,0,0, .2);
		color: #bfcbd9;

		-webkit-transition: all .25s cubic-bezier(0.46, 0.83, 0.63, 1);
		-moz-transition: all .25s cubic-bezier(0.46, 0.83, 0.63, 1);
		-ms-transition: all .25s cubic-bezier(0.46, 0.83, 0.63, 1);
		transition: all .25s cubic-bezier(0.46, 0.83, 0.63, 1);

		&.active{
			width: 250px;

			& .coms-panel__cnt{
				display: block;
			}
		}
	}
	.coms-panel__cnt{
		display: none;
		position: relative;
		float: left;
		width: 200px;
		height: 100%;
		padding-top: 40px;
		overflow-y: auto;
	}
	.page-tree_btns{
		margin: 10px 5px !important;
		padding: 5px 10px;
		background-color: lighten(#1f2d3d, 5%);
	}
	.coms-panel__cnt-page{
		display: block;
	}
	.coms-panel__cnt-item{
		display: none;
		position: absolute;
		width: 200px;
	    right: 50px;
	    top: 0;
		background-color: lighten(#1f2d3d, 5%);
		box-shadow: -4px -4px 10px rgba(0,0,0, .3);
		z-index: 1;
		text-align: left;

		&:hover{
			color: #bfcbd9;
		}
		&.active{
			display: block;
		}
	}
	.page-box{
		position: relative;
		display: block;
		height: 60px;
		margin: 10px 10px;
		background-color: #fafafa;
		border-radius: 2px;
		color: #48576a;
		text-align: center;
		overflow: hidden;
		border: 1px solid #bbb;
		cursor: pointer;

		-webkit-transition: all .25s;
		-moz-transition: all .25s;
		-ms-transition: all .25s;
		transition: all .25s;

		& p{
			margin: 0;
			line-height: 60px;
			vertical-align: middle;
			white-space: nowrap;
			text-overflow: ellipsis;
			overflow: hidden;
		}

		& .page-num{
			position: absolute;
			left: 0;
			top: 0;
			border-top: 30px solid #bbb;
			border-right: 30px solid transparent;

			& .num{
				position: absolute;
				top: -30px;
				left: 0;
				width: 20px;
				height: 20px;
				color: #fff;
			}
		}
		& .page-contents{
			position: absolute;
			right: 0;
			top: 0;
		}
		&.dragging{
			transform: scale(1.05, 1.05);
		}
		&.active{
			border: 1px solid #20a0ff;

			& .page-num{
				border-top: 30px solid #20a0ff;
			}

			&.dragging{
				transform: scale(1.05, 1.05);
			}
		}
		& .page-box__btns{
			position: absolute;
			width: 20px;
			height: 20px;
			top: 0;
			right: 0;
			text-align: center;
			line-height: 20px;
			vertical-align: center;

			&:hover{
				color: #20a0ff;
			}
		}
	}
	.coms-panel__bar{
		position: absolute;
		right: 0;
		width: 50px;
		height: 100%;
		padding-top: 50px;
		background-color: #1f2d3d;
	}
	.coms-item{
		position: relative;
		padding: 5px 5px;
		text-align: center;
		cursor: pointer;

		-webkit-transition: all .25s;
		-moz-transition: all .25s;
		-ms-transition: all .25s;
		transition: all .25s;

		&.coms-item__cntrl{
			border-bottom: 1px solid lighten(#1f2d3d, 20%);
		}

		& .coms-item__title{
			margin: 0;
			font-size: 12px;
		}
		&:hover{
			color: #20a0ff;
		}
		&.active{
			background-color: lighten(#1f2d3d, 5%);
			box-shadow:-4px -4px 10px rgba(0,0,0, .3);

			&:after{
				content: ' ';
				position: absolute;
				width: 4px;
				height: 100%;
				top: 0;
				left: -2px;
				background-color: lighten(#1f2d3d, 5%);
			}
		}

		&.coms-item__forever{
			&:hover{
				color: #bfcbd9;
			}
			&.active{
				background-color: lighten(#1f2d3d, 10%);
				box-shadow: none;
				&:after{
					display:none;
				}

			}
		}
	}
	.nav-icon{
		-webkit-transform: rotate(0);
		-moz-transform: rotate(0);
		-ms-transform: rotate(0);
		transform: rotate(0);
		-webkit-transition: all .25s cubic-bezier(0.46, 0.83, 0.63, 1);
		-moz-transition: all .25s cubic-bezier(0.46, 0.83, 0.63, 1);
		-ms-transition: all .25s cubic-bezier(0.46, 0.83, 0.63, 1);
		transition: all .25s cubic-bezier(0.46, 0.83, 0.63, 1);

		&.active{
			-webkit-transform: rotate(90deg);
			-moz-transform: rotate(90deg);
			-ms-transform: rotate(90deg);
			transform: rotate(90deg);
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
		    color:#bfcbd9;

	      	&:hover, &:focus, &.active{
	      		color: #20a0ff;
	        	background-color: lighten(#324157, 5%);
	      	}
	    }
  	}
  	.reset-br{
		border-radius: 2px;
	}
	.children-panel{
		position: absolute;
		top: 50px;
		right: 105%;
		width: 200px;
		min-height: 300px;
		border-radius: 5px;
		background-color: lighten(#1f2d3d, 10%);
		overflow: auto;

		& .children-panel__header{
			position: relative;
			height: 30px;
			padding: 4px 10px;
			background-color: #1f2d3d;

			& .children-panel__close{
				position: absolute;
				width: 30px;
				height: 30px;
				right: 0;
				top: 0;
				font-size: 12px;
				text-align: center;
				line-height: 30px;
				vertical-align: middle;
				cursor: pointer;
			}
		}
	}
	.tree{
		background-color: lighten(#1f2d3d, 10%);
		max-height: 400px;
		overflow-y: auto;

		&.tree-box__empty{
			text-align: center;
		}
	}
	@-webkit-keyframes fadeInRight {
	  from {
	    opacity: 0;
	    -webkit-transform: translate3d(20%, 0, 0);
	    transform: translate3d(20%, 0, 0);
	  }
	  to {
	    opacity: 1;
	    -webkit-transform: translate3d(0, 0, 0);
	    transform: translate3d(0, 0, 0);
	  }
	}

	@-moz-keyframes fadeInRight {
	  from {
	    opacity: 0;
	    -moz-transform: translate3d(20%, 0, 0);
	    transform: translate3d(20%, 0, 0);
	  }
	  to {
	    opacity: 1;
	    -moz-transform: translate3d(0, 0, 0);
	    transform: translate3d(0, 0, 0);
	  }
	}

	@keyframes fadeInRight {
	  from {
	    opacity: 0;
	    -webkit-transform: translate3d(20%, 0, 0);
	    -moz-transform: translate3d(20%, 0, 0);
	    transform: translate3d(20%, 0, 0);
	  }
	  to {
	    opacity: 1;
	    -webkit-transform: translate3d(0, 0, 0);
	    -moz-transform: translate3d(0, 0, 0);
	    transform: translate3d(0, 0, 0);
	  }
	}
	.fade-enter-active{
		transition: all .25s;
		transform-origin: right top;
	}
	.fade-leave-active{
		transition: all .25s;
		transform-origin: right top;
	}
	.fade-enter{
		opacity: 0;
		transform: scale(.3, .3);
	}
	.fade-leave-to{
		opacity: 0;
		transform: scale(.3, .3);
	}
	.fade-right-enter-active{
		-webkit-animation: fadeInRight .45s;
		-moz-animation: fadeInRight .45s;
		animation: fadeInRight .45s;
		z-index: -1;
	}
	.fade-right-leave-active{
		-webkit-animation: fadeInRight .45s reverse;
		-moz-animation: fadeInRight .45s reverse;
		animation: fadeInRight .45s reverse;
		z-index: -1;
	}
</style>