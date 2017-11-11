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
					<div class="el-form-item__content" style="margin-left:40px;" v-if="!heightAuto">
						<c-input-number size="small" :max="1920" v-model="data.height"></c-input-number>
					</div>
					<div class="el-form-item__content" style="margin-left:40px;" v-if="heightAuto">
						<el-input size="small" value="auto" class="br2" :disabled="true"></el-input>
					</div>
				</el-col>
			</el-row>
		</div>
		<div class="el-form-item">
			<label class="el-form-item__label" style="width:40px;">位置</label>
			<div class="el-form-item__content" style="margin-left:40px;background-color:#FFFFFF;">
				<div>
					<el-tooltip :open-delay="400" placement="top" :content="hi.label" :key="hi.type" v-for="hi in ha_opt">
						<span class="tag-item" 
							@click="setHPos(hi.type)" 
							:class="{active:hi.type===hAlign}">
							<i class="fa" :class="[hi.clazz]"></i>
						</span>
					</el-tooltip>
				</div>
				<div v-if="type === 'outflow'">
					<el-tooltip :open-delay="400" placement="bottom" :content="vi.label" :key="vi.type" v-for="vi in va_opt">
						<span class="tag-item" 
							@click="setVPos(vi.type)" 
							:class="{active:vi.type===vAlign}">
							<i class="fa" :class="[vi.clazz]" style="transform:rotate(90deg)"></i>
						</span>
					</el-tooltip>
				</div>
			</div>
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
		name: 'posrect',
		components:{
			CInputNumber
		},
		props:{
			type:{
				type: String,
				default: 'static'//static: relative, outflow: absolute
			},
			heightAuto: {
				type: Boolean,
				default: false
			},
			comId: String,
			value: {
				type: Object,
				default () {
					let dataObj = {
						position: 'relative',
						width: 1920,
						height: 400,
						left:'50%',
						top:'50%',
						marginLeft: -960,
						marginTop: -200
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
					this.setHPos(this.hAlign);
				},
				deep: true
			},
			data:{
				handler (newVal, oldVal) {
					this.$emit('input', newVal);
				},
				deep: true
			}
		},
		data () {
			return {
				data: {
					width: 0,
					height: 0,
					left: '50%',
					top: '50%',
					marginLeft: 0,
					marginTop: 0
				},
				ha_opt:[{
					type: 'h-left',
					label: '居左',
					clazz: 'fa-align-left'
				},{
					type: 'h-center',
					label: '水平居中',
					clazz: 'fa-align-center'
				},{
					type: 'h-right',
					label: '居右',
					clazz: 'fa-align-right'
				}],
				va_opt:[{
					type: 'v-top',
					label: '置顶',
					clazz: 'fa-align-left'
				},{
					type: 'v-middle',
					label: '垂直居中',
					clazz: 'fa-align-center'
				},{
					type: 'v-bottom',
					label: '置底',
					clazz: 'fa-align-right'
				}],
				hAlign: 'h-center',
				vAlign: 'v-middle'
			}
		},
		methods:{
			setHPos (type) {
				this.hAlign = type;
				switch(type){
					case 'h-left':
						this.data.left = '0';
						this.data.right = 'none';
						this.data.marginLeft = 'none';
						break;
					case 'h-center':
						this.data.left = '50%';
						this.data.marginLeft = -this.data.width/2;
						this.data.right="none";
						break;
					case 'h-right':
						this.data.left = 'none';
						this.data.right = '0'
						this.data.marginLeft = 'none';
						break;
					default:
						this.data.left = '50%';
						this.data.marginLeft = -this.data.width/2;
						this.data.right = 'none';
				}
			},
			setVPos (type) {
				if(this.vAlign === type){
					return;
				}
				this.vAlign = type;
				switch(type){
					case 'v-top':
						break;
					case 'v-middle':
						break;
					case 'v-bottom':
						break;
					default:

				}
			}
		}
	}
</script>
<style></style>
