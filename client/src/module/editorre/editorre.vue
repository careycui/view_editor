<template>
  <div id="editor">
    <component :is="comName"></component>
  </div>
</template>

<script>
import Vue from 'vue'
import Pc from './components/pc'
import Mobile from './components/mobile'

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
  name: 'editor',
  components: {
    Pc, Mobile
  },
  data () {
    return {
      comName: ''
    }
  },
  created () {
    var id = getQueryString('key');
    var type = getQueryString('t_type');
    const _this = this;
    this.$http({
      url: G.API.host+ type +'/getPage/'+ id,
      method: 'get',
      responseType: 'json'
    }).then(function(result){
      const data = result.data;
      _this.$store.dispatch('setPageContent', { base:{
          id: data.id,
          title: data.title,
          desc: data.desc,
          img_cover: data.img_cover,
          page_data: data.page_data,
          css: data.css,
          t_type: data.t_type,
          platform_type: data.platform_type,
          page_type: data.page_type
        }, page: JSON.parse(data.page_data)}).then(() => {
          if(data.platform_type === 1){
            _this.comName = 'mobile';
            _this.$store.dispatch('setClientWidth', G.M.clientWidth);
          }else{
            _this.comName = 'pc';
          }
        });
    },function(err){

    });
  },
  methods :{

  }
}
</script>

<style lang="scss">
html, body{
  overflow: hidden;
}
#editor{
  overflow: hidden;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}
.project-card--sign{
    position: absolute;
    left: 0;
    top: 0;
  }
.project-card{
    position: relative;
    display:inline-block;
    vertical-align: top;
    width: 200px;
    height: 240px;
    margin-right: 30px;
    margin-bottom: 20px;
    background-color: #fff;
    border-radius: 5px;
    overflow: hidden;
    box-shadow: 0 2px 4px rgba(0,0,0,0.05);
    -webkit-transform: translate3d(0, 0, 0);
    -moz-transform: translate3d(0, 0, 0);
    -ms-transform: translate3d(0, 0, 0);
    transform: translate3d(0, 0, 0);

    -webkit-transition: all .45s;
    -moz-transition: all .45s;
    transition: all .45s;

    & .project-card--img{
      width: 100%;
      height: 180px;
      border-top-left-radius: 5px;
      border-top-right-radius: 5px;
      overflow: hidden;
      text-align: center;

      & img{
        display: inline-block;
        height: 100%;
        max-width: 100%;
      }
    }
    & .project-card--title{
      padding: 5px 10px;
      text-align: center;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
        color: #324057;
    }
    & .project-card--desc{
      padding: 0px 10px;
      font-size: 12px;
      text-align: center;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
        color: #99A9BF;
    }
    & .project-card--btns{
      position: absolute;
      left: 0;
      top: 0;
      padding-top: 50px;
      width: 200px;
      height: 180px;
      border-top-left-radius: 5px;
      border-top-right-radius: 5px;
      text-align: center;
      z-index: 10;
      background-color: rgba(0,0,0, .6);
      visibility: hidden;
      opacity: 0;

      -webkit-transition: all .3s;
      -moz-transition: all .3s;
      transition: all .3s;

      & .update-time{
        display: block;
        color: #fff;
        text-align:center;
        line-height: 1.5;
        font-size: 12px;
      }

    }
    .bottom-bar{
      position: absolute;
      bottom: 0;
      width: 100%;
      height: 30px;
      padding: 4px 10px;
      background-color: #fff;
      word-spacing: -8px;
      text-align: right;
      -webkit-transform: translate3d(0, 40px, 0);
      -moz-transform: translate3d(0, 40px, 0);
      -ms-transform: translate3d(0, 40px, 0);
      transform: translate3d(0, 40px, 0);
      -webkit-transition: all .25s;
      -moz-transition: all .25s;
      -ms-transition: all .25s;
      transition: all .25s;
    }

    &:hover{
      box-shadow: 0 8px 15px rgba(0,0,0,0.15);
      -webkit-transform: translate3d(0, -5px, 0);
      -moz-transform: translate3d(0, -5px, 0);
      -ms-transform: translate3d(0, -5px, 0);
      transform: translate3d(0, -5px, 0);

      & .project-card--btns{
        visibility: visible;
        opacity: 1;
      }

      & .bottom-bar{
        -webkit-transform: translate3d(0, 0, 0);
        -moz-transform: translate3d(0, 0, 0);
        -ms-transform: translate3d(0, 0, 0);
        transform: translate3d(0, 0, 0);
      }
    }
  }
</style>
