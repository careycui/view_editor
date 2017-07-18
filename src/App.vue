<template>
  <div id="app">
    <div class="top-bar">
      <div class="ys-grid-row">
        <div class="ys-cell-3 top-bar--title">
          <h3>页面编辑器 <small>V 0.0.1</small></h3>
        </div>
      </div>
    </div>

    <div class="left-bar">
      <com-panel :addcom="add" :addmain="addMain"></com-panel>
    </div>
    <div class="right-bar">
      <editor-panel :title="com_title"></editor-panel>
    </div>
    <div class="app-content">
      <component v-if="page.name" :is="page.name" :formkey = "page.key">
        <component :is="section.name" :formkey = "section.key" v-for="section in page.children" :key="section.key">
          <component :is="ele.name" :formkey = "ele.key" v-for="ele in section.children" :key="ele.key"></component>
        </component>
      </component>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import Hello from './components/main'
import ComPanel from './components/com_panel'
import EditorPanel from './components/editor_panel'
import store from './store/store.js'
import { component, components, comData } from './sys_components/config.js'
import { Message } from 'element-ui'

export default {
  name: 'app',
  store,
  components: {
    ComPanel,EditorPanel
  },
  beforeMount () {
    this.addMain(); // 页面初始化
  },
  data () {
    return {
      com_title: ''
    }
  },
  computed : mapState(['page', 'forms', 'currentDom']),
  methods:{
    getCurrent (com) {
      let currCom = this.page;
      let _this = this;
      
      let _get = function(curr,key){
          for (let i=0;i<curr.children.length;i++) {
            let item = curr.children[i];
            if(item.key === ( key || _this.currentDom )){
              currCom = item;
              break;
            }else{
              if(item.children){
                _get(item);
              }
            }
          }
      }
      if(this.currentDom != this.page.key){
        _get(currCom);
      }
      let _judget = function(){
        if(currCom.level < 1){
          let key = currCom._parent_;
          currCom = _this.page;
          _get(currCom,key);
          _judget();
        }else{
          if(com.level > 0){
            currCom = _this.page;
          }
        }
      }
      _judget();
      return currCom;
    },
    add (type, callback) {
      let com = components[type]();
      let currDom = this.getCurrent(com);
      if(currDom){
        this.$store.dispatch('add', {currDom : currDom , com: com, formData: comData[type]()}).then(() => {
          this.com_title = type;
          callback && callback();
        });
      }
    },
    addMain (callback) {
        this.$store.dispatch('addMain', {page: components.container(), formData: comData.container()}).then(() => {
          this.com_title = 'Container';
          callback && callback();
        });
    },
    change () {
      
    }
  }
}
</script>

<style lang="scss">
#app {
  padding-top: 50px;
  & .app-content{
    margin: 0 280px 0 200px;
  }
}
.top-bar{
  position: fixed;
  top: 0;
  width: 100%;
  height: 40px;
  background-color: #333;
  z-index: 10;
}
.top-bar--title{
  height: 40px;
  vertical-align: middle;
  line-height: 40px;
  color: #f1f1f1;

  & h3{
    font-weight: normal;

    & small{
      color: #F1F1F1;
    }
  }
}
%pos{
  position: fixed;
  top: 0;
  bottom: 0;
  padding-top: 40px;
  width: 200px;
  background-color: #fafafa;
  z-index: 1;
}
.left-bar{
  @extend %pos;
  left: 0;
  border-right:1px solid #fff;
  box-shadow: 0 2px 5px rgba(0,0,0, .4), 0 4px 15px rgba(0,0,0, .2);
  overflow: auto;
}
.right-bar{
  @extend %pos;
  width: 280px;
  right: 0;
  border-left:1px solid #fff;
  box-shadow: 0 -2px 5px rgba(0,0,0, .4), 0 -4px 15px rgba(0,0,0, .2);
}
.outer-html.active{
  outline: 2px dashed #f26a18;
  outline-offset: -2px;
}
</style>
