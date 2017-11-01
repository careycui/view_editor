<template>
  <div id="editor">
    <component :is="comName"></component>
  </div>
</template>

<script>
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
      platformType: 0
    }
  },
  computed: {
    comName () {
      return (this.platformType === 0?'pc':'mobile');
    }
  },
  created () {
    var id = getQueryString('key');
    var type = getQueryString('t_type');
    this.$store.dispatch('setBase', {id:id, type:type});
  },
  methods :{

  }
}
</script>

<style lang="scss">
#editor{
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}
</style>
