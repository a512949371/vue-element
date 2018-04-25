import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

import Index from '../views/index'
import Hello from '../views/hello'
import Uuserlist from '../views/uuserlist'
import Login from '../views/login'
import Cardrecharge from '../views/cardrecharge'
import Rechargelist from '../views/rechargelist'
import Consumptionlist from '../views/consumptionlist'
import rolemanagement from '../views/role-management'
import Rolelist from '../views/rolelist'
import Suserlist from '../views/suserlist'
import Editrole from '../views/editrole'
import Merchantslist from '../views/merchantslist'
import Alliancecard from '../views/alliancecard'
import Cardboxlist from '../views/cardboxlist'
import Newcardbox from '../views/newcardbox'

const routes = [{
		path: '/',
		component: Index,
		redirect:"index",
		children:[{
			path:"/index",
			component:Hello,
			meta: ['欢迎页面'],
		}]
	}, {
		path: '/login',
		name: 'login',
		component: Login,
	}, {
		path: '/usermanagement',
		component: Index,
		redirect: '/usermanagement/userlist',
		children: [{
			path: '/usermanagement/userlist',
			component: Uuserlist,
			meta: ['用户列表'],
		}]
	}, {
		path: '/cardmanagement',
		name: 'cardmanagement',
		redirect: '/cardmanagement/cardrecharge',
		component: Index,
		children: [{
			path:"/cardmanagement/cardboxlist",
			name:"卡包列表",
			component:Cardboxlist,
			meta:['卡包列表']
		},
		{
			path:"/cardmanagement/newcardbox",
			name:"新增卡包",
			component:Newcardbox,
			meta:['新增卡包']
		},
		{
				path: "/cardmanagement/cardrecharge",
				name: "cardrecharge",
				component: Cardrecharge,
				meta: ['充值卡券设置'],
			}
		]
	}, {
		path: '/paymanagement',
		name: 'paymanagement',
		redirect: '/paymanagement/rechargelist',
		component: Index,
		children: [{
			path: '/paymanagement/rechargelist',
			name: 'rechargelist',
			component: Rechargelist,
			meta: ['充值记录'],
		},
		{
			path: '/paymanagement/consumptionlist',
			name: 'consumptionlist',
			component: Consumptionlist,
			meta: ['消费记录']
		}
		]
	},
	{
		path:"/syetemmanagement",
		name:"syetemmanagement",
		redirect: '/syetemmanagement/rolemanagement',
		component:Index,
		children:[{
			path: '/syetemmanagement/rolemanagement',
			name: 'Role management',
			component: rolemanagement,
			meta: ['菜单管理'],
		},
		{
			path: '/syetemmanagement/rolelist',
			name: 'rolelist',
			component: Rolelist,
			meta: ['角色管理'],
		},
		{
			path: '/syetemmanagement/userlist',
			name: 'userlist',
			component: Suserlist,
			meta: ['用户管理'],
		},
		{
		 path:"/syetemmanagement/editrole",
		 name:"editrole",
		 component:Editrole,
		 meta:['角色编辑']
		}]
	},
	{
		path:"/merchants",
		name:"商家管理",
		redirect:'/merchants/merchantslist',
		component:Index,
		children:[{
			path:"/merchants/merchantslist",
			name:"商家列表",
			component:Merchantslist,
			meta:['商家列表']
		},
		{
			path:"/merchants/alliancecard",
			name:"联盟卡券设置",
			component:Alliancecard,
			meta:['联盟卡券设置']
		}]
	},
	{
		path: '*',
		redirect: 'home'
	},
]

const router = new VueRouter({
	mode: 'history',
	linkActiveClass: 'active', //路由的模式
	routes
});
router.beforeEach((to, from, next) => {
    if (to.meta.requireAuth) {  // 判断该路由是否需要登录权限
        if (store.state.token) {  // 通过vuex state获取当前的token是否存在
            next();
        }
        else {
            next({
                path: '/login',
                query: {redirect: to.fullPath}  // 将跳转的路由path作为参数，登录成功后跳转到该路由
            })
        }
    }
    else {
        next();
    }
})
		
export default router