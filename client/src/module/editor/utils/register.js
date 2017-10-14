import { SYS_UI } from './../../../sys_components/sys-ui'
export default {
	install (Vue, options) {
		let coms = [];
		Object.entries(SYS_UI).map(com => {
			let name = com[0];
			let comObj = com[1];
			Vue.component(name, comObj);
			coms.push({
				name,
				label: comObj.label,
				icon: comObj.icon
			});
		});
		//将获取的注册信息保存到Vue实例，以便调用
		Vue.prototype.$syscoms = coms;
	}
}