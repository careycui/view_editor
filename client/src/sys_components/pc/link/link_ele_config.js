import BASE from './../../utils/base'
const changeBg = () => {
	let bg = BASE.bg();
	bg.backgroundColor = 'transparent';
	return bg;
};
export default {
	getData () {
		return {
			id: '',
			label: '链接',
			text: '',
			target: '_blank',
			link: '',
			enableDrag: true,
			style:{
				bg: changeBg(),
				dragPosrect: BASE.dragPosrect(),
				ft: BASE.ft()
			}
		}
	}
}