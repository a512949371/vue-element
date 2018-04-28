import * as types from '../types.js'
import Vue from 'vue';
import Vuex from 'vuex';
import $ from 'jquery';
import router from '../../router/vue-router.js';
import requestAjax from '../requestAjax.js'
import setCookie from './setCookie.js'
import getCookie from './getCookie.js'
import delCookie from './delCookie.js'
import {Message} from 'element-ui'

// initial state
//let http="https://xdj.txw18.com/xdjCore/xdjAdminCore"
let http="http://192.168.1.115:9104/xdjCore/xdjMerchantsAdmin"
//let http="http://192.168.4.254:9104/xdjCore/xdjAdminCore"
let RequestAjax = new requestAjax();
const state = {
  token: null
}
// mutations
const mutations = {
  [types.GETUSER](state, user) {
    state.user = user
  },
  settoken(state, data) {
    state.token = data
  },
  deltoken(state,data) {
    state.token = data
  }
}


//actions
const actions = {
  getUser({commit}, user) {
    commit(types.GETUSER, user)
  },
  login({commit},userinfo) {
  	delCookie("token");
  	delCookie("username");
  	sessionStorage.removeItem("menuItem");
  	sessionStorage.removeItem("buttonMenuItems");
  	var data = {
  		requestType:"POST",
  		requestUrl:http+"/index/logon",
  		requestdata:{
  			userName:userinfo.username,
  			password:userinfo.password
  		}
  	},
  	callback=function(res){
  		console.log(res)
  		if(res.data.code=="00100000"||res.data.code=="100000"){
  			commit("settoken",res.data.msg);
  			setCookie("token",escape(res.data.msg)+"xlkLjxqy",1)
  			setCookie("username",res.data.data.username,1)
	  		sessionStorage.setItem("menuItem",JSON.stringify(res.data.data.menuItems));
	  		sessionStorage.setItem("buttonMenuItems",JSON.stringify(res.data.data.buttonMenuItems));
	  		sessionStorage.setItem("shopname",res.data.data.merchantsName);
	  		sessionStorage.setItem("shopid",res.data.data.merchantsId);
	  		sessionStorage.setItem("shopi",res.data.data.isVipMerchants);
				router.push('/index') 				
			}else if(res.data.code=="00100001"||res.data.code=="100001"){
				console.log("系统异常")
			}else if(res.data.code=="401"){
				router.push("/login")
			}else{
				alert(res.data.msg)
			}
  	}
  	return RequestAjax.request(data,callback)
    
  },
  logout({commit}) {
  	console.log("outtoken",unescape(getCookie('token')).replace(new RegExp("xlkLjxqy"), ""))
  	 var data = {
  		requestType:"post",
  		requestUrl:http+"/index/loginOut",
  		requestdata:'',
  		requesttoken:unescape(getCookie('token')).replace(new RegExp("xlkLjxqy"), "")
  	},
  	callback=function(res){
  		if(res.data.ok==true){
		    delCookie("token");
		  	delCookie("username");
		  	sessionStorage.removeItem("menuItem");
		  	sessionStorage.removeItem("buttonMenuItems");
		  	sessionStorage.removeItem("shopname");
	  		sessionStorage.removeItem("shopid");
	  		sessionStorage.removeItem("shopi");
		  	delCookie("buttonMenuItems");
		  	console.log("logout")
		    router.push("/login")
  		}else{
  			console.log(res.data.msg)
  		}
		
  	}
  	return RequestAjax.request(data,callback)
  }
}

export default {
  state,
  actions,
  mutations
}
