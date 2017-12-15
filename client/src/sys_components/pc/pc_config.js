import Container from './container/container'
import ContainerEditor from './container/container_editor'
import ContainerConfig from  './container/container_config'

import Section from './section_panel/section_panel'
import SectionEditor from './section_panel/section_panel_editor'
import SectionConfig from  './section_panel/section_panel_config'

import Banner from './banner/banner'
import BannerEditor from './banner/banner_editor'
import BannerConfig from  './banner/banner_config'

import TopicBanner from './topic_banner/topic_banner'
import TopicBannerEditor from './topic_banner/topic_banner_editor'
import TopicBannerConfig from  './topic_banner/topic_banner_config'

import BannerTitle from './banner_title/banner_title'
import BannerTitleEditor from './banner_title/banner_title_editor'
import BannerTitleConfig from  './banner_title/banner_title_config'

import ImageEle from './image/image_ele'
import ImageEleEditor from './image/image_ele_editor'
import ImageEleConfig from  './image/image_ele_config'

import TextEle from './text/text_ele'
import TextEleEditor from './text/text_ele_editor'
import TextEleConfig from  './text/text_ele_config'

import LinkEle from './link/link_ele'
import LinkEleEditor from './link/link_ele_editor'
import LinkEleConfig from  './link/link_ele_config'
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
	comKey: 'sectionPanel',
	comObj: Section,
	comEditorObj: SectionEditor,
	desc: {
		label: '内容面板',
		icon: 'fa-columns',
		level: '02'
	},
	data () {
		return SectionConfig.getData();
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
	comKey: 'topicBanner',
	comObj: TopicBanner,
	comEditorObj: TopicBannerEditor,
	desc: {
		label: '活动通栏图',
		icon: 'fa-columns',
		level: 1
	},
	data () {
		return TopicBannerConfig.getData();
	}
}, {
	comKey: 'bannerTitle',
	comObj: BannerTitle,
	comEditorObj: BannerTitleEditor,
	desc: {
		label: '通栏标题',
		icon: 'fa-header',
		level: 1
	},
	data () {
		return BannerTitleConfig.getData();
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
}, {
	comKey: 'textEle',
	comObj: TextEle,
	comEditorObj: TextEleEditor,
	desc: {
		label: '文本',
		icon: 'fa-file-text-o',
		level: 0
	},
	data () {
		return TextEleConfig.getData();
	}
}, {
	comKey: 'linkEle',
	comObj: LinkEle,
	comEditorObj: LinkEleEditor,
	desc: {
		label: '链接',
		icon: 'fa-link',
		level: 0
	},
	data () {
		return LinkEleConfig.getData();
	}
}];
export const SYS_UI_DESC = ui_desc;