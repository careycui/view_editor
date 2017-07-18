// 组件信息描述
const com = {
	name : '',
	children:[],
    level: 0
}
const coms = {
	container () {
		return {
			name : 'container',
			label: '页面',
			children:[],
		    level: 2,
		    active: false
		}
	},
	sectionPanel () {
		return {
			name : 'section-panel',
			label: '区块',
			children:[],
		    level: 1,
		    active: false
		}
	},
	banner () {
		return {
			name : 'banner',
			label: '通栏图',
			children:[],
		    level: 0,
		    active: false
		}
	},
	imageLink () {
		return {
			name : 'image-link',
			label: '图片链接',
		    level: 0,
		    active: false
		}
	},
	imageEle () {
		return {
			name : 'image-ele',
			label: '图片元素',
		    level: 0,
		    active: false
		}
	},
	linkEle () {
		return {
			name : 'link-ele',
			label: '链接元素',
		    level: 0,
		    active: false
		}
	},
	btnEle () {
		return {
			name : 'btn-ele',
			label: '按钮元素',
		    level: 0,
		    active: false
		}
	}
}
//组件属性数据结构
const coms_data = {
	container () {
		return {
				style:{
					position: [{
						label: 'W',
						name: 'width',
						val: '1920',
						formEle: {
							type: 'el-input-number',
							unit: 'px'
						}
					},{
						label: 'H',
						name: 'height',
						val: '800',
						formEle: {
							type: 'el-input-number',
							unit: 'px'
						}
					}],
					background:[{
						label: '背景色',
						name: 'backgroundColor',
						val: '',
						formEle: {
							type: 'el-input'
						}
					},{
						label: '图片',
						name: 'backgroundImage',
						val: '',
						formEle: {
							type: 'el-input'
						}
					},{
						label: '类型',
						name: 'type',
						val: '',
						formEle: {
							type: 'el-input'
						}
					}],
					font:[{
						label: '字体',
						name: 'fontFamily',
						val: '',
						formEle: {
							type: 'el-input'
						}
					},{
						label: '颜色',
						name: 'color',
						val: '#000',
						formEle: {
							type: 'el-input'
						}
					},{
						label: '行高',
						name: 'lineHeight',
						val: '1.5',
						formEle: {
							type: 'el-input'
						}
					}]
				}
		}
	},
	sectionPanel () {
		return {
				style:{
					position: [{
						label: 'W',
						name: 'width',
						val: '1920',
						formEle: {
							type: 'el-input-number',
							unit: 'px'
						}
					},{
						label: 'H',
						name: 'height',
						val: '400',
						formEle: {
							type: 'el-input-number',
							unit: 'px'
						}
					},{
						label: 'X',
						name: 'left',
						val: '960',
						formEle: {
							type: 'el-input-number',
							unit: 'px'
						}
					},{
						label: 'Y',
						name: 'top',
						val: '0',
						formEle: {
							type: 'el-input-number',
							unit: 'px'
						}
					},{
						label: 'ML',
						name: 'marginLeft',
						val: '-960',
						formEle: {
							type: 'el-input-number',
							unit: 'px'
						}
					},{
						label: 'MT',
						name: 'marginTop',
						val: '0',
						formEle: {
							type: 'el-input-number',
							unit: 'px'
						}
					}],
					background:[{
						label: '背景色',
						name: 'backgroundColor',
						val: '',
						formEle: {
							type: 'el-input',
							unit: ''
						}
					},{
						label: '图片',
						name: 'backgroundImage',
						val: '',
						formEle: {
							type: 'el-input',
							unit: ''
						}
					},{
						label: '类型',
						name: 'type',
						val: '',
						formEle: {
							type: 'el-input',
							unit: ''
						}
					}],
					font:[{
						label: '字体',
						name: 'fontFamily',
						val: '',
						formEle: {
							type: 'el-input',
							unit: ''
						}
					},{
						label: '字号',
						name: 'fontSize',
						val: '14',
						formEle: {
							type: 'el-input-number',
							unit: 'px'
						}
					},{
						label: '颜色',
						name: 'color',
						val: '#000',
						formEle: {
							type: 'el-input'
						}
					},{
						label: '行高',
						name: 'lineHeight',
						val: '1.5',
						formEle: {
							type: 'el-input'
						}
					}]
				}
		}
	},
	banner () {
		return {
				style:{
					position: [{
						label: 'W',
						name: 'width',
						val: '1920',
						formEle: {
							type: 'el-input-number',
							unit: 'px'
						}
					},{
						label: 'H',
						name: 'height',
						val: '100',
						formEle: {
							type: 'el-input-number',
							unit: 'px'
						}
					},{
						label: 'X',
						name: 'left',
						val: '0',
						formEle: {
							type: 'el-input-number',
							unit: 'px'
						}
					},{
						label: 'Y',
						name: 'top',
						val: '0',
						formEle: {
							type: 'el-input-number',
							unit: 'px'
						}
					}],
					background:[{
						label: '背景色',
						name: 'backgroundColor',
						val: '',
						formEle: {
							type: 'el-input'
						}
					},{
						label: '图片',
						name: 'backgroundImage',
						val: '',
						formEle: {
							type: 'el-input'
						}
					},{
						label: '类型',
						name: 'type',
						val: '',
						formEle: {
							type: 'el-input'
						}
					}],
					font:[{
						label: '字体',
						name: 'fontFamily',
						val: '',
						formEle: {
							type: 'el-input'
						}
					},{
						label: '颜色',
						name: 'color',
						val: '#000',
						formEle: {
							type: 'el-input'
						}
					},{
						label: '行高',
						name: 'lineHeight',
						val: '1.5',
						formEle: {
							type: 'el-input'
						}
					}]
				}
		}
	},
	imageLink () {
		return {
				style:{
					position: [{
						label: 'W',
						name: 'width',
						val: '300',
						formEle: {
							type: 'el-input-number',
							unit: 'px'
						}
					},{
						label: 'H',
						name: 'height',
						val: '200',
						formEle: {
							type: 'el-input-number',
							unit: 'px'
						}
					},{
						label: 'X',
						name: 'left',
						val: '0',
						formEle: {
							type: 'el-input-number',
							unit: 'px'
						}
					},{
						label: 'Y',
						name: 'top',
						val: '0',
						formEle: {
							type: 'el-input-number',
							unit: 'px'
						}
					}],
					font:[{
						label: '字体',
						name: 'fontFamily',
						val: '',
						formEle: {
							type: 'el-input'
						}
					},{
						label: '颜色',
						name: 'color',
						val: '#000',
						formEle: {
							type: 'el-input'
						}
					},{
						label: '行高',
						name: 'lineHeight',
						val: '1.5',
						formEle: {
							type: 'el-input'
						}
					}]
				},
				action:{
					jump:[{
						label: '链接',
						name: 'href',
						val: '',
						formEle: {
							type: 'el-input'
						}
					},{
						label: '方式',
						name: 'target',
						val: '',
						formEle: {
							type: 'el-input'
						}
					}],
					hover:[{
						label: '样式',
						name: '',
						val: '',
						formEle: {
							type: 'el-input'
						}
					}]
				}
		}
	},
	imageEle() {
		return {
				style:{
					position: [{
						label: 'W',
						name: 'width',
						val: '300',
						formEle: {
							type: 'el-input-number',
							unit: 'px'
						}
					},{
						label: 'H',
						name: 'height',
						val: '200',
						formEle: {
							type: 'el-input-number',
							unit: 'px'
						}
					},{
						label: 'X',
						name: 'left',
						val: '0',
						formEle: {
							type: 'el-input-number',
							unit: 'px'
						}
					},{
						label: 'Y',
						name: 'top',
						val: '0',
						formEle: {
							type: 'el-input-number',
							unit: 'px'
						}
					}],
					border:[{
						label: '宽度',
						name: 'borderWidth',
						val: '',
						formEle: {
							type: 'el-input-number',
							unit: 'px'
						}
					},{
						label: '颜色',
						name: 'borderColor',
						val: '',
						formEle: {
							type: 'el-input'
						}
					},{
						label: '样式',
						name: 'borderStyle',
						val: '',
						formEle: {
							type: 'el-input'
						}
					}]
				},
				action:{
					hover:[{
						label: '样式',
						name: '',
						val: '',
						formEle: {
							type: 'el-input'
						}
					}]
				}
		}
	},
	linkEle () {
		return {
				style:{
					position: [{
						label: 'W',
						name: 'width',
						val: '300',
						formEle: {
							type: 'el-input-number',
							unit: 'px'
						}
					},{
						label: 'H',
						name: 'height',
						val: '200',
						formEle: {
							type: 'el-input-number',
							unit: 'px'
						}
					},{
						label: 'X',
						name: 'left',
						val: '0',
						formEle: {
							type: 'el-input-number',
							unit: 'px'
						}
					},{
						label: 'Y',
						name: 'top',
						val: '0',
						formEle: {
							type: 'el-input-number',
							unit: 'px'
						}
					}],
					background:[{
						label: '背景色',
						name: 'backgroundColor',
						val: '',
						formEle: {
							type: 'el-input'
						}
					},{
						label: '图片',
						name: 'backgroundImage',
						val: '',
						formEle: {
							type: 'el-input'
						}
					},{
						label: '类型',
						name: 'type',
						val: '',
						formEle: {
							type: 'el-input'
						}
					}],
					font:[{
						label: '字体',
						name: 'fontFamily',
						val: '',
						formEle: {
							type: 'el-input'
						}
					},{
						label: '颜色',
						name: 'color',
						val: '#000',
						formEle: {
							type: 'el-input'
						}
					},{
						label: '行高',
						name: 'lineHeight',
						val: '1.5',
						formEle: {
							type: 'el-input'
						}
					}],
					border:[{
						label: '宽度',
						name: 'borderWidth',
						val: '',
						formEle: {
							type: 'el-input-number',
							unit: 'px'
						}
					},{
						label: '颜色',
						name: 'borderColor',
						val: '',
						formEle: {
							type: 'el-input-number',
							unit: 'px'
						}
					},{
						label: '样式',
						name: 'borderStyle',
						val: '',
						formEle: {
							type: 'el-input'
						}
					}]
				},
				action:{
					jump:[{
						label: '链接',
						name: 'href',
						val: '',
						formEle: {
							type: 'el-input'
						}
					},{
						label: '方式',
						name: 'target',
						val: '',
						formEle : {
							type: 'el-input'
						}
					}],
					hover:[{
						label: '样式',
						name: '',
						val: '',
						formEle:{
							type: 'el-input'
						}
					}]
				}
		}
	},
	btnEle () {
		return {
				style:{
					position: [{
						label: 'W',
						name: 'width',
						val: '300',
						formEle: {
							type: 'el-input-number',
							unit: 'px'
						}
					},{
						label: 'H',
						name: 'height',
						val: '200',
						formEle: {
							type: 'el-input-number',
							unit: 'px'
						}
					},{
						label: 'X',
						name: 'left',
						val: '0',
						formEle: {
							type: 'el-input-number',
							unit: 'px'
						}
					},{
						label: 'Y',
						name: 'top',
						val: '0',
						formEle:{
							type: 'el-input-number',
							unit: 'px'
						}
					}],
					background:[{
						label: '背景色',
						name: 'backgroundColor',
						val: '',
						formEle: {
							type: 'el-input'
						}
					},{
						label: '图片',
						name: 'backgroundImage',
						val: '',
						formEle: {
							type: 'el-input'
						}
					},{
						label: '类型',
						name: 'type',
						val: '',
						formEle: {
							type: 'el-input'
						}
					}],
					font:[{
						label: '字体',
						name: 'fontFamily',
						val: '',
						formEle: {
							type: 'el-input'
						}
					},{
						label: '颜色',
						name: 'color',
						val: '#000',
						formEle: {
							type: 'el-input'
						}
					},{
						label: '行高',
						name: 'lineHeight',
						val: '1.5',
						formEle: {
							type: 'el-input'
						}
					}],
					border:[{
						label: '宽度',
						name: 'borderWidth',
						val: '',
						formEle: {
							type: 'el-input-number',
							unit: 'px'
						}
					},{
						label: '颜色',
						name: 'borderColor',
						val: '',
						formEle: {
							type: 'el-input'
						}
					},{
						label: '样式',
						name: 'borderStyle',
						val: '',
						formEle: {
							type: 'el-input'
						}
					}]
				},
				action:{
					jump:[{
						label: '链接',
						name: 'href',
						val: '',
						formEle: {
							type: 'el-input'
						}
					},{
						label: '方式',
						name: 'target',
						val: '',
						formEle: {
							type: 'el-input'
						}
					}],
					hover:[{
						label: '样式',
						name: '',
						val: '',
						formEle: {
							type: 'el-input'
						}
					}]
				}
		}
	}
}
export const components = coms
export const component = com
export const comData = coms_data