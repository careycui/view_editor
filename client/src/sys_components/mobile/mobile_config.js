import MContainer from './mcontainer/mcontainer'
import MContainerEditor from './mcontainer/mcontainer_editor'
import MContainerConfig from  './mcontainer/mcontainer_config'

import MBanner from './mbanner/mbanner'
import MBannerEditor from './mbanner/mbanner_editor'
import MBannerConfig from  './mbanner/mbanner_config'

import MBannerTitle from './mbanner_title/mbanner_title'
import MBannerTitleEditor from './mbanner_title/mbanner_title_editor'
import MBannerTitleConfig from  './mbanner_title/mbanner_title_config'

import MText from './mtext/text_ele'
import MTextEditor from './mtext/text_ele_editor'
import MTextConfig from  './mtext/text_ele_config'

import MLink from './mlink/mlink'
import MLinkEditor from './mlink/mlink_editor'
import MLinkConfig from  './mlink/mlink_config'

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
const ui_desc = [{
	comKey: 'mContainer',
	comObj: MContainer,
	comEditorObj: MContainerEditor,
	desc: {
		label: '页面',
		icon: '',
		level: 2
	},
	data () {
		return MContainerConfig.getData()
	}

}, {
	comKey: 'mBanner',
	comObj: MBanner,
	comEditorObj: MBannerEditor,
	desc: {
		label: '通栏图',
		icon: 'fa-columns',
		level: 1
	},
	data () {
		return MBannerConfig.getData()
	}

}, {
	comKey: 'mbannerTitle',
	comObj: MBannerTitle,
	comEditorObj: MBannerTitleEditor,
	desc: {
		label: '通栏标题',
		icon: 'fa-header',
		level: 1
	},
	data () {
		return MBannerTitleConfig.getData()
	}

}, {
	comKey: 'mText',
	comObj: MText,
	comEditorObj: MTextEditor,
	desc: {
		label: '文本',
		icon: 'fa-file-text-o',
		level: 0
	},
	data () {
		return MTextConfig.getData()
	}

}, {
	comKey: 'mlink',
	comObj: MLink,
	comEditorObj: MLinkEditor,
	desc: {
		label: '百分比链接',
		icon: 'fa-link',
		level: 0
	},
	data () {
		return MLinkConfig.getData()
	}

}];
export const SYS_M_UI_DESC = ui_desc;