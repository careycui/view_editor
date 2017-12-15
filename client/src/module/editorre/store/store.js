import Vue from 'vue'
import Vuex from 'vuex'
const Token = require('uuid-token-generator');
let token = new Token(Token.BASE16);

Vue.use(Vuex);

const _getParentCom = (coms, key) => {
	if(!coms || coms.length < 1){
		return false;
	}

	let _isContain = (children, key) => {
		let eqr = children.some((com) => {
			if(com.$$key === key){
				return true;
			}
			return false;
		});
		return eqr;
	};

	var stack = [];
	var com;
	coms.forEach((com, i) => {
		stack.push(com);
	});
	var tmp;
	while(stack.length){
		tmp = stack.shift();
	 	var children = tmp.content;
		if(children && children.length > 0 && _isContain(children, key)){
			com = tmp;
			break;
		}
        if(children && children.length > 0){
            stack = stack.concat(children);
        }
	}
	return com;
};
const _getCom = (coms, key) => {
	if(!coms || coms.length < 1){
		return false;
	}
	var stack = [];
	var com;
	coms.forEach((com, i) => {
		stack.push(com);
	});
	var tmp;
	while(stack.length){
		tmp = stack.shift();
		if(tmp.$$key === key){
			com = tmp;
			break;
		}
	 	var children = tmp.content;
        if(children && children.length > 0){
            stack = stack.concat(children);
        }
	}
	return com;
};
const state = {
	base:{
		id: '',
		t_type: '',
		title: '',
		desc: '',
		img_cover: '',
		platform_type: 0,
		page_type: 0,
		update_time: ''
	},
	css:'',
	json:[],
	currentComKey: '',
	clientWidth: 375
};
const getters = {
	getBaseData (state) {
		return state.base;
	},
	getCss (state) {
		return state.css
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
		currCom = _getCom(pageData, currKey);
		return currCom;
	},
	clientWidth (state) {
		return state.clientWidth;
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
		state.base.img_cover = obj.img_cover;
		state.base.t_type = obj.t_type;
		state.base.platform_type = obj.platform_type;
		state.base.page_type = obj.page_type;
		state.css = obj.css;
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
	},
	SORT_COM (state, obj) {
		obj.parent.splice(obj.dragIndex, 1);
		obj.parent.splice(obj.dropIndex, 0, obj.dragEle);
	},
	INSERT_SORT (state, obj) {
		obj.dragParent.content.splice(obj.dragIndex, 1);
		obj.toParent.content.splice(obj.toIndex, 0, obj.drag);
	},
	SET_CLIENT_WIDTH (state, obj) {
		state.clientWidth = obj;
	},
	UPDATE_CSS (state, obj) {
		state.css = obj;
	}
};
const actions = {
	addContainer ({commit}, obj) {
		return new Promise((resolve, reject) => {
			let unique = 'cp-'+ token.generate();
			obj.page.$$key = unique;
			obj.page.id = unique;
			commit('ADD_ROOT', obj.page);
			resolve(obj.page);
		});
	},
	addCom ({commit, getters}, obj) {
		return new Promise((resolve, reject) => {
			let container = obj.container || getters.getPageData[getters.getPageData.length - 1];
			let currentCom = getters.getCurrentCom?getters.getCurrentCom:container;
			let parentCom;
			if(currentCom.$$level !==0 && obj.com.$$level !== currentCom.$$level){
				parentCom = currentCom;
			}else{
				parentCom = _getParentCom(getters.getPageData, getters.getCurrentComKey);
				while(parentCom.$$level === obj.com.$$level){
					parentCom =  _getParentCom(getters.getPageData, parentCom.$$key);
				}
			}
			let unique = 'cp-'+ token.generate();
			obj.com.$$key = unique;
			obj.com.id = unique;
			commit('ADD_COM', {cc:parentCom, chc:obj.com});
			resolve({com: obj.com, curCon: parentCom});
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
			if(obj && obj.cons){
				currentCom = obj.cons;
			}
			let parentObj;
			if(currentCom.$$level === 2){
				parentObj = getters.getPageData;
			}else{
				parentObj = _getParentCom(getters.getPageData, getters.getCurrentComKey).content;
			}
			commit('DEL_COM', {parent: parentObj, key: currentCom});
			resolve(currentCom);
		});
	},
	sort ({commit, getters}, obj) {
		return new Promise((resolve, reject) => {
			let com = obj.dragEle;
			let parentObj;
			if(com.$$level === 2){
				parentObj = getters.getPageData;
			}else{
				parentObj = _getParentCom(getters.getPageData, com.$$key).content;
			}
			obj.parent = parentObj;
			commit('SORT_COM', obj)
			resolve(true);
		});
	},
	insertSort ({commit, getters}, obj) {
		return new Promise((resolve, reject) => {
			const pageData = getters.getPageData;
			const dragParent = _getCom(pageData, obj.dragParent.$$key) || _getParentCom(pageData, obj.drag.$$key);
			const toParent = _getCom(pageData, obj.toParent.$$key) || _getParentCom(pageData, obj.to.$$key);
			const drag = _getCom(pageData, obj.drag.$$key);

			commit('INSERT_SORT', {
				drag: drag,
				dragParent: dragParent,
				toParent: toParent,
				dragIndex: obj.dragIndex,
				toIndex: obj.toIndex
			});
		})
	},
	embedSort ({commit, getters}, obj) {
		return new Promise((resolve, reject) => {
			const pageData = getters.getPageData;
			const dragParent = _getCom(pageData, obj.dragParent.$$key) || _getParentCom(pageData, obj.drag.$$key);
			const toParent = _getCom(pageData, obj.toParent.$$key);
			const drag = _getCom(pageData, obj.drag.$$key);

			commit('INSERT_SORT', {
				drag: drag,
				dragParent: dragParent,
				toParent: toParent,
				dragIndex: obj.dragIndex,
				toIndex: obj.toIndex
			});
		})
	},
	setClientWidth ({commit}, obj) {
		commit('SET_CLIENT_WIDTH', obj)
	},
	updateCss ({commit}, obj) {
		commit('UPDATE_CSS', obj);
	}
}
export default new Vuex.Store({
	state,
	mutations,
	actions,
	getters
})