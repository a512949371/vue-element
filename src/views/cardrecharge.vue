<template>
 <div class="bastic-table postion-box">
 	<div class="top">
 		<div class="btn" v-on:click="Openpaybox(1)">新增 </div>
 		<div class="btn" v-if="actstatus.parametValue==0" v-on:click="Openact">开启活动</div>
 		<div class="btn" v-else v-on:click="Openact">关闭活动</div>
 	</div>
      <div class="page-content">
	 <el-table
	    style="width: 100%" :data="cardchargelist" border>
	    <el-table-column 
	      prop="id"
	      label="编号"
	      width="150">
	    </el-table-column>
	    <el-table-column 
	      prop="amount"
	      label="充值金额">
	    </el-table-column>
	    <el-table-column 
	      prop="present"
	      label="赠送金额">
	    </el-table-column>
	    <el-table-column 
	      prop="updateTime"
	      label="最后修改时间">
	    </el-table-column>
	    <el-table-column
	      fixed="right"
	      label="操作"
	      width="160">
	      <template slot-scope="scope">
	        <el-button type="info" size="small" v-on:click="Openpaybox(2,scope.row)">编辑</el-button>
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
  <div class="fixed-box" v-show="payboxTF">
  	<div class="shaw"></div>
  	<div class="content-box" v-if="status==2">
  		<h2>设置充值金额<span v-on:click="Closepaybox">X</span></h2>
  		<div class="text">充值金额:<input type="number" v-model="editdata.amount" /></div>
  		<div class="text">赠送金额:<input type="number" v-model="editdata.present"/></div>
  		<div class="btn" v-on:click="Truedata(2)">确认</div>
  	</div>
  	<div class="content-box" v-else>
  		<h2>新增活动<span v-on:click="Closepaybox">X</span></h2>
  		<div class="text">充值金额:<input type="number" v-model="adddata.amount" /></div>
  		<div class="text">赠送金额:<input type="number" v-model="adddata.present"/></div>
  		<div class="btn" v-on:click="Truedata(1)">确认</div>
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
          payboxTF:false,
          status:'',
	      pagedata:{
          pageNum:1,
          pagesize:10,
	      },
	      cardchargelist:[],
	      editdata:{
	      	amount:'',
	      	present:'',
	      	id:''
	      },
	      adddata:{
	      	amount:'',
	      	present:''
	      },
	      actstatus:{
	      	parametValue:'',
	      	id:0
	      },
	      loadTF:false
        }
      },
      components:{
      	Load
      },
      created(){
      	var that =this;
      	this.loadTF=true;
      	this.$store.dispatch("Getcardchargequest",this.pagedata).then((res)=>{
      		if(res.data.ok==true){
      			
      			if(this.$store.state.app.cardchargedata.list.length==0){ 
      			}else{
		      		that.cardchargelist=this.$store.state.app.cardchargedata.list;
		      		that.actstatus.parametValue= this.$store.state.app.cardchargedata.list[0].parametValue;
		            that.total=this.$store.state.app.cardchargedata.total;
			      	that.pagedata.pageNum=this.$store.state.app.cardchargedata.pageNum;
			      	that.pagedata.pagesize=this.$store.state.app.cardchargedata.pageSize;       				
      			}
      		that.loadTF=false;	
      		}

      	})
      },
      methods: {
        handleSizeChange(val) {
	         var that=this;
	         this.loadTF=true;
	         this.pagedata.pagesize=val;
	         this.$store.dispatch("Getcardchargequest",this.pagedata).then((res)=>{
	         	if(res.data.ok==true){
		        	that.total=this.$store.state.app.cardchargedata.total;
		      		that.pagedata.pageNum=this.$store.state.app.cardchargedata.pageNum;
		      		that.pagedata.pagesize=this.$store.state.app.cardchargedata.pageSize;
		      		that.cardchargelist=this.$store.state.app.cardchargedata.list;
		      		that.loadTF=false;	         		
	         	}

	        })
          console.log('每页 '+this.pagedata.pagesize+' 条');
        },
        handleCurrentChange(val) {
	        var that=this;
	        this.loadTF=true;
	        this.pagedata.pageNum=val;
	        this.$store.dispatch("Getcardchargequest",this.pagedata).then((res)=>{
	        	if(res.data.ok==true){
		        	if(res.data.data.list.length==0){
		        		console.log("23333")
		        	}else{
		        	that.total=this.$store.state.app.cardchargedata.total;
		      		that.pagedata.pageNum=this.$store.state.app.cardchargedata.pageNum;
		      		that.pagedata.pagesize=this.$store.state.app.cardchargedata.pageSize;
		      		that.cardchargelist=this.$store.state.app.cardchargedata.list;
		      		
	      		}	
	      		that.loadTF=false;
	        	}

	        })
          console.log(`当前页: ${val}`);
        },        
        Closepaybox(){
        	this.payboxTF=false
        },
        Openpaybox(num,row){
        	this.payboxTF=true
        	this.status=num
        	if(num==2){
        		console.log(row)
        		this.editdata.amount=row.amount;
        		this.editdata.present=row.present;
        		this.editdata.id=row.id
        	}
        },
        Truedata(num){
        	if(num==1){
        		var that=this;
        		if(this.adddata.amount>0&&this.adddata.present>=0){
        			this.$store.dispatch("Addcardchargequest",this.adddata).then(function(res){
        				if(res.data.ok==true){
        				that.$message('新增成功');
        				that.payboxTF=false;  
        				setTimeout(function(){
        					location.reload()
        				},3000)
        				}

        				
        			})
        		}else{
        			that.$message('充值金额或者赠送金额不能小于0');
        		}
        	}
        	if(num==2){
        		var that=this;
        		if(this.editdata.amount>0&&this.editdata.present>=0){
        			this.$store.dispatch("Editcardchargequest",this.editdata).then((res)=>{
        				if(res.data.ok==true){
	        				that.$message('编辑成功');
	        				that.payboxTF=false;
	        				setTimeout(function(){
	        					location.reload()
	        				},3000)
        				}
        			})
        		}else{
        			that.$message('充值金额或者赠送金额不能小于0');
        		}
        	}
        },
        Openact(){
        	var that =this;
        	if(this.actstatus.parametValue==0){
        		this.actstatus.parametValue=1
        	}else{
        		this.actstatus.parametValue=0
        	}
        	this.$store.dispatch("Openactquest",this.actstatus).then((res)=>{
        		if(res.data.ok==true){
        			if(that.actstatus.parametValue==1){
        				that.$message('活动已开启');
        			}else{
        				that.$message('活动已关闭');
        			}
        			setTimeout(function(){
        				location.reload()
        			},2000)
        		}
        	})
        }
      }
    }
  </script>
  <style lang="scss" >
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
		cursor: pointer;
  	}
  	.fixed-box{
  		position: fixed;
  		top: 0;
  		left: 0;
  		right: 0;
  		bottom: 0;
  		z-index: 99;
  		.shaw{
  			position: fixed;
  			top: 0;
  			left: 0;
  			right: 0;
  			bottom: 0;
  			background-color: rgba(0,0,0,0.5);
  			z-index: 99;
  		}
  		.content-box{
  			position: fixed;
  			top:40%;
  			left: 30%;
  			width: 500px;
  			z-index: 100;
  			background-color: #FFF;
  			h2{
  				font-size: 18px;
  				color: #333;
  				background-color: #e5e5e5;
  				padding: 10px 20px;
  				span{
  					float: right;
  					cursor: pointer;
  				}
  			}
  			.text{
  				padding: 10px 20px;
  				input{
  					padding-left: 10px;
  					border: 1px solid #e5e5e5;
  				}
  			}
  			.btn{
  				width: 120px;
  				background-color: #999;
  				border-radius: 5px;
  				text-align: center;
  				margin:10px auto 30px auto;
  				cursor: pointer;
  			}
  		}
  	}
  </style>