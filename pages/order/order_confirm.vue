<template>
	<view class="u-demo">
		<view class="item">
			<view class="title">
				预约日期（左右滑动选择）
			</view>

			<view class="order-confirm-result-txt">{{orderDate}}</view>
		</view>
		<view class="item">
			<view class="title">
				预约时间
			</view>
			<view class="order-confirm-result-txt">{{timeSelected}}</view>
		</view>
		<view class="item">
			<view class="title">
				模拟场地
			</view>
			<view class="order-confirm-result-txt">{{areaSelected}}</view>
		</view>


		<view class="item">
			<view class="title">
				服务车
			</view>
			<view class="order-confirm-result-txt">{{carSelected}}</view>
		</view>
		<view class="wrap">
			<u-form :model="model" :rules="rules" ref="uForm" :errorType="errorType">
				<!-- <u-form-item label-width="150" :label-position="labelPosition" label="身份证号" prop="idCard">
					<u-input :border="border" placeholder="请输入身份证号" v-model="model.idCard" type="text"></u-input>
				</u-form-item> -->
				<u-form-item :label-position="labelPosition" label="姓名" prop="name" label-width="150">
					<u-input :border="border" placeholder="请输入姓名" v-model="model.name" type="text"></u-input>
				</u-form-item>
				<!-- <u-form-item :label-position="labelPosition" label="性别" label-width="150">
					<u-radio-group v-model="radio" @change="radioGroupChange" :width="radioCheckWidth" :wrap="radioCheckWrap">
						<u-radio shape="circle" v-for="(item, index) in radioList" :key="index" :name="item.name">{{ item.name }}</u-radio>
					</u-radio-group>
				</u-form-item> -->
				<u-form-item :label-position="labelPosition" label="手机号码" prop="phone" label-width="150">
					<u-input :border="border" placeholder="请输入手机号" v-model="model.phone" type="number"></u-input>
					<!-- <u-button size="mini" open-type="getPhoneNumber" @getphonenumber="decryptPhoneNumber">获取手机号</u-button> -->
				</u-form-item>
				<!-- <u-form-item :label-position="labelPosition" label="驾校名称" prop="schoolName" label-width="150">
					<u-input :border="border" placeholder="请输入驾校名称" v-model="model.schoolName" type="text"></u-input>
				</u-form-item>
				<u-form-item :label-position="labelPosition" label="教练姓名" prop="coachName" label-width="150">
					<u-input :border="border" placeholder="请输入教练姓名" v-model="model.coachName" type="text"></u-input>
				</u-form-item> -->
			</u-form>

		</view>
		<view class="item">
			<view class="title">

			</view>
			<view>
				<button type="primary" size="default" @tap="confimOrder">确认预约</button>
			</view>
		</view>
	</view>
</template>

<script>
	import zzxCalendar from "@/components/zzx-calendar/zzx-calendar.vue"
	import timeSelector from '@/components/xiujun-time-selector/index.vue';
	import ynGallery from '@/components/YnComponents/ynGallery/ynGallery.vue'
	import api from '@/common/http.api.js'
	export default {
		components: {
			zzxCalendar,
			timeSelector,
			ynGallery
		},
		onLoad: function(option) { //option为object类型，会序列化上个页面传递的参数
			uni.$on('toConfimOrder', function(data) {
				console.log('监听到事件来自 update ，携带参数 msg 为：' + data.msg);
			})
			this.orderDate = option.orderDate
			this.timeSelected = option.orderConfigTime
			this.timeSelectedId = option.orderTimeIdsStr
			this.areaSelected = option.areaName
			this.areaSelectedId = option.areaId
			this.carSelected = option.carSelectedName
			this.carSelectedId = option.carSelectedId
			console.log(option.orderTimeIdsStr); //打印出上个页面传递的参数。
		},
		onReady() {
			this.$refs.uForm.setRules(this.rules);
		},
		data() {
			return {
				orderInfo: '',
				changeRolNum: 0,
				orderDate: '',
				span: 3,
				offset: 0,
				timeSelected: '',
				timeSelectedId: '',
				areaSelected: '',
				areaSelectedId: '',
				carSelected: '',
				carSelectedId: '',
				justify: 'start',
				area_src: '@/static/car/img/order/area_sc.png',
				room: [],
				model: {
					phone: '',
					name: ''
				},
				errorType: ['toast'],
				rules: {
					idCard: [{
							required: true,
							message: '请输入身份证号',
							trigger: ['change', 'blur'],
						},
						{
							validator: (rule, value, callback) => {
								return this.$u.test.idCard(value);
							},
							message: '身份证号不正确',
							trigger: ['change', 'blur'],
						}
					],
					name: [{
							required: true,
							message: '请输入姓名',
							trigger: 'blur',
						},
						{
							min: 2,
							max: 5,
							message: '姓名长度在2到5个字符',
							trigger: ['change', 'blur'],
						},
						{
							// 此为同步验证，可以直接返回true或者false，如果是异步验证，稍微不同，见下方说明
							validator: (rule, value, callback) => {
								// 调用uView自带的js验证规则，详见：https://www.uviewui.com/js/test.html
								return this.$u.test.chinese(value);
							},
							message: '姓名必须为中文',
							// 触发器可以同时用blur和change，二者之间用英文逗号隔开
							trigger: ['change', 'blur'],
						},
					],
					phone: [{
							required: true,
							message: '请输入手机号',
							trigger: ['change', 'blur'],
						},
						{
							validator: (rule, value, callback) => {
								// 调用uView自带的js验证规则，详见：https://www.uviewui.com/js/test.html
								return this.$u.test.mobile(value);
							},
							message: '请确认手机格式',
							// 触发器可以同时用blur和change，二者之间用英文逗号隔开
							trigger: ['change', 'blur'],
						}
					],
				},
			}
		},
		methods: {
			datechange(e) { // 获取年月日
				this.orderDate = e.fullDate;
				console.log(e)
			},
			selectTimeEvent(e) { // 获取当天预约时间段  12.00-13:00
				console.log(e);
			},
			onclickimg(e) { // 获取  预约车辆   根据index判断
				console.log(e)
			},
			changeRol(item, i) { // 选择场地
				this.changeRolNum = i; // 替换选中样式
			},
			getWeChatMiniProgramUserInfo(retry_times) {
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
								uni.showToast({
									title: '登录中，请稍候...',
									icon: 'none',
									duration: 3000
								})
								this.$u.post('/butt-auth', data).then(res => {
									if (res && res.code === 200) {
										uni.setStorageSync("mini_car_token", res.token)
										uni.setStorageSync("mini_car_userid", res.userid)
										//跳转到订单确认页面

									} else {

									}

								})
							}
						})
					}
				})
			},
			confimOrder() {
				let that = this
				let val = false
				this.$refs.uForm.validate(valid => {
					if (valid) {
						console.log('验证通过');
						val = valid
					} else {
						console.log('验证失败');
					}
				});
				if (val) {
					let data = {
						orderDate: this.orderDate,
						orderTimeIdsStr: this.timeSelectedId,
						areaId: this.areaSelectedId,
						carId: this.carSelectedId,
						userName: this.model.name,
						userPhone: this.model.phone
					}
					this.$u.post("/order/add", data).then(res => {
						console.log(res)
						let contect = ''
						if (res.data.newOrders) {
							contect = '新增'
							res.data.newOrders.forEach(item => {
								contect += item.orderTimeStr + ','
							})
							contect += '的预约，共计' + res.data.billInfo.orderLength + '小时'

						}
						if (res.data.hadOrders) {
							res.data.hadOrders.forEach(item => {
								contect += item.orderTimeStr + ','
							})
							contect += '已经预约过，无需重复预约。'
						}

						uni.showModal({
							content: contect,
							showCancel: false
						})
					})
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.item {
		// margin: 30rpx 0;

		&:first-child {
			margin-top: 0;
		}

		&:last-child {
			margin-bottom: 0;
		}

		.title {
			font-size: 30rpx;
			position: relative;
			line-height: 1;
			padding-left: 22rpx;

			&:before {
				width: 4px;
				height: 15px;
				border-radius: 100rpx;
				background-color: $u-content-color;
				content: '';
				position: absolute;
				left: 6rpx;
				top: -1px;
			}
		}

		.order-confirm-result-txt {
			font-size: 12pt;
			margin-left: 20rpx;
			margin-top: 20rpx;
			margin-bottom: 20rpx;
			color: #16A6F8;
			word-break: break-all;
		}

		.ro-ul {
			width: 100%;
			margin-top: 25rpx;
			margin-bottom: 42rpx;

			.ro-li {
				width: 100%;
				height: 56rpx;
				margin-top: 19rpx;

				&:first-child {
					margin-top: 0;
				}

				.ro-rol {
					width: 50%;
					height: 100%;
					background: #fff;
					border-radius: 3rpx;
					border: 1rpx solid #979797;
					color: #818181;

					&.rol-hover {
						background: #E1F5FE;
						border: 1rpx solid #009CF8;
						color: #16A6F8;
					}

					text {
						width: 100%;
						height: 100%;
						font-size: 26rpx;
						font-family: PingFangSC-Medium, PingFang SC;
						font-weight: 500;
						line-height: 56rpx;
						text-indent: 22rpx;
						display: block;
					}
				}
			}
		}

		.color-box {
			display: flex;
			align-items: center;
			justify-content: space-between;
			color: #fff;
			text-align: center;
			margin-top: 20rpx;

			.color-item {
				display: flex;
				flex: 1;
				margin: 0 8rpx;
				flex-direction: column;
				border-radius: 6rpx;
				padding: 12rpx 0;
			}


			.color-title {
				font-size: 28rpx;
			}

			.color-value {
				font-size: 24rpx;
			}
		}

		.ygallery {
			width: 100%;
		}


	}

	.demo-layout {
		height: 70rpx;
		border-radius: 8rpx;
		border: 1rpx #303133 solid;
		margin: 20rpx 0;
	}

	.bg-purple {
		background: #ffffff;
	}

	.bg-purple-light {
		background: #e5e9f2;
	}

	.bg-purple-dark {
		background: #99a9bf;
	}

	// H5中，电脑端文档演示时，可能会导致演示块挤出边界，特别处理。
	// 真实使用环境不会产生此问题
	/* #ifdef H5 */
	.u-demo-area /deep/ .u-row {
		display: flex;
		flex-wrap: wrap;
	}





	/* #endif */
</style>
