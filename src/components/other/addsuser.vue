<template>
	<div class="fixed-box">
		<div class="shaw"></div>
	<div class="editsuser-box">
		<div class="editsuser">
			<div class="left">账号</div>
			<div class="right"><input type="text" v-model="userdata.userName"/></div>
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
		<div class="btn-editsuser" v-on:click="Closeadd">取消</div>
		<div class="btn-editsuser" v-on:click="Tureinfo">确认</div>
		</div>
	</div>
	</div>
</template>

<script>
	let Addsuser={
		data(){
			return {
				userdata:{
					userName:'',
					nickname:'',
					telephone:'',
					realname:'',
					password:null,
					password2:null,
					rid:''
				},
				rolelist:[],
			}
		},
		props:['editdata','num'],
		created(){
			var that=this;
			let data={
				pageNum:1,
		        pageSize:20,
		        roleName:''
			}
			this.$store.dispatch("Getrole",data).then(()=>{
				that.rolelist=this.$store.state.app.roledata.list
			})
		},
		methods:{
			Tureinfo(){
				var that=this;
				console.log("23333")
				if(this.userdata.username!=''&&this.userdata.nickname!=''&&this.userdata.telephone!=''&&this.userdata.realname!=''&&this.userdata.rid!=''){
						if(this.userdata.password !='' && this.userdata.password2!=''){
							if(this.userdata.password===this.userdata.password2){
								this.$store.dispatch("Addrolequest",this.userdata).then((res)=>{
									if(res.data.ok==true){
										that.$message('新增用户成功');
										setTimeout(function(){
											location.reload()
										},2000)
									}
								})
							}else{
								that.$message('2次输入的密码不一致');
							}
						}else{
							that.$message('密码不能为空');
						}
				}else{
					if(this.userdata.username==''){
						that.$message('用户名不能为空');
					}
					if(this.userdata.nickname==''){
						that.$message('昵称不能为空');
					}
					if(this.userdata.telephone==''){
						that.$message('手机号码不能为空');
					}
					if(this.userdata.realname==''){
						that.$message('真实姓名不能为空');
					}
					if(this.userdata.rid==''){
						that.$message('角色不能为空');
					}
				}
				
			},
			Closeadd(){
				this.$emit("Closeadd")
			}
		}
	}
	export default Addsuser
</script>

<style lang="scss">
</style>