import Dialog from './dialog'
import Vue from 'vue'

let dialogInstance;

const DialogConstructor = Vue.extend(Dialog);

const getDialog = (content) => {
	if(dialogInstance){
		return dialogInstance;
	}
	dialogInstance = new DialogConstructor({
		data:{
			content: content
		}
	});
	dialogInstance.id = new Date().getTime();
	dialogInstance.vm = dialogInstance.$mount();
	dialogInstance.dom = dialogInstance.vm.$el;
	document.body.appendChild(dialogInstance.dom);
	return dialogInstance.vm;
}
export default{
	install: (vue,opts) => {
		Vue.prototype.$dialog = getDialog;
	}
}