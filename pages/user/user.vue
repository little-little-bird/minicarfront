<template>
	<view class="user_wrap">
		<view class="user_content">
			<view class="users-div">
				<view class="users-middle">
					<image :src="avatarUrl" mode="" class="users-tx"></image>
				</view>
			</view>
			<view class="user-name">
				<text>{{userName}}</text>
				<!-- <image src="../../static/car/img/user/sex-man.png"></image> -->
			</view>
			<view class="brokerage">
				<!-- <view class="money">
					<text>0.00</text>
					<view class="btn">点击提现</view>
				</view>
				<text class="bro-text">我的佣金</text> -->
			</view>
			<view class="slide-bar">
				<ul>
					<li>
						<view class="lists" @click="turnToOrderRecords()">
							<view class="imgWrap">
								<image src="../../static/car/img/user/order.png" mode="" class="margin1"></image>
							</view>
							<text>预约记录</text>
						</view>
					</li>
					<!-- <li>
						<view class="lists">
							<view class="imgWrap">
								<image src="../../static/car/img/user/undone.png" mode="" class="margin1"></image>
							</view>
							<text>待支付订单</text>
						</view>
					</li> -->
					<li>
						<view class="lists">
							<view class="imgWrap" @click="personalQRCode()">
								<image src="../../static/car/img/user/link.png" mode="" class="margin1"></image>
							</view>
							<text>专属邀请码</text>
						</view>
					</li>
					<li>
						<view class="lists"  @click="turnToInviterRecords()">
							<view class="imgWrap">
								<image src="../../static/car/img/user/time.png" mode="" class="margin1"></image>
							</view>
							<text>邀请记录</text>
						</view>
					</li>
				</ul>
				<ul>
					<!-- <li>
						<view class="lists">
							<view class="imgWrap">
								<image src="../../static/car/img/user/record.png" mode="" class="margin1"></image>
							</view>
							<text>分佣明细</text>
						</view>
					</li>
					<li>
						<view class="lists">
							<view class="imgWrap">
								<image src="../../static/car/img/user/pay.png" mode="" class="margin1"></image>
							</view>
							<text>提现记录</text>
						</view>
					</li>
					<li>
						<view class="lists">
							<view class="imgWrap">
								<image src="../../static/car/img/user/coach.png" mode="" class="margin1"></image>
							</view>
							<text>常用约车人</text>
						</view>
					</li> -->
				</ul>
			</view>
		</view>
		<view class="user_fot">
			<ul>
				<!-- <li>
					<view class="fot-list" @click="openPage()">
						<image src="../../static/car/img/user/setting.png" mode="" class="img1"></image>
						<text>设置</text>
					</view>
				</li> -->
				<!-- <li>
					<view class="fot-list">
						<image src="../../static/car/img/user/service.png" mode="" class="img1"></image>
						<text>退费须知</text>
					</view>
				</li> -->
				<li>
					<view class="fot-list" @click="showMoneyMessage()">
						<image src="../../static/car/img/user/service.png" mode="" class="img1"></image>
						<text>费用说明</text>
					</view>
				</li>
			</ul>
		</view>
		<qrcode-poster ref="poster" :title="goods.title" 
		        :subTitle="goods.sub_title" 
		        :headerImg="'../../static/car/img/home/headerimg.png'"
		        :price="goods.price"></qrcode-poster>
	</view>
</template>

<script>
	import QrcodePoster from '@/components/zhangyu-qrcode-poster/zhangyu-qrcode-poster.vue'
	export default {
		components:{
			QrcodePoster
		},
		data() {
			return {
				is_show_model: false,//是否显示分享模态窗,
				userName:'学员',
				avatarUrl:'../../static/car/img/user/user.jpg'
			}
		},
		onShow() {
			let that = this
			that.gerUsermessage()
		},
		methods: {
			gerUsermessage(){
				let that = this
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
							uni.getUserInfo({
								provider: 'weixin',
								success: function(infoRes) {
									that.userName = infoRes.userInfo.nickName
									that.avatarUrl = infoRes.userInfo.avatarUrl
								}
								})
						}
					}
				})
			},
			openPage(path) {
				this.$u.route({
					url: '/pages/user/userInfo'
				})
			},
			personalQRCode(){
				this.$api.get_qr_code().then(res=>{
					this.is_show_model = true
					this.$refs.poster.showCanvas('',res.msg)
				})
				// this.$u
			},
			showMoneyMessage(){
				uni.showModal({
				    title: '费用说明',
				    content: '车辆练习费用为100元/小时，在线预约可享受折扣优惠，具体费用按照实际练车计时产生费用计算。',
				    success: function (res) {
				        if (res.confirm) {
				            console.log('用户点击确定');
				        } else if (res.cancel) {
				            console.log('用户点击取消');
				        }
				    }
				});
			},
			turnToOrderRecords(){
				uni.navigateTo({
					url: '../order/order_records/order_records',
					success: function() {
					},
					fail: function(e) {
						console.error(e)
					},
					complete() {
					}
				})
			},
			turnToInviterRecords(){
				uni.navigateTo({
					url: './inviter_records/inviter_records',
					success: function() {
					},
					fail: function(e) {
						console.error(e)
					},
					complete() {
					}
				})
			},
			
		}
	}
</script>

<style>
	page{
		height: 100%;
	}
	.user_wrap{
		width: 100%;
		height:100%;
		background: linear-gradient(150deg, #2463BE 0%, #0D418B 100%);
		overflow: hidden;
	}
	.user_content{
		width: 662rpx;
		height: 628rpx;
		margin-top: 124rpx;
		margin-left: 46rpx;
		background-color: #fff;
		position: relative;
		float: left;
	}
	.user_fot{
		width: 662rpx;
		height: 140rpx;
		margin-top: 19rpx;
		margin-left: 46rpx;
		background-color: #fff;
		float: left;
	}
	.users-div{
		width: 150rpx;
		height: 150rpx;
		background: rgba(27, 86, 170, 0.16);
		border-radius: 50%;
		position: absolute;
		top: -75rpx;
		left: 256rpx;
	}
	.users-middle{
		width: 134rpx;
		height: 134rpx;
		background: rgba(27, 86, 170, 0.16);
		border-radius: 50%;
		margin: 8rpx;
	}
	.users-tx{
		width: 120rpx;
		height: 120rpx;
		margin: 6rpx 8rpx 8rpx 6rpx;
		border-radius: 50%;
	}
	.user-name{
		width: 662rpx;
		text-align: center;
		height: 45rpx;
		line-height: 36rpx;
		position: absolute;
		top: 75rpx;
	}
	.user-name text {
		font-size: 30rpx;
		font-family: Helvetica;
		color: #4A4A4A;
	}
	.user-name image {
		width: 22rpx;
		height: 22rpx;
		margin-left: 5rpx;
	}
	.brokerage{
		width: 100%;
		height: 112rpx;
		margin-top: 155rpx;
	}	
	.money{
		width: 100%;
		height: 68rpx;
	}
	.money text{
		display: inline-block;
		margin-left: 43rpx;
		width: 200rpx;
		height: 68rpx;
		font-size: 46rpx;
		font-family: Helvetica;
		color: #4A4A4A;
		line-height: 68rpx;
		font-weight: 600;
		float: left;
	}
	.money .btn{
		width: 120rpx;
		height: 45rpx;
		font-size: 30rpx;
		font-family: Helvetica;
		color: #1777E6;
		line-height: 36rpx;
		display: inline-block;
		font-weight: 500;
		float: right;
		margin-top: 23rpx;
		margin-right: 32rpx;
	}
	.bro-text{
		display: block;
		width: 96rpx;
		height: 36rpx;
		font-size: 24rpx;
		font-family: Helvetica;
		color: #9B9B9B;
		line-height: 29rpx;
		margin-top: 8rpx;
		margin-left: 43rpx;
	}
	.slide-bar{
		margin-top: 44rpx;
		width: 100%;
		overflow: hidden;
	}
	.slide-bar ul,.user_fot ul{
		width: 100%;
		list-style: none;
	}
	.slide-bar ul:last-child{
		margin-top: 29rpx;
	}
	.slide-bar ul li,.user_fot ul li{
		width: 25%;
		display: inline-block;
	}
	.lists {
		height: 128rpx;
		width: 100%;
		text-align: center;
	}
	.imgWrap{
		margin: 0 auto;
		width: 86rpx;
		height: 86rpx;
		background: #E6F0FF;
		border-radius: 50%;
		position: relative;
	}
	.imgWrap image{
		width: 36rpx;
		height: 36rpx;
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%,-50%);
	}
	.lists>text{
		height: 36rpx;
		font-size: 24rpx;
		font-family: Helvetica;
		color: #4A4A4A;
		line-height: 29rpx;
	}
	.fot-list{
		height: 87rpx;
		width: 100%;
		text-align: center;
		margin-top: 28rpx;
	}
	.fot-list .img1{
		width: 40rpx;
		height: 40rpx;
		display: block;
		margin: 0 auto;
	}
	.fot-list>text{
		display: block;
		height: 36rpx;
		font-size: 24rpx;
		font-family: Helvetica;
		color: #4A4A4A;
		line-height: 29rpx;
		margin-top: 11rpx;
	}

	
	
	
	
	
</style>
