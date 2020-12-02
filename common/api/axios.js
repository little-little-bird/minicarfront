import axios from 'uni-axios';
import api from '../http.api.js'
async function doRequest (res){
	console.log(res)
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
									res.config.headers['Authorization']='Bearer '+ress.data.token
									console.log("ressss"+res)
									  return res

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
// 最先执行的拦截器， 可以多个
// 注意这里的config是你传输过来的config
axios.interceptors.first.use(function (config){
	const showLoading = config.showLoading;
	if(showLoading){
		uni.showLoading({
			title: config.showLoading === true ? '加载中...' : showLoading,
			mask: true
		})
	}
	return config;
})
// 注意这里的config是你传输过来的config
axios.interceptors.last.use(function (config){
	if(config.showLoading){
		uni.hideLoading();
	}
	
})

// 这里的config是axios合并过的config，可能会丢失自定义的配置
axios.interceptors.request.use(function (config){
	const token = uni.getStorageSync('mini_car_token');
	config.headers={
		'Authorization':'Bearer ' + token
	}
	return config;
})
let isRefreshing = false
//
axios.interceptors.response.use(async function (response){
	if(response.data.code === 200){
		return response.data
	}else if(response.data.code === 401){
		if (!isRefreshing) {
		      isRefreshing = true
		      return await doRequest(response).then(res => {
				  
		      }).catch(res => {
		      }).finally(() => {
		        isRefreshing = false
		      })
		
		// if (!isRefresh) {
		//       isRefresh = true
		    }else {
		      return new Promise((resolve) => {
		        // 将resolve放进队列，用一个函数形式来保存，等token刷新后直接执行
		        retryRequest.push((token) => {
		          res.config.headers['Authorization'] = token
		          resolve(axios(res.config))
		        })
		      })
		    }
	} else {
		uni.showToast({
			title: response.data.errMsg,
			icon: 'none'
		})
		return Promise.reject(response.data)
	}
}, function (err){
	return Promise.reject(err);
})
export default axios;