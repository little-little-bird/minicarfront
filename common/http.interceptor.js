// 这里的vm，就是我们在vue文件里面的this，所以我们能在这里获取vuex的变量，比如存放在里面的token
// 同时，我们也可以在此使用getApp().globalData，如果你把token放在getApp().globalData的话，也是可以使用的
import api from './http.api.js'
async function doRequest (res,config){
	await uni.login({
		provider: 'weixin',
		success: async function(loginRes) {
			await uni.getUserInfo({
				provider: 'weixin',
				success: async function(infoRes) {
					let data = {
						code: loginRes.code,
						encryptedData: infoRes.encryptedData,
						iv: infoRes.iv,
						userInfo: infoRes.userInfo,
						rawData: infoRes.rawData,
						signature: infoRes.signature,
						channel: "wechat",
						inviter: uni.getStorageSync("inviter_user_id")
					}
						await uni.request({
							url: api.tokenUrl,
							method: 'POST',
							header: {
								"content-type": "application/json"
							},
							data: data,
							success: async ress => {
								if (ress && ress.statusCode === 200) {
									uni.setStorageSync("mini_car_token", ress.data.token)
									uni.setStorageSync("mini_car_userid", ress.data.userid)
									config.headers['Authorization']='Bearer '+ress.data.token
									await uni.request({
										url: config.url,
										method: config.method,
										header: config.header,
										data: config.data,
										success:async res2 =>{
											return res2.data
										}
									})
								} else {
									 
								}
							},
							fail: err => {
								console.log(err)
							}
						})
				}
			})
		}
	})
}
const install = (Vue, vm) => {
	Vue.prototype.$u.http.setConfig({
		baseUrl: api.baseUrl,
		// 如果将此值设置为true，拦截回调中将会返回服务端返回的所有数据response，而不是response.data
		// 设置为true后，就需要在this.$u.http.interceptor.response进行多一次的判断，请打印查看具体值
		// originalData: true, 
		// 设置自定义头部content-type
		// header: {
		// 	'content-type': 'xxx'
		// }
	});
	
	// 请求拦截，配置Token等参数
	Vue.prototype.$u.http.interceptor.request = (config) => {
		// config.header.Token = 'xxxxxx';
		
		// 方式一，存放在vuex的token，假设使用了uView封装的vuex方式，见：https://uviewui.com/components/globalVariable.html
		// config.header.token = vm.token;
		
		// 方式二，如果没有使用uView封装的vuex方法，那么需要使用$store.state获取
		// config.header.token = vm.$store.state.token;
		
		// 方式三，如果token放在了globalData，通过getApp().globalData获取
		// config.header.token = getApp().globalData.username;
		// 方式四，如果token放在了Storage本地存储中，拦截是每次请求都执行的，所以哪怕您重新登录修改了Storage，下一次的请求将会是最新值
		console.log(config.url)
		if(api.noNeedtokenUrl.indexOf(config.url)!=-1){
			console.log("uuuuuuu"+config.url)
			
			config.header=''
			console.log(config)
		}else{
			debugger
			const token = uni.getStorageSync('mini_car_token');
			config.header.Authorization = 'Bearer ' + token;
		}
		
		return config; 
	}
	// 响应拦截，判断状态码是否通过
	Vue.prototype.$u.http.interceptor.response =async (res,config) => {
		// 如果把originalData设置为了true，这里得到将会是服务器返回的所有的原始数据
		// 判断可能变成了res.statueCode，或者res.data.code之类的，请打印查看结果
		if(res.code == 200) {
			// 如果把originalData设置为了true，这里return回什么，this.$u.post的then回调中就会得到什么
			return res;  
		}else if(res.code ==401||res.code ==403){
			return  await doRequest(res,config)
		} else return false;
	}
}



export default {
	install,
	doRequest
}