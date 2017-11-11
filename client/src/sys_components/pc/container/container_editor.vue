<template>
	<div class="container-panel">
		<el-tabs v-model="acitveTab">
			<el-tab-pane label="内容&样式" name="style" class="editor-pane">
				<div class="el-form-item">
					<label class="el-form-item__label" style="width:60px">ID</label>
					<div class="el-form-item__content" style="margin-left:60px;">
						<el-input size="small" v-model="data.id" class="br2" placeholder="html元素ID"></el-input>
					</div>
				</div>
				<div class="el-form-item">
					<label class="el-form-item__label" style="width:60px">组件名</label>
					<div class="el-form-item__content" style="margin-left:60px;">
						<el-input size="small" class="br2" v-model="data.label" placeholder="名称"></el-input>
					</div>
				</div>
				<bg v-model="data.style.bg"></bg>
				<posrect v-model="data.style.posRect" :comId="data.id" :type="posType" :heightAuto="true"></posrect>
			</el-tab-pane>
		</el-tabs>
	</div>
</template>
<script>
	import CInputNumber from './../../../editor_components/input_num/input_num'
	import ColorPicker from './../../../editor_components/color_picker/color_picker'
	import Bg from './../../../editor_components/bg/bg'
	import Posrect from './../../../editor_components/posrect/posrect'
	export default {
		name: 'containerEditor',
		components:{
			CInputNumber, ColorPicker, Bg, Posrect
		},
		props:{
			data:{
				type: Object
			}
		},
		data () {
			return {
				acitveTab: 'style',
				posType: 'static'
			}
		}
	}
</script>
<style lang="scss">
	.container-panel{
		width: 100%;
		background-color: #D3DCE6;
		box-sizing: border-box;
	}
</style>