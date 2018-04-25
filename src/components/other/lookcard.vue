<template>
		<!--查看卡包-->
	<div class="look-card fixed-cardbox">
		<div class="content-box">
			<div class="flex-box">
				<div class="left">
					<div class="card-box">
						<div class="dec">卡券名称：{{editdata.name}}</div>
						<div class="input-box">
							
						</div>
					</div>
					<div class="card-box">
						<div class="dec">商家名称：</div>
						<div class="input-box">
							<div class="box-one">
								<div>{{cardinfo.merchantsName}}</div>
								<div class="btn ml20">去选择</div>
							</div>
							
						</div>
						
					</div>
					<div class="card-box">
						<div class="dec">卡券类型：</div>
						<div class="input-box">
							<p v-if="cardinfo.type==1">代金券</p>
							<p v-else>折扣券</p>
						</div>
					</div>
					<div class="card-box" v-if="cardinfo.type==1">
						<div class="dec" >卡券金额：</div>
						<div class="input-box">
							{{cardinfo.amount}}
						</div>
					</div>
					<div class="card-box" v-else>
						<div class="dec">卡券折扣：</div>
						<div class="input-box">
							{{cardinfo.rebate}}
						</div>
					</div>
					<div class="card-box">
						<div class="dec">卡券数量：</div>
						<div class="input-box">
							{{cardinfo.chapterTotal}}
						</div>
					</div>
					<div class="card-box">
						<div class="dec">是否有有效期限<span class="red">*</span></div>
						<div class="input-box" v-if="cardinfo.isInvalid==1">
							是
						</div>
						<div class="input-box" v-else>
							否
						</div>
					</div>
					<div class="card-box" v-if="cardinfo.isInvalid==1">
						<div class="dec">有效时间：</div>
						<div class="input-box">
								<div class="block">
							    <span class="demonstration">开始时间:{{cardinfo.startTime}}</span>
							  </div>	
						</div>
					</div>
					<div class="card-box">
						<div class="dec" style="opacity: 0;">结束时间：</div>
						<div class="input-box">
							  <div class="block">
							    <span class="demonstration">结束时间:{{cardinfo.endTime}}</span>
							  </div>								
						</div>
					</div>
					<div class="card-box">
						<div class="dec">是否为零门槛购物<span class="red">*</span></div>
						<div class="input-box">
							<el-switch
							  v-model="editdata.isZero"
							  active-value="1"
  							  inactive-value="0">
							</el-switch>
						</div>
					</div>
					<div v-if="editdata.isZero==0">
					<div class="card-box">
						<div class="dec">条件：</div>
						<div class="input-box">满
							<input type="text" v-model="editdata.lowest" />
							使用
						</div>
					</div>
					<div class="card-box">
						<div class="dec">适用门店：</div>
						<div class="input-box">
							<input type="text" v-model="editdata.storeName" />
						</div>
					</div>
					<div class="card-box">
						<div class="dec">电话：</div>
						<div class="input-box">
							<input type="text" v-model="editdata.storePhone" />
						</div>
					</div>
					<div class="card-box">
						<div class="dec">地址：</div>
						<div class="input-box">
							<input type="text" v-model="editdata.storeAddress" />
						</div>
					</div>
					<div class="card-box">
						<div class="dec">使用规则：</div>
						<div class="input-box">
							<textarea v-model="editdata.useRules"></textarea>
						</div>
					</div>
					</div>
					<div class="flex-box">
					<div class="addcard-box" v-on:click="Closelook">关闭</div>
					<div class="addcard-box" v-on:click="Editlook">确认添加</div>
					</div>
				</div>
				<div class="right">
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	let Lookcard={
		data(){
			return{
				cardinfo:{
					merchantsName:'',
					type:'',
					amount:'',
					rebate:'',
					chapterTotal:'',
					isInvalid:'',
					startTime:'',
					endTime:'',

				},
				editdata:{
					name:'',
					id:'',
					isZero:'',
					lowest:'',
					storeName:'',
					storeId:'',
					storePhone:'',
					storeAddress:'',
					useRules:''					
				}
			}
		},
		props:['carddata'],
		created(){
		},
		watch:{
			datachange:function(){
				return this.carddata
			}
		},
		computed:{
			datachange(){
				var that=this
				this.$store.dispatch("Getcardinfo",this.carddata).then(()=>{
					that.cardinfo.merchantsName=this.$store.state.app.cardinfodata.merchantsName;
					that.cardinfo.type=this.$store.state.app.cardinfodata.type;
					that.cardinfo.amount=this.$store.state.app.cardinfodata.amount;
					that.cardinfo.rebate=this.$store.state.app.cardinfodata.rebate;
					that.cardinfo.chapterTotal=this.$store.state.app.cardinfodata.chapterTotal;
					that.cardinfo.isInvalid=this.$store.state.app.cardinfodata.isInvalid;
					that.cardinfo.startTime=this.$store.state.app.cardinfodata.startTime;
					that.cardinfo.endTime=this.$store.state.app.cardinfodata.endTime;
					that.editdata.name=this.$store.state.app.cardinfodata.name;
					that.editdata.id=this.$store.state.app.cardinfodata.id;
					that.editdata.isZero=this.$store.state.app.cardinfodata.isZero;
					that.editdata.lowest=this.$store.state.app.cardinfodata.lowest;
					that.editdata.storeName=this.$store.state.app.cardinfodata.storeName;
					that.editdata.storeId=this.$store.state.app.cardinfodata.storeId;
					that.editdata.storePhone=this.$store.state.app.cardinfodata.storePhone;
					that.editdata.storeAddress=this.$store.state.app.cardinfodata.storeAddress;
					that.editdata.useRules=this.$store.state.app.cardinfodata.useRules;
				})
			}
		},
		methods:{
			Closelook(){
				this.$emit("Closelook")
			},
			Editlook(){
				var that=this;
				this.$store.dispatch("Editcardinfo",this.editdata).then((res)=>{
					if(res.data.ok==true){
						that.$message('修改成功');
						setTimeout(function(){
							location.reload()
						},2000)
					}
				})
			}
		}
	}
	export default Lookcard
</script>

<style lang="scss">
	.look-card{
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		background-color: #FFF;
		z-index: 200;
	}
</style>