(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/order/order_confirm"],{"0440":function(e,n,t){"use strict";t.r(n);var r=t("2a3d"),o=t("4c16");for(var i in o)"default"!==i&&function(e){t.d(n,e,(function(){return o[e]}))}(i);t("9238");var c,a=t("f0c5"),u=Object(a["a"])(o["default"],r["b"],r["c"],!1,null,"b23fd750",null,!1,r["a"],c);n["default"]=u.exports},"2a3d":function(e,n,t){"use strict";t.d(n,"b",(function(){return o})),t.d(n,"c",(function(){return i})),t.d(n,"a",(function(){return r}));var r={uForm:function(){return t.e("uview-ui/components/u-form/u-form").then(t.bind(null,"d0ca"))},uFormItem:function(){return Promise.all([t.e("common/vendor"),t.e("uview-ui/components/u-form-item/u-form-item")]).then(t.bind(null,"af6b"))},uInput:function(){return Promise.all([t.e("common/vendor"),t.e("uview-ui/components/u-input/u-input")]).then(t.bind(null,"29a2"))}},o=function(){var e=this,n=e.$createElement;e._self._c},i=[]},"4c16":function(e,n,t){"use strict";t.r(n);var r=t("91d5"),o=t.n(r);for(var i in r)"default"!==i&&function(e){t.d(n,e,(function(){return r[e]}))}(i);n["default"]=o.a},"7c71":function(e,n,t){},"91d5":function(e,n,t){"use strict";(function(e){Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;r(t("010d"));function r(e){return e&&e.__esModule?e:{default:e}}var o=function(){Promise.all([t.e("common/vendor"),t.e("components/zzx-calendar/zzx-calendar")]).then(function(){return resolve(t("6c27"))}.bind(null,t)).catch(t.oe)},i=function(){Promise.all([t.e("common/vendor"),t.e("components/xiujun-time-selector/index")]).then(function(){return resolve(t("cce5"))}.bind(null,t)).catch(t.oe)},c=function(){Promise.all([t.e("common/vendor"),t.e("components/YnComponents/ynGallery/ynGallery")]).then(function(){return resolve(t("a563"))}.bind(null,t)).catch(t.oe)},a={components:{zzxCalendar:o,timeSelector:i,ynGallery:c},onLoad:function(n){e.$on("toConfimOrder",(function(e){console.log("监听到事件来自 update ，携带参数 msg 为："+e.msg)})),this.orderDate=n.orderDate,this.timeSelected=n.orderConfigTime,this.timeSelectedId=n.orderTimeIdsStr,this.areaSelected=n.areaName,this.areaSelectedId=n.areaId,this.carSelected=n.carSelectedName,this.carSelectedId=n.carSelectedId,console.log(n.orderTimeIdsStr)},onReady:function(){this.$refs.uForm.setRules(this.rules)},data:function(){var e=this;return{orderInfo:"",changeRolNum:0,orderDate:"",span:3,offset:0,timeSelected:"",timeSelectedId:"",areaSelected:"",areaSelectedId:"",carSelected:"",carSelectedId:"",justify:"start",area_src:"@/static/car/img/order/area_sc.png",room:[],model:{phone:"",name:""},errorType:["toast"],rules:{idCard:[{required:!0,message:"请输入身份证号",trigger:["change","blur"]},{validator:function(n,t,r){return e.$u.test.idCard(t)},message:"身份证号不正确",trigger:["change","blur"]}],name:[{required:!0,message:"请输入姓名",trigger:"blur"},{min:2,max:5,message:"姓名长度在2到5个字符",trigger:["change","blur"]},{validator:function(n,t,r){return e.$u.test.chinese(t)},message:"姓名必须为中文",trigger:["change","blur"]}],phone:[{required:!0,message:"请输入手机号",trigger:["change","blur"]},{validator:function(n,t,r){return e.$u.test.mobile(t)},message:"请确认手机格式",trigger:["change","blur"]}]}}},methods:{datechange:function(e){this.orderDate=e.fullDate,console.log(e)},selectTimeEvent:function(e){console.log(e)},onclickimg:function(e){console.log(e)},changeRol:function(e,n){this.changeRolNum=n},getWeChatMiniProgramUserInfo:function(n){e.login({provider:"weixin",success:function(n){e.getUserInfo({provider:"weixin",success:function(t){var r={code:n.code,encryptedData:t.encryptedData,iv:t.iv,userInfo:t.userInfo,rawData:t.rawData,signature:t.signature,channel:"wechat",inviter:e.getStorageSync("inviter_user_id")};e.showToast({title:"登录中，请稍候...",icon:"none",duration:3e3}),this.$u.post("/butt-auth",r).then((function(n){n&&200===n.code&&(e.setStorageSync("mini_car_token",n.token),e.setStorageSync("mini_car_userid",n.userid))}))}})}})},confimOrder:function(){var e=!1;if(this.$refs.uForm.validate((function(n){n?(console.log("验证通过"),e=n):console.log("验证失败")})),e){var n={orderTime:this.orderDate,orderTimeIdsStr:this.timeSelectedId,areaId:this.areaSelectedId,carId:this.carSelectedId,userName:this.model.name,userPhone:this.model.phone};this.$u.post("/order/add",n).then((function(e){console.log(e)}))}}}};n.default=a}).call(this,t("543d")["default"])},9238:function(e,n,t){"use strict";var r=t("7c71"),o=t.n(r);o.a},"9c9e":function(e,n,t){"use strict";(function(e){t("e6c8");r(t("66fd"));var n=r(t("0440"));function r(e){return e&&e.__esModule?e:{default:e}}e(n.default)}).call(this,t("543d")["createPage"])}},[["9c9e","common/runtime","common/vendor"]]]);