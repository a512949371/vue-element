<template>
	<div>
		<div class="info"><span class="red">在父菜单下的所有子菜单全部勾选的情况下，是否级联删除父菜单：</span><el-checkbox v-model="checked"></el-checkbox><br>
		提示：点击菜单项，此处则能编辑该菜单项或增加顶级菜单或子菜单项。<br>
		<button>删除选择的菜单</button><span class="red">(默认只删除叶子菜单)</span><span class="open" @click="opentree">[展开/折叠]</span><span class="open" @click="changealltree">[全选/全不选]</span>
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
	.custom-20a0ff .el-tree {
		border: none;
	}
	.info{
		padding: 10px 20px;
		color: #666;
		.red{
			color: #f00;
		}
		button{
			border-radius: 5px;
			background-color: #ff5c5c;
			color: #FFF;
			padding: 5px 10px;
			margin-top: 10px;
		}
		.open{
			color: #333;
			cursor: pointer;
		}
	}
	.tree-box{
		display: flex;
		.tree-left{
			width: 400px;
			border: 1px solid #e5e5e5;
		}
		.tree-right{
			flex: 1;
			padding: 20px;
		}
	}
</style>