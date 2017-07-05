<template>
	<div class="bar-cnt">
		<div class="bar-cnt--title ys-grid">
	      <div class="ys-grid-row">
	        <h4 class="ys-cell-12 mt-10 margin-no--b"><i class="fa fa-file-o"></i> 样式</h4>
	      </div>
	    </div>
	    <hr>
	    <div class="bar-cnt--panel ys-grid">
	    	<div class="ys-grid-row">
	    		<div class="ys-cell-12">
	    			基本样式
	    		</div>
	    		<div class="ys-form-group ys-form-group-sm ys-cell-12">
	    			<label class="ys-cell-2 no-padding t-align--l">位置</label>
	    			<div class="ys-cell-10 no-padding">
	    				<select class="ys-field ys-field-sm no-padding">
	    					<option>居左</option>
	    					<option>居中</option>
	    					<option>居右</option>
	    				</select>
	    			</div>
	    		</div>
	    		<div class="ys-cell-6">
	    			<div class="ys-form-group ys-form-group-sm reset-w">
	    				<label class="ys-cell-2 no-padding t-align--l">X</label>
	    				<div class="ys-cell-10 no-padding">
	    					<input type="text" class="ys-field ys-field-sm">
	    				</div>
	    			</div>
	    		</div>
	    		<div class="ys-cell-6">
	    			<div class="ys-form-group ys-form-group-sm reset-w">
	    				<label class="ys-cell-2 no-padding t-align--l">W</label>
	    				<div class="ys-cell-10 no-padding">
	    					<input type="text" class="ys-field ys-field-sm">
	    				</div>
	    			</div>
	    		</div>
	    		<div class="ys-cell-6">
	    			<div class="ys-form-group ys-form-group-sm reset-w">
	    				<label class="ys-cell-2 no-padding t-align--l">Y</label>
	    				<div class="ys-cell-10 no-padding">
	    					<input type="text" class="ys-field ys-field-sm">
	    				</div>
	    			</div>
	    		</div>
	    		<div class="ys-cell-6">
	    			<div class="ys-form-group ys-form-group-sm reset-w">
	    				<label class="ys-cell-2 no-padding t-align--l">H</label>
	    				<div class="ys-cell-10 no-padding">
	    					<input type="text" class="ys-field ys-field-sm">
	    				</div>
	    			</div>
	    		</div>
	    		<div class="ys-form-group ys-form-group-sm ys-cell-12">
	    			<label class="ys-cell-2 no-padding t-align--l">背景</label>
	    			<div class="ys-cell-10 no-padding">
	    				<input type="text" class="ys-field ys-field-sm">
	    			</div>
	    		</div>
	    	</div>
	    </div>
	    <div class="bar-cnt--line"></div>
	    <div class="bar-cnt--title ys-grid">
	      <div class="ys-grid-row">
	        <h4 class="ys-cell-12 mt-10 margin-no--b"><i class="fa fa-file-o"></i> 交互</h4>
	      </div>
	    </div>
	</div>
</template>
<script>
export default {
  name: 'editor-panel',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  }
}
</script>
<style scoped lang="scss">
	.bar-cnt{
		font-size: 12px;
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
</style>