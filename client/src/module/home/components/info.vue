<template>
	<transition>
		<div class="project-body--box">
			<div class="project-body--title">
				<h3>详情页-<small>{{ type }}</small></h3>
			</div>
			<div class="project-body--body">
				<el-tabs v-model="activeName" @tab-click="handleTabClick">
		    		<el-tab-pane label="全部" name="first" class="ani slideInDownSm delay active">
		    			<div class="list">
		    				<div class="project-card" v-for="page in pageList">
		    					<div class="project-card--img">
		    						<img src="https://mfs.ys7.com/mall/5b877cbead2934d123cc714187eeb63e.jpg">
		    					</div>
		    					<div class="project-card--title">
		    						{{ page.title || '未命名页面' }}
		    					</div>
		    					<div class="project-card--desc">
		    						{{ page.desc || '未添加描述' }}
		    					</div>
		    					<div class="project-card--btns">
		    						<el-dropdown split-button type="primary" size="mini" @click="goEditor(page.id)" @command="handleCommand(page)">
										<i class="el-icon-edit" style="margin-right:5px;"></i>编辑
			    						<el-dropdown-menu slot="dropdown">
										    <el-dropdown-item type="set">
										    	<i class="el-icon-setting" style="margin-right:5px;"></i>设置页面
										    </el-dropdown-item>
										    <el-dropdown-item divided type="previewp">
										    	<i class="el-icon-view" style="margin-right:5px;"></i>预览PC
										    </el-dropdown-item>
										    <el-dropdown-item type="previewm">
										    	<i class="el-icon-view" style="margin-right:5px;"></i>预览Mobile
											</el-dropdown-item>
											<el-dropdown-item divided type="import">
										    	<i class="el-icon-upload2" style="margin-right:5px;"></i>引入
											</el-dropdown-item>
											<el-dropdown-item type="copy">
										    	<i class="el-icon-plus" style="margin-right:5px;"></i>复制
											</el-dropdown-item>
										    <el-dropdown-item divided type="del">
										    	<i class="el-icon-delete" style="margin-right:5px;"></i>删除
											</el-dropdown-item>
									  	</el-dropdown-menu>
		    						</el-dropdown>
		    					</div>
		    				</div>
		    			</div>
		    		</el-tab-pane>
			    	<el-tab-pane label="普通" name="second" class="ani slideInDownSm delay">
			    		
			    	</el-tab-pane>
			    	<el-tab-pane label="全屏滚动" name="third" class="ani slideInDownSm delay">
			    		<div class="list">
		    				<div class="project-card">
		    					<div class="project-card--img">
		    						<img src="https://mfs.ys7.com/mall/5b877cbead2934d123cc714187eeb63e.jpg">
		    					</div>
		    					<div class="project-card--title">
		    						测试一页面名字
		    					</div>
		    					<div class="project-card--desc">
		    						xxxxf是的发生的范德萨发
		    					</div>
		    					<div class="project-card--btns">
		    						<el-dropdown split-button type="primary" size="mini">
										<i class="el-icon-edit" style="margin-right:5px;"></i>编辑
			    						<el-dropdown-menu slot="dropdown">
										    <el-dropdown-item>
										    	<i class="el-icon-view" style="margin-right:5px;"></i>预览PC
										    </el-dropdown-item>
										    <el-dropdown-item>
										    	<i class="el-icon-view" style="margin-right:5px;"></i>预览Mobile
											</el-dropdown-item>
											<el-dropdown-item divided>
										    	<i class="el-icon-upload2" style="margin-right:5px;"></i>引入
											</el-dropdown-item>
											<el-dropdown-item>
										    	<i class="el-icon-plus" style="margin-right:5px;"></i>复制
											</el-dropdown-item>
										    <el-dropdown-item divided>
										    	<i class="el-icon-delete" style="margin-right:5px;"></i>删除
											</el-dropdown-item>
									  	</el-dropdown-menu>
		    						</el-dropdown>
		    					</div>
		    				</div>
		    				<div class="project-card">
		    					<div class="project-card--img">
		    						<img src="https://mfs.ys7.com/mall/5b877cbead2934d123cc714187eeb63e.jpg">
		    					</div>
		    					<div class="project-card--title">
		    						测试一页面名字
		    					</div>
		    					<div class="project-card--desc">
		    						xxxxf是的发生的范德萨发
		    					</div>
		    					<div class="project-card--btns">
		    						<el-dropdown split-button type="primary" size="mini">
										<i class="el-icon-edit" style="margin-right:5px;"></i>编辑
			    						<el-dropdown-menu slot="dropdown">
										    <el-dropdown-item>
										    	<i class="el-icon-view" style="margin-right:5px;"></i>预览PC
										    </el-dropdown-item>
										    <el-dropdown-item>
										    	<i class="el-icon-view" style="margin-right:5px;"></i>预览Mobile
											</el-dropdown-item>
											<el-dropdown-item divided>
										    	<i class="el-icon-upload2" style="margin-right:5px;"></i>引入
											</el-dropdown-item>
											<el-dropdown-item>
										    	<i class="el-icon-plus" style="margin-right:5px;"></i>复制
											</el-dropdown-item>
										    <el-dropdown-item divided>
										    	<i class="el-icon-delete" style="margin-right:5px;"></i>删除
											</el-dropdown-item>
									  	</el-dropdown-menu>
		    						</el-dropdown>
		    					</div>
		    				</div>
		    			</div>
			    	</el-tab-pane>
			  	</el-tabs>
			</div>
		</div>
	</transition>
</template>
<script>
export default{
	name: 'info',
	data () {
		return {
			activeName: 'first',
			pageList: ''
		}
	},
	beforeRouteEnter (to, from, next) {
		next();
	},
	mounted (){
		this.setPageList();
	},
	computed : {
		type () {
			if(this.$route.params.type){
				return this.$route.params.type.toUpperCase();
			}else{
				return 'PC';
			}
		}
	},
	methods : {
		setPageList () {
			var _this = this;
			this.$http({
				url: 'http://localhost:3030/pro/index/'+ this.type,
				method: 'GET',
				responseType: 'json'
			}).then(function(res){
				_this.pageList = res.data;
			}, function(err){

			});
		},
		goEditor (id) {
			window.location.href="/module/editor.html?key="+id;
		},
		handleCommand (page) {
			var type = event.target.type;
			console.log(page,type);
		},
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
<style>
</style>