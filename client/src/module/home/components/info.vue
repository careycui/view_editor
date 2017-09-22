<template>
	<transition>
		<div class="project-body--box">
			<div class="project-body--title">
				<h3>详情页-<small>{{ type }}</small></h3>
			</div>
			<div class="project-body--body">
				<el-tabs v-model="activeName" @tab-click="handleTabClick">
		    		<el-tab-pane label="全部" name="all" class="ani slideInDownSm delay active">
		    			<div class="list" v-if="pageList.length > 0">
		    				<div class="project-card" v-for="page in pageList">
		    					<div class="project-card--img">
		    						<img :src="page.img_cover">
		    					</div>
		    					<div class="project-card--title">
		    						{{ page.title || '未命名页面' }}
		    					</div>
		    					<div class="project-card--desc">
		    						{{ page.desc || '未添加描述' }}
		    					</div>
		    					<div class="project-card--btns">
		    						<el-dropdown split-button type="primary" size="mini" @click="goEditor(page.id,page.t_type)" @command="handleCommand(page)">
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
		    					<div class="project-card--sign">
		    						<img src="//mfs.ys7.com/mall/1749a21b9221474c593e251dc32c739d.png" v-if="page.page_type === 0">
		    						<img src="//mfs.ys7.com/mall/91b7d8245f8a0006f45e35fbb21734cb.png" v-if="page.page_type === 1">
		    					</div>
		    				</div>
		    			</div>
		    			<div class="list" v-if="pageList.length < 1">
		    				<div class="project-card">
		    					<div class="project-card--empty" @click="jumpToCreat">
		    						<h3><i class="el-icon-plus"></i></h3>
		    						<p>新建页面</p>
		    					</div>
		    				</div>
		    			</div>
		    		</el-tab-pane>
			    	<el-tab-pane label="普通" name="base" class="ani slideInDownSm delay">
			    		<div class="list" v-if="getBaseList().length > 0">
		    				<div class="project-card" v-for="page in getBaseList()">
		    					<div class="project-card--img">
		    						<img :src="page.img_cover">
		    					</div>
		    					<div class="project-card--title">
		    						{{ page.title || '未命名页面' }}
		    					</div>
		    					<div class="project-card--desc">
		    						{{ page.desc || '未添加描述' }}
		    					</div>
		    					<div class="project-card--btns">
		    						<el-dropdown split-button type="primary" size="mini" @click="goEditor(page.id,page.t_type)" @command="handleCommand(page)">
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
		    					<div class="project-card--sign">
		    						<img src="//mfs.ys7.com/mall/1749a21b9221474c593e251dc32c739d.png">
		    					</div>
		    				</div>
		    			</div>
		    			<div class="list" v-if="getBaseList().length < 1">
		    				<div class="project-card">
		    					<div class="project-card--empty" @click="jumpToCreat">
		    						<h3><i class="el-icon-plus"></i></h3>
		    						<p>新建页面</p>
		    					</div>
		    				</div>
		    			</div>
			    	</el-tab-pane>
			    	<el-tab-pane label="H5" name="h5" class="ani slideInDownSm delay">
			    		<div class="list" v-if="getH5List().length > 0">
		    				<div class="project-card" v-for="page in getH5List()">
		    					<div class="project-card--img">
		    						<img :src="page.img_cover">
		    					</div>
		    					<div class="project-card--title">
		    						{{ page.title || '未命名页面' }}
		    					</div>
		    					<div class="project-card--desc">
		    						{{ page.desc || '未添加描述' }}
		    					</div>
		    					<div class="project-card--btns">
		    						<el-dropdown split-button type="primary" size="mini" @click="goEditor(page.id,page.t_type)" @command="handleCommand(page)">
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
		    					<div class="project-card--sign">
		    						<img src="//mfs.ys7.com/mall/91b7d8245f8a0006f45e35fbb21734cb.png">
		    					</div>
		    				</div>
		    			</div>
		    			<div class="list" v-if="getH5List().length < 1">
		    				<div class="project-card">
		    					<div class="project-card--empty" @click="jumpToCreat">
		    						<h3><i class="el-icon-plus"></i></h3>
		    						<p>新建页面</p>
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
import { page_common } from './utils.js'
export default{
	name: 'info',
	mixins: [page_common],
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
		}
	}
}
</script>
<style lang="scss">
.project-card--empty{
	width: 100%;
	height: 100px;
	margin-top: 70px;
	text-align: center;
	cursor: pointer;

	& h3{
		color: #d6d6d6;
		font-size: 36px;
		transition: all .3s;
	}
	& p{
		color: #d6d6d6;
		font-size: 18px;
		transition: all .3s;
	}
}
.project-card--empty:hover{
	& h3{
		color: #20A0FF;
	}
	& p{
		color: #20A0FF;
	}
}
</style>