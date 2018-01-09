<template>
	<transition name="fade-bottom">
		<div class="project-body--box" v-loading.body="loading">
			<div class="project-body--title">
				<h3>详情页-<small>{{ type }}</small></h3>
			</div>
			<div class="project-body--body">
				<el-tabs v-model="activeName" @tab-click="handleTabClick">
		    		<el-tab-pane label="全部" name="all" class="ani slideInDownSm delay active">
		    			<page-list :pageList="pageList"
		    				:folders="folders"
		    				@copyPage="copyPage"
		    				@deletePage="deletePage"
		    				@openEditDialog="openEditDialog"
		    				@appendToFolder="appendToFolder"
		    				@goPreview="goPreview">
	    				</page-list>
		    		</el-tab-pane>
			    	<el-tab-pane label="普通" name="base" class="ani slideInDownSm delay">
			    		<page-list :pageList="getBaseList()"
			    			:folders="folders"
		    				@copyPage="copyPage"
		    				@deletePage="deletePage"
		    				@openEditDialog="openEditDialog"
		    				@appendToFolder="appendToFolder"
		    				@goPreview="goPreview">
	    				</page-list>
			    	</el-tab-pane>
			    	<el-tab-pane label="海报" name="h5" class="ani slideInDownSm delay">
			    		<page-list :pageList="getH5List()"
			    			:folders="folders"
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
import { page_common } from './utils.js'
import PageList from './page_list'
export default{
	name: 'info',
	props:{
		folders:{
			type: Array,
			default: []
		}
	},
	components:{
		PageList
	},
	mixins: [page_common],
	methods : {
		setPageList () {
			var _this = this;
			this.loading = true;
			this.$http({
				url: G.API.host + 'pro/index/'+ this.type,
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