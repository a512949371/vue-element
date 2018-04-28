<template>
 <div class="bastic-table postion-box">
	<div class="select-box">
		<div class="select" >
			  <el-input placeholder="请输入内容" size="small" v-model="pagedata.userName">
			    <template slot="prepend" class="fontColor">卡名称:</template>
			  </el-input>
		</div>
		<div class="select" >
			  <el-input placeholder="请输入内容"  size="small" v-model="pagedata.phone">
			    <template slot="prepend" class="fontColor">手机号码:</template>
			  </el-input>
		</div>
		<div class="select" v-if="btnauthority==1">
		 <span class="other">店面:</span>
		 	 <el-select v-model="pagedata.storeId" clearable placeholder="请选择" size="small"  >
	    <el-option
	      v-for="(value,key) in storeslist"
	      :key="value.id"
	      :label="value.nickname"
	      :value="value.id">
	       {{value.nickname}}
	    </el-option>
	  </el-select>	
		</div>
		<div class="select" v-if="btnauthority==1" >
		 <span class="other">类型:</span>
		 <el-select v-model="pagedata.type" clearable placeholder="请选择" size="small"  >
		    <el-option label="商家联盟卡消费" value="1">
		      商家联盟卡消费
		    </el-option>
		    <el-option label="会员卡消费" value="2">
		      会员卡消费
		    </el-option>
		  </el-select>	
		</div>
		<div class="select">
			<div class="btn" v-on:click="Parentsearch">搜索</div>
		</div>
	</div>
      <div class="page-content">
	 <el-table
	    style="width: 100%" :data="paylistdata" border>
	    <el-table-column 
	      type="index"
	      label="编号"
	      width="150">
	    </el-table-column>
	    <el-table-column 
	      prop="realName"
	      label="姓名">
	    </el-table-column>
	    <el-table-column 
	      prop="phone"
	      label="手机号码">
	    </el-table-column>
	    <el-table-column 
	      prop="orderPrice"
	      label="使用金额">
	    </el-table-column>
	    <el-table-column 
	      prop="chapterName"
	      label="使用卡包">
	    </el-table-column>
	    <el-table-column 
	      prop="createTime"
	      label="使用时间">
	    </el-table-column>
	    <el-table-column 
	      prop="storeName"
	      label="店面">
	    </el-table-column>
	    <el-table-column 
	      prop="orderCode"
	      label="订单号">
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
   <Load v-show="loadTF"></Load>
  </div>
</template>

  <script>
  	import Load from '../components/other/load'
    export default {
      data() {
        return {
          total:1,
	      pagedata:{
          pageNum:1,
          pagesize:10,
		  phone:'',
		  userName:'',
		  storeId:'',
		  type:''
	      },     
	      storeslist:[],	
	      paylistdata:[],
	      btnauthority:'',
	      loadTF:false,
        }
      },
      components:{
      	Load
      },
      created(){
      	var that=this;
      	this.loadTF=true;
      	this.$store.dispatch("Getconsumptionquest",this.pagedata).then((res)=>{
      		if(res.data.ok==true){
	      		console.log(this.$store.state.app.consumptionlistdata)
	      		that.paylistdata=this.$store.state.app.consumptionlistdata.list;    
	      		that.btnauthority=this.$store.state.app.consumptionlistdata.orderBy;
	      		that.pagedata.pageNum=this.$store.state.app.consumptionlistdata.pageNum;
	      		that.pagedata.pagesize=this.$store.state.app.consumptionlistdata.pageSize;
	      		that.total=this.$store.state.app.consumptionlistdata.total;
	      		that.loadTF=false;      			
      		}
      	})
      	this.$store.dispatch("Getstoresquest").then(()=>{
      		console.log("storesdata",this.$store.state.app.storesdata)
      		that.storeslist=this.$store.state.app.storesdata
      	});	
      },
      wacth:{
      	datachange:function(){
      		return this.pagedata
      	}
      },
      computed:{
      	datachange:function(){
      		location.reload()
      	}
      },
      methods: {
        handleSizeChange(val) {
	         var that=this;
	         this.loadTF=true;
	         this.pagedata.pagesize=val;
	         this.$store.dispatch("Getconsumptionquest",this.pagedata).then((res)=>{
	         	if(res.data.ok==true){
		        	that.total=this.$store.state.app.consumptionlistdata.total;
		      		that.pagedata.pageNum=this.$store.state.app.consumptionlistdata.pageNum;
		      		that.pagedata.pagesize=this.$store.state.app.consumptionlistdata.pageSize;
		      		that.paylistdata=this.$store.state.app.consumptionlistdata.list;
		      		that.loadTF=false;	         		
	         	}
	        })
          console.log('每页 '+this.pagedata.pagesize+' 条');
        },
        handleCurrentChange(val) {
	        var that=this;
	        this.loadTF=true;
	        this.pagedata.pageNum=val;
	        this.$store.dispatch("Getconsumptionquest",this.pagedata).then((res)=>{
	        	if(res.data.ok==true){
		        	if(res.data.data.list.length==0){
		        		console.log("23333")
		        	}else{
			        	that.total=this.$store.state.app.consumptionlistdata.total;
			      		that.pagedata.pageNum=this.$store.state.app.consumptionlistdata.pageNum;
			      		that.pagedata.pagesize=this.$store.state.app.consumptionlistdata.pageSize;
			      		that.paylistdata=this.$store.state.app.consumptionlistdata.list;
			      		
		        	}	
		        that.loadTF=false;
	        	}	
	        })
          console.log(`当前页: ${val}`);
        },
		Parentsearch(){
			var that =this;
			this.loadTF=true;
	        this.$store.dispatch("Getconsumptionquest",this.pagedata).then((res)=>{
	        	if(res.data.ok==true){
		        	that.total=this.$store.state.app.consumptionlistdata.total;
		      		that.pagedata.pageNum=this.$store.state.app.consumptionlistdata.pageNum;
		      		that.pagedata.pageSize=this.$store.state.app.consumptionlistdata.pageSize;
		      		that.paylistdata=this.$store.state.app.consumptionlistdata.list;
		      		that.loadTF=false;	        		
	        	}
	      		console.log(that.paylistdata)
	        })			
		}
      }
    }
  </script>
  <style lang="scss">
  	.top{
  		width: 100%;
  		display: flex;
  		padding: 20px 40px;
  		flex-direction:row-reverse;
  	}
	.btn{
		border: 1px solid #e5e5e5;
		padding: 3px 10px;
		border-radius: 5px;
		margin-right: 10px;
		background-color: rgb(164,179,193);
		color: #FFF;
  	}
  </style>