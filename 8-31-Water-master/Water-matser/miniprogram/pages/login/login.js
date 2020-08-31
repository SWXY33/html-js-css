Page({
 data: {
   //判断小程序的API，回调，参数，组件等是否在当前版本可用。
  canIUse: wx.canIUse('button.open-type.getUserInfo'),
  isHide: true,
  nickName: "微信账号登录",
  avatarUrl:"./user-unlogin.png",
  userName:"",
  welcome:"尊敬的",
  userHead:"",
  openid:"",
  loginTime:"",
  inputName:"",
  hiddenmodalput:true,
  //可以通过hidden是否掩藏弹出框的属性，来指定那个弹出框
 },
 bindUser:function(){//绑定用户

 },
 queryWater:function(){//查询用水情况
    this.setData({
      hiddenmodalput: !this.data.hiddenmodalput
    })
    },   
    //取消按钮  
      cancel: function(){
            this.setData({
                hiddenmodalput: true
            });
        },
        //确认
     query: function(e){
       var that = this;
            var username = e.currentTarget.dataset.username;
            console.log("查询的用户名是："+username)
            that.setData({
            hiddenmodalput: true
        })
    wx.request({
      url: 'http://192.168.1.155:80/test/QueryByUsername.php?username=' + username,
      data: username,
      header: { 'Content-Type': 'application/json' },
      success: function (res) {
       console.log(res.data)
       that.setData({
        re: res.data,
       })
       wx.showToast({
        title: '已提交',
        icon: 'success',
        duration: 2000
       })
      }
     })
 },
 getInput:function(e){// 可以实时改变
  var inputName = e.detail.value;
  this.setData({
    inputName: inputName
  })
},
 onLoad: function () {
  var myDate = new Date(),
    year = myDate.getFullYear(),
    month = myDate.getMonth(),
    day = myDate.getDate(),
    hour = myDate.getHours(),
    min = myDate.getMinutes(),
    sec =  myDate.getSeconds();
      wx.setStorageSync('loginTime',year+"-"+month+"-"+day+"  "+hour+":"+min+":"+sec)
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
             wx.setStorageSync('openid', res.data.openid)
             that.setData({
               openid:res.data.openid
             })
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
 bindGetUserInfo:function(e){
  var db="no";
  var that = this;
   //获取用户信息
   console.log("e.detail=============="+JSON.stringify(e.detail))
   if (e.detail.userInfo) {
db="ok";
    //用户按了允许授权按钮
var nickName = wx.getStorageSync('nickName');
var avatarUrl = wx.getStorageSync('avatarUrl');
that.setData({
  userName:nickName,
  userHead:avatarUrl
})
  console.log("nickName="+nickName+";avatarUrl="+avatarUrl)
  
    if(db = "ok") {
     var name, url;
     wx.request({
      //url: 'http://192.168.1.155:80/test/WaterLogin.php',//写自己的服务器
      header: {
       "Content-Type": "application/x-www-form-urlencoded"
      },
      method: "POST",
      data: {
       name: nickName,
       url: avatarUrl,
       openid:wx.getStorageSync('openid'),
       loginTime:wx.getStorageSync('loginTime')
      },
      success: function (res) {
       console.log("success")
       console.log("服务器返回数据:" + res.statusCode)
       console.log(res.data)
      },
      fail: function () {
       console.log("fail")
      }
     })
    }
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
   },
   fail: function (res) {
    that.data.nickName = "未授权无法获取用户信息",
     that.setData({
      nickName: that.data.nickName
     })
   

 },
onShow: function () {
 }
})