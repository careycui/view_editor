<template>
  <div id="app">
    <div class="top-bar">
      <div class="ys-grid-row">
        <div class="ys-cell-3 top-bar--title">
          <h3>崔氏页面编辑器 <small>V 0.0.1</small></h3>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Hello from './components/main'

export default {
  name: 'app'
}
</script>

<style>
@import '/static/sys.min.css';
.top-bar{
  position: fixed;
  top: 0;
  width: 100%;
  height: 40px;
  background-color: #333;
}
.top-bar--title{
  height: 40px;
  vertical-align: middle;
  line-height: 40px;
  color: #f1f1f1;
}
.top-bar--title h3{
  font-weight: normal;
}
.top-bar--title h3 small{
  color: #f1f1f1;
}
</style>
