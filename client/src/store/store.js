import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

//组件共享状态(数据集合)
const state = {
	 page:{
	  label: '页面',
	  name: '',
	  level: 0,
	  children: []
	 },
	 forms:{},
	 html:'',
	 currentDom: ''
};

//数据更改驱动方法
const mutations = {
	INIT_DATA (state, data) {
		let formData = data.form_data;
		let pageData = data.page_data;
		let htmlData = data.html_data;
		if(formData && pageData && htmlData){
			state.forms = JSON.parse(formData);
			state.page = JSON.parse(pageData);
			state.html = htmlData;
		}
	},
	ADD_MAIN (state, page) {
		state.page.name = page.name;
        state.page.level = page.level;
        Vue.set(state.page, 'active', true);
        Vue.set(state.page, '_parent_', 'self');
        Vue.set(state.page, 'key', state.currentDom);
	},
	ADD_COM (state, obj) {
		Vue.set(obj.com, 'key', state.currentDom);
        let l = obj.currDom.children.length;
        Vue.set(obj.com, '_parent_', obj.currDom.key);
        Vue.set(obj.currDom.children, l, obj.com)
	},
	ADD_FORM (state, formData) {
		Vue.set(state.forms, state.currentDom, formData);
	},
	SET_CDOM (state, cdom) {
		state.currentDom = cdom;
	},
	CHANGE_FORM (state, obj) {
		Vue.set(state.forms, obj.key, obj.form);
	},
	SET_POSITION (state, obj) {
		state.forms[obj.formkey].style.position.forEach((item, i) => {
			if(item.name == 'left'){
				item.val = obj.pos.x;
			}
			if(item.name == 'top'){
				item.val = obj.pos.y;
			}
		});
	},
	DEL_COM (state, obj) {
		delete state.forms[obj.key];
		obj.currCom.children.splice(obj.index,1);
	},
	ADD_NODE (state, obj) {
		Vue.set(obj.com, '$dom', obj.dom);
	},
	CHANGE_ML (state, obj) {
		
	}
}
const getters = {
	getCDOM (state) {
		return state.currentDom;
	},
	getPage (state) {
		return state.page;
	},
	getForms (state) {
		return state.forms;
	},
	getCurrentDom (state) {
		return state.currentDom;
	},
	getCurrentForm (state) {
		return state.forms[state.currentDom];
	},
	getParentCom (state, getters) {
		let currCom = state.page;
		let key = getters.getCurrentCom._parent_;

        let _get = function(curr,key){
            for (let i=0;i<curr.children.length;i++) {
              let item = curr.children[i];
              if(item.key ===  key){
                currCom = item;
                break;
              }else{
                if(item.children){
                  _get(item, key);
                }
              }
            }
        }
        _get(currCom, key);
        return currCom;
	},
	getCurrentCom (state) {
		let currCom = state.page;
        
        let _get = function(curr,key){
            for (let i=0;i<curr.children.length;i++) {
              let item = curr.children[i];
              if(item.key ===  key){
                currCom = item;
                break;
              }else{
                if(item.children){
                  _get(item, key);
                }
              }
            }
        }
        _get(currCom, state.currentDom);
        return currCom;
	}
}
const actions = {
	initState ({commit}, obj) {
		commit('INIT_DATA', obj);
	},
	add ({dispatch, commit, getters}, obj) {
		return new Promise((resolve, reject) => {
			commit('SET_CDOM', new Date().getTime()+'com');
			commit('ADD_COM',obj);
			commit('ADD_FORM', obj.formData);
			resolve();
		});
	},
	addMain ({commit, getters}, obj) {
		return new Promise((resolve, reject) => {
			let page = getters.getPage;
			if(!page.name){
				commit('SET_CDOM', new Date().getTime()+'com');
				commit('ADD_MAIN', obj.page);
				commit('ADD_FORM', obj.formData);
			}
			resolve();
		});
	},
	addDomNode ({commit, getters}, obj) {
		let com = getters.getCurrentCom;
		commit('ADD_NODE',{ dom: obj.dom, com : com});
	},
	changeForm ({commit, getters}, obj) {
		commit('CHANGE_FORM', obj);
	},
	setPostion ({commit}, obj) {
		commit('SET_POSITION', obj);
	},
	setCurrentDom ({commit}, key) {
		commit('SET_CDOM', key);
	},
	deleteCom ({commit}, obj) {
		commit('DEL_COM', obj);
	}
}
export default new Vuex.Store({
	state,
	getters,
	mutations,
	actions
})