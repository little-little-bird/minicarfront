import Vue from 'vue'
import App from './App'
import * as $api from '@/common/api/api.js'
import httpapi from '@/common/http.api.js'

Vue.config.productionTip = false
Vue.prototype.$httpapi = httpapi

App.mpType = 'app'

Vue.prototype.$api = $api
// 此处为演示Vue.prototype使用，非uView的功能部分
Vue.prototype.vuePrototype = '枣红'

// 引入全局uView
import uView from 'uview-ui'
Vue.use(uView)

// 此处为演示vuex使用，非uView的功能部分
import store from '@/store'

// 引入uView提供的对vuex的简写法文件
let vuexStore = require('@/store/$u.mixin.js')
Vue.mixin(vuexStore)

// 引入uView对小程序分享的mixin封装
let mpShare = require('uview-ui/libs/mixin/mpShare.js');
Vue.mixin(mpShare)

// i18n部分的配置
// 引入语言包，注意路径
import Chinese from '@/common/locales/zh.js';
import English from '@/common/locales/en.js';

// VueI18n
import VueI18n from '@/common/vue-i18n.min.js'

// VueI18n
Vue.use(VueI18n)

const i18n = new VueI18n({
	// 默认语言
	locale: 'zh',
	// 引入语言文件
	messages: {
		'zh': Chinese,
		'en': English,
	}
})

// 由于微信小程序的运行机制问题，需声明如下一行，H5和APP非必填
Vue.prototype._i18n = i18n

const app = new Vue({
	i18n,
	store,
	...App
})
Vue.prototype.relogin = function() {

	if (uni.getStorageSync("mini_car_token")) {
		let setTimeputId = setTimeout(() => {
			console.log(new Date() + ' refresh_mini_car_token')
			uni.getSetting({
				success(res) {
					console.log("授权：", res);
					if (!res.authSetting['scope.userInfo']) {
						//这里调用授权
						console.log("当前未授权");
						//触发定时检测程序，如果授权了，那就跳转，没有的话就继续检测
						console.log("未登录")
					} else {
						//用户已经授权过了
						console.log("当前已授权了");
						let that = this
						uni.login({
							provider: 'weixin',
							success: function(loginRes) {
								uni.getUserInfo({
									provider: 'weixin',
									success: function(infoRes) {
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
										uni.request({
											// url: 'http://localhost:8080/minicar/butt-auth',
											url: 'https://chengym.com.cn/minicar/butt-auth',
											method: 'POST',
											header: {
												"content-type": "application/json"
											},
											data: data,
											success: async ress => {
												if (ress && ress.statusCode === 200) {
													uni.setStorageSync("mini_car_token", ress.data.token)
													uni.setStorageSync("mini_car_userid", ress.data.userid)

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
				}
			})
		})
		// getApp().globalData.setTimeoutForRefreshToken = setTimeputId
	} else {
		console.log('未登录')
	}
}
Vue.prototype.setRelogin = function() {
	console.log('start refresh_token')
	setInterval(() => {
		let that = this
		that.relogin()
		// }, 1000);
	}, 300000);
}

// http拦截器，将此部分放在new Vue()和app.$mount()之间，才能App.vue中正常使用
import httpInterceptor from '@/common/http.interceptor.js'
Vue.use(httpInterceptor, app)

// http接口API抽离，免于写url或者一些固定的参数
import httpApi from '@/common/http.api.js'
Vue.use(httpApi, app)

app.$mount()
