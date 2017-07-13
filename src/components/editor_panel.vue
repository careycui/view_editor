<template>
	<div class="bar-cnt">
		<div v-if="form && form.style">
			<div class="bar-cnt--title ys-grid">
		      <div class="ys-grid-row">
		        <h4 class="ys-cell-12 mt-10 margin-no--b"><i class="fa fa-file-o"></i> 样式</h4>
		      </div>
		    </div>
		    <hr>
		    <div class="bar-cnt--panel ys-grid">
		    	<div class="ys-grid-row">
		    		<div v-if="form.style.position">
			    		<div class="ys-cell-12 title-line">
			    			<div class="title-line-t">位移</div>
			    		</div>
			    		<div class="ys-cell-12 ys-form-group ys-form-group-sm">
			    			<label class="ys-cell-2 no-padding t-align--l">位置</label>
			    			<div class="ys-cell-10 no-padding">
			    				<select class="ys-field ys-field-sm no-padding">
			    					<option>居左</option>
			    					<option>居中</option>
			    					<option>居右</option>
			    				</select>
			    			</div>
			    		</div>
		    			<div class="ys-cell-12 ys-form-group ys-form-group-sm" v-for="dataP in form.style.position">
		    				<label class="ys-cell-2 no-padding t-align--l">{{dataP.label}}</label>
		    				<div class="ys-cell-10 no-padding">
		    					<input type="text" class="ys-field ys-field-sm" v-model="dataP.val">
		    				</div>
		    			</div>
		    		</div>
		    		<div v-if="form.style.background">
			    		<div class="ys-cell-12 title-line">
			    			<div class="title-line-t">背景</div>
			    		</div>
			    		<div class="ys-form-group ys-form-group-sm ys-cell-12" v-for="dataB in form.style.background">
			    			<label class="ys-cell-2 no-padding t-align--l">{{dataB.label}}</label>
			    			<div class="ys-cell-10 no-padding">
			    				<input type="text" class="ys-field ys-field-sm" v-model="dataB.val">
			    			</div>
			    		</div>
		    		</div>
		    		<div v-if="form.style.font">
			    		<div class="ys-cell-12 title-line">
			    			<div class="title-line-t">字体</div>
			    		</div>
			    		<div class="ys-form-group ys-form-group-sm ys-cell-12" v-for="dataF in form.style.font">
			    			<label class="ys-cell-2 no-padding t-align--l">{{dataF.label}}</label>
			    			<div class="ys-cell-10 no-padding">
			    				<input type="text" class="ys-field ys-field-sm" v-model="dataF.val">
			    			</div>
			    		</div>
		    		</div>
		    		<div v-if="form.style.border">
			    		<div class="ys-cell-12 title-line">
			    			<div class="title-line-t">边框</div>
			    		</div>
			    		<div class="ys-form-group ys-form-group-sm ys-cell-12" v-for="dataBd in form.style.border">
			    			<label class="ys-cell-2 no-padding t-align--l">{{dataBd.label}}</label>
			    			<div class="ys-cell-10 no-padding">
			    				<input type="text" class="ys-field ys-field-sm" v-model="dataBd.val">
			    			</div>
			    		</div>
		    		</div>
		    		
		    	</div>
		    </div>
		</div>
	    <div class="bar-cnt--line"></div>
	    <div v-if="form && form.action">
		    <div class="bar-cnt--title ys-grid">
		      <div class="ys-grid-row">
		        <h4 class="ys-cell-12 mt-10 margin-no--b"><i class="fa fa-file-o"></i> 交互</h4>
		      </div>
		    </div>
		    <hr>
		    <div class="bar-cnt--panel ys-grid">
		    	<div class="ys-grid-row">
		    		<div v-if="form.action.jump">
			    		<div class="ys-cell-12 title-line">
			    			<div class="title-line-t">跳转</div>
			    		</div>
			    		<div class="ys-form-group ys-form-group-sm ys-cell-12" v-for="action1 in form.action.jump">
			    			<label class="ys-cell-2 no-padding t-align--l">{{action1.label}}</label>
			    			<div class="ys-cell-10 no-padding">
			    				<input type="text" class="ys-field ys-field-sm" v-model="action1.val">
			    			</div>
			    		</div>
		    		</div>
		    		<div v-if="form.action.hover">
			    		<div class="ys-cell-12 title-line">
			    			<div class="title-line-t">悬停</div>
			    		</div>
			    		<div class="ys-form-group ys-form-group-sm ys-cell-12" v-for="action2 in form.action.hover">
			    			<label class="ys-cell-2 no-padding t-align--l">{{action2.label}}</label>
			    			<div class="ys-cell-10 no-padding">
			    				<input type="text" class="ys-field ys-field-sm" v-model="action2.val">
			    			</div>
			    		</div>
		    		</div>
		    	</div>
		    </div>
	    </div>

	</div>
</template>
<script>
import { mapState } from 'vuex'

export default {
  name: 'editor-panel',
  data () {
  	return {
  		title: 'test1'
  	}
  },
  computed: {
  	form : {
  		get () {
			return this.$store.getters.getCurrentForm;
  		},
  		set (val) {
  			this.$store.dispatch('changeForm', {form:this.form,key:this.$store.state.currentDom});
  		}
  	}
  },
  methods: {
  	show () {
  		console.log(this.form);
  	},
  	changeForm (e) {
  		this.$store.dispatch('changeForm', {form:Object.assign({},this.form),key:this.$store.state.currentDom});
  	}
  }
}
</script>
<style scoped lang="scss">
	.bar-cnt{
		font-size: 12px;
	}
	.bar-cnt--panel{
		height: 400px;
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
</style>