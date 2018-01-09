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
	        <div class="el-dialog__body" id="preview-body">
	          <iframe frameborder="0" width="100%" height="100%" id="pre-iframe">
	          </iframe>
	        </div>
	        <div class="mobile-cntrl" id="mobile-cntrl" style="display: none;">
	        	<el-button type="warning" class="br2 mb10" v-for="m in mobile" @click="setMobile(m)" :key="m.value">{{ m.label }}</el-button>
	        </div>
	      </div>
	    </div>
	</transition>
</template>
<script>
import { Loading } from 'element-ui'
import MC from './../../../../sys_components/utils/mobile_util.js'

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
			isFull: false,
			mobile:[{
				label: 'iphone 4',
				value: 320
			},{
				label: 'iphone 5',
				value: 320
			},{
				label: 'iphone 6',
				value: 375
			},{
				label: 'iphone 6 plus',
				value: 414
			},{
				label: 'Galaxy Note 3',
				value: 360
			},{
				label: 'Origin',
				value: 750
			}]
		}
	},
	mounted () {
		let pt = this.$store.getters.getBaseData.platform_type;
		let $el = this.$el;
		$el.querySelector('#pre-iframe').onload = function(e){
			if(pt === 1){
				this.contentDocument.documentElement.style.fontSize = MC.getBaseFt(750) + 'px';
				$el.querySelector('#mobile-cntrl').style.display = 'block';
			}
			if(loadInstance){
				loadInstance.close();
			}
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
		},
		setMobile (m) {
			this.$el.querySelector('#pre-iframe').contentDocument.documentElement.style.fontSize = MC.getBaseFt(m.value) + 'px';
		}
	},
	watch : {
		visible (val) {

			if(val){
				let css = '<link rel="stylesheet" type="text/css" href="'+ G.STATIC.host +'static/component.css" />' ;
			  	let css1 = '<link rel="stylesheet" type="text/css" href="'+ G.STATIC.host +'static/animate-min.css" />' ;
			  	let lib = '\<script type="text/javascript" src="'+ G.STATIC.host +'static/jquery.min.js"\>\<\/script\>';
			  	let lib1 = '\<script type="text/javascript" src="'+ G.STATIC.host +'static/img-slide-min.js"\>\<\/script\>';
			  	let lib2 = '\<script type="text/javascript" src="'+ G.STATIC.host +'static/aniview-min.js"\>\<\/script\>';
			  	let page = '\<script type="text/javascript" src="'+ G.STATIC.host +'static/page.js"\>\<\/script\>';

		      	let mcss = '<link rel="stylesheet" type="text/css" href="'+ G.STATIC.host +'static/ezviz-m.css" />';
     			let mcss1 = '<link rel="stylesheet" type="text/css" href="'+ G.STATIC.host +'static/animate-min.css" />';

		      	let pt = this.$store.getters.getBaseData.platform_type;
		      	let src;
		      	if(pt === 1){
		      		src = mcss + mcss1  + this.srcdoc;
		      	}else{
		      		src = css + css1 + this.srcdoc + lib + lib1 + lib2 + page;
		      	}
				loadInstance = Loading.service({
					target: document.querySelector('#preview-body')
				});
				let frameDom = this.$el.querySelector('#pre-iframe');
				frameDom.srcdoc = src;
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
.mobile-cntrl{
	position: absolute;
	right: 50px;
	top: 20%;
}
.mb10{
	display: block;
	margin-bottom: 10px;
	margin-left: 0;
}
</style>