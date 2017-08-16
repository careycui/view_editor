import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from './home.vue'
import {Row,
		Col,
		Menu,
	    Submenu,
	    MenuItem,
	    MenuItemGroup,
	    Button,
	    Tabs,
	    TabPane,
	    Dropdown,
	    DropdownMenu,
	    DropdownItem} from 'element-ui'
Vue.use(VueRouter);
Vue.use(Row);
Vue.use(Col);
Vue.use(Menu);
Vue.use(Submenu);
Vue.use(MenuItem);
Vue.use(MenuItemGroup);
Vue.use(Button);
Vue.use(Tabs);
Vue.use(TabPane);
Vue.use(Dropdown);
Vue.use(DropdownMenu);
Vue.use(DropdownItem);

Vue.config.productionTip = false

const info = {
	template : '<div>Info</div>'
}
const topic = {
	template : '<div>Topic</div>'
}
const routes = [
  { path: '/info', component: info },
  { path: '/topic', component: topic }
]
const router = new VueRouter({
  routes // （缩写）相当于 routes: routes
})
new Vue({
  el: '#home',
  router,
  template: '<Home />',
  components: { Home }
})