import BASE from './../../utils/base'
const changeFt = () => {
	let ft = BASE.ft();
	ft.fontWeight = 700;
	return ft;
};
export default {
	getData () {
		return {
			$$key: '',
			id: '',
			label: '通栏标题',
			enableDrag: false,
			text: '标题',
			style:{
				opacity: 1,
				paddingTop: 0,
				paddingBottom: 0,
				ft: changeFt()
			}
		}
	}
}