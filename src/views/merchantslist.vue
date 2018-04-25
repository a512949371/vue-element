<template>
	<!--商家列表-->
	<div class="postion-box">
	<div class="select-box">
		<div class="select" >
			  <el-input placeholder="请输入内容" size="small" >
			    <template slot="prepend" class="fontColor">商家名称:</template>
			  </el-input>
		</div>
		<div class="select" >
			  <el-input placeholder="请输入内容"  size="small" >
			    <template slot="prepend" class="fontColor">商家电话:</template>
			  </el-input>
		</div>
		<div class="select">
			<div class="btn" v-on:click="Parentsearch">搜索</div>
			<div class="btn" v-on:click="Addmer">添加商家</div>
			<div class="btn" v-on:click="Addticket">添加券</div>
		</div>
	</div>	
      <div class="page-content">
	 <el-table
	    style="width: 100%" :data="listdata" border
	    highlight-current-row
	    @current-change="Singleselection">
	    <el-table-column width="55">
	     <template slot-scope="scope">
	     	<div class="check-box">
	     		<img src="../assets/images/icon-1.png" />
	     	</div>
	     </template>
	    </el-table-column>
	    <el-table-column 
	      type="index"
	      label="编号">
	    </el-table-column>
	    <el-table-column 
	      prop="merchantsName"
	      label="商家名称">
	    </el-table-column>
	    <el-table-column 
	      prop="merchantsPhone"
	      label="商家电话">
	    </el-table-column>
	    <el-table-column 
	      prop="merchantsAddress"
	      label="商家地址">
	    </el-table-column>
	    <el-table-column 
	      prop="merchantsAccount"
	      label="商家账号">
	    </el-table-column>
	    <el-table-column 
	      prop="createTime"
	      label="添加时间">
	    </el-table-column>
	    <el-table-column
	      fixed="right"
	      label="操作"
	      width="160">
	      <template slot-scope="scope">
	        <el-button type="danger" size="small" v-on:click="Mycard">卡包</el-button>
	        <el-button type="info" size="small" v-on:click="Editsuser(scope.$index, scope.row)">编辑</el-button>
	        <!--<el-button type="danger" size="small">删除</el-button>-->
	      </template>
	    </el-table-column>
	  </el-table>
    <div class="pagination mt20">
      <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="pagedata.pageNum"
      :page-sizes="[10, 20, 50, 100]"
      :page-size="pagedata.pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
      </el-pagination>
    </div>
  </div>
   <Newmerchants v-show="newboxTF"  v-on:Closeadd="Closeadd(1)" ></Newmerchants>
   <Editmerchants v-show="editboxTF"  v-on:Closeadd="Closeadd(2)"  :editdata="editdata"></Editmerchants>
   <Load v-show="loadTF"></Load>
	</div>
</template>

<script>
	import Newmerchants from '../components/other/newmerchants'
	import Editmerchants from '../components/other/editmerchants'
  	import Load from '../components/other/load'
	 let Merchantslist={
	 	components:{
	 		Newmerchants,
	 		Editmerchants,
	 		Load
	 	},
	 	data(){
	 		return {
			    pagedata:{
		          pageNum:1,
		          pagesize:10,
		          merchantsName:'',
		          merchantsPhone:''
			    }, 			
	 			listdata:[],
	 			total:1,
	 			newboxTF:false,
	 			editboxTF:false,
	 			num:"1",
	 			editdata:"1",
	 			loadTF:false,
	 			currentRow:null,
	 			addticketdata:{
	 				id:'',
	 				name:''
	 			}
	 		}
	 	},
	 	created(){
	 		var that=this;
	 		this.loadTF=true;
	 		this.$store.dispatch("Getshoplist",this.pagedata).then(()=>{
	 			that.listdata=this.$store.state.app.shoplistdata.list
	            that.total=this.$store.state.app.shoplistdata.total;
		      	that.pagedata.pageNum=this.$store.state.app.shoplistdata.pageNum;
		      	that.pagedata.pagesize=this.$store.state.app.shoplistdata.pageSize; 
		      	that.loadTF=false
	 		})
	 	},
	 	methods:{
        handleSizeChange(val) {
	         var that=this;
	         this.loadTF=true;
	         this.pagedata.pagesize=val;
	         this.$store.dispatch("Getshoplist",this.pagedata).then((res)=>{
	         	console.log("12345")
	         	console.log(res.data.data.pageSize)
	      		that.listdata=this.$store.state.app.shoplistdata.list
	            that.total=this.$store.state.app.shoplistdata.total;
		      	that.pagedata.pageNum=this.$store.state.app.shoplistdata.pageNum;
		      	that.pagedata.pagesize=this.$store.state.app.shoplistdata.pageSize; 
		      	that.loadTF=false
	        })
          console.log('每页 '+this.pagedata.pagesize+' 条');
        },
        handleCurrentChange(val) {
	        var that=this;
	        this.loadTF=true;
	        this.pagedata.pageNum=val;
	        this.$store.dispatch("Getshoplist",this.pagedata).then((res)=>{
	        	if(res.data.data.list.length==0){
	        		console.log("23333")
	        	}else{
	        		that.listdata=this.$store.state.app.shoplistdata.list
		            that.total=this.$store.state.app.shoplistdata.total;
			      	that.pagedata.pageNum=this.$store.state.app.shoplistdata.pageNum;
			      	that.pagedata.pagesize=this.$store.state.app.shoplistdata.pageSize; 
			      	that.loadTF=false
	      		}
	        })
          console.log(`当前页: ${val}`);
        },
        Parentsearch(){
			var that =this;
	      	this.loadTF=true;
	      	this.$store.dispatch("Getshoplist",this.pagedata).then(()=>{
        		that.listdata=this.$store.state.app.shoplistdata.list
	            that.total=this.$store.state.app.shoplistdata.total;
		      	that.pagedata.pageNum=this.$store.state.app.shoplistdata.pageNum;
		      	that.pagedata.pagesize=this.$store.state.app.shoplistdata.pageSize; 
		      	that.loadTF=false
	      	})		        	
        },
        Singleselection(val){
        	this.currentRow = val
        	console.log()
        },
 		Closeadd(num){
 			if(num==1){
 				this.newboxTF=false
 			}
 			if(num==2){
 				this.editboxTF=false
 			}
 			
 		},
 		Addmer(typenum){
 			this.newboxTF=true
 		},
 		Mycard(){
 			this.$route.push("/cardmanagement/cardboxlist")
 		},
 		Editsuser(index,row){
 			this.editboxTF=true;
 			this.editdata=row
 		},
 		Addticket(){
 			this.addticketdata.id=this.currentRow.id;
 			this.addticketdata.name=this.currentRow.merchantsName
 			this.$router.push("/cardmanagement/newcardbox?id="+this.addticketdata.id+'&name='+this.addticketdata.name)
 			console.log(this.currentRow)
 		}
	 	}
	 }
	 export default Merchantslist
</script>

<style lang="scss">
	.check-box{
		width: 16px;
		border:1px solid #e5e5e5 ;
		height: 16px;
		background-color: #FFF;
		img{
			width: 100%;
			display: block;
		}
	}
</style>