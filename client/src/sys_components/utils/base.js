//背景相关属性
const bg = () => {
	return {
		backgroundImage: '',
		backgroundColor: '#FFFFFF',
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
		fontFamily: '',
		fontSize: '14px',
		fontWeight: 400,
		lineHeight: 1,
		color: '#333',
		textAlign: 'center'
	}
};
//位置及尺寸，该项存在时元素是不可拖拽的
const posRect = () => {
	return {
		position: 'relative',
		width: 1920,
		height: 100,
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
		height: 200,
		left: 500,
		top: 0
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
	dragPosrectFormatter (posRect) {
		posRect.width = posRect.width + 'px';
		posRect.height = posRect.height + 'px';

		if(posRect.left === 'none'){
			posRect.left = null;
		}else{
			posRect.left = posRect.left + 'px';
		}

		if(posRect.top === 'none'){
			posRect.top = null;
		}else{
			posRect.top = posRect.top + 'px';
		}
		return posRect;
	},
	brFormatter (br) {
		br.borderWidth = br.borderWidth + 'px';
		br.borderRadius = br.borderRadius + 'px';
		return br;
	},
	eleAniFormatter (eleAni) {
		let aniFormatter = {
			animation: '',
			isPlayed: false
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