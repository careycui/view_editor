const COM_MIXIN = {
	props: ['formkey'],
	computed : {
		currentDom () {
			return this.$store.getters.getCDOM;
		},
		form () {
			return this.$store.getters.getForms[this.formkey];
		},
		style () {
			let style = {};
			Object.keys(this.form.style).forEach((item, i) => {
				this.form.style[item].forEach((attr, j) => {
					style[attr.name] = attr.val + (attr.formEle.unit?attr.formEle.unit:'');
				});
			});
			return style;
		}
	},
	methods : {
		setPos (val) {
			this.$store.dispatch('setPostion', {formkey: this.formkey, pos: val});
		}
	}
};
export const common = COM_MIXIN