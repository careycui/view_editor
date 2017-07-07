<template>
  <div class="bar-cnt">
    <div class="bar-cnt--title ys-grid">
      <div class="ys-grid-row">
        <h4 class="ys-cell-12 mt-10 margin-no--b"><i class="fa fa-file-o"></i> 页面结构</h4>
      </div>
    </div>
    <hr>
    <div class="bar-cnt--panel ys-grid">
      <div class="ys-grid-row">
          <div class="ys-cell-12 title-line">
            <div class="title-line-t">
              <button class="ys-btn toolbar-btn" @click="addPage"><i class="fa fa-plus"></i></button>
              <button class="ys-btn toolbar-btn" @click="deletePage"><i class="fa fa-trash"></i></button>
            </div>
          </div>
          <div class="ys-cell-12">
            <ul class="list-unstyle page-construct">
              <li v-for="con in page">
                页面
              </li>
            </ul>
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
            <li class="com-list--item" @click="add('sectionPanel')">
              <i class="fa fa-pencil-square-o fa-lg"></i><br>
              面板
            </li>
            <li class="com-list--item" @click="add('banner')">
              <i class="fa fa-columns fa-lg"></i><br>
              通栏图
            </li>
            <li class="com-list--item" @click="add('imageLink')">
              <i class="fa fa-file-image-o fa-lg"></i><br>
              图片链接
            </li>
            <li class="com-list--item" @click="add('imageEle')">
              <i class="fa fa-image fa-lg"></i><br>
              图片
            </li>
            <li class="com-list--item" @click="add('linkEle')">
              <i class="fa fa-link fa-lg"></i><br>
              链接
            </li>
            <li class="com-list--item" @click="add('btnEle')">
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
  props:{
    page : {
      type: Array,
      default: {}
    },
    addcom:{
      type: Function,
      default: null
    },
    addmain:{
      type: Function,
      default: null
    }
  },
  created () {
    console.log(this);
  },
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  methods:{
    add (type) {
      if(this.addcom){
        this.addcom(type);
      }
    },
    addPage (){
      if(this.addmain){
        this.addmain();
      }
    },
    deletePage () {

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
      cursor: pointer;

      &:nth-child(3n){
        border-right: 0;
      }

      &:hover, &:focus, &.active{
        background-color: rgba(228, 94, 13, .4);
        border: 1px solid rgb(228, 94, 13);
      }
    }
  }
  .title-line{
    height: 22px;
    padding: 0 10px;
    margin-bottom: 5px;
    line-height: 22px;
    vertical-align: middle;

    & .title-line-t{
      padding-left: 10px;
      border-top: 1px solid #b9b9b9;
      border-bottom: 1px solid #b9b9b9;
      background-color: #e2e2e2;
    }
  }
  .margin-no--b{
    margin-bottom: 0;
  }
  .toolbar-btn{
    height: 22px;
    line-height: 22px;
    font-size: 12px;
    padding: 0 8px;
    min-width: auto;
    vertical-align: middle;
  }
  .page-construct{
    font-size: 12px;
  }
</style>
