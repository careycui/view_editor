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
				<div class="el-form-item">
					<label>链接</label>
					<div class="el-form-item__content">
						<el-input size="small" class="br2" v-model="data.link" placeholder="基本文本"></el-input>
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
				<div class="tab-line">
					<div class="tab-line--title">位置</div>
				</div>
				<div class="el-form-item">
					<label class="el-form-item__label" style="width:40px;">尺寸</label>
					<el-row style="margin-left:40px;">
						<el-col :span="12">
							<label class="el-form-item__label" style="width:40px;text-align:center;">W</label>
							<div class="el-form-item__content" style="margin-left:40px;">
								<c-input-number size="small" :min="0" :max="100" v-model="data.style.width"></c-input-number>
							</div>
						</el-col>
						<el-col :span="12">
							<label class="el-form-item__label" style="width:40px;text-align:center;">H</label>
							<div class="el-form-item__content" style="margin-left:40px;">
								<c-input-number size="small" :min="0" :max="100" v-model="data.style.height"></c-input-number>
							</div>
						</el-col>
					</el-row>
				</div>
				<div class="el-form-item">
					<label class="el-form-item__label" style="width:40px;">间距</label>
					<el-row style="margin-left:40px;">
						<el-col :span="12">
							<label class="el-form-item__label" style="width:40px;text-align:center;">L</label>
							<div class="el-form-item__content" style="margin-left:40px;">
								<c-input-number size="small" :min="0" :max="100" v-model="data.style.left"></c-input-number>
							</div>
						</el-col>
						<el-col :span="12">
							<label class="el-form-item__label" style="width:40px;text-align:center;">T</label>
							<div class="el-form-item__content" style="margin-left:40px;">
								<c-input-number size="small" :min="0" :max="100" v-model="data.style.top"></c-input-number>
							</div>
						</el-col>
					</el-row>
				</div>
				<ft v-model="data.style.ft"></ft>
			</el-tab-pane>
		</el-tabs>
	</div>
</template>
<script>
	import CInputNumber from './../../../editor_components/input_num/input_num'
	import Ft from './../../../editor_components/ft/ft'
	export default {
		name: 'bannerEditor',
		components:{
			CInputNumber, Ft
		},
		props:{
			data: {
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