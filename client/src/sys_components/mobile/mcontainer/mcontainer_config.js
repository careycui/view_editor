import CONFIG from './../../utils/base'
export default {
	getData () {
		return {
			$$key: '',
			id: '',
			label: '页面容器',
			enableDrag: false,
			style:{
				bg: CONFIG.bg()
			},
			content:[]
		}
	}
}