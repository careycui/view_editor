//根元素font-size基准值
const BASE_FT = 100;
//设计稿尺寸宽度
const BASE_W = 750;
//移动端宽高基准值
const BASE_WH = 375/603

export default {
	getBaseFt (clientWidth) {
		let dft = clientWidth / BASE_W * BASE_FT;
		return dft.toFixed(2);
	},
	px2rem (origin, base) {
		return (origin/base).toFixed(2);
	},
	getWrect (cw){
		let ch = cw/(375/603);
		return Math.floor(ch);
	}
}