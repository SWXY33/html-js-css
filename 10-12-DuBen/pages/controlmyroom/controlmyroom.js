// pages/controlmyroom/controlmyroom.js
var app =  getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  controlLight:function(e){
   console.log
    app.lightname = e.currentTarget.dataset.lightname
console.log("点击的是："+app.lightname)
wx.navigateTo({
  url: '/pages/controllight/controllight',
})
  },
  controlTV:function(){
    wx.navigateTo({
      url: '/pages/controTV/controlTV',
    })
  },
  controlkongtiao:function(){
    wx.navigateTo({
      url: '/pages/controlkongtiao/controlkongtiao',
    })
  },
  controlreshuiqi:function(){
    wx.navigateTo({
      url: '/pages/controlreshuiqi/controlreshuiqi',
    })
  },
  controlxinfeng:function(){
    wx.navigateTo({
      url: '/pages/controlxinfeng/controlxinfeng',
    })
  },
  controlCurtain:function(){
    wx.navigateTo({
      url: '/pages/controlCurtain/controlCurtain',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})