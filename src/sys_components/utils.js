const COM_MIXIN = {
	props: ['formkey'],
	computed : {
		form () {
			return this.$store.getters.getForms[this.formkey];
		},
		style () {
			let style = {};
			Object.keys(this.form.style).forEach((item, i) => {
				this.form.style[item].forEach((attr, j) => {
					style[attr.name] = attr.val;
				});
			});
			return style;
		}
	}
};
export const common = COM_MIXIN