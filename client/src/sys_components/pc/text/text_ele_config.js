import BASE from './../../utils/base'
const changeDp = () => {
	let db = BASE.dragPosrect();
	db.height = 'auto';
	return db
};
export default {
	getData () {
		return {
			id: '',
			label: '文本',
			text: '基本文本',
			enableDrag: true,
			resize: 'w', //w，宽度可拖拽调节；h, 高度可拖拽调节；all或者不填 均可拖拽调节
			style:{
				dragPosrect: changeDp(),
				ft: BASE.ft()
			}
		}
	}
}