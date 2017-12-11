<template>
	<div class="topic-panel">
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
				<div class="tab-line">
					<div class="tab-line--title">基本样式</div>
				</div>
				<div class="el-form-item">
					<label class="el-form-item__label" style="width:50px;">H</label>
					<div class="el-form-item__conetnt" style="margin-left:50px;">
						<el-input size="small" v-model="data.style.height" class="br2"></el-input>
					</div>
				</div>
			</el-tab-pane>
		</el-tabs>
	</div>
</template>
<script>
	import CInputNumber from './../../../editor_components/input_num/input_num'
	export default {
		name: 'topicBannerEditor',
		components:{
			CInputNumber
		},
		props:{
			data: {
				type: Object
			}
		},
		computed:{
			bannerImg () {
				return this.data.bannerImg;
			}
		},
		watch:{
			bannerImg:{
				immediate: true,
				handler (nv, ol) {
					const _this = this;
					// _this.$nextTick(() => {
						let img = new Image();
						img.onload = function(){
							img.onload = null;
							let h = img.height;
							_this.data.style.height = h;
						};
						img.src = nv;
					// });
				}
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
	.topic-panel{
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