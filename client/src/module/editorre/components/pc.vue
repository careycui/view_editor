<template>
  <div id="editor-inner" v-window="getWindow">
    <div class="top-bar">
      <top-bar @openCode="openCode" :innerHtml='html' @savePage="savePage" @openBaseData="openBaseData" @openPreview="openPreview" @openGlobal="openGlobal"></top-bar>
    </div>
    <component-ctrl></component-ctrl>
    <control-panel></control-panel>

    <div class="app-content pc" :style="[wrect]">
      <preview-panel></preview-panel>
    </div>

    <lines :line="line" :wrect="wrect"></lines>

    <el-dialog title="HTML CODES" custom-class="cudialog" :visible.sync="dialogVisible" size="small" :close-on-click-modal="false">
      <div class="pre-code ys-grid">
          <el-row>
            <el-col :span="20">
              <el-input :autosize="{minRows: 8, maxRows: 16}" type="textarea" :value="html" resize="none" ref="htmlText" :autofocus="true"></el-input>
            </el-col>
            <el-col :span="4">
              <el-button type="warning" class="br2" @click="selectAll">
                <i class="fa fa-clipboard"></i> 全选复制
              </el-button>
              <div class="placeholder"></div>
            </el-col>
          </el-row>
      </div>
    </el-dialog>

    <preview :visible="isPreview" :srcdoc="html" @updateVisible="updateVisible"></preview>
    <el-dialog title="页面信息" size="small" :visible.sync="baseDialogVisible" :close-on-click-modal="false" :modal-append-to-body="false" custom-class="dialog-size">
      <el-row v-if="baseData">
        <el-col :md="10" :xs="24" :sm="24" style="text-align:center;">
          <div class="project-card" style="margin:0;">
              <div class="project-card--img">
                <img :src="baseData.img_cover">
              </div>
              <div class="project-card--title">
                {{ baseData.title || '未命名页面' }}
              </div>
              <div class="project-card--desc">
                {{ baseData.desc || '未添加描述' }}
              </div>
              <div class="project-card--sign">
                <img src="//mfs.ys7.com/mall/1749a21b9221474c593e251dc32c739d.png" v-if="baseData.page_type === 0">
                <img src="//mfs.ys7.com/mall/91b7d8245f8a0006f45e35fbb21734cb.png" v-if="baseData.page_type === 1">
              </div>
          </div>
        </el-col>
        <el-col :md="14" :xs="24" :sm="24">
          <el-form label-position="top" label-width="80px">
            <el-form-item label="封面图" :form="baseData">
              <el-input size="small" v-model="baseData.img_cover">
                <template slot="prepend">URL</template>
              </el-input>
            </el-form-item>
            <el-form-item label="页面名称">
              <el-input size="small" v-model="baseData.title"></el-input>
            </el-form-item>
            <el-form-item label="页面描述">
              <el-input type="textarea" :rows="3" size="small" v-model="baseData.desc"></el-input>
            </el-form-item>
            <el-form-item label="页面类型">
              <el-input :disabled="true" :value="baseData.page_type === 0?'BASE':'H5'"></el-input>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
      <div slot="footer" class="dialog-footer">
          <el-button @click="baseDialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="submitBase">确 定</el-button>
        </div>
    </el-dialog>
    <el-dialog title="页面全局设置" size="small" custom-class="dialog-size" :visible.sync="globalView">
      <el-row>
        <el-col>
          <el-input type="textarea" :rows="15" v-model="newCss"></el-input>
        </el-col>
      </el-row>
      <div slot="footer" class="dialog-footer">
        <el-button @click="globalView = false">取 消</el-button>
        <el-button type="primary" @click="updateCss">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import PreviewPanel from './pc/preview_panel'
import ComponentCtrl from './pc/component_ctrl'

import ControlPanel from './common/control_panel'
import Lines from './common/lines'
import TopBar from './common/top_bar'
import { Message } from 'element-ui'
import { Loading } from 'element-ui'

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
    PreviewPanel, Lines, TopBar, Preview, ControlPanel, ComponentCtrl
  },
  data () {
    return {
      line: {
        left: {}
      },
      wrect : {
        width: '1920px',
        height: '1080px'
      },
      dialogVisible: false,
      baseDialogVisible: false,
      html: '',
      isPreview: false,
      globalView: false,
      newCss: ''
    }
  },
  computed:{
    currentComKey () {
      return this.$store.getters.getCurrentComKey;
    },
    baseData () {
      return this.$store.getters.getBaseData;
    },
    extraCss () {
      return this.$store.getters.getCss;
    }
  },
  mounted (){
    this.newCss = this.extraCss;
  },
  methods:{
    openCode () {
      let _this = this;
      this.savePage(() => {
        _this.dialogVisible = true;
      });
    },
    setLine (obj) {
      this.line = obj;
    },
    getWindow (obj) {
      this.wrect.width = obj.w + 'px';
      this.wrect.height = obj.h + 'px';
    },
    setHtml () {
      let $cnt = this.$el.querySelector('#preview').cloneNode(true);
      let $operate = $cnt.querySelector('.operate-box');
      if($operate){
        $cnt.removeChild($operate);
      }
      let html = $cnt.innerHTML.replace(/(&quot;)+/g, '\'').replace(/(data\-v\-[\w]+\=[\"]{2})+/g, '').replace(/(\n)+/g, '')
                                .replace(/(\<\![\-]{4}\>)+/g, '').replace(/active/g, '')+'\n';
      html = html;
      this.html = html;
    },
    savePage (callback) {
      let loading = Loading.service();
      this.setHtml();
      let htmlData = JSON.stringify(this.html);
      let pageData = JSON.stringify(this.$store.getters.getPageData);
      let css = this.$store.getters.getCss;
      let type = this.baseData.t_type;
      let id = this.baseData.id;

      this.$http({
        url: G.API.host+ type +'/savepage',
        method: 'post',
        data: {
          id: id,
          html_data: htmlData,
          page_data: pageData,
          css: css
        },
        responseType: 'json'
      }).then(function(res){
        loading.close();
        callback && callback();
        Message({
          message: '保存成功',
          showClose: true,
          type: 'info'
        });
      },function(err){
        loading.close();
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
      let _this = this;
      this.savePage(() => {
        _this.isPreview = true;
      });
    },
    updateVisible (val) {
      this.isPreview = val;
    },
    openBaseData () {
      this.baseDialogVisible = !this.baseDialogVisible;
    },
    openGlobal () {
      this.globalView = true;
    },
    updateCss () {
      this.globalView = false;
      this.$store.dispatch('updateCss', this.newCss);
    },
    submitBase () {
      var _this = this;
      this.$http({
        url: G.API.host+ _this.baseData.t_type +'/update',
          method: 'POST',
          data:_this.baseData,
          responseType: 'json'
        }).then(function(res){
          _this.baseDialogVisible = false;
        }, function(err,xhr){
          Message({
            message: '保存失败,请稍后再试',
            showClose: true,
            type: 'error'
          });
        });
    }
  }
}
</script>

<style lang="scss">
@import '/static/component.css';
.app-content.pc{
  position: relative;
  width: 100%;
  margin: 50px auto;
  padding: 4px 0;
  overflow: auto;
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
    text-align: center;
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
