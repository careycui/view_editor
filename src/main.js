// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import Container from './sys_components/container'
import SectionPanel from './sys_components/section'
import Banner from './sys_components/banner'
import ImageLink from './sys_components/imageLink'
import ImageEle from './sys_components/imageEle'
import LinkEle from './sys_components/linkEle'
import BtnEle from './sys_components/btnEle'
Vue.config.productionTip = false
Vue.component('container', Container);
Vue.component('section-panel', SectionPanel);
Vue.component('banner', Banner);
Vue.component('image-link', ImageLink);
Vue.component('image-ele', ImageEle);
Vue.component('link-ele', LinkEle);
Vue.component('btn-ele', BtnEle);

Vue.filter('getStyle', function(val){
	let style = {};
	Object.keys(val).forEach((item, i) => {
		val[item].forEach((attr, j) => {
			style[attr.name] = attr.val;
		});
	});
	return style;
});
/* eslint-disable no-new */
new Vue({
  el: '#app',
  template: '<App/>',
  components: { App }
})
