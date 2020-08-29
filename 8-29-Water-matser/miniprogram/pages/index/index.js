//index.js
//获取应用实例
const app = getApp()
 
Page({
  data: {
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
 
 
  //管理员登录 
  adminlogin: function () {
    wx.navigateTo({
      url: '../admin/admin',
    })
  },
 

 
  // 登录处理
  login: function () {
    wx.navigateTo({
      url: '../login/login',
    })
  }
})
 