<template>
	<div class="banner-panel">
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
					<label>Banner图片</label>
					<div class="el-form-item__content">
						<el-input size="small" class="br2" v-model="data.bannerImg" placeholder="图片链接"></el-input>
					</div>
				</div>
				<div class="el-form-item">
					<label class="el-form-item__label" style="width:50px;">透明度</label>
					<div class="el-form-item__content" style="margin-left:50px;">
						<c-input-number size="small" v-model="data.style.opacity" :step="0.1" :min="0" :max="1"></c-input-number>
					</div>
				</div>
				<bg v-model="data.style.bg"></bg>
			</el-tab-pane>
		</el-tabs>
	</div>
</template>
<script>
	import CInputNumber from './../../../editor_components/input_num/input_num'
	import ColorPicker from './../../../editor_components/color_picker/color_picker'
	import Bg from './../../../editor_components/bg/bg'
	export default {
		name: 'mBannerEditor',
		components:{
			CInputNumber, ColorPicker, Bg
		},
		props:{
			data: {
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
<style lang="scss" scoped>
	.banner-panel{
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