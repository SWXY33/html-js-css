// pages/minePage/minePage.js
var app = getApp();
var isLoginSuccess = false;
var open_id='';//储存获取到openid  
var session_key = ''//储存获取到session_key
var avatarUrl = '';
var nickname='';
var gender = '';
var province = '';
var city='';
var token='';


Page({

     /**
      * 页面的初始数据
      */
     data: {
          userTitle: '点击登录',
          userHead: '../../res/images/ic_mine_normal.png'

     },

     /**
      * 生命周期函数--监听页面加载
      */
     onLoad: function (options) {
          // this.initLoginMsg();
     },
     previewHead: function () {
          wx.previewImage({
               current: this.data.userHead,
               urls: [this.data.userHead]
          })
     },

     loginTap: function () {
          var that = this;
          if (!isLoginSuccess) {
               wx.showLoading({
                    title: '正在登录...',
               })
               // 登录
               wx.login({
                    success: res => {
                         // 发送 res.code 到后台换取 openId, sessionKey, unionId
                         console.log("res.code==="+res.code);
                         if(res.code){

                              wx.request({
                                   url: 'http://192.168.1.157:8090/wx/wxLoginForToken?code='+res.code, 
                                   method:'POST',
                                   header: {
                                     'content-type': 'application/json'
                                   },
                                   success (res) {
                                     console.log("服务器返回数据:" + res.statusCode)
                                     console.log(res.data)
                                     console.log("获取的taken为："+res.data.data)
                                     console.log("status==="+res.data.status)
                                     if(res.data.status){
                                        wx.request({
                                            
                                             url: 'http://192.168.1.157:8090/wx/wxLogin/'+res.data.data, 
                                             method:'GET',
                                             header: {
                                               'content-type': 'application/json'
                                             },
                                             success (res) {
                                               console.log("服务器返回数据:" + res.statusCode)
                                               console.log(res.data)
                                               console.log("openid=="+res.data.data.openid)
                                               console.log("session_key=="+res.data.data.session_key)
                                               wx.setStorageSync('session', res.data.data.session_key)  // 本地存储session
                                               app.globalData.session=res.data.data.session_key
                                               console.log(app.globalData.session)
                                //挂载到globalData上
                                             },
                                             fail(res){
                                                  console.log("获取失败！")
                                             }
                                        })
                                   }else{
                                        console.log("请求错误！")
                                   }
                                   }

                                   
                                 })
                              }
                    }
               })
               // 获取用户信息
               wx.getSetting({
                    success: res => {
                         wx.hideLoading();
                         if (res.authSetting['scope.userInfo']) {
                              // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
                              wx.getUserInfo({
                                   success: res => {
                                        // 可以将 res 发送给后台解码出 unionId
                                        app.globalData.userInfo = res.userInfo
                                        console.log("1111111"+JSON.stringify(app.globalData.userInfo))

                                        // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
                                        // 所以此处加入 callback 以防止这种情况
                                        if (app.userInfoReadyCallback) {
                                             app.userInfoReadyCallback(res)
                                        }
                                        that.initLoginMsg();
                                   },
                                   fail: res => {
                                        wx.hideLoading();
                                        isLoginSuccess = false;
                                        that.setData({
                                             userTitle: '点击登录',
                                             userHead: '../../res/images/ic_mine_normal.png'
                                        })
                                   }
                              })
                         }
                    }
               })
          }
     },

     initLoginMsg: function () {
          if (app.globalData.userInfo) {
               isLoginSuccess = true;
               this.setData({
                    userHead: app.globalData.userInfo.avatarUrl,
                    userTitle: '尊贵的，' + app.globalData.userInfo.nickName
               })
          } else if (this.data.canIUse) {
               // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
               // 所以此处加入 callback 以防止这种情况
               isLoginSuccess = true;
               app.userInfoReadyCallback = res => {
                    this.setData({
                         userHead: res.userInfo.avatarUrl,
                         userTitle: '尊贵的，' + res.userInfo.nickName
                    })
               }
          } else {
               // 在没有 open-type=getUserInfo 版本的兼容处理
               wx.getUserInfo({
                    success: res => {
                         isLoginSuccess = true;
                         app.globalData.userInfo = res.userInfo
                         this.setData({
                              userHead: res.userInfo.avatarUrl,
                              userTitle: '尊贵的，' + res.userInfo.nickName
                         })
                    },
                    fail() {
                         isLoginSuccess = false;
                         this.setData({
                              userTitle: '点击登录',
                              userHead: '../../res/images/ic_mine_normal.png'
                         })
                    }
               })
          }
     },

     allOrderTap: function () {
          wx.navigateTo({
               url: '../orderList/orderList?type=all',
          })
     },

     todoOrderTap: function () {
          wx.navigateTo({
               url: '../orderList/orderList?type=todo',
          })
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