<template>
	<view class="home_wrap">
		<view class="top_nav" @click="toOrder()">
			<image src="../../static/car/img/home/banner.png" alt="" class="top_img">
		</view>
		<view class="home_content">
			<view class="circle">
				<view class="yuyue_wrap">
					<view class="yuyue_middle" @click="toOrder()">
						<image src="../../static/car/img/home/car.png" class="yuyueImg1"></image>
						<p class="yuyue_text">预约用车</p>
					</view>
				</view>
				<view class="sign_up_wrap">
					<view class="sign_up_middle" @click="toLearn()">
						<image src="../../static/car/img/home/sign_up.png" class="signUpImg1"></image>
						<p class="signUp_text">学车报名</p>
					</view>
				</view>
				<view class="inform_wrap">
					<view class="inform_middle">
						<image src="../../static/car/img/home/inform.png" class="informImg1"></image>
						<p class="inform_text">通知公告</p>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			toOrder(){
				uni.navigateTo({
					url:'../order/order'
				})
			},
			toLearn(){
				uni.navigateTo({
					url:'../learn/learn'
				})
			}
		}
			
	}
</script>

<style>
	page{
		height: 100%;
	}
	.home_wrap{
		width: 750rpx;
		height: 100%;
		position: relative;
	}
	.top_nav{
		height: 332rpx;
		z-index: 10;
		overflow: hidden;
		position: relative;
	}
	.top_img{
		width: 100%;
		height: 100%;
	}
	.home_content{
		width: 670rpx;
		height: 669rpx;
		position: absolute;
		top: 241rpx;
		left: 41rpx;
		/* margin:-89rpx 41rpx 0; */
		z-index: 8;
	}
	.circle{
		width: 100%;
		height: 100%;
		border: 1rpx solid #979797;
		border-radius: 50%;
		position: relative;
	}
	.yuyue_wrap{
		width: 332rpx;
		height: 332rpx;
		background: rgba(39, 149, 255, .5);
		margin: 169rpx 178rpx;
		border-radius: 50%;
		overflow: hidden;
	}
	.yuyue_middle{
		width: 305rpx;
		height: 306rpx;
		background: #2795FF;
		border-radius: 50%;
		margin: 13rpx auto;
	}
	.yuyueImg1{
		width: 186rpx;
		height: 172rpx;
		margin-top: 30rpx;
		margin-left: 60rpx;
	}
	.yuyue_text{
		width: 144rpx;
		height: 50rpx;
		font-size: 36rpx;
		font-family: PingFangSC-Medium, PingFang SC;
		font-weight: 500;
		color: #FFFFFF;
		line-height: 50rpx;
		margin-top: 2rpx;
		margin-left: 81rpx;
	}
	.sign_up_wrap{
		position: absolute;
		top: 476rpx;
		left: 8rpx;
		width: 222rpx;
		height: 222rpx;
		background: rgba(112, 146, 244, .5);
		border-radius: 50%;
		overflow: hidden;
	}
	.sign_up_middle{
		width: 202rpx;
		height: 202rpx;
		background: #7092F4;
		margin-top: 10rpx;
		margin-left: 10rpx;
		border-radius: 50%;
		overflow: hidden;
	}
	.signUpImg1{
		width: 80rpx;
		height: 80rpx;
		margin-top: 36rpx;
		margin-left: 61rpx;
	}
	.signUp_text{
		width: 104rpx;
		height: 37rpx;
		font-size: 26rpx;
		font-family: PingFangSC-Medium, PingFang SC;
		font-weight: 500;
		color: #FFFFFF;
		line-height: 37rpx;
		margin-top: 17rpx;
		margin-left: 49rpx;
	}
	.inform_wrap{
		position: absolute;
		top: 476rpx;
		right: 1rpx;
		width: 222rpx;
		height: 222rpx;
		background: rgba(241, 196, 56, .5);
		border-radius: 50%;
		overflow: hidden;
	}
	.inform_middle{
		width: 202rpx;
		height: 202rpx;
		background: #F1C438;
		margin-top: 10rpx;
		margin-left: 10rpx;
		border-radius: 50%;
		overflow: hidden;
	}
	.informImg1{
		width: 80rpx;
		height: 80rpx;
		margin-top: 36rpx;
		margin-left: 61rpx;
	}
	.inform_text{
		width: 104rpx;
		height: 37rpx;
		font-size: 26rpx;
		font-family: PingFangSC-Medium, PingFang SC;
		font-weight: 500;
		color: #FFFFFF;
		line-height: 37rpx;
		margin-top: 17rpx;
		margin-left: 49rpx;
	}
		
</style>
