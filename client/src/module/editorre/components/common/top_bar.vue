<template>
	<div class="ys-grid-row">
        <div class="ys-cell-3 top-bar--title">
          <span class="back-home">
            <a href="/module/home.html">
              <i class="fa fa-home fa-2x"></i>
            </a>
          </span>
          <h3>页面编辑器 <small>V 0.1.0</small></h3>
        </div>
        <div class="ys-cell-3 top-bar--btn">
          <el-tooltip :open-delay="500" content="导出HTML">
            <button class="ys-btn ys-btn-sm ys-btn--c" @click="openCodeDialog"><i class="fa fa-code fa-2x"></i></button>
          </el-tooltip>
          <el-tooltip :open-delay="500" content="保存">
            <button class="ys-btn ys-btn-sm ys-btn--c" @click="handleSave"><i class="fa fa-floppy-o fa-2x"></i></button>
          </el-tooltip>
          <el-tooltip :open-delay="500" content="预览">
            <button class="ys-btn ys-btn-sm ys-btn--c" @click="preview"><i class="fa fa-eye fa-2x"></i></button>
          </el-tooltip>
        </div>
    </div>
</template>
<script>

export default {
	name: 'topBar',
	props: ['innerHtml'],
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
		}
	}
}
</script>
<style scoped lang="scss">
.top-bar--title, .top-bar--btn{
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
.top-bar--btn{
  padding-right: 20px;
  float: right;
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
</style>