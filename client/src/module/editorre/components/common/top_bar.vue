<template>
	<div class="ys-grid-row">
        <div class="ys-cell-3 top-bar--title">
          <h3>页面编辑器 <small>V 0.0.1</small></h3>
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