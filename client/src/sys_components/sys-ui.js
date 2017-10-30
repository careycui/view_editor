import Container from './container/container'
import ContainerEditor from './container/container_editor'
import ContainerConfig from  './container/container_config'

import Banner from './banner/banner'
import BannerEditor from './banner/banner_editor'
import BannerConfig from  './banner/banner_config'

import ImageEle from './image/image_ele'
import ImageEleEditor from './image/image_ele_editor'
import ImageEleConfig from  './image/image_ele_config'

/**
 * 基础组件描述对象
 * 	comObj 组件对象
 * 	desc 组件简介信息，用于组件加载后列表显示
 * 		tag 自定义标签命名
 * 		label 组件展示名
 * 		icon 组件展示icon
 * 		level 组件级别，分为3级：
 * 			2 顶级组件 可容纳任何2级以下组件
 * 			1 次级组件 可容纳任何1级以下组件
 * 			0 元素组件 不可容纳其它组件
 * @type {Array}
 */
const SYS_UI_DESC = [{
	comKey: 'container',
	comObj: Container,
	comEditorObj: ContainerEditor,
	desc: {
		label: '页面',
		icon: '',
		level: 2
	},
	data () {
		return ContainerConfig.getData()
	}

}, {
	comKey: 'banner',
	comObj: Banner,
	comEditorObj: BannerEditor,
	desc: {
		label: '通栏图',
		icon: 'fa-columns',
		level: 1
	},
	data () {
		return BannerConfig.getData();
	}
}, {
	comKey: 'imageEle',
	comObj: ImageEle,
	comEditorObj: ImageEleEditor,
	desc: {
		label: '图片',
		icon: 'fa-file-image-o',
		level: 0
	},
	data () {
		return ImageEleConfig.getData();
	}
}];
const COMS_TREE_LABELS = {
	LEVEL_2: '布局组件',
	LEVEL_1: '容器组件',
	LEVEL_0: '元素',
	LEVEL_01: '素材模板'
};
//解析组件描述，并转换为页面可用的数据结构
const parseComs = (coms) => {
	let coms_tree = {};
	Object.keys(COMS_TREE_LABELS).map( key => {
		coms_tree[key] = {
			label: COMS_TREE_LABELS[key],
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
	let coms = [];
	SYS_UI_DESC.map( obj => {
		Vue.component(obj.comKey, obj.comObj);
		Vue.component(obj.comKey+'Editor', obj.comEditorObj);
		coms.push(obj);
	} );
	//实例添加组件展示数据
	Vue.prototype.$sys_coms = parseComs(coms);
};
export default {
	install,
	SYS_UI_DESC
}