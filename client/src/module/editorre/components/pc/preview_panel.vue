<template>
	<div class="preview-pc" id="preview">
      	<preview-render
      		:model="com"
      		:key="com.$$key"
      		v-for="com in page" v-if="page && page.length > 0">
      	</preview-render>
      	<operate-box v-if="currentComKey"></operate-box>
	</div>
</template>
<script>
import PreviewRender from './../common/preview_render'
	export default {
		name: 'previewPanel',
		components:{
			PreviewRender
		},
		computed: {
			page () {
				return this.$store.getters.getPageData;
			},
			currentComKey (){
				return this.$store.getters.getCurrentComKey;
			}
		},
	  	methods:{
	  		changCurrKey (key) {
	  			this.$store.dispatch('changeComKey', key);
	  		}
	  	}
	}
</script>
<style>
	.preview-pc{
		position: relative;
		width: 1920px;
		left: 50%;
		margin-left: -960px;
	}
</style>