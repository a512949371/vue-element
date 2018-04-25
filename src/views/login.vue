<template>
  <div class="app-login">
    <section class="login-wrapper">
    	<div class="logo"><img src="../assets/images/logo.png"></div>
    	<h1>洗到家后台管理系统</h1>
      <div class="login-content">
        <el-input placeholder="请输入用户名" class="phone-number" v-model="phoneNum"></el-input>
        <el-input placeholder="请输入密码" type="password" class="password-number" v-model="password" @keyup.enter.native="login"></el-input>
        <a class="submit" href="javascript:;" @click="login">登录</a>
      </div>
    </section>
  </div>
</template>
<script>
export default {
  data() {
    return {
      phoneNum: "",
      password: ""
    };
  },
  methods: {
    // 模拟登录
    login() {
    	var data={
    		password:this.password,
    		username:this.phoneNum
    	}
      if (this.phoneNum !='' && this.password !='') {
        this.$store.dispatch("login",data)
      } else {
        this.$message({
          message: "请输入用户名和密码",
          type: "warning",
          showClose: false
        });
      }
    }
  }
};
</script>
<style lang="scss">
@import "../assets/css/mixin.scss";
.app-login {
  width: 100%;
  height: 100%;
  filter: progid:DXImageTransform.Microsoft.gradient(
      startColorstr=#00a597,
      endColorstr=#FFFFFFFF,
      GradientType=0
    );
  /*background-color: #00a597;*/
  /*background: linear-gradient(to bottom, #00a597 45%, #fff 45%, #fff 100%);*/
  position: relative;
  .logo {
  	    text-align: center;
  	    
  	    img{
  	    	display: inline-block;
  	    	width: 30%;
  	    	margin: 20px 0;
  	    }
  }
  .login-wrapper {
    position: absolute;
    top: 50%;
    left: 50%;
    -webkit-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
    width: 400px;
    height: 360px;
    background: #fff;
    border: 1px solid #ccc;
    padding: 0 30px;
    h1 {
      text-align: center;
  	  color: #00a597;
  	  font-size: 24px;
    }
    .login-content {
      margin: 0 25px;
      overflow: hidden;
      input {
        display: block;
        width: 100%;
        margin-top: 20px;
        background: #f8f8f8;
      }
    }
    .submit {
      display: block;
      height: 45px;
      text-align: center;
      line-height: 45px;
      border-radius: 6px;
      background: $--color--primary;
      color: #fff;
      font-size: 16px;
      margin: 30px 0;
    }
  }
}
</style>
