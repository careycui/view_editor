let nodeCount = 1;
class TreeNodeModel{
	constructor(options){
		this.isFolder = false;
		this.isOpen = false;
		this.parent = null;
		this.isLeaf = false;
		this.level = 0;

		for(let option in options){
			if(options.hasOwnProperty(option)){
				this[option] = options[option];
			}
		}
		if(this.data.content && this.data.content instanceof Array){
			this.insertAllChildren();
		}
		this.isSort = false;
		this.initNodeState();
		this.tree.insertNode(this);
	}
	insertAllChildren (data){
		if(data){
			this.data.content = data;
		}
		this.children = [];
		if(this.data.content){
			for(let i=0;i<this.data.content.length;i++){
				let tmp = this.data.content[i];
				this.insertChild(tmp);
			}
		}
	}
	insertChild (data, index){
		if(!(data instanceof TreeNodeModel)){
			data = new TreeNodeModel({
				parent: this,
				tree: this.tree,
				index: index,
				data: data,
				level: this.level + 1
			});
		}
		if(index === undefined || index < 0){
			data.index = this.children.length;
			this.children.push(data);
		}else{
			this.children.splice(index, 0, data);
			this.isOpen = true;
		}
	}
	initNodeState (){
		this.isLeaf = !!!this.children;
		this.isFolder = (this.children && this.children.length>0);
		this.key = (this.data.$$key || ++nodeCount);
	}
	expandNode (){
		this.isOpen = true;
		let parent = this.parent;
		if(parent){
			parent.expandNode();
			if(this.tree.accordion){
				parent.collapseOtherChild(this);
			}
		}
	}
	collapseOtherChild (child){
		if(this.isLeaf){
			return;
		}
		this.children.forEach((item) => {
			if(item !== child){
				item.collapseNode();
			}
		});
	}
	collapseNode (){
		this.isOpen = false;
		if(this.children){
			this.children.forEach((node, i) => {
				!(node.isLeaf) && node.collapseNode();
			});
		}
	}
	removeChildNode (node){
		let target = null;
		this.children.some((item, index) => {
			if(item.data === node){
				target = item;
				return true;
			}
			return false;
		});
		if(target){
			const index = this.children.indexOf(target);
			if(index > -1){
				(this.tree&&!target.isembed) && this.tree.deleteNode(target);
				target.parent = null;
				this.children.splice(index, 1);
				target.isembed = false;
			}
		}
	}
	updateChildren (){
		if(this.data.$$level === 0 || this.isLeaf){ return; }
		const newData = this.data.content || [];
		const oldData = this.children.map((node) => node.data);
		const dataMap = {};
		let newNodes = [];
		newData.forEach((item, i) => {
			if(this.isSort){
				newNodes.push({index: i, data: item});
			}else{
				if(oldData.indexOf(item) > -1){
					dataMap[item.$$key] = {index: i, data: item};
				}else{
					newNodes.push({index: i, data: item});
				}
			}

		});
		oldData.forEach((item, i) => {
			if(!dataMap[item.$$key] && !item.embed){
				this.removeChildNode(item);
			}
		});
		newNodes.forEach(({index, data}) => {
			this.insertChild(data, index);
		});
		this.isSort = false;
		this.initNodeState();
	}
}

export const TreeNode = TreeNodeModel;