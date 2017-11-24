//根元素font-size基准值
const BASE_FT = 100;
//设计稿尺寸宽度
const BASE_W = 750;
//移动端宽高基准值
const BASE_WH = 375/600

export default {
	getBaseFt (clientWidth) {
		let dft = clientWidth / BASE_W * BASE_FT;
		return dft.toFixed(3);
	},
	px2rem (origin, base) {
		return (origin/base).toFixed(3);
	},
	getWrect (cw){
		let ch = cw/BASE_WH;
		return Math.floor(ch);
	}
}