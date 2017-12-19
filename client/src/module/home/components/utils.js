var PAGE_MIXIN = {
	data () {
		return {
			activeName: 'all',
			pageList: '',
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
		goEditor (id,type) {
			window.location.href="/module/editorre.html?key="+id+'&t_type='+type;
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
		jumpToCreat () {
			this.activeName = '';
			this.$router.push('/create');
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
		goPreview (page) {
			this.$emit('openPreview', page);
		}
	}
};
export const page_common = PAGE_MIXIN;