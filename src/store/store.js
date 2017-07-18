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
	 currentDom: ''
};

//数据更改驱动方法
const mutations = {
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
	DEL_COM (state, key) {
		delete state.forms[key];
		let keyArr = key.split(':');
		let com = state.page;
		keyArr.forEach((item,i) => {
			if(i > 1){
				com = com.children[keyArr[i-1]];
			}
		});
		com.children.splice(keyArr[keyArr.length-1],1);
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
	getCurrentForm () {
		return state.forms[state.currentDom];
	}
}
const actions = {
	add ({dispatch, commit, getters}, obj) {
		commit('SET_CDOM', new Date().getTime()+'com');
		commit('ADD_COM',obj);
		commit('ADD_FORM', obj.formData);
	},
	addMain ({commit, getters}, obj) {
		let page = getters.getPage;
		if(!page.name){
			commit('SET_CDOM', new Date().getTime()+'com');
			commit('ADD_MAIN', obj.page);
			commit('ADD_FORM', obj.formData);
		}
	},
	changeForm ({commit, getters}, obj) {
		commit('CHANGE_FORM', obj);
	},
	setPostion ({commit}, obj) {
		commit('SET_POSITION', obj);
	},
	deleteCom ({commit}, key) {
		commit('DEL_COM', key);
	}
}
export default new Vuex.Store({
	state,
	getters,
	mutations,
	actions
})