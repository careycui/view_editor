<template>
  <div id="app" v-window="getWindow">
    <div class="top-bar">
      <div class="ys-grid-row">
        <div class="ys-cell-3 top-bar--title">
          <h3>页面编辑器 <small>V 0.0.1</small></h3>
        </div>
        <div class="ys-cell-3 top-bar--btn">
          <el-tooltip :open-delay="500" content="上传PSD文件">
            <button class="ys-btn ys-btn-sm ys-btn--c"><i class="fa fa-upload fa-2x"></i></button>
          </el-tooltip>
          <el-tooltip :open-delay="500" content="控制侧边栏">
            <button class="ys-btn ys-btn-sm ys-btn--c" @click="barChange('all')"><i class="fa fa-columns fa-2x"></i></button>
          </el-tooltip>
          <el-tooltip :open-delay="500" content="导出HTML">
            <button class="ys-btn ys-btn-sm ys-btn--c" @click="dialogVisible = true"><i class="fa fa-code fa-2x"></i></button>
          </el-tooltip>
          <el-tooltip :open-delay="500" content="保存">
            <button class="ys-btn ys-btn-sm ys-btn--c"><i class="fa fa-floppy-o fa-2x"></i></button>
          </el-tooltip>
          <el-tooltip :open-delay="500" content="预览">
            <button class="ys-btn ys-btn-sm ys-btn--c"><i class="fa fa-eye fa-2x"></i></button>
          </el-tooltip>
        </div>
        <div class="ys-cell-6 top-bar--btn" style="text-align:center;">
          <el-tooltip :open-delay="500" content="撤销">
            <button class="ys-btn ys-btn-sm ys-btn--c"><i class="fa fa-reply fa-2x"></i></button>
          </el-tooltip>
          <el-tooltip :open-delay="500" content="恢复">
            <button class="ys-btn ys-btn-sm ys-btn--c"><i class="fa fa-share fa-2x"></i></button>
          </el-tooltip>
          <el-tooltip :open-delay="500" content="放大">
            <button class="ys-btn ys-btn-sm ys-btn--c"><i class="fa fa-search-plus fa-2x"></i></button>
          </el-tooltip>
          <el-tooltip :open-delay="500" content="放小">
            <button class="ys-btn ys-btn-sm ys-btn--c"><i class="fa fa-search-minus fa-2x"></i></button>
          </el-tooltip>
        </div>
      </div>
    </div>

    <div class="left-bar" :class="{'close': leftBarClose}">
      <com-panel :addcom="add" :addmain="addMain"></com-panel>
      <div class="bar-cntrl" @click="barChange('leftBarClose')">
        <i class="el-icon-arrow-left"></i>
      </div>
    </div>
    <div class="right-bar" :class="{'close': rightBarClose}">
      <editor-panel></editor-panel>
      <div class="bar-cntrl" @click="barChange('rightBarClose')">
        <i class="el-icon-arrow-right"></i>
      </div>
    </div>
    <div class="app-content">
      <component v-if="page.name" :is="page.name" :formkey = "page.key" :ref="page.key" @setLine="setLine">
        <component :is="section.name" :formkey = "section.key" v-for="section in page.children" :key="section.key" :ref="section.key" @setLine="setLine">
          <component :is="ele.name" :formkey = "ele.key" v-for="ele in section.children" :key="ele.key" :ref="ele.key" @setLine="setLine"></component>
        </component>
      </component>
    </div>
    <lines :line="line" :wrect="wrect"></lines>
    <el-dialog title="HTML CODES" custom-class="cudialog" :visible.sync="dialogVisible" size="small" :close-on-click-modal="false" @open="openCodes">
      <div class="pre-code ys-grid">
        <div class="ys-grid-row">
          <div class="ys-cell-10">
            <el-input :autosize="{minRows: 8, maxRows: 16}" type="textarea" :value="html" resize="none" ref="htmlText" :autofocus="true"></el-input>
          </div>
          <div class="ys-cell-2">
            <button class="ys-btn ys-color-btn-primary" @click="selectAll"><i class="fa fa-clipboard"></i> 全选复制</button>
            <div class="placeholder"></div>
            <button class="ys-btn ys-color-btn-primary"><i class="fa fa-eye"></i> 预览</button>
          </div>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import Hello from './components/main'
import ComPanel from './components/com_panel'
import EditorPanel from './components/editor_panel'
import Lines from './components/lines'
import store from './store/store.js'
import { component, components, comData } from './sys_components/config.js'
import { Message } from 'element-ui'

export default {
  name: 'app',
  store,
  components: {
    ComPanel,EditorPanel,Lines
  },
  data () {
    return {
      line: {
        left: {}
      },
      leftBarClose : false,
      rightBarClose: false,
      wrect : {
        width: '1920px',
        height: '1080px'
      },
      dialogVisible: false,
      html: ''
    }
  },
  beforeMount () {
    this.addMain(function(){}); // 页面初始化
  },
  computed : {
    page () {
      return this.$store.getters.getPage;
    },
    forms () {
      return this.$store.getters.getForms;
    },
    currentDom () {
      return this.$store.getters.getCurrentDom;
    }
  },
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
          let $com = this.$refs[this.currentDom];
          if(Object.prototype.toString.call($com) === '[object Array]'){
            $com = $com[0];
          }
          this.$store.dispatch('addDomNode', {dom: $com.$el});
          callback && callback();
        });
      }
    },
    addMain (callback) {
        this.$store.dispatch('addMain', {page: components.container(), formData: comData.container()}).then(() => {
          let $com = this.$refs[this.currentDom];
          if(Object.prototype.toString.call($com) === '[object Array]'){
            $com = $com[0];
          }
          this.$store.dispatch('addDomNode', {dom: $com.$el});
          callback && callback();
        });
    },
    barChange (type) {
      if(type !== 'all'){
        if(this[type]){
          this[type] = false;
        }else{
          this[type] = true;
        }
      }else{
        if(this.leftBarClose || this.rightBarClose){
          this.leftBarClose = false;
          this.rightBarClose = false;
        }else{
          this.leftBarClose = true;
          this.rightBarClose = true;
        }
      }
    },
    setLine (obj) {
      this.line = obj;
    },
    getWindow (obj) {
      this.wrect.width = obj.w + 'px';
      this.wrect.height = obj.h + 'px';
    },
    openCodes () {
      let $cnt = this.$el.querySelector('.app-content');
      let html = $cnt.innerHTML.replace(/(&quot;)+/g, '\"').replace(/(data\-v\-[\w]+\=[\"]{2})+/g, '').replace(/(\n)+/g, '')
                                .replace(/(\<\![\-]{4}\>)+/g, '');
      html = '<link rel="stylesheet" type="text/css" href="http://localhost:8080/static/component.css" />'  + html;                        
      this.html = html;
    },
    selectAll () {
      let $area = this.$refs.htmlText.$el.querySelector('textarea');
      $area.focus();
      $area.select();
      document.execCommand('copy');
    }
  }
}
</script>

<style lang="scss">
#app {
  padding-top: 50px;
  & .app-content{
    width: 100%;
    margin: 0 auto;
  }
}
.top-bar{
  position: fixed;
  top: 0;
  width: 100%;
  height: 40px;
  background-color: #333;
  z-index: 100;
}
.top-bar--title, .top-bar--btn{
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
.top-bar--btn{
  padding-right: 20px;
  float: right;
  text-align: right;
}
.ys-btn--c{
  padding: 0;
  text-align: center;
  width: 40px;
  color: #f1f1f1;

  & i{
    vertical-align: middle;
  }
}
.ys-btn--c:hover{
  background-color: #000;
}
%pos{
  position: fixed;
  top: 0;
  bottom: 0;
  padding-top: 40px;
  width: 200px;
  background-color: #fafafa;
  z-index: 10;

  -webkit-transition: all .4s cubic-bezier(0.895, 0.03, 0.685, 0.22);
  -moz-transition: all .4s cubic-bezier(0.895, 0.03, 0.685, 0.22);
  transition: all .4s cubic-bezier(0.895, 0.03, 0.685, 0.22);
}
.left-bar{
  @extend %pos;
  left: 0;
  border-right:1px solid #fff;
  box-shadow: 0 2px 5px rgba(0,0,0, .4), 0 4px 15px rgba(0,0,0, .2);

  &.close{
    left: -200px;

    & .bar-cntrl{
      right: -15px;

      & i{
        transform: rotate(180deg);
      }
    }
  }
}
.right-bar{
  @extend %pos;
  width: 280px;
  right: 0;
  border-left:1px solid #fff;
  box-shadow: 0 -2px 5px rgba(0,0,0, .4), 0 -4px 15px rgba(0,0,0, .2);

  &.close{
    right: -280px;

    & .bar-cntrl{
      left: -15px;

      & i{
        -webkit-transform: rotate(180deg);
        -moz-transform: rotate(180deg);
        transform: rotate(180deg);
      }
    }
  }
}
.bar-cntrl{
  position: absolute;
  right: -1px;
  top: 50%;
  margin-top: -20px;
  width: 14px;
  height: 40px;
  line-height: 40px;
  vertical-align: middle;
  background-color: #ff8040;
  color: #fff;
  cursor: pointer;

  -webkit-transition: all .1s linear .5s;
  -moz-transition: all .1s linear .5s;
  transition: all .1s linear .5s;

  & i{
    -webkit-transform: rotate(0deg);
    -moz-transform: rotate(0deg);
    transform: rotate(0deg);

    -webkit-transition: all .3s linear .5s;
    -moz-transition: all .3s linear .5s;
    transition: all .3s linear .5s;
  }
}
.right-bar .bar-cntrl{
  left: -1px;
}
.outer-html{
  outline: 1px dashed #ddd;
  outline-offset: -1px;
  z-index: 1;
}
.outer-html.active{
  outline: 2px dashed #f26a18;
}
.fa-2x{
  font-size: 1.5em;
}
.pre-code{
  div {
    overflow: auto;
    border-radius: 5px;
  }
}
.placeholder{
  height: 20px;
}
.el-textarea.is-disabled .el-textarea__inner{
  color: #666;
}
.cudialog{
  min-width: 800px;
}
</style>
