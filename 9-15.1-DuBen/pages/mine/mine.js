// pages/mine/mine.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    nickname:'',
    headimg:'',
    renlianimg:''
  },
  changeUser:function(){
wx.navigateTo({
  url: '/pages/login/login',
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
//获取全局数据

let username = app.username;
let userHead = app.userHead;
let renlianimg = app.renlianimg;
this.setData({
  nickname:username,
  headimg:userHead,
  renlianimg:renlianimg,
})
console.log("username====="+username+";userHead========="+userHead+";renlianimg======="+renlianimg);
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