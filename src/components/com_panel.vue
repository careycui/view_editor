<template>
  <div class="bar-cnt">
    <div class="bar-cnt--title ys-grid">
      <div class="ys-grid-row">
        <h4 class="ys-cell-12 mt-10 margin-no--b"><i class="fa fa-file-o"></i> 页面结构</h4>
      </div>
    </div>
    <hr>
    <div class="bar-cnt--panel ys-grid" style="height:30px;">
      <div class="ys-grid-row">
          <div class="ys-cell-12 title-line">
            <div class="title-line-t">
              <button class="ys-btn toolbar-btn" @click="deletePage"><i class="fa fa-trash"></i></button>
            </div>
          </div>
      </div>
    </div>
    <div class="bar-cnt--panel ys-grid">
      <div class="ys-grid-row">
          <div class="ys-cell-12">
            <el-tree 
              :data="treeData" 
              node-key="key" 
              ref="tree"
              show-checkbox
              check-strictly
              :auto-expand-parent="true"
              :default-expand-all="true"
              :default-checked-keys="defaultChecks"
              @check-change="handleChange"
              highlight-current>
            </el-tree>
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
          <div class="list-title">
            <i class="fa fa-chevron-down"></i> 布局
          </div>
          <ul class="list-inline com-list">
            <li class="com-list--item" @click="add('sectionPanel')">
              <i class="fa fa-pencil-square-o fa-lg"></i><br>
              面板
            </li>
          </ul>
        </div>
        <div class="ys-cell-12">
          <div class="list-title">
            <i class="fa fa-chevron-down"></i> 组件
          </div>
          <ul class="list-inline com-list">
            <li class="com-list--item" @click="add('banner')">
              <i class="fa fa-columns fa-lg"></i><br>
              通栏图
            </li>
            <li class="com-list--item" @click="add('imageLink')">
              <i class="fa fa-file-image-o fa-lg"></i><br>
              图片链接
            </li>
          </ul>
        </div>
        <div class="ys-cell-12">
          <div class="list-title">
            <i class="fa fa-chevron-down"></i> 元素
          </div>
          <ul class="list-inline com-list">
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
import { mapState } from 'vuex'
import { Message } from 'element-ui'
export default {
  name: 'com-panel',
  props:{
    addcom:{
      type: Function,
      default: null
    },
    addmain:{
      type: Function,
      default: null
    }
  },
  computed:{
    page () {
      return this.$store.getters.getPage;
    },
    currentDom () {
      return this.$store.getters.getCDOM;
    },
    treeData () {
      return new Array(this.page);
    },
    defaultChecks () {
      return new Array(this.currentDom);
    }
  },
  methods:{
    add (type) {
      if(this.addcom){
        this.addcom(type, () => {
          this.$refs.tree.setCheckedKeys([this.currentDom]);
        });
      }
    },
    addPage (){
      if(this.addmain){ 
        this.addmain(() => {
          this.$refs.tree.setCheckedKeys([this.currentDom]);
        });
      }
    },
    deletePage () {
      if(this.selected && this.selected!='0'){
        let currCom = this.page;
        let index = 0;
        
        let _get = function(curr,key){
            for (let i=0;i<curr.children.length;i++) {
              let item = curr.children[i];
              if(item.key ===  key){
                currCom = item;
                index = i;
                break;
              }else{
                if(item.children){
                  _get(item, key);
                }
              }
            }
        }
        _get(currCom, this.selected);//获得当前选中组件
        //获得当前组件的父容器
        if(currCom._parent_ === this.page.key){
          currCom = this.page;
        }else{
         _get(this.page, currCom._parent_);
        }
        debugger;
        this.$store.dispatch('deleteCom', {key: this.selected, currCom: currCom, index: index}).then(() => {
          this.selected = '';
        });
      }else{
        Message({
          showClose:true,
          message: '未选中组件或当前组件不可删除',
          type: 'error',
          duration: 0
        });
      }
    },
    handleChange (data, checked, haveChecked) {
      if(checked){
        this.selected = data.key;
        this.$store.commit('SET_CDOM',data.key);
        this.$refs.tree.setCheckedKeys([this.currentDom]);
      }
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
  .list-title{
    padding: 5px 10px;
    margin: 0 -10px;
    border-top: 1px solid #bfbfbf;
  }
  .el-tree-node__expand-icon{
      border: 6px solid transparent;
      border-right-width: 0;
      border-left-color: rgb(190, 170, 151);
      border-left-width: 8px;
  }
  .el-tree-node__content {
    line-height: 24px;
    height: 24px;
    cursor: pointer;
  }
  .el-tree-node__label {
    font-size: 12px;
  }
</style>
