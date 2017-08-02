<template>
	<div class="line-container">
	    <div class="v-l" :style="[line.left,{height:wrect.height}]"></div>
	    <div class="v-m" :style="line.vertical"></div>
	    <div class="v-r"></div>
	    <div class="h-t" :style="[line.top,{width:wrect.width}]"></div>
	    <div class="h-m" :style="line.horizon"></div>
	    <div class="h-b"></div>
    </div>
</template>
<script>
	export default{
		name: 'lines',
		props: ['line', 'wrect']
	}
</script>
<style scoped lang="scss">
	.line-container{
	  position: absolute;
	  width:0;
	  height:0;
	  left:0;
	  top:0;
	}
	.v-l, .v-m, .v-r{
	  position: absolute;
	  border-left: 1px solid #0190fe;

	  height: 100px;
	  top: 0;
	}
	.v-m{
	  border-left-style: dashed;
	}
	.h-t, .h-m, .h-b{
	  position: absolute;
	  border-top: 1px solid #0190fe;

	  width: 100px;
	  left: 0;
	}
	.h-m{
	  border-top-style: dashed;
	}
</style>