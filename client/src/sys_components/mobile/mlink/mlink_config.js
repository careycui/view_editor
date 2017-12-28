import BASE from './../../utils/base'
export default {
	getData () {
		return {
			id: '',
			label: '百分比链接',
			text: '',
			target: '_blank',
			link: '',
			enableDrag: false,
			style:{
				left: 0,
				top: 0,
				width: 100,
				height: 100,
				ft: BASE.ft()
			}
		}
	}
}