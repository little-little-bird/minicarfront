<template>
	<view class="u-demo">
		<view class="item">
			<view class="title">
				预约日期（左右滑动选择）
			</view>

			<zzx-calendar @selected-change="datechange"></zzx-calendar>
		</view>
		<!-- <view class="item">
			<time-selector class="select-time-it" @selectTime="selectTimeEvent" startTime="8:00" endTime="18:00"
			 selectedTabColor="#0092D5" selectedItemColor="#0094D7"></time-selector> -->
		<!-- <zzx-calendar @selected-change="datechange"></zzx-calendar> -->
		<!-- </view> -->
		<view class="item time-list">
			<view class="title">
				预约时间
			</view>
			上午
			<u-row :justify="justify" v-for="(amrow,i) in amTimeList">
				<u-col :span="4" :offset="offset" @click="selectTime(amitemcol)" stop v-if="amitemcol.id" v-for="(amitemcol,index) in amrow" >
					<view class="demo-layout time-select-text" :class="{'bg-blue': amitemcol.checked}">
						{{amitemcol.configTime}}
					</view>
				</u-col>
			</u-row>
			下午
			<u-row :justify="justify" v-for="(pmrow,i) in pmTimeList">
				<u-col :span="4" :offset="offset" @click="selectTime(pmitemcol)" stop v-if="pmitemcol.id" v-for="(pmitemcol,index) in pmrow" >
					<view class="demo-layout time-select-text" :class="{'bg-blue': pmitemcol.checked}">
						{{pmitemcol.configTime}}
					</view>
				</u-col>
			</u-row>
		</view>
		<view class="item">
			<view class="title">
				模拟场地
			</view>
			<ul class="ro-ul">
				<li v-for="(item,i) in room" key="item.label" class="ro-li">
					<view class="ro-rol" :class="{'rol-hover': changeRolNum == i }" @click="changeRol(item,i)">
						<!-- rol-hover     点击时添加此class 修改样式 -->
						<text>{{item.name}}</text>
					</view>
				</li>
			</ul>
		</view>


		<view class="item">
			<view class="title">
				服务车
			</view>
			<view class="ygallery">
				<ynGallery :galleryheight="165" bkstart="#ffffff" bkend="#ffffff" :imgviewwidth="85" :imgviewheight="105"
				 :showbadge="true" badegtype="trian" badegwidth="25" badegheight="25" :showdec="false" :images="testimgs" @clickimg="onclickimg">
				</ynGallery>
			</view>
		</view>
		<view class="item">
			<view class="title">

			</view>
			<view>
				<button type="primary" size="default" open-type="getUserInfo" @getuserinfo="checkuserInfo">下一步</button>
			</view>
		</view>
	</view>
</template>

<script>
	import zzxCalendar from "@/components/zzx-calendar/zzx-calendar.vue"
	import timeSelector from '@/components/xiujun-time-selector/index.vue';
	import ynGallery from '@/components/YnComponents/ynGallery/ynGallery.vue'
	import {formatDate} from '@/components/zzx-calendar/generateDates.js'
	export default {
		components: {
			zzxCalendar,
			timeSelector,
			ynGallery
		},
		onLoad() {
			this.init()
		},
		data() {
			return {
				changeRolNum: 0,
				orderDate: '',
				span: 3,
				offset: 0,
				justify: 'start',
				area_src: '@/static/car/img/order/area_sc.png',
				room: [],
				testimgs: [],
				amTimeList: [[]],
				pmTimeList: [[]],
				timeList:[],
				timeSelectedList:[],
				timeSelectedIdList:[],
				timeSelectedconfigTimeList:[],
				timeSelectedconfigTimeNameList:[],
				roomSelectedId:'',
				roomSelectedName:'',
				carSelectedId:'',
				carSelectedName:'',
			}
		},
		watch:{
			timeSelectedList: {
				handler() {
					
					this.getCars();
				},
				immediate: true
			},
			timeSelectedconfigTimeList:{
				handler(){
					let timeSelectedconfigTimeTmp =[]
					this.timeList.forEach(item=>{
						this.timeSelectedconfigTimeList.indexOf(item.configTime)!=-1?timeSelectedconfigTimeTmp.push(item):''
					})
					sortBykey(timeSelectedconfigTimeTmp,'sort')
					let timeSelectedconfigTime = []
					timeSelectedconfigTimeTmp.forEach(item=>{
						timeSelectedconfigTime.push(item.configTime)
					})
					this.timeSelectedconfigTimeNameList = timeSelectedconfigTime
					console.log(this.timeSelectedconfigTimeNameList)
				},
				immediate:true
			}
		},
		methods: {
			init() {
				this.getRoom()
				this.getOrderTime()
				this.getCars()
			},
			getRoom() {
				let that = this
				this.$u.get("/area/list").then(res => {
					if (res) {
						that.room = []
						res.data.forEach(item => {
							that.room.push({
								name: item.name,
								label: item.id
							})
						})
						that.roomSelectedId = that.room[that.changeRolNum].label;
						that.roomSelectedName = that.room[that.changeRolNum].name;
					}
				})
			},
			getOrderTime() {
				this.$u.get("/ordertime/list").then(res => {
					if (res) {
						this.timeList = []
						this.amTimeList = [[]];
						let amTimeListTmp = []
						this.pmTimeList = [[]];
						let pmTimeListTmp = []
						let amTimeSize = 0;
						let pmTimeSize = 0
						//统计am pm分别的数量
						res.data.forEach(item => {
							this.timeList.push(item)
							if (item.intervalStr === "am") {
								amTimeSize++
								amTimeListTmp.push(item)
							} else if (item.intervalStr === "pm") {
								pmTimeSize++
								pmTimeListTmp.push(item)
							}

						})
						let amRowCount = (amTimeSize / 3) 
						let pmRowCount = (pmTimeSize / 3)
						//开始分组
						let amRow = 0;
						let amCol = 0;
						let pmRow = 0;
						let pmCol = 0;
						let pmCount = 0;
						for(amRow =0;amRow<amRowCount;amRow++){
							this.amTimeList[amRow] = new Array();
							for(amCol=0;amCol<3;amCol++){
								this.amTimeList[amRow][amCol]=amTimeListTmp[amRow*3+amCol]
							}
						}
						for(pmRow =0;pmRow<pmRowCount;pmRow++){
							this.pmTimeList[pmRow] = new Array();
							for(pmCol=0;pmCol<3;pmCol++){
								if(pmTimeListTmp[pmRow*3+pmCol]){
									this.pmTimeList[pmRow][pmCol]=pmTimeListTmp[pmRow*3+pmCol]
								}else{
									this.pmTimeList[pmRow][pmCol]=null
								}
								
							}
						}
					}
				})
			},
			getCars() {
				let that = this
				let data ={
					orderTimeIdsStr:this.timeSelectedIdList.join(','),
					orderDate:this.orderDate?orderDate:formatDate(new Date(), 'yyyy-MM-dd'),
					 areaId:this.roomSelectedId
				}
				this.$u.get("/iventendcar/cars",data).then(res => {
					if (res) {
						that.testimgs = []
						res.data.forEach(item => {
							let url = '../../../static/car/img/order/car_def' + item.sort + '.png'
							let hoverUrl = '../../../static/car/img/order/'+(item.canCarInvented?'car_hov':'car_def') + item.sort + '.png'
							let defurl = '../../../static/car/img/order/car_def' + item.sort + '.png'
							that.testimgs.push({
								index: item.id,
								dec: item.displayName, //图像描述信息
								badeg: '', //角标文字
								badegcolor: '', //角标颜色
								url: url, //图源  
								hoverUrl: hoverUrl,
								defurl: defurl,
								dominant: ''
							})
						})
						that.carSelectedId = that.testimgs[0].index
						that.carSelectedName= that.testimgs[0].dec
					}
				})
			},
			datechange(e) { // 获取年月日
				this.orderDate = e.fullDate;
				console.log(e)
			},
			selectTimeEvent(e) { // 获取当天预约时间段  12.00-13:00
				console.log(e);
			},
			selectTime(selecteOne){
				if(typeof selecteOne.checked=='undefined'){
				    this.$set(selecteOne,"checked",true)
					this.timeSelectedList.push(selecteOne)
					this.timeSelectedIdList.push(selecteOne.id)
					this.timeSelectedconfigTimeList.push(selecteOne.configTime)
				 }else{
				   selecteOne.checked=!selecteOne.checked
				   if(!selecteOne.checked){
					   this.timeSelectedList.some((item, i) => {
					       if (item.id == selecteOne.id) {
					           this.timeSelectedList.splice(i, 1)
					           return true;
					       }
					   })
					   this.timeSelectedIdList.some((itemid, iId) => {
					       if (itemid == selecteOne.id) {
					           this.timeSelectedList.splice(iId, 1)
					           return true;
					       }
					   })
					   this.timeSelectedconfigTimeList.some((itemConfigTime, iConfigTime) => {
					       if (itemConfigTime == selecteOne.configTime) {
					           this.timeSelectedconfigTimeList.splice(iConfigTime, 1)
					           return true;
					       }
					   })
				   }else{
					  this.timeSelectedList.push(selecteOne)
					  this.timeSelectedIdList.push(selecteOne.id)
					  this.timeSelectedconfigTimeList.push(selecteOne.configTime) 
				   }
				 }
			},
			onclickimg(e) { // 获取  预约车辆   根据index判断
			let that = this
			that.carSelectedId = e.index
			that.carSelectedName =e.dec
			},
			changeRol(item, i) { // 选择场地
				this.changeRolNum = i; // 替换选中样式
				this.roomSelectedId = this.room[this.changeRolNum].label;
				this.roomSelectedName = this.room[this.changeRolNum].name;
				
			},
			itemInSelected(){
				console.log("ss")
				return true
			},
			getWeChatMiniProgramUserInfo() {
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
								that.$u.post('/butt-auth', data).then(res => {
									if (res && res.code === 200) {
										uni.setStorageSync("mini_car_token", res.token)
										uni.setStorageSync("mini_car_userid", res.userid)
										//跳转到订单确认页面
										that.checkAndToOrder()
									} else {

									}

								})
							}
						})
					}
				})
			},
			checkuserInfo() {
				let that = this
				uni.getSetting({
					success(res) {
						console.log("授权：", res);
						if (!res.authSetting['scope.userInfo']) {
							//这里调用授权
							debugger
							console.log("当前未授权");
							//触发定时检测程序，如果授权了，那就跳转，没有的话就继续检测
							// that.checkUserAuthSetting();
							uni.showToast({
								title: '请完成授权',
								icon: 'none',
								duration: 3000
							})
						} else {
							//用户已经授权过了
							console.log("当前已授权");
							that.getWeChatMiniProgramUserInfo()
							
						}
					}
				})
			},
			checkAndToOrder(){
				if(this.timeSelectedList&&this.timeSelectedList.length>0){
					let data = {
						orderTimeIdsStr:this.timeSelectedIdList.join(','),
						orderDate:this.orderDate?this.orderDate:formatDate(new Date(), 'yyyy-MM-dd'),
					}
					let param ='orderTimeIdsStr='+this.timeSelectedIdList.join(",")+'&orderDate='+(this.orderDate?this.orderDate:formatDate(new Date(), 'yyyy-MM-dd'))+'&orderConfigTime='+this.timeSelectedconfigTimeNameList.join(",")+'&area='
					param = param+'&areaId='+this.roomSelectedId+'&areaName='+this.roomSelectedName;
					param = param+'&carSelectedId='+this.carSelectedId+'&carSelectedName='+this.carSelectedName;
					uni.navigateTo({
						url:'./order_confirm?'+param,
						success:function(){
							uni.$emit('toConfimOrder',data)
						},
						fail:function(e){
							console.error(e)
						},
						complete() {
							uni.$emit('toConfimOrder',data)
						}
					})
				}else{
					uni.showToast({
						title: '请选择预约时间',
						icon: 'none',
						duration: 3000
					})
				}
			}
		}
	}
	function sortBykey(ary, key) {
	  return ary.sort(function (a, b) {
	    let x = a[key]
	    let y = b[key]
	    return ((x < y) ? -1 : (x > y) ? 1 : 0)
	  })
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
	.time-select-text {
		display: flex;
		align-items: center;
		text-align: center;
		padding-left: 10%;
	}
	.selected-time{
		color: red;
	}
	.bg-blue {
		background-color: #E1F5FE;
		color: #009EF8;
		border-color:#009EF8;
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
