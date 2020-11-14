<template>
	<view class="u-demo">
		<view class="item">
			<view class="title">
				预约日期（左右滑动选择）
			</view>

			<zzx-calendar @selected-change="datechange"></zzx-calendar>
		</view>
		<view class="item">
			<view class="title">
				模拟场地
			</view>
			<u-row :justify="justify">
				<u-col :span="span" :offset="offset" @click="click" stop>
					<view class="demo-layout bg-purple">
						<u-image :shape="shape" ref="uImage" :width="width" :height="height" :src="area_src" mode="aspectFill">
							<u-loading size="44" mode="flower" slot="loading" v-if="loadingSlot"></u-loading>
							<view v-if="errorSlot" slot="error" style="font-size: 24rpx;">加载失败</view>
						</u-image>
					</view>
				</u-col>
				<u-col :span="span" :offset="offset">
					<view class="demo-layout bg-purple">

					</view>
				</u-col>
				<u-col :span="span" :offset="offset">
					<view class="demo-layout bg-purple">

					</view>
				</u-col>
			</u-row>
			<time-selector @selectTime="selectTimeEvent" startTime="8:00" endTime="18:00" selectedTabColor="#0092D5" selectedItemColor="#0094D7"></time-selector>
			<!-- <zzx-calendar @selected-change="datechange"></zzx-calendar> -->
		</view>
		<!-- <view class="item">
			<view class="title">
				服务车
			</view>
			<view>
				<ynGallery :galleryheight="165" bkstart="#ffffff" bkend="#ffffff" :imgviewwidth="85" :imgviewheight="105"
				 :showbadge="true" badegtype="trian" badegwidth="25" badegheight="25" :showdec="true" :images="testimgs" @clickimg="onclickimg">
				</ynGallery>
			</view>
		</view> -->
	</view>
</template>

<script>
	import zzxCalendar from "@/components/zzx-calendar/zzx-calendar.vue"
	import timeSelector from '@/components/xiujun-time-selector/index.vue';
	import ynGallery from '@/components/YnComponents/ynGallery/ynGallery.vue'
	export default {
		components: {
			zzxCalendar,
			timeSelector,
			ynGallery
		},
		data() {
			return {
				orderDate: '',
				span: 3,
				offset: 0,
				justify: 'start',
				area_src: '@/static/car/img/order/area_sc.png',
				testimgs: [{
						index: 0,
						dec: '1号服务车', //图像描述信息
						badeg: '', //角标文字
						badegcolor: '', //角标颜色
						url: 'https://images.inspur.fun/car.png', //图源  
						dominant: ''
					},
					{
						index: 1,
						dec: '', //图像描述信息
						badeg: '', //角标文字
						badegcolor: '', //角标颜色
						url: 'https://images.inspur.fun/car.png', //图源  
						dominant: ''
					},
					{
						index: 2,
						dec: '', //图像描述信息
						badeg: '', //角标文字
						badegcolor: '', //角标颜色
						url: 'https://images.inspur.fun/car.png', //图源  
						dominant: ''
					}
				]
			}
		},
		methods: {
			datechange(e) {
				this.orderDate = e.fullDate;
			},
			selectTimeEvent(e) {}
		}
	}
</script>

<style lang="scss" scoped>
	.item {
		margin: 30rpx 0;
		margin-top: 44rpx;

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
