<template>
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
				<u-button size="mini" open-type="getPhoneNumber" @getphonenumber="decryptPhoneNumber">获取手机号</u-button>
			</u-form-item>
			<!-- <u-form-item :label-position="labelPosition" label="驾校名称" prop="schoolName" label-width="150">
				<u-input :border="border" placeholder="请输入驾校名称" v-model="model.schoolName" type="text"></u-input>
			</u-form-item>
			<u-form-item :label-position="labelPosition" label="教练姓名" prop="coachName" label-width="150">
				<u-input :border="border" placeholder="请输入教练姓名" v-model="model.coachName" type="text"></u-input>
			</u-form-item> -->
		</u-form>
		
		<u-button @click="submit">确定</u-button>
	</view>
</template>

<script>
export default {
	data() {
		let that = this;
		return {
			model: {
				idCard:'',
				name: '',
				sex: '',
				phone: '',
				schoolName:'',
				coachName:''
			},
			
			rules: {
				idCard: [
					{
						required: true,
						message: '请输入身份证号',
						trigger: ['change','blur'],
					},
					{
						validator: (rule, value, callback) => {
							return this.$u.test.idCard(value);
						},
						message: '身份证号不正确',
						trigger: ['change','blur'],
					}
				],
				name: [
					{
						required: true,
						message: '请输入姓名',
						trigger: 'blur' ,
					},
					{
						min: 2,
						max: 5,
						message: '姓名长度在2到5个字符',
						trigger: ['change','blur'],
					},
					{
						// 此为同步验证，可以直接返回true或者false，如果是异步验证，稍微不同，见下方说明
						validator: (rule, value, callback) => {
							// 调用uView自带的js验证规则，详见：https://www.uviewui.com/js/test.html
							return this.$u.test.chinese(value);
						},
						message: '姓名必须为中文',
						// 触发器可以同时用blur和change，二者之间用英文逗号隔开
						trigger: ['change','blur'],
					},
					// 异步验证，用途：比如用户注册时输入完账号，后端检查账号是否已存在
					// {
					// 	trigger: ['blur'],
					// 	// 异步验证需要通过调用callback()，并且在里面抛出new Error()
					// 	// 抛出的内容为需要提示的信息，和其他方式的message属性的提示一样
					// 	asyncValidator: (rule, value, callback) => {
					// 		this.$u.post('/ebapi/public_api/index').then(res => {
					// 			// 如果验证出错，需要在callback()抛出new Error('错误提示信息')
					// 			if(res.error) {
					// 				callback(new Error('姓名重复'));
					// 			} else {
					// 				// 如果没有错误，也要执行callback()回调
					// 				callback();
					// 			}
					// 		})
					// 	},
					// }
				],
				phone: [
					{
						required: true,
						message: '请输入手机号',
						trigger: ['change','blur'],
					},
					{
						validator: (rule, value, callback) => {
							// 调用uView自带的js验证规则，详见：https://www.uviewui.com/js/test.html
							return this.$u.test.mobile(value);
						},
						message: '请确认手机格式',
						// 触发器可以同时用blur和change，二者之间用英文逗号隔开
						trigger: ['change','blur'],
					}
				],
				schoolName: [
					{
						required: true,
						message: '请输入驾校名称',
						trigger: 'blur' ,
					}
				],
				coachName: [
					{
						required: true,
						message: '请输入教练姓名',
						trigger: 'blur' ,
					}
				],
				
			},
			border: false,
			radioList: [
				{
					name: '男',
					checked: true,
					disabled: false
				},
				{
					name: '女',
					checked: false,
					disabled: false
				}
			],
			radio: '男',
			radioCheckWidth: 'auto',
			radioCheckWrap: false,
			labelPosition: 'left',
			errorType: ['toast']
		};
	},
	onLoad(options) {
		let q = decodeURIComponent(options.q)
		uni.setStorageSync("inviter",getQueryString(q, 'id'))
	},
	computed: {
	
	},
	onReady() {
		this.$refs.uForm.setRules(this.rules);
	},
	methods: {
		submit() {
			this.$refs.uForm.validate(valid => {
				if (valid) {
					console.log('验证通过');
				} else {
					console.log('验证失败');
				}
			});
		},
		// radio选择发生变化
		radioGroupChange(e) {
			this.model.sex = e;
		},
		
	}
}
function getQueryString(url,name) {
 console.log("url = "+url)
 console.log("name = " + name)
 var reg = new RegExp('(^|&|/?)' + name + '=([^&|/?]*)(&|/?|$)', 'i')
 var r = url.substr(1).match(reg) 
 if (r != null) {
  console.log("r = " + r)
  console.log("r[2] = " + r[2])
  return r[2]
 }
 return null;
}
</script>

<style scoped lang="scss">
	page{
		height: 100%;
	}
	.wrap {
		padding: 30rpx;
	}
</style>
