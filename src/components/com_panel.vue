<template>
  <div class="bar-cnt">
    <div class="bar-cnt--title ys-grid">
      <div class="ys-grid-row">
        <h4 class="ys-cell-12 mt-10"><i class="fa fa-file-o"></i> 页面结构</h4>
      </div>
    </div>
    <div class="bar-cnt--panel ys-grid">
      <div class="ys-grid-row">
        <div class="ys-cell-12">
          Content
        </div>
      </div>
    </div>

    <div class="bar-cnt--line">
    </div>

    <div class="bar-cnt--title ys-grid">
      <div class="ys-grid-row">
        <h4 class="ys-cell-12 mt-10"><i class="fa fa-cube"></i> 页面组件</h4>
      </div>
    </div>
    <div class="bar-cnt--panel ys-grid">
      <div class="ys-grid-row">
        <div class="ys-cell-12">
          <ul class="list-inline com-list">
            <li class="com-list--item">
              <i class="fa fa-pencil-square-o fa-lg"></i><br>
              面板
            </li>
            <li class="com-list--item">
              <i class="fa fa-columns fa-lg"></i><br>
              通栏图
            </li>
            <li class="com-list--item">
              <i class="fa fa-file-image-o fa-lg"></i><br>
              图片链接
            </li>
            <li class="com-list--item">
              <i class="fa fa-image fa-lg"></i><br>
              图片
            </li>
            <li class="com-list--item">
              <i class="fa fa-link fa-lg"></i><br>
              链接
            </li>
            <li class="com-list--item">
              <i class="fa fa-th-large fa-lg"></i><br>
              按钮
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'com-panel',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  }
}
</script>

<style lang="scss">
  .mt-10{
    margin-top: 10px;
  }
  .bar-cnt--panel{
    height: 300px;
  }
  .bar-cnt--line{
    width:100%;
    height:4px;
    background-color: #eee;
  }
  .com-list{
    margin: 0 -10px 0 -10px;
    word-spacing: -6px;
    
    & .com-list--item{
      height: 60px;
      padding-top: 12px;
      text-align: center;
      width: 33.33%;
      word-spacing: 0;
      border: 1px solid transparent;
      vertical-align: top;
      font-size: 12px;

      &:nth-child(3n){
        border-right: 0;
      }

      &:hover, &:focus, &.active{
        background-color: rgba(228, 94, 13, .4);
        border: 1px solid rgb(228, 94, 13);
      }
    }
  }
</style>
