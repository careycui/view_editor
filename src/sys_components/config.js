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
		    level: 0
		}
	},
	sectionPanel () {
		return {
			name : 'section-panel',
			children:[],
		    level: 0
		}
	},
	banner () {
		return {
			name : 'banner',
			children:[],
		    level: 0
		}
	},
	imageLink () {
		return {
			name : 'image-link',
			children:[],
		    level: 0
		}
	},
	imageEle () {
		return {
			name : 'image-ele',
			children:[],
		    level: 0
		}
	},
	linkEle () {
		return {
			name : 'link-ele',
			children:[],
		    level: 0
		}
	},
	btnEle () {
		return {
			name : 'btn-ele',
			children:[],
		    level: 0
		}
	}
}
export const components = coms
export const component = com