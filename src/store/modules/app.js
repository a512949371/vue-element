import * as types from '../types.js'
import Vue from 'vue';
import Vuex from 'vuex';
import $ from 'jquery';
import axios from 'axios';
import router from '../../router/vue-router.js'
import requestAjax from '../requestAjax.js'
import getCookie from './getCookie.js'
import delCookie from './delCookie.js'
 import {Message} from 'element-ui'

// initial state
Vue.use(Vuex)
//let http="https://xdj.txw18.com/xdjCore/xdjAdminCore"
let http="http://192.168.1.115:9104/xdjCore/xdjAdminCore"
//let http="http://192.168.4.254:9104/xdjCore/xdjAdminCore"
let https="http://192.168.1.115:9104/xdjCore/xdjPlatformAdmin"
//let https="http://192.168.4.254:9104/xdjCore/xdjPlatformAdmin"
let httpss="http://192.168.1.115:9104/xdjCore/xdjMerchantsAdmin"
let RequestAjax = new requestAjax();
const state = {
  siderbar: {
    opened: true
  },
  username:'',
  testdata:'',
  menuitem:[],
  buttonitem:[],
  suserdata:'',
  roledata:'',
  cardchargedata:'',
  uuserdata:'',
  payactdata:'',
  storesdata:'',
  paylistdata:'',
  consumptionlistdata:'',
  shoplistdata:'',
  cardlistdata:'',
  cardinfodata:'',
  alliancelistdata:''
}
// mutations
const mutations = {
  [types.TOGGLE_SIDERBAR](state) {
    state.siderbar.opened = !state.siderbar.opened;
  },
  Testdata(state,data){
  	state.testdata=data;
  },
  setmenuitem(state,data){
  	state.menuitem=data
  },
  setbuttonitem(state,data){
  	state.buttonitem=data
  },
  setusername(state,data){
  	state.username=data
  },
  setsuser(state,data){
  	state.suserdata=data;
  	console.log(state.suserdata)
  },
  setrole(state,data){
  	state.roledata=data
  },
  setcardcharge(state,data){
  	state.cardchargedata=data
  },
  setuuserdata(state,data){
  	state.uuserdata=data
  },
  setpayactdata(state,data){
  	state.payactdata=data
  },
  setstoresdata(state,data){
  	state.storesdata=data
  },
  setpaylistdata(state,data){
  	state.paylistdata=data
  },
  setconsumptionlist(state,data){
  	state.consumptionlistdata=data
  },
  setshoplist(state,data){
  	state.shoplistdata=data
  	console.log(state.shoplistdata)
  },
  setcardlist(state,data){
  	state.cardlistdata=data
  },
  setcardinfo(state,data){
  	state.cardinfodata=data
  },
  setalliancelist(state,data){
  	state.alliancelistdata=data
  }
}


//actions
const actions = {
  toggle_siderbar({commit,state}){
    commit(types.TOGGLE_SIDERBAR, state);
  },
  //判断toekn是否存在
  Tokentf:function({commit}){
  	console.log("11111")
	if(getCookie("token")&&sessionStorage.getItem("menuItem")){
		console.log("2222")
	}
	else{
		console.log("33333")
		router.push("/login")
	}
  },
	postTest:function(context){
	  	var data = {
	  		requestType:"get",
	  		requestUrl:http+"/wealth/api/getMsg",
	  		requestdata:''
	  	},
	  	callback=function(res){
	  		context.commit("Testdata",res.data)
	  	}
	  	return RequestAjax.request(data,callback)
	 },
	 Getmenuitem:function({commit}){
	 	 commit("setmenuitem",JSON.parse(sessionStorage.getItem("menuItem")))
	 	 commit("setbuttonitem",JSON.parse(sessionStorage.getItem("buttonMenuItems")))
	 },
	 Getusername:function({commit}){
	 	 commit("setusername",getCookie("username"))
	 },
	 //系统管理用户列表
	 Getsuser:function({commit},pagedata){
	 	console.log("23333")
	 	console.log(getCookie('token'))
	 		var data = {
	  		requestType:"get",
	  		requestUrl:http+"/admin/manage/list?pageNo="+pagedata.pageNum+'&pageSize='+pagedata.pagesize+'&userName='+pagedata.userName,
	  		requestdata:'',
	  		requesttoken:unescape(getCookie('token')).replace(new RegExp("xlkLjxqy"), "")
	  	},
	  	callback=function(res){
	  		if(res.data.ok==true){
	  			commit("setsuser",res.data.data);
	  		}else{
	  			alert("系统繁忙，请稍后再试")
	  		}
	  		
	  	}
	  	return RequestAjax.request(data,callback)	 		

	 },
  //系统列表用户编辑
  Editsuserquest:function({commit},editdata){
	  	var data = {
	  		requestType:"post",
	  		requestUrl:http+"/admin/manage/update",
	  		requestdata:editdata,
	  		requesttoken: unescape(getCookie('token')).replace(new RegExp("xlkLjxqy"), "")
	  	},
	  	callback=function(res){
	  		console.log(res)
	  	}
	  	return RequestAjax.request(data,callback)
  },
  //系统管理角色列表
  Getrole:function({commit},pagedata){
	 		var data = {
	  		requestType:"get",
	  		requestUrl:http+"/admin/role/list?pageNo=1&pageSize=50",
	  		requestdata:'',
	  		requesttoken: unescape(getCookie('token')).replace(new RegExp("xlkLjxqy"), "")
	  	},
	  	callback=function(res){
	  		console.log(res.data)
	  		if(res.data.ok==true){
	  			commit("setrole",res.data.data);
	  		}else{
	  			alert("系统繁忙，请稍后再试")
	  		}
	  		
	  	}
	  	return RequestAjax.request(data,callback)  	
  },
  //系统列表用户新增
  Addrolequest:function({commit},roledata){
  	console.log(roledata)
	  	var data = {
	  		requestType:"post",
	  		requestUrl:http+"/admin/manage/insertUser",
	  		requestdata:roledata,
	  		requesttoken: unescape(getCookie('token')).replace(new RegExp("xlkLjxqy"), "")
	  	},
	  	callback=function(res){
	  		console.log(res)
	  	}
	  	return RequestAjax.request(data,callback)  	
  },
  //充值卡券设置
  Getcardchargequest:function({commit},pagedata){
  	var data={
  		requestType:"get",
  		requestUrl:http+"/admin/chargeset/list?pageNo="+pagedata.pageNum+'&pageSize='+pagedata.pagesize,
  		requestdata:'',
	  	requesttoken: unescape(getCookie('token')).replace(new RegExp("xlkLjxqy"), "")
  	},
  	callback=function(res){
  		if(res.data.ok==true){
  			commit("setcardcharge",res.data.data)
  		}else{
  			alert(res.data.msg)
  		}
  		
  	}
  	return RequestAjax.request(data,callback)
  },
  //充值卡券编辑
  Editcardchargequest:function({commit},carddata){
  	var data={
  		requestType:"post",
  		requestUrl:http+"/admin/chargeset/updatechargeset",
  		requestdata:carddata,
	  	requesttoken: unescape(getCookie('token')).replace(new RegExp("xlkLjxqy"), "")
  	},
  	callback=function(res){
  	}
  	return RequestAjax.request(data,callback)
  },
  //新增充值卡券
  Addcardchargequest:function({commit},carddata){
  	var data={
  		requestType:"post",
  		requestUrl:http+"/admin/chargeset/insertchargeset",
  		requestdata:carddata,
	  	requesttoken: unescape(getCookie('token')).replace(new RegExp("xlkLjxqy"), "")
  	},
  	callback=function(res){
  	}
  	return RequestAjax.request(data,callback)
  },
  //开启充值活动
  Openactquest:function({commit},opendata){
  	console.log(opendata)
  	var data={
  		requestType:"post",
  		requestUrl:http+"/admin/chargeset/updateType",
  		requestdata:opendata,
	  	requesttoken: unescape(getCookie('token')).replace(new RegExp("xlkLjxqy"), "")
  	},
  	callback=function(res){
  	}
  	return RequestAjax.request(data,callback)  	
  },
  //用户管理的用户列表
  Getuuserquest:function({commit},pagedata){
  	 console.log( unescape(getCookie('token')));
	  	var data={
	  		requestType:"get",
	  		requestUrl:http+'/admin/customer/selectCustomer?pageNo='+pagedata.pageNum+'&pageSize='+pagedata.pagesize+'&phone='+pagedata.phone+'&realName='+pagedata.realName+'&startTime='+pagedata.startTime+'&endTime='+pagedata.endTime+'&storeName='+pagedata.storeName,
	  		requestdata:'',
		  	requesttoken: unescape(getCookie('token')).replace(new RegExp("xlkLjxqy"), "")
	  	},
	  	callback=function(res){
	  		console.log(res.data)
	  		if(res.data.ok==true){
	  			commit("setuuserdata",res.data.data)
	  		}else{
	  			Message.error({message:res.data.msg})
	  		}
	  		
	  	}
	  	return RequestAjax.request(data,callback)  		

  },
  //获取充值活动列表
  Getpayactquest:function({commit}){
  	var data={
  		requestType:"post",
  		requestUrl:http+"/admin/chargeset/chargeSetList",
  		requestdata:'',
	  	requesttoken: unescape(getCookie('token')).replace(new RegExp("xlkLjxqy"), "")
  	},
  	callback=function(res){
  		if(res.data.ok==true){
  			commit("setpayactdata",res.data.data)
  		}else{
  			Message.error({message:res.data.msg})
  		}
  		
  	}
  	return RequestAjax.request(data,callback)
  },
  //获取门店列表
  Getstoresquest:function({commit}){
  	var data={
  		requestType:"get",
  		requestUrl:http+"/admin/consume/selectName",
  		requestdata:'',
	  	requesttoken: unescape(getCookie('token')).replace(new RegExp("xlkLjxqy"), "")
  	},
  	callback=function(res){
  		if(res.data.ok==true){
  			commit("setstoresdata",res.data.data)
  		}else{
  			Message.error({message:res.data.msg})
  		}
  		
  	}
  	return RequestAjax.request(data,callback)  	
  },
  //给用户充值
  Getuserpayquest:function({commit},userdata){
  	console.log(userdata)
  	var data={
  		requestType:"post",
  		requestUrl:http+"/admin/customer/merchantsCharge",
  		requestdata:userdata,
	  	requesttoken: unescape(getCookie('token')).replace(new RegExp("xlkLjxqy"), "")
  	},
  	callback=function(res){
  		if(res.data.ok==true){
  			
  		}else{
  			Message.error({message:res.data.msg})
  		}
  	}
  	return RequestAjax.request(data,callback)  	
  },
  //给用户扣款
  Getuserdeucequest:function({commit},userdata){
  	var data={
  		requestType:"post",
  		requestUrl:http+"/admin/customer/chargeBack",
  		requestdata:userdata,
	  	requesttoken: unescape(getCookie('token')).replace(new RegExp("xlkLjxqy"), "")
  	},
  	callback=function(res){
  		if(res.data.ok==true){
  			
  		}else{
  			Message.error({message:res.data.msg})
  		}
  	}
  	return RequestAjax.request(data,callback)  	  	
  },
  //查询活动充值默认值
  Searchactpay:function({commit},paymoney){
  	var data={
  		requestType:"get",
  		requestUrl:http+"/admin/chargeset/selectDefault/"+paymoney,
  		requestdata:'',
	  	requesttoken: unescape(getCookie('token')).replace(new RegExp("xlkLjxqy"), "")
  	},
  	callback=function(res){
  		if(res.data.ok==true){
  			console.log("查询成功")
  		}else{
  			Message.error({message:res.data.msg})
  		}
  	}
  	return RequestAjax.request(data,callback)  	  	
  }, 
  //查询联盟券赠送默认值
  Searchallianceact:function({commit},paymoney){
  	var data={
  		requestType:"get",
  		requestUrl:httpss+"/admin/allianceSet/selectSet/"+paymoney,
  		requestdata:'',
	  	requesttoken: unescape(getCookie('token')).replace(new RegExp("xlkLjxqy"), "")
  	},
  	callback=function(res){
  		if(res.data.ok==true){
  			console.log("查询成功")
  		}else{
  			Message.error({message:res.data.msg})
  		}
  	}
  	return RequestAjax.request(data,callback)  	  	
  },  
  //充值记录
  Getpaylistquest:function({commit},pagedata){
  	var data={
  		requestType:"get",
  		requestUrl:http+"/admin/expand/selectExpand?pageNo="+pagedata.pageNum+'&pageSize='+pagedata.pagesize+'&phone='+pagedata.phone+'&realName='+pagedata.realName+'&storeName='+pagedata.storesdata,
  		requestdata:'',
	  	requesttoken: unescape(getCookie('token')).replace(new RegExp("xlkLjxqy"), "")
  	},
  	callback=function(res){
  		if(res.data.ok==true){
  		 commit("setpaylistdata",res.data.data)  			
  		}else{
  			Message.error({message:res.data.msg})
  		}

  	}
  	return RequestAjax.request(data,callback)   	
  },
  //消费记录
  Getconsumptionquest:function({commit},pagedata){
  	console.log(pagedata)
   	var data={
  		requestType:"get",
  		requestUrl:http+"/admin/consume/selectOrder?pageNo="+pagedata.pageNum+'&pageSize='+pagedata.pagesize+'&phone='+pagedata.phone+'&userName='+pagedata.userName+'&storeName='+pagedata.storesdata,
  		requestdata:'',
	  	requesttoken: unescape(getCookie('token')).replace(new RegExp("xlkLjxqy"), "")
  	},
  	callback=function(res){
  		if(res.data.ok==true){
  			console.log(res.data.data)
  		 commit("setconsumptionlist",res.data.data)  			
  		}else{
  			Message.error({message:res.data.msg})
  		}

  	}
  	return RequestAjax.request(data,callback)  	
  },
  //获取商家列表
  Getshoplist:function({commit},pagedata){
   	var data={
  		requestType:"get",
  		requestUrl:https+"/admin/MerchantsInfo/getMerchantsInfo?pageNo="+pagedata.pageNum+'&pageSize='+pagedata.pagesize+'&merchantsName='+pagedata.merchantsName+'&merchantsPhone='+pagedata.merchantsPhone,
  		requestdata:'',
	  	requesttoken:unescape(getCookie('token')).replace(new RegExp("xlkLjxqy"), "")
  	},
  	callback=function(res){
  		if(res.data.ok==true){
  		 commit("setshoplist",res.data.data)  			
  		}else{
  			Message.error({message:res.data.msg})
  		}

  	}
  	return RequestAjax.request(data,callback)  	
  },
  //新增商家
  Addshopname:function({commit},shopdata){
   	var data={
  		requestType:"post",
  		requestUrl:https+"/admin/MerchantsInfo/insertMerchantsInfo",
  		requestdata:shopdata,
	  	requesttoken:unescape(getCookie('token')).replace(new RegExp("xlkLjxqy"), "")
  	},
  	callback=function(res){
  		console.log(res)
  		if(res.data.ok==true){	
  			console.log("添加商家成功")
  		}else{
  			Message.error({message:res.data.msg})
  		}

  	}
  	return RequestAjax.request(data,callback)  	
  }, 
  //编辑商家
  Editshopname:function({commit},shopdata){
   	var data={
  		requestType:"post",
  		requestUrl:https+"/admin/MerchantsInfo/update",
  		requestdata:shopdata,
	  	requesttoken:unescape(getCookie('token')).replace(new RegExp("xlkLjxqy"), "")
  	},
  	callback=function(res){
  		console.log(res)
  		if(res.data.ok==true){	
  			console.log("编辑商家成功")
  		}else{
  			Message.error({message:res.data.msg})
  		}

  	}
  	return RequestAjax.request(data,callback)  	
  },
 //卡包列表
  Getcardlist:function({commit},pagedata){
   	var data={
  		requestType:"get",
  		requestUrl:httpss+"/admin/chapter/chapterList?pageNo="+pagedata.pageNum+'&pageSize='+pagedata.pagesize+'&name='+pagedata.name+'&storeName='+pagedata.storeName,
  		requestdata:'',
	  	requesttoken:unescape(getCookie('token')).replace(new RegExp("xlkLjxqy"), "")
  	},
  	callback=function(res){
  		console.log(res)
  		if(res.data.ok==true){	
  			console.log(res.data.data)
  			commit("setcardlist",res.data.data)
  		}else{
  			Message.error({message:res.data.msg})
  		}

  	}
  	return RequestAjax.request(data,callback)  	
  },
  //查看单个卡包信息
  Getcardinfo:function({commit},carddata){
   	var data={
  		requestType:"get",
  		requestUrl:httpss+"/admin/chapter/chapterDetails/"+carddata,
  		requestdata:'',
	  	requesttoken:unescape(getCookie('token')).replace(new RegExp("xlkLjxqy"), "")
  	},
  	callback=function(res){
  		console.log(res)
  		if(res.data.ok==true){	
  			commit("setcardinfo",res.data.data)
  		}else{
  			Message.error({message:res.data.msg})
  		}

  	}
  	return RequestAjax.request(data,callback)  	
  },
  //编辑单个卡包信息
  Editcardinfo:function({commit},carddata){
  	if(carddata.isZero){
  		carddata.isZero=1
  	}else{
  		carddata.isZero=0
  	}
   	var data={
  		requestType:"post",
  		requestUrl:httpss+"/admin/chapter/updateChapter",
  		requestdata:carddata,
	  	requesttoken:unescape(getCookie('token')).replace(new RegExp("xlkLjxqy"), "")
  	},
  	callback=function(res){
  		console.log(res)
  		if(res.data.ok==true){	
  			console.log("编辑卡包信息成功")
  		}else{
  			Message.error({message:res.data.msg})
  		}

  	}
  	return RequestAjax.request(data,callback)  	
  },
  //新增卡包信息
  Addcardinfo:function({commit},carddata){
  	if(carddata.isZero){
  		carddata.isZero=1
  	}else{
  		carddata.isZero=0
  	}
  	if(carddata.isInvalid){
  		carddata.isInvalid=1
  	}else{
  		carddata.isInvalid=0
  	}
  	console.log(carddata)
   	var data={
  		requestType:"post",
  		requestUrl:httpss+"/admin/chapter/insert",
  		requestdata:carddata,
	  	requesttoken:unescape(getCookie('token')).replace(new RegExp("xlkLjxqy"), "")
  	},
  	callback=function(res){
  		console.log(res)
  		if(res.data.ok==true){	
  			console.log("新增卡包成功")
  		}else{
  			Message.error({message:res.data.msg})
  		}

  	}
  	return RequestAjax.request(data,callback)  	
  },
 //联盟卡券设置
  Getalliancelist:function({commit},pagedata){
  	console.log(pagedata.pagesize)
   	var data={
  		requestType:"get",
  		requestUrl:httpss+"/admin/allianceSet/selectAllianceSet?pageNo="+pagedata.pageNum+'&pageSize='+pagedata.pagesize,
  		requestdata:'',
	  	requesttoken:unescape(getCookie('token')).replace(new RegExp("xlkLjxqy"), "")
  	},
  	callback=function(res){
  		console.log("Getalliancelist")
  		console.log(res)
  		if(res.data.ok==true){	
  			commit("setalliancelist",res.data.data)
  		}else{
  			Message.error({message:res.data.msg})
  		}

  	}
  	return RequestAjax.request(data,callback)  	
  },
  //新增联盟券
  Addalliance:function({commit},carddata){
  	console.log(carddata)
   	var data={
  		requestType:"post",
  		requestUrl:httpss+"/admin/allianceSet/insertAllianceSet",
  		requestdata:carddata,
	  	requesttoken:unescape(getCookie('token')).replace(new RegExp("xlkLjxqy"), "")
  	},
  	callback=function(res){
  		console.log(res)
  		if(res.data.ok==true){	
  			console.log("新增联盟券成功")
  		}else{
  			Message.error({message:res.data.msg})
  		}

  	}
  	return RequestAjax.request(data,callback)  	
  },
  //编辑联盟券
  Editalliance:function({commit},carddata){
  	console.log(carddata)
   	var data={
  		requestType:"post",
  		requestUrl:httpss+"/admin/allianceSet/updateAllianceSet",
  		requestdata:carddata,
	  	requesttoken:unescape(getCookie('token')).replace(new RegExp("xlkLjxqy"), "")
  	},
  	callback=function(res){
  		console.log(res)
  		if(res.data.ok==true){	
  			console.log("编辑联盟券成功")
  		}else{
  			Message.error({message:res.data.msg})
  		}

  	}
  	return RequestAjax.request(data,callback)  	
  },
  //删除联盟券
  Selectalliance:function({commit},carddata){
  	console.log(carddata)
   	var data={
  		requestType:"post",
  		requestUrl:httpss+"/admin/allianceSet/deleteAllianceSet/"+carddata,
  		requestdata:carddata,
	  	requesttoken:unescape(getCookie('token')).replace(new RegExp("xlkLjxqy"), "")
  	},
  	callback=function(res){
  		console.log(res)
  		if(res.data.ok==true){	
  			console.log("删除联盟券成功")
  		}else{
  			Message.error({message:res.data.msg})
  		}

  	}
  	return RequestAjax.request(data,callback)  	
  },
}

export default {
  state,
  actions,
  mutations
}
