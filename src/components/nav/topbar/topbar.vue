<template>
  <div class="wq-topbar">
    <el-menu router default-active="activeIndex" class="el-menu-top" mode="horizontal" @select="handleSelect" index="1">
    	<div class="logo-box" :class="$store.state.app.siderbar.opened?'':'w60'" >
    		      <img src="../../../assets/images/logo.png">
    	</div>
      <!--<div class="sidebar-fold ml20"   @click="toggleFold" >
	      <icon-svg :iconClass='iconObj' class="fold-svg"></icon-svg>
	    </div>-->
      <div class="top-menu-item">
        <el-submenu >
          <template slot="title">{{$store.state.app.username}}</template>
          <el-menu-item v-on:click="Outuser" index="2">退出</el-menu-item>
        </el-submenu>
      </div>
    </el-menu>
  </div>
</template>
<script>
import iconSvg from "@/components/icon-svg";
export default {
  data() {
    return {
      activeIndex: "1",
      moreTheme: "20a0ff",
      skinDialogVisible: false,
      isCollapse: false,
    };
  },
   components: {
    iconSvg
  },
  created(){
  	this.$store.dispatch("Getusername")
  },
  computed: {
    iconObj() {
  		return this.$store.state.app.siderbar.opened ? "fold" : "unfold";
    },	
  },
  mounted() {
    let themeClassName = "";
    let localTheme = localStorage.getItem("themeValue");
    themeClassName = localTheme ? localTheme : "20a0ff";
    this.changeClass(document.body, "custom-" + themeClassName);
    this.moreTheme = themeClassName;
  },
  methods: {
    changeClass(element, className) {
      if (!element || !className) return;
      element.className = className;
    },
    handleSelect(key, keyPath) {
      console.log(key);
      console.log(keyPath);
    },
    changeTheme(themeValue) {
      this.changeClass(document.body, "custom-" + themeValue);
      this.moreTheme = themeValue;
      localStorage.setItem("themeValue", themeValue);
    },
    toggleFold() {
		  this.isCollapse = !this.$store.state.app.siderbar.opened;
		  this.$store.dispatch("toggle_siderbar");
    },
    Outuser(){
    	this.$store.dispatch("logout")
    }
  }
};
</script>
<style lang="scss">
.wq-topbar {
  .el-menu-top {
    display: flex;
    align-items: center;
    justify-content: space-between;
    .logo {
      line-height: 60px;
      padding: 6px;
      padding-left: 60px;
    }
    .top-menu-item {
      flex: 1;
      display: flex;
      justify-content: flex-end;
    }
  }
}
.ml{
	margin-left: 20px;
}
.logo-box{
	width: 200px;
	margin: 10px 0;
	padding: 20px 20px 0 20px;
	height: 60px;
	overflow: hidden;
	text-align: center;
	img{
		max-width: 100%;
		display:block;
	}
}
.w60{
	width: 60px;
	padding: 10px 5px;
	box-sizing: border-box;
	img{
		max-width: 100%;
		display: inline-block;
	}
}
</style>
