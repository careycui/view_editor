import MC from './mobile_util.js'
const base = MC.getBaseFt(G.M.clientWidth) * 1;

//判断是否为数字
const isNum = (val) => {
	return val === +val;
};
//背景相关属性
const bg = () => {
	return {
		backgroundImage: '',
		backgroundColor: 'transparent',
		backgroundRepeat: 'no-repeat',
		backgroundPosition: 'center'
	}
};
//边框相关属性
const br = () => {
	return {
		borderStyle: '',
		borderColor: '',
		borderRadius: 0,
		borderWidth: 0
	}
};
//字体相关属性
const ft = () => {
	return {
		fontFamily: 'Roboto',
		fontSize: 14,
		fontWeight: 400,
		lineHeight: 12,
		color: '#333',
		textAlign: 'center',
		fontStyle: 'normal',
		textDecoration: 'none'
	}
};
//位置及尺寸，该项存在时元素是不可拖拽的
const posRect = () => {
	return {
		position: 'relative',
		width: 1920,
		height: 300,
		left: '50%',
		right: 'none',
		top: '0',
		bottom: 'none',
		marginLeft: '-960',
		marginTop: '0'
	}
};
const dragPosrect = () => {
	return {
		position: 'absolute',
		width: 200,
		height: 100,
		left: 500,
		top: 0,
		posType: 'CENTER',
		CENTER: {
			left: '50%',
			marginLeft: -100
		},
		LEFT: {
			left: 500
		}
	}
};
//动画元素属性
const eleAni = () => {
	return {
		animationName: '',
		animationDuration: 1,
		animationDelay: .2,
		animationIterationCount: 1,
		isPlayed: false
	}
};
//formatter对象，用于格式化编辑属性
// 前缀为pc_的用于pc端
// 前缀为m_的用于mobile
const formatter = {
	bgFormatter (bg) {
		let ibg = bg;
		let bgImg = ibg.backgroundImage;
		if(bgImg){
			bgImg = 'url('+ bgImg + ')';
		}else{
			bgImg = 'url(about:blank)';
		}
		ibg.backgroundImage = bgImg;
		let bgColor = ibg.backgroundColor;
		if(bgColor === 'transparent'){
			ibg.backgroundColor = '';
		}
		return ibg;
	},
	posRectFormatter (posRect) {
		posRect.width = posRect.width + 'px';
		posRect.height = posRect.height + 'px';

		if(posRect.marginLeft === 'none'){
			posRect.marginLeft = null;
		}else{
			posRect.marginLeft = posRect.marginLeft + 'px';
		}

		if(posRect.marginTop === 'none'){
			posRect.marginTop = null;
		}else{
			posRect.marginTop = posRect.marginTop + 'px';
		}

		if(posRect.left === 'none'){
			posRect.left = null;
		}

		if(posRect.right === 'none'){
			posRect.right = null;
		}
		return posRect;
	},
	m_posRectFormatter (posRect) {
		posRect.width = MC.px2rem(posRect.width, base) + 'rem';
		posRect.height = MC.px2rem(posRect.height, base) + 'rem';

		if(posRect.marginLeft === 'none'){
			posRect.marginLeft = null;
		}else{
			posRect.marginLeft = MC.px2rem(posRect.marginLeft, base) + 'rem';
		}

		if(posRect.marginTop === 'none'){
			posRect.marginTop = null;
		}else{
			posRect.marginTop = MC.px2rem(posRect.marginTop, basee) + 'rem';
		}

		if(posRect.left === 'none'){
			posRect.left = null;
		}

		if(posRect.right === 'none'){
			posRect.right = null;
		}
		return posRect;
	},
	dragPosrectFormatter (posRect) {
		let pos = {
			position: posRect.position,
			width: posRect.width + 'px',
			height: isNum(posRect.height)?posRect.height + 'px':'',
			top: posRect.top === 'none'?null:posRect.top + 'px'
		};
		if(posRect.posType === 'LEFT'){
			pos.left = posRect.LEFT.left?posRect.LEFT.left + 'px':null;
		}else{
			pos.left = posRect.CENTER.left?posRect.CENTER.left:'50%';
			pos.marginLeft = posRect.CENTER.marginLeft?posRect.CENTER.marginLeft+'px':null;
		}

		return pos;
	},
	m_dragPosrectFormatter (posRect) {
		let pos = {
			position: posRect.position,
			width: MC.px2rem(posRect.width, base) + 'rem',
			height: isNum(posRect.height)?MC.px2rem(posRect.height, base) + 'rem':'',
			top: posRect.top === 'none'?null:MC.px2rem(posRect.top, base) + 'rem'
		};
		if(posRect.posType === 'LEFT'){
			pos.left = posRect.LEFT.left?MC.px2rem(posRect.LEFT.left, base) + 'rem':null;
		}else{
			pos.left = posRect.CENTER.left?posRect.CENTER.left:'50%';
			pos.marginLeft = posRect.CENTER.marginLeft?MC.px2rem(posRect.CENTER.marginLeft,base)+'rem':null;
		}

		return pos;
	},
	brFormatter (br) {
		br.borderWidth = br.borderWidth + 'px';
		br.borderRadius = br.borderRadius + 'px';
		return br;
	},
	eleAniFormatter (eleAni) {
		let aniFormatter = {
			animation: '',
			isPlayed: false,
			animationName: eleAni.animationName
		};
		eleAni.animationDuration = eleAni.animationDuration + 's';
		eleAni.animationDelay = eleAni.animationDelay + 's';
		if(eleAni.animationName){
			aniFormatter.animation = eleAni.animationName + ' ' + 
									eleAni.animationDuration + ' ' + 
									eleAni.animationDelay + ' ' + 
									eleAni.animationIterationCount;
			aniFormatter.isPlayed = eleAni.isPlayed;
		}
		return aniFormatter;
	},
	ftFormatter (ft) {
		let ift = ft;
		ift.fontSize = ift.fontSize + 'px';
		ift.lineHeight = ift.lineHeight + 'px';
		return ift;
	},
	m_ftFormatter (ft) {
		let ift = ft;
		ift.fontSize = MC.px2rem(ift.fontSize, base) + 'rem';
		ift.lineHeight = MC.px2rem(ift.lineHeight, base) + 'rem';
		return ift;
	}
};
//组件基本属性
const BASE_MIXIN = {
	id: '',
	label: ''
}
//导出混合对象
export default {
	bg,
	ft,
	br,
	posRect,
	dragPosrect,
	eleAni,
	formatter,
	BASE_MIXIN
}