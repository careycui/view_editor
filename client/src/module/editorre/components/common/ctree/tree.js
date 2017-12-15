import { TreeNode } from './tree_node'
class DragModel{
	constructor (options){
		this.tree = null;

		for(let option in options){
			if(options.hasOwnProperty(option)){
				this[option] = options[option];
			}
		}
		this.enterTime = 0;
		this.hoverInterval = void 0;
	}
	_addClass (dom, cls){
		if(arguments.length < 2) {
            dom.classList.add(cls)
        } else {
            for (let i = 1, len = arguments.length; i < len; i++) {
                dom.classList.add(arguments[i])
            }
        }
	}
	_removeClass (dom, cls){
		if(arguments.length < 2) {
            dom.classList.remove(cls)
        } else {
            for (let i = 1, len = arguments.length; i < len; i++) {
                dom.classList.remove(arguments[i])
            }
        }
	}
	handleDragStart (e){
		const current = this._getDom(e);
		this.current = current;
		this._addClass(this.current.dom, 'dragging');
	}
	handleDragOver (e){
		let diff = new Date().getTime() - this.enterTime;
		if(!this.to){
			return;
		}
		if(diff > 600 && !this.to.node.isLeaf && this.to.node.data.$$level != this.current.node.data.$$level){
			this.sortType = 'embed'
			this._removeClass(this.to.dom, 'drag-insert');
			this._addClass(this.to.dom, 'drag-hoving');
		}

	}
	handleDragEnter (e){
		this.enterTime = new Date().getTime();
		const enterEle = this._getDom(e);
		const oldTo = this.to;
		if(enterEle.node == this.current.node){
			return;
		}
		if(oldTo && oldTo.node !== enterEle.node){
			this._removeClass(oldTo.dom, 'drag-insert', 'drag-hoving');
		}
		this.to = enterEle;
		this._addClass(this.to.dom, 'drag-insert');
		this.sortType = 'insert';
	}
	handleDragEnd (){
		if(this.to){
			this._removeClass(this.to.dom, 'drag-hoving', 'drag-insert');
		}
		if(this.current){
			this._removeClass(this.current.dom, 'dragging', 'drag-insert');
		}
		this.current = null;
		this.to = null;
	}
	handleDrop (e){
		const current = this.current;
		const to = this.to;
		const sortType = this.sortType;
		let result = {};
		if(current == to){
			return;
		}
		if(sortType === 'insert'){
			const toNode = this.to.node;
			const toParent = toNode.parent;
			const dragNode = this.current.node;
			const dragParent = dragNode.parent;

			// dragParent.children.splice(dragNode.index, 1);
			// dragParent.data.content.splice(dragNode.index, 1);

			// toParent.children.splice(toNode.index, 0, dragNode);
			// toParent.data.content.splice(toNode.index, 0, dragNode.data);

			if(dragParent === toParent){
				dragParent.isSort = true;
			}
			result = {
				drag: dragNode.data,
				dragParent: dragNode.parent.data,
				dragIndex: dragNode.index,
				to: toNode.data,
				toParent: toNode.parent.data,
				toIndex: toNode.index,
				type: 'insert'
			};
		}
		if(sortType === 'embed'){
			const toNode = this.to.node;
			const dragNode = this.current.node;

			dragNode.isembed = true;
			result = {
				drag: dragNode.data,
				dragParent: dragNode.parent.data,
				dragIndex: dragNode.index,
				to: toNode.data,
				toParent: toNode.data,
				toIndex: toNode.children.length,
				type: 'embed'
			};
		}
		return result;
	}
	_getDom (e){
		let dom = e.target;

		while(dom.parentNode) {
            if (dom.getAttribute && dom.getAttribute('drag-block')) {
                break;
            } else {
                dom = dom.parentNode
            }
        }
		const tree = this.tree;
		let key = dom.dataset.key;
		return {
			dom: dom,
			key: key,
			node: tree.getNode(key)
		}

	}
}
class TreeModel{
	constructor (options) {
		for(let option in options){
			if(options.hasOwnProperty(option)){
				this[option] = options[option];
			}
		}
		this.nodesMap = {};
		this.currentNode = null;
		this.root = new TreeNode({
			data: {content: this.nodesData},
			tree: this,
			index: 0,
			isRoot: true,
			level: 0
		});

		this.dragModel = new DragModel({
			tree: this
		});
	}
	setNodesData (data){
		this.root.insertAllChildren(data);
	}
	getLineHeight (){
		let lh = 0;
		if(this.lineHeight){
			lh = this.lineHeight + 'px';
		}
		return lh;
	}
	setActiveNode (node){
		let treeNode = this.getNode(node);
		this.currentNode = treeNode;
		if(treeNode && treeNode.parent){
			treeNode.parent.expandNode();
		}
	}
	setCurrentNode (node){
		let treeNode = (node instanceof TreeNode ? node: this.getNode(node));
		if(treeNode){
			this.currentNode = treeNode;
		}
	}
	insertNode (node){
		this.nodesMap[node.key] = node;
	}
	deleteNode (node){
		delete this.nodesMap[node.key];
		this.currentNode = undefined;
	}
	getNode (node){
		let key = typeof node !== 'object'? node : node.$$key;
		return this.nodesMap[key];
	}
	collapseOthers (node){
		const nodes = this.nodesMap;
		for(let cn in nodes){
			let tmp = nodes[cn];
			if(tmp !== node){
				tmp.collapseNode();
			}
		}
	}
}
export const Tree = TreeModel;