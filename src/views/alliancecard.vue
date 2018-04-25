<template>
	<!--联盟卡券设置-->
	<div>
 	<div class="top">
 		<div class="btn" v-on:click="Selectsuser">删除</div>
 		<div class="btn" v-on:click="Editsuser(1)">新增</div>
 	</div>		
      <div class="page-content">
	 <el-table
	    style="width: 100%" :data="listdata" border
	    highlight-current-row
        @current-change="handleSelectionChange">
        <el-table-column width="55">
		     <template slot-scope="scope">
		     	<div class="check-box">
		     		<img src="../assets/images/icon-1.png" />
		     	</div>
		     </template>        	
	    </el-table-column>
	    <el-table-column 
	      type="index"
	      label="编号"
	      width="150">
	    </el-table-column>
	    <el-table-column 
	      prop="amount"
	      label="充值金额">
	    </el-table-column>
	    <el-table-column 
	      prop="vouchersAmount"
	      label="联盟卡代金券金额">
	    </el-table-column>
	    <el-table-column 
	      prop="couponNumber"
	      label="联盟卡折扣券张数">
	    </el-table-column>
	    <el-table-column 
	      prop="updateTime"
	      label="最后修改时间">
	    </el-table-column>
	    <el-table-column
	      fixed="right"
	      label="操作"
	      width="240">
	      <template slot-scope="scope">
	        <el-button type="info" size="small" v-on:click="Editsuser(2,scope.$index, scope.row)">编辑</el-button>
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
  <div class="fixed-box" v-show="payboxTF">
  	<div class="shaw"></div>
  	<div class="content-box" v-if="typenum==1">
  		<h2>新增联盟券<span v-on:click="Closepaybox">X</span></h2>
  		<div class="text">充值金额:<input type="number" v-model="adddata.amount" /></div>
  		<div class="text">商家联盟卡金额:<input type="number" v-model="adddata.vouchersAmount" /></div>
  		<div class="text">联盟卡折扣劵张数:<input type="number" v-model="adddata.couponNumber" /></div>
  		<div class="btn" v-on:click="Truedata(1)">确认</div>
  </div>
  	<div class="content-box" v-if="typenum==2">
  		<h2>设置充值金额<span v-on:click="Closepaybox">X</span></h2>
  		<div class="text">充值金额:<input type="number"  v-model="editdata.amount" /></div>
  		<div class="text">商家联盟卡金额:<input type="number" v-model="editdata.vouchersAmount" /></div>
  		<div class="text">联盟卡折扣劵张数:<input type="number" v-model="editdata.couponNumber" /></div>
  		<div class="btn" v-on:click="Truedata(2)">确认</div>
  </div>
  </div>
	</div>
</template>

<script>
	let Alliancecard={
		data(){
			return{
			      pagedata:{
		          pageNum:1,
		          pagesize:10
			      },				
	 			listdata:[],	
	 			payboxTF:false,
	 			typenum:'',
	 			total:1,
	 			editdata:{
	 				id:'',
	 				amount:'',
	 				vouchersAmount:'',
	 				couponNumber:'',
	 			},
	 			adddata:{
	 				amount:'',
	 				vouchersAmount:'',
	 				couponNumber:'',
	 			},
	 			multipleSelection:[],
	 			deletedata:{
	 				id:''
	 			}
			}
		},
		created(){
	      	var that=this;
	      	this.loadTF=true;
	      	this.$store.dispatch("Getalliancelist",this.pagedata).then(()=>{
	      		that.listdata=this.$store.state.app.alliancelistdata.list;
	            that.total=this.$store.state.app.alliancelistdata.total;
		      	that.pagedata.pageNum=this.$store.state.app.alliancelistdata.pageNum;
		      	that.pagedata.pagesize=this.$store.state.app.alliancelistdata.pageSize; 
		      	that.loadTF=false
	      	})			
		},
		methods:{
	        handleSizeChange(val) {
		         var that=this;
		         this.loadTF=true;
		         this.pagedata.pagesize=val;
		         this.$store.dispatch("Getalliancelist",this.pagedata).then((res)=>{
		         	console.log("12345")
		         	console.log(res.data.data.pageSize)
		      		that.listdata=this.$store.state.app.alliancelistdata.list;
		            that.total=this.$store.state.app.alliancelistdata.total;
			      	that.pagedata.pageNum=this.$store.state.app.alliancelistdata.pageNum;
			      	that.pagedata.pagesize=this.$store.state.app.alliancelistdata.pageSize; 
			      	that.loadTF=false
		        })
	          console.log('每页 '+this.pagedata.pagesize+' 条');
	        },
	        handleCurrentChange(val) {
		        var that=this;
		        this.loadTF=true;
		        this.pagedata.pageNum=val;
		        this.$store.dispatch("Getalliancelist",this.pagedata).then((res)=>{
		        	if(res.data.data.list.length==0){
		        		console.log("23333")
		        	}else{
			      		that.listdata=this.$store.state.app.alliancelistdata.list;
			            that.total=this.$store.state.app.alliancelistdata.total;
				      	that.pagedata.pageNum=this.$store.state.app.alliancelistdata.pageNum;
				      	that.pagedata.pagesize=this.$store.state.app.alliancelistdata.pageSize; 
				      	that.loadTF=false
		      		}
		        })
	          console.log(`当前页: ${val}`);
	        },
	 		Editsuser(num,index,row){
	 			this.payboxTF=true;
	 			this.typenum=num
	 			if(num==2){
	 				this.editdata.id=row.id;
	 				this.editdata.amount=row.amount;
	 				this.editdata.vouchersAmount=row.vouchersAmount;
	 				this.editdata.couponNumber=row.couponNumber;
	 			}
	 		},
	        Closepaybox(){
	        	this.payboxTF=false
	        },
	        handleSelectionChange(val){
	        	this.multipleSelection = val;
	        	console.log(val)
	        },
	        Truedata(num){
	        	var that=this;
	        	if(num==1){
	        		if(this.adddata.amount!=''&&this.adddata.vouchersAmount!=''&&this.adddata.couponNumber!=''){
	        			this.$store.dispatch("Addalliance",this.adddata).then((res)=>{
	        				if(res.data.ok==true){
	        					that.$message('新增成功');
	        					setTimeout(function(){
	        						location.reload()
	        					},3000)
	        				}
	        			})
	        		}else{
	        			if(this.adddata.amount==''){
	        				this.$message('充值金额不能为空');
	        			}
	        			if(this.adddata.vouchersAmount==''){
	        				this.$message('代金券金额不能为空');
	        			}
	        			if(this.adddata.couponNumber==''){
	        				this.$message('折扣券不能为空');
	        			}
	        		}
	        	}
	        	if(num==2){
	        		if(this.editdata.amount!=''&&this.editdata.vouchersAmount!=''&&this.editdata.couponNumber!=''){
	        			this.$store.dispatch("Editalliance",this.editdata).then((res)=>{
	        				if(res.data.ok==true){
	        					that.$message('编辑成功');
	        					setTimeout(function(){
	        						location.reload()
	        					},3000)
	        				}
	        			})
	        		}else{
	        			if(this.editdata.amount==''){
	        				this.$message('充值金额不能为空');
	        			}
	        			if(this.editdata.vouchersAmount==''){
	        				this.$message('代金券金额不能为空');
	        			}
	        			if(this.editdata.couponNumber==''){
	        				this.$message('折扣券不能为空');
	        			}
	        		}
	        	}
	        },
	        Selectsuser(){
	        	var that=this;
	        	console.log(this.multipleSelection.id)
	        	if(this.multipleSelection.id){
	        		this.$store.dispatch("Selectalliance",this.multipleSelection.id).then((res)=>{
	        			if(res.data.ok==true){
	        				that.$message('删除成功');
	        				setTimeout(function(){
	        						location.reload()
    						},3000)
	        			}
	        		})
	        	}else{
	        		this.$message('请选中一条数据');
	        	}
	        }
		}
	}
	export default Alliancecard
</script>

<style>
</style>