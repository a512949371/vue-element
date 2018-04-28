<template>
	<div>
	<div class="select-box">
		<div class="select">
			  <el-input placeholder="请输入内容" v-model="searchdata.phone" size="small">
			    <template slot="prepend" class="fontColor">手机号码:</template>
			    <template slot="append">后4位数</template>
			  </el-input>
		</div>
		<div class="select">
			  <el-input placeholder="请输入内容" v-model="searchdata.realName" size="small">
			    <template slot="prepend" class="fontColor">姓名:</template>
			  </el-input>
		</div>
		<div class="select">
			  <span class="other">开始日期:</span>
			  <el-date-picker
		      type="date"
		      v-model="searchdata.startTime"
		      placeholder="选择日期" size="small">
		    </el-date-picker>
		</div>
		<div class="select">
			 <span class="other">结束日期:</span>
			  <el-date-picker
		      type="date"
		      v-model="searchdata.endTime"
		      placeholder="选择日期" size="small">
		    </el-date-picker>
		</div>
		<div class="select">
			<div class="btn" v-on:click="Search">搜索</div>
		</div>
	</div>
	<div class="select-box" v-if="btnauthority==1">
	 <span class="other">店面:</span>
	 <el-select v-model="searchdata.nickname" clearable placeholder="请选择" size="small"  >
	    <el-option
	      v-for="(value,key) in storeslist"
	      :key="value.id"
	      :label="value.nickname"
	      :value="value.nickname">
	       {{value.nickname}}
	    </el-option>
	  </el-select>	
	</div>
 </div>
</template>

<script>
	import moment from 'moment'
	let Select={
		data(){
			return{
				searchdata:{
					phone:'',
					realName:'',
					startTime:'',
					endTime:'',
					nickname:''
				},
			    storeslist:[],		
			}
		},
		props:['btnauthority'],
		created(){
			var that=this;
	      	this.$store.dispatch("Getstoresquest").then((res)=>{
	      		that.storeslist=this.$store.state.app.storesdata
	      	});			
		},
		methods:{
			Search(){
				if(this.searchdata.startTime!=''){
					this.searchdata.startTime=moment(this.searchdata.startTime).format("YYYY-MM-DD HH:mm:ss")
				}
				if(this.searchdata.endTime!=''){
					this.searchdata.endTime=moment(this.searchdata.endTime).format("YYYY-MM-DD HH:mm:ss")
				}
				this.$emit("parentsearch",this.searchdata)
			}
		}
	}
	export default Select
</script>

<style lang="scss">
	.custom-20a0ff .el-input-group__prepend{
		color: #666;
		background-color: #e5e5e5;
		border-color: #e5e5e5
	}
	.custom-20a0ff .el-input-group__append{
		background-color: #e5e5e5;
		border-color: #e5e5e5
	}
	.select-box{
		display: flex;
		padding: 10px;
		background-color: #f1f1f1;
		flex-wrap: wrap;
		.select{
			flex: 1; 
			padding-left:30px;
			.btn{
				width: 100px;
				border: 1px solid #e5e5e5;
				border-radius: 5px;
				background-color:rgb(164,193,179);
				padding: 3px 10px;
				text-align: center;
				cursor: pointer;
				color: #FFF;
				display: inline-block;
			}
		}
		.other{
			color: #666;
			padding: 0 10px;
			line-height: 30px;
		}
	}
</style>