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
      <com-panel :addcom="add" :addmain="addMain" :page="page"></com-panel>
    </div>
    <div class="right-bar">
      <editor-panel></editor-panel>
    </div>
    <div class="app-content">
      <component v-if="page.name" :is="page.name" :formkey = "page.key">
        <component :is="section.name" :formkey = "section.key" v-for="section in page.children">
          <component :is="ele.name" :formkey = "ele.key" v-for="ele in section.children"></component>
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

export default {
  name: 'app',
  store,
  components: {
    ComPanel,EditorPanel
  },
  beforeMount () {
    this.addMain(); // 页面初始化
  },
  computed : mapState(['page', 'forms', 'currentDom']),
  methods:{
    getCurrent (com) {
      let indexArr = this.currentDom.split(':');
      let page = this.page;
      let currDom = page;
      let nextDom;
      indexArr.forEach(function(val,i){
        if(i > 0 && i < 2){
            currDom = currDom.children[val];
          }
      });

      if(com.level > 0){
          nextDom = page;
      }else{
          if(indexArr.length > 1){
            nextDom = currDom;
          }else{
            nextDom = page;
          }
      }
      return nextDom;
    },
    add (type) {
      let com = components[type]();
      let currDom = this.getCurrent(com);

      this.$store.dispatch('add', {currDom : currDom , com: com, formData: comData[type]()});
    },
    addMain () {
        this.$store.dispatch('addMain', {page: components.container(), formData: comData.container()});
    },
    change () {
      this.$store.dispatch('count');
    }
  }
}
</script>

<style lang="scss">
#app {
  padding-top: 50px;
  & .app-content{
    margin: 0 280px 0 200px;
    overflow: hidden;
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
}
.right-bar{
  @extend %pos;
  width: 280px;
  right: 0;
  border-left:1px solid #fff;
  box-shadow: 0 -2px 5px rgba(0,0,0, .4), 0 -4px 15px rgba(0,0,0, .2);
}
</style>
