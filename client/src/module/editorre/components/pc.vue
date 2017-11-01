<template>
  <div id="editor-inner" v-window="getWindow">
    <div class="top-bar">
      <top-bar @openCode="openCode" :innerHtml='html' @savePage="savePage" @openPreview="openPreview"></top-bar>
    </div>
    <coms-ctrl></coms-ctrl>

    <control-panel></control-panel>

    <div class="app-content">
      <preview-panel></preview-panel>
    </div>

    <lines :line="line" :wrect="wrect"></lines>

    <el-dialog title="HTML CODES" custom-class="cudialog" :visible.sync="dialogVisible" size="small" :close-on-click-modal="false" @open="setHtml">
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
    <preview :visible="isPreview" :srcdoc="html" @updateVisible="updateVisible"></preview>
  </div>
</template>

<script>
import PreviewPanel from './pc/preview_panel'
import ComsCtrl from './pc/coms_ctrl'

import ControlPanel from './common/control_panel'
import Lines from './common/lines'
import TopBar from './common/top_bar'
import { Message } from 'element-ui'

import Preview from './common/preview_dialog'

var getQueryString = function (name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);  //获取url中"?"符后的字符串并正则匹配
    var context = "";
    if (r != null)
         context = r[2];
    reg = null;
    r = null;
    return context == null || context == "" || context == "undefined" ? "" : context;
}

export default {
  name: 'pc',
  components: {
    PreviewPanel, Lines, TopBar, Preview, ControlPanel, ComsCtrl
  },
  data () {
    return {
      platformType: 1,
      line: {
        left: {}
      },
      wrect : {
        width: '1920px',
        height: '1080px'
      },
      dialogVisible: false,
      html: '',
      isPreview: false
    }
  },
  computed:{
    currentComKey () {
      return this.$store.getters.getCurrentComKey;
    }
  },
  created () {
    var id = getQueryString('key');
    var type = getQueryString('t_type');
    this.$store.dispatch('setBase', {id:id, type:type});
  },
  methods:{
    openCode () {
      this.dialogVisible = true;
    },
    setLine (obj) {
      this.line = obj;
    },
    getWindow (obj) {
      this.wrect.width = obj.w + 'px';
      this.wrect.height = obj.h + 'px';
    },
    setHtml () {
      let css = '<link rel="stylesheet" type="text/css" href="http://localhost:8080/static/component.css" />' ;
      let css1 = '<link rel="stylesheet" type="text/css" href="http://localhost:8080/static/animate-min.css" />' ;
      let lib = '\<script type="text/javascript" src="http://localhost:8080/static/jquery.min.js"\>\<\/script\>';
      let lib1 = '\<script type="text/javascript" src="http://localhost:8080/static/img-slide-min.js"\>\<\/script\>';
      let lib2 = '\<script type="text/javascript" src="http://localhost:8080/static/aniview-min.js"\>\<\/script\>';
      let page = '\<script type="text/javascript" src="http://localhost:8080/static/page.js"\>\<\/script\>';

      let $cnt = this.$el.querySelector('.app-content');
      let html = $cnt.innerHTML.replace(/(&quot;)+/g, '\'').replace(/(data\-v\-[\w]+\=[\"]{2})+/g, '').replace(/(\n)+/g, '')
                                .replace(/(\<\![\-]{4}\>)+/g, '').replace(/active/g, '');
      html = css + css1 + lib + lib2  + html + page;
      this.html = html;
    },
    savePage () {
      this.setHtml();
      var formData = JSON.stringify(this.$store.getters.getForms);
      var htmlData = JSON.stringify(this.html);
      var pageData = JSON.stringify(this.$store.getters.getPage);
      var type = getQueryString('t_type');
      var id = getQueryString('key');
      this.$http({
        url: 'http://localhost:3030/'+ type +'/savepage',
        method: 'post',
        data: {
          id: id,
          form_data: formData,
          html_data: htmlData,
          page_data: pageData
        },
        responseType: 'json'
      }).then(function(res){
        Message({
          message: '保存成功',
          showClose: true,
          type: 'info'
        });
      },function(err){
        Message({
          message: '保存失败，请稍后再试',
          showClose: true,
          type: 'error'
        });
      });
    },
    selectAll () {
      let $area = this.$refs.htmlText.$el.querySelector('textarea');
      $area.focus();
      $area.select();
      document.execCommand('copy');
    },
    openPreview () {
      this.setHtml();
      this.isPreview = true;
    },
    updateVisible (val) {
      this.isPreview = val;
    }
  }
}
</script>

<style lang="scss">
.app-content{
  position: relative;
  width: 100%;
  margin: 50px auto;
}
.top-bar{
  position: fixed;
  top: 0;
  width: 100%;
  height: 40px;
  background-color: #20A0FF;
  background-image: linear-gradient(45deg, #20A0FF, #a8de69);
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.4);
  z-index: 100;
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
.ani-stage{
    -webkit-perspective: 500px;
    -moz-perspective: 500px;
    perspective: 500px;
    -webkit-transform-style: preserve-3d;
    -moz-transform-style: peserve-3d;
    transform-style: preserve-3d;
}
.ani-ele{
  opacity: 1;
  -webkit-animation-fill-mode: both;
  -moz-animation-fill-mode: both;
  animation-fill-mode: both;
}
</style>
