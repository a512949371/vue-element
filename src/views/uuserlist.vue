<template>
	<div class="postion-box">
	<Select v-on:parentsearch="Parentsearch" :btnauthority="btnauthority"></Select>
  <div class="home">
    <div class="page-content table">
    <el-table
    :data="uuserlist"
    border
    style="width: 100%">
    <el-table-column
      type="index"
      :label="tit[0]"
      width="100">
    </el-table-column>
    <el-table-column
      prop="phone"
      :label="tit[1]">
    </el-table-column>
    <el-table-column
      prop="realName"
      :label="tit[2]">
    </el-table-column>
    <el-table-column
      prop="userName"
      :label="tit[3]">
    </el-table-column>
    <el-table-column
      prop="nickName"
      :label="tit[4]">
    </el-table-column>
    <el-table-column
      prop="detailAddress"
      :label="tit[5]">
    </el-table-column>
    <el-table-column
      prop="balanceSum"
      :label="tit[6]">
    </el-table-column>
    <el-table-column
      prop="storeName"
      :label="tit[7]">
    </el-table-column>
    <el-table-column
      prop="createTime"
      :label="tit[8]">
    </el-table-column>
    <el-table-column
      fixed="right"
      :label="tit[9]"
      width="160">
      <template slot-scope="scope">
        <el-button @click="Openpaybox(1,scope.row)" type="text" size="small">充值</el-button>
        <el-button type="text" size="small" v-on:click="Openpaybox(2,scope.row)">扣款</el-button>
      </template>
    </el-table-column>
  </el-table>
    </div>
    <div class="pagination mt20">
      <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="pagedatas.pageNum"
      :page-sizes="[10,20,50,100]"
      :page-size="pagedatas.pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
      </el-pagination>
    </div>
  <div class="fixed-box" v-show="payboxTF">
  	<div class="shaw"></div>
  	<div class="content-box uuser-box" v-if="status==1">
  		<h2>用户充值<span v-on:click="Closepaybox">X</span></h2>
  		<div class="text">姓名:{{userInfo.realName}}</div>
  		<div class="text">手机号码:{{userInfo.phone}}</div>
  		<div class="text">当前余额:{{userInfo.balanceSum}}</div>
  		<div class="text">余额充值:<input type="number" v-model="useraddmoney.orderPrice"/></div>
  		<div class="text flex-box"><el-checkbox v-model="checkedone" v-on:change="Searchactmoney">活动赠送余额</el-checkbox>
  			<div class="ml20" v-show="checkedone">  
  			<el-input  size="mini" v-model="useraddmoney.presentAmount"></el-input>
  			</div>
  		</div>
  		<div class="text flex-box"><el-checkbox v-model="checkedtwo" v-on:change="Searchallianceact">商家联盟券赠送</el-checkbox>
  			<div v-show="checkedtwo" class="flex-box">
  				<div class="ml20" >
	  			<el-input  size="mini" v-model="useraddmoney.amount">
	  				 <template slot="prepend">代金券</template>
	  			</el-input>
	  			</div>
	  			<div class="ml20" >
	  			<el-input  size="mini" v-model="useraddmoney.number" >
	  				 <template slot="prepend">折扣券</template>
	  			</el-input>
	  			</div>
  			</div>
  			
  		</div>
  		<div class="text">备注:
  			<select v-model="useraddmoney.remark">
  				<option>无</option>
  				<option>新用户充值</option>
  				<option>老用户充值</option>
  			</select></div>
  		<div class="btn" v-on:click="Tureinfo(1)">确认充值</div>
  	</div>
  	<div class="content-box uuser-box" v-else>
  		<h2>用户扣款<span v-on:click="Closepaybox">X</span></h2>
  		<div class="text">姓名:{{userInfo.realName}}</div>
  		<div class="text">手机号码:{{userInfo.phone}}</div>
  		<div class="text">当前洗衣卡余额:{{userInfo.balanceSum}}</div>
  		<div class="text">订单号:<input type="text" v-model="userreducemoney.orderCode" /></div>
  		<div class="text">扣款金额:<input type="number" v-model="userreducemoney.orderPrice" /></div>
  		<div class="btn" v-on:click="Tureinfo(2)">确认扣款</div>
  	</div>
  </div>
  </div>
  <load v-show="loadTF"></load>
  </div>
</template>
  <script>
  	import Select from '../components/nav/select'
  	import Load from '../components/other/load'
    export default {
      data() {
        return {
        	tit:["编号","手机号码","姓名","会员ID","用户昵称","地址","洗衣卡余额","开卡店面","注册时间","操作"],
		    pagedatas:{
		          pageNum:1,
		          pagesize:10,
		          phone:'',
				  realName:'',
				  startTime:'',
				  endTime:'',
				  storeName:''
		      },
		      uuserlist:[],
        	total:1,
			payboxTF:false,
			paystatus:true,
			paystatusone:true,
			status:'',
			userInfo:'',
			cardlist:[],
			useraddmoney:{
				customerId:'',
				storeName:'',
				orderPrice:'',
				orderTag:'',
				chargeSetId:'',
				remark:'',
				chapterTag:'',
				presentAmount:'',
				amount:'',
				number:''
			},
			userreducemoney:{
				customerId:'',
				orderCode:'',
				orderPrice:''
			},
			btnauthority:'',
			loadTF:false,
			checkedone:false,
			checkedtwo:false,
			
        }
      },
      components:{
      	Select,
      	Load
      },
      created(){
      	var that=this;
      	this.loadTF=true;
      	this.$store.dispatch("Getuuserquest",this.pagedatas).then((res)=>{
      		if(res.data.ok==true){
	      		that.uuserlist=this.$store.state.app.uuserdata.list;
	      		that.btnauthority=this.$store.state.app.uuserdata.orderBy;
	            that.total=this.$store.state.app.uuserdata.total;
		      	that.pagedatas.pageNum=this.$store.state.app.uuserdata.pageNum;
		      	that.pagedatas.pagesize=this.$store.state.app.uuserdata.pageSize; 
		      	that.loadTF=false      			
      		}
      	});  
      },
      methods:{
        handleSizeChange(val) {
	         var that=this;
	         this.loadTF=true;
	         this.pagedatas.pagesize=val;
	         this.$store.dispatch("Getuuserquest",this.pagedatas).then((res)=>{
	         	if(res.data.ok==true){
		        	that.total=this.$store.state.app.uuserdata.total;
		      		that.pagedatas.pageNum=this.$store.state.app.uuserdata.pageNum;
		      		that.pagedatas.pagesize=this.$store.state.app.uuserdata.pageSize;
		      		that.uuserlist=this.$store.state.app.uuserdata.list;
		      		that.loadTF=false	         		
	         	}

	        })
          console.log('每页 '+this.pagedatas.pagesize+' 条');
        },
        handleCurrentChange(val) {
	        var that=this;
	        this.loadTF=true;
	        this.pagedatas.pageNum=val;
	        this.$store.dispatch("Getuuserquest",this.pagedatas).then((res)=>{
	        	if(res.data.ok==true){
		        	if(res.data.data.list.length==0){
		        		console.log("23333")
		        	}else{
		        	that.total=this.$store.state.app.uuserdata.total;
		      		that.pagedatas.pageNum=this.$store.state.app.uuserdata.pageNum;
		      		that.pagedatas.pagesize=this.$store.state.app.uuserdata.pageSize;
		      		that.uuserlist=this.$store.state.app.uuserdata.list;
		      		
		      		}
		        that.loadTF=false
	        	}

	        })
          console.log(`当前页: ${val}`);
        }, 
	    Closepaybox(){
    		this.payboxTF=false
        },
        Openpaybox(num,row){
        	this.payboxTF=true;
        	this.status=num;
        	this.userInfo=row;
        	if(num==1){
	        	this.useraddmoney.customerId=row.customerId;
	        	this.useraddmoney.storeName=row.storeName;        		
        	}
        	if(num==2){
        		this.userreducemoney.customerId=row.customerId;  
        	}
        },
        Tureinfo(num){
        	var that=this;
        	if(num==1){
        		if(this.useraddmoney.chargeSetId!=''){
        			this.useraddmoney.orderTag=2
        		}else{
        			this.useraddmoney.orderTag=1
        		}
        		if(this.paystatus){
        			if(this.useraddmoney.orderPrice>0||this.useraddmoney.chargeSetId!=''){
		        		 this.paystatus=false;	
		        		 this.$store.dispatch("Getuserpayquest",this.useraddmoney).then((res)=>{
		        			if(res.data.ok==true){
		        				that.$message('充值成功');
		        				that.payboxTF=false;
		        				this.paystatus=true;
		        				setTimeout(function(){
		        					location.reload()
		        				},3000)
		        			}else{
		        				that.$message(res.data.msg);
		        				this.paystatusone=true;
		        			}
		        		})        				
        			}else{
        			if(this.useraddmoney.orderPrice<=0&&this.useraddmoney.chargeSetId==''){
        				that.$message('充值金额不能小于0或者活动充值不能为空');
        			}
        			}
        		}else{
        			
        			if(!this.paystatus){
        				that.$message('请勿连续操作');
        			}
        		}
        	}
        	if(num==2){
        		if(this.userreducemoney.orderCode!=''&&this.userreducemoney.orderPrice!=''){
        			if(this.paystatusone){
        				this.paystatusone=false;
		        		this.$store.dispatch("Getuserdeucequest",this.userreducemoney).then((res)=>{
		        			if(res.data.ok==true){
		        				that.$message('扣款成功');
		        				that.payboxTF=false;
		        				this.paystatusone=true;
		        				setTimeout(function(){
		        					location.reload()
		        				},3000)
		        			}else{
		        				that.$message(res.data.msg);
		        				this.paystatusone=true;
		        			}
		        		})        				
        			}
        	}else{
        		that.$message('请勿连续操作');
        	}
          }
        },
        Parentsearch(childdata){
        	var that=this;
        	this.loadTF=true;
        	this.pagedatas.phone=childdata.phone;
        	this.pagedatas.realName=childdata.realName;
        	this.pagedatas.startTime=childdata.startTime;
        	this.pagedatas.endTime=childdata.endTime;
        	this.pagedatas.storeName=childdata.nickname;
        	this.$store.dispatch("Getuuserquest",this.pagedatas).then((res)=>{
        		if(res.data.ok==true){
	 	      		that.uuserlist=this.$store.state.app.uuserdata.list;
		      		that.total=this.$store.state.app.uuserdata.total;
		      		that.pagedatas.pageNum=this.$store.state.app.uuserdata.pageNum;
		      		that.pagedatas.pagesize=this.$store.state.app.uuserdata.pageSize;    
		      		that.loadTF=false       			
        		}
	      	});  
        },
        Searchactmoney(){
        	var that=this;
        	if(this.checkedone==true){
        		this.useraddmoney.chargeSetId=2
        		if(this.useraddmoney.orderPrice!=''){
        			this.$store.dispatch("Searchactpay",this.useraddmoney.orderPrice).then((res)=>{
        				console.log(res)
        				if(res.data.ok==true){
        					that.useraddmoney.presentAmount=res.data.data.present
        				}
        			})
        		}else{
        			this.$message('充值金额不能为空');
        		}	
        	}else{
        		this.useraddmoney.chargeSetId=1
        	}
        },
        Searchallianceact(){
        	var that=this;
        	if(this.checkedtwo==true){
        		this.useraddmoney.chapterTag=1
        		if(this.useraddmoney.orderPrice!=''){
        			this.$store.dispatch("Searchallianceact",this.useraddmoney.orderPrice).then((res)=>{
        				console.log(res)
        				if(res.data.ok==true){
        					that.useraddmoney.amount =res.data.data.vouchersAmount;
        					that.useraddmoney.number =res.data.data.couponNumber
        				}
        			})
        		}else{
        			this.$message('充值金额不能为空');
        		}
        	}else{
        		this.useraddmoney.chapterTag=2
        	}
        }        
      }
    }
  </script>
  <style lang="scss">
	  	.uuser-box{
	  		select{
	  			border:1px solid #e5e5e5 ;
	  			padding: 2px 5px;
	  		}
	  	}
  	.flex-box{
  		display: flex;
  	}
  </style>