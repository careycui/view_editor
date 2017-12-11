import BASE from './../../utils/base'
export default {
	getData () {
		return {
			$$key: '',
			id: '',
			label: '内容面板',
			enableDrag: false,
			style:{
				bg: BASE.bg()
			},
			content:[]
		}
	}
}