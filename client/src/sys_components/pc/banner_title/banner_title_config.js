import BASE from './../../utils/base'
export default {
	getData () {
		return {
			$$key: '',
			id: '',
			label: '通栏标题',
			enableDrag: false,
			text: '',
			style:{
				opacity: 1,
				paddingTop: 0,
				paddingBottom: 0,
				ft: BASE.ft()
			},
			content:[]
		}
	}
}