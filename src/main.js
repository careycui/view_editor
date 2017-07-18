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
		Tree} from 'element-ui'

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

Vue.config.productionTip = false
Vue.component('container', Container);
Vue.component('section-panel', SectionPanel);
Vue.component('banner', Banner);
Vue.component('image-link', ImageLink);
Vue.component('image-ele', ImageEle);
Vue.component('link-ele', LinkEle);
Vue.component('btn-ele', BtnEle);

Vue.directive('drag', { bind : function (el, binding) {
            let oDiv = el;   //当前元素
            let self = this;  //上下文
            oDiv.onmousedown = function (e) {
                if(oDiv.className.indexOf('active')>-1){
	             //鼠标按下，计算当前元素距离可视区的距离
	                let disX = e.pageX;
	                let disY = e.pageY;
	                let left = oDiv.style.left.replace(/px/g, '') * 1;
	                let top = oDiv.style.top.replace(/px/g, '') * 1;
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
/* eslint-disable no-new */
new Vue({
  el: '#app',
  template: '<App/>',
  components: { App }
})
