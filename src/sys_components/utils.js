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
		},
		data () {
			let data = {};
			let form = this.form;
			Object.keys(form).forEach((item, i) => {
				data[item] = {};
				Object.keys(form[item]).forEach((item2, j) => {
					let temp = form[item][item2];
					temp.forEach((item3, h)=>{
						data[item][item3.name] = {
							label: item3.label,
							val: item3.val,
							type: item2
						};
					});

				});
			});
			return data;
		},
		isActive () {
				return this.formkey == this.currentDom;
			}
	},
	methods : {
		setPos (val) {
			this.$store.dispatch('setPostion', {formkey: this.formkey, pos: val});
		}
	}
};
export const common = COM_MIXIN