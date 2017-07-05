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
      <com-panel></com-panel>
    </div>
    <div class="right-bar">
      <editor-panel></editor-panel>
    </div>
  </div>
</template>

<script>
import Hello from './components/main'
import ComPanel from './components/com_panel'
import EditorPanel from './components/editor_panel'

export default {
  name: 'app',
  components: {
    ComPanel,EditorPanel
  }
}
</script>

<style lang="scss">
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
}
.left-bar{
  @extend %pos;
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
