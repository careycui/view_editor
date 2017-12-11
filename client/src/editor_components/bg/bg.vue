<template>
	<div class="bg-com">
		<div class="tab-line">
			<div class="tab-line--title">背景</div>
		</div>
		<div class="el-form-item">
			<label class="el-form-item__label" style="width:40px">颜色</label>
			<div class="el-form-item__content" style="margin-left:40px;height:auto;overflow:hidden;">
				<color-picker size="small" v-model="data.backgroundColor" source="hex"></color-picker>
			</div>
		</div>
		<div class="el-form-item">
			<label class="el-form-item__label" style="width:40px;">图片</label>
			<div class="el-form-item__content" style="margin-left:40px;">
				<el-input size="small" class="br2" v-model="data.backgroundImage" placeholder="图片链接"></el-input>
			</div>
		</div>
		<div class="el-form-item">
			<label class="el-form-item__label" style="width:40px;">模式</label>
			<div class="el-form-item__content" style="margin-left:40px;">
				<el-select v-model="data.backgroundRepeat" class="br2" placeholder="请选择" size="small" style="width:100%;">
				    <el-option
				      v-for="item in bgr_opt"
				      :key="item.value"
				      :label="item.label"
				      :value="item.value">
				        <span style="float: left">{{ item.label }}</span>
							<span style="float: right; color: #8492a6; font-size: 13px">{{ item.value }}</span>
				    </el-option>
				  </el-select>
			</div>
		</div>
		<bg-position v-model="data.backgroundPosition"></bg-position>
	</div>
</template>
<script>
import ColorPicker from './../../editor_components/color_picker/color_picker'
import BgPosition from './components/bg_position'
	export default{
		name: 'bg',
		components:{
			ColorPicker, BgPosition
		},
		props:{
			value: {
				type: Object,
				default (){
					return {
						backgroundColor: 'transparent',
						backgroundImage: '',
						backgroundPosition: 'center center',
						backgroundRepeat: 'no-repeat'
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
					backgroundColor: 'transparent',
					backgroundImage: '',
					backgroundPosition: 'center center',
					backgroundRepeat:'no-repeat',
				},
				bgr_opt: [{
					value: 'repeat',
					label: 'X Y 方向重复'
				},{
					value: 'repeat-x',
					label: 'X 方向重复'
				},{
					value: 'repeat-y',
					label: 'Y 方向重复'
				},{
					value: 'no-repeat',
					label: '不重复'
				}]
			}
		}
	}
</script>
<style>
	
</style>