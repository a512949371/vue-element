<template>
	<!--新增商家-->
	<div class="fixed-box">
		<div class="shaw"></div>
	<div class="editsuser-box">
		<div class="editsuser">
			<div class="left">商家名称</div>
			<div class="right"><input type="text" v-model="merchdata.merchantsName" /></div>
		</div>
		<div class="editsuser">
			<div class="left">商家电话：</div>
			<div class="right"><input type="text" v-model="merchdata.merchantsPhone"/></div>
		</div>
		<div class="editsuser">
			<div class="left">商家微信：</div>
			<div class="right"><input type="text" v-model="merchdata.merchantsWeChat"/></div>
		</div>
		<div class="editsuser">
			<div class="left">商家地址：</div>
			<div class="right"><input type="text" v-model="merchdata.merchantsAddress"/></div>
		</div>
		<div class="editsuser">
			<div class="left">商家账号：</div>
			<div class="right"><input type="text" v-model="merchdata.merchantsAccount"/></div>
		</div>
		<div class="editsuser">
			<div class="left">商家密码：</div>
			<div class="right"><input type="password" v-model="merchdata.merchantsPassword"/></div>
		</div>
		<div class="editsuser">
			<div class="left">商家简介：</div>
			<div class="right"><textarea v-model="merchdata.merchantsDesc"></textarea></div>
		</div>
		<div class="editsuser">
			<div class="left">商家LOGO：</div>
			<div class="right"><el-upload
			  class="upload-demo"
			  action="http://192.168.1.115:9104/xdjCore/xdjMerchantsAdmin/admin/file/upload"
			  :on-preview="handlePreview"
			  :on-remove="handleRemove"
			  list-type="picture"
			  :on-success="updatasuccess"
			  :on-error="updataerror"
			  :limit="1"
			  >
			  <el-button size="small" type="primary">点击上传</el-button>
			  <div slot="tip" class="el-upload__tip">只能上传一张jpg/png文件</div>
			</el-upload>
		  </div>
		</div>		
		<div class="box">
		<div class="btn-editsuser" v-on:click="Closeadd">取消</div>
		<div class="btn-editsuser" v-on:click="Tureinfo">确认</div>
		</div>
	</div>
	</div>
</template>

<script>
	let Newmerchants={
		data(){
			return{
				merchdata:{
					merchantsName:'',
					merchantsPhone:'',
					merchantsWeChat:'',
					merchantsAddress:'',
					merchantsAccount:'',
					merchantsPassword:'',
					merchantsDesc:'',
					merchantsLogo:""
				},
			}
		},
		props:['editdata','num'],
		created(){
		},
		methods:{
			Tureinfo(){
				var that=this;
				if(this.merchdata.merchantsName!=''&&this.merchdata.merchantsPhone!=''&&this.merchdata.merchantsWeChat!=''&&this.merchdata.merchantsAddress!=''&&this.merchdata.merchantsAccount!=''&&this.merchdata.merchantsPassword!=''){
					this.$store.dispatch("Addshopname",this.merchdata).then((res)=>{
						if(res.data.ok==true){
							that.$message('新增成功');
							setTimeout(function(){
									location.reload()
							},2000)
						}else{
//							that.$message(res.data);
						}
					})					
				}else{
					if(this.merchdata.merchantsName==''){
						that.$message('商家名称不能为空');
					}else if(this.merchdata.merchantsPhone==''){
						that.$message('商家电话不能为空');
					}else if(this.merchdata.merchantsWeChat==''){
						that.$message('商家微信不能为空');
					}else if(this.merchdata.merchantsAddress==''){
						that.$message('商家地址不能为空');
					}else if(this.merchdata.merchantsAccount==''){
						that.$message('商家账号不能为空');
					}else{
						that.$message('商家密码不能为空');
					}
				}

			},
			Closeadd(){
				this.$emit("Closeadd")
			},
		    handleRemove(file, fileList) {
		        console.log(file, fileList);
		      },
		    handlePreview(file) {
		    	console.log("222222");
		        console.log(file);
		      },
		    updatasuccess(res,file,fileList){
		    	this.merchdata.merchantsLogo=res.key;
		    	console.log(res,file,fileList)
		    },
		    updataerror(res){
		    	console.log(res)
		    	this.$message('上传失败，请重新上传');
		    }
		}
	}
	export default Newmerchants
</script>

<style lang="scss">
</style>