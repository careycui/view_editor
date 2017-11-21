<template>
	<div class="text-panel">
		<el-tabs v-model="acitveTab">
			<el-tab-pane label="内容&样式" name="style" class="editor-pane">
				<div class="el-form-item">
					<label class="el-form-item__label" style="width:60px">ID</label>
					<div class="el-form-item__content" style="margin-left:60px;">
						<el-input size="small" class="br2" v-model="data.id" placeholder="html元素ID"></el-input>
					</div>
				</div>
				<div class="el-form-item">
					<label class="el-form-item__label" style="width:60px">组件名</label>
					<div class="el-form-item__content" style="margin-left:60px;">
						<el-input size="small" class="br2" v-model="data.label" placeholder="名称"></el-input>
					</div>
				</div>
				<div class="el-form-item">
					<label>文本</label>
					<div class="el-form-item__content">
						<el-input type="textarea" size="small" class="br2" v-model="data.text" placeholder="基本文本"></el-input>
					</div>
				</div>
				<drag-posrect v-model="data.style.dragPosrect" :comId="data.id" :heightAuto="true"></drag-posrect>
				<ft v-model="data.style.ft"></ft>
			</el-tab-pane>
		</el-tabs>
	</div>
</template>
<script>
	import CInputNumber from './../../../editor_components/input_num/input_num'
	import ColorPicker from './../../../editor_components/color_picker/color_picker'
	import Ft from './../../../editor_components/ft/ft'
	import DragPosrect from './../../../editor_components/drag_posrect/drag_posrect'
	export default {
		name: 'bannerEditor',
		components:{
			CInputNumber, ColorPicker, Ft, DragPosrect
		},
		props:{
			data: {
				type: Object
			}
		},
		data () {
			return {
				acitveTab: 'style'
			}
		}
	}
</script>
<style lang="scss">
	.text-panel{
		width: 100%;
		background-color: #D3DCE6;
		box-sizing: border-box;
	}
	.tag-item{
		display: inline-block;
		height: 100%;
		padding: 0 8px;
	}
</style>