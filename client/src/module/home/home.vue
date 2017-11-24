<template>
	<div id="home">
		<el-row class="top-bar">
			<el-col :span="24" class="top-bar--title">
				<h3>Home - <small>页面编辑器 V 0.0.1</small> </h3>
			</el-col>
		</el-row>
		<el-row class="container">
			<el-col :xs="24" :sm="5" :md="4" :lg="4" class="project-bar">
				<div class="project-bar--box">
					<div class="project-bar--btns">
						<el-button type="primary" size="large" icon="plus" @click="openPage">
							创建页面
						</el-button>
					</div>
					<hr style="border-top:1px solid #475669;">
					<el-menu :default-active="activeName" class="el-menu-vertical-demo" theme="dark" :router="true" @select="hangdleSelect">
						<el-submenu index="1">
							<template slot="title"><i class="el-icon-menu"></i>详情页</template>
							<el-menu-item index="/info/pc" router="/info">
								<i class="el-icon-document"></i>PC
							</el-menu-item>
							<el-menu-item index="/info/mobile" router="/info">
								<i class="el-icon-document"></i>Mobile
							</el-menu-item>
						</el-submenu>
						<el-submenu index="2">
							<template slot="title"><i class="el-icon-menu"></i>专题活动页</template>
							<el-menu-item index="/topic/pc" router="/topic">
								<i class="el-icon-document"></i>PC
							</el-menu-item>
							<el-menu-item index="/topic/mobile" router="/topic">
								<i class="el-icon-document"></i>Mobile
							</el-menu-item>
						</el-submenu>
						<el-submenu index="3">
							<template slot="title">
								<i class="el-icon-menu"></i>
								素材库
							</template>
							<el-menu-item index="/assetimg" router="/assetimg">
								<i class="el-icon-picture"></i>
								图片
							</el-menu-item>
								<el-menu-item index="/assettmp" router="/assettmp">
								<i class="el-icon-document"></i>
								模板
							</el-menu-item>
						</el-submenu>
				    </el-menu>
				</div>
			</el-col>
			<el-col :xs="24" :sm="19" :md="20" :lg="20" class="project-body">
				<router-view @openBase="openBase" @openPreview="openPreview"></router-view>
			</el-col>
		</el-row>
		<el-dialog title="页面信息" size="small" :visible.sync="baseDialogVisible" :close-on-click-modal="false" custom-class="dialog-size" v-loading.body="loading">
			<el-row v-if="editPage">
				<el-col :md="10" :xs="24" :sm="24" style="text-align:center;">
					<div class="project-card" style="margin:0;">
    					<div class="project-card--img">
    						<img :src="editPage.img_cover">
    					</div>
    					<div class="project-card--title">
    						{{ editPage.title || '未命名页面' }}
    					</div>
    					<div class="project-card--desc">
    						{{ editPage.desc || '未添加描述' }}
    					</div>
    					<div class="project-card--sign">
    						<img src="//mfs.ys7.com/mall/1749a21b9221474c593e251dc32c739d.png" v-if="editPage.page_type === 0">
    						<img src="//mfs.ys7.com/mall/91b7d8245f8a0006f45e35fbb21734cb.png" v-if="editPage.page_type === 1">
    					</div>
    				</div>
				</el-col>
				<el-col :md="14" :xs="24" :sm="24">
					<el-form label-position="top" label-width="80px">
						<el-form-item label="封面图" :form="editPage">
							<el-input size="small" v-model="editPage.img_cover">
								<template slot="prepend">URL</template>
							</el-input>
						</el-form-item>
						<el-form-item label="页面名称">
							<el-input size="small" v-model="editPage.title"></el-input>
						</el-form-item>
						<el-form-item label="页面描述">
							<el-input type="textarea" :rows="3" size="small" v-model="editPage.desc"></el-input>
						</el-form-item>
						<el-form-item label="页面类型">
							<el-input :disabled="true" :value="editPage.page_type === 0?'BASE':'H5'"></el-input>
						</el-form-item>
					</el-form>
				</el-col>
			</el-row>
			<div slot="footer" class="dialog-footer">
			    <el-button @click="baseDialogVisible = false">取 消</el-button>
			    <el-button type="primary" @click="submitBase">确 定</el-button>
			  </div>
		</el-dialog>
		<preview :visible="isPreview" :srcdoc="html" @updateVisible="updateVisible" :pt="viewPt"></preview>
	</div>
</template>
<script>
	import Preview from './components/preview_dialog'
	import { Message } from 'element-ui'

	export default {
		name: 'home',
		components:{
			Preview
		},
		data () {
			return {
				activeName: '',
				baseDialogVisible: false,
				editPage: '',
				loading: false,
				isPreview: false,
				html: '',
				viewPt: 0
			}
		},
		beforeMount () {
			this.activeName = this.$route.path;
		},
		methods : {
			hangdleSelect (index, indexPath) {
				console.log(index, this.$route.path);
				this.activeName = index;
			},
			openPage () {
				this.activeName = '';
				this.$router.push('/create');
			},
			submitBase () {
				var _this = this;
				this.loading = true;
				this.$http({
					url: G.API.host + _this.editPage.t_type +'/update',
						method: 'POST',
						data:_this.editPage,
						responseType: 'json'
					}).then(function(res){
						_this.baseDialogVisible = false;
						_this.loading = false;
					}, function(err,xhr){
						Message({
							message: '保存失败,请稍后再试',
							showClose: true,
							type: 'error'
						});
						_this.loading = false;
					});
			},
			openBase (page) {
				if(page){
					this.baseDialogVisible = true;
					this.editPage = page;
				}else{
					Message({
						message: '获取页面数据失败',
						showClose: true,
						type: 'error'
					});
				}
			},
			openPreview (page) {
				let html = JSON.parse(page.html_data);

				let css = '<link rel="stylesheet" type="text/css" href="'+ G.STATIC.host +'static/component.css" />' ;
			  	let css1 = '<link rel="stylesheet" type="text/css" href="'+ G.STATIC.host +'static/animate-min.css" />' ;
			  	let lib = '\<script type="text/javascript" src="'+ G.STATIC.host +'static/jquery.min.js"\>\<\/script\>';
			  	let lib1 = '\<script type="text/javascript" src="'+ G.STATIC.host +'static/img-slide-min.js"\>\<\/script\>';
			  	let lib2 = '\<script type="text/javascript" src="'+ G.STATIC.host +'static/aniview-min.js"\>\<\/script\>';
			  	let pagejs = '\<script type="text/javascript" src="'+ G.STATIC.host +'static/page.js"\>\<\/script\>';

		      	let mcss = '<link rel="stylesheet" type="text/css" href="'+ G.STATIC.host +'static/ezviz-m.css" />';
     			let mcss1 = '<link rel="stylesheet" type="text/css" href="'+ G.STATIC.host +'static/animate-min.css" />';

		      	let pt = page.platform_type;
		      	let src;
		      	if(pt === 1){
		      		src = mcss + mcss1  + html;
		      	}else{
		      		src = css + css1 + html + lib + lib1 + lib2 + pagejs;
		      	}

				if(!html){
					Message({
						message: '还未添加页面内容',
						showClose: true,
						type: 'error'
					});
					return;
				}
				this.viewPt = pt;
				this.html = src;
				this.isPreview = true;
			},
		    updateVisible (val) {
		      this.isPreview = val;
		    }
		}
	}
</script>
<style lang="scss">
	.ani.active{
		-webkit-animation-play-state: running;
		-moz-animation-play-state: running;
		animation-play-state: running;
	}
	.ani.delay{
		animation-delay: .4s;
	}
	#home{
		width: 100%;
		height: 100%;
	}
	.container{
		width: 100%;
		height: 100%;
		// background-color: #D3DCE6;

		& .project-bar{
			height: 100%;
			background-color: #324157;

			& .project-bar--box{
				margin-top: 70px;
			}
		}
		& .project-body{
			height: 100%;

			& .project-body--box{
			    height: calc(100vh - 40px);
				margin-top: 40px;
				background-color: #D3DCE6;
				overflow: auto;
			}
		}
	}
	.project-bar--btns{
		width: 100%;
		padding-bottom: 20px;
		text-align: center;
	}
	.project-card--sign{
		position: absolute;
		left: 0;
		top: 0;
	}
	.project-body--box{

		& .project-body--title{
			background-color: #fff;

			& h3{
				margin-bottom: 0;
				padding: 0 40px;
				height: 60px;
				line-height: 60px;
				vertical-align: middle;
				color: #475669;
				font-weight: 400;
			}
		}

		& .project-body--body{

			& .el-tabs__header{
				padding: 0 40px;
				background-color: #fff;
			}
			& .el-tabs__content{
				padding: 0 40px;
			}
		}
	}
	.top-bar{
		position: fixed;
		top: 0;
		width: 100%;
		height: 40px;
		padding-left: 10px;
		background-color: #20A0FF;
		background-image: linear-gradient(45deg,#20A0FF,#a8de69);
		z-index: 100;

		box-shadow: 0 0 10px rgba(0,0,0,.4);
	}
	.top-bar--title{
	    height: 40px;
	    vertical-align: middle;
	    line-height: 40px;
	    color: #f1f1f1;

	    & h3{
	    	font-weight: normal;

		    & small{
		    	color: #F1F1F1;
		    }
	    }
	}
	.list{
		margin: 20px 0 40px 0;
	}
	.project-card{
		position: relative;
		display:inline-block;
		vertical-align: top;
		width: 200px;
		height: 240px;
		margin-right: 30px;
		margin-bottom: 20px;
		background-color: #fff;
		border-radius: 5px;
		overflow: hidden;
		box-shadow: 0 2px 4px rgba(0,0,0,0.05);
		-webkit-transform: translate3d(0, 0, 0);
		-moz-transform: translate3d(0, 0, 0);
		-ms-transform: translate3d(0, 0, 0);
		transform: translate3d(0, 0, 0);

		-webkit-transition: all .45s;
		-moz-transition: all .45s;
		transition: all .45s;

		& .project-card--img{
			width: 100%;
			height: 180px;
			border-top-left-radius: 5px;
			border-top-right-radius: 5px;
			overflow: hidden;
			text-align: center;

			& img{
				display: inline-block;
				height: 100%;
				max-width: 100%;
			}
		}
		& .project-card--title{
			padding: 5px 10px;
			text-align: center;
		    text-overflow: ellipsis;
		    overflow: hidden;
		    white-space: nowrap;
		    color: #324057;
		}
		& .project-card--desc{
			padding: 0px 10px;
			font-size: 12px;
			text-align: center;
		    text-overflow: ellipsis;
		    overflow: hidden;
		    white-space: nowrap;
		    color: #99A9BF;
		}
		& .project-card--btns{
			position: absolute;
			left: 0;
			top: 0;
			padding-top: 50px;
			width: 200px;
			height: 180px;
			border-top-left-radius: 5px;
			border-top-right-radius: 5px;
			text-align: center;
			z-index: 10;
			background-color: rgba(0,0,0, .6);
			visibility: hidden;
			opacity: 0;

			-webkit-transition: all .3s;
			-moz-transition: all .3s;
			transition: all .3s;

			& .update-time{
				display: block;
				color: #fff;
				text-align:center;
				line-height: 1.5;
				font-size: 12px;
			}

		}
		.bottom-bar{
			position: absolute;
			bottom: 0;
			width: 100%;
			height: 30px;
			padding: 4px 10px;
			background-color: #fff;
			word-spacing: -8px;
			text-align: right;
			-webkit-transform: translate3d(0, 40px, 0);
			-moz-transform: translate3d(0, 40px, 0);
			-ms-transform: translate3d(0, 40px, 0);
			transform: translate3d(0, 40px, 0);
			-webkit-transition: all .25s;
			-moz-transition: all .25s;
			-ms-transition: all .25s;
			transition: all .25s;
		}

		&:hover{
			box-shadow: 0 8px 15px rgba(0,0,0,0.15);
			-webkit-transform: translate3d(0, -5px, 0);
			-moz-transform: translate3d(0, -5px, 0);
			-ms-transform: translate3d(0, -5px, 0);
			transform: translate3d(0, -5px, 0);

			& .project-card--btns{
				visibility:	visible;
				opacity: 1;
			}

			& .bottom-bar{
				-webkit-transform: translate3d(0, 0, 0);
				-moz-transform: translate3d(0, 0, 0);
				-ms-transform: translate3d(0, 0, 0);
				transform: translate3d(0, 0, 0);
			}
		}
	}
	.dialog-size{
		max-width: 800px;
		background-color: #D3DCE6;
	}
	.bottom-bar--btn{
		width: 22px;
		overflow:hidden;
		word-spacing: normal;
		transition: all .25s;

		&:hover{
			width: 52px;
		}
	}
	.bottom-bar--icon{
		margin-right: 5px;
	}
	.plain-btn{
		background-color: transparent;
		color: #fff;
	}
</style>