<template>
	<!--新增卡包-->
	<div class="fixed-cardbox">
		<div class="content-box">
			<div class="flex-box">
				<div class="left">
					<div class="card-box">
						<div class="dec">卡券名称：</div>
						<div class="input-box">
							<input type="text" v-model="cardinfo.name" />
						</div>
					</div>
					<div class="card-box">
						<div class="dec">商家名称：</div>
						<div class="input-box">
							<div class="box-one">
								<div style="line-height: 28px;">{{cardinfo.merchantsName}}</div>
								<div class="btn ml20" v-on:click="Chooseshop">去选择</div>
							</div>
							
						</div>
						
					</div>
						<div class="box">
							<div class="radio-box"> <el-radio v-model="cardinfo.type" label="1" size="mini">代金券</el-radio></div>
							<div class="radio-box"><el-radio v-model="cardinfo.type" label="2" size="mini">折扣券</el-radio></div>
						</div>
					<div class="card-box" v-if="cardinfo.type==1">
						<div class="dec">卡券金额：</div>
						<div class="input-box">
							<input type="text" v-model="cardinfo.amount" />
						</div>
					</div>
					<div class="card-box" v-else>
						<div class="dec">卡券折扣：</div>
						<div class="input-box">
							  <el-input v-model="cardinfo.rebate" type="number" step="0.01" size="small" style="width: 300px;">
							    <template slot="append">请输入0-1之间的数</template>
							  </el-input>
						</div>
					</div>
					<div class="card-box">
						<div class="dec">卡券数量：</div>
						<div class="input-box">
							<input type="text" v-model="cardinfo.chapterTotal" />
						</div>
					</div>
					<div class="card-box">
						<div class="dec">是否有有效期限<span class="red">*</span></div>
						<div class="input-box">
							<el-switch
							  v-model="cardinfo.isInvalid"
							  active-value="1"
  							  inactive-value="0">
							</el-switch>
						</div>
					</div>
					<div v-if="cardinfo.isInvalid==1">
					<div class="card-box" >
						<div class="dec">有效时间：</div>
						<div class="input-box">
							  <div class="block">
							    <span class="demonstration">开始时间:</span>
							    <el-date-picker
							      type="date"
							      placeholder="选择日期"
							      size="small"
							      v-model="cardinfo.startTime">
							    </el-date-picker>
							  </div>								
						</div>
					</div>
					<div class="card-box">
						<div class="dec" style="opacity: 0;">结束时间：</div>
						<div class="input-box">
							  <div class="block">
							    <span class="demonstration">结束时间:</span>
							    <el-date-picker
							      type="date"
							      placeholder="选择日期"
							      size="small"
							      v-model="cardinfo.endTime">
							    </el-date-picker>
							  </div>								
						</div>
					</div>
					</div>
					<div class="card-box">
						<div class="dec">是否为零门槛购物<span class="red">*</span></div>
						<div class="input-box">
							<el-switch
							  v-model="cardinfo.isZero"
							  active-value="1"
  							  inactive-value="0">
							</el-switch>
						</div>
					</div>
					<div class="card-box" v-if="cardinfo.isZero==0">
						<div class="dec">条件：</div>
						<div class="input-box">满
							<input type="text"  v-model="cardinfo.lowest"/>
							使用
						</div>
					</div>
					<div class="card-box">
						<div class="dec">适用门店：</div>
						<div class="input-box">
							<input type="text" v-model="cardinfo.storeName" />
						</div>
					</div>
					<div class="card-box">
						<div class="dec">电话：</div>
						<div class="input-box">
							<input type="text" v-model="cardinfo.storePhone" />
						</div>
					</div>
					<div class="card-box">
						<div class="dec">地址：</div>
						<div class="input-box">
							<input type="text" v-model="cardinfo.storeAddress" />
						</div>
					</div>
					<div class="card-box">
						<div class="dec">使用规则：</div>
						<div class="input-box">
							<textarea v-model="cardinfo.useRules"></textarea>
						</div>
					</div>
					<div class="addcard-box" v-on:click="Addtrue">确认添加</div>
				</div>
				<div class="right">
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import moment from 'moment'
	let Newcardbox={
		data(){
			return{
				cardinfo:{
					name:'',	
					merchantsId:'',
					merchantsName:'',
					type:'1',
					amount:'',
					rebate:'',
					chapterTotal:'',
					isInvalid:'1',
					startTime:'',
					endTime:'',
					isZero:'1',
					lowest:'',
					storeName:'',
					storePhone:'',
					storeAddress:'',
					useRules:''	
				},
			}
		},
		created(){
			this.cardinfo.merchantsId=this.$route.query.id;
			this.cardinfo.merchantsName=this.$route.query.name;
		},
		methods:{
			Chooseshop(){
				this.$router.push("/merchants/merchantslist")
			},
			Addtrue(){
				var that=this;
				if(this.cardinfo.type==1){
					this.cardinfo.rebate='0';
				}
				if(this.cardinfo.type==2){
					this.cardinfo.amount='';
					if(0<this.cardinfo.rebate&&this.cardinfo.rebate<1){
						
					}else{
						this.$message('折扣范围不在0-1之间');
						console.log(this.cardinfo.rebate<1)
						return
					}
				}
				if(this.cardinfo.isInvalid==0){
					this.cardinfo.startTime='';
					this.cardinfo.endTime=''
				}else{
					this.cardinfo.startTime=moment(this.cardinfo.startTime).format("YYYY-MM-DD HH:mm:ss");
					this.cardinfo.endTime=moment(this.cardinfo.endTime).format("YYYY-MM-DD HH:mm:ss")
				}
				if(this.cardinfo.isZero==1){
					this.cardinfo.lowest='';
				}
				if(this.cardinfo.name!=''&&this.cardinfo.merchantsName!=''&&this.cardinfo.storeName!=''&&this.cardinfo.storePhone!=''&&this.cardinfo.storeAddress!=''&&this.cardinfo.useRules!=''){
					this.$store.dispatch("Addcardinfo",this.cardinfo).then((res)=>{
						if(res.data.ok==true){
							that.$message('新增卡包成功');
							setTimeout(function(){
		        					that.$router.push("/cardmanagement/cardboxlist")
		        				},3000)
						}
					})
				}else{
					if(this.cardinfo.name==''){
						this.$message('卡券名称不能为空');
					}
					if(this.cardinfo.merchantsName==''){
						this.$message('商家名称不能为空');
					}
					if(this.cardinfo.storeName==''){
						this.$message('门店名称不能为空');
					}
					if(this.cardinfo.storePhone==''){
						this.$message('电话不能为空');
					}
					if(this.cardinfo.storeAddress==''){
						this.$message('门店地址不能为空');
					}
					if(this.cardinfo.useRules==''){
						this.$message('使用规则不能为空');
					}
				}
				console.log("打断测试")
			}
		}
	}

	export default Newcardbox
</script>

<style lang="scss">
	.custom-20a0ff .el-switch.is-checked .el-switch__core{
		border-color: #666;
		background-color: #666;
	}
	.custom-20a0ff .el-radio__input.is-checked .el-radio__inner{
		border-color: #666;
		background: #666;
	}
	.red{
		color: #f00;
		padding: 0 5px;
	}
	.box-one{
		display: flex;
	}
	.ml20{
		margin-left: 20px;
	}
	.fixed-cardbox{

		.content-box{

			background-color: #FFF;
			.flex-box{
				display: flex;
				padding-top: 20px;
				.left{
					flex: 1;
					.box{
						display: flex;
						padding-top: 20px;
						justify-content:flex-start;
						margin-left:300px;
						.radio-box{
							padding-right:80px;
						}
					}					
					.card-box{
						display: flex;
						justify-content:center;
						align-items: center;
						padding-top: 20px;
						.dec{
							margin-left: 300px;
						}
						.input-box{
							flex: 1;
							input{
								border: 1px solid #e5e5e5;
								padding: 2px 10px;
								font-size: 14px;
							}
							textarea{
								border:1px solid #e5e5e5 ;
								min-height: 40px;
								min-width: 260px;
							}
							
						}
						.time-box{
							margin-top: 15px;
							margin-left: 15px;
						}
					}	
				}
				.right{
					width: 200px;
					p{
						font-size: 16px;
						color: #666;
					}
				}
			}
			.addcard-box{
				width: 120px;
				padding: 3px 10px;
				text-align: center;
				margin: 30px auto 0 auto;
				border:1px solid #e5e5e5 ;
				background-color: #a4b3c1;
				color: #FFF;
				border-radius: 7px;
				cursor: pointer;
				margin-bottom: 30px;
			}

		}
	}
</style>