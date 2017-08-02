let getLeft = function (lines, cRect) {
  let cl = cRect.left;
  let offset = {
    o: void 0,
    left: 0,
    height: '600px',
    width: '1px',
    display: 'none'
  };
  lines.forEach((item, i) => {
    let co = Math.abs(cl - item.left);
    let ro = Math.abs(cl - item.right);
    let key;
    let o;
    if(co < ro){
    	key = 'left';
    	o = co - 100;
    }else{
    	key = 'right';
    	o = ro - 100;
    }
    if(o <= 0){
    	offset.display = 'block';
	    if(!offset.o){
	      offset.o = Math.abs(o);
	      offset.left = item[key] + 'px';
	      offset.height = item.height + 'px';
	    }else{
	      if(offset.o < Math.abs(o)){
	        offset.o = Math.abs(o);
	        offset.left = item[key]+ 'px';
	        offset.height = item.height + 'px';
	      }
    	}
    }
  });
  return offset;
};
let getV = function (lines, cRect) {
	let vl = (cRect.left + cRect.right)/2;
	let offset = {
	    o: void 0,
	    top: 0,
	    left: 0,
	    height: '600px',
	    width: '1px',
	    display: 'none'
	  };

	lines.forEach((item, i) => {
		let io = (item.left+item.right)/2;
		let o = Math.abs(vl - io) - 50;
		if(o <= 0){
			offset.display = 'block';
			if(!offset.o){
		      offset.o = Math.abs(o);
		      offset.top = item.top + 'px';
		      offset.left = io + 'px';
		      offset.height = item.height + 'px';
		    }else{
		      if(offset.o < Math.abs(o)){
		        offset.o = Math.abs(o);
		        offset.top = item.top + 'px';
		        offset.left = io+ 'px';
		        offset.height = item.height + 'px';
		      }
	    	}
		}
	});
	return offset;
};
let getTop = function (lines, cRect){
  let ct = cRect.top;
  let offset = {
    o: void 0,
    top: 0,
    height: '1px',
    width: '600px',
    display: 'none'
  };
  lines.forEach((item, i) => {
  	let to = Math.abs(ct - item.top);
  	let bo = Math.abs(ct - item.bottom);
  	let o;
  	let key;
  	if(to < bo){
    	key = 'top';
    	o = to - 100;
    }else{
    	key = 'bottom';
    	o = bo - 100;
    }
    if(o <= 0){
    	offset.display = 'block';
	    if(!offset.o){
	      offset.o = Math.abs(o);
	      offset.top = item[key] + 'px';
	      offset.width = item.width + 'px';
	    }else{
	      if(offset.o < Math.abs(o)){
	        offset.o = Math.abs(o);
	        offset.top = item[key] + 'px';
	        offset.width = item.width + 'px';
	      }
    	}
    }
  });
  return offset;
};
let getH = function (lines, cRect) {
	let ht = (cRect.top + cRect.bottom)/2;
	let offset = {
	    o: void 0,
	    top: 0,
	    left: 0,
	    height: '600px',
	    width: '1px',
	    display: 'none'
	  };

	lines.forEach((item, i) => {
		let io = (item.top+item.bottom)/2;
		let o = Math.abs(ht - io) - 50;
		if(o <= 0){
			offset.display = 'block';
			if(!offset.o){
		      offset.o = Math.abs(o);
		      offset.top = io + 'px';
		      offset.left = item.left + 'px';
		      offset.width = item.width + 'px';
		    }else{
		      if(offset.o < Math.abs(o)){
		        offset.o = Math.abs(o);
		        offset.top = io + 'px';
		        offset.left = item.left+ 'px';
		        offset.width = item.width + 'px';
		      }
	    	}
		}
	});
	return offset;
};
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
		pos () {
			let style = {};
			if(this.form.style['position']){
				this.form.style['position'].forEach((attr, j) => {
					style[attr.name] = attr.val + (attr.formEle.unit?attr.formEle.unit:'');
				});
			}
			return style;
		},
		bg () {
			let style = {};
			if(this.form.style['background']){
				this.form.style['background'].forEach((attr, j) => {
					style[attr.name] = attr.val + (attr.formEle.unit?attr.formEle.unit:'');
				});
				if(style.type && style.type == 'BG'){
					style.backgroundImage = 'url('+ style.backgroundImage + ')';	
				}else if(style.type != undefined && style.type != 'BG'){
					style = {};
				}
			}
			return style;
		},
		ff () {
			let style = {};
			if(this.form.style['font']){
				this.form.style['font'].forEach((attr, j) => {
					style[attr.name] = attr.val + (attr.formEle.unit?attr.formEle.unit:'');
				});
			}
			return style;
		},
		border () {
			let style = {};
			if(this.form.style['border']){
				this.form.style['border'].forEach((attr, j) => {
					style[attr.name] = attr.val + (attr.formEle.unit?attr.formEle.unit:'');
				});
			}
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
	watch : {
		pos : function (v, o){
			let _this = this;
			setTimeout(function(){
			  let currDom = _this.$store.getters.getCurrentDom;
		      let currCom = _this.$store.getters.getCurrentCom;
		      let parCom = _this.$store.getters.getParentCom;
		      let lines =[];
		      let leftLine;
		      let topLine;
		      let vLine;
		      let hLine;

		      if(currCom.$dom){
		        if(parCom.key !== currDom){
		          lines.push(parCom.$dom.getBoundingClientRect());
		          if(parCom.children){
		              parCom.children.forEach(function(item, i){
		                if(item.key != currDom){

		                  let rect = item.$dom.getBoundingClientRect();
		                  
		                  lines.push(rect);
		                }
		              });
		          }
		        }
		        let cRect = currCom.$dom.getBoundingClientRect();
		        leftLine = getLeft(lines, cRect);
		        topLine = getTop(lines, cRect);
		        vLine = getV(lines, cRect);
		        hLine = getH(lines, cRect);
		      }
		      _this.$emit('setLine',{ left: leftLine, top: topLine, vertical: vLine, horizon: hLine});
			},0);
		}
	},
	methods : {
		setPos (val) {
			this.$store.dispatch('setPostion', {formkey: this.formkey, pos: val});
		}
	}
};
export const common = COM_MIXIN