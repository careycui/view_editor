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
					<el-menu :default-active="activeName" class="el-menu-vertical-demo" theme="dark" @select="handleSelect" :router="true">
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
					    <el-menu-item index="/asset" router="/asset"><i class="el-icon-picture"></i>素材库</el-menu-item>
				    </el-menu>
				</div>
			</el-col>
			<el-col :xs="24" :sm="19" :md="20" :lg="20" class="project-body">
				<router-view></router-view>
			</el-col>
		</el-row>
	</div>
</template>
<script>
	export default {
		name: 'home',
		data () {
			return {
				activeName: ''
			}
		},
		beforeMount () {
			this.activeName = this.$route.path;
		},
		methods : {
			handleSelect (index, indexPath) {
				console.log(index, indexPath);
			},
			handleTabClick (tab) {
				let clazz = tab.$el.className;
				tab.$el.className = clazz + ' active';
			},
			openPage () {
				console.log(this.$router);
				this.activeName = '';
				this.$router.push('/create');
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
			}
		}
	}
	.project-bar--btns{
		width: 100%;
		padding-bottom: 20px;
		text-align: center;
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
		background-color: #fff;
		border-radius: 5px;
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
			padding-top: 20px;
			width: 200px;
			height: 180px;
			border-top-left-radius: 5px;
			border-top-right-radius: 5px;
			text-align: center;

			background-color: rgba(0,0,0, .4);
			visibility: hidden;
			opacity: 0;

			-webkit-transition: all .3s;
			-moz-transition: all .3s;
			transition: all .3s;
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
		}
	}
</style>