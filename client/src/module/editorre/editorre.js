// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'

import './../../global'
import axios from 'axios'
import store from './store/store'
import editor from './editorre.vue'
import OperateBox from './../../sys_components/utils/operate_box'

import register from './utils/register.js'

import DragSort from './components/common/drag_sort/index'

import  {Input,
		InputNumber,
		Radio,
		RadioGroup,
		RadioButton,
		Checkbox,
		CheckboxGroup,
		Switch,
		Select,
		Option,
		OptionGroup,
		Button,
		ButtonGroup,
		Tag,
		Tree,
		Collapse,
		CollapseItem,
		Dialog,
		Tooltip,
		Tabs,
		TabPane,
		Slider,
		Row,
		Col,
		ColorPicker,
		Form,
		FormItem,
		Upload} from 'element-ui'

Vue.use(Input);
Vue.use(InputNumber);
Vue.use(Radio);
Vue.use(RadioGroup);
Vue.use(RadioButton);
Vue.use(Checkbox);
Vue.use(CheckboxGroup);
Vue.use(Switch);
Vue.use(Select);
Vue.use(Option);
Vue.use(OptionGroup);
Vue.use(Button);
Vue.use(ButtonGroup);
Vue.use(Tree);
Vue.use(Tag);
Vue.use(Collapse);
Vue.use(CollapseItem);
Vue.use(Dialog);
Vue.use(Tooltip);
Vue.use(Tabs);
Vue.use(TabPane);
Vue.use(Slider);
Vue.use(Row);
Vue.use(Col);
Vue.use(ColorPicker);
Vue.use(Form);
Vue.use(FormItem);
Vue.use(Upload);


Vue.use(DragSort)

Vue.prototype.$http = axios;
Vue.config.productionTip = false

Vue.directive('drag', { bind : function (el, binding) {
            let oDiv = el;   //当前元素
            let self = this;  //上下文
            var type = oDiv.dataset.dragParent;
            oDiv.onmousedown = function (e) {
            	var targetELe = oDiv;
            	if(type){
            		targetELe = oDiv.parentNode;
            	}
                if(oDiv.className.indexOf('active')>-1){
	             //鼠标按下，计算当前元素距离可视区的距离
	                let disX = e.pageX;
	                let disY = e.pageY;
	                let left = targetELe.style.left.replace(/px/g, '') * 1;
	                let top = targetELe.style.top.replace(/px/g, '') * 1;

	                document.onmousemove = function (e) {
	                  //通过事件委托，计算移动的距离 
	                    let l = e.pageX - disX;
	                    let t = e.pageY - disY;
	                  //移动当前元素  
	                    l = (l + left);
	                    t = (t + top);
	                     //将此时的位置传出去
	                    binding.value({x:l,y:t})
	                };
	                document.onmouseup = function (e) {
	                    document.onmousemove = null;
	                    document.onmouseup = null;
	                 };
                }
            };
        }
    }
);
Vue.directive('window', function(el, binding){
		let width = window.screen.width;
		let height = window.screen.availHeight - 110;

		binding.value({w: width, h: height});
	}
);
//注册全部可视化组件
Vue.use(register);

Vue.component('operateBox', OperateBox);
/* eslint-disable no-new */
new Vue({
  el: '#editor',
  store,
  template: '<editor />',
  components: { editor }
})
