import BASE from './../../utils/base'
const changeDp = () => {
	let db = BASE.dragPosrect();
	db.height = 'auto';
	db.LEFT.left = 0;
	return db
};
export default {
	getData () {
		return {
			id: '',
			label: '文本',
			text: '基本文本',
			enableDrag: true,
			style:{
				dragPosrect: changeDp(),
				ft: BASE.ft()
			}
		}
	}
}