import BASE from './../../utils/base'
export default {
	getData () {
		return {
			id: '',
			label: '图片元素',
			imgUrl: 'about:blank',
			enableDrag: true,
			style:{
				opacity: 1,
				dragPosrect: BASE.dragPosrect(),
				br: BASE.br(),
				eleAni: BASE.eleAni()
			}
		}
	}
}