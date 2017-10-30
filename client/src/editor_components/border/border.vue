<template>
	<div class="border">
		<div class="tab-line">
			<div class="tab-line--title">边框</div>
		</div>
		<div class="el-form-item">
			<label>
				边框样式
			</label>
			<div class="el-form-item__content">
				<el-row>
					<el-col :span="24">
						<el-select v-model="data.borderStyle" class="br2" placeholder="请选择" size="small" style="width:100%;">
						    <el-option
						      v-for="item in br_opt"
						      :key="item.value"
						      :label="item.label"
						      :value="item.value">
						        <span style="float: left">{{ item.label }}</span>
     							<span style="float: right; color: #8492a6; font-size: 13px">
     								<span style="display:inline-block;width: 20px;border-top-width:4px;border-top-color:#849216;" :style="{borderTopStyle: item.value}"></span>
     							</span>
						    </el-option>
						  </el-select>
					</el-col>
					<el-col :span="12">
						<label class="el-form-item__label" style="width:50px;">
							尺寸
						</label>
						<div class="el-form-item__content" style="margin-left:50px;">
							<c-input-number size="small" v-model="data.borderWidth"></c-input-number>
						</div>
					</el-col>
					<el-col :span="12">
						<label class="el-form-item__label" style="width:50px;text-align:center;">
							弧度
						</label>
						<div class="el-form-item__content" style="margin-left:50px;">
							<c-input-number size="small"  v-model="data.borderRadius"></c-input-number>
						</div>
					</el-col>
				</el-row>
			</div>
		</div>
		<div class="el-form-item">
			<label class="el-form-item__label" style="width:60px;">边框颜色</label>
			<div class="el-form-item__content" style="margin-left:60px;height:auto;overflow:hidden;">
				<color-picker size="small" v-model="data.borderColor" source="hex"></color-picker>
			</div>
		</div>
	</div>
</template>
<script>
	import CInputNumber from './../../editor_components/input_num/input_num'
	import ColorPicker from './../../editor_components/color_picker/color_picker'

	export default{
		name: 'border',
		components:{
			CInputNumber, ColorPicker
		},
		props:{
			value:{
				type: Object,
				default () {
					return {
						borderStyle: 'none',
						borderColor: 'transparent',
						borderRadius: 0,
						borderWidth: 0
					}
				}
			}
		},
		watch :{
			value:{
				immediate: true,
				handler (newVal) {
					this.data = newVal;
				},
				deep: true
			}
		},
		data () {
			return {
				data:{
					borderStyle: 'none',
					borderColor: 'transparent',
					borderRadius: 0,
					borderWidth: 0
				},
				br_opt:[{
					value: 'none',
					label: 'none'
				},{
					value: 'solid',
					label: '实线'
				},{
					value: 'dotted',
					label: '点状'
				},{
					value: 'dashed',
					label: '虚线'
				},{
					value: 'double',
					label: '双线'
				},{
					value: 'groove',
					label: '3D凹槽'
				},{
					value: 'ridge',
					label: '3D垄状'
				},{
					value: 'inset',
					label: '3D inset'
				},{
					value: 'outset',
					label: '3D outset'
				}]
			}
		}
	}
</script>
<style>
	
</style>