<template>
	<transition name="fade-bottom">
		<div class="project-body--box" v-loading.body="loading" v-if="folder">
			<div class="project-body--title">
				<h3 style="font-weight:600;">
					<span class="parent-nav" @click="jumpToNav">{{parentNav}}</span> 
					>
					<span>{{folder.name}}</span>
				</h3>
			</div>
			<div class="project-body--body">
				<el-tabs v-model="activeName" @tab-click="handleTabClick">
		    		<el-tab-pane label="全部" name="all" class="ani slideInDownSm delay active">
		    			<page-list :pageList="pageList"
		    				:isFolder="true"
		    				@copyPage="copyPage"
		    				@deletePage="deletePage"
		    				@openEditDialog="openEditDialog"
		    				@appendToFolder="appendToFolder"
		    				@shiftOutFolder="shiftOutFolder"
		    				@goPreview="goPreview">
	    				</page-list>
		    		</el-tab-pane>
			    	<el-tab-pane label="普通" name="base" class="ani slideInDownSm delay">
			    		<page-list :pageList="getBaseList()"
			    			:isFolder="true"
		    				@copyPage="copyPage"
		    				@deletePage="deletePage"
		    				@openEditDialog="openEditDialog"
		    				@appendToFolder="appendToFolder"
		    				@shiftOutFolder="shiftOutFolder"
		    				@goPreview="goPreview">
	    				</page-list>
			    	</el-tab-pane>
			    	<el-tab-pane label="海报" name="h5" class="ani slideInDownSm delay">
			    		<page-list :pageList="getH5List()"
			    			:isFolder="true"
		    				@copyPage="copyPage"
		    				@deletePage="deletePage"
		    				@openEditDialog="openEditDialog"
		    				@appendToFolder="appendToFolder"
		    				@shiftOutFolder="shiftOutFolder"
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
	name: 'folder',
	components:{
		PageList
	},
	mixins: [page_common],
	data (){
		return {
			folder_id: '',
			page_type: '',
			folder: null
		}
	},
	computed:{
		parentNav (){
			return ((this.page_type === 'pro')?'详情页':'专题页');
		}
	},
	beforeMount (){
		this.folder_id = this.$route.params.id;
		this.page_type = this.$route.params.pagetype;
		this.setFolder(this.folder_id);
	},
	watch:{
		'$route' (n , o){
			this.folder_id = n.params.id;
			this.setFolder(this.folder_id);
			this.setPageList();
		}
	},
	methods : {
		setPageList () {
			var _this = this;
			this.loading = true;
			this.$http({
				url: G.API.host + this.page_type + '/indexByFolderId/'+ this.folder_id,
				method: 'GET',
				responseType: 'json'
			}).then(function(res){
				_this.pageList = res.data;
				_this.loading = false;
			}, function(err){
				_this.loading = false;
			});
		},
		setFolder (id){
			let _this = this;
			this.$http({
				url: G.API.host + 'folder/getById/' + id,
					method: 'GET',
					responseType: 'json'
				}).then(function(res){
					_this.folder = res.data;
				}, function(err,xhr){

				});
		},
		jumpToNav (){
			let path = (this.page_type === 'pro'?'info':'topic');
			this.$router.push('/'+ path + '/pc');
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
.parent-nav{
	cursor: pointer;

	&:hover{
		color: lighten(#475669, 15%);
	}
}
</style>