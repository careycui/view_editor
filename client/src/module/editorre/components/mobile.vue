<template>
  <div id="editor-inner" v-window="getWindow">
    <div class="top-bar">
      <top-bar @openCode="openCode" :innerHtml='html' @savePage="savePage" @openBaseData="openBaseData" @openPreview="openPreview" @openGlobal="openGlobal"></top-bar>
    </div>
    <component-ctrl></component-ctrl>
    <control-panel></control-panel>

    <div class="app-content mobile">
      <div class="mobile-inner" :style="[client]">
        <preview-panel :style="[client]"></preview-panel>
      </div>
    </div>
    <scale-ctrl></scale-ctrl>
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
          </div>
        </div>
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
              <el-input :disabled="true" :value="baseData.page_type === 0?'baseData':'H5'"></el-input>
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
import PreviewPanel from './mobile/preview_panel'
import ComponentCtrl from './mobile/component_ctrl'
import ScaleCtrl from './mobile/scale'

import ControlPanel from './common/control_panel'
import Lines from './common/lines'
import TopBar from './common/top_bar'
import Preview from './common/preview_dialog'

import { Message } from 'element-ui'
import { Loading } from 'element-ui'

import MC from './../../../sys_components/utils/mobile_util.js'

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
  name: 'mobile',
  components: {
    PreviewPanel, Lines, TopBar, Preview, ControlPanel, ComponentCtrl, ScaleCtrl
  },
  data () {
    return {
      line: {
        left: {}
      },
      wrect : {
        width: '375px',
        height: '667px'
      },
      dialogVisible: false,
      baseDialogVisible: false,
      html: '',
      isPreview: false,
      globalView: false,
      newCss: '',
      client:{
        width: '375px',
        height: '603px'
      }
    }
  },
  computed:{
    currentComKey () {
      return this.$store.getters.getCurrentComKey;
    },
     baseData () {
      return this.$store.getters.getBaseData;
    },
    clientWidth () {
      return this.$store.getters.clientWidth;
    },
    extraCss () {
      return this.$store.getters.getCss;
    }
  },
  mounted (){
    this.newCss = this.extraCss;
  },
  watch:{
    clientWidth (n, o) {
      let w = n;
      let h = MC.getWrect(n);
      this.client.width = w + 'px';
      this.client.height = h + 'px';
      document.documentElement.style.fontSize = MC.getBaseFt(w) + 'px';
      this.$store.dispatch('changeComKey', '');
    }
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
                                .replace(/(\<\![\-]{4}\>)+/g, '').replace(/active/g, '');
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
        url: G.API.host + _this.baseData.t_type +'/update',
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
  },
  mounted () {
    document.documentElement.style.fontSize = MC.getBaseFt(this.$store.getters.clientWidth) + 'px';
  }
}
</script>

<style lang="scss">
@import '/static/ezviz-m.css';
.app-content.mobile{
    position: absolute;
    right: 250px;
    left: 0;
    height: 100%;
    padding: 50px 0 40px 0;
    overflow-y: auto;

    & .mobile-inner{
      position: relative;
      width: 375px;
      height: 603px;
      left: 50%;
      top: 0;
      z-index: 10;
      overflow-y: auto;
      overflow-x: hidden;
      outline: 2px solid #20A0FF;
      background-color: #fff;
      box-shadow: 0px 4px 15px rgba(0,0,0,.6);

      -webkit-transform: translate(-50%, 0);
      -moz-transform: translate(-50%, 0);
      transform: translate(-50%, 0);
    }

    & .mobile-after{
      position: absolute;
      height: 603px;
      width: 375px;
      left: 50%;
      top: 50%;
      padding: 20px 10px;
      background-color: #fff;
      border-radius: 15px;

      -webkit-transform: translate(-50%, -50%);
      -moz-transform: translate(-50%, -50%);
      transform: translate(-50%, -50%);

      box-sizing: content-box;
    }
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
