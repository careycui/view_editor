<template>
	<transition>
		<div class="project-body--box">
			<div class="project-body--title">
				<h3>自定义模板</h3>
			</div>
			<div class="project-body--body">
				<el-tabs v-model="activeName" @tab-click="handleTabClick">
		    		<el-tab-pane label="全部" name="first" class="ani slideInDownSm delay active">
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
	name: 'assetTmp',
	data () {
		return {
			activeName: 'first'
		}
	},
	beforeRouteEnter (to, from, next) {
		console.log(to, from, next);
		next();
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
<style>
</style>