import Vue from 'vue'
import VueRouter from 'vue-router'
import axios from 'axios'
import Home from './home.vue'
import Info from './components/info'
import Topic from './components/topic'
import Asset from './components/asset'
import Create from './components/create.vue'
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
Vue.prototype.$http = axios;
const routes = [
	{ path: '/', component: Info },
  	{ path: '/info/:type', component: Info },
  	{ path: '/topic/:type', component: Topic },
  	{ path: '/create', component: Create },
  	{ path: '/asset', component: Asset }
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