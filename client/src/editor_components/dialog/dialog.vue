<template>
	<transition name="dialog-fade">
		<div class="el-dialog__wrapper" style="z-index:1100" v-show="isShow">
			<div class="dialog-mask"></div>
			<div class="el-dialog ani-dialog">
				<div class="el-dialog__header">
					<span class="el-dialog__title">底图上传</span>
				</div>
				<div class="el-dialog__body">
					<el-upload
						class="upload-demo"
						action=""
						:multiple="true"
						list-type="text"
						:auto-upload="false">
						<el-button slot="trigger" size="small" type="primary">选取文件</el-button>
						<el-button style="margin-left:10px;" size="small" type="success">上传</el-button>
						<div slot="tip" class="el-upload__tip">
							图片大小不超过500K
						</div>
					</el-upload>
				</div>
				<div class="el-dialog__footer">
					<span class="dialog-footer">
						<el-button size="small" @click="close">取消</el-button>
						<el-button type="primary" size="small">确定</el-button>
					</span>
				</div>
			</div>
		</div>
	</transition>
</template>
<script>
	export default{
		name: 'cDialog',
		data () {
			return {
				isShow: false,
				imgList: []
			}
		},
		watch: {
			isShow (newVal) {
				if(!newVal){
					this.$el.addEventListener('animationend', this.destroyElement);
				}
			}
		},
		methods: {
			destroyElement () {
				this.$el.removeEventListener('animationend', this.destroyElement);
				this.$destroy(true);
				this.$el.parentNode.removeChild(this.$el);
			},
			close () {
				this.isShow = false;
				this.onClose && this.onClose(this.imgList);
			},
			open () {
				this.isShow = true;
			}
		},
		mounted (){
			console.log(this);
		}
	}
</script>
<style>
	.dialog-mask{
		position: absolute;
		top: 0;
		right: 0;
		bottom: 0;
		left: 0;
		background-color: rgba(0, 0, 0, .4);
	}
	.ani-dialog{
		position: absolute;
		width: 800px;
		max-height: 80%;
		left: 50%;
		top: 50%;
		-webkit-transform: translate(-50%, -50%);
		-moz-transform: translate(-50%, -50%);
		transform: translate(-50%, -50%);
	}
</style>