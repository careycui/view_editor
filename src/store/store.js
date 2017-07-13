import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

//组件共享状态(数据集合)
const state = {
	 page:{
	  name: '',
	  level: 0,
	  children: []
	 },
	 forms:{},
	 currentDom: '0'
};

//数据更改驱动方法
const mutations = {
	ADD_MAIN (state, page) {
		state.page.name = page.name;
        state.page.level = page.level;
        Vue.set(state.page, 'active', true);
        Vue.set(state.page, 'key', '0');
	},
	ADD_COM (state, obj) {
		Vue.set(obj.com, 'key', state.currentDom);
        let l = obj.currDom.children.length;
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
		dispatch('setCurrent', obj.currDom).then(() => {
		});
		commit('ADD_COM',obj);
		commit('ADD_FORM', obj.formData);
	},
	addMain ({commit, getters}, obj) {
		let page = getters.getPage;
		if(!page.name){
			commit('ADD_MAIN', obj.page);
			commit('SET_CDOM', '0');
			commit('ADD_FORM', obj.formData);
		}
	},
	setCurrent ({commit, getters}, currDom) {
		let indexArr = getters.getCDOM.split(':');
	    let index = (currDom.children.length) + '';
	    let page = getters.getPage;
	    let c;

	    if(currDom.level < 2){
	        if(indexArr.length > 2){
	          c = indexArr.fill(index, 2, 3).join(':');
	        }else{
	          c = getters.getCDOM + ':' + index;
	        }
	    }else {
	        c = '0' + ':' + (page.children.length);
	    }

	    commit('SET_CDOM', c);
	},
	changeForm ({commit, getters}, obj) {
		commit('CHANGE_FORM', obj);
	}
}
export default new Vuex.Store({
	state,
	getters,
	mutations,
	actions
})