<template>
	<div class="el-form-item">
		<label class="el-form-item__label" style="width:40px;">位置</label>
		<el-row style="margin-left:40px;">
			<el-col :span="12">
				<label class="el-form-item__label" style="width:20px;text-align:center;">X</label>
				<div class="el-form-item__content" style="margin-left:20px;">
					<el-input size="small" class="br2" v-model="bgPosition.x" placeholder="水平位置"></el-input>
				</div>
			</el-col>
			<el-col :span="12">
				<label class="el-form-item__label" style="width:20px;text-align:center;">Y</label>
				<div class="el-form-item__content" style="margin-left:20px;">
					<el-input size="small" class="br2" v-model="bgPosition.y" placeholder="垂直位置"></el-input>
				</div>
			</el-col>
		</el-row>
	</div>
</template>
<script>
	export default{
		name: 'bgPosition',
		props:{
			value: {
				type: String,
				default: 'center center'
			}
		},
		watch:{
			bgPosition: {
				handler(newVal){
					let bgStr = (newVal.x||'center') + ' ' + (newVal.y||'center');
					this.$emit('input', bgStr);
				},
				deep: true
			}
		},
		data () {
			return {
				bgPosition:{
					x: '',
					y: ''
				}
			}
		},
		methods:{
			setPos (newVal) {
				let val = newVal.split(' ');
				if(val[0]){
					this.bgPosition.x = val[0];
				}
				if(val[1]){
					this.bgPosition.y = val[1];
				}else{
					this.bgPosition.y = 'center';
				}
			}
		},
		mounted () {
			this.setPos(this.value);
		}
	}
</script>
<style>
	
</style>