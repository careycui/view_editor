<template>
	<transition name="fade-bottom">
		<div class="project-body--box" v-loading.body="loading">
			<div class="project-body--title">
				<h3>专题页-<small>{{ type }}</small></h3>
			</div>
			<div class="project-body--body">
				<el-tabs v-model="activeName" @tab-click="handleTabClick">
		    		<el-tab-pane label="全部" name="all" class="ani slideInDownSm delay active">
		    			<page-list :pageList="pageList"
		    				@copyPage="copyPage"
		    				@deletePage="deletePage"
		    				@openEditDialog="openEditDialog"
		    				@appendToFolder="appendToFolder"
		    				@goPreview="goPreview">
	    				</page-list>
		    		</el-tab-pane>
			    	<el-tab-pane label="普通" name="base" class="ani slideInDownSm delay">
			    		<page-list :pageList="getBaseList()"
		    				@copyPage="copyPage"
		    				@deletePage="deletePage"
		    				@openEditDialog="openEditDialog"
		    				@appendToFolder="appendToFolder"
		    				@goPreview="goPreview">
	    				</page-list>
			    	</el-tab-pane>
			    	<el-tab-pane label="海报" name="h5" class="ani slideInDownSm delay">
			    		<page-list :pageList="getH5List()"
		    				@copyPage="copyPage"
		    				@deletePage="deletePage"
		    				@openEditDialog="openEditDialog"
		    				@appendToFolder="appendToFolder"
		    				@goPreview="goPreview">
	    				</page-list>
			    	</el-tab-pane>
			  	</el-tabs>
			</div>
		</div>
	</transition>
</template>
<script>
import PageList from './page_list'
import { page_common } from './utils.js'
export default{
	name: 'topic',
	components:{
		PageList
	},
	mixins: [page_common],
	methods : {
		setPageList () {
			var _this = this;
			this.loading = true;
			this.$http({
				url: G.API.host + 'topic/index/'+ this.type,
				method: 'GET',
				responseType: 'json'
			}).then(function(res){
				_this.pageList = res.data;
				_this.loading = false;
			}, function(err){
				_this.loading = false;
			});
		}
	}
}
</script>
<style>
</style>