<template>
  <nav class="wq-sidebar" v-bind:class='foldObj'>
    <div class="sidebar-menu" v-if="this.$store.state.app.siderbar.opened"  >
    <el-menu :default-active="$route.path" :unique-opened=true router   
      v-for="(item, index) in this.$store.state.app.menuitem" :key="index" >
      <el-menu-item v-if="typeof item.children === 'undefined'" :index="item.roteUrl">
        <i class="icon el-icon-setting"></i>
        <span slot="title">{{ item.name }}</span>
      </el-menu-item>
      <el-submenu v-else :index="item.roteUrl">
        <template slot="title">
        	<i class="icon el-icon-setting"></i>
          <span slot="title ">{{ item.name }}</span>
        </template>
        <el-menu-item v-for="(child_item, child_index) in item.children" :index="child_item.roteUrl" :key="child_index">             
          <span slot="title">{{ child_item.name }}</span>
        </el-menu-item>
      </el-submenu>
    </el-menu>
    </div>
    <div v-else="">
    	<el-menu>
    	<el-menu-item v-for="(item, index) in menuItem" :key="index">
    		<i class="icon" :class="item.icon"></i>
    	</el-menu-item>
    	</el-menu>
    </div>
  </nav>
  <!--<nav class="wq-sidebar" v-bind:class='foldObj'>
    <div class="sidebar-menu" v-if="this.$store.state.app.siderbar.opened"  >
    <el-menu :default-active="$route.path" :unique-opened=true router   
      v-for="(item, index) in menuItem" :key="index" >
      <el-menu-item v-if="typeof item.child === 'undefined'" :index="item.path">
        <i class="icon el-icon-setting"></i>
        <span slot="title">{{ item.title }}</span>
      </el-menu-item>
      <el-submenu v-else :index="item.path">
        <template slot="title">
        	<i class="icon el-icon-setting"></i>
          <span slot="title ">{{ item.title }}</span>
        </template>
        <el-menu-item v-for="(child_item, child_index) in item.child" :index="child_item.path" :key="child_index">             
          <span slot="title">{{ child_item.title }}</span>
        </el-menu-item>
      </el-submenu>
    </el-menu>
    </div>
    <div v-else="">
    	<el-menu>
    	<el-menu-item v-for="(item, index) in menuItem" :key="index">
    		<i class="icon" :class="item.icon"></i>
    	</el-menu-item>
    	</el-menu>
    </div>
  </nav>-->
</template>
<script>
export default {
  data() {
    return {
      menuItem: [
        {
          title: "用户管理",
          path: "/usermanagement",
          icon: "el-icon-menu",
          child:[{
          	title: "用户列表",
            path: "/usermanagement/userlist"
          }]
        },
        {
          title: "卡券管理",
          path: "/cardmanagement",
          icon: "el-icon-setting",
          child: [
            {
              title: "卡包列表",
              path: "/cardmanagement/cardboxlist"
            },
            {
              title: "新增卡包",
              path: "/cardmanagement/newcardbox"
            },
            {
              title: "充值卡券设置",
              path: "/cardmanagement/cardrecharge"
            },
          ]
        },
        {
          title: "交易管理",
          path: "/paymanagement",
          icon: "el-icon-setting",
          child: [
            {
              title: "充值记录",
              path: "/paymanagement/rechargelist"
            },
            {
              title: "消费记录",
              path: "/paymanagement/consumptionlist"
            }
          ]
        },
        {
        	title: "系统管理",
          path: "/syetemmanagement",
          icon: "el-icon-setting",
          child:[
	          {
	              title: "菜单管理",
	              path: "/syetemmanagement/rolemanagement"
	           },
	          {
	              title: "角色管理",
	              path: "/syetemmanagement/rolelist"
	          },
	          {
	              title: "用户管理",
	              path: "/syetemmanagement/userlist"
	          }
          ]
        },
          {
        	title: "商家管理",
          path: "/merchants",
          icon: "el-icon-setting",
          child:[
	          {
	              title: "商家列表",
	              path: "/merchants/merchantslist"
	           },
	          {
	              title: "联盟卡券设置",
	              path: "/merchants/alliancecard"
	          },
          ]
        },
      ],
      isCollapse: false
    };
  },
  created(){
  	this.$store.dispatch("Getmenuitem")
  },
  watch:{
  	barshow(){
  		return this.$store.state.app.siderbar.opened
  	}
  },
  computed: {
    foldObj() {
      return this.$store.state.app.siderbar.opened
        ? "show-sidebar"
        : "hide-sidebar";
    },
    barshow(){
    	this.$store.state.app.siderbar.opened?this.isCollapse=false:this.isCollapse=true
    }
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    }
  }
};
</script>
<style lang="scss">
@import "../../../assets/css/common.scss";
@import "../../../assets/iconfont/iconfont.css";

.wq-sidebar {
  height: 100%;
  overflow: hidden;
  .sidebar-fold {
    cursor: pointer;
    text-align: center;
    height: 28px;
    .fold-svg {
      color: #333;
      font-size: 26px;
    }
    &.hide-sidebar {
      width: 64px;
    }
  }
  &.show-sidebar {
    min-width: 200px;
  }
  &.hide-sidebar {
    min-width: 64px;
  }
}
</style>
