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
			children:[],
		    level: 2,
		    active: false
		}
	},
	sectionPanel () {
		return {
			name : 'section-panel',
			children:[],
		    level: 1,
		    active: false
		}
	},
	banner () {
		return {
			name : 'banner',
			children:[],
		    level: 0,
		    active: false
		}
	},
	imageLink () {
		return {
			name : 'image-link',
		    level: 0,
		    active: false
		}
	},
	imageEle () {
		return {
			name : 'image-ele',
		    level: 0,
		    active: false
		}
	},
	linkEle () {
		return {
			name : 'link-ele',
		    level: 0,
		    active: false
		}
	},
	btnEle () {
		return {
			name : 'btn-ele',
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
						val: '1920px'
					},{
						label: 'H',
						name: 'height',
						val: '800px'
					}],
					background:[{
						label: '背景色',
						name: 'backgroundColor',
						val: ''
					},{
						label: '图片',
						name: 'backgroundImage',
						val: ''
					},{
						label: '类型',
						name: 'type',
						val: ''
					}],
					font:[{
						label: '字体',
						name: 'fontFamily',
						val: ''
					},{
						label: '颜色',
						name: 'color',
						val: '#000',
					},{
						label: '行高',
						name: 'lineHeight',
						val: '1.5'
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
						val: '1920px'
					},{
						label: 'H',
						name: 'height',
						val: ''
					},{
						label: 'X',
						name: 'left',
						val: '50%'
					},{
						label: 'Y',
						name: 'top',
						val: '0'
					}],
					background:[{
						label: '背景色',
						name: 'backgroundColor',
						val: ''
					},{
						label: '图片',
						name: 'backgroundImage',
						val: ''
					},{
						label: '类型',
						name: 'type',
						val: ''
					}],
					font:[{
						label: '字体',
						name: 'fontFamily',
						val: ''
					},{
						label: '字号',
						name: 'fontSize',
						val: '14px'
					},{
						label: '颜色',
						name: 'color',
						val: '#000',
					},{
						label: '行高',
						name: 'lineHeight',
						val: '1.5'
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
						val: '1920px'
					},{
						label: 'H',
						name: 'height',
						val: ''
					},{
						label: 'X',
						name: 'left',
						val: '0'
					},{
						label: 'Y',
						name: 'top',
						val: '0'
					}],
					background:[{
						label: '背景色',
						name: 'backgroundColor',
						val: ''
					},{
						label: '图片',
						name: 'backgroundImage',
						val: ''
					},{
						label: '类型',
						name: 'type',
						val: ''
					}],
					font:[{
						label: '字体',
						name: 'fontFamily',
						val: ''
					},{
						label: '颜色',
						name: 'color',
						val: '#000',
					},{
						label: '行高',
						name: 'lineHeight',
						val: '1.5'
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
						val: '300px'
					},{
						label: 'H',
						name: 'height',
						val: '200px'
					},{
						label: 'X',
						name: 'left',
						val: '0'
					},{
						label: 'Y',
						name: 'top',
						val: '0'
					}],
					font:[{
						label: '字体',
						name: 'fontFamily',
						val: ''
					},{
						label: '颜色',
						name: 'color',
						val: '#000',
					},{
						label: '行高',
						name: 'lineHeight',
						val: '1.5'
					}]
				},
				action:{
					jump:[{
						label: '链接',
						name: 'href',
						val: ''
					},{
						label: '方式',
						name: 'target',
						val: ''
					}],
					hover:[{
						label: '样式',
						name: '',
						val: ''
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
						val: '300px'
					},{
						label: 'H',
						name: 'height',
						val: '200px'
					},{
						label: 'X',
						name: 'left',
						val: '0'
					},{
						label: 'Y',
						name: 'top',
						val: '0'
					}],
					border:[{
						label: '宽度',
						name: 'borderWidth',
						val: ''
					},{
						label: '颜色',
						name: 'borderColor',
						val: ''
					},{
						label: '样式',
						name: 'borderStyle',
						val: ''
					}]
				},
				action:{
					hover:[{
						label: '样式',
						name: '',
						val: ''
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
						val: '300px'
					},{
						label: 'H',
						name: 'height',
						val: '200px'
					},{
						label: 'X',
						name: 'left',
						val: '0'
					},{
						label: 'Y',
						name: 'top',
						val: '0'
					}],
					background:[{
						label: '背景色',
						name: 'backgroundColor',
						val: ''
					},{
						label: '图片',
						name: 'backgroundImage',
						val: ''
					},{
						label: '类型',
						name: 'type',
						val: ''
					}],
					font:[{
						label: '字体',
						name: 'fontFamily',
						val: ''
					},{
						label: '颜色',
						name: 'color',
						val: '#000',
					},{
						label: '行高',
						name: 'lineHeight',
						val: '1.5'
					}],
					border:[{
						label: '宽度',
						name: 'borderWidth',
						val: ''
					},{
						label: '颜色',
						name: 'borderColor',
						val: ''
					},{
						label: '样式',
						name: 'borderStyle',
						val: ''
					}]
				},
				action:{
					jump:[{
						label: '链接',
						name: 'href',
						val: ''
					},{
						label: '方式',
						name: 'target',
						val: ''
					}],
					hover:[{
						label: '样式',
						name: '',
						val: ''
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
						val: '300px'
					},{
						label: 'H',
						name: 'height',
						val: '200px'
					},{
						label: 'X',
						name: 'left',
						val: '0'
					},{
						label: 'Y',
						name: 'top',
						val: '0'
					}],
					background:[{
						label: '背景色',
						name: 'backgroundColor',
						val: ''
					},{
						label: '图片',
						name: 'backgroundImage',
						val: ''
					},{
						label: '类型',
						name: 'type',
						val: ''
					}],
					font:[{
						label: '字体',
						name: 'fontFamily',
						val: ''
					},{
						label: '颜色',
						name: 'color',
						val: '#000',
					},{
						label: '行高',
						name: 'lineHeight',
						val: '1.5'
					}],
					border:[{
						label: '宽度',
						name: 'borderWidth',
						val: ''
					},{
						label: '颜色',
						name: 'borderColor',
						val: ''
					},{
						label: '样式',
						name: 'borderStyle',
						val: ''
					}]
				},
				action:{
					jump:[{
						label: '链接',
						name: 'href',
						val: ''
					},{
						label: '方式',
						name: 'target',
						val: ''
					}],
					hover:[{
						label: '样式',
						name: '',
						val: ''
					}]
				}
		}
	}
}
export const components = coms
export const component = com
export const comData = coms_data