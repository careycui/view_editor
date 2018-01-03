<template>
	<transition name="fade-bottom">
		<div class="project-body--box">
			<div class="project-body--title">
				<h3>图库</h3>
			</div>
			<div class="project-body--body">
				<el-row class="file-box">
					<el-col :span="8">
						<div class="file-box__left">
							<div class="file-box__search">
								<div style="display: inline-block; width: 60%;vertical-align: top;">
									<el-input
									  	placeholder="请输入类型"
									  	icon="search"
									  	size="small"
									  	:on-icon-click="handleIconClick">
									</el-input>
								</div>
							</div>
							<div class="file-box__sort">
								<div class="file-box__sort-item">
									<img src="../assets/folder-add.png" class="folder">
									<p>
										新建
									</p>
								</div>
								<div class="file-box__sort-item">
									<img src="../assets/folder.png" class="folder">
									<p>
										类型一
									</p>
								</div>
							</div>
						</div>
					</el-col>
					<el-col :span="16">
						<div class="file-box__right">
							<div class="file-box__search">
								<div style="display: inline-block;vertical-align:top;">
									<el-button type="primary" size="small" @click="openUploadDialog">
										<i class="el-icon-upload"></i>
										添加图片
									</el-button>
								</div>
								<div style="display: inline-block; width: 160px;vertical-align: top;">
									<el-input
									  	placeholder="请输入关键字"
									  	icon="search"
									  	size="small"
									  	:on-icon-click="handleIconClick">
									</el-input>
								</div>
								<div style="display: inline-block;width:120px;vertical-align:top;">
									<el-select size="small" v-model="sortType">
										<el-option
									      	v-for="item in sortOpt"
									      	:key="item.value"
									      	:label="item.label"
									      	:value="item.value">
									    </el-option>
									</el-select>
								</div> 
							</div>
							<div class="file-box__content">
								<div class="file-box__content-item" v-for="i in count">
									<img src="../assets/bg_test.jpg" class="preview-img">
									<div class="file-box__content-item__cover">
										<div class="img-cntrl">
											<div class="img-cntrl__inner" style="">
												<el-button size="mini" class="plain-btn">
					    							<i class="fa fa-eye bottom-bar--icon"></i> 原图
					    						</el-button>
					    						<div class="pd5"></div>
												<el-button size="mini" class="plain-btn">
					    							<i class="fa fa-trash bottom-bar--icon"></i> 删除
					    						</el-button>
					    						<div class="pd5"></div>
					    						<el-button size="mini" class="plain-btn">
					    							<i class="fa fa-pencil bottom-bar--icon"></i> 编辑
					    						</el-button>
											</div>
										</div>
										<div class="img-desc">
											<div class="img-desc__title">
					    						图片
					    					</div>
					    					<div class="img-desc__keys">
					    						关键字
					    					</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</el-col>
				</el-row>
			</div>
			<el-dialog title="图片添加" :visible.sync="uploadVisible">
				<el-upload
					class="upload-demo"
					action=""
					:auto-upload="false">
					<el-button slot="trigger" size="small" type="primary">选取文件</el-button>
					<el-button style="margin-left:10px;" size="small" type="success">上传</el-button>
					<div slot="tip" class="el-upload__tip">
						图片大小不超过500K
					</div>
				</el-upload>
			</el-dialog>
		</div>
	</transition>
</template>
<script>
	export default{
		name: 'assetImg',
		data () {
			return {
				count: 10,
				uploadVisible: false,
				sortType: 'time_desc',
				sortOpt:[{
					label: '时间降序 ↓',
					value: 'time_desc'
				},{
					label: '时间升序 ↑',
					value: 'time_asc'
				}]
			}
		},
		methods:{
			handleIconClick (val) {
				console.log(val);
			},
			openUploadDialog (){
				this.uploadVisible = !this.uploadVisible;
			}
		}
	}
</script>
<style lang="scss">
	.file-box{
		margin-top: 10px;

		& .file-box__left{
			border-top-right-radius: 10px;
			background-color: #fff;
		}

		& .file-box__search{
			padding: 10px 10px;
		}
	}
	.file-box__left {
		& .file-box__sort{

			& .file-box__sort-item{
				display: inline-block;
				margin: 10px;
				max-width: 60px;
				vertical-align: top;
				text-align: center;

				& p{
					margin: 0;
					font-size: 12px;
					line-height: 1.5;
					overflow: hidden;
				    text-overflow: ellipsis;
				    white-space: nowrap;
				}

				&:hover{
					& .folder{
						background-color: #eef1f6;
					}
				}
			}
		}
	}
	.file-box__content{
		padding: 0 10px;

		& .file-box__content-item{
			position: relative;
			display: inline-block;
			vertical-align: top;
			margin-right: 15px;
			margin-bottom: 15px;
			padding: 2px;
			width: 178px;
			height: 234px;
			overflow: hidden;

			border: 2px solid #fafafa;
			border-radius: 10px;
			box-shadow: 0 2px 4px rgba(0,0,0,0.05);
			-webkit-transform: translate3d(0, 0, 0);
			-moz-transform: translate3d(0, 0, 0);
			-ms-transform: translate3d(0, 0, 0);
			transform: translate3d(0, 0, 0);

			-webkit-transition: all .45s;
			-moz-transition: all .45s;
			transition: all .45s;

			& .preview-img{
				display: inline-block;
				border: 0;
				width: 100%;
			}

			& .file-box__content-item__cover{
				position: absolute;
				left: 0;
				top: 0;
				right: 0;
				bottom: 0;
				background-color: rgba(0, 0, 0, .6);

				visibility: hidden;
				opacity: 0;

				-webkit-transition: all .45s;
				-moz-transition: all .45s;
				transition: all .45s;

				& .img-cntrl{
					position: absolute;
					width: 100%;
					height: 70%;
					text-align: center;

					& .img-cntrl__inner{
						position:absolute;
						top:50%;
						-webkit-transform: translate(0, -50%);
						-moz-transform: translate(0, -50%);
						transform: translate(0, -50%);
						width: 100%;
					}
				}

				& .img-desc{
					position: absolute;
					height: 50px;
					background-color: #fff;
					bottom: 0;
					width: 100%;
					box-shadow: 0 -2px 1px rgba(255,255,255, .3);

					& .img-desc__title{
						padding: 0 5px;
						line-height: 30px;
						font-size: 14px;
						color: #324057;
						text-align: center;
						overflow: hidden;
						text-overflow: ellipsis;
						white-space: nowrap;
					}
					& .img-desc__keys{
						padding: 0 5px;
						line-height: 20px;
						font-size: 12px;
						color: #99A9BF;
						text-align: center;
						overflow: hidden;
						text-overflow: ellipsis;
						white-space: nowrap;
					}
				}
			}
			&:hover{
				border-radius: 0;
				box-shadow: 0 8px 15px rgba(0,0,0,0.15);
				-webkit-transform: translate3d(0, -5px, 0);
				-moz-transform: translate3d(0, -5px, 0);
				-ms-transform: translate3d(0, -5px, 0);
				transform: translate3d(0, -5px, 0);

				& .file-box__content-item__cover{
					visibility: visible;
					opacity: 1;
				}
			}
		}
	}
	.folder{
		display: inline-block;
		width: 48px;
		height: 48px;
		border: 0;
		border-radius: 5px;
		background-color: transparent;

		-webkit-transition: all .35s;
		-moz-transition: all .35s;
		transition: all .35s;
	}
	.pd5{
		padding: 5px 0;
	}
</style>