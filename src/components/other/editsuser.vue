<template>
	<div class="fixed-box">
		<div class="shaw"></div>
	<div class="editsuser-box">
		<div class="editsuser">
			<div class="left">账号</div>
			<div class="right"><input type="text" v-model="userdata.username"/></div>
		</div>
		<div class="editsuser">
			<div class="left">昵称</div>
			<div class="right"><input type="text" v-model="userdata.nickname"/></div>
		</div>
		<div class="editsuser">
			<div class="left">姓名</div>
			<div class="right"><input type="text" v-model="userdata.realname"/></div>
		</div>
		<div class="editsuser">
			<div class="left">手机号</div>
			<div class="right"><input type="text" v-model="userdata.telephone"/></div>
		</div>
		<div class="editsuser">
			<div class="left">密码</div>
			<div class="right"><input type="password" v-model="userdata.password"/></div>
		</div>
		<div class="editsuser">
			<div class="left">确认密码</div>
			<div class="right"><input type="password" v-model="userdata.password2"/></div>
		</div>
		<div class="editsuser">
			<div class="left">选择角色</div>
			<div class="right">
			<select v-model="userdata.rid">
				<template v-for="item in rolelist">
				<option v-if="userdata.roleDesc==item.roleDesc" selected :value="item.id">{{item.roleDesc}}</option>
				<option v-else :value="item.id">{{item.roleDesc}}</option>
				</template>
			</select></div>
		</div>
		<div class="box">
		<div class="btn-editsuser" v-on:click="Closeedit">取消</div>
		<div class="btn-editsuser" v-on:click="Tureinfo">确认</div>
		</div>
	</div>
	</div>
</template>

<script>
	let Editsuser={
		data(){
			return {
				userdata:{
					username:'',
					nickname:'',
					telephone:'',
					realname:'',
					password:null,
					password2:null,
					rid:'',
					id:''
				},
				rolelist:[],
			}
		},
		props:['editdata','num'],
		created(){
			var that=this;
			let data={
				pageNum:1,
		        pagesize:20,
		        roleName:''
			}
			this.$store.dispatch("Getrole",data).then(()=>{
				console.log("Getrole",)
				that.rolelist=this.$store.state.app.roledata
			})
		},
		watch:{
			datachange:function(){
				return this.editdata
			}
		},
		computed:{
			datachange(){
			this.userdata.username=this.editdata.username;
			this.userdata.nickname=this.editdata.nickname;
			this.userdata.telephone=this.editdata.telephone;
			this.userdata.realname=this.editdata.realname;
			this.userdata.rid=this.editdata.rid;
			this.userdata.id=this.editdata.id;
			}
		},
		methods:{
			Tureinfo(){
				console.log("23333")
				var that=this;
				if(this.userdata.username!=''&&this.userdata.nickname!=''&&this.userdata.telephone!=''&&this.userdata.realname!=''&&this.userdata.rid!=''){
					if(this.userdata.password==this.userdata.password2){
						this.$store.dispatch("Editsuserquest",this.userdata).then((res)=>{
							if(res.data.ok==true){
								that.$message("修改成功");
								setTimeout(function(){
									location.reload()
								},2000)
							}
						})						
					}else{
						alert("密码不一致")
					}

				}else{
					alert("除密码，其他值不能为空")
				}
				
			},
			Closeedit(){
				this.$emit("Closeedit")
			}
		}
	}
	export default Editsuser
</script>

<style lang="scss">
	.editsuser-box{
		position: fixed;
		top: 20%;
		left: 30%;
		padding:50px 100px;
		box-sizing: border-box;
		background: #FFF;
		z-index: 99999;
		.editsuser{
			display: flex;
			margin-top:20px;
			.left{
				width:100px;
				font-size: 14px;
			}
			.right{
				flex: 1;
				input{
					border:1px solid #e5e5e5 ;
					padding: 2px 10px;
				}
			}
			select{
				border:1px solid #e5e5e5 ;
				padding: 2px 10px;
			}
			textarea{
				border:1px solid #e5e5e5 ;
				min-height: 40px;
				padding: 3px 10px;
			}
		}
		.box{
			text-align: center;
			.btn-editsuser{
			width: 100px;
			margin: 30px 0 ;
			display: inline-block;
			background-color: #0082E6;
			text-align: center;
			padding: 3px 0;
			color: #FFF;
			border-radius: 3px;
			cursor: pointer;
		   }
		}
	}
</style>