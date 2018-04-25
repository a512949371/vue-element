<template>
  <div class="home">
    <div class="page-content table">
    <el-table
    :data="testdata.tableData"
    border
    style="width: 100%">
    <el-table-column
      prop="date"
      :label="tit[0]">
    </el-table-column>
    <el-table-column
      prop="name"
      :label="tit[1]">
    </el-table-column>
    <el-table-column
      prop="province"
      :label="tit[2]">
    </el-table-column>
    <el-table-column
      prop="city"
      :label="tit[3]">
    </el-table-column>
    <el-table-column
      prop="address"
      :label="tit[4]">
    </el-table-column>
    <el-table-column
      prop="zip"
      :label="tit[5]">
    </el-table-column>
    <el-table-column
      prop="zip"
      :label="tit[6]">
    </el-table-column>
    <el-table-column
      prop="zip"
      :label="tit[7]">
    </el-table-column>
    <el-table-column
      prop="zip"
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
      :current-page="currentPage"
      :page-sizes="[2, 3, 4, 5]"
      :page-size="2"
      layout="total, sizes, prev, pager, next, jumper"
      :total="testdata.total">
      </el-pagination>
    </div>
  <div class="fixed-box" v-show="payboxTF">
  	<div class="shaw"></div>
  	<div class="content-box" v-if="status==1">
  		<h2>用户充值<span v-on:click="Closepaybox">X</span></h2>
  		<div class="text">姓名:</div>
  		<div class="text">手机号码:</div>
  		<div class="text">余额充值:<input type="text" /></div>
  		<div class="text">备注:
  			<select>
  				<option>无</option>
  			</select></div>
  		<div class="text">活动充值:
  			<select>
  				<option>满2000送500</option>
  			</select>
  		</div>
  		<div class="btn">确认充值</div>
  	</div>
  	<div class="content-box" v-else>
  		<h2>用户扣款<span v-on:click="Closepaybox">X</span></h2>
  		<div class="text">姓名:</div>
  		<div class="text">手机号码:</div>
  		<div class="text">当前洗衣卡余额:</div>
  		<div class="text">订单号:<input type="text" /></div>
  		<div class="text">扣款金额:<input type="text" /></div>
  		<div class="btn">确认扣款</div>
  	</div>
  </div>
  </div>
</template>
<script>
	export default{
		data(){
			return{
				payboxTF:false,
				status:''
			}
		},
		props:["tit","testdata"],
		methods: {
        handleSizeChange(val) {
	         var that=this;
	         this.pagedata.pageSize=val;
	         this.$store.dispatch("Getcardchargequest",this.pagedata).then(()=>{
	        	that.total=this.$store.state.app.cardchargedata.total;
	      		that.pagedata.pageNum=this.$store.state.app.cardchargedata.pageNum;
	      		that.pagedata.pageSize=this.$store.state.app.cardchargedata.pageSize;
	      		that.listdata=this.$store.state.app.cardchargedata.list;
	        })
          console.log('每页 '+this.pagedata.pagesize+' 条');
        },
        handleCurrentChange(val) {
	        var that=this;
	        this.pagedata.pageNum=val;
	        this.$store.dispatch("Getcardchargequest",this.pagedata).then(()=>{
	        	that.total=this.$store.state.app.cardchargedata.total;
	      		that.pagedata.pageNum=this.$store.state.app.cardchargedata.pageNum;
	      		that.pagedata.pageSize=this.$store.state.app.cardchargedata.pageSize;
	      		that.listdata=this.$store.state.app.cardchargedata.list;
	        })
          console.log(`当前页: ${val}`);
        }, 
		      Closepaybox(){
        	this.payboxTF=false
	        },
	        Openpaybox(num,row){
	        	this.payboxTF=true
	        	this.status=num
	        }
       }
        
	}
</script>
<style lang="scss">
	.content-box{
		textarea{
			min-height: 20px;
		}
		select{
			border:1px solid #e5e5e5 ;
			padding: 2px 5px;
		}
	}
</style>