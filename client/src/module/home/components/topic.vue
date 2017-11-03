<template>
	<transition>
		<div class="project-body--box">
			<div class="project-body--title">
				<h3>专题页-<small>{{ type }}</small></h3>
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
		    					<div class="bottom-bar">
		    						<el-button icon="setting" size="mini" class="bottom-bar--btn" @click="openEditDialog(page)">设置</el-button>
		    						<el-button size="mini" class="bottom-bar--btn">
		    							<i class="fa fa-sign-in bottom-bar--icon"></i>引入
	    							</el-button>
		    						<el-button size="mini" class="bottom-bar--btn">
		    							<i class="fa fa-copy bottom-bar--icon"></i>复制
		    						</el-button>
		    						<el-button size="mini" class="bottom-bar--btn">
		    							<i class="fa fa-bar-chart bottom-bar--icon"></i>数据
		    						</el-button>
		    						<el-button icon="delete" size="mini" class="bottom-bar--btn">删除</el-button>
		    					</div>
		    					<div class="project-card--btns">
		    						<span class="update-time">
		    							更新时间：{{ page.update_time }}
		    						</span>
		    						<el-button size="small" class="plain-btn" @click="goPreview(page)">
		    							<i class="fa fa-eye bottom-bar--icon"></i> 预览
		    						</el-button>
		    						<el-button size="small" class="plain-btn" @click="goEditor(page.id,page.t_type)">
		    							<i class="fa fa-pencil bottom-bar--icon"></i> 编辑内容
		    						</el-button>
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
		    					<div class="bottom-bar">
		    						<el-button icon="setting" size="mini" class="bottom-bar--btn" @click="openEditDialog(page)">设置</el-button>
		    						<el-button size="mini" class="bottom-bar--btn">
		    							<i class="fa fa-sign-in bottom-bar--icon"></i>引入
	    							</el-button>
		    						<el-button size="mini" class="bottom-bar--btn">
		    							<i class="fa fa-copy bottom-bar--icon"></i>复制
		    						</el-button>
		    						<el-button size="mini" class="bottom-bar--btn">
		    							<i class="fa fa-bar-chart bottom-bar--icon"></i>数据
		    						</el-button>
		    						<el-button icon="delete" size="mini" class="bottom-bar--btn">删除</el-button>
		    					</div>
		    					<div class="project-card--btns">
		    						<span class="update-time">
		    							更新时间：{{ page.update_time }}
		    						</span>
		    						<el-button size="small" class="plain-btn" @click="goPreview(page)">
		    							<i class="fa fa-eye bottom-bar--icon"></i> 预览
		    						</el-button>
		    						<el-button size="small" class="plain-btn" @click="goEditor(page.id,page.t_type)">
		    							<i class="fa fa-pencil bottom-bar--icon"></i> 编辑内容
		    						</el-button>
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
			    	<el-tab-pane label="海报" name="h5" class="ani slideInDownSm delay">
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
		    					<div class="bottom-bar">
		    						<el-button icon="setting" size="mini" class="bottom-bar--btn" @click="openEditDialog(page)">设置</el-button>
		    						<el-button size="mini" class="bottom-bar--btn">
		    							<i class="fa fa-sign-in bottom-bar--icon"></i>引入
	    							</el-button>
		    						<el-button size="mini" class="bottom-bar--btn">
		    							<i class="fa fa-copy bottom-bar--icon"></i>复制
		    						</el-button>
		    						<el-button size="mini" class="bottom-bar--btn">
		    							<i class="fa fa-bar-chart bottom-bar--icon"></i>数据
		    						</el-button>
		    						<el-button icon="delete" size="mini" class="bottom-bar--btn">删除</el-button>
		    					</div>
		    					<div class="project-card--btns">
		    						<span class="update-time">
		    							更新时间：{{ page.update_time }}
		    						</span>
		    						<el-button size="small" class="plain-btn" @click="goPreview(page)">
		    							<i class="fa fa-eye bottom-bar--icon"></i> 预览
		    						</el-button>
		    						<el-button size="small" class="plain-btn" @click="goEditor(page.id,page.t_type)">
		    							<i class="fa fa-pencil bottom-bar--icon"></i> 编辑内容
		    						</el-button>
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
	name: 'topic',
	mixins: [page_common],
	methods : {
		setPageList () {
			var _this = this;
			this.$http({
				url: G.API.host + 'topic/index/'+ this.type,
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
<style>
</style>