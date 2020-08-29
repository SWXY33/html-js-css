//index.js
//获取应用实例
const app = getApp()
 
Page({
  data: {
    userHead:'',
    userName:'',
    username: '',
    password: ''
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onShow: function () {
    // 生命周期函数--监听页面显示
    wx.hideTabBar({})
  },
  onLoad: function () {
   
  },
 
 
  // 获取输入账号 
  usernameInput: function (e) {
    this.setData({
      username: e.detail.value
    })
  },
 
  // 获取输入密码 
  passwordInput: function (e) {
    this.setData({
      password: e.detail.value
    })
  },
 
  // 登录处理
  login: function () {
    var that = this;
    if (this.data.username.length == 0 || this.data.password.length == 0) {
      wx.navigateTo({
        url: '../adminlogin/adminlogin',
      })
     /* wx.showToast({
        title: '账号或密码不能为空',
        icon: 'none',
        duration: 2000
      })*/
    } else if(this.data.username=="swxy33"&&this.data.password=="Sa888111"){
      that.setData({
        userHead:'../../images/admin.jpg',
        userName:'swxy33'
      })
      wx.navigateTo({
        url: '../adminlogin/adminlogin',
      })
   
    }else {
      wx.showToast({
        title: '账号或密码错误',
        icon: 'none',
        duration: 2000
      })
    }
  }
})
 