//index.js
const app = getApp()

Page({
  data: {
    avatarUrl: './user-unlogin.png',
    userInfo: {},
    logged: false,
    takeSession: false,
    requestResult: ''
  },
/**
  *  图片预览方法
  *  此处注意的一点就是，调用 "wx.previewImage"时，第二个参数要求为数组形式哦
  *  当然，做过图片上传功能的应该会注意到，如果涉及到多张图片预览，图片链接数组集合即为参数 urls！
  */
 previewImage: function(e) {
  var current = e.target.dataset.src;
  wx.previewImage({
    current: current,
    urls: [current]
  })
},
  onLoad: function() {
    if (!wx.cloud) {
      wx.redirectTo({
        url: '../chooseLib/chooseLib',
      })
      return
    }

    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              this.setData({
                avatarUrl: res.userInfo.avatarUrl,
                userInfo: res.userInfo
              })
            }
          })
        }
      }
    })
  },

  onGetUserInfo: function(e) {
    if (!this.data.logged && e.detail.userInfo) {
      this.setData({
        logged: true,
        avatarUrl: e.detail.userInfo.avatarUrl,
        userInfo: e.detail.userInfo
      })
    }
  },


 /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
 
    let url = encodeURIComponent('/pages/index/index?');
 
    return {
      title: "超盟",
      path:`/pages/index/index?url=${url}` 
    }
 
  }


})
