<template>
	<transition>
		<div class="project-body--box">
			<div class="project-body--title">
				<h3>创建页面</h3>
			</div>
			<div class="project-body--body">
				<el-row>
					<el-col :span="24">
						<h3 style="padding: 10px 40px;">详情页</h3>
					</el-col>
					<el-col :span="24">
						<div class="list" style="padding-left:40px;">
							<div class="project-card">
								<h3 class="add-sign"><i class="fa fa-desktop"></i></h3>
								<p class="add-desc">新建PC详情页</p>
								<div class="add-btns">
									<el-button type="primary" size="small">普通页</el-button>
									<el-button type="primary" size="small">海报页</el-button>
								</div>
							</div>
							<div class="project-card">
								<h3 class="add-sign"><i class="fa fa-mobile"></i></h3>
								<p class="add-desc">新建mobile详情页</p>
								<div class="add-btns">
									<el-button type="primary" size="small">普通页</el-button>
									<el-button type="primary" size="small">海报页</el-button>
								</div>
							</div>
						</div>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="24">
						<h3 style="padding: 10px 40px;">专题页</h3>
					</el-col>
					<el-col :span="24">
						<div class="list" style="padding-left:40px;">
							<div class="project-card">
								<h3 class="add-sign"><i class="fa fa-desktop"></i></h3>
								<p class="add-desc">新建PC专题页</p>
								<div class="add-btns">
									<el-button type="primary" size="small">普通页</el-button>
									<el-button type="primary" size="small">海报页</el-button>
								</div>
							</div>
							<div class="project-card">
								<h3 class="add-sign"><i class="fa fa-mobile"></i></h3>
								<p class="add-desc">新建Mobile专题页</p>
								<div class="add-btns">
									<el-button type="primary" size="small">普通页</el-button>
									<el-button type="primary" size="small">海报页</el-button>
								</div>
							</div>
						</div>
					</el-col>
				</el-row>
			</div>
		</div>
	</transition>
</template>
<script>
export default{
	name: 'info',
	data () {
		return {
			activeName: 'first'
		}
	},
	beforeRouteEnter (to, from, next) {
		console.log(to, from, next);
		next();
	},
	computed : {
		type () {
			return this.$route.params.type.toUpperCase();
		}
	},
	methods : {
		hangdleSelect (index, indexPath) {
			console.log(index, indexPath);
		},
		handleTabClick (tab) {
			let clazz = tab.$el.className;
			tab.$el.className = clazz + ' active';
		}
	}
}
</script>
<style scoped lang="scss">
.project-card{
	cursor: pointer;
}
.add-sign{
	position: relative;
	margin-top: 40px;
	font-size: 50px;
	text-align: center;
	color:#20A0FF;
	height: 100px;
	line-height: 100px;
	vertical-align: middle;

	&:after{
		content: ' ';
		display: block;
		position: absolute;
		left: 50%;
		margin-left: -45px;
		top: 50%;
		margin-top: -45px;
		width: 90px;
		height: 90px;
		border-radius: 100%;
		border: 2px solid #20A0FF;

	}
}
.add-desc{
	text-align: center;
	color: #8492A6; 
}
.add-btns{
	display: block;
	position: absolute;
	left: 0;
	right: 0;
	top: 0;
	bottom: 0;
	background-color: rgba(0,0,0, .6);
	border-radius: 5px;
	text-align: center;
	padding-top: 100px;
	visibility: hidden;
	opacity: 0;
	-webkit-transition: all .25s;
	-moz-transition: all .25s;
	transition: all .25s;
}
.project-card:hover .add-btns{
	visibility: visible;
	opacity: 1;
}
</style>