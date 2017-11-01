<template>
	<transition name="dialog-fade">
		<div class="el-dialog__wrapper" v-show="visible" style="z-index: 2012;overflow:hidden;background-color: rgba(0,0,0,.5);">
	      <div class="el-dialog" :style="pos" id="preview-dialog">
	        <div class="el-dialog__header">
	          <span class="el-dialog__title">Preview</span>
	          <button type="button" aria-label="Close" class="el-dialog__headerbtn" style="margin-left:15px;" @click="handleClose">
	            <i class="el-dialog__close el-icon el-icon-close"></i>
	          </button>
	          <button type="button" v-show="!isFull" aria-label="铺满" class="el-dialog__headerbtn" style="margin-left:15px;" @click="handleFull">
	            <i class="el-dialog__close el-icon el-icon-plus"></i>
	          </button>
	          <button type="button" v-show="isFull" aria-label="还原" class="el-dialog__headerbtn" style="margin-left:15px;" @click="handleRestore">
	            <i class="el-dialog__close el-icon el-icon-minus"></i>
	          </button>
	        </div>
	        <div class="el-dialog__body">
	          <iframe frameborder="0" width="100%" height="100%" id="pre-iframe">
	          </iframe>
	        </div>
	      </div>
	    </div> 
	</transition>
</template>
<script>
import { Loading } from 'element-ui'

const fullPos = {
	width: '100%',
	height: '100%',
	top: '0'
}
const oriPos = {
	width: '90%',
	height: '80%',
	top: '10%'
}
let loadInstance;

export default {
	name: 'preview',
	props: ['visible', 'srcdoc'],
	data () {
		return {
			pos: oriPos,
			isFull: false
		}
	},
	mounted () {
		this.$el.querySelector('#pre-iframe').onload = function(){
			setTimeout(function(){
				if(loadInstance){
					loadInstance.close();
				}
			}, 1000);
		};
	},
	methods : {
		handleClose () {
			this.$emit('updateVisible', false);
		},
		handleFull () {
			this.isFull = true;
			this.pos = fullPos;
		},
		handleRestore () {
			this.isFull = false;
			this.pos = oriPos;
		}
	},
	watch : {
		visible (val) {
			if(val){
				loadInstance = Loading.service({
					target: document.querySelector('#preview-dialog')
				});
				let frameDom = this.$el.querySelector('#pre-iframe');
				frameDom.srcdoc = this.srcdoc;
			}
		}
	}
}
</script>
<style lang="scss" scoped>
.el-dialog{
	-webkit-transition: all .3s;
	-moz-transition: all .3s;
	transition: all .3s;
}
.el-dialog__body{
	height: 95%;
	padding: 30px 10px;
}
</style>