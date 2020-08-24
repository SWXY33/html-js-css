
var locationUrl = 'https://apis.map.qq.com/ws/geocoder/v1/';
const tencentMapKey = 'XPIBZ-F4S6F-SHHJI-NO25R-R76VF-X6BCB';
Page({
  data: {
   //判断小程序的API，回调，参数，组件等是否在当前版本可用。
   canIUse: wx.canIUse('button.open-type.getUserInfo'),
   isHide: true,
   userName:'lushanli',
   gender:'',
   avatarUrl:'',
   session_key:'session_key',
   curentdate :'',
   time:'',
   location:''
  },
  getLocalLocation: function () {
    this.setData({
         location: '定位中...'
    });
    var that = this;
    wx.getLocation({
         type: 'gcj02', //返回可以用于wx.openLocation的经纬度
           success: function (res) {  //因为这里得到的是你当前位置的经纬度
             var latitude = res.latitude;//纬度
             var longitude = res.longitude;//经度
             wx.request({
              url: locationUrl+'?location='+latitude+','+longitude+'&key='+tencentMapKey+'&get_poi=1',
              method:'GET',
              header: {
                   'content-type': 'application/json'
                 },
                 success (res) {
                   console.log("服务器返回数据:" + res.statusCode)
                   console.log(res.data)
                   that.setData({
                        location: res.data.result.address_component.district
                   });
              },
              fail(res){
                   console.log("定位失败！")         
                   that.setData({
                        location: '定位失败'
                   });
              }
           });
           }, 
    })        
},
  onLoad: function() {
    this.getLocalLocation();
    var myDate = new Date();
    myDate.getFullYear();
    myDate.getMonth();
    myDate.getDate();
    myDate.getHours();
    myDate.getMinutes();
    myDate.getSeconds();
    if(myDate.getHours()<=12&&myDate.getHours()>=6){
      wx.setStorageSync('time',"早上")
    }else if(myDate.getHours()>12&&myDate.getHours()<=18){
      wx.setStorageSync('time',"下午")
    }else if(myDate.getHours()>18&&myDate.getHours()<=24){
      wx.setStorageSync('time',"晚上")
    }else{
      wx.setStorageSync('time',"凌晨")
    }
   wx.setStorageSync('curentdate', myDate.getFullYear() + '年' + (myDate.getMonth() + 1) + '月' + myDate.getDate()+"日"+myDate.getHours()+"点"+myDate.getMinutes()+"分")


    console.log("当前时间："+wx.getStorageSync('time')+wx.getStorageSync('curentdate'))
   var that = this;
   // 查看是否授权
   wx.getSetting({
    success: function(res) {
     if (res.authSetting['scope.userInfo']) {
      wx.getUserInfo({
       success: function(res) {
        // 用户已经授权过,不需要显示授权页面,所以不需要改变 isHide 的值
        // 根据自己的需求有其他操作再补充
        // 我这里实现的是在用户授权成功后，调用微信的 wx.login 接口，从而获取code
        wx.login({
         success: res => {
          // 获取到用户的 code 之后：res.code
          console.log("用户的code:" + res.code);
          // 可以传给后台，再经过解析获取用户的 openid
          // 或者可以直接使用微信的提供的接口直接获取 openid ，方法如下：
           wx.request({
            // 自行补上自己的 APPID 和 SECRET
           url: 'https://api.weixin.qq.com/sns/jscode2session?appid=wx3f21ca66fe7e5f1b&secret=7f48cea5dc5d3dc09bc99e812cdd145e&js_code=' + res.code + '&grant_type=authorization_code',
           success: res => {
          //   // 获取到用户的 openid
             console.log("用户的openid:" + res.data.openid);
             console.log("data====:" + JSON.stringify(res.data));
             wx.setStorageSync('session_key',res.data.session_key)
            }
            
          });
         }
        });
       }
      });
     } else {
      // 用户没有授权
      // 改变 isHide 的值，显示授权页面
      that.setData({
       isHide: true
      });
     }
    }
   });
  },
  //获取店铺地址定位
	getLocation:function(){
		wx.getLocation({
			type: 'gcj02', //返回可以用于wx.openLocation的经纬度
			success: function (res) {  //因为这里得到的是你当前位置的经纬度
				var latitude = res.latitude
				var longitude = res.longitude
				wx.openLocation({       
					latitude: 22.850752617967068,//纬度，范围为-90~90，负数表示南纬
					longitude: 110.7111131093292,//经度，范围为-180~180，负数表示西经
					name: "大坡农家饭店",//位置名
					address:"广西容县十里大坡村市场正对面20米",//地址的详细说明
					scale: 15,//缩放比例，范围1~28，默认为28
				})
			}
		})
	 

	},
  bindGetUserInfo: function(e) {
     //获取用户信息
     console.log("e.detail=============="+JSON.stringify(e.detail))
     let encryptedData = e.detail.encryptedData;
     let iv = e.detail.iv;
     let session_key = wx.getStorageSync('session_key');
     console.log("encryptedData=============="+encryptedData);
     console.log("iv=============="+iv);
     console.log("session_key=============="+session_key);
     wx.request({
      
        url: 'http://192.168.1.157:8090/wx/miniGetPhone?encryptedData='+encryptedData+'&iv='+iv+'&session_key='+session_key, 
        method:'POST',
        header: {
          'content-type': 'application/json'
        },
        success (res) {
          console.log("服务器返回数据:" + res.statusCode)
          console.log(res.data)
        }
      
    });
   if (e.detail.userInfo) {
    //用户按了允许授权按钮
    var that = this;
    // 获取到用户的信息了，打印到控制台上看下
    console.log("用户的信息如下：");
    console.log(e.detail.userInfo);
    this.setData({
      userHead: e.detail.userInfo.avatarUrl,
      welcome:'尊贵的',
      userName:e.detail.userInfo.nickName,
      time:wx.getStorageSync('time'),
      curentdate:wx.getStorageSync('curentdate')

    }),
   
    //授权成功后,通过改变 isHide 的值，让实现页面显示出来，把授权页面隐藏起来
    that.setData({
     isHide: false
    });
   } else {
    //用户按了拒绝按钮
    wx.showModal({
     title: '警告',
     content: '您点击了拒绝授权，将无法进入小程序，请授权之后再进入!!!',
     showCancel: false,
     confirmText: '返回授权',
     success: function(res) {
      // 用户没有授权成功，不需要改变 isHide 的值
      if (res.confirm) {
       console.log('用户点击了“返回授权”');
      }
     }
    });
   }
  }
 })