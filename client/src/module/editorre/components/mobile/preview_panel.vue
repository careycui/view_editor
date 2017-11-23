<template>
	<div class="preview-mobile" id="preview">
		<component 
			v-if="page" 
			:is="pc.$$comKey" 
			:id="pc.id" 
			:key="pc.$$key" 
			v-for="pc in page" :data="pc | copyObj" 
			:ref="pc.$$key">
        	<component 
        		:is="spc.$$comKey" 
        		:id="spc.id" 
        		:key="spc.$$key" 
        		v-for="spc in pc.content" :data="spc | copyObj"
        		:ref="spc.$$key">
         		<component 
         			:is="ele.$$comKey" 
         			:id="ele.id" 
         			:key="ele.$$key" 
         			v-for="ele in spc.content" :data="ele | copyObj"
         			:ref="ele.$$key">
     			</component>
        	</component>
      	</component>
      	<operate-box v-if="currentComKey"></operate-box>
	</div>
</template>
<script>
	export default {
		name: 'previewPanel',
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