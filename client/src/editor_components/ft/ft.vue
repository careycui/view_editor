<template>
	<div class="ft">
		<div class="tab-line">
			<div class="tab-line--title">字体样式</div>
		</div>
		<div class="el-form-item">
			<label class="el-form-item__label" style="width:40px;">
				字体
			</label>
			<div class="el-form-item__content" style="margin-left:40px;">
				<el-select v-model="data.fontFamily" class="br2" placeholder="请选择" size="small" style="width:100%;">
				    <el-option
				      v-for="item in ftf_opt"
				      :key="item.value"
				      :label="item.label"
				      :value="item.value">
				        <span style="float: left" :style="{fontFamily: item.value}">{{ item.label }}</span>
							<span style="float: right; color: #8492a6; font-size: 13px">{{ item.value }}</span>
				    </el-option>
				  </el-select>
			</div>
		</div>
		<div class="el-form-item">
			<el-row>
				<el-col :span="12">
					<label class="el-form-item__label" style="width:40px;">
						字号
					</label>
					<div class="el-form-item__content" style="margin-left:40px;">
						<c-input-number v-model="data.fontSize" size="small" :max="180" :min="12"></c-input-number>
					</div>
				</el-col>
				<el-col :span="12">
					<label class="el-form-item__label" style="width:40px;">
						行高
					</label>
					<div class="el-form-item__content" style="margin-left:40px;">
						<c-input-number v-model="data.lineHeight" size="small" :max="180" :min="12"></c-input-number>
					</div>
				</el-col>
			</el-row>
		</div>
		<div class="el-form-item">
			<div class="el-form-item__content" style="background-color:#fff;">
				<el-tooltip :open-delay="400" placement="top" content="加粗">
					<span class="tag-item" :class="{active: data.fontWeight===700}" @click="setBold">
						<i class="fa fa-bold"></i>
					</span>
				</el-tooltip>
				<el-tooltip :open-delay="400" placement="top" content="斜体">
					<span class="tag-item" :class="{active: data.fontStyle==='italic'}" @click="setItalic">
						<i class="fa fa-italic"></i>
					</span>
				</el-tooltip>
				<el-tooltip :open-delay="400" placement="top" content="下划线">
					<span class="tag-item" :class="{active: data.textDecoration==='underline'}" @click="setUnderLine">
						<i class="fa fa-underline"></i>
					</span>
				</el-tooltip>
				<el-tooltip :open-delay="400" placement="top" content="左对齐">
					<span class="tag-item" :class="{active: data.textAlign === 'left'}" @click="setTextAlign('left')">
						<i class="fa fa-align-left"></i>
					</span>
				</el-tooltip>
				<el-tooltip :open-delay="400" placement="top" content="居中">
					<span class="tag-item" :class="{active: data.textAlign === 'center'}" @click="setTextAlign('center')">
						<i class="fa fa-align-center"></i>
					</span>
				</el-tooltip>
				<el-tooltip :open-delay="400" placement="top" content="右对齐">
					<span class="tag-item" :class="{active: data.textAlign === 'right'}" @click="setTextAlign('right')">
						<i class="fa fa-align-right"></i>
					</span>
				</el-tooltip>
			</div>
		</div>
		<div class="el-form-item">
			<label class="el-form-item__label" style="width:40px;">颜色</label>
			<div class="el-form-item__content" style="margin-left:40px;height:auto;overflow:hidden;">
				<color-picker size="small" v-model="data.color" source="hex"></color-picker>
			</div>
		</div>
	</div>
</template>
<script>
	import CInputNumber from './../../editor_components/input_num/input_num'
	import ColorPicker from './../../editor_components/color_picker/color_picker'
	export default{
		name: 'ft',
		components:{
			CInputNumber, ColorPicker
		},
		props:{
			value:{
				type: Object,
				default () {
					return {
						fontFamily: '',
						fontSize: 14,
						fontWeight: 400,
						lineHeight: 12,
						color: '#333',
						textAlign: 'center',
						fontStyle: 'normal',
						textDecoration: 'none'
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
				data: {
					fontFamily: 'Microsoft Yahei',
					fontSize: 14,
					fontWeight: 400,
					lineHeight: 12,
					color: '#333',
					textAlign: 'center',
					fontStyle: 'normal',
					textDecoration: 'none'
				},
  				ftf_opt: [{
					value: 'Microsoft Yahei',
					label: '微软雅黑'
				},{
					value: 'SimHei',
					label: '黑体'
				},{
					value: 'NSimSun',
					label: '新宋体'
				},{
					value: 'SimSun',
					label: '宋体'
				},{
					value: 'serif',
					label: 'Serif'
				},{
					value: 'sans-serif',
					label: 'Sans-Serif'
				}]
			}
		},
		methods: {
			setTextAlign (type) {
				if(!type){
					type = 'center';
				}
				this.data.textAlign = type;
			},
			setBold () {
				if(this.data.fontWeight === 400){
					this.data.fontWeight = 700;
				}else{
					this.data.fontWeight = 400;
				}
			},
			setItalic () {
				if(this.data.fontStyle === 'normal'){
					this.data.fontStyle = 'italic';
				}else{
					this.data.fontStyle = 'normal';
				}
			},
			setUnderLine () {
				if(this.data.textDecoration === 'none'){
					this.data.textDecoration = 'underline';
				}else{
					this.data.textDecoration = 'none';
				}
			}
		}
	}
</script>