<script>
	import Vue from 'Vue'
	export default {
		name: 'priview-panel',
		props: ['page'],
		render (createElement) {
			console.log(this);
			return createElement(Vue.component, {

			});
		}
	}
</script>