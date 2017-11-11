import BASE from './../../utils/base'
const changeDp = () => {
	let db = BASE.posRect();
	db.height = 'auto';
	return db
};
export default {
	getData () {
		return {
			$$key: '',
			id: '',
			label: '页面容器',
			enableDrag: false,
			style:{
				bg: BASE.bg(),
				posRect: changeDp()
			},
			content:[]
		}
	}
}