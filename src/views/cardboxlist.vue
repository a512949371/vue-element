<template>
	<!--卡包列表-->
	<div class="postion-box">
		<div class="select-box">
			<div class="select" >
				  <el-input placeholder="请输入内容" size="small" v-model="pagedata.name" >
				    <template slot="prepend" class="fontColor" >卡名称:</template>
				  </el-input>
			</div>
			<div class="select" >
			 <span class="other">商家:</span>
			 <el-select  clearable placeholder="请选择" size="small" v-model="pagedata.id"  >
			    <el-option
			      v-for="(value,key) in storeslist"
			      :key="value.id"
			      :label="value.merchantsName"
			      :value="value.id">
			       {{value.merchantsName}}
			    </el-option>
			  </el-select>	
			</div>
			<div class="select">
				<div class="btn" v-on:click="Parentsearch">搜索</div>
			</div>
		</div>	
      <div class="page-content">
	 <el-table
	    style="width: 100%" :data="listdata" border>
	    <el-table-column
	     type="index"
	     label="编号"
	      width="100">
	    </el-table-column>

	    <el-table-column 
	      prop="name"
	      label="卡券名称"
	      width="200">
	    </el-table-column>
	    <el-table-column 
	      prop="storeName"
	      label="商家"
	      width="200">
	    </el-table-column>
	    <el-table-column 
	      prop="type"
	      label="卡券类型"
	      width="100">
	      <template slot-scope="scope">
	      	<p v-if="scope.row.type==1">代金券</p>
	      	<p v-if="scope.row.type==2">折扣券</p>
	      </template>
	    </el-table-column>
	    <el-table-column 
	      prop="amount"
	      label="卡券金额"
	      width="140">
	    </el-table-column>
	    <el-table-column 
	      prop="rebate"
	      label="卡券折扣"
	      width="140">
	    </el-table-column>
	    <el-table-column 
	      prop="chapterTotal"
	      label="卡券数量"
	      width="100">
	    </el-table-column>
	    <el-table-column 
	      prop="receiveNumber"
	      label="已领取"
	      width="100">
	    </el-table-column>
	    <el-table-column 
	      prop="useNumber"
	      label="已使用"
	      width="100">
	    </el-table-column>
	    <el-table-column 
	      prop="status"
	      label="状态"
	      width="100">
	      <template slot-scope="scope">
	      	<p v-if="scope.row.status==1">有效</p>
	      	<p v-else>已失效</p>
	      </template>
	    </el-table-column>
	    <el-table-column 
	      prop="status"
	      label="使用条件"
	      width="100">
	    </el-table-column>
	    <el-table-column 
	      prop="createTime"
	      label="添加时间">	
	    </el-table-column>
	    <el-table-column
	      fixed="right"
	      label="操作"
	      width="200">
	      <template slot-scope="scope">
	        <el-button type="danger" size="small" v-on:click="Lookcard(scope.$index,scope.row)">查看</el-button>
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
   <Lookcard v-show="lookboxTF" :carddata="onecarddata" v-on:Closelook="Closelook"></Lookcard>
   <Load v-show="loadTF"></Load>
	</div>
</template>

<script>
	import Lookcard from '../components/other/lookcard'
  	import Load from '../components/other/load'	
	let Cardboxlist={
		components:{
			Lookcard,
			Load
		},
	 	data(){
	 		return {
			    pagedata:{
		          pageNum:1,
		          pagesize:10,
		          name:'',
		          id:''
			    },	 			
	 			listdata:[],
	 			lookboxTF:false,
	 			checked:false,
	 			storeslist:[],
	 			total:1,
	 			onecarddata:'0'
	 		}
	 	},
	 	created(){
	 		var that=this;
	 		this.loadTF=true;
	 		this.$store.dispatch("Getcardlist",this.pagedata).then((res)=>{
	 			if(res.data.ok==true){
		 			that.listdata=this.$store.state.app.cardlistdata.list
		            that.total=this.$store.state.app.cardlistdata.total;
			      	that.pagedata.pageNum=this.$store.state.app.cardlistdata.pageNum;
			      	that.pagedata.pagesize=this.$store.state.app.cardlistdata.pageSize; 
			      	that.loadTF=false	 				
	 			}

	 		})
	      	this.$store.dispatch("Getshopnamequest").then((res)=>{
	      		console.log("商家列表",res)
	      		that.storeslist=this.$store.state.app.shopnamedatalist
	      	});	
	 	},
		methods:{
	        handleSizeChange(val) {
		         var that=this;
		         this.loadTF=true;
		         this.pagedata.pagesize=val;
		         this.$store.dispatch("Getcardlist",this.pagedata).then((res)=>{
		         	if(res.data.ok==true){
			      		that.listdata=this.$store.state.app.cardlistdata.list
			            that.total=this.$store.state.app.cardlistdata.total;
				      	that.pagedata.pageNum=this.$store.state.app.cardlistdata.pageNum;
				      	that.pagedata.pagesize=this.$store.state.app.cardlistdata.pageSize; 
				      	that.loadTF=false		         		
		         	}

		        })
	          console.log('每页 '+this.pagedata.pagesize+' 条');
	        },
	        handleCurrentChange(val) {
		        var that=this;
		        this.loadTF=true;
		        this.pagedata.pageNum=val;
		        this.$store.dispatch("Getcardlist",this.pagedata).then((res)=>{
		        	if(res.data.ok==true){
			        	if(res.data.data.list.length==0){
			        		console.log("23333")
			        	}else{
			        		that.listdata=this.$store.state.app.cardlistdata.list
				            that.total=this.$store.state.app.cardlistdata.total;
					      	that.pagedata.pageNum=this.$store.state.app.cardlistdata.pageNum;
					      	that.pagedata.pagesize=this.$store.state.app.cardlistdata.pageSize; 
			      		}
			        that.loadTF=false
		        	}

		        })
	          console.log(`当前页: ${val}`);
	        },
	 		Parentsearch(){
				var that=this;
		        this.loadTF=true;
		        this.$store.dispatch("Getcardlist",this.pagedata).then((res)=>{
		        	if(res.data.ok==true){
			        	if(res.data.data.list.length==0){
			        		console.log("23333")
			        	}else{
			        		that.listdata=this.$store.state.app.cardlistdata.list
				            that.total=this.$store.state.app.cardlistdata.total;
					      	that.pagedata.pageNum=this.$store.state.app.cardlistdata.pageNum;
					      	that.pagedata.pagesize=this.$store.state.app.cardlistdata.pageSize; 
					      	
			      		}	
			      	that.loadTF=false
		        	}

		        })	 			
	 		},
	 		Lookcard(index,row){
	 			this.lookboxTF=true;
	 			this.onecarddata=row.id;
	 		},
	 		Closelook(){
	 			this.lookboxTF=false;
	 		}
		}
	}
	export default Cardboxlist
</script>

<style>
</style>