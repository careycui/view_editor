// 组件信息描述
const com = {
	name : '',
	children:[],
    level: 0
}
//组件编辑Tab信息
const edit_tabs = {
	position: '位置/区域',
	background: '背景',
	font: '字体',
	border: '边框',
	jump: '链接跳转',
	hover: '悬浮'
};
//组件描述信息
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
		    level: 1,
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
//组件属性数据结构信息
const coms_data = {
	container () {
		return {
				style:{
					custom:[{
						label: '排列',
						name: 'align',
						val: 'C',//LEFT : L, CENTER: C, RIGHT: R
						formEle: {
							type: 'ys-align',
							data: ['L', 'C', 'R']
						}
					}],
					position: [{
						label: 'W',
						name: 'width',
						val: '1920',
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
							type: 'color-picker'
						}
					},{
						label: '图片',
						name: 'backgroundImage',
						val: 'about:blank',
						formEle: {
							type: 'el-input'
						}
					},{
						label: '类型',
						name: 'type',
						val: 'BG',
						formEle: {
							type: 'el-select',
							data: [{
								value: 'BG',
								label: 'Background Image'
							},{
								value: 'IL',
								label: 'Image Layer'
							}]
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
							type: 'color-picker'
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
					custom:[{
						label: '排列',
						name: 'align',
						val: 'C',//LEFT : L, CENTER: C, RIGHT: R
						formEle: {
							type: 'ys-align',
							data: ['L', 'C', 'R']
						}
					}],
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
						label: 'ML',
						name: 'marginLeft',
						val: '-960',
						formEle: {
							type: 'el-input-number',
							unit: 'px',
							disabled: false
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
							type: 'color-picker'
						}
					},{
						label: '图片',
						name: 'backgroundImage',
						val: 'about:blank',
						formEle: {
							type: 'el-input',
							unit: ''
						}
					},{
						label: '类型',
						name: 'type',
						val: 'BG',
						formEle: {
							type: 'el-select',
							data: [{
								value: 'BG',
								label: 'Background Image'
							},{
								value: 'IL',
								label: 'Image Layer'
							}]
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
							type: 'color-picker'
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
							type: 'color-picker'
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
						val: 'BG',
						formEle: {
							type: 'el-select',
							data: [{
								value: 'BG',
								label: 'Background Image'
							},{
								value: 'IL',
								label: 'Image Layer'
							}]
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
							type: 'color-picker'
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
						val: '_blank',
						formEle: {
							type: 'el-select',
							data:[{
								label: '当前页',
								value: '_self'
							},{
								label: '新页面',
								value: '_blank'
							}]
						}
					}],
					hover:[{
						label: '样式',
						name: 'class',
						val: '',
						formEle: {
							type: 'el-input'
						}
					}]
				},
				data:{
					base: [{
						label: '图片',
						name: 'img',
						val: '',
						formEle: {
							type: 'el-input'
						}
					}]
				},
				transition:{
					style:[{
						label: '时长(s)',
						name: 'animationDuration',
						val: 0.7
					},{
						label: '延迟(s)',
						name: 'animationDelay',
						val: 0
					}],
					clazz:[{
						label: '动效类',
						name: 'aniName',
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
						type: 'color-picker'
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
			},
			data:{
				base:[{
					label: '图片',
					name: 'img',
					val: '',
					formEle: {
						type: 'el-input'
					}
				}]
			},
			transition:{
				style:[{
					label: '时长(s)',
					name: 'animationDuration',
					val: 0.7
				},{
					label: '延迟(s)',
					name: 'animationDelay',
					val: 0
				}],
				clazz:[{
					label: '动效类',
					name: 'aniName',
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
					val: '300',
					formEle: {
						type: 'el-input-number',
						unit: 'px'
					}
				},{
					label: 'H',
					name: 'height',
					val: '60',
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
					label: '字号',
					name: 'fontSize',
					val: '14',
					formEle:{
						type: 'el-input-number',
						unit: 'px'
					}
				},{
					label: '颜色',
					name: 'color',
					val: '#000',
					formEle: {
						type: 'color-picker'
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
					val: '_blank',
					formEle: {
						type: 'el-select',
						data:[{
							label: '当前页',
							value: '_self'
						},{
							label: '新页面',
							value: '_blank'
						}]
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
			},
			data:{
				base:[{
					label: '文本',
					name: 'txt',
					val: '',
					formEle:{
						type: 'el-input'
					}
				}]
			},
			transition:{
				style:[{
					label: '时长(s)',
					name: 'animationDuration',
					val: 0.7
				},{
					label: '延迟(s)',
					name: 'animationDelay',
					val: 0
				}],
				clazz:[{
					label: '动效类',
					name: 'aniName',
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
						type: 'color-picker'
					}
				},{
					label: '背景图',
					name: 'backgroundImage',
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
					label: '字号',
					name: 'fontSize',
					val: '14',
					formEle:{
						type: 'el-input-number',
						unit: 'px'
					}
				},{
					label: '颜色',
					name: 'color',
					val: '#000',
					formEle: {
						type: 'color-picker'
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
						type: 'color-picker'
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
			},
			data:{
				base:[{
					label: '文本',
					name: 'txt',
					val: '',
					formEle:{
						type: 'el-input'
					}
				}]
			},
			transition:{
				style:[{
					label: '时长(s)',
					name: 'animationDuration',
					val: 0.7
				},{
					label: '延迟(s)',
					name: 'animationDelay',
					val: 0
				}],
				clazz:[{
					label: '动效类',
					name: 'aniName',
					val: ''
				}]
			}
		}
	}
}
export const components = coms
export const component = com
export const comData = coms_data
export const tabs = edit_tabs