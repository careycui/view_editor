<template>
	<div class="bar-cnt">
		<div class="bar-cnt--title ys-grid">
			<div class="ys-grid-row">
				 <h4 class="ys-cell-12 mt-10 margin-no--b"><i class="fa fa-file-o"></i> 基本信息</h4>
			</div>
		</div>
		<hr>
		<div class="bar-cnt--panel ys-grid"  style="height:auto;overflow:hidden">
			<div class="ys-grid-row">
				<div class="ys-cell-12 ys-form-group ys-form-group-sm">
    				<label class="ys-cell-2 no-padding t-align--l">别名</label>
    				<div class="ys-cell-10 no-padding">
    					<el-input size="mini" v-model="com.label"></el-input>
    				</div>
    			</div>
    			<div class="ys-cell-12 ys-form-group ys-form-group-sm">
    				<label class="ys-cell-2 no-padding t-align--l">组件名</label>
    				<div class="ys-cell-10 no-padding">
    					<el-tag type="primary">{{ com.name }}</el-tag>
    				</div>
    			</div>
    			<div v-if="form && form.data && form.data.base">
    				<div class="ys-cell-12 ys-form-group ys-form-group-sm" v-for="base in form.data.base">
    					<label class="ys-cell-2 no-padding t-align--l">{{base.label}}</label>
    					<div class="ys-cell-10 no-padding">
	    					<component :is="base.formEle.type" size="mini" v-model="base.val">
	    						<el-option v-if="base.formEle.type == 'el-select'" v-for="item in base.formEle.data" :key="item.value" :label="item.label" :value="item.value"></el-option>
	    					</component>
	    				</div>
    				</div>
    			</div>
			</div>
		</div>
		<div class="bar-cnt--line"></div>
		<el-tabs v-model="activeName">
			<el-tab-pane label="属性" name="attribute">
			    <el-collapse accordion value="style">
			    	<el-collapse-item title="样式" name="style" v-if="form && form.style">
			    		<div class="bar-cnt--panel ys-grid">
			    			<div class="ys-grid-row" v-for="(item, key) in form.style">
			    				<div class="ys-cell-12 title-line" v-if="TABS[key]">
			    					<div class="title-line-t">{{ TABS[key] }}</div>
			    				</div>
			    				<div class="ys-cell-12 ys-form-group ys-form-group-sm" v-for="data in item" v-if="key != 'custom'">
			    					<label class="ys-cell-2 no-padding t-align--l">{{ data.label }}</label>
			    					<div class="ys-cell-10 no-padding">
			    						<component :is="data.formEle.type" size="mini" v-model="data.val" :disabled="data.formEle.disabled">
				    						<el-option v-if="data.formEle.type == 'el-select'" v-for="op in data.formEle.data" :key="op.value" :label="op.label" :value="op.value"></el-option>
				    					</component>
			    					</div>
			    				</div>
			    				<div class="ys-cell-12 ys-form-group ys-form-group-sm" v-for="data in form.style.custom" v-if="key == 'custom'">
				    				<label class="ys-cell-2 no-padding t-align--l" style="padding-top:6px;">{{ data.label }}</label>
				    				<div class="ys-cell-10 no-padding">
				    					<component :is="data.formEle.type" :data="data.formEle.data" v-model="data.val" @handleCallback="change">
				    					</component>
				    				</div>
				    			</div>
			    			</div>
			    		</div>
			    	</el-collapse-item>
					<el-collapse-item title="交互" name="action" v-if="form && form.action">
						<div class="bar-cnt--panel ys-grid">
			    			<div class="ys-grid-row" v-for="(item, key) in form.action">
			    				<div class="ys-cell-12 title-line" v-if="TABS[key]">
			    					<div class="title-line-t">{{ TABS[key] }}</div>
			    				</div>
			    				<div class="ys-cell-12 ys-form-group ys-form-group-sm" v-for="data in item" v-if="key != 'custom'">
			    					<label class="ys-cell-2 no-padding t-align--l">{{ data.label }}</label>
			    					<div class="ys-cell-10 no-padding">
			    						<component :is="data.formEle.type" size="mini" v-model="data.val" :disabled="data.formEle.disabled">
				    						<el-option v-if="data.formEle.type == 'el-select'" v-for="op in data.formEle.data" :key="op.value" :label="op.label" :value="op.value"></el-option>
				    					</component>
			    					</div>
			    				</div>
			    				<div class="ys-cell-12 ys-form-group ys-form-group-sm" v-for="data in form.style.custom" v-if="key == 'custom'">
				    				<label class="ys-cell-2 no-padding t-align--l" style="padding-top:6px;">{{ data.label }}</label>
				    				<div class="ys-cell-10 no-padding">
				    					<component :is="data.formEle.type" :data="data.formEle.data" v-model="data.val" @handleCallback="change">
				    					</component>
				    				</div>
				    			</div>
			    			</div>
			    		</div>
					</el-collapse-item>
				</el-collapse>
			</el-tab-pane>
			<el-tab-pane label="动作" name="action" v-if="form && form.transition">
				<div class="bar-cnt--panel ys-grid">
					<div class="ys-grid-row">
						<div class="ys-cell-12 ys-form-group ys-form-group-sm">
							<div class="block" v-for="item in form.transition.style">
							    <span class="demonstration">{{item.label}}</span>
							    <el-slider v-model="item.val" :max="10" :step="0.1" :format-tooltip="format" show-input :show-input-controls="false"></el-slider>
							</div>
						</div>
					</div>
					<div class="ys-grid-row" style="overflow: auto;height: 280px;">
						<div class="ys-cell-12 ys-form-group ys-form-group-sm">
							<div class="icon-list">
								<div class="icon-item" :class="{active: ani.selected}" v-for="ani in animations" @click="handleClick(ani)">
									<span class="icon">{{ ani.icon }}</span>
									<p>{{ani.label}}</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</el-tab-pane>
		</el-tabs>
	</div>
</template>
<script>
import { mapState } from 'vuex'
import YsAlign from './align'
import ColorPicker from './color_picker'
import { tabs } from './../../../sys_components/config.js'
import { animations } from './animations.js'


export default {
  name: 'editor-panel',
  components: {
  	'ys-align': YsAlign,
  	'color-picker': ColorPicker
  },
  data () {
  	return {
  		TABS : tabs,
  		activeName: 'attribute'
  	}
  },
  computed: {
  	animations () {
  		let aniName = this.trans.aniName;
  		animations.forEach((item, i) => {
  			if(item.aniName === aniName){
  				item.selected = true;
  			}else{
  				item.selected = false;
  			}
  		});
  		return animations;
  	},
  	form () {
		return this.$store.getters.getCurrentForm;
  	},
  	com () {
  		return this.$store.getters.getCurrentCom;
  	},
  	cus () {
  		let pos = this.form.style.custom;
  		let obj = {};
  		if(pos){
  			pos.forEach((item, i) => {
  				obj[item.name] = item.val;
  			});
  		}
  		return obj;
  	},
  	pos () {
  		let obj = {};
  		if(this.form){
	  		let pos = this.form.style.position;
	  		if(pos){
	  			pos.forEach((item, i) => {
	  				obj[item.name] = item.val;
	  			});
	  		}
  		}
  		return obj;
  	},
  	trans () {
  		let obj = {};
  		if(this.form){
	  		let trans = this.form.transition;
	  		if(trans){
	  			trans.clazz.forEach((item, i) => {
	  				obj[item.name] = item.val;
	  			});
	  		}	
  		}
  		return obj;
  	},
  	test () {
  		return this.$store.getters.getTest;
  	}
  },
  watch : {
  	pos (val) {
  		if(this.form && this.form.style){
	  		if(this.cus.align && this.cus.align === 'C'){
	  			for(let i=0;i<this.form.style.position.length;i++){
	  				let item = this.form.style.position[i];
	  				if(item.name === 'marginLeft'){
	  					item.val = -val.width/2;
	  				}
	  			}
	  		}
  		}
  	},
  	com () {
  		this.activeName = 'attribute';
  	}
  },
  methods: {
  	change (align) {
  		let pos = this.form.style.position;
  		if(pos){
  			let w = 0;
  			for(let i=0;i<pos.length;i++){
  				let item = pos[i];
  				if(item.name === 'width'){
  					w = item.val;
  				}
  			}
			pos.forEach((item, i) => {
				if(item.name === 'marginLeft'){
					if(align === 'C'){
						item.formEle.disabled = true;
						item.val = -w/2;
					}else if(align === 'R'){
						item.formEle.disabled = true;
					}else{
						item.formEle.disabled = false;
					}
				}
			});
  		}
  	},
  	format (value) {
  		return (value + 's');
  	},
  	handleClick (item) {
  		item.selected = true;
  		this.animations.forEach((ani, i) => {
  			if(ani != item){
  				ani.selected = false;
  			}
  		});
  		this.form.transition.clazz[0].val = item.aniName;
  	}
  }
}
</script>
<style lang="scss">
	.bar-cnt{
		font-size: 12px;
	}
	.bar-cnt--panel{
		overflow-y: auto;
	}
	.margin-no--t{
		margin-top: 0;
	}
	.margin-no--b{
		margin-bottom: 0;
	}
	.no-padding{
		padding: 0;
	}
	.reset-w{
		min-width: 100px;
		width: 100%;
	}
	.t-align--l{
		text-align: left !important;
	}
	.ys-form-group-sm{
		margin-bottom: 10px;
	}
	.ys-form-group-sm .ys-field{
		height: 22px;
		line-height: 14px;
	}
	.ys-form-group label[class*=ys-cell] {
	    padding-top: 3px;
	}
	.title-line{
		height: 22px;
		padding: 0 10px;
		margin-bottom: 5px;
		line-height: 22px;
		vertical-align: middle;

		& .title-line-t{
			padding-left: 10px;
			border-top: 1px solid #b9b9b9;
			border-bottom: 1px solid #b9b9b9;
			background-color: #e2e2e2;
		}
	}
	.ys-radio{
		margin-top: 0;
		margin-bottom: 0;
	}
	.el-input-number--mini{
		.el-input-number__decrease, .el-input-number__increase{
			width: 24px !important;
			line-height: 22px;
		}
		.el-input-number__decrease{
			right: 27px;
		}
		.el-input-number__increase{
			right: 2px;
		}
	}
	.el-collapse{
		border: 0;
	}
	.el-collapse-item__content{
		padding:0;
		font-size: 12px;
	}
	.el-tabs__nav{
		width: 100%;

		& .el-tabs__item{
			width: 50%;
			text-align: center;
		}
	}
	.el-slider__input{
		width: 40px;
	}
	.el-slider__runway.show-input{
		margin-right: 60px;
	}
	.icon-list{

		&:after{
			content:' ';
			display: block;
			height: 0;
			clear: both;
			visibility: hidden;
		}

		& .icon-item{
			width: 60px;
			height: 70px;
			float: left;
			text-align: center;
			cursor: pointer;

			& p{
				margin: 0;
				height: 30px;
				line-height: 30px;
				vertical-align: middle;

				-webkit-transition: all .25s;
				-moz-transition: all .25s;
				transition: all .25s;
			}
			& .icon{
				display: inline-block;
				height: 40px;
				width: 40px;
				border-radius: 50%;
				background-color: #D3DCE6;
				line-height: 40px;
				vertical-align: middle;
				font-size: 18px;

				-webkit-transition: all .25s;
				-moz-transition: all .25s;
				transition: all .25s;
			}

			&:hover {
				& .icon{
					background-color: #58B7FF;
					color: #fff;
				}

				& p{
					color: #20a0ff;
				}
			}
			&.active{
				& .icon{
					background-color: #20a0ff;
					color: #fff;
				}
				& p{
					color: #20a0ff;
				}
			}
		}
	}
</style>