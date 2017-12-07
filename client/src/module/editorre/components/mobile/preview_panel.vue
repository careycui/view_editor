<template>
	<div class="preview-mobile" id="preview">
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
	  	filters: {
	  		copyObj (obj) {
		  		let type = Object.prototype.toString.call(obj)
		  		if( type === '[object Object]' || type === '[object Array]'){
			  		let copyObj = JSON.parse(JSON.stringify(obj));
			  		return copyObj;
		  		}else{
		  			return obj;
		  		}
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
	.preview-mobile{
		position: absolute;
		width: 375px;
		height: 603px;
		left: 50%;
		z-index: 10;

	 	-webkit-transform: translate(-50%, 0);
      	-moz-transform: translate(-50%, 0);
      	transform: translate(-50%, 0);
	}
</style>