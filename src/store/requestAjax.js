 import axios from 'axios';
 import {Message} from 'element-ui'
 import router from '../router/vue-router.js'
 import delCookie from './modules/delCookie.js'
 
	axios.interceptors.request.use(config=> {
	  return config;
	}, err=> {
	  Message.error({message: '请求超时!'});
	  return Promise.resolve(err);
	})
	axios.interceptors.response.use(res=> {
		if(res.data.ok==true){
			 return res;
		}else{
			Message.error({message:res.data.msg});
			return res;
		}
	}, err=> {
		console.log(err)
	  if (err.response.status == 504||err.response.status == 404) {
	    console.log("404");
	  } else if (err.response.status == 401) {
	    Message.error({message:"登录失效"});
	    delCookie("token")
	  	delCookie("username");
	  	sessionStorage.removeItem("menuItem");
	  	sessionStorage.removeItem("buttonMenuItems");
	  	sessionStorage.removeItem("shopname");
	  	sessionStorage.removeItem("shopid");
	  	sessionStorage.removeItem("shopi");
	    setTimeout(function(){
	    	router.push("/login")
	    },2000)
	  }else if(err.response.status == "00100025"||err.response.status=="100025"){
	  	Message.error({message:"您没有权限做此操作"});
	  }else if(err.response.status == "00100031"||err.response.status=="100031"){
	  	console.log("网络错误");
	  }
	  else {
	    console.log(err);
	  }
	  return Promise.resolve(err);
	})

 class requestAjax {
 	request(Data,callback){
	 		const p = axios({
				method:Data.requestType,
				url:Data.requestUrl,
				headers:{
	//				"X-Authorization":"Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIxNTY4NzY1ODgxNiIsInNjb3BlcyI6WyJST0xFX1VTRVIiXSwiaXNzIjoiaHR0cDovL3plcm9jYXQuY24iLCJpYXQiOjE1MjE3OTQzMzAsImV4cCI6MTUyNDM4NjMzMH0.tLsbT4W1No8XA9xoKz3qaCzPWgqcYvvsitSJCjFoq6WMGfTsCmuoPJ01uL7wuMLdFHSG7-unh0FWO8tmd4cjyQ",
					"Content-Type":"application/json",
					"token":Data.requesttoken,
					"Access-Control-Allow-Origin":"*"
					},
				data:Data.requestdata||null
			 }).then((res)=>{
			 	  	callback(res)
			 		return res
			  }).catch((res)=>{
			  		console.log(res)
			});
			return p 			

 	}
 }
export default requestAjax 