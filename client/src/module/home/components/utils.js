import { MessageBox, Message } from 'element-ui'
var PAGE_MIXIN = {
	data () {
		return {
			activeName: 'all',
			pageList: [],
			loading: false
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
	watch : {
		type () {
			this.setPageList();
		}
	},
	methods : {
		getBaseList () {
			var list = [];
			var tmp;
			for(var i=0;i<this.pageList.length;i++){
				tmp = this.pageList[i];
				if(tmp.page_type === 0){
					list.push(tmp);
				}
			}
			return list;
		},
		getH5List () {
			var list = [];
			var tmp;
			for(var i=0;i<this.pageList.length;i++){
				tmp = this.pageList[i];
				if(tmp.page_type === 1){
					list.push(tmp);
				}
			}
			return list;
		},
		handleCommand (page) {
			var type = event.target.type;
			if(type === 'set'){
				this.openEditDialog(page);
			}
		},
		handleTabClick (tab) {
			let clazz = tab.$el.className;
			tab.$el.className = clazz + ' active';
		},
		openEditDialog (page) {
			this.$emit('openBase',page);
		},
		copyPage (page) {
			var _this = this;
			this.loading = true;
			this.$http({
				url: G.API.host + page.t_type + '/copy/'+ page.id,
				method: 'GET',
				responseType: 'json'
			}).then(function(res){
				_this.loading = false;
				_this.setPageList();
			}, function(err){
				_this.loading = false;
			});
		},
		deletePage (page) {
			var _this = this;
			this.loading = true;
			this.$http({
				url: G.API.host + page.t_type + '/delete/'+ page.id,
				method: 'GET',
				responseType: 'json'
			}).then(function(res){
				_this.loading = false;
				_this.setPageList();
			}, function(err){
				_this.loading = false;
			});
		},
		appendToFolder (page){
			let _this = this;
			let folder_id;
			const h = _this.$createElement;
			let path = this.$route.path;
			let type = path.indexOf('info')>-1?'pro':(path.indexOf('topic')>-1?'topic':'');
			this.loading = true;
			this.$http({
				url: G.API.host + 'folder/get/' + type,
					method: 'GET',
					responseType: 'json'
				}).then(function(res){
					let folders = res.data;
					_this.loading = false;
					folder_id = (res.data[0]?res.data[0].id:'');
					MessageBox({
				    		title: '选择文件夹',
				    		message: h(
				    			'div',
				    			{
				    				class:{
				    					'el-form-item': true
				    				},
				    				style:{
				    					marginBottom: 0
				    				}
				    			},[
				    				h('div',{
				    						 class:{
				    							'el-form-item__content':true
				    						},
				    				},[
					    				h('select', 
					    					{
					    						class:{
					    							'el-input__inner': true
					    						},
					    						on:{
					    							change:function(e){
					    								folder_id = e.target.value;
					    							}
					    						}
					    					},
					    					(() => {
					    						let ops = [];
					    						for(let i=0;i< folders.length;i++){
					    							ops.push(h('option',
					    										{
					    											attrs:{
					    												selected: i === 0,
					    												value: folders[i].id
					    											}
					    										}, 
					    										folders[i].name));
					    						}
					    						return ops;
					    					})()
					    				)
				    					])
				    			]
			    			),
			    			showCancelButton: true,
				    		confirmButtonText: '确定',
				    		cancelButtonText: '取消'
				    	}).then((value) => {
				    		if(!folder_id){
				    			Message({
									message: '没有选择文件夹',
									showClose: true,
									type: 'warning'
								});
				    		}
							_this.loading = true;
							_this.$http({
								url: G.API.host + page.t_type + '/appendto/folder',
								method: 'POST',
								data: {page_id: page.id, folder_id: folder_id},
								responseType: 'json'
							}).then(function(res){
								_this.loading = false;
								Message({
									message: '移入文件夹成功',
									showClose: true,
									type: 'success'
								});
								_this.setPageList();
							}, function(err){
								_this.loading = false;
								Message({
									message: '移入文件夹失败,请稍后再试',
									showClose: true,
									type: 'error'
								});
							});
				    	}).catch(() => {
				    		
				    	});
				}, function(err,xhr){
					_this.loading = false;
					Message({
						message: '获取文件夹失败,请稍后再试',
						showClose: true,
						type: 'error'
					});
				});
		},
		goPreview (page) {
			this.$emit('openPreview', page);
		},
		shiftOutFolder (page){
			var _this = this;
			this.loading = true;
			this.$http({
				url: G.API.host + page.t_type + '/shiftout/folder',
				method: 'POST',
				data:{id:page.id, folder_id: null},
				responseType: 'json'
			}).then(function(res){
				_this.loading = false;
				_this.setPageList();
			}, function(err){
				_this.loading = false;
			});
		}
	}
};
export const page_common = PAGE_MIXIN;