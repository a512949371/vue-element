<template>
	<div>
		<div class="info info-edit"><span>角色名称：</span><input type="text"/></div>
		<div class="info info-edit"><span>角色描述：</span><input type="text"/></div>
		<div class="info">
		<span class="red">角色权限：</span><span class="open" @click="opentree">[展开/折叠]</span><span class="open" @click="changealltree">[全选/全不选]</span>
		</div>
		<div class="tree-box">
		<div class="tree-left">
			<el-tree
			  :data="data2"
			  node-key="id"
			  ref="tree"
			  show-checkbox
			  @check-change="handleCheckChange"
			  @node-click="treeclick"
			  :props="props"
			  >
			</el-tree>
			<div class="btn-edit">确认</div>
		</div>
		<div class="tree-right">
			{{treetext}}
		</div>
		</div>
	</div>
</template>

<script>
	let rolemanagement ={
	     data() {
	      return {
	        props: {
	          label: 'label',
	          children: 'children'
	        },
	        data2: [{
	          id: 1,
	          label: '一级 1',
	          children: [{
	            id: 4,
	            label: '二级 1-1',
	            children: [{
	              id: 9,
	              label: '三级 1-1-1'
	            }, {
	              id: 10,
	              label: '三级 1-1-2'
	            }]
	          }]
	        }, {
	          id: 2,
	          label: '一级 2',
	          children: [{
	            id: 5,
	            label: '二级 2-1'
	          }, {
	            id: 6,
	            label: '二级 2-2'
	          }]
	        }, {
	          id: 3,
	          label: '一级 3',
	          children: [{
	            id: 7,
	            label: '二级 3-1'
	          }, {
	            id: 8,
	            label: '二级 3-2'
	          }]
         }],
	        count: 1,
	        checked:false,
	        treetext:'',
	        defaultexpand:false,
	        changetree:false
	      };
	    },
	    methods: {
	      handleCheckChange(data, checked, indeterminate) {
	        console.log(data, checked, indeterminate);
	      },
	      handleNodeClick(data) {
	        console.log(data);
	      },
	      treeclick(){
	      	this.treetext="这里是被点击之后的显示内容"
	      },
	      opentree(){
	      	this.defaultexpand=!this.defaultexpand
	      	for(var i=0;i<this.$refs.tree.store._getAllNodes().length;i++){
	           this.$refs.tree.store._getAllNodes()[i].expanded=this.defaultexpand;
	           console.log(this.$refs.tree.store._getAllNodes()[i])
	        }
	      	console.log(this.$refs.tree.store._getAllNodes)
	      },
	      changealltree(){
	      	this.changetree=!this.changetree;
	      	if(this.changetree){
		      	this.defaultexpand=true;
		      	for(var i=0;i<this.$refs.tree.store._getAllNodes().length;i++){
		      	   this.$refs.tree.store._getAllNodes()[i].expanded=this.defaultexpand;
		           this.$refs.tree.store._getAllNodes()[i].checked=this.changetree;
		        }	      		
	      	}else{
	      		this.defaultexpand=false;
		      	for(var i=0;i<this.$refs.tree.store._getAllNodes().length;i++){
		      		this.$refs.tree.store._getAllNodes()[i].expanded=this.defaultexpand;
		           this.$refs.tree.store._getAllNodes()[i].checked=this.changetree;
		        }	      		
	      	}

	      }
	    }
  };
	export default rolemanagement
</script>

<style lang="scss">
	.info-edit{
		input{
			border: 1px solid #e5e5e5;
			padding: 3px 10px;
		}
	}
	.btn-edit{
		width: 100px;
		margin: 30px auto ;
		background-color: #0082E6;
		text-align: center;
		padding: 3px 0;
		color: #FFF;
		border-radius: 3px;
		cursor: pointer;
	}
</style>