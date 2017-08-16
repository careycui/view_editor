import Vue from 'vue'
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
new Vue({
  el: '#home',
  template: '<Home />',
  components: { Home }
})