<template>
  <el-row>
    <el-col class="top-bar__title" :span="6">
          <span class="back-home">
            <a href="/module/home.html">
              <i class="fa fa-home fa-2x"></i>
            </a>
          </span>
          <h3>页面编辑器 <small>V 0.1.0</small></h3>
    </el-col>
    <el-col class="top-bar__data" :span="6" :offset="3">
      <div class="base-title" @click="openBaseEditor">
        {{ base.title }}
        <i class="el-icon-edit"></i>
      </div>
    </el-col>
    <el-col class="top-bar__btn" :span="6" :offset="3">
          <el-tooltip :open-delay="500" content="导出HTML">
            <button class="ys-btn ys-btn-sm ys-btn--c" @click="openCodeDialog"><i class="fa fa-code fa-2x"></i></button>
          </el-tooltip>
          <el-tooltip :open-delay="500" content="保存">
            <button class="ys-btn ys-btn-sm ys-btn--c" @click="handleSave"><i class="fa fa-floppy-o fa-2x"></i></button>
          </el-tooltip>
          <el-tooltip :open-delay="500" content="预览">
            <button class="ys-btn ys-btn-sm ys-btn--c" @click="preview"><i class="fa fa-eye fa-2x"></i></button>
          </el-tooltip>
    </el-col>
  </el-row>
</template>
<script>

export default {
	name: 'topBar',
	props: ['innerHtml'],
  data () {
    return {
      baseDialogVisible: false
    }
  },
  computed:{
    base () {
      return this.$store.getters.getBaseData;
    }
  },
	methods : {
		barChange (type) {
			this.$emit('barChange', type);
		},
		openCodeDialog () {
			this.$emit('openCode');
		},
		preview () {
			this.$emit('openPreview');
		},
		handleSave () {
      this.$emit('savePage');
		},
    openBaseEditor () {
      this.$emit('openBaseData');
    }
	}
}
</script>
<style scoped lang="scss">
.top-bar__title, .top-bar__btn{
  height: 40px;
  line-height: 40px;
  vertical-align: middle;
  color: #f1f1f1;

  & .back-home{
    display: block;
    float: left;
    width: 60px;
    margin: 10px 0;
    line-height: 20px;
    text-align: center;
    border-right: 1px solid rgba(255,255,255, 0.3);
    cursor: pointer;
  }

  & h3{
    font-weight: normal;
    margin-left: 60px;
    padding-left: 10px;

    & small{
      color: #F1F1F1;
    }
  }
}
.top-bar__data{
  padding: 5px 0;
  height: 40px;
  color: #f1f1f1;
  text-align: center;

  & .base-title{
    position: relative;
    border-radius: 5px;
    line-height: 30px;
    vertical-align: middle;
    background-color: rgba(0,0,0, .3);
  }
}
.top-bar__btn{
  padding-right: 20px;
  text-align: right;
}
.ys-btn--c{
  padding: 0;
  text-align: center;
  width: 40px;
  color: #f1f1f1;

  & i{
    vertical-align: middle;
  }
}
.ys-btn--c:hover{
  background-color: rgba(0,0,0, .3);
}
.dialog-size{
    max-width: 800px;
    background-color: #D3DCE6;
    z-inex: 3000;
  }
</style>