import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);
const _getParentCom = (coms, currComKey) => {
	let $pc;

	let _isContain = (children) => {
		let eqr = children.some((com) => {
			if(com.$$key === currComKey){
				return true;
			}
			return false;
		});
		return eqr;
	};

	let _getEle = (coms) => {
		coms.some((com) => {
			if(com.content && com.content.length>0){
				let result = _isContain(com.content);
				if(result){
					$pc = com;
					return true;
				}else{
					_getEle(com.content);
					return false;
				}
			}else{
				return false;
			}
		});
	};
	_getEle(coms);

	return $pc;
};
const state = {
	base:{
		id: '',
		t_type: '',
		title: '',
		desc: '',
		platform_type: 0,
		page_type: 0,
		update_time: ''
	},
	json:[],
	currentComKey: ''
};
const getters = {
	getBaseData (state) {
		return state.base;
	},
	getComType (state) {
		return state.base.t_type;
	},
	getPageData (state) {
		return state.json;
	},
	getCurrentComKey (state) {
		return state.currentComKey;
	},
	getCurrentCom (state, getters) {
		let pageData = getters.getPageData;
		let currKey = getters.getCurrentComKey;
		let currCom;
		let _getCurrent = (comNodes) => {
			comNodes.every((com, i) => {
				if(com.$$key === currKey){
					currCom = com;
					return false;
				}else if(com.content && com.content.length > 0){
					_getCurrent(com.content);
				}
				return true;
			});
		};
		_getCurrent(pageData);
		return currCom;
	}
};
const mutations ={
	ADD_ROOT (state, obj) {
		let index = state.json.length;
		Vue.set(state.json, index, obj);
		state.currentComKey = obj.$$key;
	},
	ADD_COM (state, obj) {
		Vue.set(obj.cc.content, obj.cc.content.length, obj.chc);
		state.currentComKey = obj.chc.$$key;
	},
	UPDATE_COM (state, obj) {
		obj.currentCom = obj.data;
	},
	CHANGE_COM_KEY(state, key) {
		state.currentComKey = key;
	},
	SET_BASE (state, obj) {
		state.base.id = obj.id;
		state.base.title = obj.title;
		state.base.desc = obj.desc;
		state.base.t_type = obj.t_type;
		state.base.platform_type = obj.platform_type;
		state.base.page_type = obj.page_type;
	},
	SET_PAGE (state, obj) {
		if(obj && obj.length>0){
			state.json = obj;
		}
	},
	DEL_COM (state, obj) {
		let index;
		obj.parent.some((com, i) => {
			if(com.$$key === obj.key.$$key){
				index = i;
				return true;
			}
			return false;
		});
		Vue.delete(obj.parent, index);
		state.currentComKey = '';
	}
};
const actions = {
	addContainer ({commit}, obj) {
		return new Promise((resolve, reject) => {
			let unique = 'cp-'+new Date().getTime();
			obj.page.$$key = unique;
			obj.page.id = unique;
			commit('ADD_ROOT', obj.page);
			resolve(obj.page);
		});
	},
	addCom ({commit, getters}, obj) {
		return new Promise((resolve, reject) => {
			let currentCom = getters.getCurrentCom?getters.getCurrentCom:getters.getPageData[getters.getPageData.length - 1];
			let parentCom;
			if(currentCom.$$level !==0 && obj.com.$$level !== currentCom.$$level){
				parentCom = currentCom;
			}else{
				parentCom = _getParentCom(getters.getPageData, getters.getCurrentComKey);
			}
			let unique = 'cp-'+new Date().getTime();
			obj.com.$$key = unique;
			obj.com.id = unique;
			commit('ADD_COM', {cc:parentCom, chc:obj.com});
			resolve(obj.com);
		});
	},
	updateCom ({commit}, obj) {
		return new Promise((resolve, reject) => {
			commit('UPDATE_COM', obj);
			resolve(obj.currentCom);
		})
	},
	changeComKey ({commit}, obj) {
		return new Promise((resolve, reject) => {
			commit('CHANGE_COM_KEY', obj);
			resolve(obj);
		});
	},
	setBase ({commit}, obj) {
		commit('SET_BASE', obj);
	},
	setPageContent ({commit}, obj) {
		return new Promise((resolve, reject) => {
			commit('SET_BASE', obj.base);
			commit('SET_PAGE', obj.page);

			resolve(obj);
		});
	},
	deleteCom ({commit, getters}, obj) {
		return new Promise((resolve, reject) => {
			let currentCom = getters.getCurrentCom;
			let parentObj;
			if(currentCom.$$level === 2){
				parentObj = getters.getPageData;
			}else{
				parentObj = _getParentCom(getters.getPageData, getters.getCurrentComKey).content;
			}
			commit('DEL_COM', {parent: parentObj, key: currentCom});
			resolve(currentCom);
		});
	}
}
export default new Vuex.Store({
	state,
	mutations,
	actions,
	getters
})