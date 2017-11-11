<template>
	<transition name="dialog-fade">
		<div class="el-dialog__wrapper" style="z-index:1100" v-show="isShow">
			<div class="dialog-mask"></div>
			<div class="el-dialog ani-dialog">
				<div class="el-dialog__header">
					<span class="el-dialog__title">底图上传</span>
				</div>
				<div class="el-dialog__body el-dialog__body-custom" style="height:400px;">
					<el-tabs v-model="activePanel">
							<el-tab-pane label="上传底图" name="upload">
								<transition name="fade">
									<div v-show="activePanel === 'upload'">
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
								</transition>
							</el-tab-pane>
							<el-tab-pane label="上传链接" name="link">
								<transition name="fade">
									<div v-show="activePanel === 'link'">
										<el-input type="textarea" v-model="text" :rows="12"></el-input>
									</div>
								</transition>
							</el-tab-pane>
					</el-tabs>
				</div>
				<div class="el-dialog__footer">
					<span class="dialog-footer">
						<el-button size="small" @click="closeDialog(false)">取消</el-button>
						<el-button type="primary" size="small" @click="closeDialog(true)">确定</el-button>
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
				imgList: [],
				activePanel: 'upload',
				text:'<div class="pwhole"><img src="https://mfs.ys7.com/mall/a204e6e7829967a26d7898d9aea3bb2b.jpg"></div>\n<div class="pwhole"><img src="https://mfs.ys7.com/mall/5a56bf7310bd89739364b0749faf2e62.jpg"></div>'
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
			_getSrc (str){
				let imgReg = /<img.*?(?:>|\/>)/gi;
				let imgArr = str.match(imgReg);
				let srcReg = /src=[\'\"]?([^\'\"]*)[\'\"]?/i;
				let srcs = [];
				imgArr.forEach((img, i) => {
					let regr = img.match(srcReg);
					if(regr[1]){
						srcs.push(regr[1]);
					}
				});
				return srcs;
			},
			destroyElement () {
				this.$el.removeEventListener('animationend', this.destroyElement);
				this.$destroy(true);
				this.$el.parentNode.removeChild(this.$el);
			},
			closeDialog(status){
				this.isShow = false;
				if(status){
					let srcs;
					if(this.activePanel === 'upload'){
						srcs = this.imgList;
					}else{
						srcs = this._getSrc(this.text);
					}
					this.onClose && this.onClose(srcs);
				}
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
		left: 50%;
		top: 50%;
		-webkit-transform: translate(-50%, -50%);
		-moz-transform: translate(-50%, -50%);
		transform: translate(-50%, -50%);
	}
	.el-dialog__body-custom{
		height: 400px;
		padding: 10px 20px;
	}
	.fade-enter-active{
		transition: all .25s;
		transform-origin: left top;
	}
	.fade-leave-active{
		transition: all .25s;
		transform-origin: left top;
	}
	.fade-enter{
		opacity: 0;
		transform: scale(.3, .3);
	}
	.fade-leave-to{
		opacity: 0;
		transform: scale(.3, .3);
	}
</style>