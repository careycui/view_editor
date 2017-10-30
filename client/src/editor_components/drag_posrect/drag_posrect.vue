<template>
	<div class="posrect-com">
		<div class="tab-line">
			<div class="tab-line--title">位置&尺寸</div>
		</div>
		<div class="el-form-item">
			<label class="el-form-item__label" style="width:40px;">尺寸</label>
			<el-row style="margin-left:40px;">
				<el-col :span="12">
					<label class="el-form-item__label" style="width:40px;text-align:center;">W</label>
					<div class="el-form-item__content" style="margin-left:40px;">
						<c-input-number size="small" :max="1920" v-model="data.width"></c-input-number>
					</div>
				</el-col>
				<el-col :span="12">
					<label class="el-form-item__label" style="width:40px;text-align:center;">H</label>
					<div class="el-form-item__content" style="margin-left:40px;">
						<c-input-number size="small" :max="1920" v-model="data.height"></c-input-number>
					</div>
				</el-col>
			</el-row>
		</div>
		<div class="el-form-item">
			<label class="el-form-item__label" style="width:40px;">位置</label>
			<el-row style="margin-left:40px;">
				<el-col :span="12">
					<label class="el-form-item__label" style="width:40px;text-align:center;">L</label>
					<div class="el-form-item__content" style="margin-left:40px;">
						<c-input-number size="small" :max="1920" v-model="data.left"></c-input-number>
					</div>
				</el-col>
				<el-col :span="12">
					<label class="el-form-item__label" style="width:40px;text-align:center;">T</label>
					<div class="el-form-item__content" style="margin-left:40px;">
						<c-input-number size="small" :max="1920" v-model="data.top"></c-input-number>
					</div>
				</el-col>
			</el-row>
		</div>
	</div>
</template>
<script>
import CInputNumber from './../../editor_components/input_num/input_num'
	const _getParentW = (comId) => {
		let $dom = document.getElementById(comId);
		let $parent =  $dom.offsetParent;
		let cw = $parent.clientWidth;
		return cw;
	};
	export default{
		name: 'dragPosrect',
		components:{
			CInputNumber
		},
		props:{
			comId: String,
			value: {
				type: Object,
				default () {
					let dataObj = {
						position: 'absolute',
						width: 1920,
						height: 400,
						left: 0,
						top: 0
					};
					return dataObj;
				}
			}
		},
		watch:{
			value:{
				immediate:true,
				handler (newVal){
					this.data = newVal;
				},
				deep: true
			},
			data:{
				handler (newVal) {
					this.$emit('input', newVal);
				},
				deep: true
			}
		},
		data () {
			return {
				data: {
					position: 'absolute',
					width: 0,
					height: 0,
					left: 0,
					top: 0
				}
			}
		}
	}
</script>
<style></style>
