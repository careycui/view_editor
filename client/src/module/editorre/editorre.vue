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
      url: 'http://localhost:3030/'+ type +'/getPage/'+ id,
      method: 'get',
      responseType: 'json'
    }).then(function(result){
      const data = result.data;
      _this.$store.dispatch('setPageContent', { base:{
          id: data.id,
          title: data.title,
          desc: data.desc,
          page_data: data.page_data,
          t_type: data.t_type,
          platform_type: data.platform_type,
          page_type: data.page_type
        }, page: JSON.parse(data.page_data)}).then(() => {
          if(data.platform_type === 1){
            _this.comName = 'mobile';
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
</style>
