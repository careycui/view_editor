import { SYS_UI_DESC } from './pc/pc_config.js'
import { SYS_M_UI_DESC } from './mobile/mobile_config.js'

const COMS_TREE_LABELS = {
	LEVEL_2: {
		label: '布局',
		icon: 'fa-cubes'
	},
	LEVEL_02: {
		label: '组',
		icon: 'fa-cubes'
	},
	LEVEL_1: {
		label: '容器',
		icon: 'fa-cube'
	},
	LEVEL_0: {
		label: '元素',
		icon: 'fa-puzzle-piece'
	},
	LEVEL_01: {
		label: '素材',
		icon: 'fa-photo'
	}
};
//解析组件描述，并转换为页面可用的数据结构
const parseComs = (coms) => {
	let coms_tree = {};
	Object.keys(COMS_TREE_LABELS).map( key => {
		coms_tree[key] = {
			label: COMS_TREE_LABELS[key].label,
			icon:  COMS_TREE_LABELS[key].icon,
			coms:[]
		};
	});
	coms.map( obj => {
		let key = 'LEVEL_' + obj.desc.level;
		coms_tree[key].coms.push(obj);
	});
	return coms_tree;
}
//注册所有基础组件
const install = ( Vue, ops ) => {
	//pc
	let coms = [];
	SYS_UI_DESC.map( obj => {
		Vue.component(obj.comKey, obj.comObj);
		Vue.component(obj.comKey+'Editor', obj.comEditorObj);
		coms.push(obj);
	} );
	//实例添加组件展示数据
	Vue.prototype.$sys_coms = parseComs(coms);

	//mobile
	let mcoms = [];
	SYS_M_UI_DESC.map( obj => {
		Vue.component(obj.comKey, obj.comObj);
		Vue.component(obj.comKey+'Editor', obj.comEditorObj);
		mcoms.push(obj);
	} );
	//实例添加组件展示数据
	Vue.prototype.$sys_m_coms = parseComs(mcoms);
};
export default {
	install,
	SYS_UI_DESC,
	SYS_M_UI_DESC
}