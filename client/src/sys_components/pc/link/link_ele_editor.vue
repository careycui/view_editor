<template>
	<div class="link-panel">
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
				<div class="el-form-item">
					<label>文本</label>
					<div class="el-form-item__content">
						<el-input size="small" class="br2" v-model="data.text" placeholder="链接文本"></el-input>
					</div>
				</div>
				<div class="el-form-item">
					<label>链接</label>
					<div class="el-form-item__content">
						<el-input size="small" class="br2" v-model="data.link" placeholder="链接"></el-input>
					</div>
				</div>
				<div class="el-form-item">
					<label>目标</label>
					<div class="el-form-item__content">
						<el-select v-model="data.target" class="br2" placeholder="请选择" size="small" style="width:100%;">
						    <el-option
						      v-for="item in target_opt"
						      :key="item.value"
						      :label="item.label"
						      :value="item.value">
						        <span style="float: left">{{ item.label }}</span>
     							<span style="float: right; color: #8492a6; font-size: 13px">
     								{{ item.value }}
     							</span>
						    </el-option>
					  	</el-select>
					</div>
				</div>
				<bg v-model="data.style.bg"></bg>
				<drag-posrect v-model="data.style.dragPosrect" :comId="data.id"></drag-posrect>
				<ft v-model="data.style.ft"></ft>
			</el-tab-pane>
		</el-tabs>
	</div>
</template>
<script>
	import CInputNumber from './../../../editor_components/input_num/input_num'
	import ColorPicker from './../../../editor_components/color_picker/color_picker'
	import Bg from './../../../editor_components/bg/bg'
	import Ft from './../../../editor_components/ft/ft'
	import DragPosrect from './../../../editor_components/drag_posrect/drag_posrect'
	export default {
		name: 'linkEleEditor',
		components:{
			CInputNumber, ColorPicker, Bg, DragPosrect, Ft
		},
		props:{
			data:{
				type: Object
			}
		},
		data () {
			return {
				acitveTab: 'style',
				posType: 'static',
				target_opt:[{
					label: '当前标签',
					value: '_self'
				},{
					label: '新标签',
					value: '_blank'
				}]
			}
		}
	}
</script>
<style lang="scss">
	.link-panel{
		width: 100%;
		background-color: #D3DCE6;
		box-sizing: border-box;
	}
</style>