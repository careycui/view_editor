<template>
	<components
		:is="model.$$comKey"
		:id="model.id"
		:data="model | copyObj"
		:ref="model.$$key"
		@dblclick.native.stop="setComActive">
		<preview-render
			:model="com"
			:key="com.$$key"
			v-for="com in model.content"
			v-if="model.content && model.content.length > 0">
		</preview-render>
	</components>
</template>
<script>
	export default{
		name: 'previewRender',
		props:['model'],
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
	  		setComActive (){
	  			this.$store.dispatch('changeComKey', this.model.$$key);
	  		}
	  	}
	}
</script>